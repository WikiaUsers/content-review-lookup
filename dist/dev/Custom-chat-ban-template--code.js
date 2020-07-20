// <nowiki>
ChatBanModal = function(title, okCallback) {
	require(['jquery','wikia.ui.factory','wikia.mustache'], function($, uiFactory, Mustache) {
		$.when(
			uiFactory.init(['modal']),
			mw.loader.using('mediawiki.jqueryMsg')
		).then(function(uiModal) {
			$.msg = function() {
				return mw.message.call(this, arguments).escaped();
			};
			var tmpl ='<form class="WikiaForm"> \
				<fieldset> \
					<div class="input-group"> \
						<label for="chat-ban-expiry">{{msg-chat-ban-modal-label-expires}}</label> \
						<select id="chat-ban-expiry"> \
							{{#banOptions}} \
							<option value="{{time}}">{{text}}</option> \
							{{/banOptions}} \
						</select> \
					</div> \
					<div class="input-group"> \
						<label for="chat-ban-reason">{{msg-chat-ban-modal-label-reason}}</label> \
						<select id="chat-ban-reason"> \
							{{#reasons}} \
							<option value="{{text}}">{{text}}</option> \
							{{/reasons}} \
						</select> \
					</div> \
				</fieldset> \
			</form>',
			mustacheContext = {
				'msg-chat-ban-modal-label-expires': 'Expires',
				'msg-chat-ban-modal-label-reason': 'Reason',
				banOptions: ( function () {
					var opts = [], time = {
						'seconds' : 1,
						'minutes' : 60,
						'hours' : 3600,
						'days' : 86400,
						'weeks' : 604800,
						'months' : 2592000,
						'years' : 31536000
					};
					"15 minutes:15 minutes, 1 hour:1 hour, 2 hours:2 hours,1 day:1 day,2 days:2 days,3 days:3 days,1 week:1 week,2 weeks:2 weeks,1 month:1 month,3 months:3 months,6 months:6 months,1 year:1 year,2 years:2 years,infinite:infinite".split(',').forEach(function(option) {
						option = option.split(':');
						var lt = option[0].split(' ');
						opts.push({
							time: time[lt[1]] * parseInt(lt[0]),
							text: option[1]
						});
					});
					return opts;
				} )(),
				reasons: [
                                         {
						text: 'Misbehaving in chat'
					},
 
					{
						text: 'Trolling'
					},
 
                                        {
						text: 'Swearing'
					},
 
					{
						text: 'Impersonation'
					},
 
                                        {
						text: 'Inappopriate behavior in chat'
					},
 
					{
						text: 'Spamming'
					},
 
					{
						text: 'Sockpuppet'
					},
					{
						text: 'Insulting/Rudeness in chat'
					},
 
				]
			},
			banModalConfig = {
				type: 'default',
				vars: {
					id: 'ChatBanModal',
					size: 'small',
					content: Mustache.render(tmpl, mustacheContext),
					title: title,
					buttons: [
						{
							vars: {
								value: mw.message('chat-ban-modal-button-ok').escaped(),
								classes: ['normal', 'primary'],
								data: [
									{
										key: 'event',
										value: 'ok'
									}
								]
							}
						},
						{
							'vars': {
								'value': mw.message('chat-ban-modal-button-cancel').escaped(),
								data: [
									{
										key: 'event',
										value: 'close'
									}
								]
							}
 
						}
					]
				}
			};
 
			uiModal.createComponent(banModalConfig, function (banModal) {
				var reasonInput = banModal.$element.find('#chat-ban-reason');
 
				function banUser() {
					var reason = reasonInput.val(),
						expires = banModal.$element.find('#chat-ban-expiry').val();
 
					okCallback(expires, reason);
					console.log(expires + ' ' + reason);
 
					banModal.trigger('close');
				}
 
				reasonInput.placeholder().keydown(function (e) {
					if (e.which === 13) {
						// Submit when 'enter' key is pressed (BugId:28101).
						e.preventDefault();
						banUser();
					}
				});
 
				banModal.bind('ok', function (event) {
					event.preventDefault();
					banUser();
				});
 
				banModal.show();
			});
		});
	});
};