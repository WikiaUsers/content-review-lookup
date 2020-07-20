/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('ShowHide/code.js', 'dev');

// </syntax>
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
}
addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

// ============================================================
// BEGIN sliders using jquery by User:Tierrie, Wikia Staff
// ============================================================
mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            var num = this.className.replace("portal_sliderlink_", "").replace(" jump", "");
            $tabs.tabs('select', num);
            $('.jump').text('·');
            $('.portal_sliderlink_' + num + '.jump').text('•');
            return false;
        });
        $('#portal_next').click(function() {
            var num = ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1;
            $tabs.tabs('select', num); // switch to next tab
            $('.jump').text('·');
            $('.portal_sliderlink_' + (num + 1) + '.jump').text('•');
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            var num = ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1;
            $tabs.tabs('select', num); // switch to previous tab
            $('.jump').text('·');
            $('.portal_sliderlink_' + (num + 1) + '.jump').text('•');
            return false;
        });
    });
});
 
// ============================================================
// END sliders using jquery by User:Tierrie, Wikia Staff
// ============================================================