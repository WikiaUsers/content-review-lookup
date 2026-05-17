// [[Category:Internal]]

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		var css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
	});
});

// UserTags config
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order: -2 },
		bot: { link:'Help:Bots', order: -1 },
		bureaucrat: { order: 0 },
		sysop: { order: 1 },
		'content-moderator': { order: 2 },
		threadmoderator: { order: 3 }
	}
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;

//badge leaderboard url fix
const leaderboard = "?safemode=1";
$('.data-details.ranking a').attr("href", "/wiki/Special:Leaderboard" + leaderboard);

// Fix odd browser behavior when clicking the discussion link on the community navigation
if (window.location.pathname === '/wiki/F' && !window.location.search.includes('redirect=no'))
{
	document.querySelector('.page__main').textContent = '';
	window.location.pathname = '/f';
}

$(':is(.editableelement>pre, .editableelement:not(.mw-highlight:has(pre)))').each(function() {$(this).attr('contenteditable', 'true');});

(() => {
	if (mw.config.get('wgPageName') !== 'MediaWiki:Wikia-moderation') return;
	$.get('/api.php?action=parse&page=MediaWiki:Custom-wikia-moderation&format=json', data => {
		$('.noarticletext.mw-content-ltr').text('');
		$('#mw-content-text').append(data.parse.text['*']);
		$('body').append(`
		<style>
		@import "/load.php?mode=articles&articles=u:dev:MediaWiki:Nord.css&only=styles";
		</style>
		`);
	});
})();

/*
$.ajax({
	'url': mw.util.wikiScript('api'),
	'type': 'POST',
	'data': {
		action:'edit',
		title: `User:${mw.config.get('wgUserName')}/ratings.json`,
		text: `{}`,
		createonly: 1,
		token: mw.user.tokens.get('csrfToken'),
		format: 'json'
	}
}).then(() => {
	'use strict';
	const debug = mw.config.get('wgUserGroups').includes('sysop') || mw.config.get('wgUserName') === 'Crazybloy2';
	if (mw.config.get('wgNamespaceNumber') !== 0 || window.ratingLoaded) return;
	
	const getPages = (functionOne, offset = undefined) => {
		let offsetTest = 0;
		if (offset !== undefined) offsetTest = offset;
		$.ajax({
			'url': mw.util.wikiScript('api'),
			'type': 'GET',
			'data': {
				action:'query',
				list: 'search',
				srnamespace: '2',
				srsearch: 'ratings.json',
				srlimit: '500',
				srinfo: 'totalhits',
				sroffset: String(offsetTest),
				format: 'json'
			}
		}).done(data => {
			console.log(data);
			if(data.error) return;
			if (!window.results) window.results = data;
			else {
				for (const page of data.query.search) {
					window.results.query.search.push(page);
				}
			}
			if (data.continue) {
				getPages(functionOne, data.continue.sroffset);
			} else {
				functionOne(window.results);
			}
		});
	};
	const getParsed = (responseOne) => {
		const searchRes = responseOne.query.search;
		let eligible = [];
		for (const page of searchRes) {
			if (page.title.split('/').length - 1 === 1) {
				eligible.push(page.title);
			}
		}
		if (debug) console.log(eligible);
		let str = '';
		for (const title of eligible) {
			str += `{ "user":"${title.replace('/ratings.json', '').replace('User:', '')}", "votings":{{:${title}}} }, `;
		}
		if (debug) console.log(str);
		$.ajax({
			'url': mw.util.wikiScript('api'),
			'type': 'GET',
			'data': {
				action: 'parse',
				text: str,
				contentmodel: 'wikitext',
				prop: 'text',
				format: 'json'
			}
		}).done(data => {
			const text = $('<div>')
        		.html(data.parse.text['*'])
        		.text()
        		.trim();

    		const parsedObj = JSON.parse(
        		`[${text}]`
            		.replace(/,\s*]$/, ']')
            		.replace(/\n/g, '')
    		);
			if (debug) console.log(parsedObj);
			let votes = 0;
			let voted;
			let ownExists = false;
			for (const rating of parsedObj) {
				if (mw.config.get('wgUserName') === rating.user && rating.votings[mw.config.get('wgPageName')]) {
					voted = rating.votings[mw.config.get('wgPageName')];
					$(`.${voted}`).attr('disabled', 'true');
				}
				if (rating.votings[mw.config.get('wgPageName')] === 'up') {
					votes++;
				} 
				else if (rating.votings[mw.config.get('wgPageName')] === 'down') {
					votes--;
				}
				
				if (mw.config.get('wgUserName') === rating.user && !ownExists) ownExists = true;
			} 
			if (!voted) voted = false;
			if(debug) console.log(votes, voted);
			$('#votingcounter').text(String(votes));
		});
	};
	
	const submit = (voting = 'up') => {
		$.ajax({
			'url': mw.util.wikiScript('index'),
			'type': 'GET',
			'data': {
				action:'raw',
				title: `User:${mw.config.get('wgUserName')}/ratings.json`,
			}
		}).done(data => {
			let obj = JSON.parse(data || {});
			obj[mw.config.get('wgPageName')] = voting;
			if (debug) console.log(obj);
			$.ajax({
				'url': mw.util.wikiScript('api'),
				'type': 'POST',
				'data': {
					action:'edit',
					title: `User:${mw.config.get('wgUserName')}/ratings.json`,
					text: JSON.stringify(obj),
					token: mw.user.tokens.get('csrfToken'),
					format: 'json'
				}
			}).done(data => {
				if (data.error) {console.log('error when saving'); return;}
				window.location.reload();
			});
		}).fail(() => {
			let obj = JSON.parse(data || '{}');
			obj[mw.config.get('wgPageName')] = voting;
			if (debug) console.log(obj);
			$.ajax({
				'url': mw.util.wikiScript('api'),
				'type': 'POST',
				'data': {
					action:'edit',
					title: `User:${mw.config.get('wgUserName')}/ratings.json`,
					text: JSON.stringify(obj),
					token: mw.user.tokens.get('csrfToken'),
					format: 'json'
				}
			}).done(data => {
				if (data.error) {console.log('error when saving'); return;}
				window.location.reload();
			});
		});
	};
	$('.page-header').prepend(`
	<br>
	<div id="rate" style="position:absolute;display:flex;gap:5px;padding:1%;background-color:var(--theme-page-background-color--secondary);border-radius:5px;z-index:200;margin-left:77%;max-height:400px;-webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;margin-top: -45px;width:180px;
    right: 150px;">
    <span id="votingcounter" style="font-weight:bold;margin:auto 0;">N/A</span>
    <span class="buttons-voting" style="margin-left:10px;">
    <button class="wds-button down">
    <svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-menu-control"></use></svg>
    </button>
    <button class="wds-button up"><svg class="wds-icon wds-icon-small" style="transform:rotate(180deg);"><use xlink:href="#wds-icons-menu-control"></use></svg></button>
    </span>
    </div>
	`);
	getPages(getParsed);
	$('.up').click(function() {
		$(this).attr('disabled', 'true');
		submit('up');
	});
	$('.down').click(function() {
		$(this).attr('disabled', 'true');
		submit('down');
	});
	window.ratingLoaded = true;
});
*/
/*
// Toggle parameter for [[Template:Audio]]
	$(".t-audio").each(function() {
		var toggle = $(this).attr("data-toggle");
		if (toggle != "none") {
			$(".t-audio-toggle-" + toggle).click(function () {
				var audio = $(`.t-audio-toggle-${toggle} audio`)[0];
				audio.paused ? audio.play() : audio.pause();
			});
		}
	});
});
*/