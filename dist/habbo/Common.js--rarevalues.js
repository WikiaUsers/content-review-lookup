/*
 * Rare values script for Furniture template
 * coded by Cblair91
 * Copyright not to be removed
 */

$(document).ready(function() {
    $('div[class|="rvprice"]').each(function() {
        var furni = $(this).attr('title');
        $('.rvprice-' + furni.replace(' ', '_')).html('<img src="http://betadev.co.uk/habbodaily/cache/rares/rv.php?furni=' + furni + '" />');
    });
});