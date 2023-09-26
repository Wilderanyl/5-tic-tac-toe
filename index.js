const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_POSSIBLE = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
const boxesElement = document.querySelectorAll("[data-box]");
const boardElement = document.getElementById("board");
const restartContainer = document.getElementById("restart");
const restartText = document.getElementById("restart-text");
const restartButton = document.getElementById("restart-button");
let oturn = false;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  oturn = false;
  boxesElement.forEach((box) => {
    box.classList.remove(X_CLASS);
    box.classList.remove(O_CLASS);
    box.removeEventListener("click", handleClick);
    box.addEventListener("click", handleClick, { once: true });
  });
  handleHover();
  restartContainer.classList.remove("show");
}

function handleHover() {
  boardElement.classList.remove(O_CLASS);
  boardElement.classList.remove(X_CLASS);
  if (oturn) {
    boardElement.classList.add(O_CLASS);
  } else if (!oturn) {
    boardElement.classList.add(X_CLASS);
  } else;
}

function handleClick(e) {
  const currentClass = oturn ? O_CLASS : X_CLASS;
  const targetBox = e.target;
  targetBox.classList.add(currentClass);
  if (checkWin(currentClass)) {
    if (currentClass == X_CLASS) {
      restartContainer.classList.add("show");
      restartText.innerText = "X is the winner!";
    } else {
      restartContainer.classList.add("show");
      restartText.innerText = "O is the winner!";
    }
  } else if (isDraw()) {
    restartContainer.classList.add("show");
    restartText.innerText = " Both are draw!";
  }
  swapTurn();
  handleHover();
}

function isDraw() {
  return [...boxesElement].every(
    (a) => a.classList.contains(X_CLASS) || a.classList.contains(O_CLASS)
  );
}

function swapTurn() {
  oturn = !oturn;
}

function checkWin(currentClass) {
  return WINNING_POSSIBLE.some((a) => {
    return a.every((i) => {
      return boxesElement[i].classList.contains(currentClass);
    });
  });
}
