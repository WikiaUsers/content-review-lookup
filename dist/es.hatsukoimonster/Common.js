/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js'
        // ...
    ]
});
/* JS tomado de es.steven-universe.wikia.com. */
$(function () {
    $('.audio').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            options = esc('' + $this.data('options')),
            src = esc('' + $this.data('src')),
            type = esc('' + $this.data('type'));
        $this.html('<audio ' + options + '><source src="' + src + '" type="' + type + '"></audio>');
    });
});
$(function () {
    $('.video').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            options = esc('' + $this.data('options')),
            src = esc('' + $this.data('src')),
            type = esc('' + $this.data('type'));
        $this.html('<video width="' + width + '" height="' + height + '" ' + options + '><source src="' + src + '" type="'+ type + '"</video>');
    });
});
$('.norc').bind('contextmenu', function(e) {
    return false;
});