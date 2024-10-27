/* "Português do Brasil" -> "Português" in dropdown*/
document.querySelectorAll('a[data-tracking-label^="lang-pt-br" i]').forEach(function(link) {
    if (link.textContent === "Português do Brasil") {
        link.textContent = "Português";
    }
});

/* "português do Brasil" -> "português" in dropdown header*/
document.querySelectorAll('.wds-dropdown__toggle').forEach(function(element) {
    let textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
    if (textNode && textNode.textContent.trim() === "português do Brasil") {
        textNode.textContent = "português";
    }
});