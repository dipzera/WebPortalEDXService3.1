import {convertDate, convertDateWithHour} from "../../js/util/dateConverter";
import {getSiblings} from "../../js/util/getSiblings";

export function renderComponentTable(data, table, component) {




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
            <tr class="table__row ${state}" data-href="/product" data-status="${list.InvoicState}" data-number="${list.Number}" data-lines='${listLines.replace(/'/g, "~")}'>
                <td><span class="status" style="background: ${color};">${list.Number}</span></td>
                <td>${convertDateWithHour(list.CreateDate).split(' ')[0]}<span class="hour"><img src="./src/img/clock.svg" alt="Clock">${convertDateWithHour(list.CreateDate).split(' ')[1]}</span></td>
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
            <tr class="table__row ${state}" data-href="/product" data-status="${list.InvoicState}" data-number="${list.Number}" data-lines='${listLines.replace(/'/g, "\~")}'>
                <td><span class="status" style="background-color: ${color};">${list.Number}</span></td>
                <td>${convertDate(list.Date)}</td>
                <td>${convertDate(list.DeliveryDate)}</td>
                <td>${state}</td>
            </tr>
        `;
            table.innerHTML = html;
        })
    }

    filterSelection("Total");
    function filterSelection(c) {
        var x, i;
        x = document.getElementsByClassName("table__row");
        if (c == "Total") c = "";
        // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
        for (i = 0; i < x.length; i++) {
            w3RemoveClass(x[i], "show");
            if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
        }
    }

    // Show filtered elements
    function w3AddClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {
                element.className += " " + arr2[i];
            }
        }
    }

    // Hide elements that are not selected
    function w3RemoveClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            while (arr1.indexOf(arr2[i]) > -1) {
                arr1.splice(arr1.indexOf(arr2[i]), 1);
            }
        }
        element.className = arr1.join(" ");
    }

    const btns = document.getElementsByClassName("filter-item__status-list-btn");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            const current = document.getElementsByClassName("active");
            let siblings = getSiblings(this);


            this.className += " active";
            siblings.forEach(sibling => sibling.classList.remove('active'));
            if (this.id === 'pending') {
                filterSelection('Pending');
            } else if (this.id === 'rejected') {
                filterSelection('Rejected')
            } else if (this.id === 'accepted') {
                filterSelection('Accepted');
            } else if (this.id === 'total') {
                filterSelection('Total');
            }
        });

    }



    /* Filter invoice/order by day/week/month */
    console.log(data);
    function filterTableByDay(day) {

    }

    function filterTableByWeek(week) {

    }

    function filterTableByMonth(month) {

    }



}


