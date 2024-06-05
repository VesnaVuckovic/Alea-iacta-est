export function Dice() {
  function rollDice() {
    const dice = document.querySelector('.die-list');
    if (dice) {
      toggleClasses(dice);
      const roll = rollDie();
      dice.dataset.roll = roll;
      return roll;
    } else {
      console.error('Dice element not found.');
      return null;
    }
  }

  function toggleClasses(die) {
    die.classList.toggle('odd-roll');
    die.classList.toggle('even-roll');
  }

  function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
  }

  return { rollDice };
}
