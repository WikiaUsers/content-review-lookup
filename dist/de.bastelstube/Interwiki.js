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
				var modal = new window.dev.modal.Modal({
					title: 'Interwiki request',//i18n.msg('modalTitle').plain(),
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
								text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non malesuada lorem. In facilisis augue et mauris vulputate finibus. Vivamus accumsan volutpat consectetur. Ut mattis facilisis porta. Praesent pulvinar ornare erat at efficitur. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam in enim elit. Nulla maximus maximus augue, id interdum odio dapibus sit amet. Vivamus aliquam convallis lorem, at faucibus leo faucibus eget. '
							},
							{
								type: 'div',
								classes: ['form-section'],
								children: [
									{
										type: 'label',
										text: 'Wiki name',//i18n.msg('linkLabel').plain(),
										attr: {
											'for': 'wikiname'
										}
									},
									{
										type: 'input',
										attr: {
											'id': 'wikiname',
											'type': 'text',
											'required': '',
											'placeholder': 'Example Wiki',//i18n.msg('placeholderUrl').plain()
										}
									}
								]
							},
							{
								type: 'div',
								classes: ['form-section'],
								children: [
									{
										type: 'label',
										text: 'Interwikis (per line)',//i18n.msg('linkLabel').plain(),
										attr: {
											'for': 'interwikisLines'
										}
									},
									{
										type: 'textarea',
										attr: {
											'id': 'interwikisLines',
											'required': '',
											'placeholder': 'wiki.fandom.com/fr -> wiki.fandom.com/es',//i18n.msg('placeholderUrl').plain()
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
						text: 'Submit', //i18n.msg('submitLabel').plain(),
						primary: true,
						event: 'submitForm'
					}],
					closeTitle: 'Close', //i18n.msg('closeLabel').plain(),
					events: {
						submitForm: function () {
							var $form = $('#interwikiForm'),
								wikiname = $form.find('#wikiname').val(),
								lines = $form.find('#interwikisLines').val();
							
							if (wikiname.trim() === '') {
								mw.notify('No wikiname');
								return;
							}
							if (lines.trim() === '') {
								mw.notify('No lines');
								return;
							}

							const interwikis = lines.split('\n').map(function (i) {
								const items = i.trim().split( ' ' );
								return [ items.shift(), items.pop() ].map(shortUrl);
							});

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
									mw.notify('An unexpected error occurred. Please try again later.', {tag: 'interwiki', type: 'error'});
								})
							}).fail(function () {
								mw.notify('An unexpected error occurred. Please try again later.', {tag: 'interwiki', type: 'error'});
							})
						}
					}
				});
				modal.create();
				$('#interwiki')
					.attr('class', 'wds-button btn-large')
					.text('Request interwikis')
					//.text(i18n.msg('adoptionButtonLabel').plain())
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

	init();
	/*
	function preload(i18no) {
		$.when(
			i18no.loadMessages('Adoptions_International'),
			new mw.Api().loadMessagesIfMissing(window.adoptInternational.adoptionConfig.permissionTypes.map(function(group) {
				return 'group-' + group + '-member'
			}))
		).then(init)
	}

	mw.hook('dev.i18n').add(preload);
	*/
});