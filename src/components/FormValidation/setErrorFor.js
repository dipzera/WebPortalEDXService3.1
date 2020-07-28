function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    // Add error message to small element
    small.innerText = message;

    // Add error class
    formControl.classList.add('error');
    if (formControl.classList.contains('success')) {
        formControl.classList.remove('success');
    }
}

export { setErrorFor };