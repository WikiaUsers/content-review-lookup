if (wgAction == 'edit' || wgAction == 'submit') {
    importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
    addOnloadHook(function(){
        $('#toolbar').append($('<img>')
          .attr('src','http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png')
          .attr({alt:'викификатор', title:'викификатор'})
          .css('cursor','pointer')
          .click(Wikify))
        .append($('<img>')
          .attr('src','https://images.wikia.nocookie.net/ani-manga/ru/images/4/48/Button-notag.png')
          .attr({alt:'untagger', title:'untagger'})
          .css('cursor','pointer')
          .click(function(){
             $('#wpTextbox1').val($('#wpTextbox1').val()
               .replace(/<\/?(p|span)( .*?)?>/g, '')
               .replace(/(\r?\n\r?){3,}/gm, "\n\n"));
          }));
    });
}