var index, turnSpan, symbols = "XO";
var arrayOfCells;
var computerPlays, playerClicks;
var playAgainButton;
var start, end;

function checkWinTie() {
  var noWinTie = 0, win = 1, tie = 2;
  end = new Date();

  // Checks all eight winning patterns
  if (arrayOfCells[0].innerHTML == arrayOfCells[1].innerHTML && arrayOfCells[0].innerHTML == arrayOfCells[2].innerHTML && arrayOfCells[0].innerHTML != "") {
    alert(symbols[index] + " wins!\nYou finished the game in " + (end - start) / 1000 + "s!");
    playAgainButton.disabled = false;
    return win;
  }
  else if (arrayOfCells[3].innerHTML == arrayOfCells[4].innerHTML && arrayOfCells[3].innerHTML == arrayOfCells[5].innerHTML && arrayOfCells[3].innerHTML != "") {
    alert(symbols[index] + " wins!\nYou finished the game in " + (end - start) / 1000 + "s!");
    playAgainButton.disabled = false;
    return win;
  }
  else if (arrayOfCells[6].innerHTML == arrayOfCells[7].innerHTML && arrayOfCells[6].innerHTML == arrayOfCells[8].innerHTML && arrayOfCells[6].innerHTML != "") {
    alert(symbols[index] + " wins!\nYou finished the game in " + (end - start) / 1000 + "s!");
    playAgainButton.disabled = false;
    return win;
  }
  else if (arrayOfCells[0].innerHTML == arrayOfCells[3].innerHTML && arrayOfCells[0].innerHTML == arrayOfCells[6].innerHTML && arrayOfCells[0].innerHTML != "") {
    alert(symbols[index] + " wins!\nYou finished the game in " + (end - start) / 1000 + "s!");
    playAgainButton.disabled = false;
    return win;
  }
  else if (arrayOfCells[1].innerHTML == arrayOfCells[4].innerHTML && arrayOfCells[1].innerHTML == arrayOfCells[7].innerHTML && arrayOfCells[1].innerHTML != "") {
    alert(symbols[index] + " wins!\nYou finished the game in " + (end - start) / 1000 + "s!");
    playAgainButton.disabled = false;
    return win;
  }
  else if (arrayOfCells[2].innerHTML == arrayOfCells[5].innerHTML && arrayOfCells[2].innerHTML == arrayOfCells[8].innerHTML && arrayOfCells[2].innerHTML != "") {
    alert(symbols[index] + " wins!\nYou finished the game in " + (end - start) / 1000 + "s!");
    playAgainButton.disabled = false;
    return win;
  }
  else if (arrayOfCells[0].innerHTML == arrayOfCells[4].innerHTML && arrayOfCells[0].innerHTML == arrayOfCells[8].innerHTML && arrayOfCells[0].innerHTML != "") {
    alert(symbols[index] + " wins!\nYou finished the game in " + (end - start) / 1000 + "s!");
    playAgainButton.disabled = false;
    return win;
  }
  else if (arrayOfCells[2].innerHTML == arrayOfCells[4].innerHTML && arrayOfCells[2].innerHTML == arrayOfCells[6].innerHTML && arrayOfCells[2].innerHTML != "") {
    alert(symbols[index] + " wins!\nYou finished the game in " + (end - start) / 1000 + "s!");
    playAgainButton.disabled = false;
    return win;
  }
  else { // Checks for no win or tie
    for (var i = 0; i < arrayOfCells.length; i++) {
      if (arrayOfCells[i].innerHTML == "") {
        return noWinTie;
      }
    }

    // Tie
    alert("It's a tie!\nYou finished the game in " + (end - start) / 1000 + "s!");
    playAgainButton.disabled = false;
    return tie;
  } // end of else
} // end of checkWinTie()

function handleComputerMove(arrayOfCells) {
  var computerMove; // Index in arrayOfCells of computer's move
  var gameStatus;

  do { // Randomly generates move and checks if not taken
    computerMove = Math.floor(Math.random() * arrayOfCells.length);
  } while (arrayOfCells[computerMove].innerHTML != "");

  arrayOfCells[computerMove].innerHTML = symbols[index];
  gameStatus = checkWinTie();

  // If someone has won (gameStatus == 1) or there is a tie (gameStatus == 2)
  if (gameStatus) {
    turnSpan.innerHTML = "";
    return;
  }

  index = (index + 1) % symbols.length;
  turnSpan.innerHTML = "It is " + symbols[index] + "'s turn.";
} // end of handleComputerMove()

function handleCellClick(evt) {
  if (evt.target.innerHTML == "") { // Checks if selected spot in table empty
    var gameStatus;

    evt.target.innerHTML = symbols[index];
    gameStatus = checkWinTie();

    // If someone has won (gameStatus == 1) or there is a tie (gameStatus == 2)
    if (gameStatus) {
      turnSpan.innerHTML = "";
      return;
    }

    index = (index + 1) % symbols.length;
    turnSpan.innerHTML = "It is " + symbols[index] + "'s turn.";

    if (computerPlays && symbols[index] == "O") {
      playerClicks++; // The human player has made a move
      // Stops computer from making move when human player makes last move to fill board
      if (playerClicks < 5) {
        handleComputerMove(arrayOfCells);
      } // end of inner if
    } // end of outer if
  }
} // end of handleCellClick)()

function handleStartRestartPlayAgain() {
  start = new Date();
  var computerRB = document.getElementById('p_vs_c');
  playAgainButton.disabled = true;
  turnSpan = document.getElementById('turn');
  index = Math.floor(Math.random() * symbols.length);

  for (var i = 0; i < arrayOfCells.length; i++) { // Clear table
    arrayOfCells[i].innerHTML = "";
  }

  turnSpan.innerHTML = "It is " + symbols[index] + "'s turn.";

  if (computerRB.checked) {
    computerPlays = true;
    playerClicks = 0; // Number of times human player had turn
  }
  else {
    computerPlays = false;
  }

  arrayOfCells[0].addEventListener('click', handleCellClick);
  arrayOfCells[1].addEventListener('click', handleCellClick);
  arrayOfCells[2].addEventListener('click', handleCellClick);
  arrayOfCells[3].addEventListener('click', handleCellClick);
  arrayOfCells[4].addEventListener('click', handleCellClick);
  arrayOfCells[5].addEventListener('click', handleCellClick);
  arrayOfCells[6].addEventListener('click', handleCellClick);
  arrayOfCells[7].addEventListener('click', handleCellClick);
  arrayOfCells[8].addEventListener('click', handleCellClick);

  if (computerPlays && symbols[index] == "O") {
    handleComputerMove(arrayOfCells);
  }
} // end of handleStartRestartPlayAgain()


window.addEventListener('load', function() {
  var startRestartButton = document.getElementById('start_restart_btn');
  var playerRB = document.getElementById('p_vs_p');
  playerRB.checked = true; // Made Player v Player the default mode
  playAgainButton = document.getElementById('play_again_btn');
  playAgainButton.disabled = true;
  arrayOfCells = new Array();

  for (var i = 1; i <= 9; i++) { // Create variables for table cells
    arrayOfCells[arrayOfCells.length] = document.getElementById('cell_' + i);
  }

  startRestartButton.addEventListener('click', handleStartRestartPlayAgain);
  playAgainButton.addEventListener('click', handleStartRestartPlayAgain);
}); // end of window.addEventListener()
