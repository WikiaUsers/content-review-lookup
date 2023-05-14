//<source lang="javascript">
/*
所有用戶在加載任何頁面時，這裡的JavaScript都會加載，請管理員小心編輯
*/

if (wgAction == "edit" || wgAction == "submit" || wgPageName == "Special:Upload") //對應編輯頁面
{
    importScript("MediaWiki:Common.js/edit.js")
}

/** 操作員 Javascript *******************************************************
  *
  *  Description: Allows for sysop-specific Javascript at [[MediaWiki:Sysop.js]].
  */
function sysopFunctions() {
    if ( wgUserGroups && !window.disableSysopJS ) {
        for ( var g = 0; g < wgUserGroups.length; ++g ) {
            if ( wgUserGroups[g] == "sysop" ) {
                //importScript( "MediaWiki:Sysop.js" );
                break;
            }
        }
    }
}
 
addOnloadHook( sysopFunctions );


//功能設定
if(!window.JSConfig){var JSConfig={};}
JSConfig.isEdit0=true; //設置是否顯示編輯首段按鈕
JSConfig.editSectionLink='right';//設置編輯按鈕是否在右側
JSConfig.collapseText= '隱藏▲';//指示折疊收縮的默認文字
JSConfig.expandText= '顯示▼';//指示折疊展開的默認文字
JSConfig.autoCollapse=2;  //文章少於 autoCollapse 個折疊塊時，不自動折疊
JSConfig.SpecialSearchEnhancedDisabled=false; //是否禁止增加其它搜索引擎

function forEach(callback,array){
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

/**
 * 將頁面名稱轉換為URL
 *
 * @param page 頁面名稱
 * @param paras 附加後綴對象，用空對像{}做參數可以取得源碼
 */
function getWikiPath(page,paras){
	var reg=/^[a-z]+:/;
	var pre=page.match(reg);
	pre = pre && wgProjectURL[pre[0].replace(/:$/,'')];
	if (pre) {page=page.replace(reg,'');} else {pre='';}
	var url = pre + wgScript + '?title=' + encodeURI( page.replace( ' ', '_' ) );
	if(typeof paras=='object'){
		paras.ctype=paras.ctype||'text';
		paras.dontcountme=paras.dontcountme||'s';
		paras.action=paras.action||'raw';
		for(var k in paras){url += '&' + k + '=' + paras[k]; }
	}
	return url;
}



/* 測試元素中是否含有指定的樣式 **************************************
 * Description: 使用正則式與緩存來提高性能
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
IE兼容性修正
*/
function fixIE(){
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
}
if (navigator.appName == "Microsoft Internet Explorer" && document.compatMode == "CSS1Compat"){
	fixIE();
}


/*
段落編輯連結
*/
//JSConfig.isEdit0 設置是否出現「編輯首段」按鈕
//對不需要編輯首段的頁面，還可在頁面中加 Template:NoEdit 模板來禁用。
//JSConfig.editSectionLink 設置「編輯」按鈕的位置
if (wgIsArticle && wgAction == "view") {
	//增加編輯首段按鈕
	addOnloadHook(function(){
		if(!JSConfig.isEdit0||(document.getElementById&&document.getElementById('no-edit-0'))){return;}
		var caEdit=document.getElementById&&document.getElementById('ca-edit');
		if (!caEdit){return;}
		var linkAttributes={
			'href':caEdit.firstChild.href + '&section=0',
			'title':'編輯正文所有標題之前的文字（通常稱首段或導言）',
			'accesskey':'0'
		}

		//增加0按鈕標籤
		var caEdit0 = createElement(
			'li',
			[createElement('A',['0'],linkAttributes)],
			{id:'ca-edit-0'}
		);
		caEdit.className = 'istalk';
		elementMoveto(caEdit0,caEdit,"after");

		//增加條目標題下的「編輯首段」按鈕
		var editsection0= createElement(
			'span',
			['[',createElement('A',['編輯首段'],linkAttributes),']'],
			{'class':'editsection'}
		);
		var siteSub=document.getElementById&&document.getElementById('siteSub');
		elementMoveto( editsection0 , siteSub.firstChild );
	});
	
	//設置編輯按鈕位置是否浮動
	addOnloadHook(function(){
		if (JSConfig.editSectionLink=='right') { return; }
		var editLinks=getElementsByClassName(document.getElementById('bodyContent'),"span","editsection");
		for(var i = 0; i < editLinks.length; i++) {
			editLinks[i].style.cssFloat = editLinks[i].style.float = 'none';
			editLinks[i].style.textAlign = "left" ;
			editLinks[i].parentNode.appendChild(editLinks[i]);
		}
	});
}


/** 折疊 div table *****************************
 *  Description: 实现div.NavFrame和table.collapsible的可折叠性。
 *  JSConfig的collapseText、expandText、autoCollapse属性定义默认文字和默认最少自动折叠块
 *  Maintainers: User:fdcn
 */
addOnloadHook(function(){
	function toggleState(item){
		var oldState=item.state;
		item.state=1-oldState;
		if(item.text[0]){
			item.text[oldState].style.display = 'inline';
			item.text[item.state].style.display='none';
		}
		item.action(item);
	}

	function cancelBubble(e){
		e=e||window.event;
		if(e.stopPropagation){e.stopPropagation();}else{e.cancelBubble=true;}
	}
	function createToggleButton(head,frame,toggle){
		var textS,textH;
		var button=getElementsByClassName(head,"span","NavToggle")[0];
		if(button){
			textS=getElementsByClassName(button,"span","NavToggleShow")[0]
			textH=getElementsByClassName(button,"span","NavToggleHide")[0];
		}else {
			textS=createElement("span",[JSConfig.expandText]);
			textH=createElement('span',[JSConfig.collapseText]);
			button=createElement("span",[textS,textH],{'class':"NavToggle",styles:{'width':"3.8em"}});
		}
		if(textS){textS.style.display='none';}
		button.style.display='inline';
		var item={'state':0, 'text':[textS,textH],'frame':frame,'action':toggle}

		var links=head.getElementsByTagName("A");
		for(var i=0,l;l=links[i];i++){ addClickHandler(l,cancelBubble); }
		
		head.insertBefore( button, head.childNodes[0] );
		head.style.cursor = "pointer";
		addClickHandler( head, function(){toggleState(item);} );
		return item;
	}
	
	// 折疊div 
	function toggleNavigationBar(item)
	{
		var cls=item.state?'none':'block';
		for (
			var NavChild = item.frame.firstChild;
			NavChild != null;
			NavChild = NavChild.nextSibling
		){
			if (NavChild.className == 'NavPic' || NavChild.className == 'NavContent') {
				NavChild.style.display = cls;
			}
		}
	}
	
	// 折疊表格
	function collapseTable( item )
	{
		var rows = item.frame.getElementsByTagName( "tr" );
		var display = item.state? 'none':rows[0].style.display;
		for (var i=1,row; row=rows[i]; i++) { row.style.display = display; }
	}
	
	//init
	var item,items=[];
	var NavFrames=getElementsByClassName(document,"div","NavFrame");
	for(var i=0,NavFrame;NavFrame = NavFrames[i];i++) {
		var heads=getElementsByClassName(NavFrame,"div","NavHead");
		for(var ih=0,head; head = heads[ih]; ih++ ) {
			if (head.parentNode != NavFrame) {continue;}
			items.push(createToggleButton(head,NavFrame,toggleNavigationBar));
			break;
		}
	}

	var tables = getElementsByClassName(document,"table","collapsible");
	for ( var i = 0,table; table= tables[i]; i++ ) {
		var head = table.getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
		items.push(createToggleButton(head,table,collapseTable));
	}

	var count=items.length;
	for ( var i = 0;  i<count; i++ ) {
		item=items[i];
		if ( hasClass( item.frame, "collapsed" ) || ( count >= JSConfig.autoCollapse && hasClass( item.frame, "autocollapse" ) ) ) {
			toggleState(item);
		}
	}
});

//修正折疊後定位變化
hookEvent("load",function(){if(location.hash){location.href=location.hash;}});

/**
 隱藏參考所產生的編輯按鈕
*/
function removeRefListEdit(){
	var editLinks=getElementsByClassName(document.getElementById('bodyContent'),"span","editsection");
	for(var i = 0; i < editLinks.length; i++) {
		var link = editLinks[i].getElementsByTagName("a")[0];
			if( (link.href.toLowerCase().indexOf('reflist') != -1) || (link.href.toLowerCase().indexOf('reference') != -1) ){
				editLinks[i].style.display = 'none';
		}
	}
}
addOnloadHook(removeRefListEdit);

//</source>