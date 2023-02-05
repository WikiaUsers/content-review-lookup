/* 此處內容將用於所有用戶載入的每個頁面。 */

/* 多重訊息框 */
$(function () {
    const collapsibleContentMbox = document.querySelectorAll(".multi-mbox>.mw-collapsible-content>.mbox.mw-collapsible");
    collapsibleContentMbox.forEach(makeUncollapsible);
    function makeUncollapsible(mbox) {
        const collapsibleContent = mbox.querySelectorAll(".mw-collapsible-content");
        if (mbox.classList.contains("mw-collapsed")) {
            collapsibleContent.forEach(uncollapseCollapsed);
        }
        collapsibleContent.forEach(makeCollapsibleUncollapsible);
        mbox.classList.remove("mw-collapsible", "mw-collapsed", "mw-made-collapsible");
    }
    function uncollapseCollapsed(collapsibleContent) {
        collapsibleContent.removeAttribute("style");
    }
    function makeCollapsibleUncollapsible(collapsibleContent) {
        collapsibleContent.classList.remove("mw-collapsible-content");
    }
});