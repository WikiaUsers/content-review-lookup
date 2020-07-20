// Please do not submit this version for review.

/*
* NotabilityMove v2.0 (indev)
* @description Allows for quick moving of pages deemed non-notable.
* @authors "The JoTS", "Ozuzanna"
*
* Based off of
*     [[w:c:dev:AjaxRedirect]] by Ozuzanna
*/

var ug = mw.config.get("wgUserGroups").join(' ');
var sysop = ug.indexOf('sysop') + 1,
    cmod  = ug.indexOf('content-moderator') + 1;

//var actions = mw.config.get("wgWikiaPageActions"),
//    hotkeys = mw.config.get("wgWikiaShortcutKeys");

var modalContents = "<h3>Target editor</h3><input type='text' id='ncu-target'>"
    // Select namespace
    + "<h3>Namespace</h3><form id='ncu-ns'>"
    + "<input type='radio' name='ns' value='user' checked> User</input>"
    + "<input type='radio' name='ns' value='blog'" + (sysop ? "" : " disabled") + "> User blog</input></form>"
    // Select reason
    + "<h3>Reason</h3><form id='ncu-reason'>"
    + "<input type='radio' name='reason' value='ncu' checked> <a href='/wiki/RW:NCU' target='_blank'>NCU</a></input>"
    + "<input type='radio' name='reason' value='irrelevant'> Not relevant in content namespaces.</input><br>"
    + "<input type='radio' name='reason' value='other'> Other reason: </input>"
    + "<input type='text' id='ncu-otherreason'></form>"
    // Protection options
    + "<h3>Protection</h3><form id='ncu-protect'>"
    + "<input type='checkbox' name='protect' value='creation'> <strong>Original page:</strong> create=sysop (1 hour)</input><br>"
    + "<input type='checkbox' name='protect' value='move'> <strong>New page:</strong> move=sysop (1 week)</input>"
    // Check player (through article name) if notability guidelines are met
    + "<div id='ncu-chkplr' style='font-size:80%;text-align:right;'>"
    + "( <a href='https://roblox.com/user.aspx?username=$PLAYER' target='_blank'>Check player</a> )</div>";


if (sysop + cmod) {

    ;(function($, mw) {
        if ($('#ca-ncu').length // already exists
            || mw.config.get('wgCanonicalNamespace') === "Thread"
            || mw.config.get('wgCanonicalNamespace') === "File"
            || mw.config.get('wgCanonicalNamespace') === "MediaWiki"
            || mw.config.get('wgCanonicalSpecialPageName')) return;
    
        // insert buttons
        if (({"oasis": 1, "wikia": 1})[mw.config.get('skin')] === 1) {
            $('#WikiaPageHeader > .wikia-menu-button > .WikiaMenuElement > li:last-child').after(
                $('<li/>').append('<a style="cursor:pointer" id="ca-ncu">NCU move</a>'));
        } else if (mw.config.get('wgNamespaceNumber') !== -1 && mw.config.get('wgAction') === 'view') {
            $('#p-cactions > .pBody > ul > li:last-child').after(
                $('<li/>').append('<a style="cursor:pointer" id="ca-ncu">NCU move</a>'));
        }
      
        function respHandler (res, type) {
            if (res === true) {
                console.log(type + ' successful!');
                new BannerNotification(type + ' succesful!','confirm').show();
          
                if (type === "Protect")
                    setTimeout((function() { window.location.reload(); }), 3000);
            } else {
                console.log('Failiure: ' + type);
                new BannerNotification('Failiure: ' + type,'error').show();
            }
        }
    
        // Declare vars
        var api,token;
        var oldPageName,basePageName;
        var newPageName;
        var modal;
    
        $('#ca-ncu').click(launchModal);
        
        function launchModal() {
            // Initialize vars
            token = mw.user.tokens.get('editToken');
            oldPageName = mw.config.get('wgPageName');
            basePageName = /^(?:[A-Za-z]*:)?(.+)/.exec(oldPageName)[1]; // removes namespace
            newPageName  = 'User:' + targUser + '/' + basePageName;
            api = new mw.Api();
            
            // Modal
            modal = $.showCustomModal("Notability move", modalContents.replace("$PLAYER", oldPageName),
            {
                id: "NotabilityMoveModal",
                buttons: [{
                    id: "ncu-exe",
                    defaultButton: true,
                    message: "Move",
                    handler: function() {
                        idunno();
                        $('#NotabilityMoveModal').closeModal();
                    }
                }]
            });
        }
        
        function idunno() {    
            // WIP BELOW
            if (!targUser) {
              console.log('You need to specify the target user!');
              return;
            }
            
            // Confirm move
            if (!confirm('"'
                + oldPageName.replace(/_/g, ' ') + '" will be moved to\n"'
                + newPageName.replace(/_/g, ' ') + '".')) return;
            
            // Move page
            api.post({
              action: 'move',
              from: oldPageName,
              to:   newPageName,
              noredirect: '',
              reason: '[[RW:NCU|Does not meet notability policy]].',
              token: token
            }).done(function(d) {
                respHandler(!d.error, "Move"); // move succesful
                
                // Temporarily protect page
                api.post({
                    format: 'json',
                    action: 'protect',
                    expiry: '1 hour',
                    protections: 'create=sysop',
                    watchlist: 'nochange',
                    title: oldPageName,
                    reason: 'Automatically protected page when moving to user space.',
                    token: token
                })
                .done(function(d) { respHandler(!d.error, "Protect"); })
                .fail(function()  { resphandler(false,    "Protect"); });
                
            }).fail(function() {
              respHandler(false, "Move");
            });
        }
      
    })(this.jQuery, this.mediaWiki);
}