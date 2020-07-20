(function(window, undefined){
    var StringMap = {};

    Object.defineProperties(StringMap, {
        __GUID: {
            enumerable: false,
            writable: false,
            configurable: false,
            value: (function(){
                var l = 8, i= 0, o = [], r = "";
                for (i; i < l; i++) o[i] = Math.floor(Math.random() * 10);
                r = Number(o.join("")).toString(16);

                return r;
            })()
        }
    });

    StringMap.capitalize = function(s, v){
        if (typeof s !== "string") return "";

        if (typeof v !== "boolean") v = !!v;
        
        var r = "";
        if (v === false){
            var x = s[0], y = s.slice(1);
            x = String(x).toUpperCase();

            r = x + y;
        } else {
            r = String(s).toUpperCase();
        }

        return r;
    };

    StringMap.capitalizeAll = function(s){
        if (typeof s !== "string") return "";
        var r = "", a = [], p = s.split(/\s+/g).map(StringMap.trim);

        for (var i = 0; i < p.length; i++){
            var q = p[i];
            if (q === "") continue;

            q = StringMap.capitalize(q);
            a.push(q);
        }

        r = a.join(" ");
        return r;
    };

    StringMap.compare = function(s1, s2){
        if (typeof s1 !== "string" || typeof s2 !== "string") return 0;

        var c;

        if (s1 < s2) c = -1;
        else if (s1 > s2) c = 1;
        else c = 0;

        return c;
    };

    StringMap.lowercase = function(s){
        if (typeof s !== "string") return "";
        var r = "";
        if (v === false){
            var x = s[0], y = s.slice(1);
            x = String(x).toLowerCase();

            r = x + y;
        } else {
            r = String(s).toLowerCase();
        }

        return r;
    };

    StringMap.lowercaseAll = function(s){
        if (typeof s !== "string") return "";
        var r = "", a = [], p = s.split(/\s+/g).map(StringMap.trim);

        for (var i = 0; i < p.length; i++){
            var q = p[i];
            if (q === "") continue;

            q = StringMap.lowercase(q);
            a.push(q);
        }

        r = a.join(" ");
        return r;
    };

    StringMap.trim = function(s){
        if (typeof s !== "string") return "";
        var hasTrim = "trim" in String.prototype, r = "";

        if (hasTrim){
            r = String(s).trim();
        } else {
            r = String(s).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }

        return r;
    };

    StringMap.pregReplace = function(s, p, r){
        if (typeof s !== "string") return "";
        var f = "", t = "", x = null;
        if (typeof p === "object"){
            p = Object.assign({}, p);
            f = p.flags || "";
            t = p.source || ".*";
        } else {
            t = (typeof p === "string") ? p : ".*";
            if (t === "") t = ".*";
        }

        x = new RegExp(t, f);
        r = StringMap.replace(s, x, r);

        return r;
    };

    StringMap.gPregReplace = function(s, p, r){
        if (typeof s !== "string") return "";
        var q = { flags: "g" };

        if (typeof p !== "string") p = ".*";
        q.source = p;
        r = StringMap.pregReplace(s, q, r);

        return r;
    };

    StringMap.randomize = function(s){
        if (typeof s !== "string") return "";

        var l = s.length, a = [], c = [], i = 0, r = "";
        
        do {
            var j = Math.floor(Math.random() * l),
                k = s[j];
            if (c.indexOf(j) > -1) continue;
            c.push(j);
            a.push(k);
            i++;
        } while (i < l);

        a.length = l;
        r = StringMap.trim(a.join(""));

        return r;
    };

    StringMap.replace = function(s, x, r){
        if (typeof s !== "string") return "";
        return String(s).replace(x, r);
    };

    StringMap.split = function(s, t){
        if (typeof s !== "string") return "";

        var v = " ", r = "";
        if (typeof t === "function"){
            v = t.call(window, s);
            if (typeof v !== "string" || !(v instanceof RegExp)){
                v = " ";
            }
        } else if (typeof t === "string" || t instanceof RegExp){
            v = t;
            if (v === "") v = " ";
        }

        r = String(s).split(v);

        return r;
    };

    StringMap.eq = function(s1, s2){
        if (typeof s1 !== "string" || typeof s2 !== "string") return false;

        return s1 === s2;
    };

    Object.entries({
        capitalize: ["uppercase", "upper"],
        capitalizeAll: ["titlecase"],
        lowercase: "lower",
        eq: ["matches"],
        randomize: ["random", "jumble"]
    }).forEach(function(prop){
        var key = prop[0], value = prop[1];

        if (Array.isArray(value)){
            value = value.length === 1 ? value[0] : value;
        }

        if (Array.isArray(value)){
            value.forEach(function(name){
                StringMap[name] = StringMap[key];
            });
        } else {
            StringMap[value] = StringMap[key];
        }
    })

    window.StringMap = StringMap;
}(this === window ? this : window));