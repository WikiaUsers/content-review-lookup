/* Any JavaScript here will be loaded for all users on every page load. */
(window.dev = window.dev || {}).profileTags = { noHideTags: false };
//LockForums config
window.LockForums = {
    expiryDays: 14,
    lockMessageWalls: true,
    expiryMessage: 'This thread has been archived due to inactivity.'
};
 
//ArchiveBoards config
window.ArchiveBoards = {
    post: true,
    threads: false,
    boards: ['Wikia Updates']
};

// Add [[ Category: Images]] @ images aytomatically
 
if(wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') {
$('#wpUploadDescription').val('[[Category:Images]]');
};
 
//TZclock config
window.TZclockSimpleFormat = true;
 
//Rollback config
window.RollbackWikiDisable = true;
 
//AjaxRC config
window.ajaxRefresh = 30000;
window.ajaxPages = ['Blog:Recent_posts'];
window.ajaxSpecialPages = ['WikiActivity', 'Recentchanges', 'Watchlist', 'Log'];

//RailWAM
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Change color of infoboxes title and headers 
depending of background color */
function piColor() {
	var rgb = $('.pi-title').css('backgroundColor');
	var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	
	var r = colors[1];
	var g = colors[2];
	var b = colors[3];
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	
	if (yiq >= 128) {
		/* Dark text */
		$('.pi-title').css('color', '#fff');
		$('.pi-header').css('color', '#fff');
	} else {
		/* Light text */
		$('.pi-title').css('color', '#fff');
		$('.pi-header').css('color', '#fff');
	}
}

/* Update for color editor like DevTools (works only for title) */
setInterval(piColor, 200);

//Template:USERNAME
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});
 
/* Allows for the embedding of videos from vlive.tv (Base Code - KockaAdmiralac) */
mw.hook('wikipage.content').add(function($content) {
    var current = 0;
    $content.find('.Vlive:not(.loaded)').each(function() {
        var el = document.getElementsByClassName("Vlive")[current];
        var video_id = "https://www.vlive.tv/embed/" + el.getAttribute("data-id") + "?autoPlay=false";
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: el.getAttribute("data-height"),
                scrolling: 'no',
                src: video_id,
                width: el.getAttribute("data-width"),
                allow: "fullscreen",
            })
        ).addClass('loaded');
        current += 1;
    });
});

( function() {
'use strict';

// copy to clipboard
$(function() { // wait for content load (DOMContentLoaded)
  $('.copy-clipboard').each(function () {
    var $this = $(this);
    var $button = $('<button title="Copy to Clipboard">&#xf0ea;</button>');
    $this.append($button);
    $button.click(function () {
      var $content = $this.find('.copy-content');
      $content.children().remove();
      selectElementText($content[0]);
  
      try {
        if (!document.execCommand('copy'))
          throw 42;
        mw.notify('Successfully copied to Clipboard.');
      } catch (err) {
        mw.notify('Copy to Clipboard failed. Please do it yourself.', {type:'error'});
      }
    });
  });
});

function selectElementText(element) {
  var range, selection;    
  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();        
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

/* Fires when DOM is ready */
$( function() {

function importScriptRL(page) {
	// importScriptPage doesn't utilise the resource loader (which minifies scripts). Workaround!
	importArticle({ type: 'script', article: page });
}


/**
 * Pause animations on mouseover of a designated container (.animated-container and .mcui)
 *
 * This is so people have a chance to look at the image and click on pages they want to view.
 */
$( '#mw-content-text' ).on( 'mouseenter mouseleave', '.animated-container, .mcui', function( e ) {
	$( this ).find( '.animated' ).toggleClass( 'animated-paused', e.type === 'mouseenter' );
} );


} );
/* End DOM ready */

}() );

/* for Module:layerMap to toggle visibility of the layers */
$(".layerMapToggleButton").click(function(){
  var id = $(this).attr('data-forid');
  $('#' + id).toggle();
});

/* Rail WAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* RailWAM */
window.railWAM = {
    logPage:"Project:WAM Log/Auto-Statistics",
    loadOnPage:'Special:WikiActivity',
    autoLogForUsers:["User:Kusuo1412"],
    loadOnNamespace:[-1],
};

/* The code below randomly changes text above top navigation from "God's Eyes Wiki" to one from the list */
var wiki_name_number=Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + 1;
var wiki_name_text=["getz meh le duck and u getz nuthin", "Looks like someone didn't follow the rules.", "Ho ho ho! You better have been good!", "Gaze upon my miraculous chocolate.", "How do you like my tricks?", "Your last moments will be...very pleasurable.", "Oh? Who do we have here...? Your energy looks delicious! Won't you share it with me?", "Thanks for visiting our wiki!", "Come again soon...", "Hope you're having a nice stay!", "Make sure to read our guidelines!", "Don't break any rule!", "Check out our affiliates", "Stop by our Community Portal to see what's going on around the wiki", "Read our weekly news article", "Have fun!", "Well, I guess we won't be seeing you again...", "See you! Never!", "Haha", "Oh, My Stars and Garters!", "It seems we have attracted a fellow gamer, I see", "Did you know, Lunime was originally called Cyan Productions?", "Hope you're doing well! Wherever you are...", "Hello!", "Now what do we have here?", "And There Came a Day Unlike Any Other...", "Thwip!", "Champions Charge!"
][wiki_name_number];
var elements=document.getElementsByClassName('fandom-community-header__community-name');
var wiki_name=elements[0];
wiki_name.textContent=wiki_name_text;

/* Translator Credit. Dev Fandom*/
$(function() {
    var config = mw.config.get([
        'wgAction',
        'wgPageContentLanguage',
        'wgUserLanguage'
    ]);
    if (window.UseTranslator === false || config.wgAction !== 'view') {
        return;
    }
    window.UseTranslator = false;

    function click() {
        window.open(new mw.Uri('https://translate.google.com/translate').extend({
            hl: config.wgUserLanguage,
            sl: config.wgPageContentLanguage,
			tl: config.wgUserLanguage,
            u: location.href
        }).toString());
    }
    $('#content').prepend(
        $('<button>', {
            id: 'TranslateButton',
            'class': 'wds-button',
            css: {
                'font-weight': 800,
                width: '6em',
                margin: '5px 0 11px',
                background: 'linear-gradient(to right, #00cdd0, #058d9d, #00cdd0)',
                color:'white',
                textShadow:'0 0 5px #ffffff, 0 0 5px #00cdd0'
            },
            click: click,
            text: 'Translate'
        })
    );
});