// ============================================================
// Standard Edit Summaries
// Adapted from https://runescape.wikia.com/wiki/MediaWiki:Common.js/standardeditsummaries.js
// Includes some optimizations from User:Pecoes
// Overhauled by user:452 for saintsrow.wikia.com
// ============================================================

$(function() {
	if ($("label[for=wpSummary]").html() == "Subject/headline:") return;
	if (!$('#wpSummary').size()) return;
	$('#wpSummary').attr('tabindex', '3'); //set tabindex for summaries text area
	$('#wpMinoredit').attr('tabindex', '4'); //set tabindex for minor edit checkbox
	$('#wpSave').attr('tabindex', '5'); //set tabindex for publish button

	$combo = $('<select />')
	  .attr('id', 'stdSummaries')
	  .attr('tabindex', '2')
	  .blur(function() {  $("#stdSummaries").change(); })
	  .keyup(function() { $("#stdSummaries").change(); })
	  .change(function() { 
		if ($('#stdSummaries').val().length && $('#stdSummaries').attr("last") != $('#stdSummaries').val()) {
			$('#stdSummaries').attr("last", $('#stdSummaries').val());
			$('#wpSummary').val($("#wpSummary").html()+$(this).val()); 
		}
	  });
	$("#wpSummary").attr("placeholder", "Summarise your edit, or choose from this list"); 

	$('#wpSummary').after($combo);
	$(".rail-auto-height").resize();
	$('#wpSummary').addClass("hideRightBorder");

	function loadStdSummaries() {
	  stdSummaries = localStorage.getItem('stdSummaries');
	  if (stdSummaries) {
		sSArray = stdSummaries.split("\t");
		for (i in sSArray ) {
			var val = (sSArray[i].indexOf('-- ') == 0) ? sSArray[i].substring(3) : '';
			var text = (sSArray[i].indexOf('-- ') == 0) ? '&nbsp;&nbsp;' + sSArray[i].substring(3) : sSArray[i];
			var disable = (sSArray[i].indexOf('-- ') == 0 || sSArray[i].indexOf('(') == 0) ? '' : 'disabled';
			var $opt = '<option value="' + mw.html.escape(val) + '" ' + mw.html.escape(disable) + '>' + mw.html.escape(text) + '</option>';
			$combo.append($opt);
		}
		recentSummaries = localStorage.getItem('recentsummaries');
		if (recentSummaries) {
			rSArray = recentSummaries.split("\t");
			recentSummariesOptions = new Array("<option disabled='' value=''>Recent Summaries</option>");
			for (i in rSArray ) {
				$addSummary = $("<option />").html(rSArray[i]);
				$addSummary.val($addSummary.html()); //this steps htmlencodes the string
				$addSummary.html("&nbsp;&nbsp;"+$addSummary.val().substring(0, 70)+(($addSummary.val().length>70)?"...":""));
				recentSummariesOptions.push($addSummary);
			}
			$("#stdSummaries option").first().after(recentSummariesOptions);
		}

	  } else {
	    $.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:Stdsummaries',
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
			stdSummaries = sSArray.join("\t");
			localStorage.setItem( 'stdSummaries', stdSummaries);
			loadStdSummaries();
		}
	    });
	  }
	}
	function unique(list) {
	  var result = [];
  	  $.each(list, function(i, e) {
	    if ($.inArray(e, result) == -1) result.push(e);
	  });
	  return result;
	}

	loadStdSummaries();

	$("form#editform").bind("submit", function( event ) {
		if(!$('#wpSummary').val().length) return;
		recentSummaries = localStorage.getItem('recentsummaries');
		if (!recentSummaries) rSArray = new Array(); 
		if (recentSummaries != null) rSArray = recentSummaries.split("\t");
		rSArray.unshift($('#wpSummary').val());
		if (rSArray.length > 10) rSArray.pop();
		recentSummaries = unique(rSArray).join("\t");
		localStorage.setItem( 'recentsummaries', recentSummaries);
	});
});