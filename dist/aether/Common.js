/* Any JavaScript here will be loaded for all users on every page load. */

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

var UserTagsJS = {
    modules: {},
    tags: {
        devcode: {
            u: 'Aether Team',
            title: 'Developer',
            order: -1 / 0
        },
        devtexture: {
            u: 'Aether Team',
            title: 'Texture Artist',
            link: 'Chase',
            order: -1 / 0
        },
        devart: {
            u: 'Aether Team',
            title: 'Artist/Concept Artist',
            link: 'OscarPayn',
            order: -1 / 0
        },
        devwriter: {
            u: 'Aether Team',
            title: 'Lore Writer',
            link: 'Liberty',
            order: -1 / 0
        },
        devmusic: {
            u: 'Aether Team',
            title: 'Music Composer',
            link: 'Emile van Krieken',
            order: -1 / 0
        },
        owner: {
            u: 'Current Owner',
            title: 'Adopted Wiki',
            order: -1 / 0
        },
        bureaucrat: {
            u: 'Bureaucrat'
        },
        founder: {
            u: 'Original Founder'
        }
    }
};

window.UserTagsJS = UserTagsJS;

UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days

UserTagsJS.modules.userfilter = {
    'IStoleThePies': ['sysop', 'bureaucrat']
};

UserTagsJS.modules.custom = {
    'IStoleThePies': ['owner'],
        'LibertyPrimeTF2': ['devwriter'],
        'OzzAR0th': ['devart']
};

UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days

UserTagsJS.modules.userfilter = {
    'IStoleThePies': ['sysop', 'bureaucrat']
};

UserTagsJS.modules.custom = {
    'IStoleThePies': ['owner'],
        'LibertyPrimeTF2': ['devwriter'],
        'OzzAR0th': ['devart']
};

function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/Special:Contributions/'+ encodeURIComponent (mw.config.get('wgUserName')) +'">My contributions</a></li>');
}
 
$(UserContribsMenuItem);
 
function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null !== replace) {
    var getvalue = replace.getAttribute("class");
  }
}

function createCollapseButtons()
{
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );
 
    for ( var i = 0; i < Tables.length; i++ ) {
        if ( Tables[i].classList.contains( "collapsible" ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.style.styleFloat = "right";    //
            Button.style.cssFloat = "right";      // REMOVE THESE LINES
            Button.style.fontWeight = "normal";   // ON 10 FEBRUARY 2009
            Button.style.textAlign = "right";     // 
            Button.style.width = "6em";           //
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.addEventListener('click', collapseTable(tableIndex));
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }
 
    for ( var j = 0;  j < tableIndex; j++ ) {
        if ( NavigationBoxes[j].classList.contains( "collapsed" ) || ( tableIndex >= autoCollapse && NavigationBoxes[i].classList.contains( "autocollapse" ) ) ) {
            collapseTable( j );
        } 
        else if ( NavigationBoxes[j].classList.contains( "innercollapse" ) ) {
            var element = NavigationBoxes[j];
            while (element = element.parentNode) {
                if ( element.classList.contains( "outercollapse" ) ) {
                    collapseTable ( j );
                    break;
                }
            }
        }
    }
}
 
$(createCollapseButtons);