(function() {
	var newhash = location.hash.replace(/\.([0-9a-f]{2})/gi, function(match,first) { return String.fromCharCode(parseInt(first,16)); }).replace(/ /g,'_');
	if (newhash&&newhash.match(/#[aiz]=/)) location.hash = newhash
})();

window._GEC = {};

$('.GEdatachart').attr('id', function(c) { return "GEdatachart"+c});
$('.GEdataprices').attr('id', function(c) { return "GEdataprices"+c});
$('.GEChartBox').each(function(c) { $(this).find('.GEChartItems').attr('id', 'GEChartItems'+c)});

//general functions

function cloneObj(a,b) {
	if (typeof(a)!='object') return '';
	if (typeof(b)!='object') b = {};
	for (var key in a) {
		b[key] = a[key];
	}
	return b;
}

function avg(arr,amt,round) {
	amt = amt||arr.length;
	round = Math.pow(10,round||0)
	var avgs = [], list = [];
	for (var i=0;i<arr.length;i++) {
		list[i % amt] = arr[i][1]
		if (i>=amt) {
			avgs.push([arr[i][0], Math.round((sum(list)/list.length) * round)/round]);
		}
	}
	return avgs;
}

function sum(arr) {
	var tot = 0;
	for (var i=0;i<arr.length;i++) {
		tot += parseFloat(arr[i])||0;
	}
	return tot
}

function toKMB(n) {
	n = parseInt((n+'').replace(/,/g,''));
	var neg = n<0?'-':'';
	n = Math.abs(n);
	if (n>=1e10) {
		n = Math.round(n/1e8)/10;
		n += 'B';
	} else if (n>=1e7) {
		n = Math.round(n/1e5)/10;
		n += 'M';
	} else if (n>=1e4) {
		n = Math.round(n/100)/10;
		n += 'K';
	}
	n = neg+n;
	return addCommas(n);
}

$('body').append('\n<div id="GEchartpopup" style="display:none;"><div id="closepopup"><a href="javascript:popupChart(false)">Fechar</a></div><div id="itemstats"></div>'+
'<form action="javascript:addItem(\'popup\')" id="chartPropertiespopup"><label>Média: <input type="number" min="1" id="averagepopup"> dias</label><div class="moreitems">Adicionar mais objetos: <input type="text" id="extraItempopup">&nbsp;<b>Nota:</b> Se adicionares mais objetos, as médias não serão mostradas.</div><button>Submit</button><button type="reset">Reiniciar<span class="resetallfields"> todos os campos</span></button></form><a class="GEPermLink" id="GEPermLinkpopup" title="Link para o gráfico atual." href="javascript:void(0)">Link permanente</a><div id="addedItemspopup"></div>'+
'<div id="GEpopupchart"></div></div>');

//chart-related general functions

function getSeriesIndex(id,match) {
	if (_GEC['chart'+id]) {
		var series = _GEC['chart'+id].series;
		for (var i=0;i<series.length;i++) {
			if (series[i].name.match(match)) {
				return i;
			}	
		}
		return -1;
	}
}

function chartPermLinkUrl() {
	var xt = _GEC.chartpopup.xAxis[0].getExtremes();
	var minDate = (new Date(xt.min)).toDateString().split(' ').slice(1).join('_');
	var maxDate = (new Date(xt.max)).toDateString().split(' ').slice(1).join('_');
	var inputAvg = parseInt($('#averagepopup').val());
	var items = '';
	for (var i=0;i<_GEC.chartpopup.series.length;i++) {
		if (_GEC.chartpopup.series[i].name == 'Navigator' || _GEC.chartpopup.series[i].name.match('average')) continue;
		if (items.length) items += ',';
		items += _GEC.chartpopup.series[i].name.replace(/ /,'_');
	}
	var urlHash = '#t='+minDate+','+maxDate;
	if (!isNaN(inputAvg)) urlHash += '#a='+inputAvg;
	urlHash += '#i='+items;
	var url = 'http://pt.runescape.wikia.com/wiki/Mercado/C'+urlHash;
	return url;
}

_GEC.AIQueue = []; _GEC.AILoaded = []; _GEC.AIData = [];
function addItem(i,it) {
	_GEC.chartid = i
	var item = it||$('#extraItem'+_GEC.chartid).val();
	if (item&&item.length) {
		if ($('#addedItems'+i+' [data-item], #GEdataprices'+i+'[data-item]').map(function() { return $(this).attr('data-item').toLowerCase(); }).get().indexOf(item.toLowerCase())!=-1 || _GEC.AIQueue.indexOf(item.toLowerCase())!=-1) {
			if (!it) alert(item+' já está no gráfico.')
			$('#extraItem'+chartid).val('');
			return false;
		}
		$('#extraItem'+_GEC.chartid).prop('disabled',true);
		$.get('/api.php?action=parse&format=json&page=Exchange:'+encodeURIComponent(item)+'/Data', function(response) {
			if (response.error) {
				var item = decodeURIComponent((this.url.match(/Mercado:([^\/]*)\/Data/)||[])[1]);
				if ($('#extraItem'+_GEC.chartid).val().length) {
					if (response.error.code == 'missingtitle') {
						alert("O objeto "+item+" não foi encontrado.");
					} else {
						alert("Ocorreu um erro ao carregar "+item+".");
					}
				}
				_GEC.AILoaded.push(false);
				if (_GEC.AIData.length && _GEC.AIQueue.length == _GEC.AILoaded.length) loadChartsQueueComplete(_GEC.chartid);
				else {
					if (!_GEC.AIData.length) setChartRange(c);
				}
				$('#extraItem'+_GEC.chartid).prop('disabled',false).val('');
				return false;
			}
			if (response.links) {
				$.get('/api.php?action=parse&format=json&page='+encodeURIComponent(response.links[0]['*']), this.success);
				return false;
			}
			var item = response.parse.title.match(/Mercado:([^\/]*)\/Data/)[1]
			_GEC.AILoaded.push(item);
			var prices = response.parse.text['*'];
			var prices = prices.substring(prices.match(/\d{5,}:\d/).index, prices.match(/<\/p>/).index).split(/,\s/);
			var data = [];
			var thisprice;
			for (var i=0;i<prices.length;i++) {
				if (prices[i].replace(/\s/g,'').length) {
					thisprice = prices[i].split(':');
					data.push([ parseInt(thisprice[0])*1000, parseInt(thisprice[1]) ]);
				}
			}
			_GEC.AIData.push({name: item, data: data, id: item, lineWidth: 2});
			var series = _GEC['chart'+_GEC.chartid].series
			if (getSeriesIndex(_GEC.chartid,'average')!=-1) _GEC['chart'+_GEC.chartid].series[getSeriesIndex(_GEC.chartid,'average')].remove();
			if (_GEC.AIQueue.length == _GEC.AILoaded.length) loadChartsQueueComplete(_GEC.chartid); //This is always true when only 1 item is being loaded.
		});
		_GEC.AIQueue.push(item.toLowerCase())
	} else {
		if ($('#addedItems'+i).html().match(/^\s*$/)) {
			var id = i=='popup'?$('#GEpopupchart').attr('data-chartid'):i;
			var data = getData(id,false,i);
			var series = _GEC['chart'+i].series
			if (getSeriesIndex(i,'average')!=-1) series[getSeriesIndex(i,'average')].remove();
			_GEC['chart'+i].addSeries(data[0][1]);
		}
	}
}

_GEC.addedData = [];
function loadChartsQueueComplete(c) {
	if (getSeriesIndex(_GEC.chartid,'Volume')!=-1) {
		var id = c=='popup'?$('#GEpopupchart').attr('data-chartid'):c;
		var chartdata = getData(id,true);
		chartdata[1].title.text = 'Price history';
		reloadChart(c,{
			series: chartdata[0],
			yAxis: chartdata[1]
		});
	}
	var isSmall = $('#GEdatachart'+c).is('.smallChart')
	var data = new Array(_GEC.AIQueue.length);
	for (var i=0;i<_GEC.AIData.length;i++) {
		var index = _GEC.AIQueue.indexOf((_GEC.AIData[i]||{name:''}).name.toLowerCase());
		data[index!=-1?index:data.length] = _GEC.AIData[i]
	}
	for (var i=0;i<data.length;i++) {
		if (data[i]) _GEC['chart'+c].addSeries(data[i]);
		if (isSmall) {
			if (typeof _GEC.addedData[c] != 'object') _GEC.addedData[c] = [];
			_GEC.addedData[c][i] = data[i]
		}
	}
	setChartExtremes(_GEC.chartid);
	$('#itemstats').hide();
	$('#extraItem'+c).prop('disabled',false).val('');
	var itemhash = (location.hash.match(/#i=[^#]*/)||[])[0]||location.hash + '#i=';
	for (var i=0;i<data.length;i++) {
		if (!data[i]) continue;
		var iname = data[i].name;
		if (!($('#addedItems'+c).html()||'').replace(/\s+/,'').length) {
			$('#addedItems'+c).html('Remover do gráfico: <a href="javascript:removeGraphItem(\''+iname+'\',\''+c+'\')" data-item="'+iname+'">'+iname+'</a>');
			itemhash = '#i='+iname;
		} else {
			$('#addedItems'+c).append(', <a href="javascript:removeGraphItem(\''+iname+'\',\''+c+'\')" data-item="'+iname+'">'+iname+'</a>');
			itemhash += ','+iname;
		}
	}
	if (location.hash.match(/#i=/)) itemhash = location.hash.replace(/#i=[^#]*/,itemhash).replace(/ /g,'_');
	else itemhash = location.hash + itemhash;
	if ((wgNamespaceNumber == 112 && wgTitle.split('/')[1] == 'Data'||wgPageName == 'Grand_Exchange_Market_Watch/Chart') && itemhash.replace('#i=','').length) location.hash = itemhash
	_GEC.AIQueue = [];
	_GEC.AILoaded = [];
	_GEC.AIData = [];
	var hadBlank = removeGraphItem('Blank',c);
	if (hadBlank) {
		setChartRange(c)
	}
}

function setChartRange(c) {
	var zoom = parseInt((location.hash.match(/#z=([^#]*)/)||[])[1])
	zoom = zoom&&zoom<=6&&zoom>=0?zoom-1:(zoom==0?0:2);
	var hash = location.hash;
	var hasT = wgNamespaceNumber == 112 && wgTitle.split('/')[1] == 'Data' || wgPageName == 'Grand_Exchange_Market_Watch/Chart';
	if (typeof c == 'number' && (hasT && !hash.match('#t=') || !hasT)) {
		$('#GEdatachart'+c+' .zoomButton').eq(zoom).click();
		return true;
	}
	var timespan = unescape((hash.match(/#t=([^#]*)/)||[])[1]||'').replace(/_/g,' ').split(',')
	var dates = [new Date(timespan[0]), new Date(timespan[1])];
	var d = new Date(timespan[0]);
	var extremes = _GEC['chart'+c].xAxis[0].getExtremes();
	if (dates[0] != 'Invalid Date' && dates[1] == 'Invalid Date' && typeof(zoom) == 'number') {
		var button = _GEC['chart'+c].rangeSelector.buttonOptions[zoom];
		if (button.type == 'month') {
			d.setMonth(d.getMonth() + button.count);
		} else if (button.type == 'year') {
			d.setYear(d.getFullYear() + button.count);
		} else if (button.type == 'all') {
			d = new Date(extremes.dataMax);
		}
		dates[1] = d;
	}
	if (dates[0] != 'Invalid Date' && dates[1] != 'Invalid Date') {
		_GEC['chart'+c].xAxis[0].setExtremes(dates[0].getTime(), dates[1].getTime());
		return true;
	}
	return false;
}

function reloadChart(c,change) {
	if (!_GEC['chart'+c].options) {return false;}
	for (var i in change) {
		_GEC['chart'+c].options[i] = change[i];
	}
	_GEC['chart'+c] = new Highcharts.StockChart(_GEC['chart'+c].options);
}

function removeGraphItem(item,c) {
	var id;
	for (var i=0;i<_GEC['chart'+c].series.length;i++) {
		if (_GEC['chart'+c].series[i].name.match(item)) {
			id = i;
		}
	}
	if (typeof id != 'number') return false;
	var newhash = location.hash.replace(/_/g,' ').replace(new RegExp('(#i=[^#]*),?'+item,'i'),'$1').replace(/,,/g,',').replace(/,#/g,'#').replace(/#i=,/g,'#i=').replace(/#i=($|#)/,'$1').replace(/ /g,'_');
	if (newhash.replace('#i=','').length) location.hash = newhash;
	else if (location.hash.length) location.hash = '';
	_GEC['chart'+c].series[id].remove();
	setChartExtremes(c)
	$('#addedItems'+c+' [data-item="'+item+'"]').remove()
	$('#addedItems'+c).html($('#addedItems'+c).html().replace(/, , /g,', ').replace(/, $/,'').replace(': , ',': '));
	if (!$('#addedItems'+c+' [data-item]').length) {
		$('#addedItems'+c).empty();
		var id = c == 'popup'? $('#GEpopupchart').attr('data-chartid') : c;
		var data = getData(id,false);
		reloadChart(c,{
			series: data[0],
			yAxis: data[1]
		});
		$('#itemstats').show();
	}
	return true;
}

function popupChart(i) {
	if (!$('#GEchartpopup').length) return false;
	if ($('#overlay').length) {
		$('#overlay').toggle();
	} else {
		$('#GEchartpopup').before('<div id="overlay" style="display:block;"></div>');
	}
	document.getElementById('overlay').onclick = popupChart;
	if (typeof(i)=='number') {
		onkeydown = function(e) { if (e.which == 27) popupChart(false); }
	} else {
		onkeydown = function() {};
	}
	$('#GEchartpopup').toggle();
	if (typeof(i)=='number' && $('#GEpopupchart').attr('data-chartid') != i) {
		$('#averagepopup').val(_GEC.average);
		addPopupPriceInfo(i)
		$('#GEpopupchart').attr('data-chartid',i);
		var options = {}
		cloneObj(_GEC['chart'+i].options,options);
			options.chart.renderTo = 'GEpopupchart';
			options.legend.enabled = true;
			options.title.text = 'Mercado';
			options.title.style.fontSize = '18px';
			options.subtitle.text = options.series[0].name;
			options.subtitle.style.fontSize = '15px;';
			options.chart.zoomType = '';
			options.rangeSelector.enabled = true;
			options.rangeSelector.inputBoxStyle.display = 'block';
			options.plotOptions.series.enableMouseTracking = true;
			options.tooltip.enabled = true;
			options.navigator.enabled = true;
			options.credits.enabled = false;
			options.series = [{}];
			var data = getData(i,false);
			options.series = _GEC.addedData[i]?[data[0][0]]:data[0];
			options.yAxis = data[1];
		_GEC.chartpopup = new Highcharts.StockChart(options);
		if (_GEC.addedData[i]) {
			for (var n=0;n<_GEC.addedData[i].length;n++) {
				_GEC.chartpopup.addSeries(_GEC.addedData[i][n]);
			}
		}
		setChartExtremes('popup');
		_GEC.chartpopup.redraw();
	}
	$('#GEPermLinkpopup').get(0).href = chartPermLinkUrl();
}

function setChartExtremes(i) {
	extremes = _GEC['chart'+i].yAxis[0].getExtremes();
	if (extremes.dataMin * 0.95 != extremes.userMin || extremes.dataMax * 1.05 != extremes.userMax) {
		_GEC['chart'+i].yAxis[0].setExtremes(extremes.dataMin * 0.95, extremes.dataMax * 1.05);
		if (_GEC['chart'+i].yAxis[2]) { 
			extremes = _GEC['chart'+i].yAxis[1].getExtremes();
			_GEC['chart'+i].yAxis[1].setExtremes(0, extremes.dataMax * 0.35);
		}
	}
	if (i == 'popup') $('#GEPermLink'+i).get(0).href = chartPermLinkUrl();
}

function addPopupPriceInfo(c) {
	if (($('#GEdataprices'+c).attr('data-item')||'').match(/index/i)) return false;
	var prices = $('#GEdataprices'+c).html().split(/,\s/);
	var data = [];
	var curprice;
	for (var i=0;i<prices.length;i++) {
		if (prices[i].replace(/\s/g,'').length) {
			curprice = prices[i].split(':');
			data.push(parseInt(curprice[1]));
		}
	}
	var datal = data.length
	var curprice = data[datal-1]
	var priceDiffs = [], percentDiffs = [];
	var dayDiffs = [1,7,30,90,180];
	for (var i=0;i<dayDiffs.length;i++) {
		var pthen = data[datal-dayDiffs[i]-1];
		var pdiff = curprice - pthen;
		if (!isNaN(pdiff)) {
			priceDiffs.push(pdiff);
			percentDiffs.push(Math.round(pdiff / pthen * 1000)/10);
		} else {
			dayDiffs.slice(0,i+1);
		}
	}
	function rg(n) {
		return n>0?'green':(n==0?'blue':'red');
	}
	var itemStats = '<table class="wikitable">'+
	'<caption onclick="$(this).next(\'tbody\').toggle();$(this).children().toggle()"><span style="display:none;white-space:nowrap">Info do Preço</span><span>Fechar</span></caption><tbody>'+
	'<tr><th>Price</th><td>'+toKMB(curprice)+'</td></tr>';
	for (var i=0;i<priceDiffs.length;i++) {
		itemStats += '<tr><th>'+dayDiffs[i]+'-day</th><td style="color:'+rg(priceDiffs[i])+'">'+(priceDiffs[i]>0?'+':'')+toKMB(priceDiffs[i])+' ('+percentDiffs[i]+'%)</td></tr>';
	}
	itemStats += $('#GEdataprices'+c).attr('data-value').length?'<tr><th><a href="/wiki/Value" target="_blank" title="Value">Valor</a></th><td>'+toKMB($('#GEdataprices'+c).attr('data-value'))+'</td></tr>':'';
	itemStats += $('#GEdataprices'+c).attr('data-limit').length?'<tr><th><a href="/wiki/Grand_Exchange#Trade_Restrictions" target="_blank">Limite de compra</a></th><td>'+toKMB($('#GEdataprices'+c).attr('data-limit'))+'</td></tr>':'';
	itemStats += '<tr><th colspan="2"><a href="/wiki/Mercado:'+encodeURI($('#GEdataprices'+c).attr('data-item'))+'" target="_blank" title="'+$('#GEdataprices'+c).attr('data-item')+'">Mais info</a></th></tr>';
	itemStats += '</tbody></table>';
	$('#itemstats').html(itemStats);
}

function getData(c,isSmall,avginput) {
	var isIndexChart = !!($('#GEdataprices'+c).attr('data-item')||'').match(/index/i);
	avginput = avginput||c;
	var itemName = $('#GEdataprices'+c).attr('data-item');
	itemName = itemName || wgPageName.replace(/_/g,' ').split('/')[0].replace('Mercado:','');
	var prices = $('#GEdataprices'+c).html().split(/,\s/);
	var data = [];
	var thisprice;
	var volumes = [];
	for (var i=0;i<prices.length;i++) {
		if (prices[i].replace(/\s/g,'').length) {
			thisprice = prices[i].split(':');
			data.push([ parseInt(thisprice[0])*1000, parseFloat(thisprice[1]) ]);
			if (thisprice[2]&&!isSmall) {
				volumes.push([ parseInt(thisprice[0])*1000, parseFloat(thisprice[2])*1000000 ]); //volumes are in millions
			}
		}
	}

	var dataList = [{
		name: itemName,
		data: data,
		lineWidth: isSmall?2:3
	}]
	if (itemName.toLowerCase()=='blank') dataList[0].color = '#000000';
	if (!isSmall&&itemName.toLowerCase()!='blank') {
		var inputAvg = parseInt($('input#average'+avginput).val());
		if (inputAvg) {
			var newhash = location.hash.replace(/#a=[^#]*|$/,'#a='+inputAvg).replace(/ /g,'_');
			if (newhash.length) location.hash = newhash
		}
		inputAvg = inputAvg||30;
		dataList.push({
			name: 'Média de '+inputAvg+' dias',
			data: avg(data,inputAvg,isIndexChart?2:0),
			lineWidth: 2,
			dashStyle: 'shortdash',
		});
		if (volumes.length >= 10) {
			dataList.push({
				name: 'Volume',
				data: volumes,
				type: 'area',
				color: '#cc8400',
				fillColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [[0, '#ffa500'], [1, 'white']],
				},
				yAxis: 1,
			});
		}
	}
	var yAxis = {};
	if (volumes.length >= 10&&!isSmall) {
		yAxis = [{
			title: {
				text: 'Histórico do preço',
				offset: 60,
				style: {
					color: 'black',
					fontSize: '12px',
				},
			},
			labels: {
				align: 'right',
				x: -8, y: 4,
			},
			allowDecimals: isIndexChart,
			minTickInterval: 1,  //1 coin
			showLastLabel: 1,
			lineWidth: 1,
			lineColor: '#E0E0E0',
			height: 225,
		}, {
			title: {
				text: 'Volume de trocas',
				offset: 60,
				style: {
					color: 'black',
					fontSize: '12px',
				},
			},
			labels: {
				align: 'right',
				x: -8, y: 4,
			},
			showEmpty: 0,
			showLastLabel: 1,
			offset: 0,
			lineWidth: 1,
			lineColor: '#E0E0E0',
			height: 75,
			top: 325,
			min: 0
		}];
	} else {
		yAxis = {
			title: {
				text: isSmall ? null : 'Histórico',
				offset: 60,
				style: {
					color: 'black',
					fontSize: '12px',
				},
			},
			labels: {
				align: 'right',
				x: -8, y: 4,
			},
			allowDecimals: isIndexChart,
			minTickInterval: 1,  //1 coin
			showLastLabel: 1,
			lineWidth: 1,
			lineColor: '#E0E0E0',
		}
	}
	return [dataList,yAxis];
}

Highcharts.setOptions({
	lang: {
		resetZoom: '<span style="font-size:11px;">repor zoom</span>',
		numericSymbols: ['K', 'M', 'B', 'T', 'Qd', 'Qt'],
	}
});    

_GEC.average = parseInt((location.hash.match(/#a=([^#]*)/)||[])[1])||'';

$('div.GEdatachart').each(function(c) {

if (!$('#GEdataprices'+c).length) {return;}

var isSmall = $('#GEdatachart'+c).is('.smallChart');
var isIndexChart = !!($('#GEdataprices'+c).attr('data-item')||'').match(/index/i);
var isInfobox = $('#GEdataprices'+c).is('.infobox *, .infobar *');

//setting up the form and chart elements

if (!isSmall) {
	$('#GEdatachart'+c).before('<form action="javascript:addItem('+c+')" id="chartProperties'+c+'"><label>Média: <input type="number" min="1" id="average'+c+'" value="'+_GEC.average+'"> dias</label>'+(isIndexChart?'':'<br/>Adicionar mais objetos: <input type="text" id="extraItem'+c+'">&nbsp;<b>Nota:</b> Se adicionares mais objetos, as médias não serão mostradas.')+'<br/><button>Enviar</button><input type="reset" value="Reiniciar'+(isIndexChart?'':' todos os campos')+'"/></form>'+(wgNamespaceNumber == 112 && wgTitle.split('/')[1] == 'Data'||wgPageName == 'Grand_Exchange_Market_Watch/Chart' ? '<a class="GEPermLink" id="GEPermLink'+c+'" title="Hiperligação permanente para as configurações atuais do gráfico. Clica com o botão direito para copiar o url." href="javascript:void(0)">Hiperligação permanente</a>':'')+'<div id="addedItems'+c+'"></div>');
}

/*GENERATING THE CHART - INITIAL LOAD*/
var data = [];
var itemName = $('#GEdataprices'+c).attr('data-item');
itemName = itemName || wgPageName.replace(/_/g,' ').split('/')[0].replace('Mercado:','');
var dataList = getData(c,isSmall);
var yAxis = dataList[1];
dataList = dataList[0];
if (itemName.toLowerCase()=='blank') {
	var zoom;
} else {
	var zoom = parseInt((location.hash.match(/#z=([^#]*)/)||[])[1])
	zoom = zoom && zoom <= 6 && zoom >= 0 ? zoom-1 : (zoom == 0 ? 0 : 2);
}
var enlarge = '<a href="javascript:popupChart('+c+');" style="text-decoration:underline;">Expandir</a>';

//generating the chart
_GEC['chart'+c] = new Highcharts.StockChart({
	chart: {
		renderTo: 'GEdatachart'+c,
		backgroundColor: 'white',
		plotBackgroundColor: 'white',
		zoomType: isSmall?'x':'',
		events: {
			redraw: function() {
				_GEC.thisid = this.renderTo.id.replace('GEdatachart','').replace('GEpopupchart','popup');
				setTimeout(function() {setChartExtremes(_GEC.thisid);},0);
			}
		},
	},
	legend: {
		enabled: !isSmall,
		backgroundColor: 'white',
		align: 'right',
		layout: 'vertical',
		verticalAlign: 'top',
		y: 75
	},
	title: {
		text: isSmall?(isInfobox?enlarge:itemName):'Mercado',
		style: {
			color: 'black',
			fontSize: isSmall?(enlarge?'13px':'15px'):'18px',
		},
	},
	subtitle: {
		text: isSmall?(isInfobox?null:enlarge):(itemName.toLowerCase()=='blank'?'Gráfico histórico':itemName),
		y: 35,
		style: {
			color: '#666',
			fontSize: isSmall?'13px':'15px',
		},
	},
	rangeSelector: {
		enabled: !isSmall,
		selected: zoom,
		inputBoxStyle: {
			right: '15px',
			display: isSmall?'none':'block'
		},
		inputStyle: {
			width: '100px',
		},
		inputDateFormat: "%e-%b-%Y",
		buttonTheme: {
			class: 'zoomButton',
		},
		buttons: [{
			type: 'month',
			count: 1,
			text: '1m'
		}, {
			type: 'month',
			count: 2,
			text: '2m'
		}, {
			type: 'month',
			count: 3,
			text: '3m'
		}, {
			type: 'month',
			count: 6,
			text: '6m'
		}, {
			type: 'year',
			count: 1,
			text: '1a'
		}, {
			type: 'all',
			text: 'Tudo'
		}]
	},
	plotOptions: {
		series: {
			enableMouseTracking: !isSmall,
			dataGrouping: {
				dateTimeLabelFormats: {
					day: ['%A, %e %B %Y', '%A, %e %B', '-%A, %e %B %Y'],
					week: ['Week from %A, %e %B %Y', '%A, %e %B', '-%A, %e %B %Y'],
					month: ['%B %Y', '%B', '-%B %Y'],
					year: ['%Y', '%Y', '-%Y']
				}
			}
		}
	},
	tooltip: {
		enabled: !isSmall,
		valueDecimals: isIndexChart?2:0,
		headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
		xDateFormat: "%A, %e %B %Y",
	},
	navigator: {
		xAxis: {
			dateTimeLabelFormats: {
				day: "%e-%b",
				week: "%e-%b",
				month: "%b-%Y",
				year: "%Y",
			},
			minTickInterval: 24 * 3600 * 1000, //1 day
		},
		maskFill: 'none',
		enabled: !isSmall
	},
	credits: {
		enabled: false,
	},
	xAxis: [{
		lineColor: '#666',
		tickColor: '#666',
		dateTimeLabelFormats: {
			day: "%e-%b",
			week: "%e-%b",
			month: "%b-%Y",
			year: "%Y",
		},
		minTickInterval: 24 * 3600 * 1000, //1 day
	}],
	yAxis: yAxis,
	series: dataList,
	colors: window.GEMWChartColors||['#4572A7','#AA4643','#89A54E','#80699B','#3D96AE','#DB843D','#92A8CD','#A47D7C','#B5CA92']
});

var items = ($('#GEChartItems'+c).html()||'').split(',');
var noAdd = []
for (var i=0;i<items.length;i++) {
	if (!items[i].match(/^\s*$/)) addItem(0,items[i]);
	else noAdd.push(1);
}
if (items.length==noAdd.length&&_GEC['chart'+c].series[0].name.toLowerCase()!='blank') setChartRange(c);

/*END CODE GENERATING THE CHART - INITIAL LOAD*/

//adjusting the axes extremes (initial load)
setChartExtremes(c)

//loading the chart and additional price info when the page is ready
if ((wgNamespaceNumber == 112 && wgTitle.split('/')[1] == 'Data'||wgPageName == 'Grand_Exchange_Market_Watch/Chart') && location.hash.match('#i=')) {
	var hash = location.hash;
	var items = unescape((hash.match(/#i=([^#]*)/)||[])[1]||'').replace(/_/g,' ').split(',')
	for (var i=0;i<items.length;i++) {
		if (!items[i].match(/^\s*$/)) addItem(0,items[i]);
	}
}

})//exit c