import { toggleButtonState } from "../../../Home/toggleButtonState";
import { barChartRender } from "./barChartRender";
import { pieChartRender } from "./pieChartRender";

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
                            <span class="invoice-col__status-text">În așteptare</span>
                            <span id="pending" class="invoice-col__status-number">1 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">În proces</span>
                            <span id="in_process" class="invoice-col__status-number">18 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Confirmate</span>
                            <span id="confirmed" class="invoice-col__status-number">15 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span id="totalText" class="invoice-col__status-text">Total</span>
                            <span id="total" class="invoice-col__status-number">34 000</span>
                        </div>
                        <a href="#/received-invoice" class="invoice-col__link">Detalii<span><img src="src/img/arrow-right.svg" alt="Arrow right"></span></a>
                    </div>
                    
                    <div class="invoice-col"> 
                        <p class="invoice-col__title">Facturi de iesire</p>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">În așteptare</span>
                            <span id="pending" class="invoice-col__status-number">1 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">În proces</span>
                            <span id="in_process" class="invoice-col__status-number">18 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Confirmate</span>
                            <span id="confirmed" class="invoice-col__status-number">15 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span id="totalText" class="invoice-col__status-text">Total</span>
                            <span id="total" class="invoice-col__status-number">34 000</span>
                        </div>
                        <a href="#/sent-invoice" class="invoice-col__link">Detalii<span><img src="src/img/arrow-right.svg" alt="Arrow right"></span></a>
                    </div>
                    
                    <div class="invoice-col"> 
                        <p class="invoice-col__title">Comenzi de intrare</p>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">În așteptare</span>
                            <span id="pending" class="invoice-col__status-number">1 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">În proces</span>
                            <span id="in_process" class="invoice-col__status-number">18 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Confirmate</span>
                            <span id="confirmed" class="invoice-col__status-number">15 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span id="totalText" class="invoice-col__status-text">Total</span>
                            <span id="total" class="invoice-col__status-number">34 000</span>
                        </div>
                        <a href="#/received-order" class="invoice-col__link">Detalii<span><img src="src/img/arrow-right.svg" alt="Arrow right"></span></a>
                    </div>
                    
                    <div class="invoice-col"> 
                        <p class="invoice-col__title">Comenzi de iesire</p>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">În așteptare</span>
                            <span id="pending" class="invoice-col__status-number">1 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">În proces</span>
                            <span id="in_process" class="invoice-col__status-number">18 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span class="invoice-col__status-text">Confirmate</span>
                            <span id="confirmed" class="invoice-col__status-number">15 000</span>
                        </div>
                        <div class="invoice-col__status"> 
                            <span id="totalText" class="invoice-col__status-text">Total</span>
                            <span id="total" class="invoice-col__status-number">34 000</span>
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
                                    <button type="button">Intrare</button>
                                    <button type="button">Ieșire</button>
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
                                    <button type="button">Intrare</button>
                                    <button type="button">Ieșire</button>
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
        pieChartRender(document.getElementById('pieChartInvoice').getContext('2d'));
        barChartRender(document.getElementById('barChartInvoice').getContext('2d'));

        /* [ Order Chart ] */
        pieChartRender(document.getElementById('pieChartOrder').getContext('2d'));
        barChartRender(document.getElementById('barChartOrder').getContext('2d'));


        /* [ Handle redirect ] */

        (function checkLocalStorage() {
            if (localStorage.getItem('Token') == null) {
                history.pushState({}, document.title, window.location = '/#/login');
            }
        })();
    },

}