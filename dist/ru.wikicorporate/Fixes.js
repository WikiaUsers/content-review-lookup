/* Фикс фона изображений */
var classNames = ["mcf-card-article__thumbnail", "category-page__member-thumbnail"];
var processImages = function processImages() {
    classNames.forEach(function (className) {
        var elements = document.getElementsByClassName(className);
        Array.prototype.forEach.call(elements, function (image) {
            image.src = image.src.replace(/(\/smart\/width\/[\d]*\/height\/[\d]*)/g, "");
        });
    });
};
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.type === "childList" || mutation.type === "subtree") {
            processImages();
        }
    });
});
var config = {
    childList: true,
    subtree: true,
};
observer.observe(document.body, config);
processImages();