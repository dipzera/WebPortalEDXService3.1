export async function setInvoiceState(number, status, rejectMsg = 'test') {
    const token = JSON.parse(localStorage.getItem('Token'));
    const invoiceStateURL = new URL('http://api.efactura.md:4445/WebPortalEDXService/json/SetInvoiceState?');
    const params = { APIKey: token, InvoiceID: number, State: status, Note: rejectMsg };
    invoiceStateURL.search = new URLSearchParams(params).toString();
    try {
        const response = await fetch(invoiceStateURL);
        const data = await response.json();
        console.log(data);
        console.log(invoiceStateURL);
        return data;
    } catch(error) {
        console.error('Error: ', error);
    }
}