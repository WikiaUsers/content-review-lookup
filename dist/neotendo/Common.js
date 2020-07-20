/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

function testFunction(tagtype,attname,attval) {
var output = new Array();
var selected=document.getElementsByTagName(tagtype);
     for (var i=0; i<selected.length; i++) { 
     if (selected[i].getAttribute(attname)==attval) {
        output.push(selected[i]);
          } 
     }
return output;
}
 
if (document.getElementById("QOTD") != null) {
var txtFile = new XMLHttpRequest();
txtFile.open("GET", "http://fantendo.wikia.com/index.php?title=User:Spark01/Lines&action=render", true);
txtFile.onreadystatechange = function() {
  if (txtFile.readyState === 4) {
    if (txtFile.status === 200) {
      var allText = txtFile.responseText; 
      var lines = txtFile.responseText.split("-end");
      var qotd=document.getElementById("QOTD");
      var rand=Math.floor(Math.random()*lines.length);
      qotd.innerHTML=lines[rand];
    }
  }
}
txtFile.send(null); }

/* Collapsible Tables */

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
     }
 }
 
 addOnloadHook( createCollapseButtons );

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

function addZero(i)
{
if (i<10) 
  {
  i="0" + i;
  }
return i;
}

function loadDates() {
for (i=0; i<document.getElementsByClassName("dgclock").length; i++) {
	var d=new Date();
	var timezone=document.getElementsByClassName("dgclock")[i];
	
	var offset=parseInt(document.getElementsByClassName("coffset")[i].innerHTML);
	var timehraw=eval(d.getUTCHours()+offset);
	if (timehraw<0) { var timeh=addZero(eval(timehraw+24)); }
	else { var timeh=addZero(timehraw); } 


	var m=addZero(d.getUTCMinutes());
	var s=addZero(d.getUTCSeconds());

	timezone.innerHTML=timeh + ":" + m + ":" + s;
}
}

function testclock()
{
if (document.getElementsByClassName("dgclock").length>0) {
 setInterval(function(){loadDates()},1000);
}
}
document.onload=testclock();


/* Monchomans chat hacks */
 
importScriptPage('MediaWiki:ChatHacks.js', 'c');

importScriptPage('User Rights Reasons Dropdown/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:TopEditors/code.js'
    ]
});

/* Locks old blogs that hasn't been commented on for days */

window.LockOldBlogs = {
    expiryDays: 90,
    expiryMessage: "Since this blog hasn\'t been commented on for over <expiryDays> days, it has been locked indefinitely to prevent the act of \"necroposting", also known as WOMP\.",
};
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});