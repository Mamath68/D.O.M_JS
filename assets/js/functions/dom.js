export const getDOM = () => ({
    getHours: document.querySelector('.hours'),
    getMinutes: document.querySelector('.minutes'),
    getSeconds: document.querySelector('.seconds'),
    getCentiseconds: document.querySelector('.miliseconds'),
    board: document.querySelector("#board"),
    input: document.getElementById("cubeCount"),
    resetBtn: document.getElementById("resetBtn")
});
