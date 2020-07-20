var EMenu = new Class({
    Implements: [Events, Options],
    
    options: {
        autocalc: true,
        image_speed: 400,
        menu_speed: 200
    },
    
    initialize: function(id, options){
        this.setOptions(options);
        this.over = false;
        var menu = $(id), 
            first_list_lis = menu.getFirst().getChildren(),
	        count = first_list_lis.length,
	        width = menu.getStyle('width').toInt(),
            li_width = Math.floor(width / count),
            img_opacity = new Fx.Tween(menu.getElement('.menu_content'), {
                property: 'opacity',
                link: 'cancel',
                duration: this.options.image_speed
            });
        
        menu.getFirst().addEvents({
            mouseenter: function(){
                img_opacity.start(0.5);
            },
            mouseleave: function(){
                img_opacity.start(1);
            }
        });
        
        first_list_lis[0].addClass('first');
        first_list_lis.each(function(el){
            
            if (this.options.autocalc) {
                var new_width = li_width;
                
                $each(el.getStyles('border-left', 'border-right', 'padding-left', 'padding-right', 'margin-left', 'margin-right'), function(val){
                    new_width -= val.toInt();
                });
                
                el.setStyle('width', new_width);
            }
            
            var second_list = el.getElement('ul');
            second_list.setOpacity(0).getFirst().addClass('first');
            
            if (this.options.autocalc) {
                $each(second_list.getStyles('border-left', 'padding-left', 'margin-left'), function(val){
                    new_width -= val.toInt();
                });
                
                second_list.setStyles({
                    width: new_width,
                    height: menu.getStyle('height').toInt()
                })
            }
            
            var fx = new Fx.Tween(second_list, {
                property: 'opacity',
                link: 'cancel',
                duration: this.options.menu_speed
            });
            
            var that = this;
            
            el.addEvents({
                mouseenter: function(event){
                    fx.start(1).chain(function(){
                        that.fireEvent('onMenuShow', this);
                        (function(){that.over = true;}).delay(50); // delay prevents race conditions
                    }.bind(this));
                    this.addClass('hover');
                },
                mouseleave: function(){
                    fx.start(0).chain(function(){
                        if (that.over) {
                            that.fireEvent('onMenuHide', this);
                            that.over = false;
                        }
                    }.bind(this));
                    this.removeClass('hover');
                }
            });
            
        }.bind(this));
    }
});