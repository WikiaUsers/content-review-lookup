// 05:20, July 17, 2014 (UTC)
// <source lang="JavaScript">
// by Hairr

// Insert {{talkpage}} at the top of new talkpages

$(".ns-1 a .new").attr("href", $(this).attr("href") + '&preload=Talkheader');

// END Insert {{talkpage}} at the top of new talkpages

// </source>