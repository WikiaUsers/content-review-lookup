/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */
 
// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
 
$(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});

/* Main Page Quiz */
   
window.quizName = "Quiz";
window.resultsTextArray = [ 
    "Looks like you're still Into the New World. You might wanna brush up on your Girls' Generation knowledge here on the Wiki!",
    "You've got Lion Heart! You're well on your way to becoming a Genie-level SONE.",
    "Gee! You're Forever 1 with Girls' Generation. Amazing job!" 
];
window.questions = [
    ["When did Girls' Generation debut?",
    "August 5, 2007",
    "July 30, 2007",
    "September 10, 2008",
    "October 15, 2008"], 

    ["What was Girls' Generation's debut song in Japan?",
    "Genie",
    "Gee",
    "Into the New World",
    "The Boys"],
    
    ["Which Girls' Generation member has not released a solo album?",
    "Sunny",
    "Yuri",
    "Sooyoung",
    "Seohyun"],
    
    ["Which member is the center of Girls' Generation?",
    "Yoona",
    "Taeyeon",
    "Tiffany",
    "Seohyun"],
    
    ["What song made Girls' Generation famous in South Korea?",
    "Gee",
    "Into the New World",
    "Tell Me Your Wish (Genie)",
    "Dancing Queen"],
    
    ["Which Girls' Generation unit (official or unofficial) has the most members?",
    "Oh!GG",
    "TaeTiSeo",
    "HyoRiSoo",
    "JeTiHyun"],
    
    ["Which member of Girls' Generation has released the most solo music?",
    "Taeyeon",
    "Hyoyeon",
    "Tiffany",
    "Yoona"],
    
    ["How many members were in the pre-debut lineup of Girls' Generation?",
    "11",
    "9",
    "7",
    "13"],
    
    ["Girls' Generation has released one song in Chinese. What is it?",
    "Soul (Chinese version)",
    "Gee (Chinese version)",
    "Genie (Chinese version)",
    "The Boys (Chinese version)"],
    
    ["What year did Girls' Generation debut in Japan?",
    "2010",
    "2009",
    "2012",
    "2015"]
];
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});