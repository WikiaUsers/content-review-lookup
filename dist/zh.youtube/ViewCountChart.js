(function () {

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    try {
        const wrappers = $('.view-count-chart');
        if (wrappers) {
            wrappers.each(function(index) {
                const chart = $('<canvas id="myChart' + index + '"></canvas>');
                chart.appendTo($(this));

                const ndata = [];
                const vdata = [];
                for (var i = 1; i <= 10; i++) {
                    const name = $(this).data("n" + i.toString());
                    const number = parseInt($(this).data("v" + i.toString()));
    
                    if (name && number) {
                        ndata.push(name);
                        vdata.push(number);
                    } else {
                        break;
                    }
                }
                const ctx = document.getElementById('myChart' + index).getContext('2d');
                const myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ndata,
                        datasets: [{
                            label: '觀看次數',
                            data: vdata,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [
                                {
                                    ticks: {
                                        callback: function (value) {
                                            return value.substr(0, 10) + '...'
                                        }
                                    }
                                }
                            ],
                            yAxes: [
                                {
                                    ticks: {
                                        callback: function (value) {
                                            return formatNumber(value);
                                        }
                                    }
                                }
                            ]
                        },
                        tooltips: {
                            mode: 'label',
                            callbacks: {
                                title: function (tooltipItems, data) {
                                    const index = tooltipItems[0].index;
                                    return data.labels[index];
                                },
                                label: function (tooltipItems, data) {
                                    return formatNumber(tooltipItems.yLabel);
                                }
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            })
        }
    } catch (e) {
        console.error(e);
    }
})();