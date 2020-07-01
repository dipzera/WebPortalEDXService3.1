export async function setOrderState(number, status, rejectMsg = '') {
    const token = JSON.parse(localStorage.getItem('Token'));
    const orderStateURL = new URL('https://api.efactura.md:4445/WebPortalEDXService/json/SetOrderState?');
    const params = { APIKey: token, InvoiceCode: number, State: status, Note: rejectMsg };
    orderStateURL.search = new URLSearchParams(params).toString();
    try {
        const response = await fetch(orderStateURL);
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.error('Error: ', error);
    }
}