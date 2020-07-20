(function($, mw, mainRoom){
    function ChatDateChange(){
        this.now = null;
        this.dateTime = null;
        this.$chatwindow = $('.ChatWindow');
        this.delay = 1000;
    }
    
    ChatDateChange.prototype.updateValue = function(){
        setInterval($.proxy(function(){
            this.now = new Date();
            this.dateTime = [this.now.getHours(), this.now.getMinutes(), this.now.getSeconds()];
            if (this.dateTime.every(function(n){
                n = Number(n); return n === 0;
            })){
                this.createInlineAlert(this.createDate(this.now));
            }
        }, this), this.delay);
    };
    
    ChatDateChange.prototype.createInlineAlert = function(){
        
    };
}(jQuery, mediaWiki, mainRoom));