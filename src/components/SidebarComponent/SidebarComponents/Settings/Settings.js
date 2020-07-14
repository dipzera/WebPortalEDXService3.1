import {toggleButtonState} from "../../../Home/toggleButtonState";
import { updateApiKey } from "../../../../server/updateApiKey";
import { changePassword } from "../../../../server/changePassword";
import { checkInputs } from "../../../FormValidation/checkInputs";
import { updateCompany } from "../../../../server/updateCompany";
import {popUpMessage} from "../../../../js/util/popUpMessage";
import { base64toArrayBuffer, readURL, limitUploadSize, renderImage } from "../../../../js/util/logoHandler";
import { localization } from "../../../../js/util/localization";
import {updateCompanyHandler} from "./updateCompanyHandler";
import {togglePasswordVisibility} from "../../../FormValidation/togglePasswordVisibility";
import { changePasswordHandler } from "./changePasswordHandler";
import { updateApiKeyHandler } from "./updateApiKeyHandler";

let current_lang = JSON.parse(localStorage.getItem('Language'));

export const Settings = {
    render: (main) => {
        const html = `
            <div class="container">
                <h3 class="settings__title">${localization[current_lang].settings.title}</h3>
                <div class="settings-group-container">
                    <form class="settings-form settings-form--company"> 
                        <div class="settings-group__col">
    
                            <div class="settings-group"> 
                                <div class="settings-group__title">${localization[current_lang].settings.JuridicalName}</div>
                                <input type="text" class="settings-group__input settings-group__input--configurable" name="JuridicalName" value="${JSON.parse(localStorage.getItem('JuridicalName'))}" disabled required/>
                            </div>
                            
                            <div class="settings-group"> 
                                <div class="settings-group__title">${localization[current_lang].settings.CommercialName}</div>
                                <input type="text" class="settings-group__input settings-group__input--configurable" name="CommercialName" value="${JSON.parse(localStorage.getItem('CommercialName'))}" disabled />
                            </div>
                            
                            <div class="settings-group"> 
                                <div class="settings-group__title">${localization[current_lang].settings.JuridicalAddress}</div>
                                <input type="text" class="settings-group__input settings-group__input--configurable" name="JuridicalAddress" value="${JSON.parse(localStorage.getItem('JuridicalAddress'))}" disabled required/>
                            </div>
                            
                            <div class="settings-group"> 
                                <div class="settings-group__title">${localization[current_lang].settings.OfficeAddress}</div>
                                <input type="text" class="settings-group__input settings-group__input--configurable" name="OfficeAddress" value="${JSON.parse(localStorage.getItem('OfficeAddress'))}" disabled required/>
                            </div>
                            
                            <div class="settings-group"> 
                                <div class="settings-group__title">${localization[current_lang].settings.IDNO}</div>
                                <input type="text" class="settings-group__input" name="IDNO" value="${JSON.parse(localStorage.getItem('IDNO'))}" disabled/>
                            </div>
                            
                            <div class="settings-group"> 
                                <div class="settings-group__title">${localization[current_lang].settings.IBAN}</div>
                                <input type="text" class="settings-group__input settings-group__input--configurable" name="IBAN" value="${JSON.parse(localStorage.getItem('IBAN'))}" disabled required/>
                            </div>
                            
                            <div class="settings-group"> 
                                <div class="settings-group__title">${localization[current_lang].settings.Bank}</div>
                                <input type="text" class="settings-group__input settings-group__input--configurable" name="Bank" value="${JSON.parse(localStorage.getItem('Bank'))}" disabled required/>
                            </div>
                            
                            <div class="settings-group"> 
                                <div class="settings-group__title">${localization[current_lang].settings.BIC}</div>
                                <input type="text" class="settings-group__input settings-group__input--configurable" name="BIC" value="${JSON.parse(localStorage.getItem('BIC'))}" disabled required/>
                            </div>
                            
                            <div class="settings-group"> 
                                <div class="settings-group__title">${localization[current_lang].settings.VATCode}</div>
                                <input type="text" class="settings-group__input settings-group__input--configurable" name="VATCode" value="${JSON.parse(localStorage.getItem('VATCode'))}" disabled required/>
                            </div>
                            
                            <div class="settings-group"> 
                                <div class="settings-group__title">${localization[current_lang].settings.Email}</div>
                                <input type="text" class="settings-group__input settings-group__input--configurable" name="Email" value="${JSON.parse(localStorage.getItem('Email'))}" disabled required/>

                            </div>
                            
                            <div class="settings-group">
                                <div class="settings-group__title">${localization[current_lang].settings.Language}</div>
                                <select class="register-form__select-txt settings-group__input--configurable" name="Language" style="margin: 15px 0;" disabled required> 
                                    <option value="ro">Romana</option>
                                    <option value="ru">Rusa</option>
                                </select>
                            </div>
                            <div class="settings-group"> 
                                <div class="settings-group__title">${localization[current_lang].settings.Logo}</div>
                                <input type="file" class="settings-group__input settings-group__input--configurable" name="Logo" disabled style="border: 0 !important; margin: 15px 0;" required/>
                                <img id="logoImg" src="" alt=""/>
                            </div>
                            <button id="updateCompanyInfoBtn" class="settings-group__btn-update" type="button">${localization[current_lang].settings.UpdateButton}</button>
                            <button id="updateCompanyInfoBtnConfirm" class="settings-group__btn-update hide" type="submit">${localization[current_lang].settings.ConfirmButton}</button>
                        </div> <!-- / .settings-group__col -->
                    </form>
                        
                    <form class="settings-form settings-form--tokenpassword">
                        <div class="settings-group__col">
                            <div class="settings-group"> 
                                <div class="settings-group__title">Token</div>
                                <input id="token" type="text" class="settings-group__input" value="${JSON.parse(localStorage.getItem('Token'))}" disabled/>
                                <button id="updateAPIKeyButton" class="settings-group__input-change" type="button">${localization[current_lang].settings.GenerateTokenButton}</button>
                            </div>
                            
                            <div class="settings-group"> 
                                <div class="settings-group__title">${localization[current_lang].settings.Password}</div>
                                <input id="passwordInput" type="password" class="settings-group__input" value="parolacontului" name="password" minlength="6" disabled required/>
        
                                <button id="changePasswordInputVisibilityToggle" type="button" class="password-toggle" name="checkbox"><i class="fas fa-eye"></i></button>
        
                                <button id="changePasswordButton" class="settings-group__input-change" type="button">${localization[current_lang].settings.ChangePasswordButton}</button>
                                <button id="confirmPasswordChangeButton" class="settings-group__input-change  hide" name="confirmPasswordChangeButton" type="submit">${localization[current_lang].settings.ChangePasswordConfirmButton}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
        main.innerHTML = `${html}`;

        let tokenInput = document.getElementById('token');
        const updateAPIKeyButton = document.getElementById('updateAPIKeyButton');
        let passwordInput = document.getElementById('passwordInput');
        const formCompany = document.querySelector('.settings-form--company');
        const formTokenPassword = document.querySelector('.settings-form--tokenpassword');
        const link = document.querySelector('#settings');
        const localStorageToken = JSON.parse(localStorage.getItem('Token'));
        const changePasswordButton = document.getElementById('changePasswordButton');
        const confirmPasswordChangeButton = document.getElementById('confirmPasswordChangeButton');
        const passwordToggle = document.querySelector('.password-toggle');
        const updateCompanyInfoButton = document.querySelector('#updateCompanyInfoBtn');
        const updateCompanyInfoButtonConfirm = document.querySelector('#updateCompanyInfoBtnConfirm');
        const formInputs = document.querySelectorAll('.settings-group__input--configurable');
        const logo = document.querySelector('#logoImg');


        /* Active class to current component link */
        toggleButtonState(link);

        /* Update API Key */
        updateApiKeyHandler(updateAPIKeyButton, tokenInput, localStorageToken);

        /* Change password */
        changePasswordHandler(formTokenPassword, passwordToggle, passwordInput, changePasswordButton, confirmPasswordChangeButton, localStorageToken);

        /* Read image url */
        renderImage(formCompany.Logo, logo);

        /* Update Company info */
        updateCompanyHandler(updateCompanyInfoButton, updateCompanyInfoButtonConfirm, formCompany, formInputs);

    }
}

