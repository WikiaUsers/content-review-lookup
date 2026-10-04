function replaceTitles() {
    const replacements = {
        "Bedwarsmayhem": "bedwarsmayhem",
    };

    document.querySelectorAll("*").forEach(el => {
        if (
            el.children.length === 0 &&
            el.textContent
        ) {
            let text = el.textContent.trim();

            if (replacements[text]) {
                el.textContent = replacements[text];
            }
        }
    });

    document.title = document.title
        .replace(/\bBedwarsmayhem\b/g, "bedwarsmayhem");
}

replaceTitles();

new MutationObserver(replaceTitles).observe(document.body, {
    childList: true,
    subtree: true
});