let dealerSum = 0
let yourSum = 0
let dealerAceCount = 0
let yourAceCount = 0
let hidden
let deck
let canHit = true
let wins = 0
let losses = 0
let draws = 0

const error = document.getElementById('error')
document.getElementById('restart').addEventListener('click', restartGame)

document.addEventListener('DOMContentLoaded', function () {
  const nameInput = document.getElementById('name-input')
  const enterButton = document.getElementById('enter-button')
  enterButton.addEventListener('click', function () {
    const enteredName = nameInput.value
    console.log(enteredName)
    if (enteredName) {
      console.log(enteredName)
      const splash = document.getElementById('splash')
      splash.classList.add('display-none')
      const playerName = document.getElementById('player-name')
      playerName.innerHTML = `${enteredName} <span id="your-sum" >${yourSum}</span>`
    } else {
      return error.classList.remove('display-none')
    }
  })
})

function restartGame() {
  dealerSum = 0
  yourSum = 0
  dealerAceCount = 0
  yourAceCount = 0
  canHit = true

  document.getElementById('dealer-cards').innerHTML = ''
  document.getElementById('your-cards').innerHTML = ''

  document.getElementById('results').innerText = ''
  document.getElementById(
    'dealer-cards'
  ).innerHTML = `<img id="hidden" src="./cards/svg/BACK.svg" alt="BACK" />`

  buildDeck()
  shuffleDeck()
  startGame()

  document.getElementById('dealer-sum').innerHTML = ''
  document.getElementById('your-sum').innerHTML = yourSum

  wins = parseInt(localStorage.getItem('wins')) || 0
  losses = parseInt(localStorage.getItem('losses')) || 0
  draws = parseInt(localStorage.getItem('draws')) || 0

  document.getElementById('wins').innerText = wins
  document.getElementById('losses').innerText = losses
  document.getElementById('draws').innerText = draws

  console.log('Restarting the game') // Add this line
}

window.onload = function () {
  buildDeck()
  shuffleDeck()
  startGame()

  wins = parseInt(localStorage.getItem('wins')) || 0
  losses = parseInt(localStorage.getItem('losses')) || 0
  draws = parseInt(localStorage.getItem('draws')) || 0

  document.getElementById('wins').innerText = wins
  document.getElementById('losses').innerText = losses
  document.getElementById('draws').innerText = draws
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
      deck.push(values[j] + '-' + types[i])
    }
  }
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length)
    let temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
}

function startGame() {
  hidden = deck.pop()
  dealerSum += getValue(hidden)
  dealerAceCount += checkAce(hidden)
  while (dealerSum < 17) {
    let cardImg = document.createElement('img')
    let card = deck.pop()
    cardImg.src = './cards/svg/' + card + '.svg'
    dealerSum += getValue(card)
    dealerAceCount += checkAce(card)
    document.getElementById('dealer-cards').append(cardImg)
  }
  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement('img')
    let card = deck.pop()
    cardImg.src = './cards/svg/' + card + '.svg'
    yourSum += getValue(card)
    yourAceCount += checkAce(card)
    document.getElementById('your-cards').append(cardImg)
  }
  document.getElementById('hit').addEventListener('click', hit)
  document.getElementById('stay').addEventListener('click', stay)
}

function hit() {
  if (!canHit) {
    return
  }
  let cardImg = document.createElement('img')
  let card = deck.pop()
  cardImg.src = './cards/svg/' + card + '.svg'
  yourSum += getValue(card)
  yourAceCount += checkAce(card)
  document.getElementById('your-cards').append(cardImg)
  document.getElementById('your-sum').innerText = yourSum
  if (reduceAce(yourSum, yourAceCount) > 21) {
    canHit = false
  }
}

function stay() {
  document.getElementById('stay').removeEventListener('click', stay)

  dealerSum = reduceAce(dealerSum, dealerAceCount)
  yourSum = reduceAce(yourSum, yourAceCount)

  canHit = false
  document.getElementById('hidden').src = './cards/svg/' + hidden + '.svg'

  let message = ''
  if (yourSum > 21) {
    losses++
    message = 'You Lose!'
  } else if (dealerSum > 21) {
    wins++
    message = 'You Win!'
  } else if (yourSum == dealerSum) {
    draws++
    message = 'Its a Tie!'
  } else if (yourSum > dealerSum) {
    wins++
    message = 'You Win!'
  } else if (yourSum < dealerSum) {
    losses++
    message = 'You Lose!'
  }

  document.getElementById('wins').innerText = wins
  document.getElementById('losses').innerText = losses
  document.getElementById('draws').innerText = draws

  document.getElementById('dealer-sum').innerText = dealerSum
  document.getElementById('your-sum').innerText = yourSum
  document.getElementById('results').innerText = message

  localStorage.setItem('wins', wins)
  localStorage.setItem('losses', losses)
  localStorage.setItem('draws', draws)
}

function getValue(card) {
  let data = card.split('-')
  let value = data[0]

  if (isNaN(value)) {
    if (value === 'A') {
      return 11
    }
    return 10
  }

  return parseInt(value)
}

function checkAce(card) {
  if (card[0] == 'A') {
    return 1
  }
  return 0
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10
    playerAceCount -= 1
  }
  return playerSum
}

function openNav() {
  document.getElementById('mySidenav').style.width = '100vw'
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0'
}
