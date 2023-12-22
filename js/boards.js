const infoboard = document.querySelector('#infoboard');
const infoboardBtn = document.querySelector('#infoboard__btn');
const headerLives = document.querySelector('#header__lives');
const infoboardLives = document.querySelector('#infoboard_lives');
const infoboardBtnText = document.querySelector('#infoboard__btn_text');
infoboardBtn.addEventListener('click', handleInfoboardButton)

function infoboardToggle(show){
    if(show){
        if(lives === 0){
            infoboardBtnText.innerHTML = 'RESTART';
    
            for(let col = 0; col < 10; col++){
                for(let row =0 ; row < 10; row++ ){
                    explosionOnCollision(col * elementSize, row * elementSize)
                }
            }
        }
        infoboard.style.display = 'flex';
    }else{
        infoboard.style.display = 'none';
    }
}

const lives_0 = createImage('../assets/imgs/others/lives_0.png');
const lives_1 = createImage('../assets/imgs/others/lives_1.png');
const lives_2 = createImage('../assets/imgs/others/lives_2.png');
const lives_3 = createImage('../assets/imgs/others/lives_3.png');
function showLives(lives){
    const livesSprites = {
        0: lives_0,
        1: lives_1,
        2: lives_2,
        3: lives_3,
    }
    infoboardLives.src = livesSprites[lives].src;
    headerLives.src = livesSprites[lives].src;
}

const infoboardTitle = document.querySelector('#infoboard__title');
function infoBoardTitle(title){
    infoboardTitle.innerHTML = title;
}

const infoboardSubtitle = document.querySelector('#infoboard__subtitle');
function infoBoardSubtitle(subtitle){
    infoboardSubtitle.innerHTML = subtitle;
}

function handleInfoboardButton(){
    if(lives === 0){
        infoboardToggle(false);
        startGame();
    }else{
        infoboardBtnText.innerHTML = 'CONTINUE';
        infoboardToggle(false);
        renderMap();
    }
}