// Grok Project Embed Script - Custom iframe via JS for Fandom wikis
// Safe and simple: Creates a div and injects an iframe for the Grok project link

mw.loader.using('mediawiki.util').then(function() {
    // Function to embed Grok project
    function embedGrokProject(container) {
        var url = container.getAttribute('data-url') || 'https://grok.com/project/993fa3e3-5d3e-408b-9779-c401cfa97f99';
        var height = container.getAttribute('data-height') || '800px';
        var width = container.getAttribute('data-width') || '100%';

        var iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.width = width;
        iframe.height = height;
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        iframe.style.border = '1px solid #ccc';
        iframe.style.borderRadius = '8px';
        iframe.loading = 'lazy';

        // Optional loading message
        container.innerHTML = '<p>Loading Grok Project...<br><small>If nothing appears, the project may be private or require login on grok.com.</small></p>';
        container.appendChild(iframe);
    }

    // Scan for elements with class "grok-embed"
    var embeds = document.querySelectorAll('.grok-embed');
    embeds.forEach(embedGrokProject);
});