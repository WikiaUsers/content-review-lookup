$('.WikiNav > ul > li:first-child').addClass('liActive');
$('.WikiNav > ul > li').mouseenter(function() {
	$('.WikiNav > ul > li').removeClass('liActive');
	$(this).addClass('liActive'); }
);


/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
 
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


// Guilty Crown Discord
window.DiscordIntegratorConfig = {
    siderail: {
        title: "Slay's Wiki Emporium",
        id: "394916016905256960",
        theme: "light"
    }
};