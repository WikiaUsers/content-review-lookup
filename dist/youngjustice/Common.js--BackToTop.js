/* Adds "Back to Top" link to headings on Timeline
 * By: [[User:KettleMeetPot]]
 */
$(function() {
    if (wgPageName == 'Timeline' && wgAction !== "edit") {
        $("#WikiaPage h2").append('<span class="editsection back-to-top" style="font-size: 12px"><a href="javascript:void(0)" title="Back to Top">&uarr;Back to Top</a></span>');
        $("[id*='Team_Year_'], #2043, #2056").next().after('<span class="editsection back-to-top"  style="font-size: 12px"><a href="javascript:void(0)" title="Back to Top">&uarr;Back to Top</a></span>');
        $(".back-to-top").click(function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    }
});