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
		'quick-answers-editor',
	];
	const apiParams = {
		action: 'query',
		format: 'json',
		formatversion: 2,
		errorformat: 'plaintext',
		uselang: config.wgUserLanguage,
	};
	const api = {[config.wgContentLanguage]: new mw.Api({parameters: apiParams})};

	api[config.wgContentLanguage].post({
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
			fetchAdminsByLang(
				Object.keys(langs),
				0,
				tBody,
				adminTablePlaceholder,
				adminTable
			);
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

	function fetchAdminsByLang(langList, lang, tBody, adminTablePlaceholder, adminTable){
		api[langList[lang]].post({
			list: 'allusers',
			augroup: validGroups,
			auprop: ['groups', 'editcount'],
			aulimit: 'max',
			auwitheditsonly: true,
		}).then(apiOutput => {
			fetchAdmin(langList, lang, tBody, adminTablePlaceholder, adminTable, apiOutput.query.allusers, 0);
		});
	}

	function fetchAdmin(langList, lang, tBody, adminTablePlaceholder, adminTable, userList, user){
		api[langList[lang]].post({
			list: 'usercontribs',
			uclimit: 1,
			ucuser: userList[user].name,
			ucprop: ['ids', 'timestamp'],
		}).then(apiOutput => {
			const lastEdit = apiOutput.query.usercontribs[0];

			if (!lastEdit){
				if (user < userList.length - 1){
					fetchAdmin(langList, lang, tBody, adminTablePlaceholder, adminTable, userList, user + 1);
				} else if (lang < langList.length - 1){
					fetchAdminsByLang(langList, lang + 1, tBody, adminTablePlaceholder, adminTable);
				} else {
					adminTablePlaceholder.html(adminTable);
					mw.hook('wikipage.content').fire(adminTablePlaceholder);
				}
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
				id: `${langList[lang]}__${mw.util.wikiUrlencode(userList[user].name)}`,
				class: `administration_table__${langList[lang]}`,
			}).append(
				$('<td>').append(link(`User:${userList[user].name}`, userList[user].name, langList[lang])),
				$('<td>').text(validGroups.filter(group => userList[user].groups.indexOf(group) !== -1).join(', ')),
				$('<td>').text(userList[user].editcount),
				$('<td>').addClass(status).append(link(`Special:Diff/${lastEdit.revid}`, lastEdit.timestamp, langList[lang])),
				$('<td>').text(language(langList[lang]))
			));

			if (user < userList.length - 1){
				fetchAdmin(langList, lang, tBody, adminTablePlaceholder, adminTable, userList, user + 1);
			} else if (lang < langList.length - 1){
				fetchAdminsByLang(langList, lang + 1, tBody, adminTablePlaceholder, adminTable);
			} else {
				adminTablePlaceholder.html(adminTable);
				mw.hook('wikipage.content').fire(adminTablePlaceholder);
			}
		});
	}

	function fetchStatsByLang(langList, lang, tBody, internationalStatsPlaceholder, statsTable){
		const id = `international-stats__${langList[lang]}`;
		const langCode = langList[lang] === 'mu' ? 'mu' : link(`Category:User ${langList[lang]}`, langList[lang], langList[lang]).prop('outerHTML');
		api[langList[lang]].post({
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