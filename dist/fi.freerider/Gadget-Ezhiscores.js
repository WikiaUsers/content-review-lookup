var ezHiscoresReminder = 24;
var ezHiscoresLog = 1;
$(document).ready(function() {
	function setCookie(name, value, expires) {
		name = 'ezHiscores_' + name;
 
		var d = new Date();
		d.setDate(d.getDate() + expires);
		document.cookie = name + '=' + escape(value) + ((expires == null) ? '' : ';expires=' + d.toGMTString()) + ';path=/';
	}
 
	function getCookie(name) {
		name = 'ezHiscores_' + name;
 
		if (document.cookie.length > 0) {
			var start = document.cookie.indexOf(name + '=');
			if (start != -1) { 
				start = start + name.length + 1; 
				var end = document.cookie.indexOf(';', start);
				if (end == -1) {
					end = document.cookie.length;
				}
				return unescape(document.cookie.substring(start, end));
			} 
		}
		return '0';
	}
 
	function togglePane(t) {
		var $hs = $('#hiscores');
		if (t) {
			$hs.css('border', '1px solid blue');
			$hs.find('legend a').text('hide');
			$hs.find('div').show();
		} else {
			$hs.css({'border': 'none', 'border-top': '1px solid blue'});
			$hs.find('legend a').text('show');
			$hs.find('div').hide();
		}
	}
 
	function showMsg(msg) {
		$('#hiscores div').empty().text(msg);
	}
 
	function showError(error) {
		resetLegend();
		$('#hiscores div').empty().css('color', 'red').text(error);
	}
 
	function resetLegend() {
		$('#hiscores legend').empty().css({
			'border': '1px solid blue',
			'padding': '0 10px 0 10px'
		}).append($('<b />').text('E-Z Hiscores')).append(' (').append($('<a />').click(function() {
			showPane = !showPane;
			togglePane(showPane);
			setCookie('dismiss', showPane ? 'show' : 'hide');
			return false;
		}).attr('href', '#')).append(')');
 
		togglePane(showPane);
	}
 
	function getToken(hsData) {
		if (hsData == null) {
			showError('Error loading hiscores for ' + ezHiscoresPlayer);
			return;
		}
 
		if (typeof(ezHiscoresCallback) == 'function') {
			hsData = ezHiscoresCallback(hsData);
		}
 
		showMsg('Preparing to edit ' + ezHiscoresPage + '...');
 
		callAPI({
			'action': 'query',
			'prop': 'info|revisions',
			'intoken': 'edit',
			'titles': ezHiscoresPage
		}, 'GET', function(response) {
			var pages = response.query.pages;
			var page = null;
 
			for (var i in pages) {
				page = pages[i];
			}
 
			editPage((page.missing != null) ? page.starttimestamp : page.revisions[0].timestamp, page.starttimestamp, page.edittoken, hsData);
		});
	}
 
	function editPage(baseTS, startTS, editToken, text) {
		showMsg('Editing ' + ezHiscoresPage + '...');
 
		callAPI({
			'minor': 'yes',
			'summary': 'Updated via [[User:Quarenon/Scripts/EzHiscores|EzHiscores]]',
			'action': 'edit',
			'title': ezHiscoresPage,
			'basetimestamp': baseTS,
			'startimestamp': startTS,
			'token': editToken,
			'text': text
		}, 'POST', function(response) {
			if (response.edit.result == 'Success') {
				var d = new Date();
 
				showMsg('Hiscores were successfully updated on ' + d.toUTCString() + '.');
				resetLegend();
				setCookie('time', d.getTime(), 30);
			} else {
				showError('Could not edit the hiscores page at ' + ezHiscoresPage + '.');
			}
		});
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
					showError('API Error: ' + response.error.info);
				} else {
					callback(response);
				}
			},
			error: function(xhr, error) { showError(error); },
			timeout: 10000 // msec
		});
	}
 
	var lastUpdate = parseInt(getCookie('time'));
	var showPane = (getCookie('dismiss') != 'hide');
	var now = (new Date()).getTime();
	var playerURI = encodeURIComponent(ezHiscoresPlayer);
 
	// Is it time to show the notification?
	if (getCookie('dismiss') != 'dismiss' && lastUpdate + ezHiscoresReminder * 60 * 60 * 1000 < now) {
		var externalLink = {
			'background': 'url(https://images.wikia.nocookie.net/common/skins/monobook/external.png) center right no-repeat',
			'padding-right': '13px'
		};
 
		var $fieldset = $('<fieldset />').attr('id', 'hiscores').css({
			'margin': '3px 0 0 0',
			'padding': '1px 1px 5px 20px'
		});
 
		$fieldset.append($('<legend />'));
 
		var $div = $('<div />').css('margin-left', '-10px');
 
		$div.append('The hiscores for ').append($('<a />').css(externalLink).attr('href', 'http://hiscore.runescape.com/hiscorepersonal.ws?user1=' + playerURI).text(ezHiscoresPlayer));
 
		if (!lastUpdate) {
			$div.append(' may have not been recently updated. ');
		} else {
			var time = Math.floor((now - lastUpdate) / 1000);
			var seconds = time % 60;
			time = Math.floor(time / 60);
			var minutes = time % 60;
			time = Math.floor(time / 60);
			var hours = time % 24
			var days = Math.floor(time / 24);
 
			$div.append(' were last updated ');
 
			if (days) {
				$div.append(days + ' day' + ((days > 1) ? 's' : ''));
			} else if (hours) {
				$div.append(hours + ' hour' + ((hours > 1) ? 's' : ''));
			} else if (minutes) {
				$div.append(minutes + ' minute' + ((minutes > 1) ? 's' : ''));
			} else {
				$div.append(seconds + ' second' + ((seconds > 1) ? 's' : ''));
			}
 
			$div.append(' ago. ');
		}
 
		$div.append($('<a />').text('Update data').attr('href', '#').click(function() {
			var $imgLoading = $('<img />').attr({src: 'http://img16.imageshack.us/img16/1938/ezhsloading3.gif', width: 80, height: 14, alt: 'Loading ...'});
			$('#hiscores legend').empty().css('padding', '0').append($imgLoading);
 
			showMsg('Loading hiscores for ' + ezHiscoresPlayer + '...');
 
			var log = (typeof(ezHiscoresLog) != 'undefined' && ezHiscoresLog) ? '1' : '0';
			var script = (typeof(ezHiscoresScript) != 'undefined') ? ezHiscoresScript : 'http://rstools.ath.cx/js/hiscores.php';
 
			$.ajax({
				data: {
					log: log,
					player: ezHiscoresPlayer,
					username: wgUserName,
					page: ezHiscoresPage
				},
				dataType: 'jsonp',
				url: script,
				success: getToken,
				error: function(xhr, error) { showError(error); },
				timeout: 10000 // msec
			});
 
			return false;
		})).append(' &middot; ');
 
		if (typeof(ezHiscoresLog) != 'undefined' && ezHiscoresLog) {
			$div.append($('<a />').text('View log').attr('href', 'http://rstools.ath.cx/hiscores_log.php?player=' + playerURI).css(externalLink)).append(' &middot; ');
		}
 
		$div.append($('<a />').text('Dismiss').attr('href', '#').click(function() {
			setCookie('dismiss', 'dismiss');
			$('#hiscores').hide();
			return false;
		}));
 
		$fieldset.append($div);
		$heading = $('.firstHeading:first');
		if ($heading.size() > 0) {
			$heading.before($fieldset);
		} else {
			$('#bodyContent').before($fieldset);
		}
 
		resetLegend();
	}
});