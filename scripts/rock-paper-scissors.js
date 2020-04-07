const RPS_ARRAY = ['rock', 'paper', 'scissors'];

let score = {wins: 0, losses: 0, ties: 0};

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
	else if(playerSelectionIndex === computerSelectionIndex + 1 % 3){
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

function playerInput(){
	let playerSelection = prompt('Chose Rock, Paper, or Scissors').toLowerCase();
	return (
		RPS_ARRAY.find(choice => choice === playerSelection) || 
		alert('Invalid Choice') || 
		playerInput()
		); 
}

game();