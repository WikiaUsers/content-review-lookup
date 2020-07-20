/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
 var autoCollapse = 2;
 var collapseCaption = "Ukryj";
 var expandCaption = "Pokaż";
 
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

/// Title Rewrite ///

function showEras(className)
{
    if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;

    var titleDiv = document.getElementById(className);

    if(titleDiv == null || titleDiv == undefined)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}
// END JavaScript title rewrite

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */

importScriptPage('AjaxRC/code.js', 'dev');

/*Keep favicon as correct PF logo instead of reverting to Wikia logo*/

document.write('<link REL="shortcut icon" HREF="/images/6/64/Favicon.ico" />')

// Konfiguracja tagów użytkowników. 
window.UserTagsJS = {
	modules: {},
	tags: {
		hello: { m: 'Male', f:'Female', u: 'No Gender Set', order: -1/0, link:'http://en.wikipedia.org/wiki/Gender' },
		sysop: { u:'Administrator', link:'Project:Administratorzy' }, 
                bureaucrat: { u:'Biurokrata', link:'Project:Administratorzy' },
                chatmoderator: { u:'Moderator czatu', link:'Project:Czat' },
                rollback: { u:'Patrolujący' },
                'smod': { u:'Szef Modteamu' },
                'rada': { u:'Członek Rady' },
                'bot': { u:'Bot' },
                'it' : { u:'IT Master' }
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Finedroid': ['bot']
};

UserTagsJS.modules.userfilter = {
	'Finedroid': ['sysop']
};

UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['bureaucrat', 'rollback']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	//sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
	'vandal-patrol': ['mini-sysop'] // Remove vandal-patrol from mini-sysops
};

// Koniec konfiguracji tagów użytkowników. 


importArticles({
    type: 'script',
    articles: [
        // Śnieg - skrypt znajduje się na stronie MediaWiki:Snow.js
        // 'MediaWiki:Snow.js',
        // Odliczanie - skrypt znajduje się na stronie MediaWiki:Countdown.js
        'MediaWiki:Countdown.js',
        //Tagi użytkowników
        'w:c:dev:UserTags/code.js',
        // dzienniki patrolowania ajax
        'u:dev:AjaxPatrol/code.js',
        'u:dev:AjaxRC/code.js'
    ]
});