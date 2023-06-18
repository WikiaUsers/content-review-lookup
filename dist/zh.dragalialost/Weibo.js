/**
 * Name:        Weibo
 * Description: Allows intergration with Weibo
 */
 
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.weibo').each(function() {
        var $this = $(this),
            verifier = $this.attr('data-verifier'),
            uid = $this.attr('data-uid');
            css = {
                width: '100%',
                height: '550px',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://widget.weibo.com/weiboshow/index.php?width=0&height=550&language=&skin=5&noborder=1&isWeibo=1&isFans=1&verifier=' + verifier + '&dpc=1&uid=' + uid,
                css: css
            })
        );
    });
});