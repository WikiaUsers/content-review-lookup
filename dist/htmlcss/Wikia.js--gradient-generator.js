;(function(mw, $, window, gradientGenerator){
    var _mw = mw.config.get([
        'wgPageName',
        'wgCanonicalSpecialPageName',
        'wgUserName',
        'wgUserLanguage',
        'skin'
    ]);
    
    /************************
     * Start helper functions
     * for colors
     ***********************/
    function addZero(character){
        var hex_chars = '0123456789abcdef'.split('');
        if (character.length === 1){
            if (hex_chars.indexOf(character) > -1){
                character = '0'.concat(character);
            }
        }
        return character;
    }
    
    function lighten(color, percentage){
        var hex_regex = /#([0-9a-f]{3,6})/gi,
            rgb_regex = /rgb\(([0-9]{1,3})(?:,\s+|,)([0-9]{1,3})(?:,\s+|,)([0-9]{1,3})\)/g,
            rgba_regex = /rgba\(([0-9]{1,3})(?:,\s+|,)([0-9]{1,3})(?:,\s+|,)([0-9]{1,3})(?:,\s+|,)([0-1]\.[0-9]{1,})\)/g;
        percentage = percentage.replace(/([0-9]{1,})%/, '$1');
        percentage = Number(percentage) / 100;
        if (hex_regex.test(color)){
            color = color.replace(hex_regex, function(match, hex){
                var r = hex.slice(0, 2),
                    g = hex.slice(2, 4),
                    b = hex.slice(4, 6);
                
                r = parseInt(r, 16);
                g = parseInt(g, 16);
                b = parseInt(b, 16);
                
                r = Math.round(((r + (r * percentage)) > 255
                    ? 255
                    : ((r + (r * percentage)) <= 0 ? 0 : (r + (r * percentage))))).toString(16);
                g = Math.round(((g - (g * percentage)) > 255
                    ? 255
                    : ((g + (g * percentage)) <= 0 ? 0 : (g + (g * percentage))))).toString(16);
                b = Math.round(((b - (b * percentage)) > 255
                    ? 255
                    : ((b + (b * percentage)) <= 0 ? 0 : (b + (b * percentage))))).toString(16);
                return '#'.concat([addZero(r), addZero(g), addZero(b)].join(''));
            });
        } else if (rgb_regex.test(color)){
            
        }
        return color;
    }
    
    
    function darken(color, percentage){
        var hex_regex = /#([0-9a-f]{3,6})/gi,
            rgb_regex = /rgb\(([0-9]{1,3})(?:,\s+|,)([0-9]{1,3})(?:,\s+|,)([0-9]{1,3})\)/g,
            rgba_regex = /rgba\(([0-9]{1,3})(?:,\s+|,)([0-9]{1,3})(?:,\s+|,)([0-9]{1,3})(?:,\s+|,)([0-1]\.[0-9]{1,})\)/g;
        percentage = percentage.replace(/([0-9]{1,})%/, '$1');
        percentage = Number(percentage) / 100;
        if (hex_regex.test(color)){
            color = color.replace(hex_regex, function(match, hex){
                var r = hex.slice(0, 2),
                    g = hex.slice(2, 4),
                    b = hex.slice(4, 6);
                
                r = parseInt(r, 16);
                g = parseInt(g, 16);
                b = parseInt(b, 16);
                
                r = Math.round(((r - (r * percentage)) > 255
                    ? 255
                    : ((r - (r * percentage)) <= 0 ? 0 : (r - (r * percentage))))).toString(16);
                g = Math.round(((g - (g * percentage)) > 255
                    ? 255
                    : ((g - (g * percentage)) <= 0 ? 0 : (g - (g * percentage))))).toString(16);
                b = Math.round(((b - (b * percentage)) > 255
                    ? 255
                    : ((b - (b * percentage)) <= 0 ? 0 : (b - (b * percentage))))).toString(16);
                return '#'.concat([addZero(r), addZero(g), addZero(b)].join(''));
            });
        }
        return color;
    }
    /***********************
     * End helper functions
     * for colors
     **********************/
    
    function createPaletteFrom(color, limit){
        var plimit = typeof limit == 'number' ? limit : 6,
            palette = [];
        for (var i = 0; i < plimit; i++){
            var plength = palette.length,
                percentage = i / (limit - 1);
            percentage = percentage * 100;
            percentage = String(percentage).concat('%');
            palette[plength] = lighten(color, percentage);
        }
        return palette;
    }
    
    function createPaletteTo(color, limit){
        var plimit = typeof limit == 'number' ? limit : 6,
            palette = [];
        for (var i = 0; i < plimit; i++){
            var plength = palette.length,
                percentage = i / (limit - 1);
            percentage = percentage * 100;
            percentage = String(percentage).concat('%');
            palette[plength] = darken(color, percentage);
        }
        return palette;
    }
    
    if (['oasis', 'wikia'].indexOf(_mw.skin) > -1){
        var GradientGenerator = {
            addColorStop: function addColorStop(){
                var $parent = $('#gg-color-stops'),
                    colorStop = GradientGenerator.createColorStop({
                        color: '#000000',
                        perc: '50%'
                    });
                $parent.append(colorStop);
            },
            blankspecial: 'grad-generator',
            createColorStop: function(config){
                var $color_stop = $('<li class="gg-color-stop" />');
                $color_stop.attr({
                    'data-color': config.color
                });
                $color_stop.html(
                    [$('<a href="#gg-color-stops" class="color-box" />'),
                    $('<input type="number" class="gg-color-input" name="color-stop" />').val(config.perc)]
                )
                return $color_stop;
            },
            config: {
                color_stops: [
                    ['#000000', '0%'],
                    ['#ffffff', '100%']
                ],
                orientation: 'top',
                palette: [
                    createPaletteFrom('#000000', 6),
                    createPaletteFrom('#ff0000', 6),
                    createPaletteFrom('#00ff00', 6),
                    createPaletteFrom('#0000ff', 6)
                ],
                newSyntOrientation: {
                    'top': 'to bottom',
                    'bottom': 'to top',
                    'left': 'to right',
                    'right': 'to left',
                    'top left': 'to bottom right',
                    'top right': 'to bottom left',
                    'bottom left': 'to top right',
                    'bottom right': 'to top left'
                },
                linearGradients: {
                    // TODO: Support for the legacy "-webkit-gradient" syntax
                    // webkitGradient: 'webkit-gradient(linear, <pos>, <grad>),
                    mozLinearGradient: '-moz-linear-gradient(<pos>, <grad>)',
                    webkitLinearGradient: '-webkit-linear-gradient(<pos>, <grad>)',
                    msLinearGradient: '-ms-linear-gradient(<pos>, <grad>)',
                    oLinearGradient: '-o-linear-gradient(<pos>, <grad>)',
                    linearGradient: 'linear-gradient(<pos>, <grad>)'
                },
                // TODO:
                // Support for radial gradients
                /*
                radialGradients: {
                },
                */
            },
            init: function(){
                var config = GradientGenerator.config;
            }
        };
    }
})(this.mediaWiki, this.jQuery, window, this.gradientGenerator || {});