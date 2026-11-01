/* Умное автодополнение CSS, переменных вики и Emmet (ES2024+) */
(async () => {
    'use strict';
    if (window.FandomCSSIntelliSenseMainLoaded) return;
    window.FandomCSSIntelliSenseMainLoaded = true;

    const SNIPPETS_URL = 'https://wikicorporate.fandom.com/ru/index.php?title=MediaWiki:Custom-CSSSnippets.json&action=raw&ctype=application/json';
    const CACHE_KEY = 'wci_snippets_v1';

    const loadSnippetsDB = async () => {
        try {
            const cached = sessionStorage.getItem(CACHE_KEY);
            if (cached) return JSON.parse(cached);
        } catch {}

        try {
            const res = await fetch(SNIPPETS_URL);
            if (res.ok) {
                const data = await res.json();
                try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch {}
                return data;
            }
        } catch (e) {
            console.warn('[CSSIntelliSense] Не удалось загрузить Custom-CSSSnippets.json:', e);
        }

        return { emmet: {}, values: {}, functions: [], pseudos: [], atRules: [], knownVars: [] };
    };

    const getBrowserCSSProperties = () => {
        const props = new Set();
        const style = getComputedStyle(document.documentElement);
        for (let i = 0; i < style.length; i++) {
            const p = style[i];
            if (!p.startsWith('-webkit-') && !p.startsWith('-moz-') && !p.startsWith('--')) {
                props.add(p);
            }
        }
        return Array.from(props).sort();
    };

    const ALL_PROPERTIES = getBrowserCSSProperties();

    const scoreMatch = (query, target) => {
        const q = query.toLowerCase();
        const t = target.toLowerCase();
        if (t === q) return 100;
        if (t.startsWith(q)) return 80;
        const initials = t.split('-').map(part => part[0] || '').join('');
        if (initials.startsWith(q)) return 75;
        let qi = 0;
        for (let ti = 0; ti < t.length && qi < q.length; ti++) {
            if (t[ti] === q[qi]) qi++;
        }
        return qi === q.length ? 40 : 0;
    };

    const isColorValue = (str) => /^(#[0-9a-f]{3,8}|rgb|hsl|oklch|light-dark|color-mix)/i.test(str);

    const db = await loadSnippetsDB();
    const EMMET_SNIPPETS = db.emmet ?? {};
    const PROPERTY_VALUES = db.values ?? {};
    const CSS_FUNCTIONS = db.functions ?? [];
    const PSEUDO_CLASSES = db.pseudos ?? [];
    const AT_RULES = db.atRules ?? [];
    const KNOWN_VARS = db.knownVars ?? [];

    const collectCustomVariables = (editorText = '') => {
        const vars = new Map();
        const computedBody = getComputedStyle(document.body);
        const computedRoot = getComputedStyle(document.documentElement);

        for (const v of KNOWN_VARS) {
            const val = computedBody.getPropertyValue(v).trim() || computedRoot.getPropertyValue(v).trim();
            if (val) vars.set(v, val);
        }

        const varRegex = /(--[a-zA-Z0-9_-]+)\s*:\s*([^;}\r\n]+)/g;
        for (const m of editorText.matchAll(varRegex)) {
            vars.set(m[1], m[2].trim());
        }
        return vars;
    };

    const attachToAce = (editor) => {
        if (editor.container.dataset.wciAttached === 'true') return;
        editor.container.dataset.wciAttached = 'true';

        const Range = window.ace.require('ace/range').Range;
        const session = editor.getSession();

        const menu = document.createElement('div');
        menu.className = 'wiki-css-intellisense';
        document.body.appendChild(menu);

        let items = [];
        let selectedIdx = 0;
        let currentCtx = null;
        let isInserting = false;
        let cachedVars = collectCustomVariables(session.getValue());

        setInterval(() => {
            cachedVars = collectCustomVariables(session.getValue());
        }, 4000);

        const closeMenu = () => {
            menu.classList.remove('is-open');
            items = [];
            currentCtx = null;
        };

        const detectContext = () => {
            if (!editor.getSelection().isEmpty()) return null;
            const pos = editor.getCursorPosition();
            const line = session.getLine(pos.row);
            const before = line.slice(0, pos.column);

            const token = session.getTokenAt(pos.row, pos.column);
            if (token && /comment|string/.test(token.type)) return null;

            const varMatch = before.match(/(var\(\s*)?(--[\w-]*)$/);
            if (varMatch) {
                return { kind: 'variable', prefix: varMatch[2], row: pos.row, startCol: pos.column - varMatch[2].length };
            }

            const atMatch = before.match(/@([\w-]*)$/);
            if (atMatch) {
                return { kind: 'atrule', prefix: '@' + atMatch[1], row: pos.row, startCol: pos.column - atMatch[0].length };
            }

            const valMatch = before.match(/^\s*([-\w]+)\s*:\s*([^;{}]*)$/);
            if (valMatch) {
                const propName = valMatch[1].toLowerCase();
                const wordMatch = valMatch[2].match(/([\w-]+)$/);
                const prefix = wordMatch ? wordMatch[1] : '';
                if (!prefix && !/\s$/.test(before)) return null;
                return { kind: 'value', property: propName, prefix, row: pos.row, startCol: pos.column - prefix.length };
            }

            const pseudoMatch = before.match(/(:{1,2}[\w-]*)$/);
            if (pseudoMatch) {
                return { kind: 'pseudo', prefix: pseudoMatch[1], row: pos.row, startCol: pos.column - pseudoMatch[1].length };
            }

            const propMatch = before.match(/^(\s*)([a-zA-Z][\w-]*)$/);
            if (propMatch && propMatch[2].length >= 2) {
                return { kind: 'property', prefix: propMatch[2], row: pos.row, startCol: propMatch[1].length };
            }

            return null;
        };

        const buildSuggestions = (ctx) => {
            const results = [];
            const p = ctx.prefix.toLowerCase();

            if (ctx.kind === 'variable') {
                for (const [name, val] of cachedVars.entries()) {
                    if (name.toLowerCase().includes(p)) {
                        results.push({
                            label: name,
                            insert: name,
                            meta: val.slice(0, 18),
                            swatch: isColorValue(val) ? val : null,
                            score: name.toLowerCase().startsWith(p) ? 90 : 60
                        });
                    }
                }
            } else if (ctx.kind === 'atrule') {
                for (const rule of AT_RULES) {
                    const name = rule.split(/[\s{]/)[0];
                    if (name.startsWith(p)) {
                        results.push({ label: name, insert: rule, meta: '@-rule', score: 90 });
                    }
                }
            } else if (ctx.kind === 'pseudo') {
                for (const ps of PSEUDO_CLASSES) {
                    if (ps.toLowerCase().startsWith(p)) {
                        results.push({ label: ps.replace('|', ''), insert: ps, meta: 'pseudo', score: 90 });
                    }
                }
            } else if (ctx.kind === 'value') {
                const propVals = PROPERTY_VALUES[ctx.property] ?? [];
                for (const v of propVals) {
                    const sc = ctx.prefix ? scoreMatch(ctx.prefix, v) : 85;
                    if (sc > 0) results.push({ label: v, insert: v, meta: 'val', score: sc + 10 });
                }
                if (ctx.prefix) {
                    for (const fn of CSS_FUNCTIONS) {
                        const fnName = fn.split('(')[0];
                        const sc = scoreMatch(ctx.prefix, fnName);
                        if (sc > 0) results.push({ label: fn.replace('|', ''), insert: fn, meta: 'fn()', score: sc });
                    }
                }
            } else if (ctx.kind === 'property') {
                for (const [abbr, expansion] of Object.entries(EMMET_SNIPPETS)) {
                    if (abbr.startsWith(p)) {
                        results.push({
                            label: `${abbr} ➔ ${expansion.replace('|', '')}`,
                            insert: expansion,
                            meta: 'Emmet',
                            score: abbr === p ? 120 : 95
                        });
                    }
                }
                for (const prop of ALL_PROPERTIES) {
                    const sc = scoreMatch(p, prop);
                    if (sc > 0) results.push({ label: prop, insert: `${prop}: |;`, meta: 'CSS', score: sc });
                }
            }

            return results.sort((a, b) => b.score - a.score || a.label.localeCompare(b.label)).slice(0, 14);
        };

        const updatePosition = () => {
            if (!currentCtx || !menu.classList.contains('is-open')) return;
            const coords = editor.renderer.textToScreenCoordinates(currentCtx.row, currentCtx.startCol);
            const lineHeight = editor.renderer.lineHeight || 20;
            const menuRect = menu.getBoundingClientRect();

            let top = coords.pageY + lineHeight + 4;
            if (top + menuRect.height > window.innerHeight - 8) {
                top = coords.pageY - menuRect.height - 4;
            }
            const left = Math.max(8, Math.min(coords.pageX, window.innerWidth - menuRect.width - 8));

            menu.style.top = `${top}px`;
            menu.style.left = `${left}px`;
        };

        const highlightItem = () => {
            const children = menu.children;
            for (let i = 0; i < children.length; i++) {
                children[i].classList.toggle('is-selected', i === selectedIdx);
            }
            children[selectedIdx]?.scrollIntoView({ block: 'nearest' });
        };

        const applyCompletion = (item) => {
            if (!item || !currentCtx) return;
            const pos = editor.getCursorPosition();
            const rawInsert = item.insert;
            const pipeIdx = rawInsert.indexOf('|');
            const cleanInsert = rawInsert.replace('|', '');

            isInserting = true;
            try {
                session.replace(new Range(currentCtx.row, currentCtx.startCol, pos.row, pos.column), cleanInsert);
                if (pipeIdx !== -1) {
                    const beforePipe = rawInsert.slice(0, pipeIdx);
                    const lines = beforePipe.split('\n');
                    const targetRow = currentCtx.row + lines.length - 1;
                    const targetCol = lines.length === 1
                        ? currentCtx.startCol + lines[0].length
                        : lines[lines.length - 1].length;
                    editor.moveCursorTo(targetRow, targetCol);
                }
                editor.clearSelection();
            } finally {
                isInserting = false;
            }

            closeMenu();
            editor.focus();
        };

        const onInput = () => {
            if (isInserting) return;
            const ctx = detectContext();
            if (!ctx) {
                closeMenu();
                return;
            }

            const list = buildSuggestions(ctx);
            if (!list.length) {
                closeMenu();
                return;
            }

            currentCtx = ctx;
            items = list;
            selectedIdx = 0;
            menu.textContent = '';

            list.forEach((item, idx) => {
                const row = document.createElement('div');
                row.className = `wci-item${idx === 0 ? ' is-selected' : ''}`;

                const label = document.createElement('span');
                label.className = 'wci-label';
                label.textContent = item.label;
                row.appendChild(label);

                const meta = document.createElement('span');
                meta.className = 'wci-meta';
                if (item.swatch) {
                    const sw = document.createElement('span');
                    sw.className = 'wci-swatch';
                    sw.style.background = `var(${item.label}, ${item.swatch})`;
                    meta.appendChild(sw);
                }
                const metaText = document.createElement('span');
                metaText.textContent = item.meta || '';
                meta.appendChild(metaText);
                row.appendChild(meta);

                row.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    applyCompletion(item);
                });
                menu.appendChild(row);
            });

            menu.classList.add('is-open');
            updatePosition();
        };

        editor.container.addEventListener('keydown', (e) => {
            if (!menu.classList.contains('is-open') || !items.length) return;
            if (e.key === 'ArrowDown') {
                selectedIdx = (selectedIdx + 1) % items.length;
                highlightItem();
                e.preventDefault();
                e.stopPropagation();
            } else if (e.key === 'ArrowUp') {
                selectedIdx = (selectedIdx - 1 + items.length) % items.length;
                highlightItem();
                e.preventDefault();
                e.stopPropagation();
            } else if (e.key === 'Tab' || e.key === 'Enter') {
                applyCompletion(items[selectedIdx]);
                e.preventDefault();
                e.stopPropagation();
            } else if (e.key === 'Escape') {
                closeMenu();
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);

        session.on('change', () => requestAnimationFrame(onInput));
        editor.on('blur', closeMenu);
        editor.renderer.on('afterRender', updatePosition);
    };

    const scanEditors = () => {
        document.querySelectorAll('.ace_editor').forEach(el => {
            const ed = el.env?.editor;
            if (ed && ed.getSession()?.getMode()?.$id === 'ace/mode/css') {
                attachToAce(ed);
            }
        });
    };

    mw.hook('codeEditor.configure').add(() => setTimeout(scanEditors, 50));
    scanEditors();
})();