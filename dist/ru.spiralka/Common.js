/*importScriptPage('ShowHide/code.js', 'dev');*/

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
( function( $ ) {
 
	// CONFIG
	var config = window.ShowHideConfig = $.extend( true, {
		autoCollapse: 0,
		userLang: true,
		brackets: '[]',
		linkBefore: false,
		// Bulgarian
		bg: {
			show: "Покажи",
			hide: "Скрий",
			showAll: "Покажи всички",
			hideAll: "Скрий всички"
		},
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
			show: "afficher",
			hide: "masquer",
			showAll: "tout afficher",
			hideAll: "tout masquer"
		},
		// Hungarian
		hu: {
			show: "kibontás",
			hide: "elrejtés",
			showAll: "összes kibontása",
			hideAll: "összes elrejtése"
		},
		// Italian
		it: {
			show: "Mostra",
			hide: "Nascondi",
			showAll: "Mostra tutti",
			hideAll: "Nascondi tutti"
		},
		// Japanese
		ja: {
			show: "表示",
			hide: "非表示",
			showAll: "すべて表示",
			hideAll: "すべて非表示"
		},
		// Korean
		ko: {
			show: "보이기",
			hide: "숨기기",
			showAll: "모두 보이기",
			hideAll: "모두 숨기기"
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
		// Portuguese
		pt: {
			show: "Mostrar",
			hide: "Esconder",
			showAll: "Expandir Todos",
			hideAll: "Esconder Todos"
		},
		// Brazilian Portuguese
		'pt-br': {
			show: "Mostrar",
			hide: "Esconder",
			showAll: "Expandir Todos",
			hideAll: "Esconder Todos"
		},
		// Russian
		ru: {
			show: "Показать все",
			hide: "Скрыть все",
			showAll: "Открыть все",
			hideAll: "Скрыть все"
		},
		// Vietnamese
		vi: {
			show: "hiện",
			hide: "ẩn",
			showAll: "hiện tất cả",
			hideAll: "ẩn tất cả"
		},
		// Chinese
		zh: {
			show: "显示",
			hide: "隐藏",
			showAll: "全部显示",
			hideAll: "全部隐藏"
		}
		// Make a post on the talkpage if you have i18n updates
	}, window.ShowHideConfig || {} );
 
	// i18n function
	function msg( name ) {
		if ( config.userLang && wgUserLanguage in config && name in config[wgUserLanguage] ) {
			return config[wgUserLanguage][name];
		}
		if ( wgContentLanguage in config && name in config[wgContentLanguage] ) {
			return config[wgContentLanguage][name];
		}
		return config.en[name];
	}
 
	// common
	$.fn.onLink = function( fn ) {
		return this.bind( 'click keypress', function(e) {
			if ( e.type === 'click' || ( e.type === 'keypress' && ( e.keyCode === 13 || e.charCode === 32 ) ) ) {
				fn.call(this, e);
			}
		} );
	};
 
	/** Collapsible tables using jQuery
	 *
	 *  Description: Allows tables to be collapsed, showing only the header.
	 */
	function collapseTable( node, state ) {
		var	$table = $( node ),
			$button = $table.find( 'tr:first > th:last .collapseLink' );
 
		if ( !$table.length || !$button.length ) {
			return false;
		}
 
		if ( typeof state === 'boolean' ) {
			$table.toggleClass( 'collapsed', !state );
		} else {
			$table.toggleClass( 'collapsed' );
		}
		var hidden = $table.hasClass( 'collapsed' );
		$table.find( '> * > tr' ).not( ':first, .nocollapse' )[hidden?"hide":"show"]();
		$button.text( msg( hidden ? "show" : "hide" ) );
		return true;
	}
 
	function createCollapseButtons() {
		var NavigationBoxes = [];
		$( 'table.collapsible' ).each( function () {
			NavigationBoxes.push(this);
			var	$buttonLink = $( '<span tabIndex=0 class=collapseLink />' ).text( msg( "hide" ) ).css({ cursor: "pointer" }).onLink( function( e ) { collapseTable( $(this).closest('table') ); } ),
				$button = $( "<span class=collapseButton />" ).css( {
				"float": "right",
				textAlign: "right",
				fontWeight: "normal",
				width: "7em",
				marginLeft: "-100%"
			} );
			$button.append( document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, config.brackets.substr(config.brackets.length/2) );
 
			var $header = $( this ).find( 'tr:first > th:last' ).prepend($button);
		} );
 
		// if more Navigation Bars found than Default: hide all
		if ( $( NavigationBoxes ).filter( '.autocollapse' ).length >= config.autoCollapse ) {
			$( NavigationBoxes ).filter( '.autocollapse' ).each( function () { collapseTable( this, false ); } );
		}
		$( NavigationBoxes ).filter( '.collapsed' ).each( function () { collapseTable( this, false ); } );
	}
 
	$( createCollapseButtons );
 
	/** Dynamic Navigation Bars with jQuery
	 *
	 *  Base Description: See Wikipedia:Wikipedia:NavFrame.
	 */
 
	// shows and hides content and picture (if available) of navigation bars
	function toggleNavigationBar( node ) {
		var	$navFrame = $( node ),
			$navToggle = $navFrame.find( '.NavHead:first .collapseLink' );
 
		if ( !$navFrame.length || !$navToggle.length ) {
			return false;
		}
 
		$navFrame.toggleClass( 'NavVisible' );
		$navFrame.find( '.NavPic, .NavContent' ).not( $navFrame.find( '.NavFrame .NavPic' ) ).not( $navFrame.find( '.NavFrame .NavContent' ) ).slideToggle();
		$navToggle.text( msg( $navFrame.hasClass( 'NavVisible' ) ? "hide" : "show" ) );
		return true;
	}
 
	// adds show/hide-button to navigation bars
	function createNavigationBarToggleButton() {
		var NavFrames = $( '.NavFrame' ).addClass( 'NavVisible' ).each( function () {
			var	$navHead = $( this ).find( '.NavHead:first' ),
				$buttonLink = $( '<span tabIndex=0 class=collapseLink />' ).text( msg( "hide" ) ).onLink( function ( e ) { toggleNavigationBar( $( this ).closest( '.NavFrame' ) ); } ),
				$button = $( '<span class="NavToggle collapseButton" />' );
			$navHead.filter( 'legend' ).append( ' - ' );
			if ( config.brackets ) {
				$button.append( document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, config.brackets.substr(config.brackets.length/2) );
			} else {
				$button.append( $buttonLink );
			}
			$navHead[config.linkBefore?"prepend":"append"]($button);
		} );
		// if more Navigation Bars found than Default: hide all
		if ( NavFrames.length >= config.autoCollapse ) {
			NavFrames.not( '.noautocollapse' ).each( function () { toggleNavigationBar(this); } );
		} else {
			NavFrames.filter( '.collapsed' ).each( function () { toggleNavigationBar(this); } );
		}
		return true;
	}
 
	$( createNavigationBarToggleButton );
 
	$( function () {
		$( '.NavGlobal' ).each( function () {
			$( '<span class=NavGlobalShow />' ).append(
				document.createTextNode( '[' ),
				$( '<span tabIndex=0 class=collapseLink />' ).text( msg( "showAll" ) ).onLink( function ( e ) {
					$( '.NavFrame' ).each( function () { if ( !$( this ).hasClass( 'NavVisible' ) ) toggleNavigationBar(this); } );
				} ),
				']'
			).appendTo( this );
			$( this ).append( ' ' );
			$('<span class=NavGlobalHide />').append(
				document.createTextNode( '[' ),
				$( '<span tabIndex=0 class=collapseLink />' ).text( msg( "hideAll" ) ).onLink( function ( e ) {
					$( '.NavFrame' ).each( function () { if ( $( this ).hasClass( 'NavVisible' ) ) toggleNavigationBar(this); } );
				} ),
				']'
			).appendTo( this );
		} );
	} );
 
} )( jQuery );


/* idTabs ~ Sean Catchpole - Version 2.2 - MIT/GPL */
(function(){var dep={"jQuery":"http://code.jquery.com/jquery-latest.min.js"};var init=function(){(function($){$.fn.idTabs=function(){var s={};for(var i=0;i<arguments.length;++i){var a=arguments[i];switch(a.constructor){case Object:$.extend(s,a);break;case Boolean:s.change=a;break;case Number:s.start=a;break;case Function:s.click=a;break;case String:if(a.charAt(0)=='.')s.selected=a;else if(a.charAt(0)=='!')s.event=a;else s.start=a;break;}}
if(typeof s['return']=="function")
s.change=s['return'];return this.each(function(){$.idTabs(this,s);});}
$.idTabs=function(tabs,options){var meta=($.metadata)?$(tabs).metadata():{};var s=$.extend({},$.idTabs.settings,meta,options);if(s.selected.charAt(0)=='.')s.selected=s.selected.substr(1);if(s.event.charAt(0)=='!')s.event=s.event.substr(1);if(s.start==null)s.start=-1;var showId=function(){if($(this).is('.'+s.selected))return s.change;var id="#"+this.href.split('#')[1];var aList=[];var idList=[];$("a",tabs).each(function(){if(this.href.match(/#/)){aList.push(this);idList.push("#"+this.href.split('#')[1]);}});if(s.click&&!s.click.apply(this,[id,idList,tabs,s]))return s.change;for(i in aList)$(aList[i]).removeClass(s.selected);for(i in idList)$(idList[i]).hide();$(this).addClass(s.selected);$(id).show();window.dispatchEvent(new CustomEvent('scroll'));return s.change;}
var list=$("a[href*='#']",tabs).unbind(s.event,showId).bind(s.event,showId);list.each(function(){$("#"+this.href.split('#')[1]).hide();});var test=false;if((test=list.filter('.'+s.selected)).length);else if(typeof s.start=="number"&&(test=list.eq(s.start)).length);else if(typeof s.start=="string"&&(test=list.filter("[href*='#"+s.start+"']")).length);if(test){test.removeClass(s.selected);test.trigger(s.event);}return s;}
$.idTabs.settings={start:0,change:false,click:null,selected:".selected",event:"!click"};$.idTabs.version="2.2";$(function(){$(".idTabs").idTabs();});})(jQuery);}
var check=function(o,s){s=s.split('.');while(o&&s.length)o=o[s.shift()];return o;}
var head=document.getElementsByTagName("head")[0];var add=function(url){var s=document.createElement("script");s.type="text/javascript";s.src=url;head.appendChild(s);}
var s=document.getElementsByTagName('script');var src=s[s.length-1].src;var ok=true;for(d in dep){if(check(this,d))continue;ok=false;add(dep[d]);}if(ok)
return init();add(src);})();

// Наверх
//Created by Noemon from Dead Space Wiki
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:0px; border:none;"><button type="button" value="Наверх" onClick="goToTop();">Наверх</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication
 
// Кто?
if (wgUserName == null) {
$('.show-username').html("<img src='https://images.wikia.nocookie.net/__cb20140401183846/spiralka/ru/images/9/98/SayNo2Ad.png'/>");
}
 

// Меню главной
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    window.dispatchEvent(new CustomEvent('scroll'));
    var $tabs = $("#menu-portal_slider").tabs({
        fx: {
            opacity: 'toggle',
            duration: 100
        }
    });
    $("[class^=menu-portal_sliderlink]").click(function() { // bind click event to link
        window.dispatchEvent(new CustomEvent('scroll'));
        $tabs.tabs('select', this.className.replace("menu-portal_sliderlink_", ""));
        window.dispatchEvent(new CustomEvent('scroll'));
        return false;
    });
    $('#menu-portal_next').click(function() {
        $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
        window.dispatchEvent(new CustomEvent('scroll'));
        return false;
    });
    $('#menu-portal_prev').click(function() { // bind click event to link
        $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
        window.dispatchEvent(new CustomEvent('scroll'));
        return false;
    });
});


// Меню миссий
mw.loader.using( ['jquery.ui.tabs'], function() {
    window.dispatchEvent(new CustomEvent('scroll'));
$(document).ready(function() {
    window.dispatchEvent(new CustomEvent('scroll'));
$('.factions img').hide(); 	$('.factions img').removeAttr('width').removeAttr('height'); 	var l=$('.factions tr').eq(1).find('td').height(); 	$('.factions tr').eq(1).find('img').css('max-height', l); 	$('.factions img').show(); 	if ($('.factions tr').eq(1).find('td').width()>=$('.factions img').width()) { 		$('.factions tr').eq(1).find('td').width($('.factions img').width()); 	}
  $('.id_upper').each(function() { $(this).html($(this).html().toUpperCase()); });
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    window.dispatchEvent(new CustomEvent('scroll'));
    return false;
  });
  $('#portal_next').click(function() {
      window.dispatchEvent(new CustomEvent('scroll'));
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    window.dispatchEvent(new CustomEvent('scroll'));
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
  window.dispatchEvent(new CustomEvent('scroll'));
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    window.dispatchEvent(new CustomEvent('scroll'));
    return false;
  });
});
} );
 
 
/**
 * Countdown
 *
 * Version: 2.0
 *
 * Cycle script by ru.spiralka.wikia.com
 * Rewrite by Pecoes
 * Original script by Splarka + Eladkse
 *
 * documentation and examples at:
 * http://dev.wikia.com/wiki/Countdown
 */
 
/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/
 
;(function (module, mw, $) {
 
    'use strict';
 
    var countdowns = [];
 
    var NO_LEADING_ZEROS = 1;
 
    function output (i, diff) {
        /*jshint bitwise:false*/
        var delta, result, parts = [];
        delta = diff % 60;
        parts.unshift(delta);
        diff = Math.floor(diff / 60);
        delta = diff % 60;
        parts.unshift(delta);
        diff = Math.floor(diff / 60);
        delta = diff % 24;
        parts.unshift(delta);
        //diff = Math.floor(diff / 24);
        //parts.unshift(diff);
        result = parts.pop();
        if (countdowns[i].opts & NO_LEADING_ZEROS) {
            while (parts.length && parts[0][0] === '0') {
                parts.shift();
            }
        }




        for (var j = 0; j < parts.length; j++) {
            var digits = parts[j];
            if (digits < 10) {
            parts[j] = '0' + digits;}
        }
        if (result < 10) { result = '0' + result; }




        if (parts.length) {
            result = parts.join(':') + ':' + result;
        }
        countdowns[i].node.text(result);
    }
 
    function end(i) {
        var c = countdowns[i].node.parent();
        switch (c.attr('data-end')) {
            case 'remove':
                c.remove();
                countdowns.splice(i, 1);
                return;
            case 'stop':
                output(i, 0);
                countdowns.splice(i, 1);
                return;
            case 'reset':
                countdowns[i].date += 24 * 3600 * 1000;
                return;
            case 'toggle':
                var toggle = c.attr('data-toggle');
                if (toggle && $(toggle).length) {
                    $(toggle).css('display', 'inline');
                    c.css('display', 'none');
                    countdowns.splice(i, 1);
                    return;
                }
                break;
            case 'callback':
                var callback = c.attr('data-callback');
                if (callback && $.isFunction(module[callback])) {
                    output(i, 0);
                    countdowns.splice(i, 1);
                    module[callback].call(c);
                    return;
                }
                break;
        }
        countdowns[i].countup = true;
        output(i, 0);
    }
 
    function update () {
        var now = Date.now();
        $.each(countdowns.slice(0), function (i, countdown) {
            var diff = Math.floor((countdown.date - now) / 1000);
            if (diff <= 0 && !countdown.countup) {
                end(i);
            } else {
                output(i, Math.abs(diff));
            }
        });
        if (countdowns.length) {
            window.setTimeout(function () {
                update();
            }, 1000);
        }
    }
 
    function getOptions (node) {
        /*jshint bitwise:false*/
        var text = node.parent().attr('data-options'),
            opts = 0;
        if (text) {
            if (/no-leading-zeros/.test(text)) {
                opts |= NO_LEADING_ZEROS;
            }
        }
        return opts;
    }
 
    $(function () {
        var countdown = $('.countdown');
        if (!countdown.length) return;
        $('.nocountdown').css('display', 'none');
        countdown
        .css('display', 'inline')
        .find('.countdowndate')
        .each(function () {
            var $this = $(this);

            var d = new Date();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var dateStr = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;          
            var date = (new Date(dateStr + " " + $this.text())).getTime();
            if (d.getTime() > date) {
                date += 24 * 3600 * 1000;
            }

            if (isNaN(date)) {
                $this.text('BAD DATE');
                return;
            }
            countdowns.push({
                node: $this,
                opts: getOptions($this),
                date: date,
            });
        });
        if (countdowns.length) {
            update();
        }
    });
 
}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));
//















//Кнопки быстрого описания правки
 
//список кнопок
function SummaryButtons(){
 var wpSummary = document.getElementById('wpSummary')
 if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return
 wpSummaryBtn = document.createElement('span') //global var
 wpSummaryBtn.id = 'userSummaryButtonsA'
 
// +Рекомендация
 var wpSummaryBtnRec = document.createElement('i');
 wpSummaryBtnRec.appendChild(document.createTextNode('Часто используемые описания для правок:'));
 wpSummaryBtnRec.appendChild(document.createElement('br'));
 wpSummaryBtn.appendChild(wpSummaryBtnRec);
 
 wpSummary.parentNode.insertBefore(wpSummaryBtn, wpSummary.nextSibling);
 wpSummary.parentNode.insertBefore(document.createElement('br'), wpSummary.nextSibling);
 addSumButton('дополнение', 'дополнение', 'Дополнение статьи недостающей информацией');
 addSumButton('исправление грамматики', 'исправление грамматики', 'Исправление орфографические и пунктуационных ошибок');
 addSumButton('викификация', 'викификация', 'Дополнение кода wikia');
}
 
//код вставки кнопок быстрого описания
function addSumButton(name, text, title) {
 var btn = document.createElement('a');
 btn.appendChild(document.createTextNode(name));
 btn.title = title;
 btn.onclick = function(){insertSummary(text)};
 wpSummaryBtn.appendChild(btn);
 wpSummaryBtn.appendChild(document.createTextNode(' '));
}
 
//код вставки описания
function insertSummary(text) {
 var wpSummary = document.getElementById('wpSummary')
 if (wpSummary.value.indexOf(text) != -1) return 
 if (wpSummary.value.match(/[^,; \/]$/)) wpSummary.value += ','
 if (wpSummary.value.match(/[^ ]$/)) wpSummary.value += ' '
 wpSummary.value += text
}
 
//вызов функции вставки кнопок быстрого описания правки при загрузке страницы
addOnloadHook(SummaryButtons)