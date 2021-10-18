/*-------------------------------- Constants ---------------------------*/





/*-------------------------------- Variables ---------------------------*/

// whosTurnArray = ["pOne", "pTwo", "pThree", "pFour"]
rollResult = 0
pOnePosition = 0



/*-------------------------------- Cached Elements ---------------------------*/
const pOne = document.querySelector("#player1")
const pTwo = document.querySelector("#player2") 
const pThree = document.querySelector("#player3")
const pFour = document.querySelector("#player4")
const die = document.querySelector("#dice")
const diceDisplay = document.querySelector("#dice-display")
// let whosTurnDisplay = document.querySelector("#whos-turn-display")

/*-------------------------------- Event Listeners ---------------------------*/
die.addEventListener("click", rollDice)




/*-------------------------------- Functions ---------------------------*/
// init()
function init(){
  // whosTurnDisplay = whosTurnArray[0]
  // whosTurnDisplay = whosTurnArray
}

function whosTurn (){

}

function rollDice(){
  console.log("here")
  rollResult = generateRoll();
  pOnePosition += rollResult
  render()
}

function generateRoll(){
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function render(){
  // console.log("here2")
  whosTurnDisplay = "P1"
  diceDisplay.innerHTML = `${rollResult}`
  document.querySelector(`#sq${pOnePosition}`).innerHTML = `${whosTurnDisplay}`
}

