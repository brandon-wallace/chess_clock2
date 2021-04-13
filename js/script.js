
let playing = false;
let currentPlayer = 1;
const timerPanel = document.querySelector('.player');
const buttons = document.querySelectorAll('.bttn');
// Sound effects for project.
const timesUp = new Audio('audio/460133__eschwabe3__robot-affirmative.wav');
const click = new Audio('audio/561660__mattruthsound.wav');


// Add a leading zero to numbers less than 10.
const padZero = (number) => {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}


// Create a class for the timer.
class Timer {
    constructor(player, minutes) {
        this.player = player;
        this.minutes = minutes;
    }
    getMinutes(timeId) {
        return document.getElementById(timeId).textContent;
    }
}

let p1time = new Timer('min1', document.getElementById('min1').textContent);
let p2time = new Timer('min2', document.getElementById('min2').textContent);


// Swap player's timer after a move (player1 = 1, player2 = 2).
const swapPlayer = () => {
    if (!playing) return;
    // Toggle the current player.
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    // Play the click sound.
    click.play();
}


// Warn player if time drops below thirty seconds.
const timeWarning = (player, min, sec) => {
    // Change the numbers to red during the last 30 seconds.
    if (min < 1 && sec <= 30) {
        if (player === 1) {
            document.querySelector('.player-1 .player__digits').style.color = '#CC0000';
        } else {
            document.querySelector('.player-2 .player__digits').style.color = '#CC0000';
        }
    }
}


// Start timer countdown to zero.
const startTimer = () => {
    playing = true;
    let p1sec = 60;
    let p2sec = 60;

    let timerId = setInterval(function() {
        // Player 1.
        if (currentPlayer === 1) {
            if (playing) {
                // Disable start button.
                buttons[0].disabled = true;
                p1time.minutes = parseInt(p1time.getMinutes('min1'), 10);
                if (p1sec === 60) {
                    p1time.minutes = p1time.minutes - 1;
                }
                p1sec = p1sec - 1;
                timeWarning(currentPlayer, p1time.minutes, p1sec);
                document.getElementById('sec1').textContent = padZero(p1sec);
                document.getElementById('min1').textContent = padZero(p1time.minutes);
                if (p1sec === 0) {
                    // If minutes and seconds are zero stop timer with the clearInterval method.
                    if (p1sec === 0 && p1time.minutes === 0) {
                        // Play a sound effect.
                        timesUp.play();
                        // Stop timer.
                        clearInterval(timerId);
                        playing = false;
                    }
                    p1sec = 60;
                }
            }
        } else {
        // Player 2.
            if (playing) {
                p2time.minutes = parseInt(p2time.getMinutes('min2'), 10);
                if (p2sec === 60) {
                    p2time.minutes = p2time.minutes - 1;
                }
                p2sec = p2sec - 1;
                timeWarning(currentPlayer, p2time.minutes, p2sec);
                document.getElementById('sec2').textContent = padZero(p2sec);
                document.getElementById('min2').textContent = padZero(p2time.minutes);
                if (p2sec === 0) {
                    // If minutes and seconds are zero stop timer with the clearInterval method.
                    if (p2sec === 0 && p2time.minutes === 0) {
                        // Play a sound effect.
                        timesUp.play();
                        // Stop timer.
                        clearInterval(timerId);
                        playing = false;
                    }
                    p2sec = 60;
                }
            }
        }
    }, 1000);
}


// Listen for a mouse click or tap on the screen to toggle between timers.
timerPanel.addEventListener('click', swapPlayer);

// Loop through the start and reset buttons.
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        if (buttons[i].textContent === 'START') {
            // Turn the button a gray color to signify a disabled button.
            buttons[i].style.color = '#EEEEEE';
            buttons[i].style.backgroundColor = '#606060';
            startTimer();
        } else {
            // Reset everything by reloading the page.
            location.reload(true);
        }
    });
}

// Listen for the press of the spacebar.
document.addEventListener('keypress', event => {
    if (event.keyCode === 32 || event.which === 32) {
        swapPlayer();
    }
});
