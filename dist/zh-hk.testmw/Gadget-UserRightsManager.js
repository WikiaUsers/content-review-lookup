// <nowiki>
// Adapted from [[mhtest:MediaWiki:Gadget-userRightsManagerTW.js]], itself adapted from [[w:User:MusikAnimal/userRightsManager.js]]
(function() {
	if (mw.config.get('wgPageName') != 'Test_Wiki:Request_permissions' && !mw.config.get('wgPageName').includes('URMTW-TESTPAGE-RFP')) {
		return;
	}
	
	var names = {
		'版主': 'Moderator',
		'管理員': 'Administrator',
	}
	
	var cannedResponses = {
		'版主': '{{done}}. ~~~~',
		'管理員': '{{done}}. ~~~~',
	};

	var api,
		permission, perms/* = mw.config.get('wgTitle').split('/').slice(-1)[0]*/,
		revisionId = mw.config.get('wgRevisionId'),
		permaLink, userName, sectionId, dialog;

	mw.loader.using(['oojs-ui', 'mediawiki.api'], function() {
		api = new mw.Api();
		$('.assign-permissions-link').on('click', function(e) {
			e.preventDefault();
			permissionText = $(this).parent().parent().next().text().split(':')[1].trim().toLowerCase();
			permission = permissionText.includes('interface') ? 'interface-admin' : (permissionText.includes('crat') ? 'bureaucrat' : 'sysop');
			userName = $(this).siblings().eq(0).text();
			sectionId = $(this).parent().parent().prev().find(".mw-editsection a:not('.mw-editsection-visualeditor')").prop('href').match(/section=(\d+)/)[1];
			showDialog();
		});
	});

	function showDialog() {
		Dialog = function(config) {
			Dialog.super.call(this, config);
		};
		OO.inheritClass(Dialog, OO.ui.ProcessDialog);
		Dialog.static.name = 'user-rights-manager';
		Dialog.static.title = '正在授予權限';
		Dialog.static.actions = [
			{ action: 'submit', label: '授予', flags: ['primary', 'progressive'] },
			{ label: '取消', flags: 'safe' }
		];
		Dialog.prototype.getApiManager = function() {
			return this.apiManager;
		};
		Dialog.prototype.getBodyHeight = function() {
			return 393;
		};
		Dialog.prototype.initialize = function() {
			Dialog.super.prototype.initialize.call( this );
			this.editFieldset = new OO.ui.FieldsetLayout( {
				classes: ['container']
			});
			this.editPanel = new OO.ui.PanelLayout({
				expanded: false
			});
			this.editPanel.$element.append( this.editFieldset.$element );
			this.groupsSysopInput = new OO.ui.CheckboxInputWidget({
				selected: permissionText.includes('sysop') || (permissionText.includes('admin') && (!permissionText.includes('interface') || permissionText.split('admin').length > 2)) || (!permissionText.includes('interface') && !permissionText.includes('crat')),
			});
			this.groupsModInput = new OO.ui.CheckboxInputWidget({
				selected: permissionText.includes('mod')
			});
			this.userNameInput = new OO.ui.TextInputWidget({
				value: userName.replace(/_/g, ' ')
			});
			this.closingRemarksInput = new OO.ui.MultilineTextInputWidget({
				value: cannedResponses[permission],
				rows: 9
			});
			var formElements = [
				new OO.ui.FieldLayout(new OO.ui.Widget({
					content: [
						new OO.ui.FieldsetLayout({
							content: [
								new OO.ui.FieldLayout(this.groupsModInput, {label: '版主', align: 'inline'}),
								new OO.ui.FieldLayout(this.groupsSysopInput, {label: '管理員', align: 'inline'}),
							]
						})
					]
				}), {
					label: 'Rights',
				}),
				new OO.ui.FieldLayout(this.userNameInput, {
					label: 'Target user',
				}),
				new OO.ui.FieldLayout(this.closingRemarksInput, {
					label: 'Closing remarks',
				})
			];
			this.editFieldset.addItems(formElements);
			this.submitPanel = new OO.ui.PanelLayout( {
				$: this.$,
				expanded: false
			} );
			this.submitFieldset = new OO.ui.FieldsetLayout( {
				classes: ['container']
			} );
			this.submitPanel.$element.append( this.submitFieldset.$element );
			this.changeRightsProgressLabel = new OO.ui.LabelWidget();
			this.changeRightsProgressField = new OO.ui.FieldLayout( this.changeRightsProgressLabel );
			this.markAsDoneProgressLabel = new OO.ui.LabelWidget();
			this.markAsDoneProgressField = new OO.ui.FieldLayout( this.markAsDoneProgressLabel );
			this.stackLayout = new OO.ui.StackLayout( {
				items: [this.editPanel, this.submitPanel],
				padded: true
			} );
			this.$body.append( this.stackLayout.$element );
		};

		Dialog.prototype.onSubmit = function() {
			userName = this.userNameInput.getValue();
			perms = [];
			if(this.groupsModInput.isSelected()) perms.push('content-moderator','discussions-moderator');
			if(this.groupsSysopInput.isSelected()) perms.push('管理員');
			if(this.groupsInterfaceAdminInput.isSelected()) perms.push('interface-admin');
			
			var self = this, promiseCount = 2;

			self.actions.setAbilities( { submit: false } );

			addPromise = function( field, promise ) {
				self.pushPending();
				promise.done(function() {
					field.$field.append( $( '<span>' )
						.text( 'Complete!' )
						.prop('style', 'position:relative; top:0.5em; color: #009000; font-weight: bold')
					);
				}).fail(function(obj) {
					if ( obj && obj.error && obj.error.info ) {
						field.$field.append( $( '<span>' )
							.text('Error: ' + obj.error.info)
							.prop('style', 'position:relative; top:0.5em; color: #cc0000; font-weight: bold')
						);
					} else {
						field.$field.append( $( '<span>' )
							.text('An unknown error occurred.')
							.prop('style', 'position:relative; top:0.5em; color: #cc0000; font-weight: bold')
						);
					}
				}).always( function() {
					promiseCount--; // FIXME: maybe we could use a self.isPending() or something
					self.popPending();

					if (promiseCount === 0) {
						setTimeout(function() {
							location.reload(true);
						}, 1000);
					}
				});

				return promise;
			};

			self.markAsDoneProgressField.setLabel( 'Marking request as done...' );
			self.submitFieldset.addItems( [self.markAsDoneProgressField] );
			self.changeRightsProgressField.setLabel( 'Assigning rights...' );
			self.submitFieldset.addItems( [self.changeRightsProgressField] );

			addPromise(
				self.markAsDoneProgressField,
				markAsDone('\n:' + this.closingRemarksInput.getValue())
			).then(function(data) {
				addPromise(
					self.changeRightsProgressField,
					assignPermission(data.edit.newrevid)
				);
			}.bind(this));

			self.stackLayout.setItem( self.submitPanel );
		};

		Dialog.prototype.getActionProcess = function( action ) {
			return Dialog.super.prototype.getActionProcess.call( this, action ).next( function() {
				if ( action === 'submit' ) {
					return this.onSubmit();
				} else {
					return Dialog.super.prototype.getActionProcess.call( this, action );
				}
			}, this );
		};

		dialog = new Dialog({
			size: 'medium'
		});

		var windowManager = new OO.ui.WindowManager();
		$('body').append(windowManager.$element);
		windowManager.addWindows([dialog]);
		windowManager.openWindow(dialog);
	}

	function assignPermission(revId) {
		permaLink = '[[Special:Diff/' + revId + '|Requested]]';
		return api.postWithToken( 'userrights', {
			action: 'userrights',
			format: 'json',
			user: userName.replace(/ /g, '_'),
			add: perms.join('|'),
			reason: '+' + perms.join(', +') + '; ' + permaLink + ' at [[TW:RFP]]',
			expiry: 'infinity',
			tags: 'userRightsManagerTW'
		});
	}

	function markAsDone(closingRemarks) {
		return api.get({
			'action': 'query', 
			'pageids': mw.config.get('wgArticleId'), 
			'prop': 'revisions', 
			'rvslots': '*', 
			'rvlimit': 1, 
			'rvprop': 'content', 
			'rvsection': sectionId
		}).then(function(data){
			var newContent = data['query']['pages'][mw.config.get('wgArticleId')]['revisions'][0]['slots']['main']['*'] + closingRemarks
			return api.postWithToken( 'edit', {
				'action': 'edit',
				'pageid': mw.config.get('wgArticleId'),
				'section': sectionId,
				'text': newContent,
				'tags': 'userRightsManager',
				summary: '/* User:' + userName + ' */ done'
			})
		});
	}
})();
// </nowiki>