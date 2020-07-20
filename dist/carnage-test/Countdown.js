(function(factory){
    var scripts = ["MediaWiki:Countdown/util.js"];
    
    var s = [];
    
    if (!("i18n" in window.dev)) s.push("u:dev:MediaWiki:I18n-js/code.js");
    
    while (scripts.length) s.push(scripts.shift());
    
    scripts = s;
    
    var $loaded = $.Deferred();
    
    $(importArticles(params)).on("load", $loaded.resolve.bind($loaded));
    
    $.when($load).done(factory.bind(this));
}).call(window, function(){
    function Countdown(){
        var options;
        
        if (arguments.length > 1){
            var l = 0, id = null;
            
            if (Util.getType(arguments[0]) !== "object"){
                id = arguments[0];
                l++;
            }
            
            options = $.extend({}, arguments[l]);
            
            if (id !== null || Util._isset(id) || !("id" in options)) options.id = id;
        } else if (arguments.length === 1){
            options = $.extend({}, arguments[0]);
        } else options = {};
        
        this.id = Util._default(options.id, "");
        this.msg = Util._default(options.msg, "");
        this.typeId = Util._default(options.type, 0);
        this.time = Util._default(options.time, "");
        
        this.startTime = null;
        this.endTime = null;
        this.type = "";
        
        this.years = 0;
        this.months = 0;
        this.weeks = 0;
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        
        this.guid = Util.generateUid(7);
        
        if (this.id === "" || !Util._isset(this.id)){
            this.id = "Countdown-" + this.guid;
        }
        
        return this;
    }
    
    Countdown.cache = [];
    
    Countdown.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    Countdown.days = {
        January: 31,
        February: function(date){
            var isLeap = Countdown.isLeapYear(date);
            
            if (isLeap) return 29;
            return 28;
        },
        March: 31,
        April: 30,
        May: 31,
        June: 30,
        July: 31,
        August: 31,
        September: 30,
        October: 31,
        November: 30,
        December: 31
    };
    
    Countdown.isLeapYear = function(date){
        var year = date.getFullYear();
        return (new Date(year, 1, 29)).getMonth() === 1;
    };
    
    Countdown.converters = {
        years: 31536000,
        weeks: 604800,
        days: 86400,
        hours: 3600,
        minutes: 60,
        seconds: false
    };
    
    Countdown.types = {
        NO_LEADING_ZEROS: 1,
        SHORT_FORMAT: 2,
        NO_ZEROS: 4
    };
    
    Countdown.plural = function(){
        var count, forms, singular, plural;
        if (arguments.length > 1){
            count = arguments[0];
            if (arguments.length === 2){
                forms = arguments[1];
                if (Util.getType(forms) === "array"){
                    singular = forms[0];
                    plural = Util._default(forms[1], forms[0]);
                } else if (Util.getType(forms) === "object"){
                    singular = forms.singular;
                    plural = Util._default(forms.plural, forms.singular);
                }
            } else {
                singular = arguments[1];
                plural = Util._default(arguments[2],  arguments[1]);
            }
        } else if (arguments.length === 1){
            var obj = arguments[0];
            
            count = obj.count;
            forms = obj.forms;
            
            if (!Util._isset(count, forms)) return;
            
            if (Util.getType(forms) === "array"){
                singular = forms[0];
                plural = Util._default(forms[1], forms[0]);
            } else {
                singular = forms.singular;
                plural = Util._default(forms.plural, forms.singular);
            }
        } else return;
        
        if (isNaN(count)) return;
        
        count = Number(count);
        return (count < 1 && count > -1) ? singular : plural;
    };
});