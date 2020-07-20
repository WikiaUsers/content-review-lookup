/*
$('.jcConfig').each(function() {
	var lines = $(this).text().split(($(this).text().indexOf('\r') != -1) ? '\r' : '\n');
	var template = '';
	var formId = '';
	var resultId = '';
	var hs = [];
	var tplParams = [];
	var acInputs = [];
	var suggestNs = [];
 
	// Generate a globally unique ID for an input
	function getGuid(inputId) {
		return formId + resultId + inputId;
	}
 
	// Give an error in the results area
	// TODO For errors on parsing a config, put the error after the config section
	function showError(str) {
		$('#' + resultId).empty().append($('<span />').addClass('jcError').text(str));
	}



/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { u: 'Administrator' },
		inactive: { u: 'Inactive' },
		bureaucrat: { u: 'Manager', order:-1/0 },
		mod: { u: 'Moderator' },
		'autoconfirmed users': { u: 'Editors', order:1/10 }
	}
	
};

var WikiaNotificationMessage = "Want to become an editor? Please visit the <a href='http://forums.osrune.com/index.php?showforum=70' target='_blank'>forums</href> for more information!";
var WikiaNotificationexpiry = 20;

userReasonDefault = '<option value="Default reason">Select a reason</option>';

window.MessageWallUserTags = {
    font: 'bold',
    tagColor: '#1aa3a3',
    glow: true,
    glowSize: '18px',
    glowColor: '#1aa3a3',
    users: {
        'Soyakii': 'Manager',
        'Pvm_Blueboy': 'Manager',
        'DeliveryD' : 'Manager',
        'SauerPauer': 'Administrator',
        'OtterSpace': 'Rollback',
        'Makkyurem': 'Rollback',
        'Master535': 'Rollback',
        'MasterWand90': 'Rollback',
        'Mitunzz': 'Rollback',
        'OSR_Teacher': 'Rollback',
        'Nick_rsps': 'Rollback',
        'BrewingsRSPS': 'Rollback',
        'Zodyy' : 'Rollback',
        'Ary_Bee': 'Rollback'

    }
};
PurgeButtonText = 'Refresh';
importArticles({
    type: "script",
    articles: [
        "u:dev:Insertables/code.js",
        'w:c:dev:UserTags/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:FloatingToc/code.js',
        'w:c:dev:RevealAnonIP/code.js',
        'u:dev:WikiaNotification/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:User_Rights_Reasons_Dropdown/code.js',
        'u:dev:UserRightsRecord/code.js',
        'u:dev:HighlightUsers/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:AjaxBlock/code.js',
        'u:dev:HeaderLinks/code.js',
        'u:dev:MediaWiki:PurgeButton/code.js',
        'u:dev:Standard_Edit_Summary/code.js'
    ]
});

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
 
window.dev.editSummaries = {
     css: false,
     select: 'Template:Stdsummaries'
};

window.ajaxRefresh = 30000;
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';


window.RevealAnonIP = {
    permissions : ['bureaucrat', 'administrator', 'sysop']
};

 
highlight = {
    selectAll: false,
    founder: '#1aa3a3',
    sysop : '#1aa3a3',
    bureaucrat: '#1aa3a3',
    rollback: '#1aa3a3',
    mod: '#1aa3a3',
    'autoconfirmed user': '#1aa3a3',
    'new account': '#1aa3a3',
    users: { 
     
 
    }
};

/* <pre> */
 
$('.jcConfig').each(function() {
	var lines = $(this).text().split(($(this).text().indexOf('\r') != -1) ? '\r' : '\n');
	var template = '';
	var formId = '';
	var resultId = '';
	var hs = [];
	var tplParams = [];
	var acInputs = [];
	var suggestNs = [];
 
	// Generate a globally unique ID for an input
	function getGuid(inputId) {
		return formId + resultId + inputId;
	}
 
	// Give an error in the results area
	// TODO For errors on parsing a config, put the error after the config section
	function showError(str) {
		$('#' + resultId).empty().append($('<span />').addClass('jcError').text(str));
	}
 
	// Parse config
	for (var i in lines) {
		var temp = lines[i].split('=', 2);
 
		if (temp.length != 2) {
			continue;
		}
 
		var vals = temp[1].split('|');
 
		for (var j in vals) {
			vals[j] = $.trim(vals[j]);
		}
 
		switch ($.trim(temp[0])) {
			case 'template':
				template = vals[0];
			break;
			case 'form':
				formId = vals[0];
			break;
			case 'result':
				resultId = vals[0];
			break;
			case 'suggestns':
				suggestNs = vals[0].split(',');
			break;
			case 'param':
				tplParams.push({name: vals[0], label: (vals[1] == '') ? vals[0] : vals[1], def: vals[2], type: vals[3], range: vals[4]});
			break;
		}
	}
 
	$form = $('<form />').attr({'action': '#', 'id': 'jcForm' + formId}).submit(function() {
		function dispResult(response) {
			$('#' + formId + ' .jcSubmit input').val('Submit').removeAttr('disabled');
			$('#bodyContent #' + resultId + ',#WikiaArticle #' + resultId).empty().removeClass('jcError').html(response.parse.text['*']);
			$( 'table.sortable' ).tablesorter()
		}
 
		function validRange(x, range) {
			if (range === null) {
				return true;
			}
			var parts = range.split('-');
			if (parts[0] != '' && x < parseInt(parts[0])) {
				return false;
			}
 
			if (parts[1] != '' && x > parseInt(parts[1])) {
				return false;
			}
 
			return true;
		}
 
		function loadTemplate() {
			code += '}}';
			$('#' + formId + ' .jcSubmit input').val('Loading...').attr('disabled', 'disabled');
 
			$.ajax({
				data: {
					action: 'parse',
					text: code,
					prop: 'text',
					title: template,
					format: 'json'
				},
				dataType: 'json',
				type: 'POST',
				url: wgScriptPath + '/api.php',
				success: dispResult,
				error: function(xhr, error) {
					$('#' + formId + ' .jcSubmit input').val('Submit').removeAttr('disabled');
					showError(error);
				},
				timeout: window.calcTimeoutLength||10000 // msec
			});
		}
 
		var code = '{{' + template;
		var formError = false;
 
		for (var i in tplParams) {
			var val = '';
 
			if (tplParams[i].type == 'fixed' || tplParams[i].type == 'hidden') {
				val = tplParams[i].def;
			} else {
				var $input = $('#' + getGuid(tplParams[i].name));
				val = $input.val();
				if (tplParams[i].type == 'int') val = val.split(',').join('')
 
				if (	(tplParams[i].type == 'hs' && tplParams[i].range == 'yes' && val == '') || (tplParams[i].type == 'int' && (val.search(/^-?[0-9]+$/) || !validRange(val, tplParams[i].range))) ||
					(tplParams[i].type == 'number' && (val.search(/^-?[.0-9]+$/) || !validRange(val, tplParams[i].range))) ) {
					$input.addClass('jcInvalid');
					formError = true;
				} else {
					$input.removeClass('jcInvalid');
				}
 
				if (tplParams[i].type == 'hs') {
					hs.push(tplParams[i]);
				}
			}
 
			code += '|' + tplParams[i].name + '=' + val;
		}
 
		if (formError) {
			showError('One or more fields contains an invalid value.');
		} else {
			if (hs.length > 0) {
				i = 0;
				var name = $('#' + getGuid(hs[i].name)).val();
				if( name != '' ) {
					$.ajax({url:"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fservices.runescape.com%2Fm%3Dhiscore%2Findex_lite.ws%3Fplayer%3D"+name+"%22&format=xml'&callback=?",
						dataType: "json",
						async: false,
					    success: function(data) {
					    	if( data.results[0] ) {
					            code += '|' + hs[i].name + '_data = ' + $.trim($(data.results[0]).text()).replace(/\s+/g,'_');
					            loadTemplate();
						    } else {
						   		if (tplParams[i].range != 'yes') {
						   	    	showError("The player '" + name + "' does not exist, is banned or unranked. Please enter the data manually.");
						   		} else {
						   			showError("The player '" + name + "' does not exist, is banned or unranked. Please enter a valid player name.");
					    		}
					    	}
					    },
					    error: function(xhr, error) {
							$('#' + formId + ' .jcSubmit input').val('Submit').removeAttr('disabled');
							showError(error);
						},
						timeout: 10000 // msec
					});
				} else {
					loadTemplate();
				}
			} else {
				loadTemplate();
			}
		}
 
		return false;
	});
 
	for (var i in suggestNs) {
		var $input = $('<input />').attr({'type': 'hidden', 'name': 'ns' + suggestNs[i]}).val('1');
		$form.append($input);
	}
 
	var $table = $('<table />').addClass('wikitable jcTable');
 
	for (var i in tplParams) {
		if (tplParams[i].type == 'hidden') {
			continue;
		}
 
		var guid = getGuid(tplParams[i].name);
 
		var $tr = $('<tr />');
		$tr.append($('<th />').append($('<label />').attr('for', guid).text(tplParams[i].label)));
		var $td = $('<td />');
		if (tplParams[i].type == 'fixed') {
			$td.text(tplParams[i].def);
		} else {
			if (tplParams[i].type == 'select') {
				var $select = $('<select />').attr({name: guid, id: guid});
				var opts = tplParams[i].range.split(',');
				for (var j in opts) {
					var $option = $('<option />').val(opts[j]).text(opts[j]);
					if (opts[j] == tplParams[i].def) {
						$option.attr('selected', 'selected');
					}
					$select.append($option);
				}
				$td.append($select);
			} else {
				$input = $('<input />').attr({type: 'text', name: guid, id: guid, value: tplParams[i].def});
				$td.append($input);
 
				if (tplParams[i].type == 'article') {
					acInputs.push(guid);
				}
			}
		}
		$tr.append($td);
		$table.append($tr);
	}
 
	var $tr = $('<tr />');
	var $td = $('<td />').addClass('jcSubmit').attr({colSpan: '2'});
	$td.append($('<input />').attr({type: 'submit', value: 'Submit'}));
	$tr.append($td);
	$table.append($tr);
 
	$form.append($table);
	$('#bodyContent #' + formId + ',#WikiaArticle #' + formId).empty().append($form);
 
	// Enable suggest on article fields
	for (var i in acInputs) {
		os_enableSuggestionsOn(acInputs[i], 'jcForm' + formId);
	}
});
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:DisplayClock/code.js',
        'MediaWiki:Snow.js',
        // ...
    ]
});
/* </pre> */

/* Custom edit buttons for source mode
 * by: [[User:Soyakii|Soyakii]]
 */
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/osrune-rsps/images/3/37/Construction.png/revision/latest?cb=20160605120107",
		"speedTip": "Under Construction",
		"tagOpen": "{{Under Construction}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/osrune-rsps/images/f/ff/Crafting.png/revision/latest?cb=20160605120108",
		"speedTip": "Improve",
		"tagOpen": "{{Improve}} ",
		"tagClose": "",
		"sampleText": ""};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/osrune-rsps/images/f/fe/Stub.png/revision/latest?cb=20160704081132",
		"speedTip": "Stub",
		"tagOpen": "{{Stub}} ",
		"tagClose": "",
		"sampleText": ""};
}