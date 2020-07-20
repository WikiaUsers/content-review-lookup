/* Any JavaScript here will be loaded for all users on every page load. */

/***************************/
/* Dev Wiki Script Imports */
/***************************/

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscordIntegrator/code.js',
        'u:dev:CacheCheck/code.js',
        'u:dev:ChatReload/code.js',
        'u:dev:DisplayClock/code.js',
    ]
});

/***************************/
/* Patches - toggle button */
/***************************/
window.MassCategorizationGroups = ['sysop', 'content-moderator'];

$('.mw-customtoggle-Patches').click(function(){
	if($('#mw-customcollapsible-Patches').hasClass('mw-collapsed')) {
		$(this).text('Hide previous');
	} else {
		$(this).text('Show previous');
	}
});

/**********************************/
/* Rocket Pass 1 - toggle buttons */
/**********************************/
$('.mw-customtoggle-Free1').click(function(){
	if($('#mw-customcollapsible-Free1').hasClass('mw-collapsed')) {
		$(this).text('Hide free items');
	} else {
		$(this).text('Show free items');
	}
});

$('.mw-customtoggle-Premium1').click(function(){
	if($('#mw-customcollapsible-Premium1').hasClass('mw-collapsed')) {
		$(this).text('Hide premium items');
	} else {
		$(this).text('Show premium items');
	}
});

/**********************************/
/* Rocket Pass 2 - toggle buttons */
/**********************************/
$('.mw-customtoggle-Free2').click(function(){
	if($('#mw-customcollapsible-Free2').hasClass('mw-collapsed')) {
		$(this).text('Hide free items');
	} else {
		$(this).text('Show free items');
	}
});

$('.mw-customtoggle-Premium2').click(function(){
	if($('#mw-customcollapsible-Premium2').hasClass('mw-collapsed')) {
		$(this).text('Hide premium items');
	} else {
		$(this).text('Show premium items');
	}
});

/**********************************/
/* Rocket Pass 3 - toggle buttons */
/**********************************/
$('.mw-customtoggle-Free3').click(function(){
	if($('#mw-customcollapsible-Free3').hasClass('mw-collapsed')) {
		$(this).text('Hide free items');
	} else {
		$(this).text('Show free items');
	}
});

$('.mw-customtoggle-Premium3').click(function(){
	if($('#mw-customcollapsible-Premium3').hasClass('mw-collapsed')) {
		$(this).text('Hide premium items');
	} else {
		$(this).text('Show premium items');
	}
});

/**********************************/
/* Rocket Pass 4 - toggle buttons */
/**********************************/
$('.mw-customtoggle-Free4').click(function(){
	if($('#mw-customcollapsible-Free4').hasClass('mw-collapsed')) {
		$(this).text('Hide free items');
	} else {
		$(this).text('Show free items');
	}
});

$('.mw-customtoggle-Premium4').click(function(){
	if($('#mw-customcollapsible-Premium4').hasClass('mw-collapsed')) {
		$(this).text('Hide premium items');
	} else {
		$(this).text('Show premium items');
	}
});

/**********************************/
/* Rocket Pass 5 - toggle buttons */
/**********************************/
$('.mw-customtoggle-Free5').click(function(){
	if($('#mw-customcollapsible-Free5').hasClass('mw-collapsed')) {
		$(this).text('Hide free items');
	} else {
		$(this).text('Show free items');
	}
});

$('.mw-customtoggle-Premium5').click(function(){
	if($('#mw-customcollapsible-Premium5').hasClass('mw-collapsed')) {
		$(this).text('Hide premium items');
	} else {
		$(this).text('Show premium items');
	}
});

/**********************************/
/* Rocket Pass 6 - toggle buttons */
/**********************************/
$('.mw-customtoggle-Free6').click(function(){
	if($('#mw-customcollapsible-Free6').hasClass('mw-collapsed')) {
		$(this).text('Hide free items');
	} else {
		$(this).text('Show free items');
	}
});

$('.mw-customtoggle-Premium6').click(function(){
	if($('#mw-customcollapsible-Premium6').hasClass('mw-collapsed')) {
		$(this).text('Hide premium items');
	} else {
		$(this).text('Show premium items');
	}
});

/**********************************/
/* Rocket Pass 7 - toggle buttons */
/**********************************/
$('.mw-customtoggle-Free7').click(function(){
	if($('#mw-customcollapsible-Free7').hasClass('mw-collapsed')) {
		$(this).text('Hide free items');
	} else {
		$(this).text('Show free items');
	}
});

$('.mw-customtoggle-Premium7').click(function(){
	if($('#mw-customcollapsible-Premium7').hasClass('mw-collapsed')) {
		$(this).text('Hide premium items');
	} else {
		$(this).text('Show premium items');
	}
});