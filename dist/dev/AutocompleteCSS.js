/**
 * Author: 0.Phixley ([[User:0.Phixley]])
 * JSON in use: [[w:c:dev:MediaWiki:Custom-AutocompleteCSS/presets.json]]
 * Database template: [[w:c:dev:User:0.Phixley/AutocompleteCSS.json]]
 * This script provides autocomplete suggestions while users are writing CSS, allowing for easy completion.
 * The document is still being written.
 */

(() => {
    // CSS editing only
    if (mw.config.get('wgAction') !== 'edit' ||
        mw.config.get('wgPageContentModel') !== 'css')
        return;

    // i18n
    let i18n = null,
        i18nReady = false;
    const pendingSessions = [],
        msg = (key, fallback) => {
            if (i18n) {
                const message = i18n.msg(key);
                if (message.exists)
                    return message.plain();
            }
            return fallback;
        };

    // Set parameters
    window.AutocompleteCSS = window.AutocompleteCSS || {};
    AutocompleteCSS.settings = AutocompleteCSS.settings || {};
    AutocompleteCSS.colors = AutocompleteCSS.colors || {};
    const defaultSettings = {
        propertiesPage: 'MediaWiki:Custom-AutocompleteCSS/presets.json',
        menuGap: 1,
        offsetX: 0,
        offsetY: 0,
        width: '240px',
        minWidth: 'min-content',
        maxHeight: '220px'
    },
        defaultColors = {
            dark: {
                background: '#101827',
                surface: '#151f31',
                border: '#293a54',
                divider: '#293a54',
                text: '#c5d2e5',
                muted: '#8fa4c1',
                subtle: '#7187a8',
                brand: '#9aacc5',
                accent: '#6f9fd8',
                selected: '#244b7a',
                selectedText: '#ffffff',
                selectedAccent: '#d9eaff',
                scrollbar: '#354966',
                scrollbarTrack: '#101827',
                shadow: 'rgba(0, 0, 0, .24)',
                keyBorder: '#354966',
                keyText: '#d1deef',
                toastBackground: '#252526',
                toastText: '#d4d4d4',
                toastBorder: 'rgba(255,255,255,.12)',
                toastError: '#f48771',
                toastErrorBorder: 'rgba(244,135,113,.5)'
            },
            light: {
                background: '#ffffff',
                surface: '#f3f6fb',
                border: '#d6e0ed',
                divider: '#e1e8f1',
                text: '#27364b',
                muted: '#657992',
                subtle: '#788ba5',
                brand: '#526783',
                accent: '#527fb8',
                selected: '#dceaff',
                selectedText: '#183b68',
                selectedAccent: '#285b96',
                scrollbar: '#c2cfdf',
                scrollbarTrack: '#f5f7fb',
                shadow: 'rgba(31, 55, 85, .16)',
                keyBorder: '#d3deeb',
                keyText: '#344c69',
                toastBackground: '#ffffff',
                toastText: '#27364b',
                toastBorder: '#d6e0ed',
                toastError: '#b42318',
                toastErrorBorder: 'rgba(180,35,24,.35)'
            }
        };
    Object.keys(defaultSettings).forEach(key => {
        if (typeof AutocompleteCSS.settings[key] === 'undefined') {
            AutocompleteCSS.settings[key] = defaultSettings[key];
        }
    });
    ['dark', 'light'].forEach(theme => {
        AutocompleteCSS.colors[theme] = Object.assign(
            {},
            defaultColors[theme],
            AutocompleteCSS.colors[theme] || {}
        );
    });
    const settings = AutocompleteCSS.settings,
        dark = AutocompleteCSS.colors.dark,
        light = AutocompleteCSS.colors.light;

    // Loading indicator
    const showReadyNotice = (type, detail = '') => {
        const isError = type === 'error',
            title = isError
                ? msg('notice-error', 'AutocompleteCSS failed to load.')
                : msg('notice-ready', 'AutocompleteCSS is ready.');
        $('#autocompletecss-notice').remove();
        $('#autocompletecss-notice-style').remove();
        $('<style>', {
            id: 'autocompletecss-notice-style',
            text: `
                #autocompletecss-notice {
                    position: fixed;
                    top: 1em;
                    right: 1em;
                    z-index: 99999;
                    box-sizing: border-box;
                    width: 20em;
                    padding: 1em;
                    border: 2px solid ${dark.toastBorder};
                    border-radius: 6px;
                    background: ${dark.toastBackground};
                    color: ${dark.toastText};
                    font-size: 14px;
                    line-height: 1.5;
                    overflow-wrap: anywhere;
                    opacity: 0;
                    transform: translateY(-6px);
                    transition: opacity 250ms, transform 250ms;
                    cursor: pointer;
                    &.visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    &.error {
                        border-color: ${dark.toastErrorBorder};
                        color: ${dark.toastError};
                    }
                    .theme-fandomdesktop-light & {
                        border-color: ${light.toastBorder};
                        background: ${light.toastBackground};
                        color: ${light.toastText};
                        &.error {
                            border-color: ${light.toastErrorBorder};
                            color: ${light.toastError};
                        }
                    }
                }
            `
        }).appendTo('head');
        const $notice = $('<div>', {
            id: 'autocompletecss-notice',
            class: isError ? 'error' : '',
            text: detail ? `${title} ${detail}` : title
        }).appendTo('body');
        $notice.on('click', () => {
            $notice.removeClass('visible');
            setTimeout(() => $notice.remove(), 250);
        });
        requestAnimationFrame(() => {
            $notice[0].offsetHeight;
            requestAnimationFrame(() => $notice.addClass('visible'));
        });
        setTimeout(() => {
            $notice.removeClass('visible');
            setTimeout(() => $notice.remove(), 250);
        }, isError ? 5000 : 3000);
    };

    // Read preset completions from propertiesPage
    let propertiesPromise;
    const loadProperties = () => {
        if (!propertiesPromise) {
            propertiesPromise = fetch(
                'https://dev.fandom.com/api.php?' + new URLSearchParams({
                    action: 'query',
                    format: 'json',
                    formatversion: '2',
                    prop: 'revisions',
                    titles: settings.propertiesPage,
                    rvprop: 'content',
                    rvslots: 'main',
                    rvlimit: '1',
                    origin: '*'
                })
            ).then(response => {
                if (!response.ok)
                    throw new Error(
                        msg('error-fetch', 'Failed to fetch the property database.')
                    );
                return response.json();
            }).then(data => {
                const pages = data.query && data.query.pages,
                    page = Array.isArray(pages)
                        ? pages[0]
                        : pages && pages[Object.keys(pages)[0]],
                    revision = page && page.revisions && page.revisions[0],
                    slot = revision && revision.slots && revision.slots.main,
                    content = slot && slot.content !== undefined
                        ? slot.content
                        : revision && revision.content !== undefined
                            ? revision.content
                            : revision && revision['*'];
                if (typeof content !== 'string')
                    throw new Error(
                        msg('error-properties-missing', 'The property database page does not exist or cannot be read.')
                    );
                const json = JSON.parse(content);
                if (!json || !Array.isArray(json.Properties))
                    throw new Error(
                        msg('error-invalid-properties', 'The JSON must contain a Properties array.')
                    );
                const parseList = (key, pattern) => Array.from(new Set(
                    (Array.isArray(json[key]) ? json[key] : [])
                        .filter(value => typeof value === 'string')
                        .map(value => value.trim())
                        .filter(value => pattern.test(value))
                ));

                // Read present property values
                const properties = new Set(
                    parseList('Properties', /^-{0,2}[a-z_][\w-]*$/i)
                ),
                    values = {};
                if (
                    json.Values &&
                    typeof json.Values === 'object' &&
                    !Array.isArray(json.Values)
                )
                    Object.keys(json.Values).forEach(property => {
                        const key = property.toLowerCase(),
                            list = json.Values[property];
                        if (
                            properties.has(key) &&
                            Array.isArray(list)
                        )
                            values[key] = Array.from(new Set(
                                list
                                    .filter(value => typeof value === 'string')
                                    .map(value => value.trim())
                                    .filter(value => /^[\w-]+(?:\(\))?$/.test(value)) // Allow ending with ()
                            ));
                    });

                // Read present atRule templates
                const atRules = parseList('AtRules', /^[a-z][\w-]*$/i),
                    atRulesTemplates = {};
                if (
                    json.AtRulesTemplates &&
                    typeof json.AtRulesTemplates === 'object' &&
                    !Array.isArray(json.AtRulesTemplates)
                ) {
                    Object.keys(json.AtRulesTemplates).forEach(name => {
                        const key = name.toLowerCase(),
                            template = json.AtRulesTemplates[name];
                        if (
                            atRules.includes(key) &&
                            typeof template === 'string' &&
                            template.includes('|')
                        )
                            atRulesTemplates[key] = template;
                    });
                }
                return {
                    Properties: Array.from(properties),
                    PseudoClasses: parseList('PseudoClasses', /^-{0,2}[a-z_][\w-]*$/i),
                    PseudoElements: parseList('PseudoElements', /^-{0,2}[a-z_][\w-]*$/i),
                    AtRules: atRules,
                    AtRulesTemplates: atRulesTemplates,
                    Functions: parseList('Functions', /^[a-z][\w-]*$/i),
                    Values: values
                };
            }).then(result => {
                showReadyNotice('success');
                return result;
            }).catch(error => {
                propertiesPromise = null;
                showReadyNotice('error', error.message);
                throw error;
            });
        }
        return propertiesPromise;
    };

    // Locate Ace Editor and retrieve the cursor context
    const findEditor = session => {
        let editor = session.$editor;
        if (editor && editor.getSession &&
            editor.getSession() === session)
            return editor;
        $('.ace_editor').each(function () {
            const candidate = this.env && this.env.editor;
            if (candidate && candidate.getSession() === session) {
                editor = candidate;
                return false;
            }
        });
        return editor && editor.getSession &&
            editor.getSession() === session ? editor : null;
    };

    // Main functions
    const initEditor = (session, editor) => {
        // Clean up bindings, listeners, and the menu
        if (editor.container._cssPropertyAutocomplete)
            editor.container._cssPropertyAutocomplete();
        $('#ace-css-completion, #ace-css-completion-style').remove();

        // Set the menu
        const Range = window.ace.require('ace/range').Range,
            $style = $('<style>', {
                id: 'ace-css-completion-style',
                text: `
                    #ace-css-completion {
                        position: fixed;
                        z-index: 999999;
                        display: none;
                        box-sizing: border-box;
                        width: ${settings.width};
                        min-width: ${settings.minWidth};
                        overflow: hidden;
                        border: 1px solid ${dark.border};
                        border-radius: 6px;
                        background: ${dark.background};
                        color: ${dark.text};
                        box-shadow: 0 5px 18px ${dark.shadow};
                        font: 13px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                        & .ace-css-completion-header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            gap: 12px;
                            padding: 6px 10px;
                            border-bottom: 1px solid ${dark.divider};
                            background: ${dark.surface};
                        }
                        & .ace-css-completion-brand {
                            color: ${dark.brand};
                            font-size: 10px;
                            font-weight: 500;
                            letter-spacing: .2px;
                        }
                        & .ace-css-completion-caption {
                            margin-top: 1px;
                            color: ${dark.subtle};
                            font-size: 9px;
                            letter-spacing: .65px;
                        }
                        & .ace-css-completion-count {
                            flex-shrink: 0;
                            color: ${dark.muted};
                            font-size: 10px;
                        }
                        & .ace-css-completion-list {
                            max-height: ${settings.maxHeight};
                            overflow-x: hidden;
                            overflow-y: auto;
                            padding: 4px;
                            scrollbar-color: ${dark.scrollbar} ${dark.scrollbarTrack};
                            scrollbar-width: thin;
                        }
                        & .ace-css-completion-item {
                            display: flex;
                            align-items: center;
                            gap: 7px;
                            min-height: 27px;
                            box-sizing: border-box;
                            padding: 4px 8px;
                            border-radius: 3px;
                            color: ${dark.text};
                            white-space: nowrap;
                            cursor: pointer;
                            &::before {
                                width: 13px;
                                flex: 0 0 13px;
                                color: ${dark.accent};
                                content: "›";
                                font-size: 16px;
                                line-height: 1;
                                text-align: center;
                            }
                            &.selected {
                                background: ${dark.selected};
                                color: ${dark.selectedText};
                                &::before {
                                    color: ${dark.selectedAccent};
                                }
                            }
                        }
                        & .ace-css-completion-footer {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 4px 10px;
                            padding: 6px 9px;
                            border-top: 1px solid ${dark.divider};
                            background: ${dark.surface};
                            color: ${dark.muted};
                            font-size: 10px;
                        }
                        & .ace-css-completion-key {
                            display: inline-block;
                            margin-right: 3px;
                            padding: 0 4px;
                            border: 1px solid ${dark.keyBorder};
                            border-radius: 3px;
                            color: ${dark.keyText};
                            font-size: 10px;
                        }
                        .theme-fandomdesktop-light & {
                            border-color: ${light.border};
                            background: ${light.background};
                            color: ${light.text};
                            box-shadow: 0 5px 18px ${light.shadow};
                            & .ace-css-completion-header,
                            & .ace-css-completion-footer {
                                border-color: ${light.divider};
                                background: ${light.surface};
                            }
                            & .ace-css-completion-brand {
                                color: ${light.brand};
                            }
                            & .ace-css-completion-caption {
                                color: ${light.subtle};
                            }
                            & .ace-css-completion-count {
                                color: ${light.muted};
                            }
                            & .ace-css-completion-list {
                                scrollbar-color: ${light.scrollbar} ${light.scrollbarTrack};
                            }
                            & .ace-css-completion-item {
                                color: ${light.text};
                                &::before {
                                    color: ${light.accent};
                                }
                                &.selected {
                                    background: ${light.selected};
                                    color: ${light.selectedText};
                                    &::before {
                                        color: ${light.selectedAccent};
                                    }
                                }
                            }
                            & .ace-css-completion-footer {
                                color: ${light.muted};
                            }
                            & .ace-css-completion-key {
                                border-color: ${light.keyBorder};
                                color: ${light.keyText};
                                background: ${light.background};
                            }
                        }
                    }
                `
            }).appendTo('head');
        const $menu = $('<div>', {
            id: 'ace-css-completion'
        }).append(
            $('<div>', {
                class: 'ace-css-completion-header'
            }).append(
                $('<div>').append(
                    $('<div>', {
                        class: 'ace-css-completion-brand'
                    }).text('Autocomplete'),
                    $('<div>', {
                        class: 'ace-css-completion-caption'
                    }).text(msg('menu-caption', 'CSS COMPLETION MENU'))
                ),
                $('<span>', {
                    class: 'ace-css-completion-count'
                })
            ),
            $('<div>', {
                class: 'ace-css-completion-list',
                role: 'listbox'
            }),
            $('<div>', {
                class: 'ace-css-completion-footer'
            }).append(
                $('<span>').append(
                    $('<span>', {
                        class: 'ace-css-completion-key'
                    }).text('↑↓'),
                    document.createTextNode(msg('guide-navigate', 'Navigate'))
                ),
                $('<span>').append(
                    $('<span>', {
                        class: 'ace-css-completion-key'
                    }).text('Tab'),
                    document.createTextNode(msg('guide-accept', 'Accept'))
                ),
                $('<span>').append(
                    $('<span>', {
                        class: 'ace-css-completion-key'
                    }).text('Esc'),
                    document.createTextNode(msg('guide-dismiss', 'Dismiss'))
                )
            )
        ).appendTo('body'),
            $list = $menu.find('.ace-css-completion-list');

        // Definitions
        let types = {
            Properties: [],
            PseudoClasses: [],
            PseudoElements: [],
            AtRules: [],
            AtRulesTemplates: {},
            Functions: [],
            Values: {}
        },
            matches = [],
            selectedIndex = 0,
            activeContext = null,
            applying = false;

        // Hide the menu
        const hideMenu = () => {
            $menu.hide();
            $list.empty();
            matches = [];
            activeContext = null;
        };

        // Find the nearest unclosed left curly brace above the cursor
        const findOpenBrace = pos => {
            let depth = 0;
            for (let row = pos.row; row >= 0; row--) {
                const line = session.getLine(row),
                    end = row === pos.row ? pos.column : line.length;
                for (let col = end - 1; col >= 0; col--) {
                    if (line[col] === '}')
                        depth++;
                    else if (line[col] === '{') {
                        if (depth > 0)
                            depth--;
                        else
                            return {
                                row,
                                column: col
                            };
                    }
                }
            }
            return null;
        };

        // Read the text from the nearest unclosed left curly brace to the cursor
        const getBlockText = (brace, pos) => {
            const lines = [];
            for (let row = brace.row; row <= pos.row; row++) {
                const line = session.getLine(row);
                if (row === brace.row && row === pos.row)
                    lines.push(line.slice(brace.column + 1, pos.column));
                else if (row === brace.row)
                    lines.push(line.slice(brace.column + 1));
                else if (row === pos.row)
                    lines.push(line.slice(0, pos.column));
                else
                    lines.push(line);
            }
            return lines.join('\n');
        };

        // Whether the specified position lies within a string
        const isInsideString = (text, end) => {
            let quote = '',
                escaped = false,
                comment = false;
            for (let i = 0; i < end; i++) {
                const char = text[i],
                    next = text[i + 1];
                if (comment) {
                    if (char === '*' && next === '/') {
                        comment = false;
                        i++;
                    }
                } else if (quote) {
                    if (escaped)
                        escaped = false;
                    else if (char === '\\')
                        escaped = true;
                    else if (char === quote)
                        quote = '';
                } else if (char === '/' && next === '*') {
                    comment = true;
                    i++;
                } else if (char === '"' || char === "'")
                    quote = char;
            }
            return !!quote;
        };

        // Whether inside a string or comment
        const getTokenContext = pos => {
            let column = 0,
                currentToken = null,
                inString = false;
            session.getTokens(pos.row).forEach(token => {
                const start = column,
                    end = start + token.value.length;
                if (start < pos.column && pos.column <= end)
                    currentToken = token;
                if (start < pos.column) {
                    if (token.type.indexOf('string.start') !== -1)
                        inString = true;
                    if (
                        token.type.indexOf('string.end') !== -1 &&
                        end <= pos.column
                    )
                        inString = false;
                }
                column = end;
            });
            return {
                inComment: !!(
                    currentToken &&
                    currentToken.type.indexOf('comment') !== -1
                ),
                inString
            };
        };

        // Check whether the typed input corresponds to a known CSS property, including custom properties
        const isKnownProperty = name =>
            /^--[\w-]+$/.test(name) ||
            types.Properties.some(property =>
                property.toLowerCase() === name.toLowerCase()
            );

        // Remove comments and strings
        const stripCommentsAndStrings = source => source
            .replace(/\/\*[\s\S]*?\*\//g, ' ')
            .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, ' ');

        // Whether the content preceding a pseudo-class belongs to a CSS property declaration
        const isPropertyStatement = (source, pseudoMatch) => {
            let text = source.slice(0, source.length - pseudoMatch[0].length);
            text = stripCommentsAndStrings(text);
            const boundary = Math.max(
                text.lastIndexOf(';'),
                text.lastIndexOf('{'),
                text.lastIndexOf('}')
            ),
                statement = text.slice(boundary + 1).trim(),
                declaration = statement.match(/^([-\w]+)\s*:\s*[\s\S]*$/);
            return isKnownProperty(statement) || !!(
                declaration && isKnownProperty(declaration[1])
            );
        };

        // Whether the function completion is allowed
        const getFunctionMatch = source => {
            const text = stripCommentsAndStrings(source),
                boundary = Math.max(
                    text.lastIndexOf(';'),
                    text.lastIndexOf('{'),
                    text.lastIndexOf('}')
                ),
                statement = text.slice(boundary + 1).trim(),
                declaration = statement.match(/^([-\w]+)\s*:\s*([\s\S]*)$/),
                match = declaration && declaration[2].match(/([a-z][\w-]*)$/i);
            if (
                !declaration ||
                !isKnownProperty(declaration[1]) ||
                !match
            )
                return null;
            return match;
        };

        // Determine the current completion type based on the curly braces around the cursor and the Ace token
        const getCompletionContext = () => {
            if (!editor.getSelection().isEmpty())
                return null;
            const pos = editor.getCursorPosition(),
                line = session.getLine(pos.row),
                before = line.slice(0, pos.column),
                after = line.slice(pos.column);
            const tokenContext = getTokenContext(pos);
            if (tokenContext.inComment || tokenContext.inString)
                return null;

            // AtRule matching
            const atRuleMatch = before.match(/@([\w-]*)$/);
            if (atRuleMatch) {
                if (isInsideString(before, atRuleMatch.index))
                    return null;
                return {
                    type: 'AtRules',
                    prefix: atRuleMatch[1],
                    row: pos.row,
                    startColumn: pos.column - atRuleMatch[0].length
                };
            }

            // Identifier lookup
            const brace = findOpenBrace(pos),
                source = brace ? getBlockText(brace, pos) : before,
                functionMatch = getFunctionMatch(source);
            const cleanSource = stripCommentsAndStrings(source),
                boundary = Math.max(
                    cleanSource.lastIndexOf(';'),
                    cleanSource.lastIndexOf('{'),
                    cleanSource.lastIndexOf('}')
                ),
                statement = cleanSource.slice(boundary + 1).trim(),
                declaration = statement.match(/^([-\w]+)\s*:\s*([\s\S]*)$/);

            // Property value matching
            if (declaration) {
                const property = declaration[1].toLowerCase(),
                    value = declaration[2],
                    prefixMatch = before.match(/([\w-]+)$/),
                    depth = (value.match(/\(/g) || []).length -
                        (value.match(/\)/g) || []).length,
                    emptyValue = !value.trim(),
                    nextValue = /\s$/.test(before);
                if (
                    types.Values[property] &&
                    depth <= 0 &&
                    (prefixMatch || emptyValue || nextValue)
                )
                    return {
                        type: 'PropertyValues',
                        property,
                        prefix: prefixMatch ? prefixMatch[1] : '',
                        row: pos.row,
                        startColumn: prefixMatch
                            ? pos.column - prefixMatch[1].length
                            : pos.column
                    };
            }

            // Function matching
            if (functionMatch) {
                if (/\d(?:\.\d*)?\s*[a-z]*$/i.test(before))
                    return null;
                const match = before.match(/([a-z][\w-]*)$/i);
                if (
                    match &&
                    types.Functions.some(type =>
                        type.toLowerCase().startsWith(match[1].toLowerCase())
                    )
                )
                    return {
                        type: 'Functions',
                        prefix: match[1],
                        row: pos.row,
                        startColumn: pos.column - match[1].length
                    };
            }

            // Do not modify existing content when there is still code following the cursor
            if (after.trim())
                return null;

            // CSS properties are autocompleted only within unclosed code blocks.
            const propertyMatch = before.match(/^(\s*)([\w-]+)$/);
            if (brace && propertyMatch)
                return {
                    type: 'Properties',
                    prefix: propertyMatch[2],
                    row: pos.row,
                    startColumn: propertyMatch[1].length
                };

            // Matches a single or double colon, followed by an property prefix
            const pseudoMatch = before.match(/(:{1,2})([\w-]*)$/);
            if (
                !pseudoMatch ||
                before.charAt(pseudoMatch.index - 1) === ':'
            )
                return null;

            // Constructs like `color:` and `color: red:ho` cannot be completed as pseudo-classes.
            if (isPropertyStatement(source, pseudoMatch))
                return null;
            return {
                type: pseudoMatch[1] === '::'
                    ? 'PseudoElements'
                    : 'PseudoClasses',
                prefix: pseudoMatch[2],
                row: pos.row,
                startColumn: pos.column - pseudoMatch[0].length
            };
        };

        // Position the menu
        const positionMenu = () => {
            if (!$menu.is(':visible') || !activeContext)
                return;
            const renderer = editor.renderer,
                point = renderer.textToScreenCoordinates(
                    activeContext.row,
                    activeContext.startColumn
                ),
                lineHeight = renderer.lineHeight || 18,
                lineTop = point.pageY,
                lineBottom = lineTop + lineHeight,
                rect = renderer.scroller.getBoundingClientRect(),
                visibleTop = Math.max(rect.top, 0),
                visibleBottom = Math.min(rect.bottom, window.innerHeight);

            // Hide when the target line is not fully visible within the editor or on the screen
            if (
                visibleBottom <= visibleTop ||
                lineTop < visibleTop ||
                lineBottom > visibleBottom
            ) {
                hideMenu();
                return;
            }
            const width = $menu.outerWidth(),
                height = $menu.outerHeight();
            let left = point.pageX + settings.offsetX,
                top = lineTop - height - settings.menuGap + settings.offsetY;

            // If there is insufficient space above, display it below the target row instead
            if (top < 4)
                top = lineBottom + settings.menuGap + settings.offsetY;
            left = Math.max(4, Math.min(left, window.innerWidth - width - 4));
            top = Math.max(4, Math.min(top, window.innerHeight - height - 4));
            $menu.css({ left, top });
        };

        // Make selections
        const renderSelection = () => {
            const $items = $list.children(),
                $item = $items.eq(selectedIndex);
            $items.removeClass('selected')
                .attr('aria-selected', 'false');
            $item.addClass('selected')
                .attr('aria-selected', 'true');
            if (!$item.length)
                return;
            const itemTop = $item[0].offsetTop,
                itemBottom = itemTop + $item.outerHeight(),
                scrollTop = $list.scrollTop(),
                viewBottom = scrollTop + $list.innerHeight();
            if (itemTop < scrollTop)
                $list.scrollTop(itemTop);
            else if (itemBottom > viewBottom)
                $list.scrollTop(itemBottom - $list.innerHeight());
        };

        // Present options
        const renderMenu = candidates => {
            matches = candidates;
            selectedIndex = 0;
            $list.empty().scrollTop(0);
            candidates.forEach((type, index) => {
                $('<div>', {
                    class: 'ace-css-completion-item',
                    role: 'option',
                    'aria-selected': 'false',
                    'data-index': index
                }).text(
                    activeContext.type === 'AtRules' ? '@' + type :
                        activeContext.type === 'PseudoClasses' ? ':' + type :
                            activeContext.type === 'PseudoElements' ? '::' + type :
                                type
                ).appendTo($list);
            });
            $menu.find('.ace-css-completion-count').text(candidates.length);
            $menu.show();
            renderSelection();
            positionMenu();
        };

        // Change position
        const moveSelection = direction => {
            selectedIndex = (
                selectedIndex + direction + matches.length
            ) % matches.length;
            renderSelection();
        };

        // Completion operations and cursor movements
        const complete = type => {
            if (!type || !activeContext)
                return;
            const context = activeContext,
                pos = editor.getCursorPosition(),
                line = session.getLine(pos.row),
                before = line.slice(0, pos.column),
                after = line.slice(pos.column),
                row = pos.row;
            if (
                context.row !== row ||
                (
                    context.type !== 'Functions' &&
                    context.type !== 'PropertyValues' &&
                    after.trim()
                )
            ) {
                hideMenu();
                return;
            }
            let startColumn,
                replacement,
                cursorRow = row,
                cursorColumn;
            if (context.type === 'Properties') { /* For properties */
                const match = before.match(/^(\s*)([\w-]+)$/);
                if (
                    !match ||
                    !type.toLowerCase().startsWith(match[2].toLowerCase())
                ) {
                    hideMenu();
                    return;
                }
                startColumn = match[1].length;
                replacement = type + ': ;';
                cursorColumn = startColumn + type.length + 2;
            }
            else if (context.type === 'PropertyValues') { /* For propertyValues */
                const match = before.match(/([\w-]+)$/);
                if (context.prefix) {
                    if (
                        !match ||
                        !type.toLowerCase().startsWith(match[1].toLowerCase())
                    ) {
                        hideMenu();
                        return;
                    }
                    startColumn = match.index;
                } else
                    startColumn = pos.column;
                replacement = type;
                cursorColumn = startColumn + type.length;
                if (type.endsWith('()'))
                    cursorColumn--;
            }
            else if (context.type === 'Functions') { /* For functions */
                const match = before.match(/([a-z][\w-]*)$/i);
                if (
                    !match ||
                    !type.toLowerCase().startsWith(match[1].toLowerCase())
                ) {
                    hideMenu();
                    return;
                }
                startColumn = match.index;
                replacement = type + '()';
                cursorColumn = startColumn + type.length + 1;
            }
            else if (context.type === 'AtRules') { /* For atRules */
                const match = before.match(/@([\w-]*)$/);
                if (
                    !match ||
                    !type.toLowerCase().startsWith(match[1].toLowerCase())
                ) {
                    hideMenu();
                    return;
                }
                startColumn = match.index;
                const template = types.AtRulesTemplates[type.toLowerCase()];
                if (template) {
                    const marker = template.indexOf('|'),
                        content = template.slice(0, marker),
                        lines = content.split('\n');
                    replacement = template.replace('|', '');
                    cursorRow = row + lines.length - 1;
                    cursorColumn = lines.length === 1
                        ? startColumn + lines[0].length
                        : lines[lines.length - 1].length;
                } else {
                    replacement = '@' + type;
                    cursorColumn = startColumn + replacement.length;
                }
            }
            else { /* For pseudoElements */
                const match = before.match(/(:{1,2})([\w-]*)$/),
                    colon = context.type === 'PseudoElements' ? '::' : ':';
                if (
                    !match ||
                    match[1] !== colon ||
                    before.charAt(match.index - 1) === ':' ||
                    !type.toLowerCase().startsWith(match[2].toLowerCase())
                ) {
                    hideMenu();
                    return;
                }
                startColumn = match.index;
                replacement = colon + type;
                cursorColumn = startColumn + replacement.length;
            }
            applying = true;
            try {
                session.replace(
                    new Range(row, startColumn, row, pos.column),
                    replacement
                );
                editor.moveCursorTo(cursorRow, cursorColumn);
                editor.clearSelection();
            } finally {
                applying = false;
            }
            hideMenu();
            editor.focus();
            if (context.type === 'Properties')
                updateSuggestions();
        };

        // Match completion items
        const updateSuggestions = () => {
            if (applying)
                return;
            const context = getCompletionContext();
            if (!context) {
                hideMenu();
                return;
            }
            const source = context.type === 'PropertyValues'
                ? types.Values[context.property] || []
                : types[context.type] || [],
                prefix = context.prefix.toLowerCase(),
                candidates = source
                    .filter(type =>
                        type.toLowerCase().startsWith(prefix)
                    );
            if (!candidates.length) {
                hideMenu();
                return;
            }
            activeContext = context;
            renderMenu(candidates);
        };

        // Interaction using the mouse
        $menu
            .on('mousedown', '.ace-css-completion-item', event => {
                event.preventDefault();
            })
            .on('mouseenter', '.ace-css-completion-item', function () {
                selectedIndex = Number($(this).attr('data-index'));
                renderSelection();
            })
            .on('click', '.ace-css-completion-item', function () {
                complete(matches[Number($(this).attr('data-index'))]);
            });

        // Interaction using arrow keys, the Tab key, and the Esc key
        const onKeyDown = event => {
            if (!$menu.is(':visible') || !matches.length)
                return;
            switch (event.key) {
                case 'ArrowUp':
                    moveSelection(-1);
                    break;
                case 'ArrowDown':
                    moveSelection(1);
                    break;
                case 'Tab':
                    complete(matches[selectedIndex]);
                    break;
                case 'Escape':
                    hideMenu();
                    break;
                default:
                    return;
            }
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        };
        editor.container.addEventListener('keydown', onKeyDown, true);

        // Add event listeners to the options
        session.on('change', updateSuggestions);
        editor.on('changeSelection', updateSuggestions);
        editor.renderer.on('afterRender', positionMenu);
        $(window).on(
            'resize.cssPropertyAutocomplete scroll.cssPropertyAutocomplete',
            positionMenu
        );
        $(document).on('mousedown.cssPropertyAutocomplete', event => {
            if (
                !editor.container.contains(event.target) &&
                !$menu[0].contains(event.target)
            )
                hideMenu();
        });

        // Clean up bindings and listeners
        editor.container._cssPropertyAutocomplete = () => {
            hideMenu();
            session.off('change', updateSuggestions);
            editor.off('changeSelection', updateSuggestions);
            editor.renderer.off('afterRender', positionMenu);
            editor.container.removeEventListener(
                'keydown',
                onKeyDown,
                true
            );
            $(window).off('.cssPropertyAutocomplete');
            $(document).off('.cssPropertyAutocomplete');
            $menu.remove();
            $style.remove();
            delete editor.container._cssPropertyAutocomplete;
        };

        // Load JSON
        loadProperties().then(properties => {
            types = properties;
            updateSuggestions();
        }).catch(error => {
            console.error(
                msg('error-load-properties', '[AutocompleteCSS] Failed to load the property database:'),
                error
            );
        });
    };

    // Attach to CodeEditor hook
    const onConfigure = session => {
        if (
            !session ||
            !session.getMode ||
            session.getMode().$id !== 'ace/mode/css'
        )
            return;
        let attempts = 0;
        const attach = () => {
            const editor = findEditor(session);
            if (editor)
                initEditor(session, editor);
            else if (attempts++ < 80)
                setTimeout(attach, 25);
            else
                console.warn(
                    msg('warn-editor-not-found', '[AutocompleteCSS] Unable to find the corresponding Ace Editor.')
                );
        };
        attach();
    };
    mw.hook('codeEditor.configure').add(session => {
        if (i18nReady)
            onConfigure(session);
        else
            pendingSessions.push(session);
    });

    // i18n
    const startEditors = () => {
        i18nReady = true;
        pendingSessions.splice(0).forEach(onConfigure);
    };
    $.getScript('https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:I18n-js/code.js&only=scripts')
        .done(() => {
            if (!window.dev || !window.dev.i18n) {
                startEditors();
                console.warn(
                    '[AutocompleteCSS] I18n-js did not initialize; using fallback messages.'
                );
                return;
            }
            window.dev.i18n.loadMessages('AutocompleteCSS', {
                cacheVersion: 1
            }).done(messages => {
                i18n = messages;
                startEditors();
                console.log(
                    msg('log-loaded', '[AutocompleteCSS] Loaded.')
                );
            }).fail(() => {
                startEditors();
                console.warn(
                    '[AutocompleteCSS] Failed to load messages; using fallback messages.'
                );
            });
        })
        .fail(() => {
            startEditors();
            console.warn(
                '[AutocompleteCSS] Failed to load I18n-js; using fallback messages.'
            );
        });
})();