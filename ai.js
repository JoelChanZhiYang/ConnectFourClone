function randomChoice(board){
    let available = []
    for (i = 0; i < COLUMNS; i++){
        if (board[i].length < 6){
            available.push(i);
        }
    }
    return random(available);
    return 6;
}

function minimax(board, depth, isMaximisingPlayer, alpha, beta, first = true){
    // console.log(board, depth, isMaximisingPlayer)

    let available = []
    for (i = 0; i < COLUMNS; i++){
        if (board[i].length < 6){
            available.push(i);
        }
    }

    let thisTurn = isMaximisingPlayer ? "red": "blue"
    if (depth == 0 || checkBoard(board)){
        let score = evaluateBoard(board, thisTurn)
        // print(thisTurn, score,"score")
        return score
    }

    if (isMaximisingPlayer){
        let maxEval = -Infinity;
        let bestColumn;
        for (let column of available){
            // console.log(column, thisTurn)
            board[column].push(thisTurn)
            let eval = minimax(board, depth - 1, false, alpha, beta, false)
            maxEval = max(eval, maxEval);
            if (eval == maxEval){
                bestColumn = column
            }
            alpha = max(alpha, eval);
            if (beta <= alpha){
                break;
            }
            board[column].pop()
        }
        // print(maxEval,bestColumn, "max")
        if (first){
            return bestColumn
        } else {
            return maxEval
        }
    }

    else{
        let minEval = Infinity;
        let bestMinColumn;
        for (let column of available){
            // console.log(column, thisTurn)
            board[column].push(thisTurn)
            let eval = minimax(board, depth - 1, true,alpha, beta, false)
            minEval = min(eval, minEval);
            if (eval == minEval){
                bestMinColumn = column
            }
            beta = min(beta, eval);
            if (beta <= alpha){
                break;
            }
            board[column].pop()
        }
        // print(minEval, bestMinColumn, "min")
        if (first){
            return bestMinColumn;
        } else {
            return minEval
        }
    }

}


function evaluateBoard(board, turn){
    let out = 0;
    for (let column = 0; column < board.length; column++){
        for (let piece = 0; piece < board[column].length; piece++){
            out += evaluatePiece(board, column, piece, turn);
        }
    }
    // console.log(out)
    return out;
}


function evaluatePiece(board, x, y , nextMove){
    let color = board[x][y] == "red" ? 1 : -1;
    let oneMultiplier = 1;
    let twoMultiplier = 2;
    let threeMultiplier = 5;
    let winMultiplier = 10000
    let possible = [1, 1, 1, 1, 1, 1, 1];
    let underneath = [false, false, false, false, false, false, false]
    if (x <= COLUMNS - 4){
        for (let i = 1; i <= 3; i++){
            if (directionalCheck(board, x, y, possible, x + i, y, 0)){
                underneath[0] = true;
            }

            if (directionalCheck(board, x, y, possible, x + i, y + i, 1)){
                underneath[1] = true;
            }

            if (directionalCheck(board, x, y, possible, x + i, y - i, 2)){
                underneath[2] = true;
            }
        }
    } else {
        possible = [0, 0, 0, 1, 1, 1, 1];
    }

    if (y <= ROWS - 4){
        for (let i = 1; i <= 3; i++){
            if (directionalCheck(board, x, y, possible, x, y + i, 3)){
                underneath[3] = true;
            }
        }
    } else {
        possible[3] = 0;
    }

    if (x >=3){
        for (let i = 1; i <= 3; i++){
            if (directionalCheck(board, x, y, possible, x - i, y, 4)){
                underneath[4] = true;
            }
            if (directionalCheck(board, x, y, possible, x - i, y + i, 5)){
                underneath[5] = true;
            }
            if (directionalCheck(board, x, y, possible, x - i, y - i, 6)){
                underneath[6] = true;
            }
        }
    } else {
        for (let i =4; i <= 6; i++){
            possible[i] = 0
        }
    }
    
    let out = 0;
    for (let [index, number] of possible.entries()){
        if (number === 1){
            out += oneMultiplier * color;
        } else if (number === 2){
            out += twoMultiplier * color;
        } else if (number === 3){
            if (underneath[index] && board[x][y] == nextMove){
                out += winMultiplier * color / 2
            } else {
                out += threeMultiplier * color;
            }
        } else if (number === 4){
            out += winMultiplier * color
        }
    }
    // print(x, y, possible, underneath, nextMove, out)
    return out
}



function directionalCheck(board, x, y, possible, dx, dy, checkNo){
    if (possible[checkNo]){
        if (!board[dx][dy] && !outside(dx, dy)){
            return board[dx].length === dy;
        } else if (board[dx][dy] !== board[x][y] || outside(dx, dy)){
            possible[checkNo] = 0
        } else {
            possible[checkNo]++
        }
    }
}


function outside(x, y){
    let evalX = x < 0 || x >= COLUMNS;
    let evalY = y < 0 || y >= ROWS;
    return evalX || evalY
}
