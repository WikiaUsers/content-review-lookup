function ProtectButton () {
     // Function to add a button that protects a page for a week
     // Made by Wikia User:Sactage <sactage@sactage.com>
     // Licensed under the CC-BY-SA licence - please attribute this code if you use it elsewhere
     $("header.WikiaPageHeader").append('<a class="wikia-button" id="protect-week" title="1 week protect">1W</a>');
     document.getElementById("protect-week").onclick = function(event) {
	$.getJSON("/api.php", { action: "query", prop: "info", pageids: wgArticleId, intoken: "protect", format: "json"}, function (json) {
	    var tk = json.query.pages[wgArticleId].protecttoken;
	    $.post("/api.php", {action: "protect", token: tk, protections: "edit=sysop|move=sysop", expiry: "1 week", title: wgPageName, reason: "fill in reason here"}, function (data) {
	       window.location.href = wgServer + "/wiki/" + wgPageName + "?action=purge";
	    });
	});
     };
}
addOnloadHook(ProtectButton);