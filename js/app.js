/*-------------------------------- Constants ---------------------------*/

cardIndex = 0
turnIndex = 0
playerChoice = null
currentCard = null

const cardDeck =[
  {name: "Fireball", play : fireball},
  {name: "You Move Forward One Space", play : moveYouOne},
  {name: "You Move Forward One Space", play : moveYouOne},
  {name: "You Move Forward Two Spaces", play : moveYouTwo},
  {name: "You Move Forward Two Spaces", play : moveYouTwo},
  {name: "You Move Forward Two Spaces", play : moveYouTwo},
  {name: "You Move Forward Two Spaces", play : moveYouTwo},
  {name: "You Move Forward Four Spaces", play : moveYouFour},
  {name: "You Move Forward Four Spaces", play : moveYouFour},
  {name: "You Move Back One Space", play : moveBackOne},
  {name: "You Move Back One Space", play : moveBackOne},
  {name: "You Move Back Two Spaces", play : moveBackTwo},
  {name: "You Move Back Two Spaces", play : moveBackTwo},
  {name: "You Move Back Two Spaces", play : moveBackTwo},
  {name: "You Move Back Two Spaces", play : moveBackTwo},
  {name: "You Move Back Four Spaces", play : moveBackFour},
  {name: "You Move Back Four Spaces", play : moveBackFour},
  {name: "Move a random player Forward One Space", play : moveOtherOne},
  {name: "Move a random player Forward One Space", play : moveOtherOne},
  {name: "Move a random player Forward Two Spaces", play : moveOtherTwo},
  {name: "Move a random player Forward Two Spaces", play : moveOtherTwo},
  {name: "Move a random player Forward Two Spaces", play : moveOtherTwo},
  {name: "Move a random player Forward Two Spaces", play : moveOtherTwo},
  {name: "Move a random player Forward Four Spaces", play : moveOtherFour},
  {name: "Move a random player Forward Four Spaces", play : moveOtherFour},
  {name: "Move a random player Back One Space", play : moveOtherBackOne},
  {name: "Move a random player Back One Space", play : moveOtherBackOne},
  {name: "Move a random player Back Two Spaces", play : moveOtherBackTwo},
  {name: "Move a random player Back Two Spaces", play : moveOtherBackTwo},
  {name: "Move a random player Back Two Spaces", play : moveOtherBackTwo},
  {name: "Move a random player Back Two Spaces", play : moveOtherBackTwo},
  {name: "Move a random player Back Four Spaces", play : moveOtherBackFour},
  {name: "Move a random player Back Four Spaces", play : moveOtherBackFour},
  {name: "Skip the next player's turn", play : skipNextPlayer},
  {name: "Skip the next player's turn", play : skipNextPlayer},
  {name: "Skip the next player's turn", play : skipNextPlayer},
  {name: "Skip the next player's turn", play : skipNextPlayer},
  {name: "Roll again!", play : takeAnotherTurn},
  {name: "Roll again!", play : takeAnotherTurn},
  {name: "Roll again!", play : takeAnotherTurn},
  {name: "Move immediately to the Treasure", play : moveToTreasure},
  {name: "Move immediately to the Treasure", play : moveToTreasure},
  {name: "Fireball!", play : fireball},
  {name: "Fireball!", play : fireball},
  {name: "Fireball!", play : fireball},
  {name: "Fireball!", play : fireball},
  {name: "Fireball!", play : fireball},
  {name: "Fireball!", play : fireball},
  {name: "Fireball!", play : fireball},
  {name: "Fireball!", play : fireball},
  {name: "Fireball!", play : fireball},
  {name: "Fireball!", play : fireball},
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


/*-------------------------------- Cached Elements ---------------------------*/

const die = document.querySelector("#dice")
const diceDisplay = document.querySelector("#dice-display")
const whosTurnDisplay = document.querySelector("#whos-turn-display")
const allCardSquares = document.querySelectorAll(".card-sqaures")
const allSquares = document.querySelectorAll(".squares")
const treasureSquare = document.querySelector(".treasure")
const welcomeSquare = document.querySelector(".welcome")
const finishSquare = document.querySelector(".finish")
const annoucementSquare = document.querySelector("#annoucements")
const cardDisplay = document.querySelector("#card-display")
const resetButton = document.querySelector("#reset-btn")
const lightDarkBtn = document.querySelector("#light-dark-button")

/*-------------------------------- Event Listeners ---------------------------*/
die.addEventListener("click", rollDie)
resetButton.addEventListener("click", init)
// lightDarkBtn.addEventListener("click", toggleLightDark)


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
    turnIndex++;
  } else if (turnIndex >= 3) {
    turnIndex = 0
  } else {
    turnIndex++
  }
  currentTurn = players[turnIndex];
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
  welcomeSquare.innerText += "Welcome\n"
  treasureSquare.innerText += "Treasure\n"
  finishSquare.innerText += "Finish\n"
  diceDisplay.innerText = rollResult
  whosTurnDisplay.innerText = `It is ${currentTurn.name}'s turn!`
  players.forEach(player => {
    document.querySelector(`#sq${player.position}`).innerHTML += ` <span id="${player.name}">${player.name} </span>`})
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
  let currentSquare = document.querySelector(`#sq${currentTurn.position}`);
  if (currentSquare.classList.contains("card-squares")){
    cardNumberGenerator()
    currentCard = cardDeck[0]
    renderCard()
    currentCard.play()
  } else { render();
  }
}

function renderCard(){
  console.log(cardDeck)
  cardDisplay.innerText = (`${currentCard.name}`)
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
  players[randomOtherPlayer(playerChoice)].position + 1
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

function skipNextPlayer() {
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
fireball()
function fireball(){
  min = Math.ceil(0);
  max = Math.floor(3);
  randomPlayerVariable = Math.floor(Math.random() * (max - min + 1) + min)
  console.log(randomPlayerVariable)
  players[randomPlayerVariable].position - 6
}

// function toggleLightDark() {
//   body.className = body.className === "dark" ? "" : "dark"
// }

// function checkDarkPref() {
//   if (
//     window.matchMedia("(prefers-color-scheme:dark)").matches &&
//     body.className !== "dark"
//   ) {
//     toggleLightDark()
//   }
// }

// checkDarkPref()