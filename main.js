new Vue({
      el: "#app",
      data: {
            monsterHealth: 100,
            playerHealth: 100,
            turns: [],
            isGameRunning: false
      },
      methods: {
            start: function() {
                  this.monsterHealth = 100;
                  this.playerHealth = 100;
                  this.isGameRunning = true;
            },
            attack: function() {
                  var damage = this.calculateDamage(3, 10);
                  this.monsterHealth -= damage;
                  this.turns.unshift({
                        isPlayer: true,
                        text: 'Player hits Monster for ' + damage
                  });
                  if(this.checkHealth()) {
                        return;
                  }
                  this.mosterAttack();
            },
            specialAttack: function() {
                  var damage = this.calculateDamage(10, 20);;
                  this.monsterHealth -= damage;
                  this.turns.unshift({
                        isPlayer: true,
                        text: 'Player hits Monster for ' + damage
                  });
                  if(this.checkHealth()) {
                        return;
                  }
                  this.mosterAttack();
            },
            mosterAttack: function() {
                  var damage = this.calculateDamage(3, 10);;
                  this.playerHealth -= damage;
                  this.checkHealth();
                  this.turns.unshift({
                        isPlayer: false,
                        text: 'Monster hits Player for ' + damage
                  });
            },
            giveUp: function() {
                  this.isGameRunning = false;
            },
            heal: function() {
                  if(this.playerHealth <=90) {
                        this.playerHealth += 10;
                  } else {
                        this.playerHealth = 100;
                  }
                  this.turns.unshift({
                        isPlayer: true,
                        text: 'Player heals for ' + 10
                  });
                  this.mosterAttack();
            },
            calculateDamage: function(min, max) {
                 return Math.max(Math.floor(Math.random() * max), min);
            },
            checkHealth: function() {
                  if(this.monsterHealth <= 0) {
                        if(confirm('You won, new game ?')) {
                              this.start();
                        } else {
                              this.isGameRunning = false;
                        }
                        return true;
                  } else if(this.playerHealth <= 0) {
                        if(confirm('You lost, new game ?')) {
                              this.start();
                        } else {
                              this.isGameRunning = false;                              
                        }
                        return true;
                  } else {
                        return false;
                  } 
            }
      },
});