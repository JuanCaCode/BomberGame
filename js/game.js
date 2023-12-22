const body = document.querySelector("#body");
const canvas = document.querySelector("#game__canvas");
const ctx2D = canvas.getContext("2d");

const btn = {
  up: document.querySelector("#btn--up"),
  down: document.querySelector("#btn--down"),
  left: document.querySelector("#btn--left"),
  right: document.querySelector("#btn--right"),
};

let collisionPositions = [];

let canvasSize;
let elementSize;
let level = 0;

let lives = 3;
let score = 0;
let time = 0;

const timer = document.querySelector('#timer')
const scorer = document.querySelector('#scorer')
scorer.innerHTML = score;
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
  resetGame();
  responsiveCanvas();

  ctx2D.font = `${elementSize}px verdana`;
  ctx2D.textAlign = "start";

  renderMap();
  playerImage();
  bombsAnimation();
  showLives(lives);
}

function responsiveCanvas() {
  window.innerWidth > window.innerHeight
    ? (canvasSize = window.innerHeight * 0.8)
    : (canvasSize = window.innerWidth * 0.8);

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  elementSize = Math.trunc(canvasSize / 10);
}

function renderMap() {
  // get the level map
  const mapa = maps[level];

  // if there is no more levels, you win the game
  if (!mapa) return gameWin(); 

  // remove spaces and split by rows
  const mapRows = mapa.trim().split("\n"); 

  // remove spaces and split by cols
  const mapRowsCols = mapRows.map((row) => row.trim().split("")); 

  // clear canvas
  ctx2D.clearRect(0, 0, canvasSize, canvasSize); 
  
  // clear collision positions
  collisionPositions = []; 

  // clear gift position
  gift.position = { x: undefined, y: undefined }; 

  // change background landscapes image
  landscapes_img.src = landscapes[`level_${level + 1}`].img.src;

  // change canvas background color
  canvas.style.background = `radial-gradient(${landscapes[`level_${level + 1}`].color_1}, ${landscapes[`level_${level + 1}`].color_2})`; 

  // change body background color
  body.style.background = `radial-gradient(${landscapes[`level_${level + 1}`].color_1}, ${landscapes[`level_${level + 1}`].color_2})`; 
  
  mapRowsCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {

      ctx2D.drawImage(
        backgrounds[`level_1`],
        colIndex * (elementSize + 2),
        rowIndex * (elementSize + 2),
        elementSize + 2,
        elementSize + 2
      );
      
      //render explosinn


      const redering = {
        I: () => renderGift(colIndex, rowIndex),
        X: () => {renderBomb(colIndex, rowIndex)},
        O: () => renderDoor(colIndex, rowIndex),
      };
      redering[col] && redering[col]();
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
  if (!keys[key]) return;
  movePlayer(keys[key]);
}

function movePlayer(direction) {
  if(infoboard.style.display === "flex") return;
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

function validateOverflow(direction) {
  const result = {
    up: player.position.y < elementSize,
    down: player.position.y > canvasSize - elementSize * 2,
    left: player.position.x <= 1,
    right: player.position.x >= canvasSize - elementSize * 2,
  };
  return result[direction];
}

function validateBombCollision() {
  const result = collisionPositions.find((position) => {
    return (
      Math.trunc(player.position.x) === Math.trunc(position.x) &&
      Math.trunc(player.position.y) === Math.trunc(position.y)
    );
  });
  if (result) {
    explosionOnCollision(result.x, result.y);
    setTimeout(levelFail, 500);
  }
}

function validateGiftCollision() {
  if (
    Math.trunc(player.position.x) === Math.trunc(gift.position.x) &&
    Math.trunc(player.position.y) === Math.trunc(gift.position.y)
  ) {
    player.position.x = undefined;
    player.position.y = undefined;
    levelUp();
    scoreUp();
  }
}

function levelUp() {
  level++;
  renderMap();
}

function scoreUp(){
  score++;
  scorer.innerHTML = score;
}

function levelFail() {
  if(infoboard.style.display === "flex") return;
  
  player.position.x = undefined;
  player.position.y = undefined;
  lives--;
  showLives(lives);

  let title = ()=> lives === 0 ? 'GAME OVER' : `${lives} ${lives == 1?'LIFE':'LIVES'} LEFT`;
  let subtitle = ()=> lives === 0 ? 'Sorry, you lost the game' : `${lives == 1? "Take so much care, it's your only opportunity":`Take care, you have ${lives} opportunities`}`;
  infoBoardTitle(title())
  infoBoardSubtitle(subtitle())

  infoboardToggle(true);
  renderMap();
}

function gameWin() {
  let title = 'YOU WON THE GAME';
  let subtitle = 'Congratulations, you are a winner';
  infoBoardTitle(title)
  infoBoardSubtitle(subtitle)
  infoboardToggle(true)

  level = 0;
  resetGame()
  renderMap()
}

function resetGame(){
  ctx2D.clearRect(0, 0, canvasSize, canvasSize);

  level = 0;
  lives = 3;
  score = 0;
  time = 0;
  runTimer()  

  player.position.x = undefined;
  player.position.y = undefined;
}

function runTimer(){
  setInterval(()=>{
    time++;
    // show time like 00:00
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    timer.innerHTML = `${minutes}:${seconds}`;
  }, 1000)
}
