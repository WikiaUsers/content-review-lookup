//                                                                                         
// Any JavaScript here will be loaded for all users on every page load.                    
// A lot of this code has been taken from other Wikis, which follow the same copyright laws
//                                                                                          

// Prevents [[MediaWiki:ProfileTags]] from hidding any existing tags
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

// RevealAnonIP settings -- MUST be before the script is imported
window.RevealAnonIP = {
    permissions : ["rollback", "sysop", "bureaucrat"]
};

// AjaxRC settings
ajaxPages = [
     "Special:RecentChanges",
     "Special:Watchlist",
     "Special:Log",
     "Special:Contributions"
];