const cards = document.querySelectorAll('.game-cards');
const winScreen = document.getElementById('win-screen');
const startScreen = document.getElementById('start-screen');
const startGame = document.getElementById('start-game');
const loseScreen = document.getElementById('lose-screen');
const lifes = document.getElementById('lifes');
const gameBoard = document.getElementById('game-board');
const loseMessage = document.getElementById('lose-message');
const restartGame = document.getElementById('restart-game');
const playAgain = document.getElementById('play-again');
const gameInfo = document.getElementById('game-info');
const gameTitle = document.getElementById('game-title');
const winMessage = document.getElementById('win-message');

// START GAME FUNCTION
startGame.addEventListener('click', function() {
  startScreen.style.display = 'none';
  gameTitle.style.display = 'flex';
  gameInfo.style.display = 'flex';
  gameBoard.style.display = 'flex';
});

// TIMER FUNCTION
let timer;
let minutes = 3;
let seconds = 0;
var isRunning = false;

function formatTime(time) {
  return (time < 10  ? "0" : "") + time;
};

startGame.addEventListener('click', startTimer);

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
  }

  if (minutes == 0 & seconds == 0) {
    document.getElementById('timer').innerText = formatTime(minutes) + ':' + formatTime(seconds);
    timeUp();
  }
};

function updateTimer() {
  seconds--;
  if (seconds < 0) {
    minutes--;
    seconds = 59;
  }

  if (minutes < 0) {
    minutes = 0;
    seconds = 59;
  }

  document.getElementById('timer').innerText = formatTime(minutes) + ':' + formatTime(seconds);
  timeUp();
};

function timeUp() {
  if (seconds == 0 && minutes == 0) {
    clearInterval(timer);
    isRunning = false;
    gameOver();
  }
};


// FLIP CARD FUNCTION
let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

cards.forEach(card => card.addEventListener('click', flipCard));cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
    return;
  }
    secondCard = this;
    checkMatch();
};

// CHECK MATCH FUNCTION
function checkMatch() {
  return firstCard.dataset.framework === secondCard.dataset.framework ? matchFound() : noMatch();
};

function matchFound() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
  checkWin();
};

function noMatch() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    loseLife();
    resetBoard();
  }, 1500);
};

function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};



// LIFE FUNCTION
let array = [
  'images/Mushroom - 1-Up.png',
  'images/Mushroom - 1-Up.png',
  'images/Mushroom - 1-Up.png',
  'images/Mushroom - 1-Up.png',
  'images/Mushroom - 1-Up.png',
];

function lifeNum() {
  lifes.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    let img = document.createElement('img');
    img.className = 'lives-left';
    img.src = array[i];
    lifes.appendChild(img);
  }
};

lifeNum();

function loseLife() {
  array.pop();
  lifeNum();
  if (array.length === 0) {
  gameOver();
  }
};


// WIN GAME FUNCTION
function checkWin() {
  const cards = document.querySelectorAll('.game-cards');
  const allFlipped = Array.from(cards).every(card => card.classList.contains('flip'));
  if (allFlipped) {
    winGame();
  }
};

function winGame() {
  winScreen.style.display = 'flex';
  gameBoard.style.display = 'none';
  startScreen.style.display = 'none';
  gameInfo.style.display = 'none';
  gameTitle.style.display = 'none';
  winGameMsg();
};

function winGameMsg() {
  setTimeout(() => {
    winMessage.style.display = 'flex';
  }, 5000);
  playAgn();
};

function playAgn() {
  playAgain.addEventListener('click', function() {
    location.reload();
  });
};


// LOSE GAME FUNCTION
function gameOver() {
  loseScreen.style.display = 'flex';
  gameBoard.style.display = 'none';
  startScreen.style.display = 'none';
  gameInfo.style.display = 'none';
  gameTitle.style.display = 'none';
  stopTimer();
  endGameMsg();
};

function endGameMsg() {
  setTimeout(() => {
    loseMessage.style.display = 'flex';
  }, 3500);
  newGame();
};

function newGame() {
  restartGame.addEventListener('click', function() {
    location.reload();
  });
};

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
};

// SHUFFLE DECK FUNCTION
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}());

winGame();
