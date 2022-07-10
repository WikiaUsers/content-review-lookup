/**
 * @name BlockMessage
 * @version 2.0
 * @author Caburum
 * @description Sends details about a user's block to their message wall
**/

/*
game plan:
- admin fills out the normal block form and presses submit
- modal pops up with the message inputs, some stuff autofilled based on the form
- admin fills it out and hits submit
- either parse the template into html and pass it by query parameter to the message wall where it it loaded into the editor

everything is hardcoded atm but it would be nice to make it configurable through json
*/

(function() {
	if (window.BlockMessageLoaded || mw.config.get('wgCanonicalSpecialPageName') !== 'Block') return;
	// window.BlockMessageLoaded = true;

	function init() {
		// start dialog setup
		Dialog = function Dialog(config) { Dialog.super.call(this, config); };
		OO.inheritClass(Dialog, OO.ui.ProcessDialog);
		Dialog.static.name = 'BlockMessage';
		Dialog.static.title = 'Block message';
		Dialog.static.actions = [
			{ action: 'send', label: 'Send', flags: ['primary'] },
			{ action: 'close', label: 'Don\'t send', flags: ['safe', 'close'] }
		];

		// sets up the basic structure
		Dialog.prototype.initialize = function() {
			Dialog.super.prototype.initialize.apply(this, arguments);

			this.reasonField = new OO.ui.TextInputWidget();
			this.durationField = new OO.ui.TextInputWidget();
			this.appealField = new OO.ui.DropdownInputWidget({ options: [
				{ data: 'yes', label: 'They may appeal this block' },
				{ data: 'no', label: 'They may not appeal this block for the stated reason' },
				{ data: '2week', label: 'This block\'s duration is less than 2 weeks' },
				{ data: 'tou', label: 'This is a violation of Fandom\'s Terms of Use' },
				{ data: 'inerror', label: 'They may appeal this block if they think it was made in error' },
			]});

			this.content = new OO.ui.FieldsetLayout({ classes: ['wds-dialog__content'] });
			this.content.addItems([
				new OO.ui.FieldLayout(this.reasonField, { label: 'Reason:' }),
				new OO.ui.FieldLayout(this.durationField, { label: 'Duration:' }),
				new OO.ui.FieldLayout(this.appealField, { label: 'Appeal:' }),
			]);

			this.$body.append(new OO.ui.PanelLayout({ padded: true, expanded: false, $content: this.content.$element }).$element);
		};

		// hydrate structure
		Dialog.prototype.getSetupProcess = function(data) {
			return Dialog.super.prototype.getSetupProcess.call(this, {}).next(function() {
				this.event = data.event;

				var formData = new FormData($('form.mw-htmlform')[0]),
					r1 = formData.get('wpReason'), r2 = formData.get('wpReason-other'),
					expiry = formData.get('wpExpiry') === 'other' ? formData.get('wpExpiry-other') : formData.get('wpExpiry');
				this.targetUser = formData.get('wpTarget');
				this.reasonField.setValue(r1 === 'other' ? r2 : (r2 ? (r1 + ': ' + r2) : r1));
				this.durationField.setValue(['infinite', 'indefinite'].includes(formData) ? 'infinite' : (moment(expiry).isValid() ? moment.duration(moment(expiry).diff(moment())).humanize() : expiry).replace(/s$/i, '')); // becomes "a _ block"
				// @todo parse the duration and automatically select the appeal field if 2weeks+
			}, this);
		};

		// handle button press
		Dialog.prototype.getActionProcess = function(action) {
			const dialog = this;
			function close() {
				dialog.close();
				$('form.mw-htmlform').trigger('submit');
			}

			if (action === 'close') return new OO.ui.Process(close);

			if (action === 'send') return new OO.ui.Process(function() {
				window.open(new mw.Uri(mw.util.getUrl('Message Wall:' + dialog.targetUser)).extend({
					'wall-editor': 'new',
					params: JSON.stringify({
						reason: dialog.reasonField.getValue(),
						duration: dialog.durationField.getValue(),
						appeal: dialog.appealField.getValue(),
						admin: mw.config.get('wgUserName')
					})
				}).toString());
			}).next(close);

			else return Dialog.super.prototype.getActionProcess.call(this, action);
		};

		const windowManager = new OO.ui.WindowManager();
		$(document.body).append(windowManager.$element);
		const dialog = new Dialog({ size: 'larger' });
		windowManager.addWindows([dialog]);

		// add event listner
		$('.mw-htmlform-submit .oo-ui-buttonElement-button').click(function() {
			event.preventDefault();
			windowManager.openWindow(dialog);
		});
	}

	$.when(mw.loader.using(['oojs-ui-core', 'oojs-ui-widgets', 'oojs-ui-windows'])).then(init);
})();