const RPS_ARRAY = ['rock', 'paper', 'scissors'];

function computerPlay(){
	return RPS_ARRAY[random0to2()];
}

function random0to2(){
	return Math.floor(3 * Math.random());
}

function playRound(playerSelection, computerSelection){
	let playerSelectionIndex = RPS_ARRAY.indexOf(playerSelection);
	let computerSelectionIndex = RPS_ARRAY.indexOf(computerSelection);
	if(playerSelection === computerSelection) return 'Tie!'
	else if(playerSelectionIndex === computerSelectionIndex + 1 % 3){
		return `You Win! ${capitalize(playerSelection)} beats ${computerSelection}.`;
	}
	else return `You Lose! ${capitalize(computerSelection)} beats ${playerSelection}.`;
}

function capitalize(string){
	return string[0].toUpperCase()+string.substring(1);
}

function game(){
	for(let i = 0; i < 5; i++){
		console.log(playRound(playerInput(), computerPlay()));
	}
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