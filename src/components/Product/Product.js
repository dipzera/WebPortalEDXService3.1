import { HomeComponent } from "../Home/Home";
import { toggleButtonState } from "../Home/toggleButtonState";
import { renderProductTable, fixTableHeader } from "./renderProductTable";
import { renderInvoiceRejectionModal } from "./renderInvoiceRejectionModal";
import {NotFoundComponent} from "../NotFound/NotFound";
import { setInvoiceState } from "../../server/setInvoiceState";
import { setOrderState } from "../../server/setOrderState";
import { scrollToTop } from "../../js/util/scrollToTop";

import arrowLeft from '../../img/arrow-left.svg'

import { localization } from "../../js/util/localization";

let current_lang = JSON.parse(localStorage.getItem('Language'));

import { checkInputs } from "../FormValidation/checkInputs";
import {hamburgerMenuHandler} from "../../js/util/hamburgerMenuHandler";

export const ProductComponent = {
    main: (component) => {
        if (component === 'received-invoice') {
            return HomeComponent.render();
        } else if (component === 'sent-invoice') {
            return HomeComponent.render();
        } else if (component === 'received-order') {
            return HomeComponent.render();
        } else if (component === 'sent-order') {
            return HomeComponent.render();
        }


    },
    render: (component) => {
        window.scrollTo({ top: 0 });

        (function checkLocalStorage() {
            if (localStorage.getItem('Token') == null) {
                history.pushState({}, document.title, window.location = '/#/login');
            }
        })();

        (function checkHistoryState() {
            if (history.state === null) {
                history.pushState({}, document.title, window.location = `/#/${component}`);
            }
        })();

        // Check what component we're in so we could manage the state of sidebar and render the correspondent table
        if (component === 'received-invoice') {
            toggleButtonState(document.getElementById('received-invoice'));
        } else if (component === 'sent-invoice') {
            toggleButtonState(document.getElementById('sent-invoice'));
        } else if (component === 'received-order') {
            toggleButtonState(document.getElementById('received-order'));
        } else if (component === 'sent-order') {
            toggleButtonState(document.getElementById('sent-order'));
        }



        // The main page render
        const main = document.querySelector('.main');
        const html = `
            <div class="product">
                <div class="container"> 
                
                    <a class="product__btn-back" id="goBack" href="#/${component}"><span><img src=${arrowLeft} alt="Arrow left"/></span><p>${localization[current_lang].product.header.BackButton}</p></a>
                    
                    <!-- Credentials -->
                    <div class="credentials"> 
                        <div class="credentials-col"> 
                            <dl class="credentials-col__info"> 
                                <dt>${localization[current_lang].product.header.SenderName}:</dt>
                                <dd id="SenderName">${history.state.senderName}</dd>
                            </dl>
                            <dl class="credentials-col__info"> 
                                <dt>${localization[current_lang].product.header.DeliveryDate}:</dt>
                                <dd id="DeliveryDate">${history.state.deliveryDate}</dd>
                            </dl>
                        </div>
                        
                        <div class="credentials-col"> 
                            <dl class="credentials-col__info"> 
                                <dt>${localization[current_lang].product.header.Number}:</dt>
                                <dd id="Number">${history.state.invoiceNumber}</dd>
                            </dl>
                            <dl class="credentials-col__info"> 
                                <dt>${localization[current_lang].product.header.Date}:</dt>
                                <dd id="Date">${history.state.date}</dd>
                            </dl>
                        </div>
                    </div>
                
                    <!-- Table -->
                    <div class="product-container">
                    </div>
                </div>

                <!-- Buttons -->
                <div class="product-buttons"> 
                    <button class="product__btn  accept" id="acceptBtn">${localization[current_lang].product.header.AcceptButton}</button>
                    <button class="product__btn  deny" id="rejectBtn">${localization[current_lang].product.header.DenyButton}</button>
                </div>
                
                <div class="scroll-up active"> 
                </div>
                
                <!-- Rejection modal -->
                <div class="rejection"> 
                    <div class="rejection__inner"> 
                        <h4 class="rejection__title">${localization[current_lang].product.modal.title}:</h4>
                        <form class="rejection__form">
                            <textarea name="textarea" class="rejection__textarea" required></textarea>
                            <div class="rejection-buttons"> 
                                <button class="product__btn accept" type="submit" id="ok">${localization[current_lang].product.modal.AcceptButton}</button>
                                <button class="product__btn deny" type="button" id="cancel">${localization[current_lang].product.modal.DenyButton}</button>
                            </div>
                        </form>

                    </div>
                </div>
                
            </div>
        `;
        main.innerHTML = `${html}`;

        const invoiceComponent = component === 'received-invoice' || component === 'sent-invoice';
        const orderComponent = component === 'received-order' || component === 'sent-order';
        const menuBtn = document.querySelector('.hamburger-menu');
        const sidebar = document.querySelector('.sidebar-inner');
        /* Render table */
        try {
            renderProductTable(document.querySelector('.product-container'), history.state.dataLines, invoiceComponent, orderComponent);
        } catch(error) {
            console.log(error);
        }

        // console.log(history.state.status, history.state.number);

        /* Fix header table */
        document.querySelectorAll('.product-container').forEach(el => el.addEventListener('scroll', fixTableHeader));

        /* Render Invoice Rejection Modal */
        renderInvoiceRejectionModal(document.querySelector('#rejectBtn'), document.querySelector('.rejection'), document.querySelector('#cancel'));

        /* If invoice/order is accepted or rejected, it cannot be accepted or rejected again, so hide the buttons that do that */
        if (history.state.status == 200 || history.state.status == 300 || history.state.status == 100) {
            document.querySelector('.product-buttons').style.display = 'none';
        }

        /* Accept invoice/order button */
        document.querySelector('#acceptBtn').addEventListener('click', async function() {
            const statusAccepted = 200;
            if (invoiceComponent) {
                await setInvoiceState(history.state.number, statusAccepted);
            } else if (orderComponent) {
                await setOrderState(history.state.number, statusAccepted);
            }
            /* After accept get user back to component */
            history.pushState(null, null, window.location = `#/${component}`);
        })

        /* Ok button confirm reject */
        document.querySelector('.rejection__form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const statusReject = 300;
            if (invoiceComponent) {
                await setInvoiceState(history.state.number, statusReject, this.textarea.value);
            } else if (orderComponent) {
                await setOrderState(history.state.number, statusReject, this.textarea.value);
            }
            history.pushState(null, null, window.location = `#/${component}`);
        })


        /* Scroll to top button */
        scrollToTop(document.querySelector('.scroll-up'));

        /* Hamburger menu */
        hamburgerMenuHandler(menuBtn, sidebar);

    },
}