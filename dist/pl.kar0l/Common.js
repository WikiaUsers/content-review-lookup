/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/*<source lang="javascript">*/
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
(function($) {

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
		},
		// Polish
		pl: {
			show: "Pokaż",
			hide: "Ukryj",
			showAll: "Pokaż wszystko",
			hideAll: "Ukryj wszystko"
		},
		// Russian
		ru: {
			show: "Открыть",
			hide: "Скрыть",
			showAll: "Открыть все",
			hideAll: "Скрыть все"
		}
		// Make a post on the talkpage if you have i18n updates
	}, window.ShowHideConfig || {});

	// i18n function
	function msg(name) {
		if ( config.userLang && wgUserLanguage in config && name in config[wgUserLanguage] ) {
			return config[wgUserLanguage][name]; }
		if ( wgContentLanguage in config && name in config[wgContentLanguage] ) {
			return config[wgContentLanguage][name]; }
		return config.en[name];
	}
	
	// common
	$.fn.onLink = function(fn) {
		return this.bind('click keypress', function(e) {
			if ( e.type === 'click' || ( e.type === 'keypress' && ( e.keyCode === 13 || e.charCode === 32 ) ) ) {
				fn.call(this, e); }
		});
	};

	/** Collapsible tables using jQuery
	 *
	 *  Description: Allows tables to be collapsed, showing only the header.
	 */
	function collapseTable( node, state ) {
		var $table = $(node);
		var $button = $table.find("tr:first > th:first .collapseLink");
	
		if (!$table.length || !$button.length) {
			return false;
		}
		
		if ( typeof state === 'boolean' ) {
			$table.toggleClass('collapsed', !state);
		}
		else {
			$table.toggleClass('collapsed');
		}
		var hidden = $table.hasClass('collapsed');
		$table.find('> * > tr:not(:first):not(.nocollapse)')[hidden?"hide":"show"]();
		$button.text( msg( hidden ? "show" : "hide" ) );
		return true;
	}

	function createCollapseButtons() {
		var NavigationBoxes = [];
		$("table.collapsible").each(function() {
			NavigationBoxes.push(this);
			var $buttonLink = $('<span tabIndex=0 class=collapseLink />').text( msg("hide") ).css({ cursor: "pointer" }).onLink(function(e) { collapseTable( $(this).closest('table') ); });
			var $button = $("<span class=collapseButton />").css({
				"float": "right",
				textAlign: "right",
				fontWeight: "normal",
				width: "6em",
				marginLeft: "-100%"
			});
			$button.append( document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, config.brackets.substr(config.brackets.length/2) );

			var $header = $(this).find('tr:first > th:first').prepend($button);
		});
	
		// if more Navigation Bars found than Default: hide all
		if ($(NavigationBoxes).filter('.autocollapse').length >= config.autoCollapse) {
			$(NavigationBoxes).filter('.autocollapse').each(function() { collapseTable( this, false ); });
		}
		else {
			$(NavigationBoxes).filter('.collapsed').each(function() { collapseTable( this, false ); });
		}
	}

	$( createCollapseButtons );

	/*</pre>*/

	/*<pre>*/

	/** Dynamic Navigation Bars with jQuery
	 *
	 *  Base Description: See Wikipedia:Wikipedia:NavFrame.
	 */

	// shows and hides content and picture (if available) of navigation bars
	function toggleNavigationBar( node ) {
		var $navFrame = $(node);
		var $navToggle = $navFrame.find(".NavHead:first .collapseLink");
	
		if (!$navFrame.length || !$navToggle.length) {
			return false;
		}
	
		$navFrame.toggleClass('NavVisible');
		$navFrame.find('.NavPic, .NavContent').not($navFrame.find('.NavFrame .NavPic, .NavFrame .NavContent')).slideToggle();
		$navToggle.text( msg( $navFrame.hasClass('NavVisible') ? "hide" : "show" ) );
		return true;
	}

	// adds show/hide-button to navigation bars
	function createNavigationBarToggleButton() {
		var NavFrames = $('.NavFrame').addClass('NavVisible').each(function() {
			var $navHead = $(this).find('.NavHead:first');
			$navHead.filter('legend').append(' - ');
			var $buttonLink = $('<span tabIndex=0 class=collapseLink />').text( msg("hide") ).onLink(function(e) { toggleNavigationBar( $(this).closest('.NavFrame') ); });
			var $button = $('<span class="NavToggle collapseButton" />');
			if ( config.brackets ) {
				$button.append( document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, config.brackets.substr(config.brackets.length/2) );
			}
			else {
				$button.append( $buttonLink );
			}
			$navHead[config.linkBefore?"prepend":"append"]($button);
		});
		// if more Navigation Bars found than Default: hide all
		if (NavFrames.length >= config.autoCollapse) {
			NavFrames.not('.noautocollapse').each(function() { toggleNavigationBar(this); });
		}
		else {
			NavFrames.filter('.collapsed').each(function() { toggleNavigationBar(this); });
		}
		return true;
	}

	$( createNavigationBarToggleButton );

	$(function() {
		$('.NavGlobal').each(function() {
			$('<span class=NavGlobalShow />').append(
				document.createTextNode('['),
				$('<span tabIndex=0 class=collapseLink />').text( msg("showAll") ).onLink(function(e) {
					$('.NavFrame').each(function() { if ( !$(this).hasClass('NavVisible') ) toggleNavigationBar(this); });
				}),
				']'
			).appendTo(this);
			$(this).append(' ');
			$('<span class=NavGlobalHide />').append(
				document.createTextNode('['),
				$('<span tabIndex=0 class=collapseLink />').text( msg("hideAll") ).onLink(function(e) {
					$('.NavFrame').each(function() { if ( $(this).hasClass('NavVisible') ) toggleNavigationBar(this); });
				}),
				']'
			).appendTo(this);
		});
	});
	
})(jQuery);
/*</source>*/
// <syntax type="javascript">

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

// </syntax>

/** Zmiana tytułu */
/*jshint browser:true jquery:true */
 
jQuery(function($) {
	"use strict";
	$('.changePageTitle').eq(0).each(function() {
		var $h1 = $('.WikiaPageHeader h1, h1#firstHeading').eq(0);
		$h1.prop('title', $h1.text()).empty().append(this.childNodes);
	}).end()
	.remove();
});
 
//