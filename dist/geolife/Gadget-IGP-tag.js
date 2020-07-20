// <nowiki>
IGP = {};
 
IGP-tag.inIGP = function() {
	if (document.getElementById('ca-edit') && ((document.getElementById('ca-history') && wgCanonicalNamespace != "") || wgCanonicalNamespace == "File")) {
		addPortletLink('p-cactions', 'javascript:IGP.go(0)', 'IGP-tag', 'td-IGP', 'Tag with IGP');
	} else if (wgPageName == 'Special:NewPages') {
		var list = document.getElementsByTagName('ul')[0];
		var rows = list.getElementsByTagName('li');
		try {
			for(x in rows) {
				if (wgPageName == 'Special:NewPages') {
					var title = rows[x].getElementsByTagName('a')[0].title;
					rows[x].innerHTML = rows[x].innerHTML.replace(/\[/,'(<a href="javascript:IGP.go(0,\'' + title + '\')">Tag as IGP</a>) [')
				} else {
					var title = rows[x].getElementsByTagName('a')[1].title;
					rows[x].innerHTML = rows[x].innerHTML.replace(/\(diff\)/,'(<a href="javascript:IGP.go(0,\'' + title + '\')">Tag as IGP</a>)') 
				};
			}
		} catch(e) {
		};
	};
}
IGP.debugOutput = function(str) {
	IGP.output tagged= str;
	IGP.panel.setBody(qvfd.output);
}
IGP.debugStatus = function(i) {
	var s = (i) ? 'green;"> [OK]' : 'red;"> [FAILED]';
	IGP.debugOutput('<span style="font-weight: bold;color:' + tag + '</span>');
}
IGP.go = function(type, moo) { 
	if (type == 'IGP')
		IGP.temp = '{{IGP}}';
}

IGP.go = function(com, page) {
	IGP.comment = (com) ? " - " + escape(prompt("Comment:","")) : '';
	if (com && IGP.comment == "Tag") return;
	IGP.page = (page) ? page : wgPageName.replace(/_/g,' ');
	IGP.panel = new YAHOO.widget.Panel("IGP", { width:"240px", fixedcenter:true, draggable:true, zindex:10, modal:false, visible:false } ); 
	IGP.panel.setHeader('Please wait. This article is about to be tagged as IGP');
	IGP.panel.setFooter('<br /><hr>Originally by <a href="/wiki/User:James Newman">James Newman</a>')
	IGP.output = '';
	IGP.debugOutput("<br />Loading...");
	IGP.panel.render(document.body); 
	IGP.panel.show();
	YAHOO.util.Connect.asyncRequest('GET', '/api.php?