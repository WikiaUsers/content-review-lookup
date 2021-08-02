/* DupeArgs
 *
 * Finds pages with templates that have duplicate parameters, and reports them
 * @author Dorumin
 */
/* jshint maxerr: 99999 */

(function() {
	var loading = [
		'dorui',
		'modal',
		'api'
	];
	var ui;
	var api;
	var refs = {};

    function deepQuery(args) {
        return new Promise(function(_resolve) {
            var onResult = args.onResult;
            var extra = args.extra || {};
            var params = Object.assign({}, args.params, extra);
            var resolve = args.resolve || _resolve;

            api.get(params).then(function(data) {
                var shouldStop = onResult(data);

                if (shouldStop !== true && data['continue']) {
                    deepQuery({
                        onResult: onResult,
                        resolve: resolve,
                        extra: data['continue'],
                        params: args.params
                    });
                } else {
                    resolve();
                }
            });
        });
    }

	function nextIgnoreRanges(start, str, char, ranges) {
		var i = start;

		outer:
		while (true) {
			i = str.indexOf(char, i + 1);

			if (i === -1) {
				break;
			}

			for (var j = 0; j < ranges.length; j++) {
				var range = ranges[j];

				if (range.start <= i && i < range.end) {
					continue outer;
				}
			}

			break;
		}

		return i;
	}

	// Hacky add-on, grab link ranges and <gallery> ranges
	// For ignoring pipes inside
	function grabIgnoreRanges(text) {
		var ranges = [];
		var regex = /(?:\[\[[^\]]+\]\]|\[\[[^\|]+\|[^\]]*\]\]|<(gallery)>[\s\S]*?<\/\1>)/g;
		var match;

		while ((match = regex.exec(text)) !== null) {
			ranges.push({
				start: match.index,
				end: match.index + match[0].length
			});
		}

		return ranges;
	}

	function parseArg(arg) {
		var parsed = parseTemplates(arg).concat(grabIgnoreRanges(arg));
		var nextEq = nextIgnoreRanges(0, arg, '=', parsed);

		if (nextEq === -1) {
			return {
				inline: true,
				value: arg
			};
		} else {
			return {
				inline: false,
				key: arg.slice(0, nextEq),
				value: arg.slice(nextEq + 1)
			};
		}
	}

	function parseTemplate(template) {
		var name = '';
		var args = [];

		var inner = template.source.slice(2, -2);
		var firstPipe = inner.indexOf('|');
		if (firstPipe === -1) {
			name = inner;
		} else {
			name = inner.slice(0, firstPipe);

			var after = inner.slice(firstPipe + 1);
			var parsed = parseTemplates(after).concat(grabIgnoreRanges(after));
			var last = 0;
			var argIndex = 1;

			while (true) {
				var nextPipe = nextIgnoreRanges(last, after, '|', parsed);

				var argText;
				if (nextPipe === -1) {
					argText = after.slice(last);

					// Stupid hack for piped stuff
					if (argText === '|') {
						argText = '';
						last = after.length;
						nextPipe = 0;
					}
				} else {
					argText = after.slice(last, nextPipe);

					// Stupid hack for empty piped args
					if (argText.charAt(0) === '|') {
						argText = argText.slice(1);

						if (argText === '') {
							last = nextPipe;
						} else {
							last = nextPipe + 1;

							var arg = parseArg('');
							if (arg.inline) {
								arg.key = argIndex.toString();
								argIndex++;

								// for debug order stuff
								var value = arg.value;
								delete arg.value;
								arg.value = value;
							}

							args.push(arg);
						}
					} else {
						last = nextPipe + 1;
					}
				}

				var arg = parseArg(argText);
				if (arg.inline) {
					arg.key = argIndex.toString();
					argIndex++;

					// for debug order stuff
					var value = arg.value;
					delete arg.value;
					arg.value = value;
				}

				args.push(arg);

				if (nextPipe === -1) {
					break;
				}
			}
		}

		return {
			name: name,
			args: args,
			source: template.source
		};
	}

	// Parses top-level templates
	// And gives you key-value as the arguments
	// Duplicates are NOT removed, whitespace IS preserved
	// Argument names are not normalized
	// This is lossless parsing, but it does not handle {{{1}}} well at all
	function parseTemplates(text, parsed) {
		var templates = [];
		var braces = 0;
		var last = false;
		var start = -1;

		for (var i = 0; i < text.length; i++) {
			var char = text[i];

			switch (char) {
				case '{':
					if (text[i+1] === '|') return templates; // Check for table syntax

					braces++;

					if (last) {
						start = i - 1;
						last = false;
					} else {
						if (start === -1) {
							last = true;
						}
					}
					break;
				case '}':
					if (braces > 0) {
						braces--;
					}

					if (braces === 0 && start !== -1) {
						var templateSource = text.slice(start, i + 1);
						var template = {
							start: start,
							end: i + 1,
							source: templateSource
						};
						template.parsed = parseTemplate(template);
						if (parsed) {
							templates.push(template.parsed);
						} else {
							templates.push(template);
						}

						start = -1;
					}

					last = false;
					break;
				default:
					last = false;
					break;
			}
		}

		return templates;
	}

	function normalizeArgName(name) {
		// Does _ have to be turned to " "?
		return name.trim().toLowerCase();
	}

	function getPageDupes(page) {
		var dupes = [];
		var templates = parseTemplates(page.content);

		for (var i = 0; i < templates.length; i++) {
			var argmap = {};
			var template = templates[i].parsed;

			for (var j = 0; j < template.args.length; j++) {
				var arg = template.args[j];
				var name = normalizeArgName(arg.key);

				if (argmap.hasOwnProperty(name)) {
					console.log(page.title, name);
					dupes.push(template);
					break;
				}

				argmap[name] = true;
			}
		}

		return dupes;
	}

	function nonBreaking(str) {
		return str.replace(/ /g, String.fromCharCode(160));
	}

	function buildDupe(dupe) {
		var dupeKeys = Object.values(dupe.argmap)
			.filter(function(args) {
				return args.length > 1;
			})
			.map(function(args) {
				return args[0].key;
			});

		return ui.div({
			class: 'page-duplicate-template',
			children: [
				ui.div({
					text: 'Duplicates: ' + dupeKeys.join(', ')
				}),
				ui.pre({
					style: {
						whiteSpace: 'pre-line',
						overflowWrap: 'break-word'
					},
					children: [
						'{{',
						nonBreaking(dupe.template.name),
						ui.frag(
							dupe.template.args.map(function(arg) {
								var name = normalizeArgName(arg.key);

								if (arg.inline) {
									var text = '|' + arg.value;

									if (dupe.argmap[name].length > 1) {
										return ui.span({
											style: {
												color: 'red'
											},
											text: text
										});
									} else {
										return text;
									}
								} else {
									var text = '|' + nonBreaking(arg.key) + '=' + arg.value;

									if (dupe.argmap[name].length > 1) {
										return ui.span({
											class: "param",
											style: {
												color: 'red'
											},
											children: [ui.span({ class: "keyvalue", children: [
												ui.span({ class: "pipe", text: "|" }),
												ui.span({ class: "key", text: nonBreaking(arg.key) }),
												ui.span({ class: "keyvalue-equals", text: '=' }),
												ui.span({ class: 'value', text: arg.value }),
											] })],
											events: {
												click(e) {
													if ($(this).is(".active-textbox")) 
														return e.preventDefault(), e.stopImmediatePropagation();
													
													if (e.ctrlKey) removeDupes.call(this, dupe, text, e);
													else renameTemplateParams.call(this, e, arg.key, dupe, arg);
												},
											},
										});
									} else {
										return text;
									}
								}
							})
						),
						'}}'
					]
				})
			]
		});
	}

	function removeDupes(dupe, text, e) {
		var $this = $(this);
		var pos = $this.parent().children().toArray().indexOf(this);
		var chosenKey = $this.text().split(/\s*=\s*/).shift().slice(1).trim();

		var count = 0;

		var text = dupe.template.source;
		var regex = dupe.template.args
			.map(({ key, value }) => {
				return { key: normalizeArgName(key), value };
			})
			.filter(({ key }) => dupe.argmap[key].length > 1)
			.filter(({ key }) => chosenKey === key.trim())
			.map(({ key, value }) => new RegExp(mw.RegExp.escape('|' + key + '=' + value).replace(/\s*=\s*/, '\\s*=\\s*')));

		while (regex.length > 0) {
			console.log(regex);
			text = text.replace(regex.shift(), function(s) {
				if (count++ === pos) return s;
				else return '';
			});
		}

		text = dupe.page.revisions[0].slots.main["*"].replace(dupe.template.source, text.replaceAll(String.fromCharCode(160), ' '));

		dupe.template = parseTemplates(text)[0].parsed;
		dupe.page.revisions[0].slots.main["*"] = text;

		for (var j = 0; j < dupe.template.args.length; j++) {
			var arg = dupe.template.args[j];
			var name = normalizeArgName(arg.key);

			dupe.argmap[name] = [];
			dupe.argmap[name].push(arg);
		}	

		var $elements = $this.parent()
			.children()
			.not(this)
			.filter(function() {
				return $(this).text().slice(1).trim().startsWith(chosenKey);
			});

		$elements.hide('slow', function() { 
			$(this).remove();

			if (!--$elements.length) {
				$this.addClass('fixed').css({ color: "inherit" });

				if (!$this.parent().find('.param:not(.fixed)').length) {
					$this.parents('.page-report').hide('slow', function() { 
						$(this).remove();
					}); 

					new mw.Api().edit(dupe.page.title, function() { 
						return {
							text,
							bot: true,
							minor: true,
							summary: "Fixing Duplicate template arguments",
						};
					}).then(e => {
						console.log(e);
						mw.notify("Succesfully fixed duplicate argument on \"" + dupe.page.title + "\"");
					}, console.warn);
				}
			}
		});
	}

	function renameTemplateParams(e, oldKey, dupe, arg) {
		console.log(dupe);
		var content = dupe.page.revisions[0].slots.main["*"];
		oldKey = oldKey.trim();
	
		$(this).addClass('active-textbox').find('.key').hide().after($('<input>', {
			value: oldKey,
			type: "text",
			keyup(e) {
				var $this = $(this);

				if (e.key === 'Enter' && !this.value.trim() !== oldKey && this.value.trim() !== "") {
					var par = $this.parents('pre');
					var newKey = this.value;

					$this
						.parents('.param')
						.filter('.param')
							.removeClass('active-textbox')
							.addClass('fixed')
							.css({ color: "inherit" })
								.find('.key')
								.off()
							.end();

					var $remaining = $this.parents('.param').parent().find('.param:not(.fixed)');

					$this
						.prev()
							.show()
							.text(newKey)
						.next()
						.remove();

					var text = content.replace(dupe.template.source, par.text().replaceAll(String.fromCharCode(160), ' '));

					dupe.template = parseTemplates(text)[0].parsed;
					dupe.page.revisions[0].slots.main["*"] = text;
		
					for (var j = 0; j < dupe.template.args.length; j++) {
						var arg = dupe.template.args[j];
						var name = normalizeArgName(arg.key);
			
						dupe.argmap[name] = [];
						dupe.argmap[name].push(arg);
					}	

					if ($remaining.length <= 1) {
						$remaining.css({ color: "inherit" })
							.find('.key')
							.off()
						.end()
						.parents('.page-report')
							.hide('slow', function() { $(this).remove(); });

						new mw.Api().edit(dupe.page.title, () => {
							return {
								text,
								summary: "Fixing Duplicate template arguments",
								bot: true,
								minor: true,
							}
						}).then(e => {
							mw.notify("Succesfully fixed duplicate argument on \"" + dupe.page.title + "\"");
							console.log(e);
						}, console.warn);
					}
				} else if (e.key === 'Esc' || this.value.trim() === oldKey || (this.value.trim() === "" && e.key === "Enter")) 								$this.prev().show().next().remove().end().parents('.active-textbox').removeClass('active-textbox');
			},
		})).next().focus();
	}	

	function reportDupes(page, content, dupes) {
		var dupes = [];
		var templates = parseTemplates(content);

		for (var i = 0; i < templates.length; i++) {
			var argmap = {};
			var template = templates[i].parsed;
			var hasDupes = false;

			for (var j = 0; j < template.args.length; j++) {
				var arg = template.args[j];
				var name = normalizeArgName(arg.key);

				if (!argmap.hasOwnProperty(name)) {
					argmap[name] = [];
				} else {
					hasDupes = true;
				}

				argmap[name].push(arg);
			}

			if (hasDupes) {
				dupes.push({
					template: template,
					argmap: argmap,
					page: page,
				});
			}
		}

		refs.dupeList.appendChild(
			ui.div({
				class: 'page-report',
				children: [
					ui.h2({
						class: 'page-title',
						child: ui.a({
							href: mw.util.getUrl(page.title),
							text: page.title
						})
					}),
					ui.div({
						class: 'page-duplicate-templates',
						children: dupes.map(buildDupe)
					})
				]
			})
		);
	}


    function fetchAllDupes() {
        var pagesFetched = 0;

        deepQuery({
            onResult: function(data) {
                var pages = Object.values(data.query.pages);

                for (var i in pages) {
                    var page = pages[i];

                    if (!page.hasOwnProperty('revisions')) continue;

                    pagesFetched++;

                    var content = page.revisions[0].slots.main['*'];
                    var dupes = getPageDupes({
                        title: page.title,
                        content: content
                    });

                    if (dupes.length !== 0) {
                        reportDupes(page, content, dupes);
                    }
                }

                refs.status.textContent = 'Fetched ' + pagesFetched + ' pages...';
            },
            params: {
                action: 'query',
                generator: 'categorymembers',
                gcmtitle: 'Category:Pages using duplicate arguments in template calls',
                gcmlimit: 'max',
                // gcmnamespace: '*',
                prop: 'revisions',
                rvprop: 'content',
                rvslots: 'main'
            }
        }).then(function() {
            refs.status.textContent = 'Done!';
        });
    }

	function showModal() {
		var dupeList;
		var $modal = dev.showCustomModal('DupeArgs', {
			content: ui.div({
				children: [
					'Searching for pages with duplicate arguments..',
					refs.status = ui.div(),
					refs.dupeList = ui.div({
						id: 'dupe-list'
					})
				]
			}),
			buttons: [
				{
					message: 'Close',
					handler: function() {
						dev.showCustomModal.closeModal($modal);
						refs = {};
					}
				}
			]
		});

		fetchAllDupes();
	}

	function init() {
		var tools = document.getElementById('my-tools-menu');
		if (tools === null) return;

		tools.appendChild(
			ui.li({
				class: 'custom',
				child: ui.a({
					id: 'MassCat-tools-button',
					href: '#',
					text: 'DupeArgs'
				}),
				events: {
					click: showModal
				}
			})
		);
	}

	function onload(label, arg) {
		switch (label) {
			case 'dorui':
				ui = arg;
				break;
			case 'api':
				api = new mw.Api();
				break;
		}

		var index = loading.indexOf(label);
		if (index === -1) {
			throw new Error('Unregistered dependency loaded: ' + label);
		}

		loading.splice(index, 1);

		if (loading.length === 0) {
			init();
		}
	}

	function preload() {
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:Dorui.js',
				'u:dev:MediaWiki:ShowCustomModal.js'
			]
		});

		mw.hook('doru.ui').add(onload.bind(null, 'dorui'));
		mw.hook('dev.showCustomModal').add(onload.bind(null, 'modal'));
		mw.loader.using('mediawiki.api').then(onload.bind(null, 'api'));
	}

	preload();

	window.DupeArgs = {
		loading: loading
	};
})();