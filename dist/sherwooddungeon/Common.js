/* Any JavaScript here will be loaded for all users on every page load. */
/*USERNAME Template Script*/
$(function () {
    if (wgUserName) {
        $('.insertusername').html(wgUserName);
    } else {
        $('.insertusername').html("contributor");
    }