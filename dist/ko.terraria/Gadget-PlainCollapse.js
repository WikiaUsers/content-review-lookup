$('.plaincollapse').each(function(){
    var $this = $(this);
    var plainCollapseLink = $this.find('.mw-collapsible-toggle a');
    $this.find('.mw-collapsible-toggle').empty().append(plainCollapseLink);
});