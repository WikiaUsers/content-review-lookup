/* Any JavaScript here will be loaded for all users on every page load. */
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

/*********************************************
/* FloatingTableHeader Make table headers always visible when viewing large tables *
/*********************************************/
// Author:  mfaizsyahmi
// Code: Craig McQueen (bitbucket.org)
// Updated: March 21, 2022
importArticles({
	    type: 'script',
	    articles: [
	    	'u:dev:MediaWiki:FloatingTableHeader/Code.js',
	    	]
});
/*********************************************
/* End FloatingTableHeader *
/*********************************************/

/*********************************************
/** Script for [[Template:Gallery]] *
/*********************************************/
$( function() {
  if (document.URL.match(/printable/g)) return;

  function toggleImageFunction(group,  remindex, shwindex) {
    return function() {
      document.getElementById("ImageGroupsGr" + group + "Im" + remindex).style["display"] = "none";
      document.getElementById("ImageGroupsGr" + group + "Im" + shwindex).style["display"] = "block";
      return false;
    };
  }

  var divs = document.getElementsByTagName("div");
  var i = 0, j = 0;
  var units, search;
  var currentimage;
  var UnitNode;
  for (i = 0; i < divs.length; i++) {
    if (divs[i].className !== "ImageGroup") { continue; }
    UnitNode = undefined;
    search = divs[i].getElementsByTagName("div");
    for (j = 0; j < search.length; j++) {
      if (search[j].className !== "ImageGroupUnits") { continue; }
      UnitNode=search[j];
      break;
    }
    if (UnitNode === undefined) { continue; }
    units = [];
    for (j = 0 ; j < UnitNode.childNodes.length ; j++ ) {
      var temp = UnitNode.childNodes[j];
      if (temp.className === "center") { units.push(temp); }
    }
    var rightlink = undefined;
    var commentText = undefined;
    for (j = 0; j < units.length; j++) {
      currentimage = units[j];
      currentimage.id = "ImageGroupsGr" + i + "Im" + j;
      var leftlink = document.createElement("a");
      if (commentText !== undefined) {
        leftlink.setAttribute("title", commentText);
      }
      var comment;
      if (typeof(currentimage.getAttribute("title")) !== "string") {
        commentText = (j+1) + "/" + units.length;
        comment = document.createElement("tt").appendChild(document.createTextNode("("+ commentText + ")"));
      } else {
        commentText = currentimage.getAttribute("title");
        comment = document.createElement("span").appendChild(document.createTextNode(commentText));
        currentimage.removeAttribute("title");
      }
      if(rightlink !== undefined) {
        rightlink.setAttribute("title", commentText);
      }
      var imghead = document.createElement("div");
      rightlink = document.createElement("a");
      if (j !== 0) {
        leftlink.href = "#";
        leftlink.onclick = toggleImageFunction(i, j, j-1);
        leftlink.appendChild(document.createTextNode("◀"));
      }
      if (j !== units.length - 1) {
        rightlink.href = "#";
        rightlink.onclick = toggleImageFunction(i, j, j+1);
        rightlink.appendChild(document.createTextNode("▶"));
      }
      imghead.style["fontSize"] = "110%";
      imghead.style["fontweight"] = "bold";
      imghead.appendChild(leftlink);
      imghead.appendChild(document.createTextNode("\xA0"));
      imghead.appendChild(comment);
      imghead.appendChild(document.createTextNode("\xA0"));
      imghead.appendChild(rightlink);
      if (units.length > 1) {
        currentimage.insertBefore(imghead,currentimage.childNodes[0]);
      }
      if (j !== 0) {
        currentimage.style["display"] = "none";
      }
    }
  }
});
/*********************************************
/** End of [[Template:Gallery]] *
/*********************************************/


// Written by User:Hellerhoff, 2011
/** Script for Template:Imagestack */

/*jshint curly:false, jquery:true */
var launch = function($c) {
	'use strict';

	var $imageStacks = $('div.ImageStack', $c);
	if (0 === $imageStacks.length) return;

	$('.ImageStack_JS_required').hide();

	if (document.URL.match(/printable/g)) return;

	var scrollobject = false; // flag for scroll-dragging
	var mouse_y = 0;

	$(document).on('mouseup', function(event) {
		var did_scroll = !scrollobject;
		scrollobject = false; // unset flag
		return did_scroll;
	}); // bind mouseup

	$imageStacks.each(function() {
		var currentImage = 0,
			length, loop,
			$images, $t, $counter, $leftLink,
			$rightLink, $currentCount;

		$t = $(this);
		loop = $t.find('.ImageStack_loop').length ? true : false;
		//Use when 1.17 final is in use
		//loop = $t.attr('data-loop') == 'true' ? true : false; //Get loop prop
		$images = $t.find('.ImageStackUnits div.center');
		length = $images.length;
		if (!length) return true;

		$counter = $('<div class="ImageStackCounter">');
		$leftLink = $('<a>', {
			href: '#',
			text: '< '
		}).click(function() {
			toggleImage(-1, loop);
			return false;
		});
		$rightLink = $('<a>', {
			href: '#',
			text: ' >'
		}).click(function() {
			toggleImage(1, loop);
			return false;
		});

		$currentCount = $('<span>', {
			'class': 'ImageStackCounterCurrent',
			text: '0'
		});
		$counter.append($leftLink, '(', $currentCount, '/', length, ')', $rightLink);
		$counter.addClass('center');
		$t.prepend($counter);
		$leftLink.add($rightLink).css({
			fontSize: "110%",
			fontweight: "bold"
		});

		$images.on('mousewheel', function(event, delta) {
			delta = Math.floor(delta);
			if (delta !== 0) toggleImage(-delta, loop);
			return false;
		});
		$images.on('mousedown', function(event) { // prepare scroll by drag
			mouse_y = event.screenY; // remember mouse-position
			scrollobject = true; // set flag
			return false;
		});
		$images.on('mousemove', function(event) {
			if (scrollobject && Math.abs(mouse_y - event.screenY) > 10) {
				var offset = (mouse_y < event.screenY) ? 1 : -1;
				mouse_y = event.screenY; //  remember mouse-position for next event
				toggleImage(offset, loop);
			}
			return false;
		});

		var toggleImage = function(offset, loop) {
			currentImage += offset; //add offset
			$leftLink.show();
			$rightLink.show();
			if (!loop) {
				if (currentImage <= 0) {
					currentImage = 0;
					$leftLink.hide();
				} else if (currentImage >= $images.length - 1) {
					currentImage = $images.length - 1;
					$rightLink.hide();
				}
			} else {
				if (currentImage < 0) currentImage = $images.length - 1;
				if (currentImage >= $images.length) currentImage = 0;
			}
			$images.hide(); //Hide all
			$images.eq(currentImage).show();
			$currentCount.text(currentImage + 1);
		};
		toggleImage(0, loop);
	});
};

mw.hook( 'wikipage.content' ).add( launch );

/* End of Template:Imagestack *
/*********************************************/

$(document).ready(function(){
    $('.mw-references-wrap, .mw-references-columns').before('<h2>References</h2>');
});