!function(cfg) {
    // unified control panel. codename: ucp
    // fancy switches to do fancy actions

    // proxyfy the cfg
    var _trans = {
            get: function(obj, prop) {
                // check whether msg is exists and return it
                // undef means original msg (from the element definition)
                if (cfg.i18nMessages && prop) {
                    var msg = cfg.i18nMessages.msg(prop).plain();
                    if (msg === '<' + prop + '>') msg = undefined;
                    return msg;
                }
                if (obj.hasOwnProperty(prop)) return obj[prop];
            },
            set: function(obj, prop, value) {
                obj[prop] = value;
            },
        },
        _cfg = {
            get: function(obj, prop) {
                if (prop === 'trans') {
                    return this._trans;
                }
                if (obj.hasOwnProperty(prop)) return obj[prop];
            },
            set: function(obj, prop, value) {
                if (prop === 'trans') {
                    this._trans = new Proxy(value, _trans);
                } else {
                    obj[prop] = value;
                }
            },
        };
    
    cfg = new Proxy(cfg, _cfg);

    // clone urlvars in order to preserve it natural
    var urlVars = cloneObject($.getUrlVars());
    cfg.debug = cfg.debug || urlVars.debug;
    if (cfg.loaded && !cfg.debug) return;
    cfg.loaded = !0;
    cfg.mwc = mw.config.get(['wgSassParams', 'wgUserLanguage']);

    function log() {
        if (!cfg.debug) return;
        var a = [].slice.call(arguments);
        a.unshift('ucp');
        console.log.apply(this, a);
    }// log

    function cloneObject(what) {
        // cuz $.extend and json.parse(.stringify) loses x when x undefined is
        if (!what) return;
        var cloned = {};
        for (var i in what) if (what.hasOwnProperty(i)) cloned[i] = what[i];
        return cloned;
    }// cloneObject

    function updateAction(source, target) {
        // updates target actions. source: source
        // source: {action.id: action}
        // target: actions = []
        if (!source || !Object.keys(source).length) return;
        log('ua.source', source);
        Object.values(source).forEach(function(sourceAction) {
            // update target
            var targetIndex = Object.values(target).findIndex(function(action) {
                return action.id === sourceAction.id;
            });
            log('ua.index', targetIndex, sourceAction);
            if (targetIndex === -1) targetIndex = target.length;
            target[targetIndex] = $.extend(true, target[targetIndex], sourceAction);
            log('ua.newtarget', target[targetIndex]);
        });
    }// updateAction

    function preload(globalActions, data) {
        // preloads data from data or current location
        // globalActions: actions to check against data
        //  in order to convert data more precisely
        // returns actions = {action: data}
        data = data || urlVars;
        if (!data || !Object.keys(data).length) return;
        var actions = {};
        Object.keys(data).forEach(function(key) {
            if (!key) return;
            var ga;
            // if action is in globalActions
            ga = globalActions.map(function(v) {
                return (v.id === key || v.action === key + '=' + data[key]) ? v : false;
            }).filter(Boolean)[0];
            log('p.ga', ga);
            actions[key] = {
                id: ga ? ga.id : key,
                action: ga ? ga.action : key,
                caption: ga ? ga.caption : key,
                checked: true,
                hasInput: ga ? ga.hasInput : (typeof(data[key]) === 'undefined' ? undefined : true),
                inputVal: typeof(data[key]) === 'undefined' ? undefined : data[key],
            };
        });
        return actions;
    }// preload

    function btnShowForm_click() {
        if (cfg.form.parents('html').length) {
            // attached to the dom. detach it
            btnCancel_click();
        } else {
            // not attached yet
            cfg.form.prependTo('#WikiaPage:first');
            // set size and position
            cfg.form.offset({
                top: $(window).scrollTop() + ((($(window).height() - cfg.form.height()) / 2 > 0) ? ($(window).height() - cfg.form.height()) / 2 : 0),
                left: $(window).scrollLeft() + ((($(window).width() - cfg.form.width()) / 2 > 0) ? ($(window).width() - cfg.form.width()) / 2 : 0)
            });
            log('sf.offset', cfg.form.offset());
        }
    }// btnShowForm_click
    
    function btnCancel_click() {
        cfg.form = cfg.form.detach();
    }// btnCancel_click
    
    function btnDo_click() {
        // do stuff
        // actions are not encoded. by design
        var actions = [];

        cfg.form.find('.ucp-action input:checked').each(function() {
            var $chkbox = $(this),
                $action = $chkbox.closest('.ucp-action'),
                $input = $action.find('input[type="text"]'),
                action = $action.data('action'),
                actionValue = $input.val() || null;
            actions.push(action + (actionValue === null ? '' : '=' + actionValue));
        });// each action.input:checked

        actions = actions.filter(Boolean);
        if (!actions.length && !location.search) {
            // nothing to do
            btnCancel_click();
            return;
        }
        log('dc.actions', actions);
        // will keep ? at the end of the url. by design
        location.search = actions.length ? '?' + actions.join('&') : '';
    }// btnDo_click

    function txt_click(e) {
        if (typeof(this.select) === 'function') this.select();
    }// txt_click
    
    function getLimitReport() {
        // returns pp limit reports
        log('glr');
        var comment,
            ret = [],
            nodeIterator = document.createNodeIterator(
                document.getElementById('mw-content-text') || document.body,
                NodeFilter.SHOW_COMMENT,
                function(node) {
                    return node.data && node.data.indexOf('NewPP') > -1 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
            );
        while (comment = nodeIterator.nextNode()) {
            // remove unnecessary header and add to the ret array
            ret.push(comment.data.replace(/[\s\n]*NewPP.*?\n/, ''));
        }
        log('glr.ret', ret);
        return ret.join('----------\n');
    }// getLimitReport
    
    function refreshLimitReport() {
        // re-read limit reports (to get data from tabviews etc)
        log('rlr');
        var limitReport = getLimitReport();
        // set data via class in order to allow external widgets
        if (limitReport) $('.ucp-widget-newpp').attr('title', limitReport);
    }// refreshLimitReport
    
    function createForm(actions) {
        // actions: [{id, action, caption, title, checked, hasInput, inputSize, inputPh, inputVal, params: [{param: value}]}]
        //  action.id is always equal to action name (raw for raw etc), unless it 2nd+ entry
        //  any other format might (and most probably will) not work on preload stage
        // trans: {id: text}
        // returns $form
        // encode/decode stuff totally on user is. by design
        importArticle({type: 'style', article: 'w:c:dev:MediaWiki:UnifiedControlPanel.css'});
        actions = $.isArray(actions) ? actions : [];
        var $form = $('<div>', {
                id: 'ucp-main',
            }),
            $btnDo = $('<span>', {
                class: 'ucp-btn ucp-btn-do wds-button',
                text: cfg.trans.btndotext || 'do it',
                title: cfg.trans.btndotitle || 'just do it',
            }),
            $btnCancel = $('<span>', {
                class: 'ucp-btn ucp-btn-cancel wds-button wds-is-secondary',
                text: cfg.trans.btncanceltext || 'cancel',
                title: cfg.trans.btncanceltitle || 'just don\'t',
            }),
            $bar = $('<div>', {
                class: 'ucp-bar',
            }),
            $widgetNewpp = $('<span>', {
                class: 'ucp-bar-widget ucp-widget-newpp wds-button wds-is-text',
                text: 'NewPP',
            });
        $btnDo.click(btnDo_click);
        $btnCancel.click(btnCancel_click);
        $widgetNewpp.click(refreshLimitReport);
        /*
        $form.on('keydown.ucp', function(e) {
            if (e && e.keyCode === 27) btnCancel_click();
        });
        */
        // add actions
        actions.forEach(function(action) {
            var $action = $('<span>', {
                    class: 'ucp-action',
                    id: 'ucp-action-' + action.id,
                    'data-action': action.action,
                }),
                $chkbox = $('<input>', {
                    type: 'checkbox',
                    id: 'ucp-chk-' + action.id,
                }),
                $label = $('<label>', {
                    'for': 'ucp-chk-' + action.id,
                    id: 'ucp-label-' + action.id,
                    text: cfg.trans[action.id + 'label'] || action.caption,
                    title: cfg.trans[action.id + 'title'] || action.title,
                }),
                $input = action.hasInput ? $('<input>', {
                    type: 'text',
                    id: 'ucp-input-' + action.id,
                    size: action.inputSize || 5,
                    placeholder: action.inputPh || '',// doesn't work; added later via .attr
                }) : null;
            // some adjustments            
            // for some weird reason placeholder can't be added as {plch:x} earlier
            if (action.hasInput) {
                $input.attr('placeholder', action.inputPh || '');
                if (typeof(action.inputVal) !== 'undefined') $input.val(action.inputVal);
            }
            // add preloaded values
            if (action.checked) $chkbox.attr('checked', 'CHECKED');
            $action.append($chkbox).append($label).append($input);
            $form.append($action);
        });
        $form.append('<br style="clear:both">');
        $form.append($btnDo).append($btnCancel);
        $form.append($bar);
        var limitReport = getLimitReport();
        if (limitReport) {
            // ensure that our widget is filled
            //  (will not be added by class, cuz still doesn't exist in the doc)
            $widgetNewpp.attr('title', limitReport);
            $widgetNewpp.appendTo($bar);
            // set data via class in order to allow external widgets
            $('.ucp-widget-newpp').attr('title', limitReport);
        }
        // some adjustments
        // set colors
        $form.css({
            'background-color': cfg.mwc.wgSassParams['color-page'],
            color: cfg.mwc.wgSassParams['color-links'],
        });
        // add text click handlers
        $form.find('input[type="text"]').click(txt_click);
        return $form;
    }// createForm

    function init(trans) {
        cfg.trans = cfg.trans || trans || {};
        var $btnShowForm = $('<li>', {
                class: 'ucp-btn-showform',
                text: cfg.trans.btnshowformtext || 'ucp',
                title: cfg.trans.btnshowformtitle || 'unified control panel',
            }),
            actions = $.isArray(cfg.actions) ? cfg.actions : [
            {
                id: 'raw',
                action: 'action=raw',
                caption: 'action=raw',
                title: 'Show raw content of the article',
            },
            {
                id: 'render',
                action: 'action=render',
                caption: 'action=render',
                title: 'Show rendered article content',
            },
            {
                id: 'credits',
                action: 'action=credits',
                caption: 'action=credits',
                title: 'Shows a list of people who contributed to the page',
            },
            {
                id: 'history',
                action: 'action=history',
                caption: 'action=history',
                title: 'Shows history of the page',
            },
            {
                id: 'purge',
                action: 'action=purge',
                caption: 'action=purge',
                title: 'Don\'t use it',
            },
            {
                id: 'debug',
                action: 'debug=1',
                caption: 'Debug mode',
                title: 'It\'s not the test mode',
            },
            {
                id: 'safemode',
                action: 'safemode=1',
                caption: 'Safe mode',
                title: 'Turn off all js/css',
            },
            {
                id: 'usesitejs',
                action: 'usesitejs',
                caption: 'Turn off sitewide js',
                title: 'Turn the shit off',
            },
            {
                id: 'usesitecss',
                action: 'usesitecss',
                caption: 'Turn off sitewide css',
                title: 'Turn the shit off',
            },
            {
                id: 'useuserjs',
                action: 'useuserjs',
                caption: 'Turn off user js',
                title: 'Turn the shit off',
            },
            {
                id: 'useusercss',
                action: 'useusercss',
                caption: 'Turn off user css',
                title: 'Turn the shit off',
            },
            {
                id: 'uselang',
                action: 'uselang',
                caption: 'uselang=lang',
                title: 'Use chosen lang',
                hasInput: !0,
                inputSize: 6,
                inputPh: 'lang',
                inputVal: 'qqx',
            },
            {
                id: 'useskin',
                action: 'useskin',
                caption: 'useskin=skin',
                title: 'Use chosen skin',
                hasInput: !0,
                inputSize: 7,
                inputPh: 'skin',
                inputVal: 'mercury',
            },
            {
                id: 'diff',
                action: 'diff',
                caption: 'Show diff',
                title: 'Use the text field to set diff params',
                hasInput: !0,
                inputSize: 10,
                inputPh: 'id&oldid=oldid',
            },
        ];
        actions = actions.concat(cfg.moreactions || []).filter(Boolean);
        updateAction(preload(actions), actions);
        log('init.actions', actions);
        // cfg.actions = actions;
        $('#WikiaBar .tools .ucp-btn-showform').remove();
        $btnShowForm.click(btnShowForm_click);
        $('#WikiaBar .tools:first').append($btnShowForm);
        if (cfg.form) cfg.form.detach();
        cfg.form = createForm(actions);
        cfg.refreshLimitReport = refreshLimitReport;
    }// init

    function i18nLoad() {
        if (cfg.i18nloaded) return;
        cfg.i18nloaded = !0;
        mw.hook('dev.i18nbeta').add(function(i18n) {
            cfg.i18n = i18n;
            i18n.loadMessages('UnifiedControlPanel').done(function(msgs) {
                cfg.trans = i18n._getMsgs(msgs._messages,
                    ['btnshowformtext', 'btnshowformtitle', 'btndotext', 'btndotitle', 'btncanceltext', 'btncanceltitle'],
                    cfg.mwc.wgUserLanguage);
                cfg.i18nMessages = msgs;
                cfg.i18nreallyloaded = !0;
                init();
            });
        });
        if (!window.dev || !window.dev.i18nbeta) importArticle({type: 'script', article: 'u:dev:I18n-js/beta.js'});
    }// i18nLoad

    cfg.init = init;// backup way; just in case
    i18nLoad();
    
    // if i18n wasn't loaded for 10s, then fuck it
    setTimeout(function() {
        if (!cfg.i18nreallyloaded) init();
    }, 10000);
}((window.fng = window.fng || {}).ucp = window.fng.ucp || {});