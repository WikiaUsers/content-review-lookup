/* To try and avoid confusion in creating Requests for User Rights, use JS 
to create the page and load the template automatically when the button is 
pressed. The page cannot be overwritten by pressing the button again.
*/

// Puts the user's edit count and time since joining THIS wiki in a nice easy variable
window.xuserData = [];
$.get("http://animaljam.wikia.com/wikia.php?controller=UserProfilePage&method=renderUserIdentityBox&format=json&title=User:" + mw.config.get("wgUserName") + "&uselang=en").done(
    function(data) {
        xuserData.edits = data.user.edits;
        //Get the registration date in seconds since the epoch
        xuserData.registration = (Date.parse(data.user.registration))/1000;
    }
);


var rfrDebug = false;

if (mw.config.get("wgPageName") == "Animal_Jam_Wiki:Request_for_User_Rights") {
    get_config();
    $( ".requestur" ).click(function() {
        var right = $(this).attr('id');
        if(is_eligible(right) && !rfrDebug) {
            $.showCustomModal('RfR', 'Please enter a summary of why you believe you would be suitable for rights<form class="WikiaForm" id="inputForm"><fieldset><textarea id="summary" class="formField" placeholder="Personal statement" type="text" style="width:100%"/><span id="br2" /></fieldset></form>', {
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
                        submitRfR(right, $('#summary').val());
                    }
                }]
            });
        } else if (!rfrDebug) {
            $.showCustomModal("Unable to create RfR", "You are not suitable for " + right + " rights at this time:<br/>-Your edits: "+xuserData.edits+" Required edits: "+config["min_"+right.toLowerCase()+"_edits"] + "<br/>Your ToW: "+Math.round(xuserData.registration/86400)+ " days Required ToW: "+config["min_"+right.toLowerCase()+"_time"] + "<br/><br/>To report potential errors, leave a message [[Message_Wall:Xytl|here]].", {
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
        } else {
            console.log("Since debug mode is active, a RfR has not been created despite the user being eligible");
        }
    });
}

function submitRfR(right, summary) {
    cancelModal();
    $.ajax({
        url: mw.util.wikiScript( 'api' ),
        data: {
            format: 'json',
            action: 'edit',
            title: "Project:Request for "+right+"/"+mw.config.get("wgUserName"),
            summary: "Creating new RfR",
            createonly: true,
            text: rfrformat(summary),
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
                        format: 'json',
                        action: 'edit',
                        title: "Project talk:Request for "+right+"/"+mw.config.get("wgUserName"),
                        summary: "Creating new RfR talk page",
                        createonly: true,
                        text: rfrtalk,
                        token: mw.user.tokens.get('editToken')
                    },
                    dataType: 'json',
                    type: 'POST',
                    success: function( data ) {
                        if ( data && data.edit && data.edit.result == 'Success' ) {
                            //Redirect to their new page
                            window.location.href = 'http://animaljam.wikia.com/wiki/Project:Request for '+right+'/'+mw.config.get("wgUserName");
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

function is_eligible(right) {
    if ( parseInt(xuserData.edits) > parseInt(config["min_"+right.toLowerCase()+"_edits"]) && ( Math.round(((Date.now() / 1000 ) - xuserData.registration) / 86400)) > parseInt(config["min_"+right.toLowerCase()+"_time"])  ) {
        return true;
    } else {
        return false;
    }
}

// Loads from external config file so that minor changes can be made without having
// to resubmit this page
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

function cancelModal() {
    $($('.modalWrapper')[$('.modalWrapper').length - 1]).closeModal();
}

function rfrformat(summary) {
    return '<div style="width: 95%; margin: auto"> \
\
<div class="color1" style="color: white; width: 100%; padding: 20px 0 20px 7px;  font-family: \'Raleway\', sans-serif">\
<span style="font-size: 1.5em">Animal Jam Wiki</span><br/>\
Request for User Rights/User: {{#titleparts: {{PAGENAME}} | 1 | 2 }}\
</div>\
\
{{Rfr/1|{{#titleparts: {{PAGENAME}} | 1 | 2 }}}}' + summary + '<br/>\
Vote by going to [[{{NAMESPACE}} Talk:{{PAGENAME}}]]\
<hr>\
\
{{{{NAMESPACE}} Talk:{{PAGENAME}}}}\
</div>\
\
[['+'Category:Active Nomination'+']]';
}

var rfrtalk = '<h2>Support</h2><br/> \
\
<h2>Neutral</h2><br/> \
\
<h2>Oppose</h2>';