// discussEmbed
window.discussEmbedForum = "3692388249763968964";
window.discussEmbedLimit = 5;
window.discussEmbedSortTrending = 0;

importArticles({
    type: "style",
    articles: [
        "w:c:dev:Highlight/code.css"
    ]
});

// Dragon anon avatars png
function changeSourceAll() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.includes('https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/')) {
            images[i].src = images[i].src.replace("https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/28/height/28", "https://static.wikia.nocookie.net/wings-of-fire-experimental/images/0/06/Anonymous_IceWing_Wiki.png/revision/latest?cb=20190914235622");
            images[i].src = images[i].src.replace("https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/400/height/400", "https://static.wikia.nocookie.net/wings-of-fire-experimental/images/0/06/Anonymous_IceWing_Wiki.png/revision/latest?cb=20190914235622");
        }
    }
}
changeSourceAll();
 
setInterval(function(){
    changeSourceAll();
}, 1000);


//SpoilerAlert
window.SpoilerAlertJS = {
   question: 'Cette zone contient des spoilers. Êtes-vous sûr de vouloir le lire ?',
   yes: 'oui',
   no: 'non',
   fadeDelay: 500
};



window.BackToTopArrow = true;


window.HeaderLinksCopyOnClick = true;


window.ecpButton = true;