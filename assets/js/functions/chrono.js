export function createChrono(dom) {
    let h = 0, m = 0, s = 0, cs = 0;
    let timer = null;

    const format = val => val < 10 ? '0' + val : val;

    function updateDisplay() {
        dom.getHours.textContent = format(h);
        dom.getMinutes.textContent = format(m);
        dom.getSeconds.textContent = format(s);
        dom.getCentiseconds.textContent = format(cs);
    }

    return {
        start() {
            if (!timer) {
                timer = setInterval(() => {
                    cs++;
                    if (cs > 99) { cs = 0; s++; }
                    if (s > 59) { s = 0; m++; }
                    if (m > 59) { m = 0; h++; }
                    updateDisplay();
                }, 10);
            }
        },
        stop() {
            clearInterval(timer);
            timer = null;
        },
        reset() {
            this.stop();
            h = m = s = cs = 0;
            updateDisplay();
        }
    };
}
