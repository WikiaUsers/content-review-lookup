/* Any JavaScript here will be loaded for all users on every page load. */

/* Username replace feature: Inserts viewing user's name into <span class="insertusername"></span> */
$(function () {
    var name;
    if (!wgUserName) {
        name = "Anon";
    } else {
        name = wgUserName;
    }
    $('span.insertusername').html(name);
});

/* Special:WantedPages filter */
importArticles({
    type: 'script',
    articles: [
        'u:dev:WantedPagesFilter/code.js',
    ]
});

/* Message Wall Greeting: Edit greeting button on wall */
importArticles({
    type: 'script',
    articles: [
        'u:dev:WallGreetingButton/code.js',
    ]
});