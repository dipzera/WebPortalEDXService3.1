async function changePassword(token, password) {
    const changePasswordURL = new URL('https://api.efactura.md:4445/WebPortalEDXService/json/ChangePassword?');
    const params = { TKey: token, NPassword: password };
    changePasswordURL.search = new URLSearchParams(params).toString();
    try {
        const response = await fetch(changePasswordURL);
        const data = await response.json();
        console.log('Change Password: ', data);
        return data;
    } catch(error) {
        console.log(error);
    }
}

export { changePassword };