// Disable triggering of new browser tab when clicking URL links that point to internal wiki addresses (purge, edit, etc)
$('a[href^="//terraria.gamepedia.com"]').removeAttr('target');

// Select links to new tabs for Template:ilnt and Template:elnt
$('.linkNewTab a').each(function(){
    $(this).attr('target','_blank');
});

// Implement border-collapse + border-radius workaround for "terraria"-class tables 
/* (temporarily?) disabled, broke display for tables with percentage widths 
$('.terraria:not(.outer)')
	.removeClass('terraria')
	.addClass('inner')
	.wrap('<table class="terraria outer"></table>');
*/

// Disable creation of non-talk pages by anonymous IP editors and link to registration (also disabled by abuse filter but this provides warning before attempting edit)
var wgPageName = mw.config.get( 'wgPageName' );
var wgUserName = mw.config.get( 'wgUserName' );

var isTalk = false, isAnon = false;
if (wgPageName.indexOf('talk:') > -1 || wgPageName.indexOf('Talk:') > -1) isTalk = true;
if (wgUserName === null) isAnon = true;

if (isAnon == true){
    $('a.new').each(function(){
        var href = $(this).attr('href');
        $(this).attr('href', href.replace(/&action=edit/g, '') );
    });
}

if (isAnon == true && isTalk == false) {
    var anonWarnText = 'Page creation by anonymous editors is currently disabled. <br/> To create this page, please <a href="https://terraria.gamepedia.com/Special:CreateAccount">register an account</a> first.';
    $('body').append('<div class="anonWarnOverlay" style="display:none; background-color: #000; opacity: 0.4; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 500;"></div>');					
    $('body').prepend('<div class="anonWarnBox" style="display:none; text-align:center; font-weight: bold; box-shadow: 7px 7px 5px #000; font-size: 0.9em; line-height: 1.5em; z-index: 501; opacity: 1; position: fixed; width: 50%; left: 25%; top: 30%; background: #F7F7F7; border: #222 ridge 1px; padding: 20px;">' + anonWarnText + '</div>');

    var newSelect = 'a.new, #ca-edit a:contains(Create), #ca-ve-edit a:contains(Create), a.external.text:contains(edit this page)';
    $(newSelect).each(function(){
        if ($(this).attr('title').search(/talk\:/gi) < 0) {
            $(this).attr('href', '#').click(function(){
                $('.anonWarnBox').show();
                $('.anonWarnOverlay').show();
            });
        }
    });
    
    $('.anonWarnOverlay').click(function(){
        $('.anonWarnBox').hide();
        $(this).hide();
    });
}

// AJAX tables
function addAjaxDisplayLink() {
	$("table.ajax").each(function (i) {
		var table = $(this).attr("id", "ajaxTable" + i);
		table.find(".nojs-message").remove();
		var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
		var cell = table.find("td").first(), needLink = true;
		cell.parent().show();
		if (cell.hasClass("showLinkHere")) {
			var old = cell.html(), rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
			if (rep != old) {
				cell.html(rep);
				needLink = false;
			}
		}
		if (needLink) headerLinks.html('[<a href="javascript:;" class="ajax-load-link">show data</a>]');
		table.find(".ajax-load-link").parent().andSelf().filter('a').click(function(event) {
			event.preventDefault();
			var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
			cell.text('Please wait, the content is being loaded...');
			$.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
				if (data) {
					cell.html(data);
					cell.find('.ajaxHide').remove();
					cell.find('.terraria').removeClass('terraria');
					if (cell.find("table.sortable").length) {
						mw.loader.using('jquery.tablesorter', function() {
							cell.find("table.sortable").tablesorter();
						});
					}
					headerLinks.text('[');
					headerLinks.append($('<a>edit</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
					headerLinks.append(document.createTextNode(']\u00A0['));
					var shown = true;
					$("<a href='javascript:;'>hide</a>").click(function() {
						shown = !shown;
						shown ? cell.show() : cell.hide();
						$(this).text(shown ? "hide" : "show");
					}).appendTo(headerLinks);
					headerLinks.append(document.createTextNode(']'));
				}
			}).error(function() {
				cell.text('Unable to load table; the source article for it might not exist.');
			});
		});
	});
}

$(addAjaxDisplayLink);
$.when( $.ready ).then(function() {
  // Document is ready.
   // desktop view for mobile screen.
   $('#mw-panel').append('<div id="menu-toggle-button"></div>');
   var $btn = $('#menu-toggle-button');
   var $menu = $('#mw-panel .portal');
   $btn.on('click', function(){
      $('#mw-panel').toggleClass('on');
   });
});

$(window).on('load', function(){

   //main page header.
   var $btn = $('#mf-wikiheader #mf-wikiheader-toggle-link');
   if($btn.length){
      var $box = $('#mf-wikiheader');
      $btn.css('display', 'inline');
      if($box.innerHeight() > 180){
         $box.addClass('collapsed');
      }
      $btn.on('click', function(){
         $box.toggleClass('collapsed');
      });
   }

   //sidebar height fix.
   var $sidebar = $('#mw-panel');
   var $bottom = $sidebar.offset().top + $sidebar.outerHeight(true);
   var $wrapper = $('#global-wrapper');
   var $left_height = $bottom-($wrapper.outerHeight(true)-$wrapper.outerHeight());
   if ($left_height > $wrapper.height()){
   	   $wrapper.css('min-height', $left_height+'px');
   }
}); 

///*****************************************
///* Front Page column height equalization *
///*****************************************/
//// Author:  Shawn Bruckner
//// Date:    2015-Feb-12
//// License: CC-BY 3.0
//// Version: beta
//
//var fp = fp || {
//  equalizeColumns : function() {
//    $( '.fpcontent' ).each( function () {
//      fp.resetSectionBoxHeights( $( this ).find( '#fptopsection, #fpflexsection, #fpbottomsection' ) );
//    } );
//    var excludeSel = '';
//    if ( $( '.fpmaybercol' ).css( 'float' ) == 'right' ) {
//      excludeSel = '.fpmaybercol'; // at this width, it's necessary to hit those boxes in a separate pass after .fpcontent
//    }
//    if ( $( '#fpflexsection' ).css( 'float' ) == 'right' ) {
//      fp.equalizeColumnsOfBlock( '.fpcontent',
//                                 '#fptopsection, #fpbottomsection',
//                                 '#fpbottomsection',
//                                 '#fpflexsection',
//                                 '#fpflexsection',
//                                 excludeSel
//                               );
//    }
//    if ( $( '.fpmaybercol' ).css( 'float' ) == 'right' ) {
//      fp.equalizeColumnsOfBlock( '.fpmaybecols',
//                                 '.fpmaybelcol',
//                                 '.fpmaybelcol',
//                                 '.fpmaybercol',
//                                 '.fpmaybercol',
//                                 ''
//                               );
//    }
//  },
//
//  equalizeColumnsOfBlock : function( blockSel, leftSel, leftBottomSel, rightSel, rightBottomSel, excludeSel ) {
//    $( blockSel ).each( function ( index ) {
//      var tryCount = 0;
//      do {
//        var leftBottom = $( this ).find( leftBottomSel ).offset().top + $( this ).find( leftBottomSel ).height();
//        var rightBottom = $( this ).find( rightBottomSel ).offset().top + $( this ).find( rightBottomSel ).height();
//
//        var difference = Math.round( Math.abs( rightBottom - leftBottom ) );
//        
//        if ( leftBottom < rightBottom ) {
//          fp.adjustSectionBoxHeights( difference, $( this ).find( leftSel ).not( excludeSel ) );
//        } else if ( rightBottom < leftBottom ) {
//          fp.adjustSectionBoxHeights( difference, $( this ).find( rightSel ).not( excludeSel ) );
//        }
//        ++tryCount;
//      } while ( Math.round( leftBottom ) != Math.round( rightBottom ) && tryCount < 4 );
//    } );
//  },
//
//  resetSectionBoxHeights : function ( sections ) {
//    sections.each( function () {
//      $( this ).find( '.fpbox' ).each( function () {
//        $( this ).height( 'auto' );
//      } );
//    } );
//  },
//
//  adjustSectionBoxHeights : function ( heightToAdd, sections ) {
//    var boxCount = 0;
//    sections.each( function() {
//      boxCount += $( this ).find( '.fpbox' ).length;
//    } );
//
//    var avgHeightToAdd = heightToAdd / boxCount;
//    var decimalPortion = 0.0;
//    var boxes, heightToAdd;
//    sections.each( function() {
//      boxes = $( this ).find( '.fpbox' );
//
//      boxes.each( function() {
//        heightToAdd = Math.round( decimalPortion + avgHeightToAdd ); /* should iron out rounding error */
//        decimalPortion += avgHeightToAdd - heightToAdd;
//        $( this ).height( $( this ).height() + heightToAdd );
//      } );
//    } );
//  }
//};
//
//$( document ).ready( fp.equalizeColumns );
//$( window ).resize( fp.equalizeColumns );
///*********************************************
///* End Front Page column height equalization *
///*********************************************/