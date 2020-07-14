export function togglePasswordVisibility(icon, password) {
    icon.addEventListener('click', function() {
        if (password.type === 'password') {
            password.type = 'text';
        } else {
            password.type = 'password';
        }
    });
}