importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('DupImageList/code.js', 'dev');

importArticle({
  type: 'script',
  articles: [
        "u:dev:FacebookLikeBox/code.js",
        "MediaWiki:Snow.js"
    ]
});


/* Ukrywanie wulgarzymów */

var curse = ".wulgaryzm";
var curseinfo = ".wulgaryzminfo";

$(document).ready(function () {
	var comm = "Pokaż wulgarne treści";
	$(curse).after("<span class='wulgaryzminfo' onClick='showCurse()'>" + comm);
});

showCurse = function () {
	$(curseinfo).hide();
	$(curse).show();
};