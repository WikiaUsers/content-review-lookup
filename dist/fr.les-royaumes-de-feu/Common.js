// discussEmbed
window.discussEmbedForum = "3692388249763968964";
window.discussEmbedLimit = 3;
window.discussEmbedSortTrending = 0;

importArticles({
    type: "style",
    articles: [
        "w:c:dev:Highlight/code.css"
    ]
});

UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.inactive = 50; // 50 days

// Dragon anon avatars png
function changeSourceAll() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.includes('https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/')) {
            images[i].src = images[i].src.replace("https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/28/height/28", "https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/28/height/28");
            images[i].src = images[i].src.replace("https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/400/height/400", "https://static.wikia.nocookie.net/wings-of-fire-experimental/images/d/d4/Anonymous_SilkWing_Wiki.png/revision/latest?cb=20190914234814");
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



window.BackToTopArrow = false;


window.HeaderLinksCopyOnClick = true;


window.ecpButton = true;