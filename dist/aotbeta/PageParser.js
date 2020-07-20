/**
 * @name PageParser
 * @author Manuel de la Fuente (https://manuelfte.com)
 * @version 1.0.0
 * @license CC-BY-SA-3.0
 * @description Transcludes a Wikia page into another while bypassing cache
 */
/* eslint-env browser */

window.mw.hook('wikipage.content').add(function (content) {
  'use strict';

  console.log('PageParser v1.0.0');

  content[0].querySelectorAll('.parser:not(.parsed)').forEach(function (div) {
    var wikitext = div.dataset.wikitext;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        div.innerHTML = JSON.parse(request.responseText).parse.text['*'];
      }
    };
    request.open('GET', '/api.php?action=parse&format=json&disablepp=1&prop=text&text={{' + wikitext + '}}', true);
    request.setRequestHeader('Accept', 'application/hal+json');
    request.withCredentials = true;
    request.send();
    div.classList.add('parsed');
  });
});