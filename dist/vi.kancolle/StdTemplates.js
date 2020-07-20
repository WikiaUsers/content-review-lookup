/************ stdTemplates ************/
//Adapted from MediaWiki:Common.js/standardeditsummaries.js
//This script is known to not work in Internet Explorer with the RTE enabled. 
 
function initStdTemplates(modeswitch) {
        if (!$("#wpTextbox1").size()) return; //only run on edit pages.
	if ($('#stdTemplates').size()) { //this is a redundant check
		$('#EditPageToolbar').unbind('DOMNodeInserted.stdTemplates'); //unbind to avoid duplication
		return;
	}
	var $target = $("#cke_toolbar_source_1 .cke_toolbar_expand"); //#cke_toolbar_source_1 is important.
        if (skin == "monobook") $target = $("#toolbar");
	if (!$target.size()) { 
		if (modeswitch) return; //abort if triggered by mode switch
		//toolbar not found, RTE enabled, add listener
		$('#EditPageToolbar').unbind('DOMNodeInserted.stdTemplates'); //unbind to avoid duplication
		$('#EditPageToolbar').bind('DOMNodeInserted.stdTemplates', function(event) { //listen for mode switch
			initStdTemplates(1);
		});
		return;
	} else { 
		$('#EditPageToolbar').unbind('DOMNodeInserted.stdTemplates'); //unbind to avoid duplication
	}
	$selectTemplates = $('<select />')
		.attr('id', 'stdTemplates')
		.attr('title', 'Click để chọn Template')
		.change(function() {
			var lineparts = $(this).val()
				.replace(/\+wgCurRevisionId\+/g, wgCurRevisionId)
				.replace(/\+wgPageName\+/g, wgPageName)
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
			rTArray.unshift(text+" -- "+val);
			if (rTArray.length > 15) rTArray.pop();
			recentTemplates = unique(rTArray).join("\t");
			localStorage.setItem( 'recentTemplates', recentTemplates);
 
			if ($("#stdTemplates option").first().next().text() != "Chọn gần đây")
			$("#stdTemplates option").first().after("<option value='' disabled=''>Chọn gần đây</option>");
			$("#stdTemplates option").first().next().after('<option value="'+val+'">'+text+'</option>');
 
			$('#stdTemplates option:first-child').prop('selected', true); //reset selection (important)
		});
 
	if (skin == "monobook") {
	  $target.append($selectTemplates);
	  /* No adjustments necessary. */
 
	} else {
	  $target.before($selectTemplates);
 
	  if ($target.position().left == -10) {
	    $("#stdTemplates").css({"margin-left":-5})
	                      .css({"width": 22});
 
	    $("#stdTemplates").bind("hover", function(event) {
	      $("#stdTemplates").css({"margin-left":-($("#stdTemplates").position().left - 20)})
	                       .css({"width": ($("#stdTemplates").position().left - 3)});
	      $("#stdTemplates").unbind("hover");
	    });
 
	  } else {
	    $("#stdTemplates").css({"margin-left":-($("#stdTemplates").position().left - 20)})
	                    .css({"width": ($("#stdTemplates").position().left - 3)});
	  }
	}
	function unique(list) {
	  var result = [];
  	  $.each(list, function(i, e) {
	    if ($.inArray(e, result) == -1) result.push(e);
	  });
	  return result;
	}
	function loadStdTemplates() {
	  StdTemplates = localStorage.getItem('StdTemplates');
	  if (StdTemplates) {
		sTArray = StdTemplates.split("\t");
		for (i in sTArray ) {
			var $delim  = sTArray[i].indexOf(' -- ');
			var val     = ($delim == -1) ? sTArray[i] : sTArray[i].substring($delim+4);
			var text    = ($delim == -1) ? sTArray[i] : "&nbsp;&nbsp;"+sTArray[i].substring(0, $delim );
			var disable = ($delim == -1) ? 'disabled' : '';
			var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
			$selectTemplates.append($opt);
		}
		recentTemplates= localStorage.getItem('recentTemplates');
		if (recentTemplates) {
			rTArray = recentTemplates.split("\t");
			recentTemplatesOptions = new Array("<option value='' disabled=''>Chọn gần đây</option>");
			for (i in rTArray) {
				var $delim = rTArray[i].indexOf(' -- ');
				if ($delim == -1) continue;
				var text = rTArray[i].substring(0, $delim);
				var val = rTArray[i].substring($delim+4);
				recentTemplatesOptions.push('<option value="'+val+'">'+text+'</option>');
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
		'url': wgScript,
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