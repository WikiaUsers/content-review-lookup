// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };
/*
    mw.hook('discussionsModule.added').add(function($module) {
        // Module addition
        if ($('.insights-module').exists()) {
            $module.insertBefore('.insights-module');
        } else {
            $module.appendTo('#WikiaRail');
        }
    });*/

//BackToTop
window.BackToTopModern = true;