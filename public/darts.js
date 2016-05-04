// Swap this out with plain javascript
$("#dartboard #areas g").children().hover(
  function(){
    $(this).css("opacity","0.6");
  },
  function(){
    $(this).css("opacity","1");
  }
)
// Figure out a way to do this with vue so we can drop the jQuery dependency.
$("#dartboard #areas g").children().on('click', function() {
  var score = $(this).attr('id')
  if (score == 'Bull') {
    vm.updateCurrentPlayerScore(50, true);
  } else if (score == 'Outer') {
    vm.updateCurrentPlayerScore(25);
  } else if (score == 'Missed') {
    vm.updateCurrentPlayerScore(0);
  }  else {
    var multiplier = score.substring(0,1);
    if (multiplier == 'd') {
      vm.updateCurrentPlayerScore(score.substring(1,3) * 2, true);
    } else if (multiplier == 't') {
      vm.updateCurrentPlayerScore(score.substring(1,3) * 3, false);
    } else {
      vm.updateCurrentPlayerScore(score.substring(1,3), false);
    }
  }
});

function find_in_array(arr, name, value) {
    for (var i = 0, len = arr.length; i<len; i++) {
        if (name in arr[i] && arr[i][name] == value) return i;
    };
    return false;
}


var vm = new Vue({
  el: '#app',
  data: {
    new_game: {
      starting_point: 301,
      player_one: {},
      player_two: {},
      player_list: []
    },
    players: [],
    current_player: 0,
    current_round: [],
    shots: 3,
    round: 1,
    game_started: false,
    game_finished: false,
    offline: null,
    message: ''
  },
  computed: {
    online: function() {
      if (this.offline == false) {
        return true;
      }
    }
  },
  ready: function() {

  },
  methods: {
    startOnline: function() {
      this.offline = false;

      reqwest({
          url: 'http://localhost:5050/users'
        , type: 'json'
        , method: 'get'
        , contentType: 'application/json'
        , error: function (err) { }
        , success: function (resp) {
           vm.new_game.player_list = resp.data;
          }
      })
    },
    startOffline: function() {
      this.offline = true;
    },
    createGame: function() {
      if (this.online) {
        var playerOne = find_in_array(this.new_game.player_list, '_id', this.new_game.player_one);
        var playerTwo = find_in_array(this.new_game.player_list, '_id', this.new_game.player_two);

        this.players.push({
          name: this.new_game.player_list[playerOne].username,
          _id: this.new_game.player_list[playerOne]._id,
          score: this.new_game.starting_point,
          round_history: [],
          shot_history: []
        });

        this.players.push({
          name: this.new_game.player_list[playerTwo].username,
          _id: this.new_game.player_list[playerTwo]._id,
          score: this.new_game.starting_point,
          round_history: [],
          shot_history: []
        });

      } else {

        this.players.push({
          name: this.new_game.player_one,
          score: this.new_game.starting_point,
          round_history: [],
          shot_history: []
        });
        this.players.push({
          name: this.new_game.player_two,
          score: this.new_game.starting_point,
          round_history: [],
          shot_history: []
        });
      }

      this.game_started = true;
    },
    updateCurrentPlayerScore: function(score, double) {
      const currentPlayer = this.players[this.current_player];
      const updatedScore = currentPlayer.score - score;

      vm.current_round.push(currentPlayer.score);

      if (vm.checkBust(updatedScore, double)) {
        currentPlayer.score = updatedScore;
        vm.shots--;
        vm.testCheckouts(updatedScore);
        vm.updatePlayerShotHistory(score);

        if (vm.shots == 0 && vm.game_finished != true) {
          vm.message = '';
          vm.updatePlayerRoundHistory(updatedScore);
          vm.resetCurrentRound();
          vm.endTurn()
        }

      } else {
        currentPlayer.score = vm.current_round[0];
        vm.endTurn();
      }
    },
    swapCurrentPlayer: function() {
      if (this.current_player == 0){
        this.current_player = 1
      } else {
        this.current_player = 0
      }
      vm.message = '';
      vm.testCheckouts(this.players[this.current_player].score);
    },
    resetShots: function() {
      this.shots = 3;
    },
    resetCurrentRound: function() {
      this.current_round = [];
    },
    incrementRound: function() {
      this.round++;
    },
    updatePlayerShotHistory: function(value) {
      const currentPlayer = this.players[this.current_player];
      currentPlayer.shot_history.push(value);
    },
    updatePlayerRoundHistory: function(values) {
      const currentPlayer = this.players[this.current_player];

      if (Object.prototype.toString.call( values ) === '[object Array]') {
        currentPlayer.round_history = currentPlayer.round_history.concat(values);
      } else {
        currentPlayer.round_history.push(values);
      }
    },
    endTurn: function() {
      vm.resetShots();
      vm.incrementRound();
      vm.resetCurrentRound();
      vm.swapCurrentPlayer();
    },
    checkBust: function(score, double) {
      if (score == 1 || score < 0) {
        console.log('You finished on 1 or went past 0');
        return false;
      } else if (score == 0 && double) {
        console.log('You won!');
        vm.finishGame(score);
        return true;
      } else if (score == 0) {
        console.log('You hit 0 without a double.');
        return false;
      } else {
        return true;
      }
    },
    finishGame: function(score) {
      vm.updatePlayerRoundHistory(vm.current_round);
      vm.updatePlayerRoundHistory(score);
      vm.resetCurrentRound();
      vm.game_finished = true;

      this.players[this.current_player].winner = true;

      if (this.online) {
        vm.postResults();
      }

      vm.message = this.players[this.current_player].name + ' won!';
    },
    postResults: function() {
      var matchData = {
        starting_point: this.new_game.starting_point,
        players: this.players,
      }

      reqwest({
          url: 'http://localhost:5050/matches'
        , type: 'json'
        , method: 'post'
        , data: matchData
        , success: function (resp) {
            console.log('saved to api');
          }
      })

    },
    testCheckouts: function(score) {
      /*
        Code modified from checkouts lookup table by Maegnes on Github:
        https://github.com/maegnes/darts-with-friends
      */
      if( score <= 170 && vm.game_finished != true) {
          console.log(score);
        // Check, if the remaining score is able to be checked out
        if( typeof checkouts[score] == "object" ) {
          // Evaluate how many darts are needed to check out the current score
          var neededDarts = 0;
          var first = checkouts[score]['first'];
          var second = checkouts[score]['second'];
          var third = checkouts[score]['third'];

          // Add the first needed score to the checkout string
          var checkoutString = first;
          neededDarts++;

          // If a second score is needed to checkout the score, add it to checkout string
          if( second != '' ) {
            neededDarts++;
            checkoutString += ' - ' + second;
          }
          // If third dart is needed, add it to the checkout string
          if( third != '' ) {
            checkoutString += ' - ' + third; neededDarts++;
          }

          // Check if the player has enough throws remaining to check out the current score
           if( ( this.shots ) >= neededDarts ) {
              console.log(this.shots, neededDarts);
                // The user has more remaining throws than needed for checkout - SHOW CHECKOUT TEXT!
                this.message = checkoutString;
            } else {
                // The user is not able to check out the current score with the remaining throws - NO CHECKOUT!
                this.message = 'no checkouts';
            }
        }
      }
    }
  }
})