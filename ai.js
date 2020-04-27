function randomChoice(board){
    let available = []
    for (i = 0; i < board.length; i++){
        if (board[i].length < 6){
            available.push(i);
        }
    }
    return random(available);
    // return 1;
}


