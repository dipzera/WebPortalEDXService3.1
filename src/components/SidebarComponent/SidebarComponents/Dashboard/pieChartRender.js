import Chart from 'chart.js';
import 'chartjs-plugin-doughnutlabel';
import {getReceivedInvoiceList} from "../../../../server/getReceivedInvoiceList";
import {getSentInvoiceList} from "../../../../server/getSentInvoiceList";
import {getReceivedOrders} from "../../../../server/getReceivedOrders";
import {getSentOrders} from "../../../../server/getSentOrders";
import {getCurrentMonth} from "../../../../js/util/getCurrentMonth";


export async function pieChartRenderInvoice(ctx) {
    const currentMonthDate = getCurrentMonth();
    const receivedInvoiceData = await getReceivedInvoiceList(currentMonthDate[0], currentMonthDate[1]);
    const sentInvoiceData = await getSentInvoiceList(currentMonthDate[0], currentMonthDate[1]);

    /* Received Invoice */
    const pendingReceivedInvoiceSize = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 0).length;
    const processingReceivedInvoiceSize = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 100).length;
    const unloadedReceivedInvoiceSize = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 300).length; // UNLOADED = REJECTED
    const acceptedReceivedInvoiceSize = receivedInvoiceData.InvoiceList.filter(el => el.InvoicState === 200).length;

    /* Sent Invoice */
    const pendingSentInvoiceSize = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 0).length;
    const processingSentInvoiceSize = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 100).length;
    const unloadedSentInvoiceSize = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 300).length; // UNLOADED = REJECTED
    const acceptedSentInvoiceSize = sentInvoiceData.InvoiceList.filter(el => el.InvoicState === 200).length;

    const invoiceReceivedBtn = document.querySelector('#invoiceReceivedBtn');
    const invoiceSentBtn = document.querySelector('#invoiceSentBtn');

    const chartReceivedData = [pendingReceivedInvoiceSize, processingReceivedInvoiceSize, unloadedReceivedInvoiceSize, acceptedReceivedInvoiceSize ];
    const chartSentData = [pendingSentInvoiceSize, processingSentInvoiceSize, unloadedSentInvoiceSize, acceptedSentInvoiceSize ];

    const chart_labels = ['Pending', 'Processing', 'Rejected', 'Accepted'];

    const getTotal = (chart) => {
        return chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0).toLocaleString('en-US').replace(',', ' ');
    };
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: chart_labels,
            datasets: [
                {
                    label: 'Points',
                    backgroundColor: ['#55D8FE', '#FFDA83', '#FF8373', '#5FE3A1'],
                    data: chartReceivedData,
                }
            ]
        },
        options: {
            responsive: true,
            animation: {
                animateScale: false
            },
            legend: {
                display: true,
                position: 'right',
                align: 'center',
                labels: {
                    padding: 20,
                    usePointStyle: true
                }
            },
            plugins: {
                doughnutlabel: {
                    labels: [
                        {
                            text: getTotal,
                            font: {
                                size: '15'
                            },
                            color: 'black'
                        }
                    ]
                }
            }
        },
    });

    invoiceReceivedBtn.addEventListener('click', function() {
        const data = chart.config.data;
        data.datasets[0].data = chartReceivedData;
        data.labels = chart_labels;
        chart.update();
    })

    invoiceSentBtn.addEventListener('click', function() {
        const data = chart.config.data;
        data.datasets[0].data = chartSentData;
        chart.update();
    })

}



export async function pieChartRenderOrder(ctx) {
    const currentMonthDate = getCurrentMonth();
    const receivedOrderData = await getReceivedOrders(currentMonthDate[0], currentMonthDate[1]);
    const sentOrderData = await getSentOrders(currentMonthDate[0], currentMonthDate[1]);


    /* Received Order */
    const pendingReceivedOrderSize = receivedOrderData.OrderList.filter(el => el.OrderState === 0).length;
    const processingReceivedOrderSize = receivedOrderData.OrderList.filter(el => el.OrderState === 100).length;
    const unloadedReceivedOrderSize = receivedOrderData.OrderList.filter(el => el.OrderState === 300).length; // UNLOADED = REJECTED
    const acceptedReceivedOrderSize = receivedOrderData.OrderList.filter(el => el.OrderState === 200).length;

    /* Sent Order */
    const pendingSentOrderSize = sentOrderData.OrderList.filter(el => el.OrderState === 0).length;
    const processingSentOrderSize = sentOrderData.OrderList.filter(el => el.OrderState === 100).length;
    const unloadedSentOrderSize = sentOrderData.OrderList.filter(el => el.OrderState === 300).length; // UNLOADED = REJECTED
    const acceptedSentOrderSize = sentOrderData.OrderList.filter(el => el.OrderState === 200).length;

    const orderReceivedBtn = document.querySelector('#orderReceivedBtn');
    const orderSentBtn = document.querySelector('#orderSentBtn');

    const chartReceivedData = [pendingReceivedOrderSize,processingReceivedOrderSize, unloadedReceivedOrderSize, acceptedReceivedOrderSize];
    const chartSentData = [pendingSentOrderSize,processingSentOrderSize, unloadedSentOrderSize, acceptedSentOrderSize];

    const chart_labels = ['Pending','Processing', 'Rejected', 'Accepted'];

    const getTotal = (chart) => {
        return chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0).toLocaleString('en-US').replace(',', ' ');
    }
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: chart_labels,
            datasets: [
                {
                    label: 'Points',
                    backgroundColor: ['#55D8FE', '#FFDA83', '#FF8373', '#5FE3A1'],
                    data: chartReceivedData,
                }
            ]
        },
        options: {
            responsive: true,
            animation: {
                animateScale: false
            },
            legend: {
                display: true,
                position: 'right',
                align: 'center',
                labels: {
                    padding: 20,
                    usePointStyle: true
                }
            },
            plugins: {
                doughnutlabel: {
                    labels: [
                        {
                            text: getTotal,
                            font: {
                                size: '15'
                            },
                            color: 'black'
                        }
                    ]
                }
            }
        },
    });

    orderReceivedBtn.addEventListener('click', function() {
        const data = chart.config.data;
        data.datasets[0].data = chartReceivedData;
        data.labels = chart_labels;
        chart.update();
    })

    orderSentBtn.addEventListener('click', function() {
        const data = chart.config.data;
        data.datasets[0].data = chartSentData;
        chart.update();
    })


}
