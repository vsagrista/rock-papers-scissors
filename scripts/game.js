const options = ["rock", "paper", "scissors"];
const gamePrompt = "> Rock, paper, scissors! Please, enter your choice:"
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


function fightSelections() {   
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

    clearContent("input-1");
    updateScore();
    round++;
    changeText("round-number", round);
}

function updateScore() {
    changeText("computerPoints", computerPoints);
    changeText("userPoints",userPoints);

    if(pointsWinner === "computer") {
        flashScore("computerPoints", "highlight");
    } else if (pointsWinner === "user") {
        flashScore("userPoints", "highlight");
    } else {
        flashScore("scores-board-inner", "highlight-all");
    }
}

function changeText(id, text) {
    document.getElementById(id).textContent = text;
}

function flashScore(itemToHighlight, className) {
    document.getElementById(itemToHighlight).classList.add(className);
   
    setTimeout(() => {
        document.getElementById(itemToHighlight).classList.remove(className);
    }, 1000);
}


// refactor this
function printSuggestion() {
    if(document.getElementById('error-msg')) {
        document.getElementById('error-msg').remove();
    }
    appendToHtml("p", `error-msg`, `Please, type 'rock', 'paper' or 'scissors'`, "game-box-content");
}


function appendToHtml(type, id, content, parent) {
    let item = document.createElement(`${type}`);
    item.id = id;
    item.textContent = type === "input" ? null : content;
    document.getElementById(parent).appendChild(item)
}

function clearContent(id) {
    document.getElementById(id).innerHTML = "";
}

function validateUserInput(userSelection) {
    return options.indexOf(userSelection.toLowerCase()) > -1;
}

// refactor this
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

// manageGameFlow

 
function runGame() {
    
    // hook event to the input
    let currentInput = document.getElementById("input-1");
    currentInput.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
            userSelection = getUserInput(e);
            computerSelection = getComputerSelection();

            changeIcon("user", userSelection);
            delayAction("computer",1000, "changeIcon", computerSelection);
            delayAction("computer",3000, "changeIcon", "question-mark");
        

            
            if(validateUserInput(userSelection)) {
                    fightSelections();
                    if(round < 6) {
                        runGame();
                    } else {
                        clearContent("game-box-content");
                        printChampion();
                    }
            } else {
                printSuggestion();
            }
        }
    });
}

function printChampion() {
    if(computerPoints > userPoints) {
        console.log("---> Computer won!!")
    } else {
        console.log("---> User won!!")
    }
}

runGame();
