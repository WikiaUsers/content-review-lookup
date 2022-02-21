(function () {

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    try {
        const wrappers = $('.view-count-chart');
        if (wrappers) {
            wrappers.each(function (index) {
                try {
                    const chart = $('<canvas id="myChart' + index + '"></canvas>');
                    chart.appendTo($(this));
                    
                    var dates;
                    if ($(this).data('dates')) {
                        dates = JSON.parse($(this).data('dates').replace(/'/g, '"'));
                    } else {
                        dates = [];
                    }

                    const backgroundColors = [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 3, 209, 0.2)',
                        'rgba(76, 217, 100, 0.2)',
                        'rgba(240, 48, 74, 0.2)',
                        'rgba(0, 17, 255, 0.2)',
                    ];

                    const borderColors = [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 3, 209, 1)',
                        'rgba(76, 217, 100, 1)',
                        'rgba(240, 48, 74, 1)',
                        'rgba(0, 17, 255, 1)',
                    ];


                    const opts = [];
                    for (var i = 1; i <= 10; i++) {
                        const dataStr = $(this).data("r" + i.toString());
                        if (dataStr) {
                            const data = JSON.parse(dataStr.replace(/'/g, '"'));
                            const opt = {};
                            opt['label'] = data['name'];
                            opt['data'] = data['views'];
                            opt['backgroundColor'] = [backgroundColors[i - 1]];
                            opt['borderColor'] = [borderColors[i - 1]];
                            opt['fill'] = false;
                            opts.push(opt);
                        } else {
                            break;
                        }
                    }
                    const ctx = document.getElementById('myChart' + index).getContext('2d');
                    const myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: dates,
                            datasets: opts,
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        callback: function (value) {
                                            return formatNumber(value);
                                        }
                                    }
                                }]
                            },
                            tooltips: {
                                callbacks: {
                                    title: function (tooltipItems, data) {
                                        const t = tooltipItems[0].datasetIndex;
                                        return data.datasets[t].label;
                                    },
                                    label: function (tooltipItems, data) {
                                        return formatNumber(tooltipItems.yLabel);
                                    }
                                }
                            },
                            hover: {
                                mode: null
                            },
                            responsive: true,
                            maintainAspectRatio: false
                        }
                    });
                } catch (e) {
                    console.error(e);
                }
            });
        }
    } catch (e) {
        console.error(e);
    }
})();