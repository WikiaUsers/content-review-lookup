//https://dev.fandom.com/wiki/DiscussionsRailModule //
    mw.hook('discussionsModule.added').add(function($module) {
        // Module addition
        if ($('.insights-module').exists()) {
            $module.insertBefore('.insights-module');
        } else {
            $module.appendTo('#WikiaRail');
        }
    });
    
    window.discussionsModuleConfig = {
	'size' : '6',
	'mostrecent' : 'true',
	'catid' : [
		'2820686770864537143',
		'2820686770864537144',
	]