/* Any JavaScript here will be loaded for all users on every page load. */

 /*
    Source: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of ''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it searches for any suitable elements regardless of the tag name.
    Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS declaration #content div.infobox
 */
 function getElementsByClass(searchClass, node, tag)
 {
 	var classElements = new Array();
 	if(node == null)
 		node = document;
 	if(tag == null)
 		tag = '*';
 	var els = node.getElementsByTagName(tag);
 	var elsLen = els.length;
 	var tester = new ClassTester(searchClass);
 
 	for(i = 0, j = 0; i < elsLen; i++)
 	{
 		if(tester.isMatch(els[i]))
 		{
 			classElements[j] = els[i];
 			j++;
 		}
 	}     
 	return classElements;
 }
  
 function ClassTester(className)
 {
     this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
 }
 
 ClassTester.prototype.isMatch = function(element)
 {
     return this.regex.test(element.className);
 }
 /* end getElementsByClass */

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
  *  Maintainers: [[User:R. Koot]]
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

 function addAlternatingRowColors()
 {
    var tables = getElementsByClass('altcolors', document, 'table');
 
    for(var k = 0; k < tables.length; k++)
    {
        var table = tables[k]; 
        var rows = table.getElementsByTagName('tr');
        var changeColor = false;
        var colorregex = /customcolor\w+/;
        var newColor = '#' + String(colorregex.exec(table.className)).substring(11);
        if (newColor.length == 1)
            newColor = '#f9f9f9';
        for(var i = 0; i < rows.length; i++)
        {
            if(rows[i].className.indexOf('stopalt') != -1)
                break;
            if(rows[i].getElementsByTagName('th').length > 0)
                continue;
            if(changeColor)
                rows[i].style.backgroundColor = newColor;
            changeColor ^= 1;
        }
    }
 }
 addOnloadHook(addAlternatingRowColors);

/*{{Wikipedia|MediaWiki:Common.js}}*/