(function(window, $, mw){
    var o = {}, a = [], has = o.hasOwnProperty, slice = a.slice,
        indexOf = a.indexOf;
    
    var MathX = {
        name: "MathX",
        version: "v1.0"
    };
    
    MathX.fixes = {};
    
    MathX.patterns = {
        im: /([-+]?[\d][\d\.]*[\d])i/g,
        fn: /([^\(\)\[\]\{\}\s\t\r\n]*)\((.*)\)/gm,
        constants: /[\u]/g
    };
}(window, this.jQuery, this.mw));