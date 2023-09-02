const canvas = document.querySelector("#game__canvas");
const ctx2D = canvas.getContext("2d");

const btn = {
  up: document.querySelector("#btn--up"),
  down: document.querySelector("#btn--down"),
  left: document.querySelector("#btn--left"),
  right: document.querySelector("#btn--right"),
};

const player = {
  position: {
    x: undefined,
    y: undefined,
  },
};

const gift = {
  position: {
    x: undefined,
    y: undefined,
  },
};

let collisionPositions = [];

let canvasSize;
let elementSize;
let level = 0;

/**********************************************************
 * WINDOW EVENTS (load, resize)
 */
window.addEventListener("load", startGame);
window.addEventListener("resize", startGame);
/**********************************************************
 * MOVEMENTS PLAYER EVENTS
 */
window.addEventListener("keydown", moveByKey);
btn.up.addEventListener("click", () => movePlayer("up"));
btn.down.addEventListener("click", () => movePlayer("down"));
btn.left.addEventListener("click", () => movePlayer("left"));
btn.right.addEventListener("click", () => movePlayer("right"));

function startGame() {
  responsiveCanvas();

  ctx2D.font = `${elementSize}px verdana`;
  ctx2D.textAlign = "start";

  renderMap();
}

function responsiveCanvas() {
  window.innerWidth > window.innerHeight
    ? (canvasSize = window.innerHeight * 0.8)
    : (canvasSize = window.innerWidth * 0.8);

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  elementSize = canvasSize / 10 - 1;
}

function renderMap() {
  const mapa = maps[level];
  if(!mapa) return gameWin();
  const mapRows = mapa.trim().split("\n");
  const mapRowsCols = mapRows.map((row) => row.trim().split(""));

  ctx2D.clearRect(0, 0, canvasSize, canvasSize);
  collisionPositions = [];
  gift.position = { x: undefined, y: undefined };

  mapRowsCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      ctx2D.fillText(
        emojis[col],
        elementSize * colIndex,
        elementSize * (rowIndex + 1)
      );

      if (col === "O" && player.position.x === undefined) {
        player.position.x = colIndex * elementSize;
        player.position.y = (rowIndex + 1) * elementSize;
      }

      if (col === "X") {
        collisionPositions.push({
          x: colIndex * elementSize,
          y: (rowIndex + 1) * elementSize,
        });
      }

      if (col === "I") {
        console.log("I");
        gift.position.x = colIndex * elementSize;
        gift.position.y = (rowIndex + 1) * elementSize;
      }
    });
  });
  renderPlayerPosition();
}

function moveByKey({ key }) {
  const keys = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };
  if(!keys[key]) return;
  movePlayer(keys[key]);
}

function movePlayer(direction) {
  if (validateOverflow(direction)) return;

  const movement = {
    up: () => (player.position.y -= elementSize),
    down: () => (player.position.y += elementSize),
    left: () => (player.position.x -= elementSize),
    right: () => (player.position.x += elementSize),
  };
  movement[direction]();
  validateBombCollision();
  validateGiftCollision();
  renderMap();
}

function renderPlayerPosition() {
  ctx2D.fillText(emojis["PLAYER"], player.position.x, player.position.y);
}

function validateOverflow(direction) {
  const result = {
    up: player.position.y <= elementSize,
    down: player.position.y >= canvasSize - elementSize,
    left: player.position.x <= 1,
    right: player.position.x >= canvasSize - elementSize * 2,
  };
  return result[direction];
}

function validateBombCollision() {
  const result = collisionPositions.find(
    (position) => {
      return Math.trunc(player.position.x) === Math.trunc(position.x) &&  Math.trunc(player.position.y) ===  Math.trunc(position.y)
    }
  );
  if (result) {
    alert("GAME OVER");
    player.position.x = undefined;
    player.position.y = undefined;
  }
}

function validateGiftCollision() {
  if (
    Math.trunc(player.position.x) === Math.trunc(gift.position.x) &&
    Math.trunc(player.position.y) === Math.trunc(gift.position.y)
  ) {
    alert("WIN");
    player.position.x = undefined;
    player.position.y = undefined;
    levelUp();
  }
}

function levelUp() {
  alert("LEVEL UP");
  level++;
  console.log(level);
  renderMap();
}

function gameWin (){
  alert('YOU WON THE GAME');
  level = 0;
  renderMap();
}