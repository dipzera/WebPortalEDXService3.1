import { setErrorFor } from '../components/FormValidation/setErrorFor';
import { setSuccessFor} from "../components/FormValidation/setSuccessFor";

async function loginRequest(logForm) {
    let logUrl = "https://api.efactura.md:4445/WebPortalEDXService/json/Logon";
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name: logForm.email.value,
            Password: logForm.password.value
        })
    };
    try {
        const response = await fetch(logUrl, options);
        const logData = await response.json();
        return logData;
    } catch(error) {
        console.error(error);
    }
}

export { loginRequest };