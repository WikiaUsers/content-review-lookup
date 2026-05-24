/* fandom staff, this just changes my name to Teto */

mw.hook('wikipage.content').add(() => {
    document.querySelectorAll('a').forEach(link => {
        if (!link.href || !link.href.includes("User:TayJay1320")) return;

        link.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("TayJay1320")) {
                node.textContent = node.textContent.replace("TayJay1320", "Teto");
            }
        });
    });
});