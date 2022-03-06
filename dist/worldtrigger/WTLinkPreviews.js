window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = "https://static.wikia.nocookie.net/worldtrigger/images/3/3b/Anime_Logo.png";
window.pPreview.noimage = "https://static.wikia.nocookie.net/worldtrigger/images/3/3b/Anime_Logo.png";
window.pPreview.RegExp.noinclude = [".hide-from-preview", ".reference", ".references", ".caption", "h2", ".toc", "sup", "rt", ".wikia-slideshow-wrapper", ".nihongo", ".ruby", "small", ".wikia-slideshow" ];
importArticles({type: 'script',articles:['u:dev:MediaWiki:LinkPreview/code.js']});