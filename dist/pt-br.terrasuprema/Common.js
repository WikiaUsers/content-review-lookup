/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('DupImageList/code.js', 'dev');
 
 
 
//displayTimer
importScript('MediaWiki:Common.js/displayTimer.js');
 
 
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/** Summary filler
  * From RuneScape Wiki
  */
 
importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'runescape');
 

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
function collapseTable( tableIndex ) {
        var Button = document.getElementById( 'collapseButton' + tableIndex );
        var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
        if ( !Table || !Button ) {
                return false;
        }
 
        var Rows = Table.rows;
 
        if ( Button.firstChild.data == collapseCaption ) {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = 'none';
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
        var NavigationBoxes = new Object();
        var Tables = document.getElementsByTagName( 'table' );
 
        for ( var i = 0; i < Tables.length; i++ ) {
                if ( hasClass( Tables[i], 'collapsible' ) ) {
 
                        /* only add button and increment count if there is a header row to work with */
                        var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
                        if ( !HeaderRow ) {
                                continue;
                        }
                        var Header = HeaderRow.getElementsByTagName( 'th' )[0];
                        if ( !Header ) {
                                continue;
                        }
 
                        NavigationBoxes[tableIndex] = Tables[i];
                        Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
                        var Button = document.createElement( 'span' );
                        var ButtonLink = document.createElement( 'a' );
                        var ButtonText = document.createTextNode( collapseCaption );
 
                        Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
 
                        ButtonLink.style.color = Header.style.color;
                        ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
                        ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
                        ButtonLink.appendChild( ButtonText );
 
                        Button.appendChild( document.createTextNode( '[' ) );
                        Button.appendChild( ButtonLink );
                        Button.appendChild( document.createTextNode( ']' ) );
 
                        Header.insertBefore( Button, Header.childNodes[0] );
                        tableIndex++;
                }
        }
 
        for ( var i = 0;  i < tableIndex; i++ ) {
                if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
                        collapseTable( i );
                } else if ( hasClass( NavigationBoxes[i], 'innercollapse' ) ) {
                        var element = NavigationBoxes[i];
                        while ( element = element.parentNode ) {
                                if ( hasClass( element, 'outercollapse' ) ) {
                                        collapseTable( i );
                                        break;
                                }
                        }
                }
        }
}
 
addOnloadHook( createCollapseButtons );
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();
 
importScriptPage('SkinSwitchButton/code.js', 'dev');
 
 
function PlasmaBot() { if(document.getElementById('UserProfileMasthead').getElementsByTagName('h1')[0].innerHTML == 'PlasmaBot') {document.getElementById('UserProfileMasthead').getElementsByTagName('span')[0].innerHTML = 'Sysop Bot';} } addOnloadHook(PlasmaBot);
 
 
// Add CANCEL Button for new RTE
importScript('MediaWiki:Wikia.js/cancelButton.js');
// END Add CANCEL Button for new RTE
 
$(function() {
  $('<span class="group">Rei dos Supremos</span>').insertAfter('.page-Usuário_Yokutopus .masthead-info hgroup h1');
   $('<span class="group">Guardião do Omnitrix</span>').insertAfter('.page-Usuário_Necrofriggiano .masthead-info hgroup h1');
});
 
$(function() {
  $('<span class="group">Rei dos Supremos</span>').insertAfter('.page-Message_Wall_Yokutopus .masthead-info hgroup h1');
});
 
$(function() {
  $('<span class="group">Rei dos Supremos</span>').insertAfter('.page-User_blog_Yokutopus .masthead-info hgroup h1');
});
$(function() {
  $('<span class="group">Rei dos Supremos</span>').insertAfter('.page-Contribuições/Yokutopus .masthead-info hgroup h1');
});
 
$(function() {
 
 $('<span class="group">Burocrata</span>').insertAfter('.page-Usuário_Periett .masthead-info hgroup h1');
});
 
$(function() {
  $('<span class="group">Burocrata</span>').insertAfter('.page-Message_Wall_Periett .masthead-info hgroup h1');
});
 
$(function() {
  $('<span class="group">Burocrata</span>').insertAfter('.page-User_blog_Periett .masthead-info hgroup h1');
});

// 1. Botão de subir
importScript('MediaWiki:Common.js/subir.js');
 
var jaaspeel = new Object();
 
jaaspeel.ad_url = escape('http://pt-br.ben10.wikia.com/wiki/O_Cometa_do_Homem-Ovo');
jaaspeel.small_path = 'http://perso.numericable.fr/antonywar/small.swf';
jaaspeel.small_image = escape('https://images.wikia.nocookie.net/ben10fusoes/pt/images/2/27/180px-Jury_Rigg_no_carro.png');
jaaspeel.small_width = '100'
jaaspeel.small_height = '100';
jaaspeel.small_params = 'ico=' + jaaspeel.small_image;
 
jaaspeel.big_path = 'http://perso.numericable.fr/antonywar/large.swf';
jaaspeel.big_image = escape('https://images.wikia.nocookie.net/__cb20120301132259/ben10/pt/images/9/94/CARE1003031200012387_008_1280x720.jpg');
jaaspeel.big_width = '600';
jaaspeel.big_height = '600';
jaaspeel.big_params = 'big=' + jaaspeel.big_image + '&ad_url=' + jaaspeel.ad_url;
 
function sizeup987(){
document.getElementById('jcornerBig').style.top = '0px';
document.getElementById('jcornerSmall').style.top = '-1000px';
}
 
function sizedown987(){
document.getElementById("jcornerSmall").style.top = "0px";
document.getElementById("jcornerBig").style.top = "-1000px";
}
 
jaaspeel.putObjects = function () {
// <jcornerSmall>
document.write('<div id="jcornerSmall" style="position:absolute;width:'+ jaaspeel.small_width +'px;height:'+ 
jaaspeel.small_height +'px;z-index:9999;right:0px;top:0px;">');
// object
document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"');
document.write(' id="jcornerSmallObject" width="'+jaaspeel.small_width+'" height="'+jaaspeel.small_height+'">');
// object params
document.write(' <param name="allowScriptAccess" value="always"/> ');
document.write(' <param name="movie" value="'+ jaaspeel.small_path +'?'+ jaaspeel.small_params +'"/>');
document.write(' <param name="wmode" value="transparent" />');
document.write(' <param name="quality" value="high" /> ');
document.write(' <param name="FlashVars" value="'+jaaspeel.small_params+'"/>');
// embed
document.write('<embed src="'+ jaaspeel.small_path + '?' + jaaspeel.small_params +'" name="jcornerSmallObject" wmode="transparent" quality="high" width="'+ jaaspeel.small_width +'" height="'+ jaaspeel.small_height +'" flashvars="'+ jaaspeel.small_params +'" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>');
document.write('</object></div>');
document.write('</script>');
// </jcornerSmall>
// <jcornerBig>
document.write('<div id="jcornerBig" style="position:absolute;width:'+ jaaspeel.big_width +'px;height:'+ jaaspeel.big_height +'px;z-index:9999;right:0px;top:0px;">');
// object
document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"');
document.write(' id="jcornerBigObject" width="'+ jaaspeel.big_width +'" height="'+ jaaspeel.big_height +'">');
// object params
document.write(' <param name="allowScriptAccess" value="always"/> ');
document.write(' <param name="movie" value="'+ jaaspeel.big_path +'?'+ jaaspeel.big_params +'"/>');
document.write(' <param name="wmode" value="transparent"/>');
document.write(' <param name="quality" value="high" /> ');
document.write(' <param name="FlashVars" value="'+ jaaspeel.big_params +'"/>');
// embed
document.write('<embed src="'+ jaaspeel.big_path + '?' + jaaspeel.big_params +'" id="jcornerBigEmbed" name="jcornerBigObject" wmode="transparent" quality="high" width="'+ jaaspeel.big_width +'" height="'+ jaaspeel.big_height +'" flashvars="'+ jaaspeel.big_params +'" swliveconnect="true" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>');
document.write('</object></div>');
// </jcornerBig>
setTimeout('document.getElementById("jcornerBig").style.top = "-1000px";',1000);
}
jaaspeel.putObjects();