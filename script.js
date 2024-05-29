const gameboard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

const startcells = ["","","","","","","","","" ]
let go = "circle"
infoDisplay.textContent = "circle goes first";

let hasSomeOneWon = false;

const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]

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
    console.log(e.target)
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "It is now " + go + "'s turn"
    e.target.removeEventListener("click", addGo)
    e.target.classList.remove("clickable")
    checkscore()  


    if(!e.playedbyComputer && computerIsPlaying && !hasSomeOneWon) playComputer()
}


function findBetterMove(choices){
    let output = null;
winningCombos.forEach(array=>{
    const allSquares = document.querySelectorAll(".square")
    let first=allSquares[array[0]].children[0]?.classList[0]
    let second=allSquares[array[1]].children[0]?.classList[0]
    let third=allSquares[array[2]].children[0]?.classList[0]

    

  
    if(
        (first==second && first!==undefined) ||
         (first==third  && first!==undefined) || 
         (second==third  && second!==undefined) ){
        console.log("found a match")
        if(first===second ){
            output=array[2]
            return output
        } 
        if(first===third){
            output=array[1]
            return output
        }

        if(third===second ){
            output=array[0]
            return output
        } 
        
    }

  
})

if(output!==null){
    if(choices.includes(output.toString())) return output
}
else return null
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
    let randomChoice= Math.floor(Math.random()*choices.length);
    randomChoice=choices[randomChoice]
    let betterChoice = findBetterMove(choices)
    console.log(findBetterMove(choices))
    if(betterChoice!==null && betterChoice!==undefined ) randomChoice=betterChoice
        console.log("random Choice : ", randomChoice)
    let e = {
        target:document.getElementById(randomChoice),
        playedbyComputer:true
    }
    console.log(e)
    addGo(e)
}

function playWithComp(){
    computerIsPlaying=computerIsPlaying?false:true
    if(computerIsPlaying){
        document.querySelector("#computerButton").innerText="Continue with Human"
    }
    if(!computerIsPlaying){
        document.querySelector("#computerButton").innerText="Play with computer"
    }
}

function checkscore() {
    const allSquares = document.querySelectorAll(".square")
    console.log(allSquares);
    let choices = []
    allSquares.forEach((square)=>{
        if(square.classList.length==2){
            choices.push(square.id)
        }
    })

    if(choices.length==0){
        infoDisplay.textContent = "Its a draw"
    }

    winningCombos.forEach(Array =>{
        const circleWins = Array.every(cell =>
             allSquares[cell].firstChild?.classList.contains("circle"))
             if(circleWins){
                hasSomeOneWon=true
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
                hasSomeOneWon=true
                infoDisplay.textContent = "Cross Wins"
                allSquares.forEach(square =>
                    square.replaceWith(square.cloneNode(true))
                )
            }
    })


    

    
    
}


function reset(){
    for(let i=0;i<9;i++){
        gameboard.removeChild(gameboard.children[0])
    }
    createBoard()
infoDisplay.textContent = `${go} goes first`;
hasSomeOneWon=false

}