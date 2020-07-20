////**Discussões**////

window.discussionsModuleEmbed = true;

    mw.hook('discussionsModule.added').add(function($module) {
        // Module addition
        if ($('.insights-module').exists()) {
            $module.insertBefore('.insights-module');
        } else {
            $module.appendTo('#WikiaRail');
        }
    });
    
    .discussions-rail-theme .embeddable-discussions-module .embeddable-discussions-heading:after {
	content: '<Acontecendo pela comunidade>';
}

window.discussionsModuleConfig = {
	'size' : '4',
	'mostrecent' : 'true',
	'catid' : [
		'first category id',
		'second category id',
		'etc'
	]
}