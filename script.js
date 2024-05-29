const gameboard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

const startcells = ["","","","","","","","","" ]

infoDisplay.textContent = "circle goes first";

function createBoard() {
    startcells.forEach((cell,index) =>{
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
        const circleElement = document.createElement("div")
        circleElement.classList.add("cross")
        cellElement.appendChild(circleElement)
        gameboard.append(cellElement);
        
    })
    
}
createBoard()