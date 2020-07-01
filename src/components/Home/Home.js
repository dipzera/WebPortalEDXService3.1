import {getReceivedInvoiceList} from "../../server/getReceivedInvoiceList";
import {getReceivedOrders} from "../../server/getReceivedOrders";
import {getSentOrders} from "../../server/getSentOrders";
import {getSentInvoiceList} from "../../server/getSentInvoiceList";

export const HomeComponent = {
    render: () => {
        return `
            <section class="home-body"> 
              <div class="header"> 
              </div>
              
              <div class="flex-container">
                  <div class="sidebar"> 
                    <div class="sidebar-inner">
                      <div class="sidebar-inner__profile"> 
                        <img src="src/img/avatar.png" class="avatar" alt="Avatar">
                        <div class="sidebar-inner__profile-name">${JSON.parse(localStorage.getItem('CommercialName'))}</div>
                        <div class="sidebar-inner__profile-title">Admin<span class="level">level 1</span></div>
                      </div>
                      
                      <nav class="sidebar-inner__nav"> 
                        <ul> 
                          <li><a id="dashboard" href="#/dashboard">Dashboard</a></li>
                          <li><a id="received-invoice" href="#/received-invoice">Facturi de intrare</a></li>
                          <li><a id="sent-invoice" href="#/sent-invoice">Facturi de ieșire</a></li>
                          <li><a id="received-order" href="#/received-order">Comenzi de intrare</a></li>
                          <li><a id="sent-order" href="#/sent-order">Comenzi de ieșire</a></li>
                        </ul>
                        
                        <ul> 
                          <li><a>Setări</a></li>
                          <li><a href="#/login" onclick="javascript: localStorage.clear()">Ieșire</a></li>
                        </ul>
                      </nav>
                    </div>
                  </div> <!-- /sidebar -->
                  
                  <!-- Side bar element render side  -->
                <main class="main"></main>
                
            </div> <!-- /flex-container -->
            
            
              
            </section> <!-- /home-body --> 
            
        `;
    },
    handleRedirect: () => {

        (function checkLocalStorage() {
            if (localStorage.getItem('Token') !== null) {
                history.pushState({}, document.title, window.location += '#/dashboard');
            } else {
                history.pushState({}, document.title, window.location += '#/login');
            }
        })();
    },
}