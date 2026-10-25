/**
 * MediaWiki:出场.js — appearance panel, version 2.0.2.
 *
 * Input: .ql-ap-source elements rendered by Module:出场. Each source contains
 * one season and its episode records in data-* attributes.
 * Output: a season selector, appearance filters, and expandable episode tiles.
 *
 * Data flow: readSeason() -> enhance() -> render() -> renderSelection().
 * Episode data comes from the rendered page. This file makes no network calls
 * and uses textContent for titles, labels, and notes.
 *
 * Entry point: the MediaWiki wikipage.content hook, or DOMContentLoaded in the
 * standalone preview. window.QLAppearances exposes init(), get(), and version.
 *
 * Maintain this file as readable source when publishing to MediaWiki:出场.js.
 */
(function (window, document) {
    'use strict';
    if (window.QLAppearances) {
        return;
    }
    var labels = {
        Y: '主演',
        S: '半主演',
        B: '客串',
        G: '政治段客串',
        X: '外维度出场',
        N: '未出场',
        U: '形式待标注'
    };
    var shorts = { Y: '主', S: '半', B: '客', G: '政', X: '外', N: '无', U: '—' };
    var codes = ['Y', 'S', 'B', 'G', 'X', 'N'];
    var instances = new WeakMap();
    var serial = 0;

    // DOM helpers. Text arguments are inserted as text, including source notes.
    function el(tag, cls, text) {
        var node = document.createElement(tag);
        if (cls) {
            node.className = cls;
        }
        if (text !== undefined) {
            node.textContent = String(text);
        }
        return node;
    }
    function button(cls, text) {
        var node = el('button', cls, text);
        node.type = 'button';
        return node;
    }
    function dot(code) {
        var node = el('span', 'ql-ap-dot');
        node.dataset.status = code;
        node.setAttribute('aria-hidden', 'true');
        return node;
    }
    // Accept site-relative links and HTTP(S) URLs for episode titles.
    function safeHref(href) {
        return /^(?:\/(?!\/)|https?:\/\/)/i.test(href || '') ? href : '';
    }

    // Read and validate the records that Lua has already rendered on this page.
    // kinds[0] carries the primary category chosen by Lua (Y > S > B > G > X).
    function readSeason(node) {
        var seen = new Set();
        var records = Array.from(node.querySelectorAll('.ql-ap-tile'))
            .map(function (cell) {
                var id = cell.dataset.episode;
                if (!id || seen.has(id)) {
                    return null;
                }
                seen.add(id);
                var kinds = (cell.dataset.kinds || cell.dataset.status || 'U')
                    .split(',')
                    .filter(function (code, i, all) {
                        return (
                            (codes.indexOf(code) !== -1 || code === 'U') && all.indexOf(code) === i
                        );
                    });
                if (!kinds.length) {
                    kinds = ['U'];
                }
                var value = cell.dataset.label || id;
                return {
                    id: id,
                    label: /^\d+$/.test(value) ? value.padStart(2, '0') : value,
                    fullLabel:
                        cell.dataset.fullLabel || node.dataset.seasonLabel + ' · 第' + id + '集',
                    kinds: kinds,
                    status: kinds[0],
                    title: cell.dataset.title || '',
                    href: safeHref(
                        cell.dataset.href ||
                            (cell.querySelector('a') &&
                                cell.querySelector('a').getAttribute('href'))
                    ),
                    present:
                        cell.dataset.present === '1' ||
                        kinds.some(function (code) {
                            return code !== 'N' && code !== 'U';
                        }),
                    note: cell.dataset.note || ''
                };
            })
            .filter(Boolean);
        return { id: node.dataset.season, label: node.dataset.seasonLabel || '', records: records };
    }
    // MediaWiki may insert empty paragraphs or deduplicated style references
    // between season blocks. Skip those nodes when locating the next block.
    function adjacent(node) {
        var next = node.nextElementSibling;
        while (
            next &&
            (next.matches('style[data-mw-deduplicate], link[rel="mw-deduplicated-inline-style"]') ||
                (next.matches('p, .mw-empty-elt') &&
                    !next.textContent.trim() &&
                    !next.querySelector('img, video, audio')))
        ) {
            next = next.nextElementSibling;
        }
        return next;
    }
    // Merge adjacent season blocks into one panel with its own local state.
    function enhance(nodes) {
        var card = nodes[0];
        var seasons = nodes.map(readSeason);
        if (
            seasons.some(function (s) {
                return !s.id || !s.records.length;
            })
        ) {
            return;
        }
        var defaultSeason =
            seasons.find(function (s) {
                return s.id === card.dataset.defaultSeason;
            }) || seasons[0];
        var state = {
            season: defaultSeason.id,
            view: card.dataset.view === 'index' ? 'index' : 'grid',
            filter: card.dataset.filter === 'all' ? 'all' : 'related',
            selected: null
        };
        var heading = card.dataset.heading || '出场';
        var componentId = 'ql-ap-' + ++serial;
        var tiles = [];
        var animations = [];
        var header = el('div', 'ql-ap-header');
        header.appendChild(el('span', 'ql-ap-heading', heading));
        var select;
        if (seasons.length > 1) {
            select = el('select', 'ql-ap-season');
            select.setAttribute('aria-label', '选择季数或番外篇');
            seasons.forEach(function (s) {
                var option = el('option', '', s.label);
                option.value = s.id;
                select.appendChild(option);
            });
            select.addEventListener('change', function () {
                state.season = select.value;
                state.selected = null;
                render();
                announce();
            });
            header.appendChild(select);
        } else {
            header.appendChild(el('span', 'ql-ap-season-static', seasons[0].label));
        }
        // Build the view controls and per-category filters once per panel.
        var toolbar = el('div', 'ql-ap-toolbar');
        var views = el('div', 'ql-ap-views');
        views.setAttribute('role', 'group');
        views.setAttribute('aria-label', '浏览方式');
        var viewButtons = {};
        [
            ['grid', '集数'],
            ['index', '形式']
        ].forEach(function (spec) {
            var control = button('ql-ap-view', spec[1]);
            control.dataset.view = spec[0];
            control.addEventListener('click', function () {
                state.view = spec[0];
                render();
                announce();
            });
            viewButtons[spec[0]] = control;
            views.appendChild(control);
        });
        toolbar.appendChild(views);
        var filters = el('div', 'ql-ap-filters');
        filters.setAttribute('role', 'group');
        filters.setAttribute('aria-label', '筛选出场形式');
        var filterButtons = {};
        [
            ['all', '全部'],
            ['related', '有出场']
        ]
            .concat(
                codes.map(function (c) {
                    return [c, labels[c]];
                })
            )
            .forEach(function (spec) {
                var control = button('ql-ap-filter');
                control.dataset.filter = spec[0];
                control.dataset.status = spec[0];
                if (codes.indexOf(spec[0]) !== -1) {
                    control.appendChild(dot(spec[0]));
                }
                control.appendChild(el('span', '', spec[1]));
                var count = el('span', 'ql-ap-count');
                control.appendChild(count);
                control.addEventListener('click', function () {
                    state.filter = spec[0];
                    render();
                    announce();
                });
                filterButtons[spec[0]] = { button: control, count: count };
                filters.appendChild(control);
            });
        var content = el('div', 'ql-ap-content');
        var live = el('span', 'ql-ap-announcement');
        live.setAttribute('aria-live', 'polite');
        live.setAttribute('aria-atomic', 'true');
        card.replaceChildren(header, toolbar, filters, content, live);
        card.classList.remove('ql-ap-source');
        card.classList.add('ql-ap-enhanced');
        card.setAttribute('role', 'region');
        card.setAttribute('aria-label', heading);
        nodes.slice(1).forEach(function (node) {
            node.remove();
        });
        function current() {
            return seasons.find(function (s) {
                return s.id === state.season;
            });
        }
        function shown() {
            return current().records.filter(function (r) {
                return (
                    state.filter === 'all' ||
                    (state.filter === 'related' ? r.present : r.kinds.indexOf(state.filter) !== -1)
                );
            });
        }
        function stopAnimations() {
            animations.forEach(function (a) {
                a.cancel();
            });
            animations = [];
        }
        function motionAllowed() {
            return (
                content.animate &&
                !(
                    window.matchMedia &&
                    window.matchMedia('(prefers-reduced-motion: reduce)').matches
                )
            );
        }
        function animate(node, frames) {
            var animation = node.animate(frames, {
                duration: 340,
                easing: 'cubic-bezier(.22,1,.36,1)'
            });
            animations.push(animation);
        }
        // Measure the grid to keep expanded titles readable on narrow screens.
        function resizeGrids() {
            content.querySelectorAll('.ql-ap-grid').forEach(function (grid) {
                var style = window.getComputedStyle(grid);
                var columns = style.gridTemplateColumns.split(' ').filter(function (v) {
                    return /^\d/.test(v);
                }).length;
                if (!columns) {
                    var minimum = parseFloat(style.getPropertyValue('--qa-tile-size')) || 60;
                    columns = Math.max(1, Math.floor((grid.clientWidth + 10) / (minimum + 10)));
                }
                grid.style.setProperty('--qa-open-span', Math.min(4, columns));
                grid.dataset.columns = String(columns);
            });
        }
        // Clicking an episode toggles its title. Closing restores keyboard focus.
        function choose(record, trigger) {
            state.selected = state.selected === record.id ? null : record.id;
            renderSelection(true);
            if (!state.selected && trigger) {
                trigger.focus({ preventScroll: true });
            }
            announce();
        }
        function makeTile(record, contextCode) {
            var item = el('div', 'ql-ap-item');
            // A G/X filter may include a record whose primary category is Y/S/B.
            // The tile keeps that primary category; the detail lists all kinds.
            var code = record.status;
            item.dataset.status = code;
            var tile = button('ql-ap-tile');
            tile.dataset.episode = record.id;
            tile.dataset.status = code;
            var tileId = componentId + '-detail-' + tiles.length;
            tile.setAttribute('aria-controls', tileId);
            tile.setAttribute('aria-expanded', 'false');
            tile.setAttribute(
                'aria-label',
                record.fullLabel +
                    '，' +
                    record.kinds
                        .map(function (c) {
                            return labels[c];
                        })
                        .join('、') +
                    '，' +
                    record.title
            );
            var number = el('span', 'ql-ap-number', record.label);
            if (!/^\d+$/.test(record.label)) {
                number.classList.add('ql-ap-special-number');
            }
            tile.append(number, el('span', 'ql-ap-short', shorts[record.status]));
            tile.addEventListener('click', function () {
                choose(record, tile);
            });
            item.appendChild(tile);
            var reveal = el('div', 'ql-ap-reveal');
            reveal.id = tileId;
            reveal.hidden = true;
            var text = el('div', 'ql-ap-reveal-text');
            var title = el(
                record.href ? 'a' : 'span',
                'ql-ap-detail-title',
                record.title || record.fullLabel
            );
            if (record.href) {
                title.href = record.href;
            }
            text.appendChild(title);
            if (record.kinds.length > 1) {
                text.appendChild(
                    el(
                        'span',
                        'ql-ap-detail-kinds',
                        record.kinds
                            .map(function (c) {
                                return labels[c];
                            })
                            .join(' · ')
                    )
                );
            }
            if (record.note) {
                text.appendChild(el('span', 'ql-ap-note', record.note));
            }
            var close = button('ql-ap-close', '×');
            close.setAttribute('aria-label', '收起剧集名称');
            close.addEventListener('click', function () {
                choose(record, tile);
            });
            reveal.append(text, close);
            item.appendChild(reveal);
            tiles.push({ item: item, tile: tile, reveal: reveal, record: record });
            return item;
        }
        // FLIP animation: measure the old layout, apply the expanded state, then
        // animate from the old rectangles to the new ones. The reduced-motion
        // preference disables this animation through motionAllowed().
        function renderSelection(withMotion) {
            var shouldAnimate = withMotion && motionAllowed();
            var before = shouldAnimate
                ? tiles.map(function (t) {
                      return t.item.getBoundingClientRect();
                  })
                : [];
            var oldHeight = content.getBoundingClientRect().height;
            stopAnimations();
            // Use the remaining space in this row when the title can fit there.
            tiles.forEach(function (t) {
                t.item.classList.remove('is-expanded');
                t.item.style.gridColumn = '';
                t.reveal.hidden = true;
            });
            tiles.forEach(function (t) {
                var expanded = t.record.id === state.selected;
                if (expanded) {
                    var grid = t.item.parentNode;
                    var columns = Number(grid.dataset.columns) || 1;
                    var index = Array.prototype.indexOf.call(grid.children, t.item);
                    var available = columns - (index % columns);
                    var span = Math.min(4, available >= 3 ? available : columns);
                    t.item.style.gridColumn = 'span ' + span;
                }
                t.item.classList.toggle('is-expanded', expanded);
                t.tile.setAttribute('aria-expanded', String(expanded));
                t.reveal.hidden = !expanded;
            });
            if (shouldAnimate) {
                var afterRects = tiles.map(function (t) {
                    return t.item.getBoundingClientRect();
                });
                var newHeight = content.getBoundingClientRect().height;
                tiles.forEach(function (t, i) {
                    var after = afterRects[i];
                    var first = before[i];
                    if (!after.width || !first.width) {
                        return;
                    }
                    var from = {
                        transform:
                            'translate(' +
                            (first.left - after.left) +
                            'px,' +
                            (first.top - after.top) +
                            'px) scale(' +
                            first.width / after.width +
                            ',' +
                            first.height / after.height +
                            ')'
                    };
                    animate(t.item, [from, { transform: 'translate(0,0) scale(1,1)' }]);
                    if (!t.reveal.hidden) {
                        animate(t.reveal, [
                            { opacity: 0, transform: 'translateX(-8px)' },
                            { opacity: 1, transform: 'translateX(0)' }
                        ]);
                    }
                });
                if (Math.abs(oldHeight - newHeight) > 1) {
                    animate(content, [{ height: oldHeight + 'px' }, { height: newHeight + 'px' }]);
                }
            }
        }
        content.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && state.selected) {
                var selected = tiles.find(function (t) {
                    return t.record.id === state.selected;
                });
                if (selected) {
                    choose(selected.record, selected.tile);
                    event.preventDefault();
                }
            }
        });
        function makeGroup(code) {
            var records = current().records.filter(function (r) {
                return r.kinds.indexOf(code) !== -1;
            });
            var group = el('div', 'ql-ap-group');
            group.dataset.status = code;
            var label = el('div', 'ql-ap-group-label');
            label.append(
                dot(code),
                el('span', '', labels[code]),
                el('span', 'ql-ap-count', records.length)
            );
            var grid = el('div', 'ql-ap-grid ql-ap-group-episodes');
            records.forEach(function (r) {
                grid.appendChild(makeTile(r, code));
            });
            if (!records.length) {
                grid.appendChild(el('span', 'ql-ap-empty', '暂无'));
            }
            group.append(label, grid);
            return group;
        }
        // Rebuild episode content after changing the season, view, or filter.
        // Category counts may overlap; the related count is per unique episode.
        function render() {
            stopAnimations();
            tiles = [];
            var counts = {
                all: current().records.length,
                related: 0,
                Y: 0,
                S: 0,
                B: 0,
                G: 0,
                X: 0,
                N: 0
            };
            current().records.forEach(function (r) {
                r.kinds.forEach(function (c) {
                    if (counts[c] !== undefined) {
                        counts[c]++;
                    }
                });
                if (r.present) {
                    counts.related++;
                }
            });
            if (select) {
                select.value = state.season;
            }
            Object.keys(viewButtons).forEach(function (v) {
                viewButtons[v].setAttribute('aria-pressed', String(v === state.view));
            });
            Object.keys(filterButtons).forEach(function (f) {
                filterButtons[f].button.setAttribute('aria-pressed', String(f === state.filter));
                filterButtons[f].count.textContent = counts[f];
            });
            filters.hidden = state.view !== 'grid';
            content.replaceChildren();
            if (state.view === 'grid') {
                var records = shown();
                if (
                    !records.some(function (r) {
                        return r.id === state.selected;
                    })
                ) {
                    state.selected = null;
                }
                var grid = el('div', 'ql-ap-grid');
                grid.setAttribute('aria-label', '集数');
                records.forEach(function (r) {
                    grid.appendChild(makeTile(r));
                });
                content.appendChild(records.length ? grid : el('div', 'ql-ap-empty', '暂无记录'));
            } else {
                ['Y', 'S', 'B', 'G', 'X'].forEach(function (c) {
                    content.appendChild(makeGroup(c));
                });
                if (
                    current().records.some(function (r) {
                        return r.kinds.indexOf('U') !== -1;
                    })
                ) {
                    content.appendChild(makeGroup('U'));
                }
                if (counts.N) {
                    var absence = el('details', 'ql-ap-absence');
                    absence.appendChild(el('summary', '', '未出场 ' + counts.N));
                    absence.appendChild(makeGroup('N'));
                    absence.open = current().records.some(function (r) {
                        return r.id === state.selected && r.status === 'N';
                    });
                    content.appendChild(absence);
                }
            }
            resizeGrids();
            renderSelection(false);
        }
        // Public state is used by the standalone preview. Validate incoming
        // values against the panel's available seasons and supported controls.
        function snapshot() {
            return {
                version: 3,
                season: state.season,
                view: state.view,
                filter: state.filter,
                selected: state.selected
            };
        }
        // Keep screen-reader announcements and preview state in sync.
        function announce() {
            var r = current().records.find(function (record) {
                return record.id === state.selected;
            });
            live.textContent = r
                ? r.fullLabel +
                  '，' +
                  r.kinds
                      .map(function (c) {
                          return labels[c];
                      })
                      .join('、') +
                  '，' +
                  r.title
                : current().label +
                  '，' +
                  (state.view === 'grid' ? shown().length + ' 集' : '按形式浏览');
            card.dispatchEvent(
                new CustomEvent('qlappearancechange', { bubbles: true, detail: snapshot() })
            );
        }
        instances.set(card, {
            getState: snapshot,
            setState: function (value) {
                if (!value) {
                    return;
                }
                if (
                    seasons.some(function (s) {
                        return s.id === String(value.season);
                    })
                ) {
                    state.season = String(value.season);
                }
                if (['grid', 'index'].indexOf(value.view) !== -1) {
                    state.view = value.view;
                }
                if (['all', 'related'].concat(codes).indexOf(value.filter) !== -1) {
                    state.filter = value.filter;
                }
                state.selected = current().records.some(function (r) {
                    return r.id === String(value.selected);
                })
                    ? String(value.selected)
                    : null;
                render();
            }
        });
        render();
        if (window.ResizeObserver) {
            var width = 0;
            var observer = new ResizeObserver(function (entries) {
                var nextWidth = entries[0].contentRect.width;
                if (Math.abs(nextWidth - width) > 1) {
                    width = nextWidth;
                    resizeGrids();
                    renderSelection(false);
                }
                if (!card.isConnected) {
                    observer.disconnect();
                }
            });
            observer.observe(card);
        } else {
            window.addEventListener('resize', resizeGrids);
        }
    }
    // The content hook can run repeatedly. Process source blocks and stop a
    // merge at another character, heading, duplicate season, or article content.
    function init(scope) {
        scope = scope && scope.jquery ? scope[0] : scope;
        scope = scope && scope.querySelectorAll ? scope : document;
        var sources = Array.from(scope.querySelectorAll('.ql-ap-source'));
        if (scope.matches && scope.matches('.ql-ap-source')) {
            sources.unshift(scope);
        }
        sources.forEach(function (source) {
            if (!source.classList.contains('ql-ap-source') || !source.parentNode) {
                return;
            }
            var nodes = [source],
                used = [source.dataset.season],
                next = adjacent(source);
            while (
                next &&
                next.matches('.ql-ap-source') &&
                next.dataset.group === source.dataset.group &&
                next.dataset.heading === source.dataset.heading &&
                used.indexOf(next.dataset.season) === -1
            ) {
                nodes.push(next);
                used.push(next.dataset.season);
                next = adjacent(next);
            }
            enhance(nodes);
        });
    }
    window.QLAppearances = {
        version: '2.0.2',
        init: init,
        get: function (node) {
            return instances.get(node);
        }
    };
    // Use the wiki content hook on Fandom and DOM readiness in local previews.
    if (window.mw && window.mw.hook) {
        window.mw.hook('wikipage.content').add(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            init(document.getElementById('appearance-explorer') || document);
        });
    } else {
        init(document.getElementById('appearance-explorer') || document);
    }
})(window, document);