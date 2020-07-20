
// **********
// Chat topic
// **********
 
importScriptPage('ChatOptions/code.js', 'dev');
 
var topic = "Keine Drogen, Destiny!"
 
$(function() {
    if (this["ct_inserted"]) return;
	$("#ChatHeader .public.wordmark").prepend(
		$("<div/>",{id: "chatTopic", html: topic}).css({
			textAlign: "center",
			width: "100%",
			lineHeight: "0px",
			marginTop: "20px",
			marginBottom: "-20px",
			zIndex: 0,
			fontFamily: "Consolas",
			fontSize: "20px",
			fontWeight: "bold",
			color: "black"
		})
	);
	this["ct_inserted"] = true;
});