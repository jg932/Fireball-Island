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

/*-------------------------------- Cached Elements ---------------------------*/
const playerOne = document.querySelector("#player1")
const playerTwo = document.querySelector("#player2") 
const playerThree = document.querySelector("#player3")
const playerFour = document.querySelector("#player4")
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
  currentTurn = players[index];
  // console.log(currentTurn)
  index++;
  currentTurn = players[index];
  // console.log(currentTurn);
  }

function rollAndMove(){
  // console.log("here")
  rollResult = generateRoll();
  let activePlayerPosition = currentTurn.player.position
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
  if (playerOne.position || playerTwo.position || playerThree.position || playerFour.position === cardSquaresDivs){
    function cardNumberGenerator(){ 
    min = Math.ceil(0);
    max = Math.floor(6);
    return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
}