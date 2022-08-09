const options = ["Rock", "Paper", "Scissors"];
let computerSelection, userSelection;
let computerPoints = 0;
let userPoints = 0;
let round = 1;

function getComputerSelection() {
    let randomNum = Math.floor(Math.random() * 3);
    return options[randomNum].toLowerCase();
}

function getUserInput() {
    return prompt(`Rock, paper, scicssors? - ROUND: ${round}`).toLowerCase();
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
}


function printChampion() {
    if(computerPoints > userPoints) {
        console.log("---> Computer won!!")
    } else {
        console.log("---> User won!!")
    }
}

/*
for(var i = 0; i < 5; i++) {
    computerSelection = getComputerSelection();
    userSelection = getUserInput();
    fightSelections();
    console.log(`computer: ${computerPoints} - ${userPoints} :user`);
    console.log("-------------------------------------------------");
    round++;
}

printChampion();
*/
