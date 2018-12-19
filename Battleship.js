// code reference: https://github.com/LearnTeachCode/Battleship-JavaScript
// tsc Battleship.ts --watch
var rows = 10;
var columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var columns2 = ["k", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];
var squareSize = 47;
document.getElementById("gameboard2").style.pointerEvents = "all";
// get the container element
var gameBoardContainer1 = document.getElementById("gameboard1");
var gameBoardContainer2 = document.getElementById("gameboard2");
function gameGridMaker() {
    // make the grid columns and rows
    for (var i = 0; i < columns.length; i++) {
        for (var j = 0; j < rows; j++) {
            // create a new div HTML element for each grid square and make it the right size
            var square = document.createElement("div");
            gameBoardContainer1.appendChild(square);
            // give each div element a unique id
            square.id = columns[i] + j + i;
            // set each grid square's coordinates: multiples of the current row or column number
            var topPosition = j * squareSize;
            var leftPosition = i * squareSize;
            // use CSS absolute positioning to place each grid square on the page
            square.style.top = topPosition + 'px';
            square.style.left = leftPosition + 'px';
        }
    }
}
gameGridMaker();
function gameGrid2Maker() {
    // make the second grid columns and rows
    for (var i = 0; i < columns2.length; i++) {
        for (var j = 0; j < rows; j++) {
            // create a new div HTML element for each grid square and make it the right size
            var square2 = document.createElement("div");
            gameBoardContainer2.appendChild(square2);
            // give each div element a unique id
            square2.id = columns2[i] + j + i;
            // set each grid square's coordinates: multiples of the current row or column number
            var topPosition = j * squareSize;
            var leftPosition = i * squareSize;
            // use CSS absolute positioning to place each grid square on the page
            square2.style.top = topPosition + 'px';
            square2.style.left = leftPosition + 'px';
        }
    }
}
gameGrid2Maker();
var hitCount = 0;
/* create the 2d array that will contain the status of each square on the board and place ships on the board
*/
var gameBoard = [];
for (var i = 0; i < 10; i++) {
    gameBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}
console.log("initialised Game Board");
console.log(gameBoard);
// go down row wise and fill with a ship
function fillX(index, posx1, posx2, board) {
    for (var x = posx1; x < posx2; x++) {
        board[index][x] = 1;
    }
}
function fillY(index, posy1, posy2, board) {
    for (var y = posy1; y < posy2; y++) {
        board[y][index] = 1;
    }
}
function fillShip(shipLength, board) {
    var index = Math.floor(Math.random() * 10);
    var pos = Math.floor(Math.random() * 10);
    pos = pos > shipLength ? pos - shipLength : pos;
    var offset = shipLength;
    if (Math.floor(Math.random() * 2)) {
        fillX(index, pos, pos + offset, board);
    }
    else {
        fillY(index, pos, pos + offset, board);
    }
}
// Battleship  - 4 hits
// Destroyer   - 3 hits
// Submarine   - 3 hits
// Patrol Boat - 2 hits
var Carrier = 5;
var Battleship = 4;
var Destroyer = 3;
var Submarine = 3;
var PatrolBoat = 2;
// Spawning boats
fillShip(Carrier, gameBoard);
fillShip(Battleship, gameBoard);
fillShip(Destroyer, gameBoard);
fillShip(Submarine, gameBoard);
fillShip(PatrolBoat, gameBoard);
// Spawned Boats
// ensuring shipnumber
var game_count = 0;
for (var i = 0; i < gameBoard.length; i++) {
    for (var j = 0; j < gameBoard.length; j++) {
        if (gameBoard[i][j] === 1) {
            game_count = game_count + 1;
        }
    }
}
if (game_count < 17) {
    fillShip(Submarine, gameBoard);
    console.log("Extra ship deployed");
}
// ensured ship number
console.log("Filled Game Board");
console.log(gameBoard);
//  click to fire missile !
function fireMissile(e) {
    // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
    if (e.target !== e.currentTarget) {
        // extract row and column # from the HTML element's id
        var row = e.target.id.substring(1, 2);
        var col = e.target.id.substring(2, 3);
        //alert("Clicked on row " + row + ", col " + col);
        // if player clicks a square with no ship, change the color and change square's value
        if (gameBoard[row][col] == 0) {
            e.target.style.background = '#bbb';
            // set this square's value to 3 to indicate that they fired and missed
            gameBoard[row][col] = 3;
            // if player clicks a square with a ship, change the color and change square's value
        }
        else if (gameBoard[row][col] == 1) {
            e.target.style.background = 'red';
            // set this square's value to 2 to indicate the ship has been hit
            gameBoard[row][col] = 2;
            // increment hitCount each time a ship is hit
            hitCount++;
            var countView = document.getElementById("score");
            countView.textContent = "[ " + hitCount + " ]";
            // this definitely shouldn't be hard-coded, but here it is anyway. lazy, simple solution:
            if (hitCount == 17) {
                alert("All enemy battleships have been defeated! You win!");
            }
            // if player clicks a square that's been previously hit, let them know
        }
        else if (gameBoard[row][col] > 1) {
            alert("Stop wasting your torpedos! You already fired at this location.");
        }
    }
    console.log("Pointer Events value:" + document.getElementById("gameboard2").style.pointerEvents);
    document.getElementById("gameboard2").style.pointerEvents = "none";
    console.log("Pointer Events value:" + document.getElementById("gameboard2").style.pointerEvents);
    e.stopPropagation();
}
gameBoardContainer2.addEventListener("click", fireMissile);
gameBoardContainer2.addEventListener("click", Computer_Turn);
var enemyHitCount = 0;
/* create the 2d array that will contain the status of each square on the board and place ships on the board
*/
var enemyGameBoard = [];
for (var i = 0; i < 10; i++) {
    enemyGameBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}
console.log("initialised Enemy Board");
console.log(enemyGameBoard);
// Spawning boats
fillShip(Submarine, enemyGameBoard);
fillShip(PatrolBoat, enemyGameBoard);
fillShip(Destroyer, enemyGameBoard);
fillShip(Carrier, enemyGameBoard);
fillShip(Battleship, enemyGameBoard);
// Spawned Boats
// ensuring shipnumber
var game_count2 = 0;
for (var i = 0; i < enemyGameBoard.length; i++) {
    for (var j = 0; j < enemyGameBoard.length; j++) {
        if (enemyGameBoard[i][j] === 1) {
            game_count2 = game_count2 + 1;
        }
    }
}
if (game_count2 < 17) {
    fillShip(Submarine, enemyGameBoard);
    console.log("Extra Enemy ship deployed");
}
// ensured ship number
console.log("Filled Enemy Board !");
console.log(gameBoard);
function Computer_Turn(e) {
    console.log("Computer Turn !");
    document.getElementById("gameboard2").style.pointerEvents = "all";
    // extract row and column # from the HTML element's id
    var row = (Math.floor(Math.random() * 10));
    var col = (Math.floor(Math.random() * 10));
    var idBank = [];
    var bankIndex = Math.floor(Math.random() * 100);
    for (var i = 0; i < columns2.length; i++) {
        for (var j = 0; j < rows; j++) {
            // create a new string array
            // push all possible values
            var str = (columns[i] + j + i);
            idBank.push(str);
        }
    }
    console.log("idBank: " + idBank[0]);
    console.log("bankIndex: " + bankIndex);
    var col_row_Str = idBank[bankIndex];
    console.log("col_row_Str: " + col_row_Str);
    // if player clicks a square with no ship, change the color and change square's value
    if (enemyGameBoard[row][col] == 0 || enemyGameBoard[row][col] == 3) {
        console.log("gamboard children value : ");
        document.getElementById(col_row_Str).style.background = '#bbb';
        // set this square's value to 3 to indicate that they fired and missed
        enemyGameBoard[row][col] = 3;
    }
    // if player clicks a square with a ship, change the color and change square's value 
    else if (enemyGameBoard[row][col] == 1) {
        document.getElementById(col_row_Str).style.background = 'red';
        // set this square's value to 2 to indicate the ship has been hit
        enemyGameBoard[row][col] = 2;
        // increment hitCount each time a ship is hit
        enemyHitCount++;
        var countView = document.getElementById("comp_score");
        countView.textContent = "[ " + enemyHitCount + " ]";
        if (enemyGameBoard[row + 1][col] == 1 || enemyGameBoard[row][col + 1] == 1) { // consequtive hits !
            document.getElementById(col_row_Str).style.background = 'red';
            // set this square's value to 2 to indicate the ship has been hit
            enemyGameBoard[row][col] = 2;
            // increment hitCount each time a ship is hit
            enemyHitCount++;
            countView.textContent = "[ " + enemyHitCount + " ]";
        }
        if (enemyHitCount == 17) {
            alert("All Your battleships have been defeated! You Lost ! :( ");
        }
        // if player clicks a square that's been previously hit, let them know
    }
    // else if (gameBoard[row][col] > 1) {
    // 	alert("Stop wasting your torpedos! You already fired at this location.");
    // }		
    e.stopPropagation();
}
// COMUTERS GAME BOARD
