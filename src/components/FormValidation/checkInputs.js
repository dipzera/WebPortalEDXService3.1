import { setErrorFor } from './setErrorFor';
import { setSuccessFor } from './setSuccessFor';
import { isEmail } from './isEmail';

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
    const passwordValue = regForm.password.value.trim();

    let check = true;

    if (bicValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.BIC, 'Campul nu trebuie sa fie gol');
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.BIC);
    }

    if (bankValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.Bank, 'Campul nu trebuie sa fie gol');
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
        setErrorFor(regForm.Email, 'Campul nu trebuie sa fie gol');
        check = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(regForm.Email, 'Adaugă o adresă de e-mail validă.')
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.Email);
    }

    if (ibanValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.IBAN, 'Campul nu trebuie sa fie gol');
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.IBAN);
    }

    if (idnoValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.IDNO, 'Campul nu trebuie sa fie gol');
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.IDNO);
    }

    if (juridicalAddressValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.JuridicalAddress, 'Campul nu trebuie sa fie gol');
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.JuridicalAddress);
    }

    if (juridicalNameValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.JuridicalName, 'Campul nu trebuie sa fie gol');
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.JuridicalName);
    }

    if (officeAddressValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.OfficeAddress, 'Campul nu trebuie sa fie gol');
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.OfficeAddress);
    }

    if (vatValue === '') {
        // show error
        // add error class
        setErrorFor(regForm.VATCode, 'Campul nu trebuie sa fie gol');
        check = false;
    } else {
        // add success class
        setSuccessFor(regForm.VATCode);
    }

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
    return check;
}

export { checkInputs };