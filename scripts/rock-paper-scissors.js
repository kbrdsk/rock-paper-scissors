const RPS_ARRAY = ['rock', 'paper', 'scissors'];

let score = {wins: 0, losses: 0, ties: 0};

let rockSelector = document.querySelector('#rock-selector');
let paperSelector = document.querySelector('#paper-selector');
let scissorsSelector = document.querySelector('#scissors-selector');
let gameContainer = document.querySelector('#game-container');

let selectors = {
		rock: rockSelector,
		paper: paperSelector,
		scissors: scissorsSelector
	}

rockSelector.addEventListener('click', () => play('rock'));
paperSelector.addEventListener('click', () => play('paper'));
scissorsSelector.addEventListener('click', () => play('scissors'));


function play(selection){
	let computerSelection = computerPlay();
	let computerSelector = selectors[computerSelection].cloneNode(true);
	displaySelection(selection);
	displayComputerSelection(computerSelector);
	setTimeout(() => resolveGame(selection, computerSelection), 750);
}

function resolveGame(playerSelection, computerSelection){
	let playAgain = confirm(playRound(playerSelection, computerSelection));
	if(playAgain){
		let containerList = document.querySelectorAll('#game-container > div');
		for(let div of containerList) gameContainer.removeChild(div);
		for(let selector in selectors){
			gameContainer.appendChild(selectors[selector]);		
			selectors[selector].hidden = false;
		} 
	}
}

function displaySelection(selection){
	for(let selector in selectors){
		if(selector === selection) continue;
		selectors[selector].hidden = true;
	}
}

function displayComputerSelection(computerSelector){
	let blankDiv = document.createElement('div');
	gameContainer.appendChild(blankDiv);
	gameContainer.appendChild(computerSelector);

}


function computerPlay(){
	return RPS_ARRAY[random0to2()];
}

function random0to2(){
	return Math.floor(3 * Math.random());
}

function playRound(playerSelection, computerSelection){
	let playerSelectionIndex = RPS_ARRAY.indexOf(playerSelection);
	let computerSelectionIndex = RPS_ARRAY.indexOf(computerSelection);
	if(playerSelection === computerSelection){
		score["ties"]++;
		return 'Tie!'
	} 
	else if(playerSelectionIndex === (computerSelectionIndex + 1) % 3){
		score["wins"]++;
		return `You Win! ${capitalize(playerSelection)} beats ${computerSelection}.`;
	}
	else{
		score["losses"]++;
		return `You Lose! ${capitalize(computerSelection)} beats ${playerSelection}.`;
	} 
}

function capitalize(string){
	return string[0].toUpperCase()+string.substring(1);
}

function game(){
	for(let i = 0; i < 5; i++){
		alert(playRound(playerInput(), computerPlay()));
	}
	alert(`Wins: ${score["wins"]}, Losses: ${score["losses"]}, Ties: ${score["ties"]}`);
}