/* jshint undef: true, devel: true, typed: true, jquery: true, strict: true, eqeqeq: true, freeze: true, latedef: true, shadow: outer, varstmt: true, quotmark: single, esversion: 6, futurehostile: true */
/* global importArticles */
mw.loader.using('mediawiki.api', ()=>{
	'use strict';
	window.dev = window.dev || {};
	
	// Double load protection and check we're in Special:Upload
	if (window.dev.PageSwitch) { return; }
	else { window.dev.PageSwitch = true; }
	
	let 
	ui, api, modal, spinner,
	success = $('<svg class="wds-icon wds-icon-small" style="vertical-align: middle; color:var(--theme-success-color);"><use xlink:href="#wds-icons-checkmark-small"></use></svg>'),
	error = $('<svg class="wds-icon wds-icon-small" style="vertical-align: middle; color:var(--theme-alert-color);"><use xlink:href="#wds-icons-close-small"></use></svg>'),
	ps = {
		ns: mw.config.get('wgFormattedNamespaces'),
		api: new mw.Api(),
		init: ()=>{
			mw.util.addCSS(`
				.oo-ui-fieldLayout:has([name="psToggle"]):not(:has([name="psToggle"]:checked)) + .oo-ui-fieldLayout { display: none; }
				#pageSwitch {
					#pageSwitch-moves { list-style: decimal; margin-left: 30px; margin-bottom: 10px; }
					.cdx-message:not(.cdx-message--error, .cdx-message--success) { display: none; }
				}
			`);
			
			// Define UI
			let form  = $('form#movepage'),
				check = new OO.ui.CheckboxInputWidget({ selected: false, name: 'psToggle' }),
				middl = new OO.ui.TextInputWidget({ placeholder: 'e.g., "Temp1234", "'+new Date().toLocaleString()+'"', name: 'psMiddlePage' });
			ps.check = check;
			ps.middl = middl;
			
			// Update form
			form.find('.oo-ui-fieldLayout:has(#wpDeleteAndMove)').after(
				new OO.ui.FieldLayout(check, { label: 'No, switch the pages', align: 'inline' }).$element,
				new OO.ui.FieldLayout(middl, {
					label: 'Page name to use as temporary name when switching',
					align: 'top',
				}).$element
			);
			form.data('origtext', form.serialize()); // avoid "dirty" input warnings when leaving and nothing actually changed
			form.on('submit.pageSwitch', ps.onSubmit);
			form.find('[name="wpMove"]').on('click', ps.onSubmit);
		},
		onSubmit: ()=>{
			if (ps.check.$input.get(0).checked) {
				event.preventDefault();
				let temp = ps.middl.$input.val();
				if (temp.length!==0) {
					let curr = $('form#movepage [name="wpOldTitle"]').attr('value'),
						final = 
							ps.ns[$('form#movepage [name="wpNewTitleNs"] :selected').attr('value')]
							+':'+$('form#movepage [name="wpNewTitleMain"]').val(),
						moves = [
							[curr, temp],
							[final, curr],
							[temp, final]
						],
						progess = modal('Page Switch Process', {
							id: 'pageSwitch',
							onClose: () => progess.find('.mw-spinner').length === 0,
							content: ui.frag([
								ui.p({text: 'Please wait while the moves are performed:'}),
								ui.ul({id: 'pageSwitch-moves'}),
								ui.div({
									'class': 'cdx-message',
									children: [
										ui.span({ 'class': 'cdx-message__icon' }),
										ui.div({ 'class': 'cdx-message__content', })
									]
								})
							])
						}),
						doMove = (move) => {
							if (!move) {return;}
							
							let 
							rDrop = $('form#movepage [name="wpReasonList"] :selected').attr('value'),
							rText = $('form#movepage [name="wpReason"]').val(),
							change = ui.li({children: [
								'Moving ',
								ui.a({text:move[0], href: mw.util.getUrl(move[0])}),
								' to ',
								ui.a({text:move[1], href: mw.util.getUrl(move[1])}),
								' ',
								spinner().get(0)
							]}),
							opts = {
								action: 'move',
								noredirect: true,
								from: move[0],
								to: move[1],
								reason: 
									(rDrop !== 'other' ? rDrop : '')+
									((rDrop !== 'other' && rText.length>0) ? '; ' : '')+
									(rText.length>0 ? rText : '')
							};
							progess.find('#pageSwitch-moves').append(change);
							ps.api.postWithEditToken(opts).then((l)=>{
								if (l && l.move) {
									change.querySelector('.mw-spinner').replaceWith(success.clone().get(0));
									if (moves.length>0) {
										doMove(moves.shift());
									} else {
										progess.find('.cdx-message').addClass('cdx-message--success');
										progess.find('.cdx-message__content').text('All pages have been moved! You may now close this modal or continue to either of the pages through the links in the list above.');
									}
								} else {
									console.log(l, 'then');
									progess.find('.mw-spinner').replaceWith(error.clone());
									progess.find('.cdx-message').addClass('cdx-message--error');
									progess.find('.cdx-message__content').html(
										'<div>The moves have failed, please revise the pages before trying again.</div>'+
										((l && l.error && l.info) ? (
											'<div>The following error information was returned by the API:\n<code style="display:block;">'+l.error.info+'</code></div>'
										) : '')
									);
								}
							}).catch((_, l)=>{
								console.log(l, 'catch');
								progess.find('.mw-spinner').replaceWith(error.clone());
								progess.find('.cdx-message').addClass('cdx-message--error');
								progess.find('.cdx-message__content').html(
									'<div>The moves have failed, please revise the pages before trying again.</div>'+
									((l && l.error && l.error.info) ? (
										'<div>The following error information was returned by the API:\n<code style="display:block;">'+l.error.info+'</code></div>'
									) : '')
								);
							});
						};
					doMove(moves.shift());
				}
			}
		}
	};
	if (
		/sysop|content-moderator|bot|bot-global|staff|global-discussions-moderator|content-volunteer|wiki-specialist|soap|global-edit-reviewer/.test(mw.config.get('wgUserGroups').join())
		&& mw.config.get('wgCanonicalSpecialPageName')==='Movepage'
		&& new URL(location.href).searchParams.has('action', 'submit')
		&& $('form#movepage #wpDeleteAndMove').length>0
	) {
		// Start the process
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:Dorui.js',
				'u:dev:MediaWiki:ShowCustomModal.js'
			]
		});
		let Phook = (hook) => new Promise(r => mw.hook(hook).add(r));
		Promise.all([
			Phook('doru.ui').then(dui => ui = dui),
			Phook('dev.showCustomModal').then(dmodal => modal = dmodal),
			mw.loader.using('mediawiki.api').then(() => api = new mw.Api()),
			mw.loader.using('jquery.spinner').then(spin => spinner = $.createSpinner)
		]).then(ps.init);
	}
});