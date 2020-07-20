importArticles({
  type: "script",
  articles: [
    'u:dev:MediaWiki:EmoticonsWindow/code.js'
  ]
});

// Dragon anon avatars
function changeSourceAll() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.includes('https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/')) {
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/28?format=jpg", "https://vignette.wikia.nocookie.net/wingsoffirefanon/images/7/7c/Fanon_anon_icon.png/revision/latest/scale-to-width-down/28");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/28", "https://vignette.wikia.nocookie.net/wingsoffirefanon/images/7/7c/Fanon_anon_icon.png/revision/latest/scale-to-width-down/28");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/41", "https://vignette.wikia.nocookie.net/wingsoffirefanon/images/7/7c/Fanon_anon_icon.png/revision/latest/scale-to-width-down/41");
        }
    }
}
changeSourceAll();
 
setInterval(function(){
    changeSourceAll();
}, 1000);