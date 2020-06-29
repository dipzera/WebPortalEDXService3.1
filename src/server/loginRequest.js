import { setErrorFor } from '../components/FormValidation/setErrorFor';
import { setSuccessFor} from "../components/FormValidation/setSuccessFor";

async function loginRequest(logForm) {
    let logUrl = "https://api.efactura.md:4445/WebPortalEDXService/json/Logon";
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name: logForm.email.value,
            Password: logForm.password.value
        })
    };
    try {
        const response = await fetch(logUrl, options);
        const logData = await response.json();
        console.log(logData);
        if (logData.ErrorCode === 0) {
            setSuccessFor(logForm.email);
            setSuccessFor(logForm.password);
            localStorage.setItem('Token', JSON.stringify(logData.TKey));
            localStorage.setItem('CommercialName', JSON.stringify(logData.Company.CommercialName));
            localStorage.setItem('BIC', JSON.stringify(logData.Company.BIC));
            localStorage.setItem('Bank', JSON.stringify(logData.Company.Bank));
            localStorage.setItem('Email', JSON.stringify(logData.Company.Email));
            localStorage.setItem('IBAN', JSON.stringify(logData.Company.IBAN));
            localStorage.setItem('IDNO', JSON.stringify(logData.Company.IDNO));
            localStorage.setItem('JuridicalAddress', JSON.stringify(logData.Company.JuridicalAddress));
            localStorage.setItem('JuridicalName', JSON.stringify(logData.Company.JuridicalName));
            localStorage.setItem('Language', JSON.stringify(logData.Company.Language));
            localStorage.setItem('OfficeAddress', JSON.stringify(logData.Company.OfficeAddress));
            localStorage.setItem('VATCode', JSON.stringify(logData.Company.VATCode));

            /* GO to main page if no error */
            window.location = location.protocol + '//' + location.host + location.pathname;
        } else {
            setErrorFor(logForm.email, 'Date introduse incorecte.');
            setErrorFor(logForm.password, '');
        }
    } catch (error) {
        console.error(error);
        window.location = location.protocol + '//' + location.host + '#/404';
    }
}

export { loginRequest };