/**
 * Emberfall.js
 * @Description:    SnowStorm configuration appearing like falling embers
 * @Author:         Ursuul
 * @See also:       https://dev.wikia.com/wiki/SnowStorm
 */
window.className         = 'emberfall';
window.snowColor         = '#F05E1B';
window.followMouse       = false;
window.snowStick         = false;
window.freezeOnBlur      = false;
window.useTwinkleEffect  = true;
window.animationInterval = 60;
window.flakesMax         = 60;
window.flakesMaxActive   = 40;
window.flakeWidth        = 6;
window.flakeHeight       = 6;
window.vMaxX             = 1;
window.vMaxY             = 1;
window.flakeLeftOffset   = 0;

importArticle({
    type: 'script',
    article: 'u:dev:SnowStorm.js'
});