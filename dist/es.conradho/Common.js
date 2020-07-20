highlight = {
    selectAll: true,
    sysop: 'green'
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:HighlightUsers/code.js'
    ]
});
// Slider
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

// Facebook Modulo
$(window).load(function(){
    $('#WikiaRail').append('<section class="module" id="facebookmodule"><iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/plugins/likebox.php?href=https://www.facebook.com/AnimangaWikiEsp&width&height=300&colorscheme=light&show_faces=true&header=true&stream=false&show_border=true" align="top" frameborder="0" width="270" height="280" scrolling="no" /></section>');
});