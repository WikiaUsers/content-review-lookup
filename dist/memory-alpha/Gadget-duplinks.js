$(function(){
  const namespaceNumber = mw.config.get('wgNamespaceNumber');

  if ($('.ns-talk').length === 0){
    const highlightDuplicateLinks = $('<li><a href="#">Highlight duplicate links</a></li>');
    $('#my-tools-menu').prepend(highlightDuplicateLinks);

    highlightDuplicateLinks.click(function(e){
      e.preventDefault();

      const content = ($('.ve-ce-rootNode').length === 0) ? $('#content .mw-parser-output') : $('.ve-ce-rootNode');

      content.prepend('<div id="lede-start">');
      $('#lede-start').nextUntil('h2').wrapAll('<div id="lede">');

      $('#lede').after('<div id="body-start">');
      $('#body-start').nextAll().wrapAll('<div id="body">');

      function findDuplicateLinksLede(){
        const href = $(this).attr('href');

        if (href !== undefined && href.indexOf('#') != 0){
          if (seenLede[href]){
            $(this).addClass('duplicate-link');
          } else {
            seenLede[href] = true;
          }
        }
      }

      function findDuplicateLinksBody(){
        const href = $(this).attr('href');

        if (href !== undefined && href.indexOf('#') != 0){
          if (seenBody[href]){
            $(this).addClass('duplicate-link');
          } else {
            seenBody[href] = true;
          }
        }
      }

      const seenLede = {};
      const seenBody = {};

      content.find('#lede p a').each(findDuplicateLinksLede);
      content.find('#body p a').each(findDuplicateLinksBody);
    });
  }
});