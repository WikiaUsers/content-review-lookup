require([
    "wikia.window",
    "wikia.document",
    "mw",
    "jquery",
    require.optional("ext.wikia.design-system.loading-spinner")
], function(window, document, mw, $, Spinner){
    function DynamicInputBox(){
        var config = $.extend({}, arguments[0]);
        
        if (!(this instanceof DynamicInputBox)) return new DynamicInputBox(config);
        
        this._data = {};
        this._callbacks = {};
        
        this.$target = config.$target || $(".dynamic-input-box__wrapper");
        this.type = config.type || "input";
        this.id = config.id || "";
        this.options = $.extend({}, config.options);
        return this;
    }
    
    DynamicInputBox.prototype = {
        processors: {
            "input": function(options){
                this.$body = $("<section>", { "class": "dynamic-input-box__body" });
                this.$form = $("<form>", { "class": "dynamic-input-box__form" });
                this.$container = $("<div>", { "class": "dynamic-input-box__container" });
                this.$body.attr("data-form-type", "input");
                
                this.$input = $("<input>", { "class": "dynamic-input-box__field" });
                this.$input.on("input", this.changeValue.bind(this));
            },
            "textarea": function(options){
                this.$body = $("<section>", { "class": "dynamic-input-box__body" });
                this.$form = $("<form>", { "class": "dynamic-input-box__form" });
                this.$container = $("<div>", { "class": "dynamic-input-box__container" });
                this.$body.attr("data-form-type", "textarea");
                
                this.$box = $("<label>", { "class": "dynamic-input-box__label input-box" });
                this.$input = $("<textarea>", { "class": "dynamic-input-box__field input-box" });
                this.$input.on("input", this.changeValue.bind(this));
            }
        },
        create: function(){
            var type = this.type;
            
            if (type in this.processors){
                this.processors[type].call(this, this.options);
            }
        }
    };
});