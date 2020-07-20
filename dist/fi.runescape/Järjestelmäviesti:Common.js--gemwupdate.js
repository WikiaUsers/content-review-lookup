//<nowiki>

//Osa koodista on käyttäjältä [[User:Quarenon/gemwupdate.js]] (engl. wiki. Eli, kiitos Quarenonille.

var button;
addOnloadHook(function() {
	$('#gemw_guide').html('<b>Päivitä tavaran hinta:</b>&nbsp;<button id="updateGEP" onclick="updateGEPrice()">Päivitä hinta</button>');
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
		alert('Kiitos päivittämisestä! Sivu ladataan uudelleen.');
		document.location.replace(wgScript + '?title=' + encodeURIComponent(wgPageName) + '&action=purge');
	} else {
		alert('Päivittämisessä tapahtui virhe.');
		button.disabled = false;
		button.innerHTML = 'Update price';
	}
}

function updateGEPrice() {
	reqs = 0;
	button.disabled = true;
	button.innerHTML = 'Päivitetään hintaa...';
	$.getJSON(crossDomain('http://services.runescape.com/m=itemdb_rs/api/graph/'+$('#GEDBID').html()+'.json', 'anyorigin'), function(data){
		var pricelist = data.contents.daily;
		var names = [];
		window.unixnow = 0;
		for (var name in pricelist) {
			unixnow = Math.max(unixnow,parseInt(name));
		}
		window.price = pricelist[unixnow+''];
		if (price == 0) {
			price = parseInt(prompt("Grand Exchange Databasessa ei ollut hintaa kyseiselle tavaralle. Lisää hinta."));
			if (price%1 != 0) {
				button.disabled = false;
				button.innerHTML = 'Päivitä hinta';
				return false;
			}
		}
		unixnow = Math.round(unixnow/1000);
		window.curprice = parseInt($('#GEPrice').html().replace(/,/g,''));
		window.curdate = Math.round(Date.parse($('#GEDate').html().replace('(UTC)','UTC'))/1000);
		if (price == curprice && curdate > unixnow) {
			alert('Hinta on sama kuin virallisessa GE databasessa.');
			button.disabled = false;
			button.innerHTML = 'Päivitä hinta';
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
		var cPrice = content.match(/\|Price\s*=\s*([\d,]+)/)[0].replace(/\|Price\s*=\s*/,'');
		if (price == parseInt(cPrice.replace(/,/g,'')) && curdate > unixnow) {
			alert('The price is already the same as the price on the official GE database.');
			button.disabled = false;
			button.innerHTML = 'Päivitä hinta';
			return false;
		}
		var cDate = content.match(/\|Date\s*=\s*([^\|\n]+)/)[0].replace(/\|Date\s*=\s*/,'');
		var updated = content.replace(/\|Price\s*=\s*([\d,]+)/, '|Price='+addCommas(price))
			.replace(/\|Last\s*=\s*([\d,]+)/, '|Last='+cPrice)
			.replace(/\|Date\s*=\s*([^\|\n]+)/, '|Date=~~~~~')
			.replace(/\|LastDate\s*=\s*([^\|\n]+)/, '|LastDate='+cDate);
		if (vol) {
			updated = updated.replace(/\|Volume\s*=\s*([\d,\.]+)/,'|Volume='+vol)
				.replace(/\|VolumeDate\s*=\s*([^\|\n]+)/, '|VolumeDate=~~~~~');
		}
		callAPI({
			'minor': 'yes',
			'bot': 'yes',
			'summary': 'Updated GEMW data via script on the exchange page.',
			'action': 'edit',
			'title': wgPageName,
			'basetimestamp': page.revisions[0].timestamp,
			'startimestamp': page.starttimestamp,
			'token': page.edittoken,
			'text': updated
		}, 'POST', function(response) {
			if (response.edit.result == 'Success') {
				GEReqsDone()
			} else {
				GEReqsDone(true);
			}
		});
	});
}

function submitUpdateVols() {
	$.ajax({
		url: crossDomain('http://services.runescape.com/m=itemdb_rs/top100.ws'),
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