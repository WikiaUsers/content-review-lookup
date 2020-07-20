/*random background*/
document.addEventListener("DOMContentLoaded", function(event){ 
    var imgs = [
        'https://vignette.wikia.nocookie.net/brainout/images/a/a3/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxH5rd9eDAjcFyv45SRYAFMIcKL_PArgVSL403ulRUWEndVKv4gJeAAg07I1QAtbymeQEw0KHKJGQbud7lx9jbz6XxYO_UkG8H7sRw07jE99it3xq-uxRR_X2P4Q.jpg/revision/latest?cb=20180718092241&format=original&path-prefix=ru',
     'https://vignette.wikia.nocookie.net/brainout/images/5/55/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxH5rd9eDAjcFyv45SRYAFMIcKL_PArgVSL403ulRUWEndVKv4gJeAAg07JlEO4r-gfQI30fDLJWobv4TlwYXTx6-hY-ODwDpUvZck3r7Eo43w2xq-uxQW4jtBnA.jpg/revision/latest?cb=20180718092242&format=original&path-prefix=ru',
     'https://vignette.wikia.nocookie.net/brainout/images/1/19/Bg-intro.png/revision/latest?cb=20180718092243&format=original&path-prefix=ru',
     'https://vignette.wikia.nocookie.net/brainout/images/2/21/Forest1111.png/revision/latest?cb=20180718093454&format=original&path-prefix=ru',
     'https://vignette.wikia.nocookie.net/brainout/images/6/6d/Freeplay-parr-swamp-root-repeat.png/revision/latest?cb=20190215181557&path-prefix=ru',
    ];
 
 /*
    $('body.skin-oasis').attr('style', 'background-image:url(' + imgs[Math.floor((imgs.length) * Math.random())] + ') !important');
});
 */
 
 document.getElementsByTagName("body")[0]
 .setAttribute("style", 'background-image:url(' 
 + imgs[Math.floor((imgs.length) * Math.random())] + ') !important');

});