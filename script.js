const boxes = document.querySelectorAll('.box');
let startBtn = document.querySelector('.startBtn');
let stopBtn = document.querySelector('.stopBtn');
let points = document.querySelector(".points");
const time = document.querySelector('.time');

let randNum

let i = 0;

let boxesArray = Array.from(boxes);

let intervalId

let probability

const scoreEventInc = (e) => {
    e.target
    points.innerHTML = ++i;
}

const scoreEventDec = (e) => {
    e.target
    points.innerHTML = --i;
}

const startGame = (time) => {
    points.innerHTML = 0;
    i = 0;
    intervalId = setInterval(() => {
        randNum = Math.floor(Math.random() * 9);

        probability = Math.floor(Math.random() * 9);

        switch (probability) {
            case 1:
                boxesArray[randNum].classList.add('colorChange-to-black');
                boxesArray[randNum].addEventListener('click', scoreEventDec, { once: true });
                break;
            case 2:
                boxesArray[randNum].classList.add('colorChange-to-black');
                boxesArray[randNum].addEventListener('click', scoreEventDec, { once: true });
                break;
            default:
                boxesArray[randNum].classList.add('colorChange');
                boxesArray[randNum].addEventListener('click', scoreEventInc, { once: true });
                break;
        }

        setTimeout(() => {
            boxesArray[randNum].classList.remove('colorChange-to-black');
            boxesArray[randNum].removeEventListener('click', scoreEventInc, { once: true });
            boxesArray[randNum].removeEventListener('click', scoreEventDec, { once: true });
            boxesArray[randNum].classList.remove('colorChange');
        }, time);
    }, 3000);
}

let showTimeInterval

const showGameTime = () => {
    let timer = 60;
    showTimeInterval = setInterval(() => {
        console.log("time interval");
        timer = --timer;
        time.innerHTML = timer + "s";
    }, 1000);
}

let gameTimeOut

const gameTime = () => {
    showGameTime()
   gameTimeOut = setTimeout(() => {
        stopGame();
        console.log("times up");
        stopBtn.classList.remove('display');
        startBtn.classList.remove('displayNone');
        clearInterval(showTimeInterval);
    }, 60000);
}

startBtn.addEventListener('click', () => {
    changeDificulty();
    gameTime();
    startBtn.classList.add('displayNone');
    stopBtn.classList.add('display');
});

const stopGame = () => {
    clearInterval(intervalId);
    clearInterval(showTimeInterval);
    clearTimeout(gameTimeOut);
}

stopBtn.addEventListener('click', () => {
    stopGame();
    stopBtn.classList.remove('display');
    startBtn.classList.remove('displayNone');
});

let select = document.querySelector('select');

let selectedValue;

let changeDificulty = () => {
    selectedValue = select.selectedOptions[0].innerHTML;
    console.log(selectedValue);
    if (selectedValue == "Easy") {
        console.log("easy");
        startGame(1250);
    } else if (selectedValue == "Medium") {
        console.log("Medium");
        startGame(1100);
    } else if (selectedValue == "Hard") {
        console.log("Hard");
        startGame(900);
    }
}
