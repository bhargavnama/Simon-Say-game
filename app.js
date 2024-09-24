let gameSequence = [];
let userSequence  = [];
let btns = ["box1", "box2", "box3", "box4"];
let scoreDisplay = document.createElement("h2");

let highestScore = 0;

function contains(btn){
    for(key of btns){
        if(key == btn){
            return true;
        }
    }
    return false;
}

let gameStarted = false;
let level = 0;
let h2 = document.querySelector("h2");



document.addEventListener("keypress", function(){
    
    if(gameStarted == false){
        gameStarted = true;

        leveUp();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    }, 200);
}

function userFlash(btn){
    btn.classList.add("userFlash");

    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 300);
}

function leveUp(){
    userSequence = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randBtn = document.querySelector(`.${btns[randIdx]}`);
    gameSequence.push(btns[randIdx]);
    gameFlash(randBtn);
}

function checkAns(idx){
    
    if(userSequence[idx] === gameSequence[idx]){
        if(userSequence.length == gameSequence.length){
            setTimeout(leveUp, 1000);
        }
    }
    else{
        let body = document.querySelector("body");
        body.classList.add("gameover");
        setTimeout(()=>{
            body.classList.remove("gameover");
        }, 250);
        h2.innerHTML = `Game Over! Your score was ${level}. <br>Press any key to start the game`;
        reset();
    }
}

function btnPress(event){
    let btn = event.target;
    if(contains(btn.classList[1])){
        userFlash(btn);

        userSequence.push(btn.classList[1]);
        checkAns(userSequence.length-1);
    }
}

let allBtns = document.querySelectorAll(".boxes");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
} 

function updateScoreDisplay(){
    highestScore = (level > highestScore)?level:highestScore;
    scoreDisplay.innerText = `Highest Score : ${highestScore}`;
    return scoreDisplay;
}

function reset(){
    gameSequence = [];
    userSequence = [];
    let scoreDisplay = updateScoreDisplay();
    level = 0;
    gameStarted = false;
    document.body.insertBefore(scoreDisplay, h2);
}