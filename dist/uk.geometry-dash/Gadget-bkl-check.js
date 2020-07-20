// Код було узято з російської Викии Вики
//===========================================================================
// Відилити посилання на сторінки дозволу неоднозначності класом CSS 'bkl-link'
//===========================================================================
$(function() {
    if ( mw.config.get( 'wgIsMainPage' ) ) return;
 
    $.get('/api.php?action=query&list=categorymembers&cmtitle=Category:Неоднозначність&format=json', function(data) {
        for (var i = 0; i < data.query.categorymembers.length; i++) {
            $('a[title="' + data.query.categorymembers[i].title + '"]').each(function() {
                $(this).attr('title', $(this).attr('title') + ' (сторінка неоднозначності)');
                $(this).wrap('<span style="background-color: #F08080; padding-left: 4px; padding-right: 4px; padding-top: 3px; padding-bottom: 2px"></span>');
            });
        }
    });
});