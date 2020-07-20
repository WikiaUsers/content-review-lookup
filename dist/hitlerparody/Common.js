/* Any JavaScript here will be loaded for all users on every page load. */

// namespaces definition
window.dev = window.dev || {};
window.hpw = window.hpw || {};

/* UserTags configuration, see [[w:c:dev:UserTags]]  */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		//montheditor: { u:'Editor of the Month' }, // unused
		//featured: { u:'Featured' }, // unused
		//templates: { u:'Templates Guru' }, // unused
		//senioreditor: { u:'Senior Editor', title:'This person has made 500 or more edits on this wiki'}
		technician: { 
			u:'Technician', 
			title:'Maintainers of the back-end templates, javascript and stylesheets of this wiki'
		}
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'moderator'];
UserTagsJS.modules.custom = {
	'Mfaizsyahmi': ['technician'],
	'FegeleinParodies': ['technician'],
	'Blakegripling ph': ['technician'],
	'KurwaAntics' : ['technician']
};
UserTagsJS.modules.inactive = 90; // 3 months
/* ========= End of UserTags ========= */

// Message Wall Tags (hope they merge these soon)
window.MessageWallUserTags = {
    tagColor: '#00cc00',
    glow: true,
    glowSize: '15px',
    glowColor: '#7f7',
    users: { 
        'Mfaizsyahmi'   : 'Antic Admin • Diplomat • Trollback',
        'FegeleinParodies': 'Antic Admin • Diplomat • Trollback',
        'Blakegripling ph': 'Antic Admin • Diplomat • Trollback',
        'Evil Robot Goebbels': 'Goebbel-Bot',
        'JennieParker87'  : 'Antic Admin • Diplomat • Trollback',
        'HRP.EpicLee'   : 'Antic Admin • Diplomat • Trollback',
        'KakashiBallZ'  : 'The Architect • Diplomat',
        'Fa3455801'   : 'Antic Admin • Diplomat • Trollback',
        'QuestionTuesdayFTW'   : 'Antic Admin • Diplomat • Trollback',
    }
};

// dev:HighlightUsers // 
highlight = {
    selectAll: false,
    sysop: '#00cc00'
};

// anyone who uses AjaxRC (mfaizsyahmi) will still have highlightusers working poperly
/* BUG: chicken and egg problem */
window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push( function() {
    if (typeof highlightUsers == 'function') highlightUsers();
});

/* Standard edit summary settings */
// Create the sub-namespace for this addon and set some options:
dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'Template:StandardEditSummary'
};

/* dev:railWAM configuration */
window.railWAM = {
    logPage: "Project:WAM Log"
};

/* ********** SocialBlade Widget ********** */
$('.SocialBladeWidget').each(function() {
    var sbname=$(this).attr("data-name");
    $(this).html('<iframe class="sbframe" src="http://widget.socialblade.com/widget.php?v=2&u=' +sbname+ '" style="overflow: hidden; height: 185px; width: 100%; border: 0;" scrolling="no" frameBorder="0"></iframe>').show();
});

/* ********** Notimodule ********** */
var notimoduleTitle = window.notimoduleTitle || 'Bulletin';
var notimodulePagename = window.notimodulePagename || 'Template:Notimodule';
 
var request = new XMLHttpRequest();
request.open("GET", '/wiki/'+ notimodulePagename +'?action=purge', true);
request.send(null);
 
$('#WikiaRail').prepend('<section class="rail-module" id="notimodule"><h2 class="has-icon"><span class="fa fa-list" style="color: rgba(213,212,212,0.75)"></span>&nbsp;&nbsp;'+ notimoduleTitle +'</h2><div></div></section>');
 
if ( wgUserGroups.indexOf("sysop") >= 0 ) {
    $('#notimodule h2').append('&nbsp;<small>(<a href="/wiki/'+ notimodulePagename +'?action=edit">Edit</a>)</small>');
}
 
$('#notimodule > div').load('/wiki/'+ notimodulePagename +'?action=render');
 
/* ********** Live subscriber count ********** */
$('.LiveSubsCount').each(function() {
    var lsc = $(this).data('name');
    $('#WikiaRail').prepend('<iframe height="80px" width="300px" frameborder="0" src="https://akshatmittal.com/youtube-realtime/embed/#!/' + lsc + '" style="border: 0; width:300px; height:80px; background-color: #FFF; margin-bottom: 8px;"></iframe>').show();
    $(this).remove();
});

/* ********** Downfall Scenes successor box ********** */
// 25 sept 15 - adapted to use the lua-generated list
if ( $('.successor-box').length === 0 && $('.navbox.downfallscenes .scenes.list .selflink').length == 1 ) {
	$('.navbox.downfallscenes').before('<div class="scenes-successor"></div>');
	$('div.scenes-successor').load('/wiki/Template:Successor_Box?action=render .successor-box', function(){
		var list = $('.navbox.downfallscenes ol.scenes.list');
		var idx  = $('.selflink', list).parent().index();
		$('table.scenes-successor .cur').html( $('li',list).eq(idx).html() );
		if (idx > 0) $('table.scenes-successor .prev').html( $('li',list).eq(idx-1).html() );
		if (idx < $('li',list).length ) $('table.scenes-successor .next').html( $('li',list).eq(idx+1).html() );
	});
}
// ***************************************************************************

/* Unterganger Infobox award headers show/hide toggle */
if ( $('.UntergangerInfobox .award').length >=3 ) {
    $('.UntergangerInfobox .award-header').append('<div class="award-toggle award-toggle-collapsed" style="float:right">[Show]</div>');
    $('.award-toggle').click( function() {
        if ($(this).hasClass("award-toggle-collapsed")) {
             $(".award").fadeOut();
            $(this).removeClass("award-toggle-collapsed").text('[Show]');
         } else {
            $(".award").fadeIn();
            $(this).addClass("award-toggle-collapsed").text('[Hide]');
        }
    });
    $(".award").hide();
}


/* ************ Template:Deadline ************* */
/* 1 Aug 13: turned into a named function so that it can be triggered anytime */

//function deadlineFlags() {
hpw.deadlineFlags = function() {
	var now = new Date();
	$('.contest-entry-stats').each( function() {
		var deadline = new Date( $(this).attr('data-date') );
		//var deadline = new Date( '25 April 2013' );
		if (deadline.getUTCHours()+':'+deadline.getUTCMinutes()+':'+deadline.getUTCSeconds() == '0:0:0') { 
			deadline.setUTCHours(23,59,59);
		}
		
		var days = Math.floor( (deadline-now)/(24*3600*1000) );
		if ( now > deadline ) {
			$(this).html('<div class="label label-danger" title="The nomination/voting/submission has passed the deadline. &#10('+ deadline.toUTCString() + ')">–</div>');
		} else if ( days <= 3 ) { /* parseInt()? */
			$(this).html('<div class="label label-warning" title="Less than three days until the deadline! &#10('+ deadline.toUTCString() + ')">'+days+'</div>');
		} else {
			$(this).html('<div class="label label-info" title="The nomination/voting/submission is still open. &#10(Deadline: '+ deadline.toUTCString() + ')">'+days+'</div>');
		}
		//$(this).append('<div class="icon icon-clock" title="Deadline: '+ deadline.toLocaleDateString() + '"></div>');
	});
};
deadlineFlags = hpw.deadlineFlags; // synonyms
hpw.deadlineFlags(); // trigger immediately


// Parody feed modifications - turn YT links into embedded players
function checkParodyFeed(){
	if( $('.scrollbox#DPFparodies dl').length) {
		console.log('parody feed loaded!');
		clearInterval(parodyFeedChecker);
		$('.scrollbox#DPFparodies dl dd a[href*="//www.youtube.com/watch?"]').each(function(){
			var vidID = new RegExp("[\\?&]v=([^&#]*)").exec( $(this).attr('href') );
			console.log(vidID);
			$(this).hide().after('<iframe width="250" height="170" src="//www.youtube.com/embed/'+vidID[1]+'" frameborder="0" allowfullscreen></iframe>');
		});
		// $('.scrollbox#DPFparodies dl').after('complete!')
	}
}
if( $('.page-Hitler_Parody_Wiki').length ) {
	console.log('page is Main Page, setting up timer for parody feed...');
	var parodyFeedChecker = setInterval( function(){ checkParodyFeed() }, 500);
}

//move tutorial polls to the bottom of the page
$("#tutorial_poll").appendTo(".mw-content-ltr").show();

// moved here as this should be applied last...
$('a.external').attr({ target: '_blank' });

/** Extra toolbar options ******************************************************
 *  
 *  Description: Adds extra buttons to the old (non-enhanced) editing toolbar.
 *  
 *  Maintainers: [[User:MarkS]], [[User:Voice of All]], [[User:R. Koot]]
 */
 
mw.loader.using( 'mediawiki.action.edit', function() {
	var buttons, i, len;
 
	buttons = [
	{
		'id': "button-redirect",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
		'speedTip': "Redirect",
		'tagOpen': "#REDIRECT [[",
		'tagClose': "]]",
		'sampleText': "Target page name"
	},
	{
		'id': "button-strike",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
		'speedTip': "Strike",
		'tagOpen': "<s>",
		'tagClose': "</s>",
		'sampleText': "Strike-through text"
	},
	{
		'id': "button-enter",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
		'speedTip': "Line break",
		'tagOpen': "<br />",
		'tagClose': "",
		'sampleText': ""
	},
	{
		'id': "button-superscript",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
		'speedTip': "Superscript",
		'tagOpen': "<sup>",
		'tagClose': "</sup>",
		'sampleText': "Superscript text"
	},
	{
		'id': "button-subscript",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
		'speedTip': "Subscript",
		'tagOpen': "<sub>",
		'tagClose': "</sub>",
		'sampleText': "Subscript text"
	},
	{
		'id': "button-small",
		'imageFile': "//upload.wikimedia.org/wikipedia/commons/5/58/Button_small.png",
		'speedTip': "Small",
		'tagOpen': "<small>",
		'tagClose': "</small>",
		'sampleText': "Small text"
	},
	{
		'id': "button-big",
		'imageFile': "//upload.wikimedia.org/wikipedia/commons/5/56/Button_big.png",
		'speedTip': "Big",
		'tagOpen': "<big>",
		'tagClose': "</big>",
		'sampleText': "Big text"
	},
	{
		'id': "button-center",
		'imageFile': "//upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
		'speedTip': "Center",
		'tagOpen': "<center>",
		'tagClose': "</center>",
		'sampleText': "Centered text"
	},
	{
		'id': "button-hide-comment",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
		'speedTip': "Insert hidden Comment",
		'tagOpen': "<!-- ",
		'tagClose': " -->",
		'sampleText': "Comment"
	},
	{
		'id': "button-gallery",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
		'speedTip': "Insert a picture gallery",
		'tagOpen': "\n<gallery>\n",
		'tagClose': "\n</gallery>",
		'sampleText': "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"
	},
	{
		'id': "button-blockquote",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
		'speedTip': "Insert block of quoted text",
		'tagOpen': "<blockquote>\n",
		'tagClose': "\n</blockquote>",
		'sampleText': "Block quote"
	},
	{
		'id': "button-insert-table",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
		'speedTip': "Insert a table",
		'tagOpen': '{| class="wikitable"\n|',
		'tagClose': "\n|}",
		'sampleText': "-\n! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"
	},
	{
		'id': "button-insert-reflink",
		'imageFile': "//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png",
		'speedTip': "Insert a reference",
		'tagOpen': "<ref>",
		'tagClose': "</ref>",
		'sampleText': "Insert footnote text here"
	}
	];
 
	for ( i = 0, len = buttons.length; i < len; i++ ) {
		mw.toolbar.addButton(
			buttons[i].imageFile,
			buttons[i].speedTip,
			buttons[i].tagOpen,
			buttons[i].tagClose,
			buttons[i].sampleText,
			buttons[i].id,
			buttons[i].id
		);
	}
 
});

// SEASONAL BACKGROUND MUSIC
//if ( $.cookie("HPW-nomusic") == null ) $(".WikiaArticle").append('<div id="yolo" style="height:0px;overflow:hidden"><iframe width="280" height="230" src="http://www.youtube.com/embed/6JMvYKrnseI?autoplay=1" frameborder="0"></iframe></div>');

$('.page-TraitorLoxoz #WikiaArticleComments, .page-TraitorLoxoz .wds-button[href=#WikiaArticleComments]').remove(); // Stop harassing TraitorLoxoz. Just leave him alone.