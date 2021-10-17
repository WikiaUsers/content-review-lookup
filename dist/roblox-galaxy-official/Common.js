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

// random background image array. The first one is always our default. check https://roblox-galaxy-official.fandom.com/wiki/File:Wiki-background for a list of our backgrounds.
var imgs = [
	'url("https://vignette.wikia.nocookie.net/roblox-galaxy-official/images/5/50/Wiki-background/revision/latest?cb=20200109030158")',
	'var(--theme-body-background-image)',
	'url("https://static.wikia.nocookie.net/roblox-galaxy-official/images/a/ae/Galaxy_bg.jpg/revision/latest?cb=20210523005538&format=original")',
	//'url("https://static.wikia.nocookie.net/roblox-galaxy-official/images/d/d6/Galaxy_2_bg.jpg/revision/latest?cb=20210523005620&format=original")'
	];
//attempt to randomize background by modifying the URL of the "background" property on the header element
var random = false;
window.setTimeout(function(){
		randomBG();
		console.log('load');
},1);
//check after 1500 ms to see if window load event fired, otherwise set background to default
window.setTimeout(function(){
	if(!random){
		randomBG();
		console.log('timeout');
	} 
},1500);

function randomBG(){
	//Array.from searches for div elements on page, then narrows them down via the class list to ensure that the header element that we want to change the image property on is selected
	var bgImgCont = Array.from(document.getElementsByTagName("div")).find(function(obj){
		return obj.classList !== null && obj.classList.contains('fandom-community-header__background','fitCenter','fullscreen')});
	
	bgImgCont.style.backgroundImage = imgs[Math.floor(Math.random() * imgs.length)];
	/*
	bgImgCont.style.backgroundRepeat = "repeat";
	bgImgCont.style.backgroundSize = "120%";
	bgImgCont.style.backgroundAttachment = "fixed";
	*/
	random = true;
}

// back to top button
window.BackToTopModern = true;

// background parallax animation | turn down velocity to make it more subtle | do not remove without telling smallketchup82
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

//To view additional scripts, refer to MediaWiki:ImportJS or search the MediaWiki domain for other "".js" pages
//Importing the Navbox.js
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Navbox.js",
    ]
});