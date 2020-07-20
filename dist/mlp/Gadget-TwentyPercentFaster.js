$('#WikiaArticle').on('mouseenter', 'a', function() {
    var href = $(this).attr('href'),
      isponylist = /\/wiki\/List of (?:ponies\/|.*ponies|Wonderbolts|Equestria Girls)/i;

    if (
      !($(this).parent().hasClass('nofastpony')) &&
      !(/\/fast/.test(href)) && 
      isponylist.test(href.replace(/_/g, ' '))
    ) {
        $(this).attr('href', 
          href.replace('/wiki/', 
            '/wiki/List_of_ponies/fast?loppage='
          )
        );
    }
});