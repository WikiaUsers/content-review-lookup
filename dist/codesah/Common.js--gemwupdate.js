//<nowiki>

//Parte de este script ha sido copiada de [[Usuario:Quarenon/gemwupdate.js]]. El crédito es de Quarenon por escribir dicho código.

var button;
addOnloadHook(function() {
	$('#gemw_guide').html('<b>Actualizar precio:</b>&nbsp;<button id="updateGEP" onclick="updateGEPrice()">Actualizar precio</button>');
	button = document.getElementById('updateGEP');
})

function crossDomain(u,s) {
	if (s=='yahoo') {
		return 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20"'+encodeURIComponent(u)+'"%20and%20xpath%3D"*"&format=json&_maxage=900';
	} else if (s=='anyorigin') {
		return 'http://anyorigin.com/get?url='+encodeURIComponent(u)+'&callback=?';
	} else {
		return 'http://whateverorigin.org/get?url='+encodeURIComponent(u)+'&callback=?';
	}
}

function millbill(n) {
	var mb = (n.match(/[a-zA-Z]/)||[''])[0]
	if (mb == 'b') mb = 1000;
	else mb = 1;
	return parseFloat(n) * mb;
}

function GEReqsDone(failed) {
	if (!failed) {
		alert('Ha ocurrido un error mientras se guardaba la edición.');
		button.disabled = false;
		button.innerHTML = 'Actualizar precio';
	} else {
		alert('¡Gracias por tu colaboración! La página ahora se recargará...');
		document.location.replace(wgScript + '?title=' + encodeURIComponent(wgPageName) + '&action=purge');
	}
}

function updateGEPrice() {
	reqs = 0;
	button.disabled = true;
	button.innerHTML = 'Actualizando precio...';
	$.getJSON(crossDomain('http://services.runescape.com/m=itemdb_rs/l=6/api/graph/'+$('#GEDBID').html()+'.json', 'anyorigin'), function(data){
		var pricelist = data.contents.daily;
		var names = [];
		window.unixnow = 0;
		for (var name in pricelist) {
			unixnow = Math.max(unixnow,parseInt(name));
		}
		window.price = pricelist[unixnow+''];
		if (price == 0) {
			price = parseInt(prompt("La base de datos oficial del GM no tiene un precio archivado en este momento. Por favor revise el precio del objeto dentro del juego, e insértelo en la página."));
			if (price%1 != 0) {
				button.disabled = false;
				button.innerHTML = 'Actualizar precio';
				return false;
			}
		}
		unixnow = Math.round(unixnow/1000);
		window.curprice = parseInt($('#GEPrice').html().replace(/,/g,''));
		window.curdate = Math.round(Date.parse($('#GEDate').html().replace('(UTC)','UTC'))/1000);
		if (price == curprice && curdate > unixnow) {
			alert('El precio ya es igual al precio en la base de datos oficial del GM.');
			button.disabled = false;
			button.innerHTML = 'Actualizar precio';
			return false;
		}
		if ($('#volumeData').length) {
			submitUpdateVols();
		} else {
			submitUpdates();
		}
	});
}

function submitUpdates(vol) {
	callAPI({
		'action': 'query',
		'prop': 'info|revisions',
		'intoken': 'edit',
		'titles': wgPageName,
		'rvprop': 'content',
		'rvlimit': '1',
		'indexpageids': 'true'
	}, 'GET', function(response) {
		var page = response.query.pages[response.query.pageids[0]];
		var content = page.revisions[0]['*'];
		var cPrice = content.match(/\|Precio\s*=\s*([\d,]+)/)[0].replace(/\|Precio\s*=\s*/,'');
		if (price == parseInt(cPrice.replace(/,/g,'')) && curdate > unixnow) {
			alert('El precio ya es igual al precio en la base de datos oficial del GM.');
			button.disabled = false;
			button.innerHTML = 'Actualizar precio';
			return false;
		}
		var cDate = content.match(/\|Fecha\s*=\s*([^\|\n]+)/)[0].replace(/\|Fecha\s*=\s*/,'');
		var updated = content.replace(/\|Precio\s*=\s*([\d,]+)/, '|Precio='+addCommas(price))
			.replace(/\|Último\s*=\s*([\d,]+)/, '|Último='+cPrice)
			.replace(/\|Fecha\s*=\s*([^\|\n]+)/, '|Fecha={{subst:#time:H:i j "{{subst:#switch:{{subst:#time:M}}|ene=jan|abr=apr|ago=aug|dic=dec|#default={{#time:M}}}}" Y "(UTC)"}}')
			.replace(/\|ÚltimaFecha\s*=\s*([^\|\n]+)/, '|ÚltimaFecha='+cDate);
		if (vol) {
			updated = updated.replace(/\|Volumen\s*=\s*([\d,\.]+)/,'|Volumen='+vol)
				.replace(/\|FechaVolumen\s*=\s*([^\|\n]+)/, '|FechaVolumen={{subst:#time:H:i j "{{subst:#switch:{{subst:#time:M}}|ene=jan|abr=apr|ago=aug|dic=dec|#default={{#time:M}}}}" Y "(UTC)"}}');
		}
		callAPI({
			'minor': 'yes',
			'bot': 'yes',
			'summary': 'Data GEMW actualizada vía script en la página Exchange:.',
			'action': 'edit',
			'title': wgPageName,
			'basetimestamp': page.revisions[0].timestamp,
			'startimestamp': page.starttimestamp,
			'token': page.edittoken,
			'text': updated
		}, 'POST', function(response) {
			if (response.edit.result == 'Éxito') {
				GEReqsDone()
			} else {
				GEReqsDone(true);
			}
		});
	});
}

function submitUpdateVols() {
	$.ajax({
		url: crossDomain('http://services.runescape.com/m=itemdb_rs/l=6/top100.ws'),
		success: function(result) {
			var HTML = (result.contents||result.results[0]);
			if (!HTML || !HTML.length) return submitUpdates();
			var tablestr = HTML.replace(/src=/g, 'data-src=').substring(HTML.match(/<table/).index, HTML.match(/<\/table>/).index);
			var table = $(tablestr).children('tbody');
			var imgs = table.find('.item img');
			var ttcElems = table.find('td:nth-child(6)');
			if (ttcElems.length == ttcElems.find('p').length) ttcElems = ttcElems.find('p');
			var ttcVals = {};
			ttcElems.each(function(i) {
				var itemid = imgs.eq(i).attr('data-src').match(/id=(\d+)/)[1];
				ttcVals[itemid] = millbill(ttcElems.eq(i).html());
			});
			if (ttcVals[$('#GEDBID').html()]) {
				submitUpdates(ttcVals[$('#GEDBID').html()]);
			} else {
				submitUpdates();
			}
		},
		dataType: 'json',
	})
}