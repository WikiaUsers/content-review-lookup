/************ stdTemplates ************/
//Adapted from MediaWiki:Common.js/standardeditsummaries.js
//This script is known to not work in Internet Explorer with the RTE enabled. 

window.debug452 = function(out, alert) { if (mw.config.get("wgUserName") == "452") { if (typeof out == "string") console.log(new Date().toJSON()+" "+out); else { console.log(new Date().toJSON()+" non-string to follow."); console.log(out); } if (typeof alert != "undefined") window.alert(out); } }

debug452("start of stdTemplates");

function initStdTemplates() {
        if (!$("#wpTextbox1").length) return; //only run on edit pages.
	if ($('#stdTemplates').length) { //this is a redundant check
		return;
	}
	window.insertTags = function (tagOpen, tagClose, sampleText, selectText) {
		$("#wpTextbox1").textSelection('encapsulateSelection', {
			'pre': tagOpen,
			'peri': sampleText,
			'post': tagClose
		});
	}
	if (!$("#editToolbar").length) {
		debug452("#editToolbar missing");
		$(".mw-editform").before("<div id='editToolbar'></div>");
	}

	$("#editToolbar").prepend($('<select />')
		.attr('id', 'stdTemplates')
		.attr('title', 'Click to select a template')
		.change(function() {
			var lineparts = $(this).val()
				.replace(/\+wgCurRevisionId\+/g, mw.config.get("wgCurRevisionId"))
				.replace(/\+wgPageName\+/g, mw.config.get("wgPageName"))
				.replace(/\\n/g, "\n")
				.split("%");
			if (lineparts.length == 1) 	insertTags(lineparts[0]);
			else if (lineparts.length == 2) insertTags(lineparts[0], lineparts[1]);
			else if (lineparts.length == 3)	insertTags(lineparts[0], lineparts[2], lineparts[1]);

			recentTemplates = localStorage.getItem('recentTemplates');
			if (!recentTemplates) rTArray = new Array(); 
			if (recentTemplates != null) rTArray = recentTemplates.split("\t");
			var text = $('#stdTemplates :selected').text();
			var val = $('#stdTemplates :selected').val();
			rTArray.unshift(text);
			if (rTArray.length > 15) rTArray.pop();
			recentTemplates = unique(rTArray).join("\t");
			localStorage.setItem( 'recentTemplates', recentTemplates);

			if ($("#stdTemplates option").first().next().text() != "Recently used")
			$("#stdTemplates option").first().after("<option value='' disabled=''>Recently used</option>");
			$("#stdTemplates option").first().next().after('<option value="'+val+'">'+text+'</option>');

			$('#stdTemplates option:first-child').prop('selected', true); //reset selection (important)
		})
	);

	function unique(list) {
	  var result = [];
  	  $.each(list, function(i, e) {
	    if ($.inArray(e, result) == -1) result.push(e);
	  });
	  return result;
	}
	function loadStdTemplates() {
	  StdTemplates = localStorage.getItem('StdTemplates');
	  StdTemplatesVersion = localStorage.getItem('StdTemplatesVersion');
	  if (StdTemplatesVersion != 2) localStorage.removeItem('StdTemplates');
	  localStorage.setItem('StdTemplatesVersion', 2);

	  localStorage.removeItem('StdTemplates22-1-26'); //leave this until 2022
	  if (StdTemplates) {
		sTArray = StdTemplates.split("\t");
		for (i in sTArray ) {
			var $delim  = sTArray[i].indexOf(' -- ');
			var tName   = ($delim == -1) ? sTArray[i] : sTArray[i].substring(0, $delim );
			var val     = ($delim == -1) ? sTArray[i] : sTArray[i].substring($delim+4);
			var disable = ($delim == -1) ? 'disabled' : '';
			var $opt = '<option name="'+tName+'" value="' + val + '" ' + disable + '>'+(disable?'':'&nbsp;&nbsp;') + tName + '</option>';
			$("#stdTemplates").append($opt);
		}
		recentTemplates= localStorage.getItem('recentTemplates');
		if (recentTemplates) {
			rTArray = recentTemplates.split("\t");
			recentTemplatesOptions = new Array("<option value='' disabled=''>Recently used</option>");
			for (i in rTArray) {
				var $delim = rTArray[i].indexOf(' -- ');
				if ($delim != -1) var tName = rTArray[i].substring(0, $delim);
				else var tName = rTArray[i];
				tName = tName.replace(/\u00a0/g, "");
				var val = $("#stdTemplates option[name='"+tName+"']").val();
				if (typeof val == "undefined") {
					debug452("Recent template missing "+tName);
					continue;
				}
				recentTemplatesOptions.push('<option value="'+val+'">&nbsp;&nbsp;'+tName+'</option>');
			}
			$("#stdTemplates option").first().after(recentTemplatesOptions);
		}
		$('#stdTemplates option:first-child').prop('selected', true); //reset selection

	  } else {
		$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:StdTemplates',
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': mw.config.get("wgScript"),
		'success': function(data) {
			var lines = data.split("\n"), ignore = { ':': 1, '*': 1,  '<': 1 };
			sSArray = new Array(); 
			for (var i in lines) {
				if (!lines[i].length || ignore[lines[i][0]]) continue; //ignore comments and doc
				sSArray.push(lines[i]);
			}
			StdTemplates = sSArray.join("\t");
			localStorage.setItem( 'StdTemplates', StdTemplates);
			loadStdTemplates();
		}
		});
	  }
	}
	loadStdTemplates();
}

$(function() {
	initStdTemplates();
});