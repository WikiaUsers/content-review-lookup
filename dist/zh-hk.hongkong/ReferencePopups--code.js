(function(){
	if(window.dev && dev.ReferencePopups && dev.ReferencePopups.messages) {
		var msg = dev.ReferencePopups.messages;
		if("coreConfigureText" in msg)
			msg.coreConfigureText = "設定參考資料彈窗";
		if("coreConfigureHover" in msg)
			msg.coreConfigureHover = "變更參考資料彈窗設定";
	}
})();