/* Any JavaScript here will be loaded for all users on every page load. */
    /* If you don't know what you are doing, do not edit this page */
    // ************
    // Youtube player
    // ************
    // Courtesy of Megan
       var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
 
    importScriptPage('User:Cakemix/AutoYoutube.js', 'callofduty');
 
 
    // *****************
    // Collapsible stuff
    // *****************
    /*<source lang=javascript>*/
    /*
     * Copyright © 2009, Daniel Friesen
     * All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions are met:
     *     * Redistributions of source code must retain the above copyright
     *       notice, this list of conditions and the following disclaimer.
     *     * Redistributions in binary form must reproduce the above copyright
     *       notice, this list of conditions and the following disclaimer in the
     *       documentation and/or other materials provided with the distribution.
     *     * Neither the name of the script nor the
     *       names of its contributors may be used to endorse or promote products
     *       derived from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY DANIEL FRIESEN ''AS IS'' AND ANY
     * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
     * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
     * DISCLAIMED. IN NO EVENT SHALL DANIEL FRIESEN BE LIABLE FOR ANY
     * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
     * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
     * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
     * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
     * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */
    (function ($) {
 
        // CONFIG
        var config = window.ShowHideConfig = $.extend(true, {
            autoCollapse: 2,
            userLang: true,
            brackets: '[]',
            linkBefore: false,
            // German
            de: {
                show: "anzeigen",
                hide: "verbergen",
                showAll: "alle anzeigen",
                hideAll: "alle verbergen"
            },
            // English
            en: {
                show: "show",
                hide: "hide",
                showAll: "show all",
                hideAll: "hide all"
            },
            // Spanish
            es: {
                show: "Mostrar",
                hide: "Ocultar",
                showAll: "Mostrar todo",
                hideAll: "Ocultar todo"
            },
            // French
            fr: {
                show: "montrer",
                hide: "cacher",
                showAll: "montrer tous",
                hideAll: "cacher tous"
            },
            // Dutch
            nl: {
                show: "tonen",
                hide: "verbergen",
                showAll: "alles tonen",
                hideAll: "alles verbergen"
            }
            // Make a post on the talkpage if you have i18n updates
        }, window.ShowHideConfig || {});
 
        // i18n function
 
        function msg(name) {
            if (config.userLang && wgUserLanguage in config && name in config[wgUserLanguage]) return config[wgUserLanguage][name];
            if (wgContentLanguage in config && name in config[wgContentLanguage]) return config[wgContentLanguage][name];
            return config.en[name];
        }
 
        // common
        $.fn.onLink = function (fn) {
            return this.bind('click keypress', function (e) {
                if (e.type === 'click' || (e.type === 'keypress' && (e.keyCode === 13 || e.charCode === 32))) fn.call(this, e);
            });
        };
 
        /** Collapsible tables using jQuery
         *
         *  Description: Allows tables to be collapsed, showing only the header.
         */
 
        function collapseTable(node, state) {
            var $table = $(node);
            var $button = $table.find("tr:first > th:first .collapseLink");
 
            if (!$table.length || !$button.length) {
                return false;
            }
 
            if (typeof state === 'boolean') $table.toggleClass('collapsed', !state);
            else $table.toggleClass('collapsed');
 
            var hidden = $table.hasClass('collapsed');
            $table.find('> * > tr:not(:first):not(.nocollapse)')[hidden ? "hide" : "show"]();
            $button.text(msg(hidden ? "show" : "hide"));
        }
 
        function createCollapseButtons() {
            var NavigationBoxes = [];
            $("table.collapsible").each(function () {
                NavigationBoxes.push(this);
                var $buttonLink = $('<span tabIndex=0 class=collapseLink />').text(msg("hide")).css({
                    cursor: "pointer"
                }).onLink(function (e) {
                    collapseTable($(this).closest('table'));
                });
                var $button = $("<span class=collapseButton />").css({
                    "float": "right",
                    textAlign: "right",
                    fontWeight: "normal",
                    width: "6em",
                    marginLeft: "-100%"
                });
                $button.append(document.createTextNode(config.brackets.substr(0, config.brackets.length / 2)), $buttonLink, config.brackets.substr(config.brackets.length / 2));
 
                var $header = $(this).find('tr:first > th:first').prepend($button);
            });
 
            // if more Navigation Bars found than Default: hide all
            if ($(NavigationBoxes).filter('.autocollapse').length >= config.autoCollapse) $(NavigationBoxes).filter('.autocollapse').each(function () {
                collapseTable(this, false);
            });
            else $(NavigationBoxes).filter('.collapsed').each(function () {
                collapseTable(this, false);
            });
        }
 
        $(createCollapseButtons);
 
        /*</pre>*/
 
        /*<pre>*/
 
        /** Dynamic Navigation Bars with jQuery
         **  Base Description: See Wikipedia:Wikipedia:NavFrame.
         */
 
        // shows and hides content and picture (if available) of navigation bars
 
        function toggleNavigationBar(node) {
            var $navFrame = $(node);
            var $navToggle = $navFrame.find(".NavHead:first .collapseLink");
 
            if (!$navFrame.length || !$navToggle.length) {
                return false;
            }
 
            $navFrame.toggleClass('NavVisible');
            $navFrame.find('.NavPic, .NavContent').not($navFrame.find('.NavFrame .NavPic, .NavFrame .NavContent')).slideToggle();
            $navToggle.text(msg($navFrame.hasClass('NavVisible') ? "hide" : "show"));
        }
 
        // adds show/hide-button to navigation bars
 
        function createNavigationBarToggleButton() {
            var NavFrames = $('.NavFrame').addClass('NavVisible').each(function () {
                var $navHead = $(this).find('.NavHead:first');
                $navHead.filter('legend').append(' - ');
                var $buttonLink = $('<span tabIndex=0 class=collapseLink />').text(msg("hide")).onLink(function (e) {
                    toggleNavigationBar($(this).closest('.NavFrame'));
                });
                var $button = $('<span class="NavToggle collapseButton" />')
                if (config.brackets) $button.append(document.createTextNode(config.brackets.substr(0, config.brackets.length / 2)), $buttonLink, config.brackets.substr(config.brackets.length / 2));
                else $button.append($buttonLink);
                $navHead[config.linkBefore ? "prepend" : "append"]($button);
            });
            // if more Navigation Bars found than Default: hide all
            if (NavFrames.length >= config.autoCollapse) NavFrames.not('.noautocollapse').each(function () {
                toggleNavigationBar(this);
            });
            else NavFrames.filter('.collapsed').each(function () {
                toggleNavigationBar(this);
            });
        }
 
        $(createNavigationBarToggleButton);
 
        $(function () {
            $('.NavGlobal').each(function () {
                $('<span class=NavGlobalShow />').append(
                document.createTextNode('['), $('<span tabIndex=0 class=collapseLink />').text(msg("showAll")).onLink(function (e) {
                    $('.NavFrame').each(function () {
                        if (!$(this).hasClass('NavVisible')) toggleNavigationBar(this);
                    });
                }), ']').appendTo(this);
                $(this).append(' ');
                $('<span class=NavGlobalHide />').append(
                document.createTextNode('['), $('<span tabIndex=0 class=collapseLink />').text(msg("hideAll")).onLink(function (e) {
                    $('.NavFrame').each(function () {
                        if ($(this).hasClass('NavVisible')) toggleNavigationBar(this);
                    });
                }), ']').appendTo(this);
            });
        });
 
    })(jQuery); /*</source>*/
 
    var ShowHideConfig = {
        userLang: false,
        en: {
            show: "expand",
            hide: "hide",
            showAll: "expand all",
            hideAll: "hide all"
        }
    };
 
    importScriptPage('ShowHide/code.js', 'dev');
 
    // *************************************************
    // Experimental javascript countdown timer (Splarka)
    // Version 0.0.3
    // *************************************************
    //
    // Usage example:
    //  <span class="countdown" style="display:none;">
    //  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
    //  </span>
    //  <span class="nocountdown">Javascript disabled.</span>
 
    function updatetimer(i) {
        var now = new Date();
        var then = timers[i].eventdate;
        var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
 
        // catch bad date strings
        if (isNaN(diff)) {
            timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
            return;
        }
 
        // determine plus/minus
        if (diff < 0) {
            diff = -diff;
            var tpm = 'T plus ';
        } else {
            var tpm = 'T minus ';
        }
 
        // calcuate the diff
        var left = (diff % 60) + ' seconds';
        diff = Math.floor(diff / 60);
        if (diff > 0) left = (diff % 60) + ' minutes ' + left;
        diff = Math.floor(diff / 60);
        if (diff > 0) left = (diff % 24) + ' hours ' + left;
        diff = Math.floor(diff / 24);
        if (diff > 0) left = diff + ' days ' + left
        timers[i].firstChild.nodeValue = tpm + left;
 
        // a setInterval() is more efficient, but calling setTimeout()
        // makes errors break the script rather than infinitely recurse
        timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
    }
 
    function checktimers() {
        //hide 'nocountdown' and show 'countdown'
        var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
        for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
        var countdowns = getElementsByClassName(document, 'span', 'countdown');
        for (var i in countdowns) countdowns[i].style.display = 'inline'
 
        //set up global objects timers and timeouts.
        timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
        timeouts = new Array(); // generic holder for the timeouts, global
        if (timers.length == 0) return;
        for (var i in timers) {
            timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
            updatetimer(i); //start it up
        }
    }
    addOnloadHook(checktimers);
 
    // *************************************************
    // Pagetitle rewrite
    //
    // Rewrites the page's title, used by Template:Title
    // *************************************************
    $(function () {
        var newTitle = $("#title-meta").html();
        if (!newTitle) return;
        var edits = $("#user_masthead_since").text();
        $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
        $(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
    });
 
    /* </pre> */
 
    // ****************
    // Duplicate images
    // ****************
    importScriptPage('DupImageList/code.js', 'dev');
 
    // *********************************************************************
    // Added SiteNotice Functionality, credit to RuneScape wiki for the code
    //
    // Functions:
    //   * Moves the dismiss link into the SiteNotice table.
    //   * Saves the show/hide status of the SiteNotice in a cookie.
    //   * Automatically expands the SiteNotice when the ID is updated.
    // *********************************************************************
    var dCookieName = "dismissSiteNotice=";
    var msgClose = "dismiss";
 
    var hCookieName = "hideSiteNotice=";
    var hCookiePos = document.cookie.indexOf(hCookieName);
    var hCookieValue = "";
 
    function editSiteNotice() {
        var snbox = document.getElementById('mw-dismissable-notice');
 
        if (snbox != null) {
            if (hCookiePos > -1) {
                hCookiePos = hCookiePos + hCookieName.length;
                var hideEndPos = document.cookie.indexOf(";", hCookiePos);
                if (hideEndPos > -1) {
                    hCookieValue = document.cookie.substring(hCookiePos, hideEndPos);
                } else {
                    hCookieValue = document.cookie.substring(hCookiePos);
                }
            }
 
            var newLink = document.createElement('a');
            newLink.setAttribute('href', "javascript:dismissNotice();");
            newLink.setAttribute('title', 'Dismiss this notice.');
            newLink.innerHTML = msgClose;
 
            var newSpan = document.createElement('span');
            newSpan.id = 'siteNoticeDismiss';
            newSpan.appendChild(document.createTextNode(' ['));
            newSpan.appendChild(newLink);
            newSpan.appendChild(document.createTextNode(']'));
 
            var hideLink = document.getElementById("collapseButton" + "0");
            hideLink.href = "javascript:hideSiteNotice();"
            hideLink.parentNode.style.width = "12em";
            hideLink.parentNode.appendChild(newSpan);
 
            if (hCookieValue != siteNoticeID && hideLink.innerHTML == "show") {
                collapseTable(0);
            }
            if (hCookieValue == siteNoticeID && hideLink.innerHTML == "hide") {
                collapseTable(0);
            }
        }
    }
 
    function hideSiteNotice() {
        var hideLink = document.getElementById("collapseButton" + "0");
        var date = new Date();
 
        if (hideLink.innerHTML == 'hide') {
            date.setTime(date.getTime() + 30 * 86400 * 1000);
        } else {
            date.setTime(date.getTime() - 30 * 86400 * 1000);
        }
        document.cookie = hCookieName + siteNoticeID + "; expires=" + date.toGMTString() + "; path=/";
        collapseTable(0);
    }
 
    if (skin == 'oasis') {
        addOnloadHook(editSiteNotice);
    }
 
    // *****************************************************************************************
    // Description: Redirects from /User:UserName/skin.js or .css to the user's actual skin page
    // Maintainer: Cacycle
    // *****************************************************************************************
    if (wgArticleId == 0 && wgUserName) {
        var slash = wgPageName.indexOf('/');
        var norm = wgPageName.substr(0, slash) + wgPageName.substr(slash).toLowerCase();
        var test = 'User:' + wgUserName.replace(/ /g, '_') + '/skin.';
        var ext = null;
        if (norm == test + 'js') ext = 'js';
        else if (norm == test + 'css') ext = 'css';
        if (ext != null) window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin.replace('oasis', 'wikia') + '.' + ext);
    }
    // ***************************************
    // Ajax-refresh (code from pcj of WoWWiki)
    // ***************************************
    var ajaxPages = ["Special:RecentChanges", "Special:Log", "Special:Contributions", "Special:AbuseLog"];
    var AjaxRCRefreshText = 'Auto-Refresh';
    importScriptPage('AjaxRC/code.js', 'dev');
 
 
 
    // *********************************************
    // Page background changer (courtesy of Megan)
    // *********************************************
 
    function BgImage() {
        if ($('#BgImage').text().length > 3 && ($('#BgImage').text().match("(((http://www)|(http://)|(www))[-a-zA-Z0-9@:%_\+.~#?&//=]+)\.(jpg|jpeg|gif|png|bmp|tiff|tga|svg)"))) {
            $('#BgImage').hide();
            $('body').css("background-image", "url(" + $('#BgImage').text() + ") !important").css("backgroundPosition", "top center").css("backgroundRepeat", "no-repeat").css("background", "none");
 
        }
    }
 
    $(document).ready(BgImage);
 
 
    // ***************************************
    // Auto hide
    // ***************************************
 
    function addHideButtons() {
        var hidables = getElementsByClass('hidable');
 
        for (var i = 0; i < hidables.length; i++) {
            var box = hidables[i];
            var button = getElementsByClass('hidable-button', box, 'span');
 
            if (button != null && button.length > 0) {
                button = button[0];
 
                button.onclick = toggleHidable;
                button.appendChild(document.createTextNode('[Hide]'));
 
                if (new ClassTester('start-hidden').isMatch(box)) {
                    button.onclick('bypass');
                }
            }
        }
    }
 
    function toggleHidable() {
        var parent = getParentByClass('hidable', this);
        var content = getElementsByClass('hidable-content', parent);
        var nowShown;
 
        if (content != null && content.length > 0) {
            content = content[0];
 
            if (content.style.display == 'none') {
                content.style.display = content.oldDisplayStyle;
                this.firstChild.nodeValue = '[Hide]';
                nowShown = true;
            } else {
                content.oldDisplayStyle = content.style.display;
                content.style.display = 'none';
                this.firstChild.nodeValue = '[Show]';
                nowShown = false;
            }
        }
    }
 
    function getElementsByClass(searchClass, node, tag) {
        var classElements = new Array();
 
        if (node == null) {
            node = document;
        }
 
        if (tag == null) {
            tag = '*';
        }
 
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        var tester = new ClassTester(searchClass);
 
        for (i = 0, j = 0; i < elsLen; i++) {
            if (tester.isMatch(els[i])) {
                classElements[j] = els[i];
                j++;
            }
        }
 
        return classElements;
    }
 
    function getParentByClass(className, element) {
        var tester = new ClassTester(className);
        var node = element.parentNode;
 
        while (node != null && node != document) {
            if (tester.isMatch(node)) {
                return node;
            }
 
            node = node.parentNode;
        }
 
        return null;
    }
 
    function ClassTester(className) {
        this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
    }
 
    ClassTester.prototype.isMatch = function (element) {
        return this.regex.test(element.className);
    }
 
    addOnloadHook(addHideButtons)
 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // FIND DUPLICATE IMAGES
    // Code courtesy of "pcj" of WoWWiki.
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    dil = new Array();
 
    function findDupImages(gf) {
        output = "";
        url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
        if (gf) url += "&gaifrom=" + gf;
        $.getJSON(url, function (data) {
            if (data.query) {
                pages = data.query.pages;
                for (pageID in pages) {
                    dils = "," + dil.join();
                    if (dils.indexOf("," + pages[pageID].title) == -1 && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles) {
                        output += "<h3><a href='/" + pages[pageID].title + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
                        for (x = 0; x < pages[pageID].duplicatefiles.length; x++) {
                            output += "<li><a href='/File:" + pages[pageID].duplicatefiles[x].name + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                            dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                        }
                        output += "</ul>\n\n"
                    }
                }
                $("#mw-dupimages").append(output);
                if (data["query-continue"]) setTimeout("findDupImages('" + data["query-continue"].allimages.gaifrom + "');", 5000);
            }
        });
    }
    $(function () {
        if ($("#mw-dupimages").length) findDupImages();
    });
 
 
 
/* lock blog comments for blogs that haven't been commented on for more than 30 days.
   by: [[User:Joeyaa|Joey Ahmadi]]
*/
 
    $(function () {
        if (wgNamespaceNumber == 500 && $('#article-comments-ul li').size() > 1) {
            var then = $('#article-comments-ul > .article-comments-li:first .permalink').attr('href');
            then = new String(then.match(/\d{8}/));
            var monthnames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var year = then.match(/^\d{4}/);
            var month = then.substring(4, 6);
            month--;
            month = monthnames[month];
            var day = then.match(/\d{2}$/);
            then = new Date(month + '' + day + ', ' + year);
            var old = parseInt(now - then);
            old = Math.floor(old / (1000 * 60 * 60 * 24));
            if (old > 30) {
                $('#article-comm-form').attr('disabled', 'disabled');
                $('#article-comm').attr('disabled', 'disabled').text('This blog post hasn\'t been commented on for over 30 days. There is no need to comment.');
                $('#article-comm-submit').attr('disabled', 'disabled');
                $('.article-comm-reply .wikia-button .secondary').remove();
            }
        }
    });
 
/* adm-changetitle js */
if (wgCanonicalNamespace === "User_talk" || wgCanonicalNamespace === "User"  ){
	if ( document.getElementById('UserProfileMasthead').getElementsByClassName('group').length === 1 ){
		if (document.getElementById('adm-changetitle') !== null ){
			document.getElementById('UserProfileMasthead').getElementsByClassName('group')[0].innerHTML = document.getElementById('adm-changetitle').innerHTML;
		}
	}
}

importScript('MediaWiki:Common.js/profileRedesign.js');