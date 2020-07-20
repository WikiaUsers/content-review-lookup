/* Any JavaScript here will be loaded for all users on every page load. */
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity",
    "Special:Log/newusers"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Auto-refreshes the page.';

$(function() {
    $('.youtubeplayer').each(function() {
        var $this = $(this),
            data = $this.data(),
            uri = new mw.Uri('http://youtube.com/embed/'),
            id = (data.id || '').trim(),
            loop = ('' + data.loop).trim();
        if (typeof id !== 'string' || id.trim() === '') {
            return;
        }
        uri.path += id;
        uri.query = {
            feature: 'player_embedded',
            autoplay: window.YoutubePlayerDisableAutoplay ? '0' : ('' + data.autoplay).trim(),
            loop: loop,
            playlist: (loop === '1') ? id : '',
            start: ('' + data.start).trim(),
            list: (data.list || '').trim(),
            showinfo: '0',
            fs: '0'
        };
        $this.html(mw.html.element('iframe', {
            width: ('' + data.width).trim(),
            height: ('' + data.height).trim(),
            src: uri.toString(),
            frameborder: '0',
        }));
    });
});