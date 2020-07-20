/* Any JavaScript here will be loaded for all users on every page load. */

/* Test if an element has a certain class **************************************
The following is copied from from Wikipedia's Common.js, section "Test if an element has a certain class" found at http://en.wikipedia.org/wiki/MediaWiki:Common.js. It is maintained there by Wikimedia users "Mike Dillon", "R. Koot", and "SG." You can find a full list of Common.js editors at http://en.wikipedia.org/wiki/MediaWiki:Common.js. This was done under the terms of the CC-BY-SA with permission.
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/** Collapsible tables *********************************************************
The following is copied from from Wikipedia's Common.js, section "Test if an element has a certain class" found at http://en.wikipedia.org/wiki/MediaWiki:Common.js. It is maintained there by Wikimedia user "R. Koot." You can find a full list of Common.js editors at http://en.wikipedia.org/wiki/MediaWiki:Common.js. This was done under the terms of the CC-BY-SA with permission.
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
 
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
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
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

// Featured article animation
/*
var pmwFeaturediv
var pmwFeatureimg
var pmwFeaturestarter
function pmwFeatureanimationpre()
 {
  pmwFeaturestarter = document.getElementById("pmwFeatured")
  if(pmwFeaturestarter)
   {
    pmwFeaturediv = document.createElement("div")
    var pmwFeaturestyle = pmwFeaturediv.style
    pmwFeaturestyle.backgroundColor = "#FFFFFF"
    pmwFeaturestyle.position = "absolute"
    pmwFeaturestyle.top = "0%"
    pmwFeaturestyle.left = "0%"
    pmwFeaturestyle.right = "0%"
    pmwFeaturestyle.height = "2em"
    var pmwHeads = document.getElementsByTagName("h1")
    var pmwHeadindex
    var pmwHead
    var pmwTitle
    for(pmwHeadindex in pmwHeads)
     {
      pmwHead = pmwHeads[pmwHeadindex]
      if(hasClass(pmwHead,"firstHeading"))
       {
        pmwTitle = pmwHead
        break
       }
     }
    pmwTitle.appendChild(pmwFeaturediv)
    pmwFeatureimg = document.createElement("img")
    pmwFeatureimg.src = "https://images.wikia.nocookie.net/papermario/images/2/2f/Featured.png"
    pmwFeatureimg.height = "100%"
    pmwFeatureimg.style.position = "relative"
    pmwFeatureimg.style.left = "-5px"
    pmwFeaturediv.appendChild(pmwFeatureimg)
   }
 }
function pmwFeatureanimation(pmwFeaturedivleft)
 {
  if(pmwFeaturedivleft <= 78)
   {
    pmwFeaturedivleft = 3 + pmwFeaturedivleft
   }
   else if(pmwFeaturedivleft <= 93)
    {
     pmwFeaturedivleft = 2 + pmwFeaturedivleft
    }
   else if(pmwFeaturedivleft <= 96)
    {
     pmwFeaturedivleft = 1 + pmwFeaturedivleft
    }
  pmwFeaturediv.style.left = pmwFeaturedivleft + "%"
  if(pmwFeaturedivleft == 96)
   {
    setTimeout("pmwFeatureanimation(" + pmwFeaturedivleft + ")",20)
   }
   else
    {
     pmwFeatureimg.title = "This is a featured article"
    }
 }
addOnloadHook(pmwFeatureanimationpre)
*/


if ( mwCustomEditButtons ) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/papermario/images/d/d3/HappyButton.png",
		"speedTip": "Happy",
		"tagOpen": "[[File:Paper_Mario_Happy.jpg|25px]]",
		"tagClose": " ",
		"sampleText": ""}
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/papermario/images/a/ac/SadButton.png",
		"speedTip": "Sad",
		"tagOpen": "[[File:Sad.jpg|25px]]",
		"tagClose": " ",
		"sampleText": ""}
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/papermario/images/2/2d/SillyButton.png",
		"speedTip": "Silly",
		"tagOpen": "[[File:Silly.png|25px]]",
		"tagClose": " ",
		"sampleText": ""}
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/papermario/images/9/94/SurprisedButton.png",
		"speedTip": "Surprised",
		"tagOpen": "[[File:Surprised.png|25px]]",
		"tagClose": " ",
		"sampleText": ""}
}

$(function(){importStylesheet("MediaWiki:Customcommon.css")})