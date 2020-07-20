/* Any JavaScript here will be loaded for all users on every page load. */

//Replaces <span class="insertusername"></span> with the Username of the reader
$(function replaceusername() {
  var spantags = document.getElementsByTagName("span");
  for (i=0; i<spantags.length; i++) {
    if (spantags[i].className=="insertusername") {
      if (wgUserName===null) {
        spantags[i].innerHTML="buddy";
      } else {
        spantags[i].innerHTML=wgUserName;
      }
    }
  }
});

/*AjaxRG to refresh Wiki Activity*/
window.ajaxPages = ['Special:WikiActivity','Special:RecentChanges'];
 
/*MessageBlock*/
window.MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 because of the following reason: $1',
  autocheck : true
};
 
/*RevealAnonIP*/
// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['user']
};
 
/*Making it work together*/
ajaxCallAgain = [
    'MediaWiki:UserRightsRecord/code.js',
    'MediaWiki:MessageBlock/code.js',
    'MediaWiki:RevealAnonIP/code.js',
    RevealAnonIP.reveal
    ];

// Add Twitter timeline to sidebar by King Dragonhoff from boombeach.wikia.com
$(window).load(function() {
     $('.ChatModule').after('<section class="module" id="twittermodule"><a class="twitter-timeline" href="https://twitter.com/HS_Wiki" data-widget-id="730850215490682880">Tweets by @HS_Wiki</a></section>');
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
});

/* Message Wall User Tags */
 
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'FranceSwitzerland': 'Wiki Adopter • Bureaucrat • Administrator',
        'Teh Sweggurboi': 'Bureaucrat • Administrator',
        'SwitzerlandDormammu': 'Content Moderator • Discussion Moderator',
        'RemyMovies': 'Content Moderator • Rollback',
        'TTigerTT': 'Discussion Moderator • Rollback',
        'ZERO 78': 'Discussion Moderator • Rollback',
        'Landoman9582': 'Discussion Moderator',
        'Misterskin': 'Chat Moderator',
        'The update master': 'Rollback',
        'FedeLeal': 'Rollback',
        'CozzaMachine': 'Rollback'
    }
};
 
/* End of Message Wall User Tags */