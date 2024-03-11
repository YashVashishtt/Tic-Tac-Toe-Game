
const board = document.getElementById("board")
const winningElementMessage = document.getElementById("winningMessage")
const restartbtn = document.getElementById("restartButton")
const cellElem = document.querySelectorAll("[data-cell]")
const winningTextMessage = document.querySelector("[data-winning-message-text]")

const X_CLASS = "x"
const CIRCLE_CLASS = "circle"

let circleTurn;


const wins = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
]

startGame()

function startGame() {
   circleTurn = false
   cellElem.forEach(cell => {
      cell.classList.remove(X_CLASS)
      cell.classList.remove(CIRCLE_CLASS)
      cell.removeEventListener("click", handleClick)
      cell.addEventListener("click", handleClick, { once: true })
   })
   setHoverEffect()
   winningElementMessage.classList.remove("show")
}

restartbtn.addEventListener("click",startGame)


function handleClick(e) {
   const cell = e.target;
   const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
   placeMark(cell, currentClass);

   if (checkWins(currentClass)) {
      endGame(false);
   } else if (isDraw()) {
      endGame(true);
   } else {
      switchTurns();
      setHoverEffect();
   }

}



function placeMark(cell, currentClass) {
   cell.classList.add(currentClass)
}

function switchTurns() {
   circleTurn = !circleTurn
}

function setHoverEffect() {
   board.classList.remove(X_CLASS);
   board.classList.remove(CIRCLE_CLASS);
   if (circleTurn) {
      board.classList.add(CIRCLE_CLASS)
   }
   else { board.classList.add(X_CLASS) }
}


function checkWins(currentClass) {
   return wins.some(combination => {
      return combination.every(index => {
         return cellElem[index].classList.contains(currentClass)
      })
   })
}


function endGame(draw) {
   if (draw) {
      winningTextMessage.innerText = "Draw!"
   } else {
      winningTextMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
   }
   winningElementMessage.classList.add("show")
}

function isDraw(){
   return [...cellElem].every(cell =>{
      return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
   })
}