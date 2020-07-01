import { checkInputs } from '../FormValidation/checkInputs';
import { newRegistration } from '../../server/newRegistration';
import { getCountry } from '../../server/getCountry';


const RegisterComponent = {
    render: () => {
        return `
          <div class="register-body form-body">
            <div class="register-container form-container"> 
              
              <!-- Modal confirm register pop up-->
              <div class="confirm-modal" style="display: none;">
                <div class="confirm-modal__container">
                  <span class="confirm-modal__message">V-ati inregistrat cu succes!<br>
                  Pentru a continua, confirmati inregistrarea pe email-ul dvs!</span> 
                </div> 
              </div>
            
            
              <div class="register-wrapper form-wrapper"> 
                <form class="register-form form" autocomplete="off"> 
                  <h1 class="resister-form__title form__title">Înregistrează-te acum!</h1>
                  <h2 class="register-form__subtitle form__subtitle">Pentru un cont nou, completeză campurile de mai jos:</h2>
                  <div class="register-form__group form__group">
                    <input type="text" placeholder="Denumire comerciala" name="CommercialName">
<!--                    <div class="error-handling">-->
<!--                      <i class="fas fa-exclamation-circle"></i>-->
<!--                      <i class="fas fa-check-circle"></i>-->
<!--                      <small class="error">Error message</small>-->
<!--                    </div>-->
                  </div>
                  
                  <div class="register-form__group form__group">
                    <input type="text" name="JuridicalName" placeholder="Denumire juridica">
                    <div class="error-handling">
                      <i class="fas fa-exclamation-circle"></i>
                      <i class="fas fa-check-circle"></i>
                      <small class="error">Error message</small>
                    </div>
                  </div>
                  
                  <div class="register-form__group form__group">
                    <input type="text" name="IDNO" placeholder="IDNO">
                    <div class="error-handling">
                      <i class="fas fa-exclamation-circle"></i>
                      <i class="fas fa-check-circle"></i>
                      <small class="error">Error message</small>
                    </div>
                  </div>
                  
                  <div class="register-form__group form__group">
                    <input type="text" name="Email" placeholder="E-mail">
                    <div class="error-handling">
                      <i class="fas fa-exclamation-circle"></i>
                      <i class="fas fa-check-circle"></i>
                      <small class="error">Error message</small>
                    </div>
                  </div>
                  
                  <div class="register-form__group form__group">
                    <input type="text" name="JuridicalAddress" placeholder="Adresa juridica">
                    <div class="error-handling">
                      <i class="fas fa-exclamation-circle"></i>
                      <i class="fas fa-check-circle"></i>
                      <small class="error">Error message</small>
                    </div>
                  </div>
                  
                  <div class="register-form__group form__group">
                    <input type="text" name="OfficeAddress" placeholder="Adresa fizica">
                    <div class="error-handling">
                      <i class="fas fa-exclamation-circle"></i>
                      <i class="fas fa-check-circle"></i>
                      <small class="error">Error message</small>
                    </div>
                  </div>
                  
                  <div class="register-form__group form__group">
                    <input type="text" name="Bank" placeholder="Banca">
                    <div class="error-handling">
                      <i class="fas fa-exclamation-circle"></i>
                      <i class="fas fa-check-circle"></i>
                      <small class="error">Error message</small>
                    </div>
                  </div>
                  
                  <div class="register-form__group form__group">
                    <input type="text" name="IBAN" placeholder="IBAN">
                    <div class="error-handling">
                      <i class="fas fa-exclamation-circle"></i>
                      <i class="fas fa-check-circle"></i>
                      <small class="error">Error message</small>
                    </div>
                  </div>
                  
                  <div class="register-form__group form__group">
                    <input type="text" name="BIC" placeholder="B.I.C">
                    <div class="error-handling">
                      <i class="fas fa-exclamation-circle"></i>
                      <i class="fas fa-check-circle"></i>
                      <small class="error">Error message</small>
                    </div>
                  </div>
                  
                  <div class="register-form__group form__group">
                    <input type="text" name="VATCode" placeholder="Codul TVA">
                    <div class="error-handling">
                      <i class="fas fa-exclamation-circle"></i>
                      <i class="fas fa-check-circle"></i>
                      <small class="error">Error message</small>
                    </div>
                  </div>
                  
                  <div class="register-form__group form__group select">
                  <div>
                    <span class="register-form__select-txt">Alegeti limba</span>
                      <select class="register-form__select-txt" name="Language"> 
                        <option value="ro">Romana</option>
                        <option value="ru">Rusa</option>
                      </select>
                    </div>
                    <div>
                      <span class="register-form__select-txt">Alegeti tara</span>
                      <select class="register-form__select-txt" name="CountryID"> 
                        <!-- Countries from server-->
                      </select>
                    </div>
                  </div>
                  
                  <div class="register-form__group form__group">
                    <input type="password" name="password" placeholder="Parola">
                    <div class="error-handling">
                      <i class="fas fa-exclamation-circle"></i>
                      <i class="fas fa-check-circle"></i>
                      <small class="error">Error message</small>
                    </div>
                  </div>
                  
                  <button class="form__btn" type="submit">Creează cont</button>
                  <p> 
                    <a href="#/login">Deja ai un cont?</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
      `;
    },
    newRegistration: () => {
        const regForm = document.querySelector('.register-form');
        getCountry(regForm);
        regForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            // Validate form then, if the fields are completed and validated, let user register
            checkInputs(this) ? await newRegistration(this) : null;
            // await newRegistration(this);
        })
    }
}

export { RegisterComponent };