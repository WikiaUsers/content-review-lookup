/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
	type: 'script',
	articles: [
        'w:c:dev:RevealAnonIP/code.js',
        'w:c:dev:AjaxRC/code.js', 
        'w:c:dev:DisplayClock/code.js',
        'u:dev:HighlightUsers/code.js',
	'w:c:dev:ShowHide/code.js',
	'w:c:dev:SignatureCheck/code.js',
        'w:c:dev:ListAdmins/code.js',
        'w:c:dev:TopEditors/code.js',
        'w:c:dev:ReferencePopups/code.js',
	]
});
 
var AjaxRCRefreshText = 'Auto-refresh';

/*HighlightUsers*/
highlight = {
    selectAll: false,
    sysop: '#FFCC00',
    bot: '#C0C4C3',
    users: {
        Blaziken8520: '#FFC812',
    }
}
 
/* Test if an element has a certain class **************************************
 *
 * Description  : Uses regular expressions and caching for better performance.
 * Maintainers  : [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]] (Wikipedia)
 *
 * Required for : Collapsible tables
 * Copied from  : Wikipedia
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
 
 
/** Collapsible tables *********************************************************
 *
 *  Description : Allows tables to be collapsed, showing only the header. See
 *                [[Wikipedia:NavFrame]].
 *  Maintainers : [[User:R. Koot]] (Wikipedia)
 *
 *  Requires    : hasClass
 *  Copied from : Wikipedia
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex )
{
  var Button = document.getElementById( "collapseButton" + tableIndex );
  var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
  if ( !Table || !Button ) { return false; }
 
  var Rows = Table.rows;
 
  if ( Button.firstChild.data == collapseCaption ) {
    for ( var i = 1; i < Rows.length; i++ ) { Rows[i].style.display = "none"; }
    Button.firstChild.data = expandCaption;
  } else {
    for ( var i = 1; i < Rows.length; i++ ) { Rows[i].style.display = Rows[0].style.display; }
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
 
addOnloadHook(createCollapseButtons);

function substUsername() {
	$('.insertusername').text(wgUserName);
}
 
function substUsernameTOC() {
	var toc = $('#toc');
	var userpage = $('#pt-userpage');
 
	if( !userpage || !toc )
		return;
 
	var username = $('#pt-userpage').children(':first-child').text();
	$('span.toctext:not(:has(*)), span.toctext i', toc).each(function()
	{
		$(this).text($(this).text().replace('<insert name here>', username));
	});
}
 
function fixSearch() {
	var button = document.getElementById('searchSubmit');
 
	if( button )
		button.name = 'go';
}