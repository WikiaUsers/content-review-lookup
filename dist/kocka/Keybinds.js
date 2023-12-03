(function() {
    if (mw.config.get('wgNamespaceNumber') === -1) {
        return;
    }
    function mousetrap(m) {
        var page = mw.config.get('wgPageName');
        m.bind('m', function() {
            window.location.href = mw.util.getUrl('Special:MovePage/' + page);
        });
        m.bind('w', function() {
            window.location.href = mw.util.getUrl('Special:WhatLinksHere/' + page);
        });
        m.bind('h', function() {
            window.location.href = mw.util.getUrl(page, {
                action: 'history'
            });
        });
        m.bind('p', function() {
            window.location.href = mw.util.getUrl(page, {
                action: 'protect'
            });
        });
        m.bind('t', function() {
            $('#ca-talk').click();
        });
        m.bind('n', function() {
            $('#ca-null-edit').click();
        });
    }
	var moduleName = mw.loader.getModuleNames().find(function(name) {
        return name.indexOf('GlobalShortcuts-') === 0;
    });
    if (moduleName) {
    	mw.loader.using(moduleName).then(function() {
    		mousetrap(window.Mousetrap);
    	});
    }
    mw.hook('ve.activationComplete').add(function() {
        for (var i = 0; i < 9; ++i) {
            delete ve.init.target.surface.triggerListener.commandsByTrigger['ctrl+' + i];
        }
    });
})();