$(function(){
	var userlang = mw.config.get('wgUserLanguage');
	var sitelang = mw.config.get('wgContentLanguage');
	var langs = [
		'en',
		'bg',
		'ca',
		'cs',
		'de',
		'eo',
		'es',
		'fr',
		'it',
		'ja',
		'nl',
		'pl',
		'pt',
		'ro',
		'ru',
		'sr',
		'sv',
		'uk',
		'zh',
		'mu',
	];
	
	function language(code, inLang){
		return new Intl.DisplayNames([inLang], {type:'language'}).of(code);
	}
	
	function url(code){
		if (code === 'en'){
			return mw.config.get('wgServer');
		} else if (code === 'mu'){
			return 'https://mu-memory-alpha.fandom.com';
		} else {
			return mw.config.get('wgServer') + '/' + code;
		}
	}
	
	function link(page, text, lang){
		return '<a href="' + url(lang) + mw.util.getUrl(page) + '" title="' + lang + ':' + page + '">' + text + '</a>';
	}
	
	// Administration table
	populateAdministrationTable(langs[0]);
	function populateAdministrationTable(lang){
		if ($('.administration').length === 0){
			return;
		}
		
		var apiURL = (lang === 'mu') ? url(lang) + '/api.php?callback=?' : url(lang) + '/api.php';
		var langLabel = (lang === 'mu') ? 'Mirror Universe' : language(lang, userlang);
		var validRoles = [
			'bot',
			'bureaucrat',
			'sysop',
			'content-moderator',
			'rollback',
			'quick-answers-editor',
		];
		
		var params = {
			action: 'listuserssearchuser',
			groups: validRoles.join(','),
			contributed: '0',
			limit: '100',
			order: 'ts_edit',
			sort: 'desc',
			offset: '0',
			format: 'json',
		};
		
		$.getJSON(apiURL, params).done(function(result){
			var now = new Date().getTime();
			
			for (var i = 0; i < result.listuserssearchuser.result_count; i++){
				if (result.listuserssearchuser[i]){
					var username = result.listuserssearchuser[i].username;
					var numberOfEdits = result.listuserssearchuser[i].edit_count;
					var id = lang + '__' + username.replace(/\s/g, '_');
					var rClass = 'administration_table__' + lang;
					var lastEdit = result.listuserssearchuser[i].last_edit_date;
					var lastEditComp = lastEdit.split(/,* /);
					var lastEditDate =
						lastEdit ?
						new Date(lastEditComp[1]+' '+lastEditComp[2]+' '+lastEditComp[3]+' '+lastEditComp[0]+' UTC').getTime()
						: 0;
					
					var roles = validRoles.filter(function(role){
						return result.listuserssearchuser[i].groups.split(', ').indexOf(role) !== -1;
					});
					
					if (roles.length > 0){
						var row = $('<tr id="' + id + '" class="' + rClass + '">');
						$('.administration .placeholder').before(row);
						row
							.append('<td>' + link('User:' + username, username, lang) + '</td>')
							.append('<td>' + roles.join(', ') + '</td>')
							.append('<td>' + numberOfEdits + '</td>')
							.append('<td data-sort-value="' + lastEditDate + '">' + link('Special:Contributions/' + username, lastEdit, lang) + '</td>')
							.append('<td>' + langLabel + '</td>')
							.append('<td data-last-edit="' + lastEditDate + '" class="status"></td>');
					}
				}
			}
			
			if ((langs.indexOf(lang)+1) < langs.length){
				populateAdministrationTable(langs[langs.indexOf(lang)+1]);
			} else {
				$('.administration .placeholder').remove();
				$('.administration .status').each(function(){
					if (now - $(this).data('last-edit') > 157680000000){
						$(this).addClass('inactive').html('Inactive');
					} else if (now - $(this).data('last-edit') > 2592000000){
						$(this).addClass('semi-active').html('Semi-active');
					} else {
						$(this).addClass('active').html('Active');
					}
				});
			}
		});
	}
	
	// International stats table
	stats(langs[0]);
	function stats(lang){
		if ($('.international-stats').length === 0){
			return;
		}
		
		var id = 'international-stats__' + lang;
		var langLabel = (lang === 'mu') ? 'Mirror Universe' : language(lang, userlang);
		var langCode = (lang === 'mu') ? 'mu' : link('Category:User ' + lang, lang, lang);
		var apiURL = (lang === 'mu') ? url(lang) + '/api.php?callback=?' : url(lang) + '/api.php';
		var params = {
			action: 'query',
			meta: 'siteinfo',
			siprop: 'statistics',
			format: 'json',
		};
		
		$.getJSON(apiURL, params).done(function(result){
			$('.international-stats .placeholder').before($('<tr id="' + id + '">')
				.append('<td>' + link('', langLabel, lang) + '</td>')
				.append('<td>' + langCode + '</td>')
				.append('<td>' + link('Special:AllPages', result.query.statistics.articles, lang) + '</td>')
				.append('<td>' + link('Special:ListFiles', result.query.statistics.images, lang) + '</td>')
				.append('<td>' + link('Special:ListUsers', result.query.statistics.activeusers, lang) + '</td>')
				.append('<td>' + link('Special:ListUsers/sysop', result.query.statistics.admins, lang) + '</td>')
			);
			
			if ((langs.indexOf(lang)+1) < langs.length){
				stats(langs[langs.indexOf(lang)+1]);
			} else {
				$('.international-stats .placeholder').remove();
			}
		});
	}
});