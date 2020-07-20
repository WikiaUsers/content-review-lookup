var scss = {
    variable_regex: /\$([a-zA-Z0-9\-\+]{1,}):(?:\s+|)(.*)\;/,
    functions: {
        'darken': function($value, percentage){
            var color_regex = {
                hex: /\#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})/g,
                rgb: /rgb\(([0-9]{1,3})(?:,\s+|,)([0-9]{1,3})(?:,\s+|,)([0-9]{1,3})\)/,
                rgba: /rgba\(([0-9]{1,3})(?:,\s+|,)([0-9]{1,3})(?:,\s+|,)([0-9]{1,3})(?:,\s+|,)([0-9\.]{1,3})\)/
            };
            
            percentage = percentage.replace(/([0-9]{1,})\%/, function(match, perc){
                perc = Number(perc);
                if (!isNaN(perc)){
                    perc = perc * 0.01;
                }
                return perc;
            });
            
            percentage = Number(percentage);
            
            var darken = {
                hex: function(match, hex){
                    var r = hex.substr(0,2),
                        g = hex.substr(2,4),
                        b = hex.substr(4,6);
                    var r_n = parseInt(r, 16),
                        g_n = parseInt(g, 16),
                        b_n = parseInt(b, 16);
                    
                    r_n = r_n - (r_n * percentage);
                    g_n = g_n - (g_n * percentage);
                    b_n = b_n - (b_n * percentage);
                    
                    r = r_n.toString(16);
                    g = g_n.toString(16);
                    b = b_n.toString(16);
                    
                    return [r, g, b].join('');
                },
                rgb: function(match, r, g, b){
                    var rgb = [r, g, b].map(function(el){
                        el = Number(el);
                        if (!isNaN(el)){
                            el = el - (el * percentage);
                        }
                        return String(el);
                    });
                    
                    return rgb;
                }
            };
            
            for (var type in color_regex){
                if (color_regex.hasOwnProperty(type)){
                    var regex = color_regex[type];
                    if (regex.test($value)){
                        $value = $value.replace(regex, _darken[type]);
                    }
                }
            }
            
            console.log($value);
        }
    }
};