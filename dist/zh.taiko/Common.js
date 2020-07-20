//<source lang="javascript">
/*
所有用戶在加載任何頁面時，這裡的JavaScript都會加載
*/

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

//</source>