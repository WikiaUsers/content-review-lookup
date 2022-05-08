/* Any JavaScript here will be loaded for all users on every page load. */
/* Excessively simple code to make all links on the mainpage appear blue, not yellow. Yellow is ugly and does not rhyme with white */
if (skin === "monobook") {
    $('.page-Monster_Hunter_Fanon #globalWrapper #column-content #content #bodyContent #mw-content-text a').css("color", "blue");
};