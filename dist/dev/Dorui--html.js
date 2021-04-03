/* HTML to Dorui
 *
 * Transforms filthy HTML into beautiful Dorui
 *
 * UI-js? I hardly know her!
 *
 * @author Dorumin
 */

(function() {
    var ui;
    var refs = {};

    var SPECIALS = [
        'html',
        'text',
        'child',
        'children',
        'attrs',
        'props',
        'events',
        'style',
        'classes'
    ];

    // Tries to convert a string to a tree of nodes
    // Done by creating a DOMParser and parsing it as html
    function stringToNodes(string) {
        var parser = new DOMParser();

        try {
            var doc = parser.parseFromString(string, 'text/html');

            return Array.from(doc.body.childNodes);
        } catch(e) {
            // We don't have valid HTML, chief
            // Which is _extremely_ odd because having HTML conversion fail is really hard
            console.error('Error while parsing HTML', e);

            return [];
        }
    }

    // Converts an array of nodes into Dorui calls
    function nodesToDorui(nodes) {
        var goodNodes = Array.from(nodes)
            .filter(function(node) {
                return node.nodeType !== Node.TEXT_NODE || node.textContent.trim() !== '';
            });

        if (goodNodes.length === 1) {
            return doruiCall(goodNodes[0], 0) + ';';
        } else {
            return doruiFragCall(goodNodes, 0) + ';';
        }
    }

    function indent(amount) {
        if (refs.tabsBox.checked) {
            return new Array(amount + 1).join('\t');
        } else {
            return new Array(amount * 4 + 1).join(' ');
        }
    }

    function isEmptyObject(object) {
        return Object.keys(object).length === 0;
    }

    function quoted(string) {
        return "'" + string.replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
    }

    function camelCased(string) {
        return string.replace(/-(\w)/g, function(_, letter) {
            return letter.toUpperCase();
        });
    }

    // Takes a string and returns it quoted if it's needed as an object key
    function objectKey(key) {
        if (key === '') {
            // Empty strings have to be quoted
            return "''";
        }

        if (!Number.isNaN(Number(key))) {
            // If the key is completely a number, it's valid without quotes
            return key;
        }

        if (!Number.isNaN(Number(key.charAt(0)))) {
            // First character is a number, quote it
            return quoted(key);
        }

        if (/[^a-zA-Z0-9_$]/.test(key)) {
            // Conservatively test against any non-standard characters in the identifier
            // Unicode stuffs are valid in identifiers, but I don't want to risk it
            // Because characters like !, ., ", and ; exist
            return quoted(key);
        }

        // Should be safe, consists entirely of a-z A-Z 0-9, and doesn't start with a number
        return key;
    }

    function stringifyObject(object, tabs, map) {
        var json = '{';
        var hadKey = false;

        for (var key in object) {
            var val = object[key];

            json += '\n' + indent(tabs + 1) + objectKey(key) + ': ' + map(val) + ',';

            hadKey = true;
        }

        if (hadKey) {
            if (refs.commasBox.checked) {
                json = json.slice(0, -1);
            }

            json += '\n' + indent(tabs) + '}';
        } else {
            json += '}';
        }

        return json;
    }

    function objectValue(key, value, tabs) {
        switch (key) {
            case 'attrs':
            case 'style':
                return stringifyObject(value, tabs, function(val) {
                    if (typeof val === 'boolean') {
                        return String(val);
                    } else {
                        return quoted(String(val));
                    }
                });
            case 'child':
                return doruiCall(value, tabs);
            case 'children':
                var json = '[';

                for (var key in value) {
                    var node = value[key];

                    json += '\n' + indent(tabs + 1) + doruiCall(node, tabs + 1) + ',';
                }

                if (refs.commasBox.checked) {
                    json = json.slice(0, -1);
                }

                json += '\n' + indent(tabs) + ']';

                return json;
            case 'text':
                return quoted(refs.trimBox.checked ? value.trim() : value);
            case 'classes':
                var json = '[';

                for (var key in value) {
                    var cls = value[key];

                    json += '\n' +  indent(tabs + 1) + quoted(cls) + ',';
                }

                if (refs.commasBox.checked) {
                    json = json.slice(0, -1);
                }

                json += '\n' + indent(tabs) + ']';

                return json;
            case 'events':
                return stringifyObject(value, tabs, function(val) {
                    var body = val.trim().replace(/^/gm, indent(tabs + 2));

                    return 'function() {\n' + body + '\n' + indent(tabs + 1) + '}';
                });
            case 'props':
            case 'html':
                // Cannot be generated from nodesToDorui
                return '/* UNREACHABLE */';
            default:
                return quoted(String(value));
        }
    }

    var OPTIONS_SORT = {
        id: -5,
        class: -4,
        classes: -3,
        attrs: -2,
        style: -1,

        // Everything else goes here

        text: 1,
        child: 2,
        children: 3,
        props: 4
    };

    function sortedOptionsEntries(options) {
        return Object.keys(options)
            .sort(function(a, b) {
                var aScore = OPTIONS_SORT[a] || 0;
                var bScore = OPTIONS_SORT[b] || 0;

                return aScore - bScore;
            })
            .map(function(key) {
                return [key, options[key]];
            });
    }

    function getElementOptions(node, tabs) {
        var options = {};

        var childNodes = Array.from(node.childNodes)
            .filter(function(node) {
                return node.nodeType !== Node.TEXT_NODE || node.textContent.trim() !== '';
            });

        if (childNodes.length !== 0) {
            if (childNodes.length === 1) {
                var childNode = childNodes[0];

                if (childNode.nodeType === Node.TEXT_NODE) {
                    if (childNode.textContent.trim() !== '') {
                        options.text = childNode.textContent;
                    }
                } else {
                    options.child = childNode;
                }
            } else {
                options.children = Array.from(childNodes);
            }
        }

        if (node.attributes.length !== 0) {
            for (var i = 0; i < node.attributes.length; i++) {
                var attr = node.attributes[i];

                if (attr.name === 'style') {
                    options.style = {};

                    for (var j = 0; j < node.style.length; j++) {
                        var styleName = node.style.item(j);
                        var styleValue = node.style[styleName];

                        options.style[camelCased(styleName)] = styleValue;
                    }
                } else if (refs.classesBox.checked && attr.name === 'class') {
                    options.classes = attr.value.split(/\s+/g).filter(Boolean);
                } else if (refs.eventsBox.checked && attr.name.slice(0, 2) === 'on') {
                    if (!options.hasOwnProperty('events')) {
                        options.events = {};
                    }

                    options.events[attr.name.slice(2)] = attr.value;
                } else if (refs.attrsBox.checked || SPECIALS.includes(attr.name)) {
                    if (!options.hasOwnProperty('attrs')) {
                        options.attrs = {};
                    }

                    options.attrs[attr.name] = attr.value;
                } else {
                    options[attr.name] = attr.value;
                }
            }
        }

        if (isEmptyObject(options)) {
            return '';
        }

        var object = '{';


        sortedOptionsEntries(options).forEach(function(pair) {
            var key = pair[0];
            var value = pair[1];

            object += '\n' + indent(tabs + 1) + objectKey(key) + ': '+ objectValue(key, value, tabs + 1) + ',';
        });

        // Remove leading comma and add last brace
        if (refs.commasBox.checked) {
            object = object.slice(0, -1);
        }

        object += '\n' + indent(tabs) + '}';

        return object;
    }

    function doruiCall(node, tabs) {
        switch (node.nodeType) {
            case Node.TEXT_NODE:
                return quoted(refs.trimBox.checked ? node.textContent.trim() : node.textContent);
            case Node.ELEMENT_NODE:
                var alias = node.nodeName.toLowerCase();

                return 'ui.' + alias + '(' + getElementOptions(node, tabs) + ')';
            case Node.COMMENT_NODE:
                return 'document.createComment(' + quoted(node.data) + ')';
            default:
                return '/* INVALID NODE TYPE FOUND */';
        }
    }

    function doruiFragCall(nodes, tabs) {
        var code = 'ui.frag([';

        for (var i in nodes) {
            var node = nodes[i];

            code += '\n' + indent(tabs + 1) + doruiCall(node, tabs + 1) + ',';
        }

        // Remove leading comma and add closing braces
        if (refs.commasBox.checked) {
            code = code.slice(0, -1);
        }

        code += '\n' + indent(tabs) + '])';

        return code;
    }

    function init() {
        var triggers = document.querySelectorAll('.dorui-html-trigger');

        if (triggers.length === 0) {
            // Patch for DemoScripts firing on ?action=edit and history pages
            if (mw.config.get('wgAction') === 'view') {
                show();
            }
        } else {
            for (var i = 0; i < triggers.length; i++) {
                triggers[i].addEventListener('click', show);
            }
        }
    }

    function show() {
        ui = dev.dorui;

        var $modal = dev.showCustomModal('HTML to Dorui', {
            id: 'HTMLToDoruiModal',
            width: 500,
            content: ui.frag([
                ui.p({
                    text: 'Paste HTML into the textarea below, and click on "Convert" to turn it into valid Dorui!'
                }),
                ui.p({
                    text: 'Remember that this is all turned into a single Dorui tree, you may want to factor it into smaller functions',
                }),
                ui.details({
                    children: [
                        ui.summary({
                            text: 'Show configuration'
                        }),
                        ui.p({
                            children: [
                                refs.trimBox = ui.input({
                                    type: 'checkbox',
                                    id: 'text-trim-checkbox',
                                    props: {
                                        checked: true
                                    }
                                }),
                                ui.label({
                                    for: 'text-trim-checkbox',
                                    text: 'Trim text content and text nodes'
                                })
                            ]
                        }),
                        ui.p({
                            children: [
                                refs.commasBox = ui.input({
                                    type: 'checkbox',
                                    id: 'leading-commas-checkbox',
                                    props: {
                                        checked: true
                                    }
                                }),
                                ui.label({
                                    for: 'leading-commas-checkbox',
                                    text: 'Remove leading commas'
                                })
                            ]
                        }),
                        ui.p({
                            children: [
                                refs.eventsBox = ui.input({
                                    type: 'checkbox',
                                    id: 'convert-events-checkbox',
                                    props: {
                                        checked: true
                                    }
                                }),
                                ui.label({
                                    for: 'convert-events-checkbox',
                                    text: 'Convert on- attributes to `events`'
                                })
                            ]
                        }),
                        ui.p({
                            children: [
                                refs.tabsBox = ui.input({
                                    type: 'checkbox',
                                    id: 'use-tabs-checkbox',
                                    props: {
                                        checked: false
                                    }
                                }),
                                ui.label({
                                    for: 'use-tabs-checkbox',
                                    text: 'Use tabs as indentation'
                                })
                            ]
                        }),
                        ui.p({
                            children: [
                                refs.classesBox = ui.input({
                                    type: 'checkbox',
                                    id: 'classes-force-checkbox',
                                    props: {
                                        checked: false
                                    }
                                }),
                                ui.label({
                                    for: 'classes-force-checkbox',
                                    text: 'Use `classes` for class attributes'
                                })
                            ]
                        }),
                        ui.p({
                            children: [
                                refs.attrsBox = ui.input({
                                    type: 'checkbox',
                                    id: 'attrs-force-checkbox',
                                    props: {
                                        checked: false
                                    }
                                }),
                                ui.label({
                                    for: 'attrs-force-checkbox',
                                    text: 'Force the `attrs` object for attributes. Not recommended'
                                })
                            ]
                        })
                    ]
                }),
                refs.textarea = ui.textarea({
                    style: {
                        display: 'block',
                        height: '200px',
                        width: '100%',
                        maxWidth: '100%'
                    }
                })
            ]),
            buttons: [
                {
                    message: 'Close',
                    handler: function() {
                        dev.showCustomModal.closeModal($modal);
                    }
                },
                {
                    message: 'Convert',
                    defaultButton: true,
                    handler: function() {
                        var nodes = stringToNodes(refs.textarea.value);

                        if (nodes.length === 0) {
                            alert('No nodes found. Are you sure you\'re passing valid HTML?');
                            return;
                        }

                        if (nodes.length === 1 && nodes[0].nodeType === Node.TEXT_NODE) {
                            alert('A single node found, and it was a text node. Are you sure you\'re passing valid HTML?');
                            return;
                        }

                        var code = nodesToDorui(nodes);

                        var highlightedHTML = dev.highlight.highlight('javascript', code).value;

                        highlightedHTML = highlightedHTML.replace(/(^\s*|:\s*)ui.(\w+)\(/gm, function(_, indent, method) {
                            return indent + 'ui.' + '<span class="hljs-name">' + method + '</span>(';
                        });

                        var $outputModal = dev.showCustomModal('Output', {
                            content: ui.frag([
                                code.slice(0, 7) === 'ui.frag' && ui.p({
                                    text: 'Note: There was more than one top-level node, so your tree was turned into a document fragment'
                                }),
                                ui.p({
                                    text: 'Here is your beautiful Dorui:',
                                }),
                                ui.pre({
                                    class: 'hljs',
                                    style: {
                                        lineHeight: '14px',
                                        tabSize: '4'
                                    },
                                    // SAFETY: highlightedHTML is spat out from Highlight-js
                                    // and there's minor changes to highlight Dorui methods
                                    html: highlightedHTML
                                })
                            ]),
                            buttons: [
                                {
                                    message: 'Close',
                                    handler: function() {
                                        dev.showCustomModal.closeModal($outputModal);
                                    }
                                },
                                {
                                    message: 'Copy',
                                    defaultButton: true,
                                    handler: function() {
                                        navigator.clipboard.writeText(code);
                                    }
                                }
                            ]
                        });
                    }
                }
            ]
        });
    }

    var loading = [
        'dorui',
        'modal',
        'hljs',
        'hljs-js'
    ];

    function onload(key, arg) {
        switch (key) {
            case 'dorui':
                ui = arg;
                break;
            case 'hljs':
                dev.highlight.useTheme('vs2015');
                dev.highlight.loadLanguage('javascript').then(onload.bind(this, 'hljs-js'));
                break;
        }

        var index = loading.indexOf(key);
        if (index === -1) throw new Error('Unregistered dependency loaded: ' + key);

        loading.splice(index, 1);

        if (loading.length !== 0) return;

        init();
    }

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Dorui.js',
            'u:dev:MediaWiki:ShowCustomModal.js',
            'u:dev:MediaWiki:Highlight-js.js'
        ]
    });

    mw.hook('doru.ui').add(onload.bind(this, 'dorui'));
    mw.hook('dev.highlight').add(onload.bind(this, 'hljs'));
    mw.hook('dev.showCustomModal').add(onload.bind(this, 'modal'));
})();