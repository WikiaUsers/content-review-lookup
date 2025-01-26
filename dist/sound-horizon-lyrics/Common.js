/* Any JavaScript here will be loaded for all users on every page load. */
// Tailwind Config
(function() {
    if (typeof mw !== 'undefined') {
        console.log('Loading Tailwind CSS...');
        mw.loader.getScript('https://cdn.tailwindcss.com')
            .then(function() {
                console.log('Tailwind CSS loaded');
                window.tailwind.config = {
                    important: true,
                    corePlugins: {
                        preflight: false
                    },
                    prefix: 'tw-',
                    darkMode: ['class', '[data-theme="dark"]'],
                    theme: {
                        extend: {}
                    }
                };
            })
            .fail(function(error) {
                console.error('Failed to load Tailwind:', error);
            });
    }
})();