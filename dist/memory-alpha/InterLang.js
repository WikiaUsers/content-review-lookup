'use strict';
$(() => {
	const userlang = mw.config.get('wgUserLanguage');
	const sitelang = mw.config.get('wgContentLanguage');
	const validRoles = [
		'bot',
		'bureaucrat',
		'sysop',
		'content-moderator',
		'rollback',
		'quick-answers-editor',
	];
	const langs = [
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
		return new Intl.DisplayNames([inLang], {type: 'language'}).of(code);
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
		const attributes = {
			href: url(lang) + mw.util.getUrl(page),
			title: lang + ':' + page,
		};
		return $('<a>').attr(attributes).html(text).prop('outerHTML');
	}

	// Administration table
	populateAdministrationTable(langs[0]);
	function populateAdministrationTable(lang){
		if (!$('.administration').length){
			return;
		}
		
		const apiURL = (lang === 'mu') ? url(lang) + '/api.php?callback=?' : url(lang) + '/api.php';
		const params = {
			action: 'listuserssearchuser',
			groups: validRoles.join(','),
			contributed: '0',
			limit: '100',
			order: 'ts_edit',
			sort: 'desc',
			offset: '0',
			format: 'json',
		};
		
		$.getJSON(apiURL, params).done((result) => {
			const now = Date.now();
			
			for (let i = 0; i < result.listuserssearchuser.result_count; i++){
				if (result.listuserssearchuser[i]){
					processUser(result, i, lang);
				}
			}
			
			if (langs.indexOf(lang) < langs.length - 1){
				populateAdministrationTable(langs[langs.indexOf(lang) + 1]);
			} else {
				$('.administration .placeholder').remove();
				$('.administration .status').each((index, cell) => {
					if (now - $(cell).data('last-edit') > 157680000000){
						$(cell).addClass('inactive').html('Inactive');
					} else if (now - $(cell).data('last-edit') > 2592000000){
						$(cell).addClass('semi-active').html('Semi-active');
					} else {
						$(cell).addClass('active').html('Active');
					}
				});
			}
		});
	}
	
	function processUser(result, i, lang){
		const username = result.listuserssearchuser[i].username;
		const numberOfEdits = result.listuserssearchuser[i].edit_count;
		const id = lang + '__' + username.replace(/\s/g, '_');
		const rClass = 'administration_table__' + lang;
		const roles = validRoles.filter((role) => result.listuserssearchuser[i].groups.split(', ').indexOf(role) !== -1);
		const lastEdit = result.listuserssearchuser[i].last_edit_date;
		const lastEditComp = lastEdit.split(/,* /);
		const lastEditDate =
			lastEdit ?
			new Date(`${lastEditComp[1]} ${lastEditComp[2]} ${lastEditComp[3]} ${lastEditComp[0]} UTC`).getTime()
			: 0;
		
		if (roles.length > 0){
			const attributes = {'id': id, 'class': rClass};
			const row = $('<tr>').attr(attributes);
			const langLabel = (lang === 'mu') ? 'Mirror Universe' : language(lang, userlang);
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
	
	// International stats table
	stats(langs[0]);
	function stats(lang){
		if (!$('.international-stats').length){
			return;
		}
		
		const id = 'international-stats__' + lang;
		const langLabel = (lang === 'mu') ? 'Mirror Universe' : language(lang, userlang);
		const langCode = (lang === 'mu') ? 'mu' : link('Category:User ' + lang, lang, lang);
		const apiURL = (lang === 'mu') ? url(lang) + '/api.php?callback=?' : url(lang) + '/api.php';
		const params = {
			action: 'query',
			meta: 'siteinfo',
			siprop: 'statistics',
			format: 'json',
		};
		
		$.getJSON(apiURL, params).done((result) => {
			$('.international-stats .placeholder').before($('<tr id="' + id + '">')
				.append('<td>' + link('', langLabel, lang) + '</td>')
				.append('<td>' + langCode + '</td>')
				.append('<td>' + link('Special:AllPages', result.query.statistics.articles, lang) + '</td>')
				.append('<td>' + link('Special:ListFiles', result.query.statistics.images, lang) + '</td>')
				.append('<td>' + link('Special:ListUsers', result.query.statistics.activeusers, lang) + '</td>')
				.append('<td>' + link('Special:ListUsers/sysop', result.query.statistics.admins, lang) + '</td>')
			);
			
			if (langs.indexOf(lang) < langs.length - 1){
				stats(langs[langs.indexOf(lang) + 1]);
			} else {
				$('.international-stats .placeholder').remove();
			}
		});
	}
});