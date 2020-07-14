import {localization} from "../../../../js/util/localization";
import { base64toArrayBuffer } from "../../../../js/util/logoHandler";
import { updateCompany } from "../../../../server/updateCompany";

let current_lang = JSON.parse(localStorage.getItem('Language'));

export const updateCompanyHandler = (button, confirmButton, form, inputs) => {
    /* first click */
    button.addEventListener('click', () => {
        inputs.forEach(input => {
            input.removeAttribute('disabled');
            if (input.hasAttribute('required')) {
                input.setAttribute('placeholder', `${localization[current_lang].settings.FormPlaceholder}`);
            }
            input.value = '';
            input.focus();
        });
        button.classList.add('hide');
        confirmButton.classList.remove('hide');
    });
    /* second click ( confirmation ) */
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        let commName = this.CommercialName.value === '' ? this.CommercialName.value = this.JuridicalName.value : this.CommercialName.value;
        const buffer = await base64toArrayBuffer(document.querySelector('#logoImg').src);
        const bufferedImg = Array.from(new Uint8Array(buffer));
        const body = JSON.stringify({
            BIC: this.BIC.value,
            VATCode: this.VATCode.value,
            Bank: this.Bank.value,
            CommercialName: commName,
            Email: this.Email.value,
            IBAN: this.IBAN.value,
            IDNO: this.IDNO.value,
            JuridicalName: this.JuridicalName.value,
            JuridicalAddress: this.JuridicalAddress.value,
            Language: this.Language.value,
            OfficeAddress: this.OfficeAddress.value,
            Logo: bufferedImg
        });
        const settingsData = await updateCompany(this, body);
        if (settingsData.ErrorCode === 0) { // No error
            localStorage.setItem('BIC', JSON.stringify(this.BIC.value));
            localStorage.setItem('Bank', JSON.stringify(this.Bank.value));
            localStorage.setItem('CommercialName', JSON.stringify(commName));
            localStorage.setItem('Email', JSON.stringify(this.Email.value));
            localStorage.setItem('IBAN', JSON.stringify(this.IBAN.value));
            localStorage.setItem('VATCode', JSON.stringify(this.VATCode.value));
            localStorage.setItem('JuridicalName', JSON.stringify(this.JuridicalName.value));
            localStorage.setItem('JuridicalAddress', JSON.stringify(this.JuridicalAddress.value));
            localStorage.setItem('Language', JSON.stringify(this.Language.value));
            localStorage.setItem('OfficeAddress', JSON.stringify(this.OfficeAddress.value));
            localStorage.setItem('Logo', JSON.stringify(document.querySelector('#logoImg').src));

        } else if (settingsData.ErrorCode === 100) { // Company already exists
            alert('Utilizator cu aceste date deja exista!');
        } else {
            alert('Alegeți altă imagine!');
        }
        window.scrollTo({ top: 0 });
        window.location.reload();
    })
}