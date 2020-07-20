;(function(mw, $, config){
    var mwVars = mw.config.get([
            'wgPageName',
            'wgUserName',
            'skin'
        ]);
        
    function getAllURLVars(){
        var _json_obj = '{',
            url_var_parts = window.location.href.split(/[?&]/g),
            no_path = url_var_parts.filter(function(part){
                return !(/http(?:s|):\/\/(.*)/).test(part);
            }),
            var_obj = no_path.map(function(part){
                var parts = part.split('=');
                parts[0] = '"' + parts[0] + '"';
                parts[1] = '"' + parts[1] + '"';
                return parts.join(': ');
            }),
            _obj = var_obj.join(', ');
        _json_obj = _json_obj.concat(_obj);
        _json_obj = _json_obj.concat('}');
        return JSON.parse(_json_obj);
    }
    
    if (
        ['oasis', 'wikia'].some(function(_skin){
            return _skin == mwVars.skin;
        }) &&
        mwVars.wgPageName == 'Special:BlankPage'
    ){
        var url_vars = getAllURLVars(),
            blankspecial = url_vars.blankspecial;
        if (blankspecial == 'gradient'){
            $('.mw-content-text').html('Hello World');
        }
    }
})(this.mediaWiki, this.jQuery, (this.GradientMaker = this.GradientMaker || {}));