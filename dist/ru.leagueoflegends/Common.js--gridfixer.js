/* Author:     Karol "[[User:Nanaki]]" Dylewski */
/* License:    CC-BY-SA 3.0 */
 
( function( $ ) {
    function gridFixer() {
        $('.centered-grid').each(function () {
            $(this).contents().filter(function() {return this.nodeType === 3;}).remove()
            handleGridResize($(this)).addClass('centered-grid-applied');
        });
        $(window).resize(function() { $('.centered-grid').each(function () { handleGridResize($(this)); }); });
    }
    function handleGridResize(grid) {
        grid = $(grid)
 
        var elemWidth = grid.data('element-width')
        if(!elemWidth) {
            if(grid.children().length == 0) return $([])
            var firstElem = $(grid.children()[0])
            elemWidth = firstElem.outerWidth(true)
            grid.data('element-width', elemWidth)
        }
        if(!elemWidth) return;
 
        grid.css({ width: '' });
 
        if(grid.parent().is(":hidden")) {
            var prevDisplay = grid.parent()[0].style.display
            grid.parent().css({
                display: '',
                visibility: 'hidden',
                height: '0 !important',
            });
            grid.parent().css({
                marginTop: '-'+(grid.parent().outerHeight(true)-parseInt(grid.parent().css('margin-top').replace('px','')))+'px !important',
            });
            var width = grid.width()
            grid.parent().css({
                display: prevDisplay,
                visibility: '',
                height: '',
                margin: '',
            });
        } else {
            var width = grid.width()
        }
 
        var columns = Math.min(Math.floor(width/elemWidth), grid.children().length)
 
        var newWidth = columns*elemWidth
 
        grid.width(newWidth)
        return grid
    }
 
    $( gridFixer )
} )( jQuery );