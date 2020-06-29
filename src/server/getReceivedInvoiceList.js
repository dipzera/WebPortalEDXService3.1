async function getReceivedInvoiceList(start, end) {
    const receiveURL = new URL('https://api.efactura.md:4445/WebPortalEDXService/json/GetReceivedInvoiceList?');
    const token = JSON.parse(localStorage.getItem('Token'));
    const params = { TKey: token, DStart: start, DEnd: end };
    receiveURL.search = new URLSearchParams(params).toString();
    try {
        const response = await fetch(receiveURL);
        const data = await response.json();
        console.log('Received invoice: ', data);
        return data;
    } catch(error) {
        console.log(error);
    }
}

export { getReceivedInvoiceList };