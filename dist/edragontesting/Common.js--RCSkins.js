/*Royal Champion*/
mw.hook('wikipage.content').add(function($content) {
    $content.find('.RoyalChampion:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                frameborder: 0,
                height: '200px',
                src: 'https://www.vectary.com/viewer/v1/?model=495048db-9b02-42aa-9ac6-02c2fbeb3afd&env=studio3&turntable=3',
                width: '300px'
            })
        ).addClass('loaded');
    });
});

/*Winter Champion*/
mw.hook('wikipage.content').add(function($content) {
    $content.find('.WinterChampion:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                frameborder: 0,
                height: '200px',
                src: 'https://www.vectary.com/viewer/v1/?model=bb636970-1059-45fc-9b24-e8a14a5835e5&env=studio3&turntable=3',
                width: '300px'
            })
        ).addClass('loaded');
    });
});

/*Testing skin*/
mw.hook('wikipage.content').add(function($content) {
    $content.find('.RoyalChampion:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                frameborder: 0,
                height: '200px',
                src: 'https://www.vectary.com/viewer/v1/?model=495048db-9b02-42aa-9ac6-02c2fbeb3afd&env=studio3&turntable=3',
                width: '300px'
            })
        ).addClass('loaded');
    });
});