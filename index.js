const colors = ["red", "blue", "green", "yellow"]
let colorList = [];
let userColorList = [];
let isPlayerTurn = false;
let level = 0;

// button highlight after clicking
function buttonHighlight(currentkey){
    var button = document.querySelector("." + currentkey)
    button.classList.add("pressed");
    setTimeout(function(){
        button.classList.remove("pressed")
    }, 500);
}


// sound
function playSound(color){
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

// start game
function startGame(){
    if (!isPlayerTurn){
        isPlayerTurn = true;
        document.removeEventListener("keydown", startGame);
        nextColor();
    }
}

// next level or next round
function nextColor(){
    userColorList = [];
    document.querySelector("h1").textContent = `level = ${level}`
    level ++;
    
    let num = Math.floor(Math.random()*4)
    colorList.push(colors[num]);
    playSound(colors[num]);
    buttonHighlight(colors[num]);
    // playSequence();
}

// function that play the sequence
// function playSequence(){
//     isPlayerTurn = false
//     let i = 0;
//     const interval = setInterval(function(){
//         buttonHighlight(colorList[i]);
//         playSound(colorList[i]);
//         i++;
//         if (i>= colorList.length){
//             clearInterval(interval);
//             isPlayerTurn = true;
//         }
//     }, 500);
// }


// game logic
function gameCheck(currentLevel){
    if(userColorList[currentLevel] === colorList[currentLevel]) {
        if (colorList.length === userColorList.length){
            setTimeout(nextColor, 1000);
        } 
    }
    else{
        gameOver();
    }
}

// gameover
function gameOver(){
    playSound("wrong");
    document.querySelector("body").classList.add("body")
    setTimeout(() => document.querySelector("body").classList.remove("body"), 500)
    level = 0;
    document.querySelector("h1").textContent = `Press any key to enter`
    colorList = [];
    isPlayerTurn = false;
}




document.addEventListener('keydown', function(){
    startGame();
});
document.addEventListener("focus", startGame);

for (i = 0; i<4; i++){
    document.querySelectorAll("button")[i].addEventListener("click", function(){
        var buttonColor = this.classList[0];
        userColorList.push(buttonColor);
        playSound(buttonColor);
        buttonHighlight(buttonColor);
        gameCheck(userColorList.length-1);
        
    })
}
