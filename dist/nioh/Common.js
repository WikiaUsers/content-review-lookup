/**
 * Any JavaScript here will be loaded for all users on every page load.
 */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:AllPages',
    'Special:UncategorizedPages'
];

;(function() {
    function wait() {
        if (!window.hasOwnProperty('DOMTools')) return setTimeout(wait, 1000);
        run();
    }
    
    function run() {
        /**
         * Add Discord Widget
         * 
         * WidgetBot source: https://github.com/widgetbot-io/widgetbot
         * Crate package: https://github.com/widgetbot-io/widgetbot/tree/2.5/packages/crate
         */
        ;(function() {
            var regex = /"(\w+)":/g;
             
            var crateOptions = {
                channel: '454136120213635093',
                server: '454136119551066115',
                shard: 'https://disweb.dashflo.net',
                color: '#790002',
                location: ['bottom', 'right']
            };
             
            var options = JSON.stringify(crateOptions, null, 4);
            options = options.replace(regex, '$1:');
             
            var popupOptions = {
                content: 'Come chat, or join our Discord server!',
                timeout: 10000
            };
             
            var popup = JSON.stringify(popupOptions, null, 4);
            popup = popup.replace(regex, '$1:');
             
            var text = 'var crate = new Crate(' + options + ');\n\n';
            text += 'crate.notify(' + popup + ');';
             
            var script = createElement('script', {
                src: 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3',
                id: 'WidgetCrate',
                text: text
            });
            script.setAttribute('async', '');
            script.setAttribute('defer', '');
            
            DOMTools.appendTo(document.head, script);
        })();
  
        /**
         * Collapsible tables script
         */
        ;(function() {
            var $elems, $t;
            var tables = $$('table.collapsible'), len = tables.length, i = 0;
         
            for (i; i < len; i++) {
                $t = tables[i];
                appendCollapseLink($t);
            }
         
            /**
             * Setup functions
             */
            function appendCollapseLink(table) {
                if (!table) return;
         
                var th = table.querySelector('th'),
                    link, hs, el, tr;
         
                if (!th) return;
         
                hs = collapseText(table);
         
                link = DOMTools.parseHTML('<a href="#">' + hs + '</a>');
         
                DOMTools.on(link, 'click.tables', handleTable.bind(link, table));
         
                el = createElement('span', {
                    class: 'collapseLink',
                    childNodes: [
                        document.createTextNode('['),
                        link,
                        document.createTextNode(']')
                    ]
                });
         
                $a(th, el);
         
                if (DOMTools.hasClass(table, 'collapsed')) {
                    tr = DOMTools.query('td', table).parentElement;
                    DOMTools.css(tr, 'display', 'none');
                }
            }
         
            function collapseText(table) {
                return DOMTools.hasClass(table, 'collapsed') ? 'show' : 'hide';
            }
         
            function handleTable(t, e) {
                e.preventDefault();
                collapseTable(this, t);
            }
         
            function collapseTable(e, t) {
                $elems = $(DOMTools.query('td', t).parentElement);
                if (DOMTools.hasClass(t, 'collapsed')) {
                    $elems.show('fast');
                    DOMTools.removeClass(t, 'collapsed');
                    e.textContent = collapseText(t);
                } else {
                    $elems.hide('fast');
                    DOMTools.addClass(t, 'collapsed');
                    e.textContent = collapseText(t);
                }
            }
        })();
    }
    
    wait();
})();

/**
 * Utility
 */
function createElement(type, properties) {
    var attributes, element, events, prop, name, len, val, ev, ty, pr, i;
 
    type = type || '';
    properties = properties || {};
 
    ty = type.constructor.name;
    pr = properties.constructor.name;
 
    if (ty !== 'String' || pr !== 'Object') 
        throw new TypeError('Expected: String, Object. Received: ' + ty + ', ' + pr);
 
    element = document.createElement(type);
 
    attributes = [
        'text',
        'class'
    ];
 
    events = [
        'click',
        'dblclick',
        'contextmenu',
        'keyup',
        'keydown',
        'keypress',
        'mouseup',
        'mousedown',
        'mousemove',
        'mouseover',
        'mouseout',
        'mouseenter',
        'mouseleave'
    ];
 
    for (prop in properties) {
        val = properties[prop] || 0;
 
        if (!val) continue;
 
        name = val.constructor.name;
 
        if (attributes.includes(prop)) {
            if (prop === 'text') {
                element.textContent = val;
                continue;
            }
 
            element.setAttribute(prop, val);
        } else if (events.includes(prop) && name === 'Function') {
            element.addEventListener(prop, val, false);
        } else if (prop === 'dataset' && name === 'Object') {
            for (i in val) element[prop][i] = val[i];
        } else if (prop === 'childNodes' && name === 'Array') {
            i = 0; len = val.length;
            for (i; i < len; i++) {
                if (![1, 3].includes(val[i].nodeType)) continue;
 
                $a(element, val[i]);
            }
        } else {
            element[prop] = val;
        }
    }
 
    element.props = properties;
 
    return element;
}

function $_(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function $a(target, element) {
    if (!target) return;
    return target.appendChild(element);
}

/*@end@*/