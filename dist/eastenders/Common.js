/* Any JavaScript here will be loaded for all users on every page load. */


importArticles({
    type: 'script',
    articles: [
        'u:dev:YoutubePlayer/code.js'
    ]
});

/* purge button */
function CreatePurgeButton() {
	$('section header div.buttons a:first-child').before('<a style="margin:0 3px 3px 0" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&action=purge" title="Purge the current page" accesskey="b" class="wikia-button secondary" id="purgeButton" data-id="purgebutton">Purge</a>');
}

/* logs button */
function CreateLogsButton() {
	$('section header div.buttons a:first-child').before('<a data-id="logs" class="wikia-button secondary" accesskey="g" title="Special:Logs" href="/wiki/Special:Logs">Logs</a>');
}

/*Recent changes button */
function CreateRecentChangesButton() {
	$('section header div.buttons a:first-child').before('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
} 

// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}

	if( $('#title-meta').length === 0 ) {
		return;
	}

	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}

// END JavaScript title rewrite

/* add contribs to user menu - 2/1/11 */

function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">My contributions</a></li>');
}

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

/** Collapsible tables (From [[wikipedia:MediaWiki:Common.js]] *******************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if ( Button.firstChild.data == collapseCaption ) {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
function createCollapseButtons()
{
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );
 
    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], "collapsible" ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            addHandler( ButtonLink,  "click", new Function( "evt", "collapseTable(" + tableIndex + " ); return killEvt( evt );") );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        } 
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}


function ImagesOnWiki() {
    $('.LatestPhotosModule details span.fixedwidth').html('images on this wiki');
}

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.2
// **************************************************
// Embed with a span class="countdowntimer", eg:
// <span class="countdowntimer" style="display:none;">April 12 2008 00:00:01 AM EST</span>
// default replacement text can accompany, eg: <span class="notimer">*javascript required*</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // catch negative dates
  if(diff<0) {
    diff = -diff;
    var left = 'ago since';
  } else {
    var left = 'until';
  }

  // calcuate the diff
  left = (diff%60) + ' seconds ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  tim[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  var untimers = getElementsByClassName(document, 'span', 'notimer');
  for(var i=0;i < untimers.length; i++) {
    untimers[i].style.display = 'none';    
  }
  timers = getElementsByClassName(document, 'span', 'countdowntimer');  //global
  tim = new Array(); // generic holder for the timeouts, global
  if(timers.length === 0) return;
  for(var i=0;i < timers.length; i++) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    timers[i].firstChild.nodeValue = '0 days 0 hours 0 minutes 0 seconds';
    timers[i].style.display = 'inline';
    updatetimer(i);  //start it up
  }
}

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

var quizName = "Quiz";
var quizLang = "en";
var resultsTextArray = [ 
	"Text displayed after the user completes the quiz with the LOWEST score",
	"Text displayed after the user completes the quiz somewhere between the lowest and highest scores. Feel free to add more than one of these (separated by commas and inside double quotes)",
	"Text displayed after the user completes the quiz with the HIGHEST score" 
];

var questions = [
 
	["This is the first question",
	"The CORRECT answer to question 1",
	"An INCORRECT answer to question 1",
	"Another INCORRECT answer to question 1",
	"Yet Another INCORRECT answer to question 1"], 
 
	["This is the second question, feel free to add as many questions as you like",
	"The CORRECT answer to question 2",
	"An INCORRECT answer to question 2",
	"Another INCORRECT answer to question 2"],
 
	["This is the third question",
	"The CORRECT answer to question 3",
	"An INCORRECT answer to question 3"]
 
];

$.post(mw.config.get('wgArticlePath').replace('$1', 'Template:CatchupCode4'), {
    action: 'raw'
}, function(text) {
    var iframe = $('<iframe width="640" height="360" frameborder="0"/>'),
        src = 'http://www.bbc.co.uk/programmes/$1/player';
    if (text.search(/[^0-9a-z]/) === -1) {
        iframe.attr('src', src.replace('$1', text));
        $("#iframeloader-Preview-Video").replaceWith(iframe);
    }
});

$("#iframeloader-EpisodePreview").replaceWith('<iframe class="frame" scrolling="no" src="http://www.bbc.co.uk/programmes/articles/5R9PFhPQGHpYZzhByTH6cMb/previews-and-catch-ups" style="border: 0px none; margin-left: 0px; height: 1000px; margin-top: -354px; margin-bottom: -240px; width: 664px; margin-left:-32px">');

$("#iframeloader-ScriptPeek").replaceWith('<iframe class="frame" scrolling="no" src="http://www.bbc.co.uk/programmes/b006m86d" style="border: none; overflow: hidden; margin: 15px auto; max-width: 600px; max-height:200px">');

$("#iframeloader-CryBaby").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01b2fm4/player"></iframe>');

$("#iframeloader-TamwarVotes").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p02r9v66/player"></iframe>');

$("#iframeloader-25thTour").replaceWith('<embed type="application/x-shockwave-flash" src="http://www.bbc.co.uk/emp/10player.swf?revision=18269_21576" width="640" height="360" style="" id="bbc_emp_embed_charlieg_25" name="bbc_emp_embed_charlieg_25" bgcolor="#000000" quality="high" wmode="default" allowfullscreen="true" allowscriptaccess="always" flashvars="embedReferer=http://www.bbc.co.uk/eastenders/twentyfive/&amp;embedPageUrl=http://www.bbc.co.uk/eastenders/twentyfive/charlieg_25.shtml&amp;domId=charlieg_25&amp;config_settings_skin=black&amp;playlist=http://www.bbc.co.uk/eastenders/includes/homepage/config/xml/tour.xml"></object>');

$("#iframeloader-MasalaMasood").replaceWith('<embed type="application/x-shockwave-flash" src="http://www.bbc.co.uk/emp/releases/iplayer/revisions/617463_618125_4/617463_618125_4_emp.swf" width="640" height="360" style="" id="smp-flashSWFemp_8013268" name="smp-flashSWFemp_8013268" bgcolor="#000000" quality="high" wmode="default" allowfullscreen="true" allowscriptaccess="always" flashvars="embedReferer=http://news.bbc.co.uk/1/hi/entertainment&embedPageUrl=http://news.bbc.co.uk/1/hi/entertainment/8013268.stm&domId=emp_8013268&playlist=http://news.bbc.co.uk/media/emp/8010000/8013200/8013268.xml"></object>');

$("#iframeloader-Tour").replaceWith('<embed type="application/x-shockwave-flash" src="http://www.bbc.co.uk/emp/releases/iplayer/revisions/617463_618125_4/617463_618125_4_emp.swf" width="640" height="360" style="" id="smp-flashSWFemp_8013268" name="smp-flashSWFemp_8013268" bgcolor="#000000" quality="high" wmode="default" allowfullscreen="true" allowscriptaccess="always" flashvars="embedReferer=http://news.bbc.co.uk/1/hi/entertainment&embedPageUrl=http://news.bbc.co.uk/1/hi/entertainment/8013232.stm&domId=emp_8013232&playlist=http://news.bbc.co.uk/media/emp/8010000/8013200/8013232.xml"></object>');

$("#iframeloader-Marsden1").replaceWith('<embed type="application/x-shockwave-flash" src="http://www.bbc.co.uk/emp/10player.swf?revision=18269_21576" width="512" height="323" style="" id="bbc_emp_embed_emp2" name="bbc_emp_embed_emp2" bgcolor="#000000" quality="high" wmode="default" allowfullscreen="true" allowscriptaccess="always" flashvars="embedReferer=http://www.bbc.co.uk/eastenders/features/marsden6.shtml&amp;embedPageUrl=http://www.bbc.co.uk/eastenders/features/marsden.shtml&amp;domId=emp2&amp;config_settings_skin=black&amp;playlist=http://www.bbc.co.uk/eastenders/includes/homepage/config/xml/marsden_1.xml"></object>');

$("#iframeloader-Marsden2").replaceWith('<embed type="application/x-shockwave-flash" src="http://www.bbc.co.uk/emp/10player.swf?revision=18269_21576" width="512" height="323" style="" id="bbc_emp_embed_emp2" name="bbc_emp_embed_emp2" bgcolor="#000000" quality="high" wmode="default" allowfullscreen="true" allowscriptaccess="always" flashvars="embedReferer=http://www.bbc.co.uk/eastenders/features/marsden6.shtml&amp;embedPageUrl=http://www.bbc.co.uk/eastenders/features/marsden2.shtml&amp;domId=emp2&amp;config_settings_skin=black&amp;playlist=http://www.bbc.co.uk/eastenders/includes/homepage/config/xml/marsden_2.xml"></object>');

$("#iframeloader-Marsden4").replaceWith('<embed type="application/x-shockwave-flash" src="http://www.bbc.co.uk/emp/10player.swf?revision=18269_21576" width="512" height="323" style="" id="bbc_emp_embed_emp2" name="bbc_emp_embed_emp2" bgcolor="#000000" quality="high" wmode="default" allowfullscreen="true" allowscriptaccess="always" flashvars="embedReferer=http://www.bbc.co.uk/eastenders/features/marsden6.shtml&amp;embedPageUrl=http://www.bbc.co.uk/eastenders/features/marsden4.shtml&amp;domId=emp2&amp;config_settings_skin=black&amp;playlist=http://www.bbc.co.uk/eastenders/includes/homepage/config/xml/marsden_4.xml"></object>');

$("#iframeloader-Marsden5").replaceWith('<embed type="application/x-shockwave-flash" src="http://www.bbc.co.uk/emp/10player.swf?revision=18269_21576" width="512" height="323" style="" id="bbc_emp_embed_emp2" name="bbc_emp_embed_emp2" bgcolor="#000000" quality="high" wmode="default" allowfullscreen="true" allowscriptaccess="always" flashvars="embedReferer=http://www.bbc.co.uk/eastenders/features/marsden6.shtml&amp;embedPageUrl=http://www.bbc.co.uk/eastenders/features/marsden5.shtml&amp;domId=emp2&amp;config_settings_skin=black&amp;playlist=http://www.bbc.co.uk/eastenders/includes/homepage/config/xml/marsden_5.xml"></object>');

$("#iframeloader-Marsden6").replaceWith('<embed type="application/x-shockwave-flash" src="http://www.bbc.co.uk/emp/10player.swf?revision=18269_21576" width="512" height="323" style="" id="bbc_emp_embed_emp2" name="bbc_emp_embed_emp2" bgcolor="#000000" quality="high" wmode="default" allowfullscreen="true" allowscriptaccess="always" flashvars="embedReferer=http://www.bbc.co.uk/eastenders/features/marsden5.shtml&amp;embedPageUrl=http://www.bbc.co.uk/eastenders/features/marsden6.shtml&amp;domId=emp2&amp;config_settings_skin=black&amp;playlist=http://www.bbc.co.uk/eastenders/includes/homepage/config/xml/marsden_6a.xml"></object>');

$("#iframeloader-Marsden7").replaceWith('<embed type="application/x-shockwave-flash" src="http://www.bbc.co.uk/emp/10player.swf?revision=18269_21576" width="512" height="323" style="" id="bbc_emp_embed_emp2" name="bbc_emp_embed_emp2" bgcolor="#000000" quality="high" wmode="default" allowfullscreen="true" allowscriptaccess="always" flashvars="embedReferer=http://www.bbc.co.uk/eastenders/features/marsden5.shtml&amp;embedPageUrl=http://www.bbc.co.uk/eastenders/features/marsden7.shtml&amp;domId=emp2&amp;config_settings_skin=black&amp;playlist=http://www.bbc.co.uk/eastenders/includes/homepage/config/xml/marsden_7c.xml"></object>');

$("#iframeloader-Marsden8").replaceWith('<embed type="application/x-shockwave-flash" src="http://www.bbc.co.uk/emp/10player.swf?revision=18269_21576" width="512" height="323" style="" id="bbc_emp_embed_emp2" name="bbc_emp_embed_emp2" bgcolor="#000000" quality="high" wmode="default" allowfullscreen="true" allowscriptaccess="always" flashvars="embedReferer=http://www.bbc.co.uk/eastenders/features/marsden5.shtml&amp;embedPageUrl=http://www.bbc.co.uk/eastenders/features/marsden8.shtml&amp;domId=emp2&amp;config_settings_skin=black&amp;playlist=http://www.bbc.co.uk/eastenders/includes/homepage/config/xml/marsden_8.xml"></object>');

$("#iframeloader-Marsden9").replaceWith('<embed type="application/x-shockwave-flash" src="http://www.bbc.co.uk/emp/10player.swf?revision=18269_21576" width="512" height="323" style="" id="bbc_emp_embed_emp2" name="bbc_emp_embed_emp2" bgcolor="#000000" quality="high" wmode="default" allowfullscreen="true" allowscriptaccess="always" flashvars="embedReferer=http://www.bbc.co.uk/eastenders/features/marsden5.shtml&amp;embedPageUrl=http://www.bbc.co.uk/eastenders/features/marsden9.shtml&amp;domId=emp2&amp;config_settings_skin=black&amp;playlist=http://www.bbc.co.uk/eastenders/includes/homepage/config/xml/marsden_9.xml"></object>');

$("#iframeloader-LucysKiller").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p02kd8sb/player"></iframe>');

$("#iframeloader-FarewelltoPeggy").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p03vhkqf/player"></iframe>');

$("#iframeloader-RickyandBianca").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://media.myspace.com/play/video/eastenders-ricky-and-bianca-2002-5418409-5418409"></iframe>');

$("#iframeloader-2011").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00r6vvt/player"></iframe>');

$("#iframeloader-2012").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p014378x/player"></iframe>');

$("#iframeloader-Red1").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00k57mt/player"></iframe>');

$("#iframeloader-Red2").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00k57q1/player"></iframe>');

$("#iframeloader-Red3").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00pxh9p/player"></iframe>');

$("#iframeloader-Red4").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00wdchw/player"></iframe>');

$("#iframeloader-Red5").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01kl1c9/player"></iframe>');

$("#iframeloader-TamwarTalesEpisode1").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01d4277/player"></iframe>');

$("#iframeloader-TamwarTalesEpisode2").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01dgr4y/player"></iframe>');

$("#iframeloader-TamwarTalesEpisode3").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01dsc0l/player"></iframe>');

$("#iframeloader-TamwarTalesEpisode4").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01dwchc/player"></iframe>');

$("#iframeloader-TamwarTalesBehindTheScenes").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01fkmhl/player"></iframe>');

$("#iframeloader-KimsPalace1").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00zwqxw/player"></iframe>');

$("#iframeloader-KimsPalace2").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00zmsvr/player"></iframe>');

$("#iframeloader-KimsPalace3").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01074nw/player"></iframe>');

$("#iframeloader-KimsPalace4").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p010cqkd/player"></iframe>');

$("#iframeloader-KimsPalace5").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0112lsh/player"></iframe>');

$("#iframeloader-LaurensDiary1").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00bhdfb/player"></iframe>');

$("#iframeloader-LaurensDiary2").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00bjsr5/player"></iframe>');

$("#iframeloader-LaurenDiary3").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00bsdmm/player"></iframe>');

$("#iframeloader-LaurensDiary4").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00c0kfp/player"></iframe>');

$("#iframeloader-LaurensDiary5").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00c0ks7/player"></iframe>');

$("#iframeloader-LaurensDiary6").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00c5qqj/player"></iframe>');

$("#iframeloader-LaurensDiary7").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00c5qx8/player"></iframe>');

$("#iframeloader-LaurensDiary8").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00cgb2x/player"></iframe>');

$("#iframeloader-LaurensDiary9").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p019hvs3/player"></iframe>');

$("#iframeloader-LaurensDiary10").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p019hvxk/player"></iframe>');

$("#iframeloader-LaurensDiary11").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p018z5k7/player"></iframe>');

$("#iframeloader-LaurensDiary12").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p018z5bn/player"></iframe>');

$("#iframeloader-LaurensDiary13").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l7t73/player"></iframe>');

$("#iframeloader-LaurensDiary14").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00lj8dc/player"></iframe>');

$("#iframeloader-LaurensDiary15").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00qb4yt/player"></iframe>');

$("#iframeloader-UnderSuspicion1").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00m63pq/player"></iframe>');

$("#iframeloader-UnderSuspicion2").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00mb4m4/player"></iframe>');

$("#iframeloader-UnderSuspicion3").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00mm88m/player"></iframe>');

$("#iframeloader-UnderSuspicion4").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00mhmtt/player"></iframe>');

$("#iframeloader-UnderSuspicion5").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00lvn7b/player"></iframe>');

$("#iframeloader-E20-S1-Ep1").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005xmyh/player"></iframe>');

$("#iframeloader-E20-S1-Ep2").replaceWith('<iframe width="640" height="360" frameborder="0"src="http://www.bbc.co.uk/programmes/p005y634/player"></iframe>');

$("#iframeloader-E20-S1-Ep3").replaceWith('<iframe width="640" height="360" frameborder="0"src="http://www.bbc.co.uk/programmes/p005yzsj/player"></iframe>');

$("#iframeloader-E20-S1-Ep4").replaceWith('<iframe width="640" height="360" frameborder="0"src="http://www.bbc.co.uk/programmes/p005zg1w/player"></iframe>');

$("#iframeloader-E20-S1-Ep5").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00605z3/player"></iframe>');

$("#iframeloader-E20-S1-Ep6").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0060c6b/player"></iframe>');

$("#iframeloader-E20-S1-Ep7").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0060r2z/player"></iframe>');

$("#iframeloader-E20-S1-Ep8").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0061wrv/player"></iframe>');

$("#iframeloader-E20-S1-Ep9").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0062cjk/player"></iframe>');

$("#iframeloader-E20-S1-Ep10").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0062wcr/player"></iframe>');

$("#iframeloader-E20-S1-Ep11").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0063br6/player"></iframe>');

$("#iframeloader-E20-S1-Ep12").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0063w72/player"></iframe>');

$("#iframeloader-E20-S2-Ep1").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009w4ch/player"></iframe>');
 
$("#iframeloader-E20-S2-Ep2").replaceWith('<iframe width="640" height="360" frameborder="0"src="http://www.bbc.co.uk/programmes/p009x1fd/player"></iframe>');
 
$("#iframeloader-E20-S2-Ep3").replaceWith('<iframe width="640" height="360" frameborder="0"src="http://www.bbc.co.uk/programmes/p00b0v6v/player"></iframe>');
 
$("#iframeloader-E20-S2-Ep4").replaceWith('<iframe width="640" height="360" frameborder="0"src="http://www.bbc.co.uk/programmes/p00b2dcs/player"></iframe>');
 
$("#iframeloader-E20-S2-Ep5").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b4x7p/player"></iframe>');
 
$("#iframeloader-E20-S2-Ep6").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b4yqt/player"></iframe>');
 
$("#iframeloader-E20-S2-Ep7").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b97bd/player"></iframe>');
 
$("#iframeloader-E20-S2-Ep8").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b9wb4/player"></iframe>');
 
$("#iframeloader-E20-S2-Ep9").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00bdhgc/player"></iframe>');
 
$("#iframeloader-E20-S2-Ep10").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00bgc05/player"></iframe>');
 
$("#iframeloader-E20-S3-Ep1").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01wth4w/player"></iframe>');
 
$("#iframeloader-E20-S3-Ep2").replaceWith('<iframe width="640" height="360" frameborder="0"src="http://www.bbc.co.uk/programmes/p01wth1y/player"></iframe>');
 
$("#iframeloader-E20-S3-Ep3").replaceWith('<iframe width="640" height="360" frameborder="0"src="http://www.bbc.co.uk/programmes/p01wtgz3/player"></iframe>');
 
$("#iframeloader-E20-S3-Ep4").replaceWith('<iframe width="640" height="360" frameborder="0"src="http://www.bbc.co.uk/programmes/p01wtgww/player"></iframe>');
 
$("#iframeloader-E20-S3-Ep5").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01wtgv6/player"></iframe>');
 
$("#iframeloader-E20-S3-Ep6").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01wtgqw/player"></iframe>');
 
$("#iframeloader-E20-S3-Ep7").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01wtgnp/player"></iframe>');
 
$("#iframeloader-E20-S3-Ep8").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01wtgjm/player"></iframe>');
 
$("#iframeloader-E20-S3-Ep9").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01wtgfh/player"></iframe>');

$("#iframeloader-E20-S3-Ep10").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01wtgc8/player"></iframe>');

$("#iframeloader-E20-S3-Ep11").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01wtg9r/player"></iframe>');

$("#iframeloader-E20-S3-Ep12").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01wth6b/player"></iframe>');

$("#iframeloader-E20-S3-Ep13").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01wth7y/player"></iframe>');

$("#iframeloader-E20-S3-Ep14").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01wthdt/player"></iframe>');

$("#iframeloader-E20-S3-Ep15").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p01wthks/player"></iframe>');


$("#iframeloader-E20-Clips-S1-1").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005qv11/player"></iframe>');

$("#iframeloader-E20-Clips-S1-2").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005qvc4/player"></iframe>');

$("#iframeloader-E20-Clips-S1-3").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005qvm7/player"></iframe>');

$("#iframeloader-E20-Clips-S1-4").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005qvn9/player"></iframe>');

$("#iframeloader-E20-Clips-S1-5").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005qvvj/player"></iframe>');

$("#iframeloader-E20-Clips-S1-6").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005qxp7/player"></iframe>');

$("#iframeloader-E20-Clips-S1-7").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005xny7/player"></iframe>');

$("#iframeloader-E20-Clips-S1-8").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005xp0q/player"></iframe>');

$("#iframeloader-E20-Clips-S1-9").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005zh7v/player"></iframe>');

$("#iframeloader-E20-Clips-S1-10").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005xp1f/player"></iframe>');

$("#iframeloader-E20-Clips-S1-11").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00607zc/player"></iframe>');

$("#iframeloader-E20-Clips-S1-12").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0060tfm/player"></iframe>');

$("#iframeloader-E20-Clips-S1-13").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005xp54/player"></iframe>');

$("#iframeloader-E20-Clips-S1-14").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0062vvq/player"></iframe>');

$("#iframeloader-E20-Clips-S1-15").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0062vwj/player"></iframe>');

$("#iframeloader-E20-Clips-S1-16").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005xpf6/player"></iframe>');

$("#iframeloader-E20-Clips-S1-17").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0063fdm/player"></iframe>');

$("#iframeloader-E20-Clips-S1-18").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005y3pw/player"></iframe>');

$("#iframeloader-E20-Clips-S1-19").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005y3sk/player"></iframe>');

$("#iframeloader-E20-Clips-S1-20").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005zhv1/player"></iframe>');

$("#iframeloader-E20-Clips-S1-21").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0060qlp/player"></iframe>');

$("#iframeloader-E20-Clips-S1-22").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0060r01/player"></iframe>');

$("#iframeloader-E20-Clips-S1-23").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0060r1h/player"></iframe>');

$("#iframeloader-E20-Clips-S1-24").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0062b1s/player"></iframe>');

$("#iframeloader-E20-Clips-S1-25").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0063cgz/player"></iframe>');

$("#iframeloader-E20-Clips-S1-26").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005y4g0/player"></iframe>');

$("#iframeloader-E20-Clips-S1-27").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005y4lb/player"></iframe>');

$("#iframeloader-E20-Clips-S1-28").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p005z0bd/player"></iframe>');

$("#iframeloader-E20-Clips-S1-29").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p006082n/player"></iframe>');

$("#iframeloader-E20-Clips-S1-30").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0060qw5/player"></iframe>');

$("#iframeloader-E20-Clips-S1-31").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0062vzn/player"></iframe>');

$("#iframeloader-E20-Clips-S1-32").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0063f59/player"></iframe>');

$("#iframeloader-E20-Clips-S2-1").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p0092mm9/player"></iframe>');

$("#iframeloader-E20-Clips-S2-2").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009l5qx/player"></iframe>');

$("#iframeloader-E20-Clips-S2-3").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009l5w7/player"></iframe>');

$("#iframeloader-E20-Clips-S2-4").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009l637/player"></iframe>');

$("#iframeloader-E20-Clips-S2-5").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009l675/player"></iframe>');

$("#iframeloader-E20-Clips-S2-6").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009vw35/player"></iframe>');

$("#iframeloader-E20-Clips-S2-7").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009x0ts/player"></iframe>');

$("#iframeloader-E20-Clips-S2-8").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b0g0h/player"></iframe>');

$("#iframeloader-E20-Clips-S2-9").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b4wd1/player"></iframe>');

$("#iframeloader-E20-Clips-S2-10").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b6qks/player"></iframe>');

$("#iframeloader-E20-Clips-S2-11").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b95rh/player"></iframe>');

$("#iframeloader-E20-Clips-S2-12").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b9tvb/player"></iframe>');

$("#iframeloader-E20-Clips-S2-13").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00bdg58/player"></iframe>');

$("#iframeloader-E20-Clips-S2-14").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00bgbp6/player"></iframe>');

$("#iframeloader-E20-Clips-S2-15").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009vwt6/player"></iframe>');

$("#iframeloader-E20-Clips-S2-16").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b2cs9/player"></iframe>');

$("#iframeloader-E20-Clips-S2-17").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b6rtg/player"></iframe>');

$("#iframeloader-E20-Clips-S2-18").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b9vgp/player"></iframe>');

$("#iframeloader-E20-Clips-S2-19").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00bdh6g/player"></iframe>');

$("#iframeloader-E20-Clips-S2-20").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00bggbv/player"></iframe>');

$("#iframeloader-E20-Clips-S2-21").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009w20c/player"></iframe>');

$("#iframeloader-E20-Clips-S2-22").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009x14h/player"></iframe>');

$("#iframeloader-E20-Clips-S2-23").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b0zqd/player"></iframe>');

$("#iframeloader-E20-Clips-S2-24").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b2dmh/player"></iframe>');

$("#iframeloader-E20-Clips-S2-25").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b4zn5/player"></iframe>');

$("#iframeloader-E20-Clips-S2-26").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b96js/player"></iframe>');

$("#iframeloader-E20-Clips-S2-27").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b9tkh/player"></iframe>');

$("#iframeloader-E20-Clips-S2-28").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00bdfmn/player"></iframe>');

$("#iframeloader-E20-Clips-S2-29").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009d0wx/player"></iframe>');

$("#iframeloader-E20-Clips-S2-30").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009d0yh/player"></iframe>');

$("#iframeloader-E20-Clips-S2-31").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009fkwg/player"></iframe>');

$("#iframeloader-E20-Clips-S2-32").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b1qb8/player"></iframe>');

$("#iframeloader-E20-Clips-S2-33").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b2dk9/player"></iframe>');

$("#iframeloader-E20-Clips-S2-34").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b968f/player"></iframe>');

$("#iframeloader-E20-Clips-S2-35").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00bfp41/player"></iframe>');

$("#iframeloader-E20-Clips-S2-36").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00g8xpw/player"></iframe>');

$("#iframeloader-E20-Extra-Series-2-1").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009w0p9/player"></iframe>');

$("#iframeloader-E20-Extra-S2-2").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009vzwg/player"></iframe>');

$("#iframeloader-E20-Extra-S2-3").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009x206/player"></iframe>');

$("#iframeloader-E20-Extra-S2-4").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p009x1v1/player"></iframe>');

$("#iframeloader-E20-Extra-S2-5").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b6s19/player"></iframe>');

$("#iframeloader-E20-Extra-S2-6").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00b9vpf/player"></iframe>');

$("#iframeloader-E20-Extra-S2-7").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00bdgl1/player"></iframe>');

$("#iframeloader-E20-Extra-S2-8").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00bgbxq/player"></iframe>');

$("#iframeloader-E20-Clips-S3-1").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00k9g9b/player"></iframe>');

$("#iframeloader-E20-Clips-S3-2").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00k7r0z/player"></iframe>');

$("#iframeloader-E20-Clips-S3-3").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00k7mvm/player"></iframe>');

$("#iframeloader-E20-Clips-S3-4").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00k7tm7/player"></iframe>');

$("#iframeloader-E20-Clips-S3-5").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kq4xv/player"></iframe>');

$("#iframeloader-E20-Clips-S3-6").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kqz1w/player"></iframe>');

$("#iframeloader-E20-Clips-S3-7").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kqz32/player"></iframe>');

$("#iframeloader-E20-Clips-S3-8").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00krjwy/player"></iframe>');

$("#iframeloader-E20-Clips-S3-9").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kx487/player"></iframe>');

$("#iframeloader-E20-Clips-S3-10").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l79bs/player"></iframe>');

$("#iframeloader-E20-Clips-S3-11").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kknfh/player"></iframe>');

$("#iframeloader-E20-Clips-S3-12").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00km2p3/player"></iframe>');

$("#iframeloader-E20-Clips-S3-13").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kmstj/player"></iframe>');

$("#iframeloader-E20-Clips-S3-14").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kpjnd/player"></iframe>');

$("#iframeloader-E20-Clips-S3-15").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00krjrf/player"></iframe>');

$("#iframeloader-E20-Clips-S3-16").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00ksj92/player"></iframe>');

$("#iframeloader-E20-Clips-S3-17").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00ksj92/player"></iframe>');

$("#iframeloader-E20-Clips-S3-18").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kvjmr/player"></iframe>');

$("#iframeloader-E20-Clips-S3-19").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kxyw8/player"></iframe>');

$("#iframeloader-E20-Clips-S3-20").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l1df5/player"></iframe>');

$("#iframeloader-E20-Clips-S3-21").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l3mxg/player"></iframe>');

$("#iframeloader-E20-Clips-S3-22").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l3ly7/player"></iframe>');

$("#iframeloader-E20-Clips-S3-23").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l4j2j/player"></iframe>');

$("#iframeloader-E20-Clips-S3-24").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l735w/player"></iframe>');

$("#iframeloader-E20-Clips-S3-25").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l80zf/player"></iframe>');

$("#iframeloader-E20-Clips-S3-26").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l81m8/player"></iframe>');

$("#iframeloader-E20-Clips-S3-27").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kknc0/player"></iframe>');

$("#iframeloader-E20-Clips-S3-28").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kx691/player"></iframe>');

$("#iframeloader-E20-Clips-S3-29").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kx6hp/player"></iframe>');

$("#iframeloader-E20-Clips-S3-30").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l65qh/player"></iframe>');

$("#iframeloader-E20-Clips-S3-31").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l75jy/player"></iframe>');

$("#iframeloader-E20-Clips-S3-32").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kqwv9/player"></iframe>');

$("#iframeloader-E20-Clips-S3-33").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kv018/player"></iframe>');

$("#iframeloader-E20-Clips-S3-34").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kwj4c/player"></iframe>');

$("#iframeloader-E20-Clips-S3-35").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kx67h/player"></iframe>');

$("#iframeloader-E20-Clips-S3-36").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l1bc4/player"></iframe>');

$("#iframeloader-E20-Clips-S3-37").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l2xz2/player"></iframe>');

$("#iframeloader-E20-Clips-S3-38").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l2ysl/player"></iframe>');

$("#iframeloader-E20-Clips-S3-39").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l63lt/player"></iframe>');

$("#iframeloader-E20-Clips-S3-40").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l7wcg/player"></iframe>');

$("#iframeloader-E20-Clips-S3-41").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l9k9f/player"></iframe>');

$("#iframeloader-E20-Clips-S3-42").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l9k8d/player"></iframe>');

$("#iframeloader-E20-Clips-S3-43").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kknp4/player"></iframe>');

$("#iframeloader-E20-Clips-S3-44").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00klzm9/player"></iframe>');

$("#iframeloader-E20-Clips-S3-45").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kzgsx/player"></iframe>');

$("#iframeloader-E20-Clips-S3-46").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l81v9/player"></iframe>');

$("#iframeloader-E20-Clips-S3-47").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l8mhp/player"></iframe>');

$("#iframeloader-E20-Clips-S3-48").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00khjvf/player"></iframe>');

$("#iframeloader-E20-Clips-S3-49").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00kgqtr/player"></iframe>');

$("#iframeloader-E20-Clips-S3-50").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l7xym/player"></iframe>');

$("#iframeloader-E20-Clips-S3-51").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l806r/player"></iframe>');

$("#iframeloader-E20-Clips-S3-52").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l9qg4/player"></iframe>');

$("#iframeloader-E20-Clips-S3-53").replaceWith('<iframe width="640" height="360" frameborder="0" src="http://www.bbc.co.uk/programmes/p00l8kzg/player"></iframe>');

$("#iframeloader-Quiz").replaceWith('<iframe width="640" height="715" frameborder="0" src="http://www.poll-maker.com/Q1ZGZ3B"></iframe>');