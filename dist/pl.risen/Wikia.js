importScriptPage('MediaWiki:Change.js', 'pl.tes');
importArticles({
    type: 'script',
    articles: [
        "MediaWiki:Common.js/facebookRozwijany.js"	 // FB po prawej stronie
    ]
});
 
/* <pre> */
// ============================================================
// Standard edit summaries
// Source Editor - Original with slight label change
// Visual Editor - Modified by Casualty Wiki from here
// with slight label change
// ============================================================
 
// ====================
// Source Editor
// ====================
 
$(function() {
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
		var val2 = $('#wpSummaryEnhanced,#wpSummary').val();
		if (val != '' && val2 != '' ) {
			$('#wpSummaryEnhanced,#wpSummary').val($('#wpSummaryEnhanced,#wpSummary').val() + ", " + val);
		}
		else {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
 
        $label.prepend('<br />').prepend($combo).prepend('Summaries: ');
 
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'MediaWiki:Stdsummaries',
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function(data) {
			var lines = data.split("\n");
			for (var i in lines) {
				var val = (lines[i].indexOf('-- ') == 0) ? lines[i].substring(3) : '';
				var $opt = $('<option />').val(val).text(lines[i]);
				$combo.append($opt);
			}
		}
	});
})

// Moduł IRC-a
function IRCpanel() {
    $('.WikiaRail .WikiaSearch').after('<section class="module" id="ircpanel"><h1>Kanał IRC</h1><center>Porozmawiaj z innymi edytorami!</center><table style="width: auto; margin: auto;"><tr><td><a href="https://kiwiirc.com/client/irc.freenode.net/wikia-pl.risen"><span class="button">Dołącz</span></a></td><td><a href="http://pl.risen.wikia.com/wiki/Risenpedia:IRC"><span class="button">Pomoc</span></table>');
}