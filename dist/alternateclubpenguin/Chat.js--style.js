chatPlugins.modules.style.settingsID = "styleSettings";
chatPlugins.modules.style.settingsFunction = function() { 
	chatPlugins.settings.open("Chat Style",'<div>Style Options go here</div><table id="chatPluginsStyleTable">' + 
	'<tr><td>Outer Border:</td><td><input type="color" id="outerBorder" name="outerBorder"/></td></tr>' + 
	'<tr><td>Chat Background:</td><td><input type="color" id="chatBackground" name="chatBackground"/></td></tr>' + 
	'<tr><td>Your Background:</td><td><input type="color" id="yourBackground" name="yourBackground"/></td></tr>' + 
	'<tr><td>Chat Font Color:</td><td><input type="color" id="chatFontColor" name="chatFontColor"/></td></tr>' + 
	'<tr><td>Your Font Color:</td><td><input type="color" id="yourFontColor" name="yourFontColor"/></td></tr>' + 
	'<tr><td>Alert Font Color:</td><td><input type="color" id="alertFontColor" name="alertFontColor"/></td></tr>' + 
	'<tr><td>Link Font Color:</td><td><input type="color" id="linkFontColor" name="linkFontColor"/></td></tr>' + 
	'<tr><td>Borders Color:</td><td><input type="color" id="bordersColor" name="bordersColor"/></td></tr>' + 
	'<tr><td>Highlights:</td><td><input type="color" id="highlights" name="highlights"/></td></tr>' + 
	'</table><div>Mess something up? You can <a href="#" id="chatPluginsStyleReset">reset your settings</a>.',400,function() {
		chatPlugins.cookie.arrays.style[0] = $("#outerBorder").val();
		chatPlugins.cookie.arrays.style[1] = $("#chatBackground").val();
		chatPlugins.cookie.arrays.style[2] = $("#yourBackground").val();
		chatPlugins.cookie.arrays.style[3] = $("#chatFontColor").val();
		chatPlugins.cookie.arrays.style[4] = $("#yourFontColor").val();
		chatPlugins.cookie.arrays.style[5] = $("#alertFontColor").val();
		chatPlugins.cookie.arrays.style[6] = $("#linkFontColor").val();
		chatPlugins.cookie.arrays.style[7] = $("#bordersColor").val();
		chatPlugins.cookie.arrays.style[8] = $("#highlights").val();
		chatPlugins.modules.style.updateSkin();
		chatPlugins.cookie.save();
		chatPlugins.settings.cancel();
		}
	);
	$("#outerBorder").val(chatPlugins.cookie.arrays.style[0]);
	$("#chatBackground").val(chatPlugins.cookie.arrays.style[1]);
	$("#yourBackground").val(chatPlugins.cookie.arrays.style[2]);
	$("#chatFontColor").val(chatPlugins.cookie.arrays.style[3]);
	
/*	if (chatPlugins.modules.postColor.loaded) { //Is PostColor module loaded? If so, disable self post font color.
	  $("#yourFontColor").parent().append('<span style="color:#aaaaaa;text-style:italic;">Disabled</span>');
	  $("#yourFontColor").remove();
	}

	else {
*/
	  $("#yourFontColor").val(chatPlugins.cookie.arrays.style[4]);
//	}	
	$("#alertFontColor").val(chatPlugins.cookie.arrays.style[5]);
	$("#linkFontColor").val(chatPlugins.cookie.arrays.style[6]);
	$("#bordersColor").val(chatPlugins.cookie.arrays.style[7]);
	$("#highlights").val(chatPlugins.cookie.arrays.style[8]);
	$("#chatPluginsStyleReset").click(chatPlugins.modules.style.resetValues);
}

chatPlugins.modules.style.resetValues = function() {
	$("#outerBorder").val("#0186b1");
	$("#chatBackground").val("#FFFFFF");
	$("#yourBackground").val("#F5F5F5");
	$("#chatFontColor").val("#3a3a3a");
	
/*	if (chatPlugins.modules.postColor.loaded) { //Is PostColor module loaded? If so, disable self post font color.
	  $("#yourFontColor").attr("disabled",true);
	  $("#yourFontColor").val("disabled");
	}
	else {
*/
	  $("#yourFontColor").val("#3a3a3a");
//	}
	
	$("#alertFontColor").val("#9c9c9c");
	$("#linkFontColor").val("#006cb0");
	$("#bordersColor").val("#cccccc");
	$("#highlights").val("#cce1ef");
}

chatPlugins.modules.style.updateSkin = function() {
	style = chatPlugins.cookie.arrays.style;
	$("body").css("background-color",style[0]); // Outer Border Background
	$(".ChatHeader").css("background-color",style[1]); // Chat Header Background
	$(".WikiaPage").css("background-color",style[1]); // Chat Body Background
	$("textarea[name=message]").css("background-color",style[1]); // Text Input Box Background
	$(".you").css("background-color",style[2]); // Your Posts Background
	$(".Rail h1.private").css("background-image","none").css("background-color",style[8]) // Private Messages Divider Background
	$(".WikiaPage").css("color",style[3]); // Main Font Color
	$("textarea[name=message]").css("color",style[3]); // Text Input Box Font Color
	
/*	if (!chatPlugins.modules.postColor.loaded) { //Is PostColor module loaded? If so, disable self post font color.
	  $(".you").css("color",style[4]); // Your Posts Font Color
	}
*/
	$(".inline-alert").css("color",style[5]); // Inline Alert Font Color
	$(".away").css("color",style[5]); // Away Status Font Color
	$(".me-message").css("color",style[5]); // /me Message Font Color
	$("a").css("color",style[6]); // Link Font color

	// All Borders
	$(".ChatHeader").css("border-color",style[7]);
	$(".WikiaPage").css("border-color",style[7]);
	$(".Chat").css("border-right-color",style[7]).css("border-bottom-color",style[7]);
	$(".ChatHeader div.User").css("border-left-color",style[7]);
	$(".Rail h1.private").css("border-top-color",style[7]).css("border-bottom-color",style[7]);
	$(".Write div.message").css("border","solid 2px " + style[7]).css("background","none");

	// Highlights
	$(".wordmark.selected").css("background-color",style[8]);
	$(".wordmark.selected").css("box-shadow",'inset 0 0 7px 0px ' + style[7]);
	$(".wordmark.selected").css("-webkit-box-shadow",'inset 0 0 7px 0px ' + style[7]);
	
	// Generate CSS Statement
	chatPlugins.modules.style.cssStatement = 'body { background-color: ' + style[0] + ';} ' +
	'.ChatHeader {background-color: ' + style[1] + ';} ' +
	'.WikiaPage {background-color: ' + style[1] + ';} ' +
	'textarea[name=message] {background-color: ' + style[1] + ';} ' +
	'.you {background-color: ' + style[2] + ' !important;} ' +
	'.Rail h1.private {  background-image: none;background-color: ' + style[8] + ';} ' +
	'.WikiaPage {  color: ' + style[3] + ';} ' +
	'textarea[name=message] {  color: ' + style[3] + ';} ' +
	'.inline-alert {  color: ' + style[5] + ';} ' +
	'.away {  color: ' + style[5] + ';} ' +
	'.me-message {  color: ' + style[5] + ';} ' +
	'a {  color: ' + style[6] + ';} ' +
	'.ChatHeader {  border-color: ' + style[7] + ';} ' +
	'.WikiaPage {  border-color: ' + style[7] + ';} ' +
	'.Chat {  border-right-color: ' + style[7] + '  border-bottom-color: ' + style[7] + ';} ' +
	'.ChatHeader div.User {  border-left-color: ' + style[7] + ';} ' +
	'.Rail h1.private {  border-top-color: ' + style[7] + '  border-bottom-color: ' + style[7] + ';} ' +
	'.Write div.message {  border: solid 2px ' + style[7] + ';background: none;}' +
	'.User:hover {  background-color: ' + style[8] + ';} ' + 
	'.wordmark.selected {  background-color: ' + style[8] + ';} ' +
	'.wordmark.selected {  box-shadow: inset 0 0 7px 0px ' + style[8] + ';  -webkit-box-shadow: inset 0 0 7px 0px ' + style[8] + ';}';
	
/*	 if (!chatPlugins.modules.postColor.loaded) { //Is PostColor module loaded? If so, disable self post font color.
		chatPlugins.modules.style.cssStatement += '.you {  color: ' + style[4] + ';] ';
	}
*/	
	if ($("style#chatPluginsStyle").length<1) {
		$('head').append('<style id="chatPluginsStyle" type="text/css"></style>');
	}
	$("style#chatPluginsStyle").html(chatPlugins.modules.style.cssStatement);

	//Update ChatPlugins Info
	var bgcolor = $("body").css("background-color");
	bgcolor = bgcolor.substring(4, bgcolor.length-1).replace(/ /g, '').split(',');
	var bgbrightness = Math.round(((parseInt(bgcolor[0]) * 299) + (parseInt(bgcolor[1]) * 587) + (parseInt(bgcolor[2]) * 114)) /1000);
	if (bgbrightness < 125) {
		$("#chatPluginsInfo").css("color","white");
		$("#chatPluginsInfoLink").css("color","lightblue");
	}
	else {
		$("#chatPluginsInfo").css("color","black");
		$("#chatPluginsInfoLink").css("color","#006cb0");
	}
}
/*	-- Cookie Placement Info --
 *	Outer Border		0 
 *	Chat Background		1
 *	Your Background		2
 *	Chat Font		3
 *	Your Font		4
 *	Alert Font		5
 *	Link Font		6
 *	Borders			7
 *	Highlights		8
 */
chatPlugins.cookie.arrays.style = [];
if (typeof(chatPlugins.cookie.get("chatPluginsStyle"))=="undefined") {
	chatPlugins.cookie.set("chatPluginsStyle","#0186b1,white,whitesmoke,#3a3a3a,#3a3a3a,#9c9c9c,#006cb0,#cccccc,#cce1ef");
	chatPlugins.cookie.load();
}
else {
	chatPlugins.cookie.load();
	chatPlugins.modules.style.updateSkin();
}

console.log("[OPTIONS] style: Loaded");