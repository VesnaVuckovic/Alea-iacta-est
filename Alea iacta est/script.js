import Dice from './dice.js';

const diceModule = Dice ();

document.addEventListener ('DOMContentLoaded', function () { // Wait for DOM content to be loaded
  const player1Panel = document.getElementById ('player1Panel'); // Get DOM elements
  const player2Panel = document.getElementById ('player2Panel');
  const rollDiceButton = document.getElementById ('rollDiceButton');
  const diceResult = document.getElementById ('diceResult');
  const player1Status = document.getElementById ('player1Status');
  const player2Status = document.getElementById ('player2Status');
  const winnerDisplay = document.getElementById ('winnerDisplay');

  // Initialize game variables
  let currentPlayer = 1;
  let currentScore = 0;
  let totalScorePlayer1 = 0;
  let totalScorePlayer2 = 0;
  let isGameWon = false;
  let isRolling = false;

  const dice = Dice (); // Initialize the dice object

  updatePlayerStatus ();

  rollDiceButton.addEventListener ('click', function () {// Event listener for roll dice button click
    if (!isGameWon && !isRolling) {
      isRolling = true;
      rollDiceButton.disabled = true;
      const roll = dice.rollDice ();
      diceResult.style.display = 'block'; 
      if (roll === 1) {
        currentScore = 0;
        updateCurrentScore ();
        isRolling = false;
        rollDiceButton.disabled = false;
      } else {
        currentScore += roll;
        updateCurrentScore ();
        if (roll === 6) {
          addCurrentScoreToTotal ();
          currentScore = 0;
          updateCurrentScore ();
          switchPlayers ();
        } else if (
          totalScorePlayer1 + currentScore >= 101 || totalScorePlayer2 + currentScore >= 101
        ) {
          endGame ();
        } else {
          isRolling = false;
          rollDiceButton.disabled = false;
        }
      }
    }
  });

  function updateCurrentScore () {// Function to update current score display
    const currentPlayerScoreElement = currentPlayer === 1
      ? document.getElementById ('player1CurrentScore')
      : document.getElementById ('player2CurrentScore');
    currentPlayerScoreElement.textContent = currentScore;
  }

  function updateTotalScore (player) {// Function to update total score display
    const totalScoreElement = player === 1
      ? document.getElementById ('player1TotalScore')
      : document.getElementById ('player2TotalScore');
    const totalScore = player === 1 ? totalScorePlayer1 : totalScorePlayer2;
    totalScoreElement.textContent = totalScore;
  }

  function addCurrentScoreToTotal () {// Function to add current score to total score
    if (currentPlayer === 1) {
      totalScorePlayer1 += currentScore;
      updateTotalScore (1);
    } else {
      totalScorePlayer2 += currentScore;
      updateTotalScore (2);
    }
  }

  function switchPlayers () {// Function to switch players
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updatePlayerStatus ();
    isRolling = false;
    rollDiceButton.disabled = false;
  }

  function endGame() {// Function to end the game
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

  function updatePlayerStatus () {// Function to update player status display
    const player1Status = document.getElementById ('player1Status');
    const player2Status = document.getElementById ('player2Status');
    if (isGameWon) {
      player1Status.textContent = totalScorePlayer1 >= 101 ? 'Win!' : '';
      player2Status.textContent = totalScorePlayer2 >= 101 ? 'Win!' : '';
    } else {
      player1Status.textContent = currentPlayer === 1 ? 'Your turn!' : '';
      player2Status.textContent = currentPlayer === 2 ? 'Your turn!' : '';
    }
  }
});
