var conStyle = "background-color:black;color:red;font-weight:bold;font-family:Rubik;padding:1%";
console.group("%cDebugging the subscribe button. Please message an administrator if you're seeing an error prefixed with [YT] in the following nested console messages, ignore anything that does not have the prefix.", conStyle);
console.debug("[YT] Initial target:", document.querySelector("div.g-ytsubscribe"));

var loadInterval = setInterval(function() {
  console.debug("[YT] Target:", document.querySelector("div.g-ytsubscribe"));
  if (!document.querySelector("div.g-ytsubscribe")) {
    clearInterval(loadInterval);
    console.debug("[YT] Stopping the loop");
    console.assert(!document.querySelector("div.g-ytsubscribe"));
    console.groupEnd();
  } else {
    console.count("[YT] Firing payload");
    mw.loader.load('https://apis.google.com/js/platform.js');
  }
}, 1000);


// change label
$('.pi-data-label:contains("Username")').replaceWith('<h3 class="pi-data-label pi-secondary-font">Subscribers</h3>');

window.lastEdited = {
    position: 'bottom',
    size: false,
    comment: false,
    time: true
};

window.ajaxIndicator = 'https://slot1-images.wikia.nocookie.net/__cb1603999865266/common/skins/common/images/ajax.gif';

(function ($, mw) {
    function loadHighlights() {
        var deferred = $.Deferred(),
            apiEndpoint = 'https://youtube.fandom.com/api.php',
            page = 'MediaWiki:Custom-UserTags.json',
            params;

        params = {
            action: 'query',
            format: 'json',
            prop: 'revisions',
            rvprop: 'content',
            titles: page,
            indexpageids: 1
        };
        mw.loader.using(['mediawiki.util'], function () {
            $.ajax(apiEndpoint, {
                data: params,
                dataType: 'jsonp'
            }).always(function (data) {
                var res = '',
                    revisionData = data.query && data.query.pages[data.query.pageids[0]].revisions;

                if (revisionData) {
                    res = revisionData[0]['*'];
                }

                deferred.resolve(parseMessagesToObject(res));
            });
        });

        return deferred;
    }

    function parseMessagesToObject(res) {
        var json = {};

        try {
            res = stripComments(res);
            json = JSON.parse(res);
        } catch (err) {}

        return json;
    }

    function stripComments(json) {
        json = json
            .trim()
            .replace(/\/\*[\s\S]*?\*\//g, '');

        return json;
    }

    loadHighlights().then(function (body) {
        UserTagsJS.modules.custom = body;
    });
})(jQuery, mediaWiki);

//CopyText's JS
mw.hook('dev.i18n').add(function (i18n) {
    i18n.loadMessages('CopyText').done(function (i18n) {
        $('body').on('click', '.copy-to-clipboard-button', function(e){
            var text = $(this).data('text'),
            $input = $('<textarea>', { type: 'text' })
                .val($('.copy-to-clipboard-text').filter(function() {
                    return $(this).data('text') == text;
                }).first().text())
                .appendTo('body')
                .select();
            document.execCommand('Copy');
            $input.remove();
            new BannerNotification(i18n.msg('success').escape(), 'confirm').show();
        });
    });
});
importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });

/* Cosmetically remove Alida's bot tag */
var alidaLoadInterval = setInterval(function() {
  if (mw.config.get('wgPageName') !== 'User:Nerdfightergirl') { clearInterval(alidaLoadInterval); return; }

  var userTags = document.querySelectorAll('span.user-identity-header__tag');
  if (userTags) {
    for (var index = 0; index < userTags.length; index++) {
      if (userTags[index].innerText === "Bot") userTags[index].remove();
    }
    clearInterval(alidaLoadInterval);
  }
}, 1000);

/* Cosmetically remove Alida's bot tag */
var alidaLoadInterval = setInterval(function() {
  if (mw.config.get('wgPageName') !== 'User:Nerdfightergirl') { clearInterval(alidaLoadInterval); return; }

  var userTags = document.querySelectorAll('span.user-identity-header__tag');
  if (userTags) {
    for (var index = 0; index < userTags.length; index++) {
      if (userTags[index].innerText === "Bot") userTags[index].remove();
    }
    clearInterval(alidaLoadInterval);
  }
}, 1000);