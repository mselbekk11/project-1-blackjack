// ...

// Add an event listener to the restart button
document.getElementById('restart').addEventListener('click', restartGame);

function restartGame() {
  // Reset all game-related variables
  dealerSum = 0;
  yourSum = 0;
  dealerAceCount = 0;
  yourAceCount = 0;
  canHit = true;

  // Clear the dealer and your card displays
  document.getElementById('dealer-cards').innerHTML = '';
  document.getElementById('your-cards').innerHTML = '';

  // Clear the hidden card and result messages
  document.getElementById('hidden').src = '';
  document.getElementById('results').innerText = '';

  // Rebuild and shuffle the deck
  buildDeck();
  shuffleDeck();

  // Start a new game
  startGame();
}

// ...