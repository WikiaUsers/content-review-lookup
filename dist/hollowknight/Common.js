/* Any JavaScript here will be loaded for all users on every page load. */
(function(){
const wgUserGroups = mw.config.get('wgUserGroups');

if(wgUserGroups.includes('rollback') ||
   wgUserGroups.includes('content-moderator') ||
   wgUserGroups.includes('sysop') ||
   wgUserGroups.includes('bureaucrat') ||
   wgUserGroups.includes('content-volunteer') ||
   wgUserGroups.includes('vstf') ||
   wgUserGroups.includes('helper') ||
   wgUserGroups.includes('staff')){
      importArticles({
            type: 'script',
            articles: [
            'MediaWiki:Group-sysop.js'
        	]
    	});
	}
}());

/* Allow direct link to tabber content (https://c.fandom.com/Thread:790781) */
// <tabber> extension req v2.0, 2017, User:fngplg.
(function ($){
    var nstarget = window.location.hash.replace('#', '');
    if (nstarget === '') return;
    // Convert wiki-utf 2 ansi
    nstarget = nstarget.replace(/\./g, '%');
    nstarget = decodeURIComponent(nstarget).replace(/_/g, ' ');
    $(function(){
        setTimeout(function() {
            var $nt2a = $('.tabberlive > .tabbernav > Li > a[title="' + nstarget + '"]');
            $nt2a.click();
        }, 100);
    });  
})(jQuery);