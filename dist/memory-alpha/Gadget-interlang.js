'use strict';
(() => {
	const config = mw.config.values;
	const langs = {[config.wgContentLanguage]: config.wgServer + config.wgArticlePath};
	const validGroups = [
		'bot',
		'bureaucrat',
		'sysop',
		'content-moderator',
		'rollback',
	];
	const apiParams = {
		action: 'query',
		format: 'json',
		formatversion: 2,
		errorformat: 'plaintext',
		uselang: config.wgUserLanguage,
	};
	const api = {[config.wgContentLanguage]: new mw.Api({parameters: apiParams})};

	api[config.wgContentLanguage].get({
		meta: 'siteinfo',
		siprop: 'interwikimap',
		sifilteriw: 'local',
	}).then(apiOutput => {
		apiOutput.query.interwikimap.forEach(interwiki => {
			if (interwiki.language && interwiki.prefix !== config.wgContentLanguage){
				langs[interwiki.prefix] = interwiki.url;
				api[interwiki.prefix] = new mw.Api({
					parameters: apiParams,
					ajax: {
						url: interwiki.url.replace('http://', 'https://').replace('/wiki/$1', '/api.php?origin=*'),
						timeout: 30 * 1000,
						dataType: 'json',
					},
				});
			}
		});

		// Administration table
		const adminTablePlaceholder = $('.administration');
		if (adminTablePlaceholder.length){
			const promises = [];
			const tBody = $('<tbody>');
			const adminTable = $('<table>').addClass(['grey', 'sortable']).append(
				$('<thead>').append($('<tr>').append(
					$('<th>').text('User'),
					$('<th>').text('Groups'),
					$('<th>').text('Edit count'),
					$('<th>').text('Last edit'),
					$('<th>').text('Language')
				)),
				tBody
			);
			Object.keys(langs).forEach(lang => {
				promises.push(lang, api[lang].get({
					list: 'allusers',
					augroup: validGroups,
					auprop: ['groups', 'editcount'],
					aulimit: 'max',
					auwitheditsonly: true,
				}));
			});
			Promise.all(promises).then(results => {
				const promises = [];
				let lang;
				results.forEach(apiOutput => {
					if (typeof apiOutput === 'string'){
						lang = apiOutput;
						return;
					}
					for (const user of apiOutput.query.allusers){
						promises.push([lang, user], api[lang].get({
							list: 'usercontribs',
							uclimit: 1,
							ucuser: user.name,
							ucprop: ['ids', 'timestamp'],
						}));
					}
				});
				Promise.all(promises).then(results => {
					let lang;
					let user;
					results.forEach(apiOutput => {
						if (apiOutput.length){
							lang = apiOutput[0];
							user = apiOutput[1];
							return;
						}
						const lastEdit = apiOutput.query.usercontribs[0];

						if (!lastEdit){
							return;
						}

						const inactivity = Date.now() - new Date(lastEdit.timestamp).getTime();
						let status;

						if (inactivity > 1000 * 60 * 60 * 24 * 365 * 5){
							status = 'inactive';
						} else if (inactivity > 1000 * 60 * 60 * 24 * 30){
							status = 'semi-active';
						} else {
							status = 'active';
						}

						tBody.append($('<tr>', {
							id: `${lang}__${mw.util.wikiUrlencode(user.name)}`,
							class: `administration_table__${lang}`,
						}).append(
							$('<td>').append(link(`User:${user.name}`, user.name, lang)),
							$('<td>').text(validGroups.filter(group => user.groups.indexOf(group) !== -1).join(', ')),
							$('<td>').text(user.editcount),
							$('<td>').addClass(status).append(link(`Special:Diff/${lastEdit.revid}`, lastEdit.timestamp, lang)),
							$('<td>').text(language(lang))
						));
					});
					adminTablePlaceholder.html(adminTable);
					mw.hook('wikipage.content').fire(adminTablePlaceholder);
				});
			});
		}

		// International stats table
		const internationalStatsPlaceholder = $('.international-stats');
		if (internationalStatsPlaceholder.length){
			const tBody = $('<tbody>');
			const statsTable = $('<table>').addClass(['grey', 'sortable']).append(
				$('<thead>').append($('<tr>').append(
					$('<th>').text('Language'),
					$('<th>').text('Code'),
					$('<th>').text('Articles'),
					$('<th>').text('Files'),
					$('<th>').text('Active users'),
					$('<th>').text('Admins')
				)),
				tBody
			);
			fetchStatsByLang(
				Object.keys(langs),
				0,
				tBody,
				internationalStatsPlaceholder,
				statsTable
			);
		}
	});

	function fetchStatsByLang(langList, lang, tBody, internationalStatsPlaceholder, statsTable){
		const id = `international-stats__${langList[lang]}`;
		const langCode = langList[lang] === 'mu' ? 'mu' : link(`Category:User ${langList[lang]}`, langList[lang], langList[lang]).prop('outerHTML');
		api[langList[lang]].get({
			meta: 'siteinfo',
			siprop: 'statistics',
		}).then(apiOutput => {
			const stats = apiOutput.query.statistics;
			tBody.append($('<tr>', {id: id}).append(
				$('<td>').append(link('', language(langList[lang]), langList[lang])),
				$('<td>').html(langCode),
				$('<td>').append(link('Special:AllPages', stats.articles, langList[lang])),
				$('<td>').append(link('Special:ListFiles', stats.images, langList[lang])),
				$('<td>').append(link('Special:ListUsers', stats.activeusers, langList[lang])),
				$('<td>').append(link('Special:ListUsers/sysop', stats.admins, langList[lang]))
			));
			if (lang < langList.length - 1){
				fetchStatsByLang(
					langList,
					lang + 1,
					tBody,
					internationalStatsPlaceholder,
					statsTable
				);
			} else {
				internationalStatsPlaceholder.html(statsTable);
				mw.hook('wikipage.content').fire(internationalStatsPlaceholder);
			}
		});
	}

	function language(code){
		return code === 'mu' ? 'Mirror Universe' :
			new Intl.DisplayNames(config.wgUserLanguage, {type: 'language'}).of(code);
	}

	function link(page, text, lang){
		return $('<a>', {
			href: langs[lang].replace('$1', mw.util.wikiUrlencode(page)),
			title: `${lang}:${page}`,
			html: text,
		});
	}
})();

// {{JavaScript category}}