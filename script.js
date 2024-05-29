const gameboard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

const startcells = ["","","","","","","","","" ]
let go = "circle"
infoDisplay.textContent = "circle goes first";

function createBoard() {
    startcells.forEach((_cell,index) =>{
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")

        cellElement.id = index;
        cellElement.addEventListener("click" , addGo)
        // const circleElement = document.createElement("div")
        // circleElement.classList.add("cross")
        // cellElement.appendChild(circleElement)
        gameboard.append(cellElement);
        
    })
    
}
createBoard()

function addGo(e) {
   
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "It is now " + go + "'s turn"
    e.target.removeEventListener("click", addGo)
    checkscore()
    
}

function checkscore() {
    const allSquares = document.querySelectorAll(".square")
    console.log(allSquares);
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(Array =>{
        const circleWins = Array.every(cell =>
             allSquares[cell].firstChild?.classList.contains("circle"))
             if(circleWins){
                infoDisplay.textContent = "Circle Wins"
                allSquares.forEach(square =>
                    square.replaceWith(square.cloneNode(true))
                )
            }
    })


    winningCombos.forEach(Array =>{
        const crossWins = Array.every(cell =>
             allSquares[cell].firstChild?.classList.contains("cross"))
             if(crossWins){
                infoDisplay.textContent = "Cross Wins"
                allSquares.forEach(square =>
                    square.replaceWith(square.cloneNode(true))
                )
            }
    })

    
    
}