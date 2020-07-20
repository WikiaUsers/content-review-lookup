/*
This file is used to create Highcharts charts on pages 
without having to make a new JS function for each one.
NOTE: Each table ID can only be used once per page.
*/
$(document).ready(function() {
    var ColumnChartFromTableTitle = $('#ColumnChartFromTableTitle').text();
    var ColumnChartFromTableYLabel = $('#ColumnChartFromTableYLabel').text();
    $('#ColumnChartFromTable').highcharts({
        data: {
            table: 'ColumnChartFromTableData'
        },
        chart: {
            type: 'column'
        },
        title: {
            text: ColumnChartFromTableTitle
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: ColumnChartFromTableYLabel
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    this.point.y + ' ' + this.point.name;
            }
        }
    });
    var PieChartFromTableTitle = $('#PieChartFromTableTitle').text();
    $('#PieChartFromTable').highcharts({
        data: {
            table: 'PieChartFromTableData'
        },
        chart: {
            type: 'pie'
        },
        title: {
            text: PieChartFromTableTitle
        },
        tooltip: {
            pointFormat: '{point.y}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        }
    });
    var LineChartFromTableTitle = $('#LineChartFromTableTitle').text();
    var LineChartFromTableYLabel = $('#LineChartFromTableYLabel').text();
    var LineChartFromTableType = $('#LineChartFromTableType').text();
    $('#LineChartFromTable').highcharts({
        data: {
            table: 'LineChartFromTableData'
        },
        chart: {
            type: LineChartFromTableType
        },
        title: {
            text: LineChartFromTableTitle
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: LineChartFromTableYLabel
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    this.point.name + ': ' + this.point.y;
            }
        }
    });
});