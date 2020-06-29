import Chart from 'chart.js';
import 'chartjs-top-round-bar';


export function barChartRender(ctx) {

    const data = {
        labels: ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'],
        datasets: [
            {
                label: 'În așteptare',
                backgroundColor: '#297FB0',
                data: [500, 765, 123, 700, 900, 100],
            },
            {
                label: 'În proces',
                backgroundColor: '#5CD589',
                data: [100, 50, 123, 300, 455, 250],
            },
            {
                label: 'Confirmate',
                backgroundColor: '#43995C',
                data: [500, 777, 555, 300, 455, 1100],
            }
        ]
    };
    const CHART = new Chart(ctx, {
        type: 'bar',
        data: data,
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






}