let startRollInterval;
const diceContainer = document.getElementById ('diceContainer');

export function chooseStartingPlayer () {
  return Math.floor (Math.random () * 2) + 1;
}

diceContainer.style.display = 'none';

export function start () {
  console.log ('Start ON.');
  startButton.style.display = 'none';
  playerChoiceDisplay.id = 'playerChoiceDisplay';
  document.body.appendChild (playerChoiceDisplay);
  let currentPlayerChoice = 1;
  startRollInterval = setInterval (() => {
    playerChoiceDisplay.textContent = currentPlayerChoice;
    currentPlayerChoice = currentPlayerChoice === 1 ? 2 : 1;
  }, 1);
}
export function stop () {
  console.log ('Click ON.');
  clearInterval (startRollInterval);
  stopButton.style.display = 'none';
  rollDiceButton.disabled = false;
  diceContainer.style.display = 'block';
}
