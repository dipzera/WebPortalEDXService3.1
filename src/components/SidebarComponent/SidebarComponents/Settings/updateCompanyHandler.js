import {localization} from "../../../../js/util/localization";
import {base64toArrayBuffer, getBase64Image, toDataURL} from "../../../../js/util/logoHandler";
import { updateCompany } from "../../../../server/updateCompany";
import {setErrorFor} from "../../../FormValidation/setErrorFor";
import { checkInputs} from "../../../FormValidation/checkInputs";

let current_lang = JSON.parse(localStorage.getItem('Language'));

export const updateCompanyHandler = (button, confirmButton, form, inputs) => {
    /* first click */
    button.addEventListener('click', () => {
        inputs.forEach(input => {
            window.scrollTo({ top: 0 });
            input.removeAttribute('disabled');
            input.style.setProperty('color', '#000', 'important');
            // input.style.setProperty('border-color', '#55D8FE', 'important');
            // if (input.hasAttribute('required')) {
            //     input.setAttribute('placeholder', `${localization[current_lang].settings.FormPlaceholder}`);
            // }
            if (input.hasAttribute('required')) {
                input.addEventListener('change', function() {
                    checkInputs(this.parentNode.parentNode.parentNode);
                });
            }
        });
        button.classList.add('hide');
        confirmButton.classList.remove('hide');
    });
    /* second click ( confirmation ) */
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        checkInputs(this) ? await updateSubmit(this): null;
    });

    async function updateSubmit(form) {
        let formLogo = document.querySelector('#logoImg');
        let base64 = getBase64Image(formLogo);
        let commName = form.CommercialName.value === '' ? form.CommercialName.value = form.JuridicalName.value : form.CommercialName.value;
        let logoHandler = base64 === 'data:,' ? base64 = JSON.parse(localStorage.getItem('Logo')) : base64;
        // TODO [ If the user doesn't choose a Logo input the one from the localStorage ]
        // const buffer = await base64toArrayBuffer(formLogo === `${location.protocol}//${location.host}/` ? formLogo = JSON.parse(localStorage.getItem('Logo')) : formLogo);
        // let bufferedImg = Array.from(new Uint8Array(buffer));
        // console.log(bufferedImg);
        const body = JSON.stringify({
            BIC: form.BIC.value,
            VATCode: form.VATCode.value,
            Bank: form.Bank.value,
            CommercialName: commName,
            Email: form.Email.value,
            IBAN: form.IBAN.value,
            IDNO: form.IDNO.value,
            JuridicalName: form.JuridicalName.value,
            JuridicalAddress: form.JuridicalAddress.value,
            Language: form.Language.value,
            OfficeAddress: form.OfficeAddress.value,
            Logo: logoHandler
        });
        let opBody = JSON.parse(body);
        // toDataURL(formLogo, function(dataUrl) { opBody.Logo = dataUrl; });
        const settingsData = await updateCompany(form, body);
        if (settingsData.ErrorCode === 0) { // No error
            localStorage.setItem('BIC', JSON.stringify(form.BIC.value));
            localStorage.setItem('Bank', JSON.stringify(form.Bank.value));
            localStorage.setItem('CommercialName', JSON.stringify(commName));
            localStorage.setItem('Email', JSON.stringify(form.Email.value));
            localStorage.setItem('IBAN', JSON.stringify(form.IBAN.value));
            localStorage.setItem('VATCode', JSON.stringify(form.VATCode.value));
            localStorage.setItem('JuridicalName', JSON.stringify(form.JuridicalName.value));
            localStorage.setItem('JuridicalAddress', JSON.stringify(form.JuridicalAddress.value));
            localStorage.setItem('Language', JSON.stringify(form.Language.value));
            localStorage.setItem('OfficeAddress', JSON.stringify(form.OfficeAddress.value));
            localStorage.setItem('Logo', JSON.stringify(opBody.Logo));


        } else if (settingsData.ErrorCode === 100) { // Company already exists
            alert('Utilizator cu aceste date deja exista!');
        } else {
            alert('Alegeți altă imagine!');
        }
        window.scrollTo({ top: 0 });
        window.location.reload();
    }




}