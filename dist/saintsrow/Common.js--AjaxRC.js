/*
 * ADVANCED AJAX AUTO-UPDATING REFRESHING ARTICLES
 * Code originally by "pcj" of Wowpedia
 * Maintenance, cleanup, style and bug fixes by Grunny (https://community.wikia.com/wiki/User:Grunny) and Kangaroopower (https://community.wikia.com/wiki/User:Kangaroopower)
 * Updated for the Saints Row Wiki by 452
 */

( function ( $, mw, window ) {
	var	ajaxIndicator = window.ajaxIndicator || 'https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif',
		ajaxRCTimer,
		ajRefresh = window.ajaxRefresh || 300000,
		ajPages = window.ajaxRCPages || [ 'Special:RecentChanges' ];
	window.title = $('title').html();

	function storage( setTo ) {
		if ( localStorage.getItem( 'AjaxRCrefresh' ) === null ) {
			localStorage.setItem( 'AjaxRCrefresh', true );
		}
		if ( setTo === false ) {
			localStorage.setItem( 'AjaxRCrefresh', false );
		} else if ( setTo === true ) {
			localStorage.setItem( 'AjaxRCrefresh', true );
		}
		return JSON.parse( localStorage.getItem( 'AjaxRCrefresh' ) );
	}

        function debug452(out){if(wgUserName=="452")console.log(out);}

	/** Initialisation function */
	function preloadAJAXRC() {
		$("a[href*='?from=']").after( '&nbsp;<span style="display: inline-block;" id="ajaxRefreshUI"><label for="ajaxToggle" style="cursor: pointer;"><input type="checkbox" style="margin: 0 3px;" id="ajaxToggle">Update</label> every <input type="number" style="margin: 0;padding: 0;width: 30px;text-align: left;" id="ajaxDelay" value="5" min="1" title="Time between updates, in minutes"> mins <span style="display: none;" id="ajaxLoadProgress1"> <img src="' + ajaxIndicator + '" style="vertical-align: top;height: 21px;" border="0" alt="Updating page" /> Checking</span><span style="display: none;" id="ajaxLoadProgress2"> <img src="' + ajaxIndicator + '" style="vertical-align: top;height: 21px;" border="0" alt="Updating page" /> Loading</span></span>' );
		$(".rc-conntent").css({"border-top":"1px dotted black"});
		$( document ).ajaxComplete( function ( event, xhr, settings ) {
			var ajCallAgain = window.ajaxCallAgain || [];
			if ( window.ajaxCurrentPage === settings.url ) {
				$( '.mw-collapsible' ).makeCollapsible();
				if ( mw.config.get( 'wgNamespaceNumber' ) === -1 && mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Recentchanges' ) {
					//mw.special.recentchanges.init();
				}
				if ( mw.config.get( 'wgNamespaceNumber' ) === -1 && mw.config.get( 'wgCanonicalSpecialPageName' ) === 'WikiActivity' ) {
					//window.WikiActivity.init();
				}
				$(".mw-changeslist-log-renameuser .comment").each(function(){
					if ($("a", this).size()) return;
					var renameparts = $(this).html().split('"');
					$(this).html('(The user <a href="/User:'+renameparts[1]+'">'+renameparts[1]+'</a> has been renamed to <a href="/User:'+renameparts[3]+'">'+renameparts[3]+'</a>.)');
				});
				for ( var i = 0; i < ajCallAgain.length; i++ ) {
					ajCallAgain[i]();
				}
			}
		} );
		$( '#ajaxToggle' ).click( toggleAjaxUpdate );
		$( '#ajaxToggle' ).attr( 'checked', storage());
		if ( storage() ) {
			ajaxRCTimer = setTimeout( refreshRC, ajRefresh );
		}
	}

	/** refresh function */
	function refreshRC(what) {
	  if (typeof what != "undefined") debug452(what + new Date().toUTCString());
	  else debug452(new Date().toUTCString());
	  if (!$("#ajaxRefreshUI").size()) preloadAJAXRC();

	  ajRefresh = $("#ajaxDelay").val()*60000; //read and restore val on every refresh. #ajaxDelay is in minutes, ajRefresh is in microseconds;
	  clearTimeout( ajaxRCTimer );
	  ajaxRCTimer = setTimeout( refreshRC, ajRefresh );

	  if (window.lastRC != undefined) if (new Date().getTime() - window.lastRC < 5000) return;
	  window.lastRC = new Date().getTime();

	  d = $("a[href*='?from=']").attr("href").split("from=")[1].split("&")[0]*1 +"";
	  p = $("a[href*='?from=']").attr("href").split("?")[0];
	  window.ajaxCurrentPage = p+"?from="+d+'&useskin=monobook';
	  z = d.substr(0,4)+"-"+d.substr(4,2)+"-"+d.substr(6,2)+"T"+d.substr(8,2)+":"+d.substr(10,2)+":"+d.substr(12,2)+"Z";
	  $( '#ajaxLoadProgress1' ).css({"display": "inline-block"});

	  $.getJSON('/api.php?action=query&format=json&rclimit=1&list=recentchanges&rcend='+z, function(result) {
	    $('#ajaxLoadProgress1').css("display","none");
	    if(result.query.recentchanges.length) {
		if($($(".rc-conntent")[0]).attr("timestamp") != result.query.recentchanges[0].timestamp) {
		  $('#ajaxLoadProgress2').css("display","inline-block");
		  var $temp = $( '<div>' );
		  $temp.load(window.ajaxCurrentPage + " #mw-content-text", function () {
		    if($('.rc-conntent', $temp).text() && $($(".rc-conntent")[0]).attr("timestamp") != result.query.recentchanges[0].timestamp) { //redundant checks for race conditions.
				if ($(".rc-conntent", $temp).html().replace(RegExp("title=\"User:"+wgUserName+"\" class=\"mw-userlink\"","g"),"").indexOf("class=\"mw-userlink\"") != -1) {
					if (!window.hasFocus) $('title').html("! "+window.title);
				}
				$("#mw-content-text").css({"display":"none"});
				$(".rc-conntent").eq(0).before($('.rc-conntent', $temp));
				$("a[href*='?from=']")[0].outerHTML  = $("a[href*='?from=']", $temp)[0].outerHTML;
				if ($(".rc-conntent h4").eq(0).html() == $(".rc-conntent h4").eq(1).html()) $(".rc-conntent h4").eq(1).remove();
				if ($(".rc-conntent h4").eq(1).html() == $(".rc-conntent h4").eq(2).html()) $(".rc-conntent h4").eq(2).remove();
				$("#mw-content-text").css({"display":"block"});
				$(".rc-conntent").css({"min-height":"0"});
				$($(".rc-conntent")[0]).attr("timestamp", result.query.recentchanges[0].timestamp);
		    }
		    $('#ajaxLoadProgress2').css("display","none");
		  });
		}
	    }
	  });
	}

	/** Refresh on checkbox toggle or window focus */
	function toggleAjaxUpdate() {
		if ( $( '#ajaxToggle' ).prop( 'checked' ) === true ) {
			storage( true );
			refreshRC("toggle");
		} else {
			storage( false );
			clearTimeout( ajaxRCTimer );
		}
	}
	/** Load */
	$( function () {
		localStorage.setItem( 'AjaxRC-refresh', false );
		$("#ajaxRefresh").remove();
		if (typeof ajaxTimer != "undefined") clearTimeout( ajaxTimer );
		if ( $.inArray( mw.config.get( 'wgPageName' ), ajPages ) !== -1
		  && $( '#ajaxToggle' ).length === 0 ) {

			$(window).unbind('focus').bind('focus', function() {
			  $('title').html(window.title);
			  window.hasFocus = true;
			  refreshRC("focus");
			});
			$(window).bind('blur', function() { window.hasFocus = false; });

			preloadAJAXRC();
			refreshRC("start"); /* Because RecentChanges is cached for anons. */
		}
		$(".mw-changeslist-log-renameuser .comment").each(function(){
			if ($("a", this).size()) return;
			var renameparts = $(this).html().split('"');
			$(this).html('(The user <a href="/User:'+renameparts[1]+'">'+renameparts[1]+'</a> has been renamed to <a href="/User:'+renameparts[3]+'">'+renameparts[3]+'</a>.)');
		});
	});

}( jQuery, mediaWiki, this ) );