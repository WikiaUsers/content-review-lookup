 mw.loader.using(['jquery.client', 'mediawiki.base','mediawiki.api', 'mediawiki.template.mustache']).then(function() {
	new mw.Api().done(function() {
		function capitalize(text) {
			return text.charAt(0).toUpperCase() + text.slice(1);
		}

		// Export global configuration
		window.interwikiInternational = (window.interwikiInternational || {});

		

		// Configuration for interwikis mainpage and namespace
		window.interwikiInternational.pageConfig = (window.interwikiInternational.pageConfig || {
			namespace: 'Interwiki',
			namespaceId: 119,
			interwikisPage: 'Interwiki:Requests'
		});

		/**
		 * Wikitext schema for interwiki request's page
		 *
		 * Available variables:
		 * {{wikiName}} - name of the wikis
		 * {{{wikiURL}}} - URL of the wikis
		 */
		window.interwikiInternational.wikitextSchema = (window.interwikiInternational.wikitextSchema || "{{InterwikiRequest|{{wikiUrl1}}|{{wikiUrl2}}");

		/* I18n for interwiki form
		window.interwikiInternational.i18n = (window.interwikiInternational.i18n || {

		});*/

		// Shorter, local variable for config
		const interwikiConf = window.interwikiInternational;


		var exception = '';

		function filterFandomDomain(input, fAllowed) {
			var fandomDomainRE = /(?:https?:\/\/)?(.*?\.)(fandom\.com)(\/[^\/]*?)?(?:\/.*)?$/;
			var filteredDomain = input.match(fandomDomainRE);
			if (!filteredDomain) return null;
			filteredDomain.splice(0,1);
			if (filteredDomain[2] === '/wiki' || filteredDomain[2] === '/f') filteredDomain.pop();
			return filteredDomain.join('');
		}
		mw.hook('dev.modal').add(function(modal) {
			mw.hook('dev.ui').add(function(ui) {
				var interwikiModal = new window.dev.modal.Modal({
					title: interwikiConf.i18n.modalTitle,
					content: {
						type: 'form',
						attr: {
							'class': 'WikiaForm',
							'id': 'interwiki',
							'method': '',
							'name': ''
						},
						children: [
							{
								type: 'div',
								classes: ['form-section'],
								children: [
									{
										type: 'label',
										text: interwikiConf.i18n.linkLabel,
										attr: {
											'for': 'interwikiUrl'
										}
									},
									{
										type: 'input',
										attr: {
											'id': 'interwikiUrl',
											'type': 'text',
											'required': '',
											'placeholder': interwikiConf.i18n.placeholderUrl
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
										text: interwikiConf.i18n.nameLabel,
										attr: {
											'for': 'wikiname'
										}
									},
									{
										type: 'input',
										classes: ['interwikiPrefill'],
										attr: {
											'id': 'wikiname',
											'type': 'text',
											'disabled': '',
											'required': '',
											'placeholder': interwikiConf.i18n.nameLabel
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
						text: interwikiConf.i18n.submitLabel,
						primary: true,
						event: 'submitForm'
					}],
					closeTitle: interwikiConf.i18n.closeLabel,
					events: {
						submitForm: function () {
							var $form = $('#interwiki'),
								wikiname = $form.find('#wikiname').val(),
								url = 'https://'+filterFandomDomain($form.find('#interwikiUrl').val());
							if (exception !== '') {
								mw.notify(exception,{tag:'interwiki',type:'error'});
								return;
							}
							if (url.trim() === "") {
								mw.notify(interwikiConf.i18n.noUrlError,{tag:'interwiki',type:'warn'});
								return;
							}
							if (wikiname.trim() === "") {
								mw.notify(interwikiConf.i18n.noNameError,{tag:'interwiki',type:'warn'});
								return;
							}

							var pagecontent = Mustache.render(interwikiConf.wikitextSchema, {
								wikiName: wikiname,
								wikiURL: url
							});

							interwikiModal.hide();
							new mw.Api().get({
								action: 'query',
								list: 'allpages',
								apnamespace: interwikiConf.pageConfig.namespaceId,
								apprefix: wikiname,
								aplimit: 'max'
							}).done(function (data) {
								var suffix = '';
								var highestInterwiki = 0;
								var suffixRE = /.*\((\d+)\)/;
								if (data.query) {
									if (data.query.allpages.length > 0) highestInterwiki = 1;
									for (var p in data.query.allpages) {
										if (data.query.allpages[p].title === undefined) continue;
										var match = data.query.allpages[p].title.match(suffixRE);
										if (!match) continue;
										if (parseInt(match[1]) > highestInterwiki) highesInterwiki = parseInt(match[1]);
									}
									if (highestInterwiki > 0) suffix = ' ('+(highestInterwiki+1)+')';
								}
								new mw.Api().postWithEditToken({
									action: 'edit',
									title: interwikiConf.pageConfig.namespace + ":"+wikiname+suffix,
									text: pagecontent
								}).done(function (data) {
									if (data.edit) {
										if (data.edit.warning) {
											mw.notify(data.edit.warning, {tag:'interwiki',type:'error'});
											return;
										}
									}
									location.href = mw.util.getUrl(interwikiConf.pageConfig.namespace + ":"+wikiname+suffix);
								}).fail(function () {
									mw.notify(interwikiConf.i18n.processFailError, {tag:'interwiki',type:'error'});
								});
							}).fail(function () {
								mw.notify(interwikiConf.i18n.submitError, {tag:'interwiki',type:'error'});
							});
						}
					}
				});
				interwikiModal.create();
				$('#interwiki-form')
					.attr('class', 'wds-button btn-large')
					.text(interwikiConf.i18n.interwikiButtonLabel)
					.wrap($('<div>').css('text-align', 'center'))
					.css('cursor', 'pointer')
					.on('click', function() {
						interwikiModal.show();
					});
			});
		});

		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:Modal.js',
				'u:dev:MediaWiki:UI-js/code.js'
			]
		});
		$('body').off('change.interwikiURL').on('change.interwikiURL','#interwikiUrl',function() {
			$('.interwikiPrefill').prop('disabled',true);
			exception = '';
			var url = filterFandomDomain($('#interwikiUrl').val());
			if (!url) {
				mw.notify(interwikiConf.i18n.invalidUrlError,{tag:'interwiki',type:'error'});
				$('.interwikiPrefill').prop('disabled',false);
				return;
			}
			
			$.getJSON('//'+url+'/api.php?format=json&callback=?',{
				action:'query',
				meta:'siteinfo',
				siprop:'general|statistics',
				uclimit:'max',
				ucnamespace:0,
				ucdir:'newer',
				aulimit:'max',
				auwitheditsonly:1
			}).done(function(data) {
				if (!data.query) {
					mw.notify(interwikiConf.i18n.automaticQueryError,{tag:'interwiki',type:'error'});
					$('.interwikiPrefill').prop('disabled',false);
					return;
				}
				if (data.query.general) {
					if (interwikiConf.unsupportedLanguages.indexOf(data.query.general.lang) != -1) {
						mw.notify(interwikiConf.i18n.invalidLanguageError,{tag:'interwiki',type:'warn'});
					}
					$('#wikiname').val(data.query.general.sitename);
				}


			}).fail(function(data) {
				mw.notify(interwikiConf.i18n.automaticQueryError,{tag:'interwiki',type:'error'});
				$('.interwikiPrefill').prop('disabled',false);
				return;
			});
		});
	});
});