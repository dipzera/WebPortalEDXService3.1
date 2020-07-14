import {localization} from "../../../../js/util/localization";
import {changePassword} from "../../../../server/changePassword";
import {togglePasswordVisibility} from "../../../FormValidation/togglePasswordVisibility";
let current_lang = JSON.parse(localStorage.getItem('Language'));

export function changePasswordHandler(form, icon, password, button, confirmButton, token) {
    togglePasswordVisibility(icon, password);
    button.addEventListener('click', function() {
        password.value = '';
        password.removeAttribute('disabled');
        password.setAttribute('placeholder', `${localization[current_lang].settings.PasswordPlaceholder}`);
        password.focus();
        button.classList.add('hide');
        confirmButton.classList.remove('hide');
        icon.style.display = 'block'
    });

    /* Second click on changing password (confirm) */
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const data = await changePassword(token, this.password.value);
        if (data.ErrorCode === 0) {
            window.scrollTo({ top: 0 });
            window.location.reload();
        }
    });
}