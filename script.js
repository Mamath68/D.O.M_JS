// ********************timer********************

//1)Select time html
/**
   First we have to select the elements of UI 
   which will contain hours, minutes, seconds and centiseconds
*/
let getHours = document.querySelector('.hours');
let getMinutes = document.querySelector('.minutes');
let getSeconds = document.querySelector('.seconds');
let getCentiseconds = document.querySelector('.miliseconds');

//we create global values
//Main variables
let hours_time = 0;
let minutes_time = 0;
let seconds_time = 0;
let centiseconds_time = 0;

//Our chronometer object
/**
objects in javascript are the same as in other programming languages
an object has two components a key and a value but can also contain functions
*/
let cronos = {

    count() {
        //----------------------------------Seconds---------------------------------------------------------------//
        if (centiseconds_time < 99) {
            //autoincement value if this is less that 99
            centiseconds_time++;
            //update first digit if the time is less  that 10
            centiseconds_time = ((centiseconds_time < 10) ? '0' : '') + centiseconds_time;
            //display that result to the UI
            getCentiseconds.innerHTML = centiseconds_time;
        }

        if (centiseconds_time == 99) {
            centiseconds_time = -1;
        }

        if (centiseconds_time == 0) {
            //same as above
            seconds_time++;
            seconds_time = ((seconds_time < 10) ? '0' : '') + seconds_time;

            getSeconds.innerHTML = seconds_time;
        }

        //----------------------------------Minutes---------------------------------------------------------------//
        if (seconds_time == 59) {
            seconds_time = -1;
        }

        if ((seconds_time == 0) && (centiseconds_time == 0)) {
            minutes_time++;

            minutes_time = ((minutes_time < 10 ? '0' : '')) + minutes_time;

            getMinutes.innerHTML = minutes_time;
        }

        //----------------------------------Hours---------------------------------------------------------------//
        if (minutes_time == 59) {
            minutes_time = -1;
        }

        if ((centiseconds_time == 0) && (seconds_time == 0) && (minutes_time == 0)) {
            hours_time++;
            hours_time = ((hours_time < 10) ? '0' : '') + hours_time;
            getHours.innerHTML = hours_time;
        }
    },

    //this =>is used in javascript to refer to the object name
    initialization() {
        timer = setInterval(this.count, 10);
    },

    stop() {
        let stop = clearInterval(timer);
    },
}

// stopBtn.onclick = () => {
//     cronos.stop();
//     startBtn.disabled = false;
// }

// ********************Cubes*****************************
// fonction mélangeant les cubes
function shuffleChildren(parent) {
    // children = enfant et parent = parent
    // enfant obtient valeur de parent+enfant
    let children = parent.children;
    // i obtient valeur de enfant.longueur, k et temp.
    let i = children.length, k, temp;

    // tant que --i est supérieur a 0
    while (--i > 0) {
        // floor = Renvoie le plus grand int plus petit ou égale a sa valeur numérique
        // floor (math(mathématique)concaténé avec random(entre 0 et 1)multiplié par (i + 1))
        k = Math.floor(Math.random() * (i + 1));
        // temp(temporaire) obtient la valeur d'enfant [K}
        temp = children[k];
        // enfant [k] obtient la valeur d'enfant [i]
        children[k] = children[i];
        // appele parent qui avec temp
        parent.appendChild(temp);
    }
}
// fonction pour modifier les cubes en fonction de l'ordre des cubes cliqué
function showReaction(type, clickedBox) {
    // clickedBox représente l'action onclick
    // classList fait appel a la class dans le css
    clickedBox.classList.add(type);
    // si(type) est success(bon ordre)
    if (type !== "success") {
        // Temps mort, fonction()
        setTimeout(function () {
            // clickedBox relié a classList suprime le type.
            clickedBox.classList.remove(type);
            // j'avoue ne pas tout avoir compris.
        }, 800)
    }
}

const box = document.createElement("div");
box.classList.add("box");

const board = document.querySelector("#board");

let nb = 1;

for (let i = 1; i <= 10; i++) {
    let newbox = box.cloneNode();
    newbox.innerText = i;
    board.appendChild(newbox);

    newbox.addEventListener("click", function () {
        // a mettre ici les fonction start et stop

        if (i == nb) {
            onclick = () => {
                cronos.initialization();
            }
        }
        if (i == nb) {
            newbox.classList.add("box-valid")
            // 1
            if (nb == board.children.length) {
                board.querySelectorAll(".box").forEach(function (box) {
                    showReaction("success", box);
                })
            }
            nb++
        }
        // 2
        else if (i > nb) {
            showReaction("error", newbox)
            nb = 1
            board.querySelectorAll(".box-valid").forEach(function (validBox) {
                validBox.classList.remove("box-valid")
            })
        }
        // 3
        else {
            showReaction("notice", newbox)
        }
    })
}
shuffleChildren(board);

