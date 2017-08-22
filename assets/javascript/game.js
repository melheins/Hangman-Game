/* VARIABLES */

// Creates an array that lists out all of the options (A-Z).
var computerChoices = ['asteroid', 'comet', 'planet', 'sun', 'moon', 'constellation', 'galaxy', 'nebula', 'supernova', 'atmosphere', 'astrology', 'eclipse', 'cosmic', 'flare'];
// Creates variables to hold # of times the user has guessed the letter correctly
var numWins = 0;
// Creates variables to hold # of times the user has failed to guess the letter correctly after exhausting all guesses
var numLosses = 0;
// Creates variables to hold # of guesses left
var guessLeft;
// Creates variable array to hold all the users incorrect guesses
var incorrectGuesses;
// Creates variable to hold users current guess
var userGuess;
// Creates variable to hold computer's word that user needs to guess
var computerWord = '';
// Creates variable to hold display of computers word
var wordDisplay = '';
//
var numWrong = 0;

/* FUNCTIONS */

function setWordDashes() {
    for (var i = 0; i < computerWord.length; i++)
        wordDisplay.push('_');
}

// Resets the game, by generating a new computer letter and resetting guess variables.
function gameReset() {
    computerWord = computerChoices[Math.floor(Math.random() * computerChoices.length)];
    guessLeft = 12;
    incorrectGuesses = [];
    userGuess = '';
    wordDisplay = [];
    setWordDashes();
    draw();
}

/* GAME LOGIC */

// Initialize first instance of game
gameReset();


// Check user guess when the user presses a key.
document.onkeyup = function (event) {
    // Determines which key was pressed.
    userGuess = event.key;

    // Print computer guess to console for debugging
    console.log(computerWord);

    //


    if (computerWord.indexOf(userGuess) > -1) { // if the character is found
        for (var j = 0; j < computerWord.length; j++) { // loop on all characters
            if (computerWord[j] === userGuess) // if this is an occurance
                wordDisplay[j] = computerWord[j].toUpperCase();
        }
        if (wordDisplay.indexOf('_') === -1) {
            numWins++;
            gameReset();
        }
    }
    else {
        // wrong choice
        guessLeft--;
        if (guessLeft > 0) {
            incorrectGuesses.push(userGuess.toUpperCase());
            numWrong++;
            hang();
        } else {
            gameOver();
        }
    }
    // Update HTML with variable values
    document.querySelector('#numWins').innerHTML = "" + numWins;
    document.querySelector('#numLosses').innerHTML = "" + numLosses;
    document.querySelector('#guessLeft').innerHTML = "" + guessLeft;
    document.querySelector('#incorrectGuesses').innerHTML = incorrectGuesses.join(" ");
    document.querySelector('#wordDisplay').innerHTML = wordDisplay.join(" ");

};


function draw() {
    var ctx = document.getElementById("hangman").getContext('2d');
    ctx.fillStyle = "white";
    ctx.lineWidth = 3;
    ctx.fillRect(0, 0, 300, 300);
    //Side Bar left vertical line
    ctx.beginPath();
    ctx.moveTo(50, 270);
    ctx.lineTo(50, 25);
    ctx.stroke();
    //Side Bar right vertical line
    ctx.beginPath();
    ctx.moveTo(65, 270);
    ctx.lineTo(65, 25);
    ctx.stroke();
    //Tob bar top horizontal line
    ctx.beginPath();
    ctx.moveTo(49, 25);
    ctx.lineTo(175, 25);
    ctx.stroke();
    //Top bar bottom horizontal line
    ctx.beginPath();
    ctx.moveTo(49, 40);
    ctx.lineTo(175, 40);
    ctx.stroke();
    //Top Bar right vertical end line
    ctx.beginPath();
    ctx.moveTo(173, 25);
    ctx.lineTo(173, 40);
    ctx.stroke();
    //Ground line
    ctx.beginPath();
    ctx.moveTo(35, 270);
    ctx.lineTo(265, 270);
    ctx.stroke();
    //Noose line
    ctx.beginPath();
    ctx.moveTo(150, 40);
    ctx.lineTo(150, 80);
    ctx.stroke();
}

function hang() {
    var ctx = document.getElementById("hangman").getContext('2d');
    if (numWrong === 1) {
        ctx.beginPath(); //head
        ctx.arc(150, 100, 20, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath(); //left eye
        ctx.arc(143, 95, 3.5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath(); //right eye
        ctx.arc(157, 95, 3.5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath(); //mouth
        ctx.arc(150, 103, 9, 0, Math.PI);
        ctx.stroke();
    }
    if (numWrong === 2) {
        ctx.beginPath(); //body
        ctx.moveTo(150, 120);
        ctx.lineTo(150, 190);
        ctx.stroke();
    }
    if (numWrong === 3) {
        ctx.fillStyle = "white";
        ctx.fillRect(138, 102, 24, 12); //cover mouth
        ctx.beginPath(); //straight mouth
        ctx.moveTo(140, 108);
        ctx.lineTo(160, 108);
        ctx.stroke();
        ctx.beginPath(); //right arm
        ctx.moveTo(150, 135);
        ctx.lineTo(180, 160);
        ctx.stroke();
    }
    if (numWrong === 4) {
        ctx.beginPath(); //left arm
        ctx.moveTo(150, 135);
        ctx.lineTo(120, 160);
        ctx.stroke();
    }
    if (numWrong === 5) {
        ctx.fillRect(138, 102, 24, 12); //cover mouth
        ctx.beginPath(); //sad mouth
        ctx.arc(150, 112, 9, 0, Math.PI, true);
        ctx.stroke();
        ctx.beginPath(); //right leg
        ctx.moveTo(149, 188);
        ctx.lineTo(180, 230);
        ctx.stroke();
    }
    if (numWrong === 6) {
        ctx.beginPath(); //left leg
        ctx.moveTo(151, 188);
        ctx.lineTo(120, 230);
        ctx.stroke();
    }
    if (numWrong === 11) {
        ctx.fillRect(138, 90, 24, 24); //cover face
        ctx.fillRect(118, 121.2, 70, 120); //cover body
        ctx.beginPath(); //straight mouth
        ctx.moveTo(140, 108);
        ctx.lineTo(160, 108);
        ctx.stroke();
        ctx.beginPath(); //body
        ctx.moveTo(150, 135);
        ctx.lineTo(150, 205);
        ctx.stroke();
        ctx.beginPath(); //right arm
        ctx.moveTo(150, 150);
        ctx.lineTo(180, 175);
        ctx.stroke();
        ctx.beginPath(); //left arm
        ctx.moveTo(150, 150);
        ctx.lineTo(120, 175);
        ctx.stroke();
        ctx.beginPath(); //right leg
        ctx.moveTo(149, 203);
        ctx.lineTo(180, 245);
        ctx.stroke();
        ctx.beginPath(); //left leg
        ctx.moveTo(151, 203);
        ctx.lineTo(120, 245);
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.beginPath(); //left eye
        ctx.moveTo(140, 93);
        ctx.lineTo(146, 98);
        ctx.stroke();
        ctx.moveTo(140, 98);
        ctx.lineTo(146, 93);
        ctx.stroke();
        ctx.beginPath(); //right eye
        ctx.moveTo(154, 98);
        ctx.lineTo(160, 93);
        ctx.stroke();
        ctx.moveTo(154, 93);
        ctx.lineTo(160, 98);
        ctx.stroke();
    }
}

function gameOver() {
    numLosses++;
    setTimeout(function () {
        alert("GAME OVER\nThe correct word was:\n" + computerWord.toUpperCase());
    }, 0);
    gameReset();
}