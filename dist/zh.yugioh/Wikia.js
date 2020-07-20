// Replace "Luster Dragon #2" with "Luster Dragon 2" etc. when searching
$('#WikiaSearch input:first-of-type').on('change', function() {
    $('#WikiaSearch input:first-of-type').val($('#WikiaSearch input:first-of-type').val().replace(' #', ' '));
});



var SocialMediaButtons = { 
 position: "bottom",
 colorScheme: "color",
 buttonSize: "45px"
};
importScriptPage('SocialIcons/code.js','dev');