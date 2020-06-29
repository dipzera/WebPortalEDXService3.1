async function getSentOrders(start, end) {
    const sentURL = new URL('https://api.efactura.md:4445/WebPortalEDXService/json/GetSentOrders?');
    const token = JSON.parse(localStorage.getItem('Token'));
    const params = { TKey: token, DStart: start, DEnd: end };
    sentURL.search = new URLSearchParams(params).toString();
    try {
        const response = await fetch(sentURL);
        const data = await response.json();
        console.log('Sent order: ', data);
        return data;
    } catch(error) {
        console.log(error);
    }
}
export { getSentOrders };