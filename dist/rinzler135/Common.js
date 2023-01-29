window.xuserData = [];

$(function() {
    $.get("http://rinzler135.wikia.com/wikia.php?controller=UserProfilePage&method=renderUserIdentityBox&format=json&title=User:" + mw.config.get("wgUserName") + "&uselang=en").done(
        function(data) {
            xuserData.edits = data.user.edits;
            //Get the registration date in seconds since the epoch
            xuserData.registration = (Date.parse(data.user.registration))/1000;
        }
    );
    (new mw.Api()).get({
        action: 'query',
        list: 'users',
        ususers: wgUserName,
        usprop: 'groups'
    }).done(function (data) {
        xuserData.groups = $(data.query.users[0].groups).not(["poweruser", "*", "autoconfirmed"]).get();
    });
});

if (mw.config.get("wgPageName") == "Rinzler135_Wiki:RfR") {
    get_config();
    $( ".requestur" ).click(function() {
        var right = $(this).attr('id');
        if(is_eligible(right)) {
            $.showCustomModal('RfR', 
                '<form class="WikiaForm" id="rfrForm">' + 
                    '<fieldset>' + 
                        '<div class="rfr-wrapper">' +
                            '<div class="rfr-section">' +
                                '<span><b>Username:</b> ' + wgUserName +
                            '</div>' +
                            '<div class="rfr-section">' +
                                '<span><b>Requested rights:</b> ' + right + '</span>' +
                            '</div>' +
                            '<div class="rfr-section">' +
                                '<span><b>Current user groups:</b> ' + xuserData.groups.join(", ") + '</span>' +
                            '</div>' +
                            '<hr>' +
                            '<div class="rfr-section">' +
                                '<span><b>Personal Statement:</b></span><br/>' + '<textarea id="statement" class="formField" placeholder="Why would you think you would be suitable for these rights?" type="text" style="width:100%; resize:vertical"/>' + 
                            '</div>' +
                        '</div>' +
                    '</fieldset>' + 
                '</form>', 
                {
                    id: "rfrWindow",
                    width: 650,
                    buttons: [{
                        id: "cancel",
                        message: "Cancel",
                        handler: function () {
                            cancelModal();
                        }
                    }, {
                        id: "submit",
                        defaultButton: true,
                        message: "Submit",
                        handler: function () {
                            submitRfR(right, $('#statement').val());
                        }
                    }]
                }
            );
        } else {
            $.showCustomModal("Unable to create RfR", "You are not suitable for " + right + " rights at this time:<br/>-Your edits: "+xuserData.edits+" Required edits: "+config["min_"+right.toLowerCase()+"_edits"] + "<br/>Your ToW: "+Math.round(xuserData.registration/86400)+ " days Required ToW: "+config["min_"+right.toLowerCase()+"_time"], {
                id: "rfrWindow",
                width: 650,
                buttons: [{
                    id: "close",
                    message: "Close",
                    handler: function () {
                        cancelModal();
                    }
                }]
            });
        }
    });
}

if (mw.config.get("wgPageName").indexOf("Rinzler135_Wiki:Request for Custodian") > -1) {
    $.get("http://rinzler135.wikia.com/wiki/" + mw.config.get("wgPageName") + "/Voting").done(
        function(data) {
            data = data.split(/\r\n|\r|\n/);
            $.each( data, function(i) {
                if (data[i].charAt(0) == "/" || data[i].charAt(0) === "") {
                    return;
                } else {
                    var temp = data[i].split(" = ");
                    config[temp[0]] = temp[1];
                }
            });
        }
    );
}

function submitRfR(right, statement) {
    cancelModal();
    $.ajax({
        url: mw.util.wikiScript( 'api' ),
        data: {
            format: 'json',
            action: 'edit',
            title: "Project:Request for "+right+"/"+mw.config.get("wgUserName"),
            summary: "Creating new RfR",
            createonly: true,
            text: rfrformat(right, statement),
            token: mw.user.tokens.get('editToken')
        },
        dataType: 'json',
        type: 'POST',
        success: function( data ) {
            if ( data && data.edit && data.edit.result == 'Success' ) {
                //Redirect to their new page
                window.location.href = 'http://rinzler135.wikia.com/wiki/Project:Request for '+right+'/'+mw.config.get("wgUserName");
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

function is_eligible(right) {
    if ( xuserData.edits > config["min_"+right.toLowerCase()+"_edits"] && ( Math.round(((Date.now() / 1000 ) - xuserData.registration) / 86400)) > config["min_"+right.toLowerCase()+"_time"]  ) {
        return true;
    } else {
        return false;
    }
}

function get_config() {
    window.config = [];
    var configPath = '/wiki/Mediawiki:Custom-config/rfrpc?action=raw';
    $.get(configPath).done(
        function(data) {
            data = data.split(/\r\n|\r|\n/);
            $.each( data, function(i) {
                if (data[i].charAt(0) == "/" || data[i].charAt(0) === "") {
                    return;
                } else {
                    var temp = data[i].split(" = ");
                    config[temp[0]] = temp[1];
                }
            });
        }
    );
}

// Ensures the top modal gets cancelled (since multiple ones can be open, and clicking the close button sometimes closes the other modal)
function cancelModal() {
    $($('.modalWrapper')[$('.modalWrapper').length - 1]).closeModal();
}

function rfrformat(right, statement) {
    return "{{subst:" + "RfR|right=" + right + "|user=" + wgUserName + "|currentrights=" + xuserData.groups.join(", ") + "|edits=" + xuserData.edits + "|regtime=" + Math.floor((Math.floor(Date.now() / 1000) - xuserData.registration) / (3600 * 24)) + "|statement=" + statement + "|creation=" + (new Date()).toISOString().slice(0,10) + "}}";
}

function vote() {
    $.showCustomModal("Vote for ###",
        '<form class="WikiaForm" id="rfrForm">' + 
            '<fieldset>' + 
                '<div class="rfr-wrapper">' +
                    '<div class="rfr-section">' +
                        '<span><b>Position:</b><br/> ' +
                        '<select id="vote">' + 
                            '<option value="support">Support</option>' +
                            '<option value="neutral">Neutral</option>' +
                            '<option value="oppose">Oppose</option>' +
                        '</select>' +
                    '</div>' +
                    '<div class="rfr-section">' +
                        '<span><b>Reason:</b></span><br/>' + '<textarea id="votereason" class="formField" placeholder="" type="text" style="width:100%; resize:vertical"/>' +
                    '</div>' +
                '</div>' +
            '</fieldset>' + 
        '</form>', 
    {
        id: "rfrWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Cancel",
            handler: function () {
                cancelModal();
            }
        }, {
            id: "submit",
            defaultButton: true,
            message: "Vote",
            handler: function () {
                submitVote([$('#vote').val(), $('#votereason').val()]);
            }
        }]
    });
}

function submitVote(vote) {
    cancelModal();
    console.log(vote);
    (new mw.Api()).post({
	action: 'edit',
	title: wgPageName + "/Voting",
	appendtext: '\n\n' + '{ "user": "' + wgUserName + '", "vote": "' + vote[0] + '", "voteReason": "' + vote[1] + '" }',
	summary: "Adding vote",
	token: mw.user.tokens.get('editToken')
});
}
/*

*/