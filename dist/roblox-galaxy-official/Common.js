// DONT TOUCH THIS PAGE -SEAN
 
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
console.log("Common JS Version 3.12.21"); //used to confirm code is running; debugging
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];

// back to top button
window.BackToTopModern = true;

// Code below was made by Smallketchup82 for the animation of templates with links. On clicking the link, check if tab is focused. If not, check every 100 miliseconds if the tab is focused, if it is focused, add the class which runs the CSS transition.
var el = document.querySelector('.TemplateRevision.UnderlineStyle');
var elstyle = document.querySelector('.UnderlineStyle .noexternal .header1 span:after');
if(el !== null) {
el.onclick = function() {
if(!el.classList.contains("Underlineactive")) {
	setTimeout(function() {
			if(document.visibilityState === "hidden") {
		var x = setInterval(function() {
			if(document.visibilityState === "visible") {
				clearInterval(x);
				el.classList.add("Underlineactive");
				console.log('added class after visibility changed')
			}
		}, 100)
	} else if(document.visibilityState === "visible") {
		el.classList.add("Underlineactive");
		console.log('added class without visibility change')
	}
	}, 500)
}
};
}
//To view additional scripts, refer to MediaWiki:ImportJS or search the MediaWiki domain for other "".js" pages
//Importing the Navbox.js
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Navbox.js",
    ]
});