'use strict';
mw.loader.using(['mediawiki.api'], () => {
	const api = new mw.Api();
	
	mw.hook('wikiEditor.toolbarReady').add(() => {
		const queryString = {
			modules: 'ext.fandom.wikiEditorFandomDesktop.css',
			only: 'styles',
		};
		const href = `/load.php?${new URLSearchParams(queryString).toString()}`;
		mw.loader.load(href, 'text/css');
	});
	
	mw.hook('ve.activationComplete').add(() => {
		const docNode = $('.ve-ce-documentNode');
		const classes = [
			`mw-content-${docNode.attr('dir')}`,
			'mw-parser-output',
			'mw-show-empty-elt',
		];
		docNode.addClass(classes);
	});
	
	const systemMsg = 'fandom-upload-form-label-own-work';
	api.loadMessagesIfMissing(systemMsg).done(() => {
		const parsedMsg = mw.message(systemMsg).parse();
		
		mw.hook('ve.activationComplete').add(() => {
			const mediaButton = '.oo-ui-toolGroup-enabled-tools .oo-ui-tool-name-media';
			mediaCheck(mediaButton);
		});
		
		function mediaCheck(mediaButton){
			if ($(mediaButton).length){
				$(mediaButton).on('click', () => {
					const uploadButton = '.ve-ui-mwMediaDialog-panel-search .oo-ui-tabOptionWidget:last-child';
					uploadCheck(uploadButton);
				});
			} else {
				setTimeout(mediaCheck, 100, mediaButton);
			}
		}
		
		function uploadCheck(uploadButton){
			if ($(uploadButton).length){
				$(uploadButton).on('click', () => {
					const agreeTxt = '.oo-ui-pageLayout-active .oo-ui-labelElement .oo-ui-labelElement-label:first-child';
					parseMsg(agreeTxt);
				});
			} else {
				setTimeout(uploadCheck, 100, uploadButton);
			}
		}
		
		function parseMsg(agreeTxt){
			if ($(agreeTxt).length){
				$(agreeTxt).html(parsedMsg);
			} else {
				setTimeout(parseMsg, 100, agreeTxt);
			}
		}
	});
});

// {{JavaScript category}}