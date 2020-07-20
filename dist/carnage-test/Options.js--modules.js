window.OptionsModule = window.OptionsModule || function OptionsModule(config){
    config = config || {};
    this.formElement = config.formElement || null;
    this.value = '';
    this.init();
    return this;
};

OptionsModule.prototype.createData = function(){
    var $elem = this.formElement,
        id = 
};