/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages","Special:NewFiles"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

/* Center Template:Button */
$(".nav-button").parent().css("text-align", "center");

/* User profile header custom tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { link:'Project:Administrators' },
		bot: { link:'Help:Bots' }
	}
};
UserTagsJS.modules.inactive = 72;
UserTagsJS.modules.mwGroups = ['sysop', 'bot', 'bot-global'];

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges"];

/* Reveal anon IPs */
window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};

/* Standard edit summaries */
window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'MediaWiki:Stdsummaries',
    css: '#stdSummaries { ... }'
};

/* Imagebox */
/* destfile checker from http://starwars.wikia.com/wiki/MediaWiki:Common.js 
   modified by Lia */

$("#mw-upload-form").submit(function (event) {
    var wpDestFile = $("#wpDestFile").val();

    if ( wpDestFile.match(/(JPG|PNG|GIF|SVG|jpg\.jpg|png\.png|gif\.gif|svg\.svg)$/)) {
        alert('Please do not use capitalized or duplicated file extensions in the filename.');
        return false;
    }
});

/* Tabber default snippet by Lunarity; infobox-tabber checker and inner tabber adjustments for JsTabs by Lia */
if ($('#infobox-tabber') !== null) {
    $(window).on('load.tabberhack', function() {
        var AMAlength = $('#AMA').find("li").length, 
            AMRlength = $('#AMR').find("li").length,
            AOlength = $('#AO').find("li").length,
            length1 = $('.tabberlive').length,
            tablength = $('.tabberlive').find("li").length;
        if (AMAlength + AMRlength + AOlength > 0) {
            if (AMAlength > 0) {
                $('.tabberlive')[0].tabber.tabShow(AMAlength - 1);
            }
            if (AMRlength > 0) {
                $('.tabberlive')[length1 - 2].tabber.tabShow(AMRlength - 1);
            }
            if (AOlength > 0) {
                $('.tabberlive')[length1 - 1].tabber.tabShow(AOlength - 1);
            }
        } else {
            $('.tabberlive')[0].tabber.tabShow(tablength - 1);
        }
          
        $(window).off('load.tabberhack');
    });
}

/* Toggles a certain quote when a Tabber tab is clicked.
 Created by: [[User:LiaSakura]] */
$(function TabberToggle() {
    if ($('#infobox-tabber') !== null) {
        $('.tabbernav').click(function () {
            var tab = $('.tabbernav').find('.tabberactive a').attr("title");
            switch (tab) {
                case 'AMA':
                    $('#AMAQ').show();
                    $('#AMAB').show();
                    $('#AMRQ').hide();
                    $('#AMRB').hide();
                    break;
                case 'AMR':
                    $('#AMRQ').show();
                    $('#AMRB').show();
                    $('#AMAQ').hide();
                    $('#AMAB').hide();                    
                    break;
            }
        });
    }
}
);
addOnloadHook(TabberToggle);


/* CUSTOM EDIT BUTTONS */
if (mwCustomEditButtons) {

/*** wrappers *****/

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/americanmcgeesalice/images/8/8c/Button_RedX.png",
     "speedTip": "request delete",
     "tagOpen": "\{\{delete|",
     "tagClose": "\}\}",
     "sampleText": "your reason here"};
}

 /* From http://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js */
$(function() {
	console.log("version:" + mw.config.get( 'wgVersion' ));
	if ( mw.config.get( 'wgVersion' ) !== '1.19.24' && $( '#icons' ).length ) {
		alert("yo");
        $( '.page-header__contribution > div' ).first().append( $( '#icons' ).show() );
    } else if( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
			$( '#icons' ).attr( 'style', 'position: absolute; right: 70px;')
		);
	} else {
		alert("no");
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '0px'} ).show();
    }
});

/* For imagebox */	
window.uploadText = "{{Imagebox\n"
	+ "| description = \n"
	+ "| series      = \n"
	+ "| source      = \n"
	+ "| author      = \n"
	+ "| origin      = \n"
	+ "| cats        = \n"
	+ "| license     = \n"
	+ "}}";

/* Sprite icons */
$(function() { 
    $('.edit-pencil').attr('src','https://images.wikia.nocookie.net/__cb20140809102221/americanmcgeesalice/images/4/4f/Pen.png');
    $('.search').attr('src','https://images.wikia.nocookie.net/__cb20130630142411/americanmcgeesalice/images/8/88/Drink_Me_potion_icon.png');
});

/* Little homage to AO release */
$('.wds-community-header__wordmark').hover(function () {
    $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/americanmcgeesalice/images/2/21/Wiki-wordmark.gif/revision/latest?cb=20151101170512'); 
});

$(window).load(function(){
/**
 * Prepares file links so that SoundManager 2 can modify them.
 * @see [[Template:sm2]]
 * @see https://gerrit.wikimedia.org/r/gitweb?p=mediawiki/extensions/SoundManager2Button.git;a=blob;f=SoundManager2Button.php;h=4a6b8c571b818afdd69cbcfd03cd774997eebc7a;hb=refs/heads/REL1_20#l104
 **/
 $('a.internal','span.audio_button',mw.util.$content).attr({'class':'sm2_button','title':'Play'}).text('Play').unwrap();

 if (mw.loader.getState('ext.wfSoundManager2Button') === null) {
/**
 * Complex code that is added upon "SoundManager 2" (SM2) installation.
 * Obsolete when SM2 gets installed (because SoundManager2Button adds this code)
 *
 * https://www.mediawiki.org/wiki/Extension:SoundManager2Button
 * http://schillmania.com/projects/soundmanager2/
 * @version 0.3.3 (REL1_20)
 **/

mw.loader.implement("ext.wfSoundManager2Button",function($){(function(window){var soundManager=null;function SoundManager(smURL,smID){this.setupOptions={'url':(smURL||null),'flashVersion':8,'debugMode':true,'debugFlash':false,'useConsole':true,'consoleOnly':true,'waitForWindowLoad':false,'bgColor':'#ffffff','useHighPerformance':false,'flashPollingInterval':null,'html5PollingInterval':null,'flashLoadTimeout':1000,'wmode':null,'allowScriptAccess':'always','useFlashBlock':false,'useHTML5Audio':true,'html5Test':/^(probably|maybe)$/i,'preferFlash':true,'noSWFCache':false};this.defaultOptions={'autoLoad':false,'autoPlay':false,'from':null,'loops':1,'onid3':null,'onload':null,'whileloading':null,'onplay':null,'onpause':null,'onresume':null,'whileplaying':null,'onposition':null,'onstop':null,'onfailure':null,'onfinish':null,'multiShot':true,'multiShotEvents':false,'position':null,'pan':0,'stream':true,'to':null,'type':null,'usePolicyFile':false,'volume':100};this.flash9Options={'isMovieStar':
null,'usePeakData':false,'useWaveformData':false,'useEQData':false,'onbufferchange':null,'ondataerror':null};this.movieStarOptions={'bufferTime':3,'serverURL':null,'onconnect':null,'duration':null};this.audioFormats={'mp3':{'type':['audio/mpeg; codecs="mp3"','audio/mpeg','audio/mp3','audio/MPA','audio/mpa-robust'],'required':true},'mp4':{'related':['aac','m4a'],'type':['audio/mp4; codecs="mp4a.40.2"','audio/aac','audio/x-m4a','audio/MP4A-LATM','audio/mpeg4-generic'],'required':false},'ogg':{'type':['audio/ogg; codecs=vorbis'],'required':false},'wav':{'type':['audio/wav; codecs="1"','audio/wav','audio/wave','audio/x-wav'],'required':false}};this.movieID='sm2-container';this.id=(smID||'sm2movie');this.debugID='soundmanager-debug';this.debugURLParam=/([#?&])debug=1/i;this.versionNumber='V2.97a.20120624';this.version=null;this.movieURL=null;this.altURL=null;this.swfLoaded=false;this.enabled=false;this.oMC=null;this.sounds={};this.soundIDs=[];this.muted=false;this.didFlashBlock=false;this.
filePattern=null;this.filePatterns={'flash8':/\.mp3(\?.*)?$/i,'flash9':/\.mp3(\?.*)?$/i};this.features={'buffering':false,'peakData':false,'waveformData':false,'eqData':false,'movieStar':false};this.sandbox={};this.hasHTML5=(function(){try{return(typeof Audio!=='undefined'&&typeof new Audio().canPlayType!=='undefined');}catch(e){return false;}}());this.html5={'usingFlash':null};this.flash={};this.html5Only=false;this.ignoreFlash=false;var SMSound,_s=this,_flash=null,_sm='soundManager',_smc=_sm+'::',_h5='HTML5::',_id,_ua=navigator.userAgent,_win=window,_wl=_win.location.href.toString(),_doc=document,_doNothing,_setProperties,_init,_fV,_on_queue=[],_debugOpen=true,_debugTS,_didAppend=false,_appendSuccess=false,_didInit=false,_disabled=false,_windowLoaded=false,_wDS,_wdCount=0,_initComplete,_mixin,_assign,_extraOptions,_addOnEvent,_processOnEvents,_initUserOnload,_delayWaitForEI,_waitForEI,_setVersionInfo,_handleFocus,_strings,_initMovie,_domContentLoaded,_winOnLoad,_didDCLoaded,
_getDocument,_createMovie,_catchError,_setPolling,_initDebug,_debugLevels=['log','info','warn','error'],_defaultFlashVersion=8,_disableObject,_failSafely,_normalizeMovieURL,_oRemoved=null,_oRemovedHTML=null,_str,_flashBlockHandler,_getSWFCSS,_swfCSS,_toggleDebug,_loopFix,_policyFix,_complain,_idCheck,_waitingForEI=false,_initPending=false,_startTimer,_stopTimer,_timerExecute,_h5TimerCount=0,_h5IntervalTimer=null,_parseURL,_needsFlash=null,_featureCheck,_html5OK,_html5CanPlay,_html5Ext,_html5Unload,_domContentLoadedIE,_testHTML5,_event,_slice=Array.prototype.slice,_useGlobalHTML5Audio=false,_hasFlash,_detectFlash,_badSafariFix,_html5_events,_showSupport,_is_iDevice=_ua.match(/(ipad|iphone|ipod)/i),_isIE=_ua.match(/msie/i),_isWebkit=_ua.match(/webkit/i),_isSafari=(_ua.match(/safari/i)&&!_ua.match(/chrome/i)),_isOpera=(_ua.match(/opera/i)),_mobileHTML5=(_ua.match(/(mobile|pre\/|xoom)/i)||_is_iDevice),_isBadSafari=(!_wl.match(/usehtml5audio/i)&&!_wl.match(/sm2\-ignorebadua/i)&&_isSafari&&!
_ua.match(/silk/i)&&_ua.match(/OS X 10_6_([3-7])/i)),_hasConsole=(typeof console!=='undefined'&&typeof console.log!=='undefined'),_isFocused=(typeof _doc.hasFocus!=='undefined'?_doc.hasFocus():null),_tryInitOnFocus=(_isSafari&&(typeof _doc.hasFocus==='undefined'||!_doc.hasFocus())),_okToDisable=!_tryInitOnFocus,_flashMIME=/(mp3|mp4|mpa|m4a)/i,_emptyURL='about:blank',_overHTTP=(_doc.location?_doc.location.protocol.match(/http/i):null),_http=(!_overHTTP?'http:/'+'/':''),_netStreamMimeTypes=/^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|mp4v|3gp|3g2)\s*(?:$|;)/i,_netStreamTypes=['mpeg4','aac','flv','mov','mp4','m4v','f4v','m4a','mp4v','3gp','3g2'],_netStreamPattern=new RegExp('\\.('+_netStreamTypes.join('|')+')(\\?.*)?$','i');this.mimePattern=/^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;this.useAltURL=!_overHTTP;this._global_a=null;_swfCSS={'swfBox':'sm2-object-box','swfDefault':'movieContainer','swfError':'swf_error','swfTimedout':'swf_timedout','swfLoaded':'swf_loaded',
'swfUnblocked':'swf_unblocked','sm2Debug':'sm2_debug','highPerf':'high_performance','flashDebug':'flash_debug'};if(_mobileHTML5){_s.useHTML5Audio=true;_s.preferFlash=false;if(_is_iDevice){_s.ignoreFlash=true;_useGlobalHTML5Audio=true;}}this.setup=function(options){if(typeof options!=='undefined'&&_didInit&&_needsFlash&&_s.ok()&&(typeof options.flashVersion!=='undefined'||typeof options.url!=='undefined')){_complain(_str('setupLate'));}_assign(options);return _s;};this.ok=function(){return(_needsFlash?(_didInit&&!_disabled):(_s.useHTML5Audio&&_s.hasHTML5));};this.supported=this.ok;this.getMovie=function(smID){return _id(smID)||_doc[smID]||_win[smID];};this.createSound=function(oOptions,_url){var _cs,_cs_string,thisOptions=null,oSound=null,_tO=null;if(!_didInit||!_s.ok()){_complain(_cs_string);return false;}if(typeof _url!=='undefined'){oOptions={'id':oOptions,'url':_url};}thisOptions=_mixin(oOptions);thisOptions.url=_parseURL(thisOptions.url);_tO=thisOptions;if(_idCheck(_tO.id,true)){
return _s.sounds[_tO.id];}function make(){thisOptions=_loopFix(thisOptions);_s.sounds[_tO.id]=new SMSound(_tO);_s.soundIDs.push(_tO.id);return _s.sounds[_tO.id];}if(_html5OK(_tO)){oSound=make();oSound._setup_html5(_tO);}else{if(_fV>8){if(_tO.isMovieStar===null){_tO.isMovieStar=!!(_tO.serverURL||(_tO.type?_tO.type.match(_netStreamMimeTypes):false)||_tO.url.match(_netStreamPattern));}}_tO=_policyFix(_tO,_cs);oSound=make();if(_fV===8){_flash._createSound(_tO.id,_tO.loops||1,_tO.usePolicyFile);}else{_flash._createSound(_tO.id,_tO.url,_tO.usePeakData,_tO.useWaveformData,_tO.useEQData,_tO.isMovieStar,(_tO.isMovieStar?_tO.bufferTime:false),_tO.loops||1,_tO.serverURL,_tO.duration||null,_tO.autoPlay,true,_tO.autoLoad,_tO.usePolicyFile);if(!_tO.serverURL){oSound.connected=true;if(_tO.onconnect){_tO.onconnect.apply(oSound);}}}if(!_tO.serverURL&&(_tO.autoLoad||_tO.autoPlay)){oSound.load(_tO);}}if(!_tO.serverURL&&_tO.autoPlay){oSound.play();}return oSound;};this.destroySound=function(sID,
_bFromSound){if(!_idCheck(sID)){return false;}var oS=_s.sounds[sID],i;oS._iO={};oS.stop();oS.unload();for(i=0;i<_s.soundIDs.length;i++){if(_s.soundIDs[i]===sID){_s.soundIDs.splice(i,1);break;}}if(!_bFromSound){oS.destruct(true);}oS=null;delete _s.sounds[sID];return true;};this.load=function(sID,oOptions){if(!_idCheck(sID)){return false;}return _s.sounds[sID].load(oOptions);};this.unload=function(sID){if(!_idCheck(sID)){return false;}return _s.sounds[sID].unload();};this.onPosition=function(sID,nPosition,oMethod,oScope){if(!_idCheck(sID)){return false;}return _s.sounds[sID].onposition(nPosition,oMethod,oScope);};this.onposition=this.onPosition;this.clearOnPosition=function(sID,nPosition,oMethod){if(!_idCheck(sID)){return false;}return _s.sounds[sID].clearOnPosition(nPosition,oMethod);};this.play=function(sID,oOptions){var result=false;if(!_didInit||!_s.ok()){_complain(_sm+'.play(): '+_str(!_didInit?'notReady':'notOK'));return result;}if(!_idCheck(sID)){if(!(oOptions instanceof Object)){
oOptions={url:oOptions};}if(oOptions&&oOptions.url){oOptions.id=sID;result=_s.createSound(oOptions).play();}return result;}return _s.sounds[sID].play(oOptions);};this.start=this.play;this.setPosition=function(sID,nMsecOffset){if(!_idCheck(sID)){return false;}return _s.sounds[sID].setPosition(nMsecOffset);};this.stop=function(sID){if(!_idCheck(sID)){return false;}return _s.sounds[sID].stop();};this.stopAll=function(){var oSound;for(oSound in _s.sounds){if(_s.sounds.hasOwnProperty(oSound)){_s.sounds[oSound].stop();}}};this.pause=function(sID){if(!_idCheck(sID)){return false;}return _s.sounds[sID].pause();};this.pauseAll=function(){var i;for(i=_s.soundIDs.length-1;i>=0;i--){_s.sounds[_s.soundIDs[i]].pause();}};this.resume=function(sID){if(!_idCheck(sID)){return false;}return _s.sounds[sID].resume();};this.resumeAll=function(){var i;for(i=_s.soundIDs.length-1;i>=0;i--){_s.sounds[_s.soundIDs[i]].resume();}};this.togglePause=function(sID){if(!_idCheck(sID)){return false;}return _s.sounds[sID
].togglePause();};this.setPan=function(sID,nPan){if(!_idCheck(sID)){return false;}return _s.sounds[sID].setPan(nPan);};this.setVolume=function(sID,nVol){if(!_idCheck(sID)){return false;}return _s.sounds[sID].setVolume(nVol);};this.mute=function(sID){var i=0;if(typeof sID!=='string'){sID=null;}if(!sID){for(i=_s.soundIDs.length-1;i>=0;i--){_s.sounds[_s.soundIDs[i]].mute();}_s.muted=true;}else{if(!_idCheck(sID)){return false;}return _s.sounds[sID].mute();}return true;};this.muteAll=function(){_s.mute();};this.unmute=function(sID){var i;if(typeof sID!=='string'){sID=null;}if(!sID){for(i=_s.soundIDs.length-1;i>=0;i--){_s.sounds[_s.soundIDs[i]].unmute();}_s.muted=false;}else{if(!_idCheck(sID)){return false;}return _s.sounds[sID].unmute();}return true;};this.unmuteAll=function(){_s.unmute();};this.toggleMute=function(sID){if(!_idCheck(sID)){return false;}return _s.sounds[sID].toggleMute();};this.getMemoryUse=function(){var ram=0;if(_flash&&_fV!==8){ram=parseInt(_flash._getMemoryUse(),10);}
return ram;};this.disable=function(bNoDisable){var i;if(typeof bNoDisable==='undefined'){bNoDisable=false;}if(_disabled){return false;}_disabled=true;for(i=_s.soundIDs.length-1;i>=0;i--){_disableObject(_s.sounds[_s.soundIDs[i]]);}_initComplete(bNoDisable);_event.remove(_win,'load',_initUserOnload);return true;};this.canPlayMIME=function(sMIME){var result;if(_s.hasHTML5){result=_html5CanPlay({type:sMIME});}if(!result&&_needsFlash){result=(sMIME&&_s.ok()?!!((_fV>8?sMIME.match(_netStreamMimeTypes):null)||sMIME.match(_s.mimePattern)):null);}return result;};this.canPlayURL=function(sURL){var result;if(_s.hasHTML5){result=_html5CanPlay({url:sURL});}if(!result&&_needsFlash){result=(sURL&&_s.ok()?!!(sURL.match(_s.filePattern)):null);}return result;};this.canPlayLink=function(oLink){if(typeof oLink.type!=='undefined'&&oLink.type){if(_s.canPlayMIME(oLink.type)){return true;}}return _s.canPlayURL(oLink.href);};this.getSoundById=function(sID,_suppressDebug){if(!sID){throw new Error(_sm+
'.getSoundById(): sID is null/undefined');}var result=_s.sounds[sID];return result;};this.onready=function(oMethod,oScope){var sType='onready',result=false;if(typeof oMethod==='function'){if(!oScope){oScope=_win;}_addOnEvent(sType,oMethod,oScope);_processOnEvents();result=true;}else{throw _str('needFunction',sType);}return result;};this.ontimeout=function(oMethod,oScope){var sType='ontimeout',result=false;if(typeof oMethod==='function'){if(!oScope){oScope=_win;}_addOnEvent(sType,oMethod,oScope);_processOnEvents({type:sType});result=true;}else{throw _str('needFunction',sType);}return result;};this._writeDebug=function(sText,sType,_bTimestamp){return true;};this._wD=this._writeDebug;this._debug=function(){};this.reboot=function(){var i,j;for(i=_s.soundIDs.length-1;i>=0;i--){_s.sounds[_s.soundIDs[i]].destruct();}if(_flash){try{if(_isIE){_oRemovedHTML=_flash.innerHTML;}_oRemoved=_flash.parentNode.removeChild(_flash);}catch(e){}}_oRemovedHTML=_oRemoved=_needsFlash=null;_s.enabled=
_didDCLoaded=_didInit=_waitingForEI=_initPending=_didAppend=_appendSuccess=_disabled=_s.swfLoaded=false;_s.soundIDs=[];_s.sounds={};_flash=null;for(i in _on_queue){if(_on_queue.hasOwnProperty(i)){for(j=_on_queue[i].length-1;j>=0;j--){_on_queue[i][j].fired=false;}}}_win.setTimeout(_s.beginDelayedInit,20);};this.getMoviePercent=function(){return(_flash&&typeof _flash.PercentLoaded!=='undefined'?_flash.PercentLoaded():null);};this.beginDelayedInit=function(){_windowLoaded=true;_domContentLoaded();setTimeout(function(){if(_initPending){return false;}_createMovie();_initMovie();_initPending=true;return true;},20);_delayWaitForEI();};this.destruct=function(){_s.disable(true);};SMSound=function(oOptions){var _t=this,_resetProperties,_add_html5_events,_remove_html5_events,_stop_html5_timer,_start_html5_timer,_attachOnPosition,_onplay_called=false,_onPositionItems=[],_onPositionFired=0,_detachOnPosition,_applyFromTo,_lastURL=null,_lastHTML5State;_lastHTML5State={duration:null,time:null};this.id
=oOptions.id;this.sID=this.id;this.url=oOptions.url;this.options=_mixin(oOptions);this.instanceOptions=this.options;this._iO=this.instanceOptions;this.pan=this.options.pan;this.volume=this.options.volume;this.isHTML5=false;this._a=null;this.id3={};this._debug=function(){};this.load=function(oOptions){var oS=null,_iO;if(typeof oOptions!=='undefined'){_t._iO=_mixin(oOptions,_t.options);_t.instanceOptions=_t._iO;}else{oOptions=_t.options;_t._iO=oOptions;_t.instanceOptions=_t._iO;if(_lastURL&&_lastURL!==_t.url){_t._iO.url=_t.url;_t.url=null;}}if(!_t._iO.url){_t._iO.url=_t.url;}_t._iO.url=_parseURL(_t._iO.url);if(_t._iO.url===_t.url&&_t.readyState!==0&&_t.readyState!==2){if(_t.readyState===3&&_t._iO.onload){_t._iO.onload.apply(_t,[(!!_t.duration)]);}return _t;}_iO=_t._iO;_lastURL=_t.url;_t.loaded=false;_t.readyState=1;_t.playState=0;_t.id3={};if(_html5OK(_iO)){oS=_t._setup_html5(_iO);if(!oS._called_load){_t._html5_canplay=false;if(_t._a.src!==_iO.url){_t._a.src=_iO.url;_t.setPosition(0);}_t
._a.autobuffer='auto';_t._a.preload='auto';oS._called_load=true;if(_iO.autoPlay){_t.play();}}else{}}else{try{_t.isHTML5=false;_t._iO=_policyFix(_loopFix(_iO));_iO=_t._iO;if(_fV===8){_flash._load(_t.id,_iO.url,_iO.stream,_iO.autoPlay,(_iO.whileloading?1:0),_iO.loops||1,_iO.usePolicyFile);}else{_flash._load(_t.id,_iO.url,!!(_iO.stream),!!(_iO.autoPlay),_iO.loops||1,!!(_iO.autoLoad),_iO.usePolicyFile);}}catch(e){_catchError({type:'SMSOUND_LOAD_JS_EXCEPTION',fatal:true});}}return _t;};this.unload=function(){if(_t.readyState!==0){if(!_t.isHTML5){if(_fV===8){_flash._unload(_t.id,_emptyURL);}else{_flash._unload(_t.id);}}else{_stop_html5_timer();if(_t._a){_t._a.pause();_html5Unload(_t._a,_emptyURL);_t.url=_emptyURL;}}_resetProperties();}return _t;};this.destruct=function(_bFromSM){if(!_t.isHTML5){_t._iO.onfailure=null;_flash._destroySound(_t.id);}else{_stop_html5_timer();if(_t._a){_t._a.pause();_html5Unload(_t._a);if(!_useGlobalHTML5Audio){_remove_html5_events();}_t._a._t=null;_t._a=null;}}if(
!_bFromSM){_s.destroySound(_t.id,true);}};this.play=function(oOptions,_updatePlayState){var fN,allowMulti,a,onready,startOK=true,exit=null;_updatePlayState=(typeof _updatePlayState==='undefined'?true:_updatePlayState);if(!oOptions){oOptions={};}_t._iO=_mixin(oOptions,_t._iO);_t._iO=_mixin(_t._iO,_t.options);_t._iO.url=_parseURL(_t._iO.url);_t.instanceOptions=_t._iO;if(_t._iO.serverURL&&!_t.connected){if(!_t.getAutoPlay()){_t.setAutoPlay(true);}return _t;}if(_html5OK(_t._iO)){_t._setup_html5(_t._iO);_start_html5_timer();}if(_t.playState===1&&!_t.paused){allowMulti=_t._iO.multiShot;if(!allowMulti){exit=_t;}else{}}if(exit!==null){return exit;}if(!_t.loaded){if(_t.readyState===0){if(!_t.isHTML5){_t._iO.autoPlay=true;_t.load(_t._iO);}else{_t.load(_t._iO);}}else if(_t.readyState===2){exit=_t;}else{}}else{}if(exit!==null){return exit;}if(!_t.isHTML5&&_fV===9&&_t.position>0&&_t.position===_t.duration){oOptions.position=0;}if(_t.paused&&_t.position&&_t.position>0){_t.resume();}else{_t._iO=
_mixin(oOptions,_t._iO);if(_t._iO.from!==null&&_t._iO.to!==null&&_t.instanceCount===0&&_t.playState===0&&!_t._iO.serverURL){onready=function(){_t._iO=_mixin(oOptions,_t._iO);_t.play(_t._iO);};if(_t.isHTML5&&!_t._html5_canplay){_t.load({_oncanplay:onready});exit=false;}else if(!_t.isHTML5&&!_t.loaded&&(!_t.readyState||_t.readyState!==2)){_t.load({onload:onready});exit=false;}if(exit!==null){return exit;}_t._iO=_applyFromTo();}if(!_t.instanceCount||_t._iO.multiShotEvents||(!_t.isHTML5&&_fV>8&&!_t.getAutoPlay())){_t.instanceCount++;}if(_t._iO.onposition&&_t.playState===0){_attachOnPosition(_t);}_t.playState=1;_t.paused=false;_t.position=(typeof _t._iO.position!=='undefined'&&!isNaN(_t._iO.position)?_t._iO.position:0);if(!_t.isHTML5){_t._iO=_policyFix(_loopFix(_t._iO));}if(_t._iO.onplay&&_updatePlayState){_t._iO.onplay.apply(_t);_onplay_called=true;}_t.setVolume(_t._iO.volume,true);_t.setPan(_t._iO.pan,true);if(!_t.isHTML5){startOK=_flash._start(_t.id,_t._iO.loops||1,(_fV===9?_t._iO.
position:_t._iO.position/1000),_t._iO.multiShot);if(_fV===9&&!startOK){if(_t._iO.onplayerror){_t._iO.onplayerror.apply(_t);}}}else{_start_html5_timer();a=_t._setup_html5();_t.setPosition(_t._iO.position);a.play();}}return _t;};this.start=this.play;this.stop=function(bAll){var _iO=_t._iO,_oP;if(_t.playState===1){_t._onbufferchange(0);_t._resetOnPosition(0);_t.paused=false;if(!_t.isHTML5){_t.playState=0;}_detachOnPosition();if(_iO.to){_t.clearOnPosition(_iO.to);}if(!_t.isHTML5){_flash._stop(_t.id,bAll);if(_iO.serverURL){_t.unload();}}else{if(_t._a){_oP=_t.position;_t.setPosition(0);_t.position=_oP;_t._a.pause();_t.playState=0;_t._onTimer();_stop_html5_timer();}}_t.instanceCount=0;_t._iO={};if(_iO.onstop){_iO.onstop.apply(_t);}}return _t;};this.setAutoPlay=function(autoPlay){_t._iO.autoPlay=autoPlay;if(!_t.isHTML5){_flash._setAutoPlay(_t.id,autoPlay);if(autoPlay){if(!_t.instanceCount&&_t.readyState===1){_t.instanceCount++;}}}};this.getAutoPlay=function(){return _t._iO.autoPlay;};this.
setPosition=function(nMsecOffset){if(typeof nMsecOffset==='undefined'){nMsecOffset=0;}var original_pos,position,position1K,offset=(_t.isHTML5?Math.max(nMsecOffset,0):Math.min(_t.duration||_t._iO.duration,Math.max(nMsecOffset,0)));original_pos=_t.position;_t.position=offset;position1K=_t.position/1000;_t._resetOnPosition(_t.position);_t._iO.position=offset;if(!_t.isHTML5){position=(_fV===9?_t.position:position1K);if(_t.readyState&&_t.readyState!==2){_flash._setPosition(_t.id,position,(_t.paused||!_t.playState),_t._iO.multiShot);}}else if(_t._a){if(_t._html5_canplay){if(_t._a.currentTime!==position1K){try{_t._a.currentTime=position1K;if(_t.playState===0||_t.paused){_t._a.pause();}}catch(e){}}}else{}}if(_t.isHTML5){if(_t.paused){_t._onTimer(true);}}return _t;};this.pause=function(_bCallFlash){if(_t.paused||(_t.playState===0&&_t.readyState!==1)){return _t;}_t.paused=true;if(!_t.isHTML5){if(_bCallFlash||typeof _bCallFlash==='undefined'){_flash._pause(_t.id,_t._iO.multiShot);}}else{_t.
_setup_html5().pause();_stop_html5_timer();}if(_t._iO.onpause){_t._iO.onpause.apply(_t);}return _t;};this.resume=function(){var _iO=_t._iO;if(!_t.paused){return _t;}_t.paused=false;_t.playState=1;if(!_t.isHTML5){if(_iO.isMovieStar&&!_iO.serverURL){_t.setPosition(_t.position);}_flash._pause(_t.id,_iO.multiShot);}else{_t._setup_html5().play();_start_html5_timer();}if(!_onplay_called&&_iO.onplay){_iO.onplay.apply(_t);_onplay_called=true;}else if(_iO.onresume){_iO.onresume.apply(_t);}return _t;};this.togglePause=function(){if(_t.playState===0){_t.play({position:(_fV===9&&!_t.isHTML5?_t.position:_t.position/1000)});return _t;}if(_t.paused){_t.resume();}else{_t.pause();}return _t;};this.setPan=function(nPan,bInstanceOnly){if(typeof nPan==='undefined'){nPan=0;}if(typeof bInstanceOnly==='undefined'){bInstanceOnly=false;}if(!_t.isHTML5){_flash._setPan(_t.id,nPan);}_t._iO.pan=nPan;if(!bInstanceOnly){_t.pan=nPan;_t.options.pan=nPan;}return _t;};this.setVolume=function(nVol,_bInstanceOnly){if(
typeof nVol==='undefined'){nVol=100;}if(typeof _bInstanceOnly==='undefined'){_bInstanceOnly=false;}if(!_t.isHTML5){_flash._setVolume(_t.id,(_s.muted&&!_t.muted)||_t.muted?0:nVol);}else if(_t._a){_t._a.volume=Math.max(0,Math.min(1,nVol/100));}_t._iO.volume=nVol;if(!_bInstanceOnly){_t.volume=nVol;_t.options.volume=nVol;}return _t;};this.mute=function(){_t.muted=true;if(!_t.isHTML5){_flash._setVolume(_t.id,0);}else if(_t._a){_t._a.muted=true;}return _t;};this.unmute=function(){_t.muted=false;var hasIO=(typeof _t._iO.volume!=='undefined');if(!_t.isHTML5){_flash._setVolume(_t.id,hasIO?_t._iO.volume:_t.options.volume);}else if(_t._a){_t._a.muted=false;}return _t;};this.toggleMute=function(){return(_t.muted?_t.unmute():_t.mute());};this.onPosition=function(nPosition,oMethod,oScope){_onPositionItems.push({position:parseInt(nPosition,10),method:oMethod,scope:(typeof oScope!=='undefined'?oScope:_t),fired:false});return _t;};this.onposition=this.onPosition;this.clearOnPosition=function(nPosition,
oMethod){var i;nPosition=parseInt(nPosition,10);if(isNaN(nPosition)){return false;}for(i=0;i<_onPositionItems.length;i++){if(nPosition===_onPositionItems[i].position){if(!oMethod||(oMethod===_onPositionItems[i].method)){if(_onPositionItems[i].fired){_onPositionFired--;}_onPositionItems.splice(i,1);}}}};this._processOnPosition=function(){var i,item,j=_onPositionItems.length;if(!j||!_t.playState||_onPositionFired>=j){return false;}for(i=j-1;i>=0;i--){item=_onPositionItems[i];if(!item.fired&&_t.position>=item.position){item.fired=true;_onPositionFired++;item.method.apply(item.scope,[item.position]);}}return true;};this._resetOnPosition=function(nPosition){var i,item,j=_onPositionItems.length;if(!j){return false;}for(i=j-1;i>=0;i--){item=_onPositionItems[i];if(item.fired&&nPosition<=item.position){item.fired=false;_onPositionFired--;}}return true;};_applyFromTo=function(){var _iO=_t._iO,f=_iO.from,t=_iO.to,start,end;end=function(){_t.clearOnPosition(t,end);_t.stop();};start=function(){if(t
!==null&&!isNaN(t)){_t.onPosition(t,end);}};if(f!==null&&!isNaN(f)){_iO.position=f;_iO.multiShot=false;start();}return _iO;};_attachOnPosition=function(){var item,op=_t._iO.onposition;if(op){for(item in op){if(op.hasOwnProperty(item)){_t.onPosition(parseInt(item,10),op[item]);}}}};_detachOnPosition=function(){var item,op=_t._iO.onposition;if(op){for(item in op){if(op.hasOwnProperty(item)){_t.clearOnPosition(parseInt(item,10));}}}};_start_html5_timer=function(){if(_t.isHTML5){_startTimer(_t);}};_stop_html5_timer=function(){if(_t.isHTML5){_stopTimer(_t);}};_resetProperties=function(retainPosition){if(!retainPosition){_onPositionItems=[];_onPositionFired=0;}_onplay_called=false;_t._hasTimer=null;_t._a=null;_t._html5_canplay=false;_t.bytesLoaded=null;_t.bytesTotal=null;_t.duration=(_t._iO&&_t._iO.duration?_t._iO.duration:null);_t.durationEstimate=null;_t.buffered=[];_t.eqData=[];_t.eqData.left=[];_t.eqData.right=[];_t.failures=0;_t.isBuffering=false;_t.instanceOptions={};_t.instanceCount=0
;_t.loaded=false;_t.metadata={};_t.readyState=0;_t.muted=false;_t.paused=false;_t.peakData={left:0,right:0};_t.waveformData={left:[],right:[]};_t.playState=0;_t.position=null;_t.id3={};};_resetProperties();this._onTimer=function(bForce){var duration,isNew=false,time,x={};if(_t._hasTimer||bForce){if(_t._a&&(bForce||((_t.playState>0||_t.readyState===1)&&!_t.paused))){duration=_t._get_html5_duration();if(duration!==_lastHTML5State.duration){_lastHTML5State.duration=duration;_t.duration=duration;isNew=true;}_t.durationEstimate=_t.duration;time=(_t._a.currentTime*1000||0);if(time!==_lastHTML5State.time){_lastHTML5State.time=time;isNew=true;}if(isNew||bForce){_t._whileplaying(time,x,x,x,x);}}return isNew;}};this._get_html5_duration=function(){var _iO=_t._iO,d=(_t._a?_t._a.duration*1000:(_iO?_iO.duration:undefined)),result=(d&&!isNaN(d)&&d!==Infinity?d:(_iO?_iO.duration:null));return result;};this._apply_loop=function(a,nLoops){a.loop=(nLoops>1?'loop':'');};this._setup_html5=function(oOptions
){var _iO=_mixin(_t._iO,oOptions),d=decodeURI,_a=_useGlobalHTML5Audio?_s._global_a:_t._a,_dURL=d(_iO.url),_oldIO=(_a&&_a._t?_a._t.instanceOptions:null),result;if(_a){if(_a._t){if(!_useGlobalHTML5Audio&&_dURL===d(_lastURL)){result=_a;}else if(_useGlobalHTML5Audio&&_oldIO.url===_iO.url&&(!_lastURL||(_lastURL===_oldIO.url))){result=_a;}if(result){_t._apply_loop(_a,_iO.loops);return result;}}if(_useGlobalHTML5Audio&&_a._t&&_a._t.playState&&_iO.url!==_oldIO.url){_a._t.stop();}_resetProperties((_oldIO&&_oldIO.url?_iO.url===_oldIO.url:(_lastURL?_lastURL===_iO.url:false)));_a.src=_iO.url;_t.url=_iO.url;_lastURL=_iO.url;_a._called_load=false;}else{if(_iO.autoLoad||_iO.autoPlay){_t._a=new Audio(_iO.url);}else{_t._a=(_isOpera?new Audio(null):new Audio());}_a=_t._a;_a._called_load=false;if(_useGlobalHTML5Audio){_s._global_a=_a;}}_t.isHTML5=true;_t._a=_a;_a._t=_t;_add_html5_events();_t._apply_loop(_a,_iO.loops);if(_iO.autoLoad||_iO.autoPlay){_t.load();}else{_a.autobuffer=false;_a.preload='auto';}
return _a;};_add_html5_events=function(){if(_t._a._added_events){return false;}var f;function add(oEvt,oFn,bCapture){return _t._a?_t._a.addEventListener(oEvt,oFn,bCapture||false):null;}_t._a._added_events=true;for(f in _html5_events){if(_html5_events.hasOwnProperty(f)){add(f,_html5_events[f]);}}return true;};_remove_html5_events=function(){var f;function remove(oEvt,oFn,bCapture){return(_t._a?_t._a.removeEventListener(oEvt,oFn,bCapture||false):null);}_t._a._added_events=false;for(f in _html5_events){if(_html5_events.hasOwnProperty(f)){remove(f,_html5_events[f]);}}};this._onload=function(nSuccess){var fN,loadOK=(!!(nSuccess)||(!_t.isHTML5&&_fV===8&&_t.duration));_t.loaded=loadOK;_t.readyState=loadOK?3:2;_t._onbufferchange(0);if(_t._iO.onload){_t._iO.onload.apply(_t,[loadOK]);}return true;};this._onbufferchange=function(nIsBuffering){if(_t.playState===0){return false;}if((nIsBuffering&&_t.isBuffering)||(!nIsBuffering&&!_t.isBuffering)){return false;}_t.isBuffering=(nIsBuffering===1);if(
_t._iO.onbufferchange){_t._iO.onbufferchange.apply(_t);}return true;};this._onsuspend=function(){if(_t._iO.onsuspend){_t._iO.onsuspend.apply(_t);}return true;};this._onfailure=function(msg,level,code){_t.failures++;if(_t._iO.onfailure&&_t.failures===1){_t._iO.onfailure(_t,msg,level,code);}else{}};this._onfinish=function(){var _io_onfinish=_t._iO.onfinish;_t._onbufferchange(0);_t._resetOnPosition(0);if(_t.instanceCount){_t.instanceCount--;if(!_t.instanceCount){_detachOnPosition();_t.playState=0;_t.paused=false;_t.instanceCount=0;_t.instanceOptions={};_t._iO={};_stop_html5_timer();if(_t.isHTML5){_t.position=0;}}if(!_t.instanceCount||_t._iO.multiShotEvents){if(_io_onfinish){_io_onfinish.apply(_t);}}}};this._whileloading=function(nBytesLoaded,nBytesTotal,nDuration,nBufferLength){var _iO=_t._iO;_t.bytesLoaded=nBytesLoaded;_t.bytesTotal=nBytesTotal;_t.duration=Math.floor(nDuration);_t.bufferLength=nBufferLength;if(!_iO.isMovieStar){if(_iO.duration){_t.durationEstimate=(_t.duration>_iO.
duration)?_t.duration:_iO.duration;}else{_t.durationEstimate=parseInt((_t.bytesTotal/_t.bytesLoaded)*_t.duration,10);}if(typeof _t.durationEstimate==='undefined'){_t.durationEstimate=_t.duration;}}else{_t.durationEstimate=_t.duration;}if(!_t.isHTML5){_t.buffered=[{'start':0,'end':_t.duration}];}if((_t.readyState!==3||_t.isHTML5)&&_iO.whileloading){_iO.whileloading.apply(_t);}};this._whileplaying=function(nPosition,oPeakData,oWaveformDataLeft,oWaveformDataRight,oEQData){var _iO=_t._iO,eqLeft;if(isNaN(nPosition)||nPosition===null){return false;}_t.position=Math.max(0,nPosition);_t._processOnPosition();if(!_t.isHTML5&&_fV>8){if(_iO.usePeakData&&typeof oPeakData!=='undefined'&&oPeakData){_t.peakData={left:oPeakData.leftPeak,right:oPeakData.rightPeak};}if(_iO.useWaveformData&&typeof oWaveformDataLeft!=='undefined'&&oWaveformDataLeft){_t.waveformData={left:oWaveformDataLeft.split(','),right:oWaveformDataRight.split(',')};}if(_iO.useEQData){if(typeof oEQData!=='undefined'&&oEQData&&oEQData.
leftEQ){eqLeft=oEQData.leftEQ.split(',');_t.eqData=eqLeft;_t.eqData.left=eqLeft;if(typeof oEQData.rightEQ!=='undefined'&&oEQData.rightEQ){_t.eqData.right=oEQData.rightEQ.split(',');}}}}if(_t.playState===1){if(!_t.isHTML5&&_fV===8&&!_t.position&&_t.isBuffering){_t._onbufferchange(0);}if(_iO.whileplaying){_iO.whileplaying.apply(_t);}}return true;};this._oncaptiondata=function(oData){_t.captiondata=oData;if(_t._iO.oncaptiondata){_t._iO.oncaptiondata.apply(_t);}};this._onmetadata=function(oMDProps,oMDData){var oData={},i,j;for(i=0,j=oMDProps.length;i<j;i++){oData[oMDProps[i]]=oMDData[i];}_t.metadata=oData;if(_t._iO.onmetadata){_t._iO.onmetadata.apply(_t);}};this._onid3=function(oID3Props,oID3Data){var oData=[],i,j;for(i=0,j=oID3Props.length;i<j;i++){oData[oID3Props[i]]=oID3Data[i];}_t.id3=_mixin(_t.id3,oData);if(_t._iO.onid3){_t._iO.onid3.apply(_t);}};this._onconnect=function(bSuccess){bSuccess=(bSuccess===1);_t.connected=bSuccess;if(bSuccess){_t.failures=0;if(_idCheck(_t.id)){if(_t.
getAutoPlay()){_t.play(undefined,_t.getAutoPlay());}else if(_t._iO.autoLoad){_t.load();}}if(_t._iO.onconnect){_t._iO.onconnect.apply(_t,[bSuccess]);}}};this._ondataerror=function(sError){if(_t.playState>0){if(_t._iO.ondataerror){_t._iO.ondataerror.apply(_t);}}};};_getDocument=function(){return(_doc.body||_doc._docElement||_doc.getElementsByTagName('div')[0]);};_id=function(sID){return _doc.getElementById(sID);};_mixin=function(oMain,oAdd){var o1=(oMain||{}),o2,o;o2=(typeof oAdd==='undefined'?_s.defaultOptions:oAdd);for(o in o2){if(o2.hasOwnProperty(o)&&typeof o1[o]==='undefined'){if(typeof o2[o]!=='object'||o2[o]===null){o1[o]=o2[o];}else{o1[o]=_mixin(o1[o],o2[o]);}}}return o1;};_extraOptions={'onready':1,'ontimeout':1,'defaultOptions':1,'flash9Options':1,'movieStarOptions':1};_assign=function(o,oParent){var i,result=true,hasParent=(typeof oParent!=='undefined'),setupOptions=_s.setupOptions,extraOptions=_extraOptions;for(i in o){if(o.hasOwnProperty(i)){if(typeof o[i]!=='object'||o[i]
===null||o[i]instanceof Array){if(hasParent&&typeof extraOptions[oParent]!=='undefined'){_s[oParent][i]=o[i];}else if(typeof setupOptions[i]!=='undefined'){_s.setupOptions[i]=o[i];_s[i]=o[i];}else if(typeof extraOptions[i]==='undefined'){_complain(_str((typeof _s[i]==='undefined'?'setupUndef':'setupError'),i),2);result=false;}else{if(_s[i]instanceof Function){_s[i].apply(_s,(o[i]instanceof Array?o[i]:[o[i]]));}else{_s[i]=o[i];}}}else{if(typeof extraOptions[i]==='undefined'){_complain(_str((typeof _s[i]==='undefined'?'setupUndef':'setupError'),i),2);result=false;}else{return _assign(o[i],i);}}}}return result;};_event=(function(){var old=(_win.attachEvent),evt={add:(old?'attachEvent':'addEventListener'),remove:(old?'detachEvent':'removeEventListener')};function getArgs(oArgs){var args=_slice.call(oArgs),len=args.length;if(old){args[1]='on'+args[1];if(len>3){args.pop();}}else if(len===3){args.push(false);}return args;}function apply(args,sType){var element=args.shift(),method=[evt[sType]]
;if(old){element[method](args[0],args[1]);}else{element[method].apply(element,args);}}function add(){apply(getArgs(arguments),'add');}function remove(){apply(getArgs(arguments),'remove');}return{'add':add,'remove':remove};}());function _preferFlashCheck(kind){return(_s.preferFlash&&_hasFlash&&!_s.ignoreFlash&&(typeof _s.flash[kind]!=='undefined'&&_s.flash[kind]));}function _html5_event(oFn){return function(e){var t=this._t,result;if(!t||!t._a){result=null;}else{result=oFn.call(this,e);}return result;};}_html5_events={abort:_html5_event(function(){}),canplay:_html5_event(function(){var t=this._t,position1K;if(t._html5_canplay){return true;}t._html5_canplay=true;t._onbufferchange(0);position1K=(typeof t._iO.position!=='undefined'&&!isNaN(t._iO.position)?t._iO.position/1000:null);if(t.position&&this.currentTime!==position1K){try{this.currentTime=position1K;}catch(ee){}}if(t._iO._oncanplay){t._iO._oncanplay();}}),canplaythrough:_html5_event(function(){var t=this._t;if(!t.loaded){t.
_onbufferchange(0);t._whileloading(t.bytesLoaded,t.bytesTotal,t._get_html5_duration());t._onload(true);}}),ended:_html5_event(function(){var t=this._t;t._onfinish();}),error:_html5_event(function(){this._t._onload(false);}),loadeddata:_html5_event(function(){var t=this._t;if(!t._loaded&&!_isSafari){t.duration=t._get_html5_duration();}}),loadedmetadata:_html5_event(function(){}),loadstart:_html5_event(function(){this._t._onbufferchange(1);}),play:_html5_event(function(){this._t._onbufferchange(0);}),playing:_html5_event(function(){this._t._onbufferchange(0);}),progress:_html5_event(function(e){var t=this._t,i,j,str,buffered=0,isProgress=(e.type==='progress'),ranges=e.target.buffered,loaded=(e.loaded||0),total=(e.total||1);t.buffered=[];if(ranges&&ranges.length){for(i=0,j=ranges.length;i<j;i++){t.buffered.push({'start':ranges.start(i),'end':ranges.end(i)});}buffered=(ranges.end(0)-ranges.start(0));loaded=buffered/e.target.duration;}if(!isNaN(loaded)){t._onbufferchange(0);t._whileloading(
loaded,total,t._get_html5_duration());if(loaded&&total&&loaded===total){_html5_events.canplaythrough.call(this,e);}}}),ratechange:_html5_event(function(){}),suspend:_html5_event(function(e){var t=this._t;_html5_events.progress.call(this,e);t._onsuspend();}),stalled:_html5_event(function(){}),timeupdate:_html5_event(function(){this._t._onTimer();}),waiting:_html5_event(function(){var t=this._t;t._onbufferchange(1);})};_html5OK=function(iO){var result;if(iO.serverURL||(iO.type&&_preferFlashCheck(iO.type))){result=false;}else{result=((iO.type?_html5CanPlay({type:iO.type}):_html5CanPlay({url:iO.url})||_s.html5Only));}return result;};_html5Unload=function(oAudio,url){if(oAudio){oAudio.src=url;}};_html5CanPlay=function(o){if(!_s.useHTML5Audio||!_s.hasHTML5){return false;}var url=(o.url||null),mime=(o.type||null),aF=_s.audioFormats,result,offset,fileExt,item;if(mime&&typeof _s.html5[mime]!=='undefined'){return(_s.html5[mime]&&!_preferFlashCheck(mime));}if(!_html5Ext){_html5Ext=[];for(item in
aF){if(aF.hasOwnProperty(item)){_html5Ext.push(item);if(aF[item].related){_html5Ext=_html5Ext.concat(aF[item].related);}}}_html5Ext=new RegExp('\\.('+_html5Ext.join('|')+')(\\?.*)?$','i');}fileExt=(url?url.toLowerCase().match(_html5Ext):null);if(!fileExt||!fileExt.length){if(!mime){result=false;}else{offset=mime.indexOf(';');fileExt=(offset!==-1?mime.substr(0,offset):mime).substr(6);}}else{fileExt=fileExt[1];}if(fileExt&&typeof _s.html5[fileExt]!=='undefined'){result=(_s.html5[fileExt]&&!_preferFlashCheck(fileExt));}else{mime='audio/'+fileExt;result=_s.html5.canPlayType({type:mime});_s.html5[fileExt]=result;result=(result&&_s.html5[mime]&&!_preferFlashCheck(mime));}return result;};_testHTML5=function(){if(!_s.useHTML5Audio||typeof Audio==='undefined'){return false;}var a=(typeof Audio!=='undefined'?(_isOpera?new Audio(null):new Audio()):null),item,lookup,support={},aF,i;function _cp(m){var canPlay,i,j,result=false,isOK=false;if(!a||typeof a.canPlayType!=='function'){return result;}if(m
instanceof Array){for(i=0,j=m.length;i<j&&!isOK;i++){if(_s.html5[m[i]]||a.canPlayType(m[i]).match(_s.html5Test)){isOK=true;_s.html5[m[i]]=true;_s.flash[m[i]]=!!(m[i].match(_flashMIME));}}result=isOK;}else{canPlay=(a&&typeof a.canPlayType==='function'?a.canPlayType(m):false);result=!!(canPlay&&(canPlay.match(_s.html5Test)));}return result;}aF=_s.audioFormats;for(item in aF){if(aF.hasOwnProperty(item)){lookup='audio/'+item;support[item]=_cp(aF[item].type);support[lookup]=support[item];if(item.match(_flashMIME)){_s.flash[item]=true;_s.flash[lookup]=true;}else{_s.flash[item]=false;_s.flash[lookup]=false;}if(aF[item]&&aF[item].related){for(i=aF[item].related.length-1;i>=0;i--){support['audio/'+aF[item].related[i]]=support[item];_s.html5[aF[item].related[i]]=support[item];_s.flash[aF[item].related[i]]=support[item];}}}}support.canPlayType=(a?_cp:null);_s.html5=_mixin(_s.html5,support);return true;};_strings={};_str=function(){};_loopFix=function(sOpt){if(_fV===8&&sOpt.loops>1&&sOpt.stream){
sOpt.stream=false;}return sOpt;};_policyFix=function(sOpt,sPre){if(sOpt&&!sOpt.usePolicyFile&&(sOpt.onid3||sOpt.usePeakData||sOpt.useWaveformData||sOpt.useEQData)){sOpt.usePolicyFile=true;}return sOpt;};_complain=function(sMsg){};_doNothing=function(){return false;};_disableObject=function(o){var oProp;for(oProp in o){if(o.hasOwnProperty(oProp)&&typeof o[oProp]==='function'){o[oProp]=_doNothing;}}oProp=null;};_failSafely=function(bNoDisable){if(typeof bNoDisable==='undefined'){bNoDisable=false;}if(_disabled||bNoDisable){_s.disable(bNoDisable);}};_normalizeMovieURL=function(smURL){var urlParams=null,url;if(smURL){if(smURL.match(/\.swf(\?.*)?$/i)){urlParams=smURL.substr(smURL.toLowerCase().lastIndexOf('.swf?')+4);if(urlParams){return smURL;}}else if(smURL.lastIndexOf('/')!==smURL.length-1){smURL+='/';}}url=(smURL&&smURL.lastIndexOf('/')!==-1?smURL.substr(0,smURL.lastIndexOf('/')+1):'./')+_s.movieURL;if(_s.noSWFCache){url+=('?ts='+new Date().getTime());}return url;};_setVersionInfo=
function(){_fV=parseInt(_s.flashVersion,10);if(_fV!==8&&_fV!==9){_s.flashVersion=_fV=_defaultFlashVersion;}var isDebug=(_s.debugMode||_s.debugFlash?'_debug.swf':'.swf');if(_s.useHTML5Audio&&!_s.html5Only&&_s.audioFormats.mp4.required&&_fV<9){_s.flashVersion=_fV=9;}_s.version=_s.versionNumber+(_s.html5Only?' (HTML5-only mode)':(_fV===9?' (AS3/Flash 9)':' (AS2/Flash 8)'));if(_fV>8){_s.defaultOptions=_mixin(_s.defaultOptions,_s.flash9Options);_s.features.buffering=true;_s.defaultOptions=_mixin(_s.defaultOptions,_s.movieStarOptions);_s.filePatterns.flash9=new RegExp('\\.(mp3|'+_netStreamTypes.join('|')+')(\\?.*)?$','i');_s.features.movieStar=true;}else{_s.features.movieStar=false;}_s.filePattern=_s.filePatterns[(_fV!==8?'flash9':'flash8')];_s.movieURL=(_fV===8?'soundmanager2.swf':'soundmanager2_flash9.swf').replace('.swf',isDebug);_s.features.peakData=_s.features.waveformData=_s.features.eqData=(_fV>8);};_setPolling=function(bPolling,bHighPerformance){if(!_flash){return false;}_flash.
_setPolling(bPolling,bHighPerformance);};_initDebug=function(){if(_s.debugURLParam.test(_wl)){_s.debugMode=true;}};_idCheck=this.getSoundById;_getSWFCSS=function(){var css=[];if(_s.debugMode){css.push(_swfCSS.sm2Debug);}if(_s.debugFlash){css.push(_swfCSS.flashDebug);}if(_s.useHighPerformance){css.push(_swfCSS.highPerf);}return css.join(' ');};_flashBlockHandler=function(){var name=_str('fbHandler'),p=_s.getMoviePercent(),css=_swfCSS,error={type:'FLASHBLOCK'};if(_s.html5Only){return false;}if(!_s.ok()){if(_needsFlash){_s.oMC.className=_getSWFCSS()+' '+css.swfDefault+' '+(p===null?css.swfTimedout:css.swfError);}_s.didFlashBlock=true;_processOnEvents({type:'ontimeout',ignoreInit:true,error:error});_catchError(error);}else{if(_s.oMC){_s.oMC.className=[_getSWFCSS(),css.swfDefault,css.swfLoaded+(_s.didFlashBlock?' '+css.swfUnblocked:'')].join(' ');}}};_addOnEvent=function(sType,oMethod,oScope){if(typeof _on_queue[sType]==='undefined'){_on_queue[sType]=[];}_on_queue[sType].push({'method':
oMethod,'scope':(oScope||null),'fired':false});};_processOnEvents=function(oOptions){if(!oOptions){oOptions={type:(_s.ok()?'onready':'ontimeout')};}if(!_didInit&&oOptions&&!oOptions.ignoreInit){return false;}if(oOptions.type==='ontimeout'&&(_s.ok()||(_disabled&&!oOptions.ignoreInit))){return false;}var status={success:(oOptions&&oOptions.ignoreInit?_s.ok():!_disabled)},srcQueue=(oOptions&&oOptions.type?_on_queue[oOptions.type]||[]:[]),queue=[],i,j,args=[status],canRetry=(_needsFlash&&_s.useFlashBlock&&!_s.ok());if(oOptions.error){args[0].error=oOptions.error;}for(i=0,j=srcQueue.length;i<j;i++){if(srcQueue[i].fired!==true){queue.push(srcQueue[i]);}}if(queue.length){for(i=0,j=queue.length;i<j;i++){if(queue[i].scope){queue[i].method.apply(queue[i].scope,args);}else{queue[i].method.apply(this,args);}if(!canRetry){queue[i].fired=true;}}}return true;};_initUserOnload=function(){_win.setTimeout(function(){if(_s.useFlashBlock){_flashBlockHandler();}_processOnEvents();if(typeof _s.onload===
'function'){_s.onload.apply(_win);}if(_s.waitForWindowLoad){_event.add(_win,'load',_initUserOnload);}},1);};_detectFlash=function(){if(typeof _hasFlash!=='undefined'){return _hasFlash;}var hasPlugin=false,n=navigator,nP=n.plugins,obj,type,types,AX=_win.ActiveXObject;if(nP&&nP.length){type='application/x-shockwave-flash';types=n.mimeTypes;if(types&&types[type]&&types[type].enabledPlugin&&types[type].enabledPlugin.description){hasPlugin=true;}}else if(typeof AX!=='undefined'){try{obj=new AX('ShockwaveFlash.ShockwaveFlash');}catch(e){}hasPlugin=(!!obj);}_hasFlash=hasPlugin;return hasPlugin;};_featureCheck=function(){var needsFlash,item,result=true,formats=_s.audioFormats,isSpecial=(_is_iDevice&&!!(_ua.match(/os (1|2|3_0|3_1)/i)));if(isSpecial){_s.hasHTML5=false;_s.html5Only=true;if(_s.oMC){_s.oMC.style.display='none';}result=false;}else{if(_s.useHTML5Audio){if(!_s.html5||!_s.html5.canPlayType){_s.hasHTML5=false;}else{_s.hasHTML5=true;}}}if(_s.useHTML5Audio&&_s.hasHTML5){for(item in formats
){if(formats.hasOwnProperty(item)){if((formats[item].required&&!_s.html5.canPlayType(formats[item].type))||(_s.preferFlash&&(_s.flash[item]||_s.flash[formats[item].type]))){needsFlash=true;}}}}if(_s.ignoreFlash){needsFlash=false;}_s.html5Only=(_s.hasHTML5&&_s.useHTML5Audio&&!needsFlash);return(!_s.html5Only);};_parseURL=function(url){var i,j,urlResult=0,result;if(url instanceof Array){for(i=0,j=url.length;i<j;i++){if(url[i]instanceof Object){if(_s.canPlayMIME(url[i].type)){urlResult=i;break;}}else if(_s.canPlayURL(url[i])){urlResult=i;break;}}if(url[urlResult].url){url[urlResult]=url[urlResult].url;}result=url[urlResult];}else{result=url;}return result;};_startTimer=function(oSound){if(!oSound._hasTimer){oSound._hasTimer=true;if(!_mobileHTML5&&_s.html5PollingInterval){if(_h5IntervalTimer===null&&_h5TimerCount===0){_h5IntervalTimer=_win.setInterval(_timerExecute,_s.html5PollingInterval);}_h5TimerCount++;}}};_stopTimer=function(oSound){if(oSound._hasTimer){oSound._hasTimer=false;if(!
_mobileHTML5&&_s.html5PollingInterval){_h5TimerCount--;}}};_timerExecute=function(){var i;if(_h5IntervalTimer!==null&&!_h5TimerCount){_win.clearInterval(_h5IntervalTimer);_h5IntervalTimer=null;return false;}for(i=_s.soundIDs.length-1;i>=0;i--){if(_s.sounds[_s.soundIDs[i]].isHTML5&&_s.sounds[_s.soundIDs[i]]._hasTimer){_s.sounds[_s.soundIDs[i]]._onTimer();}}};_catchError=function(options){options=(typeof options!=='undefined'?options:{});if(typeof _s.onerror==='function'){_s.onerror.apply(_win,[{type:(typeof options.type!=='undefined'?options.type:null)}]);}if(typeof options.fatal!=='undefined'&&options.fatal){_s.disable();}};_badSafariFix=function(){if(!_isBadSafari||!_detectFlash()){return false;}var aF=_s.audioFormats,i,item;for(item in aF){if(aF.hasOwnProperty(item)){if(item==='mp3'||item==='mp4'){_s.html5[item]=false;if(aF[item]&&aF[item].related){for(i=aF[item].related.length-1;i>=0;i--){_s.html5[aF[item].related[i]]=false;}}}}}};this._setSandboxType=function(sandboxType){};this.
_externalInterfaceOK=function(flashDate,swfVersion){if(_s.swfLoaded){return false;}var e,eiTime=new Date().getTime();_s.swfLoaded=true;_tryInitOnFocus=false;if(_isBadSafari){_badSafariFix();}setTimeout(_init,_isIE?100:1);};_createMovie=function(smID,smURL){if(_didAppend&&_appendSuccess){return false;}function _initMsg(){}if(_s.html5Only){_setVersionInfo();_initMsg();_s.oMC=_id(_s.movieID);_init();_didAppend=true;_appendSuccess=true;return false;}var remoteURL=(smURL||_s.url),localURL=(_s.altURL||remoteURL),swfTitle='JS/Flash audio component (SoundManager 2)',oEmbed,oMovie,oTarget=_getDocument(),tmp,movieHTML,oEl,extraClass=_getSWFCSS(),s,x,sClass,isRTL=null,html=_doc.getElementsByTagName('html')[0];isRTL=(html&&html.dir&&html.dir.match(/rtl/i));smID=(typeof smID==='undefined'?_s.id:smID);function param(name,value){return'<param name="'+name+'" value="'+value+'" />';}_setVersionInfo();_s.url=_normalizeMovieURL(_overHTTP?remoteURL:localURL);smURL=_s.url;_s.wmode=(!_s.wmode&&_s.
useHighPerformance?'transparent':_s.wmode);if(_s.wmode!==null&&(_ua.match(/msie 8/i)||(!_isIE&&!_s.useHighPerformance))&&navigator.platform.match(/win32|win64/i)){_s.wmode=null;}oEmbed={'name':smID,'id':smID,'src':smURL,'quality':'high','allowScriptAccess':_s.allowScriptAccess,'bgcolor':_s.bgColor,'pluginspage':_http+'www.macromedia.com/go/getflashplayer','title':swfTitle,'type':'application/x-shockwave-flash','wmode':_s.wmode,'hasPriority':'true'};if(_s.debugFlash){oEmbed.FlashVars='debug=1';}if(!_s.wmode){delete oEmbed.wmode;}if(_isIE){oMovie=_doc.createElement('div');movieHTML=['<object id="'+smID+'" data="'+smURL+'" type="'+oEmbed.type+'" title="'+oEmbed.title+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+_http+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',param('movie',smURL),param('AllowScriptAccess',_s.allowScriptAccess),param('quality',oEmbed.quality),(_s.wmode?param('wmode',_s.wmode):''),param('bgcolor',_s.bgColor),
param('hasPriority','true'),(_s.debugFlash?param('FlashVars',oEmbed.FlashVars):''),'</object>'].join('');}else{oMovie=_doc.createElement('embed');for(tmp in oEmbed){if(oEmbed.hasOwnProperty(tmp)){oMovie.setAttribute(tmp,oEmbed[tmp]);}}}_initDebug();extraClass=_getSWFCSS();oTarget=_getDocument();if(oTarget){_s.oMC=(_id(_s.movieID)||_doc.createElement('div'));if(!_s.oMC.id){_s.oMC.id=_s.movieID;_s.oMC.className=_swfCSS.swfDefault+' '+extraClass;s=null;oEl=null;if(!_s.useFlashBlock){if(_s.useHighPerformance){s={'position':'fixed','width':'8px','height':'8px','bottom':'0px','left':'0px','overflow':'hidden'};}else{s={'position':'absolute','width':'6px','height':'6px','top':'-9999px','left':'-9999px'};if(isRTL){s.left=Math.abs(parseInt(s.left,10))+'px';}}}if(_isWebkit){_s.oMC.style.zIndex=10000;}if(!_s.debugFlash){for(x in s){if(s.hasOwnProperty(x)){_s.oMC.style[x]=s[x];}}}try{if(!_isIE){_s.oMC.appendChild(oMovie);}oTarget.appendChild(_s.oMC);if(_isIE){oEl=_s.oMC.appendChild(_doc.
createElement('div'));oEl.className=_swfCSS.swfBox;oEl.innerHTML=movieHTML;}_appendSuccess=true;}catch(e){throw new Error(_str('domError')+' \n'+e.toString());}}else{sClass=_s.oMC.className;_s.oMC.className=(sClass?sClass+' ':_swfCSS.swfDefault)+(extraClass?' '+extraClass:'');_s.oMC.appendChild(oMovie);if(_isIE){oEl=_s.oMC.appendChild(_doc.createElement('div'));oEl.className=_swfCSS.swfBox;oEl.innerHTML=movieHTML;}_appendSuccess=true;}}_didAppend=true;_initMsg();return true;};_initMovie=function(){if(_s.html5Only){_createMovie();return false;}if(_flash){return false;}_flash=_s.getMovie(_s.id);if(!_flash){if(!_oRemoved){_createMovie(_s.id,_s.url);}else{if(!_isIE){_s.oMC.appendChild(_oRemoved);}else{_s.oMC.innerHTML=_oRemovedHTML;}_oRemoved=null;_didAppend=true;}_flash=_s.getMovie(_s.id);}if(typeof _s.oninitmovie==='function'){setTimeout(_s.oninitmovie,1);}return true;};_delayWaitForEI=function(){setTimeout(_waitForEI,1000);};_waitForEI=function(){var p,loadIncomplete=false;if(
_waitingForEI){return false;}_waitingForEI=true;_event.remove(_win,'load',_delayWaitForEI);if(_tryInitOnFocus&&!_isFocused){return false;}if(!_didInit){p=_s.getMoviePercent();if(p>0&&p<100){loadIncomplete=true;}}setTimeout(function(){p=_s.getMoviePercent();if(loadIncomplete){_waitingForEI=false;_win.setTimeout(_delayWaitForEI,1);return false;}if(!_didInit&&_okToDisable){if(p===null){if(_s.useFlashBlock||_s.flashLoadTimeout===0){if(_s.useFlashBlock){_flashBlockHandler();}}else{_failSafely(true);}}else{if(_s.flashLoadTimeout===0){}else{_failSafely(true);}}}},_s.flashLoadTimeout);};_handleFocus=function(){function cleanup(){_event.remove(_win,'focus',_handleFocus);}if(_isFocused||!_tryInitOnFocus){cleanup();return true;}_okToDisable=true;_isFocused=true;_waitingForEI=false;_delayWaitForEI();cleanup();return true;};_showSupport=function(){var item,tests=[];if(_s.useHTML5Audio&&_s.hasHTML5){for(item in _s.audioFormats){if(_s.audioFormats.hasOwnProperty(item)){tests.push(item+': '+_s.html5[
item]+(!_s.html5[item]&&_hasFlash&&_s.flash[item]?' (using flash)':(_s.preferFlash&&_s.flash[item]&&_hasFlash?' (preferring flash)':(!_s.html5[item]?' ('+(_s.audioFormats[item].required?'required, ':'')+'and no flash support)':''))));}}}};_initComplete=function(bNoDisable){if(_didInit){return false;}if(_s.html5Only){_didInit=true;_initUserOnload();return true;}var wasTimeout=(_s.useFlashBlock&&_s.flashLoadTimeout&&!_s.getMoviePercent()),result=true,error;if(!wasTimeout){_didInit=true;if(_disabled){error={type:(!_hasFlash&&_needsFlash?'NO_FLASH':'INIT_TIMEOUT')};}}if(_disabled||bNoDisable){if(_s.useFlashBlock&&_s.oMC){_s.oMC.className=_getSWFCSS()+' '+(_s.getMoviePercent()===null?_swfCSS.swfTimedout:_swfCSS.swfError);}_processOnEvents({type:'ontimeout',error:error,ignoreInit:true});_catchError(error);result=false;}else{}if(!_disabled){if(_s.waitForWindowLoad&&!_windowLoaded){_event.add(_win,'load',_initUserOnload);}else{_initUserOnload();}}return result;};_setProperties=function(){var i
,o=_s.setupOptions;for(i in o){if(o.hasOwnProperty(i)){if(typeof _s[i]==='undefined'){_s[i]=o[i];}else if(_s[i]!==o[i]){_s.setupOptions[i]=_s[i];}}}};_init=function(){if(_didInit){return false;}function _cleanup(){_event.remove(_win,'load',_s.beginDelayedInit);}if(_s.html5Only){if(!_didInit){_cleanup();_s.enabled=true;_initComplete();}return true;}_initMovie();try{_flash._externalInterfaceTest(false);_setPolling(true,(_s.flashPollingInterval||(_s.useHighPerformance?10:50)));if(!_s.debugMode){_flash._disableDebug();}_s.enabled=true;if(!_s.html5Only){_event.add(_win,'unload',_doNothing);}}catch(e){_catchError({type:'JS_TO_FLASH_EXCEPTION',fatal:true});_failSafely(true);_initComplete();return false;}_initComplete();_cleanup();return true;};_domContentLoaded=function(){if(_didDCLoaded){return false;}_didDCLoaded=true;_setProperties();_initDebug();if(!_hasFlash&&_s.hasHTML5){_s.setup({'useHTML5Audio':true,'preferFlash':false});}_testHTML5();_s.html5.usingFlash=_featureCheck();_needsFlash=_s
.html5.usingFlash;_showSupport();if(!_hasFlash&&_needsFlash){_s.setup({'flashLoadTimeout':1});}if(_doc.removeEventListener){_doc.removeEventListener('DOMContentLoaded',_domContentLoaded,false);}_initMovie();return true;};_domContentLoadedIE=function(){if(_doc.readyState==='complete'){_domContentLoaded();_doc.detachEvent('onreadystatechange',_domContentLoadedIE);}return true;};_winOnLoad=function(){_windowLoaded=true;_event.remove(_win,'load',_winOnLoad);};_detectFlash();_event.add(_win,'focus',_handleFocus);_event.add(_win,'load',_delayWaitForEI);_event.add(_win,'load',_winOnLoad);if(_doc.addEventListener){_doc.addEventListener('DOMContentLoaded',_domContentLoaded,false);}else if(_doc.attachEvent){_doc.attachEvent('onreadystatechange',_domContentLoadedIE);}else{_catchError({type:'NO_DOM2_EVENTS',fatal:true});}if(_doc.readyState==='complete'){setTimeout(_domContentLoaded,100);}}if(typeof SM2_DEFER==='undefined'||!SM2_DEFER){soundManager=new SoundManager();}window.SoundManager=
SoundManager;window.soundManager=soundManager;}(window));function BasicMP3Player(){var self=this,pl=this,sm=soundManager,isTouchDevice=(navigator.userAgent.match(/ipad|iphone/i)),isIE=(navigator.userAgent.match(/msie/i));this.excludeClass='button-exclude';this.links=[];this.sounds=[];this.soundsByURL=[];this.indexByURL=[];this.lastSound=null;this.soundCount=0;this.config={playNext:false,autoPlay:false};this.css={sDefault:'sm2_button',sLoading:'sm2_loading',sPlaying:'sm2_playing',sPaused:'sm2_paused'};this.includeClass=this.css.sDefault;this.addEventHandler=(typeof window.addEventListener!=='undefined'?function(o,evtName,evtHandler){return o.addEventListener(evtName,evtHandler,false);}:function(o,evtName,evtHandler){o.attachEvent('on'+evtName,evtHandler);});this.removeEventHandler=(typeof window.removeEventListener!=='undefined'?function(o,evtName,evtHandler){return o.removeEventListener(evtName,evtHandler,false);}:function(o,evtName,evtHandler){return o.detachEvent('on'+evtName,
evtHandler);});this.classContains=function(o,cStr){return(typeof(o.className)!=='undefined'?o.className.match(new RegExp('(\\s|^)'+cStr+'(\\s|$)')):false);};this.addClass=function(o,cStr){if(!o||!cStr||self.classContains(o,cStr)){return false;}o.className=(o.className?o.className+' ':'')+cStr;};this.removeClass=function(o,cStr){if(!o||!cStr||!self.classContains(o,cStr)){return false;}o.className=o.className.replace(new RegExp('( '+cStr+')|('+cStr+')','g'),'');};this.getSoundByURL=function(sURL){return(typeof self.soundsByURL[sURL]!=='undefined'?self.soundsByURL[sURL]:null);};this.isChildOfNode=function(o,sNodeName){if(!o||!o.parentNode){return false;}sNodeName=sNodeName.toLowerCase();do{o=o.parentNode;}while(o&&o.parentNode&&o.nodeName.toLowerCase()!==sNodeName);return(o.nodeName.toLowerCase()===sNodeName?o:null);};this.events={play:function(){pl.removeClass(this._data.oLink,this._data.className);this._data.className=pl.css.sPlaying;pl.addClass(this._data.oLink,this._data.className);},
stop:function(){pl.removeClass(this._data.oLink,this._data.className);this._data.className='';},pause:function(){pl.removeClass(this._data.oLink,this._data.className);this._data.className=pl.css.sPaused;pl.addClass(this._data.oLink,this._data.className);},resume:function(){pl.removeClass(this._data.oLink,this._data.className);this._data.className=pl.css.sPlaying;pl.addClass(this._data.oLink,this._data.className);},finish:function(){pl.removeClass(this._data.oLink,this._data.className);this._data.className='';if(pl.config.playNext){var nextLink=(pl.indexByURL[this._data.oLink.href]+1);if(nextLink<pl.links.length){pl.handleClick({'target':pl.links[nextLink]});}}}};this.stopEvent=function(e){if(typeof e!=='undefined'&&typeof e.preventDefault!=='undefined'){e.preventDefault();}else if(typeof window.event!=='undefined'){window.event.returnValue=false;}return false;};this.getTheDamnLink=(isIE)?function(e){return(e&&e.target?e.target:window.event.srcElement);}:function(e){return e.target;};
this.handleClick=function(e){if(typeof e.button!=='undefined'&&e.button>1){return true;}var o=self.getTheDamnLink(e),sURL,soundURL,thisSound;if(o.nodeName.toLowerCase()!=='a'){o=self.isChildOfNode(o,'a');if(!o){return true;}}sURL=o.getAttribute('href');if(!o.href||!soundManager.canPlayLink(o)||self.classContains(o,self.excludeClass)){return true;}if(!self.classContains(o,self.includeClass)){return true;}sm._writeDebug('handleClick()');soundURL=(o.href);thisSound=self.getSoundByURL(soundURL);if(thisSound){if(thisSound===self.lastSound){thisSound.togglePause();}else{thisSound.togglePause();sm._writeDebug('sound different than last sound: '+self.lastSound.id);if(self.lastSound){self.stopSound(self.lastSound);}}}else{thisSound=sm.createSound({id:'basicMP3Sound'+(self.soundCount++),url:soundURL,onplay:self.events.play,onstop:self.events.stop,onpause:self.events.pause,onresume:self.events.resume,onfinish:self.events.finish});thisSound._data={oLink:o,className:self.css.sPlaying};self.
soundsByURL[soundURL]=thisSound;self.sounds.push(thisSound);if(self.lastSound){self.stopSound(self.lastSound);}thisSound.play();}self.lastSound=thisSound;return self.stopEvent(e);};this.stopSound=function(oSound){soundManager.stop(oSound.id);if(!isTouchDevice){soundManager.unload(oSound.id);}};this.init=function(){sm._writeDebug('basicMP3Player.init()');var i,j,foundItems=0,oLinks=document.getElementsByTagName('a');for(i=0,j=oLinks.length;i<j;i++){if(self.classContains(oLinks[i],self.css.sDefault)&&!self.classContains(oLinks[i],self.excludeClass)){self.links[foundItems]=(oLinks[i]);self.indexByURL[oLinks[i].href]=foundItems;foundItems++;}}if(foundItems>0){self.addEventHandler(document,'click',self.handleClick);if(self.config.autoPlay){self.handleClick({target:self.links[0],preventDefault:function(){}});}}sm._writeDebug('basicMP3Player.init(): Found '+foundItems+' relevant items.');};this.init();}var basicMP3Player=null;soundManager.preferFlash=false;soundManager.onready(function(){
basicMP3Player=new BasicMP3Player();});soundManager.url=mw.config.get('wgExtensionAssetsPath')+'/SoundManager2Button/swf/';soundManager.debugMode=false;;},{"all":
"a.sm2_button{position:relative;display:inline-block; width:16px;height:16px;text-indent:-9999px; overflow:hidden; vertical-align:middle; border-radius:6px;margin-top:-1px;  -webkit-transition-property:hover;-webkit-transition:all 0.2s ease-in-out;-moz-transition:all 0.2s ease-in-out 0s; -o-transition-property:background-color; -o-transition-duration:0.15s; *text-indent:0px;*line-height:99em;*vertical-align:top}a.sm2_button:focus{outline:none; }a.sm2_button,a.sm2_button.sm2_paused:hover{background-color:#333;background-image:url("+mw.config.get('wgServer')+mw.config.get('wgExtensionAssetsPath')+"/SoundManager2Button/css/../image/arrow-right-white.png?2013-05-03T17:41:40Z); background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAKCAYAAABmBXS+AAAAbklEQVQY02NgQAL//v1jZMAF/v//vwuIs9HEUBUBTbj4HwIeA3EGVsVAxtn/qOAVUGM8uknIiv4hsV8A5ZKxKfoLVvnvHwifAzLtMKwDSQLBVSBti27dJajkcSD2RJODO3wtkOOMz/tMSJJYAxMA5dmsL0IfubQAAAAASUVORK5CYII=);*background-image:url("+mw.config.get('wgServer')+mw.config.get('wgExtensionAssetsPath')+"/SoundManager2Button/css/../image/arrow-right-white.gif?2013-05-03T17:41:40Z); background-repeat:no-repeat;background-position:4px 50%;*background-position:4px 3px; }a.sm2_button:hover,a.sm2_button.sm2_playing,a.sm2_button.sm2_playing:hover{background-color:#cc3333}a.sm2_button.sm2_playing,a.sm2_button.sm2_playing:hover{-moz-transform:rotate(90deg);-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg)}a.sm2_button.sm2_paused,a.sm2_button.sm2_paused:hover{background-color:#999}\n\n"
},{});

 }/* END if (mw.loader.getState('ext.wfSoundManager2Button') === null) */
 mw.log('ext.wfSoundManager2Button: '+mw.loader.getState('ext.wfSoundManager2Button'));
});

var oggPlayerButtonOnly = true; 

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
 })();
 
 
function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName == undefined || tagName == null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
	 }
	return array;
 }
 
/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};
 
 
function getElementsByName (name, root) {
 if (root == undefined) root = document;
 var e = root.getElementsByTagName('*');
 var r = new Array();
 for (var i = 0; i < e.length; i++) {
	if (e[i].getAttribute('name') == name) r[r.length] = e[i];
 }
 return r;
}

/* Any JavaScript here will be loaded for all users on every page load. */
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (var j in toggles)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j in toggles)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j in toggles)
                    toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (var j in toggles)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();     
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}
 

function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/custom.js',
        // ...
    ]
});