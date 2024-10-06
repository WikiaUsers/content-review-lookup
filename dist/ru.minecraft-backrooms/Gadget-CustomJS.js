mw.hook("wikipage.content").add(function () {
	var scripts = [];
	$('.import-js').each(function () {
		scripts.push(this.innerText);
	});
	scripts.forEach(function (e) {
		e = '"use strict";\n' + e.replaceAll('const ','var ');
		if ( $('head')[0].innerHTML.includes(e) ) return;
		var script_e = document.createElement("script");
		script_e.setAttribute("type","text/javascript");
		script_e.setAttribute("class","customJS");
		$(script_e).html(e);
		$(script_e).appendTo($("head"));
	});
});