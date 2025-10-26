/* jshint undef: true, devel: true, typed: true, jquery: true, strict: true, eqeqeq: true, freeze: true, latedef: true, shadow: outer, varstmt: true, quotmark: single, esversion: 6, futurehostile: true */
/* global importArticles */
if (
	/* Only actual article viewing */
	mw.config.values.wgAction === 'view' &&
	!mw.config.values.wgDiffNewId &&
	!document.body.classList.contains('ve-active') &&
	!document.body.classList.contains('ve-loading')
) {
	const config = mw.config.values;
	const api = new mw.Api();
	const init = (ccmLoader) => {
		if (window.dev.ESE.__LOADED) {return;}
		else {window.dev.ESE.__LOADED = true; document.body.classList.add('ese-init')}
		let popup;
		document.querySelectorAll('.mw-editsection').forEach((edit)=>{
			let section = edit.querySelector('a').getAttribute('href').replace(/^.+\&section=/, '');
			if (isNaN(section)) {return;} // avoid transcluded sections
			edit.setAttribute('section', section);
			edit.querySelectorAll('a').forEach((a)=>{
				edit.setAttribute('data-href', a.getAttribute('href'));
				a.removeAttribute('href');
				a.setAttribute('tabindex', '0');
			});
			edit.classList.add('ese');
		});
		mw.hook('dev.modal').add((Modal)=>{ // Create popup
			popup = new Modal.Modal({
				title: 'Preview',
				id: 'EmbeddedSectionEditor',
				size: 'full',
				content: ''
			});
			popup.create();
		});
		mw.hook('dev.CCM.ready').add((cm)=>{ // Enable functions and UI once the editor finishes loading
			cm.view.focus();
			let wrapper = $('.ese-wrapper'),
				ctrl = $('.ese-controls'),
				sections = wrapper.data('sections'),
				delElements = [],
				prevEl = wrapper[0];
			while (true) {
				let elem = prevEl.nextElementSibling;
				if (!elem) {break;}
				let elemlvl = elem.nodeName.match(/h(\d+)/i) ? elem.nodeName.match(/h(\d+)/i)[1] : '0';
				if (
					elemlvl === '0' ||
					wrapper.data('level') < elemlvl
				) {
					delElements.push(elem);
					prevEl = elem;
				}
				else {break;}
			}
			delElements = $(delElements);
			delElements.hide();
			
			ctrl.find('.ese-close').on('click keyup', ()=>{
				if (event.type === 'keyup' && event.key !== 'Enter') {return;}
				ctrl.remove();
				wrapper.remove();
				$('.ese-loaded').toggleClass('ese-loaded', false);
				delElements.show();
			});
			ctrl.find('.ese-submit').on('click keyup', ()=>{
				if (event.type === 'keyup' && event.key !== 'Enter') {return;}
				let value = cm.view.state.sliceDoc();
				console.log('value', value);
				console.log('sections[2].trim()', sections[2].trim());
				if (value === sections[2].trim()) {mw.notify('No changes performed!'); return;}
				
				api.postWithEditToken({
					action: 'edit',
					title: config.wgPageName,
					text: sections[1]+value+sections[3],
					summary: '/* '+wrapper.data('name')+' */ '+ctrl.find('.ese-summary').val()
				}).then(()=>{
					mw.notify('Edit posted!');
					api.get({
						action: 'parse',
						text: value,
						prop: 'text',
						disablelimitreport: true,
						contentmodel: 'wikitext',
						title: config.wgPageName
					}).then((p)=>{
						if (p && p.parse && p.parse.text && p.parse.text['*']) {
							delElements.remove();
							wrapper.replaceWith(p.parse.text['*']);
							ctrl.remove();
							$('.ese-loaded').toggleClass('ese-loaded', false);
						}
					}).catch(console.log);
				}).catch(console.log);
			});
			ctrl.find('.ese-preview').on('click keyup', ()=>{
				if (event.type === 'keyup' && event.key !== 'Enter') {return;}
				let text = cm.view.state.sliceDoc();
				let params = {
					action: 'parse',
					text: text,
					prop: 'text',
					title: config.wgPageName,
					disablelimitreport: true,
					contentmodel: 'wikitext'
				};
				api.get(params).then((p)=>{
					if (p && p.parse && p.parse.text && p.parse.text['*']) {
						popup.show();
						let preview = $('<div>', {
							'class': 'page-content',
							html: $('<div>', {
								'class':'page__main',
								html: $('<div>', {
									'class':'page',
									html: $('<div>', {
										'class':'main-container',
										html: $('<div>', {
											'class':'mw-parser-output',
											html: [
												$('h'+wrapper.data('level'), {text: wrapper.data('section')}),
												$(p.parse.text['*'])
											]
										})
									})
								})
							})
						});
						//console.log(preview);
						popup.setContent(preview.get(0).outerHTML);
						mw.hook('wikipage.content').fire(preview);
					}
				}).fail(console.log);
			});
		});
		$('body').on('click keyup', '.ese', (event) => {
			if (event.type === 'keyup' && event.key !== 'Enter') {return;}
			// Avoid double render
			let pencil = event.currentTarget;
			if (pencil.classList.contains('ese-loaded')) {return;}
			else if (document.querySelector('.ese-loaded')) {
				mw.notify('Editor already open, please close it or submit your edit before attempting again!');
				return;
			}
			pencil.classList.add('ese-loaded');
			let header = pencil.closest('h1, h2, h3, h4, h5, h6');
			let section = header.querySelector('.mw-headline').innerHTML;
			let level = (header.nodeName.match(/\d+/)||['2'])[0];
			let index = pencil.getAttribute('section');
			api.get({
				action: 'query',
				titles: config.wgPageName,
				prop: 'revisions',
				rvslots: '*',
				rvprop: 'content',
				meta: 'tokens',
				type: 'csrf'
			}).then((data)=>{
				let page_content = Object.entries(data.query.pages)[0][1].revisions[0].slots.main['*'];
				let pre = [];
				for (let i = 0; i < index; i++) {
					let sp = RegExp('^([\\s\\S]*?\\n*==+.+[\\s\\n]*)([\\s\\S]*?$|$)').exec(page_content);
					while (/<!--(?![\s\S]*?-->)[\s\S]*?$/.exec(sp[1]) && /^[\s\S]*?(?<!<!--[\s\S]*?)-->/.exec(sp[2])) {
						if (/\n*==+.+[\s\n]*$/.exec(sp[1])) {i--;}
						let spcomm = /^([\s\S]*?(?<!<!--[\s\S]*?)-->)([\s\S]*?)$/.exec(sp[2]);
						sp[1]+=spcomm[1];
						sp[2]=spcomm[2];
					}
					pre.push(sp[1]);
					page_content = sp[2];
				}
				pre = pre.join('');
				let sections = RegExp('^([\\s\\S]*?)(\\n+={2,'+level+'}[^=][\\s\\S]*?$|$)').exec(page_content);
				while (/<!--(?![\s\S]*?-->)[\s\S]*?$/.exec(sections[1]) && /^[\s\S]*?(?<!<!--[\s\S]*?)-->/.exec(sections[2])) {
					let comm = /^([\s\S]*?(?<!<!--[\s\S]*?)-->)([\s\S]*?)$/.exec(sections[2]);
					sections[1]+=comm[1];
					sections[2]=comm[2];
				}
				sections = [pre+page_content, pre, sections[1], sections[2]];
				let wrapper = $('<div>',{
					'class': 'ese-wrapper',
					data: {
						level: level,
						sections: sections,
						name: section,
						index: index
					},
					html: $('<textarea>', {'class': 'ese-editor'})
				});
				let ctrl = $('<div>', {
					'class': 'ese-controls',
					html: [
						$('<span>', {'class': 'wds-button ese-submit', tabindex: '0', text: 'Submit', title: 'Submit the current wikitext'}),
						$('<span>', {'class': 'wds-button ese-preview', tabindex: '0', text: 'Preview', title: 'Preview the current wikitext'}),
						$('<input>', {'class': 'ese-summary', placeholder: 'Edit summary.', title: 'Summary about the edit\'s changes'}),
						$('<span>', {'class': 'wds-button wds-icon-small ese-close', tabindex: '0', text: 'x', title: 'Close the current editor instance. No changes will be applied or saved.', style: 'padding: 0; font-size: large;' }),
						$('<a>', {
							href: pencil.getAttribute('data-href'),
							tabindex: '-1',
							html: $('<span>', {
								'class': 'wds-button wds-icon-small ese-open',
								title: 'Open the default version of section editing.',
								tabindex: '0',
								style: 'padding: 0;'
							}).append('<svg viewBox="2 2 20 20"><path d="M5 3c-1.093 0-2 .907-2 2v14c0 1.093.907 2 2 2h14c1.093 0 2-.907 2-2v-7h-2v7H5V5h7V3zm9 0v2h3.586l-9.293 9.293 1.414 1.414L19 6.414V10h2V3z" /></svg>')
						}),
					]
				});
				$(header).after(wrapper);
				$(pencil).after(ctrl);
				wrapper.find('textarea').val(sections[2]);
				ctrl.get(0).scrollIntoView();
				ccmLoader(wrapper.find('textarea'));
			});
		});
	};
	
	// Launch
	mw.hook('dev.CCM.load').add(init);
	importArticles({ type: 'style', article: 'u:dev:MediaWiki:EmbeddedSectionEditor.css' });
	importArticles({ type: 'script', articles: [ 'u:dev:MediaWiki:Modal.js', 'u:dev:MediaWiki:CustomCodeMirror.js' ] });
}