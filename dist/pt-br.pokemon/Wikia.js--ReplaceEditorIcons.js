//Mudando os ícones.
function replaceEditorIcons() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.indexOf('https://images.wikia.nocookie.net/__cb1458582005/common/extensions/wikia/EditPageLayout/images/sprite-edit-page.png') !== -1) {
            images[i].src = images[i].src.replace("https://images.wikia.nocookie.net/__cb1458582005/common/extensions/wikia/EditPageLayout/images/sprite-edit-page.png", "https://vignette.wikia.nocookie.net/plants-vs-zombies-fan-fiction/images/5/5d/Test-sprite-edit.png");
        }
    }
}
replaceEditorIcons();