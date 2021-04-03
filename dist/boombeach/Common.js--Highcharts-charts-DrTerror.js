$(document).ready(function() {
    function TerrorLootChartTropical(StatueStatRR) {
        return $('#TropicalDrTerrorChart').highcharts({
        chart: {
            type: 'column',
            zoomType: 'y'
        },
        title: {
            text: 'Resources Earned in a Tropical Dr. T Event'
        },
        subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in. Use the legend to hide stages.' : 'Use two fingers to zoom in. Use the legend to hide stages.'
        },
        xAxis: {
            categories: ['Gold', 'Wood', 'Stone', 'Iron']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Amount Earned'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal:,.0f}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: 'Stage 7',
            data: [Math.round(255000 * StatueStatRR), Math.round(170000 * StatueStatRR), Math.round(113333 * StatueStatRR), Math.round(56666 * StatueStatRR)],
            color: '#330033'
        }, {
            name: 'Stage 6',
            data: [Math.round(201000 * StatueStatRR), Math.round(134000 * StatueStatRR), Math.round(89333 * StatueStatRR), Math.round(44666 * StatueStatRR)],
            color: '#470047'
        }, {
            name: 'Stage 5',
            data: [Math.round(153000 * StatueStatRR), Math.round(102000 * StatueStatRR), Math.round(68000 * StatueStatRR), Math.round(34000 * StatueStatRR)],
            color: '#5C005C'
        }, {
            name: 'Stage 4',
            data: [Math.round(111000 * StatueStatRR), Math.round(74000 * StatueStatRR), Math.round(49333 * StatueStatRR), Math.round(24666 * StatueStatRR)],
            color: '#751975'
        }, {
            name: 'Stage 3',
            data: [Math.round(75000 * StatueStatRR), Math.round(50000 * StatueStatRR), Math.round(33333 * StatueStatRR), Math.round(16666 * StatueStatRR)],
            color: '#854585'
        }, {
            name: 'Stage 2',
            data: [Math.round(45000 * StatueStatRR), Math.round(30000 * StatueStatRR), Math.round(20000 * StatueStatRR), Math.round(10000 * StatueStatRR)],
            color: '#9A679A'
        }, {
            name: 'Stage 1',
            data: [Math.round(21000 * StatueStatRR), Math.round(14000 * StatueStatRR), Math.round(9333 * StatueStatRR), Math.round(4666 * StatueStatRR)],
            color: '#BA8DBA'
        }]
    });
    }
    function TerrorLootChartVolcano(StatueStatRR) {
        return $('#VolcanoDrTerrorChart').highcharts({
        chart: {
            type: 'column',
            zoomType: 'y'
        },
        title: {
            text: 'Resources Earned in a Volcano Dr. T Event'
        },
        subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in. Use the legend to hide stages.' : 'Use two fingers to zoom in. Use the legend to hide stages.'
        },
        xAxis: {
            categories: ['Gold', 'Wood', 'Stone', 'Iron']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Amount Earned'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal:,.0f}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: 'Stage 7',
            data: [Math.round(320400 * StatueStatRR), Math.round(213600 * StatueStatRR), Math.round(142400 * StatueStatRR), Math.round(71200 * StatueStatRR)],
            color: '#330033'
        }, {
            name: 'Stage 6',
            data: [Math.round(255600 * StatueStatRR), Math.round(170400 * StatueStatRR), Math.round(113600 * StatueStatRR), Math.round(56800 * StatueStatRR)],
            color: '#470047'
        }, {
            name: 'Stage 5',
            data: [Math.round(198000 * StatueStatRR), Math.round(132000 * StatueStatRR), Math.round(88000 * StatueStatRR), Math.round(44000 * StatueStatRR)],
            color: '#5C005C'
        }, {
            name: 'Stage 4',
            data: [Math.round(147600 * StatueStatRR), Math.round(98400 * StatueStatRR), Math.round(65600 * StatueStatRR), Math.round(32800 * StatueStatRR)],
            color: '#751975'
        }, {
            name: 'Stage 3',
            data: [Math.round(104400 * StatueStatRR), Math.round(69600 * StatueStatRR), Math.round(46400 * StatueStatRR), Math.round(23200 * StatueStatRR)],
            color: '#854585'
        }, {
            name: 'Stage 2',
            data: [Math.round(68400 * StatueStatRR), Math.round(45600 * StatueStatRR), Math.round(30400 * StatueStatRR), Math.round(15200 * StatueStatRR)],
            color: '#9A679A'
        }, {
            name: 'Stage 1',
            data: [Math.round(39600 * StatueStatRR), Math.round(26400 * StatueStatRR), Math.round(17600 * StatueStatRR), Math.round(8800 * StatueStatRR)],
            color: '#BA8DBA'
        }]
    });
    }
    var RRBonus = 1;
    TerrorLootChartTropical(RRBonus);
    TerrorLootChartVolcano(RRBonus);
    $("#changeBonusButton").click(function() {
        var RRInput = $("#bonusInputRR").val() * 1;
        var RRBonus = 1 + (RRInput / 100);
        TerrorLootChartTropical(RRBonus);
        TerrorLootChartVolcano(RRBonus);    
    });
    $("#resetBonusButton").click(function() {
        var RRBonus = 1;
        TerrorLootChartTropical(RRBonus);
        TerrorLootChartVolcano(RRBonus);
    });

});