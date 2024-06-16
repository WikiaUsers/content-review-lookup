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

	var editToken = mw.user.tokens.get('editToken');
	var wgCanonicalSpecialPageName = mw.config.get('wgCanonicalSpecialPageName');
	var wgTitle = mw.config.get('wgTitle');
	var wgIsMainPage = mw.config.get('wgIsMainPage');
	var wgScript = mw.config.get('wgScript');
	var wgArticlePath = mw.config.get('wgArticlePath');
	var wgNamespaceNumber = mw.config.get('wgNamespaceNumber');
	var $document = $(document);
	var $html = $('html');
	var $window = $(window);
	var $body = $(document.body);
	var $mwContentText = $('#mw-content-text');
	var API = '/ru/api.php';
	var INDEX = '/ru/index.php';
	
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
			this.Invoke.init();
			this.Tabbers.init();
			this.AjaxTooltips.init();
			this.Mainpage.init();
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
	};
})(typeof window !== 'undefined' ? window : null);
Warframe.Init();