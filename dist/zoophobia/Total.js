// A defensive semicolon prevents issues if another script is concatenated before this one.
;(function($, mw) {

    // Use the official MediaWiki hook for page content. This is a best practice.
    mw.hook('wikipage.content').add(function($content) {

       //Find the dropdown
        const $targets = $content.find('.dropdown_menu');

//Guard clause
        if ($targets.length === 0) {
            return;
        }


        // Create the manager object. It's only created when needed.
        const dropdownManager = (function() {
            const changeColor = function(elementClicked) {
                // Using jQuery's .css() is consistent since we are already using it.
                $(elementClicked).css('background-color', `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`);
            };

            return {
                changeColor
            };
        })();

        // Attach the click handler to the targets we found.
        $targets.on('click', function() {
            dropdownManager.changeColor(this);
        });
        console.log('Dropdown manager initialized');
    });

})(jQuery, window.mw); //Remember to pass the objects inside or it's over