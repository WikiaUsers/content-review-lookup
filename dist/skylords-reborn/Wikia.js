/* mw-tabber link fix [links containing "()"] */
/* looks like fandom finally fixed this one (at least on oasis...) */
/*window.addEventListener('load', function () {
    $('.tabbernav > li > a[href="#"][title="' + decodeURI(window.location.hash.replace(/\./gi, '%')).substr(1).replace(/_/gi, ' ') + '"]').click();
});*/

/* Tabber Title Fix */
mw.loader.using(['ext.Tabber']).then(function() {
	$('.tabbertab').removeAttr('title');
});