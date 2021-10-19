/*-------------------------------- Constants ---------------------------*/
cardIndex = 0
let currentTurn
const cardDeck =[
  // {moveYouForwardOne : moveYou()},
  // {moveYouForwardOne : moveYou()},
  // {moveYouForwardTwo : moveYou()},
  // {moveYouForwardTwo : moveYou()},
  // {moveYouForwardTwo : moveYou()},
  // {moveYouForwardTwo : moveYou()},
  // {moveYouForwardFour : moveYou()},
  // {moveYouForwardFour : moveYou()},
  // {moveYouBackOne : moveYou()},
  // {moveYouBackOne : moveYou()},
  // {moveYouBackTwo : moveYou()},
  // {moveYouBackTwo : moveYou()},
  // {moveYouBackTwo : moveYou()},
  // {moveYouBackTwo : moveYou()},
  // {moveYouBackFour : moveYou()},
  // {moveYouBackFour : moveYou()},
  // {moveOtherForwardOne : moveOther()},
  // {moveOtherForwardOne : moveOther()},
  // {moveOtherForwardTwo : moveOther()},
  // {moveOtherForwardTwo : moveOther()},
  // {moveOtherForwardTwo : moveOther()},
  // {moveOtherForwardTwo : moveOther()},
  // {moveOtherForwardFour : moveOther()},
  // {moveOtherForwardFour : moveOther()},
  // {moveOtherBackOne : moveOther()},
  // {moveOtherBackOne : moveOther()},
  // {moveOtherBackTwo : moveOther()},
  // {moveOtherBackTwo : moveOther()},
  // {moveOtherBackTwo : moveOther()},
  // {moveOtherBackTwo : moveOther()},
  // {moveOtherBackFour : moveOther()},
  // {moveOtherBackFour : moveOther()},
  // {youLoseTurn : turnLoss()},
  // {youLoseTurn : turnLoss()},
  // {otherLoseTurn : turnLoss()},
  // {otherLoseTurn : turnLoss()},
  // {otherLoseTurn : turnLoss()},
  // {otherLoseTurn : turnLoss()},
  // {takeAnotherTurn : takeAnotherTurn()},
  // {takeAnotherTurn : takeAnotherTurn()},
  // {takeAnotherTurn : takeAnotherTurn()},
  // {goToTheTreasure : moveYou()},
  // {goToTheTreasure : moveYou()},
  // {fireball : fireball()},
  // {fireball : fireball()},
  // {fireball : fireball()},
  // {fireball : fireball()},
  // {fireball : fireball()},
  // {fireball : fireball()},
  // {fireball : fireball()},
  // {fireball : fireball()},
]




/*-------------------------------- Variables ---------------------------*/

rollResult = null



playerOne = {
  position : 0,
  name : "P1",
  finished: "no"
}

playerTwo = {
  position : 0,
  name : "P2",
  finished: false
}

playerThree = {
  position : 0,
  name : "P3",
  finished: "no"
}

playerFour = {
  position : 0,
  name : "P4",
  finished: "no"
}

players = [playerOne, playerTwo, playerThree, playerFour]
turnIndex = 0
// playerOneMissTurn = [playerTwo, playerThree, playerFour, playerTwo, playerThree, playerFour, RESUME?]
// playerTwoMissTurn = [playerThree, playerFour, playerOne, playerThree, playerFour, playerOne, playerTwo, playerThree, playerFour, RESUME?]
// playerThreeMissTurn = [playerFour, playerOne, playerTwo, playerFour, RESUME?]
// playerFourMissTurn = [playerOne, playerTwo, playerThree, RESUME?]

/*-------------------------------- Cached Elements ---------------------------*/
// const playerOne = document.querySelector("#player1")
// const playerTwo = document.querySelector("#player2") 
// const playerThree = document.querySelector("#player3")
// const playerFour = document.querySelector("#player4")
const die = document.querySelector("#dice")
const diceDisplay = document.querySelector("#dice-display")
const whosTurnDisplay = document.querySelector("#whos-turn-display")
const allCardSquares = document.querySelectorAll(".card-sqaures")
const allSquares = document.querySelectorAll(".squares")
const treasureSquare = document.querySelector(".treasure")
const welcomeSquare = document.querySelector(".welcome")
const finishSquare = document.querySelector(".finish")
// const nearFinishSquares = document.querySelectorAll(".near-finish")
const annoucementSquare = document.querySelector("#annoucements")
const resetButton = document.querySelector("#reset-btn")


/*-------------------------------- Event Listeners ---------------------------*/
die.addEventListener("click", rollDie)
resetButton.addEventListener("click", init)



/*-------------------------------- Functions ---------------------------*/
init()
function init(){
  die.addEventListener("click", rollDie)
  players.forEach(player => {
    player.position = 0
  });
  currentTurn = players[0]
  rollResult = null
  render()
}

function turnUpdate (){
  if (turnIndex >= 3) {
    turnIndex = 0
  } else {
    turnIndex++
  }
  currentTurn = players[turnIndex];
  render()
}

function rollDie(){
  // console.log("here")
  rollResult = generateRoll();
  currentTurn.position += rollResult
  // checkForCardSquare()
  checkForFinish()
  turnUpdate()
  render()
}

function render() {
  allSquares.forEach((square) => square.innerText = (" "))
  diceDisplay.innerText = rollResult
  console.log(rollResult)
  whosTurnDisplay.innerText = `It is ${currentTurn.name}'s turn!`
  players.forEach(player => {
    document.querySelector(`#sq${player.position}`).innerText += ` ${player.name} `})
  welcomeSquare.innerText += "Welcome"
  treasureSquare.innerText += "Treasure"
  finishSquare.innerText += "Finish"
  renderWin()
}

function renderWin(){
  for (let i = 0; i < players.length; i++) {
    const player = players[i]
    if (player.position === 51){
      setTimeout(() => { alert(`Congratulations ${player.name}! You have claimed the treasure and escaped the island!`); }, 1000);
      die.removeEventListener("click", rollDie)
    }
  } 
}

function generateRoll(){
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function checkForFinish() {
  if (currentTurn.position > 51){
    currentTurn.position = 51
  }
}


function checkForCardSquare(){
  if (currentTurn.position === allCardSquares){
    cardNumberGenerator()
    cardDeck[cardIndex]

}

// function cardNumberGenerator() {
//   cardIndex = 0
//   min = Math.ceil(0);
//   max = Math.floor(51);
//   cardIndex = Math.floor(Math.random() * (max - min + 1) + min)
// }}

// function moveYou(){
//   if (cardIndex < 2){
//     `${currentTurn}`.position += 1;
//     console.log(`${currentTurn}`.position)
//   if (cardIndex > 2 && cardIndex < 6)
//     currentTurn.position += 2;
//   if (cardIndex > 6 && cardIndex < 8)
//     currentTurn.position += 4;
//   }
//   if (cardIndex > 8 && cardIndex < 10)
//     currentTurn.position -= 1;
//   if (cardIndex > 10 && cardIndex < 14)
//     currentTurn.position -= 2;
//   if (cardIndex > 14 && cardIndex < 16)
//     currentTurn.position -= 4;
// }

// function checkforTreasureSquare(){

// }