function deleteFile(operation, fileName, reason, callback) {
    $.ajax({
        type: "POST",
        url: "/api.php",
        data: {
            token: mw.user.tokens.get("editToken"),
            action: operation,
            title: fileName,
            reason: reason
        },
        success: function(data) {
            if (typeof callback === "function") {
                callback();
            }
        },
        error: function(data) {
            outputMessage(data);
        }
    });
}

function moveFile(oldName, newName) {
    $.ajax({
        type: "POST",
        url: "/api.php",
        data: {
            token: mw.user.tokens.get("editToken"),
            action: "move",
            from: oldName,
            to: newName,
            noredirect: 1,
            watchlist: "watch",
            movetalk: 1,
            ignorewarnings: 1,
            reason: "Merging: Renaming old file"
        },
        success: function(data) {
            outputMessage("Old file moved!");
            deleteFile("delete",
                newName,
                "Merging: Deleting old file to maintain order",
                function() {
                    outputMessage("Old file deleted!");
                    deleteFile("undelete",
                        newName,
                        "Merging: Restoring merged file",
                        function() {
                            outputMessage("Merged file undeleted!");
                            outputMessage("Done!");
                        }
                    );
                }
            );
        },
        error: function(data) {
            outputMessage(data);
        }
    });
}

function mergeFileModal() {
    $().makeModal({
        id: "ModalTable",
        width: 666
    });
    $("#ModalTable .modalContent").css({
        overflow: "auto",
        textAlign: "center",
    });
    $("#ModalTable .modalContent").html('New filename<br /><input type="text" style="width:600px" id="inputFilename" /><br /><input type="button" id="buttonMerge" value="Merge" /><br /><pre id="outputMessage"></pre>');

    $('#buttonMerge').click(function() {
        mergeFile(wgPageName, $("#inputFilename").val());
    });
}

function outputMessage(message) {
    if ($("#outputMessage")) $("#outputMessage").append("<br />" + message);
    else console.log(message);
}

function loadDeleteReasons() {
    stdDeletion = localStorage.getItem('stdDeletion');
    if (stdDeletion) {
        sSArray = stdDeletion.split("\t");
        for (i in sSArray) {
            var val = (sSArray[i].indexOf('**') === 0) ? sSArray[i].substring(2).trim() : '';
            var text = (sSArray[i].indexOf('**') === 0) ? '&nbsp;&nbsp;' + sSArray[i].substring(2).trim() : sSArray[i].substring(1).trim();
            var disable = (sSArray[i].indexOf('**') === 0 || sSArray[i].indexOf('(') === 0) ? '' : 'disabled';
            var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
            $("#stdDeletion").append($opt);
        }
    } else {
        $.ajax({
            'dataType': 'text',
            'data': {
                'title': 'MediaWiki:Filedelete-reason-dropdown',
                'action': 'raw',
                'ctype': 'text/plain'
            },
            'url': wgScript,
            'success': function(data) {
                var lines = data.split("\n");
                sSArray = new Array();
                for (var i in lines) {
                    if (!lines[i].length) continue;
                    sSArray.push(lines[i]);
                }
                stdDeletion = sSArray.join("\t");
                localStorage.setItem('stdDeletion', stdDeletion);
                loadDeleteReasons();
            }
        });
    }
}

function deleteFileModal() {
    $().makeModal({
        id: "ModalTable",
        width: 666
    });
    $("#ModalTable .modalContent").css({
        overflow: "auto",
        textAlign: "center",
    });
    $("#ModalTable .modalContent").html(
        'Filename<br /><input type="text" style="width:600px" id="inputFilename" value="' + wgPageName + '"/>' +
        '<br />Reason<br /><select style="width:600px" id="stdDeletion"><option>Other</option></select>' +
        '<br /><input type="text" style="width:600px" id="inputDeletion" />' +
        '<br /><input type="button" id="buttonDelete" value="Delete" />' +
        '<br /><pre id="outputMessage"></pre>'
    );
    loadDeleteReasons();

    $('#buttonDelete').click(function() {
        outputMessage("Deleting " + $("#inputFilename").val());

        DeletionReason = $('#stdDeletion').val() ? ($("#inputDeletion").val() ? ($('#stdDeletion').val() + ": " + $("#inputDeletion").val()) : $('#stdDeletion').val()) : ($("#inputDeletion").val() ? $("#inputDeletion").val() : "");

        deleteFile(
            "delete",
            $("#inputFilename").val(),
            DeletionReason,
            function() {
                outputMessage($("#inputFilename").val() + " deleted!");
            }
        );
    });
}

$(function() {
    if (wgNamespaceNumber == 6) {
        $button = $('<li><a/>').find("a")
            .attr({
                href: "#",
                title: "Merge"
            }).text("Merge").on('click', function(e) {
                e.preventDefault();
                mergeFileModal();
            }).end();
        $("a[data-id='move']").parent().after($button);

        $button = $('<li><a/>').find("a")
            .attr({
                href: "#",
                title: "Fast Delete"
            }).text("Fast Delete").on('click', function(e) {
                e.preventDefault();
                deleteFileModal();
            }).end();
        $("a[data-id='delete']").parent().after($button);
    }
});

function mergeFile(oldName, newName) {
    if (newName.substr(0, 5) != "File:") newName = "File:" + newName;
    if (oldName == newName.replace(/ /g, "_")) {
        outputMessage("Filename is identical.");
        return;
    }
    deleteFile("delete",
        newName,
        "Merging: Deleting destination in preparation for move",
        function() {
            outputMessage("New file deleted!");
            moveFile(oldName, newName);
        }
    );
}