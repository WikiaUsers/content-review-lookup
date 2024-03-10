/* Any JavaScript here will be loaded for all users on every page load. */

/* Lock Old Comments Configuration */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 60;
window.lockOldComments.addNoteAbove = true;

/* Adds a side tool for instant access to your sandbox */
importArticles({
    type: 'script',
    articles: [
    	'u:dev:MediaWiki:AddSideTool.js',
    	    ]
});

mw.hook('dev.addSideTool').add(function (addSideTool) {
  const sideTool = addSideTool('SB'),
    $button = sideTool.$button,
    $tooltip = sideTool.$tooltip;

  $tooltip.text("Your Sandbox");
  $button.on('click', function() 
  {

  	USER = mw.config.get('wgUserName');

	window.open('/wiki/User:' + USER + '/Sandbox');
  	
  });
});