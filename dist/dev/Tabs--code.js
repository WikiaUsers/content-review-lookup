/* created by Curiouscrab */
/* ask questions at User:Curiouscrab/talk */
/* copied from Scratchpad by Curiouscrab */
(function() {
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:Tabs.css'
    });
    $('.table').each(function(i, el) {
        var $el = $(el);
        $el.attr({
            id: 'table' + i,
            'class': ''
        }).click(click);
    });
    function click() {
        $('#table' + num + ' .tabon').attr('class', 'taboff');
        $('#table' + num + ' .content').css('display', 'none');
        $(this).attr('class', 'tabon');
        $('#table' + num + ' #content' + this.id).css('display', 'block');
    }
})();