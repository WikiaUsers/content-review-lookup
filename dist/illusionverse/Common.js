/* Any JavaScript here will be loaded for all users on every page load. */
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
 
/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */ 
window.AjaxRCRefreshText = 'Auto-Refresh'; 
window.AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages",
    "Special:NewFiles"
];
 
importScriptPage('AjaxRC/code.js', 'dev');

$('.top10editors').each(function() {
    //Variables and retrieving settings
    var myDate = new Date(), end = myDate.toJSON(), start = '', 
      $te = $(this), userlist = {}, html = '',
      namespace = ($te.attr('data-te-namespace') || ''),
      type = ($te.attr('data-te-type') || 'edit|new'),
      show = ($te.attr('data-te-show') || ''),
      user = $te.attr('data-te-user') ? '&rcuser=' + $te.attr('data-te-user') : '',
      limit = (Number($te.attr('data-te-limit')) || 10),
      dateoffset = (Number($te.attr('data-te-offset')) || 14);
    limit = user ? 1 : limit;
    myDate.setDate(myDate.getDate() - dateoffset);
    start = myDate.toJSON();
 
    //Get and parse API data
    function requestLoop(strt, callback) {
        var request = '/api.php?action=query&list=recentchanges&rcstart=' + strt + 
          '&rcend=' + end + '&rcnamespace=' + namespace + '&rcshow=' + show + 
          '&rctype=' + type + user + '&rcdir=newer&rcprop=user&rclimit=500&format=json';
        console.log(request);
        $.getJSON(request, function(data) {
            for (var change in data.query.recentchanges) {
                var username = data.query.recentchanges[change].user;
                if (userlist[username] !== undefined) {
                    userlist[username] += 1;
                } else {
                    userlist[username] = 1;
                }
            }
            start = data['query-continue']; // JS needs hyphenated values in bracket notation
            if (start !== undefined) {
                requestLoop(start.recentchanges.rcstart, callback);
            } else {
                callback();
            }
        });
    }
    requestLoop(start, function() {
 
    //Create list in necessary structure and sort
    var userslist = [];
    for (var x in userlist) {
        userslist.push({'user':x, 'count':userlist[x]});
    }
    userslist.sort(function(a, b) {
        if (a.count > b.count) {
            return -1;
        } else if (a.count < b.count) {
            return 1;
        } else {
            if (a.user < b.user) {
                return -1;
            } else if (a.user > b.user) {
                return 1;
            } else {
                return 0;
            }
        }
    });
 
    //Create html and append to page
    for (var i = 0; i < userslist.length && i < limit; i++) {
        if (user) {
            html += userslist[i].count;
        } else {
            html += '<li><a href="/wiki/User:' + encodeURIComponent(
              userslist[i].user.replace(/ /g, '_')) + '">' +
              userslist[i].user + '</a>: ' + userslist[i].count + '</li>';
        }
    }
    user ? $te.html(html) : $te.html('<ol>' + html + '</ol>');
    });
});

/* Collapsible Tables (credit to the Tamora Pierce wiki) */

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

/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */ 
window.AjaxRCRefreshText = 'Auto-Refresh'; 
window.AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages",
    "Special:NewFiles"
];
 
importScriptPage('AjaxRC/code.js', 'dev');

/* Monchomans chat hacks */
 
importScriptPage('MediaWiki:ChatHacks.js', 'c');

importScriptPage('User Rights Reasons Dropdown/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:TopEditors/code.js'
    ]
});