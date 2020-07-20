// Written by Shining-Armor
// Licensed under the MIT Open Source license

var ctt = window.ctt || {};

ctt.FormHTML = '\
<form method="" name="" class="WikiaForm "> \
    <fieldset> \
        <p>File delimiter: \
            <input type="text" id="csv-2-table-delimiter" value="" /> \
        </p> \
        <p>Valid CSV document.</p> \
        <textarea style="height: 20em; width: 80%;" id="csv-2-table-document"/> \
    </fieldset> \
</form>';

ctt.startParse = function(doc, del) {
    if (!doc) {
        alert('You must enter a valid CSV document to be parsed.');
        return;
    } else if (!del) {
        alert('You must enter a CSV delimiter.');
        return;
    }

    var file = "{| class=\"wikitable\"\n";
    var lines = doc.split("\n");
    var headers = lines[0].split(del);
    var keys = [];

    for (var i = 0; i < headers.length; i++) {
        file += "! " + headers[i] + "\n";
    }

    file += "|-\n";
    lines.shift();

    for (var i = 0; i < lines.length; i++) {
        keys = lines[i].split(del);

        for (var j = 0; j < keys.length; j++) {
            if (j === 0) {
                file += "| " + keys[j];
            } else {
                file += " || " + keys[j];
            }
        }

        file += "\n|-\n";
    }

    file += "|}";
    $('#csv-2-table-document').val(file);
};

ctt.closeModal = function() {
    $('#form-csv2table').closeModal();
};

ctt.showModal = function() {
    $.showCustomModal('CSV 2 Table', ctt.FormHTML, {
        id: 'form-csv2table',
        width: 500,
        buttons: [{
            id: 'start-button',
            message: 'Convert',
            defaultButton: true,
            handler: function() {
                var doc = $('#csv-2-table-document').val();
                var del = $('#csv-2-table-delimiter').val();

                ctt.startParse(doc, del);
            }
        }, {
            message: 'Cancel',
            handler: function() {
                ctt.closeModal();
            }
        }]
    });
};

ctt.init = function() {
    if (mw.config.get('skin') === 'monobook') {
        mw.util.addPortletLink('p-tb', '#', 'CSV 2 Table', 't-csv');
    } else {
        $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" id="t-csv">CSV 2 Table</a></li>');
    }

    document.getElementById('t-csv').addEventListener('click', function() {
        ctt.showModal()
    });
};

$(document).ready(function() {
    ctt.init();
});