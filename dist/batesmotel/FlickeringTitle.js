/* Bates Neon v3: select the letters; the existing CSS controls their blinking. */
(function () {
    'use strict';

    if (window.BatesNeonTitles) {
        window.BatesNeonTitles.refresh();
        return;
    }

    const HEADER_SELECTOR = '.page-header__title';
    const LETTER_CLASS = 'bates-neon-letter';
    const MIN_WORD_LETTERS = 1;
    const IGNORE = 'script, style, svg, button, .mw-editsection, ' +
        '[aria-hidden="true"], [contenteditable="true"]';
    const WORDS = /[\p{L}\p{M}\p{N}]+(?:['\u2019][\p{L}\p{M}\p{N}]+)*/gu;
    const HAS_LETTER = /\p{L}/u;
    const timing = {
        scriptStartedMs: performance.now(),
        readyStateAtStart: document.readyState,
        firstTitleFoundMs: null,
        firstTitleProcessedMs: null,
        firstTitleProcessingMs: null,
        processedTitles: 0
    };
    performance.mark('bates-neon:script-start');

    let segmenter;
    let records = new WeakMap();
    const pending = new Set();
    let queued = false;
    let paused = false;

    function letters(word) {
        // English titles need no locale segmentation setup.
        if (/^[A-Za-z0-9'\u2019]+$/.test(word)) {
            return Array.from(word.matchAll(/[A-Za-z]/g)).map(function (match) {
                return { index: match.index, text: match[0] };
            });
        }
        if (segmenter === undefined) {
            segmenter = typeof Intl.Segmenter === 'function'
                ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;
        }
        if (segmenter) {
            return Array.from(segmenter.segment(word)).filter(function (item) {
                return HAS_LETTER.test(item.segment);
            }).map(function (item) {
                return { index: item.index, text: item.segment };
            });
        }
        return Array.from(word.matchAll(/\p{L}\p{M}*/gu)).map(function (match) {
            return { index: match.index, text: match[0] };
        });
    }

    function apply(header) {
        if (!header.isConnected) { return; }
        const root = header.querySelector('.mw-page-title-main') || header;
        const previous = records.get(header);
        if (previous && previous.root === root && previous.text === root.textContent &&
                previous.groups.every(function (group) {
                    return group.parts.every(function (p) { return root.contains(p); }) &&
                        group.parts.map(function (p) { return p.textContent; }).join('') === group.text;
                })) {
            return; // Ordinary wiki updates leave the selected letters in place.
        }

        const started = performance.now();
        if (timing.firstTitleFoundMs === null) { timing.firstTitleFoundMs = started; }
        root.querySelectorAll('span.blinking, span.' + LETTER_CLASS).forEach(function (span) {
            span.replaceWith.apply(span, Array.from(span.childNodes));
        });
        header.dataset.neonProcessed = '1';
        header.dataset.batesNeonVersion = '3';

        let text = '';
        const runs = [];
        function collect(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                runs.push({ node: node, start: text.length, end: text.length + node.length });
                text += node.nodeValue;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.matches(IGNORE) || node.tagName === 'BR') {
                    text += '\n';
                } else {
                    Array.from(node.childNodes).forEach(collect);
                }
            }
        }
        Array.from(root.childNodes).forEach(collect);

        const groups = [];
        const edits = new Map();
        for (const match of text.matchAll(WORDS)) {
            const candidates = letters(match[0]);
            if (candidates.length < MIN_WORD_LETTERS) { continue; }
            const chosen = candidates[Math.floor(Math.random() * candidates.length)];
            const start = match.index + chosen.index;
            const end = start + chosen.text.length;
            const group = { text: chosen.text, parts: [] };
            groups.push(group);
            runs.forEach(function (run) {
                if (run.start >= end || run.end <= start) { return; }
                if (!edits.has(run.node)) { edits.set(run.node, []); }
                edits.get(run.node).push({
                    start: Math.max(start, run.start) - run.start,
                    end: Math.min(end, run.end) - run.start,
                    group: group
                });
            });
        }

        // Replace only affected text nodes; preserve links, emphasis and handlers.
        edits.forEach(function (pieces, node) {
            const fragment = document.createDocumentFragment();
            let cursor = 0;
            pieces.forEach(function (piece) {
                fragment.appendChild(document.createTextNode(node.nodeValue.slice(cursor, piece.start)));
                const span = document.createElement('span');
                span.className = LETTER_CLASS;
                span.textContent = node.nodeValue.slice(piece.start, piece.end);
                if (paused) { span.style.setProperty('animation-play-state', 'paused', 'important'); }
                piece.group.parts.push(span);
                fragment.appendChild(span);
                cursor = piece.end;
            });
            fragment.appendChild(document.createTextNode(node.nodeValue.slice(cursor)));
            node.replaceWith(fragment);
        });

        // A combining accent can cross markup boundaries. Keep its fragments in time.
        groups.forEach(function (group) {
            if (group.parts.length < 2) { return; }
            const style = getComputedStyle(group.parts[0]);
            if (style.animationName !== 'none') {
                group.parts.forEach(function (part) {
                    part.style.setProperty('animation-duration', style.animationDuration, 'important');
                });
            }
        });

        records.set(header, { root: root, text: root.textContent, groups: groups });
        timing.processedTitles++;
        if (timing.firstTitleProcessedMs === null) {
            timing.firstTitleProcessedMs = performance.now();
            timing.firstTitleProcessingMs = timing.firstTitleProcessedMs - started;
            performance.mark('bates-neon:first-title-processed');
        }
    }

    function find(node) {
        if (node.nodeType !== Node.ELEMENT_NODE) { return; }
        if (node.matches(HEADER_SELECTOR)) { pending.add(node); }
        node.querySelectorAll(HEADER_SELECTOR).forEach(function (h) { pending.add(h); });
    }

    function collectChanges(changes) {
        changes.forEach(function (change) {
            const element = change.target.nodeType === Node.ELEMENT_NODE
                ? change.target : change.target.parentElement;
            const header = element && element.closest(HEADER_SELECTOR);
            if (header) { pending.add(header); }
            change.addedNodes.forEach(find);
        });
    }

    function watch() {
        observer.observe(document.documentElement || document, {
            childList: true, characterData: true, subtree: true
        });
    }

    function flush() {
        // Preserve mutations queued since the observer's last callback.
        collectChanges(observer.takeRecords());
        observer.disconnect();
        queued = false;
        const headers = Array.from(pending);
        pending.clear();
        try { headers.forEach(apply); }
        finally { watch(); }
    }

    function refresh() {
        document.querySelectorAll(HEADER_SELECTOR).forEach(function (h) { pending.add(h); });
        flush();
    }

    const observer = new MutationObserver(function (changes) {
        collectChanges(changes);
        if (pending.size && !queued) {
            queued = true;
            queueMicrotask(flush);
        }
    });

    function round(value) {
        return typeof value === 'number' ? Math.round(value * 100) / 100 : null;
    }

    function diagnostics() {
        const nav = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByName('first-contentful-paint')[0];
        const selected = Array.from(document.querySelectorAll(HEADER_SELECTOR + ' .' + LETTER_CLASS));
        return {
            version: '3.0-css-blink',
            scriptStartedMs: round(timing.scriptStartedMs),
            firstContentfulPaintMs: paint ? round(paint.startTime) : null,
            domContentLoadedMs: nav ? round(nav.domContentLoadedEventStart) : null,
            readyStateAtScriptStart: timing.readyStateAtStart,
            firstTitleFoundMs: round(timing.firstTitleFoundMs),
            firstTitleProcessedMs: round(timing.firstTitleProcessedMs),
            firstTitleProcessingMs: round(timing.firstTitleProcessingMs),
            processedTitles: timing.processedTitles,
            selectedLetters: selected.length,
            cssAnimation: selected.length ? getComputedStyle(selected[0]).animationName : null,
            oldDimmingAnimations: selected.reduce(function (count, element) {
                return count + element.getAnimations().filter(function (a) {
                    return a.id === 'bates-neon-flicker';
                }).length;
            }, 0)
        };
    }

    window.BatesNeonTitles = {
        version: '3.0-css-blink',
        refresh: refresh,
        diagnostics: diagnostics,
        reroll: function () { records = new WeakMap(); refresh(); },
        setPaused: function (value) {
            paused = Boolean(value);
            document.querySelectorAll(HEADER_SELECTOR + ' .' + LETTER_CLASS).forEach(function (span) {
                if (paused) { span.style.setProperty('animation-play-state', 'paused', 'important'); }
                else { span.style.removeProperty('animation-play-state'); }
            });
        }
    };

    // Process existing titles synchronously. If parsing has not reached the title,
    // the observer handles it as soon as its markup is inserted.
    refresh();
    if (window.mw && typeof window.mw.hook === 'function') {
        window.mw.hook('wikipage.content').add(refresh);
    }
})();