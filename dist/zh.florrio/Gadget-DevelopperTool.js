(function () {
    var isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    var debugMode = mw.util.getParamValue('eruda') === '1';

    if (!isMobile && !debugMode) return; 

    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/eruda';
    document.body.appendChild(script);
    script.onload = function () {
        eruda.init();
    };
})();