/* Any JavaScript here will be loaded for all users on every page load. */

// *********************************
// Positioning for Template:PageTags
// *********************************

$('.page-header__actions').prepend( $( '#pagetags' ) );
$( '#pagetags' ).css( { 'float' : 'left', 'margin-right' : '15px', 'margin-top' : '5px' } ).show();

/* MultiClock Philippines Configuration */
window.MultiClockConfig = {
    interval: 500, 
    clocks: [
        {
            label: "Philippines",
            offset: 8,
            color: "#FFFFFF",
            format: "%H:%M:%S %b %d %Y"
        },
        {
            label: "UTC",
            offset: 0,
            color: "#FFFFFF",
            format: "%H:%M:%S %b %d %Y"
        }
    ]
};