/* DisambiguationManagement
 *
 * Creates a button in Special:Disambiguations that displays a specialized editor for redirecting disambiguation links.
 * This was a pain in the ass to make so please bear with me if you see any bugs, try to report them on the script talk page and I'll take a look
 *
 * @author Dorumin
 */

mw.loader.using(['mediawiki.api', 'jquery.ui.autocomplete']).then(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') != 'Disambiguations' || !$('.special').length || $('#dm-button').length) return;
    var Api = new mw.Api(),
    cache = {},
    customs = {},
    suggestions = {},
    edit_index = 0,
    load_index = 4,
    load_icon = null, // set it later 'cause i18n hasn't loaded yet
    summary = '',
    init = false,
    i18n;

    function get_all_results(index, callback, merge) {
        if (cache._disambigs) {
            callback(cache._disambigs.pages, cache._disambigs.results);
            return;
        }
        update_state(i18n.msg('state-loading-disambig-results').escape());
        Api.get({
            action: 'query',
            list: 'querypage',
            qppage: 'Disambiguations',
            qplimit: 500,
            qpoffset: index
        }).done(function(data) {
            if (data['query-continue']) {
                get_all_results(index + 500, callback, data.query.querypage.results);
                return;
            }
            var r = data.query.querypage.results.concat(merge ? merge : []),
            ids = _.uniq(r.map(function(el) {
                return el.value;
            })),
            disambigs = _.uniq(r.map(function(el) {
                return el.title;
            })),
            chunks = [],
            i = ids.length;
            while (i > 0) {
                chunks.push(ids.slice(Math.max(0, i - 50), i));
                i -= 50;
            }
            $.when.apply(window, chunks.map(function(chunk) {
                return Api.get({
                    action: 'query',
                    prop: 'revisions',
                    rvprop: 'ids',
                    pageids: chunk.join('|')
                });
            })).done(function() {
                var args = arguments;
                if (chunks.length == 1) {
                    args = [[args[0]]];
                }
                var i = args.length,
                pages = [];
                while (i--) {
                    var p = args[i][0];
                    pages = pages.concat(Object.keys(p.query.pages).map(function(key) {
                        return p.query.pages[key].title;
                    }));
                }
                cache._disambigs = {
                    pages: pages,
                    results: disambigs
                };
                callback(pages, disambigs);
            });
        });
    }

    function get_possible_alternatives(disambig, callback) {
        if (cache[disambig]) {
            callback(cache[disambig]);
            return;
        }
        Api.get({
            action: 'query',
            prop: 'links',
            titles: disambig
        }).done(function(d) {
            var r = d.query.pages,
            p = r[Object.keys(r)[0]],
            links = p.links.map(function(page) {
                return page.title;
            });
            cache[disambig] = links;
            callback(links);
        });
    }

    function get_page_content(title, callback) {
        update_state(i18n.msg('state-getting-page-content').escape());
        if (cache[title]) {
            setTimeout(function() { // wait for the call stack to clear
                callback(cache[title]);
            }, 0);
            return;
        }
        Api.get({
            action: 'query',
            prop: 'revisions',
            rvprop: 'content',
            titles: title
        }).done(function(d) {
            if (!d.query) {
                callback('');
                return;
            }
            var r = d.query.pages,
            p = r[Object.keys(r)[0]],
            content = p.revisions[0]['*'];
            cache[title] = content;
            callback(content);
        });
    }

    function edit_page(title, content, callback) {
        Api.post({
            action: 'edit',
            title: title,
            text: content,
            summary: $('#dm-summary-input').val() || $('#dm-summary-input').attr('placeholder') || '',
            token: mw.user.tokens.get('editToken')
        }).done(function(d) {
            if (d.error) {
                alert('Could not edit ' + title + '. (' + d.error.code + ': ' + d.error.info + ')');
                return;
            } else {
                $('#dm-editor').removeClass('dm-loading');
                $('#dm-editor-skip').click();
            }
        });
    }

    function get_disambig_links(content, disambigs) {
        disambigs = disambigs.concat(disambigs.map(function(disambig) { // I know it looks confusing, but trust me, it makes sense.
            return disambig.charAt(0).toLowerCase() + disambig.slice(1);
        }));
        var regex = new RegExp('\\[{2}(' + disambigs.join('|') + ')(?:\\|.*?)?\\]{2}', 'gi'),
        matches = [],
        m;
        while ((m = regex.exec(content))) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            matches.push(m);
            get_possible_alternatives(m[1], $.noop); // cache that thing
        }
        return matches;
    }

    function display_editor(title, content, matches) {
        var $editor_wrap = $('<div>', {
            id: 'dm-editor',
            'data-content': content,
            'data-title': title,
            append: [
                $('<p>', {
                    css: {
                        paddingBottom: '1em'
                    }
                }).append(
                    i18n.msg('editing-header', title).escape(),
                    $('<a>', {
                        class: 'button',
                        id: 'dm-editor-skip',
                        text: i18n.msg('skip-button-text').plain(),
                        click: function(e) {
                            if ($(e.target).attr('disabled') || $(e.target).closest($editor_wrap).hasClass('dm-loading')) return;
                            load_index++;
                            edit_index++;
                            $editor_wrap.addClass('dm-loading');
                            get_all_results(0, function(titles, disambigs) {
                                var title = titles[edit_index],
                                nextTitleToLoad = titles[load_index];
                                if (!title) {
                                    $('#dm-modal').closeModal();
                                    return;
                                }
                                if (nextTitleToLoad) {
                                    get_page_content(nextTitleToLoad, $.noop);
                                }
                                get_page_content(title, function(content) {
                                    var links = get_disambig_links(content, disambigs);
                                    display_editor(title, content, links);
                                    if (!titles[edit_index + 1]) {
                                        $(e.target).attr('disabled', 'disabled');
                                    }
                                });
                            });
                        }
                    })
                ),
                $('<div>', {
                    id: 'dm-editor-editor'
                })
            ]
        }),
        $editor = $editor_wrap.find('#dm-editor-editor'),
        lines = get_lines(content, matches);
        lines[0].forEach(function(line) {
            if (line[1] === undefined) return;
            $editor.append(
                $('<div>', {
                    class: 'dm-line dm-context',
                    'data-index': line[0],
                    append: $('<div>', {
                        text: line[1].trim() ? line[1] : '&nbsp;'
                    })
                })
            );
        });
        lines[1].filter(function(el, idx, arr) {
            var i = 0;
            $.each(arr, function(_i, item) {
                if (item[0] == el[0] && item[2][0] == el[2][0]) {
                    i = _i;
                    return false;
                }
            });
            return idx == i;
        }).forEach(function(mainLine) {
            var $el = $editor.find('.dm-line[data-index="' + mainLine[0] + '"]'),
            html = $el.html(),
            escaped = escape_deep(mainLine[2][0]),
            newHTML = html
                .split(escaped)
                .join(
                    $('<div>').append(
                        $('<span>', {
                            class: 'dm-disambig-link',
                            'data-disambig': mainLine[2][1],
                            'data-match': mainLine[2][0],
                            html: escaped
                        })
                    ).html()
                );
            $el
                .attr('class', 'dm-line dm-main-line')
                .empty()
                .html(newHTML);
        });
        $editor.find('.dm-disambig-link').mouseenter(function() {
            $('.alternative-picker').remove();
            var $this = $(this),
            pos = $this.position(),
            $picker = $('<div>', {
                class: 'alternative-picker not-hovered',
                append: $('<div>', {
                    class: 'custom-disambig-wrapper',
                    append: $('<input>', {
                        class: 'custom-disambig-input',
                        value: customs[$this.data('disambig')],
                        keydown: function(e) {
                            customs[$this.data('disambig')] = this.value;
                            if (e.which != 13) return;
                            e.preventDefault();
                            $(this).blur();
                            var val = this.value,
                            title = val.split('|')[0],
                            display = val.split('|')[1];
                            $this
                                .attr('data-disambig', title)
                                .html(
                                    '[[' + 
                                    escape_deep(title) +
                                    (display ? '|' + escape_deep(display) : '') +
                                    ']]'
                                );
                        }
                    })
                    .attr('placeholder', i18n.msg('custom-input-placeholder').plain())
                    .autocomplete({
                        source: function(term, res) {
                            var page = term.term.split('|')[0].trim();
                            if (suggestions[page]) {
                                res(suggestions[page]);
                                return;
                            }
                            Api.get({
                                action: 'opensearch',
                                search: page
                            }).then(function(arr) {
                                suggestions[page] = arr[1];
                                if ($('.custom-disambig-input').val() != term.term) return;
                                res(arr[1]);
                            });
                        }
                    })
                }),
                css: {
                    top: pos.top + $this.height(),
                    left: pos.left - 20,
                    backgroundColor: $('#dm-modal').css('background-color'),
                    border: '1px solid ' + $('#dm-cancel-butt').css('border-color')
                },
                mouseenter: function() {
                    $(this).toggleClass('not-hovered');
                },
                mouseleave: function() {
                    if (!$('.custom-disambig-input').is(':focus')) {
                        $(this).remove();
                    }
                }
            });
            $editor_wrap.append($picker);
            get_possible_alternatives($this.data('disambig'), function(alts) {
                alts.forEach(function(title) {
                    $picker.prepend(
                        $('<div>', {
                            class: 'dm-picker-option',
                            text: title,
                            click: function() {
                                var match = $this.attr('data-match'),
                                disambig = $this.data('disambig');
                                $this
                                    .attr('class', 'dm-solved-disambig-link')
                                    .html(
                                        match
                                        .replace(
                                            new RegExp('(\\[{2})(' + 
                                                [
                                                    disambig,
                                                    disambig.charAt(0).toLowerCase() + disambig.slice(1)
                                                ].join('|') + ')(\\|[^\\]]*)?(\\]{2})'),
                                            function(s, c1, c2, c3, c4) {
                                                return c1 + escape_deep(title) + (c3 ? escape_deep(c3) : '|' + escape_deep(c2)) + c4;
                                            }
                                        )
                                    )
                                    .attr('data-disambig', title);
                            }
                        })
                    );
                });
            });
        }).mouseleave($.debounce(500, function() {
            $('.alternative-picker.not-hovered').remove();
        }));
        $('#dm-modal-ajax, #dm-editor').replaceWith($editor_wrap);
        if (!lines[0].length) {
            update_state(i18n.msg('state-no-links-found').escape());
            setTimeout(function() {
                $('#dm-editor-skip').click();
            }, 1000);
            return;
        }

        update_state($('<input>', {
            id: 'dm-summary-input',
            val: summary || '',
            keyup: function() {
                summary = this.value;
            }
        }).attr('placeholder', i18n.inContentLang().msg('default-summary').plain()));
    }

    function get_lines(content, matches) {
        var lines = [],
        mainLines = [],
        split = content.split('\n');
        matches.forEach(function(match) {
            var line = content.slice(0, match.index),
            index = line.split('\n').length;
            mainLines.push([index, split[index - 1], match]);
            lines = lines.concat([index - 2, index - 1, index, index + 1, index + 2]); // yeah it's ugly but it gets the job done
        });
        lines = _.uniq(lines.filter(function(index) {
            return index > 0;
        })).map(function(idx) {
            return [idx, split[idx - 1]];
        });
        return [lines, mainLines];
    }

    function escape_deep(input) { // Trust me, there's a good reason not to use mw.html.escape
        var text = document.createTextNode(input),
        span = document.createElement('span');
        span.appendChild(text);
        return span.innerHTML;
    }

    function update_links() {
        var $editor = $('#dm-editor'),
        content = $editor.data('content'),
        title = $editor.data('title'),
        lines = $editor.find('.dm-main-line'),
        split = content.split('\n');
        lines.each(function(i, line) {
            var $line = $(this);
            var index = $line.data('index') - 1,
            cur = 0,
            links = $line.find('.dm-solved-disambig-link, .dm-disambig-link');
            links.each(function() {
                var $link = $(this);
                split[index] = split[index].replace($link.data('match'), $link.text());
                cur++;
            });
        });
        $editor.addClass('dm-loading');
        edit_page(title, split.join('\n'));
    }

    function update_state(msg) {
        $('.state-indicator').html(msg);
    }

    function show_modal() {
        if ($('#dm-modal').length) return;
        $.showCustomModal(i18n.msg('modal-header').escape(), load_icon, {
            id: 'dm-modal',
            buttons: [{
                id: 'dm-cancel-butt',
                message: i18n.msg('cancel-button-text').escape(),
                handler: function() {
                    $('#dm-modal').closeModal();
                }
            }, {
                id: 'dm-update-butt',
                message: i18n.msg('update-button-text').escape(),
                handler: update_links
            }],
            callback: function($modal) {
                $modal.find('.modalToolbar').prepend('<span class="state-indicator"></span>');
                get_all_results(0, function(titles, disambigs) {
                    if (init) {
                        get_page_content(titles[edit_index], function(content) {
                            update_state('');
                            var links = get_disambig_links(content, disambigs);
                            display_editor(titles[edit_index], content, links);
                        });
                    } else {
                        for (var i = 0; i < 5; i++) {
                            var title = titles[i],
                            start_title = titles[0];
                            init = true;
                            get_page_content(title, i === 0 ? function(content) {
                                var links = get_disambig_links(content, disambigs);
                                display_editor(start_title, content, links);
                            } : $.noop); // shut up editor
                        }
                    }
                });
            }
        });
    }
    mw.hook('dev.i18n').add(function(lib) {
        lib.loadMessages('DisambiguationManagement').done(function(_i18n) {
            i18n = _i18n;
            i18n.useUserLang();
            load_icon = $('<img>', {
                id: 'dm-modal-ajax',
                src: window.stylepath + '/common/images/ajax.gif',
                alt: i18n.msg('loading').plain(),
                title: i18n.msg('loading').plain()
            });
            $('.mw-spcontent p').first().append(
                $('<p>').append(
                    $('<a>', {
                        class: 'button',
                        id: 'dm-button',
                        text: i18n.msg('resolve-button-text').plain(),
                        click: show_modal
                    })
                )
            );
        });
    });
    
    // I18n-js
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });

    // Adding some CSS to make it look extra sexy
    importArticles({
        type: 'style',
        articles: [
            'u:dev:MediaWiki:DisambiguationManagement.css'
        ]
    });

    // And some dynamic css for good measure
    mw.util.addCSS('.dm-picker-option:hover {' +
        'background-color: ' + $('<div>', {
            class: 'accent',
            appendTo: 'body'
        }).css('background-color') +
    '}');
    $('.accent').last().remove();
});