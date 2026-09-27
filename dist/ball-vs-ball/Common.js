/* Any JavaScript here will be loaded for all users on every page load. */
/**
 * Converts specific HTML spans with data-url attributes into 
 * functional custom protocol links (like roblox://).
 */
mw.hook('wikipage.content').add(function ($content) {
    // Target any element with the 'app-link' class and a data-url attribute
    $content.find('.app-link[data-url]').each(function () {
        var $el = $(this);
        var url = $el.data('url');
        
        // Define allowed custom protocols for security
        var allowedProtocols = /^(roblox|discord|steam|roblox-studio):\/\//i;
        
        // Validate that the URL uses an allowed protocol
        if (allowedProtocols.test(url)) {
            // Create the new anchor element safely
            var $link = $('<a>', {
                href: url,
                class: 'custom-protocol-link',
                target: '_blank',
                rel: 'noopener noreferrer'
            });
            
            // Move the original text/content inside the new link
            $el.wrap($link);
        }
    });
});