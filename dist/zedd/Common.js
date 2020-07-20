//Explicit alert config
SpoilerAlert = {
    question: 'This page is for a song that is explicit, meaning that the lyrics may not be appropriate for&mdash;and may even be offensive to&mdash;younger readers.<br />Do you wish to proceed anyway?',
    yes: 'Yes',
    no: 'No',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Explicit');
    }
};
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// ADVANCED AUTO REFRESHING RECENT CHANGES AND WATCHLIST
// Code courtesy of "pcj" of WoWWiki.
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/* AJAX */
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:NewPages", "Special:Contributions"];