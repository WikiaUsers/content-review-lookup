//<nowiki>
mw.loader.load('https://apis.google.com/js/platform.js');

if (wgPageName === 'Special:Upload' || wgPageName === 'Special:MultipleUpload') {
    $('#wpUploadDescription').val('[[Category:Images]]');
}
//</nowiki>

// change label
$('.pi-data-label:contains("Username")').replaceWith('<h3 class="pi-data-label pi-secondary-font">Subscribers</h3>');

window.lastEdited = {
    position: 'bottom',
    size: false,
    comment: false,
    time: true
};

window.railWAM = {
    logPage: 'Project:WAM Log'
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