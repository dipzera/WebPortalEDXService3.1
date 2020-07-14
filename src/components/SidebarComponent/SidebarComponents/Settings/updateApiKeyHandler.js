import {updateApiKey} from "../../../../server/updateApiKey";

export function updateApiKeyHandler(button, tokenInput, token) {
    button.addEventListener('click', async function() {
        const data = await updateApiKey(token);
        if (data.ErrorCode === 0) {
            tokenInput.value = data.APIKey;
            window.scrollTo({ top: 0 });
        } else {
            console.log(data.APIKey, 'error');
        }
    })
}