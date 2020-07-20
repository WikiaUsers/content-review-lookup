// ✓ Format checked! Intro, ToC, notes, sections, headings, lines, and tabs.
 
// This script adds icons to the Local Navigation and links the Page Counter to [[Spceial:AllPages]].
 
/*************************************************/
/*************** TABLE OF CONTENTS ***************/
/**************************************************
TABLE OF CONTENTS
MAIN CODE
    LOCALNAV ICONS
 
/*************************************************/
/******************* MAIN CODE *******************/
/*************************************************/
// LOCALNAV ICONS
var home = "<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 18 18' class='wds-icon-tiny wds-icon' id='wds-icons-house-small'><path d='M11.955 16.925h2c.6 0 1-.4 1-1v-7h1c.3 0 .6-.1.8-.3.4-.4.3-1-.1-1.4l-7-6c-.4-.3-.9-.3-1.3 0l-7 6c-.4.4-.5 1-.1 1.4.1.2.4.3.7.3h1v7c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-3h4v3c0 .6.4 1 1 1z'></path></svg>";
var popular = "<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 18 18' class='wds-icon-tiny wds-icon' id='wds-icons-article-small'><path d='M13 5.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm-5 3a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5zM16 2v9h-6v6H3c-.6 0-1-.4-1-1V2c0-.6.4-1 1-1h12c.6 0 1 .4 1 1zm-4 11h4l-4 4v-4z'></path></svg>";
var community = "<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 18 18' class='wds-icon-tiny wds-icon' id='wds-icons-community-small'><path d='M6.378 3.176c0 1.203-.98 2.177-2.19 2.177A2.182 2.182 0 0 1 2 3.176C2 1.975 2.98 1 4.189 1s2.19.975 2.19 2.176zm9.583 0c0 1.203-.98 2.177-2.19 2.177a2.182 2.182 0 0 1-2.188-2.177c0-1.201.98-2.176 2.188-2.176 1.21 0 2.19.975 2.19 2.176zM7.243 6.26h-5.2v10.48h5.2v-1.71H5.488V7.995h1.755V6.26zm3.553 0H16v10.48h-5.204v-1.71h1.73V7.995h-1.73V6.26z'></path></svg>";
var forum = "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' class='wds-icon-tiny wds-icon' id='wds-icons-reply-small'><path d='M18 8.273c0 4.01-4.037 7.272-9 7.272-.752 0-1.508-.078-2.252-.233l-4.22 1.636a.77.77 0 0 1-.732-.096.719.719 0 0 1-.291-.66l.395-3.45C.672 11.47 0 9.896 0 8.273 0 4.263 4.037 1 9 1s9 3.263 9 7.273z'></path></svg>";
$(".wds-tabs__tab-label span:contains(Home)").before(home);
$(".wds-tabs__tab-label span:contains(Popular pages)").before(popular);
$(".wds-tabs__tab-label span:contains(Community)").before(community);
$(".wds-tabs__tab-label span:contains(Forum)").before(forum);

// ALLPAGES LINK
$(".wds-community-header__counter").wrap("<a href='/wiki/Special:AllPages' style='text-decoration: none;'></a>");