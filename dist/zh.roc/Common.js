/*
=== 工具提示與快捷鍵 ===
<pre>*/
ta = {};
ta['pt-userpage'] = ['.','我的用戶頁'];
ta['pt-anonuserpage'] = ['.','您編輯本站所用IP的對應用戶頁'];
ta['pt-mytalk'] = ['n','我的對話頁'];
ta['pt-anontalk'] = ['n','對於來自此IP地址編輯的討論'];
ta['pt-preferences'] = ['','我的參數設置'];
ta['pt-watchlist'] = ['l','監視列表'];
ta['pt-mycontris'] = ['y','我的貢獻列表'];
ta['pt-login'] = ['o','建議你登錄，儘管並非必須。'];
ta['pt-anonlogin'] = ['o','建議你登錄，儘管並非必須。'];
ta['pt-logout'] = ['o','退出'];
ta['ca-article'] = ['a','流覽條目正文'];
ta['ca-talk'] = ['t','關於條目正文的討論'];
ta['ca-edit'] = ['e','你可編輯此頁。請在保存前先預覽一下。'];
ta['ca-addsection'] = ['+','在該討論頁增加新的評論主題。'];
ta['ca-viewsource'] = ['e','該頁面已被保護。你可以查看該頁源碼。'];
ta['ca-history'] = ['h','本頁面的早前版本。'];
ta['ca-protect'] = ['=','保護本頁'];
ta['ca-unprotect'] = ['=','重新設定本頁的保護許可權'];
ta['ca-delete'] = ['d','刪除本頁'];
ta['ca-undelete'] = ['d','將這個頁面恢復到被刪除以前的狀態'];
ta['ca-move'] = ['m','移動本頁'];
ta['ca-nomove'] = ['','你不能移動這個頁面'];
ta['ca-watch'] = ['w','將此頁面加入監視列表'];
ta['ca-unwatch'] = ['w','將次頁面從監視列表中移去'];
ta['search'] = ['f','搜索偽基百科'];
ta['p-logo'] = ['','首頁'];
ta['n-mainpage'] = ['z','訪問首頁'];
ta['n-portal'] = ['','關於本計畫、你可以做什麼、應該如何做'];
ta['n-Featured_articles']=['','查看中文偽基百科的特色條目'];
ta['n-currentevents'] = ['','提供當前新聞事件的背景資料'];
ta['n-recentchanges'] = ['r','列出偽基百科中的最近修改'];
ta['n-randompage'] = ['x','隨機載入一個頁面'];
ta['n-help'] = ['','尋求幫助'];
ta['n-contact'] = ['','如何聯絡偽基百科'];
ta['n-villagepump'] = ['','參與偽基百科社群的討論'];
ta['n-conversion'] = ['','提出繁簡體轉換請求'];
ta['n-allpages'] = ['','流覽所有頁面的清單'];
ta['n-sitesupport'] = ['','資助我們'];
ta['t-whatlinkshere'] = ['j','列出所有與本頁相鏈的頁面'];
ta['t-recentchangeslinked'] = ['k','頁面鏈出所有頁面的更改'];
ta['feed-rss'] = ['','本頁的RSS聚合'];
ta['feed-atom'] = ['','本頁的Atom聚合'];
ta['t-contributions'] = ['','查看該用戶的貢獻列表'];
ta['t-emailuser'] = ['','給該用戶發送電子郵件'];
ta['t-upload'] = ['u','上傳圖像或多媒體檔'];
ta['t-specialpages'] = ['q','全部特殊頁面的列表'];
ta['ca-nstab-main'] = ['c','查看頁面內容'];
ta['ca-nstab-user'] = ['c','查看用戶頁'];
ta['ca-nstab-media'] = ['c','查看媒體頁'];
ta['ca-nstab-special'] = ['','這是一個特殊頁面，你不能對其進行編輯。'];
ta['ca-nstab-wp'] = ['a','查看本站計畫頁面'];
ta['ca-nstab-image'] = ['c','查看圖像頁'];
ta['ca-nstab-mediawiki'] = ['c','查看系統資訊'];
ta['ca-nstab-template'] = ['c','查看範本'];
ta['ca-nstab-help'] = ['c','查看幫助頁面'];
ta['ca-nstab-category'] = ['c','查看分類頁面'];
ta['ca-nstab-project'] = ['a','查看專案頁面'];
// 相容性修正
if (window.showModalDialog && document.compatMode && document.compatMode == "CSS1Compat")
{
  var oldWidth;
  var docEl = document.documentElement;

  function fixIEScroll()
  {
    if (!oldWidth || docEl.clientWidth > oldWidth)
      doFixIEScroll();
    else
      setTimeout(doFixIEScroll, 1);

    oldWidth = docEl.clientWidth;
  }

  function doFixIEScroll() {
    docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
  }

try{
  document.attachEvent("onreadystatechange", fixIEScroll);
  attachEvent("onresize", fixIEScroll);
} catch(e1){
}

}

// onload事件處理添加器
function addLoadEvent(func)
{
  if (window.addEventListener)
    window.addEventListener("load", func, false);
  else if (window.attachEvent)
    window.attachEvent("onload", func);
}

// 移動元素
function elementMoveto(node, refNode, pos){//默認位置為refNode前
	if(node && refNode){
		var parent=refNode.parentNode;
		if (pos && pos=='after') refNode=refNode.nextSibling;
		try {
		    parent.insertBefore(node, refNode);
		} catch (DOMException) {};
	}
}

/*</pre>

=== 特色條目鏈結顯示===
<pre>*/ 
function LinkFA()
{
   // iterate over all <span>-elements
   for(var i=0; a = document.getElementsByTagName("span")[i]; i++) {
      // if found a FA span
      if(a.className == "FA") {
         // iterate over all <li>-elements
         for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
            // if found a FA link
            if(b.className == "interwiki-" + a.id) {
               b.style.padding = "0 0 0 16px";
               b.style.backgroundImage = "url('https://images.wikia.nocookie.net/zh.uncyclopedia/images/6/60/LinkFA-star.png')";
               b.style.backgroundRepeat = "no-repeat";
               b.title = "此條目為特色條目";
            }
         }
      }
   }
}

addLoadEvent(LinkFA);


/*</pre>

=== 編輯工具按鈕===
*/ 

if (typeof mwCustomEditButtons!="undefined"&&mwCustomEditButtons)
{
    function addEditButton(imageFile, tagOpen, sampleText, tagClose, speedTip)
    {
        mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/" + imageFile,
        "tagOpen": tagOpen,
        "sampleText": sampleText,
        "tagClose": tagClose,
        "speedTip": speedTip
        };
    }

    addEditButton("he/e/e9/Button_headline2.png", "=== ", "標題文本", " ===", "三級子標題");
    addEditButton("commons/9/97/Template_button.png", "{{", "範本名", "}}", "應用範本");
    addEditButton("he/e/ea/Button_align_left.png", '<div style="direction: ltr;">\n', "左對齊", "\n</div>", "左對齊");
    addEditButton("he/5/5f/Button_center.png", '<div style="text-align: center;">\n', "居中", "\n</div>", "居中");
    addEditButton("he/6/60/Button_insert_table.png", '\n{| border="1" \n|- \n| 第一部分 || 第二部分 \n|- \n| 第三部分 || 第四部分',"","\n|}\n", "插入表格");
    addEditButton("he/1/13/Button_enter.png", "<br />", "", "", "換行");
    addEditButton("he/8/80/Button_upper_letter.png", "<sup>", "上標", "</sup>", "上標");
    addEditButton("he/7/70/Button_lower_letter.png", "<sub>", "下標", "</sub>", "下標");
    addEditButton("commons/5/56/Button_big.png", '<span style="font-size:larger;">', "放大", "</span>", "放大");
    addEditButton("commons/5/58/Button_small.png", '<span style="font-size:smaller;">', "縮小", "</span>", "縮小");
    addEditButton("commons/9/9e/Btn_toolbar_gallery.png", "<gallery>\n", "Image:PictureFileName.jpg|圖片題注\nImage:PictureFileName.jpg|圖片題注", "\n</gallery>", "畫廊");
    addEditButton("en/c/c8/Button_redirect.png", "#REDIRECT [[", "目標條目名", "]]", "復位向");
    addEditButton("he/8/8e/Button_shifting.png", ":", "", "", "縮進");
    addEditButton("he/f/fd/Button_blockquote.png", '<blockquote style="border: 1px solid blue; padding: 0.5em 0.8em;">\n', "引文", "\n</blockquote>", "塊引用");
    addEditButton("he/2/23/Button_code.png", "<code>", "代碼", "</code>", "代碼文本");
    addEditButton("he/9/93/Button_sub_link.png", "[[條目#", "章節|文本", "]]", "內部段落鏈結");
    addEditButton("he/d/d3/Button_definition_list.png", "\n; ", "釋義", " : ", "定義文本");
    addEditButton("he/1/1e/Button_font_color.png", '<span style="color: ColorName;">', "顏色文本", "</span>", "彩色文本");
    addEditButton("he/3/34/Button_hide_comment.png", "<!-- ", "隱藏文字", " -->", "注釋或隱藏文字");
}

/*

=== 增加特殊符號的下拉選單 ===
<pre>*/ 
/* add menu for selecting subsets of secial characters */
/***** must match MediaWiki:Edittools *****/
function addCharSubsetMenu() {
	var edittools = document.getElementById('editpage-specialchars');
	if (edittools) {
		var name;
		var menu=document.createElement("select");
		menu.style.display="inline";
		var line = edittools.getElementsByTagName('p');
		for (var i = 0; i < line.length ; i++) {
			if(line[i].title)name=line[i].title;
			else name = line[i].id;
			menu.options[menu.options.length]=new Option(name);
		}
		menu.onchange=function(){chooseCharSubset(this.selectedIndex);};
		edittools.insertBefore(menu,edittools.firstChild);
		chooseCharSubset(0);
	}
}

/* select subsection of special characters */
function chooseCharSubset(s) {
	var l = document.getElementById('editpage-specialchars').getElementsByTagName('p');
	for (var i = 0; i < l.length ; i++) {
		l[i].style.display = i == s ? 'inline' : 'none';
		l[i].style.visibility = i == s ? 'visible' : 'hidden';
	}
}

addLoadEvent(addCharSubsetMenu);

/*</pre>

=== 調整工具位置 ===
<pre>*/ 
function fixToolbar(){
	var wpEditToolbar=document.getElementById("toolbar");
	//移動下拉選單
	var dropdownListEditTools=document.getElementById("dropdownListEditTools");
	elementMoveto(dropdownListEditTools , wpEditToolbar , 'after' );
	if(dropdownListEditTools)dropdownListEditTools.style.display="block";
	//移動符號表
	var editspecialchars=document.getElementById("editpage-specialchars"); 	 
	elementMoveto(editspecialchars , wpEditToolbar , 'after' ); 	 
}

addLoadEvent(fixToolbar);

/*</pre>

=== 增加折迭功能 ===
<pre>*/ 
/*var NavigationBarHide = '隱藏 ▲';
var NavigationBarShow = '顯示 ▼';
// NavigationBarShowDefault 設置最少不折迭的個數
// 當折迭欄個數多於NavigationBarShowDefault時，頁面載入後隱藏所有折迭欄。
// 當折迭欄個數不多於NavigationBarShowDefault時，頁面載入後展開所有折迭欄。
var NavigationBarShowDefault = 0;

function toggleNavigationBar(indexNavigationBar)
{
   var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
   var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

   if (!NavFrame || !NavToggle) {
       return false;
   }

   if (NavToggle.firstChild.data == NavigationBarHide) {
       for (
               var NavChild = NavFrame.firstChild;
               NavChild != null;
               NavChild = NavChild.nextSibling
           ) {
           if (NavChild.className == 'NavPic') {
               NavChild.style.display = 'none';
           }
           if (NavChild.className == 'NavContent') {
               NavChild.style.display = 'none';
           }
           NavToggle.firstChild.data = NavigationBarShow;
       }

   } else if (NavToggle.firstChild.data == NavigationBarShow) {
       for (
               var NavChild = NavFrame.firstChild;
               NavChild != null;
               NavChild = NavChild.nextSibling
           ) {
           if (NavChild.className == 'NavPic') {
               NavChild.style.display = 'block';
           }
           if (NavChild.className == 'NavContent') {
               NavChild.style.display = 'block';
           }
           NavToggle.firstChild.data = NavigationBarHide;
       }
   }
}

function createNavigationBarToggleButton()
{
   var indexNavigationBar = 0;
   var subdiv;

   for(
           var i=0;
           NavFrame = document.getElementsByTagName("div")[i];
           i++
       ) {

       if (NavFrame.className == "NavFrame") {

           indexNavigationBar++;
           var NavToggle = document.createElement("a");
           NavToggle.className = 'NavToggle';
           NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
           NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

           var NavToggleText = document.createTextNode(NavigationBarHide);
           NavToggle.appendChild(NavToggleText);
           for(var ih=0; subdiv = NavFrame.childNodes[ih]; ih++ ) {
              if (subdiv.className == "NavHead") {
                subdiv.appendChild(NavToggle);
                break;
              }
           }

           NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
       }
   }

   if (NavigationBarShowDefault < indexNavigationBar) {
       for(
               var i=1;
               i<=indexNavigationBar;
               i++
       ) {
           toggleNavigationBar(i);
       }
   }

   //修正折迭後定位變化
   if(location.hash)location.href=location.hash;
}

addLoadEvent(createNavigationBarToggleButton);*/

/*</pre>

=== 首頁變化效果 ===
<pre>*/
var mpTitleHans = "首頁";
var mpTitleHant = "首頁";
var isMainPage = ((document.title.substr(0, document.title.lastIndexOf(" - ")) == mpTitleHant) || (document.title.substr(0, document.title.lastIndexOf(" - ")) == mpTitleHans));
var isDiff = (document.location.search && (document.location.search.indexOf("diff=") != -1 || document.location.search.indexOf("oldid=") != -1));

if (isMainPage && !isDiff) 
{
document.write('<style type="text/css">/*<![CDATA[*/ #lastmod, #siteSub, #contentSub/*, h1.firstHeading { display: none !important; }*/ /*]]>*/</style>');

var mpSmallEnabled;
var mpMinWidth = 700;

function mainPageTransform()
{
       if ((isMainPage || (/[\/=:]{{urlencode:首頁}}/.test(document.location) || /[\/=:]{{urlencode:首頁}}/.test(document.location))) && document.getElementById('ca-nstab-main'))     
       document.getElementById('ca-nstab-main').firstChild.innerHTML = '首頁';
	var mpContentEl = document.getElementById("bodyContent");
	var mpBrowseEl = document.getElementById("EnWpMpBrowse");
	var mpContainEl = document.getElementById("EnWpMpBrowseContainer");
	var mpMarginEl = document.getElementById("EnWpMpMargin");
	var mpEl = document.getElementById("EnWpMainPage");

	if (!mpContentEl || !mpBrowseEl || !mpContainEl || !mpMarginEl || !mpEl)
		return;

	if (!mpSmallEnabled && mpContentEl.offsetWidth < mpMinWidth)
	{
		mpContainEl.insertBefore(mpBrowseEl, mpContainEl.firstChild);
		mpBrowseEl.className = "EnWpMpBrowseBottom";
		mpMarginEl.style.marginRight = 0;
		mpSmallEnabled = true;
	}
	else if (mpSmallEnabled && mpContentEl.offsetWidth > mpMinWidth)
	{
		mpEl.insertBefore(mpBrowseEl, mpEl.firstChild);
		mpBrowseEl.className = "EnWpMpBrowseRight";
		mpMarginEl.style.marginRight = "13.8em";
		mpSmallEnabled = false;
	}
}

var onloadFuncts = [ mainPageTransform ];

if (window.addEventListener) 
  window.addEventListener("resize", mainPageTransform, false);
else if (window.attachEvent) 
  window.attachEvent("onresize", mainPageTransform);

}

//</pre>

/* 記住保持[[MediaWiki:Standard.js]]與本腳本同步 */

/* Any JavaScript here will be loaded for all users on every page load.
==可摺疊範本==
<pre><nowiki>*/

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// Documentation on wikipedia at [[Wikipedia:NavFrame|NavFrame]]
 
// set up the words in your language
var NavigationBarHide = '[隱藏]';
var NavigationBarShow = '[顯示]';
 
// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
var NavigationBarShowDefault = 0;
 
 
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
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
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
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
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
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {
 
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
              if (NavFrame.childNodes[j].className == "NavHead") {
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
 
addOnloadHook(createNavigationBarToggleButton);

// END Dynamic Navigation Bars
// ============================================================

/*</nowiki></pre>*/
/*
== 編輯首段 ==
<pre><nowiki>*/

if (wgIsArticle) {
	onloadFuncts.push(function(){
		var caEdit=document.getElementById&&document.getElementById('ca-edit');
		if (!caEdit){return;}
		var caEdit0 = document.createElement('LI');
		var id = caEdit0.id = 'ca-edit-0';
		ta[id] = ['0', '編輯首段'];
		caEdit0.className = caEdit.className;
		caEdit.className = 'istalk';
		var link = document.createElement('A');
		if (caEdit.children) {
			link.href = caEdit.children[0].href + '&section=0';
		} else {
			link.href = caEdit.childNodes[0].href + '&section=0';
		}
		link.appendChild(document.createTextNode('0'));
		caEdit0.appendChild(link); +
		caEdit.parentNode.insertBefore(caEdit0,caEdit.nextSibling);

		var pref;
		if (is_safari || navigator.userAgent.toLowerCase().indexOf('mac') + 1
			|| navigator.userAgent.toLowerCase().indexOf('konqueror') + 1 ) {
			pref = 'control-';
		} else if (is_opera) {
			pref = 'shift-esc-';
		} else if (is_ff2_x11) {
			pref = 'ctrl-shift-';
		} else if (is_ff2_win) {
			pref = 'alt-shift-';
		} else {
			pref = 'alt-';
		}
		link.accessKey = ta[id][0];
		caEdit0.title= ta[id][1]+' ['+pref+ta[id][0]+']';
		//updateTooltipAccessKeys([caEdit0]);
		//akeytt([id]);
	});
}

/*</nowiki></pre>
==導入模塊==
<pre><nowiki>*/
function getWikiPath(page,prep){
        prep.ctype=prep.ctype||'text';
        prep.dontcountme=prep.dontcountme||'s';
        prep.action=prep.action||'raw';
        var url = wgScriptPath + '/index.php?title=' + encodeURI( page.replace( ' ', '_' ) );
        for(var k in prep){url += '&' + k + '=' + prep[k]; }
        return url;
}
function importScript( page ) {
        var url= /^https?:\/\//.test(page) ? page : getWikiPath(page,{'ctype':'text/javascript'});
        var scriptElem = document.createElement( 'script' );
        scriptElem.setAttribute( 'src' , url );
        scriptElem.setAttribute( 'type' , 'text/javascript' );
        document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
}
function importStylesheet( page ) {
        var url= /^https?:\/\//.test(page) ? page : getWikiPath(page,{'ctype':'text/css'});
        var styleElem = document.createElement( 'style' );
        styleElem.setAttribute( 'type' , 'text/css' );
        styleElem.appendChild( document.createTextNode( '@import "' + sheet +'";' ) );
        document.getElementsByTagName( 'head' )[0].appendChild( styleElem );
}
/*</nowiki></pre>
==“返回上一頁”範本==
<pre><nowiki>*/
function addBackPage() {
	// iterate over all < span >-elements
	for (var i=0; backLinkSpan = document.getElementsByTagName("span")[i]; i++) {
		if (backLinkSpan.className == "backpage") {
			var link = document.createElement("a");
			link.setAttribute('href', 'javascript:history.back();');
			while (backLinkSpan.childNodes.length > 0) {
				link.appendChild(backLinkSpan.firstChild);
			}
			backLinkSpan.appendChild(link);
		}
	}
}

addOnloadHook(addBackPage);
/*</nowiki></pre>

==USERNAME範本==
<pre><nowiki>*/

function UserNameReplace() {
if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace) return;
   for(var i=0; UserName = document.getElementsByTagName("span")[i]; i++) {
       if ((wgUserName)&&(UserName.className == "insertusername")) {
           UserName.innerHTML = wgUserName;
       }
   }
}

addOnloadHook(UserNameReplace);
/*</nowiki></pre>*/


/*
==LogoChange範本==
*/

function noLogo() {
   if (document.getElementById('nologo')) document.getElementById('p-logo').style.display = 'none';
}
addOnloadHook(noLogo);