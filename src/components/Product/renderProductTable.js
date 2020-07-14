import { localization } from "../../js/util/localization";

let current_lang = JSON.parse(localStorage.getItem('Language'));


export function renderProductTable(table, tablelist, invoice, order) {


    if (invoice) { // invoice table
        let html = '';
        tablelist.forEach(list => {
            table.innerHTML = `
                <table>
                <thead> 
                    <tr> 
                        <th class="column1">${localization[current_lang].product.table.Name}</th>
                        <th class="column2">${localization[current_lang].product.table.Quantity}</th>
                        <th class="column3">${localization[current_lang].product.table.PriceNet}</th>
                        <th class="column4">${localization[current_lang].product.table.SumNet}</th>
                        <th class="column5">${localization[current_lang].product.table.VAT}</th>
                        <th class="column6">${localization[current_lang].product.table.TotalVAT}</th>
                        <th class="column7">${localization[current_lang].product.table.TotalSUM}</th>
                    </tr>
                </thead>
                    <tbody> 
                        <!-- Render from server-->
                    </tbody>
                </table>
            `;
            /* FIXME [ FIX this later, this is done for test purpose ] */

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
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr><tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr><tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr><tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
            <tr> 
                <td class="column1">${list.Name}</td>
                <td class="column2">${list.Quantity}</td>
                <td class="column3 numspan">${list.PriceNet.toFixed(2)}</td>
                <td class="column4 numspan">${list.TotalSumNet.toFixed(2)}</td>
                <td class="column5 numspan">${list.VATPercent}%</td>
                <td class="column6 numspan">${list.TotalVAT.toFixed(2)}</td>
                <td class="column7 numspan"><strong>${list.TotalSum}</strong></td>
            </tr>
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

