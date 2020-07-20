(function(factory, window, document){
    if (window.Quake) return;
    const $ = window.jQuery;
    const load = new Promise(function(resolve, reject){
        window.addEventListener('load', function(event){
            resolve(window, document, $);
        });
    });
    const ready = new Promise(function(resolve, reject){
        let t = setTimeout(function(){
            clearTimeout(t);
            resolve(window, document, $);
        }, 1500);
    });
    Promise.race([ready, load]).then(factory);
}(function(window, document, $){
    
}, window, document));