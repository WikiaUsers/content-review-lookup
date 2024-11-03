/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    // Check for the user's color scheme preference
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Log the detected mode to confirm
    console.log('Is dark mode:', isDarkMode);

    // Select all heading elements with the dynamic-heading class
    $('.dynamic-heading').each(function() {
        const heading = $(this);
        console.log('Processing heading:', heading.text()); // Log each heading

        if (isDarkMode) {
            heading.css({
                'background-color': '#FF7C24', // Dark mode background color
                'color': 'white' // Dark mode text color
            });
        } else {
            heading.css({
                'background-color': '#c3c3c3', // Light mode background color
                'color': 'black' // Light mode text color
            });
        }

        // Log the applied styles for debugging
        console.log('Applied styles:', heading.css(['background-color', 'color']));
    });
});