/* Tämän sivun koodi liitetään jokaiseen sivulataukseen */
// ==================================================================
// Testit ja laskimet
// ==================================================================
$(document).ready(function() {
	if ($('.jcConfig').size() > 0) {
		importScript('MediaWiki:Common.js/calc.js');
		importStylesheet('MediaWiki:Common.css/calc.css');
	}
});

  var autoCollapse = 2;
  var collapseCaption = "pienennä";
  var expandCaption = "suurenna";
 
  function collapseTable( tableIndex )
  {
      var Button = document.getElementById( "collapseButton" + tableIndex );
      var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
      if ( !Table || !Button ) {
          return false;
      }
 
      var Rows = Table.getElementsByTagName( "tr" ); 
  
      if ( Button.firstChild.data == collapseCaption ) {
          for ( var i = 1; i < Rows.length; i++ ) {
              Rows[i].style.display = "none";
          }
          Button.firstChild.data = expandCaption;
      } else {
          for ( var i = 1; i < Rows.length; i++ ) {
              Rows[i].style.display = Rows[0].style.display;
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
 
              /* Only add button and increment count if there is a header row to work with */
              var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
              if (!HeaderRow) continue;
              var Header = HeaderRow.getElementsByTagName( "th" )[0];
              if (!Header) continue;

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
 
              ButtonLink.style.color = Header.style.color;
              ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
              ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
              ButtonLink.appendChild( ButtonText );
 
              Button.appendChild( document.createTextNode( "[" ) );
              Button.appendChild( ButtonLink );
              Button.appendChild( document.createTextNode( "]" ) );
 
              Header.insertBefore( Button, Header.childNodes[0] );
              tableIndex++;
          }
      }
 
      for ( var i = 0;  i < tableIndex; i++ ) {
          if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
              collapseTable( i );
          }
          else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
              var element = NavigationBoxes[i];
              while (element = element.parentNode) {
                  if ( hasClass( element, "outercollapse" ) ) {
                      collapseTable ( i );
                      break;
                  }
              }
          }
      }
  }

addOnloadHook( createCollapseButtons );

// =====================================================================
// End of Collapsible Tables
// =====================================================================

 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
  
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
  
  
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
  
     if (!NavFrame || !NavToggle) {
         return false;
     }
  
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
  
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
  
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
  
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
             
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
   
  }

  addOnloadHook( createNavigationBarToggleButton );

function getElementsByClassName(oElm, strTagName, oClassNames){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var arrRegExpClassNames = new Array();
	if(typeof oClassNames == "object"){
		for(var i=0; i<oClassNames.length; i++){
			arrRegExpClassNames[arrRegExpClassNames.length] =
				new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)");
		}
	}
	else{
		arrRegExpClassNames[arrRegExpClassNames.length] =
			new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)");
	}
	var oElement;
	var bMatchesAll;
	for(var j=0; j<arrElements.length; j++){
		oElement = arrElements[j];
		bMatchesAll = true;
		for(var k=0; k<arrRegExpClassNames.length; k++){
			if(!arrRegExpClassNames[k].test(oElement.className)){
				bMatchesAll = false;
				break;
			}
		}
		if(bMatchesAll){
			arrReturnElements[arrReturnElements.length] = oElement;
		}
	}
	return (arrReturnElements)
}

//Malline:USERNAME

 addOnloadHook(UserNameReplace);
 
 function UserNameReplace() {
 if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace) return;
    for(var i=0; UserName = document.getElementsByTagName("span")[i]; i++) {
        if ((document.getElementById('pt-userpage'))&&(UserName.getAttribute('id') == "insertusername")) {
            UserName.innerHTML = wgUserName;
        }
    }