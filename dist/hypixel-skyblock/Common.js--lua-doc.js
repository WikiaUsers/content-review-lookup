/**
 * Tuesday, July 14, 2020
 * @name: LuaDoc
 * @desc: Adds a documenation for lua modules for wikis that dont have UCP enabled.
 * @author: Thundercraft5 (https://https://hypixel-skyblock.fandom.com/wiki/User:Thundercraft5)
 * @author: Fewfre (https://https://hypixel-skyblock.fandom.com/wiki/User:Fewfre)
 * @doc: https://hypixel-skyblock.fandom.com/wiki/MediaWiki:Common.js/lua-doc.js
 * @license: CC-BY-SA - https://creativecommons.org/licenses/by-sa/3.0/
 * @desc: Creates module documentation for lua modules for wikis that are not on MediaWiki 1.31
 */
;(function($, mw, window) {
    var token = mw.user.tokens.values.editToken,
        fullpagename = mw.config.get("wgPageName"),
        pagename = mw.html.escape(mw.config.get("wgTitle")),
        namespace = mw.config.get("wgNamespaceNumber"),
        api = new mw.Api(),
        sitename = mw.config.get('wgSiteName')
        action = mw.config.get('wgAction');
    
    // Don't run script on any actions that dont show page titles
    if(action != "view" || action != "history" || action != "delete" || action != "protect") {
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
    
    // Module:
    if (namespace === 828) {
        parse('{{LuaDocumentation|'+pagename+'}}')
        .done(function(docHTML){
            var $elem = $('pre.lua.source-lua, .noarticletext').first();
            $elem.before(
                docHTML
                +'<h2 id="module-code">Module Code</h2>'
            );
        });
        
    }
    // Module talk:
    else if (namespace === 829 && pagename.replace(/(\?.+)$/, '').match(/(\/doc)$/gmi)) {
        // Check if parent module exists
        pageExists("Module:" + pagename.replace(/(\/doc)$/gmi, ''))
        .done(function(moduleExists) {
            document.title = "Module documentation for Module:" + pagename.replace(/(\/doc)$/gmi, '') + " | " + sitename + " | Fandom";
            $('#PageHeader h1.page-header__title').text('Module Documentation:' + pagename);
            $('#talkpagesignbox').remove();
            $('.page-header__page-subtitle').text('');
            $('.page-header__page-subtitle').append(
                '<a' + (moduleExists ? "" : " class=\"new\"") 
                + ' title="Module:' + pagename + (moduleExists ? "": " (page does not exist)") + '" accesskey="c" rel=\"nofollow\" ' + 
                ' href=\"/wiki/Module:' + pagename.replace(/(\/doc)$/gmi, '') + (moduleExists ? "" : "?action=edit&redlink=1") +
                '\"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink=\"http://www.w3.org/1999/xlink" viewBox="0 0 12 12\" class=\"wds-icon wds-icon-tiny page-header__subtitle-back-icon\" id=\"wds-icons-arrow-tiny\"><defs><path id=\"aarow-tiny\" d=\"M5 11a.997.997 0 0 1-.707-.293l-4-4A.983.983 0 0 1 0 6.003v-.006a.988.988 0 0 1 .293-.704l4-4a.999.999 0 1 1 1.414 1.414L3.414 5H11a1 1 0 1 1 0 2H3.414l2.293 2.293A.999.999 0 0 1 5 11\"></path></defs><use fill-rule=\"evenodd\" xlink:href=\"#aarow-tiny\"></use></svg>Back to Module</a>');
            $('.noarticletext').text('');
            $('#ca-edit').remove();
            $('#ca-addsection').attr('href', '/wiki/' + fullpagename  + '?action=edit').attr('id', 'ca-edit');
            $('#ca-edit > span').text('Edit');
            mw.log('Formatted Doc page');
        });
        
    }
    else {
        mw.log('LuaDoc: Namespace is not a module');
        return;
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
                    new BannerNotification('Suessfully Cleared the sandbox module!', 'confirm').show();
                    mw.log('Suessfully Cleared the sandbox module!');
                } else {
                    new BannerNotification('API Error in clearing the sandbox module: ' + data.error.code, 'error').show();
                    console.warn('API Error in clearing the sandbox module:' + data.error.code);
                }
            });
        }
    });
    
    // Lua Sandbox Re-mirroring function
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
                    new BannerNotification('Suessfully Cleared the sandbox module!', 'confirm').show();
                    mw.log('Suessfully reset the sandbox module!');
                } else {
                    new BannerNotification('API Error in clearing the sandbox module: ' + data.error.code, 'warn').show();
                    console.warn('API Error in clearing the sandbox module: ' + data.error.code);
                }
            });
        }
 
    });
 
    
})(jQuery, mediaWiki, window);