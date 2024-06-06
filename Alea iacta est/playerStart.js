let startRollInterval;
let currentPlayerChoice = 1;

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
