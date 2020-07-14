import Chart from 'chart.js';
import { getReceivedInvoiceList } from "../../../../server/getReceivedInvoiceList";
import { getSentInvoiceList } from "../../../../server/getSentInvoiceList";
import { getSentOrders } from "../../../../server/getSentOrders";
import { getReceivedOrders } from "../../../../server/getReceivedOrders";
import { convertDateMilliseconds } from "../../../../js/util/dateConverter";
import { localization } from "../../../../js/util/localization";

let current_lang = JSON.parse(localStorage.getItem('Language'));

export async function barChartRenderInvoice(ctx) {



    let curr = new Date();
    let week = [];

    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i;
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
        week.push(day)
    }
    const milliseconds1 = new Date(week[0]).getTime();
    const milliseconds2 = new Date(week[1]).getTime();
    const milliseconds3 = new Date(week[2]).getTime();
    const milliseconds4 = new Date(week[3]).getTime();
    const milliseconds5 = new Date(week[4]).getTime();
    const milliseconds6 = new Date(week[5]).getTime();
    const milliseconds7 = new Date(week[6]).getTime();





    const receivedInvoiceData = await getReceivedInvoiceList(week[0], week[6]); //filteredReceivedInvoiceData goes here
    const sentInvoiceData = await getSentInvoiceList(week[0], week[6]); //filteredReceivedInvoiceData goes here

    receivedInvoiceData.InvoiceList.map(el => console.log(convertDateMilliseconds(el.Date)));
    receivedInvoiceData.InvoiceList.map(el => console.log(convertDateMilliseconds(el.Date)));

    const d1 = receivedInvoiceData.InvoiceList.filter(date => convertDateMilliseconds(date.Date) < milliseconds2 && convertDateMilliseconds(date.Date) > milliseconds1);
    const d2 = receivedInvoiceData.InvoiceList.filter(date => convertDateMilliseconds(date.Date) < milliseconds3 && convertDateMilliseconds(date.Date) > milliseconds2);
    const d3 = receivedInvoiceData.InvoiceList.filter(date => convertDateMilliseconds(date.Date) < milliseconds4 && convertDateMilliseconds(date.Date) > milliseconds3);
    const d4 = receivedInvoiceData.InvoiceList.filter(date => convertDateMilliseconds(date.Date) < milliseconds5 && convertDateMilliseconds(date.Date) > milliseconds4);
    const d5 = receivedInvoiceData.InvoiceList.filter(date => convertDateMilliseconds(date.Date) < milliseconds6 && convertDateMilliseconds(date.Date) > milliseconds5);
    const d6 = receivedInvoiceData.InvoiceList.filter(date => convertDateMilliseconds(date.Date) < milliseconds7 && convertDateMilliseconds(date.Date) > milliseconds6);

    const f1 = sentInvoiceData.InvoiceList.filter(date => convertDateMilliseconds(date.Date) < milliseconds2 && convertDateMilliseconds(date.Date) > milliseconds1);
    const f2 = sentInvoiceData.InvoiceList.filter(date => convertDateMilliseconds(date.Date) < milliseconds3 && convertDateMilliseconds(date.Date) > milliseconds2);
    const f3 = sentInvoiceData.InvoiceList.filter(date => convertDateMilliseconds(date.Date) < milliseconds4 && convertDateMilliseconds(date.Date) > milliseconds3);
    const f4 = sentInvoiceData.InvoiceList.filter(date => convertDateMilliseconds(date.Date) < milliseconds5 && convertDateMilliseconds(date.Date) > milliseconds4);
    const f5 = sentInvoiceData.InvoiceList.filter(date => convertDateMilliseconds(date.Date) < milliseconds6 && convertDateMilliseconds(date.Date) > milliseconds5);
    const f6 = sentInvoiceData.InvoiceList.filter(date => convertDateMilliseconds(date.Date) < milliseconds7 && convertDateMilliseconds(date.Date) > milliseconds6);



    /* Received Invoice */
    let pendingReceivedInvoiceSize1;
    let unloadedReceivedInvoiceSize1;
    let acceptedReceivedInvoiceSize1;
    let pendingReceivedInvoiceSize2;
    let unloadedReceivedInvoiceSize2;
    let acceptedReceivedInvoiceSize2;
    let pendingReceivedInvoiceSize3;
    let unloadedReceivedInvoiceSize3;
    let acceptedReceivedInvoiceSize3;
    let pendingReceivedInvoiceSize4;
    let unloadedReceivedInvoiceSize4;
    let acceptedReceivedInvoiceSize4;
    let pendingReceivedInvoiceSize5;
    let unloadedReceivedInvoiceSize5;
    let acceptedReceivedInvoiceSize5;
    let pendingReceivedInvoiceSize6;
    let unloadedReceivedInvoiceSize6;
    let acceptedReceivedInvoiceSize6;
    if ( d1.length > 0 ) {
        pendingReceivedInvoiceSize1 = d1.filter(el => el.InvoicState === 0).length;
        unloadedReceivedInvoiceSize1 = d1.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
        acceptedReceivedInvoiceSize1 = d1.filter(el => el.InvoicState === 2).length;
    } else {
    }

    if ( d2.length > 0) {
        /* Received Invoice */
        pendingReceivedInvoiceSize2 = d2.filter(el => el.InvoicState === 0).length;
        unloadedReceivedInvoiceSize2 = d2.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
        acceptedReceivedInvoiceSize2 = d2.filter(el => el.InvoicState === 2).length;
    } else {
    }

    if ( d3.length > 0) {
        pendingReceivedInvoiceSize3 = d3.filter(el => el.InvoicState === 0).length;
        unloadedReceivedInvoiceSize3 = d3.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
        acceptedReceivedInvoiceSize3 = d3.filter(el => el.InvoicState === 2).length;
    } else {
    }

    if ( d4.length > 0) {
        pendingReceivedInvoiceSize4 = d4.filter(el => el.InvoicState === 0).length;
        unloadedReceivedInvoiceSize4 = d4.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
        acceptedReceivedInvoiceSize4 = d4.filter(el => el.InvoicState === 2).length;
    } else {
    }

    if ( d5.length > 0) {
        pendingReceivedInvoiceSize5 = d5.filter(el => el.InvoicState === 0).length;
        unloadedReceivedInvoiceSize5 = d5.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
        acceptedReceivedInvoiceSize5 = d5.filter(el => el.InvoicState === 2).length;
    } else {
    }

    if ( d6.length > 0) {
        pendingReceivedInvoiceSize6 = d6.filter(el => el.InvoicState === 0).length;
        unloadedReceivedInvoiceSize6 = d6.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
        acceptedReceivedInvoiceSize6 = d6.filter(el => el.InvoicState === 2).length;
    } else{
    };



    /* Sent Invoice */
    let pendingSentInvoiceSize1;
    let unloadedSentInvoiceSize1;
    let acceptedSentInvoiceSize1;
    let pendingSentInvoiceSize2;
    let unloadedSentInvoiceSize2;
    let acceptedSentInvoiceSize2;
    let pendingSentInvoiceSize3;
    let unloadedSentInvoiceSize3;
    let acceptedSentInvoiceSize3;
    let pendingSentInvoiceSize4;
    let unloadedSentInvoiceSize4;
    let acceptedSentInvoiceSize4;
    let pendingSentInvoiceSize5;
    let unloadedSentInvoiceSize5;
    let acceptedSentInvoiceSize5;
    let pendingSentInvoiceSize6;
    let unloadedSentInvoiceSize6;
    let acceptedSentInvoiceSize6;
    if ( d1.length > 0 ) {
        pendingSentInvoiceSize1 = f1.filter(el => el.InvoicState === 0).length;
        unloadedSentInvoiceSize1 = f1.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
        acceptedSentInvoiceSize1 = f1.filter(el => el.InvoicState === 2).length;
    } else {
    }

    if ( d2.length > 0) {
        pendingSentInvoiceSize2 = f2.filter(el => el.InvoicState === 0).length;
        unloadedSentInvoiceSize2 = f2.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
        acceptedSentInvoiceSize2 = f2.filter(el => el.InvoicState === 2).length;
    } else {
    }

    if ( d3.length > 0) {
        pendingSentInvoiceSize3 = f3.filter(el => el.InvoicState === 0).length;
        unloadedSentInvoiceSize3 = f3.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
        acceptedSentInvoiceSize3 = f3.filter(el => el.InvoicState === 2).length;
    } else {
    }

    if ( d4.length > 0) {
        pendingSentInvoiceSize4 = f4.filter(el => el.InvoicState === 0).length;
        unloadedSentInvoiceSize4 = f4.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
        acceptedSentInvoiceSize4 = f4.filter(el => el.InvoicState === 2).length;
    } else {

    }

    if ( d5.length > 0) {
        pendingSentInvoiceSize5 = f5.filter(el => el.InvoicState === 0).length;
        unloadedSentInvoiceSize5 = f5.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
        acceptedSentInvoiceSize5 = f5.filter(el => el.InvoicState === 2).length;
    } else{

    }
    ;
    if ( d6.length > 0) {
        pendingSentInvoiceSize6 = f6.filter(el => el.InvoicState === 0).length;
        unloadedSentInvoiceSize6 = f6.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
        acceptedSentInvoiceSize6 = f6.filter(el => el.InvoicState === 2).length;
    } else{

    }





    const chartDataPendingReceived = [pendingReceivedInvoiceSize1, pendingReceivedInvoiceSize2, pendingReceivedInvoiceSize3, pendingReceivedInvoiceSize4, pendingReceivedInvoiceSize5, pendingReceivedInvoiceSize6];
    const chartDataUnloadedReceived = [unloadedReceivedInvoiceSize1, unloadedReceivedInvoiceSize2, unloadedReceivedInvoiceSize3, unloadedReceivedInvoiceSize4, unloadedReceivedInvoiceSize5, unloadedReceivedInvoiceSize6];
    const chartDataAcceptedReceived = [acceptedReceivedInvoiceSize1, acceptedReceivedInvoiceSize2, acceptedReceivedInvoiceSize3, acceptedReceivedInvoiceSize4, acceptedReceivedInvoiceSize5, acceptedReceivedInvoiceSize6];

    const chartDataPendingSent = [pendingSentInvoiceSize1, pendingSentInvoiceSize2, pendingSentInvoiceSize3, pendingSentInvoiceSize4, pendingSentInvoiceSize5, pendingSentInvoiceSize6];
    const chartDataUnloadedSent = [unloadedSentInvoiceSize1, unloadedSentInvoiceSize2, unloadedSentInvoiceSize3, unloadedSentInvoiceSize4, unloadedSentInvoiceSize5, unloadedSentInvoiceSize6];
    const chartDataAcceptedSent = [acceptedSentInvoiceSize1, acceptedSentInvoiceSize2, acceptedSentInvoiceSize3, acceptedSentInvoiceSize4, acceptedSentInvoiceSize5, acceptedSentInvoiceSize6];

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [localization[current_lang].chart.date.Monday, localization[current_lang].chart.date.Tuesday, localization[current_lang].chart.date.Wednesday, localization[current_lang].chart.date.Thursday, localization[current_lang].chart.date.Friday, localization[current_lang].chart.date.Saturday],
            datasets: [
                {
                    label: 'Pending',
                    backgroundColor: '#297FB0',
                    data: chartDataPendingReceived
                },
                {
                    label: 'Rejected',
                    backgroundColor: '#AF5457',
                    data: chartDataUnloadedReceived
                },
                {
                    label: 'Accepted',
                    backgroundColor: '#43995C',
                    data: chartDataAcceptedReceived
                }
            ]
        },
        options: {
            responsive: true,
            barRoundness: .3,
            barValueSpacing: 20,
            scales: {
                yAxes: [{
                    gridLines: {
                        offsetGridLines: true,
                        display: false
                    },
                    ticks: {
                        min: 0,
                        padding: 0
                    }
                }]
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20
                }
            }
        }
    });

    const invoiceReceivedBtn = document.querySelector('#invoiceReceivedBtn');
    const invoiceSentBtn = document.querySelector('#invoiceSentBtn');

    invoiceReceivedBtn.addEventListener('click', function() {
        const data = chart.config.data;
        data.datasets[0].data = chartDataPendingReceived;
        data.datasets[1].data = chartDataUnloadedReceived;
        data.datasets[2].data = chartDataAcceptedReceived;
        chart.update();
    })

    invoiceSentBtn.addEventListener('click', function() {
        const data = chart.config.data;
        data.datasets[0].data = chartDataPendingSent;
        data.datasets[1].data = chartDataUnloadedSent;
        data.datasets[2].data = chartDataAcceptedSent;
        chart.update();
    })


}

/*= = =======================================================================*/
export async function barChartRenderOrder(ctx) {


    let curr = new Date();
    let week = [];

    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i;
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
        week.push(day)
    }
    const milliseconds1 = new Date(week[0]).getTime();
    const milliseconds2 = new Date(week[1]).getTime();
    const milliseconds3 = new Date(week[2]).getTime();
    const milliseconds4 = new Date(week[3]).getTime();
    const milliseconds5 = new Date(week[4]).getTime();
    const milliseconds6 = new Date(week[5]).getTime();
    const milliseconds7 = new Date(week[6]).getTime();





    const receivedOrderData = await getReceivedOrders(week[0], week[6]);
    const sentOrderData = await getSentOrders(week[0], week[6]);



    const d1 = receivedOrderData.OrderList.filter(date => convertDateMilliseconds(date.Date) < milliseconds2 && convertDateMilliseconds(date.Date) > milliseconds1);
    const d2 = receivedOrderData.OrderList.filter(date => convertDateMilliseconds(date.Date) < milliseconds3 && convertDateMilliseconds(date.Date) > milliseconds2);
    const d3 = receivedOrderData.OrderList.filter(date => convertDateMilliseconds(date.Date) < milliseconds4 && convertDateMilliseconds(date.Date) > milliseconds3);
    const d4 = receivedOrderData.OrderList.filter(date => convertDateMilliseconds(date.Date) < milliseconds5 && convertDateMilliseconds(date.Date) > milliseconds4);
    const d5 = receivedOrderData.OrderList.filter(date => convertDateMilliseconds(date.Date) < milliseconds6 && convertDateMilliseconds(date.Date) > milliseconds5);
    const d6 = receivedOrderData.OrderList.filter(date => convertDateMilliseconds(date.Date) < milliseconds7 && convertDateMilliseconds(date.Date) > milliseconds6);

    const f1 = sentOrderData.OrderList.filter(date => convertDateMilliseconds(date.Date) < milliseconds2 && convertDateMilliseconds(date.Date) > milliseconds1);
    const f2 = sentOrderData.OrderList.filter(date => convertDateMilliseconds(date.Date) < milliseconds3 && convertDateMilliseconds(date.Date) > milliseconds2);
    const f3 = sentOrderData.OrderList.filter(date => convertDateMilliseconds(date.Date) < milliseconds4 && convertDateMilliseconds(date.Date) > milliseconds3);
    const f4 = sentOrderData.OrderList.filter(date => convertDateMilliseconds(date.Date) < milliseconds5 && convertDateMilliseconds(date.Date) > milliseconds4);
    const f5 = sentOrderData.OrderList.filter(date => convertDateMilliseconds(date.Date) < milliseconds6 && convertDateMilliseconds(date.Date) > milliseconds5);
    const f6 = sentOrderData.OrderList.filter(date => convertDateMilliseconds(date.Date) < milliseconds7 && convertDateMilliseconds(date.Date) > milliseconds6);


    /* Received Order */
    let pendingReceivedInvoiceSize1;
    let unloadedReceivedInvoiceSize1;
    let acceptedReceivedInvoiceSize1;
    let pendingReceivedInvoiceSize2;
    let unloadedReceivedInvoiceSize2;
    let acceptedReceivedInvoiceSize2;
    let pendingReceivedInvoiceSize3;
    let unloadedReceivedInvoiceSize3;
    let acceptedReceivedInvoiceSize3;
    let pendingReceivedInvoiceSize4;
    let unloadedReceivedInvoiceSize4;
    let acceptedReceivedInvoiceSize4;
    let pendingReceivedInvoiceSize5;
    let unloadedReceivedInvoiceSize5;
    let acceptedReceivedInvoiceSize5;
    let pendingReceivedInvoiceSize6;
    let unloadedReceivedInvoiceSize6;
    let acceptedReceivedInvoiceSize6;
    if ( d1.length > 0 ) {
        pendingReceivedInvoiceSize1 = d1.filter(el => el.OrderState === 0).length;
        unloadedReceivedInvoiceSize1 = d1.filter(el => el.OrderState === 100).length; // UNLOADED = REJECTED
        acceptedReceivedInvoiceSize1 = d1.filter(el => el.OrderState === 2).length;
    } else {
    }

    if ( d2.length > 0) {
        /* Received Invoice */
        pendingReceivedInvoiceSize2 = d2.filter(el => el.OrderState === 0).length;
        unloadedReceivedInvoiceSize2 = d2.filter(el => el.OrderState === 100).length; // UNLOADED = REJECTED
        acceptedReceivedInvoiceSize2 = d2.filter(el => el.OrderState === 2).length;
    } else {
    }

    if ( d3.length > 0) {
        pendingReceivedInvoiceSize3 = d3.filter(el => el.OrderState === 0).length;
        unloadedReceivedInvoiceSize3 = d3.filter(el => el.OrderState === 100).length; // UNLOADED = REJECTED
        acceptedReceivedInvoiceSize3 = d3.filter(el => el.OrderState === 2).length;
    } else {
    }

    if ( d4.length > 0) {
        pendingReceivedInvoiceSize4 = d4.filter(el => el.OrderState === 0).length;
        unloadedReceivedInvoiceSize4 = d4.filter(el => el.OrderState === 100).length; // UNLOADED = REJECTED
        acceptedReceivedInvoiceSize4 = d4.filter(el => el.OrderState === 2).length;
    } else {
    }

    if ( d5.length > 0) {
        pendingReceivedInvoiceSize5 = d5.filter(el => el.OrderState === 0).length;
        unloadedReceivedInvoiceSize5 = d5.filter(el => el.OrderState === 100).length; // UNLOADED = REJECTED
        acceptedReceivedInvoiceSize5 = d5.filter(el => el.OrderState === 2).length;
    } else{
    }

    if ( d6.length > 0) {
        pendingReceivedInvoiceSize6 = d6.filter(el => el.OrderState === 0).length;
        unloadedReceivedInvoiceSize6 = d6.filter(el => el.OrderState === 100).length; // UNLOADED = REJECTED
        acceptedReceivedInvoiceSize6 = d6.filter(el => el.OrderState === 2).length;
    } else{
    };

    /* Sent Order */
    let pendingSentInvoiceSize1;
    let unloadedSentInvoiceSize1;
    let acceptedSentInvoiceSize1;
    let pendingSentInvoiceSize2;
    let unloadedSentInvoiceSize2;
    let acceptedSentInvoiceSize2;
    let pendingSentInvoiceSize3;
    let unloadedSentInvoiceSize3;
    let acceptedSentInvoiceSize3;
    let pendingSentInvoiceSize4;
    let unloadedSentInvoiceSize4;
    let acceptedSentInvoiceSize4;
    let pendingSentInvoiceSize5;
    let unloadedSentInvoiceSize5;
    let acceptedSentInvoiceSize5;
    let pendingSentInvoiceSize6;
    let unloadedSentInvoiceSize6;
    let acceptedSentInvoiceSize6;
    if ( d1.length > 0 ) {
        pendingSentInvoiceSize1 = f1.filter(el => el.OrderState === 0).length;
        unloadedSentInvoiceSize1 = f1.filter(el => el.OrderState === 100).length; // UNLOADED = REJECTED
        acceptedSentInvoiceSize1 = f1.filter(el => el.OrderState === 2).length;
    } else {
    }

    if ( d2.length > 0) {
        pendingSentInvoiceSize2 = f2.filter(el => el.OrderState === 0).length;
        unloadedSentInvoiceSize2 = f2.filter(el => el.OrderState === 100).length; // UNLOADED = REJECTED
        acceptedSentInvoiceSize2 = f2.filter(el => el.OrderState === 2).length;
    } else {
    }

    if ( d3.length > 0) {
        pendingSentInvoiceSize3 = f3.filter(el => el.OrderState === 0).length;
        unloadedSentInvoiceSize3 = f3.filter(el => el.OrderState === 100).length; // UNLOADED = REJECTED
        acceptedSentInvoiceSize3 = f3.filter(el => el.OrderState === 2).length;
    } else {
    }

    if ( d4.length > 0) {
        pendingSentInvoiceSize4 = f4.filter(el => el.OrderState === 0).length;
        unloadedSentInvoiceSize4 = f4.filter(el => el.OrderState === 100).length; // UNLOADED = REJECTED
        acceptedSentInvoiceSize4 = f4.filter(el => el.OrderState === 2).length;
    } else {

    }

    if ( d5.length > 0) {
        pendingSentInvoiceSize5 = f5.filter(el => el.OrderState === 0).length;
        unloadedSentInvoiceSize5 = f5.filter(el => el.OrderState === 100).length; // UNLOADED = REJECTED
        acceptedSentInvoiceSize5 = f5.filter(el => el.OrderState === 2).length;
    } else{

    }

    if ( d6.length > 0) {
        pendingSentInvoiceSize6 = f6.filter(el => el.OrderState === 0).length;
        unloadedSentInvoiceSize6 = f6.filter(el => el.OrderState === 100).length; // UNLOADED = REJECTED
        acceptedSentInvoiceSize6 = f6.filter(el => el.OrderState === 2).length;
    } else{

    }




    const chartDataPendingReceived = [pendingReceivedInvoiceSize1, pendingReceivedInvoiceSize2, pendingReceivedInvoiceSize3, pendingReceivedInvoiceSize4, pendingReceivedInvoiceSize5, pendingReceivedInvoiceSize6];
    const chartDataUnloadedReceived = [unloadedReceivedInvoiceSize1, unloadedReceivedInvoiceSize2, unloadedReceivedInvoiceSize3, unloadedReceivedInvoiceSize4, unloadedReceivedInvoiceSize5, unloadedReceivedInvoiceSize6];
    const chartDataAcceptedReceived = [acceptedReceivedInvoiceSize1, acceptedReceivedInvoiceSize2, acceptedReceivedInvoiceSize3, acceptedReceivedInvoiceSize4, acceptedReceivedInvoiceSize5, acceptedReceivedInvoiceSize6];

    const chartDataPendingSent = [pendingSentInvoiceSize1, pendingSentInvoiceSize2, pendingSentInvoiceSize3, pendingSentInvoiceSize4, pendingSentInvoiceSize5, pendingSentInvoiceSize6];
    const chartDataUnloadedSent = [unloadedSentInvoiceSize1, unloadedSentInvoiceSize2, unloadedSentInvoiceSize3, unloadedSentInvoiceSize4, unloadedSentInvoiceSize5, unloadedSentInvoiceSize6];
    const chartDataAcceptedSent = [acceptedSentInvoiceSize1, acceptedSentInvoiceSize2, acceptedSentInvoiceSize3, acceptedSentInvoiceSize4, acceptedSentInvoiceSize5, acceptedSentInvoiceSize6];

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [localization[current_lang].chart.date.Monday, localization[current_lang].chart.date.Tuesday, localization[current_lang].chart.date.Wednesday, localization[current_lang].chart.date.Thursday, localization[current_lang].chart.date.Friday, localization[current_lang].chart.date.Saturday],
            datasets: [
                {
                    label: 'Pending',
                    backgroundColor: '#297FB0',
                    data: chartDataPendingReceived
                },
                {
                    label: 'Rejected',
                    backgroundColor: '#AF5457',
                    data: chartDataUnloadedReceived
                },
                {
                    label: 'Accepted',
                    backgroundColor: '#43995C',
                    data: chartDataAcceptedReceived
                }
            ]
        },
        options: {
            responsive: true,
            barRoundness: .3,
            barValueSpacing: 20,
            scales: {
                yAxes: [{
                    gridLines: {
                        offsetGridLines: true,
                        display: false
                    },
                    ticks: {
                        min: 0,
                        padding: 0
                    }
                }]
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20
                }
            }
        }
    });
    const orderReceivedBtn = document.querySelector('#orderReceivedBtn');
    const orderSentBtn = document.querySelector('#orderSentBtn');

    orderReceivedBtn.addEventListener('click', function() {
        const data = chart.config.data;
        data.datasets[0].data = chartDataPendingReceived;
        data.datasets[1].data = chartDataUnloadedReceived;
        data.datasets[2].data = chartDataAcceptedReceived;
        chart.update();
    })

    orderSentBtn.addEventListener('click', function() {
        const data = chart.config.data;
        data.datasets[0].data = chartDataPendingSent;
        data.datasets[1].data = chartDataUnloadedSent;
        data.datasets[2].data = chartDataAcceptedSent;
        chart.update();
    })



}