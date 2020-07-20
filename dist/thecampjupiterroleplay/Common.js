$(document).ready(function STemplateUI() {
  if ( wgPageName == "Musical_cues_in_Young_Justice" ) {
    $(".ogg_player .image").remove();
    }
});

// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
 
/* Wikia Side Rail Social Icons
 * By: [[Madnessfan34537]]
 */
 
function SocialIcons() {
 
    var userArray = wgPageName.split(":");
 
    ;
 
}
 
        if (mw.config.get("wgNamespaceNumber") != "user") {
		addOnloadHook(SocialIcons);
 
}

/* Countdown clock
 * See w:c:dev:Countdown for info and attribution
 * Modifications by  Lunarity
 */
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if (diff<=0) {
    timers[i].firstChild.nodeValue = 'It\'\s out now!';
  return;
  }
 
  // calculate the diff
var tmp, flag;
  left = '';
 
  // days
  tmp = Math.floor(diff/60/60/24);
  if (tmp || flag) {
      left += tmp + 'd, ';
      flag = true;
  }
 
  // hours
  tmp = Math.floor(diff/60/60) % 24;
  if (tmp || flag) {
     left += (tmp) + 'h ';
     flag = true;
  }
 
  // minutes
  tmp = Math.floor(diff/60) % 60;
  if (tmp || flag) {
      left += tmp + 'm ';
      flag = true;
  }
 
  // seconds
  left += (diff%60) + 's';
 
  timers[i].firstChild.nodeValue = left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  // hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  // set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
});
} );


/** <pre>
 * Change <youtube>video</youtube> to {{youtube|video}}
 * Runs when save button is clicked
 */
 
;(function ($, mw) {
 
    'use strict';
 
    function tagSwitch() {
 
        var wikitext = $('#wpTextbox1').html();
 
        wikitext = wikitext.replace(/&lt;youtube&gt;/g, '{{youtube|');
        wikitext = wikitext.replace(/&lt;\/youtube&gt;/g, '}}');
 
        $('#wpTextbox1').html(wikitext);
 
    }
 
    $(function () {
 
        if (mw.config.get('wgAction') !== 'edit') {
            return;
        }
 
        $('#wpSave').click(tagSwitch);
 
    });
 
}(jQuery, mediaWiki));
 
/* <pre> */

/** <pre>
 * YouTube video embedder
 * Injects an iframe, rather than uploading the video to Wikia's video library
 * See http://runescape.wikia.com/wiki/Template:Youtube for further documentation
 */

;(function ($, document) {

    'use strict';

    function injectVideo() {
        var tags = $('.youtube'),
            i,
            contents,
            iframe;

        if (tags.length === 0) {
            return;
        }

        for (i = 0; i < tags.length; i += 1) {
            contents = $(tags[i]).html().split('|');

            // for no arguments in template use
            if (contents[0] === 'ERROR') {
                return;
            }
            
            iframe = document.createElement('iframe');
            iframe.src = 'http://www.youtube.com/embed/' + contents[0];
            iframe.height = contents[1];
            iframe.width = contents[2];
            
            $(tags[i]).html(iframe);
            // reverse the display:none; set in the template
            $(tags[i]).show();
        }

        // hide the original link as there's already one in the player
        $('.original-link').hide();
    }
    
    $(function () {
        injectVideo();
    });

}(this.jQuery, this.document));

/* </pre> */

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data },
                'ADDEPT': { u:'Administrative Services', m:'Administrative Services', f:'Administrative Services' },
		'FMDEPT': { u:'Claiming Department', m:'Claiming Department', f:'Claiming Department' },
		'AMDEPT': { u:'Activity Detection', m:'Activity Detection', f:'Activity Detection' },
		'USDEPT': { u:'User Support', m:'User Support', f:'User Support' },
                'RB': { u:'Rollback', m:'Rollback', f:'Rollback' },
                'CRAT': { u:'Bureaucrat', m:'Bureaucrat', f:'Bureaucrat' },
                'WELDEPT':{ u:'Welcoming Committee', m:'Welcoming Committee', f:'Welcoming Committee' }
	}
};
 
UserTagsJS.modules.custom = {
// Administrative Development Department
'A Son of Hades': ['ADDEPT'],
'TheLittleRabbit':['CRAT','FMDEPT','WELDEPT'],
'AliasKit':['CRAT','FMDEPT'],
'BeyondTheStars':['RB'],
'LillyDaNinja':['RB']
};
 
// Imports
EditIntroButtonText = 'Intro';
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

// Imports
EditIntroButtonText = 'Intro';
importArticles({
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:EditIntroButton/code.js',
        'u:dev:FixWantedFiles/code.js',
        'u:dev:MiniComplete/code.js',
        'u:dev:DupImageList/code.js',
        'u:deadisland:User:Jgjake2/js/DISPLAYTITLE.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:AjaxRC/code.js']
});
 
/* IRClogin div */
$(function() {
    if ($('#IRClogin').length) {
        if (typeof wgUserName == 'undefined') {
            var nick = 'wgusername' + Math.floor(Math.random() * 100);
        } else {
            var nick = wgUserName.replace(/ /g, "_");
        }
        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=CHBRPW-Chat&prompt=true" width="660" height="400" style="border:0;"></iframe>');
    }
})