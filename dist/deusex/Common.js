/* Any JavaScript here will be loaded for all users on every page load. */

/* Main page */

/**************************************************************/
/* sliders using jquery by User:Tierrie in Dragon Age Wiki */
/**************************************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
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



/* tabber: changing the tab displayed by default for certain pages */
/* (source: http://community.wikia.com/wiki/Forum:Extension:Tabber_-_Setting_the_default_tab_displayed) */

if (mw.config.get('wgPageName') === 'Human_Vanguard' || mw.config.get('wgPageName') === 'Human_Infiltrator' || mw.config.get('wgPageName') === 'Human_Adept') {
    $(window).on('load.tabberhack', function() {
        $('.tabberlive')[0].tabber.tabShow(1);
        $(window).off('load.tabberhack');
    });
}

// ============================================================
// BEGIN Template:Games
// ============================================================

// Description: Add icons to article title
// Credit:      User:Porter21 (modifications by User:Rappy and User:Gardimuer)
$(function addTitleIcons() {
    var insertTarget;

    if (wgAction != 'submit' && wgNamespaceNumber != 112 && $('#va-titleicons').length > 0) {
        insertTarget = $('#WikiaPageHeader .tally');
        $('#WikiaPageHeader .tally').html(' ').css('width', '200px');
    }
    if (insertTarget) {
        $('#va-titleicons').css('display', 'block').prependTo(insertTarget);
        $('#va-titleicons-more').append('<img width="0" height="0" class="va-titleicons-chevron" src="' + wgBlankImgUrl + '">');

        $('#va-titleicons').hover(
            function() {
                $(this).addClass('va-titleicons-hover');
            },
            function() {
                $(this).removeClass('va-titleicons-hover');
            });
    }
});

// ============================================================
// END Template:Games
// ============================================================