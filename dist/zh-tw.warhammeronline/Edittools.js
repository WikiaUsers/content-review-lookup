var mwEdittool={
	"buttons":[],//所有的按钮列表
	"dropdownMenus":[],//所有的下拉选单列表
	"defaultAction":function (info){insertTags(info.tagOpen, info.tagClose,info.sampleText);}//默认动作：插入标识
}

//override original function
function mwInsertEditButton(parent,item) {
	var doClick = typeof item.doClick=='function' ? item.doClick : mwEdittool.defaultAction;
	var image = createElement("IMG",null,
		{
			'width':item.width||23,
			'height':22,
			'class':"mw-toolbar-editbutton",
			'src':item.imageFile,
			'border':0,
			'alt':item.speedTip,
			'title':item.speedTip,
			'styles':{'cursor':"pointer"},
			'events':{'click':function(){
				doClick(item);
				return false;
			}}
		}
	);
	if (item.imageId) {
		image.id = item.imageId;
		mwEdittool.buttons[image.id]=image;
	}
	mwEdittool.buttons.push(image);
	parent.appendChild(image);
	return true;
}

/**
 * 插入光标所在的分段前后
 * sectReg 分段的正则表达式
 * author & maintainer : fdcn@zhwiki
 */
function insertSect(sectReg,pre,post){
	var txtarea = document.editform.wpTextbox1;
	insertTags('<sectins>','</sectins>','');
	var reg=/<sectins><\/sectins>/g;
	var scrollTop = txtarea.scrollTop;
	var text=txtarea.value;
	
	var index=-1;
	text=text.replace(reg,function(m,i){index=i;return '';});
	if(index>-1){
		sectReg.lastIndex=0;				
		var currentIndex=0,startIndex=0,endIndex=0;
		while(true){
			var item= sectReg.exec(text);
			if(!item){
				endIndex=text.length;
				break;
			}
			currentIndex=item.index;
			if(currentIndex<index){
				startIndex=sectReg.lastIndex;
				continue;
			}else{
				endIndex=currentIndex;
				break;
			}
		}
		txtarea.value=text.substring(0, startIndex)+pre+text.substring(startIndex,endIndex)+post+text.substr(endIndex);
	}else{
		txtarea.value=text.replace(/<sectins>/g,pre).replace(/<\/sectins>/g,post);
	}
	txtarea.scrollTop = scrollTop;
}

/**
 * 插入光标所在的行前后
 * isMultiLine 是否应用于每一行前后
 * author & maintainer : fdcn@zhwiki
 */
function insertLine(pre,sampletext,post,isMultiLine){
	var txtarea = document.editform.wpTextbox1;
	var scrollTop = txtarea.scrollTop;
	insertTags('<sectins>','</sectins>','');
	var text=txtarea.value
		.replace(/\r/g,"")
		.replace(/^(.*)<sectins>/m,'<sectins>$1')
		.replace(/<\/sectins>(.*)$/m,'$1<\/sectins>')
		.replace(/<sectins> *<\/sectins>/,'<sectins>'+sampletext+'<\/sectins>');
	if(/<sectins>((?:a|[^a])*)<\/sectins>/.exec(text)){
		var leftContext=RegExp.leftContext;
		var rightContext =RegExp.rightContext ;
		var matchContext=	isMultiLine
			? RegExp.$1.replace(/$/mg,'<endline\/>').replace(/^/mg,pre).replace(/<endline\/>/g,post)
			: pre+RegExp.$1+post;
	}
	txtarea.value=leftContext+matchContext+rightContext;
	
	//IE
	if (document.selection && !is_gecko) {
		var range=txtarea.createTextRange();
		var searchText=matchContext.replace(/\n.*/g,'');
		range.findText(searchText);
		range.select();
	// Mozilla
	}else if(txtarea.selectionStart || txtarea.selectionStart == '0') {
		txtarea.selectionStart = leftContext.length;
		txtarea.selectionEnd = txtarea.selectionStart +matchContext.length;
		txtarea.scrollTop = scrollTop;
	}
	// reposition cursor if possible
	if (txtarea.createTextRange) {
		txtarea.caretPos = document.selection.createRange().duplicate();
	}
}

/**
 * 创建一个下拉选单
 * 返回一个对象，包含该选单的id、select元素、增加项目方法、删除项目方法
 *
 */
function createDropdownMenu(title,id,container,accesskey){
	if(!document.getElementById('editform')) return false;
	if(typeof container=='string'){container=document.getElementById(container);}
	container=container||document.getElementById('toolbar');
	var menu=createElement("select",null,{"size":1,"accesskey":accesskey,"id":id});
	add(title);
	container.appendChild(menu);

	/**
	 * 增加一个选单项
	 * 参数为该选单项的 （显示文字、值、前缀、示例文字、后缀、摘要文字、是否小修改、选单项动作）
	 * 默认动作是defaultAction
	 */
	function add(text,value,tagOpen,sampleText,tagClose,summary,minor,action){
		var option;
		if(typeof value=="string"){
			option=new Option(text,value);
			option.info={
				'tagOpen':tagOpen||'',
				'sampleText':sampleText||'',
				'tagClose':tagClose||'',
				'summary':summary||'',
				'minor':!!minor
			};
			option.action=typeof action=='function' ? action : mwEdittool.defaultAction;
		}
		else {option=new Option(text,text);}
		return menu.options[menu.options.length]=option;
	}
	var form = document.getElementById('editform');
	menu.onchange=function(){
		var option=menu.options[menu.selectedIndex];
		var info=option.info;
		if(!info){menu.selectedIndex=0;return;}
		option.action(info);
		form.wpSummary.value += info.summary;
		form.wpMinoredit.checked = info.minor;
		menu.selectedIndex=0;
	}
	
	var dropMenu={
		'id':id,
		'element':menu,
		'add':add,
		'remove':function remove(value){
			if(typeof value=='number'){return menu.remove(value);}
			if(typeof value=='string'){
				for(var i=0;i<menu.options.length;i++){
					if(menu.options[i].value==value){return menu.remove(i);}
				}
			}
			if(typeof value=='object'){
				for(var i=0;i<menu.options.length;i++){
					if(menu.options[i]==value){return menu.remove(i);}
				}
			}
			return false;
		}
	};
	mwEdittool.dropdownMenus.push(dropMenu);
	if(id){mwEdittool.dropdownMenus[id]=dropMenu;}
	return dropMenu;
}