/* Any JavaScript here will be loaded for all users on every page load. */

/* Plays audio and shows text if link is clicked */
$(document).ready(function() {
    var audioCache = {};
    var pendingRequests = {};
    function fetchAudioUrl(sound, callback) {
        if (audioCache[sound]) {
            if (callback) callback(audioCache[sound]);
            return;
        }
        if (pendingRequests[sound]) {
            if (callback) pendingRequests[sound].then(callback);
            return;
        }
        
        pendingRequests[sound] = $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                action: 'query',
                titles: 'File:' + sound,
                prop: 'imageinfo',
                iiprop: 'url',
                format: 'json'
            },
            dataType: 'json'
        }).then(function(data) {
            try {
                var pages = data.query.pages;
                var pageId = Object.keys(pages)[0];
                if (pageId !== "-1" && pages[pageId].imageinfo) {
                    var url = pages[pageId].imageinfo[0].url;
                    audioCache[sound] = url;
                    return url;
                }
            } catch(e) {}
            return null;
        });
        if (callback) {
            pendingRequests[sound].then(callback);
        }
        pendingRequests[sound].always(function() {
            delete pendingRequests[sound];
        });
    }
    $('.AudioLink, .TextLink').each(function() {
        var sound = $(this).attr('data-audio');
        if (sound) fetchAudioUrl(sound);
    });
    
    var isRedirecting = false;
    $(document).on('click', '.AudioLink, .TextLink', function(e) {
        var $clickedLink = $(this);
        var sound = $clickedLink.attr('data-audio');
        var dest = $clickedLink.attr('data-link');
        var exampleText = $clickedLink.attr('data-text');
        
        if (exampleText) {
            if (!sound || !dest) e.preventDefault();
            var textColor = $clickedLink.attr('data-color') || "#ffffff";
            var borderColor = $clickedLink.attr('data-border') || "transparent";
            var $container = $('#textStack');
            
            if (!$container.length) {
                $container = $('<div>', {id: 'textStack'}).css({
                    'position': 'fixed',
                    'z-index': '9999',
                    'top': '75px',
                    'left': '50%',
                    'transform': 'translateX(-50%)',
                    'display': 'flex',
                    'flex-direction': 'column',
                    'align-items': 'center',
                    'gap': '35px',
                    'pointer-events': 'none',
                    'max-width': '90vw'
                }).appendTo('body');
            }
            
            var $notification = $('<div>', {
                'class': 'textCustomizability',
                'text': exampleText
            }).css({
                'font-family': 'Montserrat, sans-serif',
                'color': textColor,
                'border': '1px solid ' + borderColor,
                'padding': '3px 8px',
                'white-space': 'nowrap',
            }).appendTo($container);
            setTimeout(function() {
                $notification.remove();
                if ($('#textStack').children().length === 0) {
                    $('#textStack').remove();
                }
            }, 4000);
        }
        
        if (!sound || !dest) return;
        e.preventDefault();
        if (isRedirecting) return;
        
        var targetUrl = mw.util.getUrl(dest);
        var safety;
        
        function doRedirect() {
            clearTimeout(safety);
            window.location.href = targetUrl;
        }
        function handleRedirectFail() {
            clearTimeout(safety);
            isRedirecting = false;
            doRedirect();
        }
        function playAudio(url) {
            if (!url) return handleRedirectFail();
            var track = new Audio(url);
            safety = setTimeout(handleRedirectFail, 2500);
            track.play().then(function() {
                track.onended = doRedirect;
            }).catch(handleRedirectFail);
        }
        isRedirecting = true;
        fetchAudioUrl(sound, playAudio);
    });
});