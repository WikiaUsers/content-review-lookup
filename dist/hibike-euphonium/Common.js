/* Any JavaScript here will be loaded for all users on every page load. */

window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: '4jCNCDz',
    prependToRail: true
};

// Link Preview preferences
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/borderlands/images/f/f5/%D0%97%D0%B0%D0%B3%D0%BB%D1%83%D1%88%D0%BA%D0%B0.png/revision/latest/scale-to-width-down/200';
window.pPreview.RegExp.noinclude = ['.mbox', 'blockquote'];
window.pPreview.scale = {r: '?', t: '/scale-to-height-down/200?'}; 
window.pPreview.RegExp.ilinks = [RegExp('.*(Special|MediaWiki|Template|User|File|Talk|Help|Forum|GeoJson|Blog|User_blog|Module|Message_Wall|Map)\:.*'), RegExp('.*(Gallery|talk).*')];