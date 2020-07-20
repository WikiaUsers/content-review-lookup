(function(mw, $){
    var Randomizer = {};
    Randomizer.createUI = function(){
        var RandomizerUI = $('<section />', {
            'class': ['RandomizerWrapper', 'randomizer', 'randomizer-ui'].join(' '),
            'id': 'RandomizerWrapper',
            html: [
                $('<form />', {
                    'class': ['RandomizerForm', 'WikiaForm', 'randomizer-form'].join(' '),
                    html: $('<div />', {
                        'class': ['RandomizerFormUI', 'randomizer-form-ui'].join(' '),
                        'id': 'RandomizerFormUI'
                    })
                }),
                $('<ul />', { 'class': ['RandomizerList', 'randomizer-list'].join(' '), 'id': 'RandomizerList' })
            ]
        });
        return RandomizerUI;
    };
}(this.mediaWiki, this.jQuery));