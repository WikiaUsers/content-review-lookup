/*
所有用戶在加載任何頁面時，這裡的JavaScript都會加載，請管理員小心編輯
*/

/* MediaWiki:Gadget-site-lib.js modified from Wikipedia-zh */
window.wgUXS = function (wg, hans, hant, cn, tw, hk, sg, zh, mo, my) {
    var ret = {
        'zh': zh || hans || hant || cn || tw || hk || sg || mo || my,
        'zh-hans': hans || cn || sg || my,
        'zh-hant': hant || tw || hk || mo,
        'zh-cn': cn || hans || sg || my,
        'zh-sg': sg || hans || cn || my,
        'zh-tw': tw || hant || hk || mo,
        'zh-hk': hk || hant || mo || tw,
        'zh-mo': mo || hant || hk || tw
    }
    return ret[wg] || zh || hant || hans || tw || cn || hk || sg || mo || my; // 保證每一語言有值
}

window.wgUXS = function (wg, hans, hant, cn, tw, hk, sg, zh, mo, my) {
    var ret = {
        'zh': zh || hans || hant || cn || tw || hk || sg || mo || my,
        'zh-hans': hans || cn || sg || my,
        'zh-hant': hant || tw || hk || mo,
        'zh-cn': cn || hans || sg || my,
        'zh-sg': sg || hans || cn || my,
        'zh-tw': tw || hant || hk || mo,
        'zh-hk': hk || hant || mo || tw,
        'zh-mo': mo || hant || hk || tw
    }
    return ret[wg] || zh || hant || hans || tw || cn || hk || sg || mo || my; // 保證每一語言有值
}
 
window.wgULS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
    return wgUXS(mw.config.get('wgUserLanguage'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};
 
window.wgUVS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
    return wgUXS(mw.config.get('wgUserVariant'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};
 
window.importScriptCallback = function(page, ready) {
    importScriptURICallback(mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=' + mw.util.wikiUrlencode(page) + '&action=raw&ctype=text/javascript', ready);
};
 
window.importScriptURICallback = jQuery.getScript;

/*
 * Description: Redirects from /User:UserName/skin.js or .css to the user's actual skin page
 * Maintainer: Cacycle
 */
if (wgArticleId == 0 && wgUserName) {
  var slash = wgPageName.indexOf('/');
  var norm = wgPageName.substr(0, slash) + wgPageName.substr(slash).toLowerCase();
  var test = 'User:' + wgUserName.replace(/ /g, '_') + '/skin.';
  var ext = null;
  if (norm == test + 'js') ext = 'js';
  else if (norm == test + 'css') ext = 'css';
  if (ext != null) window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin + '.' + ext);
}
if (wgAction == "edit" || wgAction == "submit" || (wgCanonicalNamespace == "Special" && wgCanonicalSpecialPageName =="Upload")) //對應編輯頁面
{
    importScript("MediaWiki:Common.js/edit.js")
}
else if (wgCanonicalNamespace == "Special" && wgCanonicalSpecialPageName =="Watchlist") //watchlist scripts
{
    importScript("MediaWiki:Common.js/watchlist.js")
}
if( wgNamespaceNumber == 6 ) {
    importScript('MediaWiki:Common.js/file.js');
}
/** SysOP Javascript *******************************************************
  *
  *  Description: Allows for sysop-specific Javascript at [[MediaWiki:Sysop.js]].
  */
function sysopFunctions() {
    if ( wgUserGroups && !window.disableSysopJS ) {
        for ( var g = 0; g < wgUserGroups.length; ++g ) {
            if ( wgUserGroups[g] == "sysop" ) {
                importScript( "MediaWiki:Sysop.js" );
                break;
            }
        }
    }
}
 
//addOnloadHook(sysopFunctions);
//遍历
function forEach(callback,array){
var i=0,j=array.length;
while(i<j){callback(array[i++]);}
}
function applyEach(callback,array){
var i=0,j=array.length;
while(i<j){callback(array[i++]);}
}
// 移動元素
function elementMoveto(node, refNode, pos){//默認位置為refNode前
if(node && refNode){
var parent=refNode.parentNode;
if (pos && pos=='after') {refNode=refNode.nextSibling;}
try {
if(refNode){
parent.insertBefore(node, refNode);
}else{
parent.appendChild(node);
}
} catch (DOMException) {};
}
}
// 創建元素
function createElement(tag,children,props){
var element = document.createElement(tag);
if(!(children instanceof Array)){children=[children];}
for(var i=0;i<children.length;i++){
var child=children[i];
if(typeof child=='string'){child=document.createTextNode(child);}
if(child){element.appendChild(child);}
}
if(typeof props=='object'){
for(var k in props){
switch(k){
case 'styles':
var styles=props.styles;
for(var s in styles){element.style[s]=styles[s];}
break;
case 'events':
var events=props.events;
for(var e in events){ addHandler(element,e,events[e]); }
break;
case 'class':
element.className=props[k];break;
default:
element.setAttribute(k,props[k]);
}
}
}
return element;
}
/* Scripts specific to Internet Explorer */
if (navigator.appName == "Microsoft Internet Explorer"){
var oldWidth;
var docEl = document.documentElement;
function fixIEScroll(){
if (!oldWidth || docEl.clientWidth > oldWidth){
doFixIEScroll();
}else{
setTimeout(doFixIEScroll, 1);
}
oldWidth = docEl.clientWidth;
}
function doFixIEScroll() {
docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
}
    document.attachEvent("onreadystatechange", fixIEScroll);
    document.attachEvent("onresize", fixIEScroll);
    // IE overflow bug
    appendCSS('div.overflowbugx { overflow-x: scroll !important; overflow-y: hidden !important; } div.overflowbugy { overflow-y: scroll !important; overflow-x: hidden !important; }');
}
/* Test if an element has a certain class **************************************
 * Description: Uses regular expressions and caching for better performance.
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
var collapseCaption = "隱藏";
var expandCaption = "顯示";
 
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
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
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
 
// addOnloadHook( createCollapseButtons );

/**
 * Dynamic Navigation Bars. See [[Wikipedia:NavFrame]]
 * 
 * Based on script from en.wikipedia.org, 2008-09-15.
 *
 * @source www.mediawiki.org/wiki/MediaWiki:Gadget-NavFrame.js
 * @maintainer Helder.wiki, 2012–2013
 * @maintainer Krinkle, 2013
 * @maintainer Fantasticfears, 2013-2014
 */
( function () {

var collapseCaption = wgULS('隐藏', '隱藏');
var expandCaption = wgULS('显示', '顯示');

var navigationBarHide = collapseCaption + '▲';
var navigationBarShow = expandCaption + '▼';
 
/**
 * Shows and hides content and picture (if available) of navigation bars.
 *
 * @param {number} indexNavigationBar The index of navigation bar to be toggled
 * @param {jQuery.Event} e Event object
 */
function toggleNavigationBar( indexNavigationBar, e ) {
        var toggle = $( '#NavToggle' + indexNavigationBar ),
                frame = $( '#NavFrame' + indexNavigationBar ),
                isFrameCollapsed;

        if ( !frame || !toggle ) {
                return false;
        }

    isFrameCollapsed = frame.hasClass( 'collapsed' );
        if ( isFrameCollapsed ) {
                frame.find( '> .NavPic, > .NavContent, > .toogleShow' ).each( function() {
                        $( this ).css( 'display', 'block' );
                });
                frame.find( '> .toggleHide' ).each( function() {
                        $( this ).css( 'display', 'none' );
                });
                toggle.text( navigationBarHide );
                frame.removeClass( 'collapsed' );
        } else {
                frame.find( '> .NavPic, > .NavContent, > .toogleShow' ).each( function() {
                        $( this ).css( 'display', 'none' );
                });
                frame.find( '> .toggleHide' ).each( function() {
                        $( this ).css( 'display', 'block' );
                });
                toggle.text( navigationBarShow );
                frame.addClass( 'collapsed' );
        }
}
/**
 * Adds show/hide-button to navigation bars.
 *
 * @param {jQuery} $content
 */
function createNavigationBarToggleButton( $content ) {
        // Iterate over all (new) nav frames
        $content.find( 'div.NavFrame' ).each( function( indexNavigationBar ) {
                var frame = $( this ).attr( 'id', 'NavFrame' + indexNavigationBar );
                // If found a navigation bar
                var navToggle = $( '<span class="NavToggle" id="NavToggle' + indexNavigationBar + '"></span>' );
                frame.find( '> .NavHead' ).each( function() {
                        $( this ).on( 'click', $.proxy( toggleNavigationBar, null, indexNavigationBar ) );
                    return false;
        });
                if ( frame.hasClass( 'collapsed' ) ) {
                        frame.find( '> .NavPic, > .NavContent, > .toggleHide' ).each( function() {
                                $( this ).css( 'display', 'none' );
                        });
                } else {
                        frame.find( '> .toggleShow' ).each( function() {
                                $( this ).css( 'display', 'none' );
                        });
                }

                var showNavigationBarHide = true;
                frame.find( '> .NavPic, > .NavContent' ).each( function() {
                        if ( $( this ).css( 'display' ) === 'none' ) {
                                showNavigationBarHide = false;
                                return false;
                        }
                });

                navToggle.text( showNavigationBarHide? navigationBarHide: navigationBarShow );

                frame.find( '> .NavHead' ).each( function() {
                        $( this ).append( navToggle );
                        return false;
                });
        });
}
        mw.hook( 'wikipage.content' ).add( createNavigationBarToggleButton );
}());

/* #adminSkin
addOnloadHook(function(){
    var opt = document.createElement("option");
    opt.text = "monobook";
    opt.value = "monobook";
 
    var placeholder = document.getElementById("adminSkin");
    if (!placeholder) return;
    placeholder.options.add(opt);
});
*/

/* Reference Popups */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:ReferencePopups/code.js"
    ]
});
//</source>