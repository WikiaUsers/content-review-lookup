$(function () {
    if (!$('#QuickReportAdder')) {
        return;
    }
 
    function callAPI(data, method, callback) {
        data['format'] = 'json';
 
        $.ajax({
            data: data,
            dataType: 'json',
            url: wgScriptPath + '/api.php',
            type: method,
            success: function (response) {
                if (response.error) {
                    alert('API error: ' + response.error.info);
                } else {
                    callback(response);
                }
            },
            error: function (xhr, error) {
                showError('AJAX error: ' + error);
            },
            timeout: 10000 // msec
        });
    }
 
    function ReportInsert() {
        if (!$('#Userinput').val()) {
            alert("Fill in the input please.");
            return false;
        }
        $('#ReportInsertSubmit').val('Reporting user');
        callAPI({
            'action': 'query',
            'prop': 'info|revisions',
            'intoken': 'edit',
            'titles': 'Report test page',
            'rvprop': 'content',
            'rvlimit': '1'
        }, 'GET', function (response) {
            var pages = response.query.pages;
            var page = null;
 
            for (var i in pages) {
                page = pages[i];
            }
 
            var dataInput = '*{{Report|';
            dataInput += $('#Userinput').val()
            if ($('#Reasoninput').val()) {
                dataInput += '|' + $('#Reasoninput').val();
            }
            dataInput += '}}';
 
            var a = page.revisions[0]['*'];
            if (a.indexOf('{{Report|Example}}') > 1) {
                a = a.replace('*{{Report|Example}}', dataInput);
            } else {
                a = a.replace("\n*{{Report|", dataInput + "\n" + "*{{Report|");
            }
 
            callAPI({
                'minor': 'yes',
                'summary': 'Added report with Quick Report adder.',
                'action': 'edit',
                'title': 'Report test page',
                'basetimestamp': page.revisions[0].timestamp,
                'startimestamp': page.starttimestamp,
                'token': page.edittoken,
                'text': a
            }, 'POST', function (response) {
                if (response.edit.result == 'Success') {
                   document.location.replace(wgScript + '?title=' + encodeURIComponent(wgPageName) + '&action=purge');
                } else {
                    alert('An error occurred while submitting the edit.');
                }
            });
        });
        return false;
    }
 
    var $form = $('<form />');
    $form.submit(ReportInsert);
    var $input = $('<p />');
 
    $input.append($('<label />').css({
        'for': 'Userinput',
        'width': '4em',
        'float': 'left',
        'text - align': 'right',
        'margin - right': '0.5em',
        'display': 'block'
    }).text('User:'));
    $input.append($('<input />').attr({
        'id': 'Userinput',
        'type': 'text',
        'size': 10
    }));
    $input.append($('<p />'));
    $input.append($('<label />').css({
        'for': 'Userinput',
        'width': '4em',
        'float': 'left',
        'text - align': 'right',
        'margin - right': '0.5em',
        'display': 'block'
    }).text('Reason:'));
    $input.append($('<input />').attr({
        'id': 'Reasoninput',
        'type': 'text',
        'size': 10
    }));
    $input.append($('<p />'));
    $input.append($('<input />').attr({
        'id': 'ReportInsertSubmit',
        'type': 'submit'
    }).val('Report user'));
    $form.append($input);
 
    $('#QuickReportAdder').html($form);
});