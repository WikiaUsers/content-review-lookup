var SocialMediaButtons = { 
	position: "top",
	colorScheme: "gray"
};
importScriptPage('SocialIcons/code.js','dev');

/* Featured video message */
//By User:Fngplg
$(function(){
    if ($('.featured-video__wrapper').length === 0) return;
    var banner = new BannerNotification();
    banner.setContent('The video you see at the top of this article is provided by the host, not by the editors of this site. Its content may not accurately represent the article.');
    banner.show();
});

window.AddRailModule = [{
    page: 'Template:DiscordRailModule',
    appendAfter: '.DiscordIntegratorModule .rail-module',
}];
mw.hook('wikipage.content').add(function ($elem) {
    $elem.filter('section.railModule.rail-module')
         .find('span.wds-button>a:only-child')
         .attr('class', 'wds-button')
         .unwrap();
});