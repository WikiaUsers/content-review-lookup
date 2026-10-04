// ===== Standalone Tooltips =====
(function initStandaloneTooltips() {
    function processTooltips(container) {
        const triggers = (container || document).querySelectorAll('.advanced-tooltip, .tooltips-init-complete, [data-title]');
        triggers.forEach((trigger) => {
            if (trigger.id === 'ot-sdk-btn-floating' || trigger.classList.contains('ot-floating-button')) return;
            if (trigger.classList.contains('standalone-tooltip-active')) return;
            trigger.classList.add('standalone-tooltip-active');

            const title = trigger.getAttribute('data-title') || 'SCP-035';
            const imageFile = trigger.getAttribute('data-image') || '035AnimatedRender.gif';
            const description = trigger.getAttribute('data-description') || '';

            const popup = document.createElement('div');
            popup.className = 'tooltip-contents scp-card';

            const imgId = 'tooltip-img-' + Math.random().toString(36).substring(2, 9);
            popup.innerHTML = `
            <div class="scp-card-container">
                <div class="scp-card-image tooltip-img-fit">
                    <img id="${imgId}" src="" alt="${mw.html.escape(title)}" />
                </div>
                <div class="scp-card-content">
                    <div class="scp-card-title">${mw.html.escape(title)}</div>
                    <div class="scp-card-description">${mw.html.escape(description)}</div>
                </div>
            </div>`;

            trigger.appendChild(popup);

            let cachedImageUrl = '';
            const cleanFileName = imageFile.replace(/^(File:|Image:)/i, '');

            // Fetch direct original image URL from MediaWiki API
            fetch(`/api.php?action=query&titles=File:${encodeURIComponent(cleanFileName)}&prop=imageinfo&iiprop=url&format=json`)
                .then(res => res.json())
                .then(data => {
                    const pages = data.query?.pages || {};
                    const pageId = Object.keys(pages)[0];
                    if (pageId && pageId !== "-1" && pages[pageId].imageinfo) {
                        cachedImageUrl = pages[pageId].imageinfo[0].url;
                        const imgElem = document.getElementById(imgId);
                        if (imgElem) {
                            imgElem.src = cachedImageUrl;
                        }
                    }
                })
                .catch(err => console.error("Error fetching image URL:", err));

            trigger.addEventListener('mouseenter', () => {
                popup.classList.add('is-active');
                const imgElem = document.getElementById(imgId);

                if (imgElem && cachedImageUrl) {
                    const delimiter = cachedImageUrl.includes('?') ? '&' : '?';
                    imgElem.src = cachedImageUrl + delimiter + 't=' + new Date().getTime();
                }
            });

            trigger.addEventListener('mouseleave', () => {
                popup.classList.remove('is-active');
            });
        });
    }

    processTooltips();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => processTooltips());
    }

    const observer = new MutationObserver(() => {
        processTooltips();
    });
    observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true
    });
})();

mw.hook('ppreview.show').add(function(popup) {
    var $popup = $(popup);
    
    $popup.css({
        'background-color': '#000000',
        'background': '#000000',
        'border': '1px solid #333333',
        'color': '#ffffff'
    });
    
    $popup.find('.npage-preview-title, h3, a').css({
        'color': '#ffffff'
    });
});


// ===== Tooltip Animations =====

document.addEventListener('DOMContentLoaded', function() {
    const tooltips = document.querySelectorAll('.advanced-tooltip');

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('click', function(e) {
            e.stopPropagation();
            
            tooltips.forEach(t => {
                if (t !== tooltip) t.classList.remove('is-active');
            });

            this.classList.toggle('is-active');
        });
    });

    document.addEventListener('click', function() {
        tooltips.forEach(tooltip => tooltip.classList.remove('is-active'));
    });
});

mw.loader.using( 'mediawiki.user' ).then( function() {
    mw.user.tokens.set( 'patrolToken', '...' ); 
} );

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ArticlePreview.js'
    ]
});