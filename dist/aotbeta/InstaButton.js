/* eslint-env browser */
(function () {
  'use strict';

  console.log('InstaButton v.0.0.5');

  var request = new XMLHttpRequest();
  request.timeout = 30000;
  request.ontimeout = function () {
    console.log('Request timed out.');
  };
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var response = JSON.parse(request.responseText).users[0].user.follower_count;
      console.log('Followers', response);
    }
  };
  request.open('GET', 'https://www.instagram.com/web/search/topsearch/?query=attackontitanwiki', true);
  request.send();

  var button = encodeURIComponent(
    '<html>' +
      '<head>' +
        '<link rel="stylesheet" href="http://aotbeta.wikia.com/load.php?mode=articles&articles=MediaWiki:InstaButton.css&only=styles" />' +
      '</head>' +
      '<body>' +
        '<div id="wrapper">' +
          '<a id="button" href="https://instagram.com/attackontitanwiki" target="_blank">' +
            '<div id="logo"></div> @attackontitanwiki' +
          '</a>' +
          '<div id="followers">1.2K followers</div>' +
        '</div>' +
      '</body>' +
    '</html>'
  );
  var iframe =
    '<iframe scrolling="no" allowtransparency="true" style="border: none; height: 32px; overflow: hidden;" src="data:text/html;charset=utf-8,' + button + '"></iframe>';
  var div = document.getElementById('instabutton');

  div.innerHTML = iframe;
})();