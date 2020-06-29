import { loginRequest } from '../../server/loginRequest';

export const LoginComponent = {
    render: () => {
        return `
      <div class="login-body form-body" style="background: url('src/img/edi.jpg') center no-repeat; background-size: cover;">
        <div class="login-container form-container"> 
          <div class="login-wrapper form-wrapper"> 
            <form class="login-form form"> 
              <h1 class="login-form__title form__title">Intră în contul tău</h1>
              <h2 class="login-form__subtitle form__subtitle">Introdu mai jos e-mailul și parola ta:</h2>
              <div class="login-form__group form__group">
                <input type="email" placeholder="E-mail" name="email">
                <div class="error-handling">
                  <i class="fas fa-exclamation-circle"></i>
                  <small class="error" style="display: none;">Error message</small>
                </div>
              </div>
              <div class="login-form__group form__group">
                <input type="password" name="password" placeholder="Parola">
                <div class="error-handling">
                  <i class="fas fa-exclamation-circle"></i>
                  <small class="error" style="display: none;">Error message</small>
                  <button type="button" class="password-toggle" name="checkbox"><i class="fas fa-eye"></i></button>
                </div>
              </div>
              <button class="form__btn" type="submit">Intră în cont</button>
              <p> 
                <a href="#/password-restore">Ai uitat parola?</a>
                <a href="#/register">Nu ai cont? Înregistrează-te acum</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    `;
    },
    loginRequest: () => {
        const logForm = document.querySelector('.login-form');
        logForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            await loginRequest(this);
        });
    }
}