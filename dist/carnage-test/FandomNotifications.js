void ((typeof window.noNotifications == 'undefined' || !$('.WikiaNotifications').length) && function(mw, $, window, FandomNotifications, FandomNotification){
	/**
	 * Setting up configurations
	 * for the FandomNotifications object
	 **/
	FandomNotifications = $.extend(FandomNotifications, {
		/**
		 * @number length
		 * - This is the number of notifications that are present
		 **/
		notificationLength: (function(){
			if (!window.localStorage) return;
			if (typeof localStorage.getItem('FandomNotification_length') == 'undefined' || localStorage.getItem('FandomNotification_length') === null)
				localStorage.setItem('FandomNotification_length', 0);
			return {
				value: Number(localStorage.getItem('FandomNotification_length')),
				add: function(number){
					var item = Number(localStorage.getItem('FandomNotification_length'));
					if (isNaN(item)) localStorage.setItem('FandomNotification_length', number);
					else {
						localStorage.setItem('FandomNotification_length', item + number);
					}
				},
				subtract: function(number){
					var item = Number(localStorage.getItem('FandomNotification_length'));
					number = Number(number);
					if (isNaN(item)) localStorage.setItem('FandomNotification_length', number);
					else {
						localStorage.setItem('FandomNotification_length', item - number);
					}
				},
				clear: function(){
					localStorage.removeItem('FandomNotification_length');
					localStorage.setItem('FandomNotification_length', 0);
				}
			};
		})(),
		maxLength: 3,
		/**
		 * @function closeNotification
		 * - This function closes the notification and stores the data
		 *
		 * @param target
		 * - The selector that is used to close the notification
		 **/
		closeNotification: function(target){
			var notification = $(target),
				notification_id = notification.attr('id'),
				isClosed = FandomNotifications.getStorageItem('isClosed', notification_id) === 'true';
			if (!isClosed && notification.hasClass('FandomNotification')){
				notification.remove();
				FandomNotifications.setStorageItem('isClosed', notification_id, true);
				FandomNotifications.notificationLength.subtract(1);
				if (FandomNotification.notificationLength.value < 0){
					FandomNotification.notificationLength.clear();
				}
			}
		},
		/**
		 * @function getStorageItem
		 * - This function allows you to retrieve the item from the storage
		 * 
		 * @param name
		 * - The name of the storage item
		 * @param id
		 * - The ID of the target notification
		 **/
		getStorageItem: function(name, id){
			if (!window.localStorage) return;
			var full_item = 'FandomNotification_' + id + '_' + name;
			return localStorage.getItem(full_item);
		},
		/**
		 * @function setStorageItem
		 * - This function allows you to set the value for the storage item
		 * 
		 * @param name
		 * - The name of the storage item
		 * @param id
		 * - The ID of the target notification
		 * @param value
		 * - The value used to set the item
		 **/
		setStorageItem: function(name, id, value){
			if (!window.localStorage) return;
			var full_item = 'FandomNotification_' + id + '_' + name;
			if (typeof value === 'object'){
				value = JSON.parse(value);
			}
			localStorage.setItem(full_item, value);
		},
		/**
		 * @function parseText
		 * - This function allows the text to be parsed
		 *
		 * @param text
		 * - The text that is used to be parsed
		 **/
		parseText: function(text, config){
			config = config || {};
			var tags = $.extend(true, FandomNotifications.tags, {
				bold: {
					startTag: ['<bold>', '<strong>'],
					endTag: ['</bold>', '</strong>']
				},
				italic: {
					startTag: ['<italic>', '<i>'],
					endTag: ['</italic>', '</i>']
				},
				underline: {
					startTag: ['<underline>', '<u>'],
					endTag: ['</underline>', '</u>']
				},
				avatar: {
					startTag: ['<avatar />', '<img class="notification-avatar avatar"']
				},
				username: {
					startTag: ['<username />', '<span class="notification-username username">' + mw.config.get('wgUserName', wgUserName) + '</span>']
				},
				wikiname: {
					startTag: ['<wikiname />', '<span class="notification-wikiname wikiname">' + mw.config.get('wgSiteName', wgSiteName) + '</span>']
				},
				button: {
					startTag: ['<notification-close-button>', '<a class="FandomNotificationButton notification-button notification-close-button" href="#">'],
					endTag: ['</notification-close-button>', '</a>']
				}
			});
			
			if (typeof config.exclusions == 'object' && config.exclusions instanceof Array){
				for (var i = 0; i < config.exclusions.length; i++){
					var exclusion = config.exclusions[i];
					delete tags[exclusion];
				}
			}
			
			$.each(tags, function(name, obj){
				var startTag = obj.startTag,
					attributes = obj.attributes || {},
					endTag = obj.endTag;
				if (endTag){
					text =
						text.replace(startTag[0], startTag[1])
							.replace(endTag[0], endTag[1]);
				} else {
					if (name === 'avatar'){
						$.ajax({
							method: 'GET',
							contentType: 'application/json; charset=utf-8',
							async: false,
							url: '/wikia.php',
							data: {
								controller: 'UserProfilePageController',
								method: 'renderUserIdentityBox',
								format: 'json'
							}
						}).done(function(data){
							if (!data.error){
								var avatar = data.user.avatar,
									st = startTag[1] + ' src="' + avatar + '" />';
								text =
									text.replace(startTag[0], st);
							}
						}).fail(function(error){
							var st = startTag[1] + ' src="" />';
							text =
								text.replace(startTag[0], st);
						});
					} else {
						text =
							text.replace(startTag[0], startTag[1]);
					}
				}
			});
			return text;
		},
		/**
		 * @function findNotification
		 * - This function finds the element using the ID of the notification
		 *
		 * @param id
		 * - The ID used to find the notification element
		 **/
		findNotification: function(id){
			var notification_selector = ['#', id].join(''),
				notification = $(notification_selector);
			if (notification.hasClass('FandomNotification')){
				return notification;
			} else {
				return void notification;
			}
		},
		/**
		 * @function createNotification
		 * - This function creates the notification and/or the element that contains it
		 *
		 * @param id
		 * - This is the ID used to create the notification
		 * @param config
		 * - This is the settings used to create the notification
		 **/
		createNotification: function(id, config){
			var notification_container = $('.FandomNotificationContainer'),
				isClosed = FandomNotifications.getStorageItem('isClosed', id) === 'true',
				notification = null;
			// If the notification item is closed, do not load
			if (isClosed) return;
			FandomNotifications.notificationLength.add(1);
			var notificationLength = FandomNotifications.notificationLength.value, maxLength = FandomNotifications.maxLength;
			if (!notification_container.length){
				notification = $('<section />', {
						'class': 'FandomNotification notification',
						'id': id,
						html: [
							$('<header />', {
								'class': 'FandomNotificationHeader notification-header',
								html: [
									(typeof config.heading !== 'undefined' || config.heading !== '') ? $('<h3 />', {
										'class': 'FandomNotificationHeading notification-heading',
										html: function(){
											var content = $('<div />', { html: config.heading }).html();
											return FandomNotifications.parseText(content, {
												exclude: ['button']
											});
										}
									}) : void 0,
									$('<a />', {
										'class': 'FandomNotificationClose notification-close',
										'href': '#' + id,
										html: '&times;'
									}).on('click', function(event){
										FandomNotifications.closeNotification.apply(window, [event.target.hash]);
									})
								].filter(function(elem){
									return !void 0;
								})
							}),
							$('<div />', {
								'class': 'FandomNotificationContent notification-content',
								html: function(){
									var content = $('<div />', { html: config.content }).html();
									return FandomNotifications.parseText(content);
								}
							})
						]
					}),
					notificationContainer = $('<aside />', {
						'class': 'FandomNotificationContainer notification-container',
						html: $('<div />', {
							'class': 'FandomNotificationWrapper notification-wrapper' + notificationLength > (maxLength - 1) ? ' notification-stack' : '',
							html: notification
						})
					});
				$('.WikiaSiteWrapper').append(notificationContainer);
				FandomNotifications.setStorageItem('isClosed', id, false);
			} else {
				notification = $('<section />', {
						'class': 'FandomNotification notification',
						'id': id,
						html: [
							$('<header />', {
								'class': 'FandomNotificationHeader notification-header',
								html: [
									typeof config.heading !== 'undefined' ? $('<h3 />', {
										'class': 'FandomNotificationHeading notification-heading',
										html: function(){
											var content = $('<div />', { html: config.heading }).html();
											return FandomNotifications.parseText(content, {
												exclude: ['button']
											});
										}
									}) : void 0,
									$('<a />', {
										'class': 'FandomNotificationClose notification-close'
									})
								].filter(function(elem){
									return !void 0;
								})
							}),
							$('<div />', {
								'class': 'FandomNotificationContent notification-content',
								html: function(){
									var content = $('<div />', { html: config.content }).html();
									return FandomNotifications.parseText(content);
								}
							})
						]
					});
				if (notificationLength > (maxLength - 1)){
					$('.FandomNotificationContainer .notification-wrapper').addClass('notification-stack');
				}
				$('.FandomNotificationContainer .notification-wrapper').append(notification);
				FandomNotifications.setStorageItem('isClosed', id, false);
			}
		}
	});
	
	/**
	 * Creating aliases for the notifications property
	 **/
	function createAliases(){
		var props = {
			findNotification: ['find', 'getSelector', 'get', 'findSelector'],
			createNotification: ['create', 'add', 'addNotification', 'append'],
			notificationContent: ['content'],
			parseText: ['parse'],
			getStorageItem: ['getItem', 'getNotificationData', 'getData'],
			setStorageItem: ['setItem', 'setNotificationData', 'setData'],
			closeNotification: ['close', 'remove'],
			notificationLength: ['length']
		};
		$.each(props, function(name, arr){
			console.log(name, arr);
			$.each(arr, function(index, item){
				FandomNotifications[item] = FandomNotifications[name];
				console.log(item);
			});
		});
	}
	
	createAliases();
	/**
	 * Creating the constructor for the Fandom notifications
	 *
	 * @function FandomNotification
	 * - This is the function that creates a constructor
	 * @param id
	 * - This is the ID used for the element
	 * @param config
	 * - This is the settings for the notification
	 **/
	FandomNotification = function FandomNotification(id, config){
		this.id = id;
		this.heading = config.heading;
		this.content = config.content;
		return this;
	};
	
	/**
	 * @function open
	 * - This is the function that opens the notification
	 **/
	FandomNotification.prototype.open = function open(){
		var obj = this,
			id = obj.id;
		delete obj.id;
		FandomNotifications.create(id, obj);
	};
	
	/**
	 * Creating the content from the notifications
	 **/
	var notification_content = FandomNotifications.content || [{
		source: 'MediaWiki:Custom-FandomNotification-1',
		id: 'testing-notif'
	}, {
		source: 'MediaWiki:Custom-FandomNotification-2',
		id: 'hello-world-notification'
	}, {
		heading: 'Test',
		content: '<bold>Hello World</bold>',
		id: 'test-notifications2'
	}, {
		content: 'Test Notifications',
		id: 'test-notifications'
	}];
	
	$.each(notification_content, function(obj, index){
		var id = obj.id, heading = null, content = null;
		if (typeof obj.source !== 'undefined'){
			$.ajax({
				method: 'GET',
				contentType: 'text/plain; charset=utf-8',
				async: true,
				url: '/index.php',
				data: {
					title: obj.source,
					action: 'raw',
					ctype: 'text/plain'
				}
			}).done(function(data){
				var firstLine = data.split(/\n+/g)[0];
				if (firstLine.indexOf('****') > -1){
					heading = firstLine.replace(/\*{4}/g, '').trim();
					content = data.split(/\n+/g).slice(1).join('');
				} else {
					heading = '';
					content = data;
				}
				var notification = new FandomNotification(id, {
					heading: heading,
					content: content
				});
				notification.open();
			});
		} else {
			heading = obj.heading;
			content = obj.content;
			var notification = new FandomNotification(id, {
				heading: heading,
				content: content
			});
			notification.open();
		}
	});
})(this.mediaWiki, this.jQuery, this, this.FandomNotifications = this.FandomNotifications || {}, this.FandomNotification = this.FandomNotification || null);