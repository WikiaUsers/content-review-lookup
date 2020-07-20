// BackToTopButton
window.BackToTopModern = true;
window.BackToTopArrow = true;

//LinkPreview https://dev.fandom.com/wiki/LinkPreview and https://community.fandom.com/wiki/Thread:1784450

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = "https://vignette.wikia.nocookie.net/teppen/images/8/88/LinkPreview.png/revision/latest?cb=20200116172422";
window.pPreview.tlen = 500;