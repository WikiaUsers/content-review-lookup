mw.hook('wikipage.content').add(function () {
    if (!mw.config.get('wgIsArticle')) return;
    if (document.getElementById('auto-maintenance-box')) return;

    const $content = $('#mw-content-text');
    const plainText = $content.clone().find('table, .infobox').remove().end().text().trim();
    const length = plainText.length;

    const issues = [];
    const categories = [];

    /* =====================
       BASIC CONTENT CHECKS
       ===================== */

    if (length < 800) {
        issues.push('This article is very short and may be considered a stub.');
        categories.push('Stub articles');
    }

    if (length > 100000) {
        issues.push('This article is very long and may benefit from being split.');
        categories.push('Long pages');
    }

    if (!/^[^=\n]{40,}/.test(plainText)) {
        issues.push('This article may not have a proper lead section.');
        categories.push('Articles without lead sections');
    }

    /* =====================
       STRUCTURE CHECKS
       ===================== */

    if (!$content.find('ref').length) {
        issues.push('This article does not appear to include any references.');
        categories.push('Articles without references');
    }

    if (!$content.find('.catlinks a').length) {
        issues.push('This article is not listed in any categories.');
        categories.push('Articles without categories');
    }

    if (!$content.find('img').length) {
        issues.push('This article does not include any images.');
        categories.push('Articles without images');
    }

    if (!$content.find('.infobox, .portable-infobox').length) {
        issues.push('This article does not appear to have an infobox.');
        categories.push('Articles without infoboxes');
    }

    /* =====================
       LINK ANALYSIS
       ===================== */

    const internalLinks = $content.find('a[href^="/wiki"]').length;
    const externalLinks = $content.find('a.external').length;

    if (internalLinks < 3) {
        issues.push('This article has very few internal links and may be considered an orphan.');
        categories.push('Orphan articles');
    }

    if (externalLinks > 20) {
        issues.push('This article contains a large number of external links and may need cleanup.');
        categories.push('Articles needing cleanup');
    }

    /* =====================
       FORMAT HEURISTICS
       ===================== */

    const headers = $content.find('h2, h3').length;
    if (headers > 5 && length < 1500) {
        issues.push('This article has many section headers but little content.');
        categories.push('Articles needing cleanup');
    }

    if ($content.find('ul, ol').length > 3 && length < 1000) {
        issues.push('This article relies heavily on lists and may need prose expansion.');
        categories.push('Articles needing cleanup');
    }

    /* =====================
       CLEANUP AGGREGATION
       ===================== */

    if (issues.length >= 3 && length < 3000) {
        issues.push('This article may require general cleanup to improve clarity and structure.');
        categories.push('Cleanup-needed articles');
    }

    if (!issues.length) return;

    /* =====================
       RENDER WIKI-STYLED BOX
       ===================== */

    const box = document.createElement('div');
    box.id = 'auto-maintenance-box';
    box.style.cssText = `
        background: var(--theme-page-background, #1e1e1e);
        border-left: 6px solid var(--theme-accent-color, #f5c542);
        padding: 16px;
        margin-bottom: 1em;
        color: var(--theme-text-color, #e6e6e6);
        font-family: inherit;
    `;

    box.innerHTML = `
        <div style="display:flex; gap:12px;">
            <div style="flex-shrink:0;">
                <svg width="28" height="28" viewBox="0 0 24 24"
                     fill="var(--theme-accent-color, #f5c542)">
                    <path d="M1 21h22L12 2 1 21z"></path>
                </svg>
            </div>
            <div>
                <div style="font-weight:600; margin-bottom:6px;">
                    Maintenance notice
                </div>
                <ul style="margin:0; padding-left:20px;">
                    ${issues.map(i => `<li>${i}</li>`).join('')}
                </ul>
                <div style="margin-top:8px; font-size:0.85em; opacity:0.85;">
                    Maintenance categories (visual only): ${[...new Set(categories)].join(' • ')}
                </div>
            </div>
        </div>
    `;

    $content.prepend(box);
});