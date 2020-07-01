
export function renderProductTable(table, tablelist, invoice, order) {


    if (invoice) { // invoice table
        let html = '';
        tablelist.forEach(list => {
            table.innerHTML = `
                <table>
                <thead> 
                    <tr> 
                        <th class="column1">Denumire</th>
                        <th class="column2">Cantitate</th>
                        <th class="column3">Preț unitar (fără TVA)</th>
                        <th class="column4">Valoarea totală (fără TVA)</th>
                        <th class="column5">TVA</th>
                        <th class="column6">Suma totală a TVA</th>
                        <th class="column7">Suma Totală</th>
                    </tr>
                </thead>
                    <tbody> 
                        <!-- Render from server-->
                    </tbody>
                </table>
            `;
            html += `
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
        `;
            table.querySelector('tbody').innerHTML = html;
        })
    } else if (order) { // order table
        let html = '';
        tablelist.forEach(list => {
            table.innerHTML = `
                <table>
                    <thead> 
                        <tr> 
                            <th class="column1">Denumire</th>
                            <th class="column2">Cantitate</th>
                            <th class="column3">Preț</th>
                            <th class="column4">Cod</th>
                        </tr>
                    </thead>
                    <tbody> 
                        <!-- Render from server-->
                    </tbody>
                </table>
            `;
            html += `
           <tr> 
               <td class="column1">${list.Name}</td>
               <td class="column2">${list.Quantity}</td>
               <td class="column3">${list.Price}</td>
               <td class="column4">${list.Code}</td>
           </tr>
        `;
            table.querySelector('tbody').innerHTML = html;
        })
    }


}

/* Fixed header for table */
export function fixTableHeader(e) {
    const el = e.target,
        sT = el.scrollTop;
    el.querySelectorAll('thead th').forEach(th => th.style.transform = `translateY(${sT}px`);
}

