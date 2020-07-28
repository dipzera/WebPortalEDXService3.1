import infrastructure from '../img/infrastructure.svg'
function emailConfirm(email, token) {
    let confUrl = window.location.protocol + '//' + window.location.host + '#/validate/' + token;
    console.log(confUrl);
    let bodyContent = `
        <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
            <a href="${confUrl}">Apasa-ti aici pentru a confirma inregistrarea dvs!</a>
        </div>
        
    `;
    Email.send({
        SecureToken: '81d54abc-3384-41dd-8536-b9dcc57e22bf',
        To: email,
        From: 'nathanielthomaz@gmail.com',
        Subject: 'E-Factura',
        Body: bodyContent
    });
}
export { emailConfirm };