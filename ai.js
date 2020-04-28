function randomChoice(board){
    let available = []
    for (i = 0; i < COLUMNS; i++){
        if (board[i].length < 6){
            available.push(i);
        }
    }
    return random(available);
    // return 5;
}

function evaluateBoard(board){
    let out = 0;
    for (let column = 0; column < board.length; column++){
        for (let piece = 0; piece < board[column].length; piece++){
            out += evaluatePosition(board, column, piece);
        }
    }

    color = turn == "red" ? 1 : -1; 
    out *= color
    console.log(out)
    return out;
}


function evaluatePosition(board, x, y){
    let color = board[x][y] == "red" ? 1 : -1;
    let oneMultiplier = 1;
    let twoMultiplier = 2;
    let threeMultiplier = 5;
    let possible = [1,1,1,1,1,1,1];
    let canWinNextMove = false
    if (x <= COLUMNS - 4){
        for (let i = 1; i <= 3; i++){
            //testing horizontal
            if (possible[0] && board[x + i][y] !== board[x][y] && board[x + i][y] || outside(x + i, y)){
                possible[0] = 0;
            } else if (possible[0] && board[x + i][y] === board[x][y]){
                possible[0]++;
            } else if (possible[0] == 3 && i === 3 && board[x+i].length === y){
                canWinNextMove = true
                // console.log("0")

            }

            if (possible[1] && board[x + i][y + i] !== board[x][y] && board[x + i][y + i] || outside(x + i, y + i)){
                possible[1] = 0;
            } else if (possible[1] && board[x + i][y + i] === board[x][y]){
                possible[1]++;
            } else if (possible[1] == 3 && i === 3 && board[x+i].length === y + i){
                canWinNextMove = true
                // console.log("1")
                
            }
 

            if (possible[2] && board[x + i][y - i] !== board[x][y] && board[x + i][y - i] || outside(x + i, y - i)){
                possible[2] = 0;
            } else if (possible[2] && board[x + i][y - i] === board[x][y]){
                possible[2]++;
            } else if (possible[2] == 3 && i === 3 && board[x + i].length === y - i){
                canWinNextMove = true
                // console.log("2")
            }
        }
    } else {
        for (let i =0; i < 3; i++){
            possible[i] = 0
        }
    }

    if (y <= ROWS){
        for (let i = 1; i <= 3; i++){
            if (possible[3] && board[x][y + i] !== board[x][y] && board[x][y + i] || outside(x, y + i)){
                possible[3] = 0;
            } else if (possible[3] && board[x][y + i] === board[x][y]){
                possible[3]++;
            } else if (possible[3] == 3 && i === 3 && board[x].length === y + i){
                canWinNextMove = true
                // console.log("3")
            }
        }
    }

    if (x >=3){
        for (let i = 1; i <= 3; i++){
            //testing horizontal
            if (possible[4] && board[x - i][y] !== board[x][y] && board[x - i][y] || outside(x - i, y)){
                possible[4] = 0;
            } else if (possible[4] && board[x - i][y] === board[x][y]){
                possible[4]++;
            } else if (possible[4] == 3 && i === 3 && board[x - i].length === y){
                canWinNextMove = true
                // console.log("4")
            }

            if (possible[5] && board[x - i][y + i] !== board[x][y] && board[x - i][y + i] || outside(x - i, y + i)){
                possible[5] = 0;
            } else if (possible[5] && board[x - i][y + i] === board[x][y]){
                possible[5]++;
            } else if (possible[5] == 3 && i === 3 && board[x - i].length === y + i){
                canWinNextMove = true
                // console.log("5")
            }

            if (possible[6] && board[x - i][y - i] !== board[x][y] && board[x - i][y - i] || outside(x - i, y - i)){
                possible[6] = 0;
            } else if (possible[6] && board[x - i][y - i] === board[x][y]){
                possible[6]++;
            } else if (possible[6] == 3 && i === 3 && board[x - i].length === y - i){
                // console.log("6")
                canWinNextMove = true
            }
        }
    } else {
        for (let i =4; i <= 6; i++){
            possible[i] = 0
        }
    }

    let out = 0;
    for (let number of possible){
        if (number === 1){
            out += oneMultiplier * color;
        } else if (number === 2){
            out += twoMultiplier * color;
        } else if (number === 3){
            out += threeMultiplier * color;
        } else if (number === 4){
            out += 10000* color
        }
    }

    if (canWinNextMove){
        out += 10000 * color
    }
    console.log(x,y,out, possible)
    return out;
}


function outside(x, y){
    let evalX = x < 0 || x >= COLUMNS;
    let evalY = y < 0 || y >= ROWS;
    return evalX || evalY
}

function centerScore(){

}