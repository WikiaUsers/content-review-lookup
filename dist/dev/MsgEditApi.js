// msg-edit api
// todo: find alternative 4 GlobalTriggers (editor.ready event)

(function ($, noSettings) {
    // settings
    // var noSettings = (window.fng || {}).ngMsgEditAPI || {};
    // obviously
    noSettings.debug = $.getUrlVar('debug') || (typeof(noSettings.debug) !== 'undefined' ? noSettings.debug : false);
    // namespaces allowed: 0: main, 500: blog, 1201: forum
    var nNamespace = mw.config.get('wgNamespaceNumber'),
        nNamespaces = [0, 500, 1201].concat(noSettings.namespaces instanceof Array ? noSettings.namespaces : []);
    
    var log = function () {
        if (!noSettings.debug) return;
        var a = [].slice.call(arguments);
        a.unshift('mea');
        console.log.apply(this, a);
    };// log

    if (nNamespaces.indexOf(nNamespace) < 0) {
        log('wrong namespace', nNamespace);
        if (!noSettings.debug) return;
    }

    window.i = typeof(window.i) === 'undefined' ? 0 : window.i;// globaltriggers.bind fix
    
    function nsetSelection(npiTarget, npiStart, npiEnd) {
        // ve has not textarea.
        // need some correct element for ve.focus. not in the frame.
        log('setSelection.', npiTarget, npiStart);
        $(npiTarget)[0].focus();
        $(npiTarget)[0].scrollTop = $(npiTarget)[0].scrollHeight;
        log('setSelection.', $(npiTarget)[0].scrollTop, $(npiTarget)[0].scrollHeight);
        var nStart = npiStart;
        var nEnd = npiStart;
        if (npiEnd)
            nEnd = npiEnd;
        if ($(npiTarget)[0].setSelectionRange) {// DOM
            log('setSelection.notIE');
            $(npiTarget)[0].focus();
            window.getSelection().removeAllRanges();
            $(npiTarget)[0].setSelectionRange(nStart, nEnd);
        } else if (npiTarget.createTextRange) {// IE
            log('setSelection.IE');
            document.selection.empty();
            var range = $(npiTarget)[0].createTextRange();
            $(npiTarget)[0].focus();
            range.collapse(true);
            range.moveEnd('character', nEnd);
            range.moveStart('character', nStart);
            range.select();
        }
        return false;
    }// nsetSelection

    function getContent() {
        // get *book content
        log('getcontent', this);
        return this.val();
    }// getcontent

    function setContent(content) {
        // set *book
        log('setcontent', this, content);
        return this.val(content);
    }// setcontent

    function setMode(mode) {
        log('setmode', mode);
    }// setmode

    function rte2wiki(content) {
        // extract wikitext from rte-content
        // destroys html comments. document it, let it be "by design"
        var c = $('<div>', {html: content});
        c.find('[data-rte-meta]').replaceWith(function() {
            var $this = $(this);
            var jstring = decodeURIComponent($('<div>', {html: $this.data('rteMeta')}).text());
            var jo = JSON.parse(jstring);
            return jo.wikitext ? jo.wikitext : this;
        });// replacewith
        // 2nd round: deal with from-parser
        c = c.wrap('<div>').parent();// wrap
        c.find('[data-rte-fromparser="true"]').replaceWith(function() {
            return this.innerHTML;
        });// replacewith2
        c.replaceWith(c.get(0).innerHTML);// cuz .unwrap() sucks
        return c.html();
    }// rte2wiki

    // interface
    var nMsgEditAPI = {
        
        settings: noSettings,
        
        log: function () {
            if (!noSettings.debug) return;
            var a = [].slice.call(arguments);
            a.unshift('mea');
            console.log.apply(this, a);
        },//log. shadow

        version: 4,

        rte2wiki: rte2wiki,
    
        defaultEditor: {
            getContent: getContent,
            setContent: setContent,
            setMode: setMode,
            mode: 'source'
        },//defaulteditor

        getMessageHelper: function getMessageHelper () {
            this.log('gmh');
            var editor, MEW, msg;
            if (window.WikiaEditor) {
                editor = window.WikiaEditor.getInstance();
                if (!editor) return '';
                if ((editor.mode !== 'source') && window.CKEDITOR && window.CKEDITOR.tools) {
                    window.CKEDITOR.tools.callFunction(2, editor);
                }
            } else {
                this.log('gmh editor not found');
                var $btnsubmit = $('input[name="wpArticleSubmit"]:first');
                if (!$btnsubmit.length) {
                    this.log('gmh btnsubmit not found');
                    return '';
                }
                MEW = $btnsubmit.closest('.article-comm-input-text');// reply
                MEW = MEW.length ? MEW : $btnsubmit.closest('.article-comm-form');// new comment
                if (!MEW.length) {
                    this.log('sm mew.len=0');
                    return '';
                }
                editor = MEW.find('.editarea textarea:first').data('wikiaEditor');
                if (!editor) {
                    this.log('gmh editor not found for', MEW);
                    // monobook presumed is
                    // wikiaeditor emulation mode on
                    editor = MEW.find('textarea:first');
                    editor.element = MEW;
                    editor.extend(true, this.defaultEditor);
                }// if !editor
            }// if wikiaeditor
            this.log('gmh editor', editor);
            msg = editor.getContent();
            // this shouldn't be true, cuz editor supposed to be in the source mode already
            if (msg && editor.mode === 'wysiwyg') msg = this.rte2wiki(msg);
            return  msg ? msg : '';
        },// getMessageHelper

        getMessage: function getMessage () {
            // returns weird proxy in order to keep backward compatibility
            //  and probably ruin smth
            // getMessage.promise.then(...) is new right way
            //  to deal with classic editor
            this.log('gm');
            var editor, cachedMessage,
                me = this,
                def = $.Deferred(),
                proxy = {
                    get: function(obj, prop) {
                        switch (prop) {
                        case 'promise':
                            return def.promise();
                        default:
                             cachedMessage = (typeof(cachedMessage) === 'undefined') ? me.getMessageHelper() : cachedMessage;
                             if (typeof(cachedMessage[prop]) === 'function') {
                                 return cachedMessage[prop].bind(cachedMessage);
                             } else {
                                 return cachedMessage[prop];
                             }
                        }
                    },// get
                    set: function(obj, prop, val) {
                        switch (prop) {
                        case 'promise':
                            break;
                        default:
                            cachedMessage = (typeof(cachedMessage) === 'undefined') ? me.getMessageHelper() : cachedMessage;
                            cachedMessage[prop] = val;
                        }
                    },// set
                },
                ret = new Proxy(String, proxy);
            if (window.WikiaEditor) {
                editor = window.WikiaEditor.getInstance();
                if (!editor) {
                    def.resolve(me.getMessageHelper());
                    return ret;
                }
                if ((editor.mode !== 'source') && window.CKEDITOR && window.CKEDITOR.tools) {
                    window.CKEDITOR.tools.callFunction(2, editor);
                    var timer = setInterval(function() {
                        // w8 until mode will changed
                        if (!editor) {
                            // smth rly bad happened
                            me.log('gmtimer emergency stop: editor is lost');
                            clearInterval(timer);
                            def.resolve(me.getMessageHelper());
                            return;
                        }
                        if (editor.state === 1) {
                            clearInterval(timer);
                            me.log('gmtimer state=1');
                            def.resolve(me.getMessageHelper());
                        }
                    }, 100);
                } else {
                    def.resolve(me.getMessageHelper());
                }// if !source
            } else {
                def.resolve(me.getMessageHelper());
            }// if wikiaeditor
            return ret;
        },// getMessage

        setMessage: function setMessage (msg) {
            // setmsg may be called synchronously
            //  atm at least
            this.log('sm msg', msg);
            var MEW, editor;
            if (window.MiniEditor || window.CKEDITOR) {
                if (window.WikiaEditor) {
                    editor = window.WikiaEditor.getInstance();
                }// if wikiaeditor
                if (editor) {
                    if ((editor.mode !== 'source') && window.CKEDITOR && window.CKEDITOR.tools) {
                        window.CKEDITOR.tools.callFunction(2, editor);
                    }
                    log('sm we', editor);
                    editor.setContent(msg);
                    return;
                } else {
                    this.log('sm editor not found');
                    // create instance
                    GlobalTriggers.bind('WikiaEditorReady', function WikiaEditor_onReady(editor) {
                        if (typeof(log) === 'function') log('sm gt.wer', editor);
                        // GlobalTriggers.unbind('WikiaEditorReady', WikiaEditor_onReady);
                        // workaround until unbind is fixed
                        var events = (window.GlobalTriggers || {}).events;
                        if (events && events.WikiaEditorReady) {
                            for (var i in events.WikiaEditorReady) 
                                if (events.WikiaEditorReady[i].fn == WikiaEditor_onReady) {
                                    events.WikiaEditorReady.splice(i, 1);
                                    break;
                                }
                        }
                        if ((editor.mode !== 'source') && window.CKEDITOR && window.CKEDITOR.tools) {//editor.ck && editor.ck.setMode) {
                            window.CKEDITOR.tools.callFunction(2, editor);
                            //editor.ck.setMode('source');
                        }
                        editor.setContent(msg);
                        //setTimeout(setMessageHelper1.bind(this, editor, msg), 100);
                    });
                    // article comments: #article-comments-minieditor-newpost
                    // forum comments: .new-reply
                    MEW = $('#article-comments-minieditor-newpost textarea').first();
                    // wall comments
                    MEW = MEW.length ? MEW : $('MiniEditorWrapper active').first();
                    // new reply
                    MEW = MEW.length ? MEW : $('.new-reply textarea').first();
                    if (!MEW.length) return;
                    MEW.focus();
                    return;
                }// if editor
            }// if minieditor
            this.log('sm we not found');
            // monobook presumed is
            // wikiaeditor emulation mode on
            //MEW = $('.article-comm-form:first');
            var $btnsubmit = $('input[name="wpArticleSubmit"]:first');
            if (!$btnsubmit.length) {
                this.log('sm btnsubmit not found');
                return;
            }
            MEW = $btnsubmit.closest('.article-comm-input-text');// reply
            MEW = MEW.length ? MEW : $btnsubmit.closest('.article-comm-form');// new comment
            if (!MEW.length) {
                this.log('sm mew.len=0');
                return;
            }
            editor = MEW.find('textarea:first');
            editor.element = MEW;
            editor.extend(true, this.defaultEditor);
            return editor.setContent(msg);
        },// setMessage

    };// nmsgeditapi obj

    // main
    log('main start');
    window.fng = window.fng || {};
    if (window.fng.ngMsgEditAPI && window.fng.ngMsgEditAPI.version) {
        log('main already running ', window.fng.ngMsgEditAPI);
        return true;
    }
    window.fng.ngMsgEditAPI = nMsgEditAPI;
    log('fire', nMsgEditAPI);
    mw.hook('nmsgeditapi.ready').fire(nMsgEditAPI);

})(jQuery, (window.fng || {}).ngMsgEditAPI || {});