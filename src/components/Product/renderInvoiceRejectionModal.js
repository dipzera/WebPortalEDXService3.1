export function renderInvoiceRejectionModal(open_btn, modal, close_btn) {
    open_btn.addEventListener('click', function() {
        modal.classList.add('active');
    });
    close_btn.addEventListener('click', function() {
        modal.classList.remove('active');
    });

}