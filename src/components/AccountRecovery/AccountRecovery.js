import { resetPassword } from "../../server/resetPassword";

export const AccountRecovery = {
    render: () => {
        return `
           <div class="recovery-body form-body">
           
            <div class="recovery-container form-container"> 
            <div class="recovery-wrapper form-wrapper"> 
            <form class="recovery-form form"> 
                  <img class="" src="src/img/password-reset.svg">
                  <h1 class="recovery-form__title form__title">Resetează-ți parola</h1>
                  <div class="recovery-form__group form__group">
                    <input type="email" placeholder="Introdu adresa ta de email" name="email" required>
                    <div class="error-handling">
                      <i class="fas fa-exclamation-circle"></i>
                      <small class="error" style="display: none;">Error message</small>
                    </div>
                  </div>
                  <input class="recovery-form__btn form__btn" type="submit" value="Trimite email resetare" name="button">
                  
                  <div class="recovery-form__message"> 
                    A fost trimis un e-mail de resetare a parolei. Livrarea poate dura până la 60 de minute. Citiți-l pentru instrucțiuni suplimentare
                  </div>
                  
                  <div class="form__footer">
                    <a href="#/login">Înapoi la formularul de conectare</a>
                  </div>
            </form>
          </div>
        </div>
        <div class="company-logo"> 
                <img src="src/img/infrastructure.svg" width="62px;" height="50px;">
                <div class="company-text"> 
                    <span>powered by</span>
                    <span>intelectsoft</span>
                </div>
            </div>
      </div>
        `;
    },
    resetPassword: () => {
        const form = document.querySelector('.recovery-form');
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            const data = await resetPassword(this.email.value);
            if (data.ErrorCode === 0) {
                document.querySelector('.recovery-form__btn').classList.add('charge');
                document.querySelector('.recovery-form__btn').value = 'Se încarcă...';
                setTimeout(() => {
                    document.querySelector('.recovery-form__group').style.display = 'none';
                    document.querySelector('.recovery-form__btn').style.display = 'none';
                    document.querySelector('.recovery-form__message').classList.add('recovery-form__message--active');
                }, 1000);
            }
        })
    }

}