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
ta['ca-article'] = ['a','瀏覽條目正文'];
ta['ca-talk'] = ['t','關於條目正文的討論'];
ta['ca-edit'] = ['e','你可編輯此頁。請在保存前先預覽一下。'];
ta['ca-addsection'] = ['+','在該討論頁增加新的評論主題。'];
ta['ca-viewsource'] = ['e','該頁面已被保護。你可以查看該頁源碼。'];
ta['ca-history'] = ['h','本頁面的早前版本。'];
ta['ca-protect'] = ['=','保護本頁'];
ta['ca-unprotect'] = ['=','重新設定本頁的保護權限'];
ta['ca-delete'] = ['d','刪除本頁'];
ta['ca-undelete'] = ['d','將這個頁面恢復到被刪除以前的狀態'];
ta['ca-move'] = ['m','移動本頁'];
ta['ca-nomove'] = ['','你不能移動這個頁面'];
ta['ca-watch'] = ['w','將此頁面加入監視列表'];
ta['ca-unwatch'] = ['w','將次頁面從監視列表中移去'];
ta['search'] = ['f','搜索本站'];
ta['p-logo'] = ['','首頁'];
ta['n-mainpage'] = ['z','訪問首頁'];
ta['n-portal'] = ['','關於本計劃、你可以做什麼、應該如何做'];
ta['n-Featured_articles']=['','查看中文本站的特色條目'];
ta['n-currentevents'] = ['','提供當前新聞事件的背景資料'];
ta['n-recentchanges'] = ['r','列出本站中的最近修改'];
ta['n-randompage'] = ['x','隨機載入一個頁面'];
ta['n-help'] = ['','尋求幫助'];
ta['n-contact'] = ['','如何聯絡本站'];
ta['n-villagepump'] = ['','參與本站社群的討論'];
ta['n-conversion'] = ['','提出繁簡體轉換請求'];
ta['n-allpages'] = ['','瀏覽所有頁面的清單'];
ta['n-sitesupport'] = ['','資助我們'];
ta['t-whatlinkshere'] = ['j','列出所有與本頁相鏈的頁面'];
ta['t-recentchangeslinked'] = ['k','頁面鏈出所有頁面的更改'];
ta['feed-rss'] = ['','本頁的RSS聚合'];
ta['feed-atom'] = ['','本頁的Atom聚合'];
ta['t-contributions'] = ['','查看該用戶的貢獻列表'];
ta['t-emailuser'] = ['','給該用戶發送電子郵件'];
ta['t-upload'] = ['u','上傳圖像或多媒體文件'];
ta['t-specialpages'] = ['q','全部特殊頁面的列表'];
ta['ca-nstab-main'] = ['c','查看頁面內容'];
ta['ca-nstab-user'] = ['c','查看用戶頁'];
ta['ca-nstab-media'] = ['c','查看媒體頁'];
ta['ca-nstab-special'] = ['','這是一個特殊頁面，你不能對其進行編輯。'];
ta['ca-nstab-wp'] = ['a','查看本站計劃頁面'];
ta['ca-nstab-image'] = ['c','查看圖像頁'];
ta['ca-nstab-mediawiki'] = ['c','查看系統信息'];
ta['ca-nstab-template'] = ['c','查看模板'];
ta['ca-nstab-help'] = ['c','查看幫助頁面'];
ta['ca-nstab-category'] = ['c','查看分類頁面'];
ta['ca-nstab-project'] = ['a','查看項目頁面'];
// 兼容性修正
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

  document.attachEvent("onreadystatechange", fixIEScroll);
  attachEvent("onresize", fixIEScroll);
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

=== 特色條目鏈接顯示===
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
               b.style.backgroundImage = "url('http://upload.wikimedia.org/wikipedia/en/6/60/LinkFA-star.png')";
               b.style.backgroundRepeat = "no-repeat";
               b.title = "此條目為特色條目";
            }
         }
      }
   }
}

addLoadEvent(LinkFA);


/*</pre>
=== 表格生成器===
<pre>*/ 
/**
 *
 * English: Generate an  a r r a y  using Mediawiki syntax
 *
 * @author: fr:user:dake
 * @version: 0.1
 */
 
function generateTableau(nbCol, nbRow, border, styleHeader, styleLine)
{
        var code = "\n";
        if (styleHeader==1) {
                code += '{\{entête tableau charte}\}\n';
        } else {
                code += '{| border="' + border + '"\n';
                code += '|+ 表格標題\n';
        }
        
        for (var i=0;i<nbCol;i++) code += '! 表頭 ' + i + '\n'
        
        for (var j=0;j<nbRow;j++) {
                if ((j+1)%2==0 && styleLine==1) {
                        code += '|-{'+'{grey row}'+'}\n'
                } else {                
                        code += '|-----\n'
                }
                
                for (var i=0;i<nbCol;i++) code += '| 內容\n';
        }
        
        code += '|}';
        insertTags('','', code); 
}

/**
 *
 * English: Open a popup with parameters to generate an  a r r a y. 
 * The number of rows/columns can be modified. Some additional
 * parameters are related to templates available on :fr
 *
 * @author: fr:user:dake
 * @version: 0.1
 */
 
function popupTableau()
{
  var popup = window.open('','name','height=400,width=500');
  
  javaCode =  '<script type="text\/javascript">function insertCode(){';
  javaCode += 'var row = parseInt(document.paramForm.inputRow.value); '
  javaCode += 'var col = parseInt(document.paramForm.inputCol.value); '
  javaCode += 'var bord = parseInt(document.paramForm.inputBorder.value); '
  javaCode += 'var styleHeader = document.paramForm.inputHeader.checked; '
  javaCode += 'var styleLine = document.paramForm.inputLine.checked; '
  javaCode += 'window.opener.generateTableau(col,row,bord,styleHeader,styleLine); '
  javaCode += '}<\/script>';
  
  popup.document.write('<html><head><title>表格參數</title>');
  popup.document.write('<script type="text\/javascript" src="\/skins-1.5\/common\/wikibits.js"><!-- wikibits js --><\/script>');
  popup.document.write('<style type="text\/css" media="screen,projection">/*<![CDATA[*/ @import "\/skins-1.5\/monobook\/main.css?5"; /*]]>*/<\/style>');
  popup.document.write(javaCode); 
  popup.document.write('</head><body>');
  popup.document.write('<p>請輸入想要生成表格的參數：</p>');
  popup.document.write('<form name="paramForm">');
  popup.document.write('行數：<input type="text" name="inputRow" value="3" ><p>');
  popup.document.write('列數：<input type="text" name="inputCol" value="3" ><p>');
  popup.document.write('邊框寬度：<input type="text" name="inputBorder" value="1" ><p>');
  popup.document.write('灰色表頭：<input type="checkbox" name="inputHeader" checked="1" ><p>');
  popup.document.write('灰色斑馬表：<input type="checkbox" name="inputLine" checked="1" ><p>');
  popup.document.write('</form">');
  popup.document.write('<p><a href="javascript:insertCode()"> 將代碼插入到編輯窗口中</a></p>');
  popup.document.write('<p><a href="javascript:self.close()"> 關閉</a></p>');
  popup.document.write('</body></html>');
  popup.document.close();
}

//增加彈出表格按鈕
function marque_tab()
{
    var toolbar = document.getElementById('toolbar');
    if (!toolbar) return false;

    var textbox = document.getElementById('wpTextbox1');
    if (!textbox) return false;

    if (!document.selection && textbox.selectionStart == null)
    return false;

    var CustomTableButt = document.createElement("img");
    CustomTableButt.width = 23;
    CustomTableButt.height = 22;
    CustomTableButt.src = 'http://upload.wikimedia.org/wikipedia/fr/0/04/Button_ar' + 'ray.png';
    CustomTableButt.border = 0;
    CustomTableButt.style.cursor = "pointer";
    CustomTableButt.alt = '自定義表格';
    CustomTableButt.onclick = function() {popupTableau(); return false;}
    toolbar.appendChild(CustomTableButt);
}

addLoadEvent(marque_tab);


/*</pre>

=== 編輯工具按鈕===
<pre>*/ 

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
    
    addEditButton("commons/9/97/Template_button.png", "{{", "模板名", "}}", "應用模板");
    addEditButton("meta/c/c9/Button_strike.png", "<del>", "刪除線", "</del>", "刪除線");
    addEditButton("he/e/ea/Button_align_left.png", '<div style="direction: ltr;">\n', "左對齊", "\n</div>", "左對齊");
    addEditButton("he/5/5f/Button_center.png", '<div style="text-align: center;">\n', "居中", "\n</div>", "居中");
    addEditButton("he/6/60/Button_insert_table.png", '\n{| border="1" \n|- \n| 第一部分 || 第二部分 \n|- \n| 第三部分 || 第四部分',"","\n|}\n", "插入表格");
    addEditButton("he/1/13/Button_enter.png", "<br />", "", "", "換行");
    addEditButton("he/8/80/Button_upper_letter.png", "<sup>", "上標", "</sup>", "上標");
    addEditButton("he/7/70/Button_lower_letter.png", "<sub>", "下標", "</sub>", "下標");
    addEditButton("commons/5/56/Button_big.png", '<span style="font-size:larger;">', "放大", "</span>", "放大");
    addEditButton("commons/5/58/Button_small.png", '<span style="font-size:smaller;">', "縮小", "</span>", "縮小");
    addEditButton("commons/9/9e/Btn_toolbar_gallery.png", "<gallery>\n", "Image:PictureFileName.jpg|圖片題注\nImage:PictureFileName.jpg|圖片題注", "\n</gallery>", "畫廊");
    addEditButton("en/c/c8/Button_redirect.png", "#REDIRECT [[", "目標條目名", "]]", "重定向");
    addEditButton("he/e/e9/Button_headline2.png", "=== ", "標題文本", " ===", "三級子標題");
    addEditButton("he/8/8e/Button_shifting.png", ":", "", "", "縮進");
    addEditButton("he/f/fd/Button_blockquote.png", '<blockquote style="border: 1px solid blue; padding: 0.5em 0.8em;">\n', "引文", "\n</blockquote>", "塊引用");
    addEditButton("he/2/23/Button_code.png", "<code>", "代碼", "</code>", "代碼文本");
    addEditButton("he/9/93/Button_sub_link.png", "[[條目#", "章節|文本", "]]", "內部段落鏈接");
    addEditButton("he/d/d3/Button_definition_list.png", "\n; ", "釋義", " : ", "定義文本");
    addEditButton("he/1/1e/Button_font_color.png", '<span style="color: ColorName;">', "顏色文本", "</span>", "彩色文本");
    addEditButton("he/3/34/Button_hide_comment.png", "<!-- ", "隱藏文字", " -->", "注釋或隱藏文字");
}

/*</pre>

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

=== 增加折疊功能 ===
<pre>*/ 
var NavigationBarHide = '隱藏 ▲';
var NavigationBarShow = '顯示 ▼';
// NavigationBarShowDefault 設置最少不折疊的個數
// 當折疊欄個數多於NavigationBarShowDefault時，頁面載入後隱藏所有折疊欄。
// 當折疊欄個數不多於NavigationBarShowDefault時，頁面載入後展開所有折疊欄。
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

   //修正折疊後定位變化
   if(location.hash)location.href=location.hash;
}

addLoadEvent(createNavigationBarToggleButton);

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