/* VARIABLES */

// Creates an array that lists out all the possible computer words (Theme is Pirates).
var computerChoices = ['ahoy', 'avast', 'aye', 'hatches', 'batten', 'booty', 'broadside', 'buccaneer', 'corsair', 'cutlass', 'doubloons', 'galley', 'gangplank', 'hearties', 'heave', 'lassie', 'lookout', 'loot', 'landlubber', 'maroon', 'mutiny', 'privateer', 'savvy', 'sail', 'scuttle', 'seadog', 'spyglass', 'swab', 'argh'];
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
// Creates variable to hold the numerical number of wrong guesses (used in hangman drawing)
var numWrong = 0;
// Creates variable to hold valid user inputs (A-Z)
var validInputs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/* FUNCTIONS */

// Sets the initial wordDisplay variable with underscores for each letter in the computer's word
function setWordDashes() {
    for (var i = 0; i < computerWord.length; i++)
        wordDisplay.push('_');
}

// Updates wordDisplay with the user's correct guess
function updateWordDisplay() {
    for (var j = 0; j < computerWord.length; j++) {
        if (computerWord[j] === userGuess)
            wordDisplay[j] = computerWord[j];
    }
}

// Draws base drawing of Hangman display
function draw() {
    var ctx = document.getElementById("hangman").getContext('2d');
    ctx.fillStyle = "#048dd4";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#6E504A";
    ctx.fillRect(0, 0, 300, 300);
    //Side Bar left vertical line
    ctx.beginPath();
    ctx.moveTo(50, 300);
    ctx.lineTo(50, 55);
    ctx.stroke();
    //Side Bar right vertical line
    ctx.beginPath();
    ctx.moveTo(65, 300);
    ctx.lineTo(65, 55);
    ctx.stroke();
    //Tob bar top horizontal line
    ctx.beginPath();
    ctx.moveTo(49, 55);
    ctx.lineTo(175, 55);
    ctx.stroke();
    //Top bar bottom horizontal line
    ctx.beginPath();
    ctx.moveTo(49, 70);
    ctx.lineTo(175, 70);
    ctx.stroke();
    //Top Bar right vertical end line
    ctx.beginPath();
    ctx.moveTo(173, 55);
    ctx.lineTo(173, 70);
    ctx.stroke();
    //Ground line
    /*ctx.beginPath();
    ctx.moveTo(35, 300);  //h, v
    ctx.lineTo(265,300);
    ctx.stroke();*/
    //Noose line
    ctx.beginPath();
    ctx.moveTo(150, 70);
    ctx.lineTo(150, 110);
    ctx.stroke();
}

//Draws Hangman in Hangman Display based on # of wrong guesses
function hang() {
    var ctx = document.getElementById("hangman").getContext('2d');
    ctx.strokeStyle = "#000000";
    if (numWrong === 1) {
        //head
        ctx.beginPath();
        ctx.arc(150, 130, 20, 0, 2 * Math.PI);
        ctx.stroke();
        //left eye
        ctx.beginPath();
        ctx.arc(143, 125, 3.5, 0, 2 * Math.PI);
        ctx.stroke();
        //right eye
        ctx.beginPath();
        ctx.arc(157, 125, 3.5, 0, 2 * Math.PI);
        ctx.stroke();
        //mouth
        ctx.beginPath();
        ctx.arc(150, 133, 9, 0, Math.PI);
        ctx.stroke();
    }
    if (numWrong === 2) {
        //body
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.lineTo(150, 220);
        ctx.stroke();
    }
    if (numWrong === 3) {
        //cover mouth
        ctx.fillRect(138, 132, 24, 12);
        //straight mouth
        ctx.beginPath();
        ctx.moveTo(140, 138);
        ctx.lineTo(160, 138);
        ctx.stroke();
    }
    if (numWrong === 4) {
        //right arm
        ctx.beginPath();
        ctx.moveTo(150, 165);
        ctx.lineTo(180, 190);
        ctx.stroke();
    }
    if (numWrong === 5) {
        //left arm
        ctx.beginPath();
        ctx.moveTo(150, 165);
        ctx.lineTo(120, 190);
        ctx.stroke();
    }
    if (numWrong === 6) {
        //cover mouth
        ctx.fillRect(138, 132, 24, 12);
        //sad mouth
        ctx.beginPath();
        ctx.arc(150, 142, 9, 0, Math.PI, true);
        ctx.stroke();
    }
    if (numWrong === 7) {
        //right leg
        ctx.beginPath();
        ctx.moveTo(149, 218);
        ctx.lineTo(180, 290);
        ctx.stroke();
    }
    if (numWrong === 8) {
        //left leg
        ctx.beginPath();
        ctx.moveTo(151, 218);
        ctx.lineTo(120, 260);
        ctx.stroke();
    }
    //  9,10,11 are Work In Progress
}

// Resets the game, by generating a new computer word and resetting guess variables.
function gameReset() {
    computerWord = computerChoices[Math.floor(Math.random() * computerChoices.length)].toUpperCase();
    guessLeft = 12;
    incorrectGuesses = [];
    userGuess = '';
    wordDisplay = [];
    setWordDashes();
    numWrong = 0;
    draw();
}

// Sets up game for game over
function gameOver() {
    numLosses++;
    alert("GAME OVER\nThe correct word was:\n" + computerWord.toUpperCase());
    gameReset();
}

/* GAME LOGIC */

// Initialize first instance of game
gameReset();
document.querySelector('#numWins').innerHTML = "" + numWins;
document.querySelector('#numLosses').innerHTML = "" + numLosses;
document.querySelector('#guessLeft').innerHTML = "" + guessLeft;
document.querySelector('#wordDisplay').innerHTML = wordDisplay.join(" ");

// Check user guess when the user presses a key.
document.onkeyup = function (event) {
    // Determines which key was pressed.
    userGuess = event.key.toUpperCase();

    // Print user guess and computer word to console for debugging
    console.log(computerWord);
    console.log(userGuess);

    //
    if (validInputs.indexOf(userGuess) === -1) {
        alert("Invalid Input");
    }
    else if ((wordDisplay.indexOf(userGuess) === -1) && (incorrectGuesses.indexOf(userGuess) === -1)) {
        if (computerWord.indexOf(userGuess) > -1) {
            updateWordDisplay();
            if (wordDisplay.indexOf('_') === -1) {
                numWins++;
                alert("Aaargh! Good job Matey\n" + computerWord.toUpperCase() + "\nwas correct!");
                gameReset();
            }
        }
        else {
            guessLeft--;
            if (guessLeft > 0) {
                console.log(incorrectGuesses);
                incorrectGuesses.push(userGuess);
                numWrong++;
                hang();
            } else {
                gameOver();
            }
        }
    }
// Update HTML with variable values
    document.querySelector('#numWins').innerHTML = "" + numWins;
    document.querySelector('#numLosses').innerHTML = "" + numLosses;
    document.querySelector('#guessLeft').innerHTML = "" + guessLeft;
    document.querySelector('#incorrectGuesses').innerHTML = incorrectGuesses.join(" ");
    document.querySelector('#wordDisplay').innerHTML = wordDisplay.join(" ");
};

