// Initial Data
let square = {
    a1: '', a2: '', a3: '',
    b1: 'x', b2: '', b3: '',
    c1: '', c2: 'o', c3: ''
};


let playerTurn = '';

let warning = '';

let playing = false;

reset();
renderInfo();






// events
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
})








//functions
function itemClick(e) {
    //console.log(e.target);
    let item = e.target.getAttribute('data-item');
    //console.log(item)
    if (playing && square[item] === '') {
        square[item] = playerTurn;
        renderSquare();
        togglePlayer();
        
    }

}



function reset() {
    warning = '';
    let random = Math.floor(Math.random() * 2 );

    playerTurn = (random === 0) ? 'x' : 'o';
    /*  ou faz ... if(randow === 0) {
        playerTurn = 'x';
    } else {
        playerTurn = 'o'
    } .... dá no mesmo. */

    for(let i in square) {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for (let i in square) {
        // console.log('item: ' ,i)
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    checkGame();
};

function renderInfo() {
    document.querySelector('.vez').innerHTML = playerTurn;
    document.querySelector('.resultado').innerHTML = warning;

};

function togglePlayer() {
    //vai alternar a vez

    playerTurn = (playerTurn === 'x') ? 'o' : 'x' ;
    /* ou só fazer if normal ....
    if ( playerTurn === 'x') {
        playerTurn = 'o'
    } else {
        playerTurn = 'x'
    } */

    renderInfo();
};

function checkGame() {
    //função vai fazer as verificações, se ganhou, empatou ou nada aconteceu;
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu!';
        playing = false ;
    } else if(checkWinnerFor ('o')) {
            warning = 'O "o" venceu!';
            playing = false; 
        } else if (ifFull()){
            warning = 'Deu empate!';
            playing = false;
        }

}

function checkWinnerFor(playerTurn) {
    let possibilities = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b2,c3',
        'a3,b2,c1',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3'
    ];

    for( let w in possibilities) {
        let pArray = possibilities[w].split(',');
        let hasWon = pArray.every(option => square[option] === playerTurn);
        if(hasWon) {
            return true;
        }
    }
    return false;
   

}
function ifFull() {
    for (let i in square) {
        if (square[i] === '') {
            return false;
        }
    }
 return true;
}