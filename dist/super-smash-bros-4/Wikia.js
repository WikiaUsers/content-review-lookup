/***** Removing broken links from Wikia Navigation *****/
 
$(document).ready(function() {
        $('a.subnav-2a[href="/wiki/Most_visited_articles"],a.subnav-2a[href="/wiki/Newly_changed_articles"],a.subnav-2a[href="/wiki/Top_users"]').removeAttr("href");
});