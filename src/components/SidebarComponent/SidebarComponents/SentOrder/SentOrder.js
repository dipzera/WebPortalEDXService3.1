import { toggleButtonState } from "../../../Home/toggleButtonState";
import {getSentOrders} from "../../../../server/getSentOrders";
import { convertDate } from "../../../../js/util/dateConverter";
import { renderComponentTable } from "../../renderComponentTable";
import {getSentInvoiceList} from "../../../../server/getSentInvoiceList";
import {getReceivedOrders} from "../../../../server/getReceivedOrders";
import {getCurrentMonth} from "../../../../js/util/getCurrentMonth";
import {getReceivedInvoiceList} from "../../../../server/getReceivedInvoiceList";
import { localization } from "../../../../js/util/localization";

let current_lang = JSON.parse(localStorage.getItem('Language'));

import arrowRight from '../../../../img/arrow-right.svg';
import {scrollToTop} from "../../../../js/util/scrollToTop";


export const SentOrder = {
    render: async (main) => {
        window.scrollTo({ top: 0 });

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
                    
<!--                        <div class="filter-item"> -->
<!--                            <img src="src/img/filter.svg" class="filter-item__img" alt="Filter">-->
<!--                            <p class="filter-item__text">Filter</p>-->
<!--                        </div>-->
                        
                        <div class="filter-item"> 
                            <div class="filter-item__status"> 
                                <ul class="filter-item__status-list">
                                    <li class="filter-item__status-list-btn active" id="Total"><a class="filter-item__status-text">${localization[current_lang].invoice.filter.status.All}</a></li>
                                    <li class="filter-item__status-list-btn" id="Pending"><a class="filter-item__status-text">${localization[current_lang].invoice.filter.status.Pending}</a></li>
                                    <li class="filter-item__status-list-btn" id="Processing"><a class="filter-item__status-text">${localization[current_lang].invoice.filter.status.Processing}</a></li>
                                    <li class="filter-item__status-list-btn" id="Rejected"><a class="filter-item__status-text">${localization[current_lang].invoice.filter.status.Rejected}</a></li>
                                    <li class="filter-item__status-list-btn" id="Accepted"><a class="filter-item__status-text">${localization[current_lang].invoice.filter.status.Accepted}</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="filter-item"> 
                            <div class="filter-item__time"> 
                                <ul class="filter-item__time-list"> 
                                    <li id="day" class="filter-item__time-link"><a class="filter-item__time-text">${localization[current_lang].order.filter.date.Day}</a></li>
                                    <li id="week" class="filter-item__time-link"><a class="filter-item__time-text">${localization[current_lang].order.filter.date.Week}</a></li>
                                    <li id="month" class="filter-item__time-link active"><a class="filter-item__time-text">${localization[current_lang].order.filter.date.Month}</a></li>
                                    <li id="custom" class="filter-item__time-link"><a>${localization[current_lang].order.filter.date.Custom}</a></li>
                                </ul>
                                <div class="filter-item__date" > 
                                    <input class="filter-item__date-input" name="start" id="start" value="2000-01-01" min="2000-01-01" max="2030-01-01" type="date"/>
                                    <label for="start">${localization[current_lang].order.filter.date.To}</label>
                                    <input class="filter-item__date-input" name="end" id="end" value="2030-01-01" min="2000-01-01" max="2030-01-01" type="date"/>
                                    <button class="filter-item__time-link" id="customToggler" type="button"><img src=${arrowRight} alt="Arrow right" width="15px"></button>
                                </div>
                                <button class="balance-item__btn filter-item__time-link" type="button" id="customToggler">Search</button>

                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

                
                <!-- Table -->
            <div class="table__container order"> 
                <table> 
                    <thead> 
                        <tr> 
                            <th>№</th>
                            <th>${localization[current_lang].order.table.Date}</th>
                            <th>${localization[current_lang].order.table.DeliveryDate}</th>
                            <th>${localization[current_lang].order.table.State}</th>
                        </tr>
                    </thead>
                    <tbody> 
 
                    </tbody>
                </table>
            </div>
            <div class="scroll-up active"> 
            </div>
        `;
        main.innerHTML = `${html}`;
        const link = document.querySelector('#sent-order');
        const tableBody = document.querySelector('table tbody');
        const currentMonth = getCurrentMonth();
        const component = link.id;

        /* Toggle state color of component links */
        toggleButtonState(link);

        /* Render table list items */
        await renderComponentTable(await getSentOrders(currentMonth[0], currentMonth[1]), tableBody, component);
        scrollToTop(document.querySelector('.scroll-up'));



    },

}