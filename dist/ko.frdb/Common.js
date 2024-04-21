/**
 * 이 스크립트는 위키백과 전체에 적용됩니다. 고칠 때는 주의해주세요.
 * [[위키백과:위키프로젝트 시스템]] 참고
 *
 * 스크립트를 넣을 때는 충분한 설명, 출처를 넣어주세요! 이후 관리가 어려워집니다.
 **/

// Overwriting deprecated functions that have a follower that (also) accepts the same syntax:
// from [[commons:MediaWiki:Common.js]]
window.addPortletLink = mw.util.addPortletLink;
window.getParamValue = mw.util.getParamValue;

// Import more specific scripts if necessary

if( wgNamespaceNumber == 6 ) {
    importScript('MediaWiki:Common.js/file.js');
}
 
/* 관리자용 css/js 불러오기.
 * [[en:MediaWiki:Common.js]]에서.
 * 관리자일 경우 [[MediaWiki:Sysop.js]]를 불러오는 기능입니다.
 */
if ( $.inArray( 'sysop', wgUserGroups) > -1 ) {
 importStylesheet('MediaWiki:Sysop.css');
 if ( !window.disableSysopJS ) {
  $(function(){
   importScript('MediaWiki:Sysop.js');
  });
 }
}

/* from en: */
/* Test if an element has a certain class
 *
 * @deprecated:  Use $(element).hasClass() instead.
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/* ([[위키백과:관리자 요청/2007년 5월#스크립트 추가 요청]]) */
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[:en:Wikipedia:NavFrame]].
 *  Maintainers: [[:en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "숨기기";
var expandCaption = "보이기";
 
function collapseTable( tableIndex ){
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
 
function createCollapseButtons(){
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
            ButtonLink.setAttribute( "href", "#" );
            addHandler( ButtonLink,  "click", new Function( "evt", "collapseTable(" + tableIndex + " ); return killEvt( evt );") );
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
 
$( createCollapseButtons );

/* ([[위키백과:관리자 요청/2007년 5월#스크립트 추가 요청]]) */
/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[:en:Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar){
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton(){
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
            var isCollapsed = hasClass( NavFrame, "collapsed" );
            /*
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                    if ( NavChild.style.display == 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
 
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(var j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}
 
$( createNavigationBarToggleButton );


// [[위키백과:사랑방/2007년 10월#미리 보기 강제 실시]] 참고
// 소스: 프랑스어 위키백과
/**
  * Force IP to preview before saving changes.
  * Copyright Marc Mongenet, 2006
  */
function forcePreview() {
  if (wgUserName != null || wgAction != "edit") return;
  saveButton = document.getElementById("wpSave");
  if (!saveButton) return;
  saveButton.disabled = true;
  saveButton.value = "저장 (미리 보기 후)";
  saveButton.style.fontWeight = "normal";
  document.getElementById("wpPreview").style.fontWeight = "bold";
}
$( forcePreview );

/*
알찬 글과 좋은 글에 별표 붙이는 스크립트
*/
function LinkFA() 
{
    if ( document.getElementById( "p-lang" ) ) {
        var InterwikiLinks = document.getElementById( "p-lang" ).getElementsByTagName( "li" );
 
        for ( var i = 0; i < InterwikiLinks.length; i++ ) {
            if ( document.getElementById( InterwikiLinks[i].className + "-fa" ) ) {
                InterwikiLinks[i].className += " FA"
                InterwikiLinks[i].title = "알찬 글로 선정되었습니다.";
            } else if ( document.getElementById( InterwikiLinks[i].className + "-ga" ) ) {
                InterwikiLinks[i].className += " GA"
                InterwikiLinks[i].title = "좋은 글로 선정되었습니다.";
            }
        }
    }
}
 
$( LinkFA );

/* 대문의 "프로젝트" 탭을 "대문"으로 바꿉니다.
- 영어 위키백과 common.js의 main page 스크립트를 약간 변형 */

if (wgPageName == "위키백과:대문" || wgPageName == "위키백과토론:대문") {
 $(function () {
        var nstab = document.getElementById('ca-nstab-project');
        if (nstab) {
            while (nstab.firstChild) { nstab = nstab.firstChild; }
            nstab.nodeValue = '대문';
        }
    });
}

/***** 그림 정보 틀을 자동으로 불러옴 ********
 * Adds a link to subpages of current page
 * from commons.wikimedia.org
 *  Maintainers: [[User:Yonidebest]], [[User:Dschwen]]
 *  [[사용자:Kwj2772]]가 수정
 *  JSconfig items: bool 'loadAutoInformationTemplate'
 *                       (true=enabled (default), false=disabled)
 * JSConfig를 사용하지 않도록 수정함. --[[사용자:Klutzy|klutzy]] ([[사용자토론:Klutzy|토론]]) 2009년 9월 27일 (일) 20:33 (KST)
 ****/
if (wgCanonicalSpecialPageName == 'Upload') {
  importScript('MediaWiki:Upload.js');
}

/** Mobile Redirect Helper ************************************************
 *
 *  Redirects to the mobile-optimized gateway at en.m.wikimedia.org
 *  for viewers on iPhone, iPod Touch, Palm Pre, and Android devices.
 *
 *  You can turn off the redirect by setting the cookie "stopMobileRedirect=true"
 *
 *  This code cannot be imported, because the JS only loads after all other files
 *  and this was causing major issues for users with mobile devices. Must be loaded
 *  *before* the images and etc of the page on all mobile devices.
 *
 *  Maintainer: [[User:Brion VIBBER]], [[User:hcatlin]]
 */
/*
 * 요청에 의해 [[:en:MediaWiki:Common.js]]에서 가져옴.
 * 쿠키에 stopMobileRedirect=true 를 추가하면 비활성화됩니다.
 *  * [[위키백과:사랑방/2009년 제32주#모바일 위키백과]]
 *  * [[위키백과:사랑방/2009년 제50주#모바일 페이지로의 자동 이동 (auto-forward)]]
*/
if (/(Android|iPhone|iPod|webOS|NetFront|Opera Mini|SEMC-Browser|PlayStation Portable|Nintendo Wii)/.test(navigator.userAgent)) {
 
  var wgMainPageName = '위키백과:대문';
 
  var stopMobileRedirectCookieExists = function() {
    return (document.cookie.indexOf("stopMobileRedirect=true") >= 0);
  }
 
  var mobileSiteLink = function() {
    if (wgCanonicalNamespace == 'Special' && wgCanonicalSpecialPageName == 'Search') {
        var pageLink = '?search=' + encodeURIComponent(document.getElementById('searchText').value);
    } else if (wgPageName == wgMainPageName) {
        var pageLink = '::Home'; // Special case
    } else {
        var pageLink = encodeURIComponent(wgPageName).replace('%2F','/').replace('%3A',':');
    }
    return 'http://' + wgContentLanguage + '.m.wikipedia.org/wiki/' + pageLink + "?wasRedirected=true"
  }
 
  if (!stopMobileRedirectCookieExists()) {
    document.location = mobileSiteLink();
  }
}

/* 인터랙티브 지도. 영어 위키백과에서 가져옴. -- [[사용자:ChongDae]] 2010년 3월 28일 (일) 02:08 (KST) */
/** WikiMiniAtlas *******************************************************
  *
  *  Description: WikiMiniAtlas is a popup click and drag world map.
  *               This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
  *               The script itself is located on meta because it is used by many projects.
  *               See [[Meta:WikiMiniAtlas]] for more information. 
  *  Maintainers: [[User:Dschwen]]
  */
 
var metaBase = 'http://meta.wikimedia.org';
if ( mw.config.get( 'wgServer' ) == 'https://secure.wikimedia.org' ) {
 var metaBase = 'https://secure.wikimedia.org/wikipedia/meta';
}
mw.loader.load(metaBase + '/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400');

/* 보안 서버 링크 스크립트
 * 보안 서버에 있을 때 일반 링크를 보안 서버 링크로 변경하여 일반 서버 접속으로 전환되는 것을 최소화
 * [[미디어위키토론:Common.js#보안 서버용 스크립트]]
 * [[사용자:IRTC1015]] 2011년 1월 9일 (일) 23:06 (KST)
 */
if (wgServer == "https://secure.wikimedia.org") {
    mw.loader.load('https://secure.wikimedia.org/wikipedia/en/w/index.php?title=MediaWiki:Common.js/secure.js&action=raw&ctype=text/javascript');
}