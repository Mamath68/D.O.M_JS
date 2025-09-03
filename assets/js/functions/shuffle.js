export function shuffleChildren(parent) {
    const childrenArray = Array.from(parent.children);
    for (let i = childrenArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [childrenArray[i], childrenArray[j]] = [childrenArray[j], childrenArray[i]];
    }
    childrenArray.forEach(child => parent.appendChild(child));
}
