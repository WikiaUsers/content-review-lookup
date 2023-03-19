if ($( "body" ).hasClass( "ns-0" )) {
  $(function() {
    setTimeout( function() { mw.loader.load('https://apis.google.com/js/platform.js') },
    1000)
  });
}



// change label
$('.pi-data-label:contains("Username")').replaceWith('<h3 class="pi-data-label pi-secondary-font">Subscribers</h3>');

window.lastEdited = {
    position: 'bottom',
    size: false,
    comment: false,
    time: true
};

window.ajaxIndicator = 'https://slot1-images.wikia.nocookie.net/__cb1603999865266/common/skins/common/images/ajax.gif';

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
importArticle({ type: 'script', article: 'u:dev:I18n-js/code.js' });

// Set a timer for the subscriber button for 3 seconds, because the issue is that it loaded too fast
if ($( "body" ).hasClass( "ns-0" )) {
  $(function() {
    setTimeout( function() { mw.loader.load('https://apis.google.com/js/platform.js') },
    1000)
  });
}

// Load the script using mw.loader.load
mw.loader.load("yt/platform.js", "text/javascript", () => {
  // Once the script has been loaded, clear the timeout
  clearTimeout(timeout);
});