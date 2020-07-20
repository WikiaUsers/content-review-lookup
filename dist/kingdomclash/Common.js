/* Any JavaScript here will be loaded for all users on every page load. */
/*
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
 
    articles =
       ['MediaWiki:Common.js/SubNav.js',
        'MediaWiki:Common.js/jQuery.js',
        'w:c:dev:UserTags/code.js'];
    // Use Wikia's importArticles() function to load JavaScript files
    window.importArticles({
        type: 'script',
        articles: articles
    });
    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the following JavaScript files:', articles);
}(jQuery, mediaWiki, window.localStorage));*/
 
function sillyFounder(){
var d=document.getElementsByClassName('tag')[0];
var f=document.getElementsByClassName('masthead-info')[0].getElementsByTagName('hgroup')[0];
var e=f.getElementsByTagName('h1')[0].innerHTML;
var sp=document.createElement('span');
sp.setAttribute('class','tag');
if(d.innerHTML=='Founder'){
d.innerHTML='A SILLY MAN';
sp.innerHTML='Director';
f.appendChild(sp);
}else if(e=='Lugia101101'){
d.innerHTML='Director';
sp.innerHTML='Pokemon';
f.appendChild(sp);
}else if(e=='Kk9199'){
d.innerHTML='Bureacrat';
}
}
addOnloadHook(sillyFounder);