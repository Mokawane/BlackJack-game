cards = []
sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let amount = 500
let remainingAmount = 0
let gameOver = false
let player = {
    name: "You",
    amount: 500
}

//Here is a command section where we control a game play and how it should perfom
//such that number 1 does not exist in Black Jack.
let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": R " + player.amount

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if (isAlive === false && gameOver === true){
        gameOver = false
    }
    hasBlackJack = false
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

//This is the funtion that communicates with a player about what to do next,
// such as hitting Black Jack or if you lost or if you want to draw another card.
function renderGame() {
     cardsEl.textContent = "Cards: "
     for (let i = 0; i < cards.length; i++) {
         cardsEl.textContent += cards[i] + " "
     }
     
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        amountChange()
    } else {
        message = "Game Over!"
        isAlive = false
        gameOver= true
        amountChange()
    }
    messageEl.textContent = message
    
}

//This is the funtion that execute a new cut,if you did not hit Black Jack and your cards
// are less than 21 
function newCard() {
    if (isAlive===true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
      }
      
 }
 
 //This function controls change in amount if you hit Black Jack it increases your 
// amount with R 20 the bid amount is R10 per play.
 function amountChange() {
     if (isAlive === false && gameOver === true) {
         remainingAmount = parseInt(amount) - 10
         amount = remainingAmount
     } else if (hasBlackJack === true) {
          remainingAmount = parseInt(amount) + 20
         amount = remainingAmount
     }
     
     player.amount = remainingAmount
     playerEl.textContent = player.name + ": R " + player.amount
 }