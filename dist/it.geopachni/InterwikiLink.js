/** <nowiki>
 * @name: Adoptions International
 * @description: Forked form for adoptions tweaked for international wikis
 * @author: Pcj (based on work by Unai01, Lil' Miss Rarity, Jr Mime and bola) - original
 * @author: Rail, bitomic, MtaÄ - fork
 */
 mw.loader.using(['jquery.client', 'mediawiki.base','mediawiki.api', 'mediawiki.template.mustache']).then(function() {
	new mw.Api().loadMessagesIfMissing(['group-bureaucrat-member', 'group-sysop-member', 'group-content-moderator-member']).done(function() {
		function capitalize(text) {
			return text.charAt(0).toUpperCase() + text.slice(1);
		}

		// Export global configuration
		window.adoptInternational = (window.adoptInternational || {});

		// Wikis in those languages will *error* when user tries to adopt them
		window.adoptInternational.unsupportedLanguages = (window.adoptInternational.unsupportedLanguages || [
			'en','es','de','fr','ru','it','nl','pl','pt','pt-br','zh'
		]);

		// Configuration for adopts mainpage and namespace
		window.adoptInternational.pageConfig = (window.adoptInternational.pageConfig || {
			namespace: 'Adoption',
			namespaceId: 118,
			adoptionsPage: 'Adoption:Requests'
		});

		/**
		 * Wikitext schema for adoption request's page
		 *
		 * Available variables:
		 * {{userName}} - Currently logged user
		 * {{wikiName}} - name of the wiki they want to adopt
		 * {{{wikiURL}}} - URL of the wiki they want to adopt
		 * {{permissionsType}} - Type of permissions they request
		 * {{numDays}} - Number of days they were active in within last 10 days
		 * {{numAdmins}} - Number of admins active in last 60 days
		 * {{comments}} - Their comments and rationale for adoption
		 * {{{communityVote}}} - URL to Discussions post with community vote for their request
		 *
		 * Technical:
		 * - {{bStart}} - replaced with "{{"
		 * - {{bEnd}} - replaced with "}}"
		 * Above are used because Mustache.js syntax collided with wikitext templates
		 */
		window.adoptInternational.wikitextSchema = (window.adoptInternational.wikitextSchema || "{{bStart}}Forumheader/Adoption requests{{bEnd}}\n\n'''What is your username?'''\n{{userName}}\n\n'''Please link to the wiki here:'''\n{{{wikiURL}}}\n\n'''How many days have you edited the wiki in the past 10 days?'''\n{{numDays}}\n\n'''On the Special Pages  → Special:ListAdmins, how many admins have been active in the past 60 days?'''\n{{numAdmins}}\n\n'''Comments/Reasons for adoption:'''\n<nowiki>{{comments}}</nowiki>\n\n\n[[Category:Adoption requests|{{bStart}}PAGENAME{{bEnd}}]]");

		// I18n for adoption form
		window.adoptInternational.i18n = (window.adoptInternational.i18n || {
			activeAdminsError: 'Please keep in mind if there are already active admins you should contact them first regarding becoming admin yourself.',
			adminsActivityLabel: 'Number of admins active in the past 60 days',
			adoptionButtonLabel: 'Adopt wiki',
			alreadyAdminError: 'You are already an admin on this wiki. Please keep in mind you do not need to adopt a wiki you are already admin for unless you are applying to be a bureaucrat.',
			alreadyBureaucratError: 'You are already a bureaucrat on this wiki. You do not need to adopt this wiki.',
			automaticQueryError: 'The wiki did not respond to an automated query. You will have to fill out the requested values.',
			ccError: 'Fandom-branded wikis are not available to be adopted.',
			closeLabel: 'Cancel',
			commentsLabel: 'Comments/Reasons to Adopt',
			communityVoteLabel: 'Community vote',
			invalidLanguageError: 'For international adoption requests, please expand the International adoption request links section and visit the Community Central for your language to make an adoption request.',
			invalidUrlError: 'The format of the URL provided was not recognized.',
			linkLabel: 'Link',
			modalTitle: 'Adoption Request',
			nameLabel: 'Wiki Name',
			noActivityError: 'Please keep in mind you should have contributed consistently to the wiki for a week prior to submitting a request.',
			noCommentsError: 'Please try to leave some rationale as to why you want to adopt this wiki and why you would be a good fit as admin.',
			noEditsError: 'You must have contributed to the wiki in the past week in order to adopt it.',
			noNameError: 'Please enter the wiki name.',
			noUrlError: 'Please enter the wiki URL.',
			permissionLabel: 'Permissions type',
			placeholderComments: 'Comments about the adoption request. Please tell us why you want to adopt the wiki and how you are a good candidate to be admin.',
			placeholderDiscussionsPost: 'Discussions post ID',
			placeholderUrl: 'https://wiki.fandom.com/',
			processFailError: 'There were problems submitting your request.',
			provideCommunityVote: 'There appear to be at least a few other active users on the wiki. Please consider creating a Discussions post describing your intention to adopt the wiki and let them give their feedback. If you already have, please be sure to include a link to that post.',
			submitError: 'There were problems submitting your request.',
			submitLabel: 'Submit',
			userActivityLabel: 'Number of days edited in the past 10 days'
		});

		// Shorter, local variable for config
		const adoptConf = window.adoptInternational;

		// All Fandom-branded wikis
		const fandomWikis = [
			// CCs
			'community.fandom.com/de',
			'community.fandom.com',
			'comunidad.fandom.com',
			'yhteiso.fandom.com',
			'communaute.fandom.com/fr',
			'community.fandom.com/it',
			'community.fandom.com/ja',
			'community.fandom.com/ko',
			'community.fandom.com/nl',
			'spolecznosc.fandom.com',
			'comunidade.fandom.com',
			'community.fandom.com/ru',
			'community.fandom.com/vi',
			'community.fandom.com/zh',

			'community.fandom.com/ar',
			'community.fandom.com/bg',
			'community.fandom.com/ca',
			'community.fandom.com/cs',
			'community.fandom.com/da',
			'community.fandom.com/de',
			'community.fandom.com/el',

			'community.fandom.com/en',
			'community.fandom.com/es',
			'community.fandom.com/et',
			'community.fandom.com/fa',
			'community.fandom.com/fi',
			'community.fandom.com/fr',
			'community.fandom.com/he',
			'community.fandom.com/hi',
			'community.fandom.com/hr',
			'community.fandom.com/hu',
			'community.fandom.com/id',
			'community.fandom.com/it',
			'community.fandom.com/ja',
			'community.fandom.com/ko',
			'community.fandom.com/ms',
			'community.fandom.com/nl',
			'community.fandom.com/no',
			'community.fandom.com/pl',
			'community.fandom.com/pt',
			'community.fandom.com/pt-br',
			'community.fandom.com/ro',
			'community.fandom.com/ru',
			'community.fandom.com/sr',
			'community.fandom.com/sv',
			'community.fandom.com/th',
			'community.fandom.com/tl',
			'community.fandom.com/tr',
			'community.fandom.com/uk',
			'community.fandom.com/vi',
			'community.fandom.com/zh',
			'community.fandom.com/zh',
			// Other
			'dev.fandom.com',
			'connect.fandom.com',
			'soap.fandom.com'
		];

		var exception = '';
		const userName = mw.config.get('wgUserName');
		if (mw.config.get('wgPageName') !== adoptConf.pageConfig.adoptionsPage || !userName) {
			return;
		}
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
				var adoptionModal = new window.dev.modal.Modal({
					title: adoptConf.i18n.modalTitle,
					content: {
						type: 'form',
						attr: {
							'class': 'WikiaForm',
							'id': 'adoption',
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
										text: adoptConf.i18n.linkLabel,
										attr: {
											'for': 'adoptionUrl'
										}
									},
									{
										type: 'input',
										attr: {
											'id': 'adoptionUrl',
											'type': 'text',
											'required': '',
											'placeholder': adoptConf.i18n.placeholderUrl
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
										text: adoptConf.i18n.nameLabel,
										attr: {
											'for': 'wikiname'
										}
									},
									{
										type: 'input',
										classes: ['adoptionPrefill'],
										attr: {
											'id': 'wikiname',
											'type': 'text',
											'disabled': '',
											'required': '',
											'placeholder': adoptConf.i18n.nameLabel
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
										text: adoptConf.i18n.permissionLabel,
										attr: {
											'for': 'permissionstype'
										}
									},
									{
										type: 'select',
										attr: {
											'id': 'permissionstype',
											'required': ''
										},
										children: [
											{
												type: 'option',
												text: capitalize( mw.message('group-bureaucrat-member').parse(userName) ),
												attr: {
													'value': 'bureaucrat'
												}
											},
											{
												type: 'option',
												text: capitalize( mw.message('group-sysop-member').parse(userName) ),
												attr: {
													'value': 'sysop'
												}
											},
											{
												type: 'option',
												text: capitalize( mw.message('group-content-moderator-member').parse(userName) ),
												attr: {
													'value': 'content-moderator'
												}
											}
										]
									}
								]
							},
							{
								type: 'div',
								classes: ['form-section'],
								children: [
									{
										type: 'label',
										text: adoptConf.i18n.userActivityLabel,
										attr: {
											'for': 'numDays'
										}
									},
									{
										type: 'input',
										classes: ['adoptionPrefill'],
										attr: {
											'id': 'numDays',
											'type': 'number',
											'value': '0',
											'disabled': '',
											'required': ''
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
										text: adoptConf.i18n.adminsActivityLabel,
										attr: {
											'for': 'numAdmins'
										}
									},
									{
										type: 'input',
										classes: ['adoptionPrefill'],
										attr: {
											'id': 'numAdmins',
											'type': 'number',
											'value': '0',
											'disabled': '',
											'required': ''
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
										text: adoptConf.i18n.communityVoteLabel,
										attr: {
											'for': 'communityvote'
										}
									},
									{
										type: 'span',
										text: adoptConf.i18n.placeholderUrl + '/f/p/',
										attr: {
											'id': 'communityvote-prefix'
										}
									},
									{
										type: 'input',
										attr: {
											'id': 'communityvote',
											'type': 'number',
											'placeholder': adoptConf.i18n.placeholderDiscussionsPost
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
										text: adoptConf.i18n.commentsLabel,
										attr: {
											'for': 'comment'
										}
									},
									{
										type: 'textarea',
										attr: {
											'id': 'comment',
											'name': '',
											'placeholder': adoptConf.i18n.placeholderComments
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
						text: adoptConf.i18n.submitLabel,
						primary: true,
						event: 'submitForm'
					}],
					closeTitle: adoptConf.i18n.closeLabel,
					events: {
						submitForm: function () {
							var $form = $('#adoption'),
								wikiname = $form.find('#wikiname').val(),
								url = 'https://'+filterFandomDomain($form.find('#adoptionUrl').val()),
								permissionsType = $form.find('#permissionstype').val(),
								numDays = $form.find('#numDays').val() || 0,
								numAdmins = $form.find('#numAdmins').val() || 0,
								comments = $form.find('#comment').val(),
								communityVoteUrl = url + '/f/p/' + $form.find('#communityvote').val();
							if (exception !== '') {
								mw.notify(exception,{tag:'adoption',type:'error'});
								return;
							}
							if (url.trim() === "") {
								mw.notify(adoptConf.i18n.noUrlError,{tag:'adoption',type:'warn'});
								return;
							}
							if (wikiname.trim() === "") {
								mw.notify(adoptConf.i18n.noNameError,{tag:'adoption',type:'warn'});
								return;
							}
							if (comments.trim() === "") {
								mw.notify(adoptConf.i18n.noCommentsError,{tag:'adoption',type:'warn'});
								return;
							}

							var pagecontent = Mustache.render(adoptConf.wikitextSchema, {
								userName: userName,
								wikiName: wikiname,
								wikiURL: url,
								permissionsType: permissionsType,
								numDays: numDays,
								numAdmins: numAdmins,
								comments: comments,
								communityVote: communityVoteUrl,
								// Don't ask
								bStart: '{{',
								bEnd: '}}'
							});

							adoptionModal.hide();
							new mw.Api().get({
								action: 'query',
								list: 'allpages',
								apnamespace: adoptConf.pageConfig.namespaceId,
								apprefix: wikiname,
								aplimit: 'max'
							}).done(function (data) {
								var suffix = '';
								var highestAdoption = 0;
								var suffixRE = /.*\((\d+)\)/;
								if (data.query) {
									if (data.query.allpages.length > 0) highestAdoption = 1;
									for (var p in data.query.allpages) {
										if (data.query.allpages[p].title === undefined) continue;
										var match = data.query.allpages[p].title.match(suffixRE);
										if (!match) continue;
										if (parseInt(match[1]) > highestAdoption) highestAdoption = parseInt(match[1]);
									}
									if (highestAdoption > 0) suffix = ' ('+(highestAdoption+1)+')';
								}
								new mw.Api().postWithEditToken({
									action: 'edit',
									title: adoptConf.pageConfig.namespace + ":"+wikiname+suffix,
									text: pagecontent
								}).done(function (data) {
									if (data.edit) {
										if (data.edit.warning) {
											mw.notify(data.edit.warning, {tag:'adoption',type:'error'});
											return;
										}
									}
									location.href = mw.util.getUrl(adoptConf.pageConfig.namespace + ":"+wikiname+suffix);
								}).fail(function () {
									mw.notify(adoptConf.i18n.processFailError, {tag:'adoption',type:'error'});
								});
							}).fail(function () {
								mw.notify(adoptConf.i18n.submitError, {tag:'adoption',type:'error'});
							});
						}
					}
				});
				adoptionModal.create();
				$('#adoption-form')
					.attr('class', 'wds-button btn-large')
					.text(adoptConf.i18n.adoptionButtonLabel)
					.wrap($('<div>').css('text-align', 'center'))
					.css('cursor', 'pointer')
					.on('click', function() {
						adoptionModal.show();
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
		$('body').off('change.adoptionURL').on('change.adoptionURL','#adoptionUrl',function() {
			$('.adoptionPrefill').prop('disabled',true);
			exception = '';
			var url = filterFandomDomain($('#adoptionUrl').val());
			if (!url) {
				mw.notify(adoptConf.i18n.invalidUrlError,{tag:'adoption',type:'error'});
				$('.adoptionPrefill').prop('disabled',false);
				return;
			}
			if (fandomWikis.includes(url)) {
				exception = adoptConf.i18n.ccError;
				mw.notify(exception,{tag:'adoption',type:'error'});
				return;
			}
			$.getJSON('//'+url+'/api.php?format=json&callback=?',{
				action:'query',
				meta:'siteinfo',
				siprop:'general|statistics',
				list:'allusers|usercontribs|users',
				uclimit:'max',
				ucuser:userName,
				ucnamespace:0,
				ucdir:'newer',
				ucstart:Math.floor((new Date().getTime()-864000000)/1000), // edits by user in the last 10 days
				augroup:'sysop|bureaucrat',
				aulimit:'max',
				auwitheditsonly:1, // avoid auactiveusersonly
				usprop:'groups',
				ususers:userName
			}).done(function(data) {
				if (!data.query) {
					mw.notify(adoptConf.i18n.automaticQueryError,{tag:'adoption',type:'error'});
					$('.adoptionPrefill').prop('disabled',false);
					return;
				}
				if (data.query.general) {
					if (adoptConf.unsupportedLanguages.indexOf(data.query.general.lang) != -1) {
						mw.notify(adoptConf.i18n.invalidLanguageError,{tag:'adoption',type:'warn'});
					}
					$('#wikiname').val(data.query.general.sitename);
					$('#communityvote-prefix').text('https://' + url + '/f/p/');
				}
				if (data.query.statistics) {
					if (data.query.statistics.activeusers > 3) {
						mw.notify(adoptConf.i18n.provideCommunityVote, {tag:'adoption',type:'warn'});
					}
				}
				var ucDays = 0;
				if (data.query.usercontribs) {
					if (data.query.usercontribs.length === 0) {
						exception = adoptConf.i18n.noEditsError;
						mw.notify(exception,{tag:'adoption',type:'warn'});
						return;
					}
					var ucDArr = [];
					for (var u in data.query.usercontribs) {
						var ucDay = data.query.usercontribs[u].timestamp.slice(0,10);
						if (ucDArr.indexOf(ucDay) == -1) ucDArr.push(ucDay);
					}
					ucDays = ucDArr.length;
					if (ucDays < 5) {
						mw.notify(adoptConf.i18n.noActivityError,{tag:'adoption',type:'warn'});
					}
				}
				$('#numDays').val(ucDays);
				if (data.query.users) {
					if (data.query.users[0]) {
						if (data.query.users[0].groups) {
							if (data.query.users[0].groups.indexOf('bureaucrat') > -1) {
								exception = adoptConf.i18n.alreadyBureaucratError;
								mw.notify(exception,{tag:'adoption',type:'error'});
								return;
							}
							if (data.query.users[0].groups.indexOf('sysop') > -1) {
								mw.notify(adoptConf.i18n.alreadyAdminError,{tag:'adoption',type:'warn'});
								return;
							}
						}
					}
				}
				if (data.query.allusers) {
					var usProm = [];
					for (var us in data.query.allusers) {
						usProm.push($.getJSON('//'+url+'/api.php?format=json&callback=?',{
							action:'query',
							list:'usercontribs',
							uclimit:1,
							ucuserids:data.query.allusers[us].userid,
							ucend: Math.floor((new Date().getTime()-5184000000)/1000) // 60 days
						}));
					}
					Promise.allSettled(usProm).then(function(usdata) {
						var numAdmins = 0;
						for (var d in usdata) {
							if (usdata[d].value.query) {
								if (usdata[d].value.query.usercontribs.length > 0) numAdmins++;
							}
						}
						if (numAdmins > 0) {
							mw.notify(adoptConf.i18n.activeAdminsError, {tag:'adoption',type:'warn'});
						}
						$('#numAdmins').val(numAdmins);
					});
				}
			}).fail(function(data) {
				mw.notify(adoptConf.i18n.automaticQueryError,{tag:'adoption',type:'error'});
				$('.adoptionPrefill').prop('disabled',false);
				return;
			});
		});
	});
});



//==============================================
//  Configurazione per le richieste di diritti
//==============================================

window.adoptInternational = {
	unsupportedLanguages: ['en','es','de','fr','ru','nl','pl','pt','pt-br','zh'],
	pageConfig: {
		namespace: 'Richiesta',
		namespaceId: 118,
		adoptionsPage: 'Wiki_della_Community:Richieste_di_diritti'
	},
	wikitextSchema: "{{bStart}}Richiesta di diritti\n" +
                    "| 0-status              = nuova\n" +
                    "| 1-user                = {{userName}}\n" +
                    "| 2-link_to_wiki        = {{{wikiURL}}}\n" +
                    "| 3-type                = {{permissionsType}}\n" +
                    "| 4-your_activity       = {{numDays}}\n" +
                    "| 5-admin_activity      = {{numAdmins}}\n" +
                    "| 6-your_motivation     = {{comments}}\n" +
                    "| 7-community_vote      = {{{communityVote}}}\n" +
                    "{{bEnd}}",
	i18n: {
		activeAdminsError: 'Ricorda che, se ci sono amministratori attivi, dovresti contattarli prima di inviare una richiesta di adozione.',
		adminsActivityLabel: 'Numero di amministratori attivi negli ultimi 60 giorni',
		adoptionButtonLabel: 'Adotta wiki',
		alreadyAdminError: 'Sei già amministratore su questa wiki. Tieni presente che non è necessario adottare una wiki di cui sei già amministratore a meno che tu non stia facendo domanda per diventare un burocrate.',
		alreadyBureaucratError: 'Sei già burocrate su questa wiki. Non è necessario che adotti questa wiki.',
		automaticQueryError: 'La wiki non ha risposto alla query automatica. Dovrai inserire i dettagli richiesti manualmente.',
		ccError: 'Non puoi adottare una wiki ufficiale di Fandom.',
		closeLabel: 'Annulla',
		commentsLabel: 'Commenti/Ragioni della richiesta',
		communityVoteLabel: 'Voto degli altri utenti',
		defaultStatus: 'nuova',
		invalidLanguageError: 'Per richieste internazionali, espandi la sezione dedicata alle richieste internazionali e visita la Wiki della Community (Community Central) della tua lingua per sottoscrivere una richiesta.',
		invalidUrlError: 'Il formato dell\'url fornito non è riconosciuto.',
		linkLabel: 'Link',
		modalTitle: 'Richiesta di adozione',
		nameLabel: 'Nome della wiki',
		noActivityError: 'Ricorda che dovresti aver contribuito alla wiki in modo continuativo per una settimana prima di inviare una richiesta di promozione.',
		noCommentsError: 'Per favore, prova a dichiarare il motivo per cui vuoi adottare questa wiki e perché saresti adatto come amministratore.',
		noEditsError: 'Devi avere modificato la wiki nell\'ultima settimana per poter essere promosso.',
		noNameError: 'Inserisci il nome della wiki.',
		noUrlError: 'Inserisci l\'url della wiki.',
		permissionLabel: 'Tipo di diritti',
		placeholderComments: 'Spiega perché vuoi ottenere questi diritti e perché ritieni di essere un buon candidato.',
		placeholderDiscussionsPost: 'ID del post di discussione',
		placeholderUrl: 'https://wiki.fandom.com/it',
		processFailError: 'Si è verificato un problema durante l\'elaborazione della tua richiesta.',
		provideCommunityVote: 'Sembra che ci siano altri utenti attivi sulla wiki. Ti invitiamo a considerare la creazione di un post di Discussioni per dichiarare la tua intenzione di adottare la wiki e lasciare che forniscano la loro opinione a riguardo. Se lo hai già fatto, assicurati di includere un link a quel post.',
		submitError: 'Si è verificato un problema durante l\'elaborazione della tua richiesta.',
		submitLabel: 'Invia',
		userActivityLabel: 'In quanti degli ultimi dieci giorni hai modificato la wiki?'
	}
};