/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:Contributions",
    "Special:Watchlist"
];
function InsertIframeNews() {
    $('.insert-iframe-news').each(function(k,v){
        var $this = $(this);
        $this.append(
            $('<iframe>')
                .attr('src','http://apiv2-bravefrontier.gumi-europe.net/web/notice/index.php')
                .css('position', 'absolute')
                .css('left', $this.data('iframe-left'))
                .css('top', $this.data('iframe-top'))
                .css('width', $this.data('iframe-width'))
                .css('height', $this.data('iframe-height'))
        );
    });
}

// functions to launch on startup
$(function(){
    InsertIframeNews();
});