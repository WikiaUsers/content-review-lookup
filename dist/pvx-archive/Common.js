/* Any JavaScript here will be loaded for all users on every page load. */

// <pre>

/* Adds an extra button at the end of the toolbar that inserts the build template from PvXwiki:Style and formatting into the current article. */
if(mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/pvx/images/4/47/Build_Icon.png",
     "speedTip": "Build Template",
     "tagOpen": "Describe the build.\n\n== Attributes and Skills ==\n<pvxbig>\n[build prof=Primary/Secondary Attribute1=12+1+3 Attribute2=10+1 Attribute3=8][1st skill][2nd skill][3rd skill][4th skill][5th skill][6th skill][7th skill][8th skill][/build]\n</pvxbig>\n\n* Suggest a few optional skill(s) if you included an Optional slot in the skill bar.\n\n== Equipment ==\n* Armor\n* Weapons\n\n== Usage ==\nDescribe how to use the build.\n\n== Counters ==\nDescribe important counters.\n\n== Variants ==\nList the major variants.\n\n== Notes ==\nAdd any additional notes pertaining to your build. Omit this section if it is not needed.\n\n== See also ==\nLink to any articles that are related to your build. Omit this section if it is not needed.",
     "tagClose": "",
     "sampleText": ""};
}


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
 
addOnloadHook( createCollapseButtons );

// </pre>

/* pvxrate.js */

function swapColor(id, bgcolor)
{
  if (bgcolor != '') { document.getElementById(id).style.backgroundColor = bgcolor; }
}

document.write('<scri' + 'pt src="https://images.wikia.nocookie.net/pvx/images/overlib.js"></script>');

/* gwbbcode.js -- pasted here by TOR */

var prevX, prevY, prevId=0, clicked=false, new_click=true, sav_event, d=document;
//PICKUP
////////

function pickup(action, id) {
   //Update database
   div('send').src = './gwbbcode/pickup.php?'+action+'='+id+'&rand=' + Math.round(1000*Math.random());

   //Switch between Add and Remove links
   if (action != 'switch') {
      var opp_action = (action=='remove') ? 'add' : 'remove';
      div(action+'_'+id).style.display = 'none';
      div(opp_action+'_'+id).style.display = '';
   }
}

function pickup_set(userlist, id) {
   for (var i=0; i<d.all.length; i++)
      if ((typeof(d.all[i].id) != 'undefined') && (d.all[i].id == 'pickup_'+id))
         d.all[i].innerHTML = userlist;
}


function iniMenu(frame) {
   if(d.getElementById && !(d.all))
      return d.getElementById('show'+frame);
   else if(d.all)
      return d.all['show'+frame];
};

function div(name) {
   var d = document;
   if(d.getElementById && !(d.all))
      return d.getElementById(name);
   else if(d.all)
      return d.all[name];
};

//Create function addPortletLink
function addPortletLink(portlet, href, text, id, tooltip, accesskey, nextnode) {
	var node = document.getElementById(portlet);
	if ( !node ) return null;
	node = node.getElementsByTagName( "ul" )[0];
	if ( !node ) return null;

	var link = document.createElement( "a" );
	link.appendChild( document.createTextNode( text ) );
	link.href = href;

	var item = document.createElement( "li" );
	item.appendChild( link );
	if ( id ) item.id = id;

	if ( accesskey ) {
		link.setAttribute( "accesskey", accesskey );
		tooltip += " ["+accesskey+"]";
	}
	if ( tooltip ) {
		link.setAttribute( "title", tooltip );
	}
	if ( accesskey && tooltip ) {
		updateTooltipAccessKeys( new Array( link ) );
	}

	if ( nextnode && nextnode.parentNode == node )
		node.insertBefore( item, nextnode );
	else
		node.appendChild( item );  // IE compatibility (?)

	return item;
}

// add rate button
var wmb = document.getElementsByClassName('wikia-menu-button');
var pn = document.evaluate('//header[id="WikiaPageHeader"]/h1', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
if (wmb) wmb=wmb[0];
if (wmb && pn.singleNodeValue && pn.singleNodeValue.innerHTML.match(/^Build:/)) {
   var ul = wmb.firstChild;
   while (ul && ul.tagName!='UL')
      ul = ul.nextSibling;
   if (ul) {
      var r = document.createElement('a');
      r.href = '/index.php?title='+pn.singleNodeValue.innerHTML+'&amp;action=rate';
      r.id='ca-rate';
      r.rel='no-follow';
      r.appendChild(document.createTextNode('Rate'));
      var rl = document.createElement('li');
      rl.appendChild(r);
      ul.appendChild(rl);
   }
}

//Add node 'My ratings' to Personal portlet.
addOnloadHook( function()
{
addPortletLink( 'p-personal', '/wiki/Special:UserRatings', 'my ratings', 'pt-myratings', 'My Ratings', 'g', document.getElementById( 'pt-mycontris' ) );
} );