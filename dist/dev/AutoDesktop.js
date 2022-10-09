/***
Name: AutoDesktop
Allow to use automatically desktop without cookies and on every devices
Author: Gautier (Soronos)
Usage: Personal
***/
$( function() {

    if ($('body').hasClass('skin-fandommobile')) {

        window.location = mw.config.get('wgServer') + '/' + mw.config.get('wgPageName') + '?mobileaction=toggle_view_desktop' ;

    }

});