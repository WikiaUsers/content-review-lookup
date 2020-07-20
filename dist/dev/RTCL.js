/*
 * @name:           Remove Tally Contributions Link
 * @description:    Removes the Contributions link from the Edit Count on the Oasis Masthead, reverting it back to the way it was previously.
 * @authors:        Count of Howard <https://dev.wikia.com/wiki/User:Count_of_Howard>
 */
$(function() {
    if ($('#WikiaUserPagesHeader').length === 0) {
        return;
    }

    $('.UserProfileMasthead .contributions-details a').removeAttr("href");
    mw.util.addCSS(
        '.UserProfileMasthead .contributions-details a:hover {' +
            'color: inherit;' +
            'text-shadow: none;' +
        '}'
    );
});