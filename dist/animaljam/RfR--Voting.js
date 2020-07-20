(function ($, mw) {
 
    'use strict';
 
    var conf = mw.config.get([
        'wgCategories',
        'wgPageName',
        'wgNamespaceNumber',
        'wgUserName'
    ]);
 
    // Credit to Alex (https://stackoverflow.com/a/4253415/4114381)
    String.prototype.escapeSpecialChars = function() {
        return this.replace(/\\n/g, "\\n")
                    .replace(/\\'/g, "\\'")
                    .replace(/\\"/g, '\\"')
                    .replace(/\\&/g, "\\&")
                    .replace(/\\r/g, "\\r")
                    .replace(/\\t/g, "\\t")
                    .replace(/\\b/g, "\\b")
                    .replace(/\\f/g, "\\f");
    };
 
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
 
    function help() {
        createModal("Help", "<b>Help</b><br/>This system is designed to make it as easy as possible to vote on a RfR. If you experience any problems while using it, which is fairly likely, firstly consider whether this is the sort of thing you want to waste your time on. If the answer is yes, please leave <a href='http://animaljam.wikia.com/wiki/User:Xytl'>Xytl</a> a message.");
    }
 
    function rfrVote() {
        createModal(
            "Vote",
            "<form id='voteForm'><select name='voteSelect'><option name='support'>Support</option><option name='neutral'>Neutral</option><option name='oppose'>Oppose</option></select><br/>Reason<br/><textarea name='voteReason' style='width: 90%'/></form><br/><small>Note: changes may not show up immediately.",
            {buttons: [{id: "submit", message: "Submit", handler: function() {getExistingVotes(submitVote)}}, {id: "remove", message: "Remove", handler: function() {getExistingVotes(removeVote)}}]}
        );
        $('#remove').hide();
        checkIfVoted();
    }
 
    function checkIfVoted() {
        $.each(conf.votes, function(k, v) {
            if(!$.isEmptyObject(v)) {
                $.each(v, function(x, y) {
                    if(x == conf.wgUserName) {
                        $('[name="voteSelect"]').val(k);
                        $('[name="voteReason"]').text(y);
                        $('a#submit').text("Change");
                        $('#remove').show();
                        conf.userHasVoted = true;
                        conf.userVote = k;
                    }
                });
            }
        });
    }
 
    function submitVote(data) {
        if (conf.userHasVoted) {
            delete data[conf.userVote][conf.wgUserName];
        }
        data[$("[name='voteSelect']").val()][conf.wgUserName] = $("[name='voteReason']").val();
        saveVotes(data);
    }
 
    function removeVote(data) {
        delete data[conf.userVote][conf.wgUserName];
        saveVotes(data);
    }
 
    function getExistingVotes(callback) {
        $.ajax({
            url: mw.util.wikiScript(),
            data: {
                action: 'raw',
                title: conf.wgPageName + "/Votes",
            },
            dataType: 'json',
            type: 'GET',
            cache: false,
            success: function(data) {
                conf.votes = data;
                callback(data);
            }
        });
    }
 
    function saveVotes(data) {
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                action: 'edit',
                title: conf.wgPageName + "/Votes",
                section: 0,
                text: JSON.stringify(data),
                format: 'json',
                token: mw.user.tokens.get('editToken')
            },
            dataType: 'json',
            type: 'POST',
            success: function(data) {
                if ( data && data.edit && data.edit.result == 'Success' ) {
                    location.reload(true);
                } else if ( data && data.error ) {
                    alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                } else {
                    alert( 'Error: Unknown result from API.' );
                }
            },
            error: function( xhr ) {
                console.log( 'Error: Request failed.');
            }
        });
    }
 
    function appendVotes(result) {
        console.log("appendVotes()");
        var voteContainer = $('#voteContainer');
        // k: support/neutral/oppose keys
        // v: object containing usernames + comments
        $.each(result, function(k, v) {
            voteContainer.append("<h4>" + k.escapeSpecialChars() + "</h4>");
            // x: usernames
            // y: comments
            $.each(v, function(x, y) {
                voteContainer.append("<small><b>" + x.escapeSpecialChars() + "</b>: " + y.escapeSpecialChars() + "</small><br/>");
            });
        });
    }
 
    function loadRfR() {
        getExistingVotes(appendVotes);
    }
 
    function init() {
        if (conf.wgNamespaceNumber == 4 && conf.wgCategories.includes("RfR")) {
            console.log("RfR voting V1.0.3");
            mw.loader.using(['mediawiki.util'], loadRfR);
            $('#rfrVote').click(rfrVote);
            $('#purge').click();
            $('#helpVote').click(help);
        }
    }
 
	$(init);
}(jQuery, mediaWiki));