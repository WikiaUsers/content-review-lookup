/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// Кастом модуль
window.AddRailModule = ['Template:NewPagesModule', 'Template:RailModule'];

// random class in mainpage (idk if this actually works, openai gave me this)
(function() {
  if (document.body.classList.contains("mainpage") || document.body.classList.contains("page-Шаблон_Заглавная")) {
    const classNames = ["miku", "luka", "mayu", "seeu"];
    const parserOutput = document.querySelector(".mw-parser-output");
    const mainpageTheme = parserOutput.querySelector(".mainpage-theme");
    mainpageTheme.classList.remove("mainpage-theme");
    const randomIndex = Math.floor(Math.random() * classNames.length);
    const randomClassName = classNames[randomIndex];
    mainpageTheme.classList.add(randomClassName);
  }
})();

/* to convert a date/time in one timezone to user's local time, code copied from u:valkyriecrusade:MediaWiki:Common.js */
function jstzConvertAll() {
    var l = document.querySelectorAll("[data-jstz]");
    for (var i=0; i<l.length;i++) {
        var date = new Date(l[i].dataset.jstz);
        var format = l[i].dataset.jstzformat ? l[i].dataset.jstzformat : "Y/m/d h:i A";
        var utc = l[i].dataset.jstzutc;
        utc = utc && utc.toLowerCase() === "true";
        if(format && (date instanceof Date)) {
            l[i].innerHTML=jstzFormatDate(date, format, utc);
        }
    }
}
// this function formats the date similarly to the wikis #time function
// see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions#.23time
// not all options are supported
function jstzFormatDate(date, format, utc) {
    var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }
    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])Y+/g, "" + y);
    format = format.replace(/(^|[^\\])y/g, "" + y.toString().substr(2, 2));
    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])F+/g, "" + MMMM[0]);
    format = format.replace(/(^|[^\\])M/g, "" + MMM[0]);
    format = format.replace(/(^|[^\\])m/g, "" + ii(M));
    format = format.replace(/(^|[^\\])n/g, "" + M);
    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])l+/g, "" + dddd[0]);
    format = format.replace(/(^|[^\\])D/g, "" + ddd[0]);
    format = format.replace(/(^|[^\\])d/g, "" + ii(d));
    format = format.replace(/(^|[^\\])j/g, "" + d);
    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])H+/g, "" + ii(H));
    format = format.replace(/(^|[^\\])G/g, "" + H);
    var h = H > 12 ? H - 12 : H === 0 ? 12 : H;
    format = format.replace(/(^|[^\\])h+/g, "" + ii(h));
    format = format.replace(/(^|[^\\])g/g, "" + h);
    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])i+/g, "" + ii(m));
    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])s+/g, "" + ii(s));
    var tz = -date.getTimezoneOffset();
    var P = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    var O = P;
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        P += ii(tzHrs) + ":" + ii(tzMin);
        O += ii(tzHrs) + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])P/g, "" + P);
    format = format.replace(/(^|[^\\])O/g, "" + O);
    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])A+/g, "" + T);
    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])a+/g, "" + t);
    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);
    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);
    format = format.replace(/\\(.)/g, "");
    return format;
}
$(jstzConvertAll);