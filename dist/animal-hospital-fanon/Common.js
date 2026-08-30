/* Any JavaScript here will be loaded for all users on every page load. */
mw.loader.getScript("https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js")
.then(function () {

    function convertEmoji() {
        if (window.twemoji) {
            twemoji.parse(document.body, {
                folder: "svg",
                ext: ".svg"
            });
        }
    }

    // Initial page load
    convertEmoji();

    // Catch Fandom dynamic content (comments, widgets, etc.)
    const observer = new MutationObserver(function () {
        convertEmoji();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

});


window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;

mw.loader.using(['mediawiki.util']).then(function () {
  var content = document.querySelector('.mw-parser-output');

  if (!content) return;

  var box = document.createElement('div');
  box.className = 'last-edited-sitewide';
  box.innerHTML =
    '<i class="fa-solid fa-clock"></i> ' +
    'Last edited by <b>' +
    mw.config.get('wgRevisionUser') +
    '</b> on ' +
    new Date(mw.config.get('wgRevisionTimestamp')).toLocaleString();

  content.appendChild(box);
});

$(function () {
  var pageName = mw.config.get('wgPageName');

  if (!pageName) return;

  new mw.Api().get({
    action: 'query',
    prop: 'revisions',
    titles: pageName,
    rvprop: 'user|timestamp',
    rvlimit: 1,
    format: 'json'
  }).done(function (data) {
    var page = Object.values(data.query.pages)[0];

    if (!page.revisions || !page.revisions[0]) return;

    var revision = page.revisions[0];
    var date = new Date(revision.timestamp);

    var utcClock =
      String(date.getUTCHours()).padStart(2, '0') + ':' +
      String(date.getUTCMinutes()).padStart(2, '0') + ':' +
      String(date.getUTCSeconds()).padStart(2, '0') +
      ' UTC';

    $('.mw-parser-output').first().append(
      '<div class="last-edited-box">' +
        '<i class="fa-regular fa-clock last-edited-icon"></i> ' +
        'Last edited by <b>' +
        $('<div>').text(revision.user).html() +
        '</b> at ' +
        utcClock +
      '</div>'
    );
  });
});

       

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UTCClock/code.js',
    ]
});

(function () {
  var script = document.createElement("script");

  script.src =
    "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/dist/twemoji.min.js";

  script.onload = function () {
    twemoji.parse(document.body, {
      folder: "svg",
      ext: ".svg"
    });
  };

  document.head.appendChild(script);
})();