var wgSkin = "wikia";
 
 
 
/*Случайный фон */
 
document.addEventListener("DOMContentLoaded", function(event){ 
    var imgs = [
        'https://vignette.wikia.nocookie.net/apb/images/c/cb/Bg1.jpg/revision/latest?cb=20160311112038&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/apb/images/a/a5/Bg2.jpg/revision/latest?cb=20160311112047&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/apb/images/f/ff/Bg3.jpg/revision/latest?cb=20160311112055&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/apb/images/3/32/Bg4.jpg/revision/latest?cb=20160316054013&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/apb/images/7/71/Bg5.jpg/revision/latest?cb=20160316054014&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/apb/images/7/71/Bg6.jpg/revision/latest?cb=20160316054014&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/apb/images/2/28/Bg7.jpg/revision/latest?cb=20160316054028&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/apb/images/c/c4/Bg8.jpg/revision/latest?cb=20160316054014&path-prefix=ru'
    ];
 
 /*
    $('body.skin-oasis').attr('style', 'background-image:url(' + imgs[Math.floor((imgs.length) * Math.random())] + ') !important');
});
 */
 document.getElementsByTagName("body")[0]
 .setAttribute("style", 'background-image:url(' 
 + imgs[Math.floor((imgs.length) * Math.random())] + ') !important');
 
});


/*Эффекты снег и часы*/
importArticle({
 type: "script",
 articles: [
  "MediaWiki:DisplayTimer.js",
  "MediaWiki:Snow.js"
],
});