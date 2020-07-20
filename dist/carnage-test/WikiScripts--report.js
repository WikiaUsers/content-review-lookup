function ReportForm(config){
    this.id = config.id;
    this.target = this.selector = '#'.concat(config.id);
    this.defaultTitle = config.defaultTitle || '';
    this.create();
}

ReportForm.prototype.bind = function(){
    var _this = this;
    $('#report-button').on('click', function(event){
        var $elem = $(_this.selector),
            $user = $elem.find('#user-input').val();
    });
};

ReportForm.prototype.create = function(){
    
};