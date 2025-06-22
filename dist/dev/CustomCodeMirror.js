/* jshint
undef: true,
devel: true,
typed: true,
jquery: true,
strict: true,
eqeqeq: true,
freeze: true,
latedef: true,
shadow: outer,
varstmt: true,
quotmark: single,
esversion: 6,
futurehostile: true
*//* global
importArticle
*/
mw.loader.using( [
	'ext.wikiEditor',
	'ext.CodeMirror.v6.WikiEditor',
	'ext.CodeMirror.v6.mode.mediawiki',
	'ext.CodeMirror.v6.lib',
	'mediawiki.api'
] ).then( ( require ) => {
	window.dev = window.dev || {};
	if (window.dev.CCM) {return;}
	else {window.dev.CCM = true;}
	
	// Necessary CSS
	importArticle({ type: 'style', article: 'u:dev:MediaWiki:CustomCodeMirror.css' });
	
	const
	CodeMirrorWikiEditor = require( 'ext.CodeMirror.v6.WikiEditor' ),
	mediawikiLang = require( 'ext.CodeMirror.v6.mode.mediawiki' ),
	api = new mw.Api(),
	loader = (txt) => {
		if (txt && txt instanceof Element) {txt = $(txt);}
		if (!(txt && txt instanceof jQuery && txt.get(0).nodeName === 'TEXTAREA')) { console.log('CCM.load: the input is neither an element, nor a jquery object, nor a textarea!'); return; }

		// The default process requires the textarea to have a specific ID, we'll revert this later
		const txtID = txt.attr('id');
		txt.attr('id', 'wpTextbox1');
		mw.addWikiEditor( txt );
		
		// Initialize
		const cmWE = new CodeMirrorWikiEditor( txt );
		cmWE.initialize( [ cmWE.defaultExtensions, mediawikiLang() ] );
		cmWE.addCodeMirrorToWikiEditor();
		
		// Post-init fixes
		$('.group-codemirror').remove(); // some internal setting is impossible to fix, so disable the disabling of syntaxhighlight
		txt.attr('id', txtID); // Return to original ID
		
		// Link suggest custom implementation
		let inst = $(cmWE.view.dom);
		let suggList = $('<div>', {
			'class':'cm-layer cm-linksuggest oo-ui-popupWidget-anchored oo-ui-popupWidget-anchored-top',
			html: [
				$('<div>', {'class': 'oo-ui-popupWidget-popup' }),
				$('<div>', {'class': 'oo-ui-popupWidget-anchor', style: 'left: 12px;'})
			]
		});
		$('.ext-codemirror-wrapper').before(suggList);
		let 
		suggesting = '',
		matchCaret = ()=>{
			const	carTop = inst.find('.cm-cursor').css('top').replace(/px/, ''),
					carLeft = inst.find('.cm-cursor').css('left').replace(/px/, ''),
					scroll = inst.find('.cm-scroller').scrollTop();
			suggList.css('display', (carTop < scroll) ? 'none' : '');
			suggList.css('top', Number($('.cm-cursor').css('top').replace(/px/, ''))-inst.find('.cm-scroller').scrollTop()+10+'px');
			suggList.css('left', (Number($('.cm-cursor').css('left').replace(/px/, ''))-10)+'px');
		},
		genSugg = mw.util.debounce(()=>{
			let range = cmWE.view.state.selection.ranges[0];
			if (range.from!==range.to) {return;}
			let uptoCaret = cmWE.view.state.doc.toString().substring(0, range.from),
				rgxCheck = /(\[\[:?|\{\{:?)([^\n\{\|\}\[\]]+)$/;
			if (uptoCaret && rgxCheck.test(uptoCaret)) {
				let matches = rgxCheck.exec(uptoCaret),
					selWidget = new OO.ui.SelectWidget();
				if (suggesting === (matches[1].startsWith('{{') ? 'Template:' : '') + matches[2]) {return;}
				else {suggesting = (matches[1].startsWith('{{') ? 'Template:' : '') + matches[2];}
				suggList.children('.oo-ui-popupWidget-popup').empty();
				api.get({
					action: 'linksuggest',
					'get': 'suggestions',
					query: (matches[1].startsWith('{{') ? 'Template:' : '') + matches[2]
				}).then((d)=>{
					let data = d.linksuggest.result.suggestions,
						list = suggList.children('.oo-ui-popupWidget-popup'),
						opts = [];
						list.empty();
					data.forEach((sugg)=>{
						let opt = $('<div>', { tabindex: '0', text: sugg, 'class': 'cm-linksuggest-suggest' });
						opt.on('click', (e)=>{
							suggList.children('.oo-ui-popupWidget-popup').empty();
							let repl = matches[1]+sugg+(matches[1].startsWith('{{') ? '}}' : ']]'),
								from = Math.max(0, uptoCaret.length - matches[0].length);
							repl = repl.replace(/^([\{:]+)Template:/i, '$1');
							// Apply link suggestion
							cmWE.view.dispatch({
								changes: { from: from, to: uptoCaret.length, insert: repl },
								selection: { anchor: from+repl.length }
							});
							cmWE.view.focus();
						});
						opts.push(opt);
					});
					matchCaret();
					list.append(opts);
				});
			} else {
				suggesting = '';
				suggList.css('display', 'none');
				suggList.children('.oo-ui-popupWidget-popup').empty();
			}
		}, 250),
		
		/// Suggestion generation
		handleInput = (event) => {
			if (event.type==='keydown' && ['ArrowDown', 'ArrowUp'].includes(event.key) && $('.cm-linksuggest-suggest').length>0) {
				event.preventDefault();
				event.stopPropagation();
				let opts = $('.cm-linksuggest-suggest'),
					target = opts.index($('.cm-linksuggest-selected'))+{ArrowUp: -1, ArrowDown: +1}[event.key];
				if (target <= -1) {target = opts.length-1;}
				else if (target >= opts.length) {target = 0;}
				opts
					.filter('.cm-linksuggest-selected')
					.add(opts.get(target))
					.toggleClass('cm-linksuggest-selected');
			} else if (event.type==='keydown' && event.key==='Enter' && $('.cm-linksuggest-selected').length>0) {
				event.preventDefault();event.stopPropagation();
				$('.cm-linksuggest-selected').click();
			} else if (event.type==='keydown' && event.key.toLowerCase()==='f' && event.ctrlKey) {
				const
				sel = cmWE.view.state.sliceDoc(cmWE.view.state.selection.main.from, cmWE.view.state.selection.main.to),
				sch = inst.find('.cdx-text-input__input[name="search"]');
				if (sel.length>0 && sch.length>0) { sch.val(sel); }
			} else {
				genSugg();
			}
		};
		
		suggList.on('mouseenter mouseleave', ()=>{$('.cm-linksuggest-selected').toggleClass('cm-linksuggest-selected', false);});
		inst.find('.cm-content').get(0).addEventListener('keydown', handleInput, { capture: true });
		inst.find('.cm-content').get(0).addEventListener('click', handleInput, { capture: true });
		
		// Fire for any userjs that uses it
		mw.hook('ext.CodeMirror.ready').fire( inst, cmWE );
		mw.hook('dev.CCM.ready').fire( cmWE );
	};
	
	// Startup the process
	mw.hook('dev.CCM.load').fire(loader);
});