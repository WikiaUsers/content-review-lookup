(function($, mw){
    function CustomModal(){
        this.opened = $.Deferred();
        this.loaded = $.Deferred();
        this.$container = $('<div />');
        this.$modal = $('<section />');
    }
}(jQuery, mediaWiki));