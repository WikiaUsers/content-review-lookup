/* Import */
PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');

InactiveUsers = { days: 30 };
importScriptPage('InactiveUsers/code.js', 'dev');

importArticles({
    type: "script",
    articles: [
        "u:dev:Countdown/code.js",
        "u:dev:ReferencePopups/code.js",
        "u:dev:AutoEditDropdown/code.js",
        "u:dev:OasisToolbarButtons/code.js",
        "u:dev:BackToTopButton/code.js",
        "u:dev:SignatureCheck/code.js"
    ]
});

/* displayTimer */
importScript('MediaWiki:Common.js/displayTimer.js');

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* Timer */
$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});

/* Tooltip */
function textTip(){
	if ($(".noTextTip").length) return;
	$("a[title]>img:first-child").each(function(){$(this).parent().addClass("texttip")});
  $(".texttip").tooltip({
    content: function() {
          var text = $( this ).attr("title");
          var s = "";
          var t = text.split("||");
          if (t.length==2) {
            s = "<div style='font-weight: bold;'>"+t[0]+"</div>"+t[1];
          } else {
            s = t[0];
          }
          if (s.indexOf("No.")>=0) {
            s = s.replace("　 ","<br>").replace("（","<br>").replace("）","").replace(" Skill:","<br>Skill:");
          }
          return s;
        },
    position: {
      my: "center top+40",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "ui-tooltip-arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });
}

/*********************************************************************************/
/* sliders using jquery by Dragon Age wiki User:Tierrie . All credit goes to him. */
/*********************************************************************************/
 
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://monsterhunter.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");

mw.loader.using( ['jquery.ui.tabs'], function() { 
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
});

// Custom Special:[Multiple]Upload UI
	if (({
		Upload: 1,
		MultipleUpload: 1
	})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		pageScriptList.push(
			'MediaWiki:Common.js/FairUseUpload.js',
			'MediaWiki:Common.js/FixMultipleUpload.js' // Fix the Special:MultipleUpload page
		);
	}