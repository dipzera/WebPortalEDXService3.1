async function getReceivedOrders(start, end) {
    const receiveURL = new URL('http://api.efactura.md:4445/WebPortalEDXService/json/GetReceivedOrders?');
    const token = JSON.parse(localStorage.getItem('Token'));
    const params = { TKey: token, DStart: start, DEnd: end };
    receiveURL.search = new URLSearchParams(params).toString();
    try {
        const response = await fetch(receiveURL);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}
export { getReceivedOrders };