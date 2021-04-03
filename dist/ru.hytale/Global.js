/**
* Размещённая ниже напись на языке Java влияет на всех пользователей и посетителей обеих настольной и мобильной версий вики.
* Для написей настольной версии см. MediaWiki:Common.js.
* Для написей мобильной версии см. MediaWiki:Mobile.js.
**/


(function() {
'use strict';


// RUNTIME

! function(e) {
function t(t) {
for (var n, i, a = t[0], l = t[1], c = t[2], p = 0, s = []; p < a.length; p++) i = a[p], o[i] && s.push(o[i][0]), o[i] = 0;
for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]);
for (f && f(t); s.length;) s.shift()();
return u.push.apply(u, c || []), r()
}

function r() {
for (var e, t = 0; t < u.length; t++) {
for (var r = u[t], n = !0, a = 1; a < r.length; a++) {
var l = r[a];
0 !== o[l] && (n = !1)
}
n && (u.splice(t--, 1), e = i(i.s = r[0]))
}
return e
}
var n = {},
o = {
2: 0
},
u = [];

function i(t) {
if (n[t]) return n[t].exports;
var r = n[t] = {
i: t,
l: !1,
exports: {}
};
return e[t].call(r.exports, r, r.exports, i), r.l = !0, r.exports
}
i.e = function(e) {
var t = [],
r = o[e];
if (0 !== r)
if (r) t.push(r[2]);
else {
var n = new Promise(function(t, n) {
r = o[e] = [t, n]
});
t.push(r[2] = n);
var u, a = document.getElementsByTagName("head")[0],
l = document.createElement("script");
l.charset = "utf-8", l.timeout = 120, i.nc && l.setAttribute("nonce", i.nc), l.src = function(e) {
return i.p + "" + ({
0: "lang-de-json"
} [e] || e) + "." + e + "." + {
0: "b9185fffe34d5b80e73d"
} [e] + ".js"
}(e), u = function(t) {
l.onerror = l.onload = null, clearTimeout(c);
var r = o[e];
if (0 !== r) {
if (r) {
var n = t && ("load" === t.type ? "missing" : t.type),
u = t && t.target && t.target.src,
i = new Error("Loading chunk " + e + " failed.\n(" + n + ": " + u + ")");
i.type = n, i.request = u, r[1](i)
}
o[e] = void 0
}
};
var c = setTimeout(function() {
u({
type: "timeout",
target: l
})
}, 12e4);
l.onerror = l.onload = u, a.appendChild(l)
} return Promise.all(t)
}, i.m = e, i.c = n, i.d = function(e, t, r) {
i.o(e, t) || Object.defineProperty(e, t, {
enumerable: !0,
get: r
})
}, i.r = function(e) {"undefined"} != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
value: "Модуль"
}), Object.defineProperty(e, "__esModule", {
value: !0
})
}, i.t = function(e, t) {
if (1 & t && (e = i(e)), 8 & t) return e;
if (4 & t && "object" == typeof e && e && e.__esModule) return e;
var r = Object.create(null);
if (i.r(r), Object.defineProperty(r, "default", {
enumerable: !0,
value: e
}), 2 & t && "string" != typeof e)
for (var n in e) i.d(r, n, function(t) {
return e[t]
}.bind(null, n));
return r
}, i.n = function(e) {
var t = e && e.__esModule ? function() {
return e.default
} : function() {
return e
};
return i.d(t, "a", t), t
}, i.o = function(e, t) {
return Object.prototype.hasOwnProperty.call(e, t)
}, i.p = "/client/", i.oe = function(e) {
throw console.error(e); e
};
var a = window.webpackJsonp = window.webpackJsonp || [],
l = a.push.bind(a);
a.push = t, a = a.slice();
for (var c = 0; c < a.length; c++) t(a[c]);
var f = l;
r()
}([]));


var _____WB$wombat$assign$function_____ = function(name) {
return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name];
};
if (!self.__WB_pmw) {
self.__WB_pmw = function(obj) {
this.__WB_source = obj;
return this;
}
}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");




(function(globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    var v=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  /* gettext library */

  django.catalog = django.catalog || {};
  
  var newcatalog = {
    "%(sel)s of %(cnt)s selected": [
      "\u0412\u044b\u0431\u0440\u0430\u043d %(sel)s \u0438\u0437 %(cnt)s",
      "\u0412\u044b\u0431\u0440\u0430\u043d\u043e %(sel)s \u0438\u0437 %(cnt)s",
      "\u0412\u044b\u0431\u0440\u0430\u043d\u043e %(sel)s \u0438\u0437 %(cnt)s",
      "\u0412\u044b\u0431\u0440\u0430\u043d\u043e %(sel)s \u0438\u0437 %(cnt)s"
    ],
    "%s comment.": [
      "%s \u041e\u0434\u0438\u043d \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439.",
      "%s \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0435\u0432.",
      "",
      ""
    ],
    "%s user has flagged this comment as inappropriate.": [
      "%s \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u043e\u0442\u043c\u0435\u0442\u0438\u043b \u044d\u0442\u043e\u0442 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u043a\u0430\u043a \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439.",
      "%s \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 \u043e\u0442\u043c\u0435\u0442\u0438\u043b\u0438 \u044d\u0442\u043e\u0442 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u043a\u0430\u043a \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439.",
      "",
      ""
    ],
    "6 a.m.": "6 \u0443\u0442\u0440\u0430",
    "6 p.m.": "6 \u0432\u0435\u0447\u0435\u0440\u0430",
    "April": "\u0410\u043f\u0440\u0435\u043b\u044c",
    "August": "\u0410\u0432\u0433\u0443\u0441\u0442",
    "Available %s": "\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0435 %s",
    "Cancel": "\u041e\u0442\u043c\u0435\u043d\u0430",
    "Choose": "\u0412\u044b\u0431\u0440\u0430\u0442\u044c",
    "Choose a Date": "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443",
    "Choose a Time": "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0440\u0435\u043c\u044f",
    "Choose a time": "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0440\u0435\u043c\u044f",
    "Choose all": "\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0432\u0441\u0435",
    "Chosen %s": "\u0412\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u0435 %s",
    "Click to choose all %s at once.": "\u041d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u0432\u0441\u0435 %s \u0441\u0440\u0430\u0437\u0443.",
    "Click to remove all chosen %s at once.": "\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u0447\u0442\u043e\u0431\u044b \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435 %s \u0441\u0440\u0430\u0437\u0443.",
    "December": "\u0414\u0435\u043a\u0430\u0431\u0440\u044c",
    "February": "\u0424\u0435\u0432\u0440\u0430\u043b\u044c",
    "Filter": "\u0424\u0438\u043b\u044c\u0442\u0440",
    "Hide": "\u0421\u043a\u0440\u044b\u0442\u044c",
    "I dislike it": "\u041c\u043d\u0435 \u044d\u0442\u043e \u043d\u0435 \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f",
    "I flagged it as inappropriate": "\u042f \u043e\u0442\u043c\u0435\u0442\u0438\u043b, \u0447\u0442\u043e \u044d\u0442\u043e \u043d\u0435\u0443\u043c\u0435\u0441\u0442\u043d\u043e",
    "I like it": "\u041c\u043d\u0435 \u044d\u0442\u043e \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f",
    "January": "\u042f\u043d\u0432\u0430\u0440\u044c",
    "July": "\u0418\u044e\u043b\u044c",
    "June": "\u0418\u044e\u043d\u044c",
    "Link": "\u0421\u0441\u044b\u043b\u043a\u0430",
    "Mail": "\u041f\u043e\u0447\u0442\u0430",
    "March": "\u041c\u0430\u0440\u0442",
    "May": "\u041c\u0430\u0439",
    "Midnight": "\u041f\u043e\u043b\u043d\u043e\u0447\u044c",
    "Name": "\u0418\u043c\u044f",
    "Noon": "\u041f\u043e\u043b\u0434\u0435\u043d\u044c",
    "Note: You are %s hour ahead of server time.": [
      "\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435: \u0412\u0430\u0448\u0435 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e\u0435 \u0432\u0440\u0435\u043c\u044f \u043e\u043f\u0435\u0440\u0435\u0436\u0430\u0435\u0442 \u0432\u0440\u0435\u043c\u044f \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043d\u0430 %s \u0447\u0430\u0441.",
      "\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435: \u0412\u0430\u0448\u0435 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e\u0435 \u0432\u0440\u0435\u043c\u044f \u043e\u043f\u0435\u0440\u0435\u0436\u0430\u0435\u0442 \u0432\u0440\u0435\u043c\u044f \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043d\u0430 %s \u0447\u0430\u0441\u0430.",
      "\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435: \u0412\u0430\u0448\u0435 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e\u0435 \u0432\u0440\u0435\u043c\u044f \u043e\u043f\u0435\u0440\u0435\u0436\u0430\u0435\u0442 \u0432\u0440\u0435\u043c\u044f \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043d\u0430 %s \u0447\u0430\u0441\u043e\u0432.",
      "\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435: \u0412\u0430\u0448\u0435 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e\u0435 \u0432\u0440\u0435\u043c\u044f \u043e\u043f\u0435\u0440\u0435\u0436\u0430\u0435\u0442 \u0432\u0440\u0435\u043c\u044f \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043d\u0430 %s \u0447\u0430\u0441\u043e\u0432."
    ],
    "Note: You are %s hour behind server time.": [
      "\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435: \u0412\u0430\u0448\u0435 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e\u0435 \u0432\u0440\u0435\u043c\u044f \u043e\u0442\u0441\u0442\u0430\u0451\u0442 \u043e\u0442 \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043d\u0430 %s \u0447\u0430\u0441.",
      "\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435: \u0412\u0430\u0448\u0435 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e\u0435 \u0432\u0440\u0435\u043c\u044f \u043e\u0442\u0441\u0442\u0430\u0451\u0442 \u043e\u0442 \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043d\u0430 %s \u0447\u0430\u0441\u0430.",
      "\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435: \u0412\u0430\u0448\u0435 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e\u0435 \u0432\u0440\u0435\u043c\u044f \u043e\u0442\u0441\u0442\u0430\u0451\u0442 \u043e\u0442 \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043d\u0430 %s \u0447\u0430\u0441\u043e\u0432.",
      "\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435: \u0412\u0430\u0448\u0435 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e\u0435 \u0432\u0440\u0435\u043c\u044f \u043e\u0442\u0441\u0442\u0430\u0451\u0442 \u043e\u0442 \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043d\u0430 %s \u0447\u0430\u0441\u043e\u0432."
    ],
    "Notify me about follow-up comments": "\u0423\u0432\u0435\u0434\u043e\u043c\u043b\u044f\u0442\u044c \u043e \u043f\u043e\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0445 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f\u0445",
    "November": "\u041d\u043e\u044f\u0431\u0440\u044c",
    "Now": "\u0421\u0435\u0439\u0447\u0430\u0441",
    "October": "\u041e\u043a\u0442\u044f\u0431\u0440\u044c",
    "Only registered users can post comments.": "\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438 \u043c\u043e\u0433\u0443\u0442 \u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0442\u044c \u0442\u043e\u043b\u044c\u043a\u043e \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438.",
    "Post your comment": "\u041e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439",
    "Remove": "\u0423\u0434\u0430\u043b\u0438\u0442\u044c",
    "Remove all": "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435",
    "Reply": "\u041e\u0442\u0432\u0435\u0442\u0438\u0442\u044c",
    "Required for comment verification.": "\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u0430 \u0434\u043b\u044f \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f",
    "September": "\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c",
    "Show": "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c",
    "Sorry, your comment has been rejected.": "\u041f\u0440\u043e\u0441\u0442\u0438\u0442\u0435, \u0432\u0430\u0448 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u0431\u044b\u043b \u043e\u0442\u043a\u043b\u043e\u043d\u0435\u043d.",
    "Thank you, a comment confirmation request has been sent by mail.": "\u0421\u043f\u0430\u0441\u0438\u0431\u043e, \u0437\u0430\u043f\u0440\u043e\u0441 \u043d\u0430 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d \u043f\u043e \u043f\u043e\u0447\u0442\u0435.",
    "There is %s new comment.": [
      "\u0415\u0441\u0442\u044c %s \u043d\u043e\u0432\u044b\u0439 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439.",
      "\u0415\u0441\u0442\u044c %s \u043d\u043e\u0432\u044b\u0445 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0435\u0432.",
      "",
      ""
    ],
    "This field is required.": "\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u043b\u0435.",
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "\u042d\u0442\u043e \u0441\u043f\u0438\u0441\u043e\u043a \u0432\u0441\u0435\u0445 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0445 %s. \u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u043d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0438\u0437 \u043d\u0438\u0445, \u0432\u044b\u0434\u0435\u043b\u0438\u0432 \u0438\u0445 \u0432 \u043f\u043e\u043b\u0435 \u043d\u0438\u0436\u0435 \u0438 \u043a\u043b\u0438\u043a\u043d\u0443\u0432 \"\u0412\u044b\u0431\u0440\u0430\u0442\u044c\", \u043b\u0438\u0431\u043e \u0434\u0432\u043e\u0439\u043d\u044b\u043c \u0449\u0435\u043b\u0447\u043a\u043e\u043c.",
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "\u042d\u0442\u043e \u0441\u043f\u0438\u0441\u043e\u043a \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u0445 %s. \u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u043d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0438\u0437 \u043d\u0438\u0445, \u0432\u044b\u0434\u0435\u043b\u0438\u0432 \u0438\u0445 \u0432 \u043f\u043e\u043b\u0435 \u043d\u0438\u0436\u0435 \u0438 \u043a\u043b\u0438\u043a\u043d\u0443\u0432 \"\u0423\u0434\u0430\u043b\u0438\u0442\u044c\", \u043b\u0438\u0431\u043e \u0434\u0432\u043e\u0439\u043d\u044b\u043c \u0449\u0435\u043b\u0447\u043a\u043e\u043c.",
    "Today": "\u0421\u0435\u0433\u043e\u0434\u043d\u044f",
    "Tomorrow": "\u0417\u0430\u0432\u0442\u0440\u0430",
    "Type into this box to filter down the list of available %s.": "\u041d\u0430\u0447\u043d\u0438\u0442\u0435 \u0432\u0432\u043e\u0434\u0438\u0442\u044c \u0442\u0435\u043a\u0441\u0442 \u0432 \u044d\u0442\u043e\u043c \u043f\u043e\u043b\u0435, \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u0444\u0438\u0442\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u043f\u0438\u0441\u043e\u043a \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0445 %s.",
    "Yesterday": "\u0412\u0447\u0435\u0440\u0430",
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "\u0412\u044b \u0432\u044b\u0431\u0440\u0430\u043b\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0438 \u043d\u0435 \u0432\u043d\u0435\u0441\u043b\u0438 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0439 \u0432 \u0434\u0430\u043d\u043d\u044b\u0435. \u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e, \u0432\u044b \u0445\u043e\u0442\u0435\u043b\u0438 \u0432\u043e\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c\u0441\u044f \u043a\u043d\u043e\u043f\u043a\u043e\u0439 \"\u0412\u044b\u043f\u043e\u043b\u043d\u0438\u0442\u044c\", \u0430 \u043d\u0435 \u043a\u043d\u043e\u043f\u043a\u043e\u0439 \"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c\". \u0415\u0441\u043b\u0438 \u044d\u0442\u043e \u0442\u0430\u043a, \u0442\u043e \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \"\u041e\u0442\u043c\u0435\u043d\u0430\", \u0447\u0442\u043e\u0431\u044b \u0432\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u0432 \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f. ",
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "\u0412\u044b \u0432\u044b\u0431\u0440\u0430\u043b\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435, \u043d\u043e \u0435\u0449\u0435 \u043d\u0435 \u0441\u043e\u0445\u0440\u0430\u043d\u0438\u043b\u0438 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f, \u0432\u043d\u0435\u0441\u0435\u043d\u043d\u044b\u0435 \u0432 \u043d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0445 \u043f\u043e\u043b\u044f\u0445 \u0434\u043b\u044f \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f. \u041d\u0430\u0436\u043c\u0438\u0442\u0435 OK, \u0447\u0442\u043e\u0431\u044b \u0441\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f. \u041f\u043e\u0441\u043b\u0435 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f \u0432\u0430\u043c \u043f\u0440\u0438\u0434\u0435\u0442\u0441\u044f \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "\u0418\u043c\u0435\u044e\u0442\u0441\u044f \u043d\u0435\u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043d\u044b\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0432 \u043e\u0442\u0434\u0435\u043b\u044c\u043d\u044b\u0445 \u043f\u043e\u043b\u044f\u0445 \u0434\u043b\u044f \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f. \u0415\u0441\u043b\u0438 \u0432\u044b \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435, \u043d\u0435\u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043d\u044b\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0431\u0443\u0434\u0443\u0442 \u043f\u043e\u0442\u0435\u0440\u044f\u043d\u044b.",
    "Your comment": "\u0412\u0430\u0448 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439",
    "Your comment in preview": "\u0412\u0430\u0448 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u0432 \u043f\u0440\u0435\u0432\u044c\u044e.",
    "Your comment will be reviewed. Thank your for your patience.": "\u0412\u0430\u0448 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d. \u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u0442\u0435\u0440\u043f\u0435\u043d\u0438\u0435.",
    "flag comment as inappropriate": "\u041f\u043e\u043c\u0435\u0442\u0438\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u043a\u0430\u043a \u043d\u0435\u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0439",
    "mail address": "\u043f\u043e\u0447\u0442\u043e\u0432\u044b\u0439 \u0430\u0434\u0440\u0435\u0441",
    "moderator": "\u043c\u043e\u0434\u0435\u0440\u0430\u0442\u043e\u0440",
    "name": "\u0438\u043c\u044f",
    "one letter Friday\u0004F": "\u041f",
    "one letter Monday\u0004M": "\u041f",
    "one letter Saturday\u0004S": "\u0421",
    "one letter Sunday\u0004S": "\u0412",
    "one letter Thursday\u0004T": "\u0427",
    "one letter Tuesday\u0004T": "\u0412",
    "one letter Wednesday\u0004W": "\u0421",
    "preview": "\u043f\u0440\u0435\u0434\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440",
    "remove comment": "\u0443\u0434\u0430\u043b\u0438\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439",
    "send": "\u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c",
    "url your name links to (optional)": "\u0441\u0441\u044b\u043b\u043a\u0430, \u043d\u0430 \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u0432\u0435\u0434\u0435\u0442 \u0412\u0430\u0448\u0435 \u0438\u043c\u044f (\u043d\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)"
  };
  for (var key in newcatalog) {
    django.catalog[key] = newcatalog[key];
  }
  

  if (!django.jsi18n_initialized) {
    django.gettext = function(msgid) {
      var value = django.catalog[msgid];
      if (typeof(value) == 'undefined') {
        return msgid;
      } else {
        return (typeof(value) == 'string') ? value : value[0];
      }
    };

    django.ngettext = function(singular, plural, count) {
      var value = django.catalog[singular];
      if (typeof(value) == 'undefined') {
        return (count == 1) ? singular : plural;
      } else {
        return value.constructor === Array ? value[django.pluralidx(count)] : value;
      }
    };

    django.gettext_noop = function(msgid) { return msgid; };

    django.pgettext = function(context, msgid) {
      var value = django.gettext(context + '\x04' + msgid);
      if (value.indexOf('\x04') != -1) {
        value = msgid;
      }
      return value;
    };

    django.npgettext = function(context, singular, plural, count) {
      var value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
      if (value.indexOf('\x04') != -1) {
        value = django.ngettext(singular, plural, count);
      }
      return value;
    };

    django.interpolate = function(fmt, obj, named) {
      if (named) {
        return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
      } else {
        return fmt.replace(/%s/g, function(match){return String(obj.shift())});
      }
    };


    /* formatting library */

    django.formats = {
    "DATETIME_FORMAT": "d F Y H:i",
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S",
      "%Y-%m-%d %H:%M:%S.%f",
      "%Y-%m-%d %H:%M",
      "%Y-%m-%d",
      "%m/%d/%Y %H:%M:%S",
      "%m/%d/%Y %H:%M:%S.%f",
      "%m/%d/%Y %H:%M",
      "%m/%d/%Y",
      "%m/%d/%y %H:%M:%S",
      "%m/%d/%y %H:%M:%S.%f",
      "%m/%d/%y %H:%M",
      "%m/%d/%y"
    ],
    "DATE_FORMAT": "d E Y",
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d",
      "%m/%d/%Y",
      "%m/%d/%y",
      "%b %d %Y",
      "%b %d, %Y",
      "%d %b %Y",
      "%d %b, %Y",
      "%B %d %Y",
      "%B %d, %Y",
      "%d %B %Y",
      "%d %B, %Y"
    ],
    "DECIMAL_SEPARATOR": ".",
    "FIRST_DAY_OF_WEEK": 0,
    "MONTH_DAY_FORMAT": "F j",
    "NUMBER_GROUPING": 0,
    "SHORT_DATETIME_FORMAT": "m/d/Y P",
    "SHORT_DATE_FORMAT": "m/d/Y",
    "THOUSAND_SEPARATOR": ",",
    "TIME_FORMAT": "P",
    "TIME_INPUT_FORMATS": [
      "%I:%M:%S %p",
      "%I:%M %p",
      "%I %p",
      "%H:%M:%S",
      "%H:%M:%S.%f",
      "%H:%M"
    ],
    "YEAR_MONTH_FORMAT": "F Y"
  };

    django.get_format = function(format_type) {
      var value = django.formats[format_type];
      if (typeof(value) == 'undefined') {
        return format_type;
      } else {
        return value;
      }
    };

    /* add to global namespace */
    globals.pluralidx = django.pluralidx;
    globals.gettext = django.gettext;
    globals.ngettext = django.ngettext;
    globals.gettext_noop = django.gettext_noop;
    globals.pgettext = django.pgettext;
    globals.npgettext = django.npgettext;
    globals.interpolate = django.interpolate;
    globals.get_format = django.get_format;

    django.jsi18n_initialized = true;
  }

}(this));


/* Значения письменного отображения, изпользуемые во всей написи для удобства перевода */

var NavigationBarHide = 'Свернуть';
var NavigationBarShow = 'Развернуть';
var NavigationBarShowDefault = 2;

var i18n = {
hideText: 'Свернуть',
showText: 'Развернуть',
// Запись страницы
loadErrorTitle: 'Возникла ошибка при загрузке содержимого',
// Лицензия по умолчанию при загрузке нового файла
defaultLicense: 'Творцовское право/Нет'
};


/**
* СВОРАЧИВАЕМЫЕ ЧАСТИ
* Добавьте нужной части класс "collapsible" и класс "collapsible-content" дочерней части
* (или ко всему в таблице, кроме строки заголовка). Указанные части будут скрыты при сворачивании.
* * Добавьте нужной части класс "collapsed", чтобы он был изначально свёрнутым.
* * Добавьте класс "collapsetoggle-left" или "collapsetoggle-inline" для выбора
* выравнивания при переключении сворачиваемых частей (по умолчанию – справа).
* * Добавьте части нужный ID по образцу "collapsible-<x>" для дополнения части классами
*"collapsetoggle-custom" и другими совместимыми частями в порядке образца "collapsible-<x>-toggle"
* для управления сворачиванием заместо образцовой кнопки.
* Если пользовательский переключатель имеет части с классом "jslink", только они будут кликабельны.
**/

( function() {
var $collapsibles = $wikipageContent.find( '.collapsible' );
if ( !$collapsibles.length ) {
return;
}

var $toggleTemplate = $( '<span>' ).addClass( 'collapsetoggle' ).append(
'[', $( '<span>' ).addClass( 'jslink' ), ']'
);
$collapsibles.each( function() {
var $collapsible = $( this );
if ( $collapsible.data( 'made-collapsible' ) ) {
return true;
}

var $children = $collapsible.children();
var showText = $collapsible.data( 'expandtext' ) || i18n.showText;
var hideText = $collapsible.data( 'collapsetext' ) || i18n.hideText;

// Добавляет окно содержимого, если его нет
if ( !$collapsible.is( 'table' ) && !$children.filter( '.collapsible-content' ).length ) {
if ( $collapsible.is( 'tr' ) ) {
$children.addClass( 'collapsible-content' );
} else {
$collapsible.wrapInner( '<div class="collapsible-content">' );
$children = $collapsible.children();
}}

var $toggle;
var id = $collapsible.attr( 'id' );
if ( id && id.match( /^collapsible-./ ) ) {
$toggle = $( $wikipageContent[0].getElementsByClassName( id + '-toggle' ) )
.filter( '.collapsetoggle-custom' ).css( 'visibility', 'visible' );
}

// Создаёт и вставляет стандартную кнопку переключения, если нет пользовательской кнопки
if ( !$toggle || !$toggle.length ) {
var $toggleContainer;
if ( $collapsible.is( 'table' ) ) {
var $rows = $children.filter( 'thead' ).children();
if ( !$rows.length ) {
$rows = $children.filter( 'tbody' ).first().children();
if ( !$rows.length ) {
$rows = $children.filter( 'tr' );
}}
$toggleContainer = $rows.first().children().last();
} else {
$toggleContainer = $children.first();
if ( $toggleContainer.hasClass( 'collapsible-content' ) ) {
$toggleContainer = $collapsible;
}}

$toggle = $toggleTemplate.clone();
if (
$toggleContainer !== $collapsible && (
$collapsible.hasClass( 'collapsetoggle-inline' ) ||
$collapsible.hasClass( 'collapse-button-none' )
)) {
$toggleContainer.append( $toggle );
} else {
$toggleContainer.prepend( $toggle );
}}

var $toggleLink = $toggle.find( '.jslink' );
if ( !$toggleLink.length ) {
$toggleLink = $toggle;
}
$toggleLink.attr( 'tabindex', 0 ).text( hideText );

// Определяет максимальный размер для кнопки переключения и устанавливает его как её минимальную ширину
var hideWidth = $toggle.width();
$toggleLink.text( showText );
var showWidth = $toggle.width();
if ( hideWidth !== showWidth ) {
$toggle.css( 'min-width', hideWidth > showWidth ? hideWidth : showWidth );
}

// Скрывает содержимое по умолчанию, если задумано
if ( !$collapsible.hasClass( 'collapsed' ) ) {
$toggleLink.text( hideText );
}

$toggleLink.on( 'click keydown', function( e ) {
// Заставляет срабатывать кнопку лишь при нажатии Enter
if ( e.keyCode && e.keyCode !== 13 ) {
return;
}

// Не переключается при нажатии клавиш или ссылок внутри содержимого
var $target = $( e.target );
if ( $target.is( 'button' ) || $target.is( 'a' ) ) {
return;
}

$collapsible.toggleClass( 'collapsed' );
if ( $collapsible.hasClass( 'collapsed' ) ) {
$toggleLink.text( showText );
} else {
$toggleLink.text( hideText );
}

// Останавливает включение разпределения столюницы при нажатии на ссылку
e.stopPropagation();
});

$collapsible.data( 'made-collapsible', true );
});(););


/**
* ЗАГРУЗЧИК СТРАНИЦ
* Позволяет загружать и отображать страницу по запросу.
* Изпользуйте загрузчик с шаблонами [[Шаблон:Загрузка страницы]] и [[Шаблон:Загрузка блока]]
**/

( function() {
var $loadPage = $wikipageContent.find( '.load-page' );
if ( !$loadPage.length ) {
return;
}

// Нужна вращалка, чтобы показать, что произходит загрузка, однако мы не хотим
// иметь задержку во время загрузки модуля, так что мы загружаем его сейчас,
// вне зависимости от того, будет ли что-то нажато.
mw.loader.load( 'jquery.spinner' );

// Кнопка создания, начинающаяся с текста "свернуть"
// При расчете максимального размера кнопки она будет изменена на текст "развернуть"
var $buttonTemplate = $( '<span>' ).addClass( 'mw-editsection-like load-page-button' )
.append( '[', $( '<span>' ).addClass( 'jslink' ).text( i18n.hideText ), ']' );

var extractList = function( $contentContainer, listClass ) {
var $content = $contentContainer.find( '.mw-parser-output > ul > li > ul' ).children( ':not(.nbttree-inherited)' );
if ( listClass ) {
$content.addClass( listClass );
}

return $content;
};

$loadPage.each( function() {
var $body = $( this );
var page = $body.data( 'page' );
if ( !page ) {
return;
}

var template = $body.data( 'template' );
var treeview = $body.data( 'treeview' );
var treeviewClass = $body.data( 'treeviewclass' );
var $heading;
var $contentContainer;
var $content;
var $button = $buttonTemplate.clone();
var $buttonLink = $button.find( '.jslink' );
if ( treeview ) {
$heading = $body;
$contentContainer = $( '<div>' );
} else {
$heading = $body.children().first();
$contentContainer = $body.find( '.load-page-content' );
}

// Добавление кнопки
$heading.append( $button );

// Перемещение кнопки изправления вправо
$contentContainer.find( '.mw-editsection, .mw-editsection-like' ).insertAfter( $button );

// Определяет максимальную ширину кнопки и устанавливает её как её минимальную ширину
var hideWidth = $button.width();
$buttonLink.text( i18n.showText );
var showWidth = $button.width();

if ( hideWidth !== showWidth ) {
$button.css( 'min-width', hideWidth > showWidth ? hideWidth : showWidth );
}

$buttonLink.click( function() {
if ( $body.hasClass( 'pageloader-contentloaded' ) ) {
if ( $buttonLink.text() === i18n.showText ) {
if ( treeview ) {
$content.insertAfter( $body );
} else {
$contentContainer.show();
}
$buttonLink.text( i18n.hideText );
} else {
if ( treeview ) {
$content.detach();
} else {
$contentContainer.hide();
}
$buttonLink.text( i18n.showText );
}
return;
}

// Проверяет, было ли загружено содержимое где-либо до отправки запроса
var gotContent;
$( '.pageloader-contentloaded' ).each( function() {
var $fLoader = $( this );
if ( $fLoader.data( 'page' ) === page && $fLoader.data( 'pageloader-content' ) ) {
$contentContainer.html( $fLoader.data( 'pageloader-content' ) ).removeClass( 'noscript' );
mw.hook( 'wikipage.content' ).fire( $contentContainer );

if ( treeview ) {
$body.find( '.noscript' ).remove();
$content = extractList( $contentContainer, treeviewClass );
$content.insertAfter( $body );
}

$buttonLink.text( i18n.hideText );
$body.addClass( 'pageloader-contentloaded' );
gotContent = true;
return false;
}
} );
if ( gotContent ) {
return;
}

// На случай, если модуль вращалки ещё не готов
var $spinner = $();
mw.loader.using( 'jquery.spinner', function() {
// $spinner будет установлен на false в случае, если содержимое загрузилось до загрузки модуля
if ( $spinner ) {
$spinner = $.createSpinner().addClass( 'mw-editsection-like' )
.css( 'min-width', $button.css( 'min-width' ) );
$button.hide().after( $spinner );
}
});

var requestData = {
action: 'parse',
prop: 'text|modules|jsconfigvars'
};
if ( template ) {
requestData.page = page;
} else {
requestData.title = mw.config.get( 'wgPageName' );
requestData.text = '{' + '{:' + page + '}}';
}
new mw.Api().get( requestData ).done( function( data ) {
// Добавление модулей и настроек
if ( data.parse.jsconfigvars ) {
mw.config.set( data.parse.jsconfigvars );
}
if ( data.parse.modules ) {
mw.loader.load( data.parse.modules.concat(
data.parse.modulescripts,
data.parse.modulestyles
) );
}

var html = data.parse.text['*'];
$contentContainer.html( html ).removeClass( 'noscript' );

// Изправление самоссылок
if ( template ) {
var curPage = '/' + mw.config.get( 'wgPageName' );
$contentContainer.find( 'a' ).each( function() {
var $link = $( this );
if ( $link.attr( 'href' ) === curPage ) {
$link.replaceWith( $( '<strong>' ).addClass( 'selflink' ).append( $link.contents() ) );
}
} );
html = $contentContainer.html();
}

$body.data( 'pageloader-content', html );

// Удаление якоря в новом содержимом, запускающего всё это снова и снова :)
mw.hook( 'wikipage.content' ).fire( $contentContainer );

if ( treeview ) {
$body.find( '.noscript' ).remove();
$content = extractList( $contentContainer, treeviewClass );
$content.insertAfter( $body );
}

$spinner.remove();
$spinner = false;
$buttonLink.text( i18n.hideText );
$button.show();
$body.addClass( 'pageloader-contentloaded' );
} ).fail( function( _, error ) {
$spinner.remove();
$spinner = false;
$button.show();

var errorText = '';
if ( error.textStatus ) {
errorText = error.textStatus;
} else if ( error.error ) {
errorText = error.error.info;
}

mw.notify( errorText, { title: i18n.loadErrorTitle, autoHide: false } );
});
});
});
}());


/**
* Установка минимальной высоты для анимации для предотвращения перемещения страницы,
* если кадры различаются по высоте
**/

( function() {
// Установка кадров, чтобы они были видны для измерений высоты
var $animated = $wikipageContent.find( '.animated' ).addClass( 'animated-visible' );

// Группировка кадров в анимациях
var animateds = [];
$animated.each( function() {
animateds.push( {
$: $( this ).find( '> .animated-subframe' ).addBack()
.find( '> *:not(.animated-subframe)' ),
} );
} );

// Установка высоты по умолчанию согласно самому высокому кадру в каждой анимации (если высоты различаются)
$.each( animateds, function() {
var minHeight = 0, differentHeights;
this.$.each( function() {
var height = this.offsetHeight;
differentHeights = differentHeights || minHeight && height !== minHeight;
minHeight = Math.max( height, minHeight );
});

if ( differentHeights ) {
this.height = minHeight;
}});
}());});


/* КОНЕЦ ОТДЕЛА ВИКИ-СОДЕРЖАНИЯ */


/* Срабатывает, когда DOM готов */

$( function() {


/**
* ОДВИЖИТЕЛЬ ЧАСТЕЙ
* Водит по кругу набор частей (или "отрывков") согласно таймеру, установленному на 2 секунды для каждого отрывка
* Добавьте в места, содержащие части для движовки класс "animated".
* При необходимости, добавьте отрывку, который должен отображаться первым, класс "animated-active".
* При необходимости, добавьте нужному отрывку класс "animated-subframe" и
* внутреннему подотрывку класс "animated-active", чтобы обозначить набор
* подотрывков, которые будут проводиться по кругу каждый раз лишь тогда, когда возпроизведены родительские отрывки.
* Движовки с классом "animated-paused" будут пропускаться через указанный промежуток.
* Требует некоторые почерки из MediaWiki:Global.css.
**/

( function() {
var $content = $( '#mw-content-text' );
var advanceFrame = function( parentElem, parentSelector ) {
var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
$( curFrame ).removeClass( 'animated-active' );
var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
return $nextFrame.addClass( 'animated-active' );
};

// Установка названия для скрытого свойства
var hidden; 
if ( typeof document.hidden !== 'undefined' ) {
hidden = 'hidden';
} else if ( typeof document.msHidden !== 'undefined' ) {
hidden = 'msHidden';
} else if ( typeof document.webkitHidden !== 'undefined' ) {
hidden = 'webkitHidden';
}

setInterval( function() {
if ( hidden && document[hidden] ) {
return;
}
$content.find( '.animated' ).each( function() {
if ( $( this ).hasClass( 'animated-paused' ) ) {
return;
}

var $nextFrame = advanceFrame( this, '.animated' );
if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
advanceFrame( $nextFrame[0], '.animated-subframe' );
}});
}, 2000 );
}());});

/* Конец DOM */


/**
* Создание подписи изображения из признака alt
**/

function showAlt() {
$(this).replaceWith(this.alt)
};

function addShowAlt(selector) {
$(selector).error(showAlt).attr("src", $(selector).src)
};
addShowAlt("img");

$(function() {
$('img').live('mouseover', function() {
var img = $(this); // cache query
if (img.title) {
return;
}
img.attr('title', img.attr('alt'));
});});

}());


// Служебная:Переименовать страницу
// Убирает галочку "Оставить перенаправление" при переименовании файла

$(function() {

var isMovingFile = mw.config.get("wgPageName").startsWith("Special:MovePage/File");
if(isMovingFile) {
var leaveRedirectCheckbox = $("input[name=wpLeaveRedirect]")[0];
leaveRedirectCheckbox.checked = false;
}

});


// Служебная:Развёртка шаблонов
// Ставит галочку "Подавлять метки <nowiki> в выводе" при изпользовании развёртки шаблонов

$(function() {

if (mw.config.get("wgPageName") == "Special:ExpandTemplates") {
var suppressNowikiTagsCheckbox = $("input[name=wpRemoveNowiki]")[0];
suppressNowikiTagsCheckbox.checked = true;
}

});


// Use altrow styling on Cargo tables

$(function() {
$(".cargoTable")
.addClass('altrow')
.removeClass('cargoTable') //because the class overrides altrow styles
});


// CrazyEgg Tracking

setTimeout(function(){
var a=document.createElement("script"),
b=document.getElementsByTagName("script")[0];
a.src=document.location.protocol+"//script.crazyegg.com/pages/scripts/0011/8371.js?"+Math.floor(new Date().getTime()/3600000);
a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}
, 1);


// Ссылка на зависимости модуля
// Творец: RheingoldRiver

$(function() {
if (mw.config.get('wgCanonicalNamespace') != 'Module') return;
$('.s1, .s2').each(function() {
var html = $(this).html();
var quote = html[0];
var quoteRE = new RegExp('^' + quote + '|' + quote + '$', 'g');
var name = html.replace(quoteRE,"");
if (name.startsWith("Модуль:")) {
var target = name.replace(/ /g,'%20');
var url = mw.config.get('wgServer') + '/' + target;
var str = quote + '<a href="' + url + '">' + name + '</a>' + quote;
$(this).html(str);
}});});