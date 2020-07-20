/* 欢迎复制以下代码，不过因为最初写代码时没有考虑重用的可能，因此代码可读性非常糟糕，且注释混乱 */

importArticles({
	type: "script",
	articles: [
        /* data source for rating widget*/
        "Help:评分/RatingBoard",  
        /*data source END */
        "Mediawiki:Common.js/stellar.js",
        "MediaWiki:Common.js/translate.js",
        /* sidebar */
        "MediaWiki:Common.js/defaultsort.js",  
        "Mediawiki:Common.js/interfaceHacks.js",
        "Mediawiki:Common.js/lastEdited.js",
        "u:dev:ReferencePopups/code.js",
        "u:dev:CategoryRenameAuto-update/code.js"
	]
});

/* Baidu */
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F380f352265c672ca5580861f89c3d39e' type='text/javascript'%3E%3C/script%3E"));
/* end of baidu */