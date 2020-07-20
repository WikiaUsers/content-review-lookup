//<nowiki>
(function ($, mw) {
    
    'use strict';
    
    var conf = mw.config.get([
        'wgCategories',
        'wgPageName',
        'wgNamespaceNumber',
        'wgUserGroups',
        'wgUserName'
    ]);
    
    var req = {
        custodian: {
            time: 3 * 30,
            edits: 200,
            name: "Custodian",
            group: "user"
        },
        chatmod: {
            time: 3 * 30,
            edits: 0,
            name: "Chat Moderator",
            group: "user"
        },
        discussionsmod: {
            time: 4 * 30,
            edits: 550,
            name: "Discussions Moderator",
            group: "user"
        },
        contentmod: {
            time: 4 * 30,
            edits: 400,
            name: "Content Moderator",
            group: "user"
        },
        admin: {
            time: 6 * 30,
            edits: 600,
            name: "Administrator",
            group: "user"
        },
        bureaucrat: {
            time: 12 * 30,
            edits: 1000,
            name: "Bureaucrat",
            group: "sysop"
        }
    };
    
    function getUserDetails() {
        $.ajax({
            url: mw.util.wikiScript('wikia'),
            data: {
                controller: "UserProfilePage",
                method: "renderUserIdentityBox",
                format: "json",
                title: conf.wgUserName,
                uselang: "en"
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                // The returned data uses commas in the number of edits, which breaks parseInt if not removed
                conf.userEdits = parseInt(data.user.edits.replace(",",""), 10);
                // Days since registration
                conf.userTime = (Date.now() - (Date.parse(data.user.registration))) / (1000 * 60 * 60 * 24);
            }
        });
    }
    
    function getUserGroups() {
        var commonRights = ["autoconfirmed", "*", "poweruser", "user"];
        conf.userGroups = conf.wgUserGroups.filter(function(val) {
            return commonRights.indexOf(val) == -1;
        });
    }
    
    function closeModal() {
        $($('.modalWrapper')[$('.modalWrapper').length - 1]).closeModal();
    }
 
    function createModal(title, body, options) {
        if (options) {
            options.buttons.push({id: "close", message: "Close", handler: function() { closeModal() }});
        } else {
            options = {buttons: [{id: "close", message: "Close", handler: function() { closeModal() }}]};
        }
        $.showCustomModal(title, body, options);
    }
    
    function showRightsModal(id) {
        if (conf.userEdits > req[id].edits && conf.userTime > req[id].time && conf.wgUserGroups.indexOf(req[id].group) > -1) {
            console.log("Suitable");
            getUserGroups();
            createModal(req[id].name + " RfR", 'Please provide a summary as to why you believe you are suitable for rights. <br/><form class="WikiaForm" id="rightsForm"><fieldset><textarea id="summary" class="formField" placeholder="Personal statement" type="text" style="width:100%"/><span id="br2" /></fieldset></form>', {buttons: [{id: "submit", message: "Submit", handler: function() { submitRfR(req[id], $('#summary').val()) }}]});
        } else {
            console.log("Not suitable");
            console.log(conf.userEdits + "vs" + req[id].edits + "required");
            console.log(conf.userTime + "vs" + req[id].time + "required");
            console.log(conf.wgUserGroups.join() + "vs" + req[id].group + "required");
            createModal(req[id].name + " RfR", "You cannot create a RfR of this type, as you do not meet the requirements.");
        }
    }
    
    function submitRfR(right, summary) {
        var now = new Date();
        var dateString = now.getUTCDate() + "/" + (now.getUTCMonth() + 1) + "/" + now.getUTCFullYear();
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                action: "edit",
                title: "Project:Request for " + right.name + "/" + conf.wgUserName,
                summary: "Creating new RfR",
                createonly: true,
                text: "{{" + "subst:RfR|right=" + right.name + "|user=" + conf.wgUserName + "|currentrights=" + conf.userGroups.join(", ") + "|edits=" + conf.userEdits + "|regtime=" + Math.round(conf.userTime) + "|statement=" + summary + "|creation=" + dateString + "}}",
                format: 'json',
                token: mw.user.tokens.get('editToken')
            },
            dataType: 'json',
            type: 'POST',
            success: function( data ) {
                if ( data && data.edit && data.edit.result == 'Success' ) {
                    alert("Your RfR page had been created.");
                    $.ajax({
                        url: mw.util.wikiScript( 'api' ),
                        data: {
                            action: 'edit',
                            title: "Project:Request for " + right.name + "/" + conf.wgUserName + "/Votes",
                            createonly: true,
                            text: JSON.stringify({Support: {}, Neutral:{}, Oppose:{}}),
                            format: 'json',
                            token: mw.user.tokens.get('editToken')
                        },
                        dataType: 'json',
                        type: 'POST',
                        success: function( data ) {
                            if ( data && data.edit && data.edit.result == 'Success' ) {
                                //Redirect to their new page
                                window.location.href = 'http://' + wgDBname + '.wikia.com/wiki/Project:Request for ' + right.name + '/' + conf.wgUserName;
                            } else if ( data && data.error ) {
                                alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                            } else {
                                alert( 'Error: Unknown result from API.' );
                            }
                        },
                        error: function( xhr ) {
                            alert( 'Error: Request failed.' );
                        }
                    });
                } else if ( data && data.error ) {
                    alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                } else {
                    alert( 'Error: Unknown result from API.' );
                }
            },
            error: function( xhr ) {
                alert( 'Error: Request failed.' );
            }
        });
    }

    function loadRfR() {
        getUserDetails();
        $('.requestur').click(function() {
            console.log("click");
            var id = $(this).attr('id');
            showRightsModal(id);
        });
    }
    
    function init() {
        if (conf.wgNamespaceNumber == 4 && conf.wgPageName.split(":")[1] == "Request_for_User_Rights") {
            mw.loader.using(['mediawiki.util'], loadRfR);
        }
    }
    
    $(init);
}(jQuery, mediaWiki));

//</nowiki>