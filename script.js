const cards = document.querySelectorAll('.memory-card');

let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


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
}

function checkMatch() {
  return firstCard.dataset.framework === secondCard.dataset.framework ? matchFound() : noMatch();
}

function matchFound() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function noMatch() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}())

cards.forEach(card => card.addEventListener('click', flipCard));