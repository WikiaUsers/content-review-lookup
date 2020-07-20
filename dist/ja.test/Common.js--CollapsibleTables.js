/* Any JavaScript here will be loaded for all users on every page load. */
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the caption. See
 *              
 *  Maintainers: [[User:えふ氏]]
 */
 
 
jQuery( document ).ready( function( $ ){

    var autoCollapse = 2;
    var collapseCaption = "隠す";
    var expandCaption = "表示";
    var styleOfTableRow = "table-row-group";

    function collapseTable( tableIndex ){
        var Button = document.getElementById( "collapseButton" + tableIndex );
        var Table = document.getElementById( "collapsibleTable" + tableIndex );

        if( !Table || !Button )return false;

        var Rows = Table.rows;
        var Tbody = Table.tBodies[0];
        if( Button.firstChild.data == collapseCaption ){
            Tbody.style.display = "none";
            Button.firstChild.data = expandCaption;
        }else{
            Tbody.style.display = styleOfTableRow;
            Button.firstChild.data = collapseCaption;
        }
    }
     
    function collapseTableFunction( tableIndex ){
        return function() {
            collapseTable( tableIndex );
            return false;
        };
    }

    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );

    for(var i = 0; i < Tables.length; i++){
        if(hasClass(Tables[i], "collapsible")){

            /* only add button and increment count if there is a caption to work with */
            var Caption = Tables[i].caption;
            if (!Caption) continue;

            // get default display-style for < tbody >
            // true value is "table-row-group", but IE 7 and earlier is "block") 
            styleOfTableRow = Tables[i].tBodies[0].style.display; 

            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );

            var Button = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );

            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "#" );
            ButtonLink.onclick = collapseTableFunction( tableIndex );
            ButtonLink.appendChild( ButtonText );

            Button.className = 'TableToggle';
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );

            Caption.insertBefore( Button, Caption.childNodes[0] );
            
            tableIndex++;
        }
    }

    for(var i = 0; i < tableIndex; i++){
        if( hasClass(NavigationBoxes[i], "collapsed") || ( tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse") ) ){
            collapseTable(i);
        } 
        else if(hasClass(NavigationBoxes[i], "innercollapse")){
            var element = NavigationBoxes[i];
            while(element = element.parentNode) {
                if(hasClass(element, "outercollapse")){
                    collapseTable(i);
                    break;
                }
            }
        }
    }
});