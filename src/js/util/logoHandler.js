async function base64toArrayBuffer(b64) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.onload = () => {
            let imgW = img.width;
            let imgH = img.height;
            canvas.width = img.width;
            canvas.height = img.height;
            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
            canvas.toBlob(async (data) => {
                resolve(await data.arrayBuffer());
            });
        }
        img.src = b64;
    });
}

/* Logo */
// [ Show image on input(type=file) ] //
function readURL(input, img) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = function (e) {
            img.setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// [ Limit the IMG size upload ] //
function limitUploadSize(target, img) {
    if (target.files && target.files[0]) {
        /* Maximum allowed size in bytes
          30KB example
          Change first Operand(multiplier) for your needs */
        const maxAllowedSize = 0.05 * (1024 * 1024);
        if (target.files[0].size > maxAllowedSize) {
            // Ask user to load correct file
            target.value = '';
        } else {
            readURL(target, img);
        }
    }
}

function renderImage(formLogo, img) {
    formLogo.addEventListener('change', function() {
        limitUploadSize(this, img)
    })
}

export { base64toArrayBuffer, readURL, limitUploadSize, renderImage };