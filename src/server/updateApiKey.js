async function updateApiKey(token) {
    const updateApiKeyUrl = new URL('http://api.efactura.md:4445/WebPortalEDXService/json/UpdateAPIKey?');
    const params = { TKey: token };
    updateApiKeyUrl.search = new URLSearchParams(params).toString();
    try {
        const response = await fetch(updateApiKeyUrl);
        const data = await response.json();
        console.log('Update api key data: ', data);
        return data;
    } catch(error) {
        console.log(error);
    }
}

export { updateApiKey };