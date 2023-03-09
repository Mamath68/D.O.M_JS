function shuffleChildren(parent) {
    let children = parent.children;
    let i = children.length, k, temp;

    while (--i > 0) {
        k = Math.floor(Math.random() * (i + 1));
        temp = children[k];
        children[k] = children[i];
        parent.appendChild(temp);
    }
}

function showReaction(type, clickedBox) {
    clickedBox.classList.add(type);
    if (type !== "success") {
        setTimeout(function () {
            clickedBox.classList.remove(type);
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

        if (i == nb) {
            console.log("Boite n° " + i + " click !")
            newbox.classList.add("box-valid")
            // 1
            if (nb == board.children.length) {
                board.querySelectorAll(".box").forEach(function (box) {
                    showReaction("success", box)
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

