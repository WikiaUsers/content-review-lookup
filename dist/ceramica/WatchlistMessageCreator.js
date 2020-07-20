/**
 * [[MediaWiki:WatchlistMessageCreator.js]]
 * //commons.wikimedia.org/w/index.php?title=MediaWiki:WatchlistMessageCreator.js&action=raw
 *
 * This script is made to be run at [[Help:Watchlist messages/Wizard]].
 * It depends on gadgets (see last lines) and [[Template:WatchlistNotice/Wizard/Data]].
 *
 *
 * @rev 1 (2013-06-14)
 * @author Rillke, 2013
 *
 * <nowiki>
 */
// List the global variables for jsHint-Validation. Please make sure that it passes http://jshint.com/
// Scheme: globalVariable:allowOverwriting[, globalVariable:allowOverwriting][, globalVariable:allowOverwriting]
/*global jQuery:false, mediaWiki:false, Geo:false*/

// Set jsHint-options. You should not set forin or undef to false if your script does not validate.
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:false, browser:true, smarttabs:true*/


(function($, mw) {
	'use strict';
	if ('Help:Watchlist_messages/Wizard' !== mw.config.get('wgPageName')) return;
	
	// Since we do not register this as a gadget, we can not
	// take the advantage of CSS-Janus
	// Therefore we have to flip ourserlf (nothing complicated, however)
	var isRTL = $(document.body).hasClass('rtl'),
		right = 'right', left = 'left', ltr = 'ltr', css;
	if (isRTL) {
		right = 'left';
		left = 'right';
		ltr = 'rtl';
	}
		
	css = [
		'#wlc-maincontainer input { direction:' + ltr + ' }',
		'ul.wlc-steps { background:white; font-size:larger; }',
		'li.arrow.head { font-weight:bold; }',
		'button.wlc-backbutton { float:' + left + ' }',
		'button.wlc-nextbutton { float:' + right + ' }',
		'.wlc-input-wrap { display:inline-block; margin:1.5em }',
		'.wlc-input-label { display:block }',
		'.wlc-text-wrap { margin:1.5em }',
		'ul.wlc-autocomplete {  max-height: 300px; overflow-y: auto; overflow-x: hidden; }',
		'img.wlc-listimage { margin-' + right + ': 1em; }',
		'div.wlc-autocomplete-desc { max-width:45em; font-size:smaller }',
		'div.wlc-autocomplete-text { display:inline-block; direction:ltr }',
		'#wlc-maincontainer input { padding: 5px }',
		'img.wlc-group-icon { float:' + right + '; margin-' + left + ':1em; }',
		'div.wlc-selectionrect { border: 1px solid #99f; background: #bbf; position: absolute; z-index: 50; cursor: move; }',
		'div.wlc-mapcontainer { position:relative; overflow: hidden; float:' + left + '; }',
		'iframe.wlc-dschwen { background: url(\'//upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Openstreetmap_logo.svg/256px-Openstreetmap_logo.svg.png\') ' +
			'no-repeat center #def; margin: 0; padding: 0; }',
		'div.wlc-geoctrl { margin:1.5em 0.5em }',
		'div.wlc-map-overlay { background:#eee; position:absolute; top:0; ' + left + ':0; cursor:crosshair }',
		'div.wlc-parser-output { margin-top: 10px; box-shadow: 1px 1px 3px rgba(0,0,0,0.7); boder 1px solid #ddd; padding: 1em; min-height: 200px }',
		'div.wlc-confirm-msg { border: 1px solid #aaa; backgound: #ddd; font-family: monospace; ' +
			 'white-space: pre-wrap; width: 98%; height: 300px; overflow: auto }'
	].join('\n');
	mw.util.addCSS(css);

	// The CSS that will be used for blocking the wizard 
	// while publishing the message
	var blockCSS = {
		border: 'none',
		padding: '15px',
		backgroundColor: '#000',
		'border-radius': '10px',
		'-webkit-border-radius': '10px',
		'-moz-border-radius': '10px',
		opacity: 0.5
	};
		
	// These messages will be overwritten by localized versions
	// The loacalized versions are shiped with the page ([[:commons:Help:Watchlist messages/Wizard]])
	// They are inlcuded in a hidden div and make use of [[Help:Autotranslate]]
	var i18n = {
		'wlc-multiple': '<sup><abbr title="Multiple values are possible. At least one of them must be matched to fulfill this condition.">multi</abbr></sup>',
		'wlc-select-area': "Select area",
		'wlc-button-proceed': "Next",
		'wlc-button-back': "Back",
		'wlc-button-publish': "Publish",
		'wlc-taglist-placeholder': "Type to get a list of suggestions",
		'wlc-float-placeholder': "Number (e.g. 12.84)",
		'wlc-date-placeholder': "Date",
		'wlc-select-placeholder': "Please select …",
		'wlc-l10n-text-placeholder': "Select the correct language and enter text in that language here",
		'wlc-freetext-placeholder': "Enter free text here",
		'wlc-geo-loading-map': "Retrieving map from $1 …",
		'wlc-geo-usage': "Note that when an area is selected, you can\'t zoom or move the map.",
		'wlc-geo-info': "Your GeoIP information: Lat: $1, Lon: $2, City: $3, Country: $4",
		'wlc-input-required': '<sup title="required" style="color:red; font-weight:bold; cursor:help;">*</sup>',
		'wlc-unable-to-proceed': "Due to issues, we are unable to proceed. Click on the listed issues to resolve them.",
		'wlc-issue-doublelang': "2 texts in the same language were specified. Either select the correct language or blank the textbox.",
		'wlc-issue-invalid-number': "The number for '$1' has an invalid format.",
		'wlc-issue-invalid': "An invalid value was specified for '$1'.",
		'wlc-issue-required': "A value for the field '$1' is required.",
		'wlc-page-sub': "Wizard version: $1",
		'wlc-changes-will-be-lost': "When going back to another step, all changes made to this text will be lost.",
		'wlc-preview': "Message preview",
		'wlc-missing-token': "Unequal opening and closing token count detected. Too many $1 or missing $2.",
		'wlc-publishing': "$1 is publishing your message",
		'wlc-post-success': "Message successfully posted",
		'wlc-how-to-proceed': "How would you like to proceed?",
		'wlc-visit-watchlist': "Visit your watchlist",
		'wlc-visit-listing': "Go to the listing",
		'wlc-show-diff': "Show a diff",
		'wlc-post-error': "Error posting while the message",
		'wlc-post-error-desc': "Something went wrong posting your message. Please copy & paste the message. Here is a detailed error description: $1",
		'wlc-confirm': "Please confirm that everything is correct",
		'wlc-editsummary': "Edit summary",
		// If you localize it, you have to adapt the template's name
		'wlc-templatename': 'WatchlistNotice',
		'wlc-langtemplatename': 'LangSwitch',
		'wlc-name': "Create-a-watchlist-message Wizard",
		'wlc-title': "$1 – $2"
	};
	mw.messages.set(i18n);

	// Small helper functions returning the message text for a given key
	// The _msgp parses the message (so e.g. wikilinks are resolved)
	var _msg = function(params) {
			var args = Array.prototype.slice.call(arguments, 0);
			args[0] = 'wlc-' + args[0];
			return mw.msg.apply(mw, args);
		},
		_msgp = function(params) {
			var args = Array.prototype.slice.call(arguments, 0);
			args[0] = 'wlc-' + args[0];
			var msg = mw.message.apply(mw, args);
			return msg.parse();
		},
		userlang = mw.config.get('wgUserLanguage'),
		spinnerURL = '//upload.wikimedia.org/wikipedia/commons/e/ed/Cursor_Windows_Vista.gif',
		listingPage = 'MediaWiki:WatchlistNotice',
		discussionPage = 'MediaWiki talk:WatchlistNotice',
		isAuthorized = $.inArray('sysop', mw.config.get('wgUserGroups')) > -1,
		watchlistPage = 'Special:Watchlist',
		$win = $(window),
		hadClick = false,
		delay = function () {
			var timeoutID = 0;
				return function (cb, ms) {
					if (timeoutID) clearTimeout(timeoutID);
					timeoutID = setTimeout(cb, ms);
				};
		},
		navDelay = delay(),
		geoDelay = delay(),
		tbDelay = delay();

	var wlc = {
		version: '0.0.2.0',
		$currentStepAnchor: $(),
		issues: [],
		stepCallbacks: [],
		navigation: {
			_step: function($pg, cb) {
				wlc.stepCallbacks.push({
					$pg: $pg,
					cb: cb
				});
			},
			_go: function(e) {
				if (e) hadClick = true;

				var $a = $(this),
					$li = $a.data('$li'),
					$pg = $a.data('$pg'),
					hash = $a.data('hash');

				wlc.$currentStepAnchor = $a;
				wlc.$pages.hide();
				$pg.show();

				navDelay(function() {
					if (location.hash !== hash) {
						location.hash = hash;
					}
					document.title = _msgp('title', $a.text(), _msg('name'));
				}, 10);
				wlc.$steps.arrowStepsHighlight($li);
				wlc.stepCallbacks = $.grep(wlc.stepCallbacks, function(el, i) {
					if (el.$pg === $pg) {
						try {
							return el.cb($pg);
						} catch (ex) {
							// callback failed
						}
					} else {
						return true;
					}
				});
			},
			_hash: function() {
				// Click event is fired before hash change; if navigation was through a link, 
				// (not via browser history, the correct page is already shown)
				if (hadClick) {
					hadClick = false;
					return;
				}
				wlc.navigation._go.apply(wlc.$steps.byHash[window.location.hash][0]);
			},
			_next: function() {
				var $as = wlc.$steps.$as,
					$nextA = $as.eq($as.index(wlc.$currentStepAnchor) + 1);
				if ($nextA.length) {
					$nextA.click();
				} else {
					wlc.navigation.publishHandler();
				}
			},
			_prev: function() {
				var $as = wlc.$steps.$as;
				$as.eq($as.index(wlc.$currentStepAnchor) - 1).click();
			},
			_processText: function(txt) {
				// This logic is not read from the page.
				var nt = $.trim(wlc.val) + '\n',
					msg = mw.libs.wikiDOM.parser.text2Obj(nt),
					page = mw.libs.wikiDOM.parser.text2Obj(txt),
					tlname = $.ucFirst(_msg('templatename')),
					untilRE = /^\s*until\s*=\s*(\d{4}\-\d{2}-\d{2}(?: \d{2}:\d{2}:\d{2})?)/,
					inserted = false,
					getUntil = function(tl) {
						var u;
						$.each(tl.parts, function(i, arr) {
							var m = arr[0].match(untilRE);
							if (m && m[1]) {
								u = m[1];
								return false;
							}
						});
						return u;
					},
					eachWLT = function(templatelist, cb) {
						$.each(templatelist, function(i, tl) {
							if ($.ucFirst(tl.parts[0][0]).replace(/_/g, ' ').indexOf(tlname) === 0) {
								return cb(i, tl);
							}
						});
					},
					date = (function() {
						var d;
						eachWLT(msg.nodesByType.template, function(i, tl) {
							d = getUntil(tl);
						});
						return d;
					}()),
					exploreTemplate = function(tl) {
						var u = getUntil(tl);
						return (u && u > date);
					};
					
				eachWLT(page.nodesByType.template, function(i, tl) {
					if (exploreTemplate(tl)) {
						tl.before(msg);
						inserted = true;
						return false;
					}
				});
				
				if (!inserted) page.append(msg);
				return {
					text: mw.libs.wikiDOM.parser.obj2Text(page),
					summary: wlc.editsummary
				};
			},
			showDialog: function(title, $html) {
				mw.loader.using('jquery.ui.dialog', function() {
					if (!($html instanceof $)) $html = $('<div>').html($html);
					$html.dialog({
						title: title,
						modal: true,
						close: function() {
							$html.remove();
						}
					});
				});
			},
			publishHandler: function() {
				mw.loader.using(['ext.gadget.libAPI', 'ext.gadget.libWikiDOM', 'ext.gadget.jquery.blockUI'], wlc.navigation._publishHandler);
			},
			_publishHandler: function() {
				var $dlg = $('<div>'),
					$summaryL = $('<label for="wlc-editsummary"></label>').text(_msg('editsummary')).appendTo($dlg),
					$summary = $('<input type="textbox" maxlength="150" size="50" style="width:98%" id="wlc-editsummary"/>')
						.attr('placeholder', _msg('editsummary'))
						.val('[[Help:Watchlist messages/Wizard|Wizard]] is ' + 
							(isAuthorized ? 'adding' : 'suggesting') + ' a new [[Help:Watchlist messages|watchlist message]].')
						.appendTo($dlg),
					val = isAuthorized ? wlc.val : "\n== New watchlist message ==\n{{edit request}}\n" + 
						"Please add the following watchlist message:\n<pre>" + 
						wlc.val + "</pre>\n~~" + "~~",
					$text = $('<div>').addClass('wlc-confirm-msg').text(val).appendTo($dlg),
					dlgButtons = {};
					

				var _listingDone = function(r) {

					var $div = $('<div>').text(_msg('how-to-proceed')),
						$ul = $('<ul>').appendTo($div),
						makeLink = function(t, l) {
							$('<li>').append( $('<a>').text(_msg(t)).attr({
								href: l,
								target: '_blank'
							}) ).appendTo($ul);
						};
					
					makeLink('visit-watchlist', mw.util.wikiGetlink(watchlistPage));
					makeLink('visit-listing', mw.util.wikiGetlink(listingPage));
					if (r && r.edit) makeLink('show-diff', mw.util.wikiScript() + '?' + $.param({
						 title: r.edit.title,
						 oldid: r.edit.oldrevid,
						 diff: r.edit.newrevid
					}));
					$.unblockUI({
						onUnblock: function() {
							wlc.navigation.showDialog(_msg('post-success'), $div);
						}
					});				
				};
				var _listingFailed = function(e) {
					$.unblockUI();
					wlc.navigation.showDialog(_msg('post-error'), _msgp('post-error-desc', e));
				};
					
				dlgButtons[_msg('button-publish')] = function() {
					wlc.editsummary = $summary.val();
					$dlg.dialog('close');
					setTimeout(function() {
						$.blockUI({
							css: blockCSS,
							 message: $('<div>').css('color', '#fff').text(_msgp('publishing', _msg('name')))
						});
					}, 10);
					setTimeout(function() {
						$.unblockUI();
					}, 12000);
					
					
					if (isAuthorized) {
						mw.libs.commons.api.$changeText(listingPage, wlc.navigation._processText).done(_listingDone).fail(_listingFailed);
					} else {
						mw.libs.commons.api.editPage({
							title: discussionPage,
							editType: 'appendtext',
							text: val,
							summary: wlc.editsummary,
							cb: function() {
								document.location = mw.util.wikiGetlink(discussionPage) + '#footer';
							},
							errCb: _listingFailed
						});
					}
				};
				$dlg.dialog({
					title: _msg('confirm'),
					modal: true,
					buttons: dlgButtons,
					width: Math.min($win.width(), 750),
					close: function() {
						$dlg.remove();
					}
				});
			},
			lastPageHandler: function($pg) {
				// Validation
				wlc.inputFactory.validate();
				var $issues = $('<div class="wlc-issue-container ui-state-highlight"></div>').text(_msg('unable-to-proceed')),
					$issueList = $('<ul>').appendTo($issues);

				$pg.$body.empty();

				if (wlc.issues.length) {
					wlc.$publishButton.button({
						disabled: true
					});
					$.each(wlc.issues, function(i, issue) {
						var $li = $('<li>').appendTo($issueList),
							$a = $('<a>').attr({
								href: issue.p.hash
							}).text(issue.reason).appendTo($li).click(function(e) {
								e.preventDefault();
								wlc.$steps.byHash[issue.p.hash].click();
								var $parent = issue.$input.parent();
								$parent.addClass('ui-state-highlight');
								setTimeout(function() {
									$parent.removeClass('ui-state-highlight');
								}, 5000);
								$('body,html').animate({
									'scrollTop': issue.$input.offset().top - 100
								});
							});
					});
					$pg.$body.append($issues);
					return true;
				}
				
				// Template creation
				var tl = wlc.inputFactory.getValue(),
					$pOut,
					onChange,
					validateText,
					oldText,
					$taWrap = $('<div>').appendTo($pg.$body),
					$taWarining = $('<div>').addClass('ui-state-highlight').css('visibility', 'hidden').text(_msg('changes-will-be-lost')).appendTo($taWrap),
					$taWarining2Wrap = $('<div>').addClass('ui-state-highlight').css({
						'visibility': 'hidden',
						'min-height': '2em'
					}).appendTo($taWrap),
					$taWarining2 = $('<ul>').appendTo($taWarining2Wrap),
					$ta = $('<textarea>').css('width', '100%').val(tl).appendTo($taWrap);
					
				$taWarining2.$wrap = $taWarining2Wrap;
				$taWarining2.addWarning = function(w) {
					$taWarining2Wrap.css('visibility', 'visible');
					$('<li>').text(w).appendTo(this);
				};
				var toTest = [['(', ')'], ['[', ']'], ['{', '}'], ['<now' + 'iki>', '</now' + 'iki>'], ['<pre>', '</pre>']];
				$.each(toTest, function(e, el) {
					el[3] = new RegExp($.escapeRE(el[0]), 'g');
					el[4] = new RegExp($.escapeRE(el[1]), 'g');
				});
				validateText = function(val, $errNode) {
					$errNode.empty().$wrap.css('visibility', 'hidden');
					$.each(toTest, function(e, el) {
						var m1 = val.match(el[3]) || [],
							m2 = val.match(el[4]) || [];
	
						if (m1.length > m2.length) {
							$errNode.addWarning(_msgp('missing-token', el[0], el[1]));
						} else if (m1.length < m2.length) {
							$errNode.addWarning(_msgp('missing-token', el[1], el[0]));
						}
					});
				};
				onChange = function() {
					var val = wlc.val = $ta.val();
					if (oldText === val) return;
					
					if (tl !== val) {
						$taWarining.css('visibility', 'visible');
					} else {
						$taWarining.css('visibility', 'hidden');
					}
					wlc.$publishButton.button({
						disabled: true
					});
					$pOut.text(_msg('preview')).css('background', 'url(' + spinnerURL + ') no-repeat center');
					validateText(val, $taWarining2);
					mw.loader.using('ext.gadget.libAPI', function() {
						mw.libs.commons.api.parse(val, userlang, listingPage + '/render', function(r) {
							$pOut.css('background', 'none').html(r);
							wlc.$publishButton.button({
								disabled: false
							});
							oldText = val;
						});
					});
				};
					
				// Timeout is a IE8 fix
				setTimeout(function() {
					$ta.height(Math.max($ta[0].scrollHeight, 200));
				}, 1);
				$pOut = $('<div>').addClass('wlc-parser-output').appendTo($pg.$body);
				$ta.bind('input change', function() {
					tbDelay(onChange, 500);
				}).triggerHandler('change');

				return true;
			}
		},
		groupFactory: (function() {
			var gf = {
				groupsById: {},
				$get: function(id) {
					return this.groupsById[id];
				}
			};
			$('.wlc-groupinfo').find('tr').each(function(i, r) {
				if (0 === i) return;
				var $tds = $(r).find('td'),
					id = $tds.eq(0).text(),
					heading = $tds.eq(1).text(),
					intro = $tds.eq(2).text(),
					outro = $tds.eq(3).text(),
					$img = $tds.eq(4).find('img'),
					$fs = $('<fieldset>'),
					$l = $('<legend>').text(heading).appendTo($fs),
					$intro = $('<div>').text(intro).appendTo($fs),
					$inputArea = $('<div>').appendTo($fs),
					$outro = $('<div>').text(outro).appendTo($fs);

				$img.clone().addClass('wlc-group-icon').prependTo($fs);
				$fs.$inputArea = $inputArea;
				gf.groupsById[id] = $fs;
			});
			return gf;
		}()),
		readTable: function(selector, onRow) {
			var $trs = $(selector).find('tr');

			$trs.each(function(i, r) {
				if (0 === i) return;
				var $tds = $(r).find('td');
				onRow.apply(this, [i, r, $tds]);
			});
		},

		inputFactory: (function() {
			var _ify = {
				inputs: [],
				register: function($input, p, validate, patternOrCallback) {
					_ify.inputs.push({
						$input: $input,
						p: p,
						validate: validate,
						pcb: patternOrCallback
					});
				},
				getValue: function() {
					var out = '';
					$.each(_ify.inputs, function(i, el) {
						if ($.isFunction(el.pcb)) {
							out += '\n ' + el.pcb();
						} else {
							var val = $.trim(el.$input.val());
							if (!val) return;
							if ($.isArray(val)) val = val.join(el.p.output);
							if ('string' === typeof el.pcb) {
								out += '\n ' + el.pcb.replace('$1', val);
							} else {
								out += '\n |' + el.p.name + ' = ' + val;
							}
						}
					});
					out = '\n |id = ' + $.now() + out;
					out = '{{' + _msg('templatename') + out + '\n}}';
					return out;
				},
				validate: function() {
					wlc.issues = [];
					$.each(_ify.inputs, function(i, el) {
						if ($.isFunction(el.validate)) {
							if (!el.validate(el)) wlc.issues.push(el);
						} else if ($.isFunction(el.validate.test)) {
							var val = el.$input.val();
							if (val.length < 1 && el.p.required) {
								wlc.issues.push(el);
								el.reason = _msgp('issue-required', el.p.label);
							}
							if (val.length && !(el.validate.test(val))) {
								wlc.issues.push(el);
								el.reason = _msgp('issue-invalid', el.p.label);
							}
						}
					});
				}
			};

			var internal = {
				floatRE: /^\-?\d+(?:\.\d+)?$/,
				taglistcache: {},
				_numbersonly: function($i) {
					return $i.on('input', function() {
						var o_val = $i.val(),
							n_val = o_val.replace(/[^\d.]/g, '');
						if (o_val !== n_val) $i.val(n_val);
					});
				},
				_rch: null,
				_requestCoords: function($iframe, $rect, $ctrl) {
					var _g360 = function(x) {
							return x % 360;
						},
						_g180 = function(x) {
							if (x > 180) x -= 360;
							return x;
						},
						_l0 = function(x) {
							if (x < 0) x = 360 - x;
							return x;
						};

					geoDelay(function() {
						if (internal._rch) $win.unbind('message', internal._rch);
						internal._rch = function(e) {
							var r = $.secureEvalJSON(e.originalEvent.data).response,
								tl = r.topleft,
								rb = r.rightbottom,
								latdiff = rb.lat - tl.lat,
								londiff = _l0(rb.lon - tl.lon),
								iw = $iframe.width(),
								ih = $iframe.height(),
								latPerPx = latdiff / ih,
								lonPerPx = londiff / iw,
								rw = $rect.width(),
								rh = $rect.height(),
								rpos = $rect.position(),
								rt = rpos.top,
								rl = rpos.left,
								lonLeft = tl.lon + lonPerPx * rl,
								lonRight = _g180(_g360(lonLeft + lonPerPx * rw)),
								latTop = tl.lat + latPerPx * rt,
								latBottom = latTop + latPerPx * rh;

							lonLeft = _g180(_g360(lonLeft));
							$ctrl.lon.from.val(lonLeft);
							$ctrl.lon.to.val(lonRight);
							$ctrl.lat.from.val(latTop);
							$ctrl.lat.to.val(latBottom);
						};
						$win.bind('message', internal._rch);

						// Fetch the coords of the iframe borders
						$iframe[0].contentWindow.postMessage($.toJSON({
							getcoords: 1
						}), location.protocol + $iframe.attr('src'));
					}, 500);
				}
			};

			_ify.create = {
				localized_text: function(p) {
					var ld = 0,
						lds = [],
						createLangDesc,
						$ctrl = $('<div>').attr('class', 'wlc-input-wrap'),
						$sel = $('<select>').attr('size', 1),
						$opt = $('<option>'),
						$ta = $('<textarea>').attr({
							'id': 'wlc-ip-' + p.name + '_' + ld,
							'class': 'wlc-input',
							'style': 'height:6em; min-width:15em',
							'placeholder': p.placeholder || _msg('l10n-text-placeholder')
						}),
						$l = $('<label>').attr({
							'for': 'wlc-ip-' + p.name,
							'class': 'wlc-input-label'
						}).text(p.label).appendTo($ctrl);

					$ctrl.$label = $l;
					$.each(window.wpAvailableLanguages, function(k, v) {
						$opt.clone().attr('value', k).text(v).appendTo($sel);
					});

					createLangDesc = function(e) {
						ld++;
						if (e) $(this).unbind('input change');
						var $ld = $('<div>').attr('class', 'wlc-input-wrap'),
							$selI = $sel.clone().appendTo($ld),
							$taI = $ta.clone().appendTo($ld).one('input change', createLangDesc);

						$selI.val(userlang);
						$ld.appendTo($ctrl);
						lds.push({
							$sel: $selI,
							$ta: $taI
						});
					};
					createLangDesc();

					_ify.register($ctrl, p, function(e) {
						var seenLang = {},
							txt = '',
							totalTextLen = 0,
							isValid = true;

						e.reason = _msg('issue-doublelang');
						$.each(lds, function(i, el) {
							txt = $.trim(el.$ta.val());
							totalTextLen += txt.length;
							if (txt) {
								var l = el.$sel.val();
								if (l in seenLang) return (isValid = false);
								seenLang[l] = true;
							}
						});
						if (isValid && totalTextLen < 20) {
							e.reason = _msgp('issue-required', p.label);
							isValid = false;
						}
						return isValid;
					}, function() {
						var out = '',
							txts = [],
							hadDefault = false;
							
						$.each(lds, function(i, el) {
							var txt = $.trim(el.$ta.val()),
								l = el.$sel.val();

							if (txt) {
								out += '\n   | ' + l + ' = ' + txt;
								txts.push(txt);
								if (l === 'en') hadDefault = true;
							}
						});
						if (!hadDefault) {
							out += '\n   | default = ' + txts[0];
						}
						
						out = '|' + p.name + ' = ' + '{{' + _msg('langtemplatename') + out + '\n }}';
						return out;
					});

					return $ctrl;
				},
				select: function(p) {
					var $ctrl = $('<div>').attr('class', 'wlc-input-wrap'),
						$l = $('<label>').attr({
							'for': 'wlc-ip-' + p.name,
							'class': 'wlc-input-label'
						}).text(p.label).appendTo($ctrl),
						$selConfirm = $('<div>').css('min-height', '1.4em').appendTo($ctrl),
						$sel = $('<select size="1"></select>').attr('id', 'wlc-ip-' + p.name).appendTo($ctrl),
						listtype = p.paraminfo.replace(/^(.+?)\:.+$/, '$1'),
						listvalue = p.paraminfo.replace(/^.+?\:(.+)$/, '$1');

					$ctrl.$label = $l;
					p.placeholder = p.placeholder || _msg('select-placeholder');
					$('<option>').attr({
						'value': ''
					}).text(p.placeholder).data('sel', p.placeholder).appendTo($sel);

					var _onHover = function() {
						$selConfirm.text($(this).data('sel'));
					},
						_onChange = function() {
							$selConfirm.text($sel.find('option:selected').data('sel'));
						};
					$sel.change(_onChange).on('mouseenter', 'option', _onHover);

					switch (listtype) {
						case 'window':
							break;
						case 'table':
							wlc.readTable('.' + listvalue, function(i, r, $tds) {
								$('<option>').attr({
									'value': $.trim($tds.eq(0).text())
								}).text($tds.eq(1).text()).data('sel', $tds.eq(2).text()).appendTo($sel);
							});
							break;
					}

					_ify.register($sel, p, /.*/, 0);
					return $ctrl;
				},
				date: function(p) {
					var $ctrl = $('<div>').attr('class', 'wlc-input-wrap'),
						vRE = /^\d{4}\-\d{2}-\d{2}(?: \d{2}:\d{2}:\d{2})?$/,
						$l = $('<label>').attr({
							'for': 'wlc-ip-' + p.name,
							'class': 'wlc-input-label'
						}).text(p.label).appendTo($ctrl),
						$i = $('<input type="text" size="40"/>').attr({
							'id': 'wlc-ip-' + p.name,
							'class': 'wlc-input',
							'pattern': vRE.source,
							'placeholder': p.placeholder || _msg('date-placeholder'),
							'value': p.defaultVal
						}).appendTo($ctrl).datepicker({
							changeYear: true,
							'dateFormat': p.paraminfo || 'yy-mm-dd 12:00:00',
							showWeek: true,
							firstDay: 1
						});

					if (p.required) $i.attr('required', true);
					$ctrl.$label = $l;

					_ify.register($i, p, vRE, 0);
					return $ctrl;
				},
				taglist: function(p) {
					var availableTags = [],
						supportsChosen = window.AbstractChosen && window.AbstractChosen.browser_is_supported(),
						placeholder = p.placeholder || _msg('taglist-placeholder'),
						k, l, o, st, v,
						listtype = p.paraminfo.replace(/^(.+?)\:.+$/, '$1'),
						listvalue = p.paraminfo.replace(/^.+?\:(.+)$/, '$1');
						
						
					var $ctrl = $('<div>').attr('class', 'wlc-input-wrap'),
						$l = $('<label>').attr({
							'for': 'wlc-ip-' + p.name,
							'class': 'wlc-input-label'
						}).text(p.label).append($.parseHTML(_msg('multiple'))).appendTo($ctrl),
						$i = $(supportsChosen ? '<select>' : '<input size="50"/>').attr({
							'multiple': 'multiple',
							'id': 'wlc-ip-' + p.name,
							'class': 'wlc-input',
							'placeholder': placeholder,
							'data-placeholder': placeholder
						}).appendTo($ctrl),
						$text = $('<div class="wlc-autocomplete-text"></div>'),
						$ti = $('<span class="wlc-autocomplete-text-inner"></span>'),
						$desc = $('<div class="wlc-autocomplete-desc"></div>'),
						_onDataAvailable = function(d, immediate) {
							if (supportsChosen) {
								$.each(d, function(i, item) {
									var $t = $text.clone();
									$ti.clone().text(item.label).appendTo($t);
									if (item.desc) $desc.clone().text(item.desc).appendTo($t);
									if (item.$icon) item.$icon.clone().addClass('wlc-listimage').prependTo($t);
									$('<option>').attr({
										value: item.value
									}).append($t).appendTo($i);
								});
								var finish = function() {
									$i.chosen();
									_ify.register($i, p, /.+/, 0);
								};
								if (immediate) return finish();
								setTimeout(finish, 1000);
								
							} else {
								// http://jqueryui.com/autocomplete/#multiple
								var re = new RegExp($.escapeRE(p.output) + '\\s*');
								var split = function(val) {
									return val.split(re);
								};
								var extractLast = function(term) {
									return split(term).pop();
								};
			 
								// don't navigate away from the field on tab when selecting an item
								$i.bind('keydown', function(e) {
									if (e.keyCode === $.ui.keyCode.TAB &&
										$i.data('ui-autocomplete').menu.active) {
										e.preventDefault();
									}
								}).autocomplete({
									minLength: 0,
									source: function(request, response) {
										// delegate back to autocomplete, but extract the last term
										response($.ui.autocomplete.filter(
											availableTags, extractLast(request.term)));
									},
									focus: function() {
										// prevent value inserted on focus
										return false;
									},
									select: function(event, ui) {
										var terms = split(this.value);
										// remove the current input
										terms.pop();
										// add the selected item
										terms.push(ui.item.value);
										// add placeholder to get the comma-and-space at the end
										terms.push('');
										this.value = terms.join(p.output);
										return false;
									}
								});
								var $autocomplete = $i.data('ui-autocomplete') || $i.data('uiAutocomplete') || $i.data('autocomplete'),
									ri = $autocomplete._renderItem;
			 
								$autocomplete._renderItem = function(ul, item) {
									var $li = ri.apply($autocomplete, [ul, item]),
										$a = $li.find('a');
			 
									var $t = $text.clone().append($a.contents()).appendTo($a);
									if (item.desc) $desc.clone().text(item.desc).appendTo($t);
									if (item.$icon) item.$icon.clone().addClass('wlc-listimage').prependTo($a);
									return $li;
								};
								$i.autocomplete('widget').filter('ul.ui-autocomplete').find('ul.ui-autocomplete').andSelf().addClass('wlc-autocomplete');
								_ify.register($i, p, /.+/, 0);
							}
						};
						
					$ctrl.$label = $l;
					
						
					p.output = $.trim(p.output).replace('space', ' ');

					var taglistcache = internal.taglistcache;

					taglistcache[listtype] = taglistcache[listtype] || {};
					if (listvalue in taglistcache[listtype]) {
						availableTags = taglistcache[listtype][listvalue];
						_onDataAvailable(availableTags);
					} else {
						switch (listtype) {
							case 'window':
								l = window[listvalue];
								if ('object' === typeof l) {
									for (k in l) {
										if (l.hasOwnProperty(k)) {
											v = l[k];
											availableTags.push({
												label: v + ' (' + k + ')',
												value: k
											});
										}
									}
								}
								_onDataAvailable(availableTags);
								break;
							case 'obj':
								o = window, st = listvalue.split('.');
								while (st.length) {
									o = o[st.shift()];
								}
								for (k in o) {
									if (o.hasOwnProperty(k)) {
										v = o[k];
										try {
											v = v + '';
										} catch (ex) { /* converting to string failed */ }
										if (k.indexOf(p.output) >= 0 || (v && $.isFunction(v.indexOf) && v.indexOf(p.output) >= 0)) continue;
										availableTags.push({
											label: k + ' (' + v.slice(0, 30) + (v.length > 30 ? '…' : '') + ')',
											value: k + '=' + v,
											k: k
										});
									}
								}

								if (listvalue === 'mw.user.options.values') {
									// Handle this special case: Fetch description
									$.get(mw.util.wikiGetlink('Special:Preferences'), function(r) {
										var $r = $(r),
											$labels = $r.find('label'),
											re = /:\s*$/;

										jQuery.eachAsync(availableTags, {
											loop: function(i, el) {
												var t = $labels.filter('[for="mw-input-wp' + el.k + '"]').last().text();
												if (!t) t = $labels.filter('[for="mw-input-wp' + el.k.replace('gadget', 'gadgets') + '"]').last().text();
												el.desc = t.replace(re, '');
											},
											end: function() {
												_onDataAvailable(availableTags, true);
											}
										});
									});
								} else {
									_onDataAvailable(availableTags);
								}
								break;
							case 'table':
								wlc.readTable('.' + listvalue, function(i, r, $tds) {
									v = $tds.eq(0).text();
									availableTags.push({
										value: v,
										label: $tds.eq(1).text() + ' (' + v + ')',
										$icon: $tds.eq(2).find('img')
									});
								});
								_onDataAvailable(availableTags);
								break;
						}
						taglistcache[listtype][listvalue] = availableTags;
					}

					return $ctrl;
				},
				geoedit: function(p, $pg) {
					window.Geo = Geo || {};
					var _this = this,
						w = 600,
						h = 400,
						lat = Geo.lat || 0,
						lon = Geo.lon || 0;

					var $createInputs = function(id, label, key, $geoCtrl) {
						var $l = $('<label class="wlc-input-label"></label>').text(label),
							idn = 'wlc-ip-' + id + '-from',
							idx = 'wlc-ip-' + id + '-to',
							$d1 = $('<div>').css('display', 'inline-block'),
							$d2 = $('<div>').css('display', 'inline-block'),
							$l1 = $('<label>').attr('for', idn).text('From ').appendTo($d1),
							$l2 = $('<label>').attr('for', idx).text('To ').appendTo($d2),
							$i1 = internal._numbersonly($('<input type="text" size="20"/>').attr({
								'id': idn,
								pattern: internal.floatRE.source,
								placeholder: _msg('float-placeholder')
							})).appendTo($d1),
							$i2 = internal._numbersonly($('<input type="text" size="20"/>').attr({
								'id': idx,
								pattern: internal.floatRE.source,
								placeholder: _msg('float-placeholder')
							})).appendTo($d2);

						$geoCtrl[key] = {
							from: $i1,
							to: $i2
						};
						return $('<div>').append($l, ' ', $d1, ' ', $d2);
					};

					var $ctrl = $('<div>').attr({
							'class': 'wlc-input-wrap',
							'dir': ltr
						}).css('display', 'block'),
						$map = $('<div class="wlc-mapcontainer"></div>').height(h).width(w).prependTo($ctrl),
						$iframe, $button,
						$usage = $('<div>').text(_msg('geo-usage')).hide().appendTo($ctrl),
						$waiting = $('<div class="wlc-geoctrl wlc-input-wrap"></div>').text(_msgp('geo-loading-map', 'Toolserver (OSM/Dschwen)')).appendTo($ctrl),
						$selection, $overlay, _requestCoords,
						$geoCtrl = $('<div class="wlc-geoctrl wlc-input-wrap"></div>').appendTo($ctrl),
						$lat = $createInputs('lat', "Latitude", 'lat', $geoCtrl).appendTo($geoCtrl),
						$lon = $createInputs('lon', "Longitude", 'lon', $geoCtrl).appendTo($geoCtrl),
						$geoCtrls = $geoCtrl.find('input'),
						$info = $('<div>').text(_msgp('geo-info', Geo.lat, Geo.lon, Geo.city, Geo.country)).appendTo($ctrl);

					// Ident_ify as Wikipedia (we don't want to see an image collection but labels!)
					$iframe = $('<iframe>').attr({
						scrolling: 'no',
						frameBorder: 0,
						'class': 'wlc-dschwen'
					}).css({
						width: w,
						height: h
					}).appendTo($map);

					wlc.navigation._step($pg, function() {
						// IE: You must append the iframe before setting the src attribute
						$iframe.load(function() {
							$waiting.fadeOut();
							if ($selection) _requestCoords();
						}).attr('src', '//toolserver.org/~dschwen/wma/iframe.html?' + $.param({
							wma: lat + '_' + lon + '_' + w + '_' + h + '_' + userlang + '_3_' + userlang,
							globe: 'Earth',
							lang: userlang,
							page: '',
							awt: 0
						}));
						return false;
					});

					var _cleanUp = function(e, resetCtrls) {
						$('body').unbind('mouseup.wlc-selection');
						if ($selection) $selection.remove();
						if ($overlay) $overlay.remove();
						$overlay = $selection = null;
						if (resetCtrls !== false) $geoCtrls.val('');
						$button.button({
							disabled: false
						});
						$usage.hide();
						return false;
					};
					$geoCtrls.on('input change', function() {
						_cleanUp(null, false);
					});
					$('<button role="button" type="button"></button>').text('Remove selection').button({
						icons: {
							primary: 'ui-icon-circle-close'
						}
					}).addClass('ui-button-red').click(_cleanUp).insertAfter($map);

					$button = $('<button role="button" type="button"></button>').text('Select area').button({
						icons: {
							primary: 'ui-icon-circle-plus'
						}
					}).addClass('ui-button-blue').click(function() {
						$button.button({
							disabled: true
						});
						_cleanUp();

						$usage.show();

						_requestCoords = function() {
							internal._requestCoords($iframe, $selection, $geoCtrl);
						};
						var parentOffset = $map.offset(),
							relXs, relYs, relX, relY, mousedown, isNegX, isNegY,
							_registerMouseUp = function() {
								$('body').one('mouseup.wlc-selection', function() {
									mousedown = false;
									$button.button({
										disabled: false
									});
									if ($overlay) $overlay.css('cursor', 'default');

									_requestCoords();
								});
							};

						$selection = $('<div class="wlc-selectionrect"></div>')
							.attr('title', 'You can drag me around and resize me').fadeTo(0, 0.7).prependTo($map);


						$overlay = $('<div class="wlc-map-overlay"></div>')
							.height(h).width(w).fadeTo(0, 0).prependTo($map).one('mousedown', function(e) {
							e.preventDefault();
							if (e.which !== 1) return;

							_registerMouseUp();

							relXs = e.pageX - parentOffset.left;
							relYs = e.pageY - parentOffset.top;

							$selection.css({
								top: relYs,
								left: relXs
							});
							mousedown = true;
						}).mousemove(function(e) {
							if (!mousedown) return;
							relX = e.pageX - parentOffset.left;
							relY = e.pageY - parentOffset.top;
							var diffX = relX - relXs,
								diffY = relY - relYs;

							if (diffX < 0) {
								isNegX = true;
								$selection.css('left', relX);
							} else if (isNegX) {
								isNegX = false;
								$selection.css('left', relXs);
							}
							if (diffY < 0) {
								isNegY = true;
								$selection.css('top', relY);
							} else if (isNegY) {
								isNegY = false;
								$selection.css('top', relYs);
							}
							$selection.width(Math.abs(diffX)).height(Math.abs(diffY));
						});
						$selection.draggable({
							containment: 'parent',
							stop: _requestCoords
						}).resizable({
							stop: _requestCoords
						});
					}).insertAfter($map);

					var reg = function(n) {
						_ify.register($geoCtrls.eq(n), $.extend({}, p, {
							name: p.name.split('|')[n]
						}), internal.floatRE, 0);
					};
					reg(0);
					reg(1);
					reg(2);
					reg(3);
					return $ctrl;
				},
				'float': function(p) {
					var $ctrl = $('<div>').attr('class', 'wlc-input-wrap'),
						$l = $('<label>').attr({
							'for': 'wlc-ip-' + p.name,
							'class': 'wlc-input-label'
						}).text(p.label).appendTo($ctrl),
						$i = $('<input type="text" size="40"/>').attr({
							'id': 'wlc-ip-' + p.name,
							'class': 'wlc-input',
							'pattern': internal.floatRE.source,
							'placeholder': p.placeholder || _msg('float-placeholder')
						}).appendTo($ctrl);

					$ctrl.$label = $l;
					internal._numbersonly($i);

					_ify.register($i, p, internal.floatRE, 0);
					return $ctrl;
				},
				'freetext': function(p) {
					var $ctrl = $('<div>').attr('class', 'wlc-input-wrap'),
						$l = $('<label>').attr({
							'for': 'wlc-ip-' + p.name,
							'class': 'wlc-input-label'
						}).text(p.label).appendTo($ctrl),
						$i = $('<input type="text" size="60"/>').attr({
							'id': 'wlc-ip-' + p.name,
							'class': 'wlc-input',
							'placeholder': p.placeholder || _msg('freetext-placeholder')
						}).appendTo($ctrl);

					$ctrl.$label = $l;

					_ify.register($i, p, function() { return true; }, 0);
					return $ctrl;
				}
			};
			return _ify;
		}()),
		$pages: $(),
		$publishButton: null,
		$createPage: function(id, hash, intro, outro) {
			var $pg = $('<div>'),
				$top = $('<div>').addClass('wlc-text-wrap').html(intro).appendTo($pg),
				$body = $('<div>').addClass('wlc-text-wrap').appendTo($pg),
				$bottom = $('<div>').addClass('wlc-text-wrap').html(outro).appendTo($pg),
				$buttons = $('<div>').addClass('wlc-text-wrap').appendTo($pg);

			wlc.$pages = wlc.$pages.add($pg);
			$pg.$body = $body;

			// Now, create the inputs...
			$('.wlc-paraminfo').find('tr').each(function(i, r) {
				if (0 === i) return;
				var $tds = $(r).find('td'),
					step = $tds.eq(0).text(),
					group = $tds.eq(1).text(),
					type = $tds.eq(3).text(),
					params = {
						name: $tds.eq(2).text(),
						paraminfo: $tds.eq(4).text(),
						output: $tds.eq(5).text(),
						label: $tds.eq(6).text(),
						placeholder: $tds.eq(7).text(),
						required: !! $.trim($tds.eq(8).text()),
						defaultVal: $tds.eq(9).text(),
						hash: hash
					};

				if (id !== step) return;

				var $group = wlc.groupFactory.$get(group),
					$ip = wlc.inputFactory.create[type](params, $pg);
				if (params.required && $ip.$label) $ip.$label.append($.parseHTML(_msg('input-required')));

				if ($group) {
					if ($ip) $group.$inputArea.append($ip);
					if (!$group.attached) {
						$group.attached = true;
						$body.append($group);
					}
				} else {
					if ($ip) $body.append($ip);
				}
			});
			$('<button role="button" type="button" class="wlc-backbutton"></button>').text(_msg('button-back')).button({
				disabled: (wlc.$steps.$lis.length === 0)
			}).click(wlc.navigation._prev).appendTo($buttons);

			var buttonLabel;
			if (wlc.$steps.count - 1 === Number(id)) {
				buttonLabel = _msg('button-publish');
				wlc.navigation._step($pg, wlc.navigation.lastPageHandler);
			} else {
				buttonLabel = _msg('button-proceed');
			}
			wlc.$publishButton = $('<button role="button" type="button" class="wlc-nextbutton"></button>')
				.text(buttonLabel).button({
				icons: {
					primary: 'ui-icon-circle-check'
				}
			}).click(wlc.navigation._next).appendTo($buttons);
			return $pg;
		},
		createSteps: function() {
			var $ul = wlc.$steps = $('<ul class="ui-helper-clearfix ui-state-default ui-widget ui-helper-reset wlc-steps"></ul>'),
				$trs = $('.wlc-stepinfo').find('tr'),
				$contentText = $('<div id="wlc-maincontainer"></div>').attr('dir', ltr).appendTo($('#mw-content-text').contents().hide().parent());

			$ul.plain = [];
			$ul.$lis = $();
			$ul.$as = $();
			$ul.byHash = {};
			$ul.count = $trs.length - 1;

			$trs.each(function(i, r) {
				if (0 === i) return;
				var $tds = $(r).find('td'),
					txt = $tds.eq(1).text(),
					id = $tds.eq(0).text(),
					intro = $tds.eq(2).html(),
					outro = $tds.eq(3).html(),
					hash = '#step' + id,
					$pg = wlc.$createPage(id, hash, intro, outro).hide().appendTo($contentText),
					$li = $('<li>').appendTo($ul),
					$div = $('<div>').appendTo($li),
					$a = $('<a>').attr({
						href: '#step' + id
					}).text(txt).data({
						'$pg': $pg,
						'$li': $li,
						'id': id,
						'hash': hash
					}).click(wlc.navigation._go).appendTo($div);

				$ul.plain.push(txt);
				$ul.$lis = $ul.$lis.add($li);
				$ul.$as = $ul.$as.add($a);
				$ul.byHash[hash] = $a;
			});
			$ul.arrowSteps();
			$ul.prependTo($contentText);
			if (!location.hash) {
				$ul.$lis.eq(0).find('a').click();
			} else {
				this.navigation._hash();
			}
		},
		install: function() {
			wlc.readTranslation();
			$.datepicker.setDefaults($.datepicker.regional[userlang]);
			$('#siteSub').text(_msgp('page-sub', wlc.version));
			$('#firstHeading').find('span').text(_msg('name'));
			wlc.createSteps();
			$win.bind('hashchange', wlc.navigation._hash);
		},
		/**
		 * Reads the translation from the HTML-DOM and overwrites the English default
		 * translation
		 *
		 * @example
		 *      wlc.readTranslation();
		 *
		 * @context {any} May be called in and from all contexts.
		 * @return {undefined}
		 */
		readTranslation: function() {
			var i18nNew = {};

			$.each(i18n, function(k, v) {
				var t = $('#' + k).html();
				if (t) {
					i18nNew[k] = t;
				}
			});
			mw.messages.set(i18nNew);
		}
	};

	// Expose globally
	window.watchlistMessageCreator = wlc;
	

	mw.loader.using(['jquery.arrowSteps', 'jquery.ui.button', 'jquery.ui.autocomplete', 'jquery.ui.datepicker', 'jquery.async', 'jquery.ui.draggable',
			'jquery.ui.resizable', 'jquery.json'
	], wlc.install);

}(jQuery, mediaWiki));
// </nowiki>