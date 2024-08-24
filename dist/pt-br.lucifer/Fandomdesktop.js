importScriptPage('SpoilerAlert/code.js', 'dev');
 
window.railWAM = {
    logPage:"Project:WAM Log"
};

// Pop-ups em Referências
importScriptPage('ReferencePopups/code.js', 'dev');

// Importadas da Wiki Lucifer //

jQuery(document).ready(function($) {
    $(".lucifer-js-click td").click(function() {
        window.document.location = $(this).data("href");
    });
});
 
 
jQuery(document).ready(function($) {
    $(".lucifer-js-click .mp-character-portal").click(function() {
        window.document.location = $(this).data("href");
    });
});