// 06:21, July 20, 2013 (UTC)
// <source lang="JavaScript">

// Hides Placeholder in categories to which it has been categorized
// by User:Cblair91

$(document).ready(function() {
    $("a[href~='/wiki/Scratchpad:Placeholder']").parent().css('display', 'none');
});

$(".CategoryTreeItem span:contains('(1 P)')").parent().parent().parent().css('display', 'none');

// </source>