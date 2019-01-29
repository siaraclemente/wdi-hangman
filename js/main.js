/*----- constants -----*/ 
const MAX_WRONG_GUESSES = 6; 
const WORDS = [
'DATATYPES', 'OBJECTS', 'ARRAYS', 'ENOUGH',
'FUNCTIONS','MVC', 'MOO', 'VARIABLES'
];

/*----- app's state (variables) -----*/ 
let usedLetters, wrongGuesses, secret, guess;

/*----- cached element references -----*/ 
const letterBtns = document.querySelectorAll('#letters button');
const hangmanImg = document.querySelector('section');
const guessEl = document.getElementById('guess');
const msgEl = document.querySelector('h2');

/*----- event listeners -----*/ 
document.getElementById('letters').addEventListener('click', handleLetterClick);
document.getElementById('replay').addEventListener('click', init);

/*----- functions -----*/

init();

function init() {
    // usedLetters, wrongGuesses, secret, guess
    usedLetters = [];
    wrongGuesses = [];
    let rndIDX = Math.floor(Math.random() * WORDS.length);
    secret = WORDS[rndIDX];
    console.log(secret); 
    guess = '_'.repeat(secret.length);
    render();
}

function render() {
    guessEl.textContent = guess;
    hangmanImg.style.backgroundPosition = `${-75 * wrongGuesses.length}px 0`;
    if (guess === secret) {
        msgEl.textContent = 'Congrats you guessed the word!';
    }   else if (wrongGuesses.length === MAX_WRONG_GUESSES) {
        msgEl.textContent = "LOSER! You ded.";
    }   else {
        msgEl.textContent = "Don't die!";
    }
    letterBtns.forEach(function(btn){
        if (usedLetters.includes(btn.textContent)) {
            btn.setAttribute('disabled', false);
        }   else {
            btn.removeAttribute('disabled');
        }
    });
    
function handleLetterClick(evt) {
    let letter = evt.target.textContent;
    wrongGuesses.push(letter);
    let guessChars = guess.split('');
    if (secret.includes(letter)) {
        for (let i=0; i < secret.length; i++) {
            let char = secret.charAt(i);
            if (char === letter) {
                guessChars[i] = letter;
            }
      } 
      guess = guessChars.join('');
    } else {
        wrongGuesses.push(letter);
    }
    usedLetters.push(letter);
    render();

}