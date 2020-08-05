/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */

/* from en: */
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/*
[[:en:Wikipedia:WikiProject User scripts/Scripts/Add edit section 0]]
[[위키백과:사랑방/2007년 1월#중국어판을 보니 section 0 편집 방법이 있더군요]]
*/
// 원형은 러시아어 위키백과. 일부 수정했습니다.
/*addOnloadHook(function () {
    var x;
    if (!(x = document.getElementById('ca-edit') )) return;
    var url;
    if (!(url = x.getElementsByTagName('a')[0] )) return;
    if (!(url = url.href )) return;
    
    var body = document.getElementById ('bodyContent');
    if(!body) return;
    if(body.innerHTML.match('class="editsection"')){
        body.innerHTML = '<d'+'iv class="editsection" id="ca-edit-0">[<a href="' + url + '&section=0">편집</a>]</di'+'v>' + body.innerHTML;
    }
}
);*/
/* 영어 위키백과 버전 */
addOnloadHook(function () {
    var x;
    if (!(x = document.getElementById('ca-edit') )) return;
    var url;
    if (!(url = x.getElementsByTagName('a')[0] )) return;
    if (!(url = url.href )) return;
    var y = addPortletLink('p-cactions', url+"&section=0", '0', 'ca-edit-0',
                           '문서의 첫 부분만을 편집합니다.', '0', x.nextSibling);
 
    y.className = x.className;  // steal classes from the the edit tab...
    x.className = 'istalk';     // ...and make the edit tab have no right margin
 
    // exception: don't steal the "selected" class unless actually editing section 0:
    if (/(^| )selected( |$)/.test(y.className)) {
        if (!document.editform || !document.editform.wpSection
            || document.editform.wpSection.value != "0") {
            y.className = y.className.replace(/(^| )selected( |$)/g, "$1");
            x.className += ' selected';
        }
    }
});

/* ([[위키백과:관리자 요청/2007년 5월#스크립트 추가 요청]]) */
/** Collapsible tables *********************************************************
*
*  Description: Allows tables to be collapsed, showing only the header. See
*               Wikipedia:NavFrame.
*  Maintainers: User:R. Koot
*/
 
//var autoCollapse = 2;
//var collapseCaption = "hide";
//var expandCaption = "show";
 
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

/* ([[위키백과:관리자 요청/2007년 5월#스크립트 추가 요청]]) */
/** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[:en:Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var autoCollapse = 2;
  var collapseCaption = "숨기기";
  var expandCaption = "보이기";
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
  
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
  
  
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
  
     if (!NavFrame || !NavToggle) {
         return false;
     }
  
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
  
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
  
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
  
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
             
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
   
  }
  
  addOnloadHook( createNavigationBarToggleButton );

/* ([[위키백과:관리자 요청/2007년 5월#스크립트 추가 요청]]) */
/** "Technical restrictions" title fix *****************************************
  *
  *  Description:
  *  Maintainers: [[User:Interiot]], [[User:Mets501]]
  */
 
// For pages that have something like Template:Lowercase, replace the title, but only if it is cut-and-pasteable as a valid wikilink.
//	(for instance [[iPod]]'s title is updated.  <nowiki>But [[C#]] is not an equivalent wikilink, so [[C Sharp]] doesn't have its main title changed)</nowiki>
//
// The function looks for a banner like this: <nowiki>
// <div id="RealTitleBanner">    <!-- div that gets hidden -->
//   <span id="RealTitle">title</span>
// </div>
// </nowiki>An element with id=DisableRealTitle disables the function.
var disableRealTitle = 0;		// users can disable this by making this true from their monobook.js
if (wgIsArticle) {			// don't display the RealTitle when editing, since it is apparently inconsistent (doesn't show when editing sections, doesn't show when not previewing)
     addOnloadHook(function() {
	try {
		var realTitleBanner = document.getElementById("RealTitleBanner");
		if (realTitleBanner && !document.getElementById("DisableRealTitle") && !disableRealTitle) {
			var realTitle = document.getElementById("RealTitle");
			if (realTitle) {
				var realTitleHTML = realTitle.innerHTML;
				realTitleText = pickUpText(realTitle);
 
				var isPasteable = 0;
				//var containsHTML = /</.test(realTitleHTML);	// contains ANY HTML
				var containsTooMuchHTML = /</.test( realTitleHTML.replace(/<\/?(sub|sup|small|big)>/gi, "") ); // contains HTML that will be ignored when cut-n-pasted as a wikilink
				// calculate whether the title is pasteable
				var verifyTitle = realTitleText.replace(/^ +/, "");		// trim left spaces
				verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);	// uppercase first character
 
				// if the namespace prefix is there, remove it on our verification copy.  If it isn't there, add it to the original realValue copy.
				if (wgNamespaceNumber != 0) {
					if (wgCanonicalNamespace == verifyTitle.substr(0, wgCanonicalNamespace.length).replace(/ /g, "_") && verifyTitle.charAt(wgCanonicalNamespace.length) == ":") {
						verifyTitle = verifyTitle.substr(wgCanonicalNamespace.length + 1);
					} else {
						realTitleText = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleText;
						realTitleHTML = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleHTML;
					}
				}
 
				// verify whether wgTitle matches
				verifyTitle = verifyTitle.replace(/^ +/, "").replace(/ +$/, "");		// trim left and right spaces
				verifyTitle = verifyTitle.replace(/_/g, " ");		// underscores to spaces
				verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);	// uppercase first character
				isPasteable = (verifyTitle == wgTitle);
 
				var h1 = document.getElementsByTagName("h1")[0];
				if (h1 && isPasteable) {
					h1.innerHTML = containsTooMuchHTML ? realTitleText : realTitleHTML;
					if (!containsTooMuchHTML)
						realTitleBanner.style.display = "none";
				}
				document.title = realTitleText + " - Wikipedia, the free encyclopedia";
			}
		}
	} catch (e) {
		/* Something went wrong. */
	}
     });
}
 
 
// similar to innerHTML, but only returns the text portions of the insides, excludes HTML
function pickUpText(aParentElement) {
   var str = "";
 
   function pickUpTextInternal(aElement) {
     var child = aElement.firstChild;
     while (child) {
       if (child.nodeType == 1)		// ELEMENT_NODE 
         pickUpTextInternal(child);
       else if (child.nodeType == 3)	// TEXT_NODE
         str += child.nodeValue;
 
       child = child.nextSibling;
     }
   }
 
   pickUpTextInternal(aParentElement);
 
   return str;
}

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
addOnloadHook(forcePreview);

/* [[위키백과:관리자 요청/2007년 11월#Common.js 스크립트 추가 요청]] */
/** 
  * IE6에서 투명 PNG 처리를 위한 스크립트.
  *
  * Correctly handle PNG transparency in Internet Explorer 6.
  * http://homepage.ntlworld.com/bobosola. Updated 18-Jan-2006.
  *  
  * Adapted for Wikipedia by Remember_the_dot and Edokter.
  *  
  * http://homepage.ntlworld.com/bobosola/pnginfo.htm states "This page contains more information for
  * the curious or those who wish to amend the script for special needs", which I take as permission to
  * modify or adapt this script freely. I release my changes into the public domain.
  */  
 
function PngFix()
{
    if (document.body.filters && !window.PngFixDisabled)
    {
        var documentImages = document.images
        var documentCreateElement = document.createElement
        var funcEncodeURI = encodeURI
        
        for (var i = 0; i < documentImages.length;)
        {
            var img = documentImages[i]
            var imgSrc = img.src
            
            if (imgSrc.substr(imgSrc.length - 3).toLowerCase() == "png" && !img.onclick)
            {
                if (img.useMap)
                {
                    img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + encodeURI(imgSrc) + "')"
                    img.src = "http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif"
                    i++
                }
                else
                {
                    var outerSpan = documentCreateElement("span")
                    var innerSpan = documentCreateElement("span")
                    var outerSpanStyle = outerSpan.style
                    var innerSpanStyle = innerSpan.style
                    var imgCurrentStyle = img.currentStyle
                    
                    outerSpan.id = img.id
                    outerSpan.title = img.title
                    outerSpan.className = img.className
                    outerSpanStyle.backgroundImage = imgCurrentStyle.backgroundImage
                    outerSpanStyle.borderWidth = imgCurrentStyle.borderWidth
                    outerSpanStyle.borderStyle = imgCurrentStyle.borderStyle
                    outerSpanStyle.borderColor = imgCurrentStyle.borderColor
                    outerSpanStyle.display = "inline-block"
                    outerSpanStyle.fontSize = "0"
                    outerSpanStyle.verticalAlign = "middle"
                    if (img.parentElement.href) outerSpanStyle.cursor = "hand"
                    
                    innerSpanStyle.width = "1px"
                    innerSpanStyle.height = "1px"
                    innerSpanStyle.display = "inline-block"
                    innerSpanStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + funcEncodeURI(imgSrc) + "')"
                    
                    outerSpan.appendChild(innerSpan)
                    img.parentNode.replaceChild(outerSpan, img)
                }
            }
            else
            {
                i++
            }
        }
    }
}
 
if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.substr(22, 1) == "6")
{
    window.attachEvent("onload", PngFix)
}

/*
알찬 글에 별표 붙이는 스크립트
*/
function LinkFA() 
{
    // iterate over all <span>-elements
    for(var i=0; a = document.getElementsByTagName("span")[i]; i++) {
 
       // if found a FA span
       if(a.className == "FA") {
       var InterwikiLinks = document.getElementById( "p-lang" ).getElementsByTagName( "li" );
 
          for ( var j = 0; j < InterwikiLinks.length; j++ ) {
             if ( InterwikiLinks[j].className == "interwiki-"+a.id){
                InterwikiLinks[j].className += " FA"
                InterwikiLinks[j].title = "이 문서는 알찬 글로 선정되었습니다."
             }
          }
       }
    }
}
addOnloadHook(LinkFA);

/* 대문의 "프로젝트" 탭을 "대문"으로 바꿉니다. */

function MainPageRenameNamespaceTab() {
  try {
    var Node = document.getElementById('ca-nstab-main').firstChild;
    if (Node.textContent) {
      Node.textContent = "대문";
    } else if ( Node.innerText ) { // IE
      Node.innerText = "대문";
    } else {
      Node.replaceChild(Node.firstChild, document.createTextNode("대문")); 
    }
  } catch(e) {
  }
}
 
if (wgPageName == "대문" || wgPageName == "토론:대문") {
  addOnloadHook(MainPageRenameNamespaceTab);
}

/* 인터프로젝트 링크 기능 (meta, de.wikt, [[mediazilla:708]]) */
 
document.write('<style type="text/css">#interProject, #sisterProjects {display: none; speak: none;} #p-tb .pBody {padding-right: 0;}<\/style>');
function iProject() {
  if (document.getElementById("interProject")) {
   var iProject = document.getElementById("interProject").innerHTML;
   var interProject = document.createElement("div");
   interProject.style.marginTop = "0.7em";
   interProject.innerHTML = '<h5>'+document.getElementById("sisterProjects").firstChild.innerHTML+'<\/a><\/h5><div class="pBody">'+iProject+'<\/div>';
   document.getElementById("p-tb").appendChild(interProject);
  }
}
addOnloadHook(iProject);