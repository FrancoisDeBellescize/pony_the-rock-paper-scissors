
const fetch = require("node-fetch");

const moves = {
  'scissors': 'rock',
  'paper': 'scissors',
  'rock': 'paper',
}

init();

async function init() {
  const preferred = await startGame();
  play(preferred);
}

async function startGame() {
  const response = await fetch('http://the-rock-paper-scissors.herokuapp.com/newgame');
  const text = await response.text();
  return text;
}

async function play(preferred) {
  computerScore = 0;
  score = 0;

  const counter = moves[preferred];
  console.log('You : Computer')
  while(score < 20 && computerScore < 20) {
    const response = await fetch(`http://the-rock-paper-scissors.herokuapp.com?move=${counter}`);
    const text = await response.text();

    if (text === '1') {
      score += 1;
    } else if (text === '-1') {
      computerScore += 1;
    }
    console.log(`${score} : ${computerScore}`);
  }
  console.log(score);
}
