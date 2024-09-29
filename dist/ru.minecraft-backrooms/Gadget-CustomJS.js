;(function ($,mw) {
	var scripts = [];
	$('.import-js').each(function () {
		scripts.push(this.innerText);
	});
	scripts.forEach(function (e) {
		var script_e = document.createElement("script");
		script_e.setAttribute("type","text/javascript");
		script_e.setAttribute("class","customJS");
		$(script_e).html('"use strict";\n' + e);
		$(script_e).appendTo($("head"));
	});
})(this.jQuery,this.mediaWiki);