/* Facebook Box */

function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=696982657059939&amp;connections=10&amp;stream=0" align="top" frameborder="0" width="280" height="250" scrolling="no" />');
}
$(fBox);

/* Patch Calculator */

if (mw.config.get('wgPageName') == 'Patch_Calculator') {
/*import script here*/
 importArticles({
     type: "script",
     debug: "true",
     articles: [
         "MediaWiki:PatchCalculator.js"
     ]
 });
}

/* Rare Fish Calculator */

if (mw.config.get('wgPageName') == 'Rare_Fish_Calculator') {
/*import script here*/
 importArticles({
     type: "style",
     debug: "true", /*just a try for chrome android compatibility*/
     articles: [
         "MediaWiki:RareFishCalculator.css"
     ]
 },{
     type: "script",
     debug: "true",
     articles: [
         "MediaWiki:RareFishCalculator.js"
     ]
 }
);
}