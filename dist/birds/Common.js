/* Any JavaScript here will be loaded for all users on every page load. */
// Bird anon avatars
function changeSourceAll() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.includes('https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/')) {
            images[i].src = images[i].src.replace("https://images.wikia.nocookie.net/birds/images/b/b1/Silhouettes.png/revision/latest?cb=20190915144938");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/");
        }
    }
}

//UserTagsJS.modules.inactive = 30;
//UserTagsJS.modules.newuser = true;
//UserTagsJS.modules.autoconfirmed = true;

$(function() {
    mw.hook('DiscordIntegrator.added').add(function() {
        $('.DiscordIntegratorModule').insertAfter('.ChatModule');
    }
});