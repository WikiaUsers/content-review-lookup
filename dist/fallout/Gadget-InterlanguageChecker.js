// Interlanguage Checker
addOnloadHook(() => {
    if (skin !== "oasis") return;

    const menuItems = $(".page-header__contribution-buttons .wds-dropdown .wds-list");
    if (!menuItems.length) return;

    const apiUrl = "https://fallout.fandom.com/api.php";
    const namespace = Object.keys(wgNamespaceIds).find(key => wgNamespaceIds[key] === wgNamespaceNumber);
    const articleId = namespace === "" ? wgTitle : (namespace + ":" + wgTitle);
    const ilcUrl = `https://fwdekker.com/tools/interlanguage-checker/?api=${encodeURIComponent(apiUrl)}&article=${encodeURIComponent(articleId)}`;
    
    const button = `<li><a id="ca-talk" href="${ilcUrl}" class="new">Check IW</a></li>`;
    menuItems.append(button);
});