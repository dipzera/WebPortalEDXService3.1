function getCountry(regForm) {
    fetch('https://api.efactura.md:4445/WebPortalEDXService/json/GetCountry')
        .then(res => res.json())
        .then(data => {
            let { ErrorCode } = data;
            if (ErrorCode === 0) {
                data.ListCountry.forEach(item => {
                    regForm.CountryID.innerHTML += `
                        <option value="${item.ID}">${item.Name}</option>
                    `;
                })
            }
        })
};

export { getCountry };