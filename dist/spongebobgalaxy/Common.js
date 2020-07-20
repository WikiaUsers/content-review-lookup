/* Any JavaScript here will be loaded for all users on every page load. */
// *************************************************
// BEGIN Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
 
if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User talk") {
$(function () {
    var newTitle = $("#title-meta").html();
    if (!newTitle) return;
    var edits = $("#user_masthead_since").text();
    $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
    //$(".user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});
}
 
// *************************************************
// END Pagetitle rewrite
// *************************************************

var quizName = "The SpongeBob Quiz";
var quizLang = "en";
var resultsTextArray = [
      "Result 1",
      "Result 2",
      "Result 3",
      "Result 4"
       ];
var questions = [

       ["Question 1",
       "Correct answer",
       "Incorrect",
       "Incorrect2",
       "Incorrect3"],

       ["Question 2",
       "Correct answer",
       "Incorrect",
       "Incorrect2",
       "Incorrect3"],

       ["Question 3",
       "Correct answer",
       "Incorrect",
       "Incorrect2",
       "Incorrect3"],

       ["Question 4",
       "Correct answer",
       "Incorrect",
       "Incorrect2",
       "Incorrect3"],

       ["Question 5",
       "Correct answer",
       "Incorrect",
       "Incorrect2",
       "Incorrect3"],

       ["Question 6",
       "Correct answer",
       "Incorrect",
       "Incorrect2",
       "Incorrect3"],

       ["Question 7",
       "Correct answer",
       "Incorrect",
       "Incorrect2",
       "Incorrect3"],

       ["Question 8",
       "Correct answer",
       "Incorrect",
       "Incorrect2",
       "Incorrect3"],

       ["Question 9",
       "Correct answer",
       "Incorrect",
       "Incorrect2",
       "Incorrect3"],

       ["Question 10",
       "Correct answer",
       "Incorrect",
       "Incorrect2",
       "Incorrect3"]
        
];

window.MessageWallUserTags = {
    tagColor: '#4682B4',
    glow: true,
    glowColor: '#2F4F4F',
    glowSize: '15px',
    users: {
        'username': 'usergroup',
        'Nicko756': 'Bureaucrat • Administrator',
        'Road_Runner1': 'Founder',
        'IRmjii': 'Bureaucrat • Administrator',
        'Tominator777': 'Administrator',
        'Brony_Sponge_Penguin_%2B_Sonic': 'Administrator',
        'Golfpecks256': 'Wiki Adopter • Admin',
        'CaesarsLegion001': 'Bureaucrat • Wiki Adopter'
    }
};

// **************************************************
/* User Tags */
 
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		founder: { u:'Founder', order: -1/0 },
		bureaucrat: { u:'Bureaucrat', order: -1/0 },
		adopter: { u:'Wiki Adopter', order: -1/0 },
	}
};
 
UserTagsJS.modules.custom = {
    'Road_Runner1': ['founder'],
    'Golfpecks256': ['adopter'],
    'CaesarsLegion001': ['adopter']
};
 
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'bannedfromchat', 'bot', 'bot-global', 'assistant', 'moderator'];
 
/* End of User Tags */