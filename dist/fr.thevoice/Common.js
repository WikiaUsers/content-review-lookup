/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

// Import [[MediaWiki:Onlyifuploading.js]] 
if (wgCanonicalSpecialPageName == "Upload") {
    document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

// ============================================================
// BEGIN import Onlyifediting-functions
// SEE ALSO [[MediaWiki:Onlyifediting.js]]

if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
    document.write('<script type="text/javascript" src="/wiki/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

// END import Onlyifediting-functions
// ============================================================


/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({ fx: { opacity: 'toggle', duration: 100 } });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});

//Articles complet dans le rail de droite//
window.AddRailModule = [{page: 'Modèle:HComplet', prepend: true, maxAge: 0}];