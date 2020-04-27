let HEIGHT = 620;
let WIDTH = 525;
let thickness = 75;
let ROWS = 6;
let COLUMNS = 7;
let board = [];
let turn = "red";
let isGameOver = false;

function setup(){
    createCanvas(WIDTH,HEIGHT);
    for (i = 0; i < COLUMNS; i++){
        board.push([]);
    }
}

function draw(){
    drawBoard();
    drawPieces();
    drawText();
    drawInteractivePiece();
}

function mouseReleased(){
    playerChoice = floor(mouseX/thickness)
    if (board[playerChoice].length < ROWS){  // checks whether the column is filled
        makeMove(playerChoice);
        aiChoice = randomChoice(board); // choose the algorithm here
        makeMove(aiChoice);
    }
}

function makeMove(x){
    if (!isGameOver){
        addPiece(turn, x);
        if (checkBoard()){
            isGameOver = true
        } else{
            turn = turn === "red" ? "blue" : "red";
        }
    }
}


function addPiece(side, column){
    if (column < COLUMNS && board[column].length < ROWS){
        board[column].push(side);
        return true;
    }
    else{
        return false;
    }
}

function checkBoard(){
    for (let column = 0; column < board.length; column++){
        for (let piece = 0; piece < board[column].length; piece++){
            if (checkPiece(column, piece)){
                return(board[column][piece]);
            }
        }
    }
    return false;
}

function checkPiece(x, y){
    let possible = []
    if (x <= COLUMNS - 4){
        possible = [true, true, true];
        for (let i = 1; i <= 3; i++){
            if (board[x + i][y] !== board[x][y] && possible[0]){
                possible[0] = false;
            }
            if (board[x + i][y + i] !== board[x][y] && possible[1]){
                possible[1] = false;
            }
            if (board[x + i][y - i] !== board[x][y] && possible[2]){
                possible[2] = false;
            }
        }
    }
    if (!possible.includes(true)){
        if (y <= ROWS -4){
            out = true;
            for (let i = 1; i <= 3; i++){
                if (board[x][y + i] !== board[x][y] && out){
                    out = false
                }
            }
            return out ? board[x][y] : out;
        } else {
            return false
        }
    } else{
        return board[x][y];
    }
}

function drawBoard(){
    background(255, 255, 255);
    rectMode(CORNERS);
    for (let i = 0; i < ROWS; i++){
        for (let j = 0; j < COLUMNS; j++){
            fill(255, 255, 255);
            rect(thickness * j,HEIGHT - i * thickness, thickness * (j + 1), HEIGHT - (i + 1) * thickness);
        }
    }
}

function drawPieces(){
    for (let column = 0; column < board.length; column++){
        for (let piece = 0; piece < board[column].length; piece++){
            if (board[column][piece] === "red"){
                fill(255, 0, 0);
            } else {
                fill(0, 0, 255);
            }
            circle((column + 0.5) * thickness, HEIGHT - (piece + 0.5) * thickness, thickness - 10);
        }
    }
}

function drawText(){
    if (turn === "red"){
        textSize(50);
        fill(200,200,200);
        text("BLUE", 340, 65);
        fill(255, 0, 0);
        textSize(50);
        text("RED", 50, 65);
        if (isGameOver){
            textSize(50)
            text("RED WINS", WIDTH/2-130, 150)

        }
    } else if (turn === "blue"){
        fill(200,200,200);
        textSize(50);
        text("RED", 50, 65);
        fill(0, 0, 255);
        text("BLUE", 340, 65);
        if (isGameOver){
            textSize(50)
            text("BLUE WINS", WIDTH/2-130, 150)
        }
    }
}

function drawInteractivePiece(){
    if (!isGameOver){
        if (turn == "red"){
            fill(255, 0, 0);
        } else {
            fill(0, 0, 255);
        }
        if (mouseX < WIDTH && mouseY < HEIGHT){
            circle(floor(mouseX / thickness) * thickness + thickness / 2, 130, thickness - 10 )
        }
    }
}