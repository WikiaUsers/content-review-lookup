/* Any JavaScript here will be loaded for all users on every page load. */
/**
 * Collapsible tables *********************************************************
 *
 * Description: Allows tables to be collapsed, showing only the header. See
 *              [[Wikipedia:NavFrame]].
 * Maintainers: [[User:R. Koot]]
 */


(function() { var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })();


 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
window.collapseTable = function ( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
    var i;
 
    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
};
 
function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName( 'table' );
    var i;
 
    function handleButtonLink( index, e ) {
        window.collapseTable( index );
        e.preventDefault();
    }
 
    for ( i = 0; i < Tables.length; i++ ) {
        if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) continue;
            var Header = HeaderRow.getElementsByTagName( 'th' )[0];
            if ( !Header ) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.className = 'collapseButton';  /* Styles are declared in Common.css */
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', $.proxy( handleButtonLink, ButtonLink, tableIndex ) );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );
 
            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }
 
    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) || ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) ) ) {
            window.collapseTable( i );
        } 
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    window.collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
$( createCollapseButtons );
 
/**
 * Dynamic Navigation Bars (experimental)
 *
 * Description: See [[Wikipedia:NavFrame]].
 * Maintainers: UNMAINTAINED
 */
 
/* set up the words in your language */
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
/**
 * Shows and hides content and picture (if available) of navigation bars
 * Parameters:
 *     indexNavigationBar: the index of navigation bar to be toggled
 **/
window.toggleNavigationBar = function ( indexNavigationBar, event ) {
    var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
    var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
    var NavChild;
 
    if ( !NavFrame || !NavToggle ) {
        return false;
    }
 
    /* if shown now */
    if ( NavToggle.firstChild.data === NavigationBarHide ) {
        for ( NavChild = NavFrame.firstChild; NavChild !== null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    /* if hidden now */
    } else if ( NavToggle.firstChild.data === NavigationBarShow ) {
        for ( NavChild = NavFrame.firstChild; NavChild !== null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
 
    event.preventDefault();
};
 
/* adds show/hide-button to navigation bars */
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    var NavFrame;
    var NavChild;
    /* iterate over all < div >-elements */
    var divs = document.getElementsByTagName( 'div' );
    for ( var i = 0; (NavFrame = divs[i]); i++ ) {
        /* if found a navigation bar */
        if ( $( NavFrame ).hasClass( 'NavFrame' ) ) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement( 'a' );
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
            NavToggle.setAttribute( 'href', '#' );
            $( NavToggle ).on( 'click', $.proxy( window.toggleNavigationBar, window, indexNavigationBar ) );
 
            var isCollapsed = $( NavFrame ).hasClass( 'collapsed' );
            /**
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for ( NavChild = NavFrame.firstChild; NavChild !== null && !isCollapsed; NavChild = NavChild.nextSibling ) {
                if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                    if ( NavChild.style.display === 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if ( isCollapsed ) {
                for ( NavChild = NavFrame.firstChild; NavChild !== null; NavChild = NavChild.nextSibling ) {
                    if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode( isCollapsed ? NavigationBarShow : NavigationBarHide );
            NavToggle.appendChild( NavToggleText );
 
            /* Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) */
            for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ( $( NavFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild( NavToggle );
                }
            }
            NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
        }
    }
}
/*-Makes tables sortable-------------------------------------/
/------------------Activated on tables with class="sortable"-/
/--------Removes effect from columns with class="unsortable"-/
/-----------------------------------------------------------*/
function ts_makeSortable(table){
	var firstRow;
	if(table.rows&&table.rows.length>0){
		if(table.tHead&&table.tHead.rows.length>0){
			firstRow=table.tHead.rows[table.tHead.rows.length-1];
		}else{
			firstRow=table.rows[0];
		}
	}
	if(!firstRow)
		return;
	for(var i=0;i<firstRow.cells.length;i++){
		var cell=firstRow.cells[i];
		if((" "+cell.className+" ").indexOf(" unsortable ")==-1){
			cell.innerHTML+=' '
					+'<a href="#" class="sortheader" '
					+'onclick="ts_resortTable(this);return false;">'
					+'<span class="sortarrow">'
					+'<img src="'
					+ts_image_path
					+ts_image_none
					+'" alt="↓"/></span></a>';
		}
	}
	if(ts_alternate_row_colors){
		ts_alternate(table);
	}
}


importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/*-Makes tables filterable-----------------------------------/
/----------------Activated on tables with class="filterable"-/
/------Removes effect from columns with class="unfilterable"-/
/-----------------------------------------------------------*/

$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

/*-Quantcast-------------------------------------/
/------------------------------------------------------------/
/------------------------------------------------------------/
/-----------------------------------------------------------*/
  var _qevents = _qevents || [];
  (function() {
   var elem = document.createElement('script');
   elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge")
               + ".quantserve.com/quant.js";
   elem.async = true;
   elem.type = "text/javascript";
   var scpt = document.getElementsByTagName('script')[0];
   scpt.parentNode.insertBefore(elem, scpt);  
  })();

/********************************/
/* The following code is used   */
/* by the lineage book template */
/* for switching between books  */
/********************************/
 
$( "#LineageToggle" ).click(function() {
   document.getElementById("LineageContent").style.visibility='visible';
   document.getElementById("TalentsContent").style.visibility='hidden';
   document.getElementById("BuildingsContent").style.visibility='hidden';
   document.getElementById("HeirloomsContent").style.visibility='hidden';
});
$( "#TalentsToggle" ).click(function() {
   document.getElementById("LineageContent").style.visibility='hidden';
   document.getElementById("TalentsContent").style.visibility='visible';
   document.getElementById("BuildingsContent").style.visibility='hidden';
   document.getElementById("HeirloomsContent").style.visibility='hidden';
});
$( "#BuildingsToggle" ).click(function() {
   document.getElementById("LineageContent").style.visibility='hidden';
   document.getElementById("TalentsContent").style.visibility='hidden';
   document.getElementById("BuildingsContent").style.visibility='visible';
   document.getElementById("HeirloomsContent").style.visibility='hidden';
});
$( "#HeirloomsToggle" ).click(function() {
   document.getElementById("LineageContent").style.visibility='hidden';
   document.getElementById("TalentsContent").style.visibility='hidden';
   document.getElementById("BuildingsContent").style.visibility='hidden';
   document.getElementById("HeirloomsContent").style.visibility='visible';
});

/*-     Itenion         -------------------------------------/
/------------------------------------------------------------/
/------------------------------------------------------------/
/-----------------------------------------------------------*/

$('.show_L2').click(function () {for ( var hide_L2 = 0; hide_L2 < 11; hide_L2++ ) {$('.div_L2_' + hide_L2 ).hide();}$('.div_L2_' + ( $(this).attr('id') ) ).show();});
$('.show_cont').click(function () {for ( var hide_cont = 0; hide_cont < 10; hide_cont++ ) {for ( var hide_cont1 = 0; hide_cont1 < 10; hide_cont1++ ) {$('.div_cont_' + hide_cont1 + '_' + hide_cont ).hide(); } } $('.div_cont_' + ( $(this).attr('id') ) ).show(); });
$('.show_sub').click(function () {for ( var hide_sub = 0; hide_sub < 10; hide_sub++ ) {$('.div_sub_' + hide_sub ).hide();} $('.div_sub_' + ( $(this).attr('id') ) ).show();});
$('.hide_ST').click(function () { $('.ST_left').hide(); $('.ST_top').show(); $('.ST_right').css({ 'left': '10px' }); $('.ST_right').css({ 'top': '30px' }); $('.ST_right').css({ 'width': '-webkit-calc(100% - 10px)' }); $('.ST_right').css({ 'width': '-o-calc(100% - 10px)' }); $('.ST_right').css({ 'width': '-moz-calc(100% - 10px)' }); $('.ST_right').css({ 'width': 'calc(100% - 10px)' }); $('.hide_ST').hide(); $('.show_ST').show(); });
$('.show_ST').click(function () { $('.ST_left').show(); $('.ST_top').hide(); $('.ST_right').css({ 'left': '245px' }); $('.ST_right').css({ 'top': '0px' }); $('.ST_right').css({ 'width': '-webkit-calc(100% - 250px)' }); $('.ST_right').css({ 'width': '-o-calc(100% - 250px)' }); $('.ST_right').css({ 'width': '-moz-calc(100% - 250px)' }); $('.ST_right').css({ 'width': 'calc(100% - 250px)' }); $('.hide_ST').show(); $('.show_ST').hide(); });
if ($('#tools').length) { document.getElementById('tools').addEventListener('click', function() { window.open('http://gota.jeraj.si'); }, false); }
//function Toggle(objID) { var check = document.getElementById(objID); if (check.innerHTML == '+') { check.innerHTML = "–"; } else { check.innerHTML = "+"; } }
$(document).ready(function(){ $(".test").click(function(){ var ajdi = $(this).attr('id'); var check = $('#' + ajdi).text(); if (check == "+") { $(this).text("–"); } else { $(this).text("+"); } }); });