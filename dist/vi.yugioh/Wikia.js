if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  importScriptPage('WHAM/code.js', 'dev');
}

// Replace "Luster Dragon #2" with "Luster Dragon 2" etc. when searching
$('#WikiaSearch input:first-of-type').on('change', function() {
    $('#WikiaSearch input:first-of-type').val($('#WikiaSearch input:first-of-type').val().replace(' #', ' '));
});

window.lastEdited = {
    size: false,
    diff: true,
    comment: false,
    time: true
};
 
var globalJSArticles;
 
try {
	globalJSArticles = JSON.parse(sessionStorage.getItem("globalJSArticles"));
} catch (e) {
	globalJSArticles = null;
}
 
if (!jQuery.isArray(globalJSArticles)) {
	globalJSArticles = [
		'u:vi.yugioh:MediaWiki:Common.js/CEB.js',
		"u:vi.yugioh:BackToTopButton/code.js",
                'u:vi.yugioh:MediaWiki:FastRename.js',
	];
}
 
console.log("globalJSArticles =", globalJSArticles);
console.log("\nglobalJSArticles.splice(4, 1); sessionStorage.setItem(\"globalJSArticles\", JSON.stringify(globalJSArticles)); window.location.reload();\n\nsessionStorage.removeItem(\"globalJSArticles\"); window.location.reload();\n");

// Load all scripts with importArticles()
// http://help.wikia.com/wiki/Help:Including_additional_JavaScript_and_CSS
 
importArticles({
	type: 'script',
	articles: globalJSArticles
});