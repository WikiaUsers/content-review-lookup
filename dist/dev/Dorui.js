/* Dorui
 *
 * Something perhaps a little controversial: my own fork of UI-js
 * Props to Kocka for the great base library, but I like mine better
 *
 * Changes:
 * - Attributes can be directly in the object, unless they have special meaning (there's still an attrs property to bypass specials)
 * - Building tags have a shorthand ui.tag() function, for unsupported native calls, you can still do ui('div', ...)
 * - `style` is now more robust and supports custom CSS properties. Doesn't matter much, but y'know
 * - `child` property so you don't always have to use an array. Don't use it alongside `children`, it's defined, but dumb
 * - When you use `text` and child(ren) properties together, they're added in the same order as they're in your object
 * - `child` and `children` properties expect ready-to-use nodes, they aren't thrown through ui() first
 *   exception being strings, turned into text nodes for `children`, but not for `child`, you can just use `text`
 *   This means that now the DOM isn't represented with just one json object, but they're built from deepest to shallowest
 *   this is a trade-off for transacting with nodes rather than plain objects, but enables the following change:
 * - `condition` was removed, conditional children should be created with the short-circuiting `&&`
 *   For example:
 *   ```
 *      child: hasChild && ui.button({ text: 'Click me!' })
 *
 *      children: [
 *          message.author && ui.span({ text: message.author.name })
 *      ]
 *   ```
 *   This was chosen because element properties tend to be computed depending on the existence of a variable
 * - classes: supports a plain object for conditional classes
 *   For example, `classes: { button: true, disabled: isDisabled }`
 * - `parent` doesn't exist, use `appendChild` or whatever other method you like to insert into the DOM
 * - `attr` was renamed to `attrs`, for consistency with `props` and because you can pass in more than one attribute
 * - `data` was removed, just use `attrs`, as the HTML5 `dataset` is often not wanted
 * - `checked` was removed, feel free to use `props` though!
 * - `selected` was removed, because it DIDN'T WORK LOL, but it can be emulated with `props`
 *    Just make sure to set the `props.selectedIndex` after `children`,
 *    you can't set the index before the <select> has children!
 * - To create document fragments, if you REALLY want to, you can use ui.frag({ children })
 *
 * Performance is nearly identical, so don't bother choosing one over the other due to silly things like that
 * but as far as my limited tests go, it's 20-25% faster, or 2x faster at only creating elements
 *
 * Some possible and valid concerns would be svg support, which exists, but isn't exhaustively tested
 * Still, it was used to recreate every <svg> tag tree in a fandom page and nothing broke, so I think it's robust enough
 */

(function() {
    // Double runs
    if (window.dev && dev.dorui) return;

    // I did make some pretty cool code that generated these from window class objects
    // but having a predefined set is probably smaller (in bundle size), simpler, faster, and a better idea anyway
    //
    // I considered using proxies for the shorthand methods, but a second later figured that would be a really stupid idea
    //
    // Tags purposefully excluded include: base, content, keygen, menu, menuitem,
    // rp, rt, rtc, ruby, shadow, slot, template, var, wbr
    var htmlTags = [
        // HTML
        'html',
        'head',
        'body',

        // Head
        'title',
        'meta',

        // Resources
        'script',
        'style',
        'link',

        'noscript', // Not necessarily fetching resource, but display to users with js disabled

        // Layout
        'span',
        'div',

        'ul', // Lists, baybee
        'ol',
        'li',

        // Headers
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',

        // Forms and input
        'form', // For grouping inputs and labels
        'fieldset',

        'label', // For annotating inputs
        'legend', // For annotating input groups, fieldsets

        'input', // For entering text
        'textarea',

        'button', // For submission

        'select', // Select elements
        'option',
        'optgroup',

        'datalist', // Select-ish, set of recommended options for other inputs

        // Fancy display of stuff
        'meter', // For displaying bars of something
        'progress',

        'output', // For displaying any sort of output

        // Multimedia content
        'img',
        'audio',
        'video',

        'picture', // For viewport-aware images, like srcset
        'source',

        'track', // For subtitles

        // Linking
        'a',

        'cite', // Sorta related, if you're drunk

        // Text
        'p',

        'pre', // Code blocks
        'code',

        'em', // Emphasis, italics
        'i',

        'mark', // Also emphasis, but usually in background highlight

        'b', // Bold
        'strong',

        's', // Strike-through

        'u', // Underline

        'small', // Small text

        'sub', // Sub and superscript
        'sup',

        'blockquote', // Block quotes

        'q', // Short inline quote

        'dl', // Description lists, terms, and values
        'dt',
        'dd',

        'dfn', // For definitions

        'kbd', // For keyboard input examples

        'samp', // For computer program output

        'br', // Line breaks and line-through
        'hr',

        'abbr', // Abbreviations, usually have titles

        'address', // To contain contact information

        // HTML5
        'main',
        'article',
        'header',
        'nav',
        'footer',
        'aside',
        'section',

        'details', // Collapsible box, and a summary displayed as the collapsible label
        'summary',

        'dialog', // For dialogs

        'figure', // Figures
        'figcaption',

        'time', // For displaying times, with a machine-readable format

        'data', // For displaying any other data, with a machine-readable format

        'bdi', // For telling the browser to treat the text direction in isolation
        'bdo', // For telling the browser what direction to use inside

        // Isolated render objects
        'iframe',
        'canvas',

        'object', // Stuff related to the plugin-based <object>
        'param',
        'embed',

        'map', // For area maps
        'area',

        // Tables
        'table',

        'thead', // Sections
        'tbody',
        'tfoot',

        'th', // Rows
        'tr',

        'td', // Cells

        'caption', // For captions of a table... yeah

        'col', // For table columns
        'colgroup',

        // Diffs
        'ins',
        'del',
    ],
    svgTags = [
        // Categories pending lol
        'svg',
        'use',
        'defs',
        'symbol',

        'g',
        'line',
        'path',
        'rect',
        'circle',
        'ellipse',
        'stop',
        'polygon',

        'text',

        'mask',

        'image',
        'linearGradient',
        'geometry',
        'foreignObject',

        'desc',
        'clipPath',
        'animation',
        'animate',

        'filter',
        'feOffset',
        'feGaussianBlur',
        'feColorMatrix',
    ],

    // Would love to say shamelessly stolen from UI-js
    // but it was developed on its own with hard-fought svg namespace testing
    w3 = 'http://www.w3.org/',
    x = w3 + '2000/xmlns/',
    nsAttrs = {
        // For svg tags in general
        xmlns: x,
        'xmlns:xlink': x,

        // For <use> tags
        'xlink:href': w3 + '1999/xlink',
    };

    function setAttr(svg, elem, k, v) {
        // Map svg special attributes to their special snowflake namespaces
        // So far, only thing I've found this to be necessary for are <use> xlink:href attrs
        if (svg && k in nsAttrs) {
            elem.setAttributeNS(
                nsAttrs[k],
                k,
                v
            );
        } else {
            elem.setAttribute(k, v);
        }
    }

    // Factory for ui functions, in the name of performance so you don't have to lookup the tag name to determine svg-ness
    function makeUI(isSVG) {

        // ui('div', { id: 'container' })
        return function(tag, options) {

            // Handle weirdness that svgs require their own namespace as the special little snowflakes they are
            var elem;
            if (isSVG) {
                elem = document.createElementNS(
                    w3 + '2000/svg',
                    tag
                );
            } else {
                elem = document.createElement(tag);
            }

            // Iterate over the options properties, this has two advantages
            // It doesn't force check every property that could have a special meaning, only looping over the ones that are actually used
            // this is usually faster because most elements don't use all of html, text, child, children, style, attrs, props, etc.
            // It also lets you use a cool switch statement. Doesn't it look cool?
            for (var optionKey in options) {
                var value = options[optionKey];

                // Consider reodering cases to see if that improves performance by a bit
                // children > child > text > events > styles > html > attrs > props
                // probably idk
                switch (optionKey) {
                    case 'html':
                        // donut ooze
                        elem.innerHTML = value;
                        break;
                    case 'text':
                        elem.appendChild(document.createTextNode(value));
                        break;
                    case 'child':
                        // Text unsupported, obviously; use `text`
                        if (value) {
                            elem.appendChild(value);
                        }
                        break;
                    case 'children':
                        for (var i = 0; i < value.length; i++) {
                            var child = value[i];

                            if (typeof child === 'string') {
                                elem.appendChild(document.createTextNode(child));
                            } else if (child) {
                                elem.appendChild(child);
                            }
                        }
                        break;
                    case 'classes':
                        // If it's an array just set the class attribute to them joined by spaces
                        // Not looping and adding the class because using it in conjunction to the attribute
                        // is pretty brittle, so any semblance of support for that should be removed
                        if (value instanceof Array) {
                            elem.setAttribute('class', value.join(' '));
                        } else {
                            // If it's an object, make the keys the class names, and the value whether the class should be added
                            for (var key in value) {
                                if (value[key]) {
                                    elem.classList.add(key);
                                }
                            }
                        }
                        break;
                    case 'events':
                        // Still sucks that there's no way to list existing event listeners
                        // for removing without keeping a reference
                        for (var key in value) {
                            elem.addEventListener(key, value[key]);
                        }
                        break;
                    case 'style':
                        // Fancy schmancy style attributes, by converting camelCase properties to dashed-case
                        // PascalCase is converted to -dash-infix-case
                        for (var key in value) {
                            var rawValue = value[key];

                            var propName = key.replace(/[A-Z]/g, function(c) {
                                return '-' + c.toLowerCase();
                            });

                            // Except Microsoft ones, they start with lowercase ms, like msTranform
                            // so they have to be converted manually to -infix-case
                            // why so many exceptions??
                            if (propName.slice(0, 3) == 'ms-') {
                                propName = '-' + propName;
                            }

                            // .setProperty is great, but for whatever god forsaken reason they decided to separate the !important
                            // from the property value itself. What the fuck?
                            // Oh well, we just check if it ends with !important, and add it if so
                            var isImportant = rawValue.trim().slice(-10) == '!important';
                            var importance = isImportant ? 'important' : '';

                            // Snip off any !important that we can't include in the same string
                            var propValue = isImportant
                                ? rawValue.trim().slice(0, -10)
                                : rawValue;

                            elem.style.setProperty(propName, propValue, importance);
                        }
                        break;
                    case 'attrs':
                        // For the very rare case where one of the special properties takes priority over your attribute
                        // or for the dorui default property attribute deniers
                        for (var key in value) {
                            var val = value[key];
                            if (val === false) continue;
                            if (val === true) {
                                val = key;
                            }

                            setAttr(isSVG, elem, key, val);
                        }
                        break;
                    case 'props':
                        // For custom properties to set after the element's creation, like checked, selected, or value
                        for (var key in value) {
                            elem[key] = value[key];
                        }
                        break;

                    default:
                        // Something unrecognized was passed, just slap it as an attribute
                        setAttr(isSVG, elem, optionKey, value);
                }
            }

            return elem;
        };
    }

    // svgUI is not exposed to the user in any way, I should someday figure out a good way to do that
    var ui = makeUI(false);
    var svgUI = makeUI(true);

    // For creating document fragments
    ui.frag = function(children) {
        var frag = document.createDocumentFragment();

        for (var i = 0; i < children.length; i++) {
            var child = children[i];

            if (typeof child === 'string') {
                frag.appendChild(document.createTextNode(child));
            } else if (child) {
                frag.appendChild(child);
            }
        }

        return frag;
    };

    // Register svg tag shorthands
    for (var i in svgTags) {
        var tag = svgTags[i];
        ui[tag] = svgUI.bind(this, tag);
    }

    // HTML overrides SVG tags, if there's any overlap
    // There shouldn't be
    for (var i in htmlTags) {
        var tag = htmlTags[i];
        ui[tag] = ui.bind(this, tag);
    }

    // Expose it through the very ugly global handles
    // Users should definitely keep a reference around as `ui` with the hook
    window.dev = window.dev || {};
    window.dev.dorui = ui;

    // If running in a mw environment, fire the hookers
    if (typeof mw === 'object' && typeof mw.hook === 'function') {
        mw.hook('doru.ui').fire(ui);
    }
})();