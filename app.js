new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        playerAttack: null,
        playerSpecialAttacks: 2,
        playerHeal: 2,
        monsterHealth: 100,
        monsterAttack: null,
        script: [],
        gameIsRunning: false,
        gameButton: 'START NEW GAME',
        // We will change the value of this interval on the method 'startDamage', so that we can clear the interval from everywhere
        interval: null,
        barColorPlayer: 'green',
        barColorMonster: 'green'
    },
    watch: {
        // I'm gonna watch for these properties. Every time they change, I'll call the method 'changeBarColor'
        playerHealth: function () {
            this.changeBarColor('player')
        },
        monsterHealth: function () {
            this.changeBarColor('monster')
        }
    },
    methods: {
        // The monster will damage the player every 2 seconds. The game will end when playerHealth is 0
        startDamage: function () {
            this.interval = setInterval(() => {
                this.monsterAttack = Math.ceil(Math.random() * (this.playerHealth / 2 - 0));
                this.script.push(`Monster damaged you with ${this.monsterAttack} points!`);
                this.playerHealth -= this.monsterAttack;
                if (this.playerHealth <= 0) {
                    this.script.push(`YOU LOST THIS GAME!`);
                    this.gameIsRunning = false;
                    this.gameButton = "START NEW GAME";
                    clearInterval(this.interval);
                }
            }, 1000)
        },
        // 1st we clear the interval so that it doesn't go faster everytime, we reset playerHealth and change title to 'FIGHT!'. After 0.5 seconds the game starts
        startGame: function () {
            clearInterval(this.interval);
            this.script = [];
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.barColorPlayer = 'green';
            this.barColorMonster = 'green';
            this.monsterHealth = 100;
            this.playerSpecialAttacks = 2;
            this.playerHeal = 2;
            this.gameButton = "FIGHT!";
            setTimeout(() => {
                this.gameIsRunning = true;
                this.startDamage();
            }, 1000);
        },
        // It will damage the monster with a small random number
        attack: function () {
            this.playerAttack = Math.ceil(Math.random() * (this.monsterHealth / 3 - 0));
            this.script.push(`You attacked with ${this.playerAttack} points!`);
            this.monsterHealth -= this.playerAttack;
            if (this.monsterHealth <= 0) {
                this.script.push(`YOU WON THIS GAME!`);
                this.gameIsRunning = false;
                this.gameButton = "START NEW GAME";
                clearInterval(this.interval);
            }
        },
        // It will damage the monster with a bigger random number
        specialAttack: function () {
            if (this.playerSpecialAttacks > 0) {
                this.playerSpecialAttacks -= 1;
                this.playerAttack = Math.ceil(Math.random() * (this.monsterHealth / 2 - this.monsterHealth / 3) + this.monsterHealth / 3);
                this.script.push(`SPECIAL ATTACK: You attacked with ${this.playerAttack} points!`);
                this.monsterHealth -= this.playerAttack;
                if (this.monsterHealth <= 0) {
                    this.script.push(`YOU WON THIS GAME!`);
                    this.gameIsRunning = false;
                    this.gameButton = "START NEW GAME";
                    clearInterval(this.interval);
                }
            } else {
                null;
            }
        },
        // 1st we clear the interval so that it doesn't go faster everytime. We ask the user if he wants to leave. If true, we reset everything. If false, the game keeps going
        giveUp: function () {
            clearInterval(this.interval);
            let leave = confirm('Are you sure you wanna leave?');
            if (leave) {
                this.gameIsRunning = false;
                this.playerHealth = 100;
                this.gameButton = "START NEW GAME";
                this.script = [];
            } else {
                this.startDamage();
            }
        },
        // For every click, the playerHealth will rise 15 points. This action will be also added to the script.
        heal: function () {
            if (this.playerHeal > 0) {
                this.playerHeal -= 1;
                if (this.playerHealth >= 85) {
                    this.playerHealth = 100;
                    this.script.push(`Player heals completely!`);
                } else if (this.playerHealth < 85) {
                    this.playerHealth += 15;
                    this.script.push(`Player heals 15 points!`);
                } else {
                    null;
                }
            }
        },
        // Depending on which player's health's bar is moving, this function will be called with the player or the monster as argument
        changeBarColor: function (player) {
            if (player === 'player') {
                if (this.playerHealth < 15) {
                    this.barColorPlayer = 'red';
                } else if (this.playerHealth < 50) {
                    this.barColorPlayer = 'orange';
                }
            } else {
                if (this.monsterHealth < 15) {
                    this.barColorMonster = 'red';
                } else if (this.monsterHealth < 50) {
                    this.barColorMonster = 'orange';
                }
            }
        }
    }
})