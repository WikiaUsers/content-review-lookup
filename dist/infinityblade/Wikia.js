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

    // BUREAUCRATS(ELDERS)
 
  rights["Slayingthehalcyon"] = ["Infinity Elder"];  
  rights["Arctic Blue"]       = ["Infinity Elder"];
  rights["Cheese Ausar"]      = ["Infinity Elder"];

    // ADMINISTRATORS(PANTHEONITES)
 
  
  rights["Mugen Galath"]      = ["Deathless Pantheonite","Loremaster"];

    // CHATMODS(BLADEMASTERS)
 
  rights["Darth_Siris"]       = ["Arena Blademaster"];
 
    // ROLLBACKS(BLOODMAGES)

  rights["Bashihbk01"]         =["Arcane Bloodmage","Cosmic Assassin (Six Guns)"];
  rights["Ninjablademaster"]  = ["Arena Blademaster","Arcane Bloodmage"];

    // BOTS(TELS)

  rights["Rismosis"]          = ["Automated Transgolem"]; 
  rights["DarknessUnleashed"] = ["Automated Transgolem"]; 
  rights["WikiaBot"]          = ["Wikia Transgolem"]; 
  rights["Wikia"]             = ["Wikia Transgolem"];

    // AMBASSADORS(ASSASSINS)

  rights["Ysbert"]             =["Cosmic Assassin (Modern Combat)"]

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



// TABBING rip
$(function() {
    $('.tabs-container').css({
        'background': 'transparent',
        'overflow': 'hidden'
    });
    $('.tabs li a').css('color', '#fefefe');
    $('.tabs .selected a').css({
        'border-bottom': 'none',
        'border-left': 'none',
        'border-right': 'none',
        'border-top': 'none',
        'background': 'transparent',
        'color': 'rgba(252, 234, 91, 0.7)'
    });
        $('<div style="height:0; width: 0; border-left: 5px solid rgba(157,158,127,0.6); border-right: 5px solid rgba(157,158,127,0.6); border-top: 5px solid #fefdf9; margin-left: calc(50% - 5px); margin-bottom: -5px; box-shadow: 0px 0px 25px 10px rgba(157,158,127,0.75);"></div>').insertBefore($('.tabs .selected a'));
        $('<div style="height:0; width: 0; border-left: 5px solid rgba(157,158,127,0.6); border-right: 5px solid rgba(157,158,127,0.6); border-bottom: 5px solid #fefdf9; margin-left: calc(50% - 5px); margin-top: 0; box-shadow: 0px 0px 25px 10px rgba(157,158,127,0.75);"></div>').insertAfter($('.tabs li .chevron'));
});

// Wikia Discord
window.DiscordIntegratorConfig = {
    siderail: {
        title: "General Wikia Discord",
        id: "313358758115803137",
        theme: "light"
    }
};