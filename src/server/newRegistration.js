import { setErrorFor } from '../components/FormValidation/setErrorFor';
import { emailConfirm } from "./emailConfirm";
import {base64toArrayBuffer, toDataURL, getBase64Image } from "../js/util/logoHandler";


async function newRegistration(regForm) {

    // let buffer = await base64toArrayBuffer(avatar);
    // let bufferedImg = Array.from(new Uint8Array(buffer));
    // console.log(buffer);
    // console.log(bufferedImg);
    let avatar = document.querySelector('.register-form__group img');

    let base64 = getBase64Image(avatar);
    let regUrl = new URL("http://api.efactura.md:4445/WebPortalEDXService/json/NewRegistration");
    let commName = regForm.CommercialName.value === '' ? regForm.CommercialName.value = regForm.JuridicalName.value : regForm.CommercialName.value;
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
            OfficeAddress: regForm.OfficeAddress.value,
            VATCode: regForm.VATCode.value,
            password: regForm.password.value,
            Logo: base64
        }),
    };
    console.log(base64);
    // let optionsBody = JSON.parse(options.body);
    // toDataURL(avatar, function(dataUrl) { optionsBody.Logo = dataUrl; });
    let opBody = JSON.parse(options.body);
    let email = opBody.Email;
    console.log(options.body);
    // toDataURL(avatar, function(dataUrl) { opBody.Logo = dataUrl; });
    try {
        const response = await fetch(regUrl, options);
        const regData = await response.json();
        console.log(regData);
        if (regData.ErrorCode === 0) { // No error
            emailConfirm(email, regData.TKey);
            // TODO: create a modal pop up that tells user to confirm his email

            document.querySelector('.register-form__btn').classList.add('charge');
            document.querySelector('.register-form__btn').value = 'Se încarcă...';
            setTimeout(() => {
                document.querySelector('.register-form__btn').style.display = 'none';
                document.querySelector('.register-form__message').classList.add('register-form__message--active');
            }, 1500);
        } else if (regData.ErrorCode === 100) { // Company already exists
            setErrorFor(regForm.password, 'Utilizator cu aceste date deja există!');
        }
    } catch (error) {
        console.error(error);
    }
}

export { newRegistration };