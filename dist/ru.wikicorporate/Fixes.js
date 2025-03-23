/* Фикс фона изображений */
const classNames = ["category-page__member-thumbnail"];
const processImages = () => {
    classNames.forEach(className => {
        const elements = document.getElementsByClassName(className);
        Array.from(elements).forEach(image => {
            image.src = image.src.replace(/(\/smart\/width\/[\d]*\/height\/[\d]*)/g, "");
        });
    });
};
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === "childList" || mutation.type === "subtree") {
            processImages();
        }
    });
});
const config = {
    childList: true,
    subtree: true,
};
observer.observe(document.body, config);
processImages();