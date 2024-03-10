/* Any JavaScript here will be loaded for all users on every page load. */

/* 25 Jan 2021, Usgu: Adding JavaScript to embed videos from the Chinese video sharing platform Bilibili.com - we need his for the Chinese translation of the Squad Wiki, as YouTube videos are blocked in China. Source: https://dev.fandom.com/wiki/BilibiliVideo */
window.importArticle = function(obj) {
    if (obj.type != 'script') return;
    if (obj.article.slice(0,6) != 'u:dev:') return;
    mw.loader.load('https://dev.fandom.com/wiki/'+obj.article.slice(6)+'?action=raw&ctype=text/javascript');
}
mw.loader.load('https://dev.fandom.com/wiki/MediaWiki:BilibiliVideo.js?action=raw&ctype=text/javascript');