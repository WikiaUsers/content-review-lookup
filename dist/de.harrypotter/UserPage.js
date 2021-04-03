if(!!$('.UserProfileMasthead').length) {
    var discussions = parseInt($('.UserProfileMasthead .discussion-details em').text(), 10);
    var wiki = parseInt($('.UserProfileMasthead .contributions-details em').text(), 10);
    
    if(wiki <= 0 && !!$('.UserProfileMasthead').length) {
        $('.UserProfileMasthead .contributions-details').remove('');
        $('.UserProfileMasthead .discussion-details').css('border-top','none');
        var url = mw.util.wikiScript('api') + '?' + $.param({
            action: 'parse',
            title: mw.config.get('wgTitle'),
            format: 'json'
        }) + '&text={{int:Custom-Noarticletext+NS+User+Discussions}}';
        $.getJSON(url, function(res) {
            mw.util.$content.find('.noarticletext').html(
                res.parse.text['*']
            );
        });
    }
}