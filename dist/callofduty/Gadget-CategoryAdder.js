// <nowiki>
// BEGIN MW GADGET
// *********
// Easy way to add a single category
// Made by Callofduty4
// *********

function CategoryAdderTwo() {
	var cat2html = '<p style="text-align:center;" class="CategoryAdderTwo"><input type="text" id="Category" value="" /><a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="categorySubmitTwo">Add Category</a>';
	$('#filetoc').append(cat2html);
	$('#categorySubmitTwo').click(function(event) {
		newCat = $("#Category").val();
		this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
		$.getJSON("/api.php", {action: "query", prop: "info", titles: wgPageName, intoken: "edit", format: "json", indexpageids: 1}, function(json) {
			var pageid = json.query.pageids[0];
			var tk = json.query.pages[pageid].edittoken;
			$.post("/api.php", {action: "edit", title: wgPageName, token: tk, bot: true, appendtext: "[[Category:" + newCat + "]]" + "\n"}, function (result) {$(".CategoryAdderTwo").remove();});
		});
	});
}
 
if (wgCanonicalNamespace == 'File') {
	addOnloadHook(CategoryAdderTwo);
}

// END MW GADGET
// </nowiki>