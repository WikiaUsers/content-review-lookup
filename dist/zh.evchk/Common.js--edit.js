//<source lang="JavaScript">

/** Extra toolbar options ******************************************************
 *  Description: Adds extra buttons to the editing toolbar.
 *  To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/Common.js]].
 */
if (mwCustomEditButtons) {
}

//fix edit summary prompt for undo
//this code fixes the fact that the undo function combined with the "no edit summary prompter" causes problems if leaving the edit summary unchanged
//this was added by [[User:Deskana]], code by [[User:Tra]]
//see bug 8912
addOnloadHook(function () {
    if (document.location.search.indexOf("undo=") != -1
        && document.getElementsByName('wpAutoSummary')[0]) {
        document.getElementsByName('wpAutoSummary')[0].value='1';
    }
})


/**
調整編輯工具欄
*/
addOnloadHook(function(){
	// 調整符號表
	var wpEditToolbar=document.getElementById("toolbar");
	if(!wpEditToolbar){return;}
	var editspecialchars=document.getElementById("editpage-specialchars");
	if (editspecialchars) {
		function chooseCharSubset() {// select subsection of special characters
			var s=menu.selectedIndex;
			for (var i = 0,p; p=lines[i] ; i++) {
				p.style.display = i == s ? 'inline' : 'none';
			}
		}
		// 增加特殊符號的下拉選單
		var lines = editspecialchars.getElementsByTagName('p');
		var menu=createElement("select",null,{
			'styles':{'display':"inline"},
			'events':{'change':chooseCharSubset}
		});
		for (var i = 0,p; p=lines[i] ; i++) {
			menu.options[i]=new Option(p.title?p.title:p.id);
		}
		editspecialchars.insertBefore(menu,editspecialchars.firstChild);
		chooseCharSubset();
		// 移動特殊符號的下拉選單
		elementMoveto(editspecialchars , wpEditToolbar , 'after' );
	}
});


/**
編輯摘要
*/
function createSummaryInput()
{
	//在提交新段落時，讓主題欄在特定情況下失效
	if(document.editform.wpSection.value=="new") {return;}

	var wpSummaryLabel=document.getElementById("wpSummaryLabel");
	if(!wpSummaryLabel){return;}
	var form = document.getElementById('editform');
	var summarys={};
	var i=0;
	function add(label,summary){
		var val='summary'+(i++);
		summarys[val]=summary;
		var option=new Option(label,val);
		return menu.options[menu.options.length]=option;
	}
	var menu=createElement(
		"select",
		[new Option("摘要類型")],
		{id:"summaryMenu",size:1,events:{'change':function(){
			var key=menu.options[menu.selectedIndex].value;
			var s=summarys[key];
			if(s){form.wpSummary.value += ' '+s;}
			menu.selectedIndex=0;
		}}}
	);
	add('新條目','新條目');
	add('修飾語句','修飾語句');
	add('修正筆誤','修正筆誤');
	add('內容擴充','內容擴充');
	add('排版','調整格式、排版');
	add('段落章節','移動或調整段落章節');
	add('內部連結','增加或調整內部連結');
	add('分類','增加或調整分類');
	add('小作品標籤','增加或調整小作品標籤');
	add('消歧義','消歧義');
	add('條目化','條目化');
	add('標識刪除','提交刪除討論或速刪');
	add('侵權','提交侵權刪除');
	add('歡迎','歡迎用戶');
	add('警告','警告用戶');
	wpSummaryLabel.appendChild(menu);
 
	//加入對摘要框的限制，以適應中文UTF-8的字節數
	var summaryinput=document.getElementById("wpSummary");
	if(summaryinput && summaryinput.maxLength)summaryinput.maxLength=83;
 

}
addOnloadHook(createSummaryInput);

//</source>