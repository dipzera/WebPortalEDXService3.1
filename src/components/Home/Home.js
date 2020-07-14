import {getReceivedInvoiceList} from "../../server/getReceivedInvoiceList";
import {getReceivedOrders} from "../../server/getReceivedOrders";
import {getSentOrders} from "../../server/getSentOrders";
import {getSentInvoiceList} from "../../server/getSentInvoiceList";
import { localization } from "../../js/util/localization";

let current_lang = JSON.parse(localStorage.getItem('Language'));


export const HomeComponent = {

    render: () => {

        return `
            <section class="home-body"> 
<!--              <div class="header"> -->
<!--              </div>-->
              
              <div class="flex-container">
                  <div class="sidebar"> 
                    <div class="sidebar-inner">
                      <div class="sidebar-inner__profile"> 
                        <div class="sidebar-inner__profile-img"> 
                            <img src="${JSON.parse(localStorage.getItem('Logo'))}" class="avatar" alt="Avatar">
                        </div>
                        <div class="sidebar-inner__profile-name">${JSON.parse(localStorage.getItem('CommercialName'))}</div>
                        <div class="sidebar-inner__profile-title">Admin<span class="level">level 1</span></div>
                      </div>
                      
                      <nav class="sidebar-inner__nav"> 
                        <ul> 
                          <li><a id="dashboard" href="#/dashboard">Dashboard</a></li>
                          <li><a id="received-invoice" href="#/received-invoice" data-l10n-id="receivedInvoice" data-key="receivedInvoice">${localization[current_lang].sidebar.ReceivedInvoice}</a></li>
                          <li><a id="sent-invoice" href="#/sent-invoice" data-l10n-id="sentInvoice" data-key="sentInvoice">${localization[current_lang].sidebar.SentInvoice}</a></li>
                          <li><a id="received-order" href="#/received-order" data-l10n-id="receivedOrder" data-key="receivedOrder">${localization[current_lang].sidebar.ReceivedOrder}</a></li>
                          <li><a id="sent-order" href="#/sent-order" data-l10n-id="sentOrder" data-key="sentOrder">${localization[current_lang].sidebar.SentOrder}</a></li>
                        </ul>
                        
                        <ul> 
                          <li><a id="settings" href="#/settings">${localization[current_lang].sidebar.Settings}</a></li>
                          <li><a id="logOut" href="#/login" onclick="javascript: localStorage.removeItem('Token');
          localStorage.removeItem('JuridicalName');
          localStorage.removeItem('JuridicalAddress');
          localStorage.removeItem('Bank');
          localStorage.removeItem('VATCode');
          localStorage.removeItem('IDNO');
          localStorage.removeItem('Component');
          localStorage.removeItem('BIC');
          localStorage.removeItem('Language');
          localStorage.removeItem('CountryID');
          localStorage.removeItem('IBAN');
          localStorage.removeItem('CommercialName');
          localStorage.removeItem('OfficeAddress');
          localStorage.removeItem('Email');">${localization[current_lang].sidebar.Logout}</a></li>
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

