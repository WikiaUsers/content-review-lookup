/* Any JavaScript here will be loaded for all users on every page load. */

importScript('MediaWiki:Functions.js');
// This contains the current, April 2012 code, now
// found at [[starwars:MediaWiki:Common.js]].  Grunny no longer
// keeps this code in a separate file, but it seems to be 
// working just as well to have it separately as to have it
// imbedded in THIS file.  Since it's fairly arcane, mundane code
// it may be better to have it out of the way in its own file.

/* =================
   BEGIN PRELOADS 
   ================= */

/* =================
   Edit summaries 
   from runescape.wikia.com
   ================= */
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
		if (val != '') {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
 
        $label.prepend('<br />').prepend($combo).prepend('Summaries: ');
 
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:Stdsummaries',
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
})


/* =================
 * jQuery version of fillPreloads
 * by Grunny at starwars.wikia.com
 * ================= */

function fillPreloads() {
 
	if( !$( '#lf-preload' ).length ) {
		return;
	}
	var	preloadOptionsHtml = '',
		$preloadOptionsList;
 
	$( '#lf-preload' ).attr( 'style', 'display: block' );
 
	$.get( wgScript, { title: 'Template:Stdpreloads', action: 'raw', ctype: 'text/plain' }, function( data ) {
		var lines = data.split( '\n' );
		for( var i = 0; i < lines.length; i++ ) {
			var value = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : "";
			preloadOptionsHtml += '<option value="' + value + '">' + lines[i] + '</option>';
		}
		$preloadOptionsList = $( '<select />' ).attr( 'id', 'stdSummaries' ).html( preloadOptionsHtml ).change( function() {
			var value = $( this ).val();
			if ( value !== '' ) {
				value = 'Template:' + value + '/preload';
				value = value.replace( ' ', '_' );
				$.get( wgScript, { title: value, action: 'raw', ctype: 'text/plain' }, function( data ) {
					insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
				} );
			}
		} );
 
		$( '#lf-preload-cbox' ).html( $preloadOptionsList );
	} );
 
	$( '#lf-preload-pagename' ).html( '<input type="text" class="textbox" />' );
	$( '#lf-preload-button' ).html( '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />' );
 
}
 
function doCustomPreload() {
	var value = $( '#lf-preload-pagename > input' ).val();
	value = value.replace( ' ', '_' );
	$.get( wgScript, { title: value, action: 'raw', ctype: 'text/plain' }, function( data ) {
		insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
	} );
}

/* =============
   Title rewrite 
   jQuery version and new wikia skin fixes by Grunny
   ==============
   This is what powers 
   [[template:title]],
   principally allowing
   for italic page titles
   ============== */
 
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}
 
	if( $('#title-meta').length == 0 ) {
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

importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('EditIntroButton/code.js', 'dev');
//importScriptPage('DisplayClock/code.js', 'dev');
importScriptPage('DupImageList/code.js', 'dev');

var ArchiveToolConfig = { 
   archiveListTemplate: 'ArchCat',
   archivePageTemplate: 'ArchPage',
   archiveSubpage: 'Archive',
   userLang: true
}; 
importScriptPage('ArchiveTool/code.js', 'dev');


/* =============
   MOS box 
   from Brickipedia
   ==============
   This is the little box underneath the
   search bar and article tally, which has the 
   Seal of Rassilon in it.
   ===============
   Keep at end of common.js, but before
   any addOnloadHooks.
   ================ */

importScript('MediaWiki:Common.js/mosbox.js');

/* ================
   TABLE stuff 
   ================ */

//$("tr:odd").addClass("zebra-stripe"); (adversely affects TOCs for a reason I've not yet determined)

$("table").delegate('td','mouseover mouseleave', function(e) {
    if (e.type == 'mouseover') {
      $(this).parent().addClass("hover");
      $("colgroup").eq($(this).index()).addClass("hover2");
    }
    else {
      $(this).parent().removeClass("hover");
      $("colgroup").eq($(this).index()).removeClass("hover2");
    }
});


/* ================
   Other imports
   ================ */

importScriptPage('FixWantedFiles/code.js', 'dev');
importScriptPage('Countdown/code.js', 'dev');

/*  ================
    addOnloadHook area
    ================
    Necessary for calling to life functions
    specified elsewhere in this document.
    ================= */

addOnloadHook( rewriteTitle );

require_once("$IP/extensions/Countdown/Countdown.php");

<?php
 
$wgExtensionFunctions[] = "wfCountdownExtension";
$wgExtensionCredits['parserhook'][] = array(
                'version'     => '1.2',
                'name'        => 'Countdown',
                'author'      => array('Peter Strömberg', 'Paul Grinberg'),
                'email'       => 'pez@pezius.com, gri6507 at yahoo dot com',
                'url'         => 'http://www.mediawiki.org/wiki/Extension:Countdown',
                'description' => 'adds <tt>&lt;countdown&gt;</tt> tags',
                );
 
function wfCountdownExtension() {
        global $wgParser;
        $wgParser->setHook( "countdown", "renderCountdown" );
}
 
function renderCountdown($input, $argv, &$parser) {
#function renderCountdown($input, $argv, $parser) { # If you're on php5
        global $wgCountdown;
        $localDebug = 0;
 
        $name = uniqid('countdown');
        $targetTime = "12/24/2007 7:00 PM UTC-0500";
 
        foreach ($argv as $key => $value) {
                switch ($key) {
                        case 'name':
                                $name = $value;
                                break;
                        case 'time':
                                $targetTime = $value;
                                break;
                        default :
                                wfDebug( __METHOD__.": Requested '$key ==> $value'\n" );
                                break;
                }
        }
 
        if ($localDebug) {
                wfDebug( __METHOD__.": input is '$input'\n\n" );
        }
 
        $counter  = <<<END
<!-- CountDown Instance -->
<script type="text/javascript">
var $name = new countdown("$name");
$name.Name = "$name";
$name.TargetDate = "$targetTime";
</script>
<script language="javascript">$name.Setup()</script>
END;
 
        $counter .= $parser->unstrip($parser->recursiveTagParse(ereg_replace('<([DHMS])>',
                    '<span id="' . $name . '_\1">\1</span>',$input)), $parser->mStripState) . "\n";
 
        $javascript  = <<<END
<!-- Script for CountDown -->
<script type="text/javascript">
/*      Author:         Robert Hashemian (http://www.hashemian.com/)
Modified by:    Munsifali Rashid (http://www.munit.co.uk/)
Modified by:    Peter Strömberg (http://halowiki.net/wiki/User:PEZ) */
function countdown(obj) {
this.obj                = obj;
this.Name               = "clock";
this.TargetDate         = "12/31/2020 5:00 AM UTC+0100";
this.CountActive        = true;
this.Calcage            = cd_Calcage;
this.CountBack          = cd_CountBack;
this.Setup              = cd_Setup;
}
function cd_Calcage(secs, num1, num2) {
s = ((Math.floor(secs/num1))%num2).toString();
if (s.length < 2) s = "0" + s;
return (s);
}
function cd_CountBack(secs) {
try { document.getElementById(this.Name + "_D").innerHTML = this.Calcage(secs,86400,100000); } catch(e) {};
try { document.getElementById(this.Name + "_H").innerHTML = this.Calcage(secs,3600,24); } catch(e) {};
try { document.getElementById(this.Name + "_M").innerHTML = this.Calcage(secs,60,60); } catch(e) {};
try { document.getElementById(this.Name + "_S").innerHTML = this.Calcage(secs,1,60); } catch(e) {};
if (this.CountActive) setTimeout(this.obj +".CountBack(" + (secs-1) + ")", 990);
}
function cd_Setup() {
var ddiff       = new Date((new Date(this.TargetDate)) - (new Date()));
this.CountBack(Math.floor(ddiff.valueOf() / 1000));
}
</script>
END;
        $output = '';
        if ($wgCountdown != 1) {
                $output .= $javascript;
                $wgCountdown = 1;
        }
        $output .= $counter;
 
        return $output;
}


<script language="JavaScript">
TargetDate = "12/31/2020 5:00 AM";
BackColor = "palegreen";
ForeColor = "navy";
CountActive = true;
CountStepper = -1;
LeadingZero = true;
DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
FinishMessage = "It is finally here!";
</script>
<script language="JavaScript" src="http://scripts.hashemian.com/js/countdown.js"></script>