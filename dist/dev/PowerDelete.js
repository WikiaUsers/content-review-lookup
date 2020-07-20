/////////////////////////////////////////////////////////////////////////////////
/////   PowerDelete - Recreates Utility/VSTF's former PowerDelete right    /////
////                         Author: Doork                                /////
///           Deletes and Protects pages/files in one click              /////
/////////////////////////////////////////////////////////////////////////////
 
;(function($, mw, window) {
    var ug = mw.config.get('wgUserGroups'),
        token = mw.user.tokens.get('editToken'),
        Api = new mw.Api(),
        page = mw.config.get('wgPageName'),
        namespace = mw.config.get('wgNamespaceNumber'),
        FormHTML = '\
            <form method="" name="" class="WikiaForm "> \
                <fieldset> \
                    <p>Type of protection: \
                        <select id="protect-type"> \
	                        <option value="create=all">All</option> \
	  	                    <option value="create=autoconfirmed">Autoconfirmed</option> \
	                        <option value="create=sysop">Admin</option> \
                        </select> \
                    </p> \
                    <p>Expiry of protection: \
                        <input type="text" id="protect-expiry" value="" placeholder="indefinite" /> \
                    </p> \
                    <p>Reason of protection: \
                        <input type="text" id="protect-reason" value="" /> \
                    </p> \
                    <p>Reason of delete: \
                        <input type="text" id="delete-reason" value="" /> \
                    </p> \
                </fieldset> \
            </form>';
    if (!/sysop|content-moderator|vstf|staff|helper|content-volunteer|content-team-member|wiki-manager/.test(ug.join()) || window.powerDelLoaded || namespace === -1 || namespace === 1200 || namespace === 1201) {
        console.log('PowerDelete: Script already imported or User rights are requirements are not met or namespace is unsupported, skipping import.');
        return;
    }
    window.powerDelLoaded = true;
 
    // Modal Show section
    var button = $('<li>', {
        html: $('<a>', {
            id: "PowerDelete",
            href: "#",
            html: "PowerDelete",
            click: function() {
                $.showCustomModal('PowerDelete', FormHTML, {
                    id: 'form-powerdel',
                    width: 500,
                    buttons: [{
                        message: 'Cancel',
                        handler: function() {
                            $('#form-powerdel').closeModal();
                        }
                    }, {
                        id: 'startButton',
                        message: 'Execute',
                        defaultButton: true,
                        handler: function() {
                            doDelete();
                        }
                    }]
                });
            }
        })
    }),
        dropdown = $('.UserProfileActionButton .WikiaMenuElement, .page-header__contribution-buttons .wds-list').first();
     dropdown.append(button);
 
    // Function itself.
    function doDelete() {
        Api.post({
            action: 'delete',
            reason: $('#delete-reason').val(),
            title: page,
            token: token
        }).done(function(d) {
            if (d.error) {
                console.log('PowerDelete: API error in deletion: ' + d.error.code);
            } else {
                console.log('PowerDelete: Sucessfully Deleted "' + page + '"!');
                Api.post({
                    action: 'protect',
                    expiry: $('#protect-expiry').val() || $('#protect-expiry').attr('placeholder'),
                    protections: $('#protect-type').val(),
                    watchlist: 'nochange',
                    title: page,
                    reason: $('#protect-reason').val() || $('#delete-reason').val(),
                    token: token
                }).done(function(d) {
                    if (d.error) {
                        console.log('PowerDelete: API error in protection: ' + d.error.code);
                    } else {
                        alert('Done!');
                        console.log('PowerDelete: Sucessfully protected "' + page + '"!');
                        window.location.reload();
                    }
                });
            }
        });
    }
 
})(jQuery, mediaWiki, window);