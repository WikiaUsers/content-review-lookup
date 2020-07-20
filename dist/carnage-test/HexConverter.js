(function($, mw){
    function BaseConverter(){
        this.hex = false;
        this.dec = false;
        this.text = false;
        this.loaded = false;
        this.create();
    }
    
    BaseConverter.prototype = {
        isBlankPage: 
            mw.config.get('wgPageName').split('/')[0] == 'Special:BlankPage',
        isPage:
            mw.config.get('wgPageName').split('/')[1] == 'BaseConverter',
        options: ['', 'Hex', 'Dec', 'Text'],
        create: function(){
            this.$html = 
                $('<section>').addClass('BaseConverter').html(
                    $('<form />').addClass('BaseConverterForm')
                    .html([
                        $()
                    ])
                );
        },
        loadHTML: function(){
            if (this.isBlankPage && this.isPage){
                this.$wrapper = $('#mw-content-text');
                this.$wrapper.empty();
                this.$wrapper.html(this.$html);
            }
        }
    };
}(jQuery, mediaWiki));