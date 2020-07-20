// shows custom notifications via bannernotification interface
// basically "non-script" shortcut for the bannernotification


/* Temporarily  remarking out per talk page


!function(cfg) {
    var currentRevId = 0,
        bannerTypes = /^<p>(notify|confirm|error|warn)\n/i,
        mwc = mw.config.get(['wgCityId', 'wgUserName']),
        storageId = 'dev-banner',
        storedData = $.storage.get(storageId) || {},
        cityData = storedData[mwc.wgCityId] || {hideto: 0, revid: 0};

    if (cfg.loaded || !mwc.wgUserName) return;

    cfg.loaded = !0;
    
    function onClose() {
        // month: 2592000000
        cityData.hideto = Date.now() + 3 * 2592000000;
        cityData.revid = currentRevId;
        storedData[mwc.wgCityId] = cityData;
        try {
            $.storage.set(storageId, storedData);
        } catch (ex) {}
    }// onclose

    function showBanner(content, type, timeout) {
        require(['BannerNotification'], function(notification) {
            new notification(content || '', type || 'notify', timeout || 0).onClose(onClose).show();
        });
    }// showBanner
    
    function getData() {
        var promise = $.Deferred();
        mw.loader.using('mediawiki.api').done(function() {
            new mw.Api().get({
                action: 'parse',
                page: 'MediaWiki:Custom-Banner',
                format: 'json',
                disablepp: 1,
                // next part will be available later
                noimages: 1,
                disabletoc: 1,
                disablelimitreport: 1,
            }).then(function(data) {
                if (data && !data.error) {
                    currentRevId = (data.parse || {}).revid;
                    data = (data.parse && data.parse.text) ? data.parse.text['*'] || '' : '';
                    promise.resolve(data.trim());
                } else {
                    promise.reject(data);
                }
            });
        });
        return promise.promise();
    }// getData

    getData()
    .done(function(data) {
        // defend against tabbers and galleries
        data = data.replace(/<script>[\s\S]*?<\/script>/igm, '').replace(/<!\-\-[\s\S]*?\-\->/igm, '');
        var type = bannerTypes.exec(data);
        type = type ? type[1].toLowerCase() : null;
        if (type) {
            // remove the type
            data = data.replace(type + '\n', '');
        }
        // 1k is enough to display 3-4 rows of text
        data = data.substr(0, 1000).trim();
        if (data.length && (cityData.hideto < Date.now() || currentRevId !== cityData.revid)) showBanner(data, type);
    })
    .fail(function(data) {
        console.log('banner', 'getdata failed', {data: data});
    });
}((window.dev = window.dev || {}).banner = window.dev.banner || {});

*/