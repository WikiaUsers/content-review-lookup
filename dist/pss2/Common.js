$(document).ready(function () {
    // Replace "Expand" with "See All"
    $('.mw-collapsible-toggle a').each(function () {
        if ($(this).text().trim() === 'Expand') {
            $(this).text('See All');
        }
    });

    // Watch for clicks and swap to "See Less"
    $(document).on('click', '.mw-collapsible-toggle a', function () {
        var linkText = $(this).text().trim();
        if (linkText === 'See All') {
            $(this).text('See Less');
        } else if (linkText === 'See Less') {
            $(this).text('See All');
        }
    });
});
$(function () {
    if ($('#video-bg').length === 0) {
        $('body').prepend(`
            <div id="video-bg">
                <iframe src="https://www.youtube.com/embed/iqGVXkH8ZhI?autoplay=1&mute=1&loop=1&playlist=iqGVXkH8ZhI&controls=0&showinfo=0&modestbranding=1"
                frameborder="0"
                allow="autoplay; fullscreen"
                allowfullscreen>
                </iframe>
            </div>
        `);
    }
});