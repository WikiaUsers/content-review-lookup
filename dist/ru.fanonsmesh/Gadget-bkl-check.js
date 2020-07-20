//===========================================================================
// Выделить ссылки на страницы разрешения неоднозначностей классом CSS 'bkl-link'
//===========================================================================
$(function() {
    if ( mw.config.get( 'wgIsMainPage' ) ) return;
 
    $.get('/api.php?action=query&list=categorymembers&cmtitle=Category:Неоднозначность&format=json', function(data) {
        for (var i = 0; i < data.query.categorymembers.length; i++) {
            $('a[title="' + data.query.categorymembers[i].title + '"]').each(function() {
                $(this).attr('title', $(this).attr('title') + ' (страница неоднозначности)');
                $(this).wrap('<span style="background-color: #FFDADA; padding-left: 4px; padding-right: 4px; padding-top: 1px; padding-bottom: 2px"></span>');
            });
        }
    });
});