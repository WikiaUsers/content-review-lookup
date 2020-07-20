/* 此处的JavaScript将加载于所有用户每一个页面。 */
importArticles({
	type: "script",
	articles: [
	"MedaiWiki:Common.js/copyright.js"
        "MediaWiki:Common.js/UserGroupMessages.js",
        "MediaWiki:Common.js/translate.js",
        "MediaWiki:Common.js/defaultsort.js",  
        "Mediawiki:Common.js/interfaceHacks.js",
	'w:dev:ReferencePopups/code.js',
	"w:dev:CategoryRenameAuto-update/code.js"

	]
});

/* Baidu */
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F380f352265c672ca5580861f89c3d39e' type='text/javascript'%3E%3C/script%3E"));
/* end of baidu */

try{
var wgArticleId=mw.config.get('wgArticleId');
document.getElementById("bdlikebutton").setAttribute('data','{\'url\':\'http://zh.asoiaf.wikia.com/index.php?curid='+wgArticleId+'\',\'wbuid\':2628248563}');
document.getElementById("bdlike_shell").src="http://bdimg.share.baidu.com/static/js/like_shell.js?t=" + new Date().getHours();
}catch(err){}