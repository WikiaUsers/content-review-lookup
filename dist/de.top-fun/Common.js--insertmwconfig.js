/*  Replace the HTML contents of matching elements with mw globals
 *  2012-11-14 [[User:PerryH|Perry]]
 */
$('.mwConfig').html(function () {
    var mwConfig = $(this).html();
    if (mw.config.exists(mwConfig)) {
        $(this).html(mw.config.get(mwConfig));
    }
});