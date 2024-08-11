// rewritten by [[m:User:Hoo man]]; 2012-08-26, adapted by [[User:Obersachse]], optimized by [[User:Jack who built the house]]
// For attribution: [[MediaWiki:Gadget-markadmins.js]]
(function () {

var userSet;

var userSetTips = {
	'A' : 'administrator',
	'B' : 'bureaucrat',
	'CU' : 'checkuser admin',
	'CM' : 'content moderator',
	'R' : 'rollbacker',
	'TM' : 'thread moderator',
};

function addCSS(css) {
	var styleElem = document.createElement('style');
	styleElem.appendChild(document.createTextNode(css));
	document.getElementsByTagName('head')[0].appendChild(styleElem);
}

function markadmins($content) {
	if (!$content.length) return;
	runNum++;
	if (runNum === 1) {
		addCSS(
			'tt.userflags { color:#0645ad; }' +
			'.userflags-wrapper { -moz-user-select:none; }' +
			'.userflags-none { display: none; }'
		);
	}
	
	var $links = $content.find('a[title^="User"], a[title^="Talk"]');
	
	if (runNum === 2) {
		if ($links.length === prevLinksCount) {
			return;
		} else {
			if ($links.length > prevLinksCount) {
				$links = $links.slice(prevLinksCount);
			} else {
				var msg = 'MediaWiki:Gadget-markadmins.js: Нестандартная ситуация: количество ссылок на втором проходе (' + $links.length + ') меньше, чем на первом (' + prevLinksCount + '). Снова обходим все ссылки.';
				if (console.info) {
					console.info(msg);
				} else {
					console.log(msg);
				}
			}
		}
	}

	new mw.Api().get({
		action: 'query',
		list: 'allusers',
		augroup: 'sysop|bureaucrat|checkuser|content-moderator|rollback|threadmoderator',
		auprop: 'groups',
		aulimit: 500,
		format: 'json',
		formatversion: 2
	}).done(function(ans) {
		var list = ans.query.allusers,
			groups = ['sysop', 'bureaucrat', 'checkuser', 'content-moderator', 'rollback', 'threadmoderator'],
			key = ['A', 'B', 'CU', 'CM', 'R', 'TM'],
			userSet = {};
			
		for (var i = 0; i < key.length; i++) {
			userSet[key[i]] = [];
		}
		
		for (var i = 0; i < list.length; i++) {
			for (var j = 0; j < groups.length; j++) {
				if (list[i].groups.includes(groups[j])) {
					userSet[key[j]].push(list[i].name);
				}
			}
		}
		
		$links.each(function (i, link) {
			if (!link.parentNode ||
				(/[?#]/.test(link.href) && link.href.indexOf('redlink=1') === -1) ||
				(link.parentElement && link.parentElement.className === 'cancelLink')
			) {
				return;
			}
	
			var matches, user, flags = [], tips = [], flag;
			matches = /^User:(.+)|Talk:(.+)/.exec(link.title);
			if (!matches) return;
			if (matches[2]) {
				if ($(link).parent().hasClass('mw-usertoollinks') || link.textContent.match(/обс/i)) return;
				matches[1] = matches[2];
			} else if (!matches[1]) {
				return;
			}
			
			user = decodeURIComponent(matches[1]);
			if (link.href.indexOf('redlink=1') !== -1) {
				user = user.replace(/ \([^\)]+\)$/, '');
			}
			
			for (flag in userSet) {
				if (userSet[flag].indexOf(user) !== -1 && userSetTips[flag]) {
					flags.push(flag);
					tips.push(userSetTips[flag]);
				}
			}
			if (!flags.length) return;
			
			tips = ' (' + tips.join(', ') + ')';
			
			var spanElem = document.createElement('span');
			spanElem.className = 'userflags-wrapper';
			var nbspElem = document.createTextNode('\u00A0');
			var ttElem = document.createElement('tt');
			ttElem.className = 'userflags';
			ttElem.title = tips;
			var flagsElem = document.createTextNode('(' + flags.join(',') + ')');
	
			ttElem.appendChild(flagsElem);
			spanElem.appendChild(nbspElem);
			spanElem.appendChild(ttElem);
	
			link.parentNode.insertBefore(spanElem, link.nextSibling);
			link.title = link.title + tips;
		});
	});

	prevLinksCount = $links.length;
}

var runNum = 0;
var prevLinksCount;
markadmins($('#mw-content-text'));  
mw.hook('wikipage.content').add(markadmins);

}());