const RPS_ARRAY = ['rock', 'paper', 'scissors'];

let score = {wins: 0, losses: 0, ties: 0};
let playCount = 0;
let computerSelection, computerSelector, playerSelection;

let rockSelector = document.querySelector('#rock-selector');
let paperSelector = document.querySelector('#paper-selector');
let scissorsSelector = document.querySelector('#scissors-selector');
let gameContainer = document.querySelector('#game-container');
let blankDiv = document.createElement('div');
blankDiv.style.width = "33%";

let selectors = {
		rock: rockSelector,
		paper: paperSelector,
		scissors: scissorsSelector
	}

computerSelect();

for(let selection in selectors){
	selectors[selection].addEventListener('click', 
						() => displaySelection(selection));
	selectors[selection].addEventListener('transitionend', 
						(e) => removeFaded(e.target));
	selectors[selection].addEventListener('transitionend', 
						(e) => displayComputerSelection(e));
}

function removeFaded(selector){
	if(selector.classList.contains("faded")) selector.style.width = "0px";
}

function computerSelect(){	
	computerSelection = computerPlay();
	computerSelector = selectors[computerSelection].cloneNode(true);
	computerSelector.classList.add("faded");
	computerSelector.addEventListener('transitionend',
					(e) => setTimeout(() => resolveGame(e.target), 300));
	computerSelector.addEventListener('transitionend',
					(e) => resetSelectors(e.target));
}

function resolveGame(computerSelector){
	if(computerSelector.classList.contains("faded")) return;
	playCount++;
	let playAgain = confirm(playRound(playerSelection, computerSelection));
	if(playAgain) fadeOut();
	if(playCount === 5) alertWinner();
}

function alertWinner(){
	let winnerMsg = (score['wins'] > score['losses']) ?
					'You win!\n' :
					'You lose!\n';
	alert(winnerMsg + 
		`Wins: ${score["wins"]}, Losses: ${score["losses"]}, Ties: ${score["ties"]}`);
	playCount = 0;	
}

function fadeOut(){
	let containerList = document.querySelectorAll('#game-container > div');
	for(let div of containerList) div.classList.add("faded");
}

function resetSelectors(computerSelector){
	if(!computerSelector.classList.contains("faded")) return;
	let containerList = document.querySelectorAll('#game-container > div');
	for(let div of containerList) gameContainer.removeChild(div);
	for(let selection in selectors){
		let selector = selectors[selection];
		selector.classList.add("faded");
		selector.style.width = "33%";
		gameContainer.appendChild(selector);	
	}
	setTimeout(() => {	
		for(let selection in selectors){
			selectors[selection].classList.remove("faded");
		}
	}, 0);
	computerSelect();
}

function displaySelection(selection){
	playerSelection = selection;
	for(let selector in selectors){
		if(selector === selection) continue;
		selectors[selector].classList.add("faded");
	}
}

function displayComputerSelection(transitionend){
	if(transitionend.propertyName !== "width") return;
	if(gameContainer.contains(blankDiv)) return;
	gameContainer.appendChild(blankDiv);
	gameContainer.appendChild(computerSelector);
	setTimeout(() => computerSelector.classList.remove("faded"), 0);//ensures fade-in transition happens
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