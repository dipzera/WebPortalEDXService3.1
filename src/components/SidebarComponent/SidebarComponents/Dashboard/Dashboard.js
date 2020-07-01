import { toggleButtonState } from "../../../Home/toggleButtonState";
import { barChartRenderInvoice, barChartRenderOrder } from "./barChartRender";
import { pieChartRenderInvoice, pieChartRenderOrder } from "./pieChartRender";


import { getReceivedInvoiceList } from "../../../../server/getReceivedInvoiceList";
import { getSentInvoiceList } from "../../../../server/getSentInvoiceList";
import { getSentOrders } from "../../../../server/getSentOrders";
import { getReceivedOrders } from "../../../../server/getReceivedOrders";

import { toggleReceivedSentState } from "./toggleReceivedSentState";

export const Dashboard = {
    render: (main) => {
        const html = `
        <div class="container">
            
                <!-- Balance-->
                <div class="balance"> 
                  <div class="balance__inner"> 
                    <div class="balance-item"> 
                      <p class="balance-item__title">Account Balance</p>
                      <div class="balance-item__info"> 
                        <img src="src/img/dollar-sign.png" class="icon" alt="Dollar sign Icon">
                        <span class="balance-item__info-sum">$50,000</span>
                      </div>
                    </div>
                     
                    <div class="balance-item"> 
                      <p class="balance-item__title">Spent Money</p>
                      <div class="balance-item__info"> 
                        <img src="src/img/cart.png" class="icon" alt="Cart Icon">
                        <span class="balance-item__info-sum">$40,250</span>
                      </div>
                    </div>
                    
                    <div class="balance-item"> 
                      <button class="balance-item__btn" type="button">Add Funds</button>
                    </div>
                     
                  </div>
                </div> <!-- /balance -->
                
                
                <!-- Credentials -->
                <div class="credentials"> 
                    <div class="credentials-col"> 
                        <dl class="credentials-col__info"> 
                            <dt>Account Manager:</dt>
                            <dd>Nicolae Suman</dd>
                        </dl>
                        <dl class="credentials-col__info"> 
                            <dt>Email:</dt>
                            <dd>nicolaesuman@gmail.com</dd>
                        </dl>
                        <dl class="credentials-col__info"> 
                            <dt>Telefon:</dt>
                            <dd>+971 50 2259 235</dd>
                        </dl>
                    </div>
                    
                    <div class="credentials-col"> 
                        <dl class="credentials-col__info"> 
                            <dt>RTA Trade License:</dt>
                            <dd>9982-2456-7811</dd>
                        </dl>
                        <dl class="credentials-col__info"> 
                            <dt>Membership ID:</dt>
                            <dd>0012559</dd>
                        </dl>
                        <dl class="credentials-col__info"> 
                            <dt>On boarder:</dt>
                            <dd>Nick Reynolds</dd>
                        </dl>
                    </div>
                </div>
                
                <hr> <!-- Line -->
                
                <!-- Invoice -->
                <div class="dashboard__invoice"> 
                    <div class="invoice-col"> 
                        <p class="invoice-col__title">Facturi de intrare</p>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Pending</span>
                            <span id="pendingReceivedInvoice" class="invoice-col__status-number">1 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Rejected</span>
                            <span id="unloadedReceivedInvoice" class="invoice-col__status-number">18 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Accepted</span>
                            <span id="acceptedReceivedInvoice" class="invoice-col__status-number">15 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span id="totalText" class="invoice-col__status-text">Total</span>
                            <span id="totalReceivedInvoice" class="invoice-col__status-number">34 000</span>
                        </div>
                        <a href="#/received-invoice" class="invoice-col__link">Detalii<span><img src="src/img/arrow-right.svg" alt="Arrow right"></span></a>
                    </div>
                    
                    <div class="invoice-col"> 
                        <p class="invoice-col__title">Facturi de iesire</p>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Pending</span>
                            <span id="pendingSentInvoice" class="invoice-col__status-number">1 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Rejected</span>
                            <span id="unloadedSentInvoice" class="invoice-col__status-number">18 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Accepted</span>
                            <span id="acceptedSentInvoice" class="invoice-col__status-number">15 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span id="totalText" class="invoice-col__status-text">Total</span>
                            <span id="totalSentInvoice" class="invoice-col__status-number">34 000</span>
                        </div>
                        <a href="#/sent-invoice" class="invoice-col__link">Detalii<span><img src="src/img/arrow-right.svg" alt="Arrow right"></span></a>
                    </div>
                    
                    <div class="invoice-col"> 
                        <p class="invoice-col__title">Comenzi de intrare</p>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Pending</span>
                            <span id="pendingReceivedOrder" class="invoice-col__status-number">1 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Rejected</span>
                            <span id="unloadedReceivedOrder" class="invoice-col__status-number">18 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Accepted</span>
                            <span id="acceptedReceivedOrder" class="invoice-col__status-number">15 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span id="totalText" class="invoice-col__status-text">Total</span>
                            <span id="totalReceivedOrder" class="invoice-col__status-number">34 000</span>
                        </div>
                        <a href="#/received-order" class="invoice-col__link">Detalii<span><img src="src/img/arrow-right.svg" alt="Arrow right"></span></a>
                    </div>
                    
                    <div class="invoice-col"> 
                        <p class="invoice-col__title">Comenzi de iesire</p>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Pending</span>
                            <span id="pendingSentOrder" class="invoice-col__status-number">1 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Rejected</span>
                            <span id="unloadedSentOrder" class="invoice-col__status-number">18 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Accepted</span>
                            <span id="acceptedSentOrder" class="invoice-col__status-number">15 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span id="totalText" class="invoice-col__status-text">Total</span>
                            <span id="totalSentOrder" class="invoice-col__status-number">34 000</span>
                        </div>
                        <a href="#/sent-order" class="invoice-col__link">Detalii<span><img src="src/img/arrow-right.svg" alt="Arrow right"></span></a>
                    </div>
                </div> <!-- /invoice -->
                
                
                <!-- Invoice Graph -->
                <div class="graph"> 
                    <div class="graph__inner"> 
                        <div class="graph-item">
                            <div class="graph-item__select"> 
                                <p class="graph-item__select-title">Facturi</p>
                                <div class="graph-item__select-options">
                                    <button class="invoice-btns active" id="invoiceReceivedBtn" type="button">Intrare</button>
                                    <button class="invoice-btns" id="invoiceSentBtn" type="button">Ieșire</button>
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
                                <p class="graph-item__select-title">Comenzi</p>
                                <div class="graph-item__select-options">
                                    <button class="order-btns active" id="orderReceivedBtn" type="button">Intrare</button>
                                    <button class="order-btns" id="orderSentBtn" type="button">Ieșire</button>
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
        (async function renderData() {
            const receivedInvoiceData = await getReceivedInvoiceList('2000-01-01', '2100-01-01');
            const sentInvoiceData = await getSentInvoiceList('2000-01-01', '2100-01-01');
            const receivedOrderData = await getReceivedOrders('2000-01-01', '2100-01-01');
            const sentOrderData = await getSentOrders('2000-01-01', '2100-01-01');


            document.querySelector('#pendingReceivedInvoice').innerHTML = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 0).length;
            document.querySelector('#unloadedReceivedInvoice').innerHTML = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 100).length;
            document.querySelector('#acceptedReceivedInvoice').innerHTML = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 2).length;
            document.querySelector('#totalReceivedInvoice').innerHTML = receivedInvoiceData.InvoiceList.length;

            document.querySelector('#pendingSentInvoice').innerHTML = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 0).length;
            document.querySelector('#unloadedSentInvoice').innerHTML = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 100).length;
            document.querySelector('#acceptedSentInvoice').innerHTML = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 2).length;
            document.querySelector('#totalSentInvoice').innerHTML = sentInvoiceData.InvoiceList.length;

            document.querySelector('#pendingReceivedOrder').innerHTML = receivedOrderData.OrderList.filter(el => el.OrderState === 0).length;
            document.querySelector('#unloadedReceivedOrder').innerHTML = receivedOrderData.OrderList.filter(el => el.OrderState === 100).length;
            document.querySelector('#acceptedReceivedOrder').innerHTML = receivedOrderData.OrderList.filter(el => el.OrderState === 2).length;
            document.querySelector('#totalReceivedOrder').innerHTML = receivedOrderData.OrderList.length;

            document.querySelector('#pendingSentOrder').innerHTML = sentOrderData.OrderList.filter(el => el.OrderState === 0).length;
            document.querySelector('#unloadedSentOrder').innerHTML = sentOrderData.OrderList.filter(el => el.OrderState === 100).length;
            document.querySelector('#acceptedSentOrder').innerHTML = sentOrderData.OrderList.filter(el => el.OrderState === 2).length;
            document.querySelector('#totalSentOrder').innerHTML = sentOrderData.OrderList.length;
        })();


        const invoiceReceivedBtn = document.getElementById('invoiceReceivedBtn');
        const invoiceSentBtn = document.getElementById('invoiceSentBtn');
        const invoiceBtns = document.querySelectorAll('.invoice-btns');
        const orderBtns = document.querySelectorAll('.order-btns');

        /* Toggle received or order button state */
        toggleReceivedSentState(invoiceBtns);
        toggleReceivedSentState(orderBtns);




        /* [ Handle redirect ] */

         (function checkLocalStorage() {
             if (localStorage.getItem('Token') == null) {
                 history.pushState({}, document.title, window.location = '/#/login');
             }
        })();
    }

}