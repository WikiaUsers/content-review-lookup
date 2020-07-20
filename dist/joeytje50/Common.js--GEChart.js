var itemsParam = unescape(getUrlParam('items')).split(',');
var isSmall = $('#GEdatachart').is('.smallChart');

//general functions

function getUrlParam(param) {
	var param = document.location.search.substring(1).match(new RegExp(param+'=([^&#=]*)'));
	return param?param[1]:'';
}

Array.prototype.avg = function(amt) {
	amt = amt?amt:this.length;
	var avgs = [], list = [];
	for (var i=0;i<this.length;i++) {
		if (i>=amt) {
			avgs.push([this[i][0], avg(list)]);
		}
		list[i % amt] = this[i][1]
	}
	return avgs;
}

function avg(arr) {
	var tot = 0
	for (var i=0;i<arr.length;i++) {
		tot += parseFloat(arr[i])?parseFloat(arr[i]):0;
	}
	tot = Math.round(tot);
	return Math.round(tot/arr.length);
}

if ($('#GEdataprices').length) {

//chart-related general functions

var items,vals,id,n,datalist,lastFilled,req,item;
function getExtraItem() {
	items = [];
	item = {};
	vals = '';
	$('[id^="item"]').each(function() {
		items.push($(this).val());
		vals += $(this).val();
	});
	if (vals.length) {
		datalist = []
		n = 2;
		var i = 2;
		lastFilled = -1
		$('[id^="item"]').each(function(i) {
			id = $(this).attr('id')
			item[id] = $(this).val();
			if (item[id]&&item[id].length&&lastFilled==i-1) {
				req = $.get('/wiki/Exchange:'+item[id]+'/Data?action=render', function(a) {
					var prices = a.replace(/(.|\n)*<p[^>]*>\n?|<\/p>(.|\n)*/g, '').split(/,\s/);
					var data = [];
					var thisprice;
					for (var i=0;i<prices.length;i++) {
						thisprice = prices[i].split(':');
						data.push([ parseInt(thisprice[0])*1000, parseInt(thisprice[1]) ]);
					}
					datalist.push({name:item['item'+n], data:data, lineWidth: 2, tooltip: {	valueDecimals: 0} });
					n++;
				});
				lastFilled = i;
			} else { req.success(function() {loadChart(datalist)}); }
		});
	} else {loadChart()}
}

function popupChart() {
	if (!$('#GEchartpopup').length) return false;
	if ($('#overlay').length) {
		$('#overlay').toggle();
	} else {
		$('#GEchartpopup').before('<div id="overlay" style="display:block;"></div>');
		$('#overlay').click(popupChart);
	}
	$('#GEchartpopup').toggle();
}

//setting up the form and chart elements

if (isSmall) {
	$('#GEdatachart').after('\n<div id="GEchartpopup" style="display:none; position:fixed;min-width:650px;min-height:400px;width:80%;height:80%;left:10%;top:10%;z-index:1000000;background:white;border:2px solid black;padding:5px;"><a href="javascript:popupChart()" style="float:right;z-index:100">Close popup</a><div id="GEpopupchart"></div></div>');
}

$(isSmall?'#GEpopupchart':'#GEdatachart').before('<form action="javascript:getExtraItem()" id="chartProperties"><label>Average: <input type="number" min="1" id="average"> days</label><br/>Add more item(s): <input type="text" id="item2" value="'+itemsParam[0]+'"><input type="text" id="item3" value="'+(itemsParam[1]||'" disabled="disabled')+'"><input type="text" id="item4" value="'+(itemsParam[2]||'" disabled="disabled')+'"><input type="text" id="item5" value="'+(itemsParam[3]||'"  disabled="disabled')+'"><br/><button>Submit</button> - If you add more items, the averages will not be shown.</form>');

$('[id^="item"]').keyup(function() {
	if ($(this).val().length) $(this).next().removeAttr('disabled');
	else if (!$(this).val().length) $(this).nextAll('input[id^="item"]').attr('disabled','disabled');
});
$('[id^="item"]:not(:disabled)').next().removeAttr('disabled');

//the chart function

var cLoaded = false;

function loadChart(item2) {
var itemName = $('#GEdataprices').attr('data-item');
itemName = itemName.length?itemName:wgPageName.replace(/_/g,' ').split('/')[0].replace('Exchange:','')
var prices = $('#GEdataprices').html().split(/,\s/);
var data = [];
var thisprice;
var volumes = [];
var minmax = [0,0];
for (var i=0;i<prices.length;i++) {
	thisprice = prices[i].split(':');
	if (prices[i].replace(/\s/g,'').length) {
		data.push([ parseInt(thisprice[0])*1000, parseInt(thisprice[1]) ]);
		if (thisprice[2]&&!isSmall) {
			volumes.push([ parseInt(thisprice[0])*1000, parseInt(thisprice[2])*1000000 ]);
		}
		if (i > prices.length-30) {
			if (!minmax[0] || parseInt(thisprice[1]) < minmax[0]) {
				minmax[0] = parseInt(thisprice[1]);
			}
			if (parseInt(thisprice[1]) > minmax[1]) {
				minmax[1] = parseInt(thisprice[1]);
			}
		}
	}
}

//generating the dataList

var dataList = [{
		name: itemName,
		data: data,
		lineWidth: 2,
		tooltip: {
			valueDecimals: 0
		}
	}]
if (item2&&item2.length&&!isSmall) {
	for (i=0;i<item2.length;i++) {
		dataList.push(item2[i]);
	}
} else if (!isSmall||cLoaded) {
	dataList.push({
		name: '7-day average',
		data: data.avg(7),
		tooltip: {
			valueDecimals: 0
		}
	},{
		name: '30-day average',
		data: data.avg(30),
		tooltip: {
			valueDecimals: 0
		}
	});
	var inputAvg = parseInt($('input#average').val());
	if (inputAvg)
		dataList.push({
			name: inputAvg+'-day average',
			data: data.avg(inputAvg),
		});
	if (volumes.length)
		dataList.push({
			name: 'Volume',
			data: volumes,
			type: 'column',
			yAxis: 1
		});
}

//Adding in the volumes chart properties and the minmax lines

var yAxis = {};
var plotLines = [{
	color: 'green',
	dashStyle: 'dash',
	width: isSmall?1:2,
	value: minmax[0],
	label: {
		align: 'right',
		x: 0, y: 12,
		text: '30-day min'+(isSmall?'':'imum')+': '+minmax[0]
	},
	zIndex: 6
}, {
	color: 'red',
	dashStyle: 'dash',
	width: isSmall?1:2,
	value: minmax[1],
	label: {
		align: 'right',
		x: 0, y: -5,
		text: '30-day max'+(isSmall?'':'imum')+': '+minmax[1]
	},
	zIndex: 6
}]
var chartHeight = $(cLoaded&&isSmall?'#GEpopupchart':'#GEdatachart').height();
if (volumes.length&&(!isSmall||cLoaded)&&!(item2&&item2.length)) {
	yAxis = [{
		title: {
			text: 'Price history'
		},
		height: chartHeight*2/5,
		plotLines: plotLines,
		offset: 33
	}, {
		title: {
			text: 'Trade volume'
		},
		height: chartHeight/5,
		top: chartHeight*2/5+100,
		offset: 33
	}]
} else if (!(item2&&item2.length)) {
	yAxis = {
		plotLines: plotLines
	}
}

//Generating the chart

window.chart = new Highcharts.StockChart({
	credits: {
		enabled: isSmall&&!cLoaded,
		href: 'javascript:popupChart()',
		text: 'Enlarge chart'
	},
	chart: {
		renderTo: cLoaded&&isSmall?'GEpopupchart':'GEdatachart'
	},
	legend: {
		enabled: !isSmall||cLoaded,
		align: 'right',
		layout: 'vertical',
		verticalAlign: 'top',
		y: 55
	},
	title: {
		text: isSmall&&!cLoaded?null:'Grand Exchange Market Watch'
	},
	subtitle: {
		text: isSmall&&!cLoaded?null:itemName
	},
	series: dataList,
	rangeSelector: {
		selected: 1,
		inputBoxStyle: {
			display: isSmall&&!cLoaded?'none':'block'
		},
	},
	tooltip: {
		enabled: !isSmall||cLoaded,
		valueDecimals: 0
	},
	yAxis: yAxis
			
});
if (!cLoaded&&isSmall) {
	cLoaded = true;
	getExtraItem();
}

}

//loading the chart when the page's ready

$(function() {getExtraItem()});

}