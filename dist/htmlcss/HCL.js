/**
 * This is a library created specifically
 * for the HTML & CSS Wiki. I advise you
 * to use the library with care.
 **/

window.HCL = window.HCL || {
    getURLVar: function(name){
        var result = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (result === null) return null;
        else return result[1] || 0;
    },
    getWordmark: function(){
        var image = '';
        function getWordmarkSrc(image_src){
            image = image_src;
            console.log(image_src);
        }
        
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: mw.util.wikiScript('api'),
            data: {
                action: 'query',
                prop: 'imageinfo',
                titles: 'File:Wiki-wordmark.png',
                iiprop: 'url',
                format: 'json'
            }
        }).done(function(data){
            var query = data.query,
                pages = query.pages[4064],
                info = pages.imageinfo,
                _image = info[0].url;
            getWordmarkSrc(_image);
        });
        return image;
    },
};