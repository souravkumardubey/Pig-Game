'use strict';

const player_0 = document.querySelector('.player--0');
const player_1 = document.querySelector('.player--1');
const activeClass = 'player--active';
const p0_Score = document.getElementById('score--0');
const p1_Score = document.getElementById('score--1');
const p0_currScore = document.getElementById('current--0');
const p1_currScore = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const scores = [0, 0];
let currScore_p0 = 0,
  currScore_p1 = 0,
  player = 0,
  currScore = 0;

const init = function () {
  p0_Score.textContent = 0;
  p1_Score.textContent = 0;
  p0_currScore.textContent = 0;
  p1_currScore.textContent = 0;
  currScore_p0 = 0;
  currScore_p1 = 0;
  player = 0;
  currScore = 0;
  scores[0] = scores[1] = 0;

  p0_Score.textContent = 0;
  p1_Score.textContent = 0;

  dice.classList.add('hidden');
};

init();

// roll action

const updateScore = function (player, diceResult) {
  currScore += diceResult;
  console.log(player);
  document.getElementById(`current--${player}`).textContent = currScore;
};

const switchPlayer = function () {
  document.getElementById(`current--${player}`).textContent = 0;
  player_0.classList.toggle(activeClass);
  player_1.classList.toggle(activeClass);
  currScore = 0;
  player ^= 1;
};

btnRoll.addEventListener('click', function () {
  // generating a random dice roll
  const diceResult = Math.trunc(Math.random() * 6) + 1;

  // display dice
  dice.classList.remove('hidden');
  dice.src = `dice-${diceResult}.png`;

  // checking if the diceResult is 1, if yes switch player
  if (diceResult !== 1) {
    // add dice to curr score
    updateScore(player, diceResult);
  } else {
    // switch player
    switchPlayer();
  }
});

const updateTotalScore = function (player) {
  scores[player] += currScore;
  document.getElementById(`score--${player}`).textContent = scores[player];
};

const disableBtn = function (decision) {
  btnRoll.disabled = decision;
  btnHold.disabled = decision;
  if (decision) {
    btnRoll.style.cursor = 'default';
    btnHold.style.cursor = 'default';
  } else {
    btnRoll.style.cursor = 'pointer';
    btnHold.style.cursor = 'pointer';
  }
};

btnHold.addEventListener('click', function () {
  updateTotalScore(player);
  if (scores[player] >= 20) {
    document
      .querySelector(`.player--${player}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${player}`)
      .classList.remove('player--active');
    disableBtn(true);
    dice.classList.add('hidden');
  } else switchPlayer();
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${player}`)
    .classList.remove('player--winner');
  disableBtn(false);
  dice.classList.add('hidden');
  player = 0;
  document.querySelector(`.player--${1}`).classList.remove('player--active');
  document.querySelector(`.player--${0}`).classList.add('player--active');
  init();
});
