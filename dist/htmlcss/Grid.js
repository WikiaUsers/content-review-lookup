;(typeof mediaWiki !== 'undefined' && function($, mw, window){
    var Grid = window.Grid || {};
    Grid.create = function create(grid_data){
        var $grid = $('<nav />', {
            'class': 'main-page-grid grid',
            'id': 'main-page-grid'
        });
        $grid.html($.map(grid_data, function(col, index){
            var width = $grid.width(),
                $elem = $('<ul />', {
                    'class': 'main-page-grid-row row',
                    'id': 'main-page-grid-row-' + index
                });
            $elem.html($.map(col, function(item, i){
                var grid_width = Math.floor((1 / col.length) * width);
                
            }));
        }));
    };
    Grid.init = function init(){};
})(this.jQuery, this.mediaWiki, this);