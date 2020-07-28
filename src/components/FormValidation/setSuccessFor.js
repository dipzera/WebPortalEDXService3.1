function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.classList.add('success');
    if (formControl.classList.contains('error')) {
        formControl.classList.remove('error');
    }

}

export { setSuccessFor };