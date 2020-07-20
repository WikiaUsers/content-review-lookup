//msg-edit api
//dependencies: common.js/emo.js, common.js/Quotes.js
//maintainer: user:fngplg
//import: importArticles({type:'script', articles: ['u:ru.borderlands:MessageEditAPI.js']});
//todo: find alternative 4 GlobalTriggers (editor.ready event)

(function ($) {
    //settings
    var noSettings = (window.fng || {}).ngMsgEditAPI || {};
    //obviously
    noSettings.debug = $.getUrlVar('debug') || (typeof(noSettings.debug) !== 'undefined' ? noSettings.debug : false);
    //namespaces allowed: 0: main, 500: blog, 1201: forum
    var nNamespace = mw.config.get('wgNamespaceNumber'),
        nNamespaces = [0, 500, 1201].concat(noSettings.namespaces instanceof Array ? noSettings.namespaces : []);
    
    var log = function () {if (noSettings.debug) console.log.apply(this, arguments);};//log

    if (nNamespaces.indexOf(nNamespace) < 0) {
        log('mea. wrong namespace', nNamespace);
        return;
    }

    window.i = typeof(window.i) === 'undefined' ? 0 : window.i;//globaltriggers.bind fix
    
    function nsetSelection(npiTarget, npiStart, npiEnd) { //, npiTarget2) {
        //ve has not textarea.
        //need some correct element for ve.focus. not in the frame.
        log('setSelection.', npiTarget, npiStart);
        $(npiTarget)[0].focus();
        $(npiTarget)[0].scrollTop = $(npiTarget)[0].scrollHeight;
        log('setSelection.', $(npiTarget)[0].scrollTop, $(npiTarget)[0].scrollHeight);
        var nStart = npiStart;
        var nEnd = npiStart;
        if (npiEnd)
            nEnd = npiEnd;
        if ($(npiTarget)[0].setSelectionRange) { //DOM
            log('setSelection.notIE');
            $(npiTarget)[0].focus();
            window.getSelection().removeAllRanges();
            $(npiTarget)[0].setSelectionRange(nStart, nEnd);
        } else if (npiTarget.createTextRange) { //IE
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
    } //nsetSelection

    function getContent () {
        //get *book content
        log('mea.getcontent', this);
        return this.val();
    }//getcontent

    function setContent (content) {
        //set *book
        log('mea.setcontent', this, content);
        return this.val(content);
    }//setcontent

    function setMode (mode) {
        log('mea.setmode', mode);
    }//setmode

    function rte2wiki (content) {
        //extract wikitext from rte-content
        var c = $('<div>', {html: content});
        c.find('[data-rte-meta]').replaceWith(function () {
            var $this = $(this);
            var jstring = decodeURIComponent($('<div>', {html: $this.data('rteMeta')}).text());
            var jo = JSON.parse(jstring);
            return jo.wikitext ? jo.wikitext : this;
        });//replacewith
        //2nd round: deal with from-parser
        c = c.wrap('<div>').parent();//wrap
        c.find('[data-rte-fromparser="true"]').replaceWith(function () {
            return this;
        });//replacewith2
        c.get(0).outerHTML = c.get(0).innerHTML;//cuz .unwrap() sucks
        return c.html();
    }//rte2wiki

    //interface
    var nMsgEditAPI = {
        
        settings: noSettings,
        
        log: function(){if (this.settings.debug) console.log.apply(this, arguments);},//log. shadow

        version: 3.1,

        rte2wiki: rte2wiki,
    
        defaultEditor: {
            getContent: getContent,
            setContent: setContent,
            setMode: setMode,
            mode: 'source'
        },//defaulteditor

        getMessage: function getMessage ($target) {
            this.log('mea.gm target', $target);
            var editor, MEW, msg;
            if (window.WikiaEditor) {
                editor = window.WikiaEditor.getInstance();
                if (!editor) return '';
            } else {
                this.log('mea.gm editor not found');
                var $btnsubmit = $('input[name="wpArticleSubmit"]:first');
                if (!$btnsubmit.length) {
                    this.log('mea.gm btnsubmit not found');
                    return '';
                }
                MEW = $btnsubmit.closest('.article-comm-input-text');//reply
                MEW = MEW.length ? MEW : $btnsubmit.closest('.article-comm-form');//new comment
                if (!MEW.length) {
                    this.log('mea.sm mew.len=0');
                    return '';
                }
                editor = MEW.find('.editarea textarea:first').data('wikiaEditor');
                if (!editor) {
                    this.log('mea.gm editor not found for', MEW);
                    //monobook presumed is
                    //wikiaeditor emulation mode on
                    editor = MEW.find('textarea:first');
                    editor.element = MEW;
                    editor.extend(true, this.defaultEditor);
                }//if !editor
            }//if wikiaeditor
            this.log('mea.gm editor', editor);
            msg = editor.getContent();
            if (msg && editor.mode === 'wysiwyg') msg = this.rte2wiki(msg);
            return  msg ? msg : '';
        },//getMessage

        setMessage: function setMessage (msg) {
            this.log('mea.sm msg', msg);
            var MEW, editor;
            if (window.MiniEditor) {
                if (window.WikiaEditor) {
                    editor = window.WikiaEditor.getInstance();
                }//if wikiaeditor
                if (editor) {
                    if ((editor.mode !== 'source') && window.CKEDITOR && window.CKEDITOR.tools) {//editor.ck && editor.ck.setMode) {
                        window.CKEDITOR.tools.callFunction(2, editor);
                        //editor.ck.setMode('source');
                    }
                    log('mea.sm we', editor);
                    editor.setContent(msg);
                    return;
                } else {
                    this.log('mea.sm editor not found');
                    //create instance
                    GlobalTriggers.bind('WikiaEditorReady', function WikiaEditor_onReady (editor) {
                        if (typeof(log) === 'function') log('mea.sm gt.wer', editor);
                        //GlobalTriggers.unbind('WikiaEditorReady', WikiaEditor_onReady);
                        //workaround until unbind is fixed
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
                    //article comments: #article-comments-minieditor-newpost
                    //forum comments: .new-reply
                    MEW = $('#article-comments-minieditor-newpost textarea').first();
                    //wall comments
                    MEW = MEW.length ? MEW : $('MiniEditorWrapper active').first();
                    //new reply
                    MEW = MEW.length ? MEW : $('.new-reply textarea').first();
                    if (!MEW.length) return;
                    MEW.focus();
                    return;
                }//if editor
            }//if minieditor
            this.log('mea.sm we not found');
            //monobook presumed is
            //wikiaeditor emulation mode on
            //MEW = $('.article-comm-form:first');
            var $btnsubmit = $('input[name="wpArticleSubmit"]:first');
            if (!$btnsubmit.length) {
                this.log('mea.sm btnsubmit not found');
                return;
            }
            MEW = $btnsubmit.closest('.article-comm-input-text');//reply
            MEW = MEW.length ? MEW : $btnsubmit.closest('.article-comm-form');//new comment
            if (!MEW.length) {
                this.log('mea.sm mew.len=0');
                return;
            }
            editor = MEW.find('textarea:first');
            editor.element = MEW;
            editor.extend(true, this.defaultEditor);
            return editor.setContent(msg);
        },//setMessage

    };//nmsgeditapi obj

    //main
    log('mea.main start');
    window.fng = window.fng || {};
    if (window.fng.ngMsgEditAPI && window.fng.ngMsgEditAPI.version) {
        log('mea.main already running ', window.fng.ngMsgEditAPI);
        return true;
    }
    window.fng.ngMsgEditAPI = nMsgEditAPI;
    log('mea fire', nMsgEditAPI);
    mw.hook('nmsgeditapi.ready').fire(nMsgEditAPI);

})(jQuery); //wrap