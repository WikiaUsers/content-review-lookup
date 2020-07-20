/* Any JavaScript here will be loaded for all users on every page load. */

/* Main page */
/** NavButton hover animations **/
jQuery(document).ready(function($) {	
	$(".NavButton").mouseleave(function(){
		var item = $(this).find('#imove');
		var topAttr = item.attr('data-top');
		item.animate({ top: topAttr }, {queue:false, duration:300});
	}).mouseenter(function(){
		var item = $(this).find('#imove');
		var topAttr = item.attr('data-top');
		var curTop = item.css('top');
		typeof topAttr === "undefined" ? item.attr('data-top', curTop) : "";
		item.animate({ top: '0px' }, {queue:false, duration:300});
	});
	$(window).resize(function() {
		$(".NavButton #imove").removeAttr('style');
		$(".NavButton #imove").removeAttr('data-top');
	});
});

/** Poll text **/
$(document).ready(function() {
	$(".ajax-poll .total").parent().addClass("pollText");
});

/** Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
  */
 
var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();

/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar)
{
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}
 

/** Standard Edit Summary *************************************
 *
 *  Functionally identical to the Saints Row Wiki version.
 *  Updated to handle comments and tabindexes by user:452 for saintsrow.wikia.com and justcause.wikia.com. - lines beginning with these characters: : * < are ignored.
 */
 
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
	$("#wpSummary").attr("placeholder", "Add a summary to your edit..."); 
 
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

// Countdown
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/** Autoplay videos **/
$(window).load(function() {
	$('.mw-content-text .autoplay .play-circle').each(function() {
		$(this).click();
	});
});
function autoRefresh(){
    window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
    window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
    window.ajaxRefresh = 30000;
    $.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
        'ajaxrc-refresh-text': 'AJAX',
        'ajaxrc-refresh-hover': 'Enable page auto-refresh',
    }}}}});
}