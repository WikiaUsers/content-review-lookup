//<nowiki>
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:ShowCustomModal.js'
});
mw.hook('dev.showCustomModal').add(function(showCustomModal) {
    creation(jQuery, mediaWiki);
});
function creation($, mw) {
    
    'use strict';
    
    var conf = mw.config.get([
        'wgCategories',
        'wgPageName',
        'wgNamespaceNumber',
        'wgUserGroups',
        'wgUserName',
        'wgUserRegistration',
        'wgServer'
    ]);
    
    // Days since registration
    conf.userTime = (Date.now() - conf.wgUserRegistration) / (1000 * 60 * 60 * 24);
    
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
            url: "https://animaljam.fandom.com/wiki/Special:Editcount/" + conf.wgUserName,
            dataType: 'text',
            type: 'GET',
            success: function(data) {
            	var editcount = $(data).find("#editcount table table tr:nth-child(2) td:nth-child(2)").text();
                // The returned data uses commas in the number of edits, which breaks parseInt if not removed
                conf.userEdits = parseInt(editcount.replace(",",""), 10);
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
    	var confirmation = confirm("Are you sure you want to close this modal? Any work you enter will not be saved.");
        if (confirmation) dev.showCustomModal.closeModal($($('.modalWrapper')[$('.modalWrapper').length - 1]));
    }
 
    function createModal(title, body, options) {
        if (options) {
            options.buttons.unshift({id: "close", message: "Close", handler: function() { closeModal() }});
        } else {
            options = {buttons: [{id: "close", message: "Close", handler: function() { closeModal() }}]};
        }
        dev.showCustomModal(title, body, options);
    }
    
    function showRightsModal(id) {
        if (conf.userEdits > req[id].edits && conf.userTime > req[id].time && conf.wgUserGroups.indexOf(req[id].group) > -1) {
            console.log("Suitable");
            getUserGroups();
            createModal(
            	req[id].name + " RfR",
            	'Please provide a summary as to why you believe you are suitable for rights. <br/><form class="WikiaForm" id="rightsForm"><textarea id="summary" class="formField" placeholder="Personal statement" type="text" style="width:100%"/></textarea></form>',
            	{buttons: [
            		{
            			id: "submit",
            			message: "Submit",
            			handler: function() {
            				var api = new mw.Api();
            				api.getToken('csrf').then(function(token) {
            					submitRfR(req[id], $('#summary').val(), token);
            				});
        				}
            		}
            	]}
            );
        } else {
            console.log("Not suitable");
            console.log(conf.userEdits + "vs" + req[id].edits + "required");
            console.log(conf.userTime + "vs" + req[id].time + "required");
            console.log(conf.wgUserGroups.join() + "vs" + req[id].group + "required");
            createModal(req[id].name + " RfR", "You cannot create a RfR of this type, as you do not meet the requirements.");
        }
    }
    
    function submitRfR(right, summary, token) {
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
                token: token
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
                            token: token
                        },
                        dataType: 'json',
                        type: 'POST',
                        success: function( data ) {
                            if ( data && data.edit && data.edit.result == 'Success' ) {
                                //Redirect to their new page
                                window.location.href = conf.wgServer + mw.util.getUrl('Project:Request for ' + right.name + '/' + conf.wgUserName);
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
}

//</nowiki>