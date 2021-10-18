/*-------------------------------- Constants ---------------------------*/





/*-------------------------------- Variables ---------------------------*/

whosTurnArray = ["pOne", "pTwo", "pThree", "pFour"]
rollResult = 0
pOnePosition = 0
let currentTurn


/*-------------------------------- Cached Elements ---------------------------*/
const pOne = document.querySelector("#player1")
const pTwo = document.querySelector("#player2") 
const pThree = document.querySelector("#player3")
const pFour = document.querySelector("#player4")
const die = document.querySelector("#dice")
const diceDisplay = document.querySelector("#dice-display")
const whosTurnDisplay = document.querySelector("#whos-turn-display")

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
  console.log(currentTurn)
  index++;
  currentTurn = whosTurnArray[index];
  console.log(currentTurn);
  }

function rollAndMove(){
  console.log("here")
  rollResult = generateRoll();
  document.querySelector(`#sq${pOnePosition}`).innerHTML = ""
  pOnePosition += rollResult
  renderPlayer()
}

function generateRoll(){
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function renderPlayer(){
  // console.log("here2")
  whosTurn = "P1"
  diceDisplay.innerHTML = `${rollResult}`
  document.querySelector(`#sq${pOnePosition}`).innerHTML = `${whosTurn}`
}

