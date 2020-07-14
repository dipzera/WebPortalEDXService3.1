export async function updateCompany(settingsForm, body) {
    let regUrl = new URL("https://api.efactura.md:4445/WebPortalEDXService/json/UpdateCompany");

    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    };
    try {
        const response = await fetch(regUrl, options);
        const regData = await response.json();
        console.log(regData);
        return regData;

    } catch (error) {
        console.error(error);
    }
}