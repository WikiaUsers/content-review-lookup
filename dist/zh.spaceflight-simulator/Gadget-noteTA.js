// <nowiki>
/**!
 *  _________________________________________________________________________________
 * |                                                                                 |
 * |                      === WARNING: GLOBAL GADGET FILE ===                        |
 * |                    Changes to this page affect many users.                      |
 * |       Please discuss changes on the talk page, [[WP:VPT]] before editing.       |
 * |_________________________________________________________________________________|
 *
 * Covert From https://zh.wikipedia.org/w/index.php?title=MediaWiki:Gadget-noteTA.js&oldid=63601886
 * @author [[User:SunAfterRain]]
 */
$(function () {
	const HanAssist = require('ext.gadget.HanAssist');
	const isVector = mw.config.get('skin') === 'vector'
		|| mw.config.get('skin') === 'vector-2022';

	const api = new mw.Api();

	/** @type {Map<string, OO.ui.ProcessDialog>} */
	const viewerMap = new Map();
	const windowManager = new OO.ui.WindowManager();
	windowManager.$element.appendTo(document.body);

	/**
	 * @param {any} value
	 * @param {string} valueName 
	 * @return {asserts value} 
	 */
	function assert(value, valueName) {
		if (!value) {
			throw new Error(`Assert Fail, ${valueName} == null.`);
		}
	}

	class ApiRetryFailError extends Error {
		get name() {
			return 'ApiRetryFailError';
		}

		/**
		 * @param {string[]} errors
		 */
		constructor(errors) {
			super(`Api calls failed ${errors.length} time(s) in a row.`);
			this.errors = errors;
		}

		toJQuery() {
			const errorCount = this.errors.length;
			return $('<div>')
				.attr({
					class: 'error'
				})
				.append(
					$('<p>')
						.text(HanAssist.conv({
							hans: `Api 调用连续失败 ${errorCount} 次，${errorCount} 次调用的错误分别为：`,
							hant: `Api 調用連續失敗 ${errorCount} 次，${errorCount} 次調用的錯誤分別為：`,
							other: `Api calls failed ${errorCount} time(s) in a row. Errors: `
						})),
					$('<ol>')
						.append(this.errors.map(v => $('<li>').append(v.split('\n').map(v => $('<p>').text(v)))))
				);
		}
	}

	/**
	 * @typedef {{ [K in keyof C]: C[K] extends (...args: any[]) => any ? K : never; }[keyof C]} GetClassMethods
	 * @template C
	 */

	/**
	 * @template {GetClassMethods<mw.Api>} M
	 * @param {M} method
	 * @param {Parameters<mw.Api[M]>} args
	 * @param {number} count
	 * @param {string[]} previousErrors
	 * @return {Promise<Awaited<ReturnType<mw.Api[M]>>>}
	 */
	function retryApiRequestES6Warp(method, args, count = 3, previousErrors = []) {
		if (!count) {
			return $.Deferred().reject(new ApiRetryFailError(errors));
		}
		const deferred = $.Deferred();
		api[method](...args).then(deferred.resolve, error => {
			console.error(error);
			if (error && typeof error === 'object' && 'stack' in error) {
				previousErrors.push(error.stack);
			} else {
				previousErrors.push(String(error));
			}
			retryApiRequestES6Warp(method, args, --count, previousErrors)
				.then(deferred.resolve, deferred.reject);
		});
		return deferred;
	}

	/**
	 * @template {GetClassMethods<mw.Api>} M
	 * @param {M} method
	 * @param {Parameters<mw.Api[M]>} args
	 * @return {Promise<Awaited<ReturnType<mw.Api[M]>>>}
	 */
	function retryApiRequest(method, ...args) {
		return retryApiRequestES6Warp(method, args);
	}

	/**
	 * @template T
	 * @param {Promise<T>} promise
	 * @return {JQuery.Promise<T>}
	 */
	function nativePromiseToJQueryDeferred(promise) {
		const deferred = $.Deferred();
		promise.then(deferred.resolve, deferred.reject);
		return deferred;
	}

	/**
	 * @param {string} hash
	 */
	function getViewer(hash) {
		if (viewerMap.has(hash)) {
			const viewer = viewerMap.get(hash);
			assert(viewer, 'viewer');
			return viewer;
		}

		const dom = document.getElementById(`noteTA-${hash}`);
		if (!dom) {
			throw new Error(`Can\'t get Element "#noteTA-${hash}".`);
		}
		const $dom = $(dom);

		class NoteTAViewer extends OO.ui.ProcessDialog {
			constructor() {
				super({
					size: 'larger'
				});
				this.hash = hash;
				this.dataIsLoaded = false;
				this.collapse = true;

				this.$realContent = $('<div>');
			}

			initialize() {
				super.initialize();

				this.content = new OO.ui.PanelLayout({
					padded: true,
					expanded: false
				});
				this.$realContent.appendTo(this.content.$element);

				this.$body.append(this.content.$element);

				return this;
			}

			getNoteTAParseText() {
				if (this.noteTAParseText) {
					return $.Deferred().resolve(this.noteTAParseText);
				}

				const $noteTAtitle = $dom.find('.noteTA-title');
				const actualTitle = mw.config.get('wgPageName').replace(/_/g, ' ');
				let wikitext = '';

				const titleDeferred = $.Deferred();
				if ($noteTAtitle.length) {
					const titleConv = $noteTAtitle.attr('data-noteta-code');
					assert(titleConv, 'titleConv');
					let titleDesc = $noteTAtitle.attr('data-noteta-desc');
					if (titleDesc) {
						titleDesc = '（' + titleDesc + '）';
					} else {
						titleDesc = '';
					}
					wikitext += '<span style="float: right;">{{edit|' + actualTitle + '|section=0}}</span>\n';
					wikitext += '; 本文使用[[Help:中文维基百科的繁简、地区词处理#條目標題|标题手工转换]]\n';
					wikitext += '* 转换标题为：-{D|' + titleConv + '}-' + titleDesc + '\n';
					wikitext += '* 实际标题为：-{R|' + actualTitle + '}-；当前显示为：-{|' + titleConv + '}-\n';
					titleDeferred.resolve();
				} else {
					retryApiRequest('parse', '{{noteTA/multititle|' + actualTitle + '}}', {
						title: actualTitle,
						variant: 'zh'
					}).then(resultHtml => {
						const $multiTitle = $($.parseHTML(resultHtml)).find('.noteTA-multititle');

						if ($multiTitle.length) {
							/** @type {Record<string, string[]>} */
							const textVariant = {};
							/** @type {Record<string, string|null>} */
							const variantText = {};
							wikitext += '; 本文[[Help:中文维基百科的繁简、地区词处理#條目標題|标题可能经过转换]]\n* 转换标题为：';
							$multiTitle.children().each(function () {
								const $li = $(this);
								const variant = $li.attr('data-noteta-multititle-variant');
								assert(variant, 'variant');
								const text = $li.text().trim();
								variantText[variant] = text;
								if (textVariant[text]) {
									textVariant[text].push(variant);
								} else {
									textVariant[text] = [variant];
								}
							});

							const multiTitle = [];
							const titleConverted = variantText[mw.config.get('wgUserVariant')];
							for (const variant in variantText) {
								const text = variantText[variant];
								if (text === null) {
									continue;
								}

								const variants = textVariant[text];

								for (const variant of textVariant[text]) {
									variantText[variant] = null;
								}

								const variantsName = variants.map((variant) => `-{R|{{MediaWiki:Variantname-${variant}}}}-`).join('、');
								multiTitle.push(variantsName + '：-{R|' + text + '}-');
							}
							wikitext += multiTitle.join('；');
							wikitext += '\n* 实际标题为：-{R|' + actualTitle + '}-；当前显示为：-{R|' + titleConverted + '}-\n';
						}
						titleDeferred.resolve();
					}).catch(titleDeferred.reject);
				}

				const deferred = $.Deferred();
				titleDeferred.then(() => {
					const $noteTAgroups = $dom.find('.noteTA-group > *[data-noteta-group]');
					if ($noteTAgroups.length > 1) {
						this.collapse = true;
					}
					for (const ele of $noteTAgroups) {
						const $ele = $(ele);
						switch ($ele.attr('data-noteta-group-source')) {
							case 'template':
								wikitext += '{{CGroup/' + $ele.attr('data-noteta-group') + '}}\n';
								break;
							case 'module':
								wikitext += '{{#invoke:CGroupViewer|dialog|' + $ele.attr('data-noteta-group') + '}}\n';
								break;
							case 'none':
								wikitext += '; 本文使用的公共转换组“' + $ele.attr('data-noteta-group') + '”尚未创建\n';
								wikitext += '* {{edit|Module:CGroup/' + $ele.attr('data-noteta-group') + '|创建公共转换组“' + $ele.attr('data-noteta-group') + '”}}\n';
								break;
							default:
								wikitext += '; 未知公共转换组“' + $ele.attr('data-noteta-group') + '”来源“' + $ele.attr('data-noteta-group-source') + '”\n';
						}
					}

					const $noteTAlocal = $dom.find('.noteTA-local');
					if ($noteTAlocal.length) {
						this.collapse = true;
						wikitext += '<span style="float: right;">{{edit|' + actualTitle + '|section=0}}</span>\n';
						wikitext += '; 本文使用[[Help:中文维基百科的繁简、地区词处理#控制自动转换的代碼|全文手工转换]]\n';
						const $noteTAlocals = $noteTAlocal.children('*[data-noteta-code]');
						$noteTAlocals.each((_, that) => {
							const $this = $(that);
							const localConv = $this.attr('data-noteta-code');
							let localDesc = $this.attr('data-noteta-desc');
							if (localDesc) {
								localDesc = '（' + localDesc + '）';
							} else {
								localDesc = '';
							}
							wikitext += '* -{D|' + localConv + '}-' + localDesc + '当前显示为：-{' + localConv + '}-\n';
						});
					}

					wikitext += '{{noteTA/footer}}\n';

					this.noteTAParseText = wikitext;

					deferred.resolve(wikitext);
				}).catch(deferred.reject);
				return deferred;
			}

			doExecute() {
				if (this.dataIsLoaded) {
					return $.Deferred().resolve();
				}

				this.$realContent.empty().append(
					$('<p>').text(HanAssist.conv({ hans: '正在加载...', hant: '正在載入...' }))
				);

				return this.getNoteTAParseText()
					.then(wikitext => retryApiRequest('parse', wikitext, {
						title: 'Template:CGroup/-',
						variant: mw.config.get('wgUserVariant')
					}))
					.then(parsedHtml => {
						this.$realContent.empty().html(parsedHtml);
						this.$realContent.find('.mw-collapsible').makeCollapsible();
						this.updateSize();

						this.dataIsLoaded = true;
					})
					.catch(error => {
						if (error instanceof ApiRetryFailError) {
							throw new OO.ui.Error(error.toJQuery(), { recoverable: true });
						} else {
							throw new OO.ui.Error(String(error), { recoverable: false });
						}
					});
			}

			doExecuteWrap() {
				if (!this.executePromise) {
					this.executePromise = this.doExecute();
					delete this.lastError;

					const deferred = $.Deferred();
					this.executePromise
						.then(deferred.resolve)
						.catch(error => {
							if (error instanceof OO.ui.Error) {
								this.lastError = error;
							} else {
								deferred.reject(error);
							}
						})
						.always(() => {
							delete this.executePromise;
						});
					return deferred;
				} else {
					const deferred = $.Deferred();
					this.executePromise
						.then(deferred.resolve)
						.catch(error => {
							if (!(error instanceof OO.ui.Error)) {
								deferred.reject(error);
							} else {
								deferred.resolve();
							}
						})
						.always(() => {
							delete this.executePromise;
						});
					return deferred;
				}
			}

			getSetupProcess(data) {
				return super.getSetupProcess(data).next(() => {
					this.doExecuteWrap();
					this.executeAction('main');
				});
			}

			getActionProcess(action) {
				return super.getActionProcess(action)
					.next(() => {
						if (action === 'main') {
							return nativePromiseToJQueryDeferred(this.doExecuteWrap());
						}
					})
					.next(() => {
						if (action === 'main' && this.lastError) {
							return this.lastError;
						}

						return super.getActionProcess(action).execute();
					});
			}
		}

		if (!NoteTAViewer.static || NoteTAViewer.static === OO.ui.ProcessDialog.static) {
			NoteTAViewer.static = Object.assign({}, OO.ui.ProcessDialog.static);
		}

		NoteTAViewer.static.name = 'NoteTALoader-' + hash;
		NoteTAViewer.static.title = HanAssist.conv({ hans: '字词转换', hant: '字詞轉換' });
		NoteTAViewer.static.actions = [
			{
				label: mw.msg('ooui-dialog-process-dismiss'),
				flags: 'safe'
			}
		];

		const viewer = new NoteTAViewer();
		windowManager.addWindows([viewer]);
		viewerMap.set(hash, viewer);

		return viewer;
	}

	function resetAllViewer() {
		viewerMap.clear();
		windowManager.clearWindows();
	}

	let $noteTATab;
	const portletId = 'p-noteTA';
	function vectorInit() {
		if ($noteTATab) {
			return;
		}
		$noteTATab = $(mw.util.addPortlet(portletId));
		$noteTATab.removeClass(['mw-portlet-p-noteTA']).addClass(['mw-portlet-noteTA', 'vector-menu-tabs']);
		if (mw.config.get('skin') === 'vector-2022') {
			$('#p-associated-pages').after($noteTATab);
		} else {
			$('#p-variants').after($noteTATab.addClass(['vector-menu-tabs-legacy']));
		}
	}

	function vectorAddItem(hash) {
		vectorInit();
		const $portlet = $(mw.util.addPortletLink(
			portletId,
			'#',
			'汉/漢',
			`ca-noteTA-${hash}`
		));
		$portlet
			.find('a')
				.empty()
				.append(
					$('<div>')
						.append(
							$('<span>')
								.css({
									padding: '1px 3px',
									background: '#d3e3f4',
									color: '#000000',
									height: '85%'
								}).text('汉'),
							$('<span>')
								.css({
									padding: '1px 3px',
									background: '#e9e9e9',
									color: '#434343',
									height: '85%'
								}).text('漢')
						)
				);
		return $portlet;
	}

	function noteTAViewer() {
		resetAllViewer();

		if (isVector) {
			vectorInit();
			$noteTATab.find('ul').empty();
			mw.util.hidePortlet(portletId);
		}

		$('.mw-indicator[id^=mw-indicator-noteTA-]').each((_, ele) => {
			const hash = ele.id.replace(/^mw-indicator-noteTA-/, '');
			let $ele = $(ele);
			if (isVector) {
				$ele.hide();
				$ele = vectorAddItem(hash);
			}
			$ele.on('click', (e) => {
				e.preventDefault();
				getViewer(hash).open();
			});
		});

		if (mw.loader.getState('ext.gadget.noteTAvector')) {
			$('x-noteTAvector').remove(); // force remove ext.gadget.noteTAvector element
		}
	}

	noteTAViewer.get = getViewer;
	noteTAViewer.reset = resetAllViewer;
	if (isVector) {
		noteTAViewer.vectorAddItem = vectorAddItem;
	}

	mw.libs.noteTAViewer = noteTAViewer;

	mw.hook('wikipage.content').add(function ($content) {
		noteTAViewer();
	});
});
// </nowiki>