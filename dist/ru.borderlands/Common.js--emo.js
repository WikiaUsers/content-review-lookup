//<pre>
//emotions. src: MediaWiki:Emoticons or template/doc.
//profanity patterns: template/obscene

(function ($) {
    //autocapitalize and emoiconize
    //profanity filter too
    var neditApi = null;
    var nSettings = window.nAutoCap || {};
    //smiles
    nSettings.emoticons = typeof(nSettings.emoticons) !== 'undefined' ? nSettings.emoticons : true;
    //use autocapitalization
    nSettings.autocap = typeof(nSettings.autocap) !== 'undefined' ? nSettings.autocap : true;
    //use profanity filter
    nSettings.profanity = typeof(nSettings.profanity) !== 'undefined' ? nSettings.profanity : true;
    //use emo list
    nSettings.useemolist = typeof(nSettings.useemolist) !== 'undefined' ? nSettings.useemolist : true;
    //use emo template
    nSettings.usetemplate = typeof(nSettings.usetemplate) !== 'undefined' ? nSettings.usetemplate : true;
    nSettings.debug = $.getUrlVar('debug') || (typeof(nSettings.debug) !== 'undefined' ? nSettings.debug : false);
    //namespaces to work on
    nSettings.namespaces = nSettings.namespaces instanceof Array ? nSettings.namespaces : [];
    nSettings.emoticonsLoaded = false;// is icons rly loaded (src !== null)
    window.nAutoCap = nSettings;// ensure settings exported are
    var nTemplateName = 'emo'; //hardcoded must be profanity filter for 
    var nProfanityString = nSettings.usetemplate ? '{{' + nTemplateName + '|(ban)|obscene={0}}} ' : '[[file:ban.gif]]';
    var nbReady = false; //multirun protection
    var nObscene; //= []; //profanity patterns
    var nObsceneExcl; //= []; //excl patterns
    var nEmoCodes;
    var $nemoList; //emo window
    var nemoListClass = 'nemo-list';
    var nemoSmileClass = 'nemo-smile';
    var nemoClass = 'nemo-button';
    //namespaces allowed: 0: main, 500: blog, 1201: forum
    var nNamespace = mw.config.get('wgNamespaceNumber'),
        nNamespaces = [0, 500, 1201].concat(nSettings.namespaces);
    var log = function () {if (nSettings.debug) console.log.apply(this, arguments)};
    
    //is here smthng to do
    if (nbReady || !(nSettings.autocap || nSettings.emoticons || nSettings.profanity)) {return}
    if (nNamespaces.indexOf(nNamespace) < 0) {
        log('ac. wrong namespace', nNamespace);
        return;
    }//if bad namespace
    
    if (!(window.fng || {}).ngMsgEditAPI || !window.fng.ngMsgEditAPI.version) {
        //load edit api
        log('ac. load edit api');
        importArticles({type:'script', articles: ['u:dev:MediaWiki:MsgEditApi.js']});
    } //if not editapi
    
    if (!String.prototype.format) {
        String.prototype.format = function () {
            //stackoverflow.com/questions/1038746
            var args = arguments;
            return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
        }; //string.format
    }//if !string.format
    
    if (nSettings.emoticons || nSettings.profanity) {
        log('ac. load emo');
        mw.loader.using('mediawiki.util', nloadData);
    }

    function gguid() {
        return ("00000000" + (Math.random() * Math.pow(36, 6) << 0).toString(16)).slice(-8);
    }//gguid

    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    } //escapeRegExp

    function nshowEmoList (e) {	
        //show emo window
        //log($(e.target).position());
        if (!nSettings.emoticonsLoaded) {
            nSettings.emoticonsLoaded = true;
            $nemoList.find('.' + nemoSmileClass).each(function () {
                this.src = this.dataset.src;
            });// each nemosmile
        }// if !emoticonsloaded
        var nx, ny, np;
        np = $(e.target).position();
        log('ac.sel npl:', np.left, 'npt:', np.top, 'eh:', $nemoList.height(), 'ew:', $nemoList.width());
        if (($(e.target).offset().left - $(window).scrollLeft() - $nemoList.width())>1) {
            nx = $(e.target).offset().left - $(window).scrollLeft() - $nemoList.width();
        } else {
            nx = $(e.target).offset().left - $(window).scrollLeft();
        }
        if (($(e.target).offset().top - $(window).scrollTop() - $nemoList.height())>1) {
            ny = $(e.target).offset().top - $(window).scrollTop() - $nemoList.height();
        } else {
            ny = $(e.target).offset().top - $(window).scrollTop();
        }
        $nemoList.css('left', nx).css('top', ny);
        $nemoList.toggle();
        log('ac.sel x:', nx, 'y:', ny);
    } //nshowEmoList
    
    function nemoListHandler (e) {
        //emo window event handler
        $nemoList.hide();
        if ($(e.target).is('img')) {
            log('esrc:', $(e.target).attr('src'));
            neditApi.getMessage().promise.done(function(msg) {
                var ns = msg + ' ' + $(e.target).attr('alt') + ' ';
                neditApi.setMessage(ns, true);
            });
        }
    } //nemoListHandler
    
    function nemobHandler (e) {
        //emo button click handler
        nshowEmoList(e);
    } //nemobHandler
    
    function ncreateEmoList() {
        //create emo list
        log('ac. create emo list');
        var nbs = '.speech-bubble-buttons';//'.MiniEditorWrapper .cke_toolbar_insert';//'.speech-bubble-buttons';//'.speech-bubble-message .toolbar';
        $nemoList = $('<div/>', {
            class: nemoListClass,
            width: '250px',
            style: 'z-index: 10; position: fixed; display: block;',
            //height: 'auto',
            text: ''
        }).appendTo('body');//.ready(function(){
        $nemoList.hide();
        //$('body').append($nemoList);
        $nemoList.on('click', nemoListHandler);
        //fill list
        log('ac.cel emo.len:', nEmoCodes.length);
        var nimg, nprev;
        for (var i = 0; i < nEmoCodes.length; i++) {
            if (nEmoCodes[i][1] !== nprev) {
                nprev = nEmoCodes[i][1];
                $nimg = $('<img>', {
                    //src: nEmoCodes[i][1],
                    class: nemoSmileClass,
                    alt: nEmoCodes[i][0],
                    title: nEmoCodes[i][0],
                    style: 'width: 19px; height: 19px;'
                    });
                $nimg.attr('data-src', nEmoCodes[i][1]);
                $nemoList.append($nimg);
            }
        }
        //$('body').on('click keydown keypress', nemoListHandler);
        //var nemoButton=$('<button/>', {
        var nemoButton = $('<img>', {
            src: nEmoCodes[0][1],
            alt: '(smile)', //nEmoCodes[0][1],
            title: 'Smile',
            style: 'width: 19px; height: auto; vertical-align: top; margin-top: 11px;',
            //type: 'button',
            //text: 'emo',
            class: nemoClass
            });
        $(nbs).append(nemoButton).ready(function(){$(nemoButton).on('click', nemobHandler)});
        $(window).on('keypress click', function(e) {
            //ignore emo button events
            if ($(e.target).hasClass(nemoClass)) return;
            $nemoList.hide();
        });
        //log('el.len:'+$nemoList.find('img').length);
    } //createEmoList
    
    function nparseEmo (data) {
        //nEmoticons=[];
        log('ac. parse emo');
        nEmoCodes = [];
        var nimg;
        var $nemos = $(data);
        $nemos.children('ul:first').children('li').each(function(index, value){
            //get img and put it in emoticons
            nimg = $(value).find('img');
            $(value).children('ul:first').children('li').each(function(index, value){
                nEmoCodes.push([$(value).text().trim(), nimg.attr('src')]);
            });
        });
        if (nSettings.useemolist) {
            ncreateEmoList();
        }
    } //nparseEmo
    
    function nparseObscene (data) {
        //load profanity filters
        log('ac. parse obscene. data:', data.length, data);
        nObscene = [];
        nObsceneExcl = [];
        var $data = $('<div/>'); //malformed(?!) data override
        $data.append($(data));
        $data.find('.obscene li').each(function(index, value){
            nObscene.push($(value).text().trim());
        });
        $data.find('.obscene_excl li').each(function(index, value){
            nObsceneExcl.push($(value).text().trim());
        });
        log('ac.po obsc:', nObscene.length, 'excl:', nObsceneExcl.length);
        if (nSettings.debug) {
            window.nAutoCap.Obscene = nObscene;
            window.nAutoCap.ObsceneExcl = nObsceneExcl;
        }
    } //nparseObscene
    
    function nloadData() {
        //var url='MediaWiki:Emoticons';
        log('ac. load data started');
        if (nSettings.emoticons) {
            if (nSettings.usetemplate) {
                $.get(mw.util.getUrl('template:' + nTemplateName + '/doc', {action: 'render'})).done(nparseEmo);
            } else {
                $.get(mw.util.getUrl('MediaWiki:Emoticons', {action: 'render'})).done(nparseEmo);
            }
        } //if emoticons
        if (nSettings.profanity) {
            $.get(mw.util.getUrl('template:' + nTemplateName + '/obscene', {action: 'render'})).done(nparseObscene);
        } //if profanity
    } //nloadEmo
    
    function nHandler (e) {
        //click handler
        neditApi.getMessage().promise.done(function(msg) {
            if (msg && msg.length > 0) {
                var nnewMsg = ncapitalize(msg);
                log('ac.m:', nnewMsg);
                neditApi.setMessage(nnewMsg, true);
            }
        });
        return true;
    } //nHandler

    function nhlpReplacer (match, p1) {
        //replacer helper function
        return nProfanityString.format(match);
    }//hlpReplacer
    
    function ncapitalize (nstring) {
        //main processor
        var i, i1, len, len1;
        //add additional spaces
        nstring = nstring.replace(/>/g, '> ').replace(/</g, ' <').replace(/\}\}/g, '}} ');
        //apply profanity filter
        if (nSettings.profanity) {
            //remove exclusions
            var ns1 = nstring, na = [], repl = [], r, re;
            for (i = 0, len = nObsceneExcl.length; i < len; i++) {
                re = new RegExp(nObsceneExcl[i], 'igm');
                na = ns1.match(re) || [];
                log('ac.c excl:', na.length, nObsceneExcl[i]);
                for (i1 = 0, len1 = na.length; i1 < len1; i1++) {
                    r = {id: gguid(), value: na[i1]};
                    repl.push(r);
                    log('ac.c exclude', r.id, r.value);
                    ns1 = ns1.replace(new RegExp(escapeRegExp(r.value), 'im'), r.id);
                    //break; //1 is (not) enough
                } //for i1
            } //for i (obsc excl)
            //remove obscene
            log('ac.c r obsc s:', ns1);
            for (i = 0, len = nObscene.length; i < len; i++) {
                re = new RegExp(nObscene[i], 'igm');
                //ns1 = escapeRegExp(ns1);
                ns1 = ns1.replace(re, nhlpReplacer);
            }//for i (obsc)
            //restore exclusions
            for (i = 0, len = repl.length; i < len; i++) {
                r = repl[i];
                re = new RegExp(r.id, 'im');
                ns1 = ns1.replace(re, r.value);
            }//for i (restore excl)
            nstring = ns1;
        } //if profanity
        
        if (nSettings.autocap) {
            nstring = nstring.replace(/.*?(\}\}|[\.\?\!\>])(\s|$)/gm, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1);
            });
        } //if autocap
        
        if (nSettings.emoticons) {
            for (i = 0, len = nEmoCodes.length; i < len; i++) {
                if (nSettings.usetemplate) {
                    nstring = nstring.replace(new RegExp('(\\s|^)(' + escapeRegExp(nEmoCodes[i][0]) + ')(\\s|$)', 'igm'),
                        '  {{' + nTemplateName + '|smile=' + nEmoCodes[i][0] + '}}  ');
                } else {
                    nstring = nstring.replace(new RegExp('(\\s|^)(' + escapeRegExp(nEmoCodes[i][0]) + ')(\\s|$)', 'igm'),
                        '  ' + nEmoCodes[i][1] + '  ');
                }
            }
        } //if emoticons
        //remove spaces added
        nstring = nstring.replace(/> /g,'>').replace(/ </g, '<').replace(/\}\} /g, '}}').replace(/  /g, ' ');
        return nstring;
    } //ncapitalize
    
    function nmain(arg) {
        if (nbReady) return; //multirun protection
        nbReady = true; //multirun protection
        //edit api
        neditApi = neditApi || arg.editapi;
        switch (nNamespace) {
            case 0:
                //wikia article
            case 500:
                //blog = wikia article
                $('body').off('focusin', '.MiniEditorWrapper input[type="submit"], .MiniEditorWrapper .cp-button-preview', nHandler);
                $('body').on('focusin', '.MiniEditorWrapper input[type="submit"], .MiniEditorWrapper .cp-button-preview', nHandler);
                break;
            case 1201:
                //forum
                $('body').off('focusin', '.MiniEditorWrapper .replyButton, .MiniEditorWrapper .previewButton', nHandler);
                $('body').on('focusin', '.MiniEditorWrapper .replyButton, .MiniEditorWrapper .previewButton', nHandler);
                break;
            default:
                log('ac. unknown namespace:', nNamespace);
                $('body').off('focusin', '.MiniEditorWrapper input[type="submit"], .MiniEditorWrapper .cp-button-preview, .MiniEditorWrapper .replyButton, .MiniEditorWrapper .previewButton', nHandler);
                $('body').on('focusin', '.MiniEditorWrapper input[type="submit"], .MiniEditorWrapper .cp-button-preview, .MiniEditorWrapper .replyButton, .MiniEditorWrapper .previewButton', nHandler);
                break;
        } //switch namespacenumber
    } //nmain
    
    mw.hook('nmsgeditapi.ready').add(function(e){
        log('ac. mea.ready', e);
        nmain({editapi: e});
    });
}(jQuery)); //autocapitalize