// __NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint smarttabs:true laxbreak:true jquery:true browser:true multistr:true */
/*global mediaWiki */

window.dev = window.dev || {};
/*global dev */
dev.StarRatings = dev.StarRatings || {};

mediaWiki.loader.load('jquery.mustache', null, true);
dev.StarRatings.showStats = (function($, mw) {
	"use strict";
	function showStats(poll, isPagePoll) {
		// Gather the mustache parameters we need for our page template
		var params = {
			// FIXME: This should probably be a Mustache "partial", not really sure how those work though
			title: $.mustache('Rating statistics for {{#isPagePoll}}"{{{pageName}}}{{#pollName}}#{{{.}}}{{/pollName}}"{{/isPagePoll}}{{^isPagePoll}}"{{{pageName}}}"{{#pollName}} ({{{.}}}){{/pollName}}{{/isPagePoll}}', {
				pageName: poll.associatedPageName(),
				pollName: poll.pagePollName(),
				isPagePoll: isPagePoll
			}),
			rows: []
		};
		$.extend(params, poll.stats());
		params.mean = params.mean.toFixed(2);
		var items = poll.items(), votes = poll.votes(), fracs = poll.voteFractions();
		for (var i = 0, len = items.length ; i < len ; ++i) {
			params.rows[i] = {
				name: items[i],
				perc: (fracs[i] * 100).toFixed(2),
				votes: votes[i]
			};
		}

		// TODO: Eliminate the IFRAME. This is just a hack to minimise the amount of rewrite until polishing.
		var $modal = $.showModal(
			params.title,
			'<iframe style="background-color:white; color:black; width: 100%; height: 450px;"></iframe>'
		);

		var $childWin = $modal.find('iframe'),
		    doc = $childWin[0].contentDocument;

		// TODO: Native UI will need Colors to use proper accents.
		doc.write($.mustache(
			'<!DOCTYPE HTML>\
			<html lang="en" dir="ltr">\
			<head>\
			<meta charset="utf-8">\
			<title>{{title}}</title>\
			<style type="text/css">\n\
			* { margin: 0; padding: 0; }\
			body {\
			    margin: 5px;\
			    font-family: Verdana, Helvetica, sans-serif;\
			    font-size: 13px;\
			    background: white;\
			    color: black;\
			}\
			#container {\
			    margin-top: 10px;\
			    padding: 5px;\
			    border: 1px solid #CCC;\
			    border-radius: 10px;\
			}\
			#footer {\
			    display: block;\
			    border: 1px solid #CCC;\
			    border-radius: 4px;\
			    float: right;\
			    padding: 2px;\
			}\
			#footer > li {\
			    display: inline-block;\
			    border-left: 1px solid #CCC;\
			    padding: 2px 10px;\
			}\
			#footer > li:first-child {\
			    border-left: 0;\
			}\
			#modes {\
			    display: inline;\
			}\
			#modes > li {\
			    display: inline;\
			}\
			#modes > li:before {\
			    content: ", "\
			}\
			#modes > li:first-child:before {\
			    content: "";\
			}\
			#tallies {\
			    padding: 0 5px;\
			    width: 100%;\
			}\
			#tallies > * > tr > td,\
			#tallies > * > tr > th {\
			    padding: 3px 0;\
			}\
			#tallies > * > tr > td,\
			#tallies > * > tr > th {\
			    border-top: 1px dashed #DDD;\
			}\
			#tallies > * > tr:first-child > td,\
			#tallies > * > tr:first-child > th {\
				border: 0;\
			}\
			.tally-cell {\
			    text-align: right;\
			}\
			.tally-bar {\
			    background-color: #37B;\
			    box-shadow: 2px 2px 8px #135 inset;\
			    padding: 2px;\
			    color: white;\
			    text-align: center;\
			    float: right;\
			    border-radius: 5px;\
			    line-height: 1.75;\
			    white-space: nowrap;\
			}\
			.tally-name {\
			    text-align: right;\
			    font-weight: bold;\
			}\n\
			</style>\
			</head>\
			<body>\
			<div id="container">\
			 <table id="tallies">\
			  {{#rows}}\
			   <tr>\
			    <td class="tally-cell">{{#votes}}<div class="tally-bar" style="width: {{perc}}%">{{/votes}}<span class="tally-val">{{votes}} ({{perc}}%)</span>{{#votes}}</div>{{/votes}}</td>\
			    <th class="tally-name" scope="row">{{name}}</td>\
			   </tr>\
			  {{/rows}}\
			 </table>\
			 <ul id="footer">\
			  <li>Total Votes: {{totalVotes}}</li>\
			  <li>Mean: {{mean}}</li>\
			  <li>Median: {{median}}</li>\
			  <li>Mode: <ul id="modes">{{#mode}}<li>{{.}}</li>{{/mode}}</ul></li>\
			 </ul>\
			 <div style="clear:both"></div>\
			</div>\
			</body>\
			</html>',
			params
		));
		doc.close();
	}

	return function(poll, isPagePoll) {
		mw.loader.using('jquery.mustache', function() {
			try { // MW blames the module for the exception instead of the callback
				showStats(poll, isPagePoll);
			} catch(e) {}
		});
	};
})(jQuery, mediaWiki);

// </syntaxhighlight>