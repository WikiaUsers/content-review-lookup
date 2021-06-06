var Warframe = (function(window) {
	'use strict';
	if (window === null) {
		throw new TypeError('window is not found');
	}
	var $;
	var jQuery;
	if (typeof window.jQuery !== 'undefined') {
		jQuery = $ = window.jQuery;
	} else {
		throw new Error('jQuery is undefined');
	}
	var mw = window.mw || window.mediaWiki;
	if (!mw || typeof mw !== 'object') {
		throw new Error('mw is not defined');
	}

	function random(min, max) {
		return Math.floor(min + Math.random() * (max + 1 - min));
	}

	function probability(pcoeff) {
		return random(0, 100) / 100 < pcoeff;
	}
	var editToken = mw.user.tokens.get('editToken');
	var wgUserName = mw.config.get('wgUserName');
	var wgPageName = mw.config.get('wgPageName');
	var wgUserGroups = mw.config.get('wgUserGroups');
	var wgAction = mw.config.get('wgAction');
	var wgCanonicalSpecialPageName = mw.config.get('wgCanonicalSpecialPageName');
	var wgTitle = mw.config.get('wgTitle');
	var wgIsMainPage = mw.config.get('wgIsMainPage');
	var wgScript = mw.config.get('wgScript');
	var wgArticlePath = mw.config.get('wgArticlePath');
	var wgArticleId = mw.config.get('wgArticleId');
	var wgIsArticle = mw.config.get('wgIsArticle');
	var wgNamespaceNumber = mw.config.get('wgNamespaceNumber');
	var $document = $(document);
	var $html = $('html');
	var $window = $(window);
	var $body = $(document.body);
	var $WikiaPage = $('#WikiaPage');
	var $mwContentText = $('#mw-content-text');
	var $WikiaRail = $('#WikiaRail');
	var API = '/ru/api.php';
	var INDEX = '/ru/index.php';
	var mwtools = {
		block: function(name, time, callback) {
			$.post(API, {
				action: 'block',
				user: name,
				expiry: time === Infinity ? 'infinite' : time + ' days',
				reblock: true,
				autoblock: true,
				allowusertalk: true,
				nocreate: true,
				token: editToken,
				format: 'json'
			}).success(function(data) {
				callback(data);
			});
		},
		unblock: function(name, callback) {
			$.post(API, {
				action: 'unblock',
				user: name,
				token: editToken,
				format: 'json'
			}).success(function(data) {
				callback(!data.error && true || false);
			});
		},
		wallmessage: function(title, text, to, callback) {
			$.post('/ru/wikia.php', {
				controller: 'WallExternal',
				method: 'postNewMessage',
				format: 'json',
				convertToFormat: '',
				notifyeveryone: 0,
				messagetitle: title,
				pagenamespace: 1200,
				body: text,
				pagetitle: to,
				token: editToken
			}).success(function(data) {
				callback(data.status && true || false);
			});
		},
		purge: function() {
			location.href += (location.href.indexOf('?') > -1 ? '&action=purge' : '?action=purge') + '&cb=' + random(0, 0x7fffffff);
		},
		userinfo: function(name, callback) {
			if ($.isArray) {
				name = name.join('|');
			}
			$.get(API, {
				action: 'query',
				list: 'users',
				ususers: name,
				usprop: ['groups', 'blockinfo', 'rights', 'editcount', 'registration'].join('|'),
				format: 'json'
			}).success(function(data) {
				callback(data && !data.error && data.query || false);
			});
		},
		deletepage: function(page, reason, callback) {
			$.post(API, {
				action: 'delete',
				title: page,
				reason: reason,
				format: 'json',
				token: editToken
			}).success(function(data) {
				callback(data);
			});
		},
		getCurrentUserName: function() {
			if ([2, 3, 500, 1200].indexOf(wgNamespaceNumber) !== -1) {
				if (wgCanonicalNamespace === 'Блог_участника') {
					return wgTitle.split('/').shift();
				}
				return wgTitle;
			}
			if (wgNamespaceNumber === -1 && ['Following', 'Contributions'].indexOf(wgCanonicalSpecialPageName) !== -1) {
				if (wgScript == location.pathname) {
					return this.getUrlVars().target || null;
				}
				if (wgCanonicalSpecialPageName === 'Following') {
					return $('#UserProfileMasthead [itemprop="name"]').eq(0).text();
				}
				return decodeURIComponent(location.pathname.split('/').pop().replace(/_/g, ' ')) || null;
			}
			return null;
		},
		raw: function(page, callback) {
			$.get(INDEX, {
				action: 'raw',
				title: page,
				cb: random(0, 0x7fffffff),
				dataType: 'text'
			}).always(function(data) {
				callback(data);
			});
		},
		render: function(page, callback) {
			$.get(INDEX, {
				action: 'render',
				title: page,
				cb: random(0, 0x7fffffff),
				dataType: 'text'
			}).success(function(data) {
				callback(data);
			});
		},
		getUrlVars: function(url) {
			var params = {};
			var length;
			var i;
			url = decodeURIComponent(url && String(url) || location.href);
			try {
				if (url.indexOf('?') !== -1) {
					url = url.match(/\?.+/).join().slice(1).split('&');
				} else {
					return params;
				}
				length = url.length;
				for (i = 0; i < length; i++) {
					url[i] = url[i].split('=');
					params[url[i][0]] = url[i][1];
				}
			} catch (ex) {}
			return params;
		}
	};
	var storage = (function(localStorage) {
		return {
			get: function(elem) {
				try {
					return JSON.parse(localStorage.getItem(String(elem)));
				} catch (ex) {
					return localStorage.getItem(String(elem));
				}
			},
			set: function(elem, val) {
				if (arguments.length <= 1) {
					return;
				}
				elem = String(elem);
				if (val && typeof val === 'object') {
					try {
						val = JSON.stringify(val);
					} catch (ex) {}
				} else {
					val = String(val);
				}
				localStorage.setItem(elem, val);
			},
			clear: function() {
				return localStorage.clear();
			},
			remove: function(elemn) {
				if (typeof elem === 'string' || typeof elem === 'number') {
					localStorage.removeItem(elem);
					return elem;
				}
			}
		};
	})(window.localStorage);
	var This;
	var FADETIME = 250;
	return This = {
		Init: function() {
			!('customToggleClick' in jQuery.fn) && (jQuery.fn.customToggleClick = function() {
				var functions = Array.prototype.slice.call(arguments).filter($.isFunction);
				return this.each(function(_, elem) {
					var i = 0;
					$(elem).on('click', function() {
						if (functions[i].apply(this, arguments) !== false) {
							i++;
						}
						if (i === functions.length) {
							i = 0;
						}
					});
				});
			});
			this.AdmRightsRegExp = /(Часовой|bureaucrat|sysop|threadmoderator|helper|vstf|staff)/g;
			this.MwContentTextBarrel = {
				$container: $('<div>'),
				isFilled: false
			};
			this.Auto.init();
			this.Invoke.init();
			this.Spoilers.init();
			this.Tabbers.init();
			/* this.ScrollTop.init(); */
			this.AjaxAutoRefresh.init();
			this.AjaxLivePad.init();
			this.AjaxBatchDelete.init();
			/* this.AjaxCommentsDelete.init(); */
			this.AjaxTooltips.init();
			this.Mainpage.init();
			this.ProfileTags.init();
			this.QuickTemplates.init();
			this.Timers.init();
			this.Styles.init();
			this.RelicsDatabase.init();
		},
		Auto: {
			appendLIElement: function($LIElement) {
				this.$railListElement.append($LIElement);
			},
			$railModuleElement: $('<section>', {
				'class': 'rail-module tools-module',
				html: '<h2 class="has-icon">Инструменты</h2>'
			}),
			personalJSText: 'Локальный JavaScript',
			globalAutoText: '[ Глобальный ]',
			personalCSSText: 'Локальный CSS',
			globalCSSText: 'Глобальный CSS',
			personalJSFAIcon: 'fab fa-js-square',
			personalCSSFAIcon: 'fab fa-css3-alt',
			init: function() {
				var that = this;
				this.$railListElement = $('<ul>');
				this.$railModuleElement.append(this.$railListElement);
				if (wgUserName) {
					this.appendLIElement($('<li>', {
						html: '<span class="' + this.personalJSFAIcon + '"></span><a href="' + encodeURI('/ru/wiki/User:' + wgUserName + '/wikia.js') + '">' + this.personalJSText + '</a><a href="' + encodeURI('https://community.wikia.com/wiki/User:' + wgUserName + '/global.js') + '">' + this.globalAutoText + '</a>'
					}));
					this.appendLIElement($('<li>', {
						html: '<span class="' + this.personalCSSFAIcon + '"></span><a href="' + encodeURI('/ru/wiki/Участник:' + wgUserName + '/wikia.css') + '">' + this.personalCSSText + '</a><a href="' + encodeURI('https://community.wikia.com/wiki/User:' + wgUserName + '/global.css') + '">' + this.globalAutoText + '</a>'
					}));
				}
				if ($WikiaRail.hasClass('loaded')) {
					$WikiaRail.prepend(that.$railModuleElement);
				} else {
					$WikiaRail.on('afterLoad.rail', function() {
						$WikiaRail.prepend(that.$railModuleElement);
					});
				}
				$('#PageHeader .page-header__contribution-buttons .wds-dropdown .wds-list').append('<li><a id="APurge" href="#">Очистить кеш</a></li>').find('#APurge').on('click', function(event) {
					event.preventDefault();
					mwtools.purge();
				});
				var $navs;
				if (($navs = $mwContentText.find('.Navigation:not(#Navigation)')).length) {
					$navs.each(function(i, elem) {
						var $nav = $(elem);
						var articleWidth = $mwContentText.width();
						var scrollVal;
						var $cells;
						var buttonWidth = ($nav.attr('data-bwidth') || 25) * 2;
						var cellWidth = ($cells = $nav.find('.NavigationImage')).width();
						var cellsLength = $cells.length;
						var scrollTarget = $nav.find('.NavigationContentWrapper');
						var scrollLim;
						var currentScroll = 0;
						var visibleCells;
						var then;
						scrollVal = articleWidth - (articleWidth % cellWidth) - buttonWidth;
						setTimeout(function() {
							$nav.css('width', scrollVal + 'px');
							scrollVal = scrollVal - (scrollVal % cellWidth);
							visibleCells = scrollVal / cellWidth;
							scrollLim = (cellsLength * cellWidth) - (visibleCells * cellWidth);
							$nav.find('.NavigationRightArrow').click(function() {
								var v = currentScroll + scrollVal;
								if (v >= scrollLim) {
									scrollTarget.css('left', -(currentScroll = scrollLim) + 'px');
									return;
								}
								scrollTarget.css('left', -(v) + 'px');
								currentScroll += scrollVal;
							});
							$nav.find('.NavigationLeftArrow').click(function() {
								var v = currentScroll - scrollVal;
								if (v < 0) {
									scrollTarget.css('left', (currentScroll = 0) + 'px');
									return;
								}
								scrollTarget.css('left', (v === 0 ? v : -(v)) + 'px');
								currentScroll -= scrollVal;
							});
						}, FADETIME);
					});
				}
			}
		},
		Spoilers: {
			spoilerContentSelector: '.SpoilerContent',
			spoilerSelector: '.Spoiler',
			$defaultTarget: $mwContentText,
			init: function($target) {
				var that = this;
				if (!$target) {
					$target = this.$defaultTarget;
				}
				$target.find(this.spoilerSelector).each(function(i, elem) {
					var $elem = $(elem);
					var hidden = true;
					var $content = $elem.next().find(that.spoilerContentSelector);
					$elem.on('click', function() {
						if (hidden) {
							hidden = false;
							$content.show();
						} else {
							hidden = true;
							$content.hide();
						}
					});
				});
			}
		},
		Tabbers: {
			$defaultTarget: $mwContentText,
			tabberButtonsSelector: '.TabberButtons',
			tabberSelector: '.Tabber',
			tabberContentSelector: '.TabberContent',
			tabberCallbacks: [function($content) {
				$content.find('.lzy.lzyPlcHld:not(.lzyTrns.lzyLoaded)').each(function(_, elem) {
					var alias = elem.onload;
					var $elem = $(elem);
					elem.onload = function() {
						$elem.addClass('lzyTrns');
						alias.call(this);
						$elem.addClass('lzyLoaded');
					};
					elem.onload();
					elem.onload = alias = null;
				});
			}],
			getButtonIndex: function($buttons, $button) {
				var length = $buttons.length;
				var button = $button[0];
				for (var i = 0; i < length; ++i) {
					if ($buttons[i] === button) {
						return i;
					}
				}
				return -1;
			},
			init: function($target) {
				if (!$target) {
					$target = this.$defaultTarget;
				}
				var that = this;
				$target.find(this.tabberSelector).each(function(i, elem) {
					var $elem = $(elem);
					var $buttons = $elem.find(that.tabberButtonsSelector).first().children();
					var $content = $elem.find(that.tabberContentSelector).first().children();
					var currentIndex = 0;
					var $currentShownContent = $content.eq(0);
					$buttons.on('click', function() {
						var $this = $(this);
						var idx = that.getButtonIndex($buttons, $this);
						if (idx === currentIndex || idx === -1) {
							return;
						}
						$buttons.removeClass('selected');
						$this.addClass('selected');
						$content.hide();
						$currentShownContent.hide();
						$currentShownContent = $content.eq(idx).show();
						for (var i = 0; i < that.tabberCallbacks.length; ++i) {
							that.tabberCallbacks[i]($currentShownContent);
						}
						currentIndex = idx;
					});
				});
			}
		},
	/**	AjaxCommentsDelete: {
			toggleButtonFAIcon: 'fas fa-comments',
			confirmButtonFAIcon: 'fas fa-trash-alt',
			spinnerFAIcon: 'fas fa-circle-notch',
			getHTML: function() {
				return '<div id="ACDToggleButton"><a class="fas ' + this.faEnableButtonIconClassName + '"></a></div><div id="ACDConfirmButton"><a class="fas ' + this.faConfirmButtonIconClassName + '"></a></div><div id="ACDSpinner"><span class="fas ' + this.faSpinnerIconClassName + '"></span></div>';
			},
			enabled: false,
			collection: {
				length: 0
			},
			nullifyCollection: function() {
				this.collection = {
					length: 0
				};
			},
			linkRegExp: /\/|\?/g,
			getCommentLink: function($comment) {
				var href = $comment.find(this.deleteCommSelector).attr('href');
				var i;
				var match;
				var length;
				var link;
				if (href) {
					href = decodeURIComponent(href);
					match = href.split(this.linkRegExp);
					if (match) {
						length = match.length - 1;
						link = '';
						for (i = 2; i < length; ++i) {
							if (i !== 2) {
								link += '/' + match[i];
							} else {
								link += match[i];
							}
						}
					}
				}
				return link || null;
			},
			$articleComments: null,
			selectComment: function($comment) {
				var link = this.getCommentLink($comment);
				var that = this;
				var $subComments;
				if (link && !(link in this.collection)) {
					this.collection[link] = $comment;
					this.collection.length++;
					if (this.collection.length === 1) {
						this.showConfirmButton();
					}
					$comment.addClass('selected');
					if (($subComments = $comment.next()).hasClass(this.subCommsClassName)) {
						$subComments.children().each(function(i, elem) {
							var $elem = $(elem);
							var link = that.getCommentLink($elem);
							$elem.addClass('selected');
							if (link && link in that.collection) {
								delete that.collection[link];
								that.collection.length--;
								if (that.collection.length === 0) {
									that.hideConfirmButton();
								}
							}
						});
					}
				}
			},
			unselectComment: function($comment) {
				var link = this.getCommentLink($comment);
				var $parentComment;
				var $nextComment;
				var $mainComment;
				var comment;
				var that = this;
				if (link && link in this.collection) {
					$nextComment = $comment.next();
					$comment.removeClass('selected');
					delete this.collection[link];
					this.collection.length--;
					if (this.collection.length === 0) {
						this.hideConfirmButton();
					}
					if ($nextComment.hasClass(this.subCommsClassName)) {
						$nextComment.find(this.commentSelector).removeClass('selected');
					}
				} else {
					$parentComment = $comment.closest('.' + this.subCommsClassName);
					$comment.removeClass('selected');
					$mainComment = $parentComment.prev();
					comment = $comment[0];
					if ($mainComment.hasClass('selected')) {
						$mainComment.removeClass('selected');
						link = this.getCommentLink($mainComment);
						if (link in this.collection) {
							delete this.collection[link];
							this.collection.length--;
							if (this.collection.length === 0) {
								this.hideConfirmButton();
							}
							$parentComment.find(this.commentSelector).each(function(i, elem) {
								if (elem === comment) {
									return;
								}
								that.selectComment($(elem));
							});
						}
					}
				}
			},
			modeClassName: 'AjaxCommentsDelete',
			deleteCommSelector: 'a.article-comm-delete',
			subCommsClassName: 'sub-comments',
			commentSelector: 'li.comment',
			$articleCommentsMain: $('#WikiaArticleComments'),
			requestDelay: 100,
			rightsRegExp: /(Часовой|bureaucrat|sysop|threadmoderator|helper|vstf|staff)/g,
			isReasonsHTMLLoaded: false,
			getReasonsHTML: function getReasonsHTML(callback) {
				var that = this;
				if (this.isReasonsHTMLLoaded) {
					return getReasonsHTML.html;
				} else {
					mwtools.raw('MediaWiki:Deletereason-dropdown', function(response) {
						var html = '<select id="' + that.typicalReasonId + '"><option value="Другая причина">Другая причина</option>';
						var reasonsRE = /^\*{1,2}\s.+$/gm;
						var reasonsGroupRE = /^\*{1}\s/;
						var reasonRE = /^\*{2}\s/;
						var match = response.match(reasonsRE);
						var c = false;
						if (!match) {
							return null;
						}
						var length = match.length;
						var val;
						for (var i = 0; i < length; ++i) {
							val = match[i];
							if (reasonsGroupRE.test(val)) {
								if (c) {
									html += '</optgroup>';
								}
								val = val.replace(reasonsGroupRE, '');
								html += '<optgroup label="' + val + '">';
								c = !c;
								continue;
							}
							if (reasonRE.test(val)) {
								val = val.replace(reasonRE, '');
								html += '<option value="' + val + '">' + val + '</option>';
							}
						}
						getReasonsHTML.html = html + '</optgroup></select></div>';
						that.isReasonsHTMLLoaded = true;
						if (typeof callback === 'function') {
							callback();
						}
					});
				}
			},
			errorsCheckBoxId: 'AjaxCommentsDeleteShowErrors',
			reasonId: 'AjaxCommentsDeleteReason',
			typicalReasonId: 'AjaxCommentsDeleteTypicalReason',
			getModalHTML: function() {
				return '<div class="WikiaArticle ' + this.modeClassName + '"><fieldset><legend>Удаление</legend><table><tbody><tr><td>Причина: </td><td>' + this.getReasonsHTML.html + '</td></tr><tr><td>Другая причина/дополнение:</td><td><input type="text" id="' + this.reasonId + '"/></td></tr><tr><td>Показать ошибки:</td><td><input id="' + this.errorsCheckBoxId + '" type="checkbox" /></td></tr></tbody></table></fieldset></div>';
			},
			errors: {},
			showModalWithErrors: function(errors) {
				$.showCustomModal('Ошибки', (function() {
					var html = '';
					for (var error in errors) {
						html += '<p>' + errors[error].page + ': ' + errors[error].error + '</p>';
					}
					return html;
				})(), {
					width: 'auto'
				});
			},
			removeSelectedClasses: function() {
				if (this.$articleComments) {
					this.$articleComments.find(this.commentSelector + '.selected').removeClass('selected');
				}
			},
			removeCommentNodes: function($comment) {
				var $subCommments = $comment.next();
				if ($subCommments.length && $subCommments.hasClass(this.subCommsClassName)) {
					$comment.fadeOut(FADETIME);
					$subCommments.fadeOut(FADETIME);
					setTimeout(function() {
						$comment.remove();
						$subCommments.remove();
					}, 300);
				} else {
					$comment.fadeOut(FADETIME);
					setTimeout(function() {
						$comment.remove();
					}, 300);
				}
			},
			hideSpinner: function() {
				var that = this;
				this.$spinnerParent.slideUp(FADETIME);
				setTimeout(function() {
					that.$spinner.removeClass('fa-spin');
				}, FADETIME);
			},
			showSpinner: function() {
				var that = this;
				this.$spinnerParent.slideDown(FADETIME);
				this.$spinner.addClass('fa-spin');
			},
			showConfirmButton: function() {
				this.$confirmButtonParent.slideDown(FADETIME);
			},
			hideConfirmButton: function() {
				this.$confirmButtonParent.slideUp(FADETIME);
			},
			isInProcess: false,
			onpagechangeText: 'Некоторые комментарии всё ещё находятся в очереди удаления. Вы действительно хотите сменить страницу комментариев?',
			onpageleaveText: 'Некоторые комментарии всё ещё находятся в очереди удаления. Вы действительно хотите покинуть страницу?',
			confirmButtonText: 'Подтвердить удаление',
			toggleButtonTexts: ['Включить массовое удаление комментариев', 'Выключить массовое удаление комментариев'],
			inprocessText: 'Удаление в процессе...',
			init: function() {
				var that = this;
				if (!wgIsArticle || wgIsMainPage || !(this.rightsRegExp.test(wgUserGroups.join(''))) || !this.$articleCommentsMain.length) {
					return;
				}
				This.Auto.appendLIElement(this.$toggleButton = $('<li>', {
					html: '<span class="' + this.toggleButtonFAIcon + '"></span><a href="#">' + this.toggleButtonTexts[0] + '</a>'
				}));
				this.$toggleButtonParent = this.$toggleButton;
				this.$toggleButton = this.$toggleButton.find('a');
				This.Auto.appendLIElement(this.$confirmButton = $('<li>', {
					style: 'display: none;',
					html: '<span class="' + this.confirmButtonFAIcon + '"></span><a href="#">' + this.confirmButtonText + '</a>'
				}));
				this.$confirmButtonParent = this.$confirmButton;
				this.$confirmButton = this.$confirmButton.find('a');
				This.Auto.appendLIElement(this.$spinner = $('<li>', {
					style: 'display: none;',
					html: '<span class="' + this.spinnerFAIcon + '"></span><a href="#">' + this.inprocessText + '</a>'
				}));
				this.$spinnerParent = this.$spinner;
				this.$spinner = this.$spinner.find('span');
				this.$toggleButton.customToggleClick(function(event) {
					event.preventDefault();
					that.enabled = true;
					that.$articleCommentsMain.addClass(that.modeClassName);
					that.$toggleButtonParent.addClass('enabled');
					that.$toggleButton.text(that.toggleButtonTexts[1]);
				}, function(event) {
					event.preventDefault();
					that.enabled = false;
					that.$articleCommentsMain.removeClass(that.modeClassName);
					that.$toggleButtonParent.removeClass('enabled');
					that.$toggleButton.text(that.toggleButtonTexts[0]);
					that.nullifyCollection();
					that.removeSelectedClasses();
					that.hideConfirmButton();
				});

				function getKeys() {
					var keys = Object.keys(arguments[0]);
					keys.splice(keys.indexOf('length'), 1);
					return keys;
				}
				this.$confirmButton.on('click', function(event) {
					event.preventDefault();
					that.$confirmButton.addClass('enabled');
					var $typicalReason;
					var $reason;
					var errors = {};
					var errorsCounter = 0;
					var $modal;
					var $errorsCheckbox;
					var ondone;
					var stop;
					that.stopDeleting = function() {
						stop = true;
					};

					function cb() {
						$modal = $.showCustomModal('Удаление комментариев', that.getModalHTML(), {
							width: 'auto',
							onClose: function() {
								that.$confirmButton.removeClass('enabled');
							},
							buttons: [{
								message: 'Подтвердить удаление',
								handler: function() {
									if (that.isInProcess) {
										return;
									}
									var reason = $typicalReason.val();
									var customReason = $.trim($reason.val());
									var links = getKeys(that.collection);
									if (links.length > 0) {
										that.isInProcess = true;
										loop(links[0]);
									}
									if ($errorsCheckbox.prop('checked')) {
										ondone = function() {
											that.showModalWithErrors(errors);
										};
									}

									function loop(link) {
										if (stop) {
											return;
										}
										mwtools.deletepage(link, customReason ? (reason + ': ' + customReason) : reason, function(data) {
											if (data.error) {
												try {
													errors[errorsCounter++] = {
														error: data.error.info,
														page: link
													};
												} catch (ex) {
													errors[errorsCounter++] = {
														error: ex.toString(),
														page: null
													};
												}
											} else {
												that.removeCommentNodes(that.collection[link]);
											}
											delete that.collection[link];
											that.collection.length--;
											links.shift();
											if (links.length === 0) {
												that.isInProcess = false;
												that.$confirmButton.removeClass('enabled');
												that.hideSpinner();
												that.hideConfirmButton();
												if (typeof ondone === 'function' && errorsCounter > 0) {
													ondone();
												}
												errors = null;
											} else {
												setTimeout(function() {
													loop(links[0]);
												}, that.requestDelay);
											}
										});
									}
									$modal.closeModal();
									that.showSpinner();
								}
							}]
						});
						$reason = $modal.find('#' + that.reasonId);
						$typicalReason = $modal.find('#' + that.typicalReasonId);
						$errorsCheckbox = $modal.find('#' + that.errorsCheckBoxId);
					}
					if (!that.isReasonsHTMLLoaded) {
						that.getReasonsHTML(cb);
					} else {
						cb();
					}
				});
				var initAlias;
				var setPageAlias;
				if (typeof window.ArticleComments === 'object' && typeof window.ArticleComments.init === 'function' && typeof window.ArticleComments.setPage === 'function') {
					setPageAlias = window.ArticleComments.setPage;
					initAlias = window.ArticleComments.init;
					window.ArticleComments.init = function() {
						initAlias.apply(this, arguments);
						that.$articleComments = $('#article-comments-ul');
						that.$articleCommentsMain.on('click', function(event) {
							if (that.isInProcess) {
								event.preventDefault();
								event.stopPropagation();
								return;
							}
							var $target = $(event.target);
							if ($target.is(that.deleteCommSelector)) {
								event.preventDefault();
								that.customCommDeleting($target);
								return;
							}
							if (that.enabled) {
								event.preventDefault();
								event.stopPropagation();
								$target = $(event.target).closest(that.commentSelector);
								if ($target.hasClass('selected')) {
									that.unselectComment($target);
								} else {
									that.selectComment($target);
								}
							}
						});
					};
					$window.on('beforeunload', function(e) {
						var msg;
						if (that.isInProcess) {
							msg = that.onpageleaveText;
							e.returnValue = msg;
							return msg;
						}
					});
					window.ArticleComments.setPage = function() {
						function handler(ctx, args) {
							setPageAlias.apply(ctx, args);
							that.nullifyCollection();
							that.hideConfirmButton();
							that.hideSpinner();
						}
						if (that.isInProcess) {
							var confirmed = confirm(that.onpagechangeText);
							if (confirmed) {
								that.isInProcess = false;
								that.stopDeleting();
								handler(this, arguments);
							}
							return;
						}
						handler(this, arguments);
					};
				}
			},
			customCommDeleting: function($comment) {
				var that = this;
				var $typicalReason;
				var $reason;
				var $modal;
				var reason;
				var customReason;
				var $errorsCheckbox;
				$comment = $comment.closest(this.commentSelector);

				function cb() {
					$modal = $.showCustomModal('Удаление комментариев', that.getModalHTML(), {
						width: 'auto',
						buttons: [{
							message: 'Удалить',
							handler: function() {
								var link = that.getCommentLink($comment);
								reason = $typicalReason.val();
								customReason = $.trim($reason.val());
								that.showSpinner();
								if (link) {
									that.collection[link] = $comment;
									that.collection.length++;
									$comment.addClass('selected');
									mwtools.deletepage(link, customReason ? (reason + ': ' + customReason) : reason, function(data) {
										if (data.error) {
											$comment.removeClass('selected');
											if ($errorsCheckbox.prop('checked')) {
												that.showModalWithErrors({
													0: {
														error: data.error.info,
														page: link
													}
												});
											}
										} else {
											that.removeCommentNodes($comment);
										}
										delete that.collection[link];
										that.collection.length--;
										that.hideSpinner();
									});
								}
								$modal.closeModal();
							}
						}]
					});
					$reason = $modal.find('#' + that.reasonId);
					$typicalReason = $modal.find('#' + that.typicalReasonId);
					$errorsCheckbox = $modal.find('#' + that.errorsCheckBoxId);
				}
				if (!this.isReasonsHTMLLoaded) {
					this.getReasonsHTML(cb);
				} else {
					cb();
				}
			}
		}, **/
		AjaxAutoRefresh: {
			pages: ['Служебная:Watchlist', 'Служебная:WikiActivity', 'Служебная:RecentChanges', 'Служебная:Изображения', 'Служебная:Log'],
			storageKey: 'AjaxAutoRefresh',
			storageIntervalKey: 'AjaxAutoRefreshInterval',
			defaultAutoRefreshInterval: 30000,
			enabled: null,
			helpMsgs: {
				FORCE_REFRESH: 'Принудительно обновить',
				CHANGE_INTERVAL: 'Изменить интервал автообновления',
				ENABLE_AUTOREFRESH: 'Включить автообновление',
				DISABLE_AUTOREFRESH: 'Выключить автообновление',
				INPROCESS: 'Страница обновляется...'
			},
			isPending: false,
			disable: function() {
				if (!this.enabled) {
					this.enable();
					return;
				}
				storage.set(this.storageKey, false);
				this.disableInterval();
				this.enabled = false;
				this.$checkbox.removeClass(this.checkboxSelectedFAIcon).addClass(this.checkboxFAIcon);
				this.$checkbox.attr('title', this.helpMsgs.ENABLE_AUTOREFRESH);
			},
			enable: function() {
				if (this.enabled) {
					this.disable();
					return;
				}
				this.enableInterval();
				storage.set(this.storageKey, true);
				this.enabled = true;
				this.$checkbox.removeClass(this.checkboxFAIcon).addClass(this.checkboxSelectedFAIcon);
				this.$checkbox.attr('title', this.helpMsgs.DISABLE_AUTOREFRESH);
			},
			disableInterval: function() {
				if (this.id !== null) {
					clearInterval(this.id);
					this.id = null;
				}
			},
			enableInterval: function() {
				var that = this;
				this.id = setInterval(function() {
					that.refreshPage();
				}, this.interval);
			},
			id: null,
			refreshFAIcon: 'fas fa-sync-alt',
			checkboxSelectedFAIcon: 'fas fa-check-square',
			checkboxFAIcon: 'fas fa-square',
			changeIntervalFAIcon: 'fas fa-clock',
			spinnerFAIcon: 'fas fa-circle-notch',
			fetchMoreSelector: '.activity-feed-more > a',
			waWrapperSelector: '#wikiactivity-main',
			getHTML: function() {
				return '<div id="AjaxAutoRefresh" class="page-header__page-subtitle"><span>Автообновление страницы</span><span class="' + (this.enabled ? this.checkboxSelectedFAIcon : this.checkboxFAIcon) + '" title="' + (this.enabled ? this.helpMsgs.DISABLE_AUTOREFRESH : this.helpMsgs.ENABLE_AUTOREFRESH) + '"></span><span class="' + this.changeIntervalFAIcon + '" title="' + this.helpMsgs.CHANGE_INTERVAL + '"></span><span class="' + this.refreshFAIcon + '" title="' + this.helpMsgs.FORCE_REFRESH + '"></span><span class="' + this.spinnerFAIcon + '" title="' + this.helpMsgs.INPROCESS + '" style="display: none;"></span></div>';
			},
			interval: null,
			isValidIntervalValue: function(interval) {
				return !(typeof interval !== 'number' || !interval || interval <= 0 || interval === Infinity || interval === -Infinity || interval < 5000);
			},
			refreshPage: function() {
				if (this.isPending || This.MwContentTextBarrel.isFilled) {
					return;
				}
				this.isPending = true;
				var that = this;
				this.$throbber.addClass('fa-spin').show();
				if (typeof WikiActivity === 'object') {
					$mwContentText.find(this.fetchMoreSelector).off();
				}
				$mwContentText.load('/ru/wiki/' + wgPageName + ' #mw-content-text>', function() {
					that.$throbber.hide().removeClass('fa-spin');
					setTimeout(function() {
						that.isPending = false;
					}, FADETIME);
					if (typeof that.doAfterRefresh === 'function') {
						that.doAfterRefresh();
					}
					if (typeof WikiActivity === 'object') {
						WikiActivity.wrapper = $mwContentText.find(that.waWrapperSelector);
						$mwContentText.find(that.fetchMoreSelector).click(function() {
							that.fetchMoreHandler(this, arguments);
						});
					}
				});
			},
			intervalInputNodeId: 'AjaxAutoRefreshInterval',
			getModalHTML: function() {
				return '<div style="text-align: center;"><input id="' + this.intervalInputNodeId + '" placeholder="Время в секундах..." value="' + (this.interval / 1000) + '"type="text"></div>';
			},
			modalTitle: 'Изменить интервал автообновления',
			confirmButtonText: 'Принять',
			acceptIntervalHandler: function handler(newinterval) {
				if (!this.isValidIntervalValue(newinterval)) {
					return;
				}
				this.interval = newinterval;
				this.$currentActiveModal.closeModal();
				storage.set(this.storageIntervalKey, newinterval);
				if (this.enabled) {
					this.disableInterval();
					this.enableInterval();
				}
			},
			$currentActiveModal: null,
			appendTo: '.WikiaPage .page-header__main',
			init: function() {
				if (this.pages.indexOf(wgPageName) === -1) {
					return;
				}
				var that = this;
				this.enabled = storage.get(this.storageKey);
				if (this.enabled === null) {
					storage.set(this.storageKey, true);
					this.enabled = true;
					storage.set(this.storageIntervalKey, this.defaultAutoRefreshInterval);
				}
				var $to = $(this.appendTo);
				$to.append(this.getHTML());
				this.$checkbox = $to.find('.' + (this.enabled ? this.checkboxSelectedFAIcon : this.checkboxFAIcon).split(' ')[1]);
				this.$throbber = $to.find('.' + this.spinnerFAIcon.split(' ')[1]);
				this.interval = Number(storage.get(this.storageIntervalKey));
				if (!this.isValidIntervalValue(this.interval)) {
					storage.set(this.storageIntervalKey, this.defaultAutoRefreshInterval);
					this.interval = this.defaultAutoRefreshInterval;
				}
				$to.find('.' + this.refreshFAIcon.split(' ')[1]).on('click', function() {
					that.refreshPage();
				});
				this.$checkboxParent = this.$checkbox.parent();
				this.$checkbox.customToggleClick(function() {
					that.enable();
				}, function() {
					that.disable();
				});
				$to.find('.' + this.changeIntervalFAIcon.split(' ')[1]).on('click', function() {
					var $inputNode;
					that.$currentActiveModal = $.showCustomModal(that.modalTitle, that.getModalHTML(), {
						buttons: [{
							message: that.confirmButtonText,
							handler: function() {
								that.acceptIntervalHandler($inputNode.val() * 1000);
							}
						}]
					});
					$inputNode = that.$currentActiveModal.find('#' + that.intervalInputNodeId);
					$inputNode.on('keyup', function(event) {
						if (event.which !== 13) {
							return;
						}
						that.acceptIntervalHandler($inputNode.val());
					});
				});
				if (this.enabled) {
					this.enableInterval();
				}
				var p = false;

				function fetchMore(event) {
					event.preventDefault();
					var node = $(event.target);
					var feedContent = WikiActivity.wrapper.children('ul').last();
					var fetchSince = node.attr('data-since');
					WikiActivity.ajax('getFeed', {
						'type': 'activity',
						'since': fetchSince
					}, function(data) {
						p = false;
						if (data.html) {
							$(data.html).insertAfter(feedContent);
							if (data.fetchSince) {
								node.attr('data-since', data.fetchSince);
							} else {
								node.parent().remove();
							}
						}
					});
				}
				this.fetchMoreHandler = function(ctx, args) {
					if (p) {
						return;
					}

					function fetchMoreWrapper() {
						try {
							fetchMore.apply(ctx, args);
						} catch (ex) {
							p = false;
						}
					}
					if (!this.isPending) {
						p = true;
						fetchMoreWrapper();
						if (this.enabled) {
							this.disable();
						}
					}
				};
				var waInitAlias;
				if (typeof WikiActivity === 'object') {
					waInitAlias = WikiActivity.init;
					WikiActivity.init = function() {
						waInitAlias.apply(this, arguments);
						$mwContentText.find(that.fetchMoreSelector).off().click(function() {
							that.fetchMoreHandler(this, arguments);
						});
					};
				}
			}
		},
		AjaxLivePad: {
			livePadFAIcon: 'fab fa-html5',
			$livePadContainer: $('<div>'),
			$mwContentTextContainer: $('<div>'),
			getHTML: function() {
				return '<div class="WikiaArticle"><div id="AjaxLivePad"><textarea></textarea><div></div></div></div>';
			},
			id: null,
			delay: 500,
			pagetitle: 'Предпросмотр',
			sendRequest: function(content, callback) {
				var that = this;
				$.post(INDEX, {
					action: 'ajax',
					rs: 'EditPageLayoutAjax',
					title: that.pagetitle,
					content: content,
					method: 'preview',
					page: 'SpecialCustomEditPage',
					section: '',
					summary: ''
				}).success(function(data) {
					callback(data);
				});
			},
			mwCollaspibleSelector: '[id^="mw-customcollapsible"]',
			mwTabberSelector: '.tabber',
			handleHTML: function(data) {
				var lastIntervals = [];
				var i;
				try {
					if ($.isPlainObject(data) && data.html) {
						this.$output.html(data.html);
						This.Tabbers.init(this.$output);
						This.Invoke.init(this.$output);
						This.Spoilers.init(this.$output);
						for (i = 0; i < lastIntervals.length; i++) {
							clearInterval(lastIntervals[i]);
						}
						This.Timers.init(this.$output, function(intervalIds) {
							lastIntervals = intervalIds;
						});
						if (typeof jQuery.fn.makeCollapsible === 'function') {
							this.$output.find(this.mwCollaspibleSelector).makeCollapsible();
						}
						if (typeof jQuery.fn.tabber === 'function') {
							this.$output.find(this.mwTabberSelector).tabber();
						}
					}
				} catch (ex) {
					this.$output.html(This.Invoke.getExceptionHTML(ex));
				}
			},
			getChildNodes: function getChildNodes($elem) {
				return $($elem.prop('childNodes'));
			},
			init: function() {
				var that = this;
				this.$livePadContainer.append(this.getHTML());
				this.$input = this.$livePadContainer.find('#AjaxLivePad > textarea');
				this.$output = this.$livePadContainer.find('#AjaxLivePad > div:last-child');
				this.enableModeFn = function() {
					This.MwContentTextBarrel.isFilled = true;
					This.MwContentTextBarrel.$container.append(that.getChildNodes($mwContentText));
					$mwContentText.append(that.getChildNodes(that.$livePadContainer));
				};
				this.disableModeFn = function() {
					This.MwContentTextBarrel.isFilled = false;
					that.$livePadContainer.append(that.getChildNodes($mwContentText));
					$mwContentText.append(that.getChildNodes(This.MwContentTextBarrel.$container));
				};
				This.Auto.appendLIElement(this.$toggleButton = $('<li>', {
					html: '<span class="' + this.livePadFAIcon + '"></span><a href="#">Живой редактор</a>'
				}));
				this.$toggleButtonParent = this.$toggleButton;
				this.$toggleButton = this.$toggleButton.find('a').customToggleClick(function(event) {
					event.preventDefault();
					if (This.AjaxAutoRefresh.isPending || This.MwContentTextBarrel.isFilled) {
						return false;
					}
					that.enableModeFn();
					that.$toggleButtonParent.addClass('enabled');
				}, function(event) {
					event.preventDefault();
					if (This.AjaxAutoRefresh.isPending) {
						return false;
					}
					that.disableModeFn();
					that.$toggleButtonParent.removeClass('enabled');
				});
				this.$input.on('input', function() {
					if (that.id !== null) {
						clearTimeout(that.id);
					}
					var content = $(this).val();
					that.id = setTimeout(function() {
						that.sendRequest(content, function(data) {
							that.id = null;
							that.handleHTML(data);
						});
					}, that.delay);
				});
			}
		},
		Mainpage: {
			cache: {},
			selected: null,
			ajaxThrobberURL: 'https://images.wikia.nocookie.net/warframe/ru/images/0/05/Ajax.gif',
			blackoutClassName: 'MainpageBlackout',
			blackoutText: 'Идёт загрузка...',
			getBlackoutHTML: function() {
				return '<div style="display: none;" class="' + this.blackoutClassName + '"><div><span><img src="' + this.ajaxThrobberURL + '"></span><br><span>' + this.blackoutText + '</span></div></div>';
			},
			showBlackout: function() {
				this.$ajaxContent.prepend(this.getBlackoutHTML());
				this.$blackout = this.$mainpage.find('.' + this.blackoutClassName);
				this.$blackout.show();
			},
			removeBlackout: function() {
				this.$blackout.remove();
			},
			errorHTML: '<span class="error">Ошибка при загрузке страницы.</span>',
			checkHTML: function($button, html) {
				var that = this;
				if (!html) {
					$button.addClass('error');
					this.removeBlackout();
					this.$ajaxContent.html(this.errorHTML);
					this.selected = null;
					return false;
				}
				return true;
			},
			appendContent: function($button, id) {
				var that = this;
				var html = this.cache[id];
				if (!this.checkHTML($button, html)) {
					return;
				}
				if ($button.hasClass('error')) {
					$button.removeClass('error');
				}
				$button.addClass('selected');
				this.removeBlackout();
				this.$ajaxContent.html(html);
			},
			HTMLTempContainer: null,
			idAttr: 'data-id',
			load: function($button, pagename) {
				var that = this;
				var id = $button.attr(this.idAttr);
				pagename = pagename.replace(/\s/g, '_');
				if (id === this.selected) {
					return;
				}
				this.$buttons.removeClass('selected');
				this.showBlackout();
				this.selected = id;
				if (id in this.cache) {
					this.appendContent($button, id);
				} else {
					this.loading = true;
					this.HTMLTempContainer = $('<div>');
					this.HTMLTempContainer.load('/ru/wiki/' + pagename + ' ' + this.ajaxContentTargetSelector, function() {
						var html = that.HTMLTempContainer.html();
						that.HTMLTempContainer = null;
						that.loading = false;
						if (that.checkHTML($button, html)) {
							that.cache[id] = html;
							that.appendContent($button, id);
						}
					});
				}
			},
			ajaxLoaderPageNameSelector: '.MainpageAjaxPagename',
			ajaxContentSelector: '.MainpageAjaxContent',
			buttonsSelector: '.MainpageButtons > div',
			ajaxContentTargetSelector: '#MainpageAjaxTarget',
			loading: false,
			tabberId: 'MainpageTabber',
			mainpageId: 'Mainpage',
			discussionsButtonSelector: 'span.discussions',
			discussionsId: 'MainpageDiscussions',
			isDiscussionsLoaded: false,
			targetId: 'target' + random(0, 0x7fffffff),
			sizeCoeff: 0.75,
			fixButtonText: 'Включить фиксацию',
			unFixButtonText: 'Выключить фиксацию',
			getDiscussionsHTML: function() {
				return '<a target="' + this.targetId + '" href="/ru/d/f">Обновить</a><a class="FixMainpageDiscussions">' + this.fixButtonText + '</a><a href="/ru/d/f" target="_blank">Открыть в новом окне</a><iframe src="/ru/d/f" class="MainpageDiscussionsIframe" name="' + this.targetId + '" style="height: ' + ($window.height() * this.sizeCoeff) + 'px;"></iframe>';
			},
			init: function() {
				var that = this;
				this.$mainpage = $('#' + this.mainpageId);
				this.$tabber = $('#' + this.tabberId);
				this.$buttons = this.$mainpage.find(this.buttonsSelector);
				this.$ajaxContent = this.$mainpage.find(this.ajaxContentSelector);
				this.$buttons.on('click', function() {
					if (that.loading) {
						return;
					}
					var $this = $(this);
					that.load($this, $this.find(that.ajaxLoaderPageNameSelector).text());
				});
				this.$discussionsNode = this.$tabber.find('#' + this.discussionsId);
				var handler = function(e) {
					e.preventDefault();
				};
				this.$tabber.find(this.discussionsButtonSelector).one('click', function() {
					that.$discussionsNode.html(that.getDiscussionsHTML());
					that.$fixDiscussions = that.$discussionsNode.find('.FixMainpageDiscussions').customToggleClick(function() {
						$window.on({
							DOMMouseScroll: handler,
							ontouchmove: handler
						});
						that.$fixDiscussions.text(that.unFixButtonText);
					}, function() {
						$window.off('DOMMouseScroll', handler).off('ontouchmove', handler);
						that.$fixDiscussions.text(that.fixButtonText);
					});
				});
			}
		},
		/*ScrollTop: {
			getHTML: function() {
				return '<div id="ScrollTop"><div><span class="fa ' + this.faUpIconClassName + '"></span><span>' + this.upText + '</span></div></div>';
			},
			$container: $('.WikiaSiteWrapper'),
			$globalNav: $('#globalNavigation'),
			upText: 'Наверх',
			downText: 'Возврат',
			faUpIconClassName: 'fa-chevron-up',
			faDownIconClassName: 'fa-chevron-down',
			showButtonAfter: 800,
			hideButtonAfter: 200,
			marginCoeff: 1.75,
			from: null,
			onresizeEvent: function() {
				this.$scrollTop.css('width', (this.$container.prop('offsetWidth') - $WikiaPage.prop('offsetWidth')) / 2 + 'px'), this.$scrollTop_div.css('margin-top', this.$globalNav.height() * this.marginCoeff + 'px');
			},
			onscrollHandler: function(event) {
				if (window.scrollY > this.showButtonAfter) {
					this.$text.text(this.upText);
					this.from = null;
					this.$icon.removeClass(this.faDownIconClassName).addClass(this.faUpIconClassName);
					this.$scrollTop.show();
				} else if (window.scrollY > this.hideButtonAfter) {
					this.$scrollTop.hide();
				}
			},
			scrollToHandler: function(to) {
				this.from = window.scrollY;
				window.scrollTo(0, !to ? 0 : to);
				this.$text.text(this.downText);
				this.$icon.removeClass(this.faUpIconClassName).addClass(this.faDownIconClassName);
			},
			init: function() {
				var that = this;
				if (!this.$container.length) {
					return;
				}
				this.$container.prepend(this.getHTML());
				this.$scrollTop = $('#ScrollTop');
				this.$text = this.$scrollTop.find('span:not(.fa)');
				this.$scrollTop_div = this.$scrollTop.find('div');
				this.$icon = this.$text.prev();
				this.$scrollTop.on('click', function(event) {
					that.scrollToHandler(that.from);
				});
				this.onresizeEvent();
				$window.on('resize', function() {
					that.onresizeEvent();
				});
				$document.on('scroll', function() {
					that.onscrollHandler();
				});
			}
		},
		*/
		Invoke: {
			$defaultTarget: $mwContentText,
			invokeSelector: '[data-invoke]',
			invokeAttr: 'data-invoke',
			getExceptionHTML: function(ex) {
				return '<span class="error">' + ex + '</span>';
			},
			init: function($target) {
				var that = this;
				if (!$target) {
					$target = this.$defaultTarget;
				}
				$target.find(this.invokeSelector).each(function() {
					var $this = $(this);
					var method = $this.attr(that.invokeAttr);
					try {
						This.Callable[method]($this);
					} catch (ex) {
						$this.html(that.getExceptionHTML(ex));
					}
				});
			}
		},
		Callable: {
			TBlank: function($elem) {
				$elem.find('._blank a').attr('target', '_blank');
			},
			Avatar: function($elem) {
				var username = $elem.attr('data-username');
				var avatarsize = Number($elem.attr('data-size')) || 150;
				$.get('/ru/api/v1/User/Details', {
					ids: username,
					size: avatarsize
				}).done(function(data) {
					$elem.append('<img alt="avatar" class="Avatar" width="' + avatarsize + '" height="' + avatarsize + '" src="' + (function() {
						try {
							return data.items[0].avatar;
						} catch (ex) {}
						return 'https://vignette.wikia.nocookie.net/warframe/images/1/19/Avatar.jpg/revision/latest?path-prefix=ru';
					})() + '"/>');
				});
			},
			Calcs: function($elem) {
				var type = $elem.attr('data-calc');

				function createCalcField(fieldName, opts) {
					opts = opts || {};
					return '<div class="CalcField"><div class="CalcFieldName">' + fieldName + '</div><div class="CalcFieldValue"><input' + ('inputClass' in opts ? ' class="' + opts.inputClass + '"' : '') + (opts.disabled ? ' disabled' : '') + ' placeholder="' + (opts.inputPlaceholder || '') + '" type="text" /></div></div>';
				}

				function createCalcTitle(caclTitle) {
					return '<div class="CalcTitle">' + caclTitle + '</div>';
				}
				switch (type) {
					case 'armor':
						$elem.addClass('Calc');
						$elem.append(createCalcTitle('Калькулятор брони'), createCalcField('Броня', {
							inputPlaceholder: 'Введите число...'
						}), createCalcField('Поглощение', {
							disabled: true
						}));

						function calculate(armor) {
							return 100 * (armor / (armor + 300));
						}
						var $armorInput = $elem.find('> div:nth-child(2) input');
						var $armorOutput = $elem.find('> div:nth-child(3) input');

						function fixNumberFormat(val) {
							val = $.trim(val);
							val = val.replace(/\s/g, '').replace(/,/g, '.');
							return val;
						}
						$armorInput.on('input', function() {
							var fixedFormat = fixNumberFormat(String($armorInput.val()));
							var calculatedVal = calculate(Number(fixedFormat));
							if (!calculatedVal || calculatedVal === Infinity || -calculatedVal === Infinity) {
								$armorOutput.val('Неверное значение брони!');
							} else {
								$armorOutput.val(calculatedVal + '%');
								$armorInput.val(fixedFormat);
							}
						});
						break;
					default:
						throw new Error('Калькулятора ' + type + ' не существует');
				}
			},
			DuplicateImages: function($elem) {
				var extensions = /\.(?:png|gif|jpg|jpeg|ico|pdf|svg|odt|ods|odp|odg|odc|odf|odi|odm)$/;
				var requestParams = {
					action: 'query',
					prop: 'duplicatefiles',
					dflimit: 500,
					dflocalonly: 1,
					generator: 'allimages',
					gailimit: 500,
					format: 'json',
					gaifrom: null
				};
				var treeConstructionDelay = 133;

				function makeH2(title) {
					return '<h2>' + makeLink(title) + '</h2>';
				}

				function makeLink(title) {
					return '<a href="' + wgArticlePath.replace('$1', 'Файл:' + encodeURIComponent(title)) + '">' + title.replace(/_/g, ' ') + '</a>';
				}
				var duplicates = {};

				function makeTree(titles) {
					var i;
					var j;
					var html;
					var list = [];
					for (i = 0; i < titles.length; i++) {
						html = makeH2(titles[i][0].title) + '<ul>';
						for (j = 1; j < titles[i].length; j++) {
							html += '<li>' + makeLink(titles[i][j].title) + '</li>';
						}
						html += '</ul>';
						list.push(html);
					}
					i = 0;
					setTimeout(function construct() {
						$elem.append(list[i]);
						if (++i !== list.length) {
							setTimeout(construct, treeConstructionDelay);
						}
					}, treeConstructionDelay);
				}

				function sendRequest(gaifrom, done) {
					requestParams.gaifrom = gaifrom;
					$.get(API, requestParams).success(function(data) {
						var pageID;
						var pages;
						var duplicatefiles;
						var page;
						try {
							pages = data.query.pages;
							for (page in pages) {
								if (!pages[page].duplicatefiles) {
									delete pages[page];
								}
							}
							$.extend(duplicates, pages);
							if (data['query-continue']) {
								sendRequest(data['query-continue'].allimages.gaifrom, done);
							} else {
								done(duplicates);
							}
						} catch (ex) {
							$elem.text(ex.toString());
						}
					});
				}
				sendRequest('', function(duplicates) {
					function findDataOf(title) {
						var i;
						var dups;
						for (var id in duplicates) {
							dups = duplicates[id].duplicatefiles;
							for (i = 0; i < dups.length; i++) {
								if (dups[i].name === title) {
									delete duplicates[id];
									return {
										user: dups[i].user,
										timestamp: dups[i].timestamp,
										title: title
									};
								}
							}
						}
						return null;
					}

					function getTitles(sdupArr, exept) {
						var titles = [];
						for (var i = 0; i < sdupArr.length; i++) {
							if (sdupArr[i] === null) {
								continue;
							}
							titles.push(sdupArr[i].title);
						}
						var idx;
						if ((idx = titles.indexOf(exept)) !== -1) {
							titles.splice(idx, 1);
						}
						return titles;
					}
					var i;
					var sdup;
					var dups;
					var missedTitle;
					var sortedTitles = [];
					var selfData;
					for (var id in duplicates) {
						sdup = [];
						dups = duplicates[id].duplicatefiles;
						for (i = 0; i < dups.length; i++) {
							sdup.push({
								title: dups[i].name,
								user: dups[i].user,
								timestamp: dups[i].timestamp
							});
						}
						missedTitle = duplicates[id].title.replace(/\s/g, '_').replace(/(Файл|File)\s?:\s?/, '');
						selfData = findDataOf(missedTitle);
						if (selfData) {
							sdup.push(selfData);
						}
						clearData(getTitles(sdup, missedTitle));
						sortedTitles.push(sdup);
					}

					function clearData(titles) {
						var id;
						for (var i = 0; i < titles.length; i++) {
							for (id in duplicates) {
								if (duplicates[id].titles === titles[i]) {
									delete duplicates[id];
									break;
								}
							}
						}
					}

					function sortFn(dupCur, dupNext) {
						return new Date(dupCur.timestamp) > new Date(dupNext.timestamp);
					}
					for (i = 0; i < sortedTitles.length; i++) {
						sortedTitles[i] = sortedTitles[i].sort(sortFn);
					}
					makeTree(sortedTitles);
				});
			},
			MobileExport: function($elem) {
				var delay = 166;
				$.get('/ru/index.php', {
					title: 'Участник:AppleJuicetice/Img',
					action: 'raw',
					cb: random(0, 0x7fffffff),
					dataType: 'text'
				}).success(function(data) {
					data = data.split('\n');
					setTimeout(function append() {
						$elem.html('<div style="clear: both;"><img src="//content.warframe.com/MobileExport' + data[i++].replace(/\\/g, '/') + '" style="max-height: 250px; width: auto;" /></div>');
						if (i < data.length) {
							setTimeout(append, delay);
						}
					}, delay);
					$elem.click(function(event) {
						var tg = $$(event.target);
						if (tg.is('img')) {
							window.open(tg.attr('src'));
						}
					});
				}).error(function(_, __, jqXHR) {
					throw new Error('Fetch failed (' + jqXHR.status + ': ' + jqXHR.statusText + ')</span>');
				});
			}
		},
		AjaxBatchDelete: {
			toggleButtonFAIcon: 'fas fa-eraser',
			invalidCharsRegExp: /(\#|<|>|\[|\]|\{|\}|\|)/,
			log: function(text) {
				
				/*if ((this.$output.prop('scrollTop') - ((parseInt(this.$output.css('borderTopWidth'), 10) + parseInt(this.$output.css('borderBottomWidth'), 10)) || 0)) === this.$output.prop('scrollHeight') - this.$output.prop('offsetHeight')) {
					this.$output.append(text);
					this.$output.prop('scrollTop', this.$output.prop('scrollHeight'));
				} else {
					this.$output.append(text);
				} */
			 this.$output.append(text);
			},
			toggleButtonId: 'ABDToggleButton',
			getButtonHTML: function() {
				return '<div id="' + this.toggleButtonId + '"><a class="fas ' + this.faToggleButtonIconClassName + '"></a></div>';
			},
			getAjaxBatchDeleteHTML: function() {
				return '<div id="AjaxBatchDelete"><div><textarea></textarea></div><div><input placeholder="Причина удаления" type="text"/><input value="Подтвердить удаление" type="button" /></div><pre></pre></div>';
			},
			getChildNodes: null,
			delay: 300,
			defaultReason: 'Причина не указана (AjaxBatchDelete).',
			removePages: function(pages) {
				var that = this;

				function next() {
					pages.shift();
					that.$input.val(pages.join('\n'));
					ajax(pages[0]);
				}

				function ajax(page) {
					if (!page) {
						that.log('Операция завершена.\n');
						that.$confirmButton.prop('disabled', false);
						that.$reason.prop('disabled', false);
					} else if (that.invalidCharsRegExp.test(page)) {
						that.log('Обнаружены запрещённые символы! Пропускаю: ' + page + '\n');
						setTimeout(next, that.delay);
					} else {
						that.log('Удаляю: ' + page + '\n');
						mwtools.deletepage(page, that.$reason.val() || that.defaultReason, function(data) {
							try {
								if (data.error) {
									that.log('Ошибка (ответ сервера): ' + data.error.info + '\n');
								} else {
									that.log('Удалено: ' + page + '\n');
								}
							} catch (ex) {
								that.log('Ошибка (ответ сервера): ' + ex.toString() + '\n');
							}
							setTimeout(next, that.delay);
						});
					}
				}
				ajax(pages[0]);
			},
			init: function() {
				if (!(This.AdmRightsRegExp.test(wgUserGroups.join(''))) || wgAction === 'edit') {
					return;
				}
				var that = this;
				this.getChildNodes = This.AjaxLivePad.getChildNodes;
				This.Auto.appendLIElement(this.$toggleButton = $('<li>', {
					html: '<span class="' + this.toggleButtonFAIcon + '"></span><a href="#">Массовое удаление страниц</a>'
				}));
				this.$toggleButtonParent = this.$toggleButton;
				this.$toggleButton = this.$toggleButton.find('a');
				this.$container = $('<div>').append(this.getAjaxBatchDeleteHTML());
				this.$input = this.$container.find('textarea');
				this.$output = this.$container.find('pre');
				this.$reason = this.$container.find('input[type="text"]');
				this.$confirmButton = this.$container.find('input[type="button"]').on('click', function() {
					var pages = that.$input.val().split('\n').filter(function(elem) {
						return Boolean(elem);
					});
					if (pages.length === 0) {
						return;
					}
					that.$input.val(pages.join('\n'));
					that.$confirmButton.prop('disabled', true);
					that.$reason.prop('disabled', true);
					that.removePages(pages);
				});
				this.enableModeFn = function() {
					This.MwContentTextBarrel.isFilled = true;
					This.MwContentTextBarrel.$container.append(that.getChildNodes($mwContentText));
					$mwContentText.append(that.getChildNodes(that.$container));
				};
				this.disableModeFn = function() {
					This.MwContentTextBarrel.isFilled = false;
					that.$container.append(that.getChildNodes($mwContentText));
					$mwContentText.append(that.getChildNodes(This.MwContentTextBarrel.$container));
				};
				this.$toggleButton.customToggleClick(function(event) {
					event.preventDefault();
					if (This.AjaxAutoRefresh.isPending || This.MwContentTextBarrel.isFilled) {
						return false;
					}
					that.enableModeFn();
					that.$toggleButtonParent.addClass('enabled');
				}, function(event) {
					event.preventDefault();
					if (This.AjaxAutoRefresh.isPending) {
						return;
					}
					that.disableModeFn();
					that.$toggleButtonParent.removeClass('enabled');
				});
			}
		},
		AjaxTooltips: {
			dataKey: 'AjaxTooltip',
			parentSelector: '#mw-content-text',
			targetSelector: '.AjaxTooltip',
			noHTML: '<span class="error">ERROR!</span>',
			Tooltip: function($elem) {
				var that = this;
				this.$elem = $elem;
				this.html = null;
				this.X = null;
				this.Y = null;
				$elem.on('mouseenter', function(event) {
					that.loadTooltipHTML();
					that.mouseenterHandler(event);
				});
				$elem.on({
					mousemove: function(event) {
						that.mousemoveHandler(event);
					},
					mouseleave: function(event) {
						that.mouseleaveHandler(event);
					}
				});
				return this;
			},
			init: function() {
				var that = this;
				var $WikiaBarWrapper = $('#WikiaBarWrapper');
				this.$tooltipContainer = $('<div>').attr('id', 'AjaxTooltipTemplate').hide();
				$body.append(this.$tooltipContainer);
				this.$targets = $mwContentText.find(this.targetSelector);
				this.Tooltip.prototype.mousemoveHandler = function(event) {
					that.$tooltipContainer.css({
						top: (Math.min(event.clientY + 20, Math.abs($window.height() - that.$tooltipContainer.height() - ($WikiaBarWrapper.height() || 0)))) + 'px',
						left: (Math.min(event.clientX + 20, $window.width() - that.$tooltipContainer.width())) + 'px'
					});
				};
				this.Tooltip.prototype.mouseleaveHandler = function(event) {
					this.hovered = false;
					that.$tooltipContainer.hide();
				};
				this.Tooltip.prototype.mouseenterHandler = function(event) {
					this.hovered = true;
					this.setCurrentHTML();
					that.$tooltipContainer.show();
				};
				this.Tooltip.prototype.setCurrentHTML = function() {
					that.$tooltipContainer.html(this.html);
				};
				this.Tooltip.prototype.loadTooltipHTML = function() {
					var pagename = (this.$elem.attr('data-pagename') || '').replace(/\s/g, '_');
					var selector = that.parentSelector + ' ' + (this.$elem.attr('data-selector') || '#AjaxToolTipTarget');
					if (!pagename) {
						this.html = null;
						return;
					}
					var tooltipObj = this;
					this.triggered = false;
					var $container;
					if (!this.triggered && this.html === null) {
						this.triggered = true;
						$container = $('<div>').load('/ru/wiki/' + pagename + ' ' + selector, function() {
							tooltipObj.html = $container.html() || that.noHTML;
							if (tooltipObj.hovered === true) {
								tooltipObj.setCurrentHTML();
							}
						});
					}
				};
				this.$targets.each(function(_, elem) {
					new that.Tooltip($(elem));
				});
			}
		},
		ProfileTags: {
			forbiddenTags: [/^сотрудник/i, /^помощник/i, /^бюрократ/i, /^администратор/i, /^модератор/i],
			invalidTagRegExp: /[^а-яё0-9\!\@\#\$\%\^\&\*\(\)\[\]\s\~\-\=\_\+\"\№\;\:\.\,\?\`\>\<\'\{\}\/\«\»]/i,
			inactiveMonthsLimit: 1,
			inactiveRequestParams: {
				action: 'query',
				list: 'usercontribs',
				uclimit: 1,
				ucprop: 'title|timestamp',
				format: 'json',
				ucuser: null,
				ucstart: null,
				ucend: null
			},
			hasReplaceExpr: function(test) {
				return test.indexOf(this.replaceExprOperator) !== -1;
			},
			parseReplaceExpr: function(originalTags, tags) {
				var that = this;
				$.each(tags, function(i, elem) {
					var splitted = elem.split(that.replaceExprOperator);
					var curTag = (splitted[0] || '').toLowerCase();
					var newTag = (splitted[1] || '').toLowerCase();
					if (that.hasReplaceExpr(elem) && curTag in originalTags) {
						originalTags[newTag] = originalTags[curTag].text(newTag);
						delete originalTags[curTag];
						tags[i] = null;
					}
				});
				this.clearNulls(tags);
			},
			clearNulls: function(arr) {
				var i = 0;
				while (i !== arr.length) {
					if (arr[i++] === null) {
						arr.splice(--i, 1);
					}
				}
			},
			parseReplaceExprAlt: function(tags1, tags2) {
				var fromTag;
				var toTag;
				var splitted;
				var idx;
				for (var i = 0; i < tags2.length; i++) {
					if (this.hasReplaceExpr(tags2[i])) {
						splitted = tags2[i].split(this.replaceExprOperator);
						fromTag = (splitted[0] || '').toLowerCase();
						toTag = (splitted[1] || '').toLowerCase();
						if ((idx = tags1.indexOf(fromTag)) !== -1) {
							tags1[idx] = toTag;
						}
						tags2[i] = null;
					}
				}
				this.clearNulls(tags2);
			},
			parseMultiTagExpr: function(text) {
				var tags = (text || '').split(',');
				for (var i = 0; i < tags.length; ++i) {
					tags[i] = $.trim(tags[i]);
				}
				return tags;
			},
			parseProfileTagsText: function(text) {
				var profileTags = text.split('\n');
				var data = {};
				var val;
				for (var i = 0; i < profileTags.length; i++) {
					val = profileTags[i].split('|');
					data[val[0]] = this.parseMultiTagExpr(val[1]);
				}
				return data;
			},
			getTagHTML: function(text, custom) {
				return '<span class="' + this.tagClassName + (custom ? ' custom' : '') + '">' + text + '</span>';
			},
			replaceExprOperator: '>>>',
			inactiveUserTagMsg: 'Неактивный участник'.toLowerCase(),
			tagClassName: 'tag',
			customTagsPagename: 'CustomProfileTags',
			fadeDelay: 99,
			customTagsLimit: 10,
			getOriginalNodeTags: function() {
				var originalTags = {};
				this.$tagsParent.find('.' + this.tagClassName).each(function(_, elem) {
					var $elem = $(elem);
					originalTags[$elem.text().toLowerCase()] = $elem;
				});
				return originalTags;
			},
			init: function() {
				var that = this;
				this.$masthead = $('#UserProfileMasthead');
				if (!this.$masthead.length) {
					return;
				}
				var username = mwtools.getCurrentUserName();
				var doAfterAll = function(usertags, customtags) {
					var originalTags = that.getOriginalNodeTags();
					that.parseReplaceExpr(originalTags, usertags);
					var i;
					var j;
					var $alltags;
					if (customtags) {
						for (i = 0; i < customtags.length; i++) {
							if (that.invalidTagRegExp.test(customtags[i])) {
								customtags[i] = null;
								continue;
							}
							for (j = 0; j < that.forbiddenTags.length; j++) {
								if (that.forbiddenTags[j].test(that.hasReplaceExpr(customtags[i]) ? customtags[i].split(that.replaceExprOperator)[1] : customtags[i])) {
									customtags[i] = null;
									break;
								}
							}
						}
						i = 0;
						that.clearNulls(customtags);
						that.parseReplaceExpr(originalTags, customtags);
						that.parseReplaceExprAlt(usertags, customtags);
						if (customtags.length > that.customTagsLimit) {
							customtags.splice(that.customTagsLimit, customtags.length);
						}
						for (i = 0; i < usertags.length; i++) {
							that.$tagsParent.append(that.getTagHTML(usertags[i]));
						}
						for (i = 0; i < customtags.length; i++) {
							that.$tagsParent.append(that.getTagHTML(customtags[i], true));
						}
						$alltags = that.$tagsParent.find('.' + that.tagClassName);
					} else {
						for (i = 0; i < usertags.length; i++) {
							that.$tagsParent.append(that.getTagHTML(usertags[i]));
						}
						$alltags = that.$tagsParent.find('.' + that.tagClassName);
					}
					i = 0;

					function showWithDelay() {
						if (i < $alltags.length) {
							setTimeout(function() {
								$alltags.eq(i++).fadeIn(FADETIME);
								showWithDelay();
							}, that.fadeDelay);
						}
					}
					showWithDelay();
				};
				this.$tagsParent = this.$masthead.find('hgroup');
				mwtools.raw('MediaWiki:ProfileTags', function(profileTagsData) {
					that.inactiveRequestParams.ucuser = username;
					that.inactiveRequestParams.ucstart = new Date(Date.now()).toISOString();
					that.inactiveRequestParams.ucend = new Date(Date.now() - 30 * that.inactiveMonthsLimit * 24 * 60 * 60 * 1000).toISOString();
					var alltags = that.parseProfileTagsText(profileTagsData);
					$.get(API, that.inactiveRequestParams).success(function(inactiveUserData) {
						function lowerCaseMap(elem) {
							return elem.toLowerCase();
						}
						var usertags;
						if (!(username in alltags)) {
							usertags = alltags[username] = [];
						} else {
							usertags = alltags[username];
						}
						usertags = usertags.map(lowerCaseMap);
						if (typeof inactiveUserData === 'object' && typeof inactiveUserData.query === 'object' && inactiveUserData.query.usercontribs && !inactiveUserData.query.usercontribs.length && username) {
							usertags.push(that.inactiveUserTagMsg);
						}
						mwtools.raw('Участник:' + username + '/' + that.customTagsPagename, function(customTagsData) {
							var customtags;
							if (customTagsData.length) {
								customtags = that.parseProfileTagsText(username + '|' + customTagsData)[username];
								customtags = customtags.map(lowerCaseMap);
							}
							doAfterAll(usertags, customtags);
						});
					});
				});
			}
		},
		QuickTemplates: {
			insertTplMsg: 'Вставить шаблон',
			getHTML: function(templateNames) {
				return '<nav id="QuickTemplates"><select>' + (function() {
					var options = '';
					for (var i = 0; i < templateNames.length; i++) {
						options += '<option value="' + templateNames[i] + '">' + templateNames[i] + '</option>';
					}
					return options;
				})() + '</select><input type="button" value="' + this.insertTplMsg + '" /></nav>';
			},
			appendAfterSelector: '#EditPage .module_content nav.buttons',
			textboxId: 'wpTextbox1',
			makeTemplate: function(templateName) {
				var template;
				var i;
				if (templateName && templateName in this.templateData && typeof this.templateData[templateName] === 'object') {
					template = '{{' + templateName;
					if (this.templateData[templateName].parameters.length) {
						template += '\n';
						if (this.templateData[templateName].defaults.length) {
							for (i = 0; i < this.templateData[templateName].parameters.length; i++) {
								template += '| ' + this.templateData[templateName].parameters[i] + ' = ' + (this.templateData[templateName].defaults[i] || '') + '\n';
							}
						} else {
							for (i = 0; i < this.templateData[templateName].parameters.length; i++) {
								template += '| ' + this.templateData[templateName].parameters[i] + ' = \n';
							}
						}
					}
					template += '}}';
				}
				this.insertTemplate(template);
			},
			insertTemplate: function(templateText) {
				var textboxVal = this.$textbox.val();
				var that = this;

				function insert() {
					if (textboxVal === '') {
						return textboxVal + templateText;
					}
					return textboxVal.slice(0, that.$textbox.prop('selectionStart')) + templateText + textboxVal.slice(that.$textbox.prop('selectionEnd'));
				}
				
				/* if ((this.$textbox.prop('scrollTop') - ((parseInt(this.$textbox.css('borderTopWidth'), 10) + parseInt(this.$textbox.css('borderBottomWidth'), 10)) || 0)) === this.$textbox.prop('scrollHeight') - this.$textbox.prop('offsetHeight')) {
					this.$textbox.val(insert());
					this.$textbox.prop('scrollTop', this.$textbox.prop('scrollHeight'));
				} else {
					this.$textbox.val(insert());
				}*/
				this.$textbox.val(insert());
			},
			ckeTextboxId: 'cke_wpTextbox1',
			checkForTextbox: function() {
				if (!this.$textbox.length) {
					this.$textbox = $('#' + this.ckeTextboxId + ' #' + this.textboxId);
					if (!this.$textbox.length) {
						this.$textbox = $('#' + this.textboxId);
					}
				}
			},
			jsonDataPageName: 'MediaWiki:Custom-QuickTemplates.json',
			init: function() {
				if (wgAction !== 'edit' || wgNamespaceNumber !== 0 || wgIsMainPage) {
					return;
				}
				var that = this;
				this.$textbox = $();
				mwtools.raw(this.jsonDataPageName, function(data) {
					try {
						data = JSON.parse(data);
					} catch (ex) {
						data = {};
					}
					that.templateData = data;
					that.$container = $(that.appendAfterSelector).after(that.getHTML(Object.keys(data))).parent().find('#QuickTemplates');
					that.$select = that.$container.find('select');
					that.$container.find('input').on('click', function() {
						that.checkForTextbox();
						that.makeTemplate(that.$select.val());
					});
					that.$container.fadeIn(FADETIME);
				});
			}
		},
		Timers: {
			startTimer: function(id, ids) {
				var that = this;
				var timer = this.timers[id];
				var to = this.makeDate(timer);
				var $timerNode = timer.$timer;
				var intervalId = timer.intervalId = setInterval(function() {
					var now = new Date().getTime();
					var diff = Math.floor((to - now) / 1000);
					if (diff < 0) {
						if (timer.repeat) {} else {
							if (timer.endtext) {
								$timerNode.text(timer.endtext);
							}
							clearInterval(intervalId);
							intervalId = timer.intervalId = null;
						}
					}
					timer.$sNode.text(diff % 60);
					diff = Math.floor(diff / 60);
					timer.$mNode.text(diff % 60);
					diff = Math.floor(diff / 60);
					timer.$hNode.text(diff % 24);
					diff = Math.floor(diff / 24);
					timer.$dNode.text(diff % 24);
				}, 1000);
				if (ids) {
					ids.push(intervalId);
				}
			},
			makeDate: function(timerObj) {
				var dateString = '';
				if (timerObj.month) {
					dateString += timerObj.month + '/';
				} else {
					dateString += '01/';
				}
				if (timerObj.day) {
					dateString += timerObj.day + '/';
				} else {
					dateString += '01/';
				}
				if (timerObj.year) {
					dateString += timerObj.year;
				} else {
					dateString += '1970';
				}
				dateString += ' ';
				if (timerObj.hour) {
					dateString += timerObj.hour + ':';
				} else {
					dateString += '00:';
				}
				if (timerObj.minute) {
					dateString += timerObj.minute + ':';
				} else {
					dateString += '00:';
				}
				if (timerObj.second) {
					dateString += timerObj.second;
				} else {
					dateString += '00';
				}
				dateString += ' ';
				if (timerObj.timezone) {
					dateString += timerObj.timezone;
				} else {
					dateString += '+0000';
				}
				return new Date(dateString);
			},
			timers: {},
			timerSelector: '.timer[data-active="true"]',
			init: function($init, callback) {
				var that = this;
				var ids = [];
				($init && $init.find(this.timerSelector) || $(this.timerSelector)).each(function(i, timer) {
					var $timer = $(timer);
					var id = 'timer' + random(0, 0x7fffffff);
					$timer.attr('id', id);
					that.timers[id] = {
						$timer: $timer,
						$sNode: $timer.find('.seconds'),
						$mNode: $timer.find('.minutes'),
						$hNode: $timer.find('.hours'),
						$dNode: $timer.find('.days'),
						second: $timer.attr('data-second'),
						minute: $timer.attr('data-minute'),
						hour: $timer.attr('data-hour'),
						day: $timer.attr('data-day'),
						month: $timer.attr('data-month'),
						year: $timer.attr('data-year'),
						repeat: $timer.attr('data-repeat') === 'true',
						timezone: $timer.attr('data-timezone'),
						endtext: $timer.attr('data-endtext'),
						intervalId: null
					};
					that.startTimer(id, ids);
				});
				if (typeof callback === 'function') {
					callback(ids);
				}
			}
		},
		Badges: {
			init: function() {}
		},
		Styles: {
			startStyleExpr: /^@styleexpr\s?:/,
			endStyleExpr: /@endstyleexpr\s*;/,
			variableExpr: /let(\s{1,}|\t|\n)be(\s{1,}|\t|\n)(\d|\w|[а-яё]+)(\s{1,}|\t|\n)?=(\s{1,}|\t|\n)?.+(\s{1,}|\t|\n)?;/g,
			parentSelector: '#mw-content-text',
			rulesRegExp: /.+?(\n|\s)*\{(.|\t|\n|\s)+?\}/gm,
			addCSS: function(cssText) {
				$('<style>').text(cssText).appendTo($body);
			},
			CSSText: null,
			parsedCSSText: null,
			parseVariables: function(varList) {},
			getVariables: function() {
				var match = this.CSSText.match(this.variableExpr);
				var i;
				if (match) {
					for (i = 0; i < match.length; ++i) {
						this.variables[null] = match[i].slice(match[i].indexOf('=' + 1));
					}
				}
			},
			variables: {},
			init: function() {
				this.textContent = $mwContentText.text();
				this.startExprMatch = this.textContent.match(this.startStyleExpr);
				this.endExprMatch = this.textContent.match(this.endStyleExpr);
				if (this.startExprMatch && this.endExprMatch) {
					this.CSSText = this.getCSSText(this.startExprMatch, this.endExprMatch);
					this.parsedCSSText = this.parseCSSText(this.CSSText);
					this.addCSS(this.parsedCSSText);
				}
			},
			parseCSSText: function(cssText) {
				var rules = cssText.match(this.rulesRegExp);
				var i;
				var that = this;
				if (rules) {
					return rules.map(function(e) {
						return that.parentSelector + ' ' + e;
					}).join('\n');
				}
				return '';
			},
			getCSSText: function(startExprMatch, endExprMatch) {
				this.beginRange = this.textContent.indexOf(startExprMatch) + startExprMatch.length;
				this.endRange = this.textContent.indexOf(endExprMatch) - 1;
				return $.trim(this.textContent.slice(this.beginRange, this.endRange));
			}
		},
		WarframeWikiBuilder: {
			init: function() {
				if (wgPageName !== 'Служебная:WarframeWikiBuilder') {
					return;
				}
			}
		},
		RelicsDatabase: {
			fetchData: function(callback) {
				mwtools.raw(this.DBMainpage, function(data) {
					try {
						data = JSON.parse(data);
					} catch (ex) {
						return;
					}
					if (typeof data === 'object') {
						callback(data);
					}
				});
			},
			addEditorToPage: function(data) {
				this.$relicsEditor = $('<div>', {
					'class': 'RelicsEditor'
				});
				this.$relicsEditorSwitcherButtonByParts = $('<input>', {
					value: 'Части',
					'class': 'RelicsEditorSwitcherButtonByParts',
					type: 'button'
				});
				this.$relicsEditorSwitcherButtonByRelics = $('<input>', {
					value: 'Реликвии',
					'class': 'RelicsEditorSwitcherButtonByRelics selected',
					type: 'button'
				});
				this.$relicsEditorSwitcher = $('<div>', {
					'class': 'RelicsEditorSwitcher'
				});
				this.$relicsEditorSwitcher.append(this.$relicsEditorSwitcherButtonByParts).append(this.$relicsEditorSwitcherButtonByRelics);
				this.$relicsEditorWrapper = $('<div>', {
					'class': 'RelicsEditorWrapper'
				});
				this.$relicsEditorTitle = $('<div>', {
					'class': 'RelicsEditorTitle',
					html: 'RelicsEditorTitle'
				});
				this.$relicsEditorContent = $('<div>', {
					'class': 'RelicsEditorContent'
				});
				this.$relicsEditorWrapper.append(this.$relicsEditorTitle).append(this.$relicsEditorContent);
				this.$relicsEditor.append(this.$relicsEditorSwitcher).append(this.$relicsEditorWrapper);
				$mwContentText.prepend(this.$relicsEditor);
				this.addEditorElements();
			},
			addEditorElements: function() {},
			DBMainpage: 'Участник:GoodLuck/DB',
			init: function($init) {
				var that = this;
				this.fetchData(function(data) {
					that.data = data;
					if (wgPageName === that.DBMainpage) {
						that.addEditorToPage();
					}
				});
			}
		}
	};
})(typeof window !== 'undefined' ? window : null);
Warframe.Init();