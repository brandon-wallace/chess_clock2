let p1sec = 60;
let p2sec = 60;
let playing = false;
let currentPlayer = 0;
const panel = document.querySelector('.player');
const buttons = document.querySelectorAll('.bttn');
const p1Min = Number(document.querySelector('.p1-minutes').textContent);
const p2Min = Number(document.querySelector('.p2-minutes').textContent);


const padZero = (number) => {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}


class Timer {
    constructor(player, minutes) {
        this.player = player;
        this.minutes = minutes;
        this.seconds = 60;
    }
    getMinutes(timeId) {
        return document.getElementById(timeId).textContent;
    }
}


let p1time = new Timer('min1', document.getElementById('min1').textContent);
let p2time = new Timer('min2', document.getElementById('min2').textContent);


const swapPlayer = () => {
    if (!playing) return;
    console.log('SWAPPING!');
    currentPlayer = currentPlayer === 0 ? 1 : 0;
}


const startTimer = () => {
    playing = true;

    let timer = setInterval(function() {
        if (currentPlayer === 0) {
            if (playing) {
                buttons[0].disabled = true;
                p1time.minutes = parseInt(p1time.getMinutes('min1'), 10);
                if (p1sec === 60) {
                    p1time.minutes = p1time.minutes - 1;
                }
                p1sec = p1sec - 1;
                document.getElementById('sec1').textContent = padZero(p1sec);
                document.getElementById('min1').textContent = padZero(p1time.minutes);
                if (p1sec === 0) {
                    if (p1sec === 0 && p1time.minutes === 0) {
                        clearInterval(timer);
                        playing = false;
                    }
                    p1sec = 60;
                }
            }
        } else {
            if (playing) {
                p2time.minutes = parseInt(p2time.getMinutes('min2'), 10);
                if (p2sec === 60) {
                    p2time.minutes = p2time.minutes - 1;
                }
                p2sec = p2sec - 1;
                document.getElementById('sec2').textContent = padZero(p2sec);
                document.getElementById('min2').textContent = padZero(p2time.minutes);
                if (p2sec === 0) {
                    if (p2sec === 0 && p2time.minutes === 0) {
                    clearInterval(timer);
                    playing = false;
                }
                p2sec = 60;
                }
            }
        }
    }, 1000)
}


panel.addEventListener('click', swapPlayer);

for (let btn = 0; btn < buttons.length; btn++) {
    buttons[btn].addEventListener('click', () => {
        if (buttons[btn].textContent === 'START') {
            startTimer();
        } else {
            location.reload(true);
        }
    });
}

document.addEventListener('keypress', event => {
    if (event.keyCode === 32 || event.which === 32) {
        swapPlayer();
    }
});
