// 18:13, December 31, 2019 (UTC)

// JS for the StatusIndicator (ATW:SI)
// From User:Rappy_4187 (Aion Wiki)
// Taken from w:c:admintools:MediaWiki:Common.js/statusIndicator.js
// Simplified

// Put StatusIndicator in ProfileMasthead
$(function() {
    // Support for Template:Statustop2
    if ($('.status.helpcursor').length) {
        switch (skin) {
            case 'oasis':
                $('<li id="mastheadstatus"><span>Status</span></li>').insertBefore('.masthead-info .details ul li:first');
                $('.status.helpcursor').appendTo('.details li:first');
                break;
        }
    }
});