// Sélection des éléments du DOM
const getHours = document.querySelector('.hours');
const getMinutes = document.querySelector('.minutes');
const getSeconds = document.querySelector('.seconds');
const getCentiseconds = document.querySelector('.miliseconds');
const board = document.querySelector("#board");

// Variables du chrono
let hours_time = 0, minutes_time = 0, seconds_time = 0, centiseconds_time = 0;

// Fonctions utilitaires
function formatTime(value) {
    return value < 10 ? '0' + value : value;
}

function updateDisplay() {
    getHours.textContent = formatTime(hours_time);
    getMinutes.textContent = formatTime(minutes_time);
    getSeconds.textContent = formatTime(seconds_time);
    getCentiseconds.textContent = formatTime(centiseconds_time);
}

// Objet chrono
const cronos = {
    timer: null,
    count() {
        centiseconds_time++;
        if (centiseconds_time > 99) {
            centiseconds_time = 0;
            seconds_time++;
        }
        if (seconds_time > 59) {
            seconds_time = 0;
            minutes_time++;
        }
        if (minutes_time > 59) {
            minutes_time = 0;
            hours_time++;
        }
        updateDisplay();
    },
    start() {
        if (!this.timer) this.timer = setInterval(() => this.count(), 10);
    },
    stop() {
        clearInterval(this.timer);
        this.timer = null;
    },
    reset() {
        this.stop();
        hours_time = minutes_time = seconds_time = centiseconds_time = 0;
        updateDisplay();
    }
};

// Mélange des cubes
function shuffleChildren(parent) {
    const childrenArray = Array.from(parent.children);
    for (let i = childrenArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [childrenArray[i], childrenArray[j]] = [childrenArray[j], childrenArray[i]];
    }
    childrenArray.forEach(child => parent.appendChild(child));
}

// Réactions visuelles
function showReaction(type, clickedBox) {
    clickedBox.classList.add(type);
    if (type !== "success") {
        setTimeout(() => clickedBox.classList.remove(type), 800);
    }
}

// Logique du jeu
const game = {
    current: 1,
    max: 10,
    init() {
        const input = document.getElementById("cubeCount");
        this.max = parseInt(input.value) || 10;
        this.current = 1;
        board.innerHTML = "";

        for (let i = 1; i <= this.max; i++) {
            const box = document.createElement("div");
            box.classList.add("box");
            box.textContent = i;
            board.appendChild(box);

            box.addEventListener("click", () => this.handleClick(i, box));
        }
        shuffleChildren(board);
        cronos.reset();
    },
    handleClick(i, box) {
        if (i === 1 && this.current === 1) cronos.start();

        if (i === this.current) {
            box.classList.add("box-valid");
            if (this.current === this.max) {
                board.querySelectorAll(".box").forEach(b => showReaction("success", b));
                cronos.stop();
            }
            this.current++;
        } else if (i > this.current) {
            showReaction("error", box);
            this.init(); // relance le jeu
        } else {
            showReaction("notice", box);
        }
    }
};


document.getElementById("resetBtn").onclick = () => {
    game.init();
};


game.init();

/* import { getDOM } from './dom.js';
import { createChrono } from './chrono.js';
import { createGame } from './game.js';

document.addEventListener("DOMContentLoaded", () => {
    const dom = getDOM();
    const chrono = createChrono(dom);
    const game = createGame(dom, chrono);

    dom.resetBtn.onclick = () => game.init();
    game.init();
});
 */