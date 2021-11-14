window.discussionsModuleEmbed = true;
window.discussionsModuleConfig = {
	'size' : 'number 3',
	'mostrecent' : 'true',
}

    mw.hook('discussionsModule.added').add(function($module) {
        // Module addition
        if ($('.insights-module').exists()) {
            $module.insertBefore('.insights-module');
        } else {
            $module.appendTo('#WikiaRail');
        }
    });