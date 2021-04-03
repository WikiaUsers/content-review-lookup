// <pre>
// adds "delete" buttons to special:unusedfiles and lightbox: [[Thread:23243]]
+function(settings) {
    if (settings.loaded) return;
    settings.loaded = !0;
    settings.msgDelete = '<ffd-delete>';
    settings.target = settings.target || '_blank';
    var cfg = mw.config.get(['wgCanonicalSpecialPageName', 'wgUserGroups', 'wgUserName', 'wgUserLanguage']);
    
    settings.init = function() {
        var $targets,
            $buttonDel = $('<a>', {
                target: settings.target,
                class: 'ffd-buttondel',
                style: 'margin-left:5px',
                text: settings.msgDelete,
            });
        
        if (['Unusedimages', 'UnusedVideos'].indexOf(cfg.wgCanonicalSpecialPageName) > -1 && ($targets = $('#mw-content-text .wikia-gallery-item, #mw-content-text .gallerybox')).length) {
            var $buttonX = $('<a>', {
                target: settings.target,
                class: 'ffd-buttonx',
                style: 'float:right;position:relative;top:0;color:red;font-weight:900;margin-right:5px;z-index:1;text-shadow:#000 0 0 1px,#000 0 0 1px',
                text: 'X',
                title: settings.msgDelete,
            });

            $('#mw-content-text').find('.ffd-buttonx').remove();
            $targets.each(function() {
                var $b,
                    $this = $(this),
                    url = $this.find('.image').attr('href');
                if (!url) return;
                $b = $buttonX.clone();
                $b.attr('href', url + '?action=delete');
                $this.prepend($b);
            });
        }// if unusedimages

        $(window).off('lightboxOpened.ffd');
        $(window).on('lightboxOpened.ffd', function () {
            if (settings._timeout) clearTimeout(settings._timeout);
            settings._timeout = setTimeout(function() {
                var $b, url,
                    $lb = $('#LightboxModal');
                if (!$lb.length) return;
                url = $lb.find('.LightboxHeader h1:first a:first').attr('href');
                if (!url) return;
                $lb.find('.ffd-buttondel').remove();
                $b = $buttonDel.clone();
                $b.attr('href', url + '?action=delete');
                $b.insertAfter($lb.find('.see-full-size-link:first'));
            }, 1000);// settimeout
        });// on lbopened
    };// init
    
    // main
    if (cfg.wgUserName && new RegExp('sysop|bureaucrat' + (settings.groups ? '|' + settings.groups : '')).test(cfg.wgUserGroups.join(','))) {
        mw.loader.using(['mediawiki.api']).done(function() {
            new mw.Api().get({
                action: 'query',
                meta: 'allmessages',
                ammessages: 'delete',
                amlang: cfg.wgUserLanguage,
            })
            .done(function(data) {
                if (!data || !data.query || data.error) return;
                settings.msgDelete = data.query.allmessages[0]['*'];
                settings.init();
            })
            .fail(function(data) {
                console.debug('ffd.get fail. data:', data);
                // load it anyway
                settings.init();
            });
        });
    }// if group
}((window.dev = window.dev || {}).fastFileDelete = window.dev.fastFileDelete || {});