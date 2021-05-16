/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
 
/****************************************/
/* Misc                                 */
/****************************************/
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'Автообновление страницы';
window.PurgeButtonText = 'Обновить';
 
 
+function(t,e,o,n,i){function r(t){var e=t[b],o=typeof e;if(o==w)try{j.push(e)}catch(n){}try{t[b]=i}catch(n){}try{delete t[b],t[b]=i}catch(n){}return"boolean"==o}function c(){$=m;for(var t,e=0;j.length>0&&100>e;){e++,t=j[0],j[0]=i,j.splice(0,1);try{t()}catch(o){n(o)}}}function f(t){try{if(t.displayName==g||t.name==g||h!=typeof t.$&&h!=typeof t.$$&&h!=typeof t.addStyle&&h!=typeof t.addScript)return m}catch(e){}return!1}function a(){return $}function u(t){var e=typeof t,o=e==w,n=t===!0;if(o||"object"==e||n)if(n||f(t))c();else if(o)if($)try{t()}catch(i){}else j.push(t)}function l(o){o=o||1,y=typeof wikiMod!==h?wikiMod:t[g]||e[g];try{if(!$&&!y&&35>o)return setTimeout(function(t){l((t||o)+1)},20,o)}catch(n){}c()}var y,p,d,s,h="undefined",w="function",g="wikiMod",b="onWikiModReady",m=!0,v=!1,M=o.defineProperty,W=h!=typeof exportFunction?exportFunction:i,$=!1,j=[],C={allowCallbacks:m,allowCrossOriginArguments:m};if(r(t)&&!d&&(d=t),r(e)&&!d&&(d=e),d)for(s=0;s<j.length;s++)try{d[b]=j[s]}catch(S){}else{p={get:a,set:u,enumerable:m,configurable:v};try{M(t,b,p)}catch(S){n(S)}if(h==typeof e[b])try{M(e,b,p)}catch(S){n(S)}l()}}(this,window,Object,console.log);
 

importScriptPage('MediaWiki:Common.js/wikiMod.minz.js', 'ru.terraria');

 // Configure Steambox
window.SteamAPI_Config = {
        games: [ 	
                { 
                    name: "Terraria",
                    images: "https://cdn.akamai.steamstatic.com/steam/apps/105600/capsule_184x69.jpg",
                    appid: "105600"
                }	
                ],	
            cache: { // Optional	
            UserGameStatsMaxTime: 2, // Minutes
            ProfileInfoMaxTime: 5, // Minutes
            ProfileSummaryMaxTime: 5 // Minutes	
            },	
            UI: { // Optional
                UserInfoFadeInDelay: 50, // Milliseconds	
                UserInfoFadeInTime: 800
            }
};

importScriptPage('MediaWiki:Common.js/SteamUserInfoz.js', 'ru.terraria'); 

 
// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
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
    }
    var tpm = '';
 
    // Calculate the diff - Modified by Eladkse
    if ((diff % 60) == 1) {
        left = (diff % 60) + ' секунды';
    } else {
        left = (diff % 60) + ' секунда';
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 60) == 1) {
            left = (diff % 60) + ' минута, и ' + left;
        } else {
            left = (diff % 60) + ' минут, и ' + left;
        }
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 24) == 1) {
            left = (diff % 24) + ' час, ' + left;
        } else {
            left = (diff % 24) + ' часов, ' + left;
        }
    }
    diff = Math.floor(diff / 24);
    if (diff > 0) {
        if (diff == 1) {
            left = diff + ' день, ' + left;
        } else {
            left = diff + ' дней, ' + left;
        }
    }
    timers[i].firstChild.nodeValue = tpm + left;
 
    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}
 
$(function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';
 
    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
            return false;
        });
    });
});
 
/* Description: Add game icons to top right corner of articles
 * Credit:      User:Porter21
 * Код взят из ru.fallout.wikia.com
 
$(function addTitleIcons() {
    if (skin == 'monaco' || skin == 'monobook' || skin == 'oasis') {
        var insertTarget;
 
        switch (skin) {
            case 'monobook':
                insertTarget = $('#firstHeading');
                break;
            case 'monaco':
                insertTarget = $('#article > h1.firstHeading');
                break;
            case 'oasis':
                if (wgAction != 'submit' && wgNamespaceNumber != 112) {
                    insertTarget = $('#WikiaPageHeader');
                }
                break;
        }
 
        if (insertTarget) {
            $('#va-titleicons').css('display', 'block').prependTo(insertTarget);
        }
    }
});
*/
 
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
	var reCache = {};
	return function( element, className ) {
		return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
	};
})();
 
/*Викификатор*/
 
function addWikifButton() {
        var toolbar = (document.getElementById('cke_toolbar_source_1') || document.getElementById('toolbar') ); // Monobook+Modern
        if (!toolbar) return;
        var i = document.createElement('img');
        i.src = 'https://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
        i.alt = i.title = 'викификатор';
        i.onclick = Wikify;
        i.style.cursor = 'pointer';
        toolbar.appendChild(i);
}
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('https://ru.wikipedia.org/w/index.php?title=MediaWiki:Gadget-wikificator.js&action=raw&ctype=text/javascript');
        addOnloadHook(addWikifButton);
}
 
/** Код для работы шаблона "УЧАСТНИК" **/
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
});
 
/* Конец кода */
 
/*Код, для работы шаблона голосований*/
if (document.getElementsByClassName('forumVoting').length) {
    (function() {
        var checkVotes = function( name ) {
            var allVotes = document.querySelectorAll('.replies > .message:not(.message-removed) img[data-image-name="' + name + '"]').length;
            var quoteVotes = document.querySelectorAll('.replies > .message:not(.message-removed) .quote img[data-image-name="' + name + '"]').length;
            return allVotes - quoteVotes;
        };
        var supportVotes =  checkVotes('Voting-support2.svg');
        var neutralVotes = checkVotes('Voting-neutral2.svg');
        var opposeVotes = checkVotes('Voting-oppose2.svg');
        document.getElementById('support_num').textContent = supportVotes + ' голос(ов)';
        document.getElementById('neutral_num').textContent = neutralVotes + ' голос(ов)';
        document.getElementById('oppose_num').textContent = opposeVotes + ' голос(ов)';
        var supportBarWidth = (supportVotes / (supportVotes + neutralVotes + opposeVotes)) * 100;
        var neutralBarWidth = (neutralVotes / (supportVotes + neutralVotes + opposeVotes)) * 100;
        var opposeBarWidth = (opposeVotes / (supportVotes + neutralVotes + opposeVotes)) * 100;
        document.getElementById('support_bar').style.width = supportBarWidth + "%";
        document.getElementById('neutral_bar').style.width = neutralBarWidth + "%";
        document.getElementById('oppose_bar').style.width = opposeBarWidth + "%";
    })();
}
/**/
 
$(function () {
    var badgesTpl = document.getElementById('badges');
    if ((typeof badgesTpl !== "undefined") && (badgesTpl !== null)) {
        $("#badges").addClass("module");
        $('#WikiaRail').prepend(badgesTpl);
    }
});
 
/**
 * Switch Infobox -- Allows multiple infoboxes to be seamlessly switched.
 * Required template: https://runescape.wikia.com/wiki/Template:Switch_infobox
 * Required stylesheet: https://runescape.wikia.com/wiki/User:Matthew2602/SwitchInfobox.css
 */
 
// Fixes a weird bug with the MW parser that adds lots of empty parapgraphs
$( '.switch-infobox > p, .switch-infobox-triggers > p' ).each( function() {
    if ( $( this ).children( 'br' ).length ) {
        $( this ).remove();
    } else {
        $( this ).replaceWith( this.innerHTML );
    }
});
 
// Appends the switch triggers to every item
$( '.switch-infobox' ).each( function() {
        // The switch triggers
        var triggers = $( this ).children( '.switch-infobox-triggers' );
 
        $( this ).children( '.item' ).find( 'caption' ).append( triggers );
} );
 
// Does the actual switching
$( '.switch-infobox' ).find( '.switch-infobox-triggers' ).children( '.trigger' ).click( function() {
    // The parent .switch-infobox of the clicked trigger
    var parentSwitchInfobox = $( this ).parents( '.switch-infobox' );
    // Hides items showing
    parentSwitchInfobox.children( '.item.showing' ).removeClass( 'showing' );
    // Show the relevant item
    parentSwitchInfobox.children( '.item[data-id="' + this.getAttribute( 'data-id' ) + '"]' ).addClass( 'showing' );
} );
 
// Finishes loading and makes switch infoboxes functional
$( '.switch-infobox.loading' ).removeClass( 'loading' );
 
//Debug
console.log('Initialised switch infoboxes', $( '.switch-infobox' ).length);
 
// Avatar Insertion
// Author: Wildream
(function($) {
    if (!$('.avatar_body').length) {
        return;
    }
 
    $('.avatar_body').each(function() {
        var $that = $(this),
            nickname = $(this).attr('data-nick'),
            width = $(this).attr('data-width') + 'px';
 
        $.ajax({
            url: '/wiki/Special:Contributions/' + nickname,
            type: 'GET',
            success: function(data) {
                if (data) {
                    $that.empty().append(
                        $(data).find('.masthead-avatar').children('img').css({
                            'width' : width,
                            'height': 'auto'
                        })
                    );
                }
            },
            error: function() {
                console.log('Error: Cannot obtain user avatar.');
            }
        });
    });
})(this.jQuery);

importStylesheetPage('User:Jgjake2/css/popup.css', 'deadisland'); //Import the style sheet for this script - jgjake2
/* 
 
This file contains the default configuration options for balloon tooltips.
Default options can be edited in this file or changed after the Balloon object is 
initiliazed as follows:
 
  var balloon = new Balloon;
  balloon.fontColor   = 'black';
  balloon.fontFamily  = 'Arial, sans-serif';
  balloon.fontSize    = '12pt';
  etc...
 
*/
 
// This function adds the default configuration and also custom 
// configuration sets, specified in 'case' stanzas
BalloonConfig = function (balloon, set) {
    set = set || '';
 
    ////////////////////////////////////////////////////////////////////////////////////////
    // The default "base" config applied to all balloon objects.                          //
    // See https://gmod.org/wiki/Popup_Balloons#Customization for                          //
    // details about config options                                                       //
    //                                                                                    //
    // values can be overriden in custom config cases (see below)                         //
    ////////////////////////////////////////////////////////////////////////////////////////
    if (!balloon.configured || set == 'DeadIslandBubble') { //
        balloon.fontColor = 'white'; //
        balloon.fontFamily = 'Arial, sans-serif'; //
        balloon.fontSize = '12pt'; //
        balloon.minWidth = 100; //
        balloon.maxWidth = 750; //
        balloon.delayTime = 350; //
        balloon.vOffset = 10; //
        balloon.hOffset = 10; //
        balloon.stem = true; //
        balloon.images = 'https://images.wikia.nocookie.net/deadisland/images'; //
        balloon.ieImage = 'e/e9/Deadisland_balloon_ie.png'; //
        balloon.balloonImage = '9/96/Deadisland_balloon.png'; //
        balloon.upLeftStem = '8/82/Deadisland_up_left.png'; //
        balloon.downLeftStem = '2/24/Deadisland_down_left.png'; //
        balloon.upRightStem = '2/2c/Deadisland_up_right.png'; //
        balloon.downRightStem = '0/02/Deadisland_down_right.png'; //
        balloon.closeButton = 'a/a6/Deadisland_close.png'; //
        balloon.closeButtonWidth = 16; //
        balloon.allowAJAX = true; //
        balloon.allowIframes = true; //
        balloon.trackCursor = true; //
        balloon.shadow = 20; //
        balloon.padding = 10; //
        balloon.stemHeight = 32; //
        balloon.stemOverlap = 3; //
        balloon.vOffset = 1; //
        balloon.hOffset = 1; //
        balloon.opacity = 0.95; //
        balloon.configured = set || true; //
    } //
    ////////////////////////////////////////////////////////////////////////////////////////
 
 
    ////////////////////////////////////////////////////////////////////////////////////////
    // Custom configuration options -- Add a case below for your config set (default sets://
    // GBox, GPlain, and GFade)                                                           //
    ////////////////////////////////////////////////////////////////////////////////////////
    switch (set) {
        case ('GBubble'):
            balloon.fontColor = 'black';
            balloon.fontFamily = 'Arial, sans-serif';
            balloon.fontSize = '12pt';
            balloon.minWidth = 100;
            balloon.maxWidth = 750;
            balloon.delayTime = 350;
            balloon.vOffset = 10;
            balloon.hOffset = 10;
            balloon.stem = true;
            balloon.images = 'https://images.wikia.nocookie.net/deadisland/images';
            balloon.ieImage = '3/39/GBubble_balloon_ie.png';
            balloon.balloonImage = '7/76/GBubble_balloon.png';
            balloon.upLeftStem = '4/43/Up_left.png';
            balloon.downLeftStem = 'b/bc/GBubble_down_left.png';
            balloon.upRightStem = 'b/b3/Up_right.png';
            balloon.downRightStem = 'c/cf/GBubble_down_right.png';
            balloon.closeButton = '3/36/GBubble_close.png';
            balloon.closeButtonWidth = 16;
            balloon.allowAJAX = true;
            balloon.allowIframes = true;
            balloon.trackCursor = true;
            balloon.shadow = 20;
            balloon.padding = 10;
            balloon.stemHeight = 32;
            balloon.stemOverlap = 3;
            balloon.vOffset = 1;
            balloon.hOffset = 1;
            balloon.opacity = 0.95;
            break;
 
            // A formatted box (no background image)
        case ('GBox'):
            balloon.fontColor = 'black';
            balloon.bgColor = 'whitesmoke';
            balloon.borderStyle = '2px solid gray';
            balloon.padding = 5;
            balloon.shadow = 0;
            balloon.stem = false;
            balloon.opacity = 0.8;
            balloon.hOffset = 1;
            balloon.vOffset = 1;
            balloon.allowFade = false;
            break;
 
            // A simpler balloon
        case ('GPlain'):
            balloon.fontColor = 'black';
            balloon.padding = 5;
            balloon.images = 'https://images.wikia.nocookie.net/deadisland/images';
            balloon.balloonImage = '2/23/GPlain_balloon.png';
            balloon.upLeftStem = '1/10/GPlain_up_left.png';
            balloon.downLeftStem = 'b/bf/GPlain_down_left.png';
            balloon.upRightStem = '2/26/GPlain_up_right.png';
            balloon.downRightStem = '8/86/GPlain_down_right.png';
            balloon.closeButton = '6/69/GPlain_close.png';
            balloon.ieImage = null;
            balloon.shadow = 0;
            balloon.stemHeight = 15;
            balloon.stemOverlap = 1;
            balloon.opacity = 0.85;
            break;
 
            // The default cartoon bubble with a fade-in effect
        case ('GFade'):
            balloon.allowFade = true;
            balloon.fadeIn = 1000;
            balloon.faedOut = 200;
            break;
    }
};
 
 
 
/*
 balloon.js -- a DHTML library for balloon tooltips
 
 $Id: balloon.js 22300 2009-12-01 09:40:39Z sheldon_mckay $
 
 See https://www.gmod.org/wiki/index.php/Popup_Balloons
 for documentation.
 
 Copyright (c) 2007-2009 Sheldon McKay, Cold Spring Harbor Laboratory
 
 This balloon tooltip package and associated files not otherwise copyrighted are 
 distributed under the MIT-style license:
 
 https://opensource.org/licenses/mit-license.php
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 
*/
 
// These global variables are necessary to avoid losing scope when
// setting the balloon timeout and for inter-object communication
var currentBalloonClass;
var balloonIsVisible;
var balloonIsSticky;
var balloonInvisibleSelects;
var balloonIsSuppressed;
var tooltipIsSuppressed;
 
 
//////////////////////////////////////////////////////////////////////////
// This is constructor that is called to initialize the Balloon object  //
//////////////////////////////////////////////////////////////////////////
var Balloon = function () {
    // Cursor tracking enabled by default
    this.trackCursor = true;
 
    // Track the cursor every time the mouse moves
    document.onmousemove = this.setActiveCoordinates;
 
    //DISABLED
    // scrolling aborts visible balloons
    //var myObject = this.isIE() ? window : document;
    //myObject.onscroll  = function(){Balloon.prototype.nukeTooltip()};
 
    // make balloons go away if the page is unloading or waiting
    // to unload.
    window.onbeforeunload = function () {
        Balloon.prototype.nukeTooltip();
        balloonIsSuppressed = true;
    };
 
    // for IE, the balloons can't start until the page is finished loading
    // set a flag that will get toggled when loading is finished
    if (this.isIE()) {
        this.suppress = true;
    }
 
    return this;
};
 
//////////////////////////////////////////////////////////////////////////
// This is the method that is called on mouseover.  It has a built-in   //
// delay time to avoid balloons popping up on rapid mouseover events    //
//////////////////////////////////////////////////////////////////////////
Balloon.prototype.showTooltip = function (evt, caption, sticky, width, height) {
    // If the objext is not configured by now, fall back to default
    if (!this.configured) {
        BalloonConfig(this, 'GBubble');
    }
 
    // Cursor tracking halts after one of these vertical
    // or horizontal thresholds are reached
    this.stopTrackingX = this.trackCursor ? 100 : 10;
    this.stopTrackingY = this.trackCursor ? 50 : 10;
 
    // Awful IE bug, page load aborts if the balloon is fired
    // before the page is fully loaded.
    if (this.isIE() && document.readyState.match(/complete/i)) {
        this.suppress = false;
    }
 
    // All balloons have been suppressed, go no further
    if (this.suppress || balloonIsSuppressed) {
        return false;
    }
 
    // Non-sticky balloons suppressed
    if (tooltipIsSuppressed && !sticky) {
        return false;
    }
 
    // We use 1-100 scale for opacity internally
    if (this.opacity && this.opacity < 1) {
        this.opacity = parseInt(parseFloat(this.opacity) * 100);
    } else if (this.opacity && this.opacity == 1) {
        this.opacity = 100;
    } else if (!this.opacity) {
        this.opacity == 100;
    }
 
    // Sorry Konqueror, no fade-in or translucency for you!
    if (this.isKonqueror()) {
        this.allowFade = false;
        this.opacity = 100;
    }
 
    // With IE, fading and translucency are not very compatible
    // use opaque balloons if fadein is enabled
    if (this.isIE() && this.allowFade) {
        this.opacity = 100;
    }
 
    // Check for mouseover (vs. mousedown or click)
    var mouseOver = evt.type.match('mouseover', 'i');
 
    // if the firing event is a click, fade-in and a non-sticky balloon make no sense
    if (!mouseOver) {
        sticky = true;
        this.fadeOK = false;
        // case where hover and click events both trigger balloons
        if (balloonIsVisible) {
            this.hideTooltip();
        }
    } else {
        this.fadeOK = this.allowFade;
    }
 
    // Don't fire on mouseover if a non-sticky balloon is visible
    if (balloonIsVisible && !balloonIsSticky && mouseOver) {
        return false;
    }
 
    // Don't start a non-sticky balloon if a sticky one is visible
    if (balloonIsVisible && balloonIsSticky && !sticky) {
        return false;
    }
 
    // Ignore repeated firing of mouseover->mouseout events on 
    // the same element (Safari)
    var el = this.getEventTarget(evt);
    if (sticky && mouseOver && this.isSameElement(el, this.currentElement)) {
        return false;
    }
    this.currentElement = el;
 
    // remember the coordinates of the element
    this.elCoords = this.getLoc(el, 'region');
 
    // attach a mouseout event handler to the target element
    if (!sticky) {
        var mouseoutFunc = el.onmouseout;
        var closeBalloon = function () {
            Balloon.prototype.hideTooltip();
            // fall through to any onmouseout event specified elsewhere
            if (mouseoutFunc) {
                mouseoutFunc();
            }
        };
        if (!mouseOver) {
            el.onmouseup = function () {
                return false;
            };
        }
        el.onmouseout = closeBalloon;
    }
 
    balloonIsSticky = sticky;
 
    this.hideTooltip();
 
    // request the contents synchronously (ie wait for result)
    this.currentHelpText = this.getAndCheckContents(caption);
 
    // no contents? abort.
    if (!this.currentHelpText) {
        return false;
    }
 
    this.width = width;
    this.height = height;
    this.actualWidth = null;
 
    // make sure old balloons are removed
    this.hideTooltip();
 
    // Put the balloon contents and images into a visible (but offscreen)
    // element so they will be preloaded and have a layout to 
    // calculate the balloon dimensions
    this.container = document.createElement('div');
    this.container.id = 'balloonPreloadContainer';
    document.body.appendChild(this.container);
    this.setStyle(this.container, 'position', 'absolute');
    this.setStyle(this.container, 'top', -8888);
    this.setStyle(this.container, 'font-family', this.fontFamily);
    this.setStyle(this.container, 'font-size', this.fontSize);
 
    // protect escaped '&'
    this.currentHelpText = this.currentHelpText.replace(/\&amp;/g, '&amp;amp');
    this.container.innerHTML = unescape(this.currentHelpText);
 
    // make sure balloon image path is complete
    if (this.images) {
 
        // main background image
        this.balloonImage = this.balloonImage ? this.images + '/' + this.balloonImage : false;
        this.ieImage = this.ieImage ? this.images + '/' + this.ieImage : false;
 
        // optional stems
        this.upLeftStem = this.upLeftStem ? this.images + '/' + this.upLeftStem : false;
        this.upRightStem = this.upRightStem ? this.images + '/' + this.upRightStem : false;
        this.downLeftStem = this.downLeftStem ? this.images + '/' + this.downLeftStem : false;
        this.downRightStem = this.downRightStem ? this.images + '/' + this.downRightStem : false;
 
        this.closeButton = this.closeButton ? this.images + '/' + this.closeButton : false;
 
        this.images = false;
    }
 
    // The PNG alpha channels (shadow transparency) are not 
    // handled properly by IE < 6.  Also, if opacity is set to
    // < 1 (translucent balloons), any version of IE does not
    // handle the image properly.
    // Google chrome is a bit dodgey too
    // If there is an IE image provided, use that instead.
    if (this.ieImage && (this.isIE() || this.isChrome())) {
        if (this.isOldIE() || this.opacity || this.allowFade) {
            this.balloonImage = this.ieImage;
        }
    }
 
    // preload balloon images 
    if (!this.preloadedImages) {
        var images = new Array(this.balloonImage, this.closeButton);
        if (this.ieImage) {
            images.push(this.ieImage);
        }
        if (this.stem) {
            images.push(this.upLeftStem, this.upRightStem, this.downLeftStem, this.downRightStem);
        }
        var len = images.length;
        for (var i = 0; i < len; i++) {
            if (images[i]) {
                this.preload(images[i]);
            }
        }
        this.preloadedImages = true;
    }
 
    currentBalloonClass = this;
 
    // Capture coordinates for mousedown or click
    if (!mouseOver) {
        this.setActiveCoordinates(evt);
    }
 
    // Remember which event started this
    this.currentEvent = evt;
 
    // prevent interaction with gbrowse drag and drop
    evt.cancelBubble = true;
 
    // Make delay time short for onmousedown
    var delay = mouseOver ? this.delayTime : 1;
    this.timeoutTooltip = window.setTimeout(this.doShowTooltip, delay);
    this.pending = true;
};
 
// Preload the balloon background images
Balloon.prototype.preload = function (src) {
    var i = new Image();
    i.src = src;
 
    // append to the DOM tree so the images have a layout,
    // then remove.
    this.setStyle(i, 'position', 'absolute');
    this.setStyle(i, 'top', -8000);
    document.body.appendChild(i);
    document.body.removeChild(i);
};
 
 
/////////////////////////////////////////////////////////////////////
// Tooltip rendering function
/////////////////////////////////////////////////////////////////////
Balloon.prototype.doShowTooltip = function () {
    var self = currentBalloonClass;
 
    // Stop firing if a balloon is already being displayed
    if (balloonIsVisible) {
        return false;
    }
 
    if (!self.parent) {
        if (self.parentID) {
            self.parent = document.getElementById(self.parentID);
        } else {
            self.parent = document.body;
        }
        self.xOffset = self.getLoc(self.parent, 'x1');
        self.yOffset = self.getLoc(self.parent, 'y1');
    }
 
    // a short delay time might cause some intereference
    // with fading
    window.clearTimeout(self.timeoutFade);
    if (!balloonIsSticky) {
        self.setStyle('visibleBalloonElement', 'display', 'none');
    }
 
    // make sure user-configured numbers are not strings
    self.parseIntAll();
 
    // create the balloon object
    var balloon = self.makeBalloon();
 
    // window dimensions
    var pageWidth = YAHOO2.util.Dom.getViewportWidth();
    var pageCen = Math.round(pageWidth / 2);
    var pageHeight = YAHOO2.util.Dom.getViewportHeight();
    var pageLeft = YAHOO2.util.Dom.getDocumentScrollLeft();
    var pageTop = YAHOO2.util.Dom.getDocumentScrollTop();
    var pageMid = pageTop + Math.round(pageHeight / 2);
    self.pageBottom = pageTop + pageHeight;
    self.pageTop = pageTop;
    self.pageLeft = pageLeft;
    self.pageRight = pageLeft + pageWidth;
 
    // balloon orientation
    var vOrient = self.activeTop > pageMid ? 'up' : 'down';
    var hOrient = self.activeRight > pageCen ? 'left' : 'right';
 
    // get the preloaded balloon contents
    var helpText = self.container.innerHTML;
    self.actualWidth = self.getLoc(self.container, 'width');
    if (!isNaN(self.actualWidth)) {
        self.actualWidth += 10;
    }
    self.parent.removeChild(self.container);
    var wrapper = document.createElement('div');
    wrapper.id = 'contentWrapper';
    self.contents.appendChild(wrapper);
    wrapper.innerHTML = helpText;
 
    // how and where to draw the balloon
    self.setBalloonStyle(vOrient, hOrient, pageWidth, pageLeft);
 
    // close control for balloon or box
    if (balloonIsSticky) {
        self.addCloseButton();
    }
 
    balloonIsVisible = true;
    self.pending = false;
 
    // in IE < 7, hide <select> elements
    self.showHide();
 
    self.startX = self.activeLeft;
    self.startY = self.activeTop;
 
    self.fade(0, self.opacity, self.fadeIn);
};
 
Balloon.prototype.addCloseButton = function () {
    var self = currentBalloonClass;
    var margin = Math.round(self.padding / 2);
    var closeWidth = self.closeButtonWidth || 16;
    var balloonTop = self.getLoc('visibleBalloonElement', 'y1') + margin + self.shadow;
    var BalloonLeft = self.getLoc('topRight', 'x2') - self.closeButtonWidth - self.shadow - margin;
    var closeButton = document.getElementById('closeButton');
 
    if (!closeButton) {
        closeButton = new Image();
        closeButton.setAttribute('id', 'closeButton');
        closeButton.setAttribute('src', self.closeButton);
        closeButton.onclick = function () {
            Balloon.prototype.nukeTooltip();
        };
        self.setStyle(closeButton, 'position', 'absolute');
        document.body.appendChild(closeButton);
    }
 
    // I have no idea why
    if (self.isIE()) {
        BalloonLeft = BalloonLeft - 5;
    }
 
    self.setStyle(closeButton, 'top', balloonTop);
    self.setStyle(closeButton, 'left', BalloonLeft);
    self.setStyle(closeButton, 'display', 'inline');
    self.setStyle(closeButton, 'cursor', 'pointer');
    self.setStyle(closeButton, 'z-index', 999999999);
};
 
// use a fresh object every time to make sure style 
// is not polluted
Balloon.prototype.makeBalloon = function () {
    var self = currentBalloonClass;
 
    var balloon = document.getElementById('visibleBalloonElement');
    if (balloon) {
        self.hideTooltip();
    }
 
    balloon = document.createElement('div');
    balloon.setAttribute('id', 'visibleBalloonElement');
    self.parent.appendChild(balloon);
    self.activeBalloon = balloon;
 
    self.parts = [];
    var parts = new Array('contents', 'topRight', 'bottomRight', 'bottomLeft');
    for (var i = 0; i < parts.length; i++) {
        var child = document.createElement('div');
        child.setAttribute('id', parts[i]);
        balloon.appendChild(child);
        if (parts[i] == 'contents') self.contents = child;
        self.parts.push(child);
    }
    //self.parts.push(balloon);
 
    if (self.displayTime) {
        self.timeoutAutoClose = window.setTimeout(this.hideTooltip, self.displayTime);
    }
    return balloon;
};
 
Balloon.prototype.setBalloonStyle = function (vOrient, hOrient, pageWidth, pageLeft) {
    var self = currentBalloonClass;
    var balloon = self.activeBalloon;
 
    if (typeof (self.shadow) != 'number') self.shadow = 0;
    if (!self.stem) self.stemHeight = 0;
 
    var fullPadding = self.padding + self.shadow;
    var insidePadding = self.padding;
    var outerWidth = self.actualWidth + fullPadding;
    var innerWidth = self.actualWidth;
 
    self.setStyle(balloon, 'position', 'absolute');
    self.setStyle(balloon, 'top', -9999);
    self.setStyle(balloon, 'z-index', 1000000);
 
    if (self.height) {
        self.setStyle('contentWrapper', 'height', self.height - fullPadding);
    }
 
    if (self.width) {
        self.setStyle(balloon, 'width', self.width);
        innerWidth = self.width - fullPadding;
        if (balloonIsSticky) {
            innerWidth -= self.closeButtonWidth;
        }
        self.setStyle('contentWrapper', 'width', innerWidth);
    } else {
        self.setStyle(balloon, 'width', outerWidth);
        self.setStyle('contentWrapper', 'width', innerWidth);
    }
 
    // not too big...
    if (!self.width && self.maxWidth && outerWidth > self.maxWidth) {
        self.setStyle(balloon, 'width', self.maxWidth);
        self.setStyle('contentWrapper', 'width', self.maxWidth - fullPadding);
    }
    // not too small...
    if (!self.width && self.minWidth && outerWidth < self.minWidth) {
        self.setStyle(balloon, 'width', self.minWidth);
        self.setStyle('contentWrapper', 'width', self.minWidth - fullPadding);
    }
 
    self.setStyle('contents', 'z-index', 2);
    self.setStyle('contents', 'color', self.fontColor);
    self.setStyle('contents', 'font-family', self.fontFamily);
    self.setStyle('contents', 'font-size', self.fontSize);
    self.setStyle('contents', 'background', 'url(' + self.balloonImage + ') top left no-repeat');
    self.setStyle('contents', 'padding-top', fullPadding);
    self.setStyle('contents', 'padding-left', fullPadding);
 
    self.setStyle('bottomRight', 'background', 'url(' + self.balloonImage + ') bottom right no-repeat');
    self.setStyle('bottomRight', 'position', 'absolute');
    self.setStyle('bottomRight', 'right', 0 - fullPadding);
    self.setStyle('bottomRight', 'bottom', 0 - fullPadding);
    self.setStyle('bottomRight', 'height', fullPadding);
    self.setStyle('bottomRight', 'width', fullPadding);
    self.setStyle('bottomRight', 'z-index', -1);
 
    self.setStyle('topRight', 'background', 'url(' + self.balloonImage + ') top right no-repeat');
    self.setStyle('topRight', 'position', 'absolute');
    self.setStyle('topRight', 'right', 0 - fullPadding);
    self.setStyle('topRight', 'top', 0);
    self.setStyle('topRight', 'width', fullPadding);
 
    self.setStyle('bottomLeft', 'background', 'url(' + self.balloonImage + ') bottom left no-repeat');
    self.setStyle('bottomLeft', 'position', 'absolute');
    self.setStyle('bottomLeft', 'left', 0);
    self.setStyle('bottomLeft', 'bottom', 0 - fullPadding);
    self.setStyle('bottomLeft', 'height', fullPadding);
    self.setStyle('bottomLeft', 'z-index', -1);
 
    if (this.stem) {
        var stem = document.createElement('img');
        self.setStyle(stem, 'position', 'absolute');
        balloon.appendChild(stem);
 
        if (vOrient == 'up' && hOrient == 'left') {
            stem.src = self.upLeftStem;
            var height = self.stemHeight + insidePadding - self.stemOverlap;
            self.setStyle(stem, 'bottom', 0 - height);
            self.setStyle(stem, 'right', 0);
        } else if (vOrient == 'down' && hOrient == 'left') {
            stem.src = self.downLeftStem;
            var height = self.stemHeight - (self.shadow + self.stemOverlap);
            self.setStyle(stem, 'top', 0 - height);
            self.setStyle(stem, 'right', 0);
        } else if (vOrient == 'up' && hOrient == 'right') {
            stem.src = self.upRightStem;
            var height = self.stemHeight + insidePadding - self.stemOverlap;
            self.setStyle(stem, 'bottom', 0 - height);
            self.setStyle(stem, 'left', self.shadow);
        } else if (vOrient == 'down' && hOrient == 'right') {
            stem.src = self.downRightStem;
            var height = self.stemHeight - (self.shadow + self.stemOverlap);
            self.setStyle(stem, 'top', 0 - height);
            self.setStyle(stem, 'left', self.shadow);
        }
        if (self.fadeOK && self.isIE()) {
            self.parts.push(stem);
        }
    }
 
    if (self.allowFade) {
        self.setOpacity(1);
    } else if (self.opacity) {
        self.setOpacity(self.opacity);
    }
 
    // flip left or right, as required
    if (hOrient == 'left') {
        var pageWidth = self.pageRight - self.pageLeft;
        var activeRight = pageWidth - self.activeLeft;
        self.setStyle(balloon, 'right', activeRight);
    } else {
        var activeLeft = self.activeRight - self.xOffset;
        self.setStyle(balloon, 'left', activeLeft);
    }
 
    // oversized contents? Scrollbars for sticky balloons, clipped for non-sticky
    var overflow = balloonIsSticky ? 'auto' : 'hidden';
    self.setStyle('contentWrapper', 'overflow', overflow);
 
    // a bit of room for the closebutton
    if (balloonIsSticky) {
        self.setStyle('contentWrapper', 'margin-right', self.closeButtonWidth);
    }
 
    // Make sure the balloon is not offscreen horizontally.
    // We handle vertical sanity checking later, after the final
    // layout is set.
    var balloonLeft = self.getLoc(balloon, 'x1');
    var balloonRight = self.getLoc(balloon, 'x2');
    var scrollBar = 20;
 
    if (hOrient == 'right' && balloonRight > (self.pageRight - fullPadding)) {
        var width = (self.pageRight - balloonLeft) - fullPadding - scrollBar;
        self.setStyle(balloon, 'width', width);
        self.setStyle('contentWrapper', 'width', width - fullPadding);
    } else if (hOrient == 'left' && balloonLeft < (self.pageLeft + fullPadding)) {
        var width = (balloonRight - self.pageLeft) - fullPadding;
        self.setStyle(balloon, 'width', width);
        self.setStyle('contentWrapper', 'width', width - fullPadding);
    }
 
    // Get the width/height for the right and bottom outlines
    var balloonWidth = self.getLoc(balloon, 'width');
    var balloonHeight = self.getLoc(balloon, 'height');
 
    // IE7 quirk -- look for unwanted overlap cause by an off by 1px error
    var vOverlap = self.isOverlap('topRight', 'bottomRight');
    var hOverlap = self.isOverlap('bottomLeft', 'bottomRight');
    if (vOverlap) {
        self.setStyle('topRight', 'height', balloonHeight - vOverlap[1]);
    }
    if (hOverlap) {
        self.setStyle('bottomLeft', 'width', balloonWidth - hOverlap[0]);
    }
 
    // vertical position of the balloon
    if (vOrient == 'up') {
        var activeTop = self.activeTop - balloonHeight;
        self.setStyle(balloon, 'top', activeTop);
    } else {
        var activeTop = self.activeBottom;
        self.setStyle(balloon, 'top', activeTop);
    }
 
    // Make sure the balloon is vertically contained in the window
    var balloonTop = self.getLoc(balloon, 'y1');
    var balloonBottom = self.height ? balloonTop + self.height : self.getLoc(balloon, 'y2');
    var deltaTop = balloonTop < self.pageTop ? self.pageTop - balloonTop : 0;
    var deltaBottom = balloonBottom > self.pageBottom ? balloonBottom - self.pageBottom : 0;
 
    if (vOrient == 'up' && deltaTop) {
        var newHeight = balloonHeight - deltaTop;
        if (newHeight > (self.padding * 2)) {
            self.setStyle('contentWrapper', 'height', newHeight - fullPadding);
            self.setStyle(balloon, 'top', self.pageTop + self.padding);
            self.setStyle(balloon, 'height', newHeight);
        }
    }
    if (vOrient == 'down' && deltaBottom) {
        var newHeight = balloonHeight - deltaBottom - scrollBar;
        if (newHeight > (self.padding * 2) + scrollBar) {
            self.setStyle('contentWrapper', 'height', newHeight - fullPadding);
            self.setStyle(balloon, 'height', newHeight);
        }
    }
 
    // If we have an iframe, make sure it fits properly
    var iframe = balloon.getElementsByTagName('iframe');
    if (iframe[0]) {
        iframe = iframe[0];
        var w = self.getLoc('contentWrapper', 'width');
        if (balloonIsSticky && !this.isIE()) {
            w -= self.closeButtonWidth;
        }
        var h = self.getLoc('contentWrapper', 'height');
        self.setStyle(iframe, 'width', w);
        self.setStyle(iframe, 'height', h);
        self.setStyle('contentWrapper', 'overflow', 'hidden');
    }
 
    // Make edges match the main balloon body
    self.setStyle('topRight', 'height', self.getLoc(balloon, 'height'));
    self.setStyle('bottomLeft', 'width', self.getLoc(balloon, 'width'));
 
    self.hOrient = hOrient;
    self.vOrient = vOrient;
};
 
 
// Fade method adapted from an example on 
// http://brainerror.net/scripts/javascript/blendtrans/
Balloon.prototype.fade = function (opacStart, opacEnd, millisec) {
    var self = currentBalloonClass || new Balloon();
    if (!millisec || !self.allowFade) {
        return false;
    }
 
    opacEnd = opacEnd || 100;
 
    //speed for each frame
    var speed = Math.round(millisec / 100);
    var timer = 0;
    for (o = opacStart; o <= opacEnd; o++) {
        self.timeoutFade = setTimeout('Balloon.prototype.setOpacity(' + o + ')', (timer * speed));
        timer++;
    }
};
 
Balloon.prototype.setOpacity = function (opc) {
    var self = currentBalloonClass;
    if (!self || !opc) return false;
 
    var o = parseFloat(opc / 100);
 
    // opacity handled differently for IE
    var parts = self.isIE() ? self.parts : [self.activeBalloon];
 
    var len = parts.length;
    for (var i = 0; i < len; i++) {
        self.doOpacity(o, opc, parts[i]);
    }
};
 
Balloon.prototype.doOpacity = function (op, opc, el) {
    var self = currentBalloonClass;
    if (!el) return false;
 
    // CSS standards-compliant browsers!
    self.setStyle(el, 'opacity', op);
 
    // old IE
    self.setStyle(el, 'filter', 'alpha(opacity=' + opc + ')');
 
    // old Mozilla/NN
    self.setStyle(el, 'MozOpacity', op);
 
    // old Safari
    self.setStyle(el, 'KhtmlOpacity', op);
};
 
Balloon.prototype.nukeTooltip = function () {
    this.hideTooltip(1);
};
 
Balloon.prototype.hideTooltip = function (override) {
    // some browsers pass the event object == we don't want it
    if (override && typeof override == 'object') override = false;
    if (balloonIsSticky && !override) return false;
    var self = currentBalloonClass;
    Balloon.prototype.showHide(1);
    Balloon.prototype.cleanup();
 
    if (self) {
        window.clearTimeout(self.timeoutTooltip);
        window.clearTimeout(self.timeoutFade);
        window.clearTimeout(self.timeoutAutoClose);
        if (balloonIsSticky) {
            self.currentElement = null;
        }
        self.startX = 0;
        self.startY = 0;
    }
 
    balloonIsVisible = false;
    balloonIsSticky = false;
};
 
// Garbage collection
Balloon.prototype.cleanup = function () {
    var self = currentBalloonClass;
    var body;
    if (self) {
        body = self.parent ? self.parent : self.parentID ? document.getElementById(self.parentID) || document.body : document.body;
    } else {
        body = document.body;
    }
 
    var bubble = document.getElementById('visibleBalloonElement');
    var close = document.getElementById('closeButton');
    var cont = document.getElementById('balloonPreloadContainer');
    if (bubble) {
        body.removeChild(bubble);
    }
    if (close) {
        body.removeChild(close);
    }
    if (cont) {
        body.removeChild(cont);
    }
};
 
 
// this function is meant to be called externally to clear
// any open balloons
hideAllTooltips = function () {
    var self = currentBalloonClass;
    if (!self) return;
    window.clearTimeout(self.timeoutTooltip);
    if (self.activeBalloon) self.setStyle(self.activeBalloon, 'display', 'none');
    balloonIsVisible = false;
    balloonIsSticky = false;
    currentBalloonClass = null;
};
 
 
// Track the active mouseover coordinates
Balloon.prototype.setActiveCoordinates = function (evt) {
    var self = currentBalloonClass;
    if (!self) {
        return true;
    }
 
    var evt = evt || window.event || self.currentEvent;
    if (!evt) {
        return true;
    }
 
    self.currentEvent = {};
    for (var i in evt) {
        self.currentEvent[i] = evt[i];
    }
 
    // avoid silent NaN errors
    self.hOffset = self.hOffset || 1;
    self.vOffset = self.vOffset || 1;
    self.stemHeight = self.stem && self.stemHeight ? (self.stemHeight || 0) : 0;
 
    var scrollTop = 0;
    var scrollLeft = 0;
 
    var XY = self.eventXY(evt);
    adjustment = self.hOffset < 20 ? 10 : 0;
    self.activeTop = scrollTop + XY[1] - adjustment - self.vOffset - self.stemHeight;
    self.activeLeft = scrollLeft + XY[0] - adjustment - self.hOffset;
    self.activeRight = scrollLeft + XY[0];
    self.activeBottom = scrollTop + XY[1] + self.vOffset + 2 * adjustment;
 
    // dynamic positioning but only if the balloon is not sticky
    // and cursor tracking is enabled
    if (balloonIsVisible && !balloonIsSticky) {
        var deltaX = Math.abs(self.activeLeft - self.startX);
        var deltaY = Math.abs(self.activeTop - self.startY);
 
        // Close the balloon if the cursor has left the firing element
        if (XY[0] < self.elCoords.left || XY[0] > self.elCoords.right || XY[1] < self.elCoords.top || XY[1] > self.elCoords.bottom) {
            self.hideTooltip();
        }
 
        // In some cases , such as <area> elements in image maps or big elements,
        // we need to kill the balloon if the mouse has strayed too far.
        if (deltaX > self.stopTrackingX || deltaY > self.stopTrackingY) {
            self.hideTooltip();
        } else if (self.trackCursor) {
            var b = self.activeBalloon;
            var bwidth = self.getLoc(b, 'width');
            var bheight = self.getLoc(b, 'height');
            var btop = self.getLoc(b, 'y1');
            var bleft = self.getLoc(b, 'x1');
 
            if (self.hOrient == 'right') {
                self.setStyle(b, 'left', self.activeRight);
            } else if (self.hOrient == 'left') {
                self.setStyle(b, 'right', null);
                var newLeft = self.activeLeft - bwidth;
                self.setStyle(b, 'left', newLeft);
            }
 
            if (self.vOrient == 'up') {
                self.setStyle(b, 'top', self.activeTop - bheight);
            } else if (self.vOrient == 'down') {
                self.setStyle(b, 'top', self.activeBottom);
            }
        }
    }
 
    return true;
};
 
////
// event XY and getEventTarget Functions based on examples by Peter-Paul
// Koch https://www.quirksmode.org/js/events_properties.html
Balloon.prototype.eventXY = function (event) {
    var XY = new Array(2);
    var e = event || window.event;
    if (!e) {
        return false;
    }
    if (e.pageX || e.pageY) {
        XY[0] = e.pageX;
        XY[1] = e.pageY;
        return XY;
    } else if (e.clientX || e.clientY) {
        XY[0] = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        XY[1] = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        return XY;
    }
};
 
Balloon.prototype.getEventTarget = function (event) {
    var targ;
    var e = event || window.event;
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;
    if (targ.nodeType == 3) targ = targ.parentNode; // Safari
    return targ;
};
 
Balloon.prototype.setStyle = function (el, att, val) {
    if (!el) {
        return false;
    }
    if (typeof (el) != 'object') {
        el = document.getElementById(el);
    }
    if (!el) {
        return false;
    }
 
    var v = val;
 
    if (val && att.match(/left|top|bottom|right|width|height|padding|margin/)) {
        val = new String(val);
        if (!val.match(/auto/)) {
            val += 'px';
        }
    }
 
 
    // z-index does not work as expected
    if (att == 'z-index') {
        if (el.style) {
            el.style.zIndex = parseInt(val);
        }
    } else {
        // Oh just shut up, IE
        if (this.isIE() && att.match(/^left|right|top|bottom$/) && !parseInt(val) && val !== 0) {
            val = null;
        }
 
        YAHOO2.util.Dom.setStyle(el, att, val);
    }
};
 
// Uses YAHOO's region class for element coordinates
Balloon.prototype.getLoc = function (el, request) {
    var region = YAHOO2.util.Dom.getRegion(el);
 
    switch (request) {
        case ('y1'):
            return parseInt(region.top);
        case ('y2'):
            return parseInt(region.bottom);
        case ('x1'):
            return parseInt(region.left);
        case ('x2'):
            return parseInt(region.right);
        case ('width'):
            return (parseInt(region.right) - parseInt(region.left));
        case ('height'):
            return (parseInt(region.bottom) - parseInt(region.top));
        case ('region'):
            return region;
    }
 
    return region;
};
 
// We don't know if numbers are overridden with strings
// so play it safe
Balloon.prototype.parseIntAll = function () {
    this.padding = parseInt(this.padding);
    this.shadow = parseInt(this.shadow);
    this.stemHeight = parseInt(this.stemHeight);
    this.stemOverlap = parseInt(this.stemOverlap);
    this.vOffset = parseInt(this.vOffset);
    this.delayTime = parseInt(this.delayTime);
    this.width = parseInt(this.width);
    this.maxWidth = parseInt(this.maxWidth);
    this.minWidth = parseInt(this.minWidth);
    this.fadeIn = parseInt(this.fadeIn) || 1000;
};
 
 
// show/hide select elements in older IE
// plus user-defined elements
Balloon.prototype.showHide = function (visible) {
    var self = currentBalloonClass || new Balloon();
 
    // IE z-index bug fix (courtesy of Lincoln Stein)
    if (self.isOldIE()) {
        var balloonContents = document.getElementById('contentWrapper');
        if (!visible && balloonContents) {
            var balloonSelects = balloonContents.getElementsByTagName('select');
            var myHash = {};
            for (var i = 0; i < balloonSelects.length; i++) {
                var id = balloonSelects[i].id || balloonSelects[i].name;
                myHash[id] = 1;
            }
            balloonInvisibleSelects = [];
            var allSelects = document.getElementsByTagName('select');
            for (var i = 0; i < allSelects.length; i++) {
                var id = allSelects[i].id || allSelects[i].name;
                if (self.isOverlap(allSelects[i], self.activeBalloon) && !myHash[id]) {
                    balloonInvisibleSelects.push(allSelects[i]);
                    self.setStyle(allSelects[i], 'visibility', 'hidden');
                }
            }
        } else if (balloonInvisibleSelects) {
            for (var i = 0; i < balloonInvisibleSelects.length; i++) {
                var id = balloonInvisibleSelects[i].id || balloonInvisibleSelects[i].name;
                self.setStyle(balloonInvisibleSelects[i], 'visibility', 'visible');
            }
            balloonInvisibleSelects = null;
        }
    }
 
    // show/hide any user-specified elements that overlap the balloon
    if (self.hide) {
        var display = visible ? 'inline' : 'none';
        for (var n = 0; n < self.hide.length; n++) {
            if (self.isOverlap(self.activeBalloon, self.hide[n])) {
                self.setStyle(self.hide[n], 'display', display);
            }
        }
    }
};
 
// Try to find overlap
Balloon.prototype.isOverlap = function (el1, el2) {
    if (!el1 || !el2) return false;
    var R1 = this.getLoc(el1, 'region');
    var R2 = this.getLoc(el2, 'region');
    if (!R1 || !R2) return false;
    var intersect = R1.intersect(R2);
    if (intersect) {
        // extent of overlap;
        intersect = new Array((intersect.right - intersect.left), (intersect.bottom - intersect.top));
    }
    return intersect;
};
 
// Coordinate-based test for the same element
Balloon.prototype.isSameElement = function (el1, el2) {
    if (!el1 || !el2) return false;
    var R1 = this.getLoc(el1, 'region');
    var R2 = this.getLoc(el2, 'region');
    var same = R1.contains(R2) && R2.contains(R1);
    return same ? true : false;
};
 
 
///////////////////////////////////////////////////////
// Security -- get the balloon contents while checking 
// for disallowed elements.
//////////////////////////////////////////////////////
Balloon.prototype.getAndCheckContents = function (caption) {
    var originalCaption = caption;
    var notAllowed = 'are not allowed in popup balloons in this web site.  \
Please contact the site administrator for assistance.';
    var notSupported = 'AJAX is not supported for popup balloons in this web site.  \
Please contact the site administrator for assistance.';
 
    // no Help Url without AJAX
    if (this.helpUrl && !this.allowAJAX) {
        alert('Sorry, you have specified help URL ' + this.helpUrl + ' but ' + notSupported);
        return null;
    }
 
    // look for a url in the balloon contents
    if (caption.match(/^url:/)) {
        this.activeUrl = caption.replace(/^url:/, '');
        caption = '';
    }
    // or if the text is a bare hyperlink
    else if (caption.match(/^(https?:|\/|ftp:)\S+$/i)) {
        this.activeUrl = caption;
        caption = '';
    }
 
    // Make sure AJAX is allowed
    if (this.activeUrl && !this.allowAJAX) {
        alert('Sorry, you asked for ' + originalCaption + ' but ' + notSupported);
        return null;
    }
 
    // check if the contents are to be retrieved from an element
    if (caption.match(/^load:/)) {
        var load = caption.split(':');
        if (!document.getElementById(load[1])) alert('problem locating element ' + load[1]);
        caption = document.getElementById(load[1]).innerHTML;
        this.loadedFromElement = true;
    }
 
    // check if iframes are allowed
    if (caption.match(/\<\s*iframe/i) && !this.allowIframes) {
        alert('Sorry: iframe elements ' + notAllowed);
        return null;
    }
 
    // check if event handlers are allowed
    if (caption.match(/\bon(load|mouse|click|unload|before)[^=]*=/i) && !this.allowEventHandlers) {
        alert('Sorry: JavaScript event handlers ' + notAllowed);
        return null;
    }
 
    // check for script elements
    if (caption.match(/\<\s*script/i) && !this.allowScripts) {
        alert('Sorry: <script> elements ' + notAllowed);
        return null;
    }
 
    // request the contents
    this.currentHelpText = this.getContents(caption);
    this.loadedFromElement = false;
 
    return this.currentHelpText;
};
 
 
///////////////////////////////////////////////////////
// AJAX widget to fill the balloons
// requires prototype.js
///////////////////////////////////////////////////////
Balloon.prototype.getContents = function (section) {
 
    // just pass it back if no AJAX handler is required.
    if (!this.helpUrl && !this.activeUrl) return section;
 
    // or if the contents are already loaded from another element
    if (this.loadedFromElement) return section;
 
    // inline URL takes precedence
    var url = this.activeUrl || this.helpUrl;
    url += this.activeUrl ? '' : '?section=' + section;
 
    // activeUrl is meant to be single-use only
    this.activeUrl = null;
 
    var ajax;
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest();
    } else {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
 
    if (ajax) {
        ajax.open("GET", url, false);
        ajax.onreadystatechange = function () {
            //alert(ajax.readyState);
        };
        try {
            ajax.send(null);
        } catch (e) {
            // alert(e);
        }
        var txt = this.escapeHTML ? escape(ajax.responseText) : ajax.responseText;
        return txt || section;
    } else {
        return section;
    }
};
 
 
// test for internet explorer
Balloon.prototype.isIE = function () {
    return document.all && !window.opera;
};
 
// test for internet explorer (but not IE7)
Balloon.prototype.isOldIE = function () {
    if (navigator.appVersion.indexOf("MSIE") == -1) return false;
    var temp = navigator.appVersion.split("MSIE");
    return parseFloat(temp[1]) < 7;
};
 
// test for Konqueror
Balloon.prototype.isKonqueror = function () {
    return navigator.userAgent.toLowerCase().indexOf('konqueror') != -1;
};
 
// and Google chrome
Balloon.prototype.isChrome = function () {
    return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
};
 
 
/*
 This is a subclass of balloon.js -- uses a simple box rather than a 
 a balloon/bubble image.  It can have a background image and a styled
 bgcolor and border but is otherwise meant to be simple and lightweight.
*/
 
//////////////////////////////////////////////////////////////////////////
// This is constructor that is called to initialize the Balloon object  //
//////////////////////////////////////////////////////////////////////////
var Box = function () {
    // Track the cursor every time the mouse moves
    document.onmousemove = this.setActiveCoordinates;
 
    // scrolling aborts unsticky box
    document.onscroll = Balloon.prototype.hideTooltip;
 
    // go away if the page is unloading or waiting
    // to unload.
    window.onbeforeunload = function () {
        Balloon.prototype.nukeTooltip;
        balloonIsSuppressed = true;
    };
 
    // for IE, the box can't start until the page is finished loading
    // set a flag that will get toggled when loading is finished
    if (this.isIE()) {
        this.suppress = true;
    }
 
    return this;
};
 
// Inherit from Balloon class
Box.prototype = new Balloon();
 
 
// Make the box element -- this overrides the parent method
Box.prototype.makeBalloon = function () {
    var self = currentBalloonClass;
 
    // use ID 'visibleBalloonElement' for consistency with parent class
    var box = document.getElementById('visibleBalloonElement');
    if (box) self.parent.removeChild(box);
    box = document.createElement('div');
    box.setAttribute('id', 'visibleBalloonElement');
    self.parent.appendChild(box);
    self.activeBalloon = box;
 
    var contents = document.createElement('div');
    contents.setAttribute('id', 'contents');
    box.appendChild(contents);
    self.contents = contents;
    self.parts = new Array(box);
 
    self.setStyle(contents, 'z-index', 2);
    self.setStyle(contents, 'color', self.fontColor);
    self.setStyle(contents, 'font-family', self.fontFamily);
    self.setStyle(contents, 'font-size', self.fontSize);
 
    if (balloonIsSticky) {
        self.setStyle(contents, 'margin-right', 10);
    } else if (self.displayTime) {
        self.timeoutAutoClose = window.setTimeout(this.hideTooltip, self.displayTime);
    }
 
    return box;
};
 
// Set the box style -- overrides the parent method
Box.prototype.setBalloonStyle = function (vOrient, hOrient) {
    var self = currentBalloonClass;
    var box = self.activeBalloon;
 
    self.shadow = 0;
    self.stem = false;
    self.stemHeight = 0;
 
    self.setStyle(box, 'background', self.bgColor);
    self.setStyle(box, 'border', self.borderStyle);
    self.setStyle(box, 'position', 'absolute');
    self.setStyle(box, 'padding', self.padding);
    self.setStyle(box, 'top', -9999);
    self.setStyle(box, 'z-index', 1000000);
 
    // If width and/or height are specified, harden the
    // box at those dimensions, but not if the space needed
    // is less tha the space that would be used.
    if (self.width) {
        var widthUsed = self.getLoc('contents', 'width') + 20;
        var newWidth = widthUsed > self.width ? self.width : widthUsed;
        self.setStyle('contents', 'width', newWidth);
    }
    if (self.height) {
        var heightUsed = self.getLoc('contents', 'height') + 20;
        var newHeight = heightUsed > self.height ? self.height : heightUsed;
        self.setStyle('contents', 'height', newHeight + (2 * self.padding));
    }
 
    // flip left or right, as required
    if (hOrient == 'left') {
        var pageWidth = self.pageRight - self.pageLeft;
        var activeRight = pageWidth - self.activeLeft;
        self.setStyle(box, 'right', activeRight);
    } else {
        self.setStyle(box, 'left', self.activeRight - self.xOffset);
    }
 
    if (!self.width) {
        var width = self.getLoc('contents', 'width');
        if (self.isIE()) width += self.padding;
        if (width > self.maxWidth) width = self.maxWidth + self.padding;
        if (width < self.minWidth) width = self.minWidth;
        self.setStyle(box, 'width', width);
    }
 
    var overflow = balloonIsSticky ? 'auto' : 'hidden';
    self.setStyle('contents', 'overflow', overflow);
 
    // Make sure the box is not offscreen horizontally.
    // We handle vertical sanity checking later, after the final
    // layout is set.
    var boxLeft = self.getLoc(box, 'x1');
    var boxRight = self.getLoc(box, 'x2');
    var scrollBar = 20;
 
    if (hOrient == 'right' && boxRight > (self.pageRight - self.padding)) {
        self.setStyle('contents', 'width', (self.pageRight - boxLeft) - self.padding - scrollBar);
    } else if (hOrient == 'left' && boxLeft < (self.pageLeft + self.padding)) {
        self.setStyle('contents', 'width', (boxRight - self.pageLeft) - self.padding);
    }
 
    // Get the width/height for the right and bottom outlines
    var boxWidth = self.getLoc(box, 'width');
    var boxHeight = self.getLoc(box, 'height');
 
    if (self.allowFade) {
        self.setOpacity(0.01);
    } else {
        self.setOpacity(self.opacity);
    }
 
    if (!(self.activeTop && self.activeBottom)) {
        self.setActiveCoordinates();
    }
 
    if (vOrient == 'up') {
        var activeTop = self.activeTop - boxHeight;
        self.setStyle(box, 'top', activeTop);
    } else if (vOrient == 'down') {
        var activeTop = self.activeBottom;
        self.setStyle(box, 'top', activeTop);
    }
    self.setStyle(box, 'display', 'inline');
 
    // Make sure the box is vertically contained in the window
    var boxTop = self.getLoc(box, 'y1');
    var boxBottom = self.getLoc(box, 'y2');
    var deltaTop = boxTop < self.pageTop ? self.pageTop - boxTop : 0;
    var deltaBottom = boxBottom > self.pageBottom ? boxBottom - self.pageBottom : 0;
 
    if (vOrient == 'up' && deltaTop) {
        var newHeight = boxHeight - deltaTop;
        if (newHeight > (self.padding * 2)) {
            self.setStyle('contents', 'height', newHeight);
            self.setStyle(box, 'top', self.pageTop + self.padding);
            self.setStyle(box, 'height', newHeight);
        }
    }
 
    if (vOrient == 'down' && deltaBottom) {
        var newHeight = boxHeight - deltaBottom - scrollBar;
        if (newHeight > (self.padding * 2) + scrollBar) {
            self.setStyle('contents', 'height', newHeight);
            self.setStyle(box, 'height', newHeight);
        }
    }
 
    self.hOrient = hOrient;
    self.vOrient = vOrient;
};
 
 
Box.prototype.addCloseButton = function () {
    var self = currentBalloonClass;
    var margin = Math.round(self.padding / 2);
    var closeWidth = self.closeButtonWidth || 16;
    var balloonTop = self.getLoc('visibleBalloonElement', 'y1') + margin;
    var balloonRight = self.getLoc('visibleBalloonElement', 'x2') - margin - self.closeButtonWidth;
    var closeButton = document.getElementById('closeButton');
 
 
    if (!closeButton) {
        closeButton = new Image();
        closeButton.setAttribute('id', 'closeButton');
        closeButton.setAttribute('src', self.closeButton);
        closeButton.onclick = function () {
            Balloon.prototype.nukeTooltip();
        };
        self.setStyle(closeButton, 'position', 'absolute');
        document.body.appendChild(closeButton);
    }
 
    if (self.isIE()) {
        balloonRight -= self.padding;
    }
 
    self.setStyle(closeButton, 'top', balloonTop);
    self.setStyle(closeButton, 'left', balloonRight);
    self.setStyle(closeButton, 'display', 'inline');
    self.setStyle(closeButton, 'cursor', 'pointer');
    self.setStyle(closeButton, 'z-index', 999999999);
};
 
 
 
/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
https://developer.yahoo.net/yui/license.txt
version: 2.3.0
*/
 
if (typeof YAHOO2 == "undefined") {
    var YAHOO2 = {};
}
YAHOO2.namespace = function () {
    var a = arguments,
        o = null,
        i, j, d;
    for (i = 0; i < a.length; i = i + 1) {
        d = a[i].split(".");
        o = YAHOO2;
        for (j = (d[0] == "YAHOO2") ? 1 : 0; j < d.length; j = j + 1) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }
    return o;
};
YAHOO2.log = function (msg, cat, src) {
    var l = YAHOO2.widget.Logger;
    if (l && l.log) {
        return l.log(msg, cat, src);
    } else {
        return false;
    }
};
YAHOO2.register = function (name, mainClass, data) {
    var mods = YAHOO2.env.modules;
    if (!mods[name]) {
        mods[name] = {
            versions: [],
            builds: []
        };
    }
    var m = mods[name],
        v = data.version,
        b = data.build,
        ls = YAHOO2.env.listeners;
    m.name = name;
    m.version = v;
    m.build = b;
    m.versions.push(v);
    m.builds.push(b);
    m.mainClass = mainClass;
    for (var i = 0; i < ls.length; i = i + 1) {
        ls[i](m);
    }
    if (mainClass) {
        mainClass.VERSION = v;
        mainClass.BUILD = b;
    } else {
        YAHOO2.log("mainClass is undefined for module " + name, "warn");
    }
};
YAHOO2.env = YAHOO2.env || {
    modules: [],
    listeners: []
};
YAHOO2.env.getVersion = function (name) {
    return YAHOO2.env.modules[name] || null;
};
YAHOO2.env.ua = function () {
    var o = {
        ie: 0,
        opera: 0,
        gecko: 0,
        webkit: 0
    };
    var ua = navigator.userAgent,
        m;
    if ((/KHTML/).test(ua)) {
        o.webkit = 1;
    }
    m = ua.match(/AppleWebKit\/([^\s]*)/);
    if (m && m[1]) {
        o.webkit = parseFloat(m[1]);
    }
    if (!o.webkit) {
        m = ua.match(/Opera[\s\/]([^\s]*)/);
        if (m && m[1]) {
            o.opera = parseFloat(m[1]);
        } else {
            m = ua.match(/MSIE\s([^;]*)/);
            if (m && m[1]) {
                o.ie = parseFloat(m[1]);
            } else {
                m = ua.match(/Gecko\/([^\s]*)/);
                if (m) {
                    o.gecko = 1;
                    m = ua.match(/rv:([^\s\)]*)/);
                    if (m && m[1]) {
                        o.gecko = parseFloat(m[1]);
                    }
                }
            }
        }
    }
    return o;
}();
(function () {
    YAHOO2.namespace("util", "widget", "example");
    if (typeof YAHOO2_config != "undefined") {
        var l = YAHOO2_config.listener,
            ls = YAHOO2.env.listeners,
            unique = true,
            i;
        if (l) {
            for (i = 0; i < ls.length; i = i + 1) {
                if (ls[i] == l) {
                    unique = false;
                    break;
                }
            }
            if (unique) {
                ls.push(l);
            }
        }
    }
})();
YAHOO2.lang = {
    isArray: function (o) {
        if (o) {
            var l = YAHOO2.lang;
            return l.isNumber(o.length) && l.isFunction(o.splice) && !l.hasOwnProperty(o.length);
        }
        return false;
    },
    isBoolean: function (o) {
        return typeof o === 'boolean';
    },
    isFunction: function (o) {
        return typeof o === 'function';
    },
    isNull: function (o) {
        return o === null;
    },
    isNumber: function (o) {
        return typeof o === 'number' && isFinite(o);
    },
    isObject: function (o) {
        return (o && (typeof o === 'object' || YAHOO2.lang.isFunction(o))) || false;
    },
    isString: function (o) {
        return typeof o === 'string';
    },
    isUndefined: function (o) {
        return typeof o === 'undefined';
    },
    hasOwnProperty: function (o, prop) {
        if (Object.prototype.hasOwnProperty) {
            return o.hasOwnProperty(prop);
        }
        return !YAHOO2.lang.isUndefined(o[prop]) && o.constructor.prototype[prop] !== o[prop];
    },
    _IEEnumFix: function (r, s) {
        if (YAHOO2.env.ua.ie) {
            var add = ["toString", "valueOf"];
            for (i = 0; i < add.length; i = i + 1) {
                var fname = add[i],
                    f = s[fname];
                if (YAHOO2.lang.isFunction(f) && f != Object.prototype[fname]) {
                    r[fname] = f;
                }
            }
        }
    },
    extend: function (subc, superc, overrides) {
        if (!superc || !subc) {
            throw new Error("YAHOO2.lang.extend failed, please check that " + "all dependencies are included.");
        }
        var F = function () {};
        F.prototype = superc.prototype;
        subc.prototype = new F();
        subc.prototype.constructor = subc;
        subc.superclass = superc.prototype;
        if (superc.prototype.constructor == Object.prototype.constructor) {
            superc.prototype.constructor = superc;
        }
        if (overrides) {
            for (var i in overrides) {
                subc.prototype[i] = overrides[i];
            }
            YAHOO2.lang._IEEnumFix(subc.prototype, overrides);
        }
    },
    augmentObject: function (r, s) {
        if (!s || !r) {
            throw new Error("Absorb failed, verify dependencies.");
        }
        var a = arguments,
            i, p, override = a[2];
        if (override && override !== true) {
            for (i = 2; i < a.length; i = i + 1) {
                r[a[i]] = s[a[i]];
            }
        } else {
            for (p in s) {
                if (override || !r[p]) {
                    r[p] = s[p];
                }
            }
            YAHOO2.lang._IEEnumFix(r, s);
        }
    },
    augmentProto: function (r, s) {
        if (!s || !r) {
            throw new Error("Augment failed, verify dependencies.");
        }
        var a = [r.prototype, s.prototype];
        for (var i = 2; i < arguments.length; i = i + 1) {
            a.push(arguments[i]);
        }
        YAHOO2.lang.augmentObject.apply(this, a);
    },
    dump: function (o, d) {
        var l = YAHOO2.lang,
            i, len, s = [],
            OBJ = "{...}",
            FUN = "f(){...}",
            COMMA = ', ',
            ARROW = ' => ';
        if (!l.isObject(o) || o instanceof Date || ("nodeType" in o && "tagName" in o)) {
            return o;
        } else if (l.isFunction(o)) {
            return FUN;
        }
        d = (l.isNumber(d)) ? d : 3;
        if (l.isArray(o)) {
            s.push("[");
            for (i = 0, len = o.length; i < len; i = i + 1) {
                if (l.isObject(o[i])) {
                    s.push((d > 0) ? l.dump(o[i], d - 1) : OBJ);
                } else {
                    s.push(o[i]);
                }
                s.push(COMMA);
            }
            if (s.length > 1) {
                s.pop();
            }
            s.push("]");
        } else {
            s.push("{");
            for (i in o) {
                if (l.hasOwnProperty(o, i)) {
                    s.push(i + ARROW);
                    if (l.isObject(o[i])) {
                        s.push((d > 0) ? l.dump(o[i], d - 1) : OBJ);
                    } else {
                        s.push(o[i]);
                    }
                    s.push(COMMA);
                }
            }
            if (s.length > 1) {
                s.pop();
            }
            s.push("}");
        }
        return s.join("");
    },
    substitute: function (s, o, f) {
        var i, j, k, key, v, meta, l = YAHOO2.lang,
            saved = [],
            token, DUMP = 'dump',
            SPACE = ' ',
            LBRACE = '{',
            RBRACE = '}';
        for (;;) {
            i = s.lastIndexOf(LBRACE);
            if (i < 0) {
                break;
            }
            j = s.indexOf(RBRACE, i);
            if (i + 1 >= j) {
                break;
            }
            token = s.substring(i + 1, j);
            key = token;
            meta = null;
            k = key.indexOf(SPACE);
            if (k > -1) {
                meta = key.substring(k + 1);
                key = key.substring(0, k);
            }
            v = o[key];
            if (f) {
                v = f(key, v, meta);
            }
            if (l.isObject(v)) {
                if (l.isArray(v)) {
                    v = l.dump(v, parseInt(meta, 10));
                } else {
                    meta = meta || "";
                    var dump = meta.indexOf(DUMP);
                    if (dump > -1) {
                        meta = meta.substring(4);
                    }
                    if (v.toString === Object.prototype.toString || dump > -1) {
                        v = l.dump(v, parseInt(meta, 10));
                    } else {
                        v = v.toString();
                    }
                }
            } else if (!l.isString(v) && !l.isNumber(v)) {
                v = "~-" + saved.length + "-~";
                saved[saved.length] = token;
            }
            s = s.substring(0, i) + v + s.substring(j + 1);
        }
        for (i = saved.length - 1; i >= 0; i = i - 1) {
            s = s.replace(new RegExp("~-" + i + "-~"), "{" + saved[i] + "}", "g");
        }
        return s;
    },
    trim: function (s) {
        try {
            return s.replace(/^\s+|\s+$/g, "");
        } catch (e) {
            return s;
        }
    },
    merge: function () {
        var o = {}, a = arguments,
            i;
        for (i = 0; i < a.length; i = i + 1) {
            YAHOO2.lang.augmentObject(o, a[i], true);
        }
        return o;
    },
    isValue: function (o) {
        var l = YAHOO2.lang;
        return (l.isObject(o) || l.isString(o) || l.isNumber(o) || l.isBoolean(o));
    }
};
YAHOO2.util.Lang = YAHOO2.lang;
YAHOO2.lang.augment = YAHOO2.lang.augmentProto;
YAHOO2.augment = YAHOO2.lang.augmentProto;
YAHOO2.extend = YAHOO2.lang.extend;
YAHOO2.register("yahoo", YAHOO2, {
    version: "2.3.0",
    build: "442"
});
(function () {
    var Y = YAHOO2.util,
        getStyle, setStyle, id_counter = 0,
        propertyCache = {}, reClassNameCache = {};
    var isOpera = YAHOO2.env.ua.opera,
        isSafari = YAHOO2.env.ua.webkit,
        isGecko = YAHOO2.env.ua.gecko,
        isIE = YAHOO2.env.ua.ie;
    var patterns = {
        HYPHEN: /(-[a-z])/i,
        ROOT_TAG: /^body|html$/i
    };
    var toCamel = function (property) {
        if (!patterns.HYPHEN.test(property)) {
            return property;
        }
        if (propertyCache[property]) {
            return propertyCache[property];
        }
        var converted = property;
        while (patterns.HYPHEN.exec(converted)) {
            converted = converted.replace(RegExp.$1, RegExp.$1.substr(1).toUpperCase());
        }
        propertyCache[property] = converted;
        return converted;
    };
    var getClassRegEx = function (className) {
        var re = reClassNameCache[className];
        if (!re) {
            re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
            reClassNameCache[className] = re;
        }
        return re;
    };
    if (document.defaultView && document.defaultView.getComputedStyle) {
        getStyle = function (el, property) {
            var value = null;
            if (property == 'float') {
                property = 'cssFloat';
            }
            var computed = document.defaultView.getComputedStyle(el, '');
            if (computed) {
                value = computed[toCamel(property)];
            }
            return el.style[property] || value;
        };
    } else if (document.documentElement.currentStyle && isIE) {
        getStyle = function (el, property) {
            switch (toCamel(property)) {
                case 'opacity':
                    var val = 100;
                    try {
                        val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
                    } catch (e) {
                        try {
                            val = el.filters('alpha').opacity;
                        } catch (e) {}
                    }
                    return val / 100;
                case 'float':
                    property = 'styleFloat';
                    break;
                default:
                    var value = el.currentStyle ? el.currentStyle[property] : null;
                    return (el.style[property] || value);
            }
        };
    } else {
        getStyle = function (el, property) {
            return el.style[property];
        };
    }
    if (isIE) {
        setStyle = function (el, property, val) {
            switch (property) {
                case 'opacity':
                    if (YAHOO2.lang.isString(el.style.filter)) {
                        el.style.filter = 'alpha(opacity=' + val * 100 + ')';
                        if (!el.currentStyle || !el.currentStyle.hasLayout) {
                            el.style.zoom = 1;
                        }
                    }
                    break;
                case 'float':
                    property = 'styleFloat';
                    break;
                default:
                    el.style[property] = val;
            }
        };
    } else {
        setStyle = function (el, property, val) {
            if (property == 'float') {
                property = 'cssFloat';
            }
            el.style[property] = val;
        };
    }
    var testElement = function (node, method) {
        return node && node.nodeType == 1 && (!method || method(node));
    };
    YAHOO2.util.Dom = {
        get: function (el) {
            if (!el || el.tagName || el.item) {
                return el;
            }
            if (YAHOO2.lang.isString(el)) {
                return document.getElementById(el);
            }
            if (el.splice) {
                var c = [];
                for (var i = 0, len = el.length; i < len; ++i) {
                    c[c.length] = Y.Dom.get(el[i]);
                }
                return c;
            }
            return el;
        },
        getStyle: function (el, property) {
            property = toCamel(property);
            var f = function (element) {
                return getStyle(element, property);
            };
            return Y.Dom.batch(el, f, Y.Dom, true);
        },
        setStyle: function (el, property, val) {
            property = toCamel(property);
            var f = function (element) {
                setStyle(element, property, val);
            };
            Y.Dom.batch(el, f, Y.Dom, true);
        },
        getXY: function (el) {
            var f = function (el) {
                if ((el.parentNode === null || el.offsetParent === null || this.getStyle(el, 'display') == 'none') && el != document.body) {
                    return false;
                }
                var parentNode = null;
                var pos = [];
                var box;
                var doc = el.ownerDocument;
                if (el.getBoundingClientRect) {
                    box = el.getBoundingClientRect();
                    return [box.left + Y.Dom.getDocumentScrollLeft(el.ownerDocument), box.top + Y.Dom.getDocumentScrollTop(el.ownerDocument)];
                } else {
                    pos = [el.offsetLeft, el.offsetTop];
                    parentNode = el.offsetParent;
                    var hasAbs = this.getStyle(el, 'position') == 'absolute';
                    if (parentNode != el) {
                        while (parentNode) {
                            pos[0] += parentNode.offsetLeft;
                            pos[1] += parentNode.offsetTop;
                            if (isSafari && !hasAbs && this.getStyle(parentNode, 'position') == 'absolute') {
                                hasAbs = true;
                            }
                            parentNode = parentNode.offsetParent;
                        }
                    }
                    if (isSafari && hasAbs) {
                        pos[0] -= el.ownerDocument.body.offsetLeft;
                        pos[1] -= el.ownerDocument.body.offsetTop;
                    }
                }
                parentNode = el.parentNode;
                while (parentNode.tagName && !patterns.ROOT_TAG.test(parentNode.tagName)) {
                    if (Y.Dom.getStyle(parentNode, 'display').search(/^inline|table-row.*$/i)) {
                        pos[0] -= parentNode.scrollLeft;
                        pos[1] -= parentNode.scrollTop;
                    }
                    parentNode = parentNode.parentNode;
                }
                return pos;
            };
            return Y.Dom.batch(el, f, Y.Dom, true);
        },
        getX: function (el) {
            var f = function (el) {
                return Y.Dom.getXY(el)[0];
            };
            return Y.Dom.batch(el, f, Y.Dom, true);
        },
        getY: function (el) {
            var f = function (el) {
                return Y.Dom.getXY(el)[1];
            };
            return Y.Dom.batch(el, f, Y.Dom, true);
        },
        setXY: function (el, pos, noRetry) {
            var f = function (el) {
                var style_pos = this.getStyle(el, 'position');
                if (style_pos == 'static') {
                    this.setStyle(el, 'position', 'relative');
                    style_pos = 'relative';
                }
                var pageXY = this.getXY(el);
                if (pageXY === false) {
                    return false;
                }
                var delta = [parseInt(this.getStyle(el, 'left'), 10), parseInt(this.getStyle(el, 'top'), 10)];
                if (isNaN(delta[0])) {
                    delta[0] = (style_pos == 'relative') ? 0 : el.offsetLeft;
                }
                if (isNaN(delta[1])) {
                    delta[1] = (style_pos == 'relative') ? 0 : el.offsetTop;
                }
                if (pos[0] !== null) {
                    el.style.left = pos[0] - pageXY[0] + delta[0] + 'px';
                }
                if (pos[1] !== null) {
                    el.style.top = pos[1] - pageXY[1] + delta[1] + 'px';
                }
                if (!noRetry) {
                    var newXY = this.getXY(el);
                    if ((pos[0] !== null && newXY[0] != pos[0]) || (pos[1] !== null && newXY[1] != pos[1])) {
                        this.setXY(el, pos, true);
                    }
                }
            };
            Y.Dom.batch(el, f, Y.Dom, true);
        },
        setX: function (el, x) {
            Y.Dom.setXY(el, [x, null]);
        },
        setY: function (el, y) {
            Y.Dom.setXY(el, [null, y]);
        },
        getRegion: function (el) {
            var f = function (el) {
                if ((el.parentNode === null || el.offsetParent === null || this.getStyle(el, 'display') == 'none') && el != document.body) {
                    return false;
                }
                var region = Y.Region.getRegion(el);
                return region;
            };
            return Y.Dom.batch(el, f, Y.Dom, true);
        },
        getClientWidth: function () {
            return Y.Dom.getViewportWidth();
        },
        getClientHeight: function () {
            return Y.Dom.getViewportHeight();
        },
        getElementsByClassName: function (className, tag, root, apply) {
            tag = tag || '*';
            root = (root) ? Y.Dom.get(root) : null || document;
            if (!root) {
                return [];
            }
            var nodes = [],
                elements = root.getElementsByTagName(tag),
                re = getClassRegEx(className);
            for (var i = 0, len = elements.length; i < len; ++i) {
                if (re.test(elements[i].className)) {
                    nodes[nodes.length] = elements[i];
                    if (apply) {
                        apply.call(elements[i], elements[i]);
                    }
                }
            }
            return nodes;
        },
        hasClass: function (el, className) {
            var re = getClassRegEx(className);
            var f = function (el) {
                return re.test(el.className);
            };
            return Y.Dom.batch(el, f, Y.Dom, true);
        },
        addClass: function (el, className) {
            var f = function (el) {
                if (this.hasClass(el, className)) {
                    return false;
                }
                el.className = YAHOO2.lang.trim([el.className, className].join(' '));
                return true;
            };
            return Y.Dom.batch(el, f, Y.Dom, true);
        },
        removeClass: function (el, className) {
            var re = getClassRegEx(className);
            var f = function (el) {
                if (!this.hasClass(el, className)) {
                    return false;
                }
                var c = el.className;
                el.className = c.replace(re, ' ');
                if (this.hasClass(el, className)) {
                    this.removeClass(el, className);
                }
                el.className = YAHOO2.lang.trim(el.className);
                return true;
            };
            return Y.Dom.batch(el, f, Y.Dom, true);
        },
        replaceClass: function (el, oldClassName, newClassName) {
            if (!newClassName || oldClassName === newClassName) {
                return false;
            }
            var re = getClassRegEx(oldClassName);
            var f = function (el) {
                if (!this.hasClass(el, oldClassName)) {
                    this.addClass(el, newClassName);
                    return true;
                }
                el.className = el.className.replace(re, ' ' + newClassName + ' ');
                if (this.hasClass(el, oldClassName)) {
                    this.replaceClass(el, oldClassName, newClassName);
                }
                el.className = YAHOO2.lang.trim(el.className);
                return true;
            };
            return Y.Dom.batch(el, f, Y.Dom, true);
        },
        generateId: function (el, prefix) {
            prefix = prefix || 'yui-gen';
            var f = function (el) {
                if (el && el.id) {
                    return el.id;
                }
                var id = prefix + id_counter++;
                if (el) {
                    el.id = id;
                }
                return id;
            };
            return Y.Dom.batch(el, f, Y.Dom, true) || f.apply(Y.Dom, arguments);
        },
        isAncestor: function (haystack, needle) {
            haystack = Y.Dom.get(haystack);
            if (!haystack || !needle) {
                return false;
            }
            var f = function (node) {
                if (haystack.contains && node.nodeType && !isSafari) {
                    return haystack.contains(node);
                } else if (haystack.compareDocumentPosition && node.nodeType) {
                    return !!(haystack.compareDocumentPosition(node) & 16);
                } else if (node.nodeType) {
                    return !!this.getAncestorBy(node, function (el) {
                        return el == haystack;
                    });
                }
                return false;
            };
            return Y.Dom.batch(needle, f, Y.Dom, true);
        },
        inDocument: function (el) {
            var f = function (el) {
                if (isSafari) {
                    while (el = el.parentNode) {
                        if (el == document.documentElement) {
                            return true;
                        }
                    }
                    return false;
                }
                return this.isAncestor(document.documentElement, el);
            };
            return Y.Dom.batch(el, f, Y.Dom, true);
        },
        getElementsBy: function (method, tag, root, apply) {
            tag = tag || '*';
            root = (root) ? Y.Dom.get(root) : null || document;
            if (!root) {
                return [];
            }
            var nodes = [],
                elements = root.getElementsByTagName(tag);
            for (var i = 0, len = elements.length; i < len; ++i) {
                if (method(elements[i])) {
                    nodes[nodes.length] = elements[i];
                    if (apply) {
                        apply(elements[i]);
                    }
                }
            }
            return nodes;
        },
        batch: function (el, method, o, override) {
            el = (el && el.tagName) ? el : Y.Dom.get(el);
            if (!el || !method) {
                return false;
            }
            var scope = (override) ? o : window;
            if (el.tagName || (!el.item && !el.slice)) {
                return method.call(scope, el, o);
            }
            var collection = [];
            for (var i = 0, len = el.length; i < len; ++i) {
                collection[collection.length] = method.call(scope, el[i], o);
            }
            return collection;
        },
        getDocumentHeight: function () {
            var scrollHeight = (document.compatMode != 'CSS1Compat') ? document.body.scrollHeight : document.documentElement.scrollHeight;
            var h = Math.max(scrollHeight, Y.Dom.getViewportHeight());
            return h;
        },
        getDocumentWidth: function () {
            var scrollWidth = (document.compatMode != 'CSS1Compat') ? document.body.scrollWidth : document.documentElement.scrollWidth;
            var w = Math.max(scrollWidth, Y.Dom.getViewportWidth());
            return w;
        },
        getViewportHeight: function () {
            var height = self.innerHeight;
            var mode = document.compatMode;
            if ((mode || isIE) && !isOpera) {
                height = (mode == 'CSS1Compat') ? document.documentElement.clientHeight : document.body.clientHeight;
            }
            return height;
        },
        getViewportWidth: function () {
            var width = self.innerWidth;
            var mode = document.compatMode;
            if (mode || isIE) {
                width = (mode == 'CSS1Compat') ? document.documentElement.clientWidth : document.body.clientWidth;
            }
            return width;
        },
        getAncestorBy: function (node, method) {
            while (node = node.parentNode) {
                if (testElement(node, method)) {
                    return node;
                }
            }
            return null;
        },
        getAncestorByClassName: function (node, className) {
            node = Y.Dom.get(node);
            if (!node) {
                return null;
            }
            var method = function (el) {
                return Y.Dom.hasClass(el, className);
            };
            return Y.Dom.getAncestorBy(node, method);
        },
        getAncestorByTagName: function (node, tagName) {
            node = Y.Dom.get(node);
            if (!node) {
                return null;
            }
            var method = function (el) {
                return el.tagName && el.tagName.toUpperCase() == tagName.toUpperCase();
            };
            return Y.Dom.getAncestorBy(node, method);
        },
        getPreviousSiblingBy: function (node, method) {
            while (node) {
                node = node.previousSibling;
                if (testElement(node, method)) {
                    return node;
                }
            }
            return null;
        },
        getPreviousSibling: function (node) {
            node = Y.Dom.get(node);
            if (!node) {
                return null;
            }
            return Y.Dom.getPreviousSiblingBy(node);
        },
        getNextSiblingBy: function (node, method) {
            while (node) {
                node = node.nextSibling;
                if (testElement(node, method)) {
                    return node;
                }
            }
            return null;
        },
        getNextSibling: function (node) {
            node = Y.Dom.get(node);
            if (!node) {
                return null;
            }
            return Y.Dom.getNextSiblingBy(node);
        },
        getFirstChildBy: function (node, method) {
            var child = (testElement(node.firstChild, method)) ? node.firstChild : null;
            return child || Y.Dom.getNextSiblingBy(node.firstChild, method);
        },
        getFirstChild: function (node, method) {
            node = Y.Dom.get(node);
            if (!node) {
                return null;
            }
            return Y.Dom.getFirstChildBy(node);
        },
        getLastChildBy: function (node, method) {
            if (!node) {
                return null;
            }
            var child = (testElement(node.lastChild, method)) ? node.lastChild : null;
            return child || Y.Dom.getPreviousSiblingBy(node.lastChild, method);
        },
        getLastChild: function (node) {
            node = Y.Dom.get(node);
            return Y.Dom.getLastChildBy(node);
        },
        getChildrenBy: function (node, method) {
            var child = Y.Dom.getFirstChildBy(node, method);
            var children = child ? [child] : [];
            Y.Dom.getNextSiblingBy(child, function (node) {
                if (!method || method(node)) {
                    children[children.length] = node;
                }
                return false;
            });
            return children;
        },
        getChildren: function (node) {
            node = Y.Dom.get(node);
            if (!node) {}
            return Y.Dom.getChildrenBy(node);
        },
        getDocumentScrollLeft: function (doc) {
            doc = doc || document;
            return Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
        },
        getDocumentScrollTop: function (doc) {
            doc = doc || document;
            return Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
        },
        insertBefore: function (newNode, referenceNode) {
            newNode = Y.Dom.get(newNode);
            referenceNode = Y.Dom.get(referenceNode);
            if (!newNode || !referenceNode || !referenceNode.parentNode) {
                return null;
            }
            return referenceNode.parentNode.insertBefore(newNode, referenceNode);
        },
        insertAfter: function (newNode, referenceNode) {
            newNode = Y.Dom.get(newNode);
            referenceNode = Y.Dom.get(referenceNode);
            if (!newNode || !referenceNode || !referenceNode.parentNode) {
                return null;
            }
            if (referenceNode.nextSibling) {
                return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
            } else {
                return referenceNode.parentNode.appendChild(newNode);
            }
        }
    };
})();
YAHOO2.util.Region = function (t, r, b, l) {
    this.top = t;
    this[1] = t;
    this.right = r;
    this.bottom = b;
    this.left = l;
    this[0] = l;
};
YAHOO2.util.Region.prototype.contains = function (region) {
    return (region.left >= this.left && region.right <= this.right && region.top >= this.top && region.bottom <= this.bottom);
};
YAHOO2.util.Region.prototype.getArea = function () {
    return ((this.bottom - this.top) * (this.right - this.left));
};
YAHOO2.util.Region.prototype.intersect = function (region) {
    var t = Math.max(this.top, region.top);
    var r = Math.min(this.right, region.right);
    var b = Math.min(this.bottom, region.bottom);
    var l = Math.max(this.left, region.left);
    if (b >= t && r >= l) {
        return new YAHOO2.util.Region(t, r, b, l);
    } else {
        return null;
    }
};
YAHOO2.util.Region.prototype.union = function (region) {
    var t = Math.min(this.top, region.top);
    var r = Math.max(this.right, region.right);
    var b = Math.max(this.bottom, region.bottom);
    var l = Math.min(this.left, region.left);
    return new YAHOO2.util.Region(t, r, b, l);
};
YAHOO2.util.Region.prototype.toString = function () {
    return ("Region {" + "top: " + this.top + ", right: " + this.right + ", bottom: " + this.bottom + ", left: " + this.left + "}");
};
YAHOO2.util.Region.getRegion = function (el) {
    var p = YAHOO2.util.Dom.getXY(el);
    var t = p[1];
    var r = p[0] + el.offsetWidth;
    var b = p[1] + el.offsetHeight;
    var l = p[0];
    return new YAHOO2.util.Region(t, r, b, l);
};
YAHOO2.util.Point = function (x, y) {
    if (YAHOO2.lang.isArray(x)) {
        y = x[1];
        x = x[0];
    }
    this.x = this.right = this.left = this[0] = x;
    this.y = this.top = this.bottom = this[1] = y;
};
YAHOO2.util.Point.prototype = new YAHOO2.util.Region();
YAHOO2.register("dom", YAHOO2.util.Dom, {
    version: "2.3.0",
    build: "442"
});
 
 
//////////////////////////////////////////////////////////////////
//               Dead Island Wiki Popups
// Popup Code Source: https://gmod.org/wiki/Popup_Balloons
// Wikia Additions: https://deadisland.wikia.com/wiki/User:Jgjake2
//////////////////////////////////////////////////////////////////
/*
	var hasClass = (function () {
		var reCache = {};
			return function (element, className) {
			return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
		};
	})();
	*/
// white balloon with default configuration
var balloon = new Balloon();
BalloonConfig(balloon, 'GBubble');
 
// Dead Island Config
var deadIslandBalloon = new Balloon();
BalloonConfig(deadIslandBalloon, 'DeadIslandBubble');
 
// plain balloon tooltip
var tooltip = new Balloon();
BalloonConfig(tooltip, 'GPlain');
 
// fading balloon
var fader = new Balloon();
BalloonConfig(fader, 'GFade');
 
// a plainer popup box
var box = new Box();
BalloonConfig(box, 'GBox');
 
// a box that fades in/out
var fadeBox = new Box();
BalloonConfig(fadeBox, 'GBox');
fadeBox.bgColor = 'black';
fadeBox.fontColor = 'white';
fadeBox.borderStyle = 'none';
fadeBox.delayTime = 200;
fadeBox.allowFade = true;
fadeBox.fadeIn = 750;
fadeBox.fadeOut = 200;
 
function reInitBalloons() {
    BalloonConfig(balloon, 'GBubble');
    BalloonConfig(deadIslandBalloon, 'DeadIslandBubble');
    BalloonConfig(tooltip, 'GPlain');
    BalloonConfig(fader, 'GFade');
    BalloonConfig(box, 'GBox');
    BalloonConfig(fadeBox, 'GBox');
    fadeBox.bgColor = 'black';
    fadeBox.fontColor = 'white';
    fadeBox.borderStyle = 'none';
    fadeBox.delayTime = 200;
    fadeBox.allowFade = true;
    fadeBox.fadeIn = 750;
    fadeBox.fadeOut = 200;
}
 
function getElementsByClass(elementName, tagname, tclass) {
    var itemsfound = [];
    var elements = elementName.getElementsByTagName(tagname);
    for (var i = 0; i < elements.length; i++) {
        if (hasClass(elements[i], tclass)) {
            itemsfound.push(elements[i]);
        }
    }
    return itemsfound;
}
 
function removeByClass(tagname, className) {
    var spans = getElementsByClass(document, tagname, className);
    for (var x in spans) {
        spans[x].parentNode.removeChild(spans[x]);
    }
}
 
function RemoveClassName(objElement, strClass) {
    if (objElement.className) {
        var arrList = objElement.className.split(' ');
        var strClassUpper = strClass.toUpperCase();
        for (var i = 0; i < arrList.length; i++) {
            if (arrList[i].toUpperCase() == strClassUpper) {
                arrList.splice(i, 1);
                i--;
            }
        }
        objElement.className = arrList.join(' ');
    }
}
 
// Remove Sectons of pages with "removeOnHover" class for ajax popups.
function removeUnwantedContent() {
    removeByClass('div', 'removeOnHover');
}
 
// Must clean any div with "removeOnHover" class if it is on the current page.
// Otherwise it will be remove when an ajax popup is used.
function removeOnHoverClass() {
    var divs = getElementsByClass(document, 'div', 'removeOnHover');
    for (var x in divs) {
        RemoveClassName(divs[x], 'removeOnHover');
    }
}
addOnloadHook(removeOnHoverClass);
 
function AddClassName(objElement, strClass, blnMayAlreadyExist) {
    if (objElement.className) {
        var arrList = objElement.className.split(' ');
        if (blnMayAlreadyExist) {
            var strClassUpper = strClass.toUpperCase();
            for (var i = 0; i < arrList.length; i++) {
                if (arrList[i].toUpperCase() == strClassUpper) {
                    arrList.splice(i, 1);
                    i--;
                }
            }
        }
        arrList[arrList.length] = strClass;
        objElement.className = arrList.join(' ');
    } else {
        objElement.className = strClass;
    }
}
 
function regEx(str, pattern, modifiers) {
    var patt = new RegExp(pattern, modifiers);
    return patt.exec(str);
}
 
function firePopup(event, tBalloon) {
    reInitBalloons();
    // Set Up Balloon Type - ['ClassName', BalloonVar]
    var isSticky = hasClass(tBalloon, 'stickyBalloon') ? 1 : 0;
    var balloonType = deadIslandBalloon;
    var balloonTypes = [
        ['classicBalloon', balloon],
        ['plainBalloon', tooltip],
        ['boxBalloon', box],
        ['fadeBalloon', fader],
        ['fadeBoxBalloon', fadeBox]
    ];
    for (var x in balloonTypes) if (hasClass(tBalloon, balloonTypes[x][0])) balloonType = balloonTypes[x][1];
 
    if (hasClass(tBalloon, 'noTransparentBG')) {
        balloonType.opacity = 1;
    } else {
        balloonType.opacity = 0.90;
    }
    if (hasClass(tBalloon, 'noDelay')) {
        balloonType.delayTime = 1;
    } else {
        balloonType.delayTime = 350;
    }
    if (hasClass(tBalloon, 'noStem')) {
        balloonType.stem = false;
    } else {
        balloonType.stem = true;
    }
 
    //var customWidth = regEx(tBalloon.className, 'customBalloonWidth([0-9][0-9][0-9]?)', '');
    //if(customWidth != null) {
    //parseInt(customWidth[1]);
    //}
 
    var customOpacity = regEx(tBalloon.className, 'customBalloonOpacity([0-9][0-9][0-9]?)', '');
    if (customOpacity !== null) balloonType.opacity = (parseFloat(customOpacity[1]) > 1) ? (parseFloat(customOpacity[1]) / 100) : (parseFloat(customOpacity[1]));
 
    var customFontColor = regEx(tBalloon.className, 'customBalloonFontColor(.*?) ', '');
    if (customFontColor !== null) balloonType.fontColor = customFontColor[1];
 
    var customFontSize = regEx(tBalloon.className, 'customBalloonFontSize(.*?) ', '');
    if (customFontSize !== null) balloonType.fontSize = customFontSize[1];
 
    var customBGColor = regEx(tBalloon.className, 'customBalloonBGColor(.*?) ', '');
    if (customBGColor !== null) balloonType.bgColor = customBGColor[1];
 
    var customDelay = regEx(tBalloon.className, 'customBalloonDelay([0-9][0-9]?[0-9]?)', '');
    if (customDelay !== null) balloonType.delayTime = customDelay[1];
    if (hasClass(tBalloon, 'ajaxBalloon')) {
        balloonType.showTooltip(event, 'url:https://deadisland.wikia.com/index.php?title=' + tBalloon.id.replace('\.2F', '/') + '&action=render', isSticky);
        removeUnwantedContent();
        createCollapseButtons();
        createNavigationBarToggleButton();
    } else {
        balloonType.showTooltip(event, 'load:' + tBalloon.id + 'Popup', isSticky);
    }
}
 
function makePopupBalloons() {
    var balloons = getElementsByClass(document, 'span', 'deadIslandBalloonPopup');
    for (var x in balloons) {
        // Remove the title attribute from any links inside the hover area
        var balloonLinks = balloons[x].getElementsByTagName('a');
        for (var i = 0; i < balloonLinks.length; i++) balloonLinks[i].setAttribute('title', '');
        // Add class "tt" if it doesn't already have it
        AddClassName(balloons[x], 'tt', true); //if(!hasClass(balloons[x], 'tt')) AddClassName(balloons[x], 'tt', false);
        // Set popup to fire when clicked if clickBalloon is used. Otherwise it fires when hovered.
        //if(hasClass(balloons[x], 'ajaxBalloon')) balloons[x].id = balloons[x].id.replace('\.2F','/');
        if (hasClass(balloons[x], 'clickBalloon')) balloons[x].onclick = function (event) {
            firePopup(event, this);
        };
        else balloons[x].onmouseover = function (event) {
            firePopup(event, this);
        };
        if (hasClass(balloons[x], 'dblclicklinkBalloon')) balloons[x].onDblClick = function (event) {
            window.location.href = 'https://deadisland.wikia.com/index.php?title=' + this.id.replace('\.2F', '/');
        };
    }
}
addOnloadHook(makePopupBalloons);

(function ($) {
    //if (true) return;
    var nthreshold = 1000; //ms. if el visible >= threshold then play
    var nh=[]; //handlers. 1 per span
    var ntimer; //timer 4 comments
 
    function gguid() {
        return ("00000000" + (Math.random()*Math.pow(36,6) << 0).toString(16)).slice(-8);
    }//gguid
 
    function isElementInViewport (el) {
        if (el instanceof jQuery) {
            el = el[0];
        }
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= $(window).height() &&
            rect.right <=  $(window).width()
        );
    }//iselementinviewport
 
    function onVisibilityChange(el, nthr, callback) {
        var old_visible=false;
        return function () {
            if (!$(el).is(':visible')) return;
            var visible = isElementInViewport(el);
            if (visible != old_visible) {
                old_visible = visible;
                if (typeof callback == 'function') {
                    callback(el, nthr);
                }
            }
        };
    }//onvisibilitychange
 
    function nplay(el) {
        //is el visible
        if (!$(el).is(':visible')) return;
        //is el in viewport
        if (!isElementInViewport(el)) return;
        el.data('played', true);
        try {
            el[0].play();
        } catch (e){}
        //play only once. remove handler
        $(window).off('DOMContentLoaded load resize scroll.'+el[0].id);
        return;
    }//nplay
 
    function nqueue(el, nthr) {
        nthr = nthr || nthreshold;
        //if el still visible then el.play
        setTimeout(function(){nplay(el)}, nthr);
    } //nqueue
 
    function ncreatePlayer(el, t, st, ap) {
        //create player.
        //element, type (audio), sourcetype (audio/ogg), additional parameters
        var nuid, k, nthr;
        nuid=gguid();
        ap = ap || '';
        if (el instanceof jQuery) el = el[0];
        el.innerHTML='<' + t +  ' controls="" ' + ap + ' class="n' + t +'" id="' + nuid + '"><source src="' + el.getAttribute("data-widget-id") + '" type="' + st + '">Ваш браузер не поддерживает тэг '+ t + '.</' + t + '>';
        //autoplay only if lazyplay is set
        if ($(el).data('lazyplay') === undefined) return;
        nthr = parseInt($(el).data('lazyplay'), 10);
        if (nthr < 100) nthr = nthreshold;
        k=nh.push(1) - 1;
        nh[k]=onVisibilityChange($('#' + nuid), nthr, nqueue);
        //add handler
        $(window).on('DOMContentLoaded load resize scroll.' + nuid, nh[k]);
    } //ncreatePlayer
 
    function process() {
        var k, nuid;
        var spans = document.getElementsByTagName("span");
        for (var index = 0; index < spans.length; index++) {
            if (spans[index].getAttribute("data-widget-id") && spans[index].getAttribute("class")) {
            outerLoop:
            switch (spans[index].className.split(' ')[0]) {
                case "Imgur":
                    spans[index].innerHTML = '<video controls="" poster="https://images.wikia.nocookie.net/borderlands/ru/images/e/e0/ЗаглушкаGIFV.png" loop preload="none"' + encodeURIComponent(spans[index].getAttribute("data-widget-ap")) + '><source src="http://i.imgur.com/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '.mp4">Ваш браузер не поддерживает тэг video.</video>';
                    break outerLoop;
                case "Others":
                    //spans[index].innerHTML = '<video controls="" poster="https://images.wikia.nocookie.net/borderlands/ru/images/e/e0/ЗаглушкаGIFV.png" loop preload="none"' + encodeURIComponent(spans[index].getAttribute("data-widget-ap")) + '><source src="' + spans[index].getAttribute("data-widget-id") + '">Ваш браузер не поддерживает тэг video.</video>';
                    ncreatePlayer(spans[index], 'video', 'video/mp4', ' poster="https://images.wikia.nocookie.net/borderlands/ru/images/e/e0/ЗаглушкаGIFV.png" loop preload="none" ' + encodeURIComponent(spans[index].getAttribute("data-widget-ap")));
                    break outerLoop;
                case "Ogg":
                    //spans[index].innerHTML = '<audio controls '+ spans[index].getAttribute("data-widget-ap") + '><source src="' + spans[index].getAttribute("data-widget-id") +'" type="audio/ogg">Ваш браузер не поддерживает тэг audio.</audio>';
                    ncreatePlayer(spans[index], 'audio', 'audio/ogg', encodeURIComponent(spans[index].getAttribute("data-widget-ap")));
                    break outerLoop;
                case "MP3":
                    //spans[index].innerHTML = '<audio controls '+ spans[index].getAttribute("data-widget-ap") + '><source src="' + spans[index].getAttribute("data-widget-id") +'" type="audio/mpeg">Ваш браузер не поддерживает тэг audio.</audio>';
                    ncreatePlayer(spans[index], 'audio', 'audio/mp3', encodeURIComponent(spans[index].getAttribute("data-widget-ap")));
                    break outerLoop;
                case "ExilImage":
                    spans[index].innerHTML = '<img class="extimage" src="' + spans[index].getAttribute("data-widget-id") + '" width="' + encodeURIComponent(spans[index].getAttribute("data-widget-w")) + '" height="' + encodeURIComponent(spans[index].getAttribute("data-widget-h")) + '">';
                    break outerLoop;
                default:
                    break outerLoop;
            } //switch
        } //if..outerloop
        } //for spans
    } //process
 
    //doc.ready
    $(function(){
        process(); //process already loaded elements
        //w8 4 comments
        ntimer=setInterval(function() {
            var naComs = 0;
            naComs = $('.article-comments').length || naComs;
            if (naComs > 0) {
                clearInterval(ntimer);
                process();
            }
        }, 3000);
    }); //doc.reay
})(jQuery);

(function ($) {
	//deferred image loader
	//maintainer user:fngplg
	var nbDebug = false;
	var nbCollapseSiblings=true; //group logic
	var nmainClassName = 'ndeferred';
	var ncontentClassName = 'ndcontent';
	var nNamespace=0;
	//var nbaseUri='http://ru.terraria.wikia.com';
	//there is no proxy on ie11
	var niTypes = {
		//types. 1-video; 2-gif; 3-youtube
		avi : 1, //generic video
		bmp : 2,
		flv : 1,
		gif : 2, //generic image
		jpg : 2,
		jpeg : 2,
		mp4 : 1,
		ogg : 4,
		png : 2,
		svg : 2,
		youtube: 3
	};
 
	function nProxy(target) {
		//proxy 4 ie
		var ntarget = target;
		return function (name) {
			if (ntarget && ntarget.hasOwnProperty(name)) {
				return ntarget[name];
			} else {
				return '0';
			}
		};
	} //nProxy
 
	function ngetType(ns) {
		//returns source type
		//1st chck-user defined type
		var t = new nProxy(niTypes);
		var nt1 = new nProxy(ns);
		var nts = nt1('ndlType');
		if (nts !== 0) {
			return t(nts);
		}
		//2nd chk-path
		if (nbDebug) console.log('ndl.gettype.2nd.nt1:' + nt1('ndlPath'));
		nts = nt1('ndlPath').split('.');
		var nt = 0;
		nt = t(nts[nts.length - 1].toLowerCase());
		if (nt !== 0)
			return nt;
		//3rd chck-src name
		if (nbDebug) console.log('ndl.gettype.3rd.nt1:' + nt1('ndlOrigin'));
		nts = nt1('ndlOrigin').split('.');
		nt = t(nts[nts.length - 1].toLowerCase());
		if (nt !== 0)
			return nt;
		return 0; //nothing found
	} //ngetType
 
	function naddImage(npath, ntarget, np) {
		//add img tag
		var nimage = new Image();
		nimage.src = npath;
		if (np.width > 0)
			nimage.width = np.width;
		if (np.height > 0)
			nimage.height = np.height;
		$(nimage).appendTo($(ntarget));
	} //naddImage
 
	function naddVideo(npath, ntarget, np) {
		//add video tag
		var nvideo = document.createElement('video');
		nvideo.controls = true;
		nvideo.preload = "none";
		nvideo.loop = true;
		if (np.width > 0)
			nvideo.width = np.width;
		if (np.height > 0)
			nvideo.height = np.height;
		if (np.poster.length > 20)
			nvideo.poster = np.poster;
		var nsrc = document.createElement('source');
		nsrc.src = npath;
		if (np.srctype && np.srctype.length > 2) nsrc.type=np.srctype;
		nvideo.appendChild(nsrc);
		//$(nsrc).appendTo($(nvideo));
		$(nvideo).appendTo($(ntarget));
		$(nvideo).ready(function () {
			nvideo.play();
			$(ntarget).data('nactive', true);
		});
	} //naddVideo
 
	function naddYoutube(npath, ntarget, np) {
        //add youtube video
        //get video id
        var ns=np.origin.split('v=');
        var nsp='';
        if (ns.length>1) {
            nsp=ns[1];
        } else {
            ns=npath.split('youtu.be/');
            if (ns.length>1) {
                nsp=ns[1];
            } else {
                nsp=np.origin;
            }
        }
        var nyoutube='//www.youtube.com/embed/'+nsp+'?feature=player_embedded&autoplay=1';
        var $nvideo=$('<iframe />', {
            width: (np.width>0)?np.width:200,
            height: (np.height>0)?np.height:200,
            frameborder: 0,
            allowfullscreen: true,
            src: nyoutube
            }).appendTo($(ntarget));
	} //naddYoutube
 
	function nhideSiblings(target) {
        //collapse siblings by ndlGroup
        if (!nbCollapseSiblings) return;
        var nt=new nProxy($(target).data());
        if (nbDebug) console.log('hs '+nt('ndlGroup'));
        if (nt('ndlGroup')===0) return;
        var nv=$('.'+ncontentClassName+'[data-ndl-group="'+nt('ndlGroup')+'"]:visible').not($(target));//.find(':visible');
        $(nv).slideToggle('fast');
        if (nbDebug) console.log('ndl.hs. nv.len:'+$(nv).length);
        if ($(nv).length===0) return;
        try {
            $(nv).find('video').get(0).pause();
        }
        catch (e) {
            if (nbDebug) console.log('ndl.nhideSiblings. e:'+e.name+':'+e.message);
        }
	} //nhideSiblings
 
	function nhandler(e) {
		//if (nbdefLHandler) return;
		//e.preventDefault();
		//e.stopPropagation();
		if (nbDebug) {
            console.log('ndl.handler.e:' + e);
            console.log('ndl.handler.e.target:' + e.target.innerHTML);
            console.log('ndl.handler.e.dtagret:' + e.delegateTarget.innerHTML);
		}
		if (e.target !== e.delegateTarget) return;
		var $ntarget = $(e.delegateTarget).find('.' + ncontentClassName);
		//var $ndata = null;
		//if ($(e.delegateTarget).hasClass(ncontentClassName)) {
            //if (nbDebug) console.log('ndl.handler. target.hasclass(content)=true');
            //$ndata = $(e.delegateTarget).parent('.' + nmainClassName).data();
		//} else {
        var $ndata = $(e.delegateTarget).data();
		//}
		if ($ndata === undefined) {
            return false;
		} else {
            if (nbDebug) console.log('ndl.handler.e.data.len:' + $($ndata).length);
		}
		if ($($ntarget).data('nloaded')) {
			if ($($ntarget).is(':hidden')) {
                nhideSiblings($ntarget);
				//if ((($ntarget).data('itype') == 1) || (($ntarget).data('itype') == 4)) {
				try {
					$($ntarget).find('video').get(0).play();
				}
				catch (e) {
                    if (nbDebug) console.log('ndl.handler.play. e:' + e.name + ':' + e.message);
				}
			} else {
				//if ((($ntarget).data('itype') == 1) || (($ntarget).data('itype') == 4)) {
				try {
					$($ntarget).find('video').get(0).pause();
				}
				catch (e) {
                    if (nbDebug) console.log('ndl.handler.pause. e:' + e.name + ':' + e.message);
				}
			}
			$($ntarget).slideToggle('fast');
			return false;
		}
		nhideSiblings($ntarget);
		$($ntarget).data('nloaded', true);
		$($ntarget).show();
		var nt = $($ntarget).text();
		//data-: ndlPath, ndlOrigin, ndlWidth, ndlHeight, ndlPoster, ndlType
		var nprox = new nProxy($ndata);
		var nipath = nprox('ndlPath');
		nipath = (nipath === 0 ? '' : nipath.trim());
		var np = {
			width : nprox('ndlWidth'),
			height : nprox('ndlHeight'),
			poster : nprox('ndlPoster'),
			srctype : nprox('ndlStype'),
			path : nprox('ndlPath'),
			origin : nprox('ndlOrigin')
		};
		var nst = ngetType($ndata);
		$($ntarget).data('itype', nst);
		//$($ntarget).text(''); //remove settings. deprecated is
		switch (nst) {
		case 1:
			//video
			naddVideo(nipath, $ntarget, np);
			break;
		case 2:
			//image
			naddImage(nipath, $ntarget, np);
			break;
		case 3:
            //youtube
            naddYoutube(nipath, $ntarget, np);
            break;
        case 4:
            //ogg
            np.srctype='video/ogg';
            naddVideo(nipath, $ntarget, np);
            break;
		default:
			//gif by default
			naddImage(nipath, $ntarget, np);
			break;
		}
		return true;
	} //nhandler
 
	function naddHandler() {
		if (nbDebug) {
			//remove prev handler
			console.log('ndl. ah');
			$('.' + nmainClassName + ':not(.' + ncontentClassName + ')').off('click', nhandler);
		}
		if (window.ndlHandler && (nNamespace !== 2) && !nbDebug) return;
		window.ndlHandler=true;
		$('.' + nmainClassName + ':not(.' + ncontentClassName + ')').off('click', nhandler);
		$('.' + nmainClassName + ':not(.' + ncontentClassName + ')').on('click', nhandler);
	} //naddHandler
 
    function nmain() {
        switch (mw.config.get('wgNamespaceNumber')) {
            case 0:
                nNamespace = 2;
                naddHandler(); //article handler
                //comments handler. w8 4 comm
                var ntimer=setInterval(function() {
                    var naComs = $('.article-comments').length || 0;
                    if (naComs > 0) {
                        clearInterval(ntimer);
                        naddHandler();
                    }
                }, 3000);
                break;
            case 1201:
                nNamespace = 1;
                naddHandler();
                break;
            default:
                console.log('ndl.namespace:' + nNamespace);
                naddHandler();
                break;
        }
    } //nmain
 
	$(nmain);
}(jQuery)); //deferred image loader


;(function($, mw) {
    if (!$('#TradingButtonBuyPage').length) {
        return;
    }
 
    $('#TradingButtonBuyPage').append(
        '<div style="text-align: center;">' +
            '<button class="newtradingblockbuypage" style="margin:3px auto;">' +
                'Создать новое объявление' +
            '</button>' +
        '</div>'
    );
 
    var trading_form_buy_page = 
        '<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;">' +
            '<div style="display:none;">' +
                'Никнейм: ' +
                    '<input class="Buyer" style="float:right; width:75%; margin:0 5px;" value="' + wgUserName + '"/>' +
            '</div>' +
            '<div style="margin-top:5px;">' +
                'Что покупаем? ' +
                    '<input class="TradeTextBuyPage" style="float:right; width:75%; margin:0 5px;" placeholder="Скриншоты в виде [[Файл:]] или текст. Списки через \<br \/\>"/>' +
            '</div>' +
            '<div style="margin:5px 0;">' +
                'Цена: ' +
                    '<input class="TradePriceBuyPage" style="float:right; width:75%; margin:0 5px;" placeholder="Пример: {{Coin|g|10}} — 10 золотых монет"/>' +
            '</div>' +
            '<div>' +
                'Контакты: ' +
                    '<input class="TradeContactsBuyPage" style="float:right; width:75%; margin:0 5px;" placeholder="Ваш профиль Steam, страница ВКонтакте, почтовый адрес"/>' +
            '</div>' +
            '<div id="form_result" style="display:none; margin-top:5px; text-align:center; color:red; font-size:bold;">' +
                'Упс! Что-то пошло не так. Пожалуйста, проверьте консоль (F12) за информацией об ошибке и обратитесь к администратору!' +
            '</div>' +
        '</fieldset>'
    ;
    $('.newtradingblockbuypage').click(function() {
        $.showCustomModal('Форма заполнения', trading_form_buy_page, {
            id: 'TradingFormBuyPage',
            width: 550,
            buttons: [{
                message: "Сделать объявление",
                handler: function () {
                    var user_name_buy_page = $('.Buyer').val();
                    if (user_name_buy_page === '') {
                        alert('Введите ник участника!');
                        return;
                    }
 
                    var trade_price_buy_page = (($('.TradePriceBuyPage').val() !== '') ? $('.TradePriceBuyPage').val() : 'Бесплатно.');  
 
                    var trade_contacts_buy_page = (($('.TradeContactsBuyPage').val() !== '') ? $('.TradeContactsBuyPage').val() : 'Не указаны.');   
 
                    trade_text_buy_page = 
                        '\n' + '----' + '\n' +
						'*\'\'\'Никнейм:\'\'\' [[User:' + user_name_buy_page + '|'  + user_name_buy_page + ']]\n' +
                        '*' + $('.TradeTextBuyPage').val() + '\n' +
                        '*\'\'\'Цена:\'\'\' ' + trade_price_buy_page + '\n' +
                        '*\'\'\'Контакты:\'\'\' ' + trade_contacts_buy_page + '\n' +
						'*\'\'\'Подпись:\'\'\' ~~' + '~~\n' +
						'\'\'\'[[Message wall:'  + user_name_buy_page + '|Связаться с покупателем]]\'\'\'\n' +
						'----'
                    ;
					!function( $, mw ) {
						var pagetitle = mw.config.get( 'wgPageName' );
						$.get( '//terraria.fandom.com/ru/index.php', {
							title: pagetitle,
							action: 'raw',
							cb: Math.ceil(new Date().getTime() / 1000),
							}, function( pagetext ) {
								var new_text = pagetext + trade_text_buy_page;
								$.post( '//terraria.fandom.com/ru/api.php', {
									action: 'edit',
									title: pagetitle,
									summary: 'Новое объявление',
									text: new_text,
									token: mw.user.tokens.get('editToken'),
									format: 'json'
									}, function( d ) {
										if ( !d.error ) {
											console.log( 'Отправлено.' );
											$("#TradingFormBuyPage").closeModal();
											location.reload();
											}
											console.log( 'Не отправлено.' );
									});
									});
								}( jQuery, mediaWiki );
							},
						}, {
							message: "Отмена",
							handler: function () {
							$("#TradingFormBuyPage").closeModal();
						}
					}]
				});
			});
})(this.jQuery, this.mediaWiki);

;(function($, mw) {
    if (!$('#TradingButtonSellPage').length) {
        return;
    }
 
    $('#TradingButtonSellPage').append(
        '<div style="text-align: center;">' +
            '<button class="newtradingblocksellpage" style="margin:3px auto;">' +
                'Создать новое объявление' +
            '</button>' +
        '</div>'
    );
 
    var trading_form_sell_page = 
        '<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;">' +
            '<div style="display:none;">' +
                'Никнейм: ' +
                    '<input class="Seller" style="float:right; width:75%; margin:0 5px;" value="' + wgUserName + '"/>' +
            '</div>' +
            '<div style="margin-top:5px;">' +
                'Что продаём? ' +
                    '<input class="TradeTextSellPage" style="float:right; width:75%; margin:0 5px;" placeholder="Скриншоты в виде [[Файл:]] или текст. Списки через \<br \/\>"/>' +
            '</div>' +
            '<div style="margin:5px 0;">' +
                'Цена: ' +
                    '<input class="TradePriceSellPage" style="float:right; width:75%; margin:0 5px;" placeholder="Пример: {{Coin|g|10}} — 10 золотых монет"/>' +
            '</div>' +
            '<div>' +
                'Контакты: ' +
                    '<input class="TradeContactsSellPage" style="float:right; width:75%; margin:0 5px;" placeholder="Ваш профиль Steam, страница ВКонтакте, почтовый адрес"/>' +
            '</div>' +
            '<div id="form_result" style="display:none; margin-top:5px; text-align:center; color:red; font-size:bold;">' +
                'Упс! Что-то пошло не так. Пожалуйста, проверьте консоль (F12) за информацией об ошибке и обратитесь к администратору!' +
            '</div>' +
        '</fieldset>'
    ;
    $('.newtradingblocksellpage').click(function() {
        $.showCustomModal('Форма заполнения', trading_form_sell_page, {
            id: 'TradingFormSellPage',
            width: 550,
            buttons: [{
                message: "Сделать объявление",
                handler: function () {
                    var user_name_sell_page = $('.Seller').val();
                    if (user_name_sell_page === '') {
                        alert('Введите ник участника!');
                        return;
                    }
 
                    var trade_price_sell_page = (($('.TradePriceSellPage').val() !== '') ? $('.TradePriceSellPage').val() : 'Бесплатно.');  
 
                    var trade_contacts_sell_page = (($('.TradeContactsSellPage').val() !== '') ? $('.TradeContactsSellPage').val() : 'Не указаны.');   
 
                    trade_text_sell_page = 
                        '\n' + '----' + '\n' +
						'*\'\'\'Никнейм:\'\'\' [[User:' + user_name_sell_page + '|'  + user_name_sell_page + ']]\n' +
                        '*' + $('.TradeTextSellPage').val() + '\n' +
                        '*\'\'\'Цена:\'\'\' ' + trade_price_sell_page + '\n' +
                        '*\'\'\'Контакты:\'\'\' ' + trade_contacts_sell_page + '\n' +
						'*\'\'\'Подпись:\'\'\' ~~' + '~~\n' +
						'\'\'\'[[Message wall:'  + user_name_sell_page + '|Связаться с продавцом]]\'\'\'\n' +
						'----'
                    ;
					!function( $, mw ) {
						var pagetitle = mw.config.get( 'wgPageName' );
						$.get( '//terraria.fandom.com/ru/index.php', {
							title: pagetitle,
							action: 'raw',
							cb: Math.ceil(new Date().getTime() / 1000),
							}, function( pagetext ) {
								var new_text = pagetext + trade_text_sell_page;
								$.post( '//terraria.fandom.com/ru/api.php', {
									action: 'edit',
									title: pagetitle,
									summary: 'Новое объявление',
									text: new_text,
									token: mw.user.tokens.get('editToken'),
									format: 'json'
									}, function( d ) {
										if ( !d.error ) {
											console.log( 'Отправлено.' );
											$("#TradingFormSellPage").closeModal();
											location.reload();
											}
											console.log( 'Не отправлено.' );
									});
									});
								}( jQuery, mediaWiki );
							},
						}, {
							message: "Отмена",
							handler: function () {
							$("#TradingFormSellPage").closeModal();
						}
					}]
				});
			});
})(this.jQuery, this.mediaWiki);

;(function($, mw) {
    if (!$('#ServersPageButton').length) {
        return;
    }
 
    $('#ServersPageButton').append(
        '<div style="text-align: center;">' +
            '<button class="newserverblock" style="margin:3px auto;">' +
                'Создать новое объявление' +
            '</button>' +
        '</div>'
    );
 
    var new_server_form = 
        '<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;">' +
            '<div style="display:none;">' +
                'Никнейм: ' +
                    '<input class="NewServerNickname" style="float:right; width:75%; margin:0 5px;" value="' + wgUserName + '"/>' +
            '</div>' +
            '<div style="margin-top:5px;">' +
                'Причина поиска: ' +
                    '<input class="NewServerSearchReason" style="float:right; width:75%; margin:0 5px;" placeholder="Убийство боссов, прохождение событий, поиск компаньонов"/>' +
            '</div>' +
            '<div style="margin:5px 0;">' +
                'Режим эксперта? ' +
                    '<input class="NewServerIsExpert" style="float:right; width:75%; margin:0 5px;"/>' +
            '</div>' +
            '<div style="margin:5px 0;">' +
                'Необходимые моды: ' +
                    '<input class="NewServerRequiredMods" style="float:right; width:75%; margin:0 5px;" value="Нет"/>' +
            '</div>' +
            '<div style="margin:5px 0;">' +
                'Тип издания: ' +
                    '<input class="NewServerPublicationType" style="float:right; width:75%; margin:0 5px;" placeholder="Лицензия/пиратка с/без Hamachi"/>' +
            '</div>' +
            '<div style="margin:5px 0;">' +
                'Версия: ' +
                    '<input class="NewServerVersion" style="float:right; width:75%; margin:0 5px;"/>' +
            '</div>' +
            '<div style="margin:5px 0;">' +
                'Связь: ' +
                    '<input class="NewServerCommunications" style="float:right; width:75%; margin:0 5px;" placeholder="Да/нет, ваши Skype/Teamspeak/Discord"/>' +
            '</div>' +
            '<div style="margin:5px 0;">' +
                'Контакты: ' +
                    '<input class="NewServerContacts" style="float:right; width:75%; margin:0 5px;" placeholder="Ваш профиль Steam, страница ВКонтакте, почтовый адрес"/>' +
            '</div>' +
            '<div style="margin:5px 0;">' +
                'Доп. информация: ' +
                    '<input class="NewServerMoreInfo" style="float:right; width:75%; margin:0 5px;"/>' +
            '</div>' +
            '<div id="form_result" style="display:none; margin-top:5px; text-align:center; color:red; font-size:bold;">' +
                'Упс! Что-то пошло не так. Пожалуйста, проверьте консоль (F12) за информацией об ошибке и обратитесь к администратору!' +
            '</div>' +
        '</fieldset>'
    ;
    $('.newserverblock').click(function() {
        $.showCustomModal('Форма заполнения', new_server_form, {
            id: 'NewServerForm',
            width: 600,
            buttons: [{
                message: "Сделать объявление",
                handler: function () {
                    var new_server_nickname = $('.NewServerNickname').val();
                    if (new_server_nickname === '') {
                        alert('Введите ник участника!');
                        return;
                    }
					
                    var new_server_is_expert = $('.NewServerIsExpert').val();
					
                    var new_server_required_mods = $('.NewServerRequiredMods').val();
					
                    var new_server_publication_type = $('.NewServerPublicationType').val();
					
                    var new_server_version = $('.NewServerVersion').val();
					
                    var new_server_communications = $('.NewServerCommunications').val();
					
                    var new_server_contacts = $('.NewServerContacts').val();
					
                    var new_server_more_info = $('.NewServerMoreInfo').val();
 
                    new_server_block = 
                        '\n' + '----' + '\n' +
						'*\'\'\'Никнейм:\'\'\' [[User:' + new_server_nickname + '|'  + new_server_nickname + ']]\n' +
                        '*' + $('.NewServerSearchReason').val() + '\n' +
                        '*\'\'\'Режим эксперта?\'\'\' ' + new_server_is_expert + '\n' +
                        '*\'\'\'Необходимые моды:\'\'\' ' + new_server_required_mods + '\n' +
                        '*\'\'\'Тип издания:\'\'\' ' + new_server_publication_type + '\n' +
                        '*\'\'\'Версия:\'\'\' ' + new_server_version + '\n' +
                        '*\'\'\'Связь:\'\'\' ' + new_server_communications + '\n' +
                        '*\'\'\'Контакты:\'\'\' ' + new_server_contacts + '\n' +
                        '*\'\'\'Доп. информация:\'\'\' ' + new_server_more_info + '\n' +
						'*\'\'\'Подпись:\'\'\' ~~' + '~~\n' +
						'----'
                    ;
					!function( $, mw ) {
						var pagetitle = mw.config.get( 'wgPageName' );
						$.get( '//terraria.fandom.com/ru/index.php', {
							title: pagetitle,
							action: 'raw',
							cb: Math.ceil(new Date().getTime() / 1000),
							}, function( pagetext ) {
								var new_text = pagetext + new_server_block;
								$.post( '//terraria.fandom.com/ru/api.php', {
									action: 'edit',
									title: pagetitle,
									summary: 'Новое объявление',
									text: new_text,
									token: mw.user.tokens.get('editToken'),
									format: 'json'
									}, function( d ) {
										if ( !d.error ) {
											console.log( 'Отправлено.' );
											$("#NewServerForm").closeModal();
											location.reload();
											}
											console.log( 'Не отправлено.' );
									});
									});
								}( jQuery, mediaWiki );
							},
						}, {
							message: "Отмена",
							handler: function () {
							$("#NewServerForm").closeModal();
						}
					}]
				});
			});
})(this.jQuery, this.mediaWiki);

/*Скрипт альтернативного виджета дискорда*/
/*Автор скрипта: Сибирский Смотритель*/
(function () {
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/guilds/320066684465709056/widget.json";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.responseText);
            setupModule(data);
        }
    };
    request.open("GET", discordJSON, true);
    request.send();
}
 
function setupModule(data) {
    console.log("Building module...");
    var $module = 
    $('<section class="ChatModule module">' +
        '<table>' +
            '<tbody>' +
                '<tr>' +
                    '<td style="vertical-align:middle; width:100%;">' +
                        '<p class="chat-name">' +
                            '<a href="https://ru.wikipedia.org/wiki/Discord" target="_blank">Discord</a> – бесплатный мессенджер для публичного общения вне Фэндома. <b>Подробнее <a href="http://ru.wikies.wikia.com/wiki/%D0%92%D0%92:D" target="_blank">тут</a></b>' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Discord" src="https://discordapp.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg" class="discord-icon">' +
                            '<span>В сети: <span id="discord-counter">?</span></span>' +
                            '<button class="discord-joined">Войти в чат</button>' +
                        '</center>' +
                      '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<hr/>' +
                        '<h4 class="discord-users-online">Пользователи онлайн <div class="discord-chevron"></div></h4>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<ul class="discord-list"></ul>' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>' +
    '</section>');
 
    $module.find('.discord-joined').attr('onclick', "window.open('" + data.instant_invite + "','_blank')");
    $module.find('#discord-counter').text(data.members.length);
 
    data.members.forEach(function (v) {
        var $member = $('<li class="discord-member">' +
            '<div class="discord-avatar">' +
                '<img />' +
            '</div>' +
        '</li>');
        $member.append(v.username + (v.bot ? ' <span class="discord-bot">BOT</span>' : ''));
        $member.find('.discord-avatar').addClass("discord-" + v.status);
        $member.find('img').attr("src", v.avatar_url);
 
        $module.find(".discord-list").append($member);
    });
 
    var toggle      = $module.find('.discord-chevron'),
        collapsible = $module.find('.discord-list');
 
    collapsible.hide();
    toggle.click(function() {
        if ( !toggle.hasClass('opened') ) {
            collapsible.slideDown();
            toggle.addClass('opened');
        } else {
            collapsible.slideUp();
            toggle.removeClass('opened');
        }  
    });
 
    $('#WikiaRail').prepend($module);
    console.log("Discord module has currently loaded");
}
 
})();