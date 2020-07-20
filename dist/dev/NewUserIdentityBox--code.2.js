(function(mw, $, factory){
    var hasMasthead = !($('#UserProfileMasthead').length === 0);
    if (!hasMasthead) return;
    else {
        if (typeof window.UserIdentityBox !== 'undefined') return;
        factory(mw, $);
    }
}(this.mediaWiki, this.jQuery, function(mw, $){
    var identityBox = {}, slice = [].slice, hasOwn = ({}).hasOwnProperty;
    
    identityBox.exists = function(property, callback, args){
        var exists = hasOwn.call(this, property);
        if (typeof callback === 'function' && exists){
            callback.apply(this, (typeof args === 'object' && args instanceof Array) ? args : []);
        } else {
            return exists;
        }
    };

    identityBox.importResources = function(){
        var uibResources = Object.keys(typeof window.UIBResources == 'object' ? window.UIBResources : {}),
            scripts = [], styles = [],
            resources = $.merge([
                'u:dev:MediaWiki:WDSIcons/code.js',
                'u:dev:MediaWiki:ModernProfile/Masthead.css',
                'u:dev:MediaWiki:ModernProfile/Wall.css'
            ], uibResources);
        $.each(resources, function(index, resource){
            if (resource.endsWith('.css')){
                styles[styles.length] = resource;
            } else if (resource.endsWith('.js')){
                scripts[scripts.length] = resource;
            }
        });
        importArticles(
            { type: 'style', articles: styles },
            { type: 'script', articles: scripts }
        );
    };
    
    identityBox.createEditButton = function(){
        var actions = mw.config.get('wgWikiaPageActions'),
            buttonGroup = $('<div />', {
                'class': 'page-header__contribution-buttons',
                html: $('<div />', {
                    'class': 'wds-button-group'
                })
            }),
            dropdown = $('<div />', {
                'class': 'wds-dropdown',
                html: '<div class="wds-button wds-is-secondary wds-is-squished wds-dropdown__toggle">\
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny">\
                    <path d="M6 9l4-5H2" fill-rule="evenodd"></path>\
                </svg>\
                </div>'
            }),
            allowedActions = ['Edit', 'History', 'Move', 'Protect', 'Delete'];
        actions.filter(function(action){
            var allowed = allowedActions.map(function(a){ return 'page:' + a });
            return allowed.indexOf(action.id) > -1;
        }).forEach(function(action){
            var currAction = null, button = null, actionName = action.id.replace('page:', '').toLowerCase();
            if (action.id === 'page:Edit'){
                currAction = action;
                if (currAction){
                    button = $('<a />', {
                        'href': currAction.href,
                        'class': 'wds-is-squished wds-is-secondary wds-button',
                        'id': 'ca-' + actionName,
                        'data-tracking': 'ca-' + actionName
                    });
                    $();
                }
            }
        });
    };
}));