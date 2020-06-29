import Chart from 'chart.js';
import 'chartjs-plugin-doughnutlabel';


export function pieChartRender(ctx) {

    const getTotal = (chart) => {
        return chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0).toLocaleString('en-US').replace(',', ' ');
    }
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['În așteptare', 'În proces', 'Confirmate'],
            datasets: [
                {
                    label: 'Points',
                    backgroundColor: ['#297FB0', '#5CD589', '#43995C'],
                    data: [1000, 18000, 15000],
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


}
