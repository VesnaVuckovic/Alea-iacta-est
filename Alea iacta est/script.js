import Dice from './dice.js';
import {start, stop} from './playerStart.js';
import {chooseStartingPlayer} from './playerStart.js';
export let startingPlayer;

const diceModule = Dice ();

document.addEventListener ('DOMContentLoaded', function () {
  const rollDiceButton = document.getElementById ('rollDiceButton');
  const diceResult = document.getElementById ('diceResult');
  const player1Status = document.getElementById ('player1Status');
  const player2Status = document.getElementById ('player2Status');
  const startButton = document.getElementById ('startButton');
  const stopButton = document.getElementById ('stopButton');

  let currentPlayer = chooseStartingPlayer ();
  let startingPlayer = currentPlayer;
  let currentScore = 0;
  let totalScorePlayer1 = 0;
  let totalScorePlayer2 = 0;
  let isGameWon = false;
  let isRolling = false;

  const dice = Dice ();
  console.log ('Dice OK.');

  startButton.addEventListener ('click', function () {
    startingPlayer = chooseStartingPlayer ();
    start ();
  });

  stopButton.addEventListener ('click', function () {
    stop ();
  });

  rollDiceButton.addEventListener ('click', function () {
    if (currentPlayer && !isGameWon && !isRolling) {
      isRolling = true;
      const roll = dice.rollDice ();
      diceResult.style.display = 'block';
      playerChoiceDisplay.style.display = 'none';
      if (roll === 1) {
        currentScore = 0;
        updateCurrentScore ();
        isRolling = false;
        rollDiceButton.disabled = false;
      } else {
        if (roll !== 6) {
          currentScore += roll;
          updateCurrentScore ();
        }
        if (roll === 6) {
          addCurrentScoreToTotal ();
          currentScore = 0;
          updateCurrentScore ();
          switchPlayers ();
        } else if (
          totalScorePlayer1 + currentScore >= 101 ||
          totalScorePlayer2 + currentScore >= 101
        ) {
          addCurrentScoreToTotal ();
          endGame ();
        } else {
          isRolling = false;
          rollDiceButton.disabled = false;
        }
      }
    }
  });

  const collectButton1 = document.getElementById ('collectButton1');
  const collectButton2 = document.getElementById ('collectButton2');

  collectButton1.addEventListener ('click', function () {
    if (!isGameWon && !isRolling && currentScore > 0 && currentPlayer === 1) {
      addCurrentScoreToTotal ();
      currentScore = 0;
      updateCurrentScore ();
      updateTotalScore (1);
    }
  });

  collectButton2.addEventListener ('click', function () {
    if (!isGameWon && !isRolling && currentScore > 0 && currentPlayer === 2) {
      addCurrentScoreToTotal ();
      currentScore = 0;
      updateCurrentScore ();
      updateTotalScore (2);
    }
  });

  function updateTotalScore (player) {
    const totalScoreElement = player === 1
      ? document.getElementById ('player1TotalScore')
      : document.getElementById ('player2TotalScore');
    const totalScore = player === 1 ? totalScorePlayer1 : totalScorePlayer2;
    totalScoreElement.textContent = totalScore;
  }

  function updateCurrentScore () {
    const currentPlayerScoreElement = currentPlayer === 1
      ? document.getElementById ('player1CurrentScore')
      : document.getElementById ('player2CurrentScore');
    currentPlayerScoreElement.textContent = currentScore;
  }

  function addCurrentScoreToTotal () {
    if (currentPlayer === 1) {
      totalScorePlayer1 += currentScore;
      updateTotalScore (1);
    } else {
      totalScorePlayer2 += currentScore;
      updateTotalScore (2);
    }
  }

  function switchPlayers () {
    if (currentPlayer === 1) {
      currentPlayer = 2;
    } else {
      currentPlayer = 1;
    }
    updatePlayerStatus ();
    isRolling = false;
    rollDiceButton.disabled = false;
  }

  function endGame () {
    if (totalScorePlayer1 >= 101 || totalScorePlayer2 >= 101) {
      isGameWon = true;
      rollDiceButton.disabled = true;
      updatePlayerStatus ();
    } else {
      isRolling = false;
      rollDiceButton.disabled = false;
      updatePlayerStatus ();
    }
  }

  function updatePlayerStatus () {
    const player1Status = document.getElementById ('player1Status');
    const player2Status = document.getElementById ('player2Status');
    if (isGameWon) {
      player1Status.textContent = totalScorePlayer1 >= 101 ? 'Win!' : '';
      player2Status.textContent = totalScorePlayer2 >= 101 ? 'Win!' : '';
    } else {
      player1Status.textContent = currentPlayer === 1 ? 'Your turn!' : '';
      player2Status.textContent = currentPlayer === 2 ? 'Your turn!' : '';
    }
    console.log ('Status OK.');
  }
});
