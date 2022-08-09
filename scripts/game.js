const options = ["Rock", "Paper", "Scissors"];
const gamePrompt = "> Paper, rock, scissors! Please, enter your choice:"
let computerSelection, userSelection;
let computerPoints = 0;
let userPoints = 0;
let round = 1;


function getComputerSelection() {
    let randomNum = Math.floor(Math.random() * 3);
    return options[randomNum].toLowerCase();
}


function getUserInput(e) {
    let choice = e.target.value;
    return choice;
}


function fightSelections() {   
    console.log(`computerSelection: ${computerSelection}`);
    console.log(`userSelection: ${userSelection}`);

    if (computerSelection === "rock" && userSelection === "scissors") {
        computerPoints++;
    } else if (computerSelection === "paper" && userSelection === "rock") {
        computerPoints++;
    } else if (computerSelection === "scissors" && userSelection === "paper") {
        computerPoints++;
    } else if (computerSelection === "scissors" && userSelection === "rock") {
        userPoints++;
    } else if (computerSelection === "rock" && userSelection === "paper") {
        userPoints++;
    } else if (computerSelection === "paper" && userSelection === "scissors") {
        userPoints++;
    } else {  
        console.log("Ups, that was a draw")
    }

    document.getElementById('input-1').remove()

    appendToHtml("p", `p2-${round}`, `computer: ${computerPoints} - ${userPoints} :user`, "game-box-content");
    round++;
}


function appendToHtml(type, id, content, parent) {
    let item = document.createElement(`${type}`);
    item.id = id;
    item.textContent = type === "input" ? null : content;
    document.getElementById(parent).appendChild(item)
}

function clearConsole() {
    document.getElementById("game-box-content").innerHTML = "";
}

function runGame() {
    clearConsole();
    

    appendToHtml("p", `p3-${round}`, `----------------------- ROUND ${round} ----------------------`, "game-box-content");
    appendToHtml("p", `p-${round}`, gamePrompt, "game-box-content");
    appendToHtml("input", "input-1", null, "game-box-content");



    // hook event to the input
    let currentInput = document.getElementById("input-1");
    currentInput.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
            userSelection = getUserInput(e);
            computerSelection = getComputerSelection();
            fightSelections();
            if(round < 6) {
                runGame();
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
