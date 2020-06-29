import { toggleButtonState } from "../../../Home/toggleButtonState";
import {getSentInvoiceList} from "../../../../server/getSentInvoiceList";

export const SentInvoice = {
    render: async (main) => {
        (function checkLocalStorage() {
            if (localStorage.getItem('Token') == null) {
                history.pushState({}, document.title, window.location = '/#/login');
            }
        })();


        const html = `
        <div class="container"> 
                
                <!-- Filter -->
                <div class="filter"> 
                    <div class="filter__inner"> 
                    
                        <div class="filter-item"> 
                            <img src="src/img/filter.svg" class="filter-item__img" alt="Filter">
                            <p class="filter-item__text">Filter</p>
                        </div>
                        
                        <div class="filter-item"> 
                            <div class="filter-item__status"> 
                                <ul class="filter-item__status-list">
                                    <li><a class="filter-item__status-text">Toate</a></li>
                                    <li><a class="filter-item__status-text">În proces</a></li>
                                    <li><a class="filter-item__status-text">În așteptare</a></li>
                                    <li><a class="filter-item__status-text">Confirmate</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="filter-item"> 
                            <div class="filter-item__time"> 
                                <ul class="filter-item__time-list"> 
                                    <li><a class="filter-item__time-text">Day</a></li>
                                    <li><a class="filter-item__time-text">Week</a></li>
                                    <li><a class="filter-item__time-text">Month</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="filter-item"> 
                            <div class="filter-item__date"> 
                                <input type="date"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                
                <!-- Table -->
            <div class="table__container"> 
                <table> 
                    <thead> 
                        <tr> 
                            <th>№</th>
                            <th>Data creării</th>
                            <th>Data livrării</th>
                            <th>Data facturii</th>
                            <th>Destinatar</th>
                            <th>Stare</th>
                        </tr>
                    </thead>
                    <tbody> 
                        <!-- Render elements from server database -->
                    </tbody>
                </table>
            </div>
        `;
        main.innerHTML = `${html}`;
        const link = document.querySelector('#sent-invoice');
        toggleButtonState(link);

        /* Render table list items */
        //  TODO => Wrap this into a function and call it here, to give possibility of creating a loading spinner and show data at full load
        const data = await getSentInvoiceList('2000-01-01', '2100-01-01');
        let table = '';
        data.InvoiceList.forEach(list => {
            const listLines = JSON.stringify(list.Lines);
            table += `
                <tr data-href="/product" data-lines='${listLines.replace(/'/g, "\~")}'> 
                    <td><span class="status">${list.Number}</span></td>
                    <td>${convertDateWithHour(list.CreateDate).split(' ')[0]}<span class="hour"><img src="./src/img/clock.svg" alt="Clock">${convertDateWithHour(list.CreateDate).split(' ')[1]}</span></td>
                    <td>${convertDate(list.Date)}</td>
                    <td>${convertDate(list.DeliveryDate)}</td>
                    <td>${list.SenderName}</td>
                    <td>În proces</td>
                </tr>
            `;
        });
        document.querySelector('table tbody').innerHTML = table;



        document.querySelectorAll('table tbody tr').forEach(row => row.addEventListener('click', function() {
            const dataLines = JSON.parse(this.dataset.lines.replace(/~/g, "\'"));
            history.pushState({dataLines}, document.title, window.location += this.dataset.href);
        }))


    },

}