var wf = document.createElement('script');<br />wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +<br />'://apis.google.com/js/plusone.js';<br />wf.type = 'text/javascript';<br />wf.async = 'true';<br />var s = document.getElementsByTagName('script')[0];<br />s.parentNode.insertBefore(wf, s);

var jsc = document.createElement('script');<br />jsc.src = ('https:' === document.location.protocol ? 'https' : 'http') +<br />'://apis.google.com/js/client:plusone.js';<br />jsc.type = 'text/javascript';<br />jsc.async = 'true';<br />var k = document.getElementsByTagName('script')[0];<br />k.parentNode.insertBefore(jsc, k);

var pub = document.createElement('link');<br />pub.setAttribute('rel', 'publisher');<br />pub.setAttribute('href', 'https://plus.google.com/109790523742219568908');<br />var l = document.getElementsByTagName('link')[0];<br />l.parentNode.insertBefore(pub, l);

if ( wgNamespaceNumber != -1 && !window.GooglePlusOne ) {<br />addOnloadHook( addGooglePlusOneButton );<br />}

if ( wgNamespaceNumber != -1 && !window.ShareonGooglePlus ) {<br />addOnloadHook( addShareonGooglePlusButton );<br />}
var GooglePlusOne = true;<br />var ShareonGooglePlus = true;

function addGooglePlusOneButton () {<br />$(($( '.WikiaPageHeader' ).length ? '.WikiaPageHeader' : '#WikiaPageHeader') + ' > .comments').after('<div class="g-plusone" data-size="small"></div><div class="g-plus" data-action="share" data-annotation="none" data-height="15"></div>');<br />$(($( '.WikiaUserPagesHeader' ).length ? '.WikiaUserPagesHeader' : '#WikiaUserPagesHeader') + ' > .comments').after('<div class="g-plusone" data-size="small"></div><div class="g-plus" data-action="share" data-annotation="none" data-height="15"></div>');<br />}

function addShareonGooglePlusButton () {<br />$(($( '.WikiaPage' ).length ? '.WikiaPage' : '#WikiaPage') + ' > .WikiaPageContentWrapper > .SharingToolbar').prepend('<div class="shareButton"><div class="g-plus" data-action="share" data-annotation="vertical-bubble" data-height="60"></div></div>');<br />}