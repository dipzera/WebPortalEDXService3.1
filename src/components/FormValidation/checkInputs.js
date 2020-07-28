import { setErrorFor } from './setErrorFor';
import { setSuccessFor } from './setSuccessFor';
import { isEmail } from './isEmail';
import { localization } from "../../js/util/localization";

let current_lang = JSON.parse(localStorage.getItem('Language')) === null ? localStorage.setItem('Language', JSON.stringify('ro')) : JSON.parse(localStorage.getItem('Language'));

function checkInputs(regForm) {
    const bicValue = regForm.BIC.value.trim();
    const bankValue = regForm.Bank.value.trim();
    let commValue = regForm.CommercialName.value.trim();
    // CountryID: '',
    const emailValue = regForm.Email.value.trim();
    const ibanValue = regForm.IBAN.value.trim();
    const idnoValue = regForm.IDNO.value.trim();
    const juridicalAddressValue = regForm.JuridicalAddress.value.trim();
    const juridicalNameValue = regForm.JuridicalName.value.trim();
    // Language: '',
    // Logo: [],
    const officeAddressValue = regForm.OfficeAddress.value.trim();
    const vatValue = regForm.VATCode.value.trim();
    let passwordValue;
    if (regForm.password) {
        passwordValue = regForm.password.value.trim();
        if (passwordValue === '') {
            // show error
            // add error class
            setErrorFor(regForm.password, 'Parola este obligatorie.');
            check = false;
        } else if (passwordValue.length <= 8) {
            setErrorFor(regForm.password, 'Parola trebuie sa contina mai mult de 8 caractere');
            check = false;
        } else {
            // add success class
            setSuccessFor(regForm.password);
        }
    }

    let check = true;

    if (bicValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.BIC, `${localization[current_lang].settings.FormPlaceholder}`);
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.BIC);
    }

    if (bankValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.Bank, `${localization[current_lang].settings.FormPlaceholder}`);
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.Bank);
    }

    // if (commValue === '') {
    //     // show error
    //     // add error class
    //     // setErrorFor(regForm.CommercialName, 'Campul nu trebuie sa fie gol');
    //     commValue === juridicalNameValue;
    //     check = false;
    // } else {
    //     // add success class
    //     setSuccessFor(regForm.CommercialName);
    // }

    if (emailValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.Email, `${localization[current_lang].settings.FormPlaceholder}`);
        check = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(regForm.Email, `${localization[current_lang].settings.ValidEmail}`)
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.Email);
    }

    if (ibanValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.IBAN, `${localization[current_lang].settings.FormPlaceholder}`);
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.IBAN);
    }

    if (idnoValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.IDNO, `${localization[current_lang].settings.FormPlaceholder}`);
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.IDNO);
    }

    if (juridicalAddressValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.JuridicalAddress, `${localization[current_lang].settings.FormPlaceholder}`);
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.JuridicalAddress);
    }

    if (juridicalNameValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.JuridicalName, `${localization[current_lang].settings.FormPlaceholder}`);
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.JuridicalName);
    }

    if (officeAddressValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.OfficeAddress, `${localization[current_lang].settings.FormPlaceholder}`);
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.OfficeAddress);
    }

    if (vatValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.VATCode, `${localization[current_lang].settings.FormPlaceholder}`);
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.VATCode);
    }


    return check;
}

export { checkInputs };