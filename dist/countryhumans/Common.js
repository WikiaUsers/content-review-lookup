/**
 * Any JavaScript here will be loaded for all users on every page load.
 */
 
 window.MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 due to: $1',
  autocheck : true
};

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
                channel: '804232376682020893',
                server: '804232375784964120',
                shard: 'https://disweb.dashflo.net',
                color: '#1B1149',
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

/* Calendar (Credits to Bieberpedia Wiki)*/
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var date = new Date();
var currentMonth = date.getMonth();
var currentDay = date.getDate() - 1;
var viewMonth = currentMonth;
 
function initCalendar() {
    // Parse month and day, not implemented
    loadMonth(currentMonth);
}
 
function loadMonth(month) {
    $('#cal #month').text(months[month]);
    var newMonth = '';
    for (var i = 0; i < days[month]; i++) {
        var classes = (month == currentMonth && i == currentDay) ? "day current" : "day";
        newMonth = newMonth + '<a href="/wiki/' + (i+1) + '_' + months[month] + '"><div class="' + classes + '">' + (i+1) + '</div></a>';
    }
    $('#cal #cal-frame').fadeOut('fast', function() {
        $('#cal #cal-frame').html(newMonth).fadeIn('fast');
    });
    viewMonth = month;
}
 
$(document).ready(function() {
    initCalendar();
    $('#cal #prev').click(function() {
        loadMonth((viewMonth - 1 + 12) % 12);
    });
    $('#cal #next').click(function() {
        loadMonth((viewMonth + 1) % 12);
    });
});

/* Any JavaScript here will be loaded for all users on every page load. */
/*Usertags from Dev Wiki*/
window.UserTagsJS = {
	modules: {},
	tags: {
		miyeonbiased: { u:'Miyeon Biased'},
		minniebiased: { u:'Minnie Biased'},
		shuhuabiased: { u:'Shuhua Biased'},
		soojinbiased: { u:'Soojin Biased'},
		soyeonbiased: { u: 'Soyeon Biased'},
		yuqibiased: { u:'Yuqi Biased'},
		maknae: { u:'Maknae'},
	}
};
 

 
/*Template:Username*/
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
 
/*Blog Comment*/
window.LockOldBlogs = {
    expiryDays: "infinite",
    expiryMessage: "This blog is considered archived because it hasn't been commented on in over <expiryDays> days, please don't bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};
 
/*Welcome Module (Sia Wiki)*/
$(function() {
    var welcome;
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:NewUser',
            disablepp: '',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').append(
                $('<section>')
                    .addClass('module')
                    .addClass('welcome-module')
                    .append(
                        $('<h2>')
                            .addClass('activity-heading')
                            .text('Welcome to the (G)I-DLE Wiki!')
                    )
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                data.parse.text['*'].replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'anonymous user'))
                            )
                            .append(
                                $('<div>')
                                    .addClass('buttons-container')
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .attr('id', 'remove')
                                            .text('Don\'t show again')
                                    )
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .addClass('talk')
                                            .addClass('comments')
                                            .addClass('secondary')
                                            .attr('id', 'cancel')
                                            .text('Cancel')
                                    )
                            )  
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('.welcome-module .anons').show();
            }
            $('.welcome-module #remove').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 4);
                $('.welcome-module').fadeOut('slow');
            });
            $('.welcome-module #cancel').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), ++welcome);
                $('.welcome-module').fadeOut('slow');
            });
        });
    }
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});