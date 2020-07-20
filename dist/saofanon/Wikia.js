AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];

importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

nullEditDelay = 1000;
importScriptPage('MassNullEdit/code.js', 'dev');

 tabberOptions = {
   onLoad: function() {
     if (window.location.hash) {
       var hash = (window.location.hash).replace('#', '').replace(/_/g, ' ');
       var currentTabber = this;
       $(".tabbernav li a", this.div).each(function(i) { 
         if ($(this).attr("title") === hash ) currentTabber.tabShow(i);
       });
       delete currentTabber;
     }
   }
 };

// Add EditCount tab to user namespace
importScript('MediaWiki:Wikia.js/editCount.js');
// END Add EditCount tab to user namespace
 
// Add EditCount tab to user namespace
importScript('MediaWiki:Wikia.js/Sandbox.js');
// END Add EditCount tab to user namespace