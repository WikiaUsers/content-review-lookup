/* Spoiler Alert */
SpoilerAlert = {
    'class': "Spoiler",
    question: 'Trang này có chứa những thông tin bị rò rỉ, có thể chính xác hoặc không (spoiler), bạn có muốn xem?',
    yes: 'Có, tôi muốn xem',
    no: 'Không, không phải bây giờ.',
    };

/* Rail WAM */

window.RailWAM = {
    logPage: 'WAM Log',
    lang: 'vi'
};


/* Reference Popups */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        "w:c:dev:SpoilerAlert/code.2.js",
        "dev:MediaWiki:RailWAM/code.js",
        "w:c:dev:MediaWiki:Countdown/code.js"
        // ...
    ]
});



/* Adds "purge" option to page controls
 * See w:c:dev:PurgeButton for info & attribution 
 */
ajaxPages = ["Đặc_biệt:Thay_đổi_gần_đây","Đặc_biệt:Hoạt_động_wiki", "Đặc_biệt:Nhật_trình", "Đặc_biệt:Đóng_góp", "Đặc biệt:Đóng góp"];
 
ajaxIndicator = 'https://vignette.wikia.nocookie.net/milomurphyslaw/images/5/53/Loading_bar.gif/revision/latest?cb=20180711135105&path-prefix=vi';
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Tự động refresh trang';
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
 var autoCollapse = 2;
 var collapseCaption = "ẩn";
 var expandCaption = "hiện";
 
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