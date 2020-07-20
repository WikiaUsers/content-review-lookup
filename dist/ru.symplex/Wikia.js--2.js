var Warframe = (function () {
    if (window === null) {
        throw new TypeError('window is null');
    }
    var $;
    var jQuery;
    if (typeof window.jQuery !== 'undefined') {
        jQuery = $ = window.jQuery;
    }
    var mw = window.mw || window.mediaWiki;
    var editToken = mw.user.tokens.get('editToken');
    var wgUserName = mw.config.get('wgUserName');
	var wgPageName = mw.config.get('wgPageName');
	var wgUserGroups = mw.config.get('wgUserGroups');
	var wgAction = mw.config.get('wgAction');
	var wgCanonicalSpecialPageName = mw.config.get('wgCanonicalSpecialPageName');
	var wgTitle = mw.config.get('wgTitle');
	var wgIsMainPage = mw.config.get('wgIsMainPage');
	var wgScript = mw.config.get('wgScript');
	var wgArticlePath = mw.config.get('wgArticlePath');
	var wgArticleId = mw.config.get('wgArticleId');
	var wgIsArticle = mw.config.get('wgIsArticle');
	var wgNamespaceNumber = mw.config.get('wgNamespaceNumber');
	var getUrlVars = function (url) {
		var params = {};
		var length;
		var i;
		url = decodeURIComponent(url && String(url) || window.location.href);
		try {
			if (url.indexOf('?') !== -1) {
				url = url.match(/\?.+/).join().slice(1).split('&');
			} else {
				return params;
			}
			length = url.length;
			for (i = 0; i < length; i++) {
				url[i] = url[i].split('=');
				params[url[i][0]] = url[i][1];
			}
		} catch (ex) {}
		return params;
	};
	var urlVars = getUrlVars();
	var random = function (min, max) {
		return Math.floor(min + Math.random() * (max + 1 - min));
	};
	var storage = (function(localStorage) {
		return {
			get: function(elem) {
				try {
					return JSON.parse(localStorage.getItem(String(elem)));
				} catch (ex) {
					return localStorage.getItem(String(elem));
				}
			},
			set: function(elem, val) {
				elem = String(elem);
				if (val && typeof val === 'object') {
					try {
						val = JSON.stringify(val);
					} catch (ex) {}
				} else {
					val = String(val);
				}
				localStorage.setItem(elem, val);
				return val;
			},
			clear: function() {
				return localStorage.clear();
			},
			remove: function(elemn) {
				if (typeof elem === 'string' || typeof elem === 'number') {
					localStorage.removeItem(elem);
					return elem;
				}
			}
		};
	})(window.localStorage);
	var MediaWiki = {
		block: function(name, time, callback) {
			$.post('/api.php', {
				action: 'block',
				user: name,
				expiry: time === Infinity ? 'infinite' : time + ' days',
				reblock: true,
				autoblock: true,
				allowusertalk: true,
				nocreate: true,
				token: editToken,
				format: 'json'
			}).success(function(data) {
				callback(data);
			});
		},
		unblock: function(name, callback) {
			$.post('/api.php', {
				action: 'unblock',
				user: name,
				token: editToken,
				format: 'json'
			}).success(function(data) {
				callback(!data.error && true || false);
			});
		},
		wallmessage: function(title, text, to, callback) {
			$.post('/wikia.php', {
				controller: 'WallExternal',
				method: 'postNewMessage',
				format: 'json',
				convertToFormat: '',
				notifyeveryone: 0,
				messagetitle: title,
				pagenamespace: 1200,
				body: text,
				pagetitle: to,
				token: editToken
			}).success(function(data) {
				callback(data.status && true || false);
			});
		},
		purge: function() {
			window.location.href += (window.location.href.indexOf('?') > -1 ? '&action=purge' : '?action=purge') + '&cb=' + random(0, 0x7fffffff);
		},
		userinfo: function(name, callback) {
			if ($.isArray) {
				name = name.join('|');
			}
			$.get('/api.php', {
				action: 'query',
				list: 'users',
				ususers: name,
				usprop: ['groups', 'blockinfo', 'rights', 'editcount', 'registration'].join('|'),
				format: 'json'
			}).success(function(data) {
				callback(data && !data.error && data.query || false);
			});
		},
		deletepage: function(page, reason, callback) {
			$.post('/api.php', {
				action: 'delete',
				title: page,
				reason: reason,
				format: 'json',
				token: editToken
			}).success(function(data) {
				callback(data);
			});
		},
		getCurrentUserName: function() {
			if ([2, 3, 500, 1200].indexOf(wgNamespaceNumber) !== -1) {
				if (wgCanonicalNamespace === 'Блог_участника') {
					return wgTitle.split('/').shift();
				}
				return wgTitle;
			}
			if (wgNamespaceNumber === -1 && ['Following', 'Contributions'].indexOf(wgCanonicalSpecialPageName) !== -1) {
				if (wgScript == window.location.pathname) {
					return urlVars.target || null;
				}
				if (wgCanonicalSpecialPageName === 'Following') {
					return $('#UserProfileMasthead [itemprop="name"]').eq(0).text();
				}
				return decodeURIComponent(window.location.pathname.split('/').pop().replace(/_/g, ' ')) || null;
			}
			return null;
		}
	};
	$.each(['raw', 'render'], function(i, method) {
		MediaWiki[method] = function(page, callback) {
			$.get('/index.php', {
				action: method,
				title: page,
				cb: random(0, 0x7fffffff),
				dataType: 'text'
			}).success(function(data) {
				callback(data);
			});
		};
	});
	var $document = $(document);
	var $window = $(window);
	var $body = $(document.body);
	var $WikiaPage = $('#WikiaPage');
	var $mwContentText = $('#mw-content-text');
    return function() {
        
    };
})(typeof window !== 'undefined' ? window : null);