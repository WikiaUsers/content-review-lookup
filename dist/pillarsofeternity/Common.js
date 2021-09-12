/* Any JavaScript here will be loaded for all users on every page load. */

// Load Tooltip.js (only if tooltips are present on page)
if (document.querySelector(".advanced-tooltip") != null)
{
	mw.loader.load('/index.php?title=MediaWiki:Tooltip.js&action=raw&ctype=text/javascript');
}

// Load ResponsiveImageMap.js (only if imagemaps within res-img are present on the page)
if (document.querySelector(".res-img img[usemap]") != null)
{
	mw.loader.load('/index.php?title=MediaWiki:ResponsiveImageMap.js&action=raw&ctype=text/javascript');
}

// Load WorldmapPoe1.js (only if worldmap is present on the page)
if (document.querySelector(".worldmap") != null)
{
	mw.loader.load('/index.php?title=MediaWiki:WorldmapPoe1.js&action=raw&ctype=text/javascript');
}

// Load ContainerTable.js (only if a loot-container-table is present on the page)
if (document.querySelector(".loot-container-table") != null)
{
	mw.loader.load('/index.php?title=MediaWiki:ContainerTable.js&action=raw&ctype=text/javascript');
}

// Load ContainerList.js (only if a loot-container-list is present on the page)
if (document.querySelector(".loot-container-list") != null)
{
	mw.loader.load('/index.php?title=MediaWiki:ContainerList.js&action=raw&ctype=text/javascript');
}

// Collectible map example
if (mw.config.get("wgPageName") == "Map:CollectiblesTest")
{
	mw.loader.load('/index.php?title=MediaWiki:MapExtensions.js&action=raw&ctype=text/javascript');
}

// ======
/*
    This snippet allows placing class="unsortable" on table rows "|-" in order to hide
    them when sorting. One instance where this may be useful is when using colspans
    to denote table sections. When the user clicks sort on a column, these colspans
    shift around and may no longer make sense in the sorted context.
*/

// Defer until JQuery UI (specifically the tablesorter) has been loaded
function deferUntilJQueryUILoaded(callback)
{
    if (window.jQuery != null && window.jQuery.tablesorter != null)
        callback();
    else
        setTimeout(function() { deferUntilJQueryUILoaded(callback) }, 200);
}

var sortableTables = document.querySelectorAll(".wikitable.sortable");
if (sortableTables.length > 0) deferUntilJQueryUILoaded(removeUnsortableRowsOnSort);

function removeUnsortableRowsOnSort()
{
    sortableTables.forEach(function(t)
    {
        var unsortableRows = t.querySelectorAll("tr.unsortable");

        // Don't continue if the table has no unsortable rows
        if (unsortableRows.length == 0) return;

        // I don't think you can .bind to a tablesorter after it has been initialized
        // so we perform this on the click event of all headerSort cells instead
        var headerSorts = t.querySelectorAll(".headerSort");
        headerSorts.forEach(function(h){ h.addEventListener("click", removeAllUnsortableRows); });

        function removeAllUnsortableRows()
        {
            for (var i = 0; i < unsortableRows.length; i++)
            {
                // Don't just hide the row - delete it.
                unsortableRows[i].remove();
            }

            // Remove all headerSort even listeners and free up resources for GC
            headerSorts.forEach(function(h){ h.removeEventListener("click", removeAllUnsortableRows); });
            headerSorts = null;
            unsortableRows = null;
        }
    });
}

// ======
/*
	This snippet moves elements with the class res-img-overlay so that they are
	within the parent element of the first img of res-img.
	It also ensures that said parent element has position:relative
	See Template:Res-img for more info
*/
var resImgOverlays = document.querySelectorAll(".res-img .res-img-overlay");

if (resImgOverlays.length > 0)
{
	resImgOverlays.forEach(function(o)
	{
		var imgParent = o.closest(".res-img").querySelector("img").parentNode;
		
		if (imgParent != null)
		{
			imgParent.insertBefore(o, imgParent.firstChild);
			imgParent.style.position = "relative";
		}
	});
}

// ======
/*
	Because new lines are stripped from portable infoboxes, it means we can't have
	multiline tooltips anymore. This snippet fixes that, and replaces all instances
	of "\n" in ALL tooltips (to maintain consistency and expectations) with a new
	line character. Previously tooltips could use the LINE FEED entity - &#10;
*/
var tooltips = document.querySelectorAll(".page-content span.tooltip");
tooltips.forEach(function(t)
{
   var title = t.getAttribute("title");
   t.setAttribute("title", title.replaceAll("\\n", "\n"));
});

// ======

/*****************************************
/* Front Page 3-column height equalization *
/*****************************************/
// Author:  Shawn Bruckner
// Date:    2013-Sept-21
// License: CC-BY 3.0
// Version: beta

var fp = fp || {
  equalizeColumns : function() {
    $( '.fpmain' ).each( function () {
      fp.resetSectionBoxHeights( $( this ).find( '.fpsection1, .fpsection2, .fpsection3, .fpsection4' ) );
    } );
    if ( $( window ).width() > 789 && $( window ).width() < 1390 ) {
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
    } else if ( $( window ).width() > 1389 ) {
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



/****************************************************************
/* Front Page 2-column height equalization from The Witcher Wiki*
/****************************************************************/

function fixWidthEvent(event) {
    var mainright = document.getElementById('mp-right');
    var mpmain = document.getElementById('mp-main');
    if (mainright && mpmain) {
       if (document.body.clientWidth<1340) {
          mpmain.setAttribute('style','margin-right:0px');
          mainright.setAttribute('style','float:none;margin-left:0px;width:auto;padding:0.5em;clear:both;');
       } else if (document.body.clientWidth>=1340) {
          mpmain.removeAttribute('style');
          mainright.removeAttribute('style');
       }
   }
}

function fixWidths() {
    if (document.getElementById('mp-main')) {
        fixWidthEvent();
        window.addEventListener('resize',fixWidthEvent);
    }
}
fixWidths();
/*********************************************
/* End Front Page column height equalization *
/*********************************************/