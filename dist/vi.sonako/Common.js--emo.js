//<pre>
//emotions. src: MediaWiki:Emoticons or template/doc.
//profanity patterns: template/obscene
 
(function ($) {
    //autocapitalize and emoiconize
    //profanity filter too
    var neditApi = null;
    var nSettings=window.nAutoCap || {};
    var nbEmoticons = typeof(nSettings.emoticons) !== 'undefined' ? nSettings.emoticons : true; //smiles
    var nbAutoCap = typeof(nSettings.autocap) !== 'undefined' ? nSettings.autocap : true; //autocapitalization
    var nbProfanity = typeof(nSettings.profanity) !== 'undefined' ? nSettings.profanity : true;
    var nbUseEmoList = typeof(nSettings.useemolist) !== 'undefined' ? nSettings.useemolist : true;
    var nbUseTemplate = typeof(nSettings.usetemplate) !== 'undefined' ? nSettings.usetemplate : true;
    var nTemplateName = 'Emo'; //hardcoded must be profanity filter for //typeof(nSettings.templatename) !== 'undefined' ? nSettings.templatename : 'emo'; //uses template/doc for list
    var nProfanityString = nbUseTemplate ? '{{' + nTemplateName + '|(ban)|obscene={0}}} ' : '[[file:ban.gif]]';
    var nObscene; //= []; //profanity patterns
    var nObsceneExcl; //= []; //excl patterns
    var nbDebug = typeof(nSettings.debug) !== 'undefined' ? nSettings.debug : false;
    var nbReady = false; //multiple doc.ready protection
    //var nEmoticons;
    var nEmoCodes;
    var nemoList; //emo window
    var nemoListClass = 'nemo-list';
    var nemoSmileClass = 'nemo-smile';
    var nemoClass='nemo-button';
    var nNamespace = 0;
 
    //is here smthng to do
    if (((!nbAutoCap) && (!nbEmoticons) && (!nbProfanity)) || nbReady) {return}
 
    String.prototype.format = function () {
        //stackoverflow.com/questions/1038746
        var args = arguments;
        return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
    }; //string.format
 
    if (nbEmoticons || nbProfanity) {
        if (nbDebug) console.log('ac. load emo');
        mw.loader.using('mediawiki.util', nloadData);
    }
 
    function gguid() {
        return ("00000000" + (Math.random()*Math.pow(36,6) << 0).toString(16)).slice(-8);
    }//gguid
 
    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    } //escapeRegExp
 
    function nshowEmoList (e) {	
        //show emo window
        //if (nbDebug) console.log($(e.target).position());
        var nx, ny, np;
        np=$(e.target).position();
        if (nbDebug) console.log('ac.sel npl:'+np.left+' npt:'+np.top+' eh:'+$(nemoList).height()+' ew:'+$(nemoList).width());
        if (($(e.target).offset().left - $(window).scrollLeft() - $(nemoList).width())>1) {
            nx=$(e.target).offset().left - $(window).scrollLeft() - $(nemoList).width();
        } else {
            nx=$(e.target).offset().left - $(window).scrollLeft();
        }
        if (($(e.target).offset().top - $(window).scrollTop() - $(nemoList).height())>1) {
            ny=$(e.target).offset().top - $(window).scrollTop() - $(nemoList).height();
        } else {
            ny=$(e.target).offset().top - $(window).scrollTop();
        }
        $(nemoList).css('left', nx).css('top', ny);
        $(nemoList).toggle();
        if (nbDebug) console.log('ac.sel x:'+nx+' y:'+ny);
    } //nshowEmoList
 
    function nemoListHandler (e) {
        //emo window event handler
        $(nemoList).hide();
        if ($(e.target).is('img')) {
            if (nbDebug) console.log('esrc:'+$(e.target).attr('src'));
            var ns = neditApi.getMessage();
            //ns = typeof(ns) === 'undefined' ? '' : ns;
            //nsetMessage(ns + ' ' + $(e.target).attr('alt') + ' ');
            ns = ns + ' ' + $(e.target).attr('alt') + ' ';
            neditApi.setMessage(ns, true);
        }
    } //nemoListHandler
 
    function nemobHandler (e) {
        //emo button click handler
        nshowEmoList(e);
    } //nemobHandler
 
    function ncreateEmoList() {
        //create emo list
        if (nbDebug) console.log('ac. create emo list');
        var nbs='.speech-bubble-buttons';//'.MiniEditorWrapper .cke_toolbar_insert';//'.speech-bubble-buttons';//'.speech-bubble-message .toolbar';
        nemoList=$('<div/>', {
            class: nemoListClass,
            width: '250px',
            style: 'z-index: 10; position: fixed; display: block;',
            //height: 'auto',
            text: ''
        }).appendTo('body');//.ready(function(){
        $(nemoList).hide();
        //$('body').append($(nemoList));
        $(nemoList).on('click', nemoListHandler);
        //fill list
        if (nbDebug) console.log('ac.cel emo.len:'+nEmoCodes.length);
        var nimg, nprev;
        for (var i=0; i<nEmoCodes.length; i++) {
            if (nEmoCodes[i][1] !== nprev) {
                nprev=nEmoCodes[i][1];
                nimg=$('<img>', {
                    src: nEmoCodes[i][1], 
                    class: nemoSmileClass, 
                    alt: nEmoCodes[i][0], 
                    title: nEmoCodes[i][0],
                    style: 'width: 19px; height: 19px;'
                    });
                $(nemoList).append(nimg);
            }
        }
        //$('body').on('click keydown keypress', nemoListHandler);
        //var nemoButton=$('<button/>', {
        var nemoButton=$('<img>', {
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
            $(nemoList).hide();
        });
        //console.log('el.len:'+$(nemoList).find('img').length);
    } //createEmoList
 
    function nparseEmo (data) {
        //nEmoticons=[];
        if (nbDebug) console.log('ac. parse emo');
        nEmoCodes=[];
        var nimg;
        var $nemos=$(data);
        $nemos.children('ul:first').children('li').each(function(index, value){
            //get img and put it in emoticons
            nimg=$(value).find('img');
            $(value).children('ul:first').children('li').each(function(index, value){
                nEmoCodes.push([$(value).text().trim(), nimg.attr('src')]);
            });
        });
        if (nbUseEmoList) {
            ncreateEmoList();
        }
    } //nparseEmo
 
    function nparseObscene (data) {
        //load profanity filters
        if (nbDebug) console.log('ac. parse obscene. data:'+data.length);
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
        if (nbDebug) {
            console.log('ac.po obsc:'+nObscene.length+' excl:'+nObsceneExcl.length);
            window.nAutoCap.Obscene = nObscene;
            window.nAutoCap.ObsceneExcl = nObsceneExcl;
        }
    } //nparseObscene
 
    function nloadData() {
        //var url='MediaWiki:Emoticons';
        if (nbDebug) console.log('ac. load data started');
        if (nbEmoticons) {
            if (nbUseTemplate) {
                $.get(mw.util.getUrl('template:' + nTemplateName + '/doc', {action: 'render'})).done(nparseEmo);
            } else {
                $.get(mw.util.getUrl('MediaWiki:Emoticons', {action: 'render'})).done(nparseEmo);
            }
        } //if emoticons
        if (nbProfanity) {
            $.get(mw.util.getUrl('template:' + nTemplateName + '/obscene', {action: 'render'})).done(nparseObscene);
        } //if profanity
    } //nloadEmo
 
    function nHandler (e) {
        //click handler
        var nmsg = neditApi.getMessage();
        if (nmsg && nmsg.length > 0) {
            var nnewMsg = ncapitalize(nmsg);
            if (nbDebug) console.log('ac.m: ' + nnewMsg);
            neditApi.setMessage(nnewMsg, true);
        }
        return true;
    } //nHandler
 
    function nhlpReplacer (match, p1) {
        //replacer helper function
        return nProfanityString.format(match);
    }//hlpReplacer
 
    function ncapitalize (nstring) {
        //add additional spaces
        var i, i1, len, len1;
        nstring = nstring.replace(/>/g, '> ').replace(/</g, ' <').replace(/\}\}/g, '}} '); //.replace(/  /g, ' ');
        //apply profanity filter
        if (nbProfanity) {
            //remove exclusions
            var ns1 = nstring, na = [], repl = [], r, re;
            for (i=0, len=nObsceneExcl.length; i<len; i++) {
                re = new RegExp(nObsceneExcl[i], 'igm');
                na = ns1.match(re) || [];
                if (nbDebug) console.log('ac.c excl:'+na.length+':'+nObsceneExcl[i]);
                for (i1=0, len1=na.length; i1<len1; i1++) {
                    r = {id: gguid(), value: na[i1]};
                    repl.push(r);
                    if (nbDebug) console.log('ac.c exclude '+r.id+':'+r.value);
                    ns1 = ns1.replace(new RegExp(escapeRegExp(r.value), 'im'), r.id);
                    //break; //1 is (not) enough
                } //for i1
            } //for i (obsc excl)
            //remove obscene
            if (nbDebug) console.log('ac.c r obsc s: '+ns1);
            for (i=0, len=nObscene.length; i<len; i++) {
                re = new RegExp(nObscene[i], 'igm');
                //ns1 = escapeRegExp(ns1);
                ns1 = ns1.replace(re, nhlpReplacer);
            }//for i (obsc)
            //restore exclusions
            for (i=0, len=repl.length; i<len; i++) {
                r = repl[i];
                re = new RegExp(r.id, 'im');
                ns1 = ns1.replace(re, r.value);
            }//for i (restore excl)
            nstring = ns1;
        } //if profanity
 
        if (nbAutoCap) {
            nstring=nstring.replace(/.*?(\}\}|[\.\?\!\>])(\s|$)/gm, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1);
                });
        } //if autocap
 
        if (nbEmoticons) {
            for (i=0, len=nEmoCodes.length; i<len; i++) {
                if (nbUseTemplate) {
                    nstring=nstring.replace(new RegExp('(\\s|^)(' + escapeRegExp(nEmoCodes[i][0]) + ')(\\s|$)', 'igm'), '  {{' + nTemplateName + '|smile=' + nEmoCodes[i][0] + '}}  ');
                } else {
                    nstring=nstring.replace(new RegExp('(\\s|^)(' + escapeRegExp(nEmoCodes[i][0]) + ')(\\s|$)', 'igm'), '  ' + nEmoCodes[i][1] + '  ');
                }
            }
        } //if emoticons
        //remove spaces added
        nstring=nstring.replace(/> /g,'>').replace(/ </g, '<').replace(/\}\} /g, '}}').replace(/  /g, ' ');
        return nstring;
    } //ncapitalize
 
function nmain() {
    //document.ready
    $(function() {
        //document.ready
        if (nbReady) return; //multiple doc.ready protection
        nbReady = true; //multiple doc.ready protection
        switch (mw.config.get('wgNamespaceNumber')) {
            case 0:
                //wikia article
                nNamespace = 2;
                //w8 4 comm. forever
                var ntimer=setInterval(function() {
                    $('.MiniEditorWrapper input[type="submit"]').off('focusin', nHandler);
                    $('.MiniEditorWrapper input[type="submit"]').on('focusin', nHandler);
                }, 3000);
                break;
            case 500:
                //blog = wikia article
                nNamespace = 2;
                //w8 4 comm. forever
                var ntimer1=setInterval(function() {
                    $('.MiniEditorWrapper input[type="submit"]').off('focusin', nHandler);
                    $('.MiniEditorWrapper input[type="submit"]').on('focusin', nHandler);
                }, 3000);
                break;
            case 1201:
                //forum
                nNamespace = 1;
                $('.MiniEditorWrapper .replyButton, .MiniEditorWrapper .previewButton').on('focusin', nHandler);
                break;
            default:
                nNamespace = 0;
                if (nbDebug) console.log('ac.namespace:' + nNamespace);
                break;
        } //switch namespacenumber
        if (nNamespace === 0) {
            //nowhere to work
            return false;
        }
        //get edit api. should be after namespace checks 
        neditApi = new window.ngMsgEditAPI();
    }); //document.ready
} //nmain
 
if (!window.ngMsgEditAPI || !window.ngMsgEditAPI.version) {
//load edit api
if(nbDebug) console.log('ac. load edit api');
$.ajaxSetup({cache: true});
$.getScript('http://ru.borderlands.wikia.com/index.php?title=MediaWiki:MessageEditAPI.js&action=raw&ctype=text/javascript', nmain); //getscript
} else {
    nmain();
} //if not edipapi
}(jQuery)); //autocapitalize