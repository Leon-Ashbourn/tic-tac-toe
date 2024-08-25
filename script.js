const createPlayer = (function(name, marker){
    this.name = name;
    this.marker = marker;

    return { name, marker };
})

const createBoard = (function(){
    const board = [];
    for(let i =0; i<9; i++){
        board.push('');
    }

    return {
        board
    }
})()

const gameControl = (function(){
    const playerTurns = 0;
    const players = [];
    players.push(createPlayer("playerOne", "X"));
    players.push(createPlayer("playerTwo", "O"));
    const board = createBoard;
    let activePlayer = players[0];
    const switchPlayer= ()=>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0] ;
    }
    const checkWinner = ()=>{
        const arrayLength = board.board.length;
        for(let i =0; i<arrayLength; i++){
            if(!board.board[i]) break;
            if(i===arrayLength) console.log("draw!"); 
        }
        const positions = board.board;
        if(true){
            // positions[i];
        }
    }
    const getActivePlayer = () => console.log(activePlayer);
    const switchPlayerManually = () => {
        playerTurns++;
        if(playerTurns>5) checkWinner();
        switchPlayer();
    } 
    const getBoard = (input) => Boolean(board.board[input]); 
    const updateBoard = (input) => board.board[input] = activePlayer.marker; 
    
    return {
        getActivePlayer,
        switchPlayerManually,
        updateBoard,
        getBoard
    }
})()

//screen

const screenController= function(){
    const gameBoard = document.querySelector('.board-container');
    gameBoard.addEventListener("click", (event)=>{
        const inputValue = event.target.data.indexNumber;
        if(inputVal || !gameControl.getBoard(Number(inputVal))) return;
        gameBody(Number(inputVal));
    })
}

const startButton = document.querySelector("#start-btn");
startButton.addEventListener("click", ()=>{
    screenController();
})
function gameBody(input){
    const game = gameControl;
    game.switchPlayerManually();
    displayGame;
    screenController();
}

const displayGame = (function(){
    
})()