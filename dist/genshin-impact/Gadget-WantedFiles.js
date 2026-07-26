// Introduce functionality in [[Project:WantedFiles]]
// <nowiki>
mw.hook('wikipage.content').add(()=>{
	if (mw.config.values.wgPageName !== 'Genshin_Impact_Wiki:WantedFiles') {return;}
	const wrap = $('<div>', {
		'class': 'CWF-wrapper',
		html: [
			$('<div>', { text: 'Update list', style: 'float: right;', 'class': 'wds-button' }),
			'<div>This page is a custom implementation of <a href="/wiki/Special:WantedFiles">S:WantedFiles</a> with larger result limit and on-demand updates.</div>',
			$('<div>', {'class': 'CWF-progress', style: 'clear: both;'}),
			'<hr/>'
		]
	});
	const button = wrap.children('.wds-button');
	button.on('click', ()=>{
		if (button.hasClass('wds-is-disabled')) {return;}
		button.text('Running update...');
		button.attr('disabled', '');
		button.toggleClass('wds-is-disabled', true);
		cycle();
	});
	const api = new mw.Api();
	const files = {};
	const cycle = (continueFrom) => {
		var params = {
			action: 'query',
			generator: 'allfileusages',
			gafunique: '',
			gaflimit: 'max',
			maxage: 3600
		};
		if (!!continueFrom) {Object.assign(params, continueFrom);}
		api.get(params).then((data)=>{
			if (data.query.pages['-1']) {
				Object
				.keys(data.query.pages)
				.filter((id)=>Number(id)<0)
				.forEach((id)=>{
					let f = data.query.pages[id];
					if (f.missing == '' && f.ns === 6) {
						$('.CWF-progress').html('Last file checked: <code>'+f.title.substring(5)+'</code>');
						let lead = f.title.substring(5,6);
						if (lead.match(/[^\w\d]/) !== null) {lead = '!'} // Group all non-alphanumerical
						files[lead] = files[lead] || [];
						files[lead].push(`{{subst:#if:{{subst:filepath:${f.title.replace(/^File:/i, '')}}}||<nowiki/>\n# [[:${f.title}|${f.title.replace(/^File:/i, '')}]] ([[Special:WhatLinksHere/${f.title}|WLH]])}}`);
					}
				});
			}
			if (data.continue) {
				cycle(data.continue);
			} else {
				$('.CWF-progress').text('Generating alphanumerical sections...');
				let total = 0;
				let letters = Object.keys(files).sort();
				let sections = [];
				letters.forEach((l)=>{
					sections.push(`\n<h2 id="${l}">${ l==='!' ? 'Others' : l }</h2><div class="mw-collapsible mw-collapsed giw-collapsible" data-expandtext="Show entries" data-collapsetext="Hide entries"><div class="mw-collapsible-content" style="display: none;">${files[l].join('')}\n</div></div>`);
					total += files[l].length;
				});
				
				$('.CWF-progress').text('Attempting to publish list...');
				api.post({
					action: 'edit',
					title: 'Project:WantedFiles',
					text: 
						'{{TOC Right}}<templatestyles src="Genshin Impact Wiki:WantedFiles/style.css" />'+
						'Listing <b>'+total+'</b> wanted files, last updated on {{#time: F d, H:i|{{subst:#time:c}}}}.'+
						'{{clr}}'+
						sections.join(''),
					token: mw.user.tokens.values.csrfToken
				})
				.then(
					(_)=>{
						$('.CWF-progress').text('List generated, sit tight while the page is purged!');
						api.post({ action: 'purge', titles: mw.config.get('wgPageName') }).done(() => { location.reload(); });
					},
					(e)=>{
						$('.CWF-progress').text('Edit has failed, please copy the list below and do the edit manually!');
						if (wrap.children('textarea').length === 0) {wrap.append($('<textarea>'));}
						wrap.children('textarea').val('{{TOC Right}}'+sections.join(''));
						button.text('Update list');
						button.removeAttr('disabled');
						button.toggleClass('wds-is-disabled', false);
					}
				);
			}
		});
	};
	$('.mw-parser-output').prepend(wrap);
});
// </nowiki>