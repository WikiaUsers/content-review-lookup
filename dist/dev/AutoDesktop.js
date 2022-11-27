/***
Name: AutoDesktop
Allow to automatically use desktop version without cookies and on all devices
Author: Gautier (Soronos)
Usage: Personal
***/
$( function() {

    if ($('body').hasClass('skin-fandommobile')) {

        window.location = mw.config.get('wgServer') + '/' + mw.config.get('wgPageName') + '?mobileaction=toggle_view_desktop' ;

    }

});