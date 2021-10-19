/*-------------------------------- Constants ---------------------------*/
// const cardDeck =[
//   {moveYouForwardOne : moveYou()},
//   {moveYouForwardOne : moveYou()},
//   {moveYouForwardTwo : moveYou()},
//   {moveYouForwardTwo : moveYou()},
//   {moveYouForwardTwo : moveYou()},
//   {moveYouForwardTwo : moveYou()},
//   {moveYouForwardFour : moveYou()},
//   {moveYouForwardFour : moveYou()},
//   {moveYouBackOne : moveYou()},
//   {moveYouBackOne : moveYou()},
//   {moveYouBackTwo : moveYou()},
//   {moveYouBackTwo : moveYou()},
//   {moveYouBackTwo : moveYou()},
//   {moveYouBackTwo : moveYou()},
//   {moveYouBackFour : moveYou()},
//   {moveYouBackFour : moveYou()},
//   {moveOtherForwardOne : moveOther()},
//   {moveOtherForwardOne : moveOther()},
//   {moveOtherForwardTwo : moveOther()},
//   {moveOtherForwardTwo : moveOther()},
//   {moveOtherForwardTwo : moveOther()},
//   {moveOtherForwardTwo : moveOther()},
//   {moveOtherForwardFour : moveOther()},
//   {moveOtherForwardFour : moveOther()},
//   {moveOtherBackOne : moveOther()},
//   {moveOtherBackOne : moveOther()},
//   {moveOtherBackTwo : moveOther()},
//   {moveOtherBackTwo : moveOther()},
//   {moveOtherBackTwo : moveOther()},
//   {moveOtherBackTwo : moveOther()},
//   {moveOtherBackFour : moveOther()},
//   {moveOtherBackFour : moveOther()},
//   {youLoseTurn : turnLoss()},
//   {youLoseTurn : turnLoss()},
//   {otherLoseTurn : turnLoss()},
//   {otherLoseTurn : turnLoss()},
//   {otherLoseTurn : turnLoss()},
//   {otherLoseTurn : turnLoss()},
//   {takeAnotherTurn : takeAnotherTurn()},
//   {takeAnotherTurn : takeAnotherTurn()},
//   {takeAnotherTurn : takeAnotherTurn()},
//   {goToTheTreasure : moveYou()},
//   {goToTheTreasure : moveYou()},
//   {fireball : fireball()},
//   {fireball : fireball()},
//   {fireball : fireball()},
//   {fireball : fireball()},
//   {fireball : fireball()},
//   {fireball : fireball()},
//   {fireball : fireball()},
//   {fireball : fireball()},
// ]




/*-------------------------------- Variables ---------------------------*/

// whosTurnArray = ["playerOne", "playerTwo", "playerThree", "playerFour"]
rollResult = 0
let currentTurn



playerOne = {
  position : 0,
  name : "player one",
}

playerTwo = {
  position : 0,
  name : "player two",
}

playerThree = {
  position : 0,
  name : "player three",
}

playerFour = {
  position : 0,
  name : "player four",
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
const cardSquaresDivs = document.querySelector(".card-sqaures")
const allSquares = document.querySelector(".squares")
const treasureSquare = document.querySelector(".treasure")
const welcomeSquare = document.querySelector(".welcome")
const finishSquare = document.querySelector(".finish")

/*-------------------------------- Event Listeners ---------------------------*/
die.addEventListener("click", rollDie)




/*-------------------------------- Functions ---------------------------*/
init()
function init(){
  players.forEach(player => {
    player.position = 0
  });
  currentTurn = players[0]
  render()
}

function turnUpdate (){
  console.log(turnIndex)
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
  turnUpdate()
  render()
}

function render() {
  allSquares.innerHTML = ""
  diceDisplay.innerHTML = `${rollResult}`
  whosTurnDisplay.innerHTML = `It is ${currentTurn.name}'s turn!`
  // document.querySelector(`#sq${currentTurn.position}`).innerHTML = ""
  // document.querySelector(`#sq${currentTurn.position}`).innerHTML += currentTurn.name
  // console.log(`#sq${players[0].position}`)
  players.forEach((player) => document.querySelector(`#sq${player.position}`).innerHTML = `${player.name}`)
  welcomeSquare.innerHTML = "Welcome"
  treasureSquare.innerHTML = "Treasure"
  finishSquare.innerHTML = "Finish"
  drawCard()
}

//// create list of all squares
//// clear all squares at start of render function
//// restore Welcome Treasure and Finish squares
// then render looping through players array for all positions
//append all positions instead of "innerHTML" (+=)



function generateRoll(){
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function drawCard(){
  if (playerOne.position || playerTwo.position || playerThree.position || playerFour.position === cardSquaresDivs){
    cardNumberGenerator()
}

function cardNumberGenerator() {
  cardIndex = 0
  min = Math.ceil(0);
  max = Math.floor(51);
  cardIndex = Math.floor(Math.random() * (max - min + 1) + min)
}

function checkforTreasureSquare(){

}