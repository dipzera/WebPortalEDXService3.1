async function getSentInvoiceList(start, end) {
    const sentURL = new URL('http://api.efactura.md:4445/WebPortalEDXService/json/GetSentInvoiceList?');
    const token = JSON.parse(localStorage.getItem('Token'));
    const params = { TKey: token, DStart: start, DEnd: end };
    sentURL.search = new URLSearchParams(params).toString();

    try {
        const response = await fetch(sentURL);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}
export { getSentInvoiceList };