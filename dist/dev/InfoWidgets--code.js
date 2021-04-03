/**
 * module (Info)Widgets
 * documentation at: https://dev.wikia.com/wiki/InfoWidgets
 * used files: [[File:Facebook throbber.gif]]
 * © Peter Coester, 2012
 * 
 */

var Widgets = function () {
    
    var widgets = [];
    var lastUpdate = false;
    
    var my = {
        
        // preconfigurations:
        
        activeTalks: function () {
            return {
                type: 'api',
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'recentchanges',
                    rctype: 'new|edit',
                    rclimit: 40,
                    rcshow: '!redirect',
                    rcprop: 'title',
                    rcnamespace: '1|3|5|7|9|11|13|15|110|111|401|500|501|502|503'
            }};
        },
        
        contribs: function () {
            return {
                fallback: 'Special:UserLogin',
                type: 'api',
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'usercontribs',
                    uclimit: 40,
                    ucuser: window.wgUserName !== undefined && wgUserName ? encodeURIComponent(wgUserName) : '',
                    ucprop: 'title'
            }};
        },
        
        newPages: function () {
            return {
                type: 'api',
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'recentchanges',
                    rctype: 'new',
                    rclimit: 20,
                    rcshow: '!redirect',
                    rcprop: 'title',
                    rcnamespace: 0
            }};
        },

        newFiles: function () {
            return {
                type: 'api',
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'recentchanges',
                    rclimit: 20,
                    rcshow: '!redirect',
                    rcprop: 'title',
                    rcnamespace: 6
            }};
        },
        
        recentChanges: function () {
            return {
                type: 'api',
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'recentchanges',
                    rctype: 'edit',
                    rclimit: 50,
                    rcshow: '!redirect',
                    rcprop: 'title'
            }};
        },
        
        stubs: function () {
            return {
                type: 'api',
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'categorymembers',
                    cmtitle: 'Category:Article_stubs',
                    cmlimit: 10,
                    cmsort: 'timestamp'
            }};
        },
        
        watchlist: function () {
            return {
                fallback: 'Special:UserLogin',
                type: 'api',
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'watchlist',
                    wlprop: 'title'
            }};
        },
        
        wantedPages : function () {
            return {
                traversal: 'entry title',
                type: 'rss',
                params: {
                    title: 'Special:WantedPages',
                    feed: 'atom',
                    limit: 20,
                    offset: 0
            }};
        },
        
        // main public functions:
        
        add: function (widget) {
            if (!widget.selector) throw new Error('no selector for container provided');
            widget.container = $(widget.selector);
            if (!widget.container.length) throw new Error('widget container cannot be found');
            if (!widget.params) throw new Error('no query parameters provided');
            if (undefined === widget.type) widget.type = 'api';
            switch (widget.type) {
                case 'api':
                    widget.dataType = widget.params.format = 'json';
                    if (undefined === widget.traversal) {
                        widget.traversal = [widget.params.action, widget.params.list, 'title'];
                    }
                    widget.extract = jsonExtract;
                    widget.url = '/api.php';
                break;
                case 'rss':
                    widget.dataType = 'xml';
                    if (undefined === widget.traversal) throw new Error('no traversal specified');
                    widget.extract = xmlExtract;
                    widget.url = '/index.php';
                break;
                default: throw new Error('unknown widget type');
            }
            if (undefined === widget.fallback)   widget.fallback = '';
            if (undefined === widget.active)     widget.active = true;
            if (undefined === widget.maxResults) widget.maxResults = 10;
            if (!$.isFunction(widget.format))   widget.format = format;
            if (!$.isFunction(widget.preload))  widget.preload = preload;
            if (!$.isFunction(widget.postload)) widget.postload = postload;
            if (!$.isFunction(widget.error))    widget.error = function () {};
            widgets.push(widget);
        },
        
        interval: false,
        
        start: function () {
            cycleThroughWidgets();
            $(window).focus(function () { cycleThroughWidgets(); } );
            $(window).blur (function () { 
                if (Widgets.interval) window.clearInterval(Widgets.interval);
                Widgets.interval = false;
            });
        },
        
        restart : function () {
            if (Widgets.interval) window.clearInterval(Widgets.interval);
            Widgets.interval = false;
            lastUpdate = false;
            cycleThroughWidgets();
        }
    };
    
    function ajaxQuery (current) {
        current.container.empty();
        current.preload(current.container);
        $.ajax({
            type: 'GET',
            data: current.params,
            async: true,
            cache: false,
            error: current.error,
            complete: function () {
                current.postload(current.container);
            },
            url: current.url,
            dataType: current.dataType,
            success: function (response, textStatus, jqXHR) {
                var results = current.extract(response, current.traversal);
                if (!results.length) results.push(current.fallback);
                current.container.append(current.format(results, current.maxResults));
            }
        });
    }

    function cycleThroughWidgets () {
        if (lastUpdate && Date.now() - lastUpdate < 61000) return;
        lastUpdate = Date.now();
        if (!Widgets.interval) {
            Widgets.interval = window.setInterval(
            function () {
                cycleThroughWidgets();
            }, 20000 );
        }
        for (var i = 0; i < widgets.length; i++) {
            if (!widgets[i].active) continue;
            ajaxQuery(widgets[i]);
        }
    }
    
    function format (titles, maxResults) {
        var html = '';
        var doublettes = [];
        for (var i = 0; i < titles.length && doublettes.length <= maxResults; i++) {
            if (-1 == $.inArray(titles[i], doublettes)) {
                doublettes.push(titles[i]);
                html += '<li><a href="'+mw.util.getUrl(titles[i])+'">'+titles[i]+'</a></li>';
            }
        }
        return html.length ? '<ul>'+html+'</ul>' : '';
    }
    
    function preload (container) {
        container.css({
            backgroundImage: 'url(https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        });
    }
    
    function postload (container) {
        container.css( {backgroundImage: 'none'} );
    }
    
    function jsonExtract (response, traversal) {
        var prop = traversal[traversal.length - 1];
        var results = [];
        for (var i = 0, t = response; i < traversal.length - 1; i++) {
            if (undefined === t[traversal[i]]) return []; //throw new Error(traversal[i] + ' not found');
            t = t[traversal[i]];
        }
        for (i = 0; i < t.length; i++) {
            if (undefined === t[i][prop]) return []; //throw new Error(prop + ' not found');
            results.push(t[i][prop]);
        }
        return results;
    }
    
    function xmlExtract (response, traversal)
    {
        var results = [];
        var nodes = $(response).find(traversal);
        for (var i = 0; i < nodes.length; i++) {
            results.push(nodes[i].firstChild.nodeValue);
        }
        return results;
    }
    
    return my;

}();

$(function () {
    if ($.isFunction(window.widgetsLoaded)) {
        window.widgetsLoaded();
        Widgets.start();
    }
});