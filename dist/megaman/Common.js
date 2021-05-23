/* Any JavaScript here will be loaded for all users on every page load. */
window.railWAM = {
    logPage:"Project:WAM Log"
};
$("img").each(function(){ $(this).attr("src", $(this).attr("src").replace("&format=original","") ) });