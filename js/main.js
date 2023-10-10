let dealerSum = 0
let yourSum = 0

let dealerAceCount = 0
let yourAceCount = 0

let hidden
let deck

let canHit = true //allows the player (you) to draw while yourSum <= 21

function restartGame() {
  // Reset all game-related variables
  dealerSum = 0
  yourSum = 0
  dealerAceCount = 0
  yourAceCount = 0
  canHit = true

  // Clear the dealer and your card displays
  // Clear the totals in the card count
  document.getElementById('dealer-cards').innerHTML = ''
  document.getElementById('your-cards').innerHTML = ''
  document.getElementById('your-sum').innerHTML = ''
  document.getElementById('dealer-sum').innerHTML = ''

  // Clear the hidden card and result messages
  // document.getElementById('hidden').src = ''
  document.getElementById('results').innerText = ''
  document.getElementById(
    'dealer-cards'
  ).innerHTML = `<img id="hidden" src="./cards/BACK.png" alt="BACK" />`

  buildDeck()
  shuffleDeck()
  startGame()
}

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
  // console.log(hidden);
  // console.log(dealerSum);
  while (dealerSum < 17) {
    // <img src="./cards/4-C.png">
    let cardImg = document.createElement('img')
    let card = deck.pop()
    cardImg.src = './cards/' + card + '.png'
    dealerSum += getValue(card)
    dealerAceCount += checkAce(card)
    document.getElementById('dealer-cards').append(cardImg)
  }
  console.log(dealerSum)

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement('img')
    let card = deck.pop()
    cardImg.src = './cards/' + card + '.png'
    yourSum += getValue(card)
    yourAceCount += checkAce(card)
    document.getElementById('your-cards').append(cardImg)
  }

  console.log(yourSum)
  // document.getElementById('deal').addEventListener('click', deal)
  document.getElementById('hit').addEventListener('click', hit)
  document.getElementById('stay').addEventListener('click', stay)
}

function hit() {
  if (!canHit) {
    return
  }

  let cardImg = document.createElement('img')
  let card = deck.pop()
  cardImg.src = './cards/' + card + '.png'
  yourSum += getValue(card)
  yourAceCount += checkAce(card)
  document.getElementById('your-cards').append(cardImg)

  if (reduceAce(yourSum, yourAceCount) > 21) {
    canHit = false
  }
}

function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount)
  yourSum = reduceAce(yourSum, yourAceCount)

  canHit = false
  document.getElementById('hidden').src = './cards/' + hidden + '.png'

  let message = ''
  if (yourSum > 21) {
    message = 'You Lose!'
  } else if (dealerSum > 21) {
    message = 'You Win!'
  }
  // both you and dealer <= 21
  else if (yourSum == dealerSum) {
    message = 'Its a Tie!'
  } else if (yourSum > dealerSum) {
    message = 'You Win!'
  } else if (yourSum < dealerSum) {
    message = 'You Lose!'
  }

  // const btn = document.createElement('button')
  // document.getElementById('buttons').append(btn)
  // btn.innerText = 'Deal'
  // btn.classList.add('deal')

  document.getElementById('dealer-sum').innerText = dealerSum
  document.getElementById('your-sum').innerText = yourSum
  document.getElementById('results').innerText = message

  // Add an event listener to the restart button
  document.getElementById('restart').addEventListener('click', restartGame)
  //   document.getElementById('buttons').innerHTML = ''
  //   document.getElementById(
  //     'buttons'
  //   ).innerHTML = `<button id="deal" type="button" onClick="window.location.reload()">
  //   Deal
  // </button>`
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

// turns your Aces into 1s if you are exceeding 21
function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10
    playerAceCount -= 1
  }
  return playerSum
}
