@import url("http://brisco-county-jr.wikia.com/index.php?title=MediaWiki:Common.js&usemsgcache=yes&ctype=text/css&smaxage=86400&action=raw&maxage=86400");

/* Re-add proper namespace prefix to titles where it has been removed "by design" */
$('.ns-5 .WikiaPageHeader h1').prepend('Brisco County, Jr. Wiki ');
$('.ns-6 .WikiaPageHeader h1').prepend('File:');
$('.ns-7 .WikiaPageHeader h1').prepend('File ');
$('.ns-8 .WikiaPageHeader h1').prepend('MediaWiki:');
$('.ns-9 .WikiaPageHeader h1').prepend('MediaWiki ');
$('.ns-10 .WikiaPageHeader h1').prepend('Template:');
$('.ns-11 .WikiaPageHeader h1').prepend('Template ');
$('.ns-13 .WikiaPageHeader h1').prepend('Help ');
$('.ns-14 .WikiaPageHeader h1').prepend('Category:');
$('.ns-15 .WikiaPageHeader h1').prepend('Category ');

/* Remove image attribution as per new Wikia regulations */
$('.picture-attribution').remove();