importScript('MediaWiki:GalleryScript.js');
importScript('MediaWiki:ImageScript.js');

(function() {
    const cssId = 'custom-fandom-css'; // ID for our <style> tag

    function loadCSS() {
        if (!document.getElementById(cssId) && !isEditing()) {
            fetch('https://undertale-timeline-corruption.fandom.com/wiki/MediaWiki:FontSizes.css?action=raw')
                .then(response => response.text())
                .then(css => {
                    const style = document.createElement('style');
                    style.id = cssId;
                    style.textContent = css;
                    document.head.appendChild(style);
                });
        }
    }

    function removeCSS() {
        const style = document.getElementById(cssId);
        if (style) style.remove();
    }

    function isEditing() {
        // True if the user is editing via source or VisualEditor
        return location.search.includes('action=edit') || 
               location.search.includes('veaction=edit') || 
               location.search.includes('veaction=editsource');
    }

    // Initial load
    if (isEditing()) {
        removeCSS();
    } else {
        loadCSS();
    }

    // Watch for SPA-style URL changes
    const observer = new MutationObserver(() => {
        if (isEditing()) removeCSS();
        else loadCSS();
    });
    observer.observe(document, { subtree: true, childList: true });
})();