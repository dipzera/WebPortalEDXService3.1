import { confirmSuccess } from "./confirmSuccess";
import { confirmError } from "./confirmError";

export const ValidateComponent = {
    validateUser: () => {
        (() => {
            let app = document.querySelector('#app');
            let hash = window.location.hash;
            let splitHash = hash.split('#/validate/');
            const token = splitHash[1];
            const validateURL = new URL('https://api.efactura.md:4445/WebPortalEDXService/json/ValidateRegistration?');
            const params = { TKey: token };
            validateURL.search = new URLSearchParams(params).toString();
            fetch(validateURL)
                .then(res => res.json())
                .then(data => {
                    if (data.ErrorCode === 0) {
                        confirmSuccess(app);
                    }
                })
                .catch(error => {
                    confirmError(app);
                })
        })();
    }
}