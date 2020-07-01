import Chart from 'chart.js';
import 'chartjs-top-round-bar';
import { getReceivedInvoiceList } from "../../../../server/getReceivedInvoiceList";
import { getSentInvoiceList } from "../../../../server/getSentInvoiceList";
import { getSentOrders } from "../../../../server/getSentOrders";
import { getReceivedOrders } from "../../../../server/getReceivedOrders";
import { convertDateMilliseconds } from "../../../../js/util/dateConverter";


export async function barChartRenderInvoice(ctx) {
    const receivedInvoiceData = await getReceivedInvoiceList('2000-01-01', '2100-01-01'); //filteredReceivedInvoiceData goes here
    const sentInvoiceData = await getSentInvoiceList('2000-01-01', '2100-01-01'); //filteredReceivedInvoiceData goes here


    // let curr = new Date();
    // let week = [];
    //
    // for (let i = 1; i <= 7; i++) {
    //     let first = curr.getDate() - curr.getDay() + i;
    //     let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    //     week.push(day)
    // }
    // const milliseconds = new Date(week[0]).getTime();
    // const milliseconds2 = new Date(week[6]).getTime();
    //
    //
    // const d = receivedInvoiceData.InvoiceList
    //     .map(date => convertDateMilliseconds(date.CreateDate))
    //     .filter(date => date < milliseconds2 && date > milliseconds);
    // console.log(d);
    //
    // const filteredReceivedInvoiceData = receivedInvoiceData.InvoiceList
    //     .filter(date => convertDateMilliseconds(date.CreateDate) < milliseconds2 && convertDateMilliseconds(date.CreateDate) > milliseconds);
    // console.log(filteredReceivedInvoiceData);

    /* Received Invoice */
    const pendingReceivedInvoiceSize = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 0).length;
    const unloadedReceivedInvoiceSize = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
    const acceptedReceivedInvoiceSize = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 2).length;

    /* Sent Invoice */
    const pendingSentInvoiceSize = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 0).length;
    const unloadedSentInvoiceSize = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 100).length; // UNLOADED = REJECTED
    const acceptedSentInvoiceSize = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 2).length;

    const invoiceReceivedBtn = document.querySelector('#invoiceReceivedBtn');
    const invoiceSentBtn = document.querySelector('#invoiceSentBtn');

    const chartDataPendingReceived = [pendingReceivedInvoiceSize, pendingReceivedInvoiceSize, pendingReceivedInvoiceSize, pendingReceivedInvoiceSize, pendingReceivedInvoiceSize, pendingReceivedInvoiceSize];
    const chartDataUnloadedReceived = [unloadedReceivedInvoiceSize, unloadedReceivedInvoiceSize, unloadedReceivedInvoiceSize, unloadedReceivedInvoiceSize, unloadedReceivedInvoiceSize, unloadedReceivedInvoiceSize];
    const chartDataAcceptedReceived = [acceptedReceivedInvoiceSize, acceptedReceivedInvoiceSize, acceptedReceivedInvoiceSize, acceptedReceivedInvoiceSize, acceptedReceivedInvoiceSize, acceptedReceivedInvoiceSize];

    const chartDataPendingSent = [pendingSentInvoiceSize, pendingSentInvoiceSize, pendingSentInvoiceSize, pendingSentInvoiceSize, pendingSentInvoiceSize, pendingSentInvoiceSize];
    const chartDataUnloadedSent = [unloadedSentInvoiceSize, unloadedSentInvoiceSize, unloadedSentInvoiceSize, unloadedSentInvoiceSize, unloadedSentInvoiceSize, unloadedSentInvoiceSize];
    const chartDataAcceptedSent = [acceptedSentInvoiceSize, acceptedSentInvoiceSize, acceptedSentInvoiceSize, acceptedSentInvoiceSize, acceptedSentInvoiceSize, acceptedSentInvoiceSize];

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'],
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


export async function barChartRenderOrder(ctx) {
    const receivedOrderData = await getReceivedOrders('2000-01-01', '2100-01-01');
    const sentOrderData = await getSentOrders('2000-01-01', '2100-01-01');




    /* Received Order */
    const pendingReceivedOrderSize = receivedOrderData.OrderList.filter(el => el.OrderState === 0).length;
    const unloadedReceivedOrderSize = receivedOrderData.OrderList.filter(el => el.OrderState === 100).length;
    const acceptedReceivedOrderSize = receivedOrderData.OrderList.filter(el => el.OrderState === 2).length;

    /* Sent Order */
    const pendingSentOrderSize = sentOrderData.OrderList.filter(el => el.OrderState === 0).length;
    const unloadedSentOrderSize = sentOrderData.OrderList.filter(el => el.OrderState === 100).length;
    const acceptedSentOrderSize = sentOrderData.OrderList.filter(el => el.OrderState === 2).length;

    const orderReceivedBtn = document.querySelector('#orderReceivedBtn');
    const orderSentBtn = document.querySelector('#orderSentBtn');


    const chartDataPendingReceived = [pendingReceivedOrderSize, pendingReceivedOrderSize, pendingReceivedOrderSize, pendingReceivedOrderSize, pendingReceivedOrderSize, pendingReceivedOrderSize];
    const chartDataUnloadedReceived = [unloadedReceivedOrderSize, unloadedReceivedOrderSize, unloadedReceivedOrderSize, unloadedReceivedOrderSize, unloadedReceivedOrderSize, unloadedReceivedOrderSize];
    const chartDataAcceptedReceived = [acceptedReceivedOrderSize, acceptedReceivedOrderSize, acceptedReceivedOrderSize, acceptedReceivedOrderSize, acceptedReceivedOrderSize, acceptedReceivedOrderSize];

    const chartDataPendingSent = [pendingSentOrderSize, pendingSentOrderSize, pendingSentOrderSize, pendingSentOrderSize, pendingSentOrderSize, pendingSentOrderSize];
    const chartDataUnloadedSent = [unloadedSentOrderSize, unloadedSentOrderSize, unloadedSentOrderSize, unloadedSentOrderSize, unloadedSentOrderSize, unloadedSentOrderSize];
    const chartDataAcceptedSent = [acceptedSentOrderSize, acceptedSentOrderSize, acceptedSentOrderSize, acceptedSentOrderSize, acceptedSentOrderSize, acceptedSentOrderSize];

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'],
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