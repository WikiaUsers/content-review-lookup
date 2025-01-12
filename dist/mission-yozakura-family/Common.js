/* Any JavaScript here will be loaded for all users on every page load. */

window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'M2YNP8H',
    prependToRail: true
};
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

$(document).ready(function () {
  // Add interactivity for tabs/items in the template
  $('#hover').on('click', '.show', function () {
    var clickedId = $(this).attr('id'); // Get the ID of the clicked element

    // Hide all tab contents and reset all tabs' opacity
    $('#hover > div[id^="item-"]').css('display', 'none'); // Hide all content sections (divs starting with item-)
    $('.show').css('opacity', '0.5'); // Reset opacity for all tabs

    // Show the clicked tab's content and highlight the tab
    $('#item-' + clickedId).css('display', 'block'); // Show the corresponding content based on the clicked tab
    $(this).css('opacity', '1'); // Highlight the clicked tab
  });
});