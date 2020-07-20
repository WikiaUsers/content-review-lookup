/* Any JavaScript here will be loaded for all users on every page load. */

/* Adding back a link to the recent Wiki activity.*/
$(function() {
    if(!$('#WikiaRail').exists()) {
        return;
    }
    var interval = setInterval(function() {
        if($('#wikia-recent-activity').exists()) {
            clearInterval(interval);
            $('#wikia-recent-activity .activity-items').after(
            $('<a>', { href: '/wiki/Special:WikiActivity' })
                .text('See more activity...')
            );
        }
    }, 100);
});

/* Placing a link to the archived list. */
if (mw.config.get('wgRedirectedFrom') == 'List_of_Goosebumps_books_(text)') {
    $('div.poem').append('<small>To see the archived text-only list, <a href="/wiki/List_of_Goosebumps_books_(text)?oldid=80459" title="archive">click here.</a></small>');
}

/* The following code creates a collapsible box (with the proper accompanying HTML and CSS). */
$("#button1").addClass("button1normalgb");
$("#changeable").addClass("normalgb");

$("#button1").click(function() {
    var change = $("#changeable");
    if (change.hasClass("normalgb")) {
        change.toggleClass("normalgb largegb");
    } else if (change.hasClass("largegb")) {
        change.toggleClass("largegb normalgb");
    }

    var change2 = $("#button1");
    if (change2.hasClass("button1normalgb")) {
        change2.toggleClass("button1normalgb button1largegb");
    } else if (change2.hasClass("button1largegb")) {
        change2.toggleClass("button1largegb button1normalgb");
    }
});