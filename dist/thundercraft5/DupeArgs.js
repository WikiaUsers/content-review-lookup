/* DupeArgs
 *
 * Finds pages with templates that have duplicate parameters, and reports them
 * Resolution coming now
 *
 * @author Dorumin
 */
 
/* jshint maxerr: 999999, esversion: 6, undef: true, jquery: true */

/* global mw, dev, importArticles */

(() => {
	let loading = [
			'dorui',
			'modal',
			'banners',
			'api'
		],
		ui,
		BannerNotification,
		api,
		refs = {},
		config = window.DupeArgs || {},
		lastSummary = config.summary || "";

	function deepQuery(args) {
		return new Promise(_resolve => {
			let onResult = args.onResult;
			let extra = args.extra || {};
			let params = Object.assign({}, args.params, extra);
			let resolve = args.resolve || _resolve;

			api.get(params).then(data => {
				let shouldStop = onResult(data);

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
		let i = start;

		outer:
		while (true) {
			i = str.indexOf(char, i + 1);

			if (i === -1) {
				break;
			}

			for (let j = 0; j < ranges.length; j++) {
				let range = ranges[j];

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
		let ranges = [];
		let regex = /(?:\[\[[^\]]+\]\]|\[\[[^\|]+\|[^\]]*\]\]|<(gallery)>[\s\S]*?<\/\1>)/g;
		let match;

		while ((match = regex.exec(text)) !== null) {
			ranges.push({
				start: match.index,
				end: match.index + match[0].length
			});
		}

		return ranges;
	}

	function parseArg(arg) {
		let parsed = parseTemplates(arg).concat(grabIgnoreRanges(arg));
		let nextEq = nextIgnoreRanges(0, arg, '=', parsed);

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
		let name = '';
		let args = [];

		let inner = template.source.slice(2, -2);
		let firstPipe = inner.indexOf('|');
		if (firstPipe === -1) {
			name = inner;
		} else {
			name = inner.slice(0, firstPipe);

			let after = inner.slice(firstPipe + 1);
			let parsed = parseTemplates(after).concat(grabIgnoreRanges(after));
			let last = 0;
			let argIndex = 1;

			while (true) {
				let nextPipe = nextIgnoreRanges(last, after, '|', parsed);

				let argText;
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

							let arg = parseArg('');
							if (arg.inline) {
								arg.key = argIndex.toString();
								argIndex++;

								// for debug order stuff
								let value = arg.value;
								delete arg.value;
								arg.value = value;
							}

							args.push(arg);
						}
					} else {
						last = nextPipe + 1;
					}
				}

				let arg = parseArg(argText);
				if (arg.inline) {
					arg.key = argIndex.toString();
					argIndex++;

					// for debug order stuff
					let value = arg.value;
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
		let templates = [];
		let braces = 0;
		let last = false;
		let start = -1;

		for (let i = 0; i < text.length; i++) {
			let char = text[i];

			switch (char) {
				case '{':
					if (text[i+1] === '|') continue; // Check for table syntax
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
						let templateSource = text.slice(start, i + 1);
						let template = {
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
		// No, and neither does it have to be lowercased
		// But HTML comments do have to be stripped
		return name.replace(/<!--[\s\S]+?-->/g, '').trim();
	}

	function getPageDupes(page) {
		let dupes = [];
		let templates = parseTemplates(page.content);

		for (let i = 0; i < templates.length; i++) {
			let argmap = {};
			let template = templates[i];
			let hasDupes = false;

			for (let j = 0; j < template.parsed.args.length; j++) {
				let arg = template.parsed.args[j];
				let name = normalizeArgName(arg.key);

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
					argmap: argmap
				});
			}
		}

		return dupes;
	}

	function nonBreaking(str) {
		return str.replace(/ /g, String.fromCharCode(160));
	}

	function replaceRanges(string, replacements) {
		let buffer = '';
		let last = 0;

		for (let i = 0; i < replacements.length; i++) {
			let replacement = replacements[i];

			buffer += string.slice(last, replacement.start);
			buffer += replacement.string;

			last = replacement.end;
		}

		buffer += string.slice(last, string.length);

		return buffer;
	}

	function onResolve(page, dupes, e) {
		let pageParent = e.target.closest('.page-report');
		let templates = pageParent.querySelectorAll('.page-duplicate-template');
		let chosen = Array.from(templates).map(template => {
			let spans = template.querySelectorAll('pre span');
			let argmap = {};
			let finished = [];

			spans.forEach(span => {
				let arg = span.getAttribute('data-arg');

				if (!argmap.hasOwnProperty(arg)) {
					argmap[arg] = -1;
				}

				if (!finished.includes(arg)) {
					argmap[arg] += 1;

					if (span.classList.contains('chosen')) {
						finished.push(arg);
					}
				}
			});

			return argmap;
		});

		let newContent = replaceRanges(
			page.content,
			dupes.map((dupe, index) => {
				let template = '{{' + dupe.template.parsed.name;

				let seen = {};

				for (let i = 0; i < dupe.template.parsed.args.length; i++) {
					let arg = dupe.template.parsed.args[i];
					let name = normalizeArgName(arg.key);

					if (!seen.hasOwnProperty(name)) {
						seen[name] = -1;
					}

					seen[name] += 1;

					if (!chosen[index].hasOwnProperty(name) || chosen[index][name] === seen[name]) {
						// if (chosen[index][name] === seen[name]) {
						//	 console.log('Found ' + name, chosen[index], seen[name]);
						// }

						if (arg.inline) {
							template += '|' + arg.value;
						} else {
							template += '|' + arg.key + '=' + arg.value;
						}
					}
				}

				template += '}}';

				return {
					start: dupe.template.start,
					end: dupe.template.end,
					string: template
				};
			})
		);

		let result = doEdit(page.title, newContent);
		if (result === null) return;

		$(pageParent).hide('slow');

		result.then(() => {
			pageParent.scrollIntoView();
			pageParent.remove();
		}).catch(e => {
			console.warn(e);
			$(pageParent).show('slow');
		});
	}

	function doEdit(title, newContent) {
		return api.postWithToken('csrf', {
			action: 'edit',
			title: title,
			text: newContent,
			summary: "Fixing duplicate arguments",
			minor: true,
			bot: true,
			token: mw.user.tokens.get('editToken')
		});
	}

	function onRedSpanClick(e) {
		let name = e.target.getAttribute('data-arg');
		let chosen = e.target.classList.contains('chosen');

		let parent = e.target.closest('.page-duplicate-template');
		let page = parent.closest('.page-report');
		let resolve = page.querySelector('.page-resolve-row');

		// Clear all chosen colors
		parent.querySelectorAll('.chosen').forEach(span => {
			if (span.getAttribute('data-arg') === name) {
				span.classList.remove('chosen');
				span.style.color = 'red';
			}
		});

		// Toggle the clicked span color
		if (chosen) {
			e.target.style.color = 'red';
			e.target.classList.remove('chosen');
		} else {
			e.target.style.color = '#0ff';
			e.target.classList.add('chosen');
		}

		// Show/hide the resolve button on whether any were chosen
		if (page.querySelector('.chosen') === null) {
			resolve.style.display = 'none';
		} else {
			resolve.style.display = 'block';
		}
	}

	function buildDupe(dupe) {
		let dupeKeys = Object.values(dupe.argmap)
			.filter(args => {
				return args.length > 1;
			})
			.map(args => {
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
						nonBreaking(dupe.template.parsed.name),
						ui.frag(
							dupe.template.parsed.args.map(arg => {
								let name = normalizeArgName(arg.key);

								if (arg.inline) {
									let text = '|' + arg.value;

									if (dupe.argmap[name].length > 1) {
										return ui.span({
											class: 'arg-span',
											'data-arg': name,
											style: {
												color: 'red'
											},
											events: {
												click: onRedSpanClick
											  },
											text: text
										});
									} else {
										return text;
									}
								} else {
									let text = '|' + nonBreaking(arg.key) + '=' + arg.value;

									if (dupe.argmap[name].length > 1) {
										return ui.span({
											'data-arg': name,
											style: {
												color: 'red'
											},
											events: {
												click: onRedSpanClick
											},
											text: text
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

	function reportDupes(page, dupes) {
		refs.dupeList.appendChild(
			ui.div({
				class: 'page-report',
				children: [
					ui.h2({
						class: 'page-title',
						children: [
							ui.a({
								href: mw.util.getUrl(page.title),
								text: page.title
							}),
							' (',
							ui.a({
								href: mw.util.getUrl(page.title, {
									action: 'edit'
								}),
								text: 'edit'
							}),
							')'
						]
					}),
					ui.div({
						class: 'page-duplicate-templates',
						children: dupes.map(buildDupe)
					}),
					ui.div({
						class: 'page-resolve-row',
						style: {
							display: 'none'
						},
						children: [
							ui.a({
								class: 'wikia-button',
								events: {
									click: onResolve.bind(null, page, dupes)
								},
								text: 'Resolve'
							})
						]
					})
				]
			})
		);
	}

	function fetchAllDupes() {
		let pagesFetched = 0;

		deepQuery({
			onResult(data) {
				let pages = Object.values(data.query.pages);

				for (let i in pages) {
					let page = pages[i];

					if (!page.hasOwnProperty('revisions')) continue;

					pagesFetched++;

					let content = page.revisions[0].slots.main['*'];

					let dupes = getPageDupes({
						title: page.title,
						content: content
					});

					if (dupes.length !== 0) {
						reportDupes({
							title: page.title,
							content: content
						}, dupes);
					}
				}

				refs.status.textContent = 'Fetched ' + pagesFetched + ' pages...';
			},
			params: {
				action: 'query',
				// generator: 'allpages',
				// gaplimit: 'max',
				// gapnamespace: '2',
				generator: 'categorymembers',
				gcmtitle: 'Category:Pages using duplicate arguments in template calls',
				gcmlimit: 'max',
				// gcmnamespace: '*',
				prop: 'revisions',
				rvprop: 'content',
				rvslots: 'main'
			}
		}).then(() => {
			refs.status.textContent = 'Done!';
		});
	}

	function showModal() {
		let $modal = dev.showCustomModal('DupeArgs', {
			width: 500,
			content: ui.div({
				children: [
					'Searching for pages with duplicate arguments...',
					refs.status = ui.div(),
					refs.dupeList = ui.div({
						id: 'dupe-list'
					})
				]
			}),
			buttons: [
				{
					message: 'Close',
					handler() {
						dev.showCustomModal.closeModal($modal);
						refs = {};
					}
				}
			]
		});

		fetchAllDupes();
	}

	function init() {
		let tools = document.getElementById('my-tools-menu');
		if (tools === null) return;

		tools.appendChild(
			ui.li({
				class: 'custom',
				child: ui.a({
					id: 'MassCat-tools-button',
					href: '#',
					text: 'Remove Duplicate Arguments',
				}),
				events: {
					click(e) {
						e.preventDefault();
						showModal();
					}
				}
			})
		);
	}

	function onload(label, arg) {
		switch (label) {
			case 'dorui':
				ui = arg;
				break;
			case 'banners':
				BannerNotification = arg;
				break;
			case 'api':
				api = new mw.Api();
				break;
		}

		let index = loading.indexOf(label);
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
				'u:dev:MediaWiki:BannerNotification.js',
				'u:dev:MediaWiki:ShowCustomModal.js'
			]
		});

		mw.hook('doru.ui').add(onload.bind(null, 'dorui'));
		mw.hook('dev.banners').add(onload.bind(null, 'banners'));
		mw.hook('dev.showCustomModal').add(onload.bind(null, 'modal'));
		mw.loader.using('mediawiki.api').then(onload.bind(null, 'api'));
	}

	preload();

	window.DupeArgs = {
		loading: loading
	};
})();