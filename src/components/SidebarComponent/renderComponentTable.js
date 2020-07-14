import {convertDate, convertDateMilliseconds, convertDateWithHour} from "../../js/util/dateConverter";
import {getSiblings} from "../../js/util/getSiblings";
import {getCurrentWeek} from "../../js/util/getCurrentWeek";
import {getCurrentMonth, getCurrentMonthMilliseconds} from "../../js/util/getCurrentMonth";
import {getReceivedInvoiceList} from "../../server/getReceivedInvoiceList";
import { getLastMonth } from "../../js/util/getLastMonth";
import {getSentInvoiceList} from "../../server/getSentInvoiceList";
import {getReceivedOrders} from "../../server/getReceivedOrders";
import {getSentOrders} from "../../server/getSentOrders";


export async function renderComponentTable(data, table, component) {


    if (component === 'received-invoice' || component === 'sent-invoice') {
        let html = '';
        data.InvoiceList.forEach(list => {

            let state = '';
            let color = '';
            if (list.InvoicState === 0) {
                state = 'Pending';
                color = "#297FB0";
            } else if (list.InvoicState === 100) {
                state = 'Rejected';
                color = '#AF5457';
            } else if (list.InvoicState === 2) {
                state = 'Accepted';
                color = '#43995C';
            }


            const listLines = JSON.stringify(list.Lines);
            html += `
            <tr class="table__row ${state}" data-href="/product" data-status="${list.InvoicState}" data-sendername="${list.SenderName}" data-invoicenumber="${list.Number}" data-date="${convertDate(list.Date)}" data-deliverydate="${convertDate(list.DeliveryDate)}" data-number="${list.InvoicID}" data-lines='${listLines.replace(/'/g, "~")}'>
                <td><span class="status" style="background: ${color};">${list.Number}</span></td>
                <td class="date">${convertDateWithHour(list.CreateDate).split(' ')[0]}<span class="hour"><img src="./src/img/clock.svg" alt="Clock">${convertDateWithHour(list.CreateDate).split(' ')[1]}</span></td>
                <td>${convertDate(list.Date)}</td>
                <td>${convertDate(list.DeliveryDate)}</td>
                <td>${list.SenderName}</td>
                <td>${state}</td>
            </tr>
        `;
        });
        table.innerHTML = html;

    } else if (component === 'received-order' || component === 'sent-order') {
        let html = '';
        data.OrderList.forEach(list => {

            let state = '';
            let color = '';
            if (list.OrderState === 0) {
                state = 'Pending';
                color = "#297FB0";
            } else if (list.OrderState === 100) {
                state = 'Rejected';
                color = '#AF5457';
            } else if (list.OrderState === 2) {
                state = 'Accepted';
                color = '#43995C';
            }


            const listLines = JSON.stringify(list.Lines);
            html += `
                <tr class="table__row ${state}" data-href="/product" data-status="${list.OrderState}" data-sendername="${list.SenderName}" data-invoicenumber="${list.Number}" data-number="${list.OrderState}" data-date="${convertDate(list.Date)}" data-deliverydate="${convertDate(list.DeliveryDate)}" data-lines='${listLines.replace(/'/g, "\~")}'>
                    <td><span class="status" style="background-color: ${color};">${list.Number}</span></td>
                    <td class="date">${convertDate(list.Date)}</td>
                    <td>${convertDate(list.DeliveryDate)}</td>
                    <td>${state}</td>
                </tr>
            `;
        })
        table.innerHTML = html;


    }
    document.querySelectorAll('.table__container table tbody tr').forEach(row => row.addEventListener('click', function() {
        const dataLines = JSON.parse(this.dataset.lines.replace(/~/g, "\'"));
        const status = this.dataset.status;
        const number = this.dataset.number;
        const senderName = this.dataset.sendername;
        const invoiceNumber = this.dataset.invoicenumber;
        const date = this.dataset.date;
        const deliveryDate = this.dataset.date;
        history.pushState({dataLines, status, number, senderName, invoiceNumber, date, deliveryDate}, document.title, window.location += this.dataset.href);
    }))


    function filteredRender(filteredData, table, component) {
        if (component === 'received-invoice' || component === 'sent-invoice') {
            let html = '';
            filteredData.forEach(list => {

                let state = '';
                let color = '';
                if (list.InvoicState === 0) {
                    state = 'Pending';
                    color = "#297FB0";
                } else if (list.InvoicState === 100) {
                    state = 'Rejected';
                    color = '#AF5457';
                } else if (list.InvoicState === 2) {
                    state = 'Accepted';
                    color = '#43995C';
                }


                const listLines = JSON.stringify(list.Lines);
                html += `
                    <tr class="table__row ${state}" data-href="/product" data-status="${list.InvoicState}" data-sendername="${list.SenderName}" data-invoicenumber="${list.Number}" data-date="${convertDate(list.Date)}" data-deliverydate="${convertDate(list.DeliveryDate)}" data-number="${list.InvoicID}" data-lines='${listLines.replace(/'/g, "~")}'>
                        <td><span class="status" style="background: ${color};">${list.Number}</span></td>
                        <td class="date">${convertDateWithHour(list.CreateDate).split(' ')[0]}<span class="hour"><img src="./src/img/clock.svg" alt="Clock">${convertDateWithHour(list.CreateDate).split(' ')[1]}</span></td>
                        <td>${convertDate(list.Date)}</td>
                        <td>${convertDate(list.DeliveryDate)}</td>
                        <td>${list.SenderName}</td>
                        <td>${state}</td>
                    </tr>
        `;
            });
            table.innerHTML = html;

        }
        else if (component === 'received-order' || component === 'sent-order') {
            let html = '';
            filteredData.forEach(list => {

                let state = '';
                let color = '';
                if (list.OrderState === 0) {
                    state = 'Pending';
                    color = "#297FB0";
                } else if (list.OrderState === 100) {
                    state = 'Rejected';
                    color = '#AF5457';
                } else if (list.OrderState === 2) {
                    state = 'Accepted';
                    color = '#43995C';
                }


                const listLines = JSON.stringify(list.Lines);
                html += `
                    <tr class="table__row ${state}" data-href="/product" data-status="${list.OrderState}" data-sendername="${list.SenderName}" data-invoicenumber="${list.Number}" data-number="${list.OrderState}" data-date="${convertDate(list.Date)}" data-deliverydate="${convertDate(list.DeliveryDate)}" data-lines='${listLines.replace(/'/g, "\~")}'>
                        <td><span class="status" style="background-color: ${color};">${list.Number}</span></td>
                        <td class="date">${convertDate(list.Date)}</td>
                        <td>${convertDate(list.DeliveryDate)}</td>
                        <td>${state}</td>
                    </tr>
                `;
            })
            table.innerHTML = html;
        }
        document.querySelectorAll('.table__container table tbody tr').forEach(row => row.addEventListener('click', function() {
            const dataLines = JSON.parse(this.dataset.lines.replace(/~/g, "\'"));
            const status = this.dataset.status;
            const number = this.dataset.number;
            const senderName = this.dataset.sendername;
            const invoiceNumber = this.dataset.invoicenumber;
            const date = this.dataset.date;
            const deliveryDate = this.dataset.date;
            history.pushState({dataLines, status, number, senderName, invoiceNumber, date, deliveryDate}, document.title, window.location += this.dataset.href);
        }))
    }




    let d1;
    let d2;
    let d3;
    let d4;
    let c1;
    let c2;
    let c3;
    let c4;








    let selectedDate = 2;
    let state = 50;

    let current = new Date();
    let tomorrow = new Date(current);
    tomorrow.setDate(tomorrow.getDate()); /* FIXME - fix this later when new invoices/orders will be added */

    let tomorrowMS = current.getTime();
    let currentMS = tomorrow.getTime();

    const currentWeek = getCurrentWeek();

    let currentMonth = getCurrentMonthMilliseconds();

    // currentMonth = getLastMonth();

    const btns = document.getElementsByClassName("filter-item__status-list-btn");
    const btnsDate = document.querySelectorAll('.filter-item__time-link');

    const custom = document.querySelector("#custom");
    const dateContainer = document.querySelector('.filter-item__time');

    const totalBtn = document.querySelector('#Total');
    const pendingBtn = document.querySelector('#Pending');
    const rejectedBtn = document.querySelector('#Rejected');
    const acceptedBtn = document.querySelector('#Accepted');

    if (JSON.parse(localStorage.getItem('ButtonState') === null)) localStorage.setItem('ButtonState', 50);
    /* Buttons status ======================================================================== */

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', async function() {
            const startDate = document.querySelector('#start').value;
            const endDate = document.querySelector('#end').value;

            if (component === 'received-invoice') {
                data = await getReceivedInvoiceList(startDate, endDate);
            } else if (component === 'sent-invoice') {
                data = await getSentInvoiceList(startDate, endDate);

            } else if (component === 'received-order') {
                data = await getReceivedOrders(startDate, endDate)

            } else if (component === 'sent-order') {
                data = await getSentOrders(startDate, endDate)

            }
            let siblings = getSiblings(this);
            this.classList.add('active');
            siblings.forEach(s => s.classList.remove('active'));

            localStorage.setItem('startDate', JSON.stringify(startDate));
            localStorage.setItem('endDate', JSON.stringify(endDate));


            if (this.id === 'Pending') {
                state = 0;
            } else if (this.id === 'Rejected') {
                state = 100;
            } else if (this.id === 'Accepted') {
                state = 2;
            } else if (this.id === 'Total') {
                state = 50;
            }

            for (let i = 0; i < btnsDate.length; i++) {
                if (btnsDate[i].classList.contains('active')) {
                    if (btnsDate[i].id === 'day') {
                        selectedDate = 0;
                    } else if (btnsDate[i].id === 'week') {
                        selectedDate = 1;
                    } else if (btnsDate[i].id === 'month') {
                        selectedDate = 2;
                    } else if (btnsDate[i].id ==='custom' || btnsDate[i].id === 'customToggler') {
                        selectedDate = 3;
                    }
                }
            }

            localStorage.setItem('ButtonState', JSON.stringify(state));

            if (component === 'received-invoice' || component === 'sent-invoice') {

                if (selectedDate === 0 && state != 50) {
                    d1 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) <= tomorrowMS && convertDateMilliseconds(date.Date) >= currentMS && date.InvoicState === state);
                    filteredRender(d1, table, component);
                    console.log('day: ', d1);
                } else if (selectedDate === 1 && state != 50) {
                    d2 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.InvoicState === state);
                    filteredRender(d2, table, component);
                    console.log('week: ', d2);
                }
                else if (selectedDate === 2 && state != 50 ) {
                    d3 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.InvoicState === state);
                    filteredRender(d3, table, component);
                    console.log('month: ', d3);
                } else if (selectedDate === 3 && state != 50) {
                    d4 = data.InvoiceList.filter(date => date.InvoicState === state);
                    filteredRender(d4, table, component);
                    console.log('custom: ', d4);
                } else if (state == 50) {
                    if (selectedDate === 0 ) {
                        d1 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) <= tomorrowMS && convertDateMilliseconds(date.Date) >= currentMS );
                        filteredRender(d1, table, component);
                        console.log('day: ', d1);
                    } else if (selectedDate === 1) {
                        d2 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]);
                        console.log('week: ', d2);
                    }
                    else if (selectedDate === 2) {
                        d3 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]);
                        filteredRender(d3, table, component);
                        console.log('month: ', d3);
                    } else if (selectedDate === 3) {
                        filteredRender(data.InvoiceList, table, component);
                    }
                }
            }

            else if (component === 'received-order' || component === 'sent-order') {
                if (selectedDate === 0 && state != 50) { // day
                    d1 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) <= tomorrowMS && convertDateMilliseconds(date.Date) >= currentMS && date.OrderState === state);
                    filteredRender(d1, table, component);
                    console.log('day: ', d1);
                } else if (selectedDate === 1 && state != 50) { // week
                    d2 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.OrderState === state);
                    filteredRender(d2, table, component);
                    console.log('week: ', d2);
                }
                else if (selectedDate === 2 && state != 50 ) { // month
                    d3 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.OrderState === state);
                    filteredRender(d3, table, component);
                    console.log('month: ', d3);
                } else if (selectedDate === 3 && state != 50) { // custom
                    d4 = data.OrderList.filter(date => date.OrderState === state);
                    filteredRender(d4, table, component);
                    console.log('custom: ', d4);
                } else if (state == 50) { // if button "All" is pressed do the following
                    if (selectedDate === 0 ) { // check if day is pressed
                        d1 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) <= tomorrowMS && convertDateMilliseconds(date.Date) >= currentMS );
                        filteredRender(d1, table, component);
                        console.log('day: ', d1);
                    } else if (selectedDate === 1) {
                        d2 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]);
                        console.log('week: ', d2);
                    }
                    else if (selectedDate === 2) {
                        d3 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]);
                        filteredRender(d3, table, component);
                        console.log('month: ', d3);
                    } else if (selectedDate === 3) {
                        filteredRender(data.OrderList, table, component);
                    }
                }
            }

        })
    }

    /* Buttons date ============================================================================ */

    for (let i = 0; i < btnsDate.length; i++) {
        btnsDate[i].addEventListener('click', async function() {
            const startDate = document.querySelector('#start').value;
            const endDate = document.querySelector('#end').value;

            if (component === 'received-invoice') {
                data = await getReceivedInvoiceList(startDate, endDate);
            } else if (component === 'sent-invoice') {
                data = await getSentInvoiceList(startDate, endDate);
            } else if (component === 'received-order') {
                data = await getReceivedOrders(startDate, endDate)
            } else if (component === 'sent-order') {
                data = await getSentOrders(startDate, endDate)
            }
            let siblings = getSiblings(this);
            this.classList.add('active');
            siblings.forEach(s => s.classList.remove('active'));


            localStorage.setItem('startDate', JSON.stringify(startDate));
            localStorage.setItem('endDate', JSON.stringify(endDate));



            if (custom.classList.contains('active')) {
                dateContainer.classList.add('active');
            } else {
                dateContainer.classList.remove('active');
            }

            for (let i = 0; i < btnsDate.length; i++) {
                if (btnsDate[i].classList.contains('active')) {
                    if (btnsDate[i].id === 'day') {
                        selectedDate = 0;
                    } else if (btnsDate[i].id === 'week') {
                        selectedDate = 1;
                    } else if (btnsDate[i].id === 'month') {
                        selectedDate = 2;
                    } else if (btnsDate[i].id === 'customToggler') {
                        selectedDate = 3;
                    }
                }
            }
            localStorage.setItem('dateButtonState', JSON.stringify(selectedDate));

            if (component === 'received-invoice' || component === 'sent-invoice') {

                /* DAY */

                if (this.id === 'day') {
                    for (let i = 0; i < btns.length; i++) {
                        if (btns[i].classList.contains('active')) {
                            if (btns[i].id === 'Rejected') {
                                state = 100;
                            } else if (btns[i].id === 'Pending') {
                                state = 0;
                            } else if (btns[i].id === 'Accepted') {
                                state = 2;
                            } else if (btns[i].id === "Total") {
                                state = 50
                            }
                        }
                    }

                    if (state == 0 & state != 50) {
                        d1 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS  && date.InvoicState == state);
                        filteredRender(d1, table, component);
                        console.log('Pending: ', d1);
                    } else if (state == 100 && state != 50) {
                        d3 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS  && date.InvoicState == state);
                        filteredRender(d3, table, component);
                        console.log('Rejected: ', d3);
                    } else if (state == 2 && state != 50) {
                        d4 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS  && date.InvoicState == state);
                        filteredRender(d4, table, component);
                        console.log('Accepted: ', d4);
                    } else if (state == 50) {
                        d2 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS);
                        filteredRender(d2, table, component);
                        console.log('Total: ', d2);
                    }
                }

                /* WEEK */
                else if ( this.id === 'week') {
                    for (let i = 0; i < btns.length; i++) {
                        if (btns[i].classList.contains('active')) {
                            if (btns[i].id === 'Rejected') {
                                state = 100;
                            } else if (btns[i].id === 'Pending') {
                                state = 0;
                            } else if (btns[i].id === 'Accepted') {
                                state = 2;
                            } else if (btns[i].id === "Total") {
                                state = 50 ;
                            }
                        }
                    }

                    if (state == 0 && state != 50) {
                        d1 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.InvoicState == state);
                        filteredRender(d1, table, component);
                        console.log('Pending: ', d1);
                    } else if (state == 100 && state != 50) {
                        d3 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.InvoicState == state);
                        filteredRender(d3, table, component);
                        console.log('Rejected: ', d3);
                    } else if (state == 2 && state != 50) {
                        d4 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.InvoicState == state);
                        filteredRender(d4, table, component);
                        console.log('Accepted: ', d4);
                    } else if(state == 50) {
                        d2 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]);
                        filteredRender(d2, table, component);
                        console.log('Total: ', d2);
                    }
                }

                /* MONTH */
                else if ( this.id === 'month') {
                    for (let i = 0; i < btns.length; i++) {
                        if (btns[i].classList.contains('active')) {
                            if (btns[i].id === 'Rejected') {
                                state = 100;
                            } else if (btns[i].id === 'Pending') {
                                state = 0;
                            } else if (btns[i].id === 'Accepted') {
                                state = 2;
                            } else if (btns[i].id === "Total") {
                                state = 50;
                            }
                        }
                    }

                    if (state === 0 && state != 50) {
                        d1 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.InvoicState == state);
                        filteredRender(d1, table, component);
                        console.log('Pending: ', d1);
                    } else if (state === 100 && state != 50) {
                        d3 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.InvoicState == state);
                        filteredRender(d3, table, component);
                        console.log('Rejected: ', d3);
                    } else if (state === 2 && state != 50) {
                        d4 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.InvoicState == state);
                        filteredRender(d4, table, component);
                        console.log('Accepted: ', d4);
                    } else if(state === 50) {
                        d2 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]);
                        filteredRender(d2, table, component);
                        console.log('Total: ', d2);
                    }
                }

                /* CUSTOM*/
                else if (this.id === 'customToggler') {
                    for (let i = 0; i < btns.length; i++) {
                        if (btns[i].classList.contains('active')) {
                            if (btns[i].id === 'Rejected') {
                                state = 100;
                            } else if (btns[i].id === 'Pending') {
                                state = 0;
                            } else if (btns[i].id === 'Accepted') {
                                state = 2;
                            } else if (btns[i].id === "Total") {
                                state = 50;
                            }
                        }
                    }

                    if (state === 0 && state != 50) {
                        d1 = data.InvoiceList.filter(date => date.InvoicState == state);
                        filteredRender(d1, table, component)

                    } else if (state === 100 && state != 50) {
                        d2 = data.InvoiceList.filter(date => date.InvoicState == state);
                        filteredRender(d2, table, component);

                    } else if (state === 2 && state != 50) {
                        d3 = data.InvoiceList.filter(date => date.InvoicState == state);
                        filteredRender(d3, table, component);

                    } else if(state === 50) {
                        filteredRender(data.InvoiceList, table, component);
                    }
                }



            } else if (component === 'received-order' || component === 'sent-order') {
                /* DAY */

                if (this.id === 'day') {
                    for (let i = 0; i < btns.length; i++) {
                        if (btns[i].classList.contains('active')) {
                            if (btns[i].id === 'Rejected') {
                                state = 100;
                            } else if (btns[i].id === 'Pending') {
                                state = 0;
                            } else if (btns[i].id === 'Accepted') {
                                state = 2;
                            } else if (btns[i].id === "Total") {
                                state = 50
                            }
                        }
                    }

                    if (state == 0 & state != 50) {
                        c1 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS  && date.OrderState == state);
                        filteredRender(c1, table, component);
                        console.log('Pending: ', c1);
                    } else if (state == 100 && state != 50) {
                        c3 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS  && date.OrderState == state);
                        filteredRender(c3, table, component);
                        console.log('Rejected: ', c3);
                    } else if (state == 2 && state != 50) {
                        c4 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS  && date.OrderState == state);
                        filteredRender(c4, table, component);
                        console.log('Accepted: ', c4);
                    } else if (state == 50) {
                        c2 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS);
                        filteredRender(c2, table, component);
                        console.log('Total: ', c2);
                    }
                }

                /* WEEK */
                else if ( this.id === 'week') {
                    for (let i = 0; i < btns.length; i++) {
                        if (btns[i].classList.contains('active')) {
                            if (btns[i].id === 'Rejected') {
                                state = 100;
                            } else if (btns[i].id === 'Pending') {
                                state = 0;
                            } else if (btns[i].id === 'Accepted') {
                                state = 2;
                            } else if (btns[i].id === "Total") {
                                state = 50 ;
                            }
                        }
                    }

                    if (state == 0 && state != 50) {
                        c1 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.OrderState == state);
                        filteredRender(c1, table, component);
                        console.log('Pending: ', c1);
                    } else if (state == 100 && state != 50) {
                        c3 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.OrderState == state);
                        filteredRender(c3, table, component);
                        console.log('Rejected: ', c3);
                    } else if (state == 2 && state != 50) {
                        c4 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.OrderState == state);
                        filteredRender(c4, table, component);
                        console.log('Accepted: ', c4);
                    } else if(state == 50) {
                        c2 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]);
                        filteredRender(c2, table, component);
                        console.log('Total: ', c2);
                    }
                }

                /* MONTH */
                else if ( this.id === 'month') {
                    for (let i = 0; i < btns.length; i++) {
                        if (btns[i].classList.contains('active')) {
                            if (btns[i].id === 'Rejected') {
                                state = 100;
                            } else if (btns[i].id === 'Pending') {
                                state = 0;
                            } else if (btns[i].id === 'Accepted') {
                                state = 2;
                            } else if (btns[i].id === "Total") {
                                state = 50;
                            }
                        }
                    }

                    if (state === 0) {
                        console.log(data);
                        c1 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.OrderState == state);
                        filteredRender(c1, table, component);
                        console.log('Pending: ', c1);
                    } else if (state === 100) {
                        c3 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.OrderState == state);
                        filteredRender(c3, table, component);
                        console.log('Rejected: ', c3);
                    } else if (state === 2) {
                        c4 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.OrderState == state);
                        filteredRender(c4, table, component);
                        console.log('Accepted: ', c4);
                    } else if(state === 50) {
                        c2 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]);
                        filteredRender(c2, table, component);
                        console.log('Total: ', c2);
                    }
                }

                /* CUSTOM*/
                else if (this.id === 'customToggler') {
                    for (let i = 0; i < btns.length; i++) {
                        if (btns[i].classList.contains('active')) {
                            if (btns[i].id === 'Rejected') {
                                state = 100;
                            } else if (btns[i].id === 'Pending') {
                                state = 0;
                            } else if (btns[i].id === 'Accepted') {
                                state = 2;
                            } else if (btns[i].id === "Total") {
                                state = 50;
                            }
                        }
                    }

                    if (state === 0 && state != 50) {
                        c1 = data.OrderList.filter(date => date.OrderState == state);
                        filteredRender(c1, table, component)
                        console.log('Pending: ', c1);

                    } else if (state === 100 && state != 50) {
                        c2 = data.OrderList.filter(date => date.OrderState == state);
                        filteredRender(c2, table, component);
                        console.log('Rejected: ', c2);

                    } else if (state === 2 && state != 50) {
                        c3 = data.OrderList.filter(date => date.OrderState == state);
                        filteredRender(c3, table, component);
                        console.log('Accepted: ', c2);

                    } else if(state === 50) {
                        c4 = data.OrderList;
                        filteredRender(c4, table, component);
                        console.log('Total: ', c4);
                    }
                }
            }

        })
    }



    /* Buttons state management ( localStorage functionality )  */

    const buttonState = JSON.parse(localStorage.getItem('ButtonState'));

    if (buttonState == 0 && buttonState != 50) {
        const btnID = document.querySelector('#Pending');
        btnID.classList.add('active');
        let siblings = getSiblings(btnID);
        siblings.forEach(s => s.classList.remove('active'));
    } else if (buttonState == 100 && buttonState != 50) {
        const btnID = document.querySelector('#Rejected');
        btnID.classList.add('active');
        let siblings = getSiblings(btnID);
        siblings.forEach(s => s.classList.remove('active'));
    } else if (buttonState == 2 && buttonState != 50) {
        const btnID = document.querySelector('#Accepted');
        btnID.classList.add('active');
        let siblings = getSiblings(btnID);
        siblings.forEach(s => s.classList.remove('active'));
    } else if (buttonState == 50) {
        const btnID = document.querySelector('#Total');
        btnID.classList.add('active');
        let siblings = getSiblings(btnID);
        siblings.forEach(s => s.classList.remove('active'));
    }

    /* Handle local storage state */

    

    if (component === 'received-invoice' || component === 'sent-invoice') {

        /* DAY*/
        if(JSON.parse(localStorage.getItem('dateButtonState')) == 0) { // This is for today
            const dateID = document.querySelector('#day');
            dateID.classList.add('active');
            let siblings = getSiblings(dateID);
            siblings.forEach(s => s.classList.remove('active'));




            if (buttonState == 0 && buttonState != 50) {
                d1 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS  && date.InvoicState == buttonState);
                filteredRender(d1, table, component);
                console.log('Pending: ', d1);



            } else if (buttonState == 100 && buttonState != 50) {
                d3 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS  && date.InvoicState == buttonState);
                filteredRender(d3, table, component);
                console.log('Rejected: ', d3);



            } else if (buttonState == 2 && buttonState != 50) {
                d4 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS  && date.InvoicState == buttonState);
                filteredRender(d4, table, component);
                console.log('Accepted: ', d4);



            } else if (buttonState == 50) {
                d2 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS);
                filteredRender(d2, table, component);
                console.log('Total: ', d2);


            }
        }

        /* week*/
        if(JSON.parse(localStorage.getItem('dateButtonState')) == 1) { // This is for week
            const dateID = document.querySelector('#week');
            dateID.classList.add('active');
            let siblings = getSiblings(dateID);
            siblings.forEach(s => s.classList.remove('active'));




            if (buttonState == 0 && buttonState != 50) {
                d1 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.InvoicState == buttonState);
                filteredRender(d1, table, component);
                console.log('Pending: ', d1);



            } else if (buttonState == 100 && buttonState != 50) {
                d2 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.InvoicState == buttonState);
                filteredRender(d2, table, component);
                console.log('Rejected: ', d1);



            } else if (buttonState == 2 && buttonState != 50) {
                d3 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.InvoicState == buttonState);
                filteredRender(d3, table, component);
                console.log('Accepted: ', d1);



            } else if (buttonState == 50) {
                d4 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]);
                filteredRender(d4, table, component);
                console.log('Total: ', d1);


            }
        }

        /* Month */
        if(JSON.parse(localStorage.getItem('dateButtonState')) == 2) { // This is for month
            const dateID = document.querySelector('#month');
            dateID.classList.add('active');
            let siblings = getSiblings(dateID);
            siblings.forEach(s => s.classList.remove('active'));




            if (buttonState == 0 && buttonState != 50) {
                d1 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.InvoicState == buttonState);
                filteredRender(d1, table, component);
                console.log('Pending: ', d1);



            } else if (buttonState == 100 && buttonState != 50) {
                d2 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.InvoicState == buttonState);
                filteredRender(d2, table, component);
                console.log('Rejected: ', d2);



            } else if (buttonState == 2 && buttonState != 50) {
                d3 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.InvoicState == buttonState);
                filteredRender(d1, table, component);
                console.log('Accepted: ', d3);



            } else if (buttonState == 50) {
                d4 = data.InvoiceList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]);
                filteredRender(d4, table, component);
                console.log('Total: ', d4);


            }
        }



        /* CUSTOM */
        if(JSON.parse(localStorage.getItem('dateButtonState')) == 3) { // This is for all time
            const dateID = document.querySelector('#custom');
            dateID.classList.add('active');
            let siblings = getSiblings(dateID);
            siblings.forEach(s => s.classList.remove('active'));

            const startDate = JSON.parse(localStorage.getItem('startDate'));
            const endDate = JSON.parse(localStorage.getItem('endDate'));
            if (component === 'received-invoice') {
                data = await getReceivedInvoiceList(startDate, endDate)
            } else if (component === 'sent-invoice') {
                data = await getSentInvoiceList(startDate, endDate);
            }
            dateContainer.classList.add('active');


            document.querySelector('#start').value = startDate;
            document.querySelector('#end').value = endDate;


            console.log(component);

            if (buttonState === 0 && buttonState != 50) {
                d1 = data.InvoiceList.filter(date => date.InvoicState == buttonState);
                filteredRender(d1, table, component);


            } else if (buttonState === 100 && buttonState != 50) {
                d2 = data.InvoiceList.filter(date => date.InvoicState == buttonState);
                filteredRender(d2, table, component);


            } else if (buttonState === 2 && buttonState != 50) {
                d3 = data.InvoiceList.filter(date => date.InvoicState == buttonState);
                filteredRender(d3, table, component);


            } else if(buttonState === 50) {
                filteredRender(data.InvoiceList, table, component);

            }
        }
    } else if (component === 'received-order' || component === 'sent-order') {
        /* DAY*/
        if(JSON.parse(localStorage.getItem('dateButtonState')) == 0) { // This is for today
            const dateID = document.querySelector('#day');
            dateID.classList.add('active');
            let siblings = getSiblings(dateID);
            siblings.forEach(s => s.classList.remove('active'));



            if (buttonState == 0 && buttonState != 50) {
                c1 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS  && date.OrderState == buttonState);
                filteredRender(c1, table, component);
                console.log('Pending: ', c1);



            } else if (buttonState == 100 && buttonState != 50) {
                c3 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS  && date.OrderState == buttonState);
                filteredRender(c3, table, component);
                console.log('Rejected: ', c3);



            } else if (buttonState == 2 && buttonState != 50) {
                c4 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS  && date.OrderState == buttonState);
                filteredRender(c4, table, component);
                console.log('Accepted: ', c4);



            } else if (buttonState == 50) {
                c2 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMS && convertDateMilliseconds(date.Date) <= tomorrowMS);
                filteredRender(c2, table, component);
                console.log('Total: ', c2);


            }
        }

        /* week*/
        if(JSON.parse(localStorage.getItem('dateButtonState')) == 1) { // This is for week
            const dateID = document.querySelector('#week');
            dateID.classList.add('active');
            let siblings = getSiblings(dateID);
            siblings.forEach(s => s.classList.remove('active'));




            if (buttonState == 0 && buttonState != 50) {
                c1 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.OrderState == buttonState);
                filteredRender(c1, table, component);
                console.log('Pending: ', c1);



            } else if (buttonState == 100 && buttonState != 50) {
                c2 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.OrderState == buttonState);
                filteredRender(c2, table, component);
                console.log('Rejected: ', c2);



            } else if (buttonState == 2 && buttonState != 50) {
                c3 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]  && date.OrderState == buttonState);
                filteredRender(c3, table, component);
                console.log('Accepted: ', c3);



            } else if (buttonState == 50) {
                c4 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentWeek[0] && convertDateMilliseconds(date.Date) <= currentWeek[1]);
                filteredRender(c4, table, component);
                console.log('Total: ', c4);


            }
        }

        /* Month */
        if(JSON.parse(localStorage.getItem('dateButtonState')) == 2) { // This is for week
            const dateID = document.querySelector('#month');
            dateID.classList.add('active');
            let siblings = getSiblings(dateID);
            siblings.forEach(s => s.classList.remove('active'));




            if (buttonState == 0 && buttonState != 50) {
                c1 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.OrderState == buttonState);
                filteredRender(c1, table, component);
                console.log('Pending: ', c1);



            } else if (buttonState == 100 && buttonState != 50) {
                c2 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.OrderState == buttonState);
                filteredRender(c2, table, component);
                console.log('Rejected: ', c2);



            } else if (buttonState == 2 && buttonState != 50) {
                c3 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]  && date.OrderState == buttonState);
                filteredRender(c3, table, component);
                console.log('Accepted: ', c3);



            } else if (buttonState == 50) {
                c4 = data.OrderList.filter(date => convertDateMilliseconds(date.Date) >= currentMonth[0] && convertDateMilliseconds(date.Date) <= currentMonth[1]);
                filteredRender(c4, table, component);
                console.log('Total: ', c4);


            }
        }


        /* CUSTOM */
        if(JSON.parse(localStorage.getItem('dateButtonState')) == 3) { // This is for all time
            const dateID = document.querySelector('#custom')
            dateID.classList.add('active');
            let siblings = getSiblings(dateID);
            siblings.forEach(s => s.classList.remove('active'));

            const startDate = JSON.parse(localStorage.getItem('startDate'));
            const endDate = JSON.parse(localStorage.getItem('endDate'));
            if (component === 'received-order') {
                data = await getReceivedOrders(startDate, endDate)
            } else if (component === 'sent-order') {
                data = await getSentOrders(startDate, endDate);
            }
            dateContainer.classList.add('active');


            document.querySelector('#start').value = startDate;
            document.querySelector('#end').value = endDate;



            if (buttonState === 0 && buttonState != 50) {
                c1 = data.OrderList.filter(date => date.OrderState == buttonState);
                filteredRender(c1, table, component);


            } else if (buttonState === 100 && buttonState != 50) {
                c2 = data.OrderList.filter(date => date.OrderState == buttonState);
                filteredRender(c2, table, component);


            } else if (buttonState === 2 && buttonState != 50) {
                c3 = data.OrderList.filter(date => date.OrderState == buttonState);
                filteredRender(c3, table, component);


            } else if(buttonState === 50) {
                filteredRender(data.OrderList, table, component);
            }
        }
    }





}