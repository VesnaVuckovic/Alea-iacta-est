import Dice from './dice.js';
const diceModule = Dice();
document.getElementById('rollDiceButton').addEventListener('click', diceModule.rollDice);

let currentPlayer = 1;
let currentScore = 0;
let totalScorePlayer1 = 0;
let totalScorePlayer2 = 0;

function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    updateDice(roll);
    
    if (roll === 1) {
      currentScore = 0;
      updateCurrentScore(currentScore);
      switchPlayers();
    } else if (roll === 6) {
      if (currentPlayer === 1) {
        totalScorePlayer1 += currentScore;
        updateTotalScore(1, totalScorePlayer1);
      } else {
        totalScorePlayer2 += currentScore;
        updateTotalScore(2, totalScorePlayer2);
      }
      currentScore = 0;
      updateCurrentScore(currentScore);
      switchPlayers();
    } else {
      currentScore += roll;
      updateCurrentScore(currentScore);
    }
}

function updateDice(roll) {
    const diceResultElement = document.getElementById("diceResult"); 
    diceResultElement.textContent = `Current roll: ${roll}`; 
}


function updateCurrentScore(score) {
    const currentPlayerScoreElement = document.getElementById(`player${currentPlayer}CurrentScore`);
    currentPlayerScoreElement.textContent = ` ${score}`;
}

  
function updatePlayerStatus(player) {
    document.getElementById(`player${player}Status`).innerText = "PLAYING";
}
  
function switchPlayers() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updatePlayerStatus(currentPlayer);
}
  
function endGame(winner) {
    alert(`Player ${winner} wins!`);    
}
  
document.getElementById("rollDiceButton").addEventListener("click", rollDice);