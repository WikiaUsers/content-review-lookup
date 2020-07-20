(function($modules, mw, $){
    importArticle({
        type: 'script',
        article: 'MediaWiki:Options.js/api.js'
    });
    
    var $load = $load || function $load(module){
        var loaded = null;
        if (module.loaded === false){
            if (module.load instanceof Function){
                loaded = Function.prototype.apply.call(module.load, window, [module.config]) || false;
            } else if (module.load instanceof Object){
                loaded = {};
                for (var $submodule in module.load){
                    loaded[$submodule] = Function.prototype.apply.call(module.load[$submodule], window, [module.config[$submodule]]) || false;
                }
            } else {
                loaded = false;
            }
        }
        return loaded;
    }, $module_arr = [];
    
    for (var m in $modules){
        var module = $modules[m];
        if ($modules instanceof Object){
            $module_arr.push({ name: m, loaded: $load(module) });
            if (mw.config.get('wgCanonicalSpecialPage', wgCanonicalSpecialPage) == 'Chat') $load(module);
        }
    }
})({
    'Party Mode': {
        config: {
            lights: {
                options: ['Colored', 'White', 'Monochrome', 'Red'],
                specialOptions: {
                    'New Years': 'January 1',
                    'Valentines Day': 'February 14',
                    'St. Patrick\'s Day': 'March 17',
                    'Halloween': 'October 31',
                    'Christmas': 'December 25'
                }
            },
            music: {},
            theme: {}
        },
        load: function(config){
            function isDate(str){
                var months = 'January February March April May June July August September October November December'.split(/\s+/g),
                    d = new Date(),
                    month_name = months[d.getMonth()],
                    full_date = String(month_name + ' ' + d.getDate());
                return str == full_date;
            }
            
            for (var day in config.lights.specialOptions){
                var specialOptions = config.lights.specialOptions;
                if (isDate(specialOptions[day])) config.lights.options.push(day);
            }
        }
    },
    'Chat Options': {
        load: function(config){
            
        }
    },
    'Chat Console': {
        load: function(config){
            
        }
    },
    'Commands': {
        load: function(config){
            
        }
    },
    'Censor': {
        load: function(config){
            
        }
    }
}, this.mediaWiki, this.jQuery);