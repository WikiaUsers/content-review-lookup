
// **************************************************
// Tabber changes to avoid anchor points on URL for articles
// **************************************************

mw.hook('wikipage.content').add(function($content){
    $.each($content.find('.tabbernav a, .tabbertab'), function(){
        var $this = $(this);
        $this.attr('title', $this.attr('title') + '.');
    });
});