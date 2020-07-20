var Modern = (function() {
    modern = function Modern() {
        this.init();
    };
    modern.prototype.init = function() {
        $('.WikiaPage').before(
            $('<div />').addClass('custom-sidenav').css({
                'height': '100%',
                'width': '100px',
                'background-color': '#25883d',
                'color': 'white',
                'position': 'absolute',
                'left': 0,
                'top': 0,
            }).html(
                $('<ul />').css({
                    'margin-top': '100px',
                    'margin-bottom': '100px'
                })
            )
        );
    };
 
    return modern;
})();