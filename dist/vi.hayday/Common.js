/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */

function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
return importScriptURI(url);
}

(function ($, mw, store) {
    "use strict";
    var articles;
    
    if (store && store.getItem('commonjs')) {
        console.log('You have chosen to disable site-wide JavaScript in MediaWiki:Common.js. Please remove \'commonjs\' from localStorage to re-enable site-wide JavaScript.');
        return;
    }

    window.UserTagsJS = {
	modules: {},
	tags: {}
    };
    UserTagsJS.modules.inactive = 30;
    UserTagsJS.modules.newuser = true;
    UserTagsJS.modules.autoconfirmed = true;

    UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
    UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat'],
        rollback: ['sysop', 'bureaucrat']
    };
 
    articles = ['MediaWiki:Common.js/SubNav.js', 'w:c:dev:UserTags/code.js'];
    // Use Wikia's importArticles() function to load JavaScript files
    window.importArticles({
        type: 'script',
        articles: articles
    });
    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the following JavaScript files:', articles);
}(jQuery, mediaWiki, window.localStorage));



/*remove comment*/
function removeComment(){
	var pages=["Friends/List_1","both","Friends/List_2","both","Friends/List_3","both","Friends/List_4","both","Friends/List_5","both","Friends/List_6","both","Friends/List_7","both"];
	var page=document.URL;
	var l=0;
	for(var d=0;d<page.length;d++){
		if(page.substr(d).indexOf("/")==0) l++;
		if(l==4){
			page=page.substr(d);
			break;
		}
	}
page=page.substr(1);
	l=-2;
	for(var e=0;e<page.length;e++){
		if(page.substr(e).indexOf("#")==0) l=e;
		else if(page.substr(e).indexOf("?")==0) l=e;
	}
	if(l!=-2) page=page.substr(0,l);
	for(var s=0;s<pages.length;s++){
		if(page.indexOf(pages[s])+pages[s].length==page.length){
			var i,h,o,p;
			var c=0;
			var d=pages[s+1];
			if(d.toLowerCase()=="discussion"){
				h=window.setInterval(function(){if(document.getElementById("RelatedForumDiscussion")) var disc=document.getElementById("RelatedForumDiscussion");if(disc){disc.parentNode.removeChild(disc);window.clearInterval(h);}c++;if(c==30) window.clearInterval(h);},1000);
			}else if(d.toLowerCase()=="comments"){
				i=window.setInterval(function(){if(document.getElementById("WikiaArticleComments")) var comments=document.getElementById("WikiaArticleComments");if(comments){comments.parentNode.removeChild(comments);window.clearInterval(i);}c++;if(c==30) window.clearInterval(i);},1000);
			}else{
				o=window.setInterval(function(){if(document.getElementById("WikiaArticleComments")) var comments=document.getElementById("WikiaArticleComments");if(comments){comments.parentNode.removeChild(comments);window.clearInterval(o);}c++;if(c==30) window.clearInterval(o);},1000);
				p=window.setInterval(function(){if(document.getElementById("RelatedForumDiscussion")) var disc=document.getElementById("RelatedForumDiscussion");if(disc){disc.parentNode.removeChild(disc);window.clearInterval(p);}c++;if(c==30) window.clearInterval(p);},1000);
			}
			break;
		}
		s++;
	}
}
addOnloadHook(removeComment);