(function () {
    function heimu_toggle() {
        if (!$('.heimu') [0] || $('#heimu_toggle') [0]) return;
        $('<div/>', {
            id: 'heimu_toggle',
            text: '透视黑幕',
            css: {
                'user-select': 'none'
            }
        }).appendTo(document.body).on('click', function () {
            if ($('body.heimu_toggle_on') [0]) $(this).text('透视黑幕');
             else $(this).text('隐藏黑幕');
            $(document.body).toggleClass('heimu_toggle_on');
        });
        if ($('.backToTop') [0]) $(window).on('scroll', function () {
            $(document).scrollTop() > 0 ? $('#heimu_toggle').css('bottom', '193px')  : $('#heimu_toggle').css('bottom', '100px');
        }).scroll();
        if (mw.config.get('AnnToolsHeimuToggleDefaultOn')) $('#heimu_toggle').click();
         else mw.config.set('AnnToolsHeimuToggleDefaultOn', true);
    }
    setInterval(heimu_toggle, 3000);
}) ();