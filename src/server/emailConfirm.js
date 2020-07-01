
function emailConfirm(email, token) {
    let confUrl = window.location.protocol + '//' + window.location.host + '#/validate/' + token;
    console.log(confUrl);
    let bodyContent = `<a href="${confUrl}">Apasa-ti aici pentru a confirma inregistrarea dvs!</a>`
    Email.send({
        SecureToken: '81d54abc-3384-41dd-8536-b9dcc57e22bf',
        To: email,
        From: 'nathanielthomaz@gmail.com',
        Subject: 'Test email',
        Body: bodyContent
    });
}
export { emailConfirm };