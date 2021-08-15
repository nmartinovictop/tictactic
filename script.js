// Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, 
// player or gameboard objects.. but take care to put them in “logical” places. Spending a little time brainstorming here can make your 
// life much easier later!


let gameboard = (() => {
    let board = [['X',null,null],
            ['O',null,'O'],
            ['X',null,null]];

    let getBoard = () => board;

    let posIsFree = (pos1,pos2) => {
        return board[pos1][pos2] === null
    }

    let cells = document.querySelectorAll(".cell")

    let render = () => {
        cells.forEach( cell => {
            data = cell.getAttribute('data-id')
            cell.textContent = board[data[0]][data[1]]
        })
    }

    
    let pickCell = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', () => console.log('click'))
        })
    }

    let updateBoard = (pos1,pos2,symbol) => {
        board[pos1][pos2] = symbol
    }
    

    let isWon = () => {
        let toprow = board[0]
        let middlerow = board[1]
        let bottomrow = board[2] 
        let leftcolumn = [board[0][0],board[1][0],board[2][0]]
        let middlecolumn = [board[0][1],board[1][1],board[2][1]]
        let rightcolumn = [board[0][2],board[1][2],board[2][2]]
        let topdiagonal = [board[0][0],board[1][1],board[2][2]]
        let bottomdiagonal = [board[0][2],board[1][1],board[2][0]]

        let posToCheck = [toprow,middlerow,bottomrow,leftcolumn,middlecolumn,rightcolumn,topdiagonal,bottomdiagonal]

        let value = posToCheck.some(posArray => {
            if (posArray.every( pos => pos === 'X') === true) {
                return true
            } else if (posArray.every( pos => pos === 'O') === true) {
                return true }
        })
            
        return value
        
    }


    return {getBoard,updateBoard,isWon,posIsFree,render,pickCell}
})()




let player = (name,symbol) => {

    let getName = () => name;
    let getSymbol = () => symbol;

    return {getName,getSymbol}
}



let game = (() => {
    let player1 = ('player1','X');
    let player2 = ('player1','O');
    let currentPlayer = 'X';


    let play = () => {
        gameboard.pickCell()
        while (gameboard.isWon() === false) {
            console.log(`it is ${currentPlayer} turn.  Please click on a square`)
        
        }
    }

   
    return {play}

})()



