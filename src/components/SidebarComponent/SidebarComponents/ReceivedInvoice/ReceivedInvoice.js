import { toggleButtonState } from "../../../Home/toggleButtonState";
import { getReceivedInvoiceList } from "../../../../server/getReceivedInvoiceList";
import { convertDate, convertDateWithHour } from "../../../../js/util/dateConverter";
import { renderComponentTable } from "../../renderComponentTable";

export const ReceivedInvoice = {
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
                                    <li class="filter-item__status-list-btn active" id="total"><a class="filter-item__status-text">All</a></li>
                                    <li class="filter-item__status-list-btn" id="pending"><a class="filter-item__status-text">Pending</a></li>
                                    <li class="filter-item__status-list-btn" id="rejected"><a class="filter-item__status-text">Rejected</a></li>
                                    <li class="filter-item__status-list-btn" id="accepted"><a class="filter-item__status-text">Accepted</a></li>
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
                        <!-- Add elements from server database-->
                    </tbody>
                </table>
            </div>
        `;


        main.innerHTML = `${html}`;

        const link = document.querySelector('#received-invoice');
        const tableBody = document.querySelector('table tbody');
        const component = link.id;

        /* Toggle state color of component links (sidebar) */
        toggleButtonState(link);

        /* Render table list items */
        try {
            renderComponentTable(await getReceivedInvoiceList('2000-01-01', '2100-01-01'), tableBody, component, );
        } catch (error) {
            renderComponentTable(await getReceivedInvoiceList('2000-01-01', '2100-01-01'), tableBody, component);
        }


        /* Render product page when clicking table element */
        document.querySelectorAll('table tbody tr').forEach(row => row.addEventListener('click', function() {
            const dataLines = JSON.parse(this.dataset.lines.replace(/~/g, "\'"));
            const status = this.dataset.status;
            const number = this.dataset.number;
            history.pushState({dataLines, status, number}, document.title, window.location += this.dataset.href);
        }))


    }
}