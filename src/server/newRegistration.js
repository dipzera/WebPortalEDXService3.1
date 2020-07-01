import { setErrorFor } from '../components/FormValidation/setErrorFor';
import { emailConfirm } from "./emailConfirm";

async function newRegistration(regForm) {
    let regUrl = new URL("https://api.efactura.md:4445/WebPortalEDXService/json/NewRegistration");
    let commName = regForm.CommercialName.value ? null : regForm.CommercialName.value = regForm.JuridicalName.value;
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            BIC: regForm.BIC.value,
            Bank: regForm.Bank.value,
            CommercialName: commName,
            CountryID: regForm.CountryID.value,
            Email: regForm.Email.value,
            IBAN: regForm.IBAN.value,
            IDNO: regForm.IDNO.value,
            JuridicalName: regForm.JuridicalName.value,
            JuridicalAddress: regForm.JuridicalAddress.value,
            Language: regForm.Language.value,
            // Logo: '',
            OfficeAddress: regForm.OfficeAddress.value,
            VATCode: regForm.VATCode.value,
            password: regForm.password.value
        })
    };
    console.log(options.body);
    let opBody = JSON.parse(options.body);
    let email = opBody.Email;
    try {
        const response = await fetch(regUrl, options);
        const regData = await response.json();
        console.log(regData);
        if (regData.ErrorCode === 0) { // No error
            emailConfirm(email, regData.TKey);
            // regForm.reset();
            // window.location.replace('http://localhost:5501/#/confirm');
            // TODO: create a modal pop up that tells user to confirm his email
            document.querySelector('.confirm-modal').style.display = 'block';
        } else if (regData.ErrorCode === 100) { // Company already exists
            setErrorFor(regForm.password, 'Utilizator cu aceste date deja există!');
        }
    } catch (error) {
        console.error(error);
    }
}

export { newRegistration };