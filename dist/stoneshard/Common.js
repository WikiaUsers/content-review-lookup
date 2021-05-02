/* Any JavaScript here will be loaded for all users on every page load. */

// Make selected images twice the size, since the game does that  
function resizeAllTableImages() {
    const imgs = document.querySelectorAll(".image2x");
    imgs.forEach(function(img) {
        img.width *= 2;
        img.height *= 2;
    });
}

mw.hook('wikipage.content').add(function () {
    resizeAllTableImages();
});