(document.defaultView || this || window)._commands = (document.defaultView || this || window)._commands || {
    preparse: function(text){
        let regex = /\[([^\[\]\|]*)\]/gi,
            matches = text.match(regex),
            matchLimit = 'undefined' !== typeof MATCH_LIMIT ? MATCH_LIMIT : matches.length;
        
        
    }
};