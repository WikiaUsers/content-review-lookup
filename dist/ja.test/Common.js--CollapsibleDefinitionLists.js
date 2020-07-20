/** Collapsible Definition Lists *********************************************************
 *
 *  Description: Allows definition lists to be collapsed, showing only the definition term. See
 *              
 *  Maintainers: [[User:えふ氏]]
 */


jQuery( document ).ready( function( $ ){
    var collapseIcon = "-";
    var expandIcon = "+";
    
    function collapseDefList( deflistIndex ){
        var Button = document.getElementById( "collapseDLButton" + deflistIndex );
        var collapseList = document.getElementById( "collapseDL" + deflistIndex );

        if( !collapseList || !Button ) return false;

        var element = collapseList;

        if(Button.firstChild.data == collapseIcon){
            while( element = element.nextSibling ){
                if( element.tagName == "DT" ) break;
                if( element.tagName == "DD" ){
                    element.style.display = "none";
                }
            }
            Button.firstChild.data = expandIcon;
        }else{
            while(element = element.nextSibling){
                if( element.tagName == "DT" ) break;
                if( element.tagName == "DD" ){
                    element.style.display = "block";
                }
            }
            Button.firstChild.data = collapseIcon;
        }
    }

    function collapseDefListFunction( deflistIndex ){
        return function() {
            collapseDefList( deflistIndex );
            return false;
        };
    }

    var deflistIndex = 0;
    var DefLists = document.getElementsByTagName( "dl" );

    for(var i = 0; i < DefLists.length; i++){
        if(hasClass(DefLists[i].parentNode, "collapsible")){
            var list = DefLists[i];
            var head = undefined;
            var unit = true;
            for(var Child = list.firstChild; Child != null; Child = Child.nextSibling){
                var tag = new String(Child.tagName);
                if( tag.toUpperCase() == "DT"){
                    head = Child;
                    unit = false;
                    continue;
                }
                if( tag.toUpperCase() == "DD" && !unit ){
                    Child.style.display ="none";
                    // add button
                    var Button     = document.createElement( "span" );
                    var ButtonLink = document.createElement( "a" );
                    var ButtonText = document.createTextNode( collapseIcon );

                    ButtonLink.setAttribute( "id", "collapseDLButton" + deflistIndex );
                    ButtonLink.setAttribute( "href", "#" );
                    ButtonLink.onclick = collapseDefListFunction(deflistIndex);
                    ButtonLink.appendChild( ButtonText );

                    Button.className = 'DLToggle';
                    Button.appendChild( document.createTextNode( "[" ) );
                    Button.appendChild( ButtonLink );
                    Button.appendChild( document.createTextNode( "]" ) );

                    head.setAttribute( "id", "collapseDL" + deflistIndex );
                    head.insertBefore( Button, head.childNodes[0] );
                    
                    unit = true;
                    deflistIndex++;
                }
            }
        }
    }

    for(var i = 0; i < deflistIndex; i++){
        collapseDefList( i );
    }
});