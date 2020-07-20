mw.hook('discussionsModule.added').add(function($module) {
    // Module addition
    if ($('.chat-module').exists()) {
        $module.insertBefore('.chat-module');
    } else {
        $module.appendTo('#WikiaRail');
    }
});