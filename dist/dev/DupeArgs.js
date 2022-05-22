/* DupeArgs
 *
 * Finds pages with templates that have duplicate parameters, and reports them
 * Resolution coming now
 *
 * @author Dorumin
 */

(function() {
    var loading = [
        'dorui',
        'modal',
        'banners',
        'api',
        'messages'
    ];
    var ui;
    var BannerNotification;
    var api;
    var refs = {};
    var config = window.DupeArgs || {};
    var lastSummary = config.summary || "";
    var categoryName;

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
        // No, and neither does it have to be lowercased
        // But HTML comments do have to be stripped
        return name.replace(/<!--[\s\S]+?-->/g, '').trim();
    }

    function getPageDupes(page) {
        var dupes = [];
        var templates = parseTemplates(page.content);

        for (var i = 0; i < templates.length; i++) {
            var argmap = {};
            var template = templates[i];
            var hasDupes = false;

            for (var j = 0; j < template.parsed.args.length; j++) {
                var arg = template.parsed.args[j];
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
        var buffer = '';
        var last = 0;

        for (var i = 0; i < replacements.length; i++) {
            var replacement = replacements[i];

            buffer += string.slice(last, replacement.start);
            buffer += replacement.string;

            last = replacement.end;
        }

        buffer += string.slice(last, string.length);

        return buffer;
    }

    function onResolve(page, dupes, e) {
        var pageParent = e.target.closest('.page-report');
        var templates = pageParent.querySelectorAll('.page-duplicate-template');
        var chosen = Array.from(templates).map(function(template) {
            var spans = template.querySelectorAll('pre span');
            var argmap = {};
            var finished = [];

            spans.forEach(function(span) {
                var arg = span.getAttribute('data-arg');

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

        var newContent = replaceRanges(
            page.content,
            dupes.map(function(dupe, index) {
                var template = '{{' + dupe.template.parsed.name;

                var seen = {};

                for (var i = 0; i < dupe.template.parsed.args.length; i++) {
                    var arg = dupe.template.parsed.args[i];
                    var name = normalizeArgName(arg.key);

                    if (!seen.hasOwnProperty(name)) {
                        seen[name] = -1;
                    }

                    seen[name] += 1;

                    if (!chosen[index].hasOwnProperty(name) || chosen[index][name] === seen[name]) {
                        // if (chosen[index][name] === seen[name]) {
                        //     console.log('Found ' + name, chosen[index], seen[name]);
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

        var result = doEdit(page.title, newContent);
        if (result === null) return;

        pageParent.style.opacity = '0.5';

        result.then(function() {
            pageParent.scrollIntoView();
            pageParent.remove();
        })['catch'](function(e) {
            console.log(e);
            pageParent.style.opacity = '';
        });
    }

    function doEdit(title, newContent) {
        // console.log(newContent);
        // window.nc = newContent;
        var ug = mw.config.get('wgUserGroups');

        var summary = prompt('Hit me with your edit summary, baby', lastSummary);
        if (summary === null) return null;

        lastSummary = summary;

        return api.postWithToken('csrf', {
            action: 'edit',
            title: title,
            text: newContent,
            summary: summary,
            minor: true,
            // The user group check is intentional. We do not want groups that
            // have the right to mark their edits as bot edits, but aren't
            // explicitly in one of the bot groups, to hide their edits using
            // this script from RecentChanges.
            bot: (ug.includes('bot') || ug.includes('bot-global')),
            token: mw.user.tokens.get('csrfToken')
        });
    }

    function onRedSpanClick(e) {
        var name = e.target.getAttribute('data-arg');
        var chosen = e.target.classList.contains('chosen');

        var parent = e.target.closest('.page-duplicate-template');
        var page = parent.closest('.page-report');
        var resolve = page.querySelector('.page-resolve-row');

        // Clear all chosen colors
        parent.querySelectorAll('.chosen').forEach(function(span) {
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
                        nonBreaking(dupe.template.parsed.name),
                        ui.frag(
                            dupe.template.parsed.args.map(function(arg) {
                                var name = normalizeArgName(arg.key);

                                if (arg.inline) {
                                    var text = '|' + arg.value;

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
                                    var text = '|' + nonBreaking(arg.key) + '=' + arg.value;

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
                gcmtitle: 'Category:' + categoryName,
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
        var $modal = dev.showCustomModal('DupeArgs', {
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
                    click: function(e) {
                        e.preventDefault();
                        showModal();
                    }
                }
            })
        );
    }

    function getCategoryName() {
        var msg = 'duplicate-args-category';
        var lang = mw.config.get('wgContentLanguage');
        var resp
        if (lang === mw.config.get('wgUserLanguage')) {
            resp = api.loadMessagesIfMissing([msg]).then(function() {
                categoryName = mw.message(msg).plain();
            });
        } else {
            resp = api.getMessages([msg], {
                amlang: lang
            }).then(function(messages) {
                categoryName = messages[msg];
            });
        }
        resp.then(onload.bind(null, 'messages'));
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
                getCategoryName();
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