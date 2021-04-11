/* ######################################################################### */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Most scripts can be refered to http://dev.wikia.com */
/* ######################################################################### */


/* ######################################################################### */
/* Wiki log setting
/* ######################################################################### */

window.ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Log"];
window.ajaxRefresh = 20000; /* 20 seconds */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
        bot: { u:'WX-78', link:'Project:Bots' },
        bureaucrat: { u:'Nightmare Throne', link:'Project:Bureaucrats' },
        chatmoderator: { u:'Spokesman of Wes', link:'Project:Custodians' },
        "content-moderator": { u:'Wisdom of Wickerbottom', link:'Project:Custodians'},
        inactive: { u:'Wilson will miss you' },
        rollback: { u:'Shadow Hand', link:'Project:Rollback' },
        custodian: { u:'Custodian', link:'Project:Custodians' },
        sysop: { u:'Admin', link:'Project:Administrators' },
        threadmoderator: { u:'Courage of Wigfrid', link:'Project:Custodians' },
	}
};
UserTagsJS.modules.mwGroups = ['bot', 'bureaucrat', 'chatmoderator','content-moderator', 'sysop', 'inactive', 'rollback', 'bannedfromchat', 'sysop', 'threadmoderator'];
UserTagsJS.modules.inactive = 30; // 30 days

/* ######################################################################### */
/* END Wiki log setting
/* ######################################################################### */


/* ######################################################################### */
/* Blog and Forum control setting */
/* ######################################################################### */

window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days. The conversation is considered over. There is no need to comment.",
    nonexpiryCategory: "Never archived blogs"
}; 

window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This forum has been automatically archived because its most recent comment is over <expiryDays> days old.",
    warningDays: 25,
    warningMessage: "This forum is now <actualDays> days old; please do not comment unless it is absolutely necessary. This forum will archive automatically when the last comment is <expiryDays> days old.",
    banners: false,
    ignoreDeletes: true,
    warningPopup: true,
    warningPopupMessage: "By posting on an old forum you may be filling up the e-mail boxes of many people who are still following this topic but are not interested in the discussion anymore. Are you sure you want to do this?",
    disableOn: ["156904"],
};

/* ######################################################################### */
/* END Blog and Forum control setting */
/* ######################################################################### */


/* ######################################################################### */
/* {{Username}} setting */
/* ######################################################################### */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* ######################################################################### */
/* END {{Username}} setting */
/* ######################################################################### */


/* ######################################################################### */
/* {{Games}} setting */
/* ######################################################################### */
 
// Description: Add game icons to top right corner of articles
// Credit:      User:Porter21
 
$(function addTitleIcons() {
   if (skin == 'monobook' || skin == 'oasis') {
      var insertTarget;
 
      switch (skin) {
         case 'monobook':
            insertTarget = $('#firstHeading');
            break;
         case 'oasis':
            if (wgAction != 'submit' && wgNamespaceNumber != 112) {
               insertTarget = $('#WikiaPageHeader');
            }
            break;
      }
 
      if (insertTarget) {
         $('#directory-in-header').css('position', 'absolute').prependTo(insertTarget);
      }
   }
});
 
/* ######################################################################### */
/* END {{Games}} setting */
/* ######################################################################### */


/* ######################################################################### */
/* PreloadFileDescription */
/* Credit: Nanaki
/* ######################################################################### */

PFD_templates = [{
        label: 'Images',
        desc: '{{File\n| Description = \n| Date = \n| Source = \n| Author = \n| Other versions = \n}}\n[[Category:Images]]',
    },
    'Group header', {
        label: 'Videos',
        desc: '{{File\n| Description = \n| Date = \n| Source = \n| Author = \n| Other versions = \n}}\n[[Category:Videos]]',
    },
];
 
PFD_requireLicense = true;

/* ######################################################################### */
/* END PreloadFileDescription */
/* ######################################################################### */

/* ######################################################################### */
/* Lock old comments script*/
/**
Code that prevents people from replying to comments older than a year. Once the reply button is clicked, it will be replaced with a message. The style of this message is controlled by div.DSWOldCommentWarning class in the Wiki's CSS.
This was attempted to be imported by the ImportJS, however that doesn't seem to reliably work, sometimes import is attempted before the importer code loads, making the imports not work until the page is refreshed.
**/
/* ######################################################################### */
 
(function ($) {
    $("#WikiaArticleComments").on("focus","ul.comments li.SpeechBubble button.article-comm-reply",function(event){
        var button= $(this);
        var permalink = button.parent().siblings(".permalink").first();
 
        var lastSegment = permalink.attr("href").split('/').pop();
        var datepart = lastSegment.split('-')[2].slice(0,8); // YYYYMMDD
        var year = datepart.slice(0,4);
        var month = datepart.slice(4,6);
        var day = datepart.slice(6,8);
        var currentDate = new Date();
        var commentDate = new Date(year, month - 1, day ); // months count from 0
        var diffMilliseconds = currentDate.getTime() - commentDate.getTime();
        var diffDays = Math.floor(diffMilliseconds / 1000 / 60 / 60 / 24);
 
        if (diffDays > 365)
        {
            event.stopImmediatePropagation();
            button.after('<div class="DSWOldCommentWarning" style="float:right;"><p>This comment is too old to reply.</p></div>');
            button.remove();
        }
 
    });
})(this.jQuery);
/* ######################################################################### */
/* End lock old comments */
/* ######################################################################### */

/* The following is code to allow collapsible tables from the Templates wiki - Bluegiest */

/**
 * Collapsible tables ********************************************************
 *
 * Description: Allows tables to be collapsed, showing only the header. See
 *              [[wikipedia:Wikipedia:NavFrame]].
 * Maintainers: [[wikipedia:User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';

window.collapseTable = function ( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );

    if ( !Table || !Button ) {
        return false;
    }

    var Rows = Table.rows;
    var i;

    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
};

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName( 'table' );
    var i;

    function handleButtonLink( index, e ) {
        window.collapseTable( index );
        e.preventDefault();
    }

    for ( i = 0; i < Tables.length; i++ ) {
        if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) { continue; }
            var Header = HeaderRow.getElementsByTagName( 'th' )[0];
            if ( !Header ) { continue; }

            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );

            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );

            Button.className = 'collapseButton';  /* Styles are declared in Common.css */

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', $.proxy( handleButtonLink, ButtonLink, tableIndex ) );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );

            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }

    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) || ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) ) ) {
            window.collapseTable( i );
        }
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    window.collapseTable ( i );
                    break;
                }
            }
        }
    }
}

$( createCollapseButtons );