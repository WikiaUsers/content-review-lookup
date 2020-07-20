//=======================
//   AbuseFilter in RC
//=======================
// http://runescape.wikia.com/wiki/User%3ASuppa_chuppa/abuselog.js
$(function() {
	var refreshTimer = null;
	var itemSince = null;
	var itemIds = [];
 
	var loadingHtml = '<img src="https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif" width="16" height="16" alt="Loading..." />';
 
	function articleURL(article) {
		return wgArticlePath.replace('$1', encodeURI(article.replace(/ /g, '_')));
	}
 
	function scriptURL(article) {
		return wgScript + '?title=' + encodeURIComponent(article.replace(/ /g, '_'));
	}
 
	function callAPI(data, method, callback) {
		data['format'] = 'json';
 
		$.ajax({
			data: data,
			dataType: 'json',
			url: wgScriptPath + '/api.php',
			type: method,
			success: function(response) {
				if (response.error) {
					//alert('API error: ' + response.error.info);
				} else {
					callback(response);
				}
			},
			//error: function(xhr, error) { alert('AJAX error: ' + error); },
			timeout: 10000
		});
	}
 
	function reloadComplete() {
		if ($('#abAutoRefresh:checked').length) {
			window.clearTimeout(refreshTimer);
			refreshTimer = window.setTimeout(reloadData, 10 *1000);
		}
		$('#ab_update img').hide();
		$('#abLastUpdate').text((new Date()).toUTCString());
	}
 
	function reloadData() {
		$('#ab_update img').show();
		var itemQuery = {
			'afllimit': '1',
			'action': 'query',
			'list': 'abuselog'
		};
 
		if (itemSince) {
			itemQuery['itemend'] = itemSince;
		}
 
		callAPI(itemQuery, 'GET', function(response) {
			var revs = [];
			var curDate = '';
 
			for (var i in response.query.abuselog) {
				var item = response.query.abuselog[i];
 
				// Remove duplicates which may occur during autorefresh
				if ($.inArray(item.id, itemIds) > -1) {
					continue;
				}
                                if(itemIds.length != 0)
                                     $('#abHeader').nextAll().remove();
				itemIds.push(item.id);
 
				var date = item.timestamp.substring(0, 10);
				var time = item.timestamp.substring(11, 19);
				itemSince = item.timestamp;
 
				$('#abHeader').after(
'<tr class="item_rev">' +
	'<td rowspan="2"><b>' + date + '</b><br/><b>' + time + '</b></td>' +
	'<td>' +
		'<a href="' + articleURL(item.title) + '" target="_blank">' + item.title + '</a> <a href="http://onepiece.wikia.com/index.php?title=Special:AbuseLog&details=' + item.id + '" target="_blank">(diff)</a>' +
	'</td>' +
'<td class="item_user_">' + '<a href="' + articleURL('User:' + item.user) + '" target="_blank">' + item.user + '</a>' + '</td>' +
'</tr><tr class="item_rev_">' +
	'<td class="filter_id"><a href="http://onepiece.wikia.com/wiki/Special:AbuseLog?title=Special%3AAbuseLog&wpSearchFilter=' + item.filter_id + '" target="_blank">Triggered abuse filter: ' + item.filter_id + '</a></td>' +
        '<td>&raquo; ' +
		'<a href="' + articleURL('User_talk:' + item.user) + '" target="_blank">talk</a> &bull; ' +
		'<a href="' + articleURL('Special:Contributions/' + item.user) + '" target="_blank">contribs</a> &bull; ' +
                '<a href="http://onepiece.wikia.com/index.php?title=Special:AbuseLog&wpSearchUser=' + item.user + '" target="_blank">abuse log</a> &bull; ' +
                '<a href="' + articleURL('Special:Block/' + item.user) + '" target="_blank">block</a> ' +
'</td></tr>'
				);
			}
 
			if (revs.length == 0) {
				reloadComplete();
				return;
			}
 
		});
	}
 
	if ((wgPageName == 'Special:RecentChanges') && (wgAction == 'view' || wgAction == 'purge')) {
		$('#ab_options').empty().append(
'<form>' +
	'<fieldset>' +
		'<legend>Abuse Log Watch options</legend>' +
		'<input type="checkbox" id="abAutoRefresh" checked="checked" /> <label for="abAutoRefresh">Auto-refresh table</label>&nbsp;&nbsp;&nbsp;' +
                '<input type="checkbox" id="abRefresh" checked="unchecked" /> <label for="abRefresh">Click here if table gets stuck</label><br />' +
	'</fieldset>' +
'</form>'
		);
 
		$('#ab_update').html('Last update: <span id="abLastUpdate"></span> ' + loadingHtml);
 
		var $table = $('<table >').addClass('wikitable').attr('id', 'ewData').css({'width':'100%', 'font-size':'14px'});
		$table.append(
'<tr id="abHeader">' +
	'<th>Time</th>' +
	'<th>Title</th>' +
	'<th>User</th>' +
'</tr>'
		);
 
		$('#ab_main').empty().append($table);
 
		$('#abRefresh').click(function() {
			$('#abHeader').nextAll().remove();
			itemIds = [];
			itemSince = null;
			reloadData();
		});
 
		reloadData();
	}
});

// Adding table to RC
var ug = wgUserGroups.join(' ');
if ( mw.config.get("wgCanonicalSpecialPageName") === "Recentchanges" && (ug.indexOf('sysop') + ug.indexOf('vstf') + ug.indexOf('staff') + ug.indexOf('helper') > -4) ) {
   $( '#mw-content-text' ).before('<div id="ab_msg"></div><div id="ab_options"></div><div id="ab_update"></div><div id="ab_main"></div>');
}
/* Any JavaScript here will be loaded for all users on every page load. */