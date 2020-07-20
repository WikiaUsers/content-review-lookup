/**
 * @Name            BlankUndo
 * @Version         v1.0
 * @Protect         <nowiki>
 * @Description     AjaxUndo without the undo summary.
 */
;(function ($, mw) {
    'use strict';
    if (window.BlankUndoLoaded) {
        return;
    }
    window.BlankUndoLoaded = true;
 
    var api;
 
    function undoEdit() {
        var $this = $(this),
            url = $this.data().url,
            page = $this.data().page,
            undoId = /&undo=([^&]*)/.exec(url)[1];
 
        $this.html(
            $('<img>')
                .attr({
                    src: 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
                    alt: 'undoing',
                    border: '0'
                })
                .css('vertical-align', 'baseline')
        );
        api.post({
            action: 'edit',
            title: page,
            undo: undoId,
            bot: '1',
            summary: '',
            token: mw.user.tokens.get('editToken')
        }).done(function (data) {
            if (data.edit && data.edit.result === 'Success') {
                $this.text('(undone)');
            } else {
                $this.text('(error)');
 
                alert(data.error && data.error.code === 'undofailure' ?
                    data.error.info :
                    'Unknown Error'
                );
            }
        });
    }
 
    function createUndoLink(url) {
        var $link = $('<a>')
                .attr({
                    href: '#b-udno', // For integration
                    'data-url': url,
                    'data-page': decodeURIComponent(new mw.Uri(url).path.substring(6))
                })
                .text('b-u')
                .click(undoEdit);
 
        return $link;
    }
 
    function init() {
        api = new mw.Api();
        if (wgAction === 'history' && $('.mw-history-undo > a').length) {
            $('.mw-history-undo > a').each(function () {
                var $this = $(this),
                    url = $(this).attr( 'href' ),
                    $link = createUndoLink( url );
 
                $this.parent().after(' | ', $link);
            });
        }
    }
 
    mw.loader.using('mediawiki.api').then(init);
 
}(jQuery, mediaWiki));