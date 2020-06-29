export function toggleButtonState(link) {
    if (new RegExp(link).test(window.location.href)) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
}
