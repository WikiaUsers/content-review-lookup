var	ajaxIndicator = 'http://www.preloaders.net/generator.php?image=136&speed=5&fore_color=F50A0A&back_color=CEBE8A&size=128x16&transparency=1&reverse=0&orig_colors=0&gray_transp=0&image_type=1&inverse=0&flip=0&frames_amount=11&uncacher=29.393416619859636',
	ajaxTimer,
	ajaxRefresh = 60000,
	refreshText = 'Auto-refresh',
	refreshHover = 'Enable auto-refresh',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = new Array ("Special:RecentChanges", "Special:WikiActivity", "Special:NewFiles");
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
 
/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
 
/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" )
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1; 
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		} 
	}
	return "";
}
 
/**
 * Main function to start the Auto-refresh process
 */
function preloadAJAXRL() {
   var ajaxRLCookie = (getCookie("ajaxload-" + wgPageName) == "on") ? true : false;
   var appTo = ($('#WikiaPageHeader').length ) ? $('#WikiaPageHeader > h1') : $('.firstHeading');
 
   appTo.append('&#160;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="vertical-align: baseline;" border="0" alt="Refreshing page" /></span></span>');
 
   $('#ajaxLoadProgress').ajaxSend(function(event, xhr, settings) {
      if (location.href == settings.url) {
         $(this).show();
      }
   } ).ajaxComplete(function(event, xhr, settings) {
      if (location.href == settings.url) {
         $(this).hide();
         for(i in ajaxCallAgain) {
            ajaxCallAgain[i]();
         }
      }
   } );
 
   $('#ajaxToggle').click(toggleAjaxReload).attr('checked', ajaxRLCookie);
 
   if (getCookie("ajaxload-" + wgPageName) == "on") {
      loadPageData();
   }
}
 
/**
 * Turn refresh on and off by toggling the checkbox
 */
function toggleAjaxReload() {
	if ( $( '#ajaxToggle' ).prop( 'checked' ) == true ) {
		setCookie( "ajaxload-" + wgPageName, "on", 30 );
		doRefresh = true;
		loadPageData();
	} else {
		setCookie( "ajaxload-" + wgPageName, "off", 30 );
		doRefresh = false;
		clearTimeout( ajaxTimer );
	}
}
 
/**
 * Does the actual refresh
 */
function loadPageData() {
	var cC = ( $( '#WikiaArticle' ).length ) ? '#WikiaArticle' : '#bodyContent';
	$( cC ).load( location.href + " " + cC, function ( data ) {
		if ( doRefresh ) {
			ajaxTimer = setTimeout( "loadPageData();", ajaxRefresh );
		}
	} );
}
 
/**
 * Load the script on specific pages
 */
$( function () { 
	for ( x in ajaxPages ) {
		if ( wgPageName == ajaxPages[x] && $( '#ajaxToggle' ).length === 0 ) {
			preloadAJAXRL();
		}
	}
} );

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
            // English
            en: {
                show: "show",
                hide: "hide",
                showAll: "show all",
                hideAll: "hide all"
            },
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

importScriptPage('Countdown/code.js', 'dev');