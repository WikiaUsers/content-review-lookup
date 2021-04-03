// ==========================================================================
// Start: Deck Charts
// Renders charts on deck articles
// Version 2.0.0
// Author: Aspallar
//
// ** Please dont edit this code directly in the wikia.
// ** Instead clone the git repository https://github.com/Aspallar/WikiLua
// <nowiki>
window.magicArena = window.magicArena || {};
window.magicArena.charts = window.magicArena.charts || (function ($) {
    /*globals google, mw, magicArena */
    'use strict';

    if (document.getElementById('mdw-deckcharts') === null || $('#mdw-disabled-js').attr('data-deckcharts-2-0-0'))
        return null;

    var colorPieChartId = 'mdw-cardsbycolor-chart',
        manaCurveChartId = 'mdw-manacurve-chart',
        typesPieChartId = 'mdw-types-chart',
        meanCmcId = 'mdw-mean-cmc',
        landProbabilitiesId = 'mdw-land-probabilities',
        lastManaCurveCmc = 6, // max cmc to show on mana curve chart

        colorColors = {
            Red: '#f28f78',
            Green: '#7dcd98',
            Blue: '#92d4f7',
            White: '#ffffd9',
            Black: '#515151',
            Multicolored: '#ffd778',
            Colorless: '#abafb0'
        },

        typeColors = {
            Land: '#FFFFFF',
            Creature: '#F5F5F5',
            Artifact: '#606060',
            Enchantment: '#696969',
            Instant: '#808080',
            Sorcery: '#B0B0B0',
            Planeswalker: '#C8C8C8'
        },

        dataIndex = {
            color: 0,
            num: 1,
            cmc: 2,
            type: 0
        },

        charts = {
            colorPie: {
                options: {
                    height: 240,
                    pieSliceText: 'value',
                    pieSliceBorderColor: 'black',
                    pieSliceTextStyle: {
                        color: 'black',
                        bold: true
                    },
                    backgroundColor: {
                        fill: 'transparent'
                    },
                    legend: {
                        textStyle: {
                            color: 'black'
                        }
                    }
                }
            },
            manaCurve: {
                selectedRow: null,
                options: {
                    height: 240,
                    legend: {
                        position: 'top',
                        maxLines: 3
                    },
                    bar: {
                        groupWidth: '80%'
                    },
                    isStacked: true,
                    backgroundColor: {
                        fill: 'transparent'
                    },
                    vAxis: { }
                },
                clearSelection: function () {
                    this.selectedRow = null;
                    this.chart.setSelection([]);
                },
                setSelection: function (row) {
                    this.chart.setSelection([{row:row, column:null}]);
                    this.selectedRow = row;
                }
            },
            typesPie: {
                options: {
                    height: 240,
                    pieSliceText: 'value',
                    pieSliceBorderColor: 'black',
                    pieSliceTextStyle: {
                        color: 'black',
                        bold: true
                    },
                    backgroundColor: {
                        fill: 'transparent'
                    },
                    legend: {
                        textStyle: {
                            color: 'black'
                        },
                        position: 'labeled'
                    }
                }
            }
        };

    function hasColorPieChart() {
        return document.getElementById(colorPieChartId) !== null;
    }

    function hasManaCurveChart() {
        return document.getElementById(manaCurveChartId) !== null;
    }

    function hasTypesPieChart() {
        return document.getElementById(typesPieChartId) !== null;
    }

    function hasMeanConvertedManaCost() {
        return document.getElementById(meanCmcId) !== null;
    }

    function hasLandProbabilities() {
        return document.getElementById(landProbabilitiesId) !== null;
    }

    function drawChart(chart) {
        if (chart.chart && chart.data)
            chart.chart.draw(chart.data, chart.options);
    }

    var statistics = {
        // n choose k
        nck: function (n, k) {
            var result = 1;
            for (var kcount = 1; kcount <= k; kcount++)
                result *= (n + 1 - kcount) / kcount;
            return result;
        },
        // probability mass function, hypergeometric distribution 
        pmf: function (N, m, n, k) {
            return (this.nck(m, k) * this.nck(N - m, n - k)) / this.nck(N, n);
        }
    };

    function findCard(deckData, sideboardData, name) {
        function nameMatch(c) { return c.name === name; }
        return deckData.find(nameMatch) || sideboardData.find(nameMatch);
    }

    function cmcClass(cmc) {
        return cmc >= lastManaCurveCmc ? 'mdw-cmc-max' : 'mdw-cmc-' + cmc;
    }

    function colorClass(color) {
        return 'mdw-card-' + color;
    }

    function clearHighlight() {
        $('.mdw-card-highlight').removeClass('mdw-card-highlight');
    }

    function onManaCurveSelect() {
        var mc = charts.manaCurve;
        clearHighlight();
        charts.colorPie.chart.setSelection([]);
        var selected = mc.chart.getSelection();
        if (selected.length > 0 && selected[0].column !== null) {
            var row = selected[0].row;
            if (row !== mc.selectedRow) {
                $('.' + cmcClass(row)).addClass('mdw-card-highlight');
                mc.setSelection(row);
            } else {
                mc.clearSelection();
            }
        }
    }

    function onColorPieSelect() {
        var cp = charts.colorPie;
        clearHighlight();
        var selected = cp.chart.getSelection();
        if (selected.length > 0) {
            var color = cp.data.getValue(selected[0].row, 0);
            $('.' + colorClass(color)).addClass('mdw-card-highlight');
            charts.manaCurve.clearSelection();
        }
    }

    function addHighlightClasses(deckData, sideboardData) {
        $('div.div-col.columns.column-count.column-count-2 span.card-image-tooltip').each(function () {
            var cardElement = $(this),
                card = findCard(deckData, sideboardData, cardElement.text());
            if (card) {
                if (typeof card.cmc === 'number')  
                    cardElement.addClass(cmcClass(card.cmc));
                if (typeof card.adjustedColor === 'string' && card.adjustedColor.length > 0)
                    cardElement.addClass(colorClass(card.adjustedColor));
            }
        });
    }

    function isLand(card) {
        return $.inArray('Land', card.types) !== -1;
    }

    function adjustedColor(colors) {
        if (colors === undefined || colors.length === 0)
            return 'Colorless';
        if (colors.length > 1)
            return 'Multicolored';
        return colors[0];
    }

    function normalName(name) {
        var pos = name.indexOf('//');
        return pos === -1 ? name : name.substring(0, pos - 1);
    }

    function addCalculatedFieldsToData(cardData) {
        cardData.forEach(function (card) {
            card.name = normalName(card.name);
            card.isLand = isLand(card);
            if (!card.isLand)
                card.adjustedColor = adjustedColor(card.colors);
        });
        return cardData;
    }

    function getData(id) {
        var dataElement = document.getElementById(id);
        var cardData = [];
        if (dataElement !== null) {
            try { cardData = JSON.parse(dataElement.textContent); } catch (e) { }
            return addCalculatedFieldsToData(cardData);
        }
        return cardData;
    }

    function hasNonLands(data) {
        return data.some(function (card) { return !card.isLand; });
    }

    function zeroedArray(size) {
        var arr = [];
        while (size--)
            arr.push(0);
        return arr;
    }

    function getCardTotals(cardData) {
        var totals = { cards: 0, lands: 0 };
        for (var k = 0, l = cardData.length; k < l; k++) {
            var card = cardData[k];
            totals.cards += card.num;
            if (card.isLand)
                totals.lands += card.num;
        }
        return totals;
    }

    function landProbabilities(cardTotals) {
        var result = [];
        for (var landCount = 0; landCount <= 7; landCount++) {
            var probability = statistics.pmf(cardTotals.cards, cardTotals.lands, 7, landCount);
            result.push(probability);
        }
        return result;
    }

    function meanConvertedManaCost(chartData) {
        var count = 0, totalCmc = 0;
        for (var k = 0, l = chartData.length; k < l; k++) {
            var card = chartData[k];
            if (!card.isLand) {
                count += card.num;
                totalCmc += card.cmc * card.num;
            }
        }
        return totalCmc / count;
    }

    function getColorOnlyData(cardData) {
        var colorData = [];
        cardData.forEach(function (card) {
            if (!card.isLand)
                colorData.push([card.adjustedColor, card.num]);
        });
        colorData.sort(function (a, b) {
            return a[dataIndex.color].localeCompare(b[dataIndex.color]);
        });
        return colorData;
    }

    function getCardTypeData(cardData) {
        var typeData = [];
        cardData.forEach(function (card) {
            card.types.forEach(function (type) {
                typeData.push([type, card.num]);
            });
        });
        typeData.sort(function (a, b) {
            return a[dataIndex.type].localeCompare(b[dataIndex.type]);
        });
        return typeData;
    }

    function sumData(data, groupBy) {

        function shouldSum(next, current) {
            return groupBy.every(function (i) { return current[i] === next[i]; });
        }
    
        var current, summedData = [];
        if (data.length === 0)
            return summedData;
        summedData.push(current = data[0]);
        for (var k = 1, l = data.length; k < l; k++) {
            var next = data[k];
            if (shouldSum(next, current))
                current[dataIndex.num] += next[dataIndex.num];
            else
                summedData.push(current = next);
        }
        return summedData;
    }

    function getColorWithCostData(cardData) {
        var colorData = [];
        cardData.forEach(function (card) {
            if (!card.isLand)
                colorData.push([card.adjustedColor, card.num, card.cmc]);
        });
        // order by color then by cmc
        colorData.sort(function (a, b) {
            var colorCompare = a[dataIndex.color].localeCompare(b[dataIndex.color]);
            if (colorCompare !== 0)
                return colorCompare;
            return a[dataIndex.cmc] - b[dataIndex.cmc];
        });
        return colorData;
    }

    function makeLabelsForManaCurve(chartData) {
        var labels = ['Cost'], k = 0, l = chartData.length;
        while (k < l) {
            var color = chartData[k++][dataIndex.color];
            labels.push(color);
            while (k < l && chartData[k][dataIndex.color] === color)
                ++k;
        }
        return labels;
    }

    function addZeroedDataSeriesForManaCurve(data, numSeries, seriesLength) {
        var labelIndex = 0;
        for (var k = 0; k < numSeries; k++) {
            var dataSeries = zeroedArray(seriesLength);
            dataSeries[labelIndex] = k.toString();
            data.push(dataSeries);
        }
        data[numSeries][labelIndex] += '+';
    }

    function fillDataForManaCurve(data, chartData, maxCmc) {
        var index = 1, color = chartData[0][dataIndex.color];
        chartData.forEach(function (row) {
            if (color !== row[dataIndex.color]) {
                ++index;
                color = row[dataIndex.color];
            }
            var cmc = Math.min(row[dataIndex.cmc], maxCmc);
            data[cmc + 1][index] += row[dataIndex.num];
        });
    }

    function nullZeroValuesInData(data, numSeries) {
        // we do this to avoid any zero values appearing in chart as a single line
        var totals = zeroedArray(numSeries);
        for (var seriesIndex = 1; seriesIndex < data.length; seriesIndex++) {
            var series = data[seriesIndex];
            for (var itemIndex = 1; itemIndex < series.length; itemIndex++) {
                totals[seriesIndex - 1] += series[itemIndex];
                if (series[itemIndex] === 0)
                    series[itemIndex] = null;
            }
        }
        return Math.max.apply(null, totals);
    }

    function getManaCurveAxisTicks(ticks, maxColumnTotal) {
        var tick = 0;
        do {
            tick += 2;
            ticks.push(tick);
        } while (tick < maxColumnTotal);
    }

    function shapeDataForManaCurveChart(chartData, ticks) {
        var lastCmc = lastManaCurveCmc + 1,
            labels = makeLabelsForManaCurve(chartData),
            data = [labels];
        addZeroedDataSeriesForManaCurve(data, lastCmc, labels.length);
        fillDataForManaCurve(data, chartData, lastCmc - 1);
        var maxColumnTotal = nullZeroValuesInData(data, lastCmc);
        getManaCurveAxisTicks(ticks, maxColumnTotal);
        return data;
    }

    function cacheManaCurveData(data) {
        var summedData = sumData(getColorWithCostData(data), [dataIndex.color, dataIndex.cmc]),
            ticks = [],
            shapedData = shapeDataForManaCurveChart(summedData, ticks),
            sectionColors = [];

        for (var k = 1; k < shapedData[0].length; k++)
            sectionColors.push(colorColors[shapedData[0][k]]);

        var mc = charts.manaCurve;
        mc.data = google.visualization.arrayToDataTable(shapedData);
        mc.options.colors = sectionColors;
        mc.options.vAxis.ticks = ticks;
    }

    function cacheColorPieData(cardData) {
        var summedData = sumData(getColorOnlyData(cardData), [dataIndex.color]),
            dt = new google.visualization.DataTable();

        dt.addColumn('string', 'Color');
        dt.addColumn('number', 'Amount');
        dt.addRows(summedData);

        var sliceColors = summedData.map(function (e) {
            return colorColors[e[dataIndex.color]];
        });

        var cp = charts.colorPie;
        cp.data = dt;
        cp.options.colors = sliceColors;
    }

    function cacheTypesPieData(cardData) {
        var summedData = sumData(getCardTypeData(cardData), [dataIndex.type]),
            dt = new google.visualization.DataTable();

        dt.addColumn('string', 'Type');
        dt.addColumn('number', 'Amount');
        dt.addRows(summedData);

        var sliceColors = summedData.map(function (e) {
            return typeColors[e[dataIndex.type]];
        });

        var tp = charts.typesPie;
        tp.data = dt;
        tp.options.colors = sliceColors;
    }

    function createCharts() {
        var container = document.getElementById(typesPieChartId);
        if (container  !== null) {
            charts.typesPie.chart = new google.visualization.PieChart(container);
        }
        container = document.getElementById(colorPieChartId);
        if (container !== null) {
            charts.colorPie.chart = new google.visualization.PieChart(container);
            google.visualization.events.addListener(charts.colorPie.chart, 'select', onColorPieSelect);
        }
        container = document.getElementById(manaCurveChartId);
        if (container !== null) {
            charts.manaCurve.chart = new google.visualization.ColumnChart(container);
            google.visualization.events.addListener(charts.manaCurve.chart, 'select', onManaCurveSelect);
        }
    }

    function setMeanCmc(chartData) {
        var mean = meanConvertedManaCost(chartData).toFixed(2);
        $('#' + meanCmcId).text(mean);
    }

    var landProbabilityTemplate;
    function getLandProbabilityTemplate() {
        landProbabilityTemplate = $('#' + landProbabilitiesId).html();
    }

    function setLandDrawProbabilities(chartData) {
        var probabilities = landProbabilities(getCardTotals(chartData));
        var html = landProbabilityTemplate;
        for (var k = 0; k <= 7; k++) {
            var percent = (probabilities[k] * 100).toFixed(1);
            html = html.replace('[' + k + ']', percent);
        }
        $('#' + landProbabilitiesId).html(html);
    }

    function drawAllCharts() {
        if (hasColorPieChart())
            drawChart(charts.colorPie);
        if (hasManaCurveChart())
            drawChart(charts.manaCurve);
        if (hasTypesPieChart())
            drawChart(charts.typesPie);
    }

    function setAllNonChartSections(chartData) {
        if (hasMeanConvertedManaCost())
            setMeanCmc(chartData);
        if (hasLandProbabilities())
            setLandDrawProbabilities(chartData);
    }

    function wireEvents() {
        $('.mdw-charts-more-button').click(function () {
            $('#mdw-misc-stats-contents').toggle(500);
        });
        $(window).resize(magicArena.utils.debounce(drawAllCharts, 150));
    }

    function changeMoreSpansToButtons() {
        $('.mdw-charts-more-button').replaceWith(function () {
            return $('<input type="button" class="mdw-charts-more-button mdw-chart-box-button" />')
                .val($(this).text());
        });
    }

    function setVisible(visible) {
        $('#mdw-deckcharts-container').toggle(visible);
        $('#mdw-deckcharts-error').toggle(!visible);
    }

    function refresh() {
        var data = getData('mdw-chartdata-pre');
        if (hasNonLands(data)) {
            setVisible(true);
            addHighlightClasses(data, getData('mdw-sideboard-data'));
            cacheColorPieData(data);
            cacheManaCurveData(data);
            cacheTypesPieData(data);
            drawAllCharts();
            setAllNonChartSections(data);
        } else {
            setVisible(false);
        }
    }

    function chartLibraryLoaded() {
        getLandProbabilityTemplate();
        createCharts();
        refresh();
        changeMoreSpansToButtons();
        wireEvents();
        mw.hook('magicarena.chartsready').fire();
    }

    $.getScript('https://www.gstatic.com/charts/loader.js', function () {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(chartLibraryLoaded);
    });

    return {
        refresh: refresh
    };

})(jQuery);