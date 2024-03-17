$(function(){
  const namespaceNumber = mw.config.get('wgNamespaceNumber');
  const isCorrectNamespace = namespaceNumber === 0 || namespaceNumber === 2 || namespaceNumber === 4 || namespaceNumber === 14;

  if (isCorrectNamespace){
    $('div#content div.mw-parser-output').prepend('<div id="lede-start">');
    $('div#lede-start').nextUntil('h2').wrapAll('<div id="lede">');

    $('div#lede').after('<div id="body-start">');
    $('div#body-start').nextAll().wrapAll('<div id="body">');

    function findDuplicateLinksLede(){
      const href = $(this).attr('href');

      if (seenLede[href]){
        $(this).addClass('duplicate-link');
      } else {
        seenLede[href] = true;
      }
    };

    function findDuplicateLinksBody(){
      const href = $(this).attr('href');

      if (seenBody[href]){
        $(this).addClass('duplicate-link');
      } else {
        seenBody[href] = true;
      }
    };

    const seenLede = {};
    const seenBody = {};

    $('#content div.mw-parser-output').find('#lede p a').each(findDuplicateLinksLede);
    $('#content div.mw-parser-output').find('#body p a').each(findDuplicateLinksBody);
  }
});