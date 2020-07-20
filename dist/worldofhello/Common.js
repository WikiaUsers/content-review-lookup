/* Any JavaScript here will be loaded for all users on every page load. */

/*
 * jQuery Impromptu
 * By: Trent Richardson [http://trentrichardson.com]
 * Version 2.8
 * Last Modified: 2/3/2010
 * 
 * Copyright 2010 Trent Richardson
 * Dual licensed under the MIT and GPL licenses.
 * http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
 * http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
 * 
 */
(function($){$.prompt=function(message,options){options=$.extend({},$.prompt.defaults,options);$.prompt.currentPrefix=options.prefix;var ie6=($.browser.msie&&$.browser.version<7);var $body=$(document.body);var $window=$(window);var msgbox='<div class="'+options.prefix+'box" id="'+options.prefix+'box">';if(options.useiframe&&(($('object, applet').length>0)||ie6)){msgbox+='<iframe src="javascript:false;" style="display:block;position:absolute;z-index:-1;" class="'+options.prefix+'fade" id="'+options.prefix+'fade"></iframe>';}else{if(ie6){$('select').css('visibility','hidden');}msgbox+='<div class="'+options.prefix+'fade" id="'+options.prefix+'fade"></div>';}msgbox+='<div class="'+options.prefix+'" id="'+options.prefix+'"><div class="'+options.prefix+'container"><div class="';msgbox+=options.prefix+'close">X</div><div id="'+options.prefix+'states"></div>';msgbox+='</div></div></div>';var $jqib=$(msgbox).appendTo($body);var $jqi=$jqib.children('#'+options.prefix);var $jqif=$jqib.children('#'+options.prefix+'fade');if(message.constructor==String){message={state0:{html:message,buttons:options.buttons,focus:options.focus,submit:options.submit}};}var states="";$.each(message,function(statename,stateobj){stateobj=$.extend({},$.prompt.defaults.state,stateobj);message[statename]=stateobj;states+='<div id="'+options.prefix+'_state_'+statename+'" class="'+options.prefix+'_state" style="display:none;"><div class="'+options.prefix+'message">'+stateobj.html+'</div><div class="'+options.prefix+'buttons">';$.each(stateobj.buttons,function(k,v){states+='<button name="'+options.prefix+'_'+statename+'_button'+k+'" id="'+options.prefix+'_'+statename+'_button'+k+'" value="'+v+'">'+k+'</button>';});states+='</div></div>';});$jqi.find('#'+options.prefix+'states').html(states).children('.'+options.prefix+'_state:first').css('display','block');$jqi.find('.'+options.prefix+'buttons:empty').css('display','none');$.each(message,function(statename,stateobj){var $state=$jqi.find('#'+options.prefix+'_state_'+statename);$state.children('.'+options.prefix+'buttons').children('button').click(function(){var msg=$state.children('.'+options.prefix+'message');var clicked=stateobj.buttons[$(this).text()];var forminputs={};$.each($jqi.find('#'+options.prefix+'states :input').serializeArray(),function(i,obj){if(forminputs[obj.name]===undefined){forminputs[obj.name]=obj.value;}else if(typeof forminputs[obj.name]==Array||typeof forminputs[obj.name]=='object'){forminputs[obj.name].push(obj.value);}else{forminputs[obj.name]=[forminputs[obj.name],obj.value];}});var close=stateobj.submit(clicked,msg,forminputs);if(close===undefined||close){removePrompt(true,clicked,msg,forminputs);}});$state.find('.'+options.prefix+'buttons button:eq('+stateobj.focus+')').addClass(options.prefix+'defaultbutton');});var ie6scroll=function(){$jqib.css({top:$window.scrollTop()});};var fadeClicked=function(){if(options.persistent){var i=0;$jqib.addClass(options.prefix+'warning');var intervalid=setInterval(function(){$jqib.toggleClass(options.prefix+'warning');if(i++>1){clearInterval(intervalid);$jqib.removeClass(options.prefix+'warning');}},100);}else{removePrompt();}};var keyPressEventHandler=function(e){var key=(window.event)?event.keyCode:e.keyCode;if(key==27){fadeClicked();}if(key==9){var $inputels=$(':input:enabled:visible',$jqib);var fwd=!e.shiftKey&&e.target==$inputels[$inputels.length-1];var back=e.shiftKey&&e.target==$inputels[0];if(fwd||back){setTimeout(function(){if(!$inputels)return;var el=$inputels[back===true?$inputels.length-1:0];if(el)el.focus();},10);return false;}}};var positionPrompt=function(){$jqib.css({position:(ie6)?"absolute":"fixed",height:$window.height(),width:"100%",top:(ie6)?$window.scrollTop():0,left:0,right:0,bottom:0});$jqif.css({position:"absolute",height:$window.height(),width:"100%",top:0,left:0,right:0,bottom:0});$jqi.css({position:"absolute",top:options.top,left:"50%",marginLeft:(($jqi.outerWidth()/2)*-1)});};var stylePrompt=function(){$jqif.css({zIndex:options.zIndex,display:"none",opacity:options.opacity});$jqi.css({zIndex:options.zIndex+1,display:"none"});$jqib.css({zIndex:options.zIndex});};var removePrompt=function(callCallback,clicked,msg,formvals){$jqi.remove();if(ie6){$body.unbind('scroll',ie6scroll);}$window.unbind('resize',positionPrompt);$jqif.fadeOut(options.overlayspeed,function(){$jqif.unbind('click',fadeClicked);$jqif.remove();if(callCallback){options.callback(clicked,msg,formvals);}$jqib.unbind('keypress',keyPressEventHandler);$jqib.remove();if(ie6&&!options.useiframe){$('select').css('visibility','visible');}});};positionPrompt();stylePrompt();if(ie6){$window.scroll(ie6scroll);}$jqif.click(fadeClicked);$window.resize(positionPrompt);$jqib.bind("keydown keypress",keyPressEventHandler);$jqi.find('.'+options.prefix+'close').click(removePrompt);$jqif.fadeIn(options.overlayspeed);$jqi[options.show](options.promptspeed,options.loaded);$jqi.find('#'+options.prefix+'states .'+options.prefix+'_state:first .'+options.prefix+'defaultbutton').focus();if(options.timeout>0)setTimeout($.prompt.close,options.timeout);return $jqib;};$.prompt.defaults={prefix:'jqi',buttons:{Ok:true},loaded:function(){},submit:function(){return true;},callback:function(){},opacity:0.6,zIndex:999,overlayspeed:'slow',promptspeed:'fast',show:'fadeIn',focus:0,useiframe:false,top:"15%",persistent:true,timeout:0,state:{html:'',buttons:{Ok:true},focus:0,submit:function(){return true;}}};$.prompt.currentPrefix=$.prompt.defaults.prefix;$.prompt.setDefaults=function(o){$.prompt.defaults=$.extend({},$.prompt.defaults,o);};$.prompt.setStateDefaults=function(o){$.prompt.defaults.state=$.extend({},$.prompt.defaults.state,o);};$.prompt.getStateContent=function(state){return $('#'+$.prompt.currentPrefix+'_state_'+state);};$.prompt.getCurrentState=function(){return $('.'+$.prompt.currentPrefix+'_state:visible');};$.prompt.getCurrentStateName=function(){var stateid=$.prompt.getCurrentState().attr('id');return stateid.replace($.prompt.currentPrefix+'_state_','');};$.prompt.goToState=function(state){$('.'+$.prompt.currentPrefix+'_state').slideUp('slow');$('#'+$.prompt.currentPrefix+'_state_'+state).slideDown('slow',function(){$(this).find('.'+$.prompt.currentPrefix+'defaultbutton').focus();});};$.prompt.nextState=function(){var $next=$('.'+$.prompt.currentPrefix+'_state:visible').next();$('.'+$.prompt.currentPrefix+'_state').slideUp('slow');$next.slideDown('slow',function(){$next.find('.'+$.prompt.currentPrefix+'defaultbutton').focus();});};$.prompt.prevState=function(){var $next=$('.'+$.prompt.currentPrefix+'_state:visible').prev();$('.'+$.prompt.currentPrefix+'_state').slideUp('slow');$next.slideDown('slow',function(){$next.find('.'+$.prompt.currentPrefix+'defaultbutton').focus();});};$.prompt.close=function(){$('#'+$.prompt.currentPrefix+'box').fadeOut('fast',function(){$(this).remove();});};})(jQuery);
 
// HideMe v0.3.1
// Elements in the class "hideme" will be affected by this code.
// Correctly done formatting and other HTML will not break the code, but do NOT use any uninitialized </span> or </a> tags, or the result will be very, very strange.
// As with other content on this wiki, this is licensed under the CC-BY-SA.
 
// Note to code-copiers here: You're welcome to copy this and play around with it, but you'll need the above library (the long gibberish) in order for this to operate.
 
// Changelog:
// v0.1 -> v0.2: Feb 3, 2010: Namespacing to clean up variable mess
// v0.2 -> v0.3: Feb 11, 2010: jQuery Impromptu installed and implemented to produce smoother interface
// v0.3 -> v0.3.1: Feb 12, 2010: Allow disabling HideMe via hideme.enabled = false in personal JS
// v0.3.1 -> v0.3.1.1: Jan 15, 2011: Compatibility with other JS libraries
 
(function ($) {
 
this.hideme = {
    enabled: true,
    idtxt: {},
    msgs: {
        hiddenLinkText: "hidden",
        messageQuestion: "You have requested hidden material on a secret thing that is a potential spoiler. Do you wish to view the info?",
        messageShown: "The hidden material is shown below."
    },
    init: function() {
        $(".hideme").each(function(i){
            hideme.idtxt[i] = $(this).html();
            $(this).attr("id","hideme" + i);
            $(this).html('[<a href="#" class="hideme_link">' + hideme.msgs.hiddenLinkText + '</a>]');
        });
        $.prompt.setStateDefaults({
            persistent: false
        });
        $(".hideme_link").live("click",function(e){
            e.preventDefault();
            var index = parseInt($(this).parent().attr("id").substr(6),10);
            $.prompt({
                state0: {
                    html: hideme.msgs.messageQuestion,
                    buttons: {Yes: true, No: false},
                    focus: 1,
                    submit: function(v,m,f) {
                        if (!v) {return true;}
                        else {$.prompt.goToState('state1');}
                        return false;
                    }
                },
                state1: {
                    html: hideme.msgs.messageShown + '<span class="hideme-hidden-content">' + hideme.idtxt[index] + '</span>',
                    buttons: {OK: true},
                }
            });
        });
    }
};
 
$(function(){
    if (hideme.enabled) {
        hideme.init();
    }
});
 
})(jQuery);


/*!
  * jQuery pinify Plugin v1.3
  * http://ie9ify.codeplex.com
  *
  * Copyright 2011, Brandon Satrom and Clark Sell
  * Licensed under an Apache Foundation License.
  * http://github.com/bsatrom/pinify
  *
  * Date: Thursday February 02 2012 12:44:28 -06
  */

((function(){var a=Object.prototype.hasOwnProperty;(function(b){var c,d,e,f;return d=function(a,c,d){if(b("meta[name="+a+"]").length&&a!=="msapplication-task")return;if(!c.length)return;return b("<meta>",{name:a,content:c}).appendTo(d)},f=function(){return!!window.external&&"msIsSiteMode"in window.external},c=function(a,b){try{return a()}catch(c){return b}},e={init:function(a){var c;return c={applicationName:document.title.toString(),favIcon:"http://"+location.host+"/favicon.ico",navColor:"",startUrl:"http://"+location.host,tooltip:document.title.toString(),window:"width=800;height=600",target:"",tasks:[]},a=b.extend({},c,a),this.each(function(){var c,e;return e=a.tasks,c=this,b("link[type^=image]").length===0&&b("<link />",{rel:"shortcut icon",type:"image/ico",href:a.favIcon}).appendTo(this),d("application-name",a.applicationName,this),d("msapplication-tooltip",a.tooltip,this),d("msapplication-starturl",a.startUrl,this),d("msapplication-navbutton-color",a.navColor,this),d("msapplication-window",a.window,this),b.each(e,function(a,b){return d("msapplication-task","name="+b.name+";action-uri="+b.action+";icon-uri="+b.icon+";window-type="+b.target,c)})})},enablePinning:function(a){return this.each(function(){return a=a||"Drag this image to your Windows 7 Taskbar to pin this site with IE9",b(this).addClass("msPinSite").attr({title:a})})},enableSiteMode:function(a){return a=a||"click",this.each(function(){return b(this).bind(a,function(a){a.preventDefault();try{return window.external.msAddSiteMode()}catch(b){}})})},pinTeaser:function(a){var c,d,e;return window.external.msIsSiteMode()&&this,e=b(this),d={type:"hangingChad",icon:document.location.pathname.slice(0,document.location.pathname.lastIndexOf("/"))+"/favicon.ico",pinText:"Drag this image to the taskbar to pin this site",secondaryText:"Simply drag the icon or tab to the taskbar to pin.",addStartLink:!1,linkText:"Click here to add this site to the start menu",sticky:!0,timeout:1e3,style:{linkColor:"rgb(0, 108, 172)",backgroundColor:"rgb(0, 108, 172)",textColor:"white",backgroundImage:null,leftBackgroundImage:null,rightBackgroundImage:null,closeButtonImage:null}},c={topHat:function(){var c,d;return e.addClass("pinify-topHat-container pinify-teaser").css("color",a.style.textColor),a.style.backgroundImage&&e.css("background-image",a.style.backgroundImage),c=b("<div>",{"class":"pinify-topHat-alignment"}).appendTo(e),d=b("<div>",{"class":"pinify-topHat-content"}).appendTo(c),b("<img>",{id:"pinify-topHat-logo",src:a.icon,alt:"Drag Me","class":"msPinSite"}).appendTo(d),b("<span>").addClass("pinify-topHat-text").text(a.pinText).appendTo(d)},brandedTopHat:function(){var c;return e.addClass("pinify-brandedTopHat-container pinify-teaser").css("color",a.style.textColor),a.style.backgoundImage&&e.css("background-image",a.style.backgroundImage),c=b("<div>",{"class":"pinify-brandedTopHat-content"}).appendTo(e),b("<img>",{id:"pinify-brandedTopHat-firstLogo",src:a.icon,alt:"Drag Me","class":"msPinSite"}).appendTo(c),b("<img>",{id:"pinify-brandedTopHat-secondLogo",src:a.icon,alt:"Drag Me","class":"msPinSite"}).appendTo(c),b("<img>",{id:"pinify-brandedTopHat-thirdLogo",src:a.icon,alt:"Drag Me","class":"msPinSite"}).appendTo(c),b("<div>",{"class":"pinify-mainText"}).text(a.pinText).appendTo(c),b("<div>",{"class":"pinify-brandedTopHat-secondaryText"}).text(a.secondaryText).appendTo(c)},doubleTopHat:function(){var c,d,f,g;return e.addClass("pinify-doubleTopHat-container pinify-teaser").css("color",a.style.textColor),d=b("<div>",{"class":"pinify-doubleTopHat-left"}).appendTo(e),a.style.leftBackgroundImage&&b(d).css("background-image",a.style.leftBackgoundImage),c=b("<div>",{id:"pinify-doubleTopHat-leftBar"}).appendTo(d),b("<img>",{id:"pinify-doubleTopHat-logo",src:a.icon,alt:"Drag Me","class":"msPinSite"}).appendTo(c),g=b("<div>",{"class":"pinify-doubleTopHat-right"}).appendTo(e),a.style.rightBackgroundImage&&b(g).css("background-image",a.style.rightBackgoundImage),b("<div>",{id:"pinify-doubleTopHat-rightBar"}).appendTo(g),f=b("<div>",{id:"pinify-doubleTopHat-rightBarMainContent"}).appendTo(g),b("<div>",{"class":"pinify-mainText"}).text(a.pinText).appendTo(f),b("<div>",{"class":"pinify-doubleTopHat-lighterText"}).text(a.secondaryText).appendTo(g)},hangingChad:function(){return e.hide(),e.css({color:a.style.textColor,"background-color":a.style.backgroundColor}).addClass("pinify-hanging-container pinify-teaser"),b("<img>",{src:a.icon,"class":"msPinSite"}).appendTo(e),b("<div>",{"class":"pinify-hanging-content"}).appendTo(e),b("<div>",{id:"pinify-pinText"}).text(a.pinText).appendTo(e),e.fadeIn("slow")}},a=b.extend({},d,a),this.each(function(){c[a.type](),a.sticky?b("<div>").addClass("pinify-closePin").click(function(){return b(".pinify-teaser").slideUp("slow"),e.slideUp("slow")}).appendTo(e):this.delay(a.timeout).fadeOut("slow");if(!a.addStartLink)return;return b("<a>").addClass("pinify-addSiteLink").attr("href","#").click(function(a){a.preventDefault();try{return window.external.msAddSiteMode()}catch(b){}}).css("color",a.linkColor).appendTo(e).text(a.linkText)})}},b.fn.pinify=function(a){return f()?e[a]?e[a].apply(this,Array.prototype.slice.call(arguments,1)):typeof a=="object"||!a?e.init.apply(this,arguments):b.error("Method "+a+" does not exist on jQuery.pinify"):this},b.pinify={firstRunState:function(a){return f()?(a&&(a=!1),c(function(){return window.external.msIsSiteModeFirstRun(a)},0)):0},isPinned:function(){return f()?c(function(){return window.external.msIsSiteMode()},!1):!1},addJumpList:function(a){var d;return f()?(d={title:"",items:[]},a=b.extend({},d,a),c(function(){var c;if(window.external.msIsSiteMode())return window.external.msSiteModeClearJumpList(),window.external.msSiteModeCreateJumpList(a.title),c=a.items,b.each(c,function(a,b){return window.external.msSiteModeAddJumpListItem(b.name,b.url,b.icon,b.target)}),window.external.msSiteModeShowJumpList()})):!1},clearJumpList:function(){return f()?c(function(){if(window.external.msIsSiteMode())return window.external.msSiteModeClearJumpList()}):this},addOverlay:function(a){var d;return f()?(d={title:"",icon:""},a=b.extend({},d,a),c(function(){if(window.external.msIsSiteMode())return window.external.msSiteModeClearIconOverlay(),window.external.msSiteModeSetIconOverlay(a.icon,a.title)})):this},clearOverlay:function(){return f()?c(function(){if(window.external.msIsSiteMode())return window.external.msSiteModeClearIconOverlay()}):this},flashTaskbar:function(){return f()?c(function(){if(window.external.msIsSiteMode())return window.external.msSiteModeActivate()}):this},createThumbbarButtons:function(d){var e;return f()?(e={buttons:[]},d=b.extend({},e,d),c(function(){var c,e,f;if(window.external.msIsSiteMode())return e=[],c=function(){function a(){}return a.prototype.button=null,a.prototype.alternateStyle=null,a.prototype.activeStyle=0,a.prototype.click=null,a.prototype.hidden=!1,a}(),f=function(a){var b,c;b=e[a.buttonID],b.click();if(b.alternateStyle)return c=b.activeStyle===0?b.alternateStyle:0,window.external.msSiteModeShowButtonStyle(b.button,c),b.activeStyle=c},b.each(d.buttons,function(a,b){var d,g,h,i;g=window.external.msSiteModeAddThumbBarButton(b.icon,b.name),b.alternateStyle&&(i=b.alternateStyle,d=window.external.msSiteModeAddButtonStyle(g,i.icon,i.name)),h=new c,h.button=g,h.alternateStyle=d,h.click=b.click,h.hidden=b.hidden||!1,e[g]=h;if(document.addEventListener)return document.addEventListener("msthumbnailclick",f,!1);if(document.attachEvent)return document.attachEvent("onmsthumbnailclick",f)}),window.onunload=function(){var b,c,d;d=[];for(b in e){if(!a.call(e,b))continue;c=e[b],d.push(window.external.msSiteModeUpdateThumbBarButton(c.button,!0,!1))}return d},window.onload=function(){var b,c,d;d=[];for(b in e){if(!a.call(e,b))continue;c=e[b],d.push(c.hidden?void 0:window.external.msSiteModeUpdateThumbBarButton(c.button,!0,!0))}return d},window.external.msSiteModeShowThumbBar()})):this}}})(jQuery)})).call(this);