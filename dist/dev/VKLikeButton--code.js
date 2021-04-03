// vk.com like widget. doc: https://vk.com/dev/widget_like
// <!-- Put this div tag to the place, where the Like block will be -->
// <div id="vk_like"></div>
// data-type: mini/full/button/vertical
(function() {
    var urlVars = new URLSearchParams(location.search);
    var debug = urlVars.get('debug') || urlVars.get('debug1') || window.vklikedebug;
    var log = function () { if (debug) return console.log.apply(this, arguments) };
    
    function addButton ($content) {
        var script,
            scriptId = 'vk_like_script',
            head = document.getElementsByTagName('head')[0],
            $target = $content.find('div[id^="vk_like"]'),
            apiId = window.vklikeapiid,
            types = {
                mini: 'mini',
                full: 'full',
                button: 'button',
                vertical: 'vertical'
            };
        log('vklike.ab', apiId, $target);
        if (!$target.length || !apiId) return;
        if (!document.getElementById(scriptId)) {
            log('vklike.ab', scriptId);
            // openapi loader
            script = document.createElement('script');
            script.id = scriptId;
            script.type = 'text/javascript';
            script.src = '//vk.com/js/api/openapi.js?150';
            head.appendChild(script);
        }
        // let vk to load
        var timer = setInterval(function() {
            if (!window.VK || !window.VK.init) return;
            clearInterval(timer);
            log('vklike.ab init');
            window.VK.init({apiId: apiId, onlyWidgets: true});
            // in case of async init
            setTimeout(function() {
                $target.each(function(index, el) {
                    var type = el.dataset && el.dataset.type ? types[el.dataset.type] || 'mini' : 'mini';
                    log('vklike.ab like', el.id, type);
                    window.VK.Widgets.Like(el.id, {type: type});
                });
            }, 100);
        }, 100);
    }// addbutton
    log('vklike set hook');
    mw.hook('wikipage.content').add(addButton);
})();