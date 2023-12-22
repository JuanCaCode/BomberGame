const player = {
  position: {
    x: undefined,
    y: undefined,
  },
};

const img1 = createImage("./assets/imgs/player/player_1.png");
const img2 = createImage("./assets/imgs/player/player_2.png");
const img3 = createImage("./assets/imgs/player/player_3.png");

let player_img = img1;

const gift_img = createImage("./assets/imgs/utils/gift_map.png");

function playerImage() {
  let counter = 0;
  setInterval(() => {
    const sprite = {
      0: img1,
      1: img2,
      2: img3,
      3: img1,
    };
    player_img = sprite[counter];
    counter === 3 && (counter = 0);
    counter++;
    renderMap();
  }, 500);
}

function renderPlayerPosition() {
  ctx2D.drawImage(
    player_img,
    Math.trunc(player.position.x),
    Math.trunc(player.position.y),
    elementSize,
    elementSize
  );
}
