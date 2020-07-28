export async function validateRegistration(token) {
    const validateURL = new URL('http://api.efactura.md:4445/WebPortalEDXService/json/ValidateRegistration?');
    const params = { TKey: token };
    validateURL.search = new URLSearchParams(params).toString();
    try {
        const response = await fetch(validateURL);
        const data = await response.json();
        return data;
    } catch(error) {
        console.error(error);
    }
}