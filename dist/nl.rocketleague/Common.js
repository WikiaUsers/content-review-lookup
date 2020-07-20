/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

/***************************/
/* Dev Wiki Script Imports */
/***************************/

/*importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscordIntegrator/code.js',
        'u:dev:CacheCheck/code.js',
        'u:dev:ChatReload/code.js',
        'u:dev:DisplayClock/code.js',
    ]
});*/

/***************************/
/* Patches - toggle knop */
/***************************/
window.MassCategorizationGroups = ['sysop', 'content-moderator'];

$('.mw-customtoggle-Patches').click(function(){
	if($('#mw-customcollapsible-Patches').hasClass('mw-collapsed')) {
		$(this).text('Verberg vorige');
	} else {
		$(this).text('Toon vorige');
	}
});

/**********************************/
/* Rocket Pass 1 - toggle knoppen */
/**********************************/
$('.mw-customtoggle-Gratis1').click(function(){
	if($('#mw-customcollapsible-Gratis1').hasClass('mw-collapsed')) {
		$(this).text('Verberg gratis voorwerpen');
	} else {
		$(this).text('Toon gratis voorwerpen');
	}
});

$('.mw-customtoggle-Premium1').click(function(){
	if($('#mw-customcollapsible-Premium1').hasClass('mw-collapsed')) {
		$(this).text('Verberg premium voorwerpen');
	} else {
		$(this).text('Toon premium voorwerpen');
	}
});

/**********************************/
/* Rocket Pass 2 - toggle knoppen */
/**********************************/
$('.mw-customtoggle-Gratis2').click(function(){
	if($('#mw-customcollapsible-Gratis2').hasClass('mw-collapsed')) {
		$(this).text('Verberg gratis voorwerpen');
	} else {
		$(this).text('Toon gratis voorwerpen');
	}
});

$('.mw-customtoggle-Premium2').click(function(){
	if($('#mw-customcollapsible-Premium2').hasClass('mw-collapsed')) {
		$(this).text('Verberg premium voorwerpen');
	} else {
		$(this).text('Toon premium voorwerpen');
	}
});

/**********************************/
/* Rocket Pass 3 - toggle knoppen */
/**********************************/
$('.mw-customtoggle-Gratis3').click(function(){
	if($('#mw-customcollapsible-Gratis3').hasClass('mw-collapsed')) {
		$(this).text('Verberg gratis voorwerpen');
	} else {
		$(this).text('Toon gratis voorwerpen');
	}
});

$('.mw-customtoggle-Premium3').click(function(){
	if($('#mw-customcollapsible-Premium3').hasClass('mw-collapsed')) {
		$(this).text('Verberg premium voorwerpen');
	} else {
		$(this).text('Toon premium voorwerpen');
	}
});

/**********************************/
/* Rocket Pass 4 - toggle knoppen */
/**********************************/
$('.mw-customtoggle-Gratis4').click(function(){
	if($('#mw-customcollapsible-Gratis4').hasClass('mw-collapsed')) {
		$(this).text('Verberg gratis voorwerpen');
	} else {
		$(this).text('Toon gratis voorwerpen');
	}
});

$('.mw-customtoggle-Premium4').click(function(){
	if($('#mw-customcollapsible-Premium4').hasClass('mw-collapsed')) {
		$(this).text('Verberg premium voorwerpen');
	} else {
		$(this).text('Toon premium voorwerpen');
	}
});

/**********************************/
/* Rocket Pass 5 - toggle knoppen */
/**********************************/
$('.mw-customtoggle-Gratis5').click(function(){
	if($('#mw-customcollapsible-Gratis5').hasClass('mw-collapsed')) {
		$(this).text('Verberg gratis voorwerpen');
	} else {
		$(this).text('Toon gratis voorwerpen');
	}
});

$('.mw-customtoggle-Premium5').click(function(){
	if($('#mw-customcollapsible-Premium5').hasClass('mw-collapsed')) {
		$(this).text('Verberg premium voorwerpen');
	} else {
		$(this).text('Toon premium voorwerpen');
	}
});

/**********************************/
/* Rocket Pass 6 - toggle knoppen */
/**********************************/
$('.mw-customtoggle-Gratis6').click(function(){
	if($('#mw-customcollapsible-Gratis6').hasClass('mw-collapsed')) {
		$(this).text('Verberg gratis voorwerpen');
	} else {
		$(this).text('Toon gratis voorwerpen');
	}
});
 
$('.mw-customtoggle-Premium6').click(function(){
	if($('#mw-customcollapsible-Premium6').hasClass('mw-collapsed')) {
		$(this).text('Verberg premium voorwerpen');
	} else {
		$(this).text('Toon premium voorwerpen');
	}
});

/**********************************/
/* Rocket Pass 7 - toggle knoppen */
/**********************************/
$('.mw-customtoggle-Gratis6').click(function(){
	if($('#mw-customcollapsible-Gratis6').hasClass('mw-collapsed')) {
		$(this).text('Verberg gratis voorwerpen');
	} else {
		$(this).text('Toon gratis voorwerpen');
	}
});
 
$('.mw-customtoggle-Premium7').click(function(){
	if($('#mw-customcollapsible-Premium7').hasClass('mw-collapsed')) {
		$(this).text('Verberg premium voorwerpen');
	} else {
		$(this).text('Toon premium voorwerpen');
	}
});