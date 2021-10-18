/*-------------------------------- Constants ---------------------------*/
// const cardDeck =[
//   {moveYou2 : moveYou()},
//   {moveYou2 : moveYou()},
//   {moveYou2 : moveYou()},
//   {moveYou2 : moveYou()},
//   {moveYou4 : moveYou()},
//   {moveYou4 : moveYou()},
//   {moveOther2 : moveOther()},
//   {moveOther2 : moveOther()},
//   {moveOther2 : moveOther()},
//   {moveOther2 : moveOther()},
//   {moveOther4 : moveOther()},
//   {moveOther4 : moveOther()},
//   {youLoseTurn : turnLoss()},
//   {youLoseTurn : turnLoss()},
//   {otherLoseTurn : turnLoss()},
//   {otherLoseTurn : turnLoss()},
//   {takeAnotherTurn : takeAnotherTurn()},
//   {takeAnotherTurn : takeAnotherTurn()},
//   {goToTheTreasure : moveYou()},
//   {goToTheTreasure : moveYou()},
//   {fireball : fireball()},
//   {fireball : fireball()},
//   {fireball : fireball()},
//   {fireball : fireball()},
//   {fireball : fireball()},

// ]




/*-------------------------------- Variables ---------------------------*/

whosTurnArray = ["pOne", "pTwo", "pThree", "pFour"]
rollResult = 0
pOnePosition = 0
pTwoPosition = 0
pThreePosition = 0
pFourPosition = 0
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

currentPlayer = playerOne
// current player order? for index ++

/*-------------------------------- Cached Elements ---------------------------*/
const pOne = document.querySelector("#player1")
const pTwo = document.querySelector("#player2") 
const pThree = document.querySelector("#player3")
const pFour = document.querySelector("#player4")
const die = document.querySelector("#dice")
const diceDisplay = document.querySelector("#dice-display")
const whosTurnDisplay = document.querySelector("#whos-turn-display")
const cardSquaresDivs = document.querySelector(".card-sqaures")

/*-------------------------------- Event Listeners ---------------------------*/
die.addEventListener("click", rollAndMove)




/*-------------------------------- Functions ---------------------------*/
init()
function init(){
  turnUpdate()
}

function turnUpdate (){
  let index = 0;
  currentTurn = whosTurnArray[index];
  // console.log(currentTurn)
  index++;
  currentTurn = whosTurnArray[index];
  // console.log(currentTurn);
  }

function rollAndMove(){
  // console.log("here")
  rollResult = generateRoll();
  let activePlayerPosition = 0
  document.querySelector(`#sq${activePlayerPosition}`).innerHTML = ""
  activePlayerPosition += rollResult
   // console.log("here2")
  // whosTurn = "P1"
  diceDisplay.innerHTML = `${rollResult}`
  document.querySelector(`#sq${activePlayerPosition}`).innerHTML = `${currentTurn}`
  turnUpdate()
}

function generateRoll(){
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function drawCard(){
  if (pOnePosition || pTwoPosition || pThreePosition || pFourPosition === cardSquaresDivs){
    cards
  }
}