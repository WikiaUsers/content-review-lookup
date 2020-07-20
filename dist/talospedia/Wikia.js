/* Any JavaScript placed here will be loaded for only Oasis users on every - */
/* page load. See also: MediaWiki:Common.js -------------------------------- */

// <source lang="JavaScript">

// Level 4 Navigation Script
importScript('MediaWiki:Wikia.js/SubNav.js');
// END Level 4 Navigation Script
 
// WRITTEN BY User:Rappy_4187
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

    // FOUNDER(ELOHIM)

  rights["Arctic Blue"]       = ["Elohim" , "Transcender"];

    // BUREAUCRATS(TRANSCENDERS)


    // ADMINISTRATORS(ETERNALIZERS)


    // CHATMODS(MESSENGERS)

 
    // ROLLBACKS(ANDROIDS)


    // BOTS(AIs)

  rights["WikiaBot"]          = ["Wikia AI"]; 
  rights["Wikia"]             = ["Wikia AI"];

  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
       $('.UserProfileMasthead .masthead-info span.tag').remove();
       for( var i=0, len=rights[user].length; i < len; i++) {
         $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
};

$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});

$( '#WikiaSearch > button > img' ).attr( 'src', 'https://images.wikia.nocookie.net/zammy/images/8/84/Black_magnifying_glass.png' );
// </source>

/*Gears - by ShermanTheMythran*/ $('#WikiaBarWrapper').append($('.walls'));$('.walls').show();$('.name').click(function(){$('.walls img').addClass('active');$('.left').delay('1000').animate({left:'-50%'},'slow');$('.right').delay('1000').animate({right:'-50%'},'slow');$('.name').delay('1000').fadeOut('slow');})

window.LockForums = {
    expiryDays: 20,
    expiryMessage: "This forum is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t comment this forum!",
    forumName: "Forum" 
};
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockForums/code.js"
    ]
});