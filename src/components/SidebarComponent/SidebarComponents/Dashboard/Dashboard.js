import { toggleButtonState } from "../../../Home/toggleButtonState";
import { barChartRenderInvoice, barChartRenderOrder } from "./barChartRender";
import { pieChartRenderInvoice, pieChartRenderOrder } from "./pieChartRender";
import Splide from '@splidejs/splide'

import { getReceivedInvoiceList } from "../../../../server/getReceivedInvoiceList";
import { getSentInvoiceList } from "../../../../server/getSentInvoiceList";
import { getSentOrders } from "../../../../server/getSentOrders";
import { getReceivedOrders } from "../../../../server/getReceivedOrders";

import { toggleReceivedSentState } from "./toggleReceivedSentState";
import {getCurrentMonth} from "../../../../js/util/getCurrentMonth";

import arrowRight from '../../../../img/arrow-right.svg';
import dollarSign from '../../../../img/dollar-sign.png';
import cart from '../../../../img/cart.png';

import { localization } from "../../../../js/util/localization";
import {scrollToTop} from "../../../../js/util/scrollToTop";

let current_lang = JSON.parse(localStorage.getItem('Language'));

export const Dashboard = {
    render: (main) => {
        window.scrollTo({ top: 0 });

        const html = `
        <div class="container">
            
                <!-- Balance-->
                <div class="balance"> 
                  <div class="balance__inner"> 
                    <div class="balance-item"> 
                      <p class="balance-item__title">Account Balance</p>
                      <div class="balance-item__info"> 
                        <img src=${dollarSign} class="icon" alt="Dollar sign Icon">
                        <span class="balance-item__info-sum">0</span>
                      </div>
                    </div>
                     
                    <div class="balance-item"> 
                      <p class="balance-item__title">Spent Money</p>
                      <div class="balance-item__info"> 
                        <img src=${cart} class="icon" alt="Cart Icon">
                        <span class="balance-item__info-sum">0</span>
                      </div>
                    </div>
                    
                    <div class="balance-item"> 
                      <button class="balance-item__btn" type="button">Add Funds</button>
                    </div>
                     
                  </div>
                </div> 
                
                
                <!-- Credentials -->
<!--                <div class="credentials"> -->
<!--                    <div class="credentials-col"> -->
<!--                        <dl class="credentials-col__info"> -->
<!--                            <dt>Account Manager:</dt>-->
<!--                            <dd>Nicolae Suman</dd>-->
<!--                        </dl>-->
<!--                        <dl class="credentials-col__info"> -->
<!--                            <dt>Email:</dt>-->
<!--                            <dd>nicolaesuman@gmail.com</dd>-->
<!--                        </dl>-->
<!--                        <dl class="credentials-col__info"> -->
<!--                            <dt>Telefon:</dt>-->
<!--                            <dd>+971 50 2259 235</dd>-->
<!--                        </dl>-->
<!--                    </div>-->
<!--                    -->
<!--                    <div class="credentials-col"> -->
<!--                        <dl class="credentials-col__info"> -->
<!--                            <dt>RTA Trade License:</dt>-->
<!--                            <dd>9982-2456-7811</dd>-->
<!--                        </dl>-->
<!--                        <dl class="credentials-col__info"> -->
<!--                            <dt>Membership ID:</dt>-->
<!--                            <dd>0012559</dd>-->
<!--                        </dl>-->
<!--                        <dl class="credentials-col__info"> -->
<!--                            <dt>On boarder:</dt>-->
<!--                            <dd>Nick Reynolds</dd>-->
<!--                        </dl>-->
<!--                    </div>-->
<!--                </div>-->
                
<!--                <hr>-->
                 
                <!-- Invoice -->
                <div class="dashboard__invoice" id="bigScreen"> 
                    <div class="invoice-col"> 
                        <p class="invoice-col__title">${localization[current_lang].dashboard.ReceivedInvoice}</p>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Pending}</span>
                            <span id="pendingReceivedInvoice" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Processing}</span>
                            <span id="processingReceivedInvoice" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Rejected}</span>
                            <span id="unloadedReceivedInvoice" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Accepted}</span>
                            <span id="acceptedReceivedInvoice" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span id="totalText" class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.All}</span>
                            <span id="totalReceivedInvoice" class="invoice-col__status-number">0</span>
                        </div>
                        <a href="#/received-invoice" class="invoice-col__link">${localization[current_lang].dashboard.Details}<span><img src=${arrowRight} alt="Arrow right"></span></a>
                    </div>
                    
                    <div class="invoice-col"> 
                        <p class="invoice-col__title">${localization[current_lang].dashboard.SentInvoice}</p>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Pending}</span>
                            <span id="pendingSentInvoice" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Processing}</span>
                            <span id="processingSentInvoice" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Rejected}</span>
                            <span id="unloadedSentInvoice" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Accepted}</span>
                            <span id="acceptedSentInvoice" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span id="totalText" class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.All}</span>
                            <span id="totalSentInvoice" class="invoice-col__status-number">0</span>
                        </div>
                        <a href="#/sent-invoice" class="invoice-col__link">${localization[current_lang].dashboard.Details}<span><img src=${arrowRight} alt="Arrow right"></span></a>
                    </div>
                    
                    <div class="invoice-col"> 
                        <p class="invoice-col__title">${localization[current_lang].dashboard.ReceivedOrder}</p>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Pending}</span>
                            <span id="pendingReceivedOrder" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Processing}</span>
                            <span id="processingReceivedOrder" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Rejected}</span>
                            <span id="unloadedReceivedOrder" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Accepted}</span>
                            <span id="acceptedReceivedOrder" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span id="totalText" class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.All}</span>
                            <span id="totalReceivedOrder" class="invoice-col__status-number">0</span>
                        </div>
                        <a href="#/received-order" class="invoice-col__link">${localization[current_lang].dashboard.Details}<span><img src=${arrowRight} alt="Arrow right"></span></a>
                    </div>
                    
                    <div class="invoice-col"> 
                        <p class="invoice-col__title">${localization[current_lang].dashboard.SentOrder}</p>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Pending}</span>
                            <span id="pendingSentOrder" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Processing}</span>
                            <span id="processingSentOrder" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Rejected}</span>
                            <span id="unloadedSentOrder" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.Accepted}</span>
                            <span id="acceptedSentOrder" class="invoice-col__status-number">0</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span id="totalText" class="invoice-col__status-text">${localization[current_lang].invoice.filter.status.All}</span>
                            <span id="totalSentOrder" class="invoice-col__status-number">0</span>
                        </div>
                        <a href="#/sent-order" class="invoice-col__link">${localization[current_lang].dashboard.Details}<span><img src=${arrowRight} alt="Arrow right"></span></a>
                    </div>
                </div> <!-- /invoice -->
                
                
                <!-- MOBILE -->
                <div class="dashboard__invoice splide" id="mobile"> 
                    <div class="splide__track">
                        <div class="splide__list">
                            <div class="invoice-col__mobile splide__slide"> 
                                <h1 class="invoice-col__mobile-title">${localization[current_lang].dashboard.ReceivedInvoice}</h1>
                                <div class="invoice-col__mobile-container">
                                    <div class="invoice-col__mobile-container__flexbox">
                                        <div class="invoice-col__mobile-innercol"> 
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Pending}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Processing}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Rejected}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Accepted}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.All}</h2>
                                        </div>
                                        <div class="invoice-col__mobile-innercol"> 
                                            <h2 id="pendingReceivedInvoice" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="processingReceivedInvoice" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="unloadedReceivedInvoice" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="acceptedReceivedInvoice" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="totalReceivedInvoice" class="invoice-col__mobile-status__number">0</h2>
                                        </div>
                                    </div>
                                    <a href="#/received-invoice" class="invoice-col__link">${localization[current_lang].dashboard.Details}<span><img src=${arrowRight} alt="Arrow right"></span></a>
                                </div>
                            </div>
                             
                            <div class="invoice-col__mobile splide__slide"> 
                                <h1 class="invoice-col__mobile-title">${localization[current_lang].dashboard.SentInvoice}</h1>
                                <div class="invoice-col__mobile-container">
                                    <div class="invoice-col__mobile-container__flexbox">
                                        <div class="invoice-col__mobile-innercol"> 
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Pending}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Processing}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Rejected}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Accepted}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.All}</h2>
                                        </div>
                                        <div class="invoice-col__mobile-innercol"> 
                                            <h2 id="pendingSentInvoice" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="processingSentInvoice" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="unloadedSentInvoice" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="acceptedSentInvoice" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="totalSentInvoice" class="invoice-col__mobile-status__number">0</h2>
                                        </div>
                                    </div>
                                    <a href="#/sent-invoice" class="invoice-col__link">${localization[current_lang].dashboard.Details}<span><img src=${arrowRight} alt="Arrow right"></span></a>
                                </div>
                            </div>
                            
                            <div class="invoice-col__mobile splide__slide"> 
                                <h1 class="invoice-col__mobile-title">${localization[current_lang].dashboard.ReceivedOrder}</h1>
                                <div class="invoice-col__mobile-container">
                                    <div class="invoice-col__mobile-container__flexbox">
                                        <div class="invoice-col__mobile-innercol"> 
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Pending}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Processing}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Rejected}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Accepted}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.All}</h2>
                                        </div>
                                        <div class="invoice-col__mobile-innercol"> 
                                            <h2 id="pendingReceivedOrder" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="processingReceivedOrder" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="unloadedReceivedOrder" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="acceptedReceivedOrder" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="totalReceivedOrder" class="invoice-col__mobile-status__number">0</h2>
                                        </div>
                                    </div>
                                    <a href="#/received-order" class="invoice-col__link">${localization[current_lang].dashboard.Details}<span><img src=${arrowRight} alt="Arrow right"></span></a>
                                </div>
                            </div>
                            
                            <div class="invoice-col__mobile splide__slide"> 
                                <h1 class="invoice-col__mobile-title">${localization[current_lang].dashboard.SentOrder}</h1>
                                <div class="invoice-col__mobile-container">
                                    <div class="invoice-col__mobile-container__flexbox">
                                        <div class="invoice-col__mobile-innercol"> 
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Pending}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Processing}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Rejected}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.Accepted}</h2>
                                            <h2 class="invoice-col__mobile-status__text">${localization[current_lang].invoice.filter.status.All}</h2>
                                        </div>
                                        <div class="invoice-col__mobile-innercol"> 
                                            <h2 id="pendingSentOrder" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="processingSentOrder" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="unloadedSentOrder" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="acceptedSentOrder" class="invoice-col__mobile-status__number">0</h2>
                                            <h2 id="totalSentOrder" class="invoice-col__mobile-status__number">0</h2>
                                        </div>
                                    </div>
                                    <a href="#/sent-order" class="invoice-col__link">${localization[current_lang].dashboard.Details}<span><img src=${arrowRight} alt="Arrow right"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- /invoice Mobile -->
                
                
                
                <!-- Invoice Graph -->
                <div class="graph"> 
                    <div class="graph__inner"> 
                        <div class="graph-item">
                            <div class="graph-item__select"> 
                                <p class="graph-item__select-title">${localization[current_lang].chart.Invoice}</p>
                                <div class="graph-item__select-options">
                                    <button class="invoice-btns active" id="invoiceReceivedBtn" type="button">${localization[current_lang].chart.Received}</button>
                                    <button class="invoice-btns" id="invoiceSentBtn" type="button">${localization[current_lang].chart.Sent}</button>
                                </div>
                            </div>
                            <canvas id="pieChartInvoice" class="graph-item__chart"></canvas>
                        </div>
                        
                        <div class="graph-item"">
                            <canvas id="barChartInvoice" class="graph-item__chart"></canvas>
                        </div>
                    </div>
                </div>
                
                
                <!-- Order Graph -->
                <div class="graph"> 
                    <div class="graph__inner"> 
                        <div class="graph-item">
                            <div class="graph-item__select"> 
                                <p class="graph-item__select-title">${localization[current_lang].chart.Order}</p>
                                <div class="graph-item__select-options">
                                    <button class="order-btns active" id="orderReceivedBtn" type="button">${localization[current_lang].chart.Received}</button>
                                    <button class="order-btns" id="orderSentBtn" type="button">${localization[current_lang].chart.Sent}</button>
                                </div>
                            </div>
                            <canvas id="pieChartOrder" class="graph-item__chart"></canvas>
                        </div>
                        
                        <div class="graph-item">
                            <canvas id="barChartOrder" class="graph-item__chart"></canvas>
                        </div>
                    </div>
                </div>
            </div> <!-- /container -->
            <div class="scroll-up active"> 
            </div>
        `;
        main.innerHTML = `${html}`;

        /* [ Button state function ] */
        const link = document.querySelector('#dashboard');
        toggleButtonState(link);

        /* [ Invoice Chart ]*/
        pieChartRenderInvoice(document.getElementById('pieChartInvoice').getContext('2d'));
        barChartRenderInvoice(document.getElementById('barChartInvoice').getContext('2d'));

        /* [ Order Chart ] */
        pieChartRenderOrder(document.getElementById('pieChartOrder').getContext('2d'));
        barChartRenderOrder(document.getElementById('barChartOrder').getContext('2d'));



        /* Render data in dashboard */
        const currentMonthDate = getCurrentMonth();
        (async function renderData() {
            const receivedInvoiceData = await getReceivedInvoiceList(currentMonthDate[0], currentMonthDate[1]);
            const sentInvoiceData = await getSentInvoiceList(currentMonthDate[0], currentMonthDate[1]);
            const receivedOrderData = await getReceivedOrders(currentMonthDate[0], currentMonthDate[1]);
            const sentOrderData = await getSentOrders(currentMonthDate[0], currentMonthDate[1]);


            document.querySelectorAll('#pendingReceivedInvoice').forEach(el => el.innerHTML = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 0).length);
            document.querySelectorAll('#processingReceivedInvoice').forEach(el => el.innerHTML = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 100).length);
            document.querySelectorAll('#unloadedReceivedInvoice').forEach(el => el.innerHTML = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 300).length); // rejected
            document.querySelectorAll('#acceptedReceivedInvoice').forEach(el => el.innerHTML = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 200).length);
            document.querySelectorAll('#totalReceivedInvoice').forEach(el => el.innerHTML = receivedInvoiceData.InvoiceList.length);

            document.querySelectorAll('#pendingSentInvoice').forEach(el => el.innerHTML = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 0).length);
            document.querySelectorAll('#processingSentInvoice').forEach(el => el.innerHTML = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 100).length);
            document.querySelectorAll('#unloadedSentInvoice').forEach(el => el.innerHTML = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 300).length); // rejected
            document.querySelectorAll('#acceptedSentInvoice').forEach(el => el.innerHTML = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 200).length);
            document.querySelectorAll('#totalSentInvoice').forEach(el => el.innerHTML = sentInvoiceData.InvoiceList.length);

            document.querySelectorAll('#pendingReceivedOrder').forEach(el => el.innerHTML = receivedOrderData.OrderList.filter(el => el.OrderState === 0).length);
            document.querySelectorAll('#processingReceivedOrder').forEach(el => el.innerHTML = receivedOrderData.OrderList.filter(el => el.OrderState === 100).length);
            document.querySelectorAll('#unloadedReceivedOrder').forEach(el => el.innerHTML = receivedOrderData.OrderList.filter(el => el.OrderState === 300).length); // rejected
            document.querySelectorAll('#acceptedReceivedOrder').forEach(el => el.innerHTML = receivedOrderData.OrderList.filter(el => el.OrderState === 200).length);
            document.querySelectorAll('#totalReceivedOrder').forEach(el => el.innerHTML = receivedOrderData.OrderList.length);

            document.querySelectorAll('#pendingSentOrder').forEach(el => el.innerHTML = sentOrderData.OrderList.filter(el => el.OrderState === 0).length);
            document.querySelectorAll('#processingSentOrder').forEach(el => el.innerHTML = sentOrderData.OrderList.filter(el => el.OrderState === 100).length);
            document.querySelectorAll('#unloadedSentOrder').forEach(el => el.innerHTML = sentOrderData.OrderList.filter(el => el.OrderState === 300).length); // rejected
            document.querySelectorAll('#acceptedSentOrder').forEach(el => el.innerHTML = sentOrderData.OrderList.filter(el => el.OrderState === 200).length);
            document.querySelectorAll('#totalSentOrder').forEach(el => el.innerHTML = sentOrderData.OrderList.length);
        })();


        const invoiceReceivedBtn = document.getElementById('invoiceReceivedBtn');
        const invoiceSentBtn = document.getElementById('invoiceSentBtn');
        const invoiceBtns = document.querySelectorAll('.invoice-btns');
        const orderBtns = document.querySelectorAll('.order-btns');

        /* Toggle received or order button state */
        toggleReceivedSentState(invoiceBtns);
        toggleReceivedSentState(orderBtns);



        scrollToTop(document.querySelector('.scroll-up'));

        /* [ Handle redirect ] */

         (function checkLocalStorage() {
             if (localStorage.getItem('Token') == null) {
                 history.pushState({}, document.title, window.location = '/#/login');
             }
        })();

         /* Slider */
         new Splide('.splide', {
             arrows: false,
             type: 'loop'
         }).mount();
    }

}