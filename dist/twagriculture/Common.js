/* 此處的JavaScript將載入於所有用戶每一個頁面。 */
/* <pre> */

/*
所有用戶在加載任何頁面時，這裡的JavaScript都會加載
==編輯工具==
*/
//增加下拉選單
addOnloadHook(function(){
	if(JSConfig.edittoolsMode=='min'){mwCustomEditButtons=[];return;}
	mwEditButtons=[];//清除原系統按鈕

	var menu=createDropdownMenu('文章分類',"articleEdit","dropdownListEditTools");
	if(!menu) return;
	menu.add("教育","seealso",
		"\n[[category:教育]]\n");
	menu.add("政策","seealso",
		"\n[[category:政策]]\n");
	menu.add("WTO","seealso",
		"\n[[category:WTO]]\n");
	menu.add("交流","seealso",
		"\n[[category:交流]]\n");
	menu.add("消費","seealso",
		"\n[[category:消費]]\n");
	menu.add("第一級生產","seealso",
		"\n[[category:第一級生產]]\n");
});

/*
/* </pre> */