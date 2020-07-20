$(function() {
    if ( mw.config.get( 'wgIsMainPage' ) ) return;
 
    $.get('/api.php?action=query&list=categorymembers&cmtitle=Category:Многозначные_термины&format=json', function(data) {
        for (var i = 0; i < data.query.categorymembers.length; i++) {
            $('a[title="' + data.query.categorymembers[i].title + '"]').each(function() {
                $(this).attr('title', $(this).attr('title') + ' (Неоднозначность)');
                $(this).wrap('<span class="disambig"></span>');
            });
        }
    });
});