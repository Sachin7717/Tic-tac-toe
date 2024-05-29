const gameboard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

const startcells = ["","","","","","","","","" ]
let go = "circle"
infoDisplay.textContent = "circle goes first";



let computerIsPlaying = false
function createBoard() {
    startcells.forEach((_cell,index) =>{
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")

        cellElement.id = index;
        cellElement.addEventListener("click" , addGo)
        cellElement.classList.add("clickable")
        // const circleElement = document.createElement("div")
        // circleElement.classList.add("cross")
        // cellElement.appendChild(circleElement)
        gameboard.append(cellElement);
        
    })
    
}
createBoard()

function addGo(e) {
   console.log(e)
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "It is now " + go + "'s turn"
    e.target.removeEventListener("click", addGo)
    e.target.classList.remove("clickable")
    checkscore()  
    if(!e.playedbyComputer && computerIsPlaying) playComputer()
}

function playComputer(){
    console.log("play comp")
    const squares=document.querySelectorAll(".square")
    let choices = []
    squares.forEach((square)=>{
        if(square.classList.length==2){
            choices.push(square.id)
        }
    })

    console.log(choices)
    const randomChoice= Math.floor(Math.random()*choices.length);
    console.log("random Choice : ", randomChoice)
    let e = {
        target:document.getElementById(choices[randomChoice]),
        playedbyComputer:true
    }
    addGo(e)
}

function playWithComp(){
    computerIsPlaying=computerIsPlaying?false:true
    if(computerIsPlaying){
        document.querySelector("#computerButton").innerText="Continue with Human"
    }
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