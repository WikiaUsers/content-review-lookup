/* MessageBlock */
window.MessageBlock = {
	title: 'Blocked',
	message: 'You have been blocked for $2 because you have been $1. If you wish to appeal this block, please do so under this message.'
};

/* DiscordBanner */
window.DiscordBannerSettings = {
    bannerStyle: '1',
    inviteLink: 'dCWr8AWzYS',
    prependToRail: false
};

/* First time page visit */
$(document).ready(function() {
    if (localStorage.getItem('wiki_migration_complete') !== 'true') {
        
        $('body').append('<style>body.wiki-frozen #mw-content-text { filter: blur(10px); pointer-events: none; user-select: none; }</style>');
        $('body').addClass('wiki-frozen');

        var notice = '<div id="move-notice-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:black;z-index:1000000;display:flex;flex-direction:column;justify-content:center;align-items:center;color:#0f0;text-align:center;font-family:sans-serif;padding:20px;">' +
                     '<h1 style="font-size:48px;margin-bottom:10px;font-weight:bold;">WIKI HAS MOVED</h1>' +
                     '<p style="color:#fff;font-size:20px;margin-bottom:30px;max-width:600px;">This version is no longer updated and is deemed unofficial. It is recommended that you visit the new wiki, as this one contains outdated, missing and potentially vandalized information.</p>' +
                     '<a href="https://blackout.miraheze.org/wiki/Blackout_Wiki" target="_blank" style="background:#0f0;color:#000;padding:20px 45px;text-decoration:none;font-weight:bold;font-size:24px;border-radius:5px;box-shadow:0 0 15px rgba(0,255,0,0.5);">GO TO NEW WIKI</a>' +
                     '<button id="stay-here-btn" style="background:transparent;color:#0f0;border:1px solid #0f0;padding:10px 20px;cursor:pointer;margin-top:40px;border-radius:5px;font-size:14px;opacity:0.6;">I want to stay on this outdated wiki</button>' +
                     '</div>';
        
        $('body').append(notice);

        $('#stay-here-btn').click(function() {
            localStorage.setItem('wiki_migration_complete', 'true');
            $('#move-notice-overlay').fadeOut(500, function() { 
                $(this).remove();
                $('body').removeClass('wiki-frozen');
            });
        });
    }
});