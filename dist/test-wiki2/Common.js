/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:AutoEditPages/code.js'
    ]
});

window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'User1': 'Founder',
        'User2': 'Bureaucrat',
        'User3': 'Admin',
        'User4': 'Rollback',
        'User5': 'Custom Tag'
    }
};
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});

/* $(document).ready(function(){
    if ($('#WikiaRail').length) {
        $('#WikiaRail').append('<section class="module"><center><h2><b><u>Badges</u></b></h2></center><center><big>Badges earned:</big></center><center><img src="https://vignette.wikia.nocookie.net/test-wiki2/images/5/53/Badge1.png/revision/latest?cb=20150626131017" width="28" height="28" title="Wiki Designer: Awarded for designing the wiki" /> <img src="https://vignette.wikia.nocookie.net/test-wiki2/images/e/e9/Badge2.png/revision/latest?cb=20150626134521" width="28" height="28" title="Good Start: Awarded for having over 5 people on the wiki" /> <img src="https://vignette.wikia.nocookie.net/test-wiki2/images/6/64/Badge4.png/revision/latest?cb=20150626134522" width="28" height="28" title="Inactive For 1 Week: Awarded for making no edits on Test Wiki2 Wiki for 1 week" /> <img src="https://vignette.wikia.nocookie.net/test-wiki2/images/5/56/Badge16.png/revision/latest?cb=20150626134526" width="28" height="28" title="CSS Designer: Awarded for designing the wiki with CSS" /> <img src="https://vignette.wikia.nocookie.net/test-wiki2/images/4/4b/Badge15.png/revision/latest?cb=20150626134526" width="28" height="28" title="JavaScript Designer: Awarded for designing the wiki with JavaScript" /> <img src="https://vignette.wikia.nocookie.net/test-wiki2/images/9/92/Badge3.png/revision/latest?cb=20150626134522" width=28" height="28" title="Fast Editor: Awarded for making 3 edits in 30 seconds" /></center><hr /><center><big>Badges You Can Earn:</big><center><img src="https://vignette.wikia.nocookie.net/test-wiki2/images/8/86/Badge7.png/revision/latest?cb=20150626134523" width="28" height="28" title="Template Editor: Awarded for making 20 edits on Template pages" /> <img src="https://vignette.wikia.nocookie.net/test-wiki2/images/f/fa/Badge8.png/revision/latest?cb=20150626134523" width="28" height="28" title="80% Wiki: Awarded for having the wiki 80% finished on Admin Dashboard" /> <img src="https://vignette.wikia.nocookie.net/test-wiki2/images/7/72/Badge9.png/revision/latest?cb=20150626134524" width="28" height="28" title="10 Administrators: Awarded for having 10 admins on the wiki" /> <img src="https://vignette.wikia.nocookie.net/test-wiki2/images/0/02/Badge10.png/revision/latest?cb=20150626134524" width="28" height="28" title="MediaWiki Editor: Awarded for making 20 edits on MediaWiki pages" /> <img src="https://vignette.wikia.nocookie.net/test-wiki2/images/a/aa/Badge11.png/revision/latest?cb=20150626134524" width="28" height="28" title="Wiki Lover: Awarded for making 1,500 edits" /> <img src="https://vignette.wikia.nocookie.net/test-wiki2/images/4/4a/Badge14.png/revision/latest?cb=20150626134525" width="28" height="28" title="Sending Messages: Awarded for sending 15 messages to users" /> <img src="https://vignette.wikia.nocookie.net/test-wiki2/images/4/41/Badge12.png/revision/latest?cb=20150626134525" width="28" height="28" title="Big Community: Awarded for having over 30 people with over 50 edits on the wiki" /> <img src="https://vignette.wikia.nocookie.net/test-wiki2/images/2/2d/Badge13.png/revision/latest?cb=20150626134525" width="28" height="28" title="90% Wiki: Awarded for having the wiki 90% finished on Admin Dashboard" /></section>');
    }
}); */
if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
 
  }