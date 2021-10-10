console.log('testing code execution');
mw.loader.getScript('https://cdn.jsdelivr.net/gh/mobalyticshq/mobalytics-widgets/build/mobalytics-widgets.js');
mw.loader.using('mediawiki.api').then(function() {
	if (mw.config.get('wgPageName') != 'Special:TransferWikis') return;
	if (!mw.config.get('wgUserGroups').includes('util')) return;
	var a = new mw.Api();
	var wmUserID = -1;
	var wms = { // this way is far faster than trying to dynamically load the list, and allows to filter by vertical
		25356303: {name: "Atvelonis", wikis: [], vertical: 'T2'},
		25464118: {name: "Cörey", wikis: [], vertical: 'T2'},
		23771723: {name: "KylaraE", wikis: [], vertical: 'MTV'},
		3026053: {name: "Lady Lostris", wikis: [], vertical: 'MTV'},
		25383317: {name: "MannedTooth", wikis: [], vertical: 'GAMES'},
		33183765: {name: "MarkusRost", wikis: [], vertical: 'GAMES'},
		4079189: {name: "Moviesign", wikis: [], vertical: 'T2'},
		40010201: {name: "Mr Pie 5", wikis: [], vertical: 'GAMES'},
		5111231: {name: "Nightsilver", wikis: [], vertical: 'T2'},
		43720538: {name: "OishiiOnIno", wikis: [], vertical: 'GAMES'},
		4133: {name: "Pcj", wikis: [], vertical: 'T2'},
		160289: {name: "ReverieCode", wikis: [], vertical: 'T2'},
		39392448: {name: "RheingoldRiver", wikis: [], vertical: 'GAMES'},
		499247: {name: "Sitb", wikis: [], vertical: 'T2'},
		1824272: {name: "SlyCooperFan1", wikis: [], vertical: 'GAMES'},
		4705324: {name: "Spongebob456", wikis: [], vertical: 'MTV'},
		25805649: {name: "Stygies VIII", wikis: [], vertical: 'ANIME'},
		38791128: {name: "Surafbrov", wikis: [], vertical: 'GAMES'},
		7194: {name: "Tagaziel", wikis: [], vertical: 'GAMES'},
		9346948: {name: "TimeShade", wikis: [], vertical: 'T2'},
		1929113: {name: "TyA", wikis: [], vertical: 'ANIME'},
		28083312: {name: "Ursuul", wikis: [], vertical: 'ANIME'}
	};
	var hideError = function() {
		$('#TWError').hide();
	}
	var showError = function(message) {
		$('#TWError').text(message).show();
	}
	var findWikiManagerID = function(wmName) {
		for (var w in wms) {
			if (wms[w].name == wmName) return w;
		}
		return -1;
	}
	var getWikis = function() {
		if (wmUserID == -1) {
			showError('Wiki manager not set.');
			return;
		}
		hideError();
		if (wms[wmUserID] == null) {
			showError('Wiki manager not found.');
			return;
		}
		a.get({
			action: 'listwikiswithvariable',
			variable_id: 1944,
			value: wmUserID,
			operator: 'LIKE',
			offset: wms[wmUserID].wikis.length,
			limit: 50
		}).done(function(data) {
			hideError();
			for (var i in data.listwikiswithvariable.result) {
				var res = data.listwikiswithvariable.result[i];
				res.city_url = res.city_url.slice(7,res.city_url.length - 1);
				res.city_id = parseInt(i);
				wms[wmUserID].wikis.push(res);
			}
			if (data.listwikiswithvariable.total_count > wms[wmUserID].wikis.length) {
				getWikis();
				return;
			}
			wms[wmUserID].wikis.sort(function(a,b) {
				if (a.city_url < b.city_url) return -1;
				if (a.city_url > b.city_url) return 1;
				return 0;
			});
			showWikis();
		}).fail(function(data) {
			showError('Error getting wikis for this wiki manager.');
		});
	}

	var setWikiManager = function () {
		if (['','#'].includes(location.hash)) return;
		hideError();
		var possWM = decodeURIComponent(location.hash.slice(1)).replace(/_/g,' ');
		$('#TWWikiManager').val(possWM);
		$('#TWWMSubmit').prop('disabled',false);
		wmUserID = findWikiManagerID(possWM);
		if (wmUserID == -1) {
			showError('Wiki manager not found.');
			return;
		}
		getWikis();
	}

	var showWikis = function() {
		var out = '<style>.floatingHeader { position: fixed; top: 40px; visibility: hidden; } .persist-header th { width: 37px; } .persist-header th:first-child { width: 250px; } .persist-area tbody tr:hover { background-color: rgba(195, 191, 191, 0.3); }</style><table class="wikitable persist-area" style="margin: 15px auto;"><thead class="persist-header"><tr><th style="text-align: left; vertical-align: bottom; height: 100px; border:0;">Wiki</th>';
		out += '<th style="font-size: 10px; height: 80px; white-space: nowrap; border:0;"><div style="transform: translate(0px,35px) rotate(315deg); width: 30px;">' + wms[wmUserID].name + '</div></th>';
		for (var w in wms) {
			if (w == wmUserID || wms[w].vertical != wms[wmUserID].vertical) continue;
			out += '<th style="font-size: 10px; height: 80px; white-space: nowrap; border:0;"><div style="transform: translate(0px,35px) rotate(315deg); width: 30px;">' + wms[w].name + '</div></th>';
		}
		out += '<th style="font-size: 10px; height: 80px; white-space: nowrap; border:0;"><div style="transform: translate(0px,35px) rotate(315deg); width: 30px;">None</div></th>';
		out += '</tr></thead><tbody>';
		for (var w in wms[wmUserID].wikis) {
			out += '<tr><td><div style="width:250px; white-space:nowrap; overflow:hidden; text-overflow: ellipsis;">' + wms[wmUserID].wikis[w].city_url + '</div></td>';
			out += '<td style="width:30px;"><input type="radio" name="wiki-'+wms[wmUserID].wikis[w].city_id+'" title="'+wms[wmUserID].name+'" value="'+wmUserID+'" class="current-wm" checked="" /></td>';
			for (var wm in wms) {
				if (wm == wmUserID || wms[wm].vertical != wms[wmUserID].vertical) continue;
				out += '<td style="width:30px;"><input type="radio" name="wiki-'+wms[wmUserID].wikis[w].city_id+'" title="'+wms[wm].name+'" value="'+wm+'" class="new-wm" /></td>';
			}
			out += '<td style="width:30px;"><input type="radio" name="wiki-'+wms[wmUserID].wikis[w].city_id+'" title="None" value="-1" class="new-wm" /></td>';
		}
		out += '</tbody></table>';
		$('#TWForm').html(out).show();
		$('#TWTransferWikisThrobber').css('visibility','hidden');
		$('.new-wm').change(function() {$('#TWTransferWikisSubmit').prop('disabled',false);});
		$('#TWTransferWikisSubmit').click(transferWikis);
		$('#TWTransferWikisReset').click(function() {
			$('.new-wm').prop('checked',false);
			$('.current-wm').prop('checked',true);
		});
		$('#TWSubmit').show();
		var clonedHeaderRow;
		$(".persist-area").each(function() {
			clonedHeaderRow = $(".persist-header", this);
			clonedHeaderRow.before(clonedHeaderRow.clone()).addClass("floatingHeader");
		});
		$(window).scroll(updateTableHeaders).trigger("scroll");
	}

	var transferWikis = function() {
		$('#TWTransferWikisSubmit').prop('disabled',true);
		$('#TWTransferWikisThrobber').css('visibility','visible');
		var prom = [];
		$('.new-wm:checked').each(function() {
			var wikiID = $(this).attr('name').slice(5);
    		var wmID = $(this).val();
    		var action = wmID == -1 ? 'removewikiconfigvariable':'savewikiconfigvariable';
			prom.push(a.postWithEditToken({
				action: action,
				variable_id: 1944,
				wiki_id: wikiID,
				variable_value: wmID,
				reason: 'Mass changing wiki managers'
			}));
		});
		Promise.allSettled(prom)
			.then(function(results) {
				for (var r in results) {
					if (results[r].status == 'rejected') console.log(results[r]);
				}
				$('.new-wm:checked').parent().parent().remove();
				$('#TWTransferWikisThrobber').css('visibility','hidden');
			});
	}

	var updateTableHeaders = function() {
		$(".persist-area").each(function() {
			var el = $(this);
			var offset = el.offset();
			var scrollTop = $(window).scrollTop();
			var floatingHeader = $(".floatingHeader", this);

			if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
				floatingHeader.css("visibility", "visible");
			} else {
				floatingHeader.css("visibility", "hidden");
			}
		});
	}
	$('title').text('Transfer Wikis | Fandom');
	$('#firstHeading').text('Transfer Wikis');
	$('#mw-content-text').html('<div style="margin:0 auto; text-align:center;"><label>Enter a wiki manager username to transfer wikis from: <br><form id="TWWMForm"><input style="margin-top: 0.5em; width: 15em; font-size:20px;" type="text" id="TWWikiManager" /> <button type="submit" class="wds-button" id="TWWMSubmit" disabled>Submit</button></form></div>');
	$('#mw-content-text').append('<div id="TWError" style="display: none; position:relative; border: 2px solid #ff0000; width: 80%; height: 3em; border-radius:10px; margin: 10px auto; text-align: center; padding-top: 10px;font-weight: bold;">&nbsp;</div>');
	$('#mw-content-text').append('<div id="TWForm" style="display: none;"></div>');
	$('#mw-content-text').append('<div id="TWSubmit" style="display: none; background-color: var(--theme-article-background-color--secondary); height: 3em; position: fixed; bottom: 0; left: 73vw; width: 300px; margin-left: -150px; box-shadow: 5px 5px 10px 1px #000; border-radius: 10px 10px 0 0; z-index: 10; text-align: center; padding: 30px 0 50px 0;"><button class="wds-button" id="TWTransferWikisSubmit" disabled>Transfer Wikis</button> <button class="wds-button wds-is-secondary" id="TWTransferWikisReset">Reset</button><div id="TWTransferWikisThrobber" style="visibility:hidden; height: 11px; width: 43px; background-image:url(https://vignette.wikia.nocookie.net/dev/images/d/de/Ajax-loader.gif); margin: 10px auto;"></div></div>');
	$('#TWWikiManager').keyup(function() {
		$('#TWWMSubmit').prop('disabled',$(this).val().trim() == '');
	});
	$('#TWWMForm').on('submit', function() {
		if ($('#TWWikiManager').val().trim() != '') {
			location.hash = $('#TWWikiManager').val().trim().replace(/ /g,'_');
			setWikiManager();
		}
		return false;
	});
	setWikiManager();
});