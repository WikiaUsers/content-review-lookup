/* Code 1: Add a Python Shell Embed to Experiment */
	// #### Class used: ShellFrame #### //
	// Miniaml use will be practiced. Users will have to get an
	// an approval from a sysop before they use the class on a div element
	
	mw.hook('wikipage.content').add(function($content) {
    $content.find('.ShellFrame:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: 540,
                scrolling: 'no',
                src: 'https://trinket.io/embed/python3/055c60f8a0',
                width: 720
            })
        ).addClass('loaded');
    });
});

/* Code 1 Ends here */

/*  Code 2 */
//A possible code to import the datacamp shell for python to show examples //
mw.loader.load('https://cdn.datacamp.com/dcl-react.js.gz');
/* Code 2 end here */