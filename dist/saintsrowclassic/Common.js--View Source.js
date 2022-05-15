alert("test mode is working");

/**
 * Custom implementation of the "View Source" script, incorporating parts of these scripts:
 * https://dev.wikia.com/wiki/View_Source
 * https://mathmagician.wikia.com/wiki/User:Mathmagician/GlobalScripts.js
 *
 * Unlike those scripts, this version work in monobook.
 */

if (typeof debug452 == "function") debug452("start of View_Source test ");

$(function () {
	(window.dev = window.dev || {}).viewSource = { loadSource:true }; //prevents the other script from loading if it hasn't already.
	$("#view-source").parent().remove(); //removes the other script's button if has already been added.
	$("#viewSource").parent().remove(); //prevent duplicate instances of this script
	$("#viewSource-style").remove(); //remove duplicate style
 
	if (mw.config.get("wgNamespaceNumber") !== -1 && mw.config.get("wgNamespaceNumber") < 1000) {
		$('head').append('<style id="viewSource-style">.viewSource #mw-content-text,.viewSource #WikiaRail,#viewSource-div{display:none}.viewSource .article-with-rail,.viewSource #viewSource-div{display:block}#viewSource-pre{white-space: pre-wrap;}#viewSource-div input{vertical-align:top}.viewSource #WikiaMainContent{width: 100%;}</style>');
 
		$("#ca-history").closest("ul").append(
		  $('<li><a id="viewSource">View Source</a></li>')
		  .attr('title', 'View wikitext source')
	          .click(function () {
			if (document.getElementById('viewSource-pre') === null) {
				// insert content
				$.get('/index.php?curid=' + mw.config.get("wgArticleId") + '&oldid=' + mw.config.get("wgRevisionId") + '&action=raw&maxage=0&smaxage=0', function (wikitext) {
 					var pre = $("<pre>", {id:"viewSource-pre" }).text(wikitext);
					var div = $("<div>", {id:"viewSource-div" }).append(pre);
 					$("#mw-content-text").before(div);
				});
			}

 			if ($('body').hasClass('viewSource')) {	// display article
				$('body').removeClass('viewSource');
				$("#viewSource").text("View Source");
			} else { // display source
				$('body').addClass('viewSource');
				$("#viewSource").text("View Article");
			}
		  })
		);
	}
});