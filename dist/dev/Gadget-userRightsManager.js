// <nowiki>
// On [[COM:RFR]], easily grants the right, marks as done,
// and issues an appropriate template to the user.

// By [[:c:User:~riley]]
// Based on [[:w:en:User:MusikAnimal/userRightsManager.js]]
// Minor compatability fixes and gadgetification by [[User:Mdaniels5757]]
// Expiry parameters by [[User:Dev Jadiya]]
// Some UI code adapted from [[en:User:Mr. Stradivarius/gadgets/Draftify.js]]

if (mw.config.get('wgPageName') === 'Commons:Requests_for_rights') {
	mw.loader.using(['oojs-ui', 'mediawiki.api', 'mediawiki.widgets.DateInputWidget'], function() {

	  var permissionNames = {
	  	'Confirmed': 'confirmed',
		'Autopatrol': 'autopatrolled',
		'Patroller': 'patroller',
		'Rollback': 'rollbacker',
		'Template editor': 'templateeditor',
		'Filemover': 'filemover',
		'Temporary account IP viewer': 'temporary-account-viewer',
		'Event organizer': 'event-organizer',
		'Upload Wizard campaign editors': 'upwizcampeditors',
	  };

	  var templates = {
		'Autopatrol': 'Autopatrolgiven',
		'Patroller': 'PatrollerWelcome',
		'AutoWikiBrowser': '',
		'Confirmed': '',
		'Filemover': 'FilemoverWelcome',
		'Rollback': 'Rollbackgiven',
		'Temporary account IP viewer': 'Temporary_account_IP_viewer_granted',
		'Event organizer': 'Event-organizer_granted',
		'Template editor': 'templateeditorgiven',
		'Upload Wizard campaign editors': 'Upwizcampaign_granted',
	  };

	  var api = new mw.Api({ userAgent: 'Gadget-userRightsManager.js' }),
		revisionId = mw.config.get('wgRevisionId'),
		tagLine = ' (using [[MediaWiki:Gadget-userRightsManager.js|userRightsManager]])',
		permaLink, userName, dialog;


	  $('.adminonly a').on('click', function(e) {
	  	e.preventDefault();
		userName = $(this)[0].href.split("UserRights/").slice(-1).toString();
		userName = decodeURIComponent(userName);
		permission = $("#" + userName.replace(/'/g, "\\'")).parent().prevAll("div.mw-heading2").children("h2")[0].id.replace(/_/g, ' ');
		if (permission === 'AutoWikiBrowser access') return true;
		showDialog();
	  });


	  function showDialog() {
		Dialog = function(config) {
		  Dialog.super.call(this, config);
		};
		OO.inheritClass(Dialog, OO.ui.ProcessDialog);
		Dialog.static.title = 'Grant ' + permission + ' to ' + userName;
		Dialog.static.name = 'Grant ' + permission + ' to ' + userName;
		Dialog.static.actions = [
		  { action: 'submit', label: 'Submit', flags: ['primary', 'constructive'] },
		  { label: 'Cancel', flags: 'safe' }
		];
		Dialog.prototype.getApiManager = function() {
		  return this.apiManager;
		};
		Dialog.prototype.getBodyHeight = function() {
		  // Grow when the "Other" date picker is showing so it isn't clipped.
		  return (this.expiryDateField && this.expiryDateField.isVisible()) ? 245 : 200;
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
		  this.rightsChangeSummaryInput = new OO.ui.TextInputWidget({
			value: 'Requested at [[COM:RFR]]'
		  });

		  // --- Expiry control (mimics Special:UserRights) ---
		  // Presets are relative durations understood by the API; 'infinite'
		  // is a never-expiring grant (same as the old no-expiry behaviour).
		  // 'other' reveals a calendar date picker for an exact absolute date.
		  this.expiryDropdown = new OO.ui.DropdownInputWidget({
			options: [
			  { data: 'infinite', label: 'Permanent (infinite)' },
			  { data: '1 week',   label: '1 week' },
			  { data: '2 weeks',  label: '2 weeks' },
			  { data: '1 month',  label: '1 month' },
			  { data: '3 months', label: '3 months' },
			  { data: '6 months', label: '6 months' },
			  { data: '1 year',   label: '1 year' },
			  { data: 'other',    label: 'Other (pick a date)…' }
			],
			value: 'infinite'
		  });
		  this.expiryDateInput = new mw.widgets.DateInputWidget();
		  this.expiryDateField = new OO.ui.FieldLayout(this.expiryDateInput, {
			label: 'Expiry date'
		  });
		  this.expiryDateField.toggle(false); // hidden until "Other" is chosen
		  this.expiryDropdown.on('change', function() {
			var isOther = this.expiryDropdown.getValue() === 'other';
			this.expiryDateField.toggle(isOther);
			this.updateSize(); // recompute dialog height for the revealed field
		  }.bind(this));

		  this.closingRemarksInput = new OO.ui.TextInputWidget({
			value: '{{done}} ~~~~'
		  });
		  this.watchTalkPageCheckbox = new OO.ui.CheckboxInputWidget({
			selected: false
		  });
		  this.editFieldset.addItems( [
			new OO.ui.FieldLayout(this.rightsChangeSummaryInput, {
			  label: 'Summary'
			}),
			new OO.ui.FieldLayout(this.expiryDropdown, {
			  label: 'Expiry'
			}),
			this.expiryDateField,
			new OO.ui.FieldLayout(this.closingRemarksInput, {
			  label: 'Closing remarks'
			}),
			new OO.ui.FieldLayout(this.watchTalkPageCheckbox, {
			  label: 'Watch user talk page'
			})
		  ] );
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
		  this.issueTemplateProgressLabel = new OO.ui.LabelWidget();
		  this.issueTemplateProgressField = new OO.ui.FieldLayout( this.issueTemplateProgressLabel );
		  this.stackLayout = new OO.ui.StackLayout( {
			items: [this.editPanel, this.submitPanel],
			padded: true
		  } );
		  this.$body.append( this.stackLayout.$element );
		};

		// Returns the value to pass to the API's `expiry` parameter:
		// a preset string ('infinite', '3 months', ...) or an absolute
		// 'YYYY-MM-DD' date when "Other" is selected.
		Dialog.prototype.getExpiryValue = function() {
		  var v = this.expiryDropdown.getValue();
		  return v === 'other' ? this.expiryDateInput.getValue() : v;
		};

		Dialog.prototype.onSubmit = function() {
		  var self = this, promiseCount = 3;

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
		  self.issueTemplateProgressField.setLabel( 'Issuing template...' );
		  self.submitFieldset.addItems( [self.issueTemplateProgressField] );

		  addPromise(
			self.markAsDoneProgressField,
			markAsDone('\n::' + this.closingRemarksInput.getValue())
		  ).then(function(data) {
			addPromise(
			  self.changeRightsProgressField,
			  assignPermission(
				this.rightsChangeSummaryInput.getValue() + tagLine,
				data.edit.newrevid,
				this.getExpiryValue()
			  )
			);
		  }.bind(this)).then(function(data) {
		  	addPromise(
				self.issueTemplateProgressField,
				issueTemplate(this.watchTalkPageCheckbox.isSelected())
			);
		  }.bind(this));

		  self.stackLayout.setItem( self.submitPanel );
		};

		Dialog.prototype.getActionProcess = function( action ) {
		  return Dialog.super.prototype.getActionProcess.call( this, action ).next( function() {
			if ( action === 'submit' ) {
			  // Guard: "Other" was chosen but no date was picked.
			  if ( this.expiryDropdown.getValue() === 'other' && !this.expiryDateInput.getValue() ) {
				return new OO.ui.Error(
				  'Please choose an expiry date, or pick a preset duration.',
				  { recoverable: true }
				);
			  }
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

	  function assignPermission(summary, revId, expiry) {
		console.log('Assigning permission');
		permaLink = '[[Special:PermaLink/' + revId + '#' + userName + '|permalink]]';
		var params = {
		  action: 'userrights',
		  format: 'json',
		  user: userName.replace(/ /g, '_'),
		  add: permissionNames[permission],
		  reason: summary + '; ' + permaLink
		};
		// Omitting expiry == permanent, so only send it when set.
		if (expiry) {
		  params.expiry = expiry;
		}
		return api.postWithToken( 'userrights', params );
	  }

	  function markAsDone(closingRemarks) {
		console.log('Marking as done');
		var sectionNode = document.getElementById(userName.replace(/ /g, '_')),
		  sectionNumber = $(sectionNode).siblings('.mw-editsection').find('a').prop('href').match(/section=(\d+)/)[1];
		return api.postWithToken( 'edit', {
		  format: 'json',
		  action: 'edit',
		  title: mw.config.get('wgPageName'),
		  section: sectionNumber,
		  summary: '/* ' + userName + ' */ done' + tagLine,
		  appendtext: closingRemarks
		});
	  }

	  function issueTemplate(watch) {
		console.log('Issuing template');
		var talkPage = 'User talk:' + userName.replace(/ /g, '_');
		return api.postWithToken( 'edit', {
		  format: 'json',
		  action: 'edit',
		  title: talkPage,
		  summary: permission + ' granted per ' + permaLink + tagLine,
		  appendtext: '\n{{subst:' + templates[permission] + '}} ~~~~',
		  watchlist: watch ? 'watch' : 'unwatch'
		});
	  }
	});
}
// </nowiki>