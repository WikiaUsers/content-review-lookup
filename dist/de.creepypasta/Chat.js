var topic = "<a href='/wiki/Regeln' target='_blank'>Regeln</a> lesen, Kinders!"
var ct_inserted = false;

$(function() {
    if (ct_inserted) return;
	$("#ChatHeader .public.wordmark").prepend(
		$("<div/>",{id: "chatTopic", html: topic}).css({
			textAlign: "center",
			width: "100%",
			lineHeight: "0px",
			marginTop: "20px",
			marginBottom: "-20px",
			fontSize: "20px",
			fontWeight: "bold",
			color: "lightgray"
		})
	);
	ct_inserted = true;
});

function importScriptNC(page){var uri=mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode(page)+'&action=raw&ctype=text/javascript&no-cache='+Date.now();return importScriptURI(uri);}