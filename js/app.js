/*-------------------------------- Constants ---------------------------*/

cardIndex = 0
turnIndex = 0
playerChoice = null
currentCard = null

const cardDeck =[
  {name: "Move forward 4 spaces", play : moveYouFour},
  {name: "Move forward 1 space", play : moveYouOne},
  {name: "Move forward 1 space", play : moveYouOne},
  {name: "Move forward 2 spaces", play : moveYouTwo},
  {name: "Move forward 2 spaces", play : moveYouTwo},
  {name: "Move forward 2 spaces", play : moveYouTwo},
  {name: "Move forward 2 spaces", play : moveYouTwo},
  {name: "Move forward 4 spaces", play : moveYouFour},
  {name: "Move forward 4 spaces", play : moveYouFour},
  {name: "Move back 1 space", play : moveBackOne},
  {name: "Move back 1 space", play : moveBackOne},
  {name: "Move back 2 spaces", play : moveBackTwo},
  {name: "Move back 2 spaces", play : moveBackTwo},
  {name: "Move back 2 spaces", play : moveBackTwo},
  {name: "Move back 2 spaces", play : moveBackTwo},
  {name: "Move back 4 spaces", play : moveBackFour},
  {name: "Move back 4 spaces", play : moveBackFour},
  {name: "A random player moves 1", play : moveOtherOne},
  {name: "A random player moves 1", play : moveOtherOne},
  {name: "A random player moves 2", play : moveOtherTwo},
  {name: "A random player moves 2", play : moveOtherTwo},
  {name: "A random player moves 2", play : moveOtherTwo},
  {name: "A random player moves 2", play : moveOtherTwo},
  {name: "A random player moves 4", play : moveOtherFour},
  {name: "A random player moves 4", play : moveOtherFour},
  {name: "A random player moves back 1", play : moveOtherBackOne},
  {name: "A random player moves back 1", play : moveOtherBackOne},
  {name: "A random player moves back 2", play : moveOtherBackTwo},
  {name: "A random player moves back 2", play : moveOtherBackTwo},
  {name: "A random player moves back 2", play : moveOtherBackTwo},
  {name: "A random player moves back 2", play : moveOtherBackTwo},
  {name: "A random player moves back 4", play : moveOtherBackFour},
  {name: "A random player moves back 4", play : moveOtherBackFour},
  {name: "Skip the next player's turn", play : skipNextPlayer},
  {name: "Skip the next player's turn", play : skipNextPlayer},
  {name: "Skip the next player's turn", play : skipNextPlayer},
  {name: "Skip the next player's turn", play : skipNextPlayer},
  {name: "Take another turn!", play : takeAnotherTurn},
  {name: "Take another turn!", play : takeAnotherTurn},
  {name: "Take another turn!", play : takeAnotherTurn},
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

const fireballSound = new Audio("../sounds/fireball.wav")
const dieRollSound = new Audio("../sounds/die-roll.wav")
const applauseSound = new Audio("../sounds/applause.wav")

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
const body = document.querySelector("body")
const header = document.querySelector("#header")
const winnerMessage = document.querySelector("#winner-message")


/*-------------------------------- Event Listeners ---------------------------*/
die.addEventListener("click", rollDie)
resetButton.addEventListener("click", init)
lightDarkBtn.addEventListener("click", toggleLightDark)


/*-------------------------------- Functions ---------------------------*/
init()

function init(){
  blockDisplay()
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
    currentTurn.loseTurn = false
    if (turnIndex < 2) {
      turnIndex += 2;
    } else if (turnIndex === 2){
      turnIndex = 0
    } else if (turnIndex === 3){
      turnIndex = 1
    }
  } else if (turnIndex >= 3) {
    turnIndex = 0
  } else {
    turnIndex++
  }
  currentTurn = players[turnIndex];
}

function rollDie(){
  rollResult = generateRoll();
  // dieRollSound.play()
  currentTurn.position += rollResult
  currentCard = null
  checkForCardSquare()
  checkForFinish()
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
  renderCard()
  renderWin()
}


function renderWin(){
  for (let i = 0; i < players.length; i++) {
    const player = players[i]
    if (player.position === 51){
      winnerMessage.innerText = `Congratulations ${player.name}! You have claimed the treasure and escaped the island!`;
      die.removeEventListener("click", rollDie)
      revealDisplay()
      applauseSound.play()
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
  console.log("ekwejhf")
  console.log(currentTurn)
  console.log(currentSquare)
  if (currentSquare.classList.contains("card-squares")){
    cardNumberGenerator()
    currentCard = cardDeck[0]
    currentCard.play()
  } else { 
    render();
  }
}

function renderCard(){
  if (currentCard){
    cardDisplay.innerText = currentCard.name
  } else { 
    cardDisplay.innerText = " "
  }
}

function cardNumberGenerator() {
  cardIndex = 0
  min = Math.ceil(0);
  max = Math.floor(50);
  cardIndex = Math.floor(Math.random() * (max - min + 1) + min)
}

function moveYouOne(){
  currentTurn.position += 1;
}

function moveYouTwo(){
  currentTurn.position += 2;
}

function moveYouFour(){
  console.log("here")
  console.log(currentTurn)
  currentTurn.position += 4;
}

function moveBackOne(){
  currentTurn.position = Math.max(0, currentTurn.position - 1)
}

function moveBackTwo(){
  currentTurn.position = Math.max(0, currentTurn.position - 2)
}

function moveBackFour(){
  currentTurn.position = Math.max(0, currentTurn.position - 4)
}

function moveOtherOne(){
  players[randomOtherPlayer()].position += 1
}

function moveOtherTwo(){
  players[randomOtherPlayer()].position += 2
}

function moveOtherFour(){
  players[randomOtherPlayer()].position += 4
}

function moveOtherBackOne(){
  players[randomOtherPlayer()].position -= 1
  players[playerChoice].position = Math.max(0, players[playerChoice].position)
}

function moveOtherBackTwo(){
  players[randomOtherPlayer()].position -= 2
  players[playerChoice].position = Math.max(0, players[playerChoice].position)
}

function moveOtherBackFour(){
  players[randomOtherPlayer()].position -= 4
  players[playerChoice].position = Math.max(0, players[playerChoice].position)
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
  playerChoice = Math.floor(Math.random() * (max - min + 1) + min)
  if (playerChoice === currentTurn){
    return randomOtherPlayer()
  } else {
    return playerChoice
  }
}

function fireball(){
  min = Math.ceil(0);
  max = Math.floor(3);
  randomPlayerVariable = Math.floor(Math.random() * (max - min + 1) + min)
  players[randomPlayerVariable].position - 6
  players[randomPlayerVariable].position = Math.max(0, players[randomPlayerVariable].position)
  fireballSound.play()
}

function toggleLightDark() {
  if (body.className === "dark"){
    body.classList.remove("dark") 
    header.classList.remove("dark")
    resetButton.classList.remove("dark")
    lightDarkBtn.classList.remove("dark")
  }else{
    body.classList.add("dark")
    header.classList.add("dark")
    resetButton.classList.add("dark")
    lightDarkBtn.classList.add("dark")
  }
}

function checkDarkPref() {
  if (
    window.matchMedia("(prefers-color-scheme:dark)").matches &&
    body.class !== "dark"
  ) {
    toggleLightDark()
  }
}

checkDarkPref()


function revealDisplay() {
  document.getElementById("winner-window").style.display = "block";
}

function blockDisplay() {
  document.getElementById("winner-window").style.display = "none";
}