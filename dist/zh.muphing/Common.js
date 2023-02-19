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

/* 分欄 */
$(function () {
    const lang = (mw.config.get('wgUserVariant') || '').substring(3) || 'zh';
    const tabberexAll = document.querySelectorAll('.tabberex');
    tabberexAll.forEach(checkDefaultTab);
    tabberexAll.forEach(removeDataDefault);
    function checkDefaultTab(tabberex) {
        const dataDefault = tabberex.dataset[lang + 'Default'];
        if (dataDefault) {
            tabberex.insertBefore(tabberex.childNodes[dataDefault - 1], tabberex.childNodes[0]);
            return;
        }
        if (['cn','my','sg'].includes(lang)) {
            const dataHansDefault = tabberex.dataset.hansDefault;
            if (dataHansDefault) {
                tabberex.insertBefore(tabberex.childNodes[dataHansDefault - 1], tabberex.childNodes[0]);
            }
        }
        if (['hk','mo','tw'].includes(lang)) {
            const dataHantDefault = tabberex.dataset.hantDefault;
            if (dataHantDefault) {
                tabberex.insertBefore(tabberex.childNodes[dataHantDefault - 1], tabberex.childNodes[0]);
            }
        }
    }
    function removeDataDefault(tabberex) {
        delete tabberex.dataset.hansDefault;
        delete tabberex.dataset.hantDefault;
        delete tabberex.dataset.cnDefault;
        delete tabberex.dataset.hkDefault;
        delete tabberex.dataset.moDefault;
        delete tabberex.dataset.myDefault;
        delete tabberex.dataset.sgDefault;
        delete tabberex.dataset.twDefault;
    }
});