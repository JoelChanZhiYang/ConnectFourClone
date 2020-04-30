# ConnectFourClone
## Summary
Connect Four CLone is a board game simulation that was written in JavaScript. It uses the p5.js library for the interactive and graphcal elements. An artificial intelligence (AI) was implemented using the minimax algorithm, optimised with alpha-beta pruning.

[Click here to try it out!](https://joelchanzhiyang.github.io/ConnectFourClone/)

## The Goal

This project aims to create a functional Connect Four clone and implement a minimax AI for the game. 

## Minimax Algorithm
### Evaluation Function
For a game with a smaller game space (such as tic-tac-toe), the minimax algorithm usually runs until one player has won. However, for Connect Four, the game space is too big and it would take too much time to go through every permutation. Hence, an evaluation function is needed to allow us to compare between game states without actually knowing the outcome. 

<img src = "./Assets/EvaluationFunction.png" style="width: 400px;"/>

A good evaluation function indicate how "good" a game estate is for a certain player. The more accurat the evaluation function, the more likely that the minimax algorithm will pick the most ideal next move for that player. 

### Evaluation Heuristic

A evaluation heuristic needs to balance between computing time and accuracy. 

The heuristic that I have chosen calculates the total number of "four in a row" possible for the red pieces minus the total number of "four in a row" possible for the blue pieces. Paths that have 2 or 3 pieces are given higher weights in order to account for their higher value. 

For every piece, algorithm searches in 7 directions. There is no need to search below the piece as it is not possible to place a new piece underneath an existing piece.

<img src = "./Assets/searchSpace.png" style="width: 400px;"/>

#### Scoring system

For the sake of demonstration, assume that we are only searching to the right of one particular piece.

1. If the search space contain a different coloured piece or the search space is out of bounds, then a score of **0** is given.

<img src = "./Assets/Score0.png" style="width: 400px;"/>

2. If the seerch space contains only empty spaces or pieces of the same colour, then a score is given based on how many pieces are inside the search space
