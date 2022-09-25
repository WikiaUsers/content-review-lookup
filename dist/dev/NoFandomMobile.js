/***
Name: NoFandomMobile
Allow to remove FandomMobile and use automatically desktop without cookies and on every devices
Author: Gautier (Soronos)
***/
$( function() {
    if ($('body').hasClass('skin-fandommobile')) {
        window.location = 'https://' + mw.config.get('wgDBname') + + '.fandom.com' + mw.config.get('wgPageName') + '?mobileaction=toggle_view_desktop' ;
    }
});