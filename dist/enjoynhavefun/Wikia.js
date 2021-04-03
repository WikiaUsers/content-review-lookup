 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 1;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex ) {
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
 
function createCollapseButtons() {
   var tableIndex = 0;
   var collapseIndex = 0;
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
         Button.style.width = "4em";
         Button.className = "t_show_hide";
 
         ButtonLink.style.color = Header.style.color;
         ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
         ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
         ButtonLink.appendChild( ButtonText );
 
         Button.appendChild( document.createTextNode( "[" ) );
         Button.appendChild( ButtonLink );
         Button.appendChild( document.createTextNode( "]" ) );
 
         Header.insertBefore( Button, Header.childNodes[0] );
 
         if ( !hasClass( Tables[i], "nocount" ) ) {
            collapseIndex++;
	 }
         tableIndex++;
      }
   }
 
   for ( var i = 0;  i < tableIndex; i++ ) {
      if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( collapseIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
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

$(function() {$('#WikiaArticle').append('<div style="position:fixed; right:0; bottom:0; text-align:center;">{| class="infobox" style="font-size:89%; width:300px; background-color:#FFF;"
|-
! colspan="2" style="background-color:#3366CC; color:#FFFFFF; font-size:120%; padding:1em;" | {{{Box title|No Title}}}
{{#if: {{{image|}}}|
{{!}}-
{{!}} colspan="2" style="text-align:center;" {{!}} [[{{{image}}}|{{{imagewidth|250}}}px]]<br/>''{{{caption| }}}''
|
}}
|-
| style="width:30%;" |
'''{{{Row 1 title|No Title}}}'''
| style="width:70%;" |
{{{Row 1 info|No information}}}
{{#if: {{{Row 2 title|}}}|
{{!}}-
{{!}}
'''{{{Row 2 title}}}'''
{{!}}
{{{Row 2 info|No information}}}
{{#if: {{{Row 3 title|}}}|
{{!}}-
{{!}}
'''{{{Row 3 title}}}'''
{{!}}
{{{Row 3 info|No information}}}
{{#if: {{{Row 4 title|}}}|
{{!}}-
{{!}}
'''{{{Row 4 title}}}'''
{{!}}
{{{Row 4 info|No information}}}
{{#if: {{{Row 5 title|}}}|
{{!}}-
{{!}}
'''{{{Row 5 title}}}'''
{{!}}
{{{Row 5 info|No information}}}
{{#if: {{{Row 6 title|}}}|
{{!}}-
{{!}}
'''{{{Row 6 title}}}'''
{{!}}
{{{Row 6 info|No information}}}
{{#if: {{{Row 7 title|}}}|
{{!}}-
{{!}}
'''{{{Row 7 title}}}'''
{{!}}
{{{Row 7 info|No information}}}
{{#if: {{{Row 8 title|}}}|
{{!}}-
{{!}}
'''{{{Row 8 title}}}'''
{{!}}
{{{Row 8 info|No information}}}
{{#if: {{{Row 9 title|}}}|
{{!}}-
{{!}}
'''{{{Row 9 title}}}'''
{{!}}
{{{Row 9 info|No information}}}
{{#if: {{{Row 10 title|}}}|
{{!}}-
{{!}}
'''{{{Row 10 title}}}'''
{{!}}
{{{Row 10 info|No information}}}
{{#if: {{{Row 11 title|}}}|
{{!}}-
{{!}} colspan="2" style="text-align:center; background:#AAAAAA;" {{!}}
'''Too many parameters'''
|
}}
|
}}
|
}}
|
}}
|
}}
|
}}
|
}}
|
}}
|
}}
|
}}
|}</div>')});