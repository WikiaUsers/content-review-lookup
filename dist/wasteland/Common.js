/* <nowiki> */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Front Page 3-column height equalization                              */
/* ******************************************************************** */
// Author:  Shawn Bruckner
// Date:    2013-Sept-21
// License: CC-BY 3.0
// Version: beta

var fp = fp || {
  equalizeColumns : function() {
    $( '.fpmain' ).each( function () {
      fp.resetSectionBoxHeights( $( this ).find( '.fpsection1, .fpsection2, .fpsection3, .fpsection4' ) );
    } );
    if ( $( '.fpsection1' ).first().css( 'float' ) === "left" ) {
      // we're in either 2 or 3 column view
      if ( $( '.fpsection4' ).first().css( 'clear' ) === "none" ) {
        $( '.fpmain' ).each( function (index) {
          var leftHeight = $( this ).find( '.fpsection1' ).height() + $( this ).find( '.fpsection4' ).height();
          var rightHeight = $( this ).find( '.fpsection2' ).height() + $( this ).find( '.fpsection3' ).height();
          var difference = Math.abs( rightHeight - leftHeight );
        
          if ( leftHeight < rightHeight ) {
            fp.adjustSectionBoxHeights( difference, $( this ).find( '.fpsection1, .fpsection4' ) );
          } else if ( rightHeight < leftHeight ) {
            fp.adjustSectionBoxHeights( difference, $( this ).find( '.fpsection2, .fpsection3' ) );
          }
        } );
      } else {
        $( '.fpmain' ).each( function (index) {
          var leftHeight = $( this ).find( '.fpsection1' ).height() + $( this ).find( '.fpsection4' ).height();
          var middleHeight = $( this ).find( '.fpsection2' ).height();
          var rightHeight = $( this ).find( '.fpsection3' ).height();
          var maxHeight = Math.max( leftHeight, middleHeight, rightHeight );
        
          if ( leftHeight < maxHeight ) {
            fp.adjustSectionBoxHeights( maxHeight - leftHeight, $( this ).find( '.fpsection1, .fpsection4' ) );
          }
          if ( middleHeight < maxHeight ) {
            fp.adjustSectionBoxHeights( maxHeight - middleHeight, $( this ).find( '.fpsection2' ) );
          }
          if ( rightHeight < maxHeight ) {
            fp.adjustSectionBoxHeights( maxHeight - rightHeight, $( this ).find( '.fpsection3' ) );
          }
        } );
      }
    }
  },

  findAdjustableSectionBoxes : function ( sections ) {
    var boxes = sections.find( '.fpbox.fpgreedy' );

    if ( boxes.length === 0 ) {
      return sections.find( '.fpbox' ).not( '.fpnoresize' );
    } else {
      return boxes;
    }
  },

  resetSectionBoxHeights : function ( sections ) {
    fp.findAdjustableSectionBoxes( sections ).each( function () {
      $( this ).height( 'auto' );
    } );
  },

  adjustSectionBoxHeights : function ( heightToAdd, sections ) {
    var boxes, lastBox, remainingHeightToAdd, boxHeightToAdd;
    boxes = fp.findAdjustableSectionBoxes( sections );
    lastBox = boxes.last();
    remainingHeightToAdd = heightToAdd;
    boxHeightToAdd = Math.floor( heightToAdd / boxes.length );

    boxes.each( function() {
      if ( this === lastBox.get( 0 ) ) {
        $( this ).height( $( this ).height() + remainingHeightToAdd );
      } else {
        $( this ).height( $( this ).height() + boxHeightToAdd );
        remainingHeightToAdd -= boxHeightToAdd;
      }
    } );
  }
};

$( document ).ready( fp.equalizeColumns );
$( window ).resize( fp.equalizeColumns );
/*********************************************
/* End Front Page column height equalization *
/*********************************************/

/* ######################################################################## */
/* ### JavaScript here is loaded for all users and all skins.           ### */
/* ######################################################################## */

/* ######################################################################## */
/* ### SCRIPT LOADER                                                    ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Loads all the other scripts                         ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

// Set up global variables
var vaultConfig = {
   chevronDown: '<span class="va-chevron-down"></span>',
   chevronLeft: '<span class="va-chevron-left"></span>',
   chevronRight: '<span class="va-chevron-right"></span>',
   chevronUp: '<span class="va-chevron-up"></span>',
   loadIndicator: '<img src="' + mw.config.get('stylepath') + '/common/images/ajax-loader.gif' + '" style="vertical-align: middle;" width="16" height="16" border="0" title="In progress..." alt="In progress..." />'
};

// Load scripts
function vaultScriptLoader () {
   // Always loaded
   addTitleIcons();
   fancyTooltips();

   // Only loaded for specific namespaces
   if (mw.config.get('wgNamespaceNumber') > 0 && mw.config.get('wgNamespaceNumber') % 2 != 0) {
      // Talk pages
      disableArchiveEdit();
   }

   if (mw.config.get('wgNamespaceNumber') == 112 || mw.config.get('wgIsMainPage')) {
      // Portals
      addCountdowns();
   }

   if (mw.config.get('wgNamespaceNumber') == 115) {
      wikilogCommentImprovements();
   }

   // Only loaded for specific pages
   if (mw.config.get('wgTitle') == 'Duplicate files' && mw.config.get('wgNamespaceNumber') == 4) {
      findDupFiles();
   }
}

jQuery(function($) {
   vaultScriptLoader();
});

/* ######################################################################## */
/* ### FANCY TOOLTIPS (Template:Icon, Template:Infobox,                 ### */
/* ###                 Template:Tooltip)                                ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Nicer-looking tooltips using jQuery.tipsy           ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

function fancyTooltips () {
   var ftTooltipsE = $('.va-infobox-tooltip-cell');
   var ftTooltipsS = $('.va-icon, .va-tooltip');

   if (ftTooltipsE.length || ftTooltipsS.length) {
      mw.loader.using('jquery.tipsy', function () {
         if (ftTooltipsE.length) {
            // Tooltip appears to the left of the element
            ftTooltipsE.tipsy({gravity: 'e'});
         }
         if (ftTooltipsS.length) {
            // Tooltip appears above the element
            ftTooltipsS.tipsy({gravity: 's'});
         }
      });
   }
}