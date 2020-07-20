require([
    "wikia.window",
    "mw",
    "jquery"
], function(window, mw, $){
    const ALLOWED_ELEMENTS = Object.freeze([
        "a", "code", "b", "div", "span",
        "em", "kbd"
    ]);
    
    const ALLOWED_ATTRIBUTES = Object.freeze([
        "class", "id", /data-(?:[a-z]+[a-z0-9\-\_]*[a-z0-9]*)/g,
        "style", "href"
    ]);
    
    const DISALLOWED_VALUES = Object.freeze([
        /url\((?:.*)\)/g, /.*(?:Special):(?:Userlo)(?:gout).*/gi,
        /var\((?:.*)\)/g
    ]);
    
    function DisplayTitle(target){
        var context = document.implementation.createHTMLDocument(""),
            $html = $.parseHTML($((target = target || "#DISPLAYTITLE")).html(), context, false),
            $temp = $("<div>", context).html($html);
        
        $temp.find("*").each(function(){
            var $target = $(this), tag = $target.prop("tagName").toLowerCase(),
                attrs, style, href;
                
            if (ALLOWED_ELEMENTS.indexOf(tag) === -1){
                $target.remove();
                return;
            }
            
            attrs = Array.from($target.prop("attributes"));
            
            attrs.forEach(function(attr){
                var name = attr.name, value = attr.value;
                
                function isAllowedAttr(a, i, arr){
                    if (typeof a === "string"){
                        return name === a;
                    } else if (Object(a) instanceof RegExp){
                        return a.test(name);
                    } else return false;
                }
                
                if (!ALLOWED_ATTRIBUTES.some(isAllowedAttr)){
                    $target.removeAttr(name);
                    return;
                }
                
                function isDisallowedValue(a, i, arr){
                    if (typeof a === "string"){
                        return value !== a;
                    } else if (Object(a) instanceof RegExp){
                        return !a.test(value);
                    } else return true;
                }
                
                if (DISALLOWED_VALUES.some(isDisallowedValue)){
                    var oldvalue = $target.attr(name), newvalue,
                        v = Array.from(DISALLOWED_VALUES);
                    
                    newvalue = oldvalue;
                    v.forEach(function(a){
                        if (name === "style") newvalue = newvalue.replace(a, "none");
                        else newvalue = newvalue.replace(a, "");
                    });
                    
                    $target.attr(name, newvalue);
                }
            });
        });
        
        var html = $temp.prop("innerHTML");
        if (target === "#DISPLAYTITLE") $(target).hide();
        
        if ($(target).length) $(".page-header__title").html(html);
    }
    
    window.DisplayTitle = DisplayTitle;
});