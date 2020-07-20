var wf = document.createElement('script');
wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
    '://apis.google.com/js/plusone.js';
wf.type = 'text/javascript';
wf.async = 'true';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(wf, s);

var jsc = document.createElement('script');
jsc.src = ('https:' === document.location.protocol ? 'https' : 'http') +
    '://apis.google.com/js/client:plusone.js';
jsc.type = 'text/javascript';
jsc.async = 'true';
var k = document.getElementsByTagName('script')[0];
k.parentNode.insertBefore(jsc, k);

var pub = document.createElement('link');
pub.setAttribute('rel', 'publisher');
pub.setAttribute('href', 'https://plus.google.com/109790523742219568908');
var l = document.getElementsByTagName('link')[0];
l.parentNode.insertBefore(pub, l);

if ( wgNamespaceNumber != -1 && !window.GooglePlusOne ) {
	addOnloadHook( addGooglePlusOneButton );
}

if ( wgNamespaceNumber != -1 && !window.ShareonGooglePlus ) {
	addOnloadHook( addShareonGooglePlusButton );
}
var GooglePlusOne = true;
var ShareonGooglePlus = true;

function addGooglePlusOneButton () {
   $(($( '.WikiaPageHeader' ).length ? '.WikiaPageHeader' : '#WikiaPageHeader') + ' > .comments').after('<div class="g-plusone" data-size="small"></div><div class="g-plus" data-action="share" data-annotation="none" data-height="15"></div>');
   $(($( '.WikiaUserPagesHeader' ).length ? '.WikiaUserPagesHeader' : '#WikiaUserPagesHeader') + ' > .comments').after('<div class="g-plusone" data-size="small"></div><div class="g-plus" data-action="share" data-annotation="none" data-height="15"></div>');
}

function addShareonGooglePlusButton () {
   $(($( '.WikiaPage' ).length ? '.WikiaPage' : '#WikiaPage') + ' > .WikiaPageContentWrapper > .SharingToolbar').prepend('<div class="shareButton"><div class="g-plus" data-action="share" data-annotation="vertical-bubble" data-height="60"></div></div>');
}