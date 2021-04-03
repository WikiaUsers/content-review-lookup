/* Any JavaScript here will be loaded for all users on every page load. */

*/
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
/* This is a modify version of http://dev.wikia.com/ShowHide/code.js */
(function($) {
 
	// CONFIG
	var config = window.ShowHideConfig = $.extend(true, {
		autoCollapse: 2,
		userLang: true,
		brackets: '[]',
		// English
		en: {
			show: "show",
			hide: "hide",
			showAll: "show all",
			hideAll: "hide all"
		}
		// Make a post on the talkpage if you have i18n updates
	}, window.ShowHideConfig || {});
 
	// i18n function
	function msg(name) {
		if ( config.userLang && wgUserLanguage in config && name in config[wgUserLanguage] )
			return config[wgUserLanguage][name];
		if ( wgContentLanguage in config && name in config[wgContentLanguage] )
			return config[wgContentLanguage][name];
		return config.en[name];
	}
 
	// common
	$.fn.onLink = function(fn) {
		return this.bind('click keypress', function(e) {
			if ( e.type === 'click' || ( e.type === 'keypress' && ( e.keyCode === 13 || e.charCode === 32 ) ) )
				fn.call(this, e);
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
 
		if ( typeof state === 'boolean' )
			$table.toggleClass('collapsed', !state);
		else
			$table.toggleClass('collapsed');
 
		var hidden = $table.hasClass('collapsed');
		$table.find('> * > tr:not(:first):not(.nocollapse)')[hidden?"hide":"show"]();
		$button.text( msg( hidden ? "show" : "hide" ) );
	}
 
	function createCollapseButtons() {
		var NavigationBoxes = [];
		$("table.collapsible").each(function() {
			NavigationBoxes.push(this);
			var $buttonLink = $('<span tabIndex=0 class=collapseLink />').text( msg("hide") )
				.onLink(function(e) { collapseTable( $(this).closest('table') ); });
			var $button = $("<span class=collapseButton />").css({
				float: "right",
				textAlign: "right",
				fontWeight: "normal",
				width: "6em",
				marginLeft: "-100%"
			});
			$button.append( document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, config.brackets.substr(config.brackets.length/2) );
 
			var $header = $(this).find('tr:first > th:first').prepend($button);
		});
 
		// if more Navigation Bars found than Default: hide all
		if ($(NavigationBoxes).filter('.autocollapse').length >= config.autoCollapse)
			$(NavigationBoxes).filter('.autocollapse').each(function() { collapseTable( this, false ); });
		else
			$(NavigationBoxes).filter('.collapsed').each(function() { collapseTable( this, false ); });
	}
 
	$( createCollapseButtons );
 
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
	}
 
	// adds show/hide-button to navigation bars
	function createNavigationBarToggleButton() {
		var NavFrames = $('.NavFrame').addClass('NavVisible').each(function() {
			var $navHead = $(this).find('.NavHead:first');
			$navHead.filter('legend').append(' - ');
			var $buttonLink = $('<span tabIndex=0 class=collapseLink />').text( msg("hide") )
				.onLink(function(e) { toggleNavigationBar( $(this).closest('.NavFrame') ); });
			var $button = $('<span class="NavToggle collapseButton" />')
 
			$button.append( document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, document.createTextNode(config.brackets.substr(config.brackets.length/2)) );
			$navHead.prepend( $button );
 
			});
		// if more Navigation Bars found than Default: hide all
		if (NavFrames.length >= config.autoCollapse)
			NavFrames.not('.noautocollapse').each(function() { toggleNavigationBar(this); });
		else
			NavFrames.filter('.collapsed').each(function() { toggleNavigationBar(this); });
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
/*

var ShowHideConfig = { autoCollapse: Infinity };
importScriptPage('ShowHide/code.js', 'dev');