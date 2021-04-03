/* Any JavaScript here will be loaded for all users on every page load. */

// <pre>

/* Adds an extra button at the end of the toolbar that inserts the build template from PvXwiki:Style and formatting into the current article. */
/*if(mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://hydra-images.cursecdn.com/gwpvx.gamepedia.com/4/47/Build_Icon.png",
     "speedTip": "Build Template",
     "tagOpen": "Describe the build.\n\n== Attributes and Skills ==\n<pvxbig>\n[build prof=Primary/Secondary Attribute1=12+1+3 Attribute2=10+1 Attribute3=8][1st skill][2nd skill][3rd skill][4th skill][5th skill][6th skill][7th skill][8th skill][/build]\n</pvxbig>\n\n* Suggest a few optional skill(s) if you included an Optional slot in the skill bar.\n\n== Equipment ==\n* Armor\n* Weapons\n\n== Usage ==\nDescribe how to use the build.\n\n== Counters ==\nDescribe important counters.\n\n== Variants ==\nList the major variants.\n\n== Notes ==\nAdd any additional notes pertaining to your build. Omit this section if it is not needed.\n\n== See also ==\nLink to any articles that are related to your build. Omit this section if it is not needed.",
     "tagClose": "",
     "sampleText": ""};
}*/


/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainer on Wikipedia: [[User:R. Koot]]
  */

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function hasClass( element, className ) {
  var Classes = element.className.split( " " );
  for ( var i = 0; i < Classes.length; i++ ) {
    if ( Classes[i] == className ) {
      return ( true );
    }
  }
  return ( false );
}

function collapseTable( tableIndex ) {
  var Button = document.getElementById( "collapseButton" + tableIndex );
  var Table = document.getElementById( "collapsibleTable" + tableIndex );

  if ( !Table || !Button ) {
      return false;
  }

  // select all table rows that are first level children of the top level collapsible
  var PrimaryRows = document.querySelectorAll( "#collapsibleTable" + tableIndex + " > tbody > tr" );
  var isCollapsed = Button.firstChild.data === collapseCaption;
  var baseStyle = isCollapsed ? "none" : PrimaryRows[0].style.display;

  // display or hide top level table rows
  for (var i = 1; i < PrimaryRows.length; i++) {
    PrimaryRows[i].style.display = baseStyle;
  }

  if (isCollapsed) {
    Button.firstChild.data = expandCaption;
  } else {
    // if there are other collapsibles inside of the table, display their header
    var SubTables = Table.querySelectorAll( "tbody" );
    for (var i = 1; i < SubTables.length; i++) {
      SubTables[i].querySelectorAll("tr")[0].style.display = baseStyle;
    }
    Button.firstChild.data = collapseCaption;
  }
}

function createCollapseButtons()
{
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );

     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );

             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );

             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";

             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );

             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );

             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }

     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
}

$( createCollapseButtons );

// </pre>

/* pvxrate.js */

function swapColor(id, bgcolor)
{
  if (bgcolor != '') { document.getElementById(id).style.backgroundColor = bgcolor; }
}