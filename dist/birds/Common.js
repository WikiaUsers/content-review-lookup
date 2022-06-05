//Bird anon avatars
function changeAnon() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.includes('https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/')) {
            images[i].src = images[i].src.replace("https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/28/height/28", "https://static.wikia.nocookie.net/birds/images/0/0b/Pngwing.com_%2868%29.png/revision/latest?cb=20220530210348");
            images[i].src = images[i].src.replace("https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/400/height/400", "https://static.wikia.nocookie.net/birds/images/0/0b/Pngwing.com_%2868%29.png/revision/latest?cb=20220530210348");
            images[i].src = images[i].src.replace("https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/16/height/16", "https://static.wikia.nocookie.net/birds/images/0/0b/Pngwing.com_%2868%29.png/revision/latest?cb=20220530210348");
        }
    }
}
changeAnon();
 
setInterval(function(){
    changeAnon();
}, 1000);