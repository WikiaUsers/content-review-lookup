if (mediaWiki.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && $.getUrlVar('blankspecial') === 'interlanguage') {
	(function ($, mw) {
		var url = mw.config.get('wgServer') + '/api.php?action=query&meta=siteinfo&siprop=interwikimap&format=json';
 
		// get local interwiki map
		$.getJSON(url, function (data) {
			var interlanguageWikis = [],
				map = data.query.interwikimap;
 
			for (var i = 0, len = map.length; i < len; i++) {
				if (map[i].language) {
					interlanguageWikis[interlanguageWikis.length] = map[i];
				}
			}
 
			// display results in an HTML table
			$(function () {
				// generate html
				var wiki, link, html, message;
 
				message = '<p>The ' + mw.config.get('wgSiteName') + ' appears to be available in ' + interlanguageWikis.length + ' language(s).</p><p>Do you know of a version of this wiki in a language not listed here? You can make a request <a title="Community Central:Interlanguage link requests" href="http://community.wikia.com/wiki/Community_Central:Interlanguage_link_requests">here</a> for it to be <a title="Help:Interlanguage links" href="http://community.wikia.com/wiki/Help:Interlanguage_links">interlanguage linked</a>.</p>';
 
				html = '<div id="interlanguage-wikis-container">' + message + '<table id="interlanguage-wikis-table" class="wikitable"><thead><tr><th>Prefix</th><th>Language</th><th>URL</th></thead><tbody>';
 
				for (var i = 0, len = interlanguageWikis.length; i < len; i++) {
					wiki = interlanguageWikis[i];
					link = wiki.url.substring(wiki.url.indexOf('http://') + 7);
					link = link.substring(0, link.indexOf('/'));
					link = '<a href="http://' + link + '">' + link + '</a>'; 
					html += '<tr><td>' + wiki.prefix + '</td>' + '<td>' + wiki.language + '</td>' + '<td>' + link + '</td></tr>';
				}
				html += '</tbody></table></div>';
 
				// insert html
				document.title = 'Interlanguage wikis';
				$('#firstHeading, #WikiaArticle h1').first().text('Interlanguage wikis');
				$('#mw-content-text').html(html);
			});
		});
	}(jQuery, mediaWiki));
}
 
/*jshint jquery:true browser:true laxbreak:true smarttabs:true */
/*global mediaWiki */
 
if (mediaWiki.config.get('wgCanonicalSpecialPageName') === 'Blankpage') {
mediaWiki.loader.using(['mediawiki.util', 'mediawiki.api'], function() {
'use strict';
 
if (mediaWiki.util.getParamValue('blankspecial') !== 'langscan') { return; }
 
jQuery(function() {
(function(window, $, mw) {
	var	MAX_JOBS = 1,
		IFRAME_TIMEOUT = 30000,
		langCodes = {"ab":"Abkhaz","aa":"Afar","af":"Afrikaans","ak":"Akan","sq":"Albanian","am":"Amharic","ar":"Arabic","an":"Aragonese","hy":"Armenian","as":"Assamese","av":"Avaric","ae":"Avestan","ay":"Aymara","az":"Azerbaijani","bm":"Bambara","ba":"Bashkir","eu":"Basque","be":"Belarusian","bn":"Bengali","bh":"Bihari","bi":"Bislama","bs":"Bosnian","br":"Breton","bg":"Bulgarian","my":"Burmese","ca":"Catalan; Valencian","ch":"Chamorro","ce":"Chechen","ny":"Chichewa; Chewa; Nyanja","zh":"Chinese","cv":"Chuvash","kw":"Cornish","co":"Corsican","cr":"Cree","hr":"Croatian","cs":"Czech","da":"Danish","dv":"Divehi; Dhivehi; Maldivian;","nl":"Dutch","dz":"Dzongkha","en":"English","eo":"Esperanto","et":"Estonian","ee":"Ewe","fo":"Faroese","fj":"Fijian","fi":"Finnish","fr":"French","ff":"Fula; Fulah; Pulaar; Pular","gl":"Galician","ka":"Georgian","de":"German","el":"Greek, Modern","gn":"Guaraní","gu":"Gujarati","ht":"Haitian; Haitian Creole","ha":"Hausa","he":"Hebrew (modern)","hz":"Herero","hi":"Hindi","ho":"Hiri Motu","hu":"Hungarian","ia":"Interlingua","id":"Indonesian","ie":"Interlingue","ga":"Irish","ig":"Igbo","ik":"Inupiaq","io":"Ido","is":"Icelandic","it":"Italian","iu":"Inuktitut","ja":"Japanese","jv":"Javanese","kl":"Kalaallisut, Greenlandic","kn":"Kannada","kr":"Kanuri","ks":"Kashmiri","kk":"Kazakh","km":"Khmer","ki":"Kikuyu, Gikuyu","rw":"Kinyarwanda","ky":"Kyrgyz","kv":"Komi","kg":"Kongo","ko":"Korean","ku":"Kurdish","kj":"Kwanyama, Kuanyama","la":"Latin","lb":"Luxembourgish, Letzeburgesch","lg":"Ganda","li":"Limburgish, Limburgan, Limburger","ln":"Lingala","lo":"Lao","lt":"Lithuanian","lu":"Luba-Katanga","lv":"Latvian","gv":"Manx","mk":"Macedonian","mg":"Malagasy","ms":"Malay","ml":"Malayalam","mt":"Maltese","mi":"Māori","mr":"Marathi (Marāṭhī)","mh":"Marshallese","mn":"Mongolian","na":"Nauru","nv":"Navajo, Navaho","nb":"Norwegian Bokmål","nd":"North Ndebele","ne":"Nepali","ng":"Ndonga","nn":"Norwegian Nynorsk","no":"Norwegian","ii":"Nuosu","nr":"South Ndebele","oc":"Occitan","oj":"Ojibwe, Ojibwa","cu":"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic","om":"Oromo","or":"Oriya","os":"Ossetian, Ossetic","pa":"Panjabi, Punjabi","pi":"Pāli","fa":"Persian","pl":"Polish","ps":"Pashto, Pushto","pt":"Portuguese","qu":"Quechua","rm":"Romansh","rn":"Kirundi","ro":"Romanian, Moldavian(Romanian from Republic of Moldova)","ru":"Russian","sa":"Sanskrit (Saṁskṛta)","sc":"Sardinian","sd":"Sindhi","se":"Northern Sami","sm":"Samoan","sg":"Sango","sr":"Serbian","gd":"Scottish Gaelic; Gaelic","sn":"Shona","si":"Sinhala, Sinhalese","sk":"Slovak","sl":"Slovene","so":"Somali","st":"Southern Sotho","es":"Spanish; Castilian","su":"Sundanese","sw":"Swahili","ss":"Swati","sv":"Swedish","ta":"Tamil","te":"Telugu","tg":"Tajik","th":"Thai","ti":"Tigrinya","bo":"Tibetan Standard, Tibetan, Central","tk":"Turkmen","tl":"Tagalog","tn":"Tswana","to":"Tonga (Tonga Islands)","tr":"Turkish","ts":"Tsonga","tt":"Tatar","tw":"Twi","ty":"Tahitian","ug":"Uighur, Uyghur","uk":"Ukrainian","ur":"Urdu","uz":"Uzbek","ve":"Venda","vi":"Vietnamese","vo":"Volapük","wa":"Walloon","cy":"Welsh","wo":"Wolof","fy":"Western Frisian","xh":"Xhosa","yi":"Yiddish","yo":"Yoruba","za":"Zhuang, Chuang","zu":"Zulu"},
		styles = { // Colors for different modes
			checking: { // Scan is in progress
				backgroundColor: 'yellow',
				color: 'black'
			},
			failed: { // Probably doesn't exist
				backgroundColor: '#A00',
				color: 'white'
			},
			found: { // Exists, not linked
				backgroundColor: '#13A',
				color: 'white'
			},
			connected: { // Exists, linked
				backgroundColor: 'green',
				color: 'white'
			}
		},
		defaultMsg = {
			checking: 'Checking...',
			failed: 'Does not exist',
			found: 'Exists but is not connected',
			connected: 'Exists & Connected'
		};
 
	// Retitle
	$('#WikiaPageHeader > h1').text('Interlanguage Scan').prop('title', 'JavaScript Program');
 
	// DOM components
	var	$content = $('#WikiaArticle').empty(),
		$topNotice = $('<div class="global-notification confirm" style="display:none"><button type="button">Run Scan</button> &mdash; <b>WARNING:</b> May use a ton of RAM, CPU and bandwidth.</div>'),
		$scanTable = $(
			'<table class="article-table" style="width: 100%">' +
				'<thead>' +
					'<tr>' +
						'<th>Language</th>' +
						'<th>Language Code</th>' +
						'<th>Status</th>' +
					'</tr>' +
				'</thead>' +
				'<tbody></tbody>' +
			'</table>'
		);
 
	// Prefill table
	(function() {
		var content = '';
		for (var x in langCodes) {
			if (langCodes.hasOwnProperty(x)) {
				content +=
					'<tr>' +
						'<td>' + langCodes[x] + '</td>' +
						'<td>' + x + '</td>' +
						'<td data-langcode="' + x + '">???</td>' +
					'</tr>';
			}
		}
		$scanTable.find('tbody').append(content);
	})();
 
	$content.append($topNotice, $scanTable);
 
	// Change state of table rows when info is known
	function mark(langCode, mode, msg) {
		var $x = $scanTable.find('td[data-langcode="' + langCode + '"]')
			.css(styles[mode])
			.html(msg || defaultMsg[mode]);
		if (mode === 'found' || mode === 'connected') {
			$x.attr('data-done', 'true');
		}
	}
 
	// Look up the interwiki link table
	new mw.Api().get({
		meta: 'siteinfo',
		siprop: 'interwikimap',
		sifilteriw: 'local'
	}, {
		ok: function(json) {
			// Update the table
			json = json.query.interwikimap;
			for (var i = 0, l = json.length ; i < l ; ++i) {
				if (!json[i].language) { continue; }
				mark(json[i].prefix, 'connected', '<a href="' + json[i].url + '" class="external" style="color:inherit">Connected</a>');
			}
 
			// Enable scan
			$topNotice
				.find('button').click(function(ev) {
					ev.preventDefault();
					$topNotice.slideUp('fast');
					runScan();
				}).end()
				.slideDown('fast');
		},
		err: function(textCode) {
			$topNotice
				.text('Could not access interwikimap for this wiki. Error: ' + textCode)
				.addClass('error').removeClass('confirm')
				.slideDown('fast');
		}
	});
 
 
	// Create one iframe per sub-domain and wait for the site to load.
	// If it times out then it probably doesn't exist.
	// We rate limit this to avoid total insanity.
	function runScan() {
		var map = {};
		$(window).on('message.langscan', function(ev) {
			var e = ev.originalEvent;
			if (typeof(e.data) === 'string') {
				var m = e.data.split('#');
				if (m.length === 2 && map.hasOwnProperty(m[0])) {
					map[m[0]](window.parseInt(m[1], 10));
					delete map[m[0]];
					ev.stopImmediatePropagation();
				}
			}
		});
 
		var jobs = $scanTable.find('td[data-langcode]').not('[data-done]').toArray(),
		    jobCount = (jobs.length < MAX_JOBS ? jobs.length : MAX_JOBS);
		for (var i = 0 ; i < jobCount ; ++i) {
			startJob(jobs.shift());
		}
 
		function startJob(e) {
			var code = e.getAttribute('data-langcode');
			mark(code, 'checking');
			var $f = $('<iframe class="langscan-frame" style="display:none">').prop({
				src: '//' + code + '.' + window.location.host + '/wiki/LangScanLanding'
			}).appendTo('body');
			var timeout = window.setTimeout(function() {
				mark(code, 'failed', '<a href="' + $f[0].src + '" class="external" style="color:inherit">Timed out</a>');
				e.setAttribute('data-done', 'true');
				$f.remove();
				decJobCount();
			}, IFRAME_TIMEOUT);
			$f.load(function() {
				map[code] = function(valid) {
					window.clearTimeout(timeout);
					if (valid) {
						mark(code, 'found', '<a href="' + this.src + '" class="external" style="color:inherit">Exists but not connected</a>');
					}
					else {
						mark(code, 'failed');
					}
					$f.remove();
					decJobCount();
				};
				this.contentWindow.postMessage('langscan ' + code, '*');
			});
		}
		function decJobCount() {
			if (jobs.length) {
				startJob(jobs.shift());
			}
			else if (--jobCount === 0) { // Last job cleans up
				$('iframe.langscan-frame').remove();
				$topNotice
					.html('<div style="text-align:center">Scan Completed. <button type="button">Hide Irrelevant Rows</button></div>')
					.slideDown('fast')
					.find('button').click(function(ev) {
						ev.preventDefault();
						$scanTable.find('td[data-langcode]').not('[data-done]').parent().toggle();
					});
				$(window).off('message.langscan');
			}
		}
	}
 
})(window, jQuery, mediaWiki);
});
});
}
 
// Enable cross-origin access between the scan page and the a designated landing page on the wiki
// NOTE: Landing page must NOT be a Special page as those have X-FRAME-OPTIONS: DENY which blocks
//	loading them inside IFRAMEs. The landing page is not visibly altered by what we are doing to
//	it so it doesn't matter if it exists.
switch(mediaWiki.config.get('wgPageName')) {
case 'LangScanLanding':
case 'Community_Central:Not_a_valid_Wikia':
	jQuery(window).on('message.langscan', function(ev) {
		'use strict';
		var e = ev.originalEvent;
		if (typeof(e.data) === 'string' && e.data.substr(0, 8) === 'langscan') {
			e.source.postMessage(e.data.substr(9) + '#' + (mediaWiki.config.get('wgDBname') !== 'wikia' ? 1 : 0), e.origin);
			ev.stopImmediatePropagation();
		}
	});
}