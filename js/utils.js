// BACKGROUNDS
const backgrounds = {
  level_1: createImage("./assets/imgs/backgrounds/walls/pared_1.png"),
};

// LANDSCAPES
let landscapes_img = document.querySelector("#backgroundImage_img");
const landscapes = {
  level_1: {
    img: createImage("./assets/imgs/backgrounds/SVG/bg_level_1.svg"),
    color_1: "#fff",
    color_2: "#3ba90e",
  },
  level_2: {
    img: createImage("./assets/imgs/backgrounds/SVG/bg_level_2.svg"),
    color_1: "#ca2424",
    color_2: "#530505",
  },
  level_3: {
    img: createImage("./assets/imgs/backgrounds/SVG/bg_level_3.svg"),
    color_1: "#d591f9",
    color_2: "#5f0ba0",
  },
};

const doors = {
  level_1: createImage("../assets/imgs/doors/door_lv1.png"),
  level_2: createImage("../assets/imgs/doors/door_lv2.png"),
  level_3: createImage("../assets/imgs/doors/door_lv3.png"),
};

function createImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

function generalRender(graph, colIndex, rowIndex) {
  ctx2D.drawImage(
    graph,
    colIndex * elementSize,
    rowIndex * elementSize,
    elementSize,
    elementSize
  );
}

const gift = {
  position: {
    x: undefined,
    y: undefined,
  },
};

const renderGift = (colIndex, rowIndex) => {
  generalRender(gift_img, colIndex, rowIndex);

  gift.position.x = colIndex * elementSize;
  gift.position.y = rowIndex * elementSize;
};

const renderDoor = (colIndex, rowIndex) => {
  generalRender(doors[`level_${level + 1}`], colIndex, rowIndex);

  if (player.position.x === undefined) {
    player.position.x = colIndex * elementSize;
    player.position.y = rowIndex * elementSize;
  }
};
