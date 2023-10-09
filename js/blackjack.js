let dealerSum = 0
let yourSum = 0

let dealerAceCount = 0
let yourAceCount = 0

let hidden
let deck

let canHit = true //allows the player (you) to draw while yourSum <= 21

window.onload = function () {
  buildDeck()
  shuffleDeck()
  startGame()
}

function buildDeck() {
  let values = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ]
  let types = ['C', 'D', 'H', 'S']
  deck = []

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + '-' + types[i]) //A-C -> K-C, A-D -> K-D
    }
  }
  // console.log(deck)
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length) // we are going to get a number between (0 - 1) * 52 (which is the deck)
    let temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
  console.log(deck)
}

function startGame() {
  hidden = deck.pop() // Moves a card from the end of the array
  dealerSum += getValue(hidden)
  dealerAceCount += checkAce(hidden)
  console.log(hidden);
  console.log(dealerSum);
}

function getValue(card) {
  let data = card.split('-') // "4-C" -> splitting the values getting an array called ["4", "C"]
  let value = data[0] // this pics 4 out of 4-C

  if (isNaN(value)) {
    // A J Q K
    if (value === 'A') {
      return 11
    }
    return 10
  }

  return parseInt(value) // turns a string into an integer
}

function checkAce(card) {
  if (card[0] == 'A') {
    return 1
  }
  return 0
}
