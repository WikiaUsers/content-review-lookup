;
(function($, mw) {
	if (!window.mw || !mw.config) return;

	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:ShowCustomModal.js'
	});

	var CommentBlockManager = {
		init: function(modalScript) {
			this.showCustomModal = modalScript;
			this.loadSettings();
			this.createToolsMenuLink();
			this.setupObservers();
		},

		loadSettings: function() {
			var self = this;

			$.ajax({
				url: mw.util.wikiScript('api'),
				type: 'GET',
				data: {
					action: 'query',
					prop: 'info|revisions',
					titles: 'Fisch_Wiki:CommentBlocks',
					rvprop: 'content',
					format: 'json'
				},
				success: function(data) {
					var pages = data.query.pages;
					var pageId = Object.keys(pages)[0];

					try {
						// JSON parsing 
						var pageContent = pages[pageId].revisions ?
							JSON.parse(pages[pageId].revisions[0]['*']) : {};

						self.settings = {
							userPageBlocks: pageContent.userPageBlocks || {},
							globalSettings: pageContent.globalSettings || {
								enableBlockNotification: false
							}
						};
					} catch (err) {
						console.error('Error parsing settings:', err);
						self.settings = {
							userPageBlocks: {},
							globalSettings: {
								enableBlockNotification: false
							}
						};
					}
				},
				error: function(err) {
					console.error('Error loading settings:', err);
					self.settings = {
						userPageBlocks: {},
						globalSettings: {
							enableBlockNotification: false
						}
					};
				}
			});
		},

		saveSettings: function() {
			var self = this;
			$.ajax({
				url: mw.util.wikiScript('api'),
				type: 'POST',
				data: {
					action: 'edit',
					title: 'Fisch_Wiki:CommentBlocks',
					summary: 'Updating comment blocking settings',
					text: JSON.stringify(this.settings),
					token: mw.user.tokens.get('csrfToken'),
					format: 'json'
				},
				success: function(response) {
					if (response.edit && response.edit.result === 'Success') {
						console.log('Settings saved successfully');
					}
				},
				error: function(xhr, status, error) {
					console.error('Error saving settings:', error);
				}
			});
		},

		createToolsMenuLink: function() {
			var toolsMenu = document.getElementById('my-tools-menu');
			if (!toolsMenu) return;

			var commentBlockLink = document.createElement('li');
			commentBlockLink.className = 'overflow';
			commentBlockLink.innerHTML = '<a href="#" id="comment-block-manager-link">Managing comments</a>';

			toolsMenu.appendChild(commentBlockLink);

			commentBlockLink.addEventListener('click', this.openCommentBlockModal.bind(this));
		},

		openCommentBlockModal: function() {
			var self = this;

			var modalContent = $('<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;">').append(
				'<div style="padding-bottom:5px; border-bottom:solid 1px #36759c; margin-top:-5px;">' +
				'<div style="text-align:center;">' +
				'<button type="button" class="wikia-button commentBlockSwitch" data-section="UserPageBlock">Blocking users</button>&nbsp;' +
				'<button type="button" class="wikia-button commentBlockSwitch" data-section="GlobalSettings">Global settings</button>' +
				'</div>' +
				'</div>' +
				'<div style="height:400px; overflow-y:auto;">' +
				// User-Page Block Section
				'<div class="UserPageBlockSection commentBlockSection">' +
				'<h2 style="padding:5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px #36759c;">Advanced comment blocking</h2>' +
				'<div style="margin:10px 0;">' +
				'<input type="text" id="username-input" placeholder="Username" style="width:45%; margin-right:10px;">' +
				'<input type="text" id="page-input" placeholder="Page Name" style="width:45%;">' +
				'</div>' +
				'<div style="margin:10px 0;">' +
				'<h3>Параметры блокировки:</h3>' +
				'<div style="display:flex; flex-wrap:wrap; gap:10px;">' +
				'<label><input type="checkbox" name="blockOption" value="createComments"> Block creation comments</label>' +
				'<label><input type="checkbox" name="blockOption" value="replyToComments"> Block replies comments</label>' +
				'<label><input type="checkbox" name="blockOption" value="editComments"> Block editing comments</label>' +
				'<label><input type="checkbox" name="blockOption" value="deleteComments"> Block deletion comments</label>' +
				'</div>' +
				'</div>' +
				'<button id="block-user-page-comments-btn" class="wikia-button block-action-btn" style="margin-top:10px;">Apply</button>' +
				'<div id="blocked-user-page-list" style="max-height:200px; overflow-y:auto; margin-top:15px;"></div>' +
				'</div>' +
				// Global Settings Section
				'<div class="GlobalSettingsSection commentBlockSection" style="display:none;">' +
				'<h2 style="padding:5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px #36759c;">Global Settings</h2>' +
				'<div style="margin:10px 0;">' +
				'<label>' +
				'<input type="checkbox" id="enable-block-notification"> ' +
				'Enable block notifications' +
				'</label>' +
				'</div>' +
				'</div>' +
				'</div>'
			);

			this.showCustomModal('Managing comment blocking', modalContent, {
				id: 'CommentBlockManagerModal',
				width: 600,
				buttons: [{
					message: 'Save',
					handler: this.saveModalSettings.bind(this),
					id: 'comment-block-save-btn'
				}]
			});

			this.addButtonAnimations();

			this.setupModalEventListeners();
			this.populateBlockLists();
			this.setupSectionSwitchers();
			this.loadGlobalSettings();
		},

		addButtonAnimations: function() {
			$('.block-action-btn, #comment-block-save-btn').each(function() {
				$(this).css({
						'transition': 'all 0.3s ease',
						'background-color': '#4CAF50',
						'color': 'white',
						'border': 'none',
						'padding': '10px 20px',
						'border-radius': '4px',
						'cursor': 'pointer',
						'box-shadow': '0 2px 5px rgba(0,0,0,0.2)'
					})
					.hover(
						function() {
							$(this).css({
								'background-color': '#45a049',
								'transform': 'translateY(-2px)',
								'box-shadow': '0 4px 8px rgba(0,0,0,0.3)'
							});
						},
						function() {
							$(this).css({
								'background-color': '#4CAF50',
								'transform': 'translateY(0)',
								'box-shadow': '0 2px 5px rgba(0,0,0,0.2)'
							});
						}
					);
			});
		},

		setupModalEventListeners: function() {
			var self = this;

			$('#block-user-page-comments-btn').on('click', function() {
				var username = $('#username-input').val().trim();
				var pageTitle = $('#page-input').val().trim();

				if (username && pageTitle) {
					var blockOptions = [];
					$('input[name="blockOption"]:checked').each(function() {
						blockOptions.push($(this).val());
					});

					if (blockOptions.length > 0) {
						self.blockUserPageComments(username, pageTitle, blockOptions);
						$('#username-input, #page-input').val('');
						$('input[name="blockOption"]').prop('checked', false);
						self.populateBlockLists();
					} else {
						alert('Please select at least one blocking option');
					}
				} else {
					alert('Please enter username or page name.');
				}
			});

			$('#enable-block-notification').on('change', function() {
				self.settings.globalSettings.enableBlockNotification = this.checked;
			});
		},

		setupSectionSwitchers: function() {
			$('.commentBlockSwitch').on('click', function() {
				var section = $(this).data('section');

				$('.commentBlockSection').hide();

				$('.' + section + 'Section').show();
			});
		},

		loadGlobalSettings: function() {
			$('#enable-block-notification').prop('checked',
				this.settings.globalSettings.enableBlockNotification || false
			);
		},

		populateBlockLists: function() {
			var self = this;
			var blockList = $('#blocked-user-page-list').empty();

			function encodeUserLink(username) {
				return encodeURIComponent(username.replace(/\s+/g, '_'));
			}

			var wikiDomain = mw.config.get('wgServer') + mw.config.get('wgScriptPath');

			Object.keys(this.settings.userPageBlocks || {}).forEach(function(key) {
				var [username, pageTitle] = key.split('|||');
				var blockData = self.settings.userPageBlocks[key];

				var userLink = wikiDomain + '/wiki/User:' + encodeUserLink(username);
				var pageLink = wikiDomain + '/wiki/' + encodeUserLink(pageTitle);

				var blockItem = $('<div>', {
					'class': 'block-item',
					'style': 'margin:5px 0; padding:5px; border:1px solid #ccc; display:flex; justify-content:space-between; align-items:center;'
				}).append(
					$('<div>').html(
						`<strong>User:</strong> <a href="${userLink}" target="_blank">${username}</a><br>` +
						`<strong>Page:</strong> <a href="${pageLink}" target="_blank">${pageTitle}</a><br>` +
						`<strong>Blocked actions:</strong> ${blockData.blockedOptions.join(', ')}`
					),
					$('<button>', {
						'class': 'wikia-button small block-action-btn',
						'text': 'Unblock',
						'click': function() {
							self.unblockUserPageComments(username, pageTitle);
							self.populateBlockLists();
						}
					})
				);
				blockList.append(blockItem);
			});

			this.addButtonAnimations();
		},

		saveModalSettings: function() {
			this.saveSettings();
			$('.custom-modal-close').click();

			$('#CommentBlockManagerModal').remove();
		},

		blockUserPageComments: function(username, pageTitle, blockOptions) {
			username = username.trim();
			pageTitle = pageTitle.trim();

			if (!this.settings.userPageBlocks) {
				this.settings.userPageBlocks = {};
			}

			var key = `${encodeURIComponent(username)}|||${encodeURIComponent(pageTitle)}`;

			this.settings.userPageBlocks[key] = {
				blockedAt: new Date().toISOString(),
				blockedOptions: blockOptions
			};
			this.saveSettings();
		},

		unblockUserPageComments: function(username, pageTitle) {
			username = username.trim();
			pageTitle = pageTitle.trim();

			var key = `${encodeURIComponent(username)}|||${encodeURIComponent(pageTitle)}`;
			delete this.settings.userPageBlocks[key];
			this.saveSettings();
		},

		setupObservers: function() {
			var self = this;
			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if (mutation.addedNodes) {
						mutation.addedNodes.forEach(function(node) {
							if (node.nodeType === Node.ELEMENT_NODE) {
								self.processCommentElements(node);
							}
						});
					}
				});
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		},

		processCommentElements: function(rootNode) {
			if (!this.settings || !this.settings.userPageBlocks) return;

			var username = this.getCurrentUsername(rootNode);
			var pageTitle = mw.config.get('wgPageName');

			Object.keys(this.settings.userPageBlocks).forEach(function(key) {
				var [blockedUsername, blockedPageTitle] = key.split('|||').map(decodeURIComponent);

				if (username === blockedUsername && pageTitle === blockedPageTitle) {
					var blockData = this.settings.userPageBlocks[key];

					blockData.blockedOptions.forEach(function(blockOption) {
						var selector = '';
						switch (blockOption) {
							case 'createComments':
								selector += '.InlineEntityFormWrapper_inline-entity-form-wrapper__z2Uf9';
								break;
							case 'replyToComments':
								selector += '.ReplyCreate_reply-create__aSd5g';
								break;
							case 'editComments':
								selector += '.ActionItem_action-item__dll5i:contains("Edit")';
								break;
							case 'deleteComments':
								selector += '.ActionItem_action-item__dll5i:contains("Delete")';
								break;
						}
						if (selector) {
							var elements = rootNode.querySelectorAll(selector);
							elements.forEach(function(element) {
								element.style.display = 'none';
							});
						}
					});

					if (this.settings.globalSettings.enableBlockNotification) {
						this.showBlockNotification(username, pageTitle, blockData.blockedOptions);
					}
				}
			}.bind(this));
		},

		showBlockNotification: function(username, pageTitle, blockedOptions) {
			var notification = $('<div>', {
				'class': 'comment-block-notification',
				'style': 'position:fixed; top:10px; right:10px; background:rgba(0,0,0,0.7); color:white; padding:10px; z-index:9999; max-width:300px;'
			});

			var notificationText = `Comments are locked for ${username} on page ${pageTitle}:<br>`;
			notificationText += blockedOptions.map(function(option) {
				switch (option) {
					case 'createComments':
						return 'Creating comments';
					case 'replyToComments':
						return 'Replies comments';
					case 'editComments':
						return 'Editing comments';
					case 'deleteComments':
						return 'Deleting comments';
					default:
						return option;
				}
			}).join(', ');

			notification.html(notificationText);

			$('body').append(notification);

			setTimeout(function() {
				notification.fadeOut(300, function() {
					$(this).remove();
				});
			}, 3000);
		},

		getCurrentUsername: function(rootNode) {
			var usernameElement = rootNode.querySelector('.wds-avatar + .wds-dropdown .wds-dropdown__content a');
			return usernameElement ? usernameElement.textContent.trim() : null;
		}
	};

	function initPlugin() {
		var userGroups = window.mw.config.get('wgUserGroups') || [];
		if (userGroups.indexOf('sysop') !== -1) {
			mw.hook('dev.showCustomModal').add(CommentBlockManager.init.bind(CommentBlockManager));
		}
	}

	if (document.readyState === 'complete') {
		initPlugin();
	} else {
		window.addEventListener('load', initPlugin);
	}
})(jQuery, mediaWiki);