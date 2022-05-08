/** <nowiki>
 * @name: Adoptions International
 * @description: Forked form for adoptions tweaked for international wikis
 * @author: Pcj (based on work by Unai01, Lil' Miss Rarity, Jr Mime and bola) - original
 * @author: Rail, bitomic, MtaÄ - fork
 */
mw.loader.using(['jquery.client', 'mediawiki.base','mediawiki.api', 'mediawiki.template.mustache']).then(function() {
	// Export global configuration
	window.adoptInternational = (window.adoptInternational || {});

	// Wikis in those languages will *error* when user tries to adopt them
	window.adoptInternational.unsupportedLanguages = (window.adoptInternational.unsupportedLanguages || [
		'en','es','de','fr','ru','it','nl','pl','pt','pt-br','zh'
	]);

	window.adoptInternational.adoptionConfig = (window.adoptInternational.adoptionConfig || {
		activityDays: 10,
		adminsDays: 60,
		permissionTypes: [
			'bureaucrat',
			'sysop',
			'content-moderator'
		]
	});

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

	function init(i18n) {
		var exception = '';
		const userName = mw.config.get('wgUserName');
		if (mw.config.get('wgPageName') !== adoptConf.pageConfig.adoptionsPage || !userName) {
			return;
		}
		function filterFandomDomain(input) {
			var fandomDomainRE = /(?:https?:\/\/)?(.*?\.)(fandom\.com)(\/[^\/]*?)?(?:\/.*)?$/;
			var filteredDomain = input.match(fandomDomainRE);
			if (!filteredDomain) return null;
			filteredDomain.splice(0,1);
			if (filteredDomain[2] === '/wiki' || filteredDomain[2] === '/f' || filteredDomain[2] === '/') filteredDomain.pop();
			return filteredDomain.join('');
		}
		function daysToMilliseconds(days) {
			return days * 86400000;
		}
		function capitalize(text) {
			return text.charAt(0).toUpperCase() + text.slice(1);
		}

		const availableGroups = adoptConf.adoptionConfig.permissionTypes.map(function(group) {
			return {
				type: 'option',
				text: capitalize(mw.message('group-' + group + '-member').parse(userName)),
				attr: {
					'value': group
				}
			};
		});

		mw.hook('dev.modal').add(function(modal) {
			mw.hook('dev.ui').add(function(ui) {
				var adoptionModal = new window.dev.modal.Modal({
					title: i18n.msg('modalTitle').plain(),
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
										text: i18n.msg('linkLabel').plain(),
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
											'placeholder': i18n.msg('placeholderUrl').plain()
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
										text: i18n.msg('nameLabel').plain(),
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
											'placeholder': i18n.msg('nameLabel').plain()
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
										text: i18n.msg('permissionLabel').plain(),
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
										children: availableGroups
									}
								]
							},
							{
								type: 'div',
								classes: ['form-section'],
								children: [
									{
										type: 'label',
										text: i18n.msg('userActivityLabel', adoptConf.adoptionConfig.activityDays).plain(),
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
										text: i18n.msg('adminsActivityLabel', adoptConf.adoptionConfig.adminsDays).plain(),
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
										text: i18n.msg('communityVoteLabel').plain(),
										attr: {
											'for': 'communityvote'
										}
									},
									{
										type: 'input',
										attr: {
											'id': 'communityvote',
											'type': 'text',
											'placeholder': i18n.msg('placeholderCommunityVote').plain()
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
										text: i18n.msg('commentsLabel').plain(),
										attr: {
											'for': 'comment'
										}
									},
									{
										type: 'textarea',
										attr: {
											'id': 'comment',
											'name': '',
											'placeholder': i18n.msg('placeholderComments').plain()
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
							var $form = $('#adoption'),
								wikiname = $form.find('#wikiname').val(),
								url = 'https://'+filterFandomDomain($form.find('#adoptionUrl').val()),
								permissionsType = $form.find('#permissionstype').val(),
								numDays = $form.find('#numDays').val() || 0,
								numAdmins = $form.find('#numAdmins').val() || 0,
								comments = $form.find('#comment').val(),
								communityVote = $form.find('#communityvote').val(); // @todo This has to be validated!
							if (exception !== '') {
								mw.notify(exception,{tag:'adoption',type:'error'});
								return;
							}
							if (url.trim() === '') {
								mw.notify(i18n.msg('noUrlError').plain(),{tag:'adoption',type:'warn'});
								return;
							}
							if (wikiname.trim() === '') {
								mw.notify(i18n.msg('noNameError').plain(),{tag:'adoption',type:'warn'});
								return;
							}
							if (comments.trim() === '') {
								mw.notify(i18n.msg('noCommentsError').plain(),{tag:'adoption',type:'warn'});
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
								communityVote: communityVote,
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
									title: adoptConf.pageConfig.namespace + ':' + wikiname+suffix,
									text: pagecontent,
									tags: 'adoptionsform'
								}).done(function (data) {
									if (data.edit) {
										if (data.edit.warning) {
											mw.notify(data.edit.warning, {tag:'adoption',type:'error'});
											return;
										}
									}
									location.href = mw.util.getUrl(adoptConf.pageConfig.namespace + ':' + wikiname+suffix);
								}).fail(function () {
									mw.notify(i18n.msg('processFailError').plain(), {tag:'adoption',type:'error'});
								});
							}).fail(function () {
								mw.notify(i18n.msg('submitError').plain(), {tag:'adoption',type:'error'});
							});
						}
					}
				});
				adoptionModal.create();
				$('#adoption-form')
					.attr('class', 'wds-button btn-large')
					.text(i18n.msg('adoptionButtonLabel').plain())
					.wrap($('<div>').css('text-align', 'center'))
					.css('cursor', 'pointer')
					.on('click', function() {
						adoptionModal.show();
					});
			});
		});

		$('body').off('change.adoptionURL').on('change.adoptionURL','#adoptionUrl',function() {
			$('.adoptionPrefill').prop('disabled',true);
			exception = '';
			var url = filterFandomDomain($('#adoptionUrl').val());
			if (!url) {
				mw.notify(i18n.msg('invalidUrlError').plain(),{tag:'adoption',type:'error'});
				$('.adoptionPrefill').prop('disabled',false);
				return;
			}
			if (fandomWikis.includes(url)) {
				exception = i18n.msg('ccError').plain();
				mw.notify(exception,{tag:'adoption',type:'error'});
				return;
			}
			$.getJSON('//' + url + '/api.php?format=json&callback=?',{
				action:'query',
				meta:'siteinfo',
				siprop:'general|statistics',
				list:'allusers|usercontribs|users',
				uclimit:'max',
				ucuser:userName,
				ucnamespace:0,
				ucdir:'newer',
				ucstart:Math.floor((new Date().getTime() - daysToMilliseconds(adoptConf.adoptionConfig.activityDays)) / 1000), // edits by user in the last x days
				augroup:'sysop|bureaucrat',
				aulimit:'max',
				auwitheditsonly:1, // avoid auactiveusersonly
				usprop:'groups',
				ususers:userName
			}).done(function(data) {
				if (!data.query) {
					mw.notify(i18n.msg('automaticQueryError').plain(),{tag:'adoption',type:'error'});
					$('.adoptionPrefill').prop('disabled',false);
					return;
				}
				if (data.query.general) {
					if (adoptConf.unsupportedLanguages.indexOf(data.query.general.lang) != -1) {
						mw.notify(i18n.msg('invalidLanguageError').plain(),{tag:'adoption',type:'warn'});
					}
					$('#wikiname').val(data.query.general.sitename);
				}
				if (data.query.statistics) {
					if ($('#communityvote').val() === '' && data.query.statistics.activeusers > 3) {
						mw.notify(i18n.msg('provideCommunityVote').plain(), {tag:'adoption',type:'warn'});
					}
				}
				var ucDays = 0;
				if (data.query.usercontribs) {
					if (data.query.usercontribs.length === 0) {
						exception = i18n.msg('noEditsError').plain();
						mw.notify(exception,{tag:'adoption',type:'warn'});
						return;
					}
					var ucDArr = [];
					for (var u in data.query.usercontribs) {
						var ucDay = data.query.usercontribs[u].timestamp.slice(0,10);
						if (ucDArr.indexOf(ucDay) === -1) ucDArr.push(ucDay);
					}
					ucDays = ucDArr.length;
					if (ucDays < 5) {
						mw.notify(i18n.msg('noActivityError').plain(),{tag:'adoption',type:'warn'});
					}
				}
				$('#numDays').val(ucDays);
				if (data.query.users) {
					if (data.query.users[0]) {
						if (data.query.users[0].groups) {
							if (data.query.users[0].groups.indexOf('bureaucrat') > -1) {
								exception = i18n.msg('alreadyBureaucratError').plain();
								mw.notify(exception,{tag:'adoption',type:'error'});
								return;
							}
							if (data.query.users[0].groups.indexOf('sysop') > -1) {
								mw.notify(i18n.msg('alreadyAdminError').plain(),{tag:'adoption',type:'warn'});
								return;
							}
						}
					}
				}
				if (data.query.allusers) {
					var usProm = [];
					for (var us in data.query.allusers) {
						usProm.push($.getJSON('//' + url + '/api.php?format=json&callback=?',{
							action:'query',
							list:'usercontribs',
							uclimit:1,
							ucuserids:data.query.allusers[us].userid,
							ucend: Math.floor((new Date().getTime() - daysToMilliseconds(adoptConf.adoptionConfig.adminsDays)) / 1000)
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
							mw.notify(i18n.msg('activeAdminsError').plain(), {tag:'adoption',type:'warn'});
						}
						$('#numAdmins').val(numAdmins);
					});
				}
			}).fail(function(data) {
				mw.notify(i18n.msg('automaticQueryError').plain(),{tag:'adoption',type:'error'});
				$('.adoptionPrefill').prop('disabled',false);
				return;
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
		$.when(
			i18no.loadMessages('Adoptions_International'),
			new mw.Api().loadMessagesIfMissing(window.adoptInternational.adoptionConfig.permissionTypes.map(function(group) {
				return 'group-' + group + '-member'
			}))
		).then(init)
	}

	mw.hook('dev.i18n').add(preload);
});