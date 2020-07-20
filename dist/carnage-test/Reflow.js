(function($){
    // Reflow constructor
    function Reflow(){
        this.parent = null;
        this.offsetWidth = null;
        this.offsetHeight = null;
        return this.__process();
    }
    
    Reflow.prototype.__process = function(){
        window.addEventListener("resize", this.__observe.bind(this));
        return this;
    };
    
    Reflow.prototype.__observe = function(){
        this.offsetWidth = this.parent.offsetWidth;
        this.offsetHeight = this.parent.offsetHeight;
    };
}(this.jQuery));