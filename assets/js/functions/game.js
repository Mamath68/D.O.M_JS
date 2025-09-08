import { shuffleChildren } from './shuffle.js';
import { showReaction } from './reactions.js';

function createGame(dom, chrono) {
    return {
        current: 1,
        max: 10,
        init() {
            this.max = parseInt(dom.input.value) || 10;
            this.current = 1;
            dom.board.innerHTML = "";

            for (let i = 1; i <= this.max; i++) {
                const box = document.createElement("div");
                box.classList.add("box");
                box.textContent = i;
                dom.board.appendChild(box);
                box.addEventListener("click", () => this.handleClick(i, box));
            }

            shuffleChildren(dom.board);
            chrono.reset();
        },
        handleClick(i, box) {
            if (i === 1 && this.current === 1) chrono.start();

            if (i === this.current) {
                box.classList.add("box-valid");
                if (this.current === this.max) {
                    dom.board.querySelectorAll(".box").forEach(b => showReaction("success", b));
                    chrono.stop();
                }
                this.current++;
            } else if (i > this.current) {
                showReaction("error", box);
                this.init();
            } else {
                showReaction("notice", box);
            }
        }
    };
}

export default game;
