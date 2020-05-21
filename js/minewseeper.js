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

var timerStarts = 0;
var timer = 0
var timerEnds = 0;
var shownCounter = 0;

var gLevel = {
    size: 8,
    mines: 15
};

var gGame = {
    isOn: true,
    shownCounter: 0,
    markedCount: 0,
};

var gBoard = buildBoard();
function init() {
    var restartButton = document.querySelector('.restart-button button')

    restartButton.style.display = "none";
    stop();
    document.querySelector('.stopwatch').innerText = FormatTime(0);
    timerStarts = 0;
    timer = 0
    timerEnds = 0;

    gGame = {
        isOn: true,
        shownCounter: 0,
        markedCount: 0,
    };

    gBoard = buildBoard();
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
}

function buildBoard() {

    var boardSize = gLevel.size
    var board = new Array(boardSize)

    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(boardSize)
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

    var bombsCount = 0;

    while (bombsCount < gLevel.mines) {
        var iForBomb = getRandomInt(0, boardSize)
        var jForBomb = getRandomInt(0, boardSize)

        if (!board[iForBomb][jForBomb].isMine) {
            board[iForBomb][jForBomb].isMine = true;
            bombsCount++
        }
    }

    return board
}

function renderBoard(board) {
    var strHtml = '';

    for (var i = 0; i < board.length; i++) {
        board[i];
        strHtml += '<tr>';
        for (var j = 0; j < board[i].length; j++) {
            var imageOfThisCell = null;

            if (!board[i][j].isShown && !board[i][j].isMarked) {
                imageOfThisCell = STARTING_CELL

            } else if (board[i][j].isShown && board[i][j].isMarked) {
                imageOfThisCell = FLAG


            } else {

                if (board[i][j].isMine) {
                    imageOfThisCell = BOMB

                } else if (board[i][j].minesAroundCount === 0) {
                    imageOfThisCell = EMPTY_CELL

                } else if (board[i][j].minesAroundCount === 1) {
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
            strHtml += '<td class="' + currCell + '" onmousedown="cellClicked(this, event)" ' +
                'class="cell ' + imageOfThisCell + imageOfThisCell + '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;

    
    gGame.shownCounter = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j].length
            if (board[i][j].isShown) {
                gGame.shownCounter++
            } else if (board[i][j].isMarked) {
                gGame.shownCounter--
            }
        }
        
    }

    if (gLevel.mines === gGame.markedCount && (gLevel.size ** 2 - gLevel.mines) === gGame.shownCounter) {

        var isTheGameWon = true
        isGameOver(isTheGameWon)
    }
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

function showAroundCell(x, y) {

    if (gBoard[x][y].minesAroundCount === 0) {

        var minX = x > 0 ? x - 1 : 0;
        var minY = y > 0 ? y - 1 : 0;
        var maxX = x < gBoard.length - 1 ? x + 1 : gBoard.length - 1
        var maxY = y < gBoard[x].length - 1 ? y + 1 : gBoard[y].length - 1

        for (var x = minX; x <= maxX; x++) {

            for (var y = minY; y <= maxY; y++) {

                if (gBoard[x][y].isMine) {
                    continue
                }
                gBoard[x][y].isShown = true;
            }
        }
    }
}

function cellClicked(cellClicked, event) {
    if (gGame.isOn === false) {
        return
    }



    gGame.isOn = true;

    var isButtonLeft = event.button === 0;
    var isButtonRight = event.button === 2;

    if (timerStarts === 0) {
        start();
        timerStarts = Date.now();
    }
    var elCellCoor = ''
    elCellCoor = cellClicked.classList.value

    var iOnBoard = getCellCoord(elCellCoor).i
    var jOnBoard = getCellCoord(elCellCoor).j

    if (isButtonRight) {

        if (!gBoard[iOnBoard][jOnBoard].isShown && !gBoard[iOnBoard][jOnBoard].isMarked) {
            gBoard[iOnBoard][jOnBoard].isShown = true;
            gBoard[iOnBoard][jOnBoard].isMarked = true;
            gGame.markedCount++
        }
        else if (gBoard[iOnBoard][jOnBoard].isShown && gBoard[iOnBoard][jOnBoard].isMarked) {
            gBoard[iOnBoard][jOnBoard].isMarked = false;
            gBoard[iOnBoard][jOnBoard].isShown = false;
            gGame.markedCount--
        }

    }
    else if (isButtonLeft) {


        if (gBoard[iOnBoard][jOnBoard].isMarked && gBoard[iOnBoard][jOnBoard].isShown) {
            return
        } else if (gBoard[iOnBoard][jOnBoard].isMine) {

            var isTheGameWon = false
            isGameOver(isTheGameWon)

        } else if (!gBoard[iOnBoard][jOnBoard].isShown && !gBoard[iOnBoard][jOnBoard].isMarked) {

            gBoard[iOnBoard][jOnBoard].isShown = true;
            showAroundCell(iOnBoard, jOnBoard)
        } else {
            return
        }
    }

    

    renderBoard(gBoard)
    
}

function isGameOver(didWeWin) {

    if (!didWeWin) {
        stop();
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[i].length; j++) {

                if (gBoard[i][j].isMine && !gBoard[i][j].isShown) {
                    gBoard[i][j].isShown = true;
                }
            }
        }
        gGame.isOn = false;

        var restartButton = document.querySelector('.restart-button button')

        restartButton.style.display = "block";
    }
    if (didWeWin) {
        stop();
        var restartButton = document.querySelector('.restart-button button')

        restartButton.style.display = "block";
        gGame.isOn = false;
    }
}

function whichButton(event) {

    return event.button
}

function getCellCoord(strCellId) {
    var coord = [];
    coord = strCellId.split("-")

    coord.i = parseInt(coord[0]);
    coord.j = parseInt(coord[1]);

    return coord;
}

function getLevel(elLevelChosen) {

    if (elLevelChosen.value === '1') {
        gLevel.size = 4
        gLevel.mines = 2
    }

    if (elLevelChosen.value === '2') {
        gLevel.size = 8
        gLevel.mines = 15
    }

    if (elLevelChosen.value === '3') {
        gLevel.size = 12
        gLevel.mines = 30
    }
    stop();
    init();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function FormatTime(milliTime) {
    var FormattedText;

    var hundredth = (Math.trunc(milliTime / 10)) % 100;
    var seconds = (Math.trunc(milliTime / 1000)) % 60;
    var minutes = Math.trunc(milliTime / 60000);

    FormattedText =
        minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + ":" +
        (hundredth < 10 ? "0" : "") + hundredth;

    return FormattedText;
}

function start() {
    timer = setInterval(run, 10);
}

function run() {
    var timerEnds = Date.now();

    var milli = Math.trunc(timerEnds - timerStarts);

    document.querySelector('.stopwatch').innerText = FormatTime(milli);
}

function stop() {
    clearInterval(timer);
}