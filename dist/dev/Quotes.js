// AdvancedQuoting 3.2
// License: WTFPL
// HTML5 || GTFO
//3.1 new msg edit api used
//3.0 msg edit api used
//2.8 new design supported now
//2.5: article comments are supported now. and user comments. and ie.
//will NOT work on ie. ever.
//ever is gone. works on ie.

(function ($) {
    if ((window.nQuoteSettings || {}).version) return; //multi protection
    window.nQuoteSettings = $.extend(true, window.nQuoteSettings, {version: 3.3});
    //settings
    var urlVars = $.getUrlVars(),
        settings = window.nQuoteSettings;
    settings = $.extend(true, settings, {
        //debug mode
        debug: urlVars.debug || (typeof(settings.debug) !== 'undefined' ? settings.debug : false),
        //language override
        lang: urlVars.uselang || settings.lang || mw.config.get('wgUserLanguage'),
        //article comments
        articleCommentFeature: typeof(settings.articleCommentFeature) !== 'undefined' ? settings.articleCommentFeature : true,
        quoteStyle: typeof(settings.quoteStyle) !== 'undefined' ? settings.quoteStyle : '',
        //static button class
        qsButtonClass: settings.qsButtonClass || 'nquoteClass',
        //floating buttons style
        qfButtonStyle: typeof(settings.qfButtonStyle) !== 'undefined' ? settings.qfButtonStyle : 'display:none; position:absolute; z-index:999;',
        //floating button name
        qfButtonName: settings.qfButtonName || 'nquoteFloatingButton',
        //ms. 0=forever
        qfButtonHideInterval: typeof(settings.qfButtonHideInterval) !== 'undefined' ? settings.qfButtonHideInterval : 3000,
        //removable events namespace
        rNamespace: settings.rNamespace || '.nRemovable',
        //min sel len. if lesser then full msg will be marked for quoting
        minSelectionLength: typeof(settings.minSelectionLength) !== 'undefined' ? settings.minSelectionLength : 3,
        //do not show floating button if lesser
        minSelection4Float: typeof(settings.minSelection4Float) !== 'undefined' ? settings.minSelection4Float : 1,
        //is username a link (w\ ending extra space) or plain text
        usernameAsLink: typeof(settings.usernameAsLink) !== 'undefined' ? settings.usernameAsLink : true,
        //do not use static reply button. false for mobile clients
        staticButtonOverpass: typeof(settings.staticButtonOverpass) !== 'undefined' ? settings.staticButtonOverpass : true,
        //wanna use template 4 quotes?
        useQuoteTemplate: typeof(settings.useQuoteTemplate) !== 'undefined' ? settings.useQuoteTemplate : false,
        //quote template
        quoteTemplateName: settings.quoteTemplateName || 'nquote',
        //disabling cookie name. if true then script will do nothing
        doNotName: settings.doNotName || 'njustno',
        //disable script to run (if cookie unavailable)
        doNotValue: typeof(settings.doNotValue) === 'undefined' ? false : settings.doNotValue,
        //chkbox id/name
        qchkName: settings.qchkName || 'nQChkBox',
        //chkbox class
        qchkClass: settings.qchkClass || 'nQChkC',
        //chkbox style
        qchkStyle: typeof(settings.qchkStyle) !== 'undefined' ? settings.qchkStyle : '',
        //namespaces to work on
        namespaces: settings.namespaces instanceof Array ? settings.namespaces : []
    });
    var nTranslations = {
        // language list - start
        en: {
            quote: 'Quote',
            check: 'Quotation'
        },
        ar: {
            quote: 'اقتبس',
            check: 'اقتباس'
        },
        be: {
            quote: 'Цытаваць',
            check: 'Цытаванне'
        },
        es: {
            quote: 'Cita',
            check: 'Cita'
        },
        fr: {
            quote: 'Citation',
            check: 'Citation'
        },
        ru: {
            quote: 'Цитировать',
            check: 'Цитирование'
        },
        tr: {
            quote: 'Alıntı',
            check: 'Alıntı'
        },
        uk: {
            quote: 'Цитувати',
            check: 'Цитування'
        },
        // language list - stop
    };
    nTranslations = nTranslations[settings.lang] || nTranslations[mw.config.get('wgContentLanguage')] || nTranslations.en;
    var n_Namespace = mw.config.get('wgNamespaceNumber'),
        nNamespaces = [0, 500, 1201].concat(settings.namespaces),
        escapes = {},//escaped strings: id: guid, value: string
        nbShouldIKillMyself = nShouldIStopNow(),
        log = function () {
            if (!settings.debug) return;
            var a = [].slice.call(arguments);
            a.unshift('naq');
            console.log.apply(this, a);
        };//log
    window.nQuoteSettings = settings;// throw settings back to window

    if (nNamespaces.indexOf(n_Namespace) < 0) {
        log('wrong namespace. exit', n_Namespace, nbShouldIKillMyself, settings.debug);
        return;
    }//if wrong namespace

    if (!(window.fng || {}).ngMsgEditAPI || !(window.fng || {}).ngMsgEditAPI.version) {
        importArticles({type:'script', articles: ['u:dev:MediaWiki:MsgEditApi.js']});
    }

    function gguid() {
        return ("00000000" + (Math.random() * Math.pow(36, 6) << 0).toString(16)).slice(-8);
    }//gguid

    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    } //escapeRegExp

    function escapeText(str, patterns) {
        var pats = patterns ? $.isArray(patterns) ? patterns : [patterns] : [],
            s = str;
        pats.push(/\{\{[\s\S]*?\}\}/gm);//templates
        for (var i = 0, ra; i < pats.length; i++) {
            ra = s.match(pats[i]) || [];
            for (var i1 = 0, r; i1 < ra.length; i1++) {
                r = {id: gguid(), value: ra[i1]};
                escapes[r.id] = r.value;
                s = s.replace(pats[i], r.id);
            }//for i1 (matches)
        }//for i (patterns)
        return s;
    }//escapetext
    
    function unescapeText(str) {
        var s = str,
            s1 = '',
            esca = $.extend({}, true, escapes);
        $.each(esca, function(k, v) {
            s1 = s.replace(k, v);
            //if replacement actually made (esc is found and restored)
            if (s !== s1) {
                delete(escapes[k]);
            }
            s = s1;
        });//each escapes
        return s;
    }//unescapetext

    function nShouldIStopNow() {
        //use string below to prevent the script running
        //document.cookie=settings.doNotName+'='+'true;'+'path=/;'+'expires='+(new Date(new Date().setMonth(new Date().getMonth()+12))).toUTCString();
        if ($.cookies.test()) {
            var nck = $.cookies.get(settings.doNotName);
            if (nck && (nck == 'true')) {
                return true;
            }
        } else {
            log('ShouldIStopNow. cookies are not supported. return sikm || donotvalue');
            return settings.doNotValue || (typeof(nbShouldIKillMyself) === 'undefined' ? false : nbShouldIKillMyself);
        }
        return settings.doNotValue || false;
    } //nShouldIStopNow

    $(function () {
        //$(document).ready
        //edit api
        var neditApi = null;
        var nTimerInterval = 100;
        var nQFBHI = null; //qfbutton hiding timer
        var nLastClickEvent = 0; //mouseup->click collision prevention
        var nLastClickEventLimit = 1000; //ignores click events for n ms
        var nActiveMessage = null;
        var nSelectedText = '';
        var nbMobile = false; //is mobile client.
        var nNamespace = 0; //active namespace. 1-forum, 2-wikia article/blog

        log('doc.ready');

        function naddQB2FHandler(npiTargetClass) {
            //add handler 2 static quote button. forum
            if ((!npiTargetClass) || (npiTargetClass.length < 1))
                npiTargetClass = '.nquoteClass';
            log('addQB2FH class:', npiTargetClass);
            $('body').on('click' + settings.rNamespace, npiTargetClass, function () {
                var nText = neditApi.getMessage();
                var selectedText = ngetSelectedText(this);
                log('addQB2FH this, seltext', this, selectedText);
                if (selectedText === null) {
                    return;
                }
                var $MEW = $(this).closest('.MiniEditorWrapper');
                var username = nGetUsername($MEW);//$(this).parents('.MiniEditorWrapper').find('.edited-by').text().trim();
                var msgid = nGetMsgId($MEW);
                var quoteText = nCreateQuote(nText, settings.quoteStyle, username, selectedText.trim(), msgid);
                if (!nbMobile) {
                    $('.replyBody').focus(); //will not work on ie
                }
                neditApi.setMessage(quoteText);
                //if (nsetMessage(quoteText)===null) window.alert('smth wrng in da wrld');
            });

        } //naddQB2FHandler

        function naddQB2WAHandler(npiTargetClass) {
            //let event-oriented programming begins
            if ((!npiTargetClass) || (npiTargetClass.length < 1))
                npiTargetClass = '.nquoteClass';
            //add handler
            $('body').on('click' + settings.rNamespace, npiTargetClass, function () {
                var nText = neditApi.getMessage();
                var selectedText = ngetSelectedText(this);
                if (selectedText === null) {
                    return;
                }
                var $MEW = $(this).closest('.comment');
                var username = nGetUsername($MEW);//$(this).parents('.comment').data('user').trim();
                var msgid = nGetMsgId($MEW);
                var quoteText = nCreateQuote(nText, settings.quoteStyle, username, selectedText.trim(), msgid);
                neditApi.setMessage(quoteText);
            });
        } //naddQB2WAHandler

        function naddSHandler2F() {
            //add selection handler. forum
            log('addSHandler2F');
            $('body').on('mouseup' + settings.rNamespace, 'li.message', function (e) {
                if (e.which !== 1)
                    return; //1-lmb, 2-mmb, 3-rmb
                var t1 = ngetSelectionQuick() || '';
                var text = ngetSelectedText(e.target);
                if (text && (t1.toString().trim().length > settings.minSelection4Float)) {
                    nActiveMessage = $(e.target).parents('.MiniEditorWrapper');
                    nSelectedText = text;
                    nLastClickEvent = e.timeStamp;
                    log('SHandler2F. ShowButton w p:', nActiveMessage, nSelectedText, nLastClickEvent);
                    nShowButton(e);
                    return;
                } else {
                    nHideButton();
                }
            }); //mouseup
            //add mouseclick handler. button hiding purposes
            $('body').on('click' + settings.rNamespace, function (e) {
                if (((e.timeStamp - nLastClickEvent) > nLastClickEventLimit) || (e.which != 1))
                    nHideButton();
            });
            //keydown handler. button hiding 4
            $('body').on('keydown' + settings.rNamespace, nHideButton);
            return;
        } //naddSHandler2F

        function naddSHandler2WA() {
            //add selection handler. wikia article
            log('addSHandler2WA');
            $('body').on('mouseup' + settings.rNamespace, '#article-comments-ul.comments', function (e) {
                if (e.which !== 1)
                    return; //1-lmb, 2-mmb, 3-rmb
                var t1 = ngetSelectionQuick() || '';
                var text = ngetSelectedText(e.target, 2);
                if (text && (t1.toString().trim().length > settings.minSelection4Float)) {
                    nActiveMessage = $(e.target).parents('.comment');
                    nSelectedText = text;
                    nLastClickEvent = e.timeStamp;
                    log('SHandler2WA. ShowButton w p:', nActiveMessage, nSelectedText, nLastClickEvent);
                    nShowButton(e);
                    return;
                } else {
                    nHideButton();
                }
            }); //mouseup
            return;
        } //naddSHandler2WA
        
        function nHidingHandler (state) {
            //mouse/keydown handlers. button hiding purposes
            log('quote. hh.state', state);
            if (state) {
                $('body').on('click' + settings.rNamespace, nhh_helper);
                $('body').on('keydown' + settings.rNamespace, nHideButton);
            } else {
                $('body').off('click' + settings.rNamespace, nhh_helper);
                $('body').off('click' + settings.rNamespace, nHideButton);
            }//if state
        }//nhidinghandler
        
        function nhh_helper (e) {
            //hiding helper
            if (((e.timeStamp - nLastClickEvent) > nLastClickEventLimit) || (e.which != 1))
                nHideButton();
        }//hh_click
        
        function nCreateButton() {
            //create button. 1-forum, 2-wikia article
            log('CreateButton. Target:', nNamespace);
            var ncb = $('<button />', {
                    type: 'button',
                    class: 'nquoteFloatingClass',
                    id: settings.qfButtonName,
                    name: settings.qfButtonName,
                    style: settings.qfButtonStyle,
                    text: nTranslations.quote
                });
            $(ncb).appendTo($('body'));
            switch (nNamespace) {
            case 1:
                log('CreateButton. add QFB2F_click');
                $('#' + settings.qfButtonName).on('click' + settings.rNamespace, nQFB2F_click);
                break;
            case 2:
                log('CreateButton. add QFB2WA_click');
                $('#' + settings.qfButtonName).on('click' + settings.rNamespace, nQFB2WA_click);
                break;
            default:
                log('CreateButton. switch:default. Target:', nNamespace);
                $('#' + settings.qfButtonName).on('click' + settings.rNamespace, nQFB2F_click);
                break;
            }
            //});
        } //nCreateButton

        function nShowButton(npie) {
            log('ShowButton. ', npie.pageX, npie.pageY);
            $('#' + settings.qfButtonName).css({
                left: npie.pageX,
                top: npie.pageY
            });
            $('#' + settings.qfButtonName).show();
            if (settings.qfButtonHideInterval > 0) {
                if (nQFBHI !== null)
                    clearInterval(nQFBHI);
                nQFBHI = window.setInterval(function () {
                        log('qfbutton hiding timer fired is.', nQFBHI);
                        window.clearInterval(nQFBHI);
                        nQFBHI = null;
                        nHideButton();
                    }, settings.qfButtonHideInterval);
            }
        } //nShowButton

        function nHideButton() {
            log('HideButton');
            if (nQFBHI !== null) {
                log('HideButton.qfbhi:', nQFBHI);
                window.clearInterval(nQFBHI);
                nQFBHI = null;
            }
            $('#' + settings.qfButtonName).hide();
            nSelectedText = '';
            nActiveMessage = null;
        } //nHideButton

        function nQFB2F_click(npie) {
            // quote button. forum. click
            log('QFB2F_click');
            if ((nSelectedText === '') || (nSelectedText.trim() === '')) {
                nHideButton();
                log('QFB2F_click. SelectedText=null. return');
                return;
            }
            log('QFB2F_click. getMessage');
            var nText = neditApi.getMessage();
                log('QFB2F_click. GetUsername. msg:', nText);
            var username = nGetUsername($(nActiveMessage));
            var msgid = nGetMsgId($(nActiveMessage));
            log('QFB2F_click. CreateQuote.', username, msgid);
            var quoteText = nCreateQuote(nText, settings.quoteStyle, username, nSelectedText.trim(), msgid);
            log('QFB2F_click. Quote:', quoteText);
            $('.replyBody').focus(); //will not work on ie
            log('QFB2F_click. setMessage');
            neditApi.setMessage(quoteText);
            log('QFB2F_click. HideButton');
            nHideButton();
        } //nQFB2F_click

        function nQFB2WA_click(npie) {
            // quote button. wikia article. click
            log('QFB2WA_click');
            if ((nSelectedText === '') || (nSelectedText.trim() === '')) {
                nHideButton();
                log('QFB2WA_click. SelectedText=null. return');
                return;
            }
            log('QFB2WA_click. getMessage');
            var nText = neditApi.getMessage();
            log('QFB2WA_click. GetUsername. msg:', nText);
            var username = nGetUsername($(nActiveMessage));
            var msgid = nGetMsgId($(nActiveMessage));
            log('QFB2WA_click. CreateQuote. username:', username);
            var quoteText = nCreateQuote(nText, settings.quoteStyle, username, nSelectedText.trim(), msgid);
            log('QFB2WA_click. Quote:', quoteText);
            $('.replyBody').focus(); //will not work on ie
            log('QFB2WA_click. setMessage');
            neditApi.setMessage(quoteText);
            log('QFB2WA_click. HideButton');
            nHideButton();
        } //nQFB2WA_click


        function naddQB2F() {
            //add quote button. forum
            log('addQB2F', window.nQButtonExist);
            log('addQB2F. addSHandler');
            naddSHandler2F();
            log('addQB2F. SBO:', settings.staticButtonOverpass);
            if (settings.debug || nbMobile || (!settings.staticButtonOverpass)) { //sorry, mario, but your button is in another castle
                $('<button />', {
                    type : 'button',
                    class : settings.qsButtonClass,
                    text : nTranslations.quote
                })
                .appendTo('.msg-toolbar .buttonswrapper .buttons');
                naddQB2FHandler('.' + settings.qsButtonClass);
            }
        } //naddQB2F

        function naddQB2WA() {
            //add quote button. wikia article
            log('addQB2WA', window.nQButtonExist);
            //shoulda w8 4 comments. x10 timer interval.
            var nQB2WAInterval = null; //4 paranoid java compilers
            //if mobile. fixed probably
            if (settings.debug || nbMobile || (!settings.staticButtonOverpass)) {
                log('addQB2WA. set interval');
                nQB2WAInterval = setInterval(function () {
                        //w8 4 comments
                        if ($('.WikiaArticleComments').find('.comment').length > 0) {
                            clearInterval(nQB2WAInterval);
                            var nqsb = $('<button />', {
                                    type: 'button',
                                    class: settings.qsButtonClass + ' actionButton wikia-button',
                                    text: nTranslations.quote
                                });
                            log('addQB2WA. Interval. Comment is ready. addQB2WAButton');
                            $(nqsb).prependTo('.WikiaArticleComments .comment .buttons');
                            naddQB2WAHandler('.' + settings.qsButtonClass);
                        }
                    }, nTimerInterval * 10);
            }
            //w8 4 comments
            log('addQB2WA. set interval');
            var nQFB2WAInterval = setInterval(function () {
                    if ($('.WikiaArticleComments').find('.comment').length > 0) {
                        clearInterval(nQFB2WAInterval);
                        log('addQB2WA. Interval. Button is ready. addSHandler2WA');
                        naddSHandler2WA();
                    }
                }, nTimerInterval * 10);

        } //naddQB2WA

        function naddQButton() {
            //add quote button. 1-forum, 2-wikia article
            log('addQButton. Target:', nNamespace);
            switch (nNamespace) {
            case 1:
                log('addQButton. addQB2F');
                naddQB2F();
                break;
            case 2:
                log('addQButton. addQB2WA');
                naddQB2WA();
                break;
            default:
                log('addQButton. switch:default. Target:', nNamespace);
                naddQB2F();
                break;
            }
        } //naddQButton

        function ngetSelectedText(target) {
            //get selected text. additional targets
            //selected text || full message
            log('getSelectedText', target, nNamespace);
            var nret = null;
            switch (nNamespace) {
            case 1:
                nret = ngetSelectedTextF(target);
                break;
            case 2:
                log('getSelectedText. switching 2 wa');
                nret = ngetSelectedTextWA(target);
                break;
            default:
                nret = ngetSelectedTextF(target);
            }

            return nret;
        } //ngetSelectedText

        function ngetSelectedTextF(target) {
            //get selected text. forum
            log('getSelectedTextF. Target:', target);
            var selection;
            var selectedElement;
            var selectedText = '';
            var $MEW = $(target).closest('.MiniEditorWrapper');
            if (nbMobile) {
                log('getSelectedTextF. mobile. quote full msg');
                if ($MEW.find('.msg-body').parent()) {
                    //it works and renders nested quotes. sometimes
                    selectedText = $MEW.find('.msg-body').parent().html();
                    log('getSelectedTextF. qfm.mew.msg-body.innerhtml:', selectedText);
                } else {
                    //if sometimes not happen
                    selectedText = $MEW.find('.msg-body').text();
                    log('getSelectedTextF. qfm.mew.msg-body.text:', selectedText);
                }
                return selectedText;
            }
            if (window.getSelection) {
                selection = window.getSelection();
            } else if (document.getSelection) {
                selection = document.getSelection();
            } else {
                log('getSelectedText. no selection found. return');
                return null;
            }

            if (selection.rangeCount > 0) {
                selectedElement = selection.getRangeAt(0).startContainer.parentNode;
            } // else return null;
            if ((selectedElement && $MEW.find($(selectedElement)).length) && (selection.toString().length > settings.minSelectionLength)) {
                selectedText = selection.toString();
                log('getSelectedTextF. s:', selectedText.length, selectedText);
                return selectedText;
            } else { //quote full msg
                log('getSelectedTextF. full msg', $MEW);
                selectedText = $MEW.find('.msg-body').html();
                return selectedText;
            }
        } //ngetSelectedTextF

        function ngetSelectedTextWA(target) {
            //get selected text. wikia article
            log('getSelectedTextWA. Target:', target);
            var selection;
            var selectedElement;
            var selectedText = '';
            if (nbMobile) {
                log('getSelectedTextWA. mobile');
                if ($(target).parents('.comment').find('.WikiaArticle').parentNode) {
                    //it works and renders nested quotes. sometimes
                    selectedText = $(target).parents('.comment').find('.WikiaArticle').parentNode.innerHTML;
                    log('getSelectedTextWA. wa.innerhtml', selectedText);
                } else {
                    //if sometimes not happen
                    selectedText = $(target).parents('.comment').find('.WikiaArticle').text();
                    log('getSelectedTextWA. wa.text', selectedText);
                }
                return selectedText;
            }
            if (window.getSelection) {
                selection = window.getSelection();
            } else if (document.getSelection) {
                selection = document.getSelection();
            } else {
                log('getSelectedTextWA. no selection found. return');
                return null;
            }

            if (selection.rangeCount > 0) {
                selectedElement = selection.getRangeAt(0).startContainer.parentNode;
            } // else return null;
            if ((selectedElement && $(target).parents('.comment').find($(selectedElement)).length) && (selection.toString().length > settings.minSelectionLength)) {
                selectedText = selection.toString();
                return selectedText;
            } else { //quote full msg
                log('getSelectedTextWA. full msg');
                if ($(target).parents('.comment').find('.WikiaArticle').parentNode) {
                    //it works and renders nested quotes. sometimes
                    selectedText = $(target).parents('.comment').find('.WikiaArticle').parentNode.innerHTML;
                } else {
                    //if sometimes not happen
                    selectedText = $(target).parents('.comment').find('.WikiaArticle').text();
                }
                return selectedText;
            }
        } //ngetSelectedTextWA

        function ngetSelectionQuick() {
            var selection=null;
            if (window.getSelection) {
                selection = window.getSelection();
            } else if (document.getSelection) {
                selection = document.getSelection();
            } else {
                return null;
            }
            if (selection.rangeCount > 0) 
                return selection;
            return null;
        } //nGetSelectionQuick

        function nGetUsername(npiContext, npiLink) {
            //get username. 1-active message context, 2-username as link override (source-mode link issue)
            if (npiLink === null)
                npiLink = true;
            if (!npiContext)
                npiContext = $(nActiveMessage);
            log('GetUsername.', npiContext, npiLink);
            var $a, nuname = '',
                nulink = '';
            switch (nNamespace) {
            case 1:
                $a = npiContext.find('.edited-by a:first');
                nuname = {
                    name: $a.text().trim(),
                    link: $a.attr('href').replace(/(.*?\/wiki\/)(.*)/, '$2'),
                };
                break;
            case 2:
                nuname = {
                    name: npiContext.data('user'),
                    link: 'user:' + npiContext.data('user'),
                };
                break;
            default:
                nuname = {
                    name: npiContext.data('user'),
                    link: 'user:' + npiContext.data('user'),
                };
            }
            return nuname;
        } //nGetUsername
        
        function nGetMsgId (npiContext) {
            //get msgid/link
            if (!npiContext)
                npiContext = $(nActiveMessage);
            log('getmsgid context', npiContext);
            var nid = '',
                $nlink = npiContext.find('.permalink');
            if (!$nlink.length) return '';
            nid = $nlink.attr('href').replace(/.*#/, '');
            if (nid === $nlink.attr('href')) {
                nid = nid.replace(/.*\//, '');
            } else {
                nid =  '#' + nid;
            }
            log('getmsgid id', nid);
            return nid;
        }//nGetMsgId

        function nCreateQuote(npiM, npiQS, npiU, npiT, npiMsgId) {
            //create quote. 1-prev message, 2-quote style, 3-username: {name, link}, 4-text, 5-msgid
            if (settings.useQuoteTemplate) {
                //escape templates
                npiT = escapeText(npiT);
                //strip pipe (|) chars
                npiT = npiT.replace('|', '{{!}}');
                //unescape templates
                npiT = unescapeText(npiT);
                var text = (npiM ? npiM : '') +
                    '{{' + settings.quoteTemplateName +
                    (npiQS ? '|style=' + npiQS : '') +
                    (npiU ? '|username=' + (!settings.usernameAsLink ? npiU.name : '[[' + npiU.link + '|' + npiU.name + ']]') : '') +
                    (npiMsgId ? '|msgid=[[' + npiMsgId + '|' + decodeURIComponent(npiMsgId) + ']]' : '') +
                    (npiT ? '|quote=' + npiT : '') +
                    '}}';
                return text;
            }
            var $quote;
            $quote = $('<div>', {
                class: 'aquote',
                style: npiQS
            });
            $quote.data('rte-washtml', '1');
            $quote
                .append($('<span>', {
                    class: 'aquote-user'
                }).text(settings.usernameAsLink ? '[[' + npiU.link + '|' + npiU.name + ']]' : npiU.name))
                .append($('<span>', {
                    class: 'aquote-msgid',
                    style: 'float:right;'
                }).text(npiMsgId.length ? '[[' + npiMsgId + '|' + decodeURIComponent(npiMsgId) + ']]' : ''))
                .append($('<div>', {
                    class: 'aquote-msg'
                }).html(npiT));
            return npiM + $quote.get(0).outerHTML + '<p></p>';
        } //nCreateQuote

        function nCreateQChkbox() {
            //create quotation toggler
            var $nlabel, $ninput;
            var $li = $('<li/>');
            $nlabel = $('<label>', {
                class: settings.qchkClass,
                style: settings.qchkStyle,
                text: nTranslations.check
            });
            $ninput = $('<input/>', {
                type: 'checkbox',
                name: settings.qchkName,
                id: settings.qchkName,
                class: settings.qchkClass,
                style: settings.qchkStyle
            });
            if (!nbShouldIKillMyself) $ninput.attr('checked', 'checked');
            $nlabel.prepend($ninput);
            $li.append($nlabel);
            $li.appendTo('.page-header__contribution-buttons .wds-list:first');
            $('#' + settings.qchkName).on('click', nQChkboxClick);
        } //nCreateQChkBox

        function nQChkboxClick() {
            //qchkbox event handler
            log('QChkboxClick');
            //disable chkbox - job in progress. sync is presumed
            $('#' + settings.qchkName).prop('disabled', true);
            if ($('#' + settings.qchkName).prop('checked')) {
                nbShouldIKillMyself = false;
                nSetQCookie(false); //enable script the
                nResurrectMyself(); //bring me to life
            } else {
                nbShouldIKillMyself = true;
                nSetQCookie(true); //disable script the
                nKillMyself(); //remove me
            }
            //enable chkbox - job done, ready to operate
            $('#' + settings.qchkName).removeProp('disabled');
        } //nQChkboxClick

        function nSetQCookie(npi) {
            log('SetQCookie:', npi);
            if ($.cookies.test()) {
                document.cookie = settings.doNotName + '=' + npi + ';' + 'path=/;' +
                    'expires=' + (new Date(new Date().setMonth(new Date().getMonth() + 12))).toUTCString();
            } else {
                log('SetCookie. cookies not supported are');
            }
        } //nSetQCookie

        function nKillMyself() {
            //cleaning tool
            log('KillMyself:');
            //remove handlers by namespace
            $('*').off(settings.rNamespace);
            //remove buttons
            $('.' + settings.qsButtonClass).remove();
            //$('.'+settings.qchkClass).remove();
            $('#' + settings.qfButtonName).remove();
        } //nKillMyself

        function nResurrectMyself() {
            //turn up the buttons
            log('ResurrectMyself');
            nmain({npi1stRun: false});
        } //nResurrectMyself

        function nmain(arg) {
            //main
            //preparing enable\disable feat w\o reloading
            //todo: save setting(s) 4 un- or decooked browsers(through mw.user.options. probably)
            arg = arg || {};
            console.log('naq main. version:', settings.version, arg); //make sure the script running is
            if (typeof(arg.npi1stRun) === 'undefined')
                arg.npi1stRun = true; //default parameters are not supported yet. es2015 :\
            //add enabling\disabling checkbox. only once
            if (arg.npi1stRun)
                nCreateQChkbox();
            if (settings.doNotValue || nbShouldIKillMyself) {
                log('disabled', n_Namespace, nbShouldIKillMyself, settings.debug);
                if (!settings.debug)
                    return;
            }//if disabled
            if (navigator.userAgent.indexOf('Mobile') != -1) {
                nbMobile = true; //it means falling to ie + additional restrictions
                log('main. mobile');
            }
            //ie-specific. ie10=mozilla+trident.
            if (nbMobile || ((navigator.userAgent.indexOf('Mozilla') != -1) && (navigator.userAgent.indexOf('Trident') != -1))) {
                log('main. Browser: IE');
                //settings.usernameAsLink = false;
            }
            switch (n_Namespace) {
            case 0:
                //wikia article
                log('main. wikia article');
                nNamespace = 2;
                break;
            case 500:
                //blog = wikia article
                log('main. blog');
                nNamespace = 2;
                break;
            case 1201:
                //forum
                log('main. forum');
                nNamespace = 1;
                break;
            default:
                //undefined
                nNamespace = 0;
                break;
            }
            //if article and article comment feature disabled is
            if ((nNamespace === 2) && (!settings.articleCommentFeature))
                return;
            //get edit api
            neditApi = neditApi || arg.editapi;
            //create floating button
            nCreateButton();
            //add floating and static buttons
            naddQButton();
        } //nmain

        //and here we go
        mw.hook('nmsgeditapi.ready').add(function (e) {
            log('mea.ready', e);
            nmain({editapi: e});
        });
    }); //$(document).ready
}(jQuery));