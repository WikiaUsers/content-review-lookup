/**
 * @name BlockMessage
 * @version 2.0
 * @author Caburum
 * @description Sends details about a user's block to their message wall
**/

/*
how it works:
- admin fills out the normal block form and presses submit
- modal pops up with the message inputs, some stuff autofilled based on the form
- admin fills it out and hits submit
- params are passed to wall through query
- template and params parsed into html
- html added to wall editor

everything is hardcoded atm but it would be nice to make it configurable through json
*/

(function() {
	if (window.BlockMessageLoaded) return;
	window.BlockMessageLoaded = true;

	function initBlockPage() {
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
				{ data: 'inerror', label: 'They may appeal this block if they think it was made in error' },
				{ data: 'yes', label: 'They may appeal this block' },
				{ data: '2week', label: 'This block\'s duration is less than 2 weeks' },
				{ data: 'no', label: 'They may not appeal this block for the stated reason' },
				{ data: 'tou', label: 'This is a violation of Fandom\'s Terms of Use' },
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
					'block-message': JSON.stringify({
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

	// based on [[w:c:dev:MediaWiki:DiscussionTemplates.js]]
	function initMessageWall() {
		var data, apiParams = {
			action: 'parse',
			disablelimitreport: true,
			prop: 'text',
			wrapoutputclass: null,
			contentmodel: 'wikitext',
			text: '{{:Project:Staff messages/Block' // @todo make configurable
		};
		try { data = JSON.parse(mw.util.getParamValue('block-message')); } catch (e) { return; }
		for (const param in data) {
			apiParams.text += '|' + param + '=' + data[param];
		}
		apiParams.text += '}}';
		new mw.Api().get(apiParams).done(function (d) {
			var content = d.parse.text['*']
				.replace(/\n<\/p>/g, '</p><p><br></p>')
				.replace(/<p><br \/>/g, '<p><br></p><p>')
				.replace(/<\/p><p><br><\/p>$/, '</p>')
				.replace(/<br \/>/g, '</p><p>') // in the middle of a paragraph
				.replace(/href="\/wiki/g, 'href="' + mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/wiki')
				.replace(/<p>(.*)<\/p>/g, function (_, text) {
					return '<p>' + text.trim() + '</p>';
				});
			// try and set the content
			var interval = setInterval(function() {
				var rte = $('.message-wall-app > div > .EditorForm .rich-text-editor__content > div');
				if (rte.length) {
					clearInterval(interval);
					rte.html(content);
					// set title (https://stackoverflow.com/a/72014541/9985371)
					var title = $('.message-wall-app > div > .EditorForm .wds-input input')[0];
					Object.getOwnPropertyDescriptor(Object.getPrototypeOf(title), 'value').set.call(title, 'Blocked');
					title.dispatchEvent(new Event('input', { bubbles: true }));
					title.blur(); // defocus to remove autocomplete popup
					// clear url - each form is unique and not show up again
					window.history.replaceState(null, '', window.location.pathname);
				}
			}, 10);
			console.log(apiParams.text, content);
		});
	}

	if (mw.config.get('wgCanonicalSpecialPageName') === 'Block') mw.loader.using(['oojs-ui-core', 'oojs-ui-widgets', 'oojs-ui-windows'], initBlockPage);
	else if (mw.config.get('profileIsMessageWallPage') && mw.util.getParamValue('wall-editor') === 'new' && mw.util.getParamValue('block-message')) mw.loader.using(['mediawiki.api'], initMessageWall);
})();