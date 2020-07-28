export function hamburgerMenuHandler(btn, sidebar) {
    btn.addEventListener('click', function() {
        this.classList.toggle('open');
        sidebar.classList.toggle('show');
    })
}