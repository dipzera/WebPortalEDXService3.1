import { setErrorFor } from '../components/FormValidation/setErrorFor';
import { setSuccessFor} from "../components/FormValidation/setSuccessFor";

async function loginRequest(logForm) {
    let logUrl = "http://api.efactura.md:4445/WebPortalEDXService/json/Logon";
    // https://192.168.1.96:4445/WebPortalEDXService/json/Logon
    // https://api.efactura.md:4445/WebPortalEDXService/json/Logon
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
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
        // TODO: handle errors later
        console.log(error);
    }
}


export { loginRequest };