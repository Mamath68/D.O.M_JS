export function showReaction(type, box) {
    box.classList.add(type);
    if (type !== "success") {
        setTimeout(() => box.classList.remove(type), 800);
    }
}
