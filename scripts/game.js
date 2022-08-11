const options = ["rock", "paper", "scissors"];
const contratsText = ["Fantastic win!", "You won!", "Congrats!"];
const lossText = ["Bummer, try again", "You lost!", "Computer gets the point!"];
const drawText = "It's a tie!";
const gamePrompt = "> Rock, paper, scissors! Please, enter your choice:";
const errorMessage = "Please, type 'rock', 'paper' or 'scissor and hit enter";
let computerSelection, userSelection;
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
    console.log(`computerSelection: ${computerSelection}`);
    console.log(`userSelection: ${userSelection}`);

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

function manageScore() {
    changeText("computer-points", computerPoints);
    changeText("user-points",userPoints);

    if (pointsWinner === "user") {
        printWarning("user");
        flashScore("user-points", "highlight");
        flashScore("show-winner-scores-board-all", "blue-background");
    } else if(pointsWinner === "computer") {
        printWarning("computer");
        flashScore("computer-points", "highlight");
        flashScore("show-winner-scores-board-all", "red-background");
    } else {
        printWarning("draw");
        flashScore("scores-board-all", "highlight-all");
        flashScore("show-winner-scores-board-all", "orange-background");
    }
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

function validateUserInput(userSelection) {
    return options.indexOf(userSelection.toLowerCase()) > -1;
}

function addClass(id, className) {
    document.getElementById(id).classList.add(className);
}

function removeClass(id, className) {
    document.getElementById(id).classList.remove(className);
}

function delayAction(player, ms, action, icon) {
    setTimeout(() => {
        if(action === "changeIcon"){
            changeIcon(player, icon);
        }
    }, ms);
}

function changeIcon(player, icon) {
    document.getElementById(`flash-winner-box-${player}`).src = `./img/${icon}.png`;
}
 
function runGame() {
    
    let currentInput = document.getElementById("input-1");
    currentInput.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  //checks whether the pressed key is "Enter"

            userSelection = getUserInput(e);
            computerSelection = getComputerSelection();

            if(validateUserInput(userSelection)) {
                changeIcon("user", userSelection);
                changeIcon("computer", computerSelection);

                delayAction("computer",4000, "changeIcon", "question-mark");
                delayAction("user",4000, "changeIcon", "question-mark");

                faceOpponentCards();
            } else {
                printWarning("error");
            }
        }
    });
}

runGame();
