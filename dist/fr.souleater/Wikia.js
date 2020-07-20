//Change Wordmark for Soul Eater NOT! pages
$(document).ready(function(){
    var config = mw.config.get([
        'wgCategories',
        'wgNamespaceNumber'
    ]);
    if(config.wgNamespaceNumber === 0) {
                var i = 0;
                var l = config.wgCategories.length;
                var found = false;
                while(i < l && !found) {
                    found = true;
                    if (config.wgCategories[i] === 'NOT!') {
                        $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/souleater/images/9/9d/Second_logo.png/revision/latest?cb=20150126165821&path-prefix=fr');
                    } else {
                        found = false;
                    }
                    i++;
                }
    }
});