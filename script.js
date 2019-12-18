
const fetch = require("node-fetch");

const moves = {
  'scissors': 'rock',
  'paper': 'scissors',
  'rock': 'paper',
}

const computerPlays = {
  'scissors': 0,
  'paper': 0,
  'rock': 0,
}

init();

async function init() {
  const preferred = await startGame();
  play();
}

async function startGame() {
  const response = await fetch('http://the-rock-paper-scissors.herokuapp.com/newgame');
}

function pickBestCounter() {
  if (computerPlays.scissors >= computerPlays.paper && computerPlays.scissors >= computerPlays.rock) {
    return moves.scissors;
  }
  else if (computerPlays.paper >= computerPlays.scissors && computerPlays.paper >= computerPlays.rock) {
    return moves.paper;
  }
  else if (computerPlays.rock >= computerPlays.paper && computerPlays.rock >= computerPlays.scissors) {
    return moves.rock;
  }
}

async function play() {
  computerScore = 0;
  score = 0;

  console.log('You : Computer')
  while(score < 20 && computerScore < 20) {
    const counter = pickBestCounter();
    const response = await fetch(`http://the-rock-paper-scissors.herokuapp.com?move=${counter}`);
    const text = await response.text();

    if (text === '1') {
      score += 1;
      computerPlays[moves[counter]] += 1;
    } else if (text === '0') {
      computerPlays[counter] += 1;
    } else if (text === '-1') {
      computerScore += 1;
      computerPlays[moves[counter]] += 1;
    }
    console.log(`${score} : ${computerScore}`);
  }
  if (score > computerScore) {
    console.log("You won !");
  } else {
    console.log("You loose !");
  }
}
