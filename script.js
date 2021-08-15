// Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, 
// player or gameboard objects.. but take care to put them in “logical” places. Spending a little time brainstorming here can make your 
// life much easier later!


let gameboard = (() => {
    let board = [[null,null,null],
    [null,null,null],
    [null,null,null]];

    let getBoard = () => board;

    let posIsFree = (pos1,pos2) => {
        return board[pos1][pos2] === null
    }

    let reset = () => {
        board = [[null,null,null],
        [null,null,null],
        [null,null,null]];
        render()
    }

    let render = () => {
        cells.forEach( cell => {
            data = cell.getAttribute('data-id')
            cell.textContent = board[data[0]][data[1]]
        })
    }

    let cells = document.querySelectorAll(".cell")

    let pickCell = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', selector)
        })
    }

    let tieGame = () => {
        let flattenedBoard = board.flat()
        return flattenedBoard.every(cell => cell != null)
    }


    let selector = (e) => {
        cell = e.target
        data = cell.getAttribute('data-id')
                if (posIsFree(data[0],data[1])) {

                    if (game.currentPlayer.getSymbol() === 'X') {
                        board[data[0]][data[1]] = 'X'
                        render()
                        if (gameboard.isWon()) {
                            game.displayWinner(`${game.showName()} wins!`)
                        }
                        if (tieGame()) {
                            game.displayWinner('Tie Game')
                        }
                        game.switchPlayer()
                    } else {
                        board[data[0]][data[1]] = 'O'
                        render()
                        if (gameboard.isWon()) {
                            game.displayWinner(`${game.showName()} wins!`)
                        }
                        if (tieGame()) {
                            game.displayWinner('Tie Game')
                        }
                        game.switchPlayer()
                }} else {{
                    console.log('try again')
                }
            }
    }



    let updateBoard = (pos1,pos2,symbol) => {
        if (board[pos1][pos2] === null) {
        board[pos1][pos2] = symbol 
        } else {
            console.log('this position is already taken')
        }
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

                cells.forEach(cell => {
                    cell.removeEventListener('click', selector)
                })
                return true
            } else if (posArray.every( pos => pos === 'O') === true) {
                
                cells.forEach(cell => {
                    cell.removeEventListener('click', selector)
                })
                return true }
        })
            
        return value
        
    }


    return {isWon,pickCell,reset}
})()




let player = (name,symbol) => {

    let getName = () => name;
    let getSymbol = () => symbol;

    return {getName,getSymbol}
}



let game = (() => {

    p1Input = document.querySelector('.p1input')
    p2Input = document.querySelector('.p2input')

    let player1 = player('player1','X');
    let player2 = player('player2','O');
    let currentPlayer = player1
 
    let getCurrentPlayer = () => {
        return currentPlayer
    }

    let play = () => {
        gameboard.pickCell()

    }

    let showName = () => {
        if (game.currentPlayer === game.player1) {
            return p1Input.value
        } else {
            return p2Input.value
        }
    }

    let displayWinner = (message) => {
        modal.modalContent.textContent = message
        modal.toggleModal()
    }

    let restartBtn = document.querySelector('.restart')
    restartBtn.addEventListener('click', restart)

    function restart() {
        game.currentPlayer = game.player1;
        gameboard.reset()
        game.play()
    }

    let switchPlayer = () => {
        if (game.currentPlayer === game.player1) {
            game.currentPlayer = game.player2
        } else {
            game.currentPlayer = game.player1
        }
    }



   
    return {play,currentPlayer,switchPlayer,player1,player2,restartBtn,displayWinner,p1Input,showName}

})()

// game.play()

let modal = (() => {
    const modal = document.querySelector(".modal");
    const modalContent = modal.querySelector('h1')
    const trigger = document.querySelector(".trigger");
    const closeButton = document.querySelector(".close-button");

    function toggleModal() {
        modal.classList.toggle("show-modal");
    }

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }

    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);

    return {toggleModal,windowOnClick,modalContent}
})()

