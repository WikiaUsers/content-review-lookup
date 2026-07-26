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
		// Bắt đầu thiết lập hộp thoại
		Dialog = function Dialog(config) { Dialog.super.call(this, config); };
		OO.inheritClass(Dialog, OO.ui.ProcessDialog);
		Dialog.static.name = 'BlockMessage';
		Dialog.static.title = 'Tin nhắn cấm';
		Dialog.static.actions = [
			{ action: 'send', label: 'Gửi', flags: ['primary'] },
			{ action: 'close', label: 'Không gửi', flags: ['safe', 'close'] }
		];

		// Thiết lập cấu trúc cơ bản
		Dialog.prototype.initialize = function() {
			Dialog.super.prototype.initialize.apply(this, arguments);

			this.reasonField = new OO.ui.TextInputWidget();
			this.durationField = new OO.ui.TextInputWidget();
			this.appealField = new OO.ui.DropdownInputWidget({ options: [
				{ data: 'inerror', label: 'Họ có thể khiếu nại lệnh cấm này nếu họ cho rằng nó được dùng do nhầm lẫn.' },
				{ data: 'yes', label: 'Họ có thể khiếu nại lệnh cấm' },
				{ data: '2week', label: 'Thời hạn của lệnh cấm này ngắn hơn 2 tuần' },
				{ data: 'no', label: 'Họ không được phép khiếu nại lệnh cấm này vì lý do đã nêu' },
				{ data: 'tou', label: 'Đây là vi phạm Điều khoản sử dụng của Fandom' },
			]});

			this.content = new OO.ui.FieldsetLayout({ classes: ['wds-dialog__content'] });
			this.content.addItems([
				new OO.ui.FieldLayout(this.reasonField, { label: 'Lý do:' }),
				new OO.ui.FieldLayout(this.durationField, { label: 'Thời hạn:' }),
				new OO.ui.FieldLayout(this.appealField, { label: 'Khiếu nại:' }),
			]);

			this.$body.append(new OO.ui.PanelLayout({ padded: true, expanded: false, $content: this.content.$element }).$element);
		};

		// Cung cấp cho cấu trúc
		Dialog.prototype.getSetupProcess = function(data) {
			return Dialog.super.prototype.getSetupProcess.call(this, {}).next(function() {
				this.event = data.event;

				var formData = new FormData($('form.mw-htmlform')[0]),
					r1 = formData.get('wpReason'), r2 = formData.get('wpReason-other'),
					expiry = formData.get('wpExpiry') === 'other' ? formData.get('wpExpiry-other') : formData.get('wpExpiry');
				this.targetUser = formData.get('wpTarget');
				this.reasonField.setValue(r1 === 'other' ? r2 : (r2 ? (r1 + ': ' + r2) : r1));
				this.durationField.setValue(['infinite', 'indefinite'].includes(formData) ? 'infinite' : (moment(expiry).isValid() ? moment.duration(moment(expiry).diff(moment())).humanize() : expiry).replace(/s$/i, '')); // Trở thành "một lệnh cấm _"
				// @todo parse the duration and automatically select the appeal field if 2weeks+
			}, this);
		};

		// Xử lý thao tác nhấn nút
		Dialog.prototype.getActionProcess = function(action) {
			const dialog = this;
			function close() {
				dialog.close();
				$('form.mw-htmlform').trigger('submit');
			}

			if (action === 'close') return new OO.ui.Process(close);

			if (action === 'send') return new OO.ui.Process(function() {
				window.open(new mw.Uri(mw.util.getUrl('Tường tin nhắn:' + dialog.targetUser)).extend({
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

		// Thêm trình lắng nghe sự kiện
		$('.mw-htmlform-submit .oo-ui-buttonElement-button').click(function() {
			event.preventDefault();
			windowManager.openWindow(dialog);
		});
	}

	// Dựa trên [[w:c:dev:MediaWiki:DiscussionTemplates.js]]
	function initMessageWall() {
		var data, apiParams = {
			action: 'parse',
			disablelimitreport: true,
			prop: 'text',
			wrapoutputclass: null,
			contentmodel: 'wikitext',
			text: '{{:Wiki Among Us:Tin nhắn nhân viên/Cấm' // @todo make configurable
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
				.replace(/<br \/>/g, '</p><p>') // Ở giữa một đoạn văn
				.replace(/href="\/wiki/g, 'href="' + mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/wiki')
				.replace(/<p>(.*)<\/p>/g, function (_, text) {
					return '<p>' + text.trim() + '</p>';
				});
			// Thử chỉnh nội dung
			var interval = setInterval(function() {
				var rte = $('.message-wall-app > div > .EditorForm .rich-text-editor__content > div');
				if (rte.length) {
					clearInterval(interval);
					rte.html(content);
					// Chỉnh tiêu đề (https://stackoverflow.com/a/72014541/9985371)
					var title = $('.message-wall-app > div > .EditorForm .wds-input input')[0];
					Object.getOwnPropertyDescriptor(Object.getPrototypeOf(title), 'value').set.call(title, 'Đã bị cấm');
					title.dispatchEvent(new Event('input', { bubbles: true }));
					title.blur(); // Loại bỏ tiêu điểm để xóa thiết lập tự động hoàn thành
					// Xóa URL - Mỗi biểu mẫu đều độc nhất và không xuất hiện lại
					window.history.replaceState(null, '', window.location.pathname);
				}
			}, 10);
		});
	}

	if (mw.config.get('wgCanonicalSpecialPageName') === 'Block') mw.loader.using(['oojs-ui-core', 'oojs-ui-widgets', 'oojs-ui-windows'], initBlockPage);
	else if (mw.config.get('profileIsMessageWallPage') && mw.util.getParamValue('wall-editor') === 'new' && mw.util.getParamValue('block-message')) mw.loader.using(['mediawiki.api'], initMessageWall);
})();