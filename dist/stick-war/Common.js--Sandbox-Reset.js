/* Any JavaScript here will be loaded for all users on every page load. */
/** <nowiki>
* @desc: Allows you to reset sandbox by clicking the reset sandbox button on the docs
* @name: SandboxReset
* @version: 1.10
*/
mw.loader.using([ 'mediawiki.api', 'jquery', 'mediawiki.user' ]).then(function() {
    var token = mw.user.tokens.values.editToken,
        fullpagename = mw.config.get("wgPageName"),
        pagename = mw.html.escape(mw.config.get("wgTitle")),
        namespace = mw.config.get("wgNamespaceNumber"),
        api = new mw.Api(),
        sitename = mw.config.get('wgSiteName'),
        action = mw.config.get('wgAction');
    
    // Don't run script on any actions that dont show page titles
    if(action === "edit") {
        return;
    }
    
    // api.parse() syntax
    function parse(wikitext) {
        var defer = jQuery.Deferred();
        
        api.get({ action: 'parse', text: wikitext })
        .done(function(data){
            if(data.error) { defer.reject(data); }
            else { defer.resolve(data.parse.text["*"]); }
        })
        .fail(defer.reject);
        
        return defer;
    }
    
    function pageExists(page) {
        return api.get({ action: 'query', titles: page })
        .then(function(data) { return !data.query.pages[-1]; });
    }
    // Button to reset the sandbox
        $('#reset-sandbox.button').click(function() {
            if (confirm('Are you sure you want to reset the sandbox module?')) {
                api.post({
                    action: 'edit',
                    title: 'Module:Sandbox',
                    token: token,
                    minor: true,
                    bot: true,
                    summary: 'Reset the sandbox module (SandboxClearer)',
                    text: '-----------------------------------------------------------------------\n\
    -- Here You can test your code.\n\
    --\n\
    -- NOTICE\n\
    -- This is a Test Module. It will be peridoicly cleared.\n\
    -- please dont use it while it is in use by another person.\n\
    -----------------------------------------------------------------------\n\
    \n\
    -- Not in use: feel free to use\n\
    \n\
    ',
                }).done(function(data) {
                    if (!data.error) {
                        new BannerNotification('Sucessfully Cleared the sandbox module!', 'confirm').show();
                        mw.log('Sucessfully Cleared the sandbox module!');
                    } else {
                        new BannerNotification('API Error in clearing the sandbox module: ' + data.error.code, 'error').show();
                        console.warn('API Error in clearing the sandbox module:' + data.error.code);
                    }
                });
            }
        });
        
        // Lua Sandbox Re-mirroring function
        mw.util.addCSS('#re-mirror-sandbox:hover { text-decoration: underline; }');
        $('#re-mirror-sandbox').click(function() {
            if (confirm('Are you sure you want to clear the sandbox module?')) {
                api.post({
                    action: 'edit',
                    title: 'Module:' + pagename + '/sandbox',
                    token: token,
                    minor: true,
                    bot: true,
                    summary: 'Reset the sandbox subpage (SandboxClearer)',
                    text: '--{{subst:Module:' + pagename + '}}',
     
                }).done(function(data) {
     
                    if (!data.error) {
                        new BannerNotification('Sucessfully Cleared the sandbox module!', 'confirm').show();
                        mw.log('Sucessfully reset the sandbox module!');
                    } else {
                        new BannerNotification('API Error in clearing the sandbox module: ' + data.error.code, 'warn').show();
                        console.warn('API Error in clearing the sandbox module: ' + data.error.code);
                    }
                });
            }
     
        });
    }
    
);