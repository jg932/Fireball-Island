/*-------------------------------- Constants ---------------------------*/

cardIndex = 0
turnIndex = 0
let currentTurn
const cardDeck =[
  {name: "moveYouForwardOne", play : moveYou},
  {name: "moveYouForwardOne", play : moveYou},
  {name: "moveYouForwardTwo", play : moveYou},
  {name: "moveYouForwardTwo", play : moveYou},
  {name: "moveYouForwardTwo", play : moveYou},
  {name: "moveYouForwardTwo", play : moveYou},
  {name: "moveYouForwardFour", play : moveYou},
  {name: "moveYouForwardFour", play : moveYou},
  {name: "moveYouBackOne", play : moveYou},
  {name: "moveYouBackOne", play : moveYou},
  {name: "moveYouBackTwo", play : moveYou},
  {name: "moveYouBackTwo", play : moveYou},
  {name: "moveYouBackTwo", play : moveYou},
  {name: "moveYouBackTwo", play : moveYou},
  {name: "moveYouBackFour", play : moveYou},
  {name: "moveYouBackFour", play : moveYou},
  // {name: "moveOtherForwardOne", play : moveOther},
  // {name: "moveOtherForwardOne", play : moveOther},
  // {name: "moveOtherForwardTwo", play : moveOther},
  // {name: "moveOtherForwardTwo", play : moveOther},
  // {name: "moveOtherForwardTwo", play : moveOther},
  // {name: "moveOtherForwardTwo", play : moveOther},
  // {name: "moveOtherForwardFour", play : moveOther},
  // {name: "moveOtherForwardFour", play : moveOther},
  // {name: "moveOtherBackOne", play : moveOther},
  // {name: "moveOtherBackOne", play : moveOther},
  // {name: "moveOtherBackTwo", play : moveOther},
  // {name: "moveOtherBackTwo", play : moveOther},
  // {name: "moveOtherBackTwo", play : moveOther},
  // {name: "moveOtherBackTwo", play : moveOther},
  // {name: "moveOtherBackFour", play : moveOther},
  // {name: "moveOtherBackFour", play : moveOther},
  // {name: "youLoseTurn", play : turnLoss},
  // {name: "youLoseTurn", play : turnLoss},
  // {name: "otherLoseTurn", play : turnLoss},
  // {name: "otherLoseTurn", play : turnLoss},
  // {name: "otherLoseTurn", play : turnLoss},
  // {name: "otherLoseTurn", play : turnLoss},
  // {name: "takeAnotherTurn", play : takeAnotherTurn},
  // {name: "takeAnotherTurn", play : takeAnotherTurn},
  // {name: "takeAnotherTurn", play : takeAnotherTurn},
  // {name: "goToTheTreasure", play : moveYou},
  // {name: "goToTheTreasure", play : moveYou},
  // {name: "fireball", play : fireball},
  // {name: "fireball", play : fireball},
  // {name: "fireball", play : fireball},
  // {name: "fireball", play : fireball},
  // {name: "fireball", play : fireball},
  // {name: "fireball", play : fireball},
  // {name: "fireball", play : fireball},
  // {name: "fireball", play : fireball},
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
  checkForFinish()
  checkForCardSquare()
  turnUpdate()
  render()
}

function render() {
  allSquares.forEach((square) => square.innerText = (" "))
  diceDisplay.innerText = rollResult
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
  const currentSquare = (document.querySelector(`#sq${currentTurn.position}`));
  if (currentSquare.classList.contains("card-squares"))
    cardNumberGenerator()
    let currentCard = cardDeck[cardIndex]
    currentCard.play()
}

function cardNumberGenerator() {
  cardIndex = 0
  min = Math.ceil(0);
  max = Math.floor(51);
  cardIndex = Math.floor(Math.random() * (max - min + 1) + min)
}

function moveYou(){
  if (cardIndex < 2){
    `${currentTurn}`.position += 1;
    console.log(`${currentTurn}`.position)
  if (cardIndex > 2 && cardIndex < 6)
    currentTurn.position += 2;
  if (cardIndex > 6 && cardIndex < 8)
    currentTurn.position += 4;
  }
  if (cardIndex > 8 && cardIndex < 10)
    currentTurn.position -= 1;
  if (cardIndex > 10 && cardIndex < 14)
    currentTurn.position -= 2;
  if (cardIndex > 14 && cardIndex < 16)
    currentTurn.position -= 4;
}
function checkforTreasureSquare(){

// }