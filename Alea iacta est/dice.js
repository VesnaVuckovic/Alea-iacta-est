const Dice = () => {
    function rollDice() {
      const dice = [...document.querySelectorAll('.die-list')];
      dice.forEach(die => {
        toggleClasses(die);
        const roll = rollDie();
        die.dataset.roll = roll;
      });
    }
  
    function toggleClasses(die) {
      die.classList.toggle('odd-roll');
      die.classList.toggle('even-roll');
    }
  
    function rollDie() {
      return Math.floor(Math.random() * 6) + 1;
    }
  
    return { rollDice };
};
  
export default Dice;