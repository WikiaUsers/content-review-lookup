/* Any JavaScript here will be loaded for all users on every page load. 
Content:
> spoiler config
> imported scripts
  > BackToTopButton
  > ReferencePopups
  > spoiler
> navigation  
*/

/* SPOILER
The spoiler alert box shows up, if the user visit pages with spoiler.
Technically, all pages in the category Spoiler are considered as spoiler.
You can add category to it. You just need to add into indexOf in the code section below.
Documentation:
http://dev.wikia.com/wiki/SpoilerAlert
*/
SpoilerAlert = {
    question: 'We want to inform you about spoilers. If you did not watch the movie neither read the manga yet, this wiki may take your experience. Consider to get spoilerd.',
    yes: 'OK, I am ready to gbet spoilerd.',
    no: '',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};


importArticles({
    type: 'script',
    articles: [
        /* BACK TO TOP BUTTON
            You find the button below on the black line.
            Documentation:
            http://dev.wikia.com/wiki/BackToTopButton
        */
        'u:dev:BackToTopButton/code.js',
        /* REFERENCE POP UP
            The references show up as a tooltip text, if you move the 
            mouse pointer over the reference number.
            Documentation:
            http://dev.wikia.com/wiki/ReferencePopups
            http://dev.wikia.com/wiki/ReferencePopups/code.css
        */
        'u:dev:ReferencePopups/code.js',
        'u:dev:SpoilerAlert/code.js',
    ]
});

/* NAVIGATION */
$(function() {
   $('.WikiNav ul li.marked ul').append('<li><a class="subnav-2a" title="Special:RecentChanges" href="/wiki/Special:RecentChanges">Recent changes</a></li>');
});