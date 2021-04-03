(function (window, $, mw) {
	'use strict';
	const conf = mw.config.get([
		'wgServer',
		'wgContentLanguage',
		'wgUserLanguage',
		'ArticleComments'
	]);

	const i18n = {
		'en': {
			seconds: function(time) {
				return time + ' second' + (time === 1 ? '' : 's') + ' ago';
			},
			minutes: function(time) {
				return time + ' minute' + (time === 1 ? '' : 's') + ' ago';
			},
			hours: function(time) {
				return time + ' hour' + (time === 1 ? '' : 's') + ' ago';
			},
			days: function(time) {
				return time + ' day' + (time === 1 ? '' : 's') + ' ago';
			}
		},
		'de': {
			seconds: function(time) {
				return 'vor ' + time + ' Sekunde' + (time === 1 ? '' : 'n');
			},
			minutes: function(time) {
				return 'vor ' + time + ' Minute' + (time === 1 ? '' : 'n');
			},
			hours: function(time) {
				return 'vor ' + time + ' Stunde' + (time === 1 ? '' : 'n');
			},
			days: function(time) {
				return 'vor ' + time + ' Tag' + (time === 1 ? '' : 'en');
			}
		},
		'es': {
			seconds: function(time) {
				return 'hace ' + time + ' segundo' + (time === 1 ? '' : 's');
			},
			minutes: function(time) {
				return 'hace ' + time + ' minuto' + (time === 1 ? '' : 's');
			},
			hours: function(time) {
				return 'hace ' + time + ' hora' + (time === 1 ? '' : 's');
			},
			days: function(time) {
				return 'hace ' + time + ' día' + (time === 1 ? '' : 's');
			}
		},
		'fr': {
			seconds: function(time) {
				return 'il y a ' + time + ' seconde' + (time === 1 ? '' : 's');
			},
			minutes: function(time) {
				return 'il y a ' + time + ' minute' + (time === 1 ? '' : 's');
			},
			hours: function(time) {
				return 'il y a ' + time + ' heure' + (time === 1 ? '' : 's');
			},
			days: function(time) {
				return 'il y a ' + time + ' jour' + (time === 1 ? '' : 's');
			}
		},
		'ja': {
			seconds: function(time) {
				return time + ' 秒前';
			},
			minutes: function(time) {
				return time + ' 分前';
			},
			hours: function(time) {
				return time + ' 時間前';
			},
			days: function(time) {
				return time + ' 日前';
			}
		},
		'pt-br': {
			seconds: function(time) {
				return time + ' segundo' + (time === 1 ? '' : 's') + ' atrás';
			},
			minutes: function(time) {
				return time + ' minuto' + (time === 1 ? '' : 's') + ' atrás';
			},
			hours: function(time) {
				return time + ' hora' + (time === 1 ? '' : 's') + ' atrás';
			},
			days: function(time) {
				return time + ' dia' + (time === 1 ? '' : 's') + ' atrás';
			}
		}
	};

	var url = conf.wgServer;
	if (conf.wgContentLanguage !== 'en') url += '/' + conf.wgContentLanguage;
	const commentsEnabled = conf.ArticleComments.$wrapper.length;
	
	const limit = window.rcLimit || 10;
	const type = window.rcType || 'edit|new|log|categorize';
	const exclude = window.rcExclude;
	var apiURL = url + '/api.php?action=query&list=recentchanges&rcprop=user|timestamp|title|comment|sizes|redirect|ids&rctoponly=1&format=json&limit=' + limit + '&type=' + type + '&rcexcludeuser=' + exclude;
	$.getJSON(apiURL, function(data) {
		$('.activity-items').html('');
		const items = data.query.recentchanges;
		for (var i = 0; i < items.length; ++i) {
			const item = items[i];
			item.comment = item.comment.replace(/"/g, '&quot;');
			const timeAgo = getTimeAgo(item.timestamp);
			var plusminus;
			var sizeDiff = item.newlen - item.oldlen;
			if (sizeDiff < 0) {
				plusminus = 'mw-plusminus-neg';
			} else if (sizeDiff > 0) {
				plusminus = 'mw-plusminus-pos';
				sizeDiff = '+' + sizeDiff;
			} else {
				plusminus = 'mw-plusminus-null';
			}
			var href = (commentsEnabled && item.ns === 1) ? item.title.split(/:(.+)/)[1].split('/@', 1)[0] + '#comm-' + item.pageid : item.title;
			var img;
			if (item.ns % 2 === 1) {
				img = '<img class="talk sprite" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="16" height="16" />';
			} else if (item.type === 'new') {
				img = '<img class="new sprite" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="16" height="16" />';
			} else if (item.type === 'categorize') {
				img = '<img class="categorization sprite" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="16" height="16" />';
			} else {
				img = '<img class="edit sprite" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="16" height="16" />';
			}
			var html = '<li class="activity-item"><div class="page-title" style="display: flex; align-items: center; column-gap: 0.5em;"> ' + img + ' <a class="page-title-link" href="' + url + '/wiki/' + encodeURIComponent(href.replace(/ /g, '_')) + '" data-tracking="activity-title"> ' + href + '</a> <small>(<a class="' + plusminus + '" title="' + item.comment + '" href="' + url + '/wiki/' + encodeURIComponent(item.title.replace(/ /g, '_')) + '?curid=' + item.pageid + '&diff=' + item.revid + '&oldid=' + item.old_revid + '">' + sizeDiff + '</a>)</small></div><div class="edit-info"><a class="edit-info-user" data-tracking="activity-username" href="' + url + '/wiki/User:' + encodeURIComponent(item.user.replace(/ /g, '_')) + '"> ' + item.user + '</a><span class="edit-info-time"> • ' + timeAgo + ' </span></div></li>';
			$('.activity-items').append(html);
		}
	});
	
	function getTimeAgo(timestamp) {
		var time = new Date().getTime() - new Date(timestamp).getTime();
		time = Math.floor(time / 1000);
		if (time < 60) return i18n[conf.wgUserLanguage]['seconds'](time);

		time = Math.floor(time / 60);
		if (time < 60) return i18n[conf.wgUserLanguage]['minutes'](time);

		time = Math.floor(time / 60);
		if (time < 24) return i18n[conf.wgUserLanguage]['hours'](time);

		time = Math.floor(time / 24);
		return i18n[conf.wgUserLanguage]['days'](time);
	}
}(this, jQuery, mediaWiki));