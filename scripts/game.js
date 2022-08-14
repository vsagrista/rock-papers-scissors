const options = ["rock", "paper", "scissors"];
const contratsText = ["Fantastic win!", "You won!", "Congrats!"];
const lossText = ["Bummer, try again", "You lost!", "Computer gets the point!"];
const drawText = "It's a tie!";
const gamePrompt = "> Rock, paper, scissors! Please, enter your choice:";
const errorMessage = "Please, type 'rock', 'paper' or 'scissor and hit enter";
let computerSelection, userSelection, audio;
let computerPoints = 0;
let userPoints = 0;
let pointsWinner = "";
let round = 1;


function getComputerSelection() {
    let randomNum = Math.floor(Math.random() * 3);
    return options[randomNum];
}

function getUserInput(e) {
    let choice = e.target.value;
    return choice;
}

function faceOpponentCards() {   

    if (computerSelection === "rock" && userSelection === "scissors") {
        pointsWinner = "computer";
        computerPoints++;
    } else if (computerSelection === "paper" && userSelection === "rock") {
        pointsWinner = "computer";
        computerPoints++;
    } else if (computerSelection === "scissors" && userSelection === "paper") {
        pointsWinner = "computer";
        computerPoints++;
    } else if (computerSelection === "scissors" && userSelection === "rock") {
        pointsWinner = "user";
        userPoints++;
    } else if (computerSelection === "rock" && userSelection === "paper") {
        pointsWinner = "user";
        userPoints++;
    } else if (computerSelection === "paper" && userSelection === "scissors") {
        pointsWinner = "user";
        userPoints++;
    } else {  
        pointsWinner = ""
        console.log("Ups, that was a draw")
    }

    round++;
    manageScore();
    changeText("current-round", round);
}

function printWarning(result) {
    let randomNum = Math.floor(Math.random() * 3);
    if(result === "user") {
        changeText("print-text", contratsText[randomNum]);
    } else if(result === "computer") {
        changeText("print-text", lossText[randomNum]);
    } else if(result === "error") {
        changeText("print-text", errorMessage);
    } else {
        changeText("print-text", drawText);
    }
}

function playAudio(type) {
    if(audio) {
        audio.pause();
    }
    audio = new Audio(`./sounds/${type}-1.mp3`);
    audio.play();
}

function manageScore() {
    changeText("computer-points", computerPoints);
    changeText("user-points",userPoints);

    if (pointsWinner === "user") {
        printWarning("user");
        flashScore(`action-button-${userSelection}`, "highlight-blue");
        flashScore("user-points", "highlight-blue");
        flashScore("show-winner-scores-board-all", "blue-background");
        flashScore("print-text", "blue-background");
        playAudio("win");
    } else if(pointsWinner === "computer") {
        printWarning("computer");
        flashScore(`action-button-${userSelection}`, "highlight-red");
        flashScore("computer-points", "highlight-red");
        flashScore("show-winner-scores-board-all", "red-background");
        flashScore("print-text", "red-background");
        playAudio("fail");
    } else {
        printWarning("draw");
        flashScore("scores-board-all", "highlight-all");
        flashScore("show-winner-scores-board-all", "orange-background");
        flashScore("print-text", "orange-background");
        playAudio("draw");
    }
}

function stopAllAudio(){
	allAudios.forEach(function(audio){
		audio.pause();
	});
}

function flashScore(itemToHighlight, className) {
    document.getElementById(itemToHighlight).classList.add(className);
   
    setTimeout(() => {
        document.getElementById(itemToHighlight).classList.remove(className);
    }, 1000);
}

function changeText(id, text) {
    document.getElementById(id).textContent = text;
}

function changeIcon(player, icon) {
    document.getElementById(`flash-winner-box-${player}`).src = `./img/${icon}.png`;
}

function getPlayersCards() {

    userSelection = this.value;
    computerSelection = getComputerSelection();

    changeIcon("user", userSelection);
    changeIcon("computer", computerSelection);

    faceOpponentCards();
}
 
function runGame() {
    
    document.getElementById("action-button-rock").addEventListener("click", getPlayersCards);
    document.getElementById("action-button-paper").addEventListener("click", getPlayersCards);
    document.getElementById("action-button-scissors").addEventListener("click", getPlayersCards);
}

runGame();