/* Discussion activity positioning */
mw.hook('discussionsModule.added').add(function($module) {
        // Module addition
        if ($('.insights-module').exists()) {
            $module.insertBefore('.insights-module');
        } else {
            $module.appendTo('#WikiaRail');
        }
    });