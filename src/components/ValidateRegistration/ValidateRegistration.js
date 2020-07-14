import { confirmSuccess } from "./confirmSuccess";
import { confirmError } from "./confirmError";
import { validateRegistration} from "../../server/validateRegistration";

export const ValidateComponent = {
    validateUser: () => {
        (async () => {
            let app = document.querySelector('#app');
            let hash = window.location.hash;
            let splitHash = hash.split('#/validate/');
            const token = splitHash[1];
            const validateData = await validateRegistration(token);
            if (validateData.ErrorCode === 0) {
                history.pushState({}, null, window.location = '/#/login');
            } else {
                confirmError(app);
            }
        })();
    }
}