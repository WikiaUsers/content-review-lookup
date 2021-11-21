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

// Disable the automatic column equalization per ravingmadness' request.
//$( document ).ready( fp.equalizeColumns );
//$( window ).resize( fp.equalizeColumns );
/*********************************************
/* End Front Page column height equalization *
/*********************************************/

/*********************************************
/* Image counter for the carousel template *
/*********************************************/
$(document).ready(function ()
{
    // Get the list of carousels
    var carousels = $(".carousel-transparent");

    var handleCarousel = function (carouselWrapper)
    {
    	var carousel = $(carouselWrapper).find(".sbls-carousel");
        var imageBox = carousel.find(".slideboxlightshow");
        var noCaptionOverlap = carouselWrapper.hasClass("carousel-no-caption-overlap");

        console.log("No caption overlap: " + noCaptionOverlap, carouselWrapper);

		// Create and style an element to contain the header (if needed).
		var headlineText = $(carouselWrapper).attr("data-headline");
		
		// If there is a headline
		if (headlineText !== undefined)
		{
			var headline = document.createElement("div");
			headline.className = "carousel-headline";
			headline.textContent = headlineText;
			
			carousel.prepend(headline);
		}

        // Create and style an element to contain the counter.
        var counter = document.createElement("div");
        counter.className = "carousel-counter";

        var children = imageBox.children();

        for (var index = 0; index < children.length; index++)
        {
            if (children[index].style.display != "none")
            {
                break;
            }
        }

        var carouselCaption = undefined;
        var counterText = document.createTextNode((index + 1) + "/" + children.length);

        if (noCaptionOverlap)
        {
            carouselCaption = document.createElement("div");
            carouselCaption.classList.add("carousel-caption");
            counter.appendChild(carouselCaption);
        }

        counter.appendChild(counterText);
        carousel.append(counter);

        var backwards = carousel.find(".sbls-prev");
        var forwards = carousel.find(".sbls-next");

        var updateCounter = function (adjustment)
        {
            if (adjustment !== undefined)
            {
                index += adjustment;

                if (index < 0)
                {
                    index = children.length - 1;
                }
                else if (index >= children.length)
                {
                    index = 0;
                }
            }
            else
            {
                for (index = 0; index < children.length; index++)
                {
                    if (children[index].style.display != "none")
                    {
                        break;
                    }
                }
            }

            var caption = $(children[index]).find(".sbls-description").text();

            if (noCaptionOverlap)
            {
                carouselCaption.textContent = caption;
            }

            counterText.textContent = (index + 1) + "/" + children.length;
        };

        var interval = $(carouselWrapper).attr("data-interval");

        if (interval !== undefined)
        {
            setInterval(function () { updateCounter(); }, parseInt(interval));
        }

        backwards.click(function ()
        {
            updateCounter(-1);
        });
        forwards.click(function ()
        {
            updateCounter(1);
        });

        updateCounter();
    };

    for (var cIndex = 0; cIndex < carousels.length; cIndex++)
    {
        handleCarousel(carousels[cIndex]);
    }
});

/*********************************************
/* End image counter for the carousel template *
/*********************************************/