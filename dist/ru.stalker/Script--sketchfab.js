// Генерация iframe-элемента для просмотра моделей с sketchfab.com
// Generation of iframe-elements for viewing models from sketchfab.com
(function generateSketchfabEmbed() {
    var wrappers = document.querySelectorAll('.sketchfab-embed-wrapper');
    
    for (var i = 0; i < wrappers.length; i++) {
        var wrapper = wrappers[i];
        var replacer = wrapper.firstElementChild;
        
        if (!replacer || !replacer.dataset || !replacer.dataset.id) {
            continue;
        }

        var baseUrl = 'https://sketchfab.com/models/' + replacer.dataset.id + '/embed';
        var params = [];
        
        if (replacer.dataset.autospin === '1') {
            params.push('autospin=1');
        }
        if (replacer.dataset.autostart === '1') {
            params.push('autostart=1');
        }
        if (replacer.dataset.camera === '0') {
            params.push('camera=0');
        }
        
        var src = params.length > 0 ? baseUrl + '?' + params.join('&') : baseUrl;
        
        var iframe = document.createElement('iframe');
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        iframe.setAttribute('mozallowfullscreen', 'true');
        iframe.setAttribute('webkitallowfullscreen', 'true');
        iframe.setAttribute('allow', 'autoplay; fullscreen; xr-spatial-tracking');
        iframe.setAttribute('xr-spatial-tracking', '');
        iframe.setAttribute('execution-while-out-of-viewport', '');
        iframe.setAttribute('execution-while-not-rendered', '');
        iframe.setAttribute('web-share', '');
        iframe.src = src;
        
        if (replacer.dataset.width) {
            iframe.width = replacer.dataset.width;
        }
        if (replacer.dataset.height) {
            iframe.height = replacer.dataset.height;
        }
        
        wrapper.innerHTML = '';
        wrapper.appendChild(iframe);
    }
})();