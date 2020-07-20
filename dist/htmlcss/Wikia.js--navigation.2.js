/**
 * This script allows the creation of custom navigation.
 * It will accept images and links.
 * 
 * The script has been created by Ultimate Dark Carnage,
 * and is made specifically for this wiki. You must
 * ask permission before you use it.
 **/
(function(global, mw, $, obj, factory, undefined){
    if (['oasis', 'wikia'].indexOf(mw.config.get('skin')) > -1){
        factory.apply(global, [mw, $, obj]);
    } else return undefined;
}(typeof window !== 'undefined' ? window : this, mediaWiki, jQuery, window.CustomNavigation = window.CustomNavigation || {}, function(mw, $, obj){
    var a = {}, b = false, c = [];
    a.extend = function extend(){
        var obj = [a], args = c.slice.call(arguments);
        args.forEach(function(arg){
            obj[obj.length] = arg;
        });
        $.extend.apply($, obj);
    };
    
    a.extend({
        version: '1.1.0',
        config: {
            msg: {
                'en': {
                    complete: 'CustomNavigation %version has been loaded and is ready to use.',
                    fail: 'CustomNavigation cannot be loaded at this time. Please try again later.'
                }
            },
            col_length: 2
        }
    });
    
    a.extend({
        fn: {
            back: function back(navObject){
                navObject.getActiveElement(function($activeElement){
                    $activeElement.find('.tab-wrapper').css('display', 'block')
                        .animate({
                            'left': '0',
                            'opacity': 1
                        }, 'fast').promise().done(function(){
                            $activeElement.find('.tab-content').empty()
                                .removeClass('show');
                        });
                });
            },
            forward: function next(navObject){
                
            }
        }
    });
}));