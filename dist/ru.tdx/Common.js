window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 28;

window.MultiClockConfig = {
    interval: 500, 
    clocks: [
        { label: "CST", offset: -6, color: "#f26b66", format: "%H:%M:%S %d %b %Y" },
        { label: "MSK", offset: 3, color: "#adff2f", format: "%H:%M:%S %d %b %Y" },
        { label: "Local", offset: -(new Date().getTimezoneOffset()) / 60, color: "#aaf8ff", format: "%H:%M:%S %d %b %Y" }
    ]
};
importArticles({
	type: 'script',
	articles:
	[        
		'u:dev:MediaWiki:MultiClock.js',
	]});

$(function() {
    var $descBox = $('#filter-description-box');
    var defaultText = "Наведите на иконку, чтобы увидеть описание";

    $('.filter-btn').hover(
        function() {
            var desc = $(this).data('desc');
            if (desc) {
                $descBox.text(desc).addClass('is-active-desc');
            }
        }, 
        function() {
            $descBox.text(defaultText).removeClass('is-active-desc');
        }
    );
});