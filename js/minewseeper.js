'use strict'


const ONE_NEG = '<img src="img/1.png">';
const TWO_NEGS = '<img src="img/2.png">';
const THREE_NEGS = '<img src="img/3.png">';
const FOUR_NEGS = '<img src="img/4.png">';
const FIVE_NEGS = '<img src="img/5.png">';
const SIX_NEGS = '<img src="img/6.png">';
const SEVEN_NEGS = '<img src="img/7.png">';
const EIGHT_NEGS = '<img src="img/8.png">';
const FLAG = '<img src="img/flag.png">';
const STARTING_CELL = '<img src="img/starting cell.png">';
const BOMB = '<img src="img/Capture.png">';
const EMPTY_CELL = '<img src="img/empty cell.png">';

var gBoard = buildBoard();
function init() {
    var gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };

    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
}

function buildBoard() {
    var size = 4
    var board = new Array(size)

    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(size)
    }

    for (var i = 0; i < board.length; i++) {
        board[i]
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = {

                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false

            }
        }
    }
    board[2][3].isMine = true;
    board[2][3].isShown = true;

    board[3][1].isMine = true;
    board[3][1].isShown = true;
    return board
}

function renderBoard(board) {
    var strHtml = '';

    for (var i = 0; i < board.length; i++) {
        board[i];
        strHtml += '<tr>';
        for (var j = 0; j < board[i].length; j++) {
            var imageOfThisCell = null;
            console.log(board[i][j]);

            if (!board[i][j].isShown) {
                imageOfThisCell = STARTING_CELL

            } else {
                if (board[i][j].isMarked) {
                    imageOfThisCell = FLAG

                } else if (board[i][j].isMine) {
                    imageOfThisCell = BOMB
                    console.log('sgrhgdh');

                } else if (board[i][j].minesAroundCount === 0) {
                    imageOfThisCell = EMPTY_CELL

                } else if (board[i][j].minesAroundCount === 1 && board[i][j].isShown === true) {
                    imageOfThisCell = ONE_NEG

                } else if (board[i][j].minesAroundCount === 2) {
                    imageOfThisCell = TWO_NEGS

                } else if (board[i][j].minesAroundCount === 3) {
                    imageOfThisCell = THREE_NEGS

                } else if (board[i][j].minesAroundCount === 4) {
                    imageOfThisCell = FOUR_NEGS

                } else if (board[i][j].minesAroundCount === 5) {
                    imageOfThisCell = FIVE_NEGS

                } else if (board[i][j].minesAroundCount === 6) {
                    imageOfThisCell = SIX_NEGS

                } else if (board[i][j].minesAroundCount === 7) {
                    imageOfThisCell = SEVEN_NEGS

                } else if (board[i][j].minesAroundCount === 8) {
                    imageOfThisCell = EIGHT_NEGS
                }
            }


            var currCell = i + '-' + j;
            strHtml += '<td class="' + currCell + '" onclick="cellClicked(this)" ' +
                'class="cell ' + imageOfThisCell + imageOfThisCell + '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j].isMine) {

                var minX = i > 0 ? i - 1 : 0;
                var minY = j > 0 ? j - 1 : 0;
                var maxX = i < board.length - 1 ? i + 1 : board.length - 1
                var maxY = j < board[i].length - 1 ? j + 1 : board[i].length - 1

                for (var x = minX; x <= maxX; x++) {

                    for (var y = minY; y <= maxY; y++) {

                        if (board[x][y].isMine) {
                            board[i][j].minesAroundCount++
                        }
                    }
                }
            }
        }
    }
}

function cellClicked(cellClicked) {

    var elCellCoor = ''
    elCellCoor = cellClicked.classList.value
    var iOnBoard = getCellCoord(elCellCoor).i
    var jOnBoard = getCellCoord(elCellCoor).j

    console.log(gBoard[iOnBoard][jOnBoard]);

    gBoard[iOnBoard][jOnBoard].isShown = true;
    console.log(gBoard[iOnBoard][jOnBoard]);
    renderBoard(gBoard)
}

function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(0, 1);
    coord.j = +strCellId.substring(2);
    // console.log('coord', coord);
    return coord;
}