function modifySassParams (params) {
    var p = [], sass;
    params = $.extend(window.sassParams, params);
    for (var i in window.sassParams) {
        if (window.sassParams.hasOwnProperty(i)) {
            p.push(i + '=' + encodeURIComponent(params[i]));
        }
    }
    sass = encodeURIComponent(p.join('&'));
    //$('html').css('display', 'none').delay(50).fadeIn(50);
    $('link[rel="stylesheet"]')
    .each(function () {
        var $this = $(this),
            m, href = $this.attr('href');
        if (!/\.scss$/.test(href)) return;
        $this.attr('href',
            href.replace(/\/sass\/[^\/]+/, '/sass/' + sass)
        );
    });
}

$(function () {
    modifySassParams({ 'color-links': 'blue' });
});