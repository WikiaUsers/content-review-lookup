/* Any JavaScript here will be loaded for all users on every page load. */

/* Custom block message send with dev script MessageBlock */
window.MessageBlock = {
  title : 'You have been blocked from the ZOE Broadcasting Network Wiki',
  message : 'You have been blocked from the ZOE Broadcasting Network Wiki by $3 as you violated the wikis policies. As a preventative measure, you have been blocked from editing for $2 due to $1. If you believe this block is unjustified or that there has been a mistake, you may contest this this block on my wall on Community Central.',
  autocheck : true
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MessageBlock/code.js'
    ]
});

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