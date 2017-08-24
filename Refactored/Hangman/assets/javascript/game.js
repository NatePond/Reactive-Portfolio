"use strict";
window.onload = function() {
  var audio = new Audio("assets/MisfitsMonsterMash.mp4");
  // audio.play();
  audio.loop = true;
  var wins = 0;
  var limbs = 7;
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  // var monster = ["pyramid-head", "leatherface", "xenomorph", "cenobite", "predator", "terminator", "freddy", "jason", "babadook", "jaws", "brundlefly", "gremlin", "pennywise", "jigsaw", "samara", "hannibal", "michael-myers"];
    var monster = ["jaws"];
  var word;
  word = monster[Math.floor(Math.random() * monster.length)];
  var guess;
  var userGuesses = [];
  var guesses = [];
  var wrong = [];
  var right = 0;
  document.getElementById("limbs").innerHTML = limbs;
  var wordBlank = document.getElementById("blanks");
  var correct = document.createElement("ul");
  const thisInthat = (w, x, y) => w === x[y]; 
  const game = () => {
    $(".blanks").empty();
    $(".guessed").empty();
    word = monster[Math.floor(Math.random() * monster.length)]
    for (let i = 0; i < word.length; i++) {
      correct.setAttribute("class", "blanks");
      guess = document.createElement("li");
      guess.setAttribute("class", "guess");
      const dash = () => {guess.innerHTML = "-"; right++}
      const blank = () => guess.innerHTML = "_"; 
      thisInthat("-", word, i) ? dash() : blank()
      guesses.push(guess);
      wordBlank.appendChild(correct);
      correct.appendChild(guess);
      document.getElementById("limbs").innerHTML = limbs;
    }
    confirm();
  }
  
  const userGuessed = userGuesses => userGuesses.length > 0;
  
  const verify = userGuess => {
    const forLoop = v => {for (let i = 0; i < v.length; i++) {
        let k = thisInthat(userGuess, userGuesses, i);
        if (k) return true
      }
    }; 
    let verification = forLoop(userGuesses) ? true : false;
    return userGuessed ? verification : false;
  }

  const confirm = () => {
    document.onkeydown = function(event) {
      let guess;
      let e = event.key;
      const r = alphabet.indexOf(e);
      const k = () => guess = e; 
      thisInthat(e, alphabet, r) && k() 
      const needsVerification = verify(guess);
      const isVerified = !needsVerification
      const confirmation = () => {
        document.getElementById("limbs").innerHTML = limbs;
        userGuesses.push(guess)
        for (let i = 0; i < word.length; i++) {
          if (thisInthat(guess, word, i)) {
            guesses[i].innerHTML = guess;
            console.log(guesses[i])
            right++;
          }
        }
        const g = word.indexOf(guess)
        const wordSplit = [...word]
        const isIncorrect = () => {
          limbs--; 
          wrong.push(guess); 
          document.getElementById("guessed").innerHTML = wrong;
        };
        const notInword = () => !thisInthat(guess, wordSplit, g);
        const isDead = () => limbs < 1;
        const isDone = () => right === word.length;
        const isLoser = () => {
          $(".guess").empty();
          const audio = new Audio('assets/Disappointed.mp3');
          audio.play();
          document.getElementById("prize").src = "assets/images/fail.png";
          correct.parentNode.removeChild(correct);
          play();
          $("#prizename").empty();
          userGuesses = [];
        };
        const isWinner = () => {
          const audio = new Audio('assets/yay.mp3');
          audio.play();
          wins++;
          userGuesses = [];
          document.getElementById("wins").innerHTML = wins;
          document.getElementById("prize").src = "assets/images/" + word + ".png";
          document.getElementById("prizename").innerHTML = word;
          play();
        };
        $(".class").empty();    
        isDead() ? isLoser()
         :
        isDone() ? isWinner() 
         :
        notInword() && isIncorrect() 
      } 
      isVerified ? confirmation() : console.log("AlreadyGuessed") 
    };
  }

  const play = () => {
    guesses = [];
    wrong = [];
    limbs = 7;
    right = 0;
    game();
  }

  play();
  confirm();

  document.getElementById("wins").innerHTML = wins;
}
