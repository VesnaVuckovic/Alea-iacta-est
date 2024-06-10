let startRollInterval;
let currentPlayerChoice = 1;
let currentScore = 0;
let totalScorePlayer1 = 0;
let totalScorePlayer2 = 0;
let isGameWon = false;

export function chooseStartingPlayer() {
  return Math.floor(Math.random() * 2) + 1;
}

export function start(startButton, playerChoiceDisplay) {
  startButton.style.display = 'none';
  playerChoiceDisplay.style.display = 'block';

  currentPlayerChoice = 1;
  playerChoiceDisplay.textContent = `Player ${currentPlayerChoice} plays first.`;
  startRollInterval = setInterval(() => {
    currentPlayerChoice = currentPlayerChoice === 1 ? 2 : 1;
    playerChoiceDisplay.textContent = `Player ${currentPlayerChoice} plays first.`;
  }, 100);
}

export function stop(playerChoiceDisplay, rollDiceButton, diceContainer, stopButton) {
  clearInterval(startRollInterval);
  stopButton.style.display = 'none';
  rollDiceButton.style.display = 'block';
  diceContainer.style.display = 'flex';
  playerChoiceDisplay.style.display = 'block';
  return currentPlayerChoice;
}

export function playAgain() {
  currentScore = 0;
  totalScorePlayer1 = 0;
  totalScorePlayer2 = 0;
  isGameWon = false; 
}