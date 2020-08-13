import {getReceivedInvoiceList} from "../../server/getReceivedInvoiceList";
import {getReceivedOrders} from "../../server/getReceivedOrders";
import {getSentOrders} from "../../server/getSentOrders";
import {getSentInvoiceList} from "../../server/getSentInvoiceList";
import { localization } from "../../js/util/localization";
import logout from '../../img/logout.svg';
import dashboard from '../../img/dashboard.svg';
import download from '../../img/download.svg';
import upload from '../../img/upload.svg';
import settings from '../../img/settings.svg';

// localStorage.setItem('Language', JSON.stringify('ro'));
let current_lang = JSON.parse(localStorage.getItem('Language'));

// let base64Image = btoa(String.fromCharCode(...new Uint8Array(JSON.parse(localStorage.getItem('Logo')))));


export const HomeComponent = {
    handleRedirect: () => {

        if (localStorage.getItem('Token') !== null) {
            history.pushState({}, document.title, window.location += '#/dashboard');
        } else {
            history.pushState({}, document.title, window.location += '#/login');
        }




    },
    render: () => {
        return `
            <section class="home-body"> 
<!--              <div class="header"> -->
<!--              </div>-->
              
              <div class="flex-container">
                  <div class="sidebar"> 
                    <div class="hamburger-menu"> 
                        <div class="hamburger-menu__btn"></div>
                    </div>
                    <div class="sidebar-inner">
                      <div class="sidebar-inner__profile"> 
                        <div class="sidebar-inner__profile-img"> 
                            <img src="${JSON.parse(localStorage.getItem('Logo'))}" class="avatar" alt="Avatar">
                        </div>
                        <p class="sidebar-inner__profile-name">${JSON.parse(localStorage.getItem('CommercialName'))}</p>
<!--                        <div class="sidebar-inner__profile-title">Admin<span class="level">level 1</span></div>-->
                      </div>
                      
                      <nav class="sidebar-inner__nav"> 
                        <ul> 
                          <li><a id="dashboard" href="#/dashboard"><img src=${dashboard} width="40px;" alt="Dashboard"/><span>${localization[current_lang].sidebar.Dashboard}</span></a></li>
                          <li><a id="received-invoice" href="#/received-invoice" data-l10n-id="receivedInvoice" data-key="receivedInvoice"><img src=${download} width="40px;" alt="Download" /><span>${localization[current_lang].sidebar.ReceivedInvoice}</span></a></li>
                          <li><a id="sent-invoice" href="#/sent-invoice" data-l10n-id="sentInvoice" data-key="sentInvoice"><img src=${upload} width="40px;" alt="Upload" /><span>${localization[current_lang].sidebar.SentInvoice}</span></a></li>
                          <li><a id="received-order" href="#/received-order" data-l10n-id="receivedOrder" data-key="receivedOrder"><img src=${download} width="40px;" alt="Download" /><span>${localization[current_lang].sidebar.ReceivedOrder}</span></a></li>
                          <li><a id="sent-order" href="#/sent-order" data-l10n-id="sentOrder" data-key="sentOrder"><img src=${upload} width="40px;" alt="Upload" /><span>${localization[current_lang].sidebar.SentOrder}</span></a></li>
                        </ul>
                        
                        <ul> 
                          <li><a id="settings" href="#/settings"><img src=${settings} width="40px;" alt="Settings" /><span>${localization[current_lang].sidebar.Settings}</span></a></li>
                          <li><a id="logOut" href="#/login"><img src=${logout} width="40px;" alt="Log Out Icon" /><span>${localization[current_lang].sidebar.Logout}</span></a></li>
                        </ul>
                      </nav>
                    </div>
                    
                  </div> <!-- /sidebar -->
                  
                  <!-- Side bar element render side  -->
                <main class="main"></main>
                
            </div> <!-- /flex-container -->
            
            
              
            </section> <!-- /home-body --> 
            
        `;

    }

}



