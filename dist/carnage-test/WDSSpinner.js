require(['ext.wikia.design-system.loading-spinner'], function(Spinner){
    function WDSSpinner(config){
        config = (typeof config !== 'undefined') ? config : {};
        this.radius = config.radius || 0;
        this.strokeWidth = config.stroke || 0;
        this.toSpinner = config.isDefault ? false : true;
        this.html = '';
    }
    
    WDSSpinner.prototype = {
        create: function(){
            this.spinnerObj = new Spinner(this.radius, this.strokeWidth);
            this.spinner = this.html = this.spinnerObj.html;
            if (this.toSpinner){
                this.spinner.replace('wds-block', 'wds-spinner__block')
                            .replace('wds-path', 'wds-spinner__stroke');
            }
            this.$spinner = $(this.spinner);
            if (this.toSpinner)
                this.$spinner.find('circle').attr('stroke-width', String(this.strokeWidth));
            this.spinner = this.html = this.$spinner.prop('outerHTML');
        },
        get: function(key){
            if (Object.prototype.hasOwnProperty.call(this, key)){
                return this[key];
            } else {
                return null;
            }
        },
        set: function(key, value){
            if (typeof key === 'object'){
                var index = 0, obj = key, keys = Object.keys(obj);
                while ((k = keys[index])){
                    var v = obj[k];
                    this[k] = v;
                    index++;
                }
            } else {
                this[key] = value;
            }
        },
        toElement: function(){
            return this.$spinner;
        },
        toHTML: function(){
            return this.html;
        }
    };
    window.WDSSpinner = WDSSpinner;
});