//ChatBanLogModal by Sophiedp
//Shows the ban log in a modal popup instead of a new page.
//Use your browser's "open link in new tab" feature if you want to go to the page.
if (
    mw.config.get('wgCanonicalSpecialPageName') === 'Contributions' &&
    mw.loader.getState('ext.Chat2') &&
    !window.ChatBanLogModalLoaded
) {
    window.ChatBanLogModalLoaded = true;
    //Hide the "change ban" link(s) since they don't seem to work inside the modal
    mw.util.addCSS('.modalWrapper .mw-logevent-actionlink { display: none; }');
    var $selector = $('.chat-ban-log, .mw-warning-with-logexcerpt > a[href$="&type=chatban"]');
    $selector.click(function (e) {
        e.preventDefault();
        $.get($selector.attr('href'), function (data) {
            $.showModal(
                $(data).find('#mw-content-text p:first-child').html(),
                $(data).find('#mw-content-text').find('noscript, form, p:first-child').remove().end().html()
            );
        });
    });
}