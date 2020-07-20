/*Снег*/

// Profile BG //
 
if (wgNamespaceNumber === 2 || wgNamespaceNumber === 1200 || wgNamespaceNumber === -1 || wgNamespaceNumber === 500 && wgPageName.indexOf('/') == -1) {
    $('.WikiaUserPagesHeader').css({
        "background": "url('https://images.wikia.nocookie.net/__cb20140729072411/spiralka/ru/images/4/43/ProfileBG.png') bottom no-repeat",
        "background-size": "cover"
    });
}

// VK //
$(function() {
    $.getJSON('/ru/api.php?action=parse&text={{VK}}&format=json', function(data) {
        $('#WikiaArticle').prepend(data.parse.text['*']);
    });
});