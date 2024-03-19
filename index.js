const info = document.getElementById("info");
const bat = document.getElementsByClassName("bat");
const jok = document.getElementsByClassName("jok");

  const gameBoardElement = document.getElementById("board");
  const batman = document.getElementById("batman");
  const joker = document.getElementById("joker");
  const startCells = ["", "", "", "", "", "", "", "", ""];
  const player1 = "Batman"
  const player2 = "Joker"
  let currentPlayer = player1;
  let gameOver = false;


  function createBoard() {
    startCells.forEach((cell, index) => {
      const createDiv = document.createElement("div");
      createDiv.classList.add("squares");
      createDiv.dataset.index = index;
      createDiv.addEventListener('click', handleCellClick);
      gameBoardElement.appendChild(createDiv);
    });
  };

  createBoard();

  function handleCellClick(event) {
    if (gameOver) return; // If the game is already over, do nothing

    const clickedCell = event.target;
    const cellIndex = clickedCell.dataset.index;

    // Check if the clicked cell is already filled
    if (startCells[cellIndex] !== "") return;

    // Update the board and display the current player's symbol
    startCells[cellIndex] = currentPlayer;
    clickedCell.style.backgroundImage = currentPlayer === player1 ? `url("./batman-svgrepo-com (1).svg")` : `url("./joker-svgrepo-com (1).svg")`;

    // Check for a winner
    const winner = checkForWinner(startCells);
    if (winner) {
        info.textContent = `${winner} wins!`;
        gameOver = true;
        return;
    }

    // Check for a draw
    if (!startCells.includes("")) {
        info.textContent = "It's a draw!";
        gameOver = true;
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === player1 ? player2 : player1;
};

function checkForWinner(startCells) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (
            startCells[a] &&
            startCells[a] === startCells[b] &&
            startCells[a] === startCells[c]
        ) {
            return startCells[a] === player1 ? player1 : player2; // Return the name of the winning player
        }
    }
    return null; // Return null if no winner is found
};


function restartGame() {
  // Clear the game board
  gameBoardElement.innerHTML = '';
  // Clear the startCells array
  startCells.fill('');
  // Reset currentPlayer to player1
  currentPlayer = player1;
  // Reset gameOver flag
  gameOver = false;
  // Clear the info text
  info.textContent = '';
  // Recreate the game board
  createBoard();
}