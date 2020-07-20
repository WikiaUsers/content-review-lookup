$(function() {
    function toggleAnim() {
        if (state) {
            state = false;
            $('#toggle-favicon').addClass('toggled');
            clearInterval(updFav);
            $('link[rel*="shortcut"]').attr('href', 'https://vignette.wikia.nocookie.net/koffee/images/6/64/Favicon.ico/revision/latest?cb=20190817150523&path-prefix=ru')
        } else {
            state = true;
            $('#toggle-favicon').removeClass('toggled');
            initAnim()
        }
    }
    
    function initAnim() {
        frame = 0;
        updFav = setInterval(function() {
		    $('link[rel*="shortcut"]').attr('href', usingImgs[frame])
		    frame++;
		    if (frame >= usingImgs.length) frame = 0;
        }, 500)
    }
    
    const usingImgs = [
        'https://vignette.wikia.nocookie.net/koffee/images/7/71/FavIc_anim_1.png/revision/latest?cb=20200126151649&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/koffee/images/3/37/FavIc_anim_2.png/revision/latest?cb=20200126151650&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/koffee/images/b/bb/FavIc_anim_3.png/revision/latest?cb=20200126151650&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/koffee/images/c/ca/FavIc_anim_4.png/revision/latest?cb=20200126151650&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/koffee/images/3/3b/FavIc_anim_5.png/revision/latest?cb=20200126151651&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/koffee/images/b/ba/FavIc_anim_6.png/revision/latest?cb=20200126151651&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/koffee/images/a/a2/FavIc_anim_7.png/revision/latest?cb=20200126151651&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/koffee/images/5/52/FavIc_anim_8.png/revision/latest?cb=20200126151651&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/koffee/images/a/a9/FavIc_anim_9.png/revision/latest?cb=20200126151652&path-prefix=ru'
    ];
    var frame = 0,
        c = mw.config.get(['wgPageName', 'wgNamespaceNumber']),
        state = true;
    if (c.wgPageName == 'Фавикон' && c.wgNamespaceNumber == 0) {
        $('#toggle-favicon').click(toggleAnim);
        initAnim();
    }
})