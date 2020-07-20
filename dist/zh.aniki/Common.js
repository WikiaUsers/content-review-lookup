//<source lang="javascript">
/*
所有用戶在加載任何頁面時，這裡的JavaScript都會加載
*/

/** Cookies *****************************************************************************
  */

function setCookie(cookieName, cookieValue, expiryDay) {
 var today = new Date();
 var expire = new Date();
 var nDays = (!expiryDay || isNaN(expiryDay) )?30:expiryDay;
 expire.setTime( today.getTime() + (3600000 * 24 * nDays) );
 document.cookie = cookieName + "=" + escape(cookieValue)
                 + ";path=/w"
                 + ";expires="+expire.toGMTString();
 document.cookie = cookieName + "=" + escape(cookieValue)
                 + ";path=/wiki"
                 + ";expires="+expire.toGMTString();
}

function getCookie(cookieName) {
  var start = document.cookie.indexOf( cookieName + "=" );
  if ( start == -1 ) return "";
  var len = start + cookieName.length + 1;
  if ( ( !start ) &&
    ( cookieName != document.cookie.substring( 0, cookieName.length ) ) )
      {
        return "";
      }
  var end = document.cookie.indexOf( ";", len );
  if ( end == -1 ) end = document.cookie.length;
  return unescape( document.cookie.substring( len, end ) );
}

function deleteCookie(cookieName) {
  if ( getCookie(cookieName) ) {
    document.cookie = cookieName + "=" + ";path=/w" +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    document.cookie = cookieName + "=" + ";path=/wiki" +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
  }
}

/*
==定期強制用戶更新cache==

*/

if( (""+wgUserGroups).indexOf("user")!=-1 && (wgAction=="view") ){
 var today=new Date();

 if(!getCookie("lastload") || isNaN(getCookie("lastload")) ){
  setCookie("lastload", today.getTime());
 }else{

  if( today.getTime()-getCookie("lastload") >= 7*24*60*60*1000 ){
   setCookie("lastload", today.getTime());
   if( getCookie("lastload")==today.getTime() ) window.location.reload(true);
  }else if( today.getTime()-getCookie("lastload") < 0 ){
   setCookie("lastload", today.getTime());
  }

 }

}

/*
== 中文處理 ==

*/
//设置中文语言页
var htmlE=document.documentElement;
htmlE.setAttribute("lang",wgUserLanguage);
htmlE.setAttribute("xml:lang",wgUserLanguage);

//返回繁簡字串

function wgULS(hans,hant,cn,tw,hk,sg,zh){
	ret = {
		'zh-hans':hans||cn||sg,
		'zh-hant':hant||tw||hk,
		'zh-cn':cn||hans||sg,
		'zh-sg':sg||hans||cn,
		'zh-tw':tw||hant||hk,
		'zh-hk':hk||hant||tw
	}
	if (ret[wgUserLanguage])
		return ret[wgUserLanguage];
	else
		return zh||hant||hans||cn||tw||hk||sg;//保證每一語言有值
}

function wgUVS(hans,hant,cn,tw,hk,sg,zh){
	ret = {
		'zh-hans':hans||cn||sg,
		'zh-hant':hant||tw||hk,
		'zh-cn':cn||hans||sg,
		'zh-sg':sg||hans||cn,
		'zh-tw':tw||hant||hk,
		'zh-hk':hk||hant||tw
	}
	if (ret[wgUserVariant])
		return ret[wgUserVariant];
	else
		return zh||hant||hans||cn||tw||hk||sg;//保證每一語言有值
}

/* 當需要時載入對應的 scripts */

if (wgAction == "edit" || wgAction == "submit") //scripts specific to editing pages
{
    importScript("MediaWiki:Common.js/edit.js")
}
else if (wgCanonicalSpecialPageName == "Search") //scripts specific to Special:Search
{
    importScript("MediaWiki:Common.js/search.js")
}

/*

== 辅助处理 ==
*/
//功能設定
if(!window.JSConfig){var JSConfig={};}
JSConfig.collapseText=wgULS('隐藏▲','隱藏▲');//指示折叠收缩的默认文字
JSConfig.expandText=wgULS('显示▼','顯示▼');//指示折叠展开的默认文字
JSConfig.autoCollapse=2;  //文章少于 autoCollapse 个折叠块时，不自动折叠
JSConfig.SpecialSearchEnhancedDisabled=false; //是否禁止增加其它搜索引擎

//新的getElementsByClassName
/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/	
var getElementsByClassName = function (elm, tag, className){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (elm, tag, className) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className);
			if (tag=="*") return elements;
			var nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (elm, tag, className) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (elm, tag, className) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(elm, tag, className);
};

//遍历
function applyEach(callback,array){
	var i=0,j=array.length;
	while(i<j){callback(array[i++]);}
}

// 移動元素
function elementMoveto(node, refNode, pos){//默认位置为refNode前
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
//创建元素
function createElement(tag,children,props){
	var element = document.createElement(tag);
	if(!(children instanceof Array)){children=[children];}
	applyEach(function(child){
		if(typeof child=='string'){child=document.createTextNode(child);}
		if(child){element.appendChild(child);}
	},children);
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

//wiki URL
var wgProjectURL={
	en:'http://en.wikipedia.org',de:'http://de.wikipedia.org',fr:'http://fr.wikipedia.org',
	pl:'http://pl.wikipedia.org',ja:'http://ja.wikipedia.org',it:'http://it.wikipedia.org',
	nl:'http://nl.wikipedia.org',pt:'http://pt.wikipedia.org',es:'http://es.wikipedia.org',
	sv:'http://sv.wikipedia.org',//僅列前十名其它語言百科
	m:'http://meta.wikimedia.org',b:'http://zh.wikibooks.org',q:'http://zh.wikiquote.org',
	n:'http://zh.wikinews.org',wikt:'http://zh.wiktionary.org',mw:'http://www.mediawiki.org',
	commons:'http://commons.wikimedia.org'
}
/**
* 将页面名称转换为URL
*
* @param page 页面名称
* @param paras 附加后缀对象，用空对象{}做参数可以取得源码
*/
function getWikiPath(page,paras){
	var reg=/^[a-z]+:/;
	var pre=page.match(reg);
	pre = pre && wgProjectURL[pre[0].replace(/:$/,'').toLowerCase()];
	if (pre) {page=page.replace(reg,'');} else {pre=wgServer;} //保障没有相对路径，以照顾在线代理。
	var url = pre + wgScript + '?title=' + encodeURI( page.replace( ' ', '_' ) );
	if(typeof paras=='object'){
		paras.ctype=paras.ctype||'text';
		paras.dontcountme=paras.dontcountme||'s';
		paras.action=paras.action||'raw';
		for(var k in paras){url += '&' + k + '=' + paras[k]; }
	}
	return url;
}

//引入[[Special:Gadgets]]要求的腳本和樣式
if(window.requireScripts instanceof Array){
	applyEach(importScript,requireScripts);
}
if(window.requireStylesheets instanceof Array){
	applyEach(importStylesheet,requireStylesheets);
}

/* 测试元素中是否含有指定的样式 **************************************
* Description: 使用正则式与缓存来提高性能
* Maintainers: User:fdcn @zh.wikipedia
*              [[en:User:Mike Dillon]], [[en:User:R. Koot]], [[en:User:SG]] @en.wikipedia
*/
var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();

/*

== IE兼容性修正 ==
*/
function fixIE(){
}
if (navigator.appName == "Microsoft Internet Explorer"){
	/** Internet Explorer bug fix **************************************************
	 *
	 *  Description: Fixes IE horizontal scrollbar bug
	 *  Maintainers: [[User:fdcn]]
	 */
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
	attachEvent("onresize", fixIEScroll);

	//Import scripts specific to Internet Explorer 6
	if (navigator.appVersion.substr(22, 1) == "6"){
		importScript("MediaWiki:Common.js/IE60Fixes.js")
	}
}

/*

== 工具提示與快捷鍵 ==
*/
ta = {
	'ca-article'         : ['a',wgULS('浏览条目正文','瀏覽條目正文')],
	'ca-nomove'          : ['',wgULS('你不能移动这个页面','你不能移動這個頁面')],
	'n-Featured_content' : ['',wgULS('查看中文维基百科的特色内容','查看中文維基百科的特色內容')],
	'n-indexpage'        : ['',wgULS('以分类索引搜寻中文维基百科','以分類索引搜尋中文維基百科')],
	'n-commonsupload'    : ['',wgULS('把自由版权图片上传到维基共享资源','把自由版權圖片上傳到維基共享資源')],
	'n-contact'          : ['',wgULS('如何联络维基百科','如何聯絡維基百科')],
	'n-villagepump'      : ['',wgULS('参与维基百科社群的讨论','參與維基百科社群的討論')],
	'n-Information_desk' : ['',wgULS('解答任何与维基百科无关的问题的地方','解答任何與維基百科無關的問題的地方')],
	'n-conversion'       : ['',wgULS('提出字词转换请求','提出字詞轉換請求')],
	'n-allpages'         : ['',wgULS('浏览所有页面的清单','瀏覽所有頁面的清單')],
	'ca-nstab-project'   : ['a',wgULS('查看维基计划页面','查看維基計畫頁面','查看維基計劃頁面')],
	'n-policy'           : ['',wgULS('查看维基百科的方针和指引','查看維基百科的方針和指引')],
	'n-about'            : ['',wgULS('查看维基百科的简介','查看維基百科的簡介')]
}

/*

== 特色條目優良與條目鏈接顯示==
*/

addOnloadHook( function(){
	var InterwikiLinks = document.getElementById( "p-lang" );
	if ( !InterwikiLinks ) { return; }
	applyEach( function(link){
		if ( document.getElementById( link.className + "-fa" ) ) {
			link.className += " FA"
			link.title = wgULS("此条目为特色条目。","此條目為特色條目。");
		}
		if ( document.getElementById( link.className + "-ga" ) ) {
			link.className += " GA"
			link.title = wgULS("此条目为优良条目。","此條目為優良條目。");
		}
	},InterwikiLinks.getElementsByTagName("li") );
});

/*

== 增加摺疊功能 ==
*/
/** 摺疊 div table *****************************
 *  Description: 实现div.NavFrame和table.collapsible的可折叠性。
 *  JSConfig的collapseText、expandText、autoCollapse属性定义默认文字和默认最少自动折叠块
 *  Maintainers: User:fdcn
 */
function cancelBubble(e){
	e=e||window.event;
	if(e.stopPropagation){e.stopPropagation();}else{e.cancelBubble=true;}
}
function createToggleButton(head){
	var parent=head;
	if( head.tagName.toLowerCase()=='tr' ){//对表格特别处理
		if(head.getElementsByTagName("th").length){
			parent=head.cells[parent.cells.length-1];
		} else {return;}
	}
	var textS,textH,button=getElementsByClassName(head,"span","NavToggle")[0];
	if(button){parent=button.parentNode;} else{
		textS=createElement("span",[JSConfig.expandText],{'class':'toggleShow'});
		textH=createElement("span",[JSConfig.collapseText],{'class':'toggleHide'});
		button=createElement("span",[textS,textH],{'class':'NavToggle',styles:{'width':"3.8em"}});
	}
	button.style.display="inline";
	head.className+=" uncollapse toggleHotspot";
	parent.insertBefore( button, parent.childNodes[0] );
}
function wgCollapse(head,container,defaultCollapse){
	if(head){ createToggleButton(head); }
	var self=this;
	this.state=0;
	this.container=container;
	applyEach( function(h){
		if ( h.nodeType==1    
			&& !hasClass(h,"uncollapse")
			&& !hasClass(h,"toggleShow")
			&& !hasClass(h,"toggleHide")
		) { h.className+=" toggleHide"; }
	}, defaultCollapse );//预设的隐藏元素
	function getArray(clsname){
		var r=[],i=0,e,ea=getElementsByClassName(container,"*",clsname);
		while(e=ea[i++]){
			var parent=e.parentNode;
			while(!hasClass(parent,'NavFrame')&&!hasClass(parent,'collapsible')){parent=parent.parentNode;}
			if(parent==container){r.push(e);}
		}
		return r;
	}
	var toggleA=getArray("toggleShow");
	var toggleB=getArray("toggleHide");
	var hotspots=getArray("toggleHotspot");
	function _toggle(list,state){
		var i=0,e;
		while(e=list[i++]){e.style.display=state?e.showStyle||'':'none';}
	}
	this.toggle=function(state){
		self.state=(typeof state=='undefined')?1-self.state:state;
		_toggle(toggleA,self.state);
		_toggle(toggleB,1-self.state);
	}
	var i=0,h;
	while(h=hotspots[i++]){
		applyEach(function(link){
			addClickHandler(link,cancelBubble);
		},h.getElementsByTagName("A"));
		h.style.cursor = "pointer";
		addClickHandler(h,function(){self.toggle();});
	}
}
addOnloadHook(function(){
	//init
	var items=[];
	applyEach( function(NavFrame){
		var i=0,
		    child=NavFrame.childNodes,
		    head;
		while (head=child[i++]) {
			if( head.className&&hasClass(head,"NavHead") ){break;}
		}
		items.push(new wgCollapse(head,NavFrame,NavFrame.childNodes));
	},getElementsByClassName(document,"div","NavFrame") );
	applyEach ( function(table){
		var rows = table.rows;
		items.push(new wgCollapse(rows[0],table,rows));
	},getElementsByClassName(document,"table","collapsible") );
	var item,i=0,count=items.length;
	while ( item=items[i++] ) {
		item.toggle (
			hasClass(item.container,"collapsed") 
			|| ( count>=JSConfig.autoCollapse&&hasClass(item.container,"autocollapse") )
		);
	}
});
//修正摺疊後定位變化
hookEvent("load",function(){if(location.hash){location.href=location.hash;}});

/*

== 取消討論頁的[+]按鈕 ==
*/

addOnloadHook(function () {
	if(document.getElementById('no-newsection') && document.getElementById('ca-addsection')) {
		document.getElementById('ca-addsection').style.display="none";
	}
});

/*

==WikiMiniAtlas世界地圖==
*/
/** WikiMiniAtlas *******************************************************
   *
   *  描述：WikiMiniAtlas是一個popup而可點選與拖曳的世界地圖。
   *               這個腳本將會讓所有的經緯度標示中顯示WikiMiniAtlas的popup開啟按鈕。
   *               由於被許多計畫使用，因此腳本放置在元維基中。
   *               更多資訊請詳見[[Meta:WikiMiniAtlas]]。
   *  創建者：[[:en:User:Dschwen]]
   */
 
//if (wgServer == "https://secure.wikimedia.org") {
//  var metaBase = "https://secure.wikimedia.org/wikipedia/meta";
//} else {
//  var metaBase = "http://meta.wikimedia.org";
//}
//importScriptURI(metaBase+"/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400")

/*
==反frame==
*/
try {
	if (top.location != self.location) {
		top.location.replace(self.location);
	}

}catch(ex){
	top.location.replace(self.location);
}

/*
==保護選項校正==
*/

if(wgAction=="protect") {

 addOnloadHook( function(){
  var pform=document.getElementById("mw-Protect-Form");
  var timeoptions;

  timeoptions=pform["wpProtectExpirySelection-edit"].options;
  if(timeoptions[0].value!="existing"){
   timeoptions[timeoptions.length-1].selected=true;
   ProtectionForm.updateExpiryList(pform["wpProtectExpirySelection-edit"]);
  }

  timeoptions=pform["wpProtectExpirySelection-move"].options;
  if(timeoptions[0].value!="existing"){
   timeoptions[timeoptions.length-1].selected=true;
   ProtectionForm.updateExpiryList(pform["wpProtectExpirySelection-move"]);
  }
 
 });

}

/*
==站内搜索统计==
see http://wikistics.falsikon.de/

*/
// This script is needed for anonymously logging search terms by the Squids; see [[wikt:de:MediaWiki:If-search.js]]
// The search URL will contain the search term
// Please modify retroactively

// You may have to adapt this?
var searchPageName = "Special:Search";
var searchPagePath = wgArticlePath.replace('$1',searchPageName);
addOnloadHook(function() {
	var searchPairs = {
		'searchform':'searchInput',
		'powersearch':'powerSearchText',
		'search':'searchText',
		'bodySearch':'bodySearchIput'
	};
	function $(ID) {return document.getElementById(ID);}
	function SubSearch(s) {
		var se=$(s);
		var text = $(searchPairs[s]).value;
		text = text == '' ? '' : '/' + text;
		switch (s) {
			case 'searchform':
				se.action = searchPagePath + text;
				break;
			case "powersearch":
				se.getElementsByTagName("input")[0].value = searchPageName + text;
				break;
			case "search":
				se.firstChild.value = searchPageName + text;
				break;
			case "bodySearch":
				se.action = searchPagePath + text;
		}
	}

	for (s in searchPairs) {
		var e=$(s);
		if (e) {
			addHandler( e, "submit", function(){SubSearch(s);} );
			e.parentNode.innerHTML = e.parentNode.innerHTML; // f***ing IE
		}
	}
});

/*
==擷取選單文字按鈕==
*/

function addGetMenuTextButton(id, srcMenu, targetText, tiptext, afterSelIdx) {
 var btnAdd=createElement("a", ((!tiptext)?"(+)":tiptext), {
  'id': id ,
  'href' : '#'
 });
 btnAdd.srcMenu=srcMenu;
 btnAdd.targetText=targetText;
 btnAdd.afterSelIdx=(!afterSelIdx || isNaN(afterSelIdx))?0:afterSelIdx;
 btnAdd.onclick=function(){
  this.targetText.value+=this.srcMenu.options[this.srcMenu.selectedIndex].value;
  this.srcMenu.selectedIndex=this.afterSelIdx;
  return false;
 }


 srcMenu.parentNode.appendChild(btnAdd);
}

hookEvent("load", function(){
 var useForm;

 if(wgAction=="protect" || wgAction=="unprotect"){     //保護理由
  useForm=document.getElementById("mw-Protect-Form");
  addGetMenuTextButton("wpProtectReasonSelectionAdd", useForm.wpProtectReasonSelection, useForm["mwProtect-reason"], "", 0);

 }else if(wgPageName.toLowerCase()=="special:block"){     //封禁理由
  useForm=document.getElementById("blockip");
  addGetMenuTextButton("wpBlockReasonListAdd", useForm.wpBlockReasonList, useForm.wpBlockReason, "", 0);

 }

} );

/*
==修正登入後即登出問題==
*/

if( wgCanonicalSpecialPageName=="Userlogin" ) {
 if( (""+window.location).indexOf("returnto=Special:"+encodeURIComponent("用户登出"))>=0
  || (""+window.location).indexOf("returnto=Special:用户登出")>=0
 ) {
  window.location.replace(wgServer+wgScript+"?title=Special:UserLogin");
 }
}

/*
==避免在主條目中出現捲軸框==

*/

if(!wgCanonicalNamespace) addOnloadHook( function(){

 var divs=document.getElementsByTagName("div");

 for(var i=0; i<divs.length; i++){
  if(divs[i].id=="CContentList"){
   if(divs[i].parentNode.parentNode.id=="TagConversionHeader") continue;
  }

  if(divs[i].id=="ShowWideImage"){
   if(divs[i].parentNode.parentNode.id=="ThumbWideImage") continue;
  }

  if(divs[i].style.overflow.toLowerCase()=="auto"){
   divs[i].style.overflow="";
   divs[i].style.overflowY="visible";
   divs[i].style.padding="";
   divs[i].style.border="";
   divs[i].style.height="";
  }
 }

});

/* 
== metaBox ==

HERE STARTS THE WORKING-CODE OF "METABOXES"*/
 
 /* Funcionament de la Plantilla:Metacaixa
 Implementat per: Usuari:Peleguer.
 Actualitzat per Joanjoc seguint les indicacions d'en Martorell
 */
 
 function MetaCaixaInit(){
  //S'executa al carregar-se la pàgina, si hi ha metacaixes,
  // s'assignen els esdeveniments als botons
  //alert("MetaCaixaInit");
 
  var i=0       //Inicialitzem comptador de caixes
  for (i=0;i<=9;i++){
     var vMc = document.getElementById("mc"+i);
     if (!vMc) break;
     //alert("MetaCaixaInit, trobada Metacaixa mc"+i);
 
     var j=1    //Inicialitzem comptador de botons dins de la caixa
     var vPsIni = 0  //Pestanya visible inicial
     for (j=1;j<=9;j++){
        var vBt = document.getElementById("mc"+i+"bt"+j);
        if (!vBt) break;
        //alert("MetaCaixaInit, trobat botó mc"+i+"bt"+j);
        vBt.onclick = MetaCaixaMostraPestanya;          //A cada botó assignem l'esdeveniment onclick
        //alert (vBt.className);
        if (vBt.className=="mcBotoSel") vPsIni=j;  //Si tenim un botó seleccionat, en guardem l'index
     }
     //alert ("mc="+i+", ps="+j+", psini="+vPsIni );
     if (vPsIni == 0) { //Si no tenim cap botó seleccionat, n'agafem un aleatòriament
         vPsIni = 1+Math.floor((j-1)*Math.random()) ;
         //alert ("Activant Pestanya a l'atzar; _mc"+i+"bt"+vPsIni +"_");
         document.getElementById("mc"+i+"ps"+vPsIni).style.display = "block";
         document.getElementById("mc"+i+"ps"+vPsIni).style.visibility = "visible";
         document.getElementById("mc"+i+"bt"+vPsIni).className="mcBotoSel";
     } 
  }
 }
 
 function MetaCaixaMostraPestanya(){
  //S'executa al clicar una pestanya,
  //aquella es fa visible i les altres s'oculten
  var vMcNom = this.id.substr(0,3); //A partir del nom del botó, deduïm el nom de la caixa
  var vIndex = this.id.substr(5,1); //I l'index
 
  var i=1
  for (i=1;i<=9;i++){        //busquem totes les pestanyes d'aquella caixa
      //alert(vMcNom+"ps"+i);
        var vPsElem = document.getElementById(vMcNom+"ps"+i);
        if (!vPsElem) break;
        if (vIndex==i){ //Si és la pestanya bona la mostrem i canviem la classe de botó
                vPsElem.style.display = "block";
                vPsElem.style.visibility = "visible";
                document.getElementById(vMcNom+"bt"+i).className="mcBotoSel";
        } else {             //Sinó, l'ocultem i canviem la classe de botó
                vPsElem.style.display = "none";
                vPsElem.style.visibility = "hidden";
                document.getElementById(vMcNom+"bt"+i).className="mcBoto";
        }
  }
  return false; //evitem la recàrrega de la pàgina
 }
 
 addOnloadHook(MetaCaixaInit);
 
 /*HERE FINISHES THE WORKING-CODE OF "METABOXES"*/

/*
== 智能讨论页编辑（新建） ==

*/

addOnloadHook(function () {
	catalk = document.getElementById('ca-talk');
        if (! catalk) return;
	if( catalk.className == 'new' ) {
		catalk.firstChild.href +=
			'&editintro=Template:TalkPageEditintro&preload=' + wgULS('Template:TalkPagePreload','Template:TalkPagePreload/zh-hant');
	}
});
//

/** Magic editintros ****************************************************
 *
 *  Description: Adds editintros on disambiguation pages and BLP pages.
 *  Maintainers: [[:en:User:RockMFR]], [[User:PhiLiP]]
 */
 
function addEditIntro(name)
{
  var el = document.getElementById('ca-edit');
  if (!el)
    return;
  el = el.getElementsByTagName('a')[0];
  if (el)
    el.href += '&editintro=' + name;
}
 
if (wgNamespaceNumber == 0) {
  addOnloadHook(function(){
    if (document.getElementById('disambig') || document.getElementById('disambigbox'))
      addEditIntro('Template:Disambig_editintro');
  });
 
  addOnloadHook(function(){
    var cats = document.getElementById('mw-normal-catlinks');
    if (!cats)
      return;
    cats = cats.getElementsByTagName('a');
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].title == 'Category:在世人物') {
        addEditIntro('Template:BLP_editintro');
        break;
      }
    }
  });
}

/* Adds an additional link to the complete list of languages available.*/
if (wgPageName == 'Wikipedia:首页' || wgPageName == 'Wikipedia_talk:首页') 
    addOnloadHook(function () {
        addPortletLink('p-lang', '/wiki/Wikipedia:维基百科语言列表',
                 wgULS('维基百科语言列表','維基百科語言列表'), 'interwiki-completelist', wgULS('维基百科的完整各语言列表', '維基百科的完整各語言列表'));
        var nstab = document.getElementById('ca-nstab-project');
        if (nstab && wgUserLanguage.indexOf("zh") > -1) 
            nstab.firstChild.firstChild.nodeValue = wgULS('首页','首頁');
    }
)

importScript('MediaWiki:Common.js/Delayed.js');

var eTimeout1;
var eTimeout2;
var eTimeout3;
$(function boxSwitch(){
    clearTimeout(eTimeout1);
    eTimeout1=setTimeout(function(){
        $("#currentEvents .block1").fadeIn();
        $("#currentEvents .block2").hide();
        $("#currentEvents .block3").hide();
        clearTimeout(eTimeout2);    
        eTimeout2=setTimeout(function(){
            $("#currentEvents .block1").hide();
            $("#currentEvents .block2").fadeIn();
            $("#currentEvents .block3").hide();
            clearTimeout(eTimeout3);    
            eTimeout3=setTimeout(function(){
                $("#currentEvents .block1").hide();
                $("#currentEvents .block2").hide();
                $("#currentEvents .block3").fadeIn();
                boxSwitch();
            }, 1000);
        }, 1000);
    }, 1000);
});

//</source>