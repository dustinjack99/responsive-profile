const snake = document.querySelector("#snake");
const rat = document.querySelector("#rat");
const area = document.querySelector('#area');
const snakeText = document.querySelector("#snakeBlip");
const snakeScore = document.querySelector("#score");
let ele = getComputedStyle(area);
let wide = parseInt(ele.width);
let snakeX = 0;
let snakeY = 0;
let score = -1;
let direction = "margin-left";
let ranX = Math.floor(Math.random() * wide - 40);
let ranY = Math.floor(Math.random() * 268);



function snakeMove() {
    let ele = getComputedStyle(area);
    let wide = parseInt(ele.width);

    //SNAKE movement directions
    if (direction === "left") { //LEFT
        snakeX--;
        snakeY;
        // tailFollow();
        snake.style[`margin-left`] = `${snakeX}px`;
    }

    if (direction === "up") { //UP
        snakeX;
        snakeY--;
        // tailFollow();
        snake.style[`margin-top`] = `${snakeY}px`;
    }

    if (direction === "down") { //DOWN
        snakeX;
        snakeY++;
        // tailFollow();
        snake.style[`margin-top`] = `${snakeY}px`;
    }

    if (direction === "right") { //RIGHT
        snakeX++;
        snakeY;
        // tailFollow();
        snake.style[`margin-left`] = `${snakeX}px`;
    }

    //Collision for the border
    if (snakeX < 1) {
        snakeX = 1;
    } else if (snakeY < 1) {
        snakeY = 1;
    } else if (snakeY > 268) {
        snakeY = 268;
    } else if (snakeX > wide - 40) {
        snakeX = wide - 40;
    }

    let snakeBody = {
        top: snakeY,
        left: snakeX,
        right: snakeX + 20,
        bottom: snakeY + 20
    };

    let ratBody = {
        top: ranY,
        left: ranX,
        right: ranX + 20,
        bottom: ranY + 20
    };

    //COLLISION DETECTION
    //Snake Body - right contact
    if (snakeBody.right === ratBody.right - 20 && snakeBody.top < ratBody.top + 20 && snakeBody.bottom > ratBody.bottom - 20) {
        randomRat();
        // growSnake();
    }
    //Snake Body - left contact
    if (snakeBody.left === ratBody.left + 20 && snakeBody.top < ratBody.top + 20 && snakeBody.bottom > ratBody.bottom - 20) {
        randomRat();
        // growSnake();
    }
    //Snake Body - top contact
    if (snakeBody.top === ratBody.top + 20 && snakeBody.right < ratBody.right + 20 && snakeBody.left > ratBody.left - 20) {
        randomRat();
        // growSnake();
    }
    //Snake Body - bottom contact
    if (snakeBody.bottom === ratBody.bottom - 20 && snakeBody.right < ratBody.right + 20 && snakeBody.left > ratBody.left - 20) {
        randomRat();
        // growSnake();
    }

}

function ratScurry() {
    let ele = getComputedStyle(area);
    let wide = parseInt(ele.width);
    //Up left
    function dirUpLeft() {
        rat.style["margin-top"] = `${ranY--}px`;
        rat.style["margin-left"] = `${ranX--}px`;
    }
    //Up
    function dirUp() {
        rat.style["margin-top"] = `${ranY--}px`;
    }
    //Up Right
    function dirUpRight() {
        rat.style["margin-top"] = `${ranY--}px`;
        rat.style["margin-left"] = `${ranX++}px`;
    }
    //Right
    function dirRight() {
        rat.style["margin-left"] = `${ranX++}px`;
    }
    //Down Right
    function dirDownRight() {
        rat.style["margin-top"] = `${ranY++}px`;
        rat.style["margin-left"] = `${ranX++}px`;
    }
    //Down
    function dirDown() {
        rat.style["margin-top"] = `${ranY++}px`;
    }
    //Down Left
    function dirDownLeft() {
        rat.style["margin-top"] = `${ranY++}px`;
        rat.style["margin-left"] = `${ranX--}px`;
    }
    //Left
    function dirLeft() {
        rat.style["margin-left"] = `${ranX--}px`;
        // console.log(scurry[spin])
    }

    let scurry = [dirDown, dirUp, dirDownLeft, dirDownRight, dirLeft, dirRight, dirUp, dirUpLeft, dirUpRight];
    let spin = Math.floor(Math.random() * 7)

    scurry[spin]();

    if (ranX < 0) {
        ranX = 0;
    }
    if (ranY < 0) {
        ranY = 0;
    }
    if (ranX > wide - 40) {
        ranX = wide - 40;
    }
    if (ranY > 268) {
        ranY = 268;
    }

}

// function growSnake() {
// var newTail = document.createElement("div")
// newTail.setAttribute("class", "snaketail");
// snake.appendChild(newTail);

// var snakeTail = document.querySelectorAll(".snaketail");
// for (let i = 0; i < snakeTail.length; i++) {
//     snakeTail[i].style["margin-left"] = `${snakeX + i * 20}px`;
//     snakeTail[i].style["margin-top"] = `${snakeY + i * 20}px`;
// }
// }

// function tailFollow() {
//     let snakeTails = document.querySelectorAll(".snaketail");
//     snakeTails.pop();
//     snakeTails.unshift()
// }

//SNAKE control functionality
document.addEventListener('keydown', snakeControl);

function snakeControl(e) {
    if (e.code == "KeyW") {
        direction = "up";
    }

    if (e.code == "KeyA") {
        direction = "left";
    }

    if (e.code == "KeyS") {
        direction = "down";
    }

    if (e.code == "KeyD") {
        direction = "right";
    }

}

//Replaces eaten rat 
function randomRat() {
    let ele = getComputedStyle(area);
    let wide = parseInt(ele.width);
    ranX = Math.floor(Math.random() * wide - 40);
    ranY = Math.floor(Math.random() * 268);
    rat.style["margin-top"] = `${ranY}px`;
    rat.style["margin-left"] = `${ranX}px`;
    score++;
    snakeScore.textContent = `Score: ${score}`
    
    if (score == 5) {
        let h6 = document.createElement("h6");
        let p = document.createElement("p");
        area.replaceWith(h6);
        snakeText.replaceWith(p);
        h6.style.textAlign = "center";
        p.style.textAlign = "center";
        h6.textContent = "Wasn't that fun? Now check out my other stuff!"
        p.textContent = `But hey! At least you have ${score} points!`
    }

}

randomRat();
setInterval(snakeMove, 5);
setInterval(ratScurry, 30);