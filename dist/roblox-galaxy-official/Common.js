// DO NOT TOUCH THIS PAGE UNLESS YOU KNOW WHAT YOU'RE DOING - A message from the Galaxy Wiki Staff™
 
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

// random background image, the first one is always our default. check https://roblox-galaxy-official.fandom.com/wiki/File:Wiki-background for a list of our backgrounds.
var imgs = [
	'https://vignette.wikia.nocookie.net/roblox-galaxy-official/images/5/50/Wiki-background/revision/latest?cb=20200109030158',
	'https://static.wikia.nocookie.net/roblox-galaxy-official/images/a/ae/Galaxy_bg.jpg/revision/latest?cb=20210523005538&format=original',
	'https://static.wikia.nocookie.net/roblox-galaxy-official/images/d/d6/Galaxy_2_bg.jpg/revision/latest?cb=20210523005620&format=original'
	];
    
document.body.style.backgroundImage = 'url(' + imgs[Math.floor(Math.random() * imgs.length)] + ')'

// back to top button
window.BackToTopModern = true;

// background parallax animation | turn down velocity to make it more subtle
var velocity = 0.1;

$(window).scroll(function() {
	var pos = $(window).scrollTop(); 
    $('body.background-image').each(function() { 
    	var initY = $(this).offset().top
        var height = $(window).height();
        var endY = initY + $(this).height()
        
        var diff = pos - initY;
        var ratio = Math.round((diff / height) * 100)
        //console.log('Position: ' + pos + ' | diff: ' + diff + ' | ratio: ' + ratio + ' | BGPos: ' + parseInt(-(ratio * velocity)))
        $(this).css('backgroundPosition', 'center ' + parseInt(-(ratio * velocity)) + 'px');
    });
})

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