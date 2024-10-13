var scriptID = 1;
mw.hook("wikipage.content").add(function () {
	var scripts = [];
	$('.import-js').each(function () {
		if (!scripts.includes(this.innerText)) scripts.push(this.innerText);
	});
	scripts.forEach(function (e) {
		var myID = scriptID;
		scriptID++;
		e = '"use strict";\n' + e.replaceAll('const ','var ');
		if ( $("#custom-script-" + myID).length > 0 ) {
			$("#custom-script-" + myID).html(e);
		} else {
			var script_e = document.createElement("script");
			script_e.setAttribute("type","text/javascript");
			script_e.setAttribute("class","customJS");
			script_e.setAttribute("id","custom-script-" + myID);
			$(script_e).html(e);
			$(script_e).appendTo($("head"));
		}
	});
	scriptID = 1;
});