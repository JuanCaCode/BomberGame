const bomb_1_3 = createImage("./assets/imgs/utils/bomb_1_3.png");
const bomb_2 = createImage("./assets/imgs/utils/bomb_2.png");
const bomb_4 = createImage("./assets/imgs/utils/bomb_4.png");

let bomb_img = bomb_1_3;

const explosion = {
    img_1: createImage("./assets/imgs/explosion/explosion_1.png"),
    img_2: createImage("./assets/imgs/explosion/explosion_2.png"),
    img_3: createImage("./assets/imgs/explosion/explosion_3.png"),
    img_4: createImage("./assets/imgs/explosion/explosion_4.png"),
    img_5: createImage("./assets/imgs/explosion/explosion_5.png"),
    img_6: createImage("./assets/imgs/explosion/explosion_6.png"),
    img_7: createImage("./assets/imgs/explosion/explosion_7.png")
}

/*****************************************************
 * RENDERING BOMB FUNCTIONS
 */
function renderBomb(colIndex,rowIndex){
    generalRender(bomb_img,colIndex,rowIndex)
    collisionPositions.push({
      x: Math.trunc(colIndex * elementSize),
      y: Math.trunc(rowIndex * elementSize),
    });
}

/*****************************************************
 *  NORMAL ANIMATION FOR BOMBS
 */
function bombsAnimation(){
    let counter = 0;
    setInterval(()=>{
        const sprite = {
            0: bomb_1_3,
            1: bomb_2,
            2: bomb_1_3,
            3: bomb_4,
        }
        bomb_img = sprite[counter]
        counter === 3 && (counter = 0);
        counter++;
        renderMap();
    }, 300);
}

/*****************************************************
 * EXPLOSION ON COLLISION FUNCTIONS
 */
function explosionOnCollision(x_bomb,y_bomb){
    ctx2D.clearRect(x_bomb, y_bomb, elementSize, elementSize);
    let x = x_bomb;
    let y = y_bomb;
    let counter = 0;
    let interval = setInterval(function(){
        if(counter == 0){
            ctx2D.drawImage(explosion.img_1, x, y, elementSize, elementSize);
        }else if(counter == 1 ||  counter == 7){
            ctx2D.drawImage(explosion.img_2, x, y, elementSize, elementSize);
        }else if(counter == 2 || counter == 8){
            ctx2D.drawImage(explosion.img_3, x, y, elementSize, elementSize);
        }else if(counter == 3 || counter == 9){
            ctx2D.drawImage(explosion.img_4, x, y, elementSize, elementSize);
        }else if(counter == 4 || counter == 10){
            ctx2D.drawImage(explosion.img_5, x, y, elementSize, elementSize);
        }else if(counter == 5 || counter == 11 ){
            ctx2D.drawImage(explosion.img_6, x, y, elementSize, elementSize);
        }else if(counter == 6 || counter == 12 ){
            ctx2D.drawImage(explosion.img_7, x, y, elementSize, elementSize);
        }else if(counter == 13){
            clearInterval(interval);
            // alert("GAME OVER");
            ctx2D.clearRect(x, y, elementSize, elementSize);
            renderMap();
        }
        counter++;
    }, 90);
}


