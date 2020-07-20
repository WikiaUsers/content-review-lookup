/* HTMLToUI-js
 *
 * Immediately shows a modal that converts raw HTML into UI-js format.
 * I'm sick of people using strings on showCustomModal and jQuery method calls :P
 * Only side effects from back and forth translation is the loss of onclick attributes in favor of event listeners,
 * which is a good thing.
 * 
 * No, you can't localize this. No, I won't add i18n support in a future version.
 * 
 * https://dev.wikia.com/wiki/MediaWiki:UI-js/code.js
 */

$.Deferred(function(def) {
    if (window.dev && dev.ui) {
        def.resolve(dev.ui);
        return;
    }
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:UI-js/code.js'
    });
    mw.hook('dev.ui').add(function(ui) {
        def.resolve(ui);
    });
}).then(function(ui) {

    function convert(html, options) {

        function node_to_obj(elem) {
            var obj = {};
            obj.type = elem.tagName.toLowerCase();
            if (elem.hasAttributes()) {
                var i = elem.attributes.length;
                while (i--) {
                    var attribute = elem.attributes[i];
                    if (attribute.name.startsWith('data-')) {
                        obj.data = obj.data || {};
                        obj.data[attribute.name.slice(5)] = attribute.value;

                    } else if (attribute.name.startsWith('on')) {
                        obj.events = obj.events || {};
                        obj.events[attribute.name.slice(2)] = elem[attribute.name];

                    } else if (attribute.name == 'class') {
                        obj.classes = Array.from(elem.classList.values()); // Browser support? What is that?

                    } else if (attribute.name == 'style') {
                        obj.style = {};
                        var l = elem.style.length;
                        while (l--) {
                            var style_prop = elem.style[l];

                            obj.style[style_prop] = elem.style[style_prop];
                        }

                    } else {
                        obj.attr = obj.attr || {};
                        obj.attr[attribute.name] = attribute.value;
                    }
                }
            }

            elem.childNodes.forEach(function(node) {
                switch(node.nodeType) {
                    case 3: // #text
                        if (node.textContent.trim()) {
                            obj.text = obj.text || node.textContent.trim();
                        }
                        break;
                    case 1: // Element
                        obj.children = obj.children || [];
                        obj.children.push(node_to_obj(node));
                        break;
                }
            });

            return obj;
        }

        var dummy = document.createElement('div'),
        obj = {};

        dummy.innerHTML = html;

        if (dummy.children.length > 1) {
            alert('Only one top-level element is supported! Consider wrapping your html in a container.');
            return html;
        } else if (!dummy.children[0]) {
            try { // If there is already JSON in, and the user just wants to change the indent amount, why not?
                var parsed = JSON.parse(html);

                return pretty_javascript_json(parsed, options);
            } catch(e) { // Oh, they didn't mean to do that? Then they're stupid.
                alert('No children found; did you actually put HTML in?');
                return html;
            }
        }

        return pretty_javascript_json(node_to_obj(dummy.children[0]), options);
    }

    function pretty_javascript_json(obj, options) {
        var json = JSON.stringify(obj, null, options.indent);

        if (options.quotes) {
            json = json.replace(/"((?:\\"|[^"])+)":/g, function(match, content) {
                console.log(match, content, options);
                var reserved_words = [ 'class', 'for', 'default' ]; // Reserved words sometimes used in HTML
                if (/[-:]/.test(content) || reserved_words.includes(content)) return match;

                return content + ':';
            });
        }

        return json;
    }

    $.showCustomModal('Convert HTML to UI-js',
        ui({
            type: 'div',
            classes: ['converter-container'],
            children: [
                {
                    type: 'div',
                    text: 'Paste your HTML in the textarea and press the "Convert" button',
                    classes: ['converter-legend'],
                    children: [
                        {
                            type: 'select',
                            classes: ['converter-indent'],
                            children: [
                                {
                                    type: 'option',
                                    attr: { value: ' ' },
                                    text: 'Indent with one space',
                                },
                                {
                                    type: 'option',
                                    attr: { value: '  ' },
                                    text: 'Indent with two spaces',
                                },
                                {
                                    type: 'option',
                                    attr: { value: '    ', selected: true }, 
                                    text: 'Indent with four spaces',
                                },
                                {
                                    type: 'option',
                                    attr: { value: '        ' },
                                    text: 'Indent with eight spaces',
                                },
                                {
                                    type: 'option',
                                    attr: { value: '\t' },
                                    text: 'Indent with tabs',
                                },
                            ]
                        },
                        {
                            type: 'span',
                            children: [
                                {
                                    type: 'input',
                                    attr: { type: 'checkbox', id: 'converter-checkbox', checked: true },
                                },
                                {
                                    type: 'label',
                                    attr: { 'for': 'converter-checkbox' },
                                    text: 'Remove unnecessary quotes in code',
                                },
                            ]
                        }
                    ],
                },
                {
                    type: 'textarea',
                    classes: ['converter-textarea'],
                    style: {
                        width: '100%',
                        height: '300px',
                        resize: 'vertical',
                        'min-height': '100px', // Oi, Kocka, can you add camelCase CSS prop support in UI-js?
                        'margin-top': '10px',
                    }
                },
            ],
        }),
        {
            id: 'converter-modal',
            width: 500,
            buttons: [{
                id: 'converter-close', // The buttons still get id="undefined" if you don't set this...
                message: 'Close',
                handler: function() {
                    $('#converter-modal').closeModal();
                },
            }, {
                id: 'converter-convert',
                message: 'Convert',
                defaultButton: true,
                handler: function() {
                    var textarea = document.querySelector('.converter-textarea'),
                    options = {
                        indent: document.querySelector('.converter-indent').value,
                        quotes: document.getElementById('converter-checkbox').checked
                    };

                    textarea.value = convert(textarea.value, options);
                }
            }]
        }
    );
});