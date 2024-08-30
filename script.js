let startButtonStat = false;

function createPlayer(name, marker){
    this.name = name;
    this.marker = marker;

    return { name, marker };
}

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
    const players = [];
    const playerName = document.querySelector('input[type="submit"]');
    let playerOne = 'Player-One';
    let playerTwo = 'Player-Two';
    playerName.addEventListener('click', (event)=>{
        event.preventDefault();

        const getPlayer = document.querySelectorAll('input[type="text"]');
        playerOne = getPlayer[0].value;
        playerTwo = getPlayer[1].value;
        if(playerOne === ''){
            playerOne = 'Player-One';
        }
        if(playerTwo === ''){
            playerTwo = 'Player-Two';
        }
        players[0].name = playerOne;
        players[1].name = playerTwo;
        getPlayer[0].value = '';
        getPlayer[1].value = '';
    })
    
    players.push(createPlayer(playerOne, "X"));
    players.push(createPlayer(playerTwo, "O"));
    const board = createBoard;
    let activePlayer = players[0];
    let gameStatus = false;
    const switchPlayer= ()=>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0] ;
    }
    const checkWinner = ()=>{
        const arrayLength = board.board.length;
        const positions = board.board;
        for(let i =0; i<3; i++){
            if(positions[i*3] === positions[i*3+1] && positions[i*3] === positions[i*3+2] && positions[i*3] !==''){
                gameStatus = true;
            }else if(positions[i]===positions[i+3] && positions[i]===positions[i+6] && positions[i] !==''){
                gameStatus = true;
            }else if(i===0){
                if(positions[i]===positions[i + 4] && positions[i] === positions[i + 8] && positions[i] !==''){
                    gameStatus = true;
                }
            }else if(i===2){
                if(positions[i] === positions[i*2] && positions[i]=== positions[i*3] && positions[i] !==''){
                    gameStatus = true;
                }
            }
        }
        
        for(let i =0; i<arrayLength; i++){
            if(!board.board[i]) break;
            if(i===arrayLength-1 && gameStatus === false) gameStatus = "Draw";
            startButtonStat = false; 
        }
        if(gameStatus || gameStatus === 'Draw'){            
            startButtonStat = false;
            reset();
        }
        
    }
    const getActivePlayer = () =>activePlayer;
    const switchPlayerManually = () => {
        checkWinner();
        switchPlayer();
    } 
    const getBoard = (input) => Boolean(board.board[input]); 
    const updateBoard = (input) => board.board[input] = activePlayer.marker; 
    const getStatus = ()=> gameStatus;
    const currentBoard = ()=> board.board;
    
    const reset = ()=> {
        for(let i =0; i< 9; i++){
            board.board[i] = '';
        }
        startButtonStat = false;
    }

    return {
        getActivePlayer,
        switchPlayerManually,
        updateBoard,
        getBoard,
        getStatus,
        currentBoard,
        reset
    }
})()
//screen
let check = true;
const screenController = (function(){
    const gameBoard = document.querySelector('.game-board');
    const statusDisplay = document.querySelector('.game-status');

    const boardEle = gameControl.currentBoard();

    gameBoard.addEventListener("click", (event)=>{
        const inputVal = event.target.getAttribute('data-indexNumber');
        if(!inputVal || gameControl.getBoard(Number(inputVal))) return ;

        gameControl.updateBoard(inputVal);
        gameControl.switchPlayerManually();
        display();
    })
    const display = ()=>{
        gameBoard.textContent = '';
        for(let i =0; i< 9; i++){
            const position = document.createElement('div');
            position.textContent = boardEle[i];
            position.setAttribute('data-indexNumber', `${i}`);
            gameBoard.appendChild(position);
        }

        if(gameControl.getStatus() === 'Draw'){
            statusDisplay.textContent = "what a bummer! It was a draw";
        }else if(gameControl.getStatus() === true){
            statusDisplay.textContent = `We had a winner here: ${gameControl.getActivePlayer().name}`;
        }else {
            statusDisplay.textContent = `${gameControl.getActivePlayer().name}'s turn, please choose your position.`;
        }
    }

    return {
        display,
    }
})()

const startButton = document.querySelector("#start-btn");
startButton.addEventListener("click", ()=>{
    if(!startButtonStat){
        screenController.display();
        startButtonStat = true;
    }
})

