// script.js

import { start, stop } from './playerStart.js';
import { Dice } from './dice.js';

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');
  const playerChoiceDisplay = document.getElementById('playerChoiceDisplay');
  const rollDiceButton = document.getElementById('rollDiceButton');
  const diceContainer = document.getElementById('diceContainer');
  const diceResultDisplay = document.getElementById('diceResult');
  const collectButton1 = document.getElementById('collectButton1');
  const collectButton2 = document.getElementById('collectButton2');
  const player1Status = document.getElementById('player1Status');
  const player2Status = document.getElementById('player2Status');

  let startingPlayer;
  let currentPlayer;
  let currentScore = 0;
  let totalScorePlayer1 = 0;
  let totalScorePlayer2 = 0;
  let isGameWon = false;
  let isRolling = false;

  diceContainer.style.display = 'none';
  rollDiceButton.style.display = 'none';
  diceResultDisplay.style.display = 'none';

  startButton.addEventListener('click', function () {
    start(startButton, playerChoiceDisplay);
    stopButton.style.display = 'block';
  });

  stopButton.addEventListener('click', function () {
    startingPlayer = stop(playerChoiceDisplay, rollDiceButton, diceContainer, stopButton);
    playerChoiceDisplay.textContent = `Player ${startingPlayer} plays first.`;
    currentPlayer = startingPlayer;
    updatePlayerStatus();
  });

  rollDiceButton.addEventListener('click', function () {
    if (currentPlayer && !isGameWon && !isRolling) {
      isRolling = true;
      const dice = Dice();
      const roll = dice.rollDice();      
      diceResultDisplay.style.display = 'block';
      playerChoiceDisplay.style.display = 'none';

      if (roll === 1) {
        currentScore = 0;
        updateCurrentScore();
        isRolling = false;
        rollDiceButton.disabled = false;
      } else {
        if (roll !== 6) {
          currentScore += roll;
          updateCurrentScore();
        }
        if (roll === 6) {
          addCurrentScoreToTotal();
          currentScore = 0;
          updateCurrentScore();
          switchPlayers();
        } else if (totalScorePlayer1 + currentScore >= 101 || totalScorePlayer2 + currentScore >= 101) {
          addCurrentScoreToTotal();
          endGame();
        } else {
          isRolling = false;
          rollDiceButton.disabled = false;
        }
      }
    }
  });

  collectButton1.addEventListener('click', function () {
    if (!isGameWon && !isRolling && currentScore > 0 && currentPlayer === 1) {
      addCurrentScoreToTotal();
      currentScore = 0;
      updateCurrentScore();
      updateTotalScore(1);          
    }
  });

  collectButton2.addEventListener('click', function () {
    if (!isGameWon && !isRolling && currentScore > 0 && currentPlayer === 2) {
      addCurrentScoreToTotal();
      currentScore = 0;
      updateCurrentScore();
      updateTotalScore(2);      
    }
  });

  function updateTotalScore(player) {
    const totalScoreElement = player === 1
      ? document.getElementById('player1TotalScore')
      : document.getElementById('player2TotalScore');
    const totalScore = player === 1 ? totalScorePlayer1 : totalScorePlayer2;
    totalScoreElement.textContent = totalScore;
  }

  function updateCurrentScore() {
    const currentPlayerScoreElement = currentPlayer === 1
      ? document.getElementById('player1CurrentScore')
      : document.getElementById('player2CurrentScore');
    currentPlayerScoreElement.textContent = currentScore;
  }

  function addCurrentScoreToTotal() {
    if (currentPlayer === 1) {
      totalScorePlayer1 += currentScore;
      updateTotalScore(1);
    } else {
      totalScorePlayer2 += currentScore;
      updateTotalScore(2);
    }
  }

  function switchPlayers() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updatePlayerStatus();
    isRolling = false;
    rollDiceButton.disabled = false;
  }

  function endGame() {
    if (totalScorePlayer1 >= 101 || totalScorePlayer2 >= 101) {
      isGameWon = true;
      rollDiceButton.disabled = true;
      updatePlayerStatus();
    } else {
      isRolling = false;
      rollDiceButton.disabled = false;
      updatePlayerStatus();
    }
  }

  function updatePlayerStatus() {
    if (isGameWon) {
      player1Status.textContent = totalScorePlayer1 >= 101 ? 'Win!' : '';
      player2Status.textContent = totalScorePlayer2 >= 101 ? 'Win!' : '';
    } else {
      player1Status.textContent = currentPlayer === 1 ? 'Your turn!' : '';
      player2Status.textContent = currentPlayer === 2 ? 'Your turn!' : '';
    }
    console.log('Status OK.');
  }
});
