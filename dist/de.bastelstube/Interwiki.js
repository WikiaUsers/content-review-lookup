mw.loader.using(['jquery.client', 'mediawiki.base','mediawiki.api', 'mediawiki.template.mustache']).then(function() {
	// Export global configuration
	const config = (window.interwikiInternational || {
		namespace: 'Interwiki',
		namespaceId: 0,
		mainPage: 'Interlanguage_test',
		interwikiSchema: '{{bStart}}Interwiki request|{{from}}|{{to}}{{bEnd}}',
		pageSchema: '{{bStart}}Interwiki request header{{bEnd}}\n\n' +
			'{{interwikis}}\n\n' +
			'~~' + '~~'
	});

	function shortUrl(url) {
		if (!url) return;
		var sUrl = "";
	  
		// Delete protocol and not main community url
		url = url.replace(/https?:\/{2}/g, '').replace(/\/wiki\/(.*)/g, '');
	  
		//Find parts: community name + language code
		var linkParts = /([\w.-]*)\.(?:wikia|fandom)?(?:\.(?:com|org)\/?)([\w-]{0,})/g.exec(url);
	  
		// No parts found, maybe already short form "it.community"
		if ( !linkParts ) {
		  linkParts = /([\w.-]*)/.exec(url);
		}
		if ( linkParts[2] ) {
		  sUrl = linkParts[2] + ".";
		}
	  
		sUrl += linkParts[1];
		return sUrl;
	}

	function init(i18n) {
		var exception = '';
		const userName = mw.config.get('wgUserName');
		if (mw.config.get('wgPageName') !== config.mainPage || !userName) {
			return;
		}

		mw.hook('dev.modal').add(function(modal) {
			mw.hook('dev.ui').add(function(ui) {
				const formSectionCSS = {
					display: 'flex',
					'align-items': 'start', 
					margin: 'auto',
					width: '95%',
					'justify-content': 'center',
					gap: '5px'
				};
				const labelCSS = {
					'font-weight': 'bold',
					'font-variant': 'small-caps',
					'flex-basis': '30%'
				};
				const inputCSS = {
					padding: '10px',
					border: '0',
					'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
					'border-radius': '.1em',
					'margin-top': '5px',
					'flex-grow': 1,
					resize: 'vertical',
					width: '30em'
				};

				var modal = new window.dev.modal.Modal({
					title: i18n.msg('title').plain(),
					content: {
						type: 'form',
						attr: {
							'class': 'WikiaForm',
							'id': 'interwikiForm',
							'method': '',
							'name': ''
						},
						children: [
							{
								type: 'div',
								classes: ['form-section'],
								style: { padding: '0 2em 1em' },
								html: i18n.msg('description').plain()
							},
							{
								type: 'div',
								classes: ['form-section'],
								style: formSectionCSS,
								children: [
									{
										type: 'label',
										style: labelCSS,
										text: i18n.msg('nameLabel').plain(),
										attr: {
											'for': 'wikiname'
										}
									},
									{
										type: 'input',
										style: inputCSS,
										attr: {
											'id': 'wikiname',
											'type': 'text',
											'required': '',
											'placeholder': i18n.msg('namePlaceholder').plain()
										}
									}
								]
							},
							{
								type: 'div',
								classes: ['form-section'],
								style: formSectionCSS,
								children: [
									{
										type: 'label',
										style: labelCSS,
										text: i18n.msg('interwikisLabel').plain(),
										attr: {
											'for': 'interwikisLines'
										}
									},
									{
										type: 'textarea',
										style: inputCSS,
										attr: {
											'id': 'interwikisLines',
											'required': '',
											'placeholder': i18n.msg('interwikisPlaceholder').plain()
										}
									}
								]
							}
						]
					},
					id: 'requestWindow',
					size: 'large',
					buttons: [{
						id: 'submitButton',
						text: i18n.msg('submitLabel').plain(),
						primary: true,
						event: 'submitForm'
					}],
					closeTitle: i18n.msg('closeLabel').plain(),
					events: {
						submitForm: function () {
							var $form = $('#interwikiForm'),
								wikiname = $form.find('#wikiname').val(),
								lines = $form.find('#interwikisLines').val();
							
							if (wikiname.trim() === '') {
								mw.notify(i18n.msg('noNameError').plain());
								return;
							}
							if (lines.trim() === '') {
								mw.notify(i18n.msg('noLinesError').plain());
								return;
							}

							const splitLines = lines.trim().split('\n');
							const interwikis = [];
							for (var i = 0; i < splitLines.length; i++) {
								const line = splitLines[i];
								const items = line.trim().split( ' ' );
								const first = shortUrl(items.shift());
								const last = shortUrl(items.pop());
								if (!first || !last) continue;
								interwikis.push([first, last]);
							}

							const linesCount = lines.trim().split('\n').length;
							const interwikisCount = interwikis.length;
							if (linesCount !== interwikisCount) {
								mw.notify(i18n.msg('interwikisCountError', linesCount, interwikisCount).plain());
								return;
							}

							const interwikiLines = [];
							for (var i = 0; i < interwikis.length; i++) {
								const interwiki = interwikis[i];
								const line = Mustache.render(config.interwikiSchema, {
									bStart: '{{',
									bEnd: '}}',
									from: interwiki[0],
									to: interwiki[1]
								});
								interwikiLines.push(line);
							}

							const wikitext = Mustache.render(config.pageSchema, {
								bStart: '{{',
								bEnd: '}}',
								interwikis: interwikiLines.join( '\n' )
							});

							modal.hide();

							const api = new mw.Api();
							api.get({
								action: 'query',
								list: 'allpages',
								apnamespace: config.namespaceId,
								apprefix: wikiname,
								aplimit: 'max'
							}).done(function (data) {
								const number = data.query.allpages.length + 1;
								const suffix = number === 1 ? '' : ' (' + number + ')';
								api.postWithEditToken({
									action: 'edit',
									title: config.namespace + ':' + wikiname + suffix,
									text: wikitext
								}).done(function (data) {
									if (data.edit && data.edit.warning) {
										mw.notify(data.edit.warning, {tag: 'interwiki', type: 'error'});
										return;
									}
									location.href = mw.util.getUrl(config.namespace + ':' + wikiname + suffix);
								}).fail(function () {
									mw.notify(i18n.msg('error').plain(), {tag: 'interwiki', type: 'error'});
								})
							}).fail(function () {
								mw.notify(i18n.msg('error').plain(), {tag: 'interwiki', type: 'error'});
							})
						}
					}
				});
				modal.create();
				$('#interwiki')
					.attr('class', 'wds-button btn-large')
					.text(i18n.msg('buttonLabel').plain())
					.wrap($('<div>').css('text-align', 'center'))
					.css('cursor', 'pointer')
					.on('click', function() {
						modal.show();
					});
			});
		});
	}

	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:Modal.js',
			'u:dev:MediaWiki:UI-js/code.js',
			'u:dev:MediaWiki:I18n-js/code.js'
		]
	});

	function preload(i18no) {
		$.when(i18no.loadMessages('Interwikis_International')).then(init)
	}

	mw.hook('dev.i18n').add(preload);
});