// Put together by [[User:Bongolium500]]
var namespace = mw.config.get("wgNamespaceNumber");
var page = mw.config.get('wgPageName');
var addsec = document.getElementById('ca-addsection');
var edit = document.getElementById('ca-edit');
if (namespace % 2 !== 0 && namespace !== -1) {
	addsec.setAttribute("href", "/wiki/"+page+"?action=edit");
	addsec.textContent="Edit";
	edit.setAttribute("href", "/wiki/"+page+"?action=edit&section=new");
	edit.textContent="Add topic";
}