
const score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0};
updateScoreElement();

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  
  let computerMove = undefined;

  if (randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }
  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      getResult(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

const rockButton = document.querySelector('.js-rock-button');
rockButton.addEventListener('click', () => {
  getResult('rock');
});

const paperButton = document.querySelector('.js-paper-button');
paperButton.addEventListener('click', () => {
  getResult('paper');
});

const scissorsButton = document.querySelector('.js-scissors-button');
scissorsButton.addEventListener('click', () => {
  getResult('scissors')
})

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    getResult('rock');
  } else if (event.key === 'p') {
    getResult('paper');
  } else if (event.key === 's') {
    getResult('scissors');
  }
});

function getResult(playerMove) {
  
  const computerMove = pickComputerMove();
  let result = undefined;

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else {
      result = 'You win.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else {
      result = 'You lose.';
    }
    
  } else {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else {
    result = 'Tie.';
    }
  }

  if (result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`
}