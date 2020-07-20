/* $(function() {
        if (skin == 'oasis'){
            var $label = $('#edit_enhancements_toolbar #wpSummaryLabel');
	    if (!$label.size()) {
	    	    return;
	    }
        }

        if (skin == 'monobook'){
	    var $label = $('.editOptions #wpSummaryLabel');
	    if (!$label.size()) {
	    	    return;
	    }
        }

	$combo = $('<select />').attr('id', 'stdSummaries').change(function() {
		var val = $(this).val();
		if (val != '') {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
 
        $label.prepend('<br />').prepend($combo).prepend('Summaries: ');

	$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:Rasional penggunaan adil',
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function(data) {
			var lines = data.split("\n");
			for (var i in lines) {
				var val = (lines[i].indexOf('-- ') == 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') == 0) ? '&nbsp;&nbsp;' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') == 0 || lines[i].indexOf('(') == 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
}) */

function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
return importScriptURI(url);
}

addOnloadHook(toggleInit);
 
//edit buttons
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inuyasha/ms/images/7/7a/A-upper-macron.png",
        "speedTip": "Tambah huruf besar Ā",
        "tagOpen": "Ā",
        "tagClose": "",
        "sampleText": ""
    };   
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inuyasha/ms/images/6/65/A-lower-macron.png",
        "speedTip": "Tambah huruf kecil ā",
        "tagOpen": "ā",
        "tagClose": "",
        "sampleText": ""
    };   
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inuyasha/ms/images/a/ac/U-upper-macron.png",
        "speedTip": "Tambah huruf besar Ū",
        "tagOpen": "Ū",
        "tagClose": "",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inuyasha/ms/images/e/ef/U-lower-macron.png",
        "speedTip": "Tambah huruf kecil ū",
        "tagOpen": "ū",
        "tagClose": "",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inuyasha/ms/images/1/1a/O-upper-macron.png",
        "speedTip": "Tambah huruf besar Ō",
        "tagOpen": "Ō",
        "tagClose": "",
        "sampleText": ""
    };   
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inuyasha/ms/images/0/0f/O-lower-macron.png",
        "speedTip": "Tambah huruf kecil ō",
        "tagOpen": "ō",
        "tagClose": "",
        "sampleText": ""
    };   
}
 
var ShowHideConfig = { autoCollapse: 0};
importScriptPage('ShowHide/code.js', 'dev');