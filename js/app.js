/*-------------------------------- Constants ---------------------------*/

cardIndex = 0
turnIndex = 0
playerChoice = null


const cardDeck =[
  {name: "youLoseTurn", play : youLoseTurn},
  {name: "youPlusOne", play : moveYouOne},
  {name: "youPlusOne", play : moveYouOne},
  {name: "youPlusTwo", play : moveYouTwo},
  {name: "youPlusTwo", play : moveYouTwo},
  {name: "youPlusTwo", play : moveYouTwo},
  {name: "youPlustwo", play : moveYouTwo},
  {name: "youPlusFour", play : moveYouFour},
  {name: "youPlusFour", play : moveYouFour},
  {name: "youBackOne", play : moveBackOne},
  {name: "youBackOne", play : moveBackOne},
  {name: "youBackTwo", play : moveBackTwo},
  {name: "youBackTwo", play : moveBackTwo},
  {name: "youBackTwo", play : moveBackTwo},
  {name: "youBackTwo", play : moveBackTwo},
  {name: "youBackFour", play : moveBackFour},
  {name: "youBackFour", play : moveBackFour},
  {name: "moveOtherForwardOne", play : moveOtherOne},
  {name: "moveOtherForwardOne", play : moveOtherOne},
  {name: "moveOtherForwardTwo", play : moveOtherTwo},
  {name: "moveOtherForwardTwo", play : moveOtherTwo},
  {name: "moveOtherForwardTwo", play : moveOtherTwo},
  {name: "moveOtherForwardTwo", play : moveOtherTwo},
  {name: "moveOtherForwardFour", play : moveOtherFour},
  {name: "moveOtherForwardFour", play : moveOtherFour},
  {name: "moveOtherBackOne", play : moveOtherBackOne},
  {name: "moveOtherBackOne", play : moveOtherBackOne},
  {name: "moveOtherBackTwo", play : moveOtherBackTwo},
  {name: "moveOtherBackTwo", play : moveOtherBackTwo},
  {name: "moveOtherBackTwo", play : moveOtherBackTwo},
  {name: "moveOtherBackTwo", play : moveOtherBackTwo},
  {name: "moveOtherBackFour", play : moveOtherBackFour},
  {name: "moveOtherBackFour", play : moveOtherBackFour},
  {name: "youLoseTurn", play : youLoseTurn},
  {name: "youLoseTurn", play : youLoseTurn},
  // {name: "otherLoseTurn", play : turnLoss},
  // {name: "otherLoseTurn", play : turnLoss},
  // {name: "otherLoseTurn", play : turnLoss},
  // {name: "otherLoseTurn", play : turnLoss},
  {name: "takeAnotherTurn", play : takeAnotherTurn},
  {name: "takeAnotherTurn", play : takeAnotherTurn},
  {name: "takeAnotherTurn", play : takeAnotherTurn},
  {name: "goToTheTreasure", play : moveToTreasure},
  {name: "goToTheTreasure", play : moveToTreasure},
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
  extraTurn : false,
  loseTurn : false,
}

playerTwo = {
  position : 0,
  name : "P2",
  extraTurn: false,
  loseTurn : false,
}

playerThree = {
  position : 0,
  name : "P3",
  extraTurn: false,
  loseTurn : false,
}

playerFour = {
  position : 0,
  name : "P4",
  extraTurn: false, 
  loseTurn : false,
}

players = [playerOne, playerTwo, playerThree, playerFour]
currentTurn = players[0]



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
  if (currentTurn.extraTurn){
    currentTurn.extraTurn = false
  } else if (currentTurn.loseTurn){
    currentTurn.loseTurn = false;
    turnIndex += 2;
  } else if (turnIndex >= 3) {
    turnIndex = 0
  } else {
    turnIndex++
  }
  currentTurn = players[turnIndex];
  // render()
}

function rollDie(){
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
// console.log(players[currentTurn].position)
// console.log(document.querySelector(`sq${players[currentTurn].position}`))

function checkForCardSquare(){
  let currentSquare = document.querySelector(`#sq${currentTurn.position}`);
  if (currentSquare.classList.contains("card-squares")){
    cardNumberGenerator()
    let currentCard = cardDeck[0]
    console.log(currentCard)
    currentCard.play()
  } else { render()
  }
}

function cardNumberGenerator() {
  cardIndex = 0
  min = Math.ceil(0);
  max = Math.floor(51);
  cardIndex = Math.floor(Math.random() * (max - min + 1) + min)
}

function moveYouOne(){
  currentTurn.position += 1;
}

function moveYouTwo(){
  currentTurn.position += 2;
}

function moveYouFour(){
  currentTurn.position += 4;
}

function moveBackOne(){
  currentTurn.position -= 1;
}

function moveBackTwo(){
  currentTurn.position -= 2;
}

function moveBackFour(){
  currentTurn.position -= 4;
}

function moveOtherOne(){
  players[randomOtherPlayer()].position + 1
}

function moveOtherTwo(){
  players[randomOtherPlayer()].position + 2
}

function moveOtherFour(){
  players[randomOtherPlayer()].position + 4
}

function moveOtherBackOne(){
  players[randomOtherPlayer()].position - 1
}

function moveOtherBackTwo(){
  players[randomOtherPlayer()].position - 2
}

function moveOtherBackFour(){
  players[randomOtherPlayer()].position - 4
}

function moveToTreasure(){
  currentTurn.position = 26
}

function takeAnotherTurn() {
  currentTurn.extraTurn = true
}

function youLoseTurn() {
  currentTurn.loseTurn = true
}

function randomOtherPlayer() {
  playerChoice = null
  min = Math.ceil(0);
  max = Math.floor(3);
  cardIndex = Math.floor(Math.random() * (max - min + 1) + min)
  if (playerChoice === currentTurn){
    randomOtherPlayer()
  } else {
    return playerChoice
  }
}
