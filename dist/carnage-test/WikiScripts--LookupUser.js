;(function(mw, $){
    // MediaWiki variables
    var _mw = {
        groups: mw.config.get('wgUserGroups', wgUserGroups),
        self: mw.config.get('wgUserName', wgUserName),
        page: mw.config.get('wgPageName', wgPageName),
        server: mw.config.get('wgServer', wgServer)
    };
    // Templates
    if (_mw.page == 'Special:BlankPage'){
        var _location = window.location.href,
            results = /[?&]blankspecial=([^?&]*)/.exec(_location),
            name = (results !== null) ? results[1] || 0 : null;
        name = decodeURIComponent(name);
        if (name == 'lookupuser'){
            $(document).ready(function createUI(){
                $('.mw-content-text').html(function(){
                    var head = {
                            avatar: '<img class="avatar" src="(avatar)" />',
                            name: '<h2 class="user-name name">(user)</h2>',
                            tags: '<span class="tag">(group)</span>',
                            edits: '<div class="_tally"><strong class="edits">(edits)</strong> <var class="plural">(plural_edits)</var></div>'
                        }, body = {
                            'Bio': ''
                        }
                    return [$input, $head, $body];
                });
            });
        } else {
            
        }
    } else {
        
    }
})(this.mediaWiki, this.jQuery);