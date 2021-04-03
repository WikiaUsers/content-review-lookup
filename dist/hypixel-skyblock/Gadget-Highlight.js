function highlight() {
	if (!$('.mw-highlight').length || !mw.config.get('wgPageName').match(/^Module:|\.(css|js|lua|xml|json|sccs|less)$/)) return;
	
    var libs = {
        "package": true,
        "table": true,
        "string": true,
        "io": true,
        "file": true,
        "math": true,
        "utf8": true,
        "coroutine": true,
        "debug": true,
        "os": true,
        "util": true,
        "number": true,
        "mw": true,
    };
    
    var keywords = {
		"time": true,
        "cos": true,
        "sin": true,
        "huge": true,
        "wrap": true,
        "len": true,
        "lower": true,
        "config": true,
        "open": true,
        "close": true,
        "input": true,
        "require": true,
        "format": true,
        "min": true,
        "max": true,
        "cosh": true,
        "sinh": true,
        "tan": true,
        "tanh": true,
        "gsub": true,
        "gmatch": true,
        "upper": true,
        "concat": true,
        "unpack": true,
        "tonumber": true,
        "type": true,
        "sub": true,
        "create": true,
        "date": true,
        "error": true,
        "output": true,
        "rep": true,
        "pairs": true,
        "ipairs": true,
        "pow": true,
        "maxn": true,
        "match": true,
        "remove": true,
        "sort": true,
        "log": true,
        "seeall": true,
        "byte": true,
        "char": true,
        "find": true,
        "reverse": true,
        "preload": true,
        "loaded": true,
        "init": true,
        "clock": true,
        "rad": true,
        "random": true,
        "pi": true,
        "mod": true,
        "modf": true,
        "log10": true,
        "ldexp": true,
        "exp": true,
        "expr": true,
        "dofile": true,
        "print": true,
        "running": true,
        "status": true,
        "yield": true,
        "cpath": true,
        "loadlib": true,
        "path": true,
        "searchers": true,
        "searchpath": true,
        "dump": true,
        "packsize": true,
        "codes": true,
        "offset": true,
        "charpattern": true,
        "mininteger": true,
        "ult": true,
        "randomseed": true,
        "flush": true,
        "lines": true,
        "popen": true,
        "read": true,
        "seek": true,
        "write": true,
        "setvbuf": true,
        "difftime": true,
        "execute": true,
        "exit": true,
        "getenv": true,
        "rename": true,
        "getinfo": true,
        "getlocal": true,
        "isyieldable": true,
        "fmod": true,
        "deg": true,
        "ceil": true,
        "floor": true,
        "abs": true,
        "acos": true,
        "asin": true,
        "atan": true,
        "atan2": true,
        "traceback": true,
        "stack": true,
        "pcall": true,
        "xpcall": true,
        "call": true,
        "select": true,
        "getmetatable": true,
        "next": true,
        "assert": true,
        "join": true,
        "name": true,
        "__index": true,
        "__newindex": true,
        "__call": true,
        "__mode": true,
        "__add": true,
        "__sub": true,
        "__mul": true,
        "__div": true,
        "__mod": true,
        "__pow": true,
        "__unm": true,
        "__concat": true,
        "__eq": true,
        "__lt": true,
        "__le": true,
        "__pairs": true,
        "__ipairs": true,
        "__metatable": true,
        "__tostring": true,
        "metatable": true,
        "rawset": true,
        "rawget": true,
        "set": true,
        "get": true,
        "new": true,
        "class": true,
        "load": true,
        "loaders": true,
        "object": true,
        "style": true,
        "title": true,
        "tag": true,

    };
    function copySet(o) {
        var newArr = [];

        Object.keys(o).forEach(function(key) {
            newArr.push(key);
        });
        return newArr;
    }

    var libsArr = copySet(libs)
      , keywordsArr = copySet(keywords);
    
    $('.p').each(function() {
        var $this = $(this),
            $text = $this.html();

        if ($text.match(/([\(\)\{\}\[\]]+)/g)) {
            $this.html($text.replace(/([\(\)\{\}\[\]]+)/, '<span class="l">$1</span>'));
        }
    });

    $('.n').each(function() {
        var $this = $(this),
            $text = $this.html();

        if ($text.match(new RegExp('^(' + keywordsArr.join('|') + ")$", 'gi'))) {
            $this.removeClass('n').addClass('nf');
        } else if ($text.match(new RegExp('^(' + libsArr.join('|') + ")$", 'gi'))) {
            $this.removeClass('n').addClass('lb');
        } else if (($this.next().html() || "").match(/(<span class="l">([\(\{]+)<\/span>|^\"$)/)) {
            $this.removeClass('n').addClass('f');
        } else if ($this.next().html() === ":") {
            $this.addClass('nc').removeClass('n');
        }
    });
}

highlight();
$('#wpPreview').click(function() {
	highlight();
});