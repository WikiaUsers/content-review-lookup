/* ######################################################################## */
/* ### JavaScript here will be loaded for all users on every page load. ### */
/* ######################################################################## */
// ============================================================
/*** Functions **************************************************************
 * Small functions that are used with other functions
 ****************************************************************************/

/* Quick reference elements */
var article = document.getElementById("WikiaArticle");
if (!article) article = document.getElementById("bodyContent"); //monobook
if (!article) article = document.getElementById("wkMainCnt"); //wikiamobile
var rail = document.getElementById("WikiaRail");
var editform = document.getElementById("wpTextbox1");
var editsummary = document.getElementById("wpSummary");
var savebutton = document.getElementById("wpSave");
var sitecss;
var usercss;

addOnloadHook(getCssStuffs);

function getCssStuffs() {
  var s = document.head.getElementsByTagName("link");
  for (var i = 0; i < s.length; i++) {
    if (s[i].href.contains("/site")) {
      sitecss = s[i];
      i++;
      for (; i < s.length; i++) {
        if (s[i].href.contains("/user")) {
          usercss = s[i];
          return;
        }
      }
    }
  }
}

/* Time (ties in with other time functions) */
var wgServerTime = (typeof (varnishTime) != "undefined" && varnishTime) ? new Date(varnishTime.split(" GMT")[0]) : undefined;
var wgClientTime = new Date();

/* Gender */
var wgUserGender = mw.user ? mw.user.options.values.gender : undefined;

/* Search user functions v1.1 */
function ifGroup(group) //returns bool for whether viewing user is in group
{ /*wikiamobile does not record user groups*/
  if (group == "all") group = "*";
  if (typeof (wgUserGroups) != "undefined") for (var i = 0; i < wgUserGroups.length; i++) if (wgUserGroups[i] == group) return true;
  return false;
}

/* Get variable: takes a string and returns variable value */
function getVariable(variableName, element) {
  var x = variableName.split(".");
  var a = element || window;
  for (var i = 0; i < x.length; i++) a = a[x[i]];
  return a;
}

/* Wikilink text conversion functions */
function wikilinkComponent(text) {
  text = text.replace("[[", "").replace("]]", "");
  var page = text.split("|")[0];
  var display = text.replace(page + "|", "");
  if (display == text) display = page;
  var colonSplit = page.split(":");
  var domain = wgDBname;
  if (colonSplit[0] == "w" && colonSplit.length > 1) {
    colonSplit.shift();
    domain = "community";
  } else if (colonSplit[0] === "") colonSplit.shift();
  if (colonSplit[0] == "c" && colonSplit[1]) {
    colonSplit.shift();
    domain = colonSplit.shift();
  } else if (colonSplit[0] === "") colonSplit.shift();
  page = colonSplit.join(":");
  return {
    domain: domain,
    page: page,
    display: display
  };
}

function wikilinkUrl(text) //returns URL from wikitext link
{
  var x = wikilinkComponent(text);
  return "http://" + x.domain + ".wikia.com/wiki/" + x.page.urlEncode();
}

function wikilinkHtml(text, opdisplay) //returns A tag from wikitext link
{
  if (opdisplay) text = text + "|" + opdisplay;
  var x = wikilinkComponent(text);
  return '<a ' + (x.domain != wgDBname ? 'class="extiw" ' : '') + 'title="' + x.page + '" href="http://' + x.domain + '.wikia.com/wiki/' + x.page.urlEncode() + '">' + x.display + '</a>';
}

/* Encodes text to hash-part of URL */
function encodeHash(string, includehash) {
  if (includehash) string = string.slice(1);
  string = encodeURIComponent(string).replaceAll("%", ".");
  if (includehash) string = "#" + string;
  return string;
}

/* Pads an input to a specified length with a specified pad character */
function pad(input, stringLength, padString) {
  if (!padString) padString = "0";
  var orig = input.toString();
  var padLength = stringLength - orig.length;
  if (padLength <= 0) return orig;
  var pad = "";
  while (pad.length < padLength) pad += padString;
  padString.slice(-padLength);
  return pad + orig;
}

/*** String stuff ***********************************************************
 * Small functions that are used with strings.
 * Documentation on Help:JavaScript
 ****************************************************************************/
String.prototype.replaceAll = function (f, r) {
  if (typeof (r) == "undefined") r = "";
  return this.split(f).join(r);
};
String.prototype.searchAppend = function (f, a) {
  return this.replaceAll(f, f + a);
};
String.prototype.searchPrepend = function (f, a) {
  return this.replaceAll(f, a + f);
};
String.prototype.fAndR = String.prototype.replaceAll; //deprecated
String.prototype.toExec = function () {
  return this.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
};
String.prototype.urlEncode = function () {
  return this.replaceAll(" ", "_");
};
String.prototype.contains = function (search) {
  if (this.indexOf(search) != -1) return true;
  return false;
};

/*** Date stuff v2.1 ********************************************************
 * Stuff for expanding date functionality
 * Documentation on Help:JavaScript
 ****************************************************************************/
var wgDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var wgDayNamesShort = [];
for (var i = 0; i < wgDayNames.length; i++) wgDayNamesShort[i] = wgDayNames[i].slice(0, 3);

function ordinalSuffix(number, numInclude) {
  var i = number % 10;
  var j = number % 100;
  if (i == 1 && j != 11) return "st";
  if (i == 2 && j != 12) return "nd";
  if (i == 3 && j != 13) return "rd";
  return (numInclude ? number : "") + "th";
}

Date.prototype.toWikiString = function () {
  return this.toString("H:i, F d, Y");
};
Date.prototype.getWeek = function () { //Based on information at http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
  // Copy date so don't modify original
  var d = new Date(this);
  d.setHours(0, 0, 0);
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  // Get first day of year
  var yearStart = new Date(d.getFullYear(), 0, 1);
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  // Return array of year and week number
  return weekNo;
};
Date.prototype.getDayOfYear = function () {
  var d = new Date(this);
  var onejan = new Date(this.getFullYear(), 0, 1);
  return (Math.ceil((d - onejan) / 86400000)) - 1;
};
Date.prototype.getLeapYear = function () {
  return (!(this.getFullYear() % 4) && ((this.getFullYear() % 100) || !(this.getFullYear() % 400))) ? 1 : 0;
};
Date.prototype.getDaysInMonth = function () {
  switch (this.getMonth()) {
    case 1:
      return 28 + this.LeapYear();
    case 3:
    case 5:
    case 8:
    case 10:
      return 30;
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31;
    default:
      return 0;
  }
};

Date.prototype.toString = function (string) { //overrides default parameterless toString
  if (!string) return this.toDateString() + " " + this.toTimeString(); //simulate orig toString

  var v = function (l) {
    switch (l) {
      case "Y":
        //A full numeric representation of a year, 4 digits
        return this.getFullYear();
      case "y":
        //A two digit representation of a year
        return this.getFullYear().toString().slice(-2);
      case "V":
        //Years since 1970
        return this.getFullYear() - 1970;
      case "L":
        //Whether it's a leap year
        return this.getLeapYear();
      case "o":
        //ISO-8601 year number. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead.
        return new Date(this.valueOf() - ((4 - this.getDay()) * 24 * 3600 * 1000)).getFullYear();
      case "n":
        //Numeric representation of a month, without leading zeros
        return this.getMonth() + 1;
      case "m":
        //Numeric representation of a month, with leading zeros
        return pad((this.getMonth() + 1).toString(), 2);
      case "R":
        //Numeric representation of month, offset-1 (Jan=0)
        return this.getMonth();
      case "M":
        //A short textual representation of a month, three letters
        return wgMonthNamesShort[this.getMonth() + 1];
      case "F":
        //A full textual representation of a month, such as January or March
        return wgMonthNames[this.getMonth() + 1];

      case "W":
        //ISO-8601 week number of year, weeks starting on Monday
        return this.getWeek();

      case "j":
        //Day of the month without leading zeros
        return this.getDate();
      case "d":
        //Day of the month, 2 digits with leading zeros
        return pad(this.getDate().toString(), 2);
      case "J":
        //Day of the month minus 1 without leading zeros (starting from 0)
        return this.getDate() - 1;
      case "z":
        //The day of the year (starting from 0)
        return this.getDayOfYear();
      case "D":
        //A textual representation of a day, three letters
        return wgDayNamesShort[this.getDay()];
      case "l":
        //A full textual representation of the day of the week
        return wgDayNames[this.getDay()];
      case "N":
        //ISO-8601 numeric representation of the day of the week
        return ((this.getDay() + 6) % 7) + 1;
      case "w":
        //Numeric representation of the day of the week
        return this.getDay();

      case "S":
        //English ordinal suffix for the day of the month, 2 characters
        return ordinalSuffix(this.getDate());

      case "a":
        //Lowercase Ante meridiem and Post meridiem
        return (this.getHours() < 12 ? "a" : "p") + "m";
      case "A":
        //Uppercase Ante meridiem and Post meridiem
        return (this.getHours() < 12 ? "A" : "P") + "M";
      case "g":
        //12-hour format of an hour without leading zeros
        return ((this.getHours() + 11) % 12) + 1;
      case "h":
        //12-hour format of an hour with leading zeros
        return pad((((this.getHours() + 11) % 12) + 1).toString(), 2);
      case "G":
        //24-hour format of an hour without leading zeros
        return this.getHours();
      case "H":
        //24-hour format of an hour with leading zeros
        return pad(this.getHours().toString(), 2);

      case "B":
        //Swatch Internet time
        return pad(parseInt((1000 / (24 * 60 * 60)) * (this.getMinutes() + (this.getMinutes() * 60) + (this.getHours() * 60 * 60))), 3);

      case "i":
        //Minutes with leading zeros, two characters
        return pad(this.getMinutes(), 2);
      case "p":
        //Minutes without leading zeros.
        return this.getMinutes();
      case "s":
        //Seconds with leading zeros, two characters
        return pad(this.getSeconds(), 2);
      case "q":
        //Seconds, without leading zeros
        return this.getSeconds();
      case "U":
        //Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
        return this.valueOf().toString().slice(0, -3);

      case "u":
        //Microseconds
        return this.getMilliseconds();

      case "e":
        //Timezone identifier (same as "T"), doesn't work like PHP
        return this.toUTCString().split(" ")[5];
      case "I":
        //Whether or not the date is in daylight saving time
        return 0; //doesn't work properly
      case "O":
        //Difference to Greenwich time (GMT) in hours
        return this.toTimeString().split(" ")[1].replace("GMT", "");
      case "P":
        //Difference to Greenwich time (GMT) with colon between hours and minutes
        return v("O").slice(0, 3) + ":" + v("O").slice(-2);
      case "T":
        //Timezone abbreviation
        return v("e");
      case "Z":
        //Timezone offset in seconds.
        return ((v("O").slice(1, 3) * 60) + (v("O").slice(-2) * 1)) * 60;

      case "t":
        //Number of days in the given month
        return this.getDaysInMonth();
      case "c":
        //ISO 8601 date
        return this.toString("Y-m-dTH:i:sP");
      case "r":
        //RFC 2822 formatted date
        return this.toString("D, j M Y H:i:s O");

      default:
        return l;
    }
  }.bind(this);

  function dateStringLogic(string, datu) {
    if (!string.contains("?")) return;
    var split = string.split("?");
    var test = datu.toString(split.shift());
    var split = split.join("?");
    var count = 0;
    var pms = [];
    var temp = "";
    for (var i = 0; i < split.length; i++) {
      if (count === 0 && split[i] == ";") {
        pms.push(temp);
        temp = "";
      } else {
        if (split[i] == "{") count++;
        else if (split[i] == "}") count--;
        temp += split[i];
      }
      if (i == split.length - 1) pms.push(temp);
    }
    var kvs = [];
    kvs.push({
      k: [],
      v: ""
    });
    for (var i = 0; i < pms.length; i++) {
      if (!pms[i].contains("=") || pms[i].split("=")[0].contains("{")) {
        if (i == pms.length - 1) kvs[kvs.length - 1].v = pms[i];
        else kvs[kvs.length - 1].k.push(pms[i]);
      } else {
        var s = pms[i].split("=");
        caseV = s.shift();
        value = s.join("=");
        kvs[kvs.length - 1].k.push(caseV);
        kvs[kvs.length - 1].v = value;
        kvs.push({
          k: [],
          v: ""
        });
      }
    }

    for (var i = 0; i < kvs.length; i++) {
      if (kvs[i].k.contains(test) || i == kvs.length - 1) return kvs[i].v;
    }
  }

  var output = "";
  var escape = "";
  var escapeAt = -2;
  var logicAt = -2;
  var escapeC = ['"', "'"];
  var logic = "";
  var logicC = ['{', '}'];
  var logicCount = 0;
  for (var i = 0; i < string.length; i++) {
    var escaping = (escape !== "" || escapeAt == i - 1);
    var logicing = (logic !== "" || logicAt == i - 1);
    var lastChar = (i == string.length - 1);
    var charQuot = (escapeC.contains(string[i]) ? string[i] : "");
    var startLogic = (logicC[0] == string[i] ? string[i] : "");
    var endLogic = (logicC[1] == string[i] ? string[i] : "");
    var charBack = (string[i] == "\\");
    if (charQuot && !escaping && !logicing && lastChar) { //if not escaping and not logicing and last char and '", print literal '"
      output += charQuot;
    } else if (!startLogic && !escaping && !logicing && lastChar) { //if not escaping and not logicing and last char and {}, print literal {}
      output += startLogic;
    } else if (!endLogic && !escaping && !logicing && lastChar) { //if not escaping and not logicing and last char and {}, print literal {}
      output += endLogic;
    }
    if (charQuot && !logicing && !escaping) { //if not escaping and not logicing and ", start escaping
      escapeAt = i;
    } else if (!logicing && charQuot) { //if escaping and ", stop escaping
      output += escape;
      escape = "";
    } else if (lastChar && escaping) { //if last char and escaping, redo escapes without escaping and literal "
      escape = "";
      i = escapeAt;
      escapeAt = -2;
      output += charQuot;
    } else if (escaping) { //if not last char and escaping, escape char
      escape += string[i];
    } else if (startLogic && !logicing) { //if not logicing and {, start logicing
      logicAt = i;
    } else if (startLogic && logicing) { //if logicing and {, add { and remember that
      logic += startLogic;
      logicCount++;
    } else if (endLogic && logicCount && logicing) { //if logicing and } and {s, add } and remember that
      logic += endLogic;
      logicCount--;
    } else if (endLogic && logicing) { //if logicing and } and no {s, stop logicing and process logic
      string = string.slice(0, logicAt) + dateStringLogic(logic, this) + string.slice(i + 1);
      logicCount = 0;
      i = logicAt - 1;
      logicAt = -2;
      logic = "";
    } else if (lastChar && logicing) { //if last char and logicing, redo logics without logicing and literal {}
      logic = "";
      i = logicAt;
      logicAt = -2;
      output += startLogic;
    } else if (logicing) { //if not last char and logicing, logic char
      logic += string[i];
    } else if (charBack) { //if \ escape once
      output += string[i + 1];
      i++;
    } else output += v(string[i]);
  }
  return output;
};

String.prototype.toDate = function (format) {
  if (this === "") return new Date(); //if blank string, just return the date
  if (!format) return new Date(this); //if no format, just see what happens
  var x = this;
  var p = "YmdHisu"; //Ww overrides md, z overrides Ww, U overrides all
  var d = {};

  var v = function (l, x) {
    switch (l) {
      case "Y":
        //A full numeric representation of a year, 4 digits
        d.Y = x.slice(0, 4);
        return x.slice(4);
      case "y":
        //A two digit representation of a year
        d.Y = wgNow.toString("Y").slice(0, 2) + x.slice(0, 2);
        return x.slice(2);
      case "V":
        //Years since 1970
        var len = 1;
        if (x.slice(0, 4) == x.slice(0, 4)) len = 4;
        else if (x.slice(0, 3) == x.slice(0, 3)) len = 3;
        else if (x.slice(0, 2) == x.slice(0, 2)) len = 2;
        d.Y = parseInt(x.slice(0, len)) + 1970;
        return x.slice(len);
      case "L":
        //Whether it's a leap year
        return x.slice(1);
      case "o":
        //ISO-8601 year number. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead.
        return v("Y"); //doesn't actually work

      case "n":
        //Numeric representation of a month, without leading zeros
        var len;
        switch (x.slice(0, 2)) {
          case 10:
          case 11:
          case 12:
            len = 2;
            break;
          default:
            len = 1;
        }
        d.m = x.slice(0, len);
        return x.slice(len);
      case "m":
        //Numeric representation of a month, with leading zeros
        d.m = x.slice(0, 2);
        return x.slice(2);
      case "R":
        //Numeric representation of month, offset-1 (Jan=0)
        var len;
        switch (x.slice(0, 2)) {
          case 10:
          case 11:
            len = 2;
            break;
          default:
            len = 1;
        }
        d.m = parseInt(x.slice(0, len)) + 1;
        return x.slice(len);
      case "M":
        //A short textual representation of a month, three letters
        d.m = wgMonthNamesShort.indexOf(x.slice(0, 3));
        return x.slice(3);
      case "F":
        //A full textual representation of a month, such as January or March
        var sel = 0;
        for (var i = 1; i < wgMonthNames.length; i++) {
          if (wgMonthNames[i] == x.slice(0, wgMonthNames[i].length)) {
            sel = i;
            break;
          }
        }
        d.m = sel.toString();
        return x.slice(wgMonthNames[sel].length);
      case "W":
        //ISO-8601 week number of year, weeks starting on Monday
        var len = 2;
        if (x.slice(0, 2) != parseInt(x.slice(0, 2))) len = 1;
        d.W = x.slice(0, len);
        return x.slice(len);
      case "j":
        //Day of the month without leading zeros
        var len = 2;
        if (x.slice(0, 2) != parseInt(x.slice(0, 2))) len = 1;
        d.d = x.slice(0, len);
        return x.slice(len);
      case "d":
        //Day of the month, 2 digits with leading zeros
        d.d = x.slice(0, 2);
        return x.slice(2);
      case "J":
        //Day of the month minus 1 without leading zeros (starting from 0)
        var len = 2;
        if (x.slice(0, 2) != parseInt(x.slice(0, 2))) len = 1;
        d.d = x.slice(0, len);
        return x.slice(len);
      case "z":
        //The day of the year (starting from 0)
        var len = 3;
        if (x.slice(0, 3) != parseInt(x.slice(0, 3))) if (x.slice(0, 2) != parseInt(x.slice(0, 2))) len = 1;
        else len = 2;
        d.z = x.slice(0, len);
        return x.slice(len);
      case "D":
        //A textual representation of a day, three letters
        d.w = wgDayNamesShort.indexOf(x.slice(0, 3));
        return x.slice(3);
      case "l":
        //A full textual representation of the day of the week
        var sel = -1;
        for (var i = 1; i < wgDayNames.length; i++) {
          if (wgDayNames[i] == x.slice(0, wgDayNames[i].length)) {
            sel = i;
            break;
          }
        }
        d.w = sel.toString();
        return x.slice(wgDayNames[sel].length);
      case "N":
        //ISO-8601 numeric representation of the day of the week
        d.w = (parseInt(x.slice(0, 1)) - 1).toString();
        return x.slice(1);
      case "w":
        //Numeric representation of the day of the week
        d.w = x.slice(0, 1);
        return x.slice(1);
      case "S":
        //English ordinal suffix for the day of the month, 2 characters
        return x.slice(2);
      case "a":
        //Lowercase Ante meridiem and Post meridiem
        if (!d.H) d.H = x.slice(0, 2) == "am" ? 0 : 12;
        return x.slice(2);
      case "A":
        //Uppercase Ante meridiem and Post meridiem
        if (!d.H) d.H = x.slice(0, 2) == "AM" ? 0 : 12;
        return x.slice(2);
      case "g":
        //12-hour format of an hour without leading zeros
        var len = 2;
        if (x.slice(0, 2) != parseInt(x.slice(0, 2))) len = 1;
        var h = parseInt(x.slice(0, len)) + (parseInt(wgNow.toString("G")) < 12 ? 0 : 12);
        if (!d.H) d.H = h;
        return x.slice(len);
      case "h":
        //12-hour format of an hour with leading zeros
        var h = parseInt(x.slice(0, 2)) + (parseInt(wgNow.toString("G")) < 12 ? 0 : 12);
        if (!d.H) d.H = h;
        return x.slice(2);
      case "G":
        //24-hour format of an hour without leading zeros
        var len = 2;
        if (x.slice(0, 2) != parseInt(x.slice(0, 2))) len = 1;
        d.H = x.slice(0, len);
        return x.slice(len);
      case "H":
        //24-hour format of an hour with leading zeros
        d.H = x.slice(0, 2);
        return x.slice(2);
      case "B":
        //Swatch Internet time
        return x.slice(3);

      case "i":
        //Minutes with leading zeros, two characters
        d.i = x.slice(0, 2);
        return x.slice(2);
      case "p":
        //Minutes without leading zeros.
        if (x.slice(0, 2) != parseInt(x.slice(0, 2))) len = 1;
        d.i = x.slice(0, len);
        return x.slice(len);
      case "s":
        //Seconds with leading zeros, two characters
        d.s = x.slice(0, 2);
        return x.slice(2);
      case "q":
        //Seconds without leading zeros.
        if (x.slice(0, 2) != parseInt(x.slice(0, 2))) len = 1;
        d.s = x.slice(0, len);
        return x.slice(len);
      case "U":
        //Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
        d.U = x.slice(0, 10);
        return x.slice(10);
      case "u":
        //Microseconds
        var len = 3;
        for (var i = len; i > 0; i++) {
          if (x.slice(0, i) == parseInt(x.slice(0, i))) len = i;
          break;
        }
        d.u = x.slice(0, len);
        return x.slice(len);
      case "e":
        //Timezone identifier (same as "T"), doesn't work like PHP
        return x.toUTCString().split(" ")[5];
      case "I":
        //Whether or not the date is in daylight saving time
        return x.slice(1);
      case "O":
        //Difference to Greenwich time (GMT) in hours
        return x.slice(5);
      case "P":
        //Difference to Greenwich time (GMT) with colon between hours and minutes
        return x.slice(6);
      case "T":
        //Timezone abbreviation
        return x.slice(3);
      case "Z":
        //Timezone offset in seconds.
        return x;

      case "t":
        //Number of days in the given month
        return x;
      case "c":
        //ISO 8601 date
        return x.toDate("Y-m-dTH:i:sP");
      case "r":
        //RFC 2822 formatted date
        return x.toDate("D, j M Y H:i:s O");

      default:
        return x.slice(1);
    }
  };

  var escaping;
  var escapeC = ["'", '"'];
  for (var i = 0; i < format.length; i++) {
    if (escaping && escaping == format[i]) escaping = false;
    else if (escaping) continue;
    else if (format[i] == "\\" && i != format.length - 1) i++;
    else if (escapeC.contains(format[i])) escaping = format[i];
    else x = v(format[i], x);
  }

  for (var i = 0; i < p.length; i++) if (typeof (d[p[i]]) == "undefined") d[p[i]] = wgNow.toString(p[i]);

  d.m = (parseInt(d.m) - 1).toString(); //convert to normal JS value

  if (d.U) return new Date(d.U);
  else if (d.z) {
    var zz = wgNow.toString("z");
    var diff = zz - d.z;
    var temp = new Date(wgNow.valueOf() - (diff * 1000 * 60 * 60 * 24));
    return new Date(d.Y, temp.toString("m"), temp.toString("d"), d.H, d.i, d.s, d.u);
  } else if (d.W) {
    var WW = wgNow.toString("WW");
    var diff = WW - d.W;
    var temp = new Date(wgNow.valueOf() - (diff * 1000 * 60 * 60 * 24 * 7));
    if (d.w) {
      var ww = wgNow.toString("ww");
      var diff = ww - d.w;
      var temp = new Date(temp.valueOf() - (diff * 1000 * 60 * 60 * 24));
    }
    return new Date(d.Y, temp.toString("m"), temp.toString("d"), d.H, d.i, d.s, d.u);
  } else {
    return new Date(d.Y, d.m, d.d, d.H, d.i, d.s, d.u);
  }
};

/*** Location stuff v1 ******************************************************
 * window.location functions
 * Documentation on Help:JavaScript
 ****************************************************************************/
window.location.searchList = (function () {
  var x = window.location.search.slice(1).split("&");
  var list = {};

  x.forEach(function (a) {
    var b = a.split("=");
    if (b[0].slice(-2) == "[]") {
      var key = b[0].slice(0, -2);
      if (!list[key]) list[key] = [];
      b.shift();
      list[key].push(b.join("="));
    } else list[b.shift()] = b.join("=");
  });
  return list;
})();

window.location.getSearch = function (a) {
  return location.searchList[a];
};
/*** Node stuff v1.4.2 ******************************************************
 * Stuff for node/element searching and re-positioning
 * Documentation on Help:JavaScript
 ****************************************************************************/
//Creates a node given HTML
//E.g. '<div style="color: blue" class="red">' will create div element with given style and class
//Parameters without values (e.g. "disabled") cannot be used.
Document.prototype.createElementFromHTML = function (input) {
  var innerhtml;
  if (input.contains("</")) {
    innerhtml = input.split(">");
    innerhtml.shift();
    innerhtml = innerhtml.join(">").split("<");
    innerhtml.pop();
    innerhtml = innerhtml.join("<");
  }
  input = input.split(">")[0].split('"');
  for (var i = 0; i < input.length; i++) {
    if (i % 2 === 0 && i != input.length - 1) input[i] = input[i].replaceAll(" ", "@s@");
  }
  if (input.length > 1) input.pop();
  input = input.join('"');
  var attribs = input.split("@s@");
  var tag = attribs.shift().replace("<", "").replace(">", "");
  var elem = document.createElement(tag);
  for (var i = 0; i < attribs.length; i++) {
    var attval = attribs[i].split("=");
    attval[1] = attval[1].split('"')[1];
    elem.setAttribute(attval[0], attval[1]);
  }
  if (innerhtml) elem.innerHTML = innerhtml;
  return elem;
};

Node.prototype.getFirstAncestorByTagName = function (tag, limit) {
  if (!limit) limit = -1;
  var e = this;
  for (var i = 0; i != limit; i++) {
    e = e.parentNode;
    if (e.tagName.toLowerCase() == tag.toLowerCase()) break;
    if (i == limit - 1) return undefined;
  }
  return e;
};

Node.prototype.getElementsByTagAndClass = function (tagN, classN) {
  if (typeof (getElementsByClassName) != "undefined") return getElementsByClassName(this, tagN, classN);
  var arr = this.getElementsByClassName(classN);
  var outp = [];
  for (var i = 0; i < arr.length; i++) if (arr[i].tagName.toLowerCase() === tagN.toLowerCase()) outp.push(arr[i]);
  return outp;
};

Node.prototype.setStyles = function (styles, optValue) {
  if (optValue) {
    this.styles = optValue;
    return;
  }
  for (var x in styles) {
    this.style[x] = styles[x];
  }
};

Node.prototype.insertAfter = function (moveElement, staticElement) {
  var nextAfter = staticElement.nextSibling;
  if (nextAfter) {
    this.insertBefore(moveElement, nextAfter);
    return;
  }
  this.appendChild(moveElement);
};

Node.prototype.stealChildren = function (el, before) {
  if (before) for (var i = 0; el.childNodes.length > 0; i++) {
    if (i === 0) this.insertBefore(el.childNodes[0], this.childNodes[0]);
    else this.insertAfter(el.childNodes[0], this.childNodes[i]);
  }
  while (el.childNodes.length > 0) this.appendChild(el.childNodes[0]);
};

Node.prototype.addClass = function (className) {
  if (this.classList) this.classList.add(className);
  else if (!((" " + this.className + " ").contains("className"))) this.className += " " + className;
};

Node.prototype.removeClass = function (className) {
  if (this.classList) this.classList.remove(className);
  else if (((" " + this.className + " ").contains("className"))) this.className = "(@s@ " + this.className + " @e@".replaceAll(" className ", " ").replaceAll("@s@ ", "").replaceAll(" @e@", "").replaceAll("@e@", "");

};

Node.prototype.hasClass = function (className) {
  if (this.classList) return this.classList.contains(className);
  return (" " + this.className + " ").contains(" " + className + " ");
};

function insertAfter(moveElement, staticElement) {
  staticElement.parentNode.insertAfter(moveElement, staticElement);
}

function insertBefore(moveElement, staticElement) {
  staticElement.parentNode.insertBefore(moveElement, staticElement);
}

Node.prototype.kill = function () {
  killElement(this);
};

function killElement(e) //removes input element from page and accessibility
{
  if (e) e.parentNode.removeChild(e);
}

function killElementsByClassName(c) //removes elements with input class
{
  var e = document.getElementsByClassName(c);
  for (var i = 0; i < e.length; i++) {
    killElement(e[i]);
  }
}

function killElementById(id) //removes elements with input id
{
  if (document.getElementById(id)) killElement(document.getElementById(id));
}

(function () {
  var arrayMethods = Object.getOwnPropertyNames(Array.prototype);
  var arrayLike = [NodeList, HTMLCollection];
  arrayLike.forEach(function (a) {
    arrayMethods.forEach(function (b) {
      a.prototype[b] = Array.prototype[b];
    });
  });
})();

Object.defineProperty(Node.prototype, "documentOffsetTop", {
  get: function () {
    var element = this;
    var x = 0;
    while (true) {
      if (element.offsetTop === undefined) break;
      x += element.offsetTop;
      if (element.tagName == "BODY" || !element.offsetParent === undefined) break;
      element = element.offsetParent;
    }
    return x;
  }
});

Object.defineProperty(Node.prototype, "documentOffsetLeft", {
  get: function () {
    var element = this;
    var x = 0;
    while (true) {
      if (element.offsetLeft === undefined) break;
      x += element.offsetLeft;
      if (element.tagName == "BODY" || !element.offsetParent === undefined) break;
      element = element.offsetParent;
    }
    return x;
  }
});

Object.defineProperty(Node.prototype, "documentOffsetBottom", {
  get: function () {
    return this.documentOffsetTop + this.offsetHeight;
  }
});

Object.defineProperty(Node.prototype, "documentOffsetRight", {
  get: function () {
    return this.documentOffsetLeft + this.offsetWidth;
  }
});

/*** Object functions v1.1 **************************************************
 * Stuff for objects
 * Because of jQuery oversights, defineProperty has to be used to make it
 *   not enumerable so for..ins don't confuse it with a member
 * Documentation on Help:JavaScript
 ****************************************************************************/
Object.defineProperty(Object.prototype, "indexOf", {
  value: function (search) {
    for (var x in this) if (this[x] == search) return x;
    return -1;
  },
  enumerable: false
});

Object.defineProperty(Object.prototype, "contains", {
  value: function (search) {
    if (this.indexOf(search) == -1) return false;
    return true;
  },
  enumerable: false
});

Object.defineProperty(Object.prototype, "forEach", {
  value: function forEach(fun) {
    if (typeof (fun) != "function") return;
    var t = Object(this); //create copy
    for (var i in t) {
      if (typeof (t[i]) != "function") fun.call(undefined, t[i], i, t);
    }
  },
  enumerable: false
});

function forEach(obj, fun) {
  obj.forEach(fun);
}

/*** Array functions v1 *****************************************************
 * Stuff for arrays
 * Documentation on Help:JavaScript
 ****************************************************************************/
Object.defineProperty(Array.prototype, "toObject", {
  value: function (delim) {
    var unique = 0;
    var obj = {};
    for (var i = 0; i < this.length; i++) {
      var key, value;
      if (delim && this[i].contains(delim)) {
        var x = this[i].split(delim);
        key = x.shift();
        value = x.join(delim);
      } else {
        key = unique;
        unique++;
        value = this[i];
      }
      obj[key] = value;
    }
    return obj;
  },
  enumerable: false
});


/****************************************************************************
 * End functions
 ****************************************************************************/

/*** Search/GET modifiers v1 ************************************************
 * Searches values in URL and modifies appropriately.
 * Requires Location stuff (v1+)
 * Written by JBed of FFWiki
 ****************************************************************************/
//"action": Adds additional actions.
////"move" or "rename" loads move form
////"upload" loads upload form
////"talk" loads page's talk page
////"whatlinkshere" loads WLH page
if (typeof (wgAction) == "undefined") {
  var wgAction = "view";
  if (document.getElementById("mw-returnto")) wgAction = "nosuchaction";
  else if (location.getSearch("action")) wgAction = location.getSearch("action");
  else if (editform) wgAction = "edit";
}

if (typeof (wgFormattedNamespaces) == "undefined") {
  //manual copy 15/07/2014
  var wgFormattedNamespaces = {
    "-2": "Media",
      "-1": "Special",
      "0": "",
      "1": "Talk",
      "2": "User",
      "3": "User talk",
      "4": "Final Fantasy Wiki",
      "5": "Final Fantasy Wiki talk",
      "6": "File",
      "7": "File talk",
      "8": "MediaWiki",
      "9": "MediaWiki talk",
      "10": "Template",
      "11": "Template talk",
      "12": "Help",
      "13": "Help talk",
      "14": "Category",
      "15": "Category talk",
      "110": "Forum",
      "111": "Forum talk",
      "112": "Walkthrough",
      "113": "Walkthrough talk",
      "1200": "Message Wall",
      "1201": "Thread",
      "1202": "Message Wall Greeting"
  };
  var wgCanonicalNamespace = wgFormattedNamespaces[wgNamespaceNumber];
}

if (wgAction == "nosuchaction" && location.getSearch("action")) {
  switch (location.getSearch("action")) {
    case "move":
    case "rename":
      wgAction = wikilinkUrl("Special:MovePage/" + wgPageName);
      break;
    case "upload":
      if (wgPageName.slice(0, 5).toLowerCase() == "file:") wgAction = wikilinkUrl("Special:Upload?wpDestFile=" + wgPageName.slice(5) + "&wpForReUpload=1");
      break;
    case "logs":
    case "log":
      wgAction = wgServer + "/index.php?title=Special:Log&page=" + wgPageName;
      break;
    case "talk":
    case "discuss":
      if (0 <= wgNamespaceNumber && wgNamespaceNumber < 1000) wgAction = wikilinkUrl(wgFormattedNamespaces[(wgNamespaceNumber % 2 === 0) ? wgNamespaceNumber + 1 : wgNamespaceNumber] + ":" + wgTitle);
      break;
    case "whatlinkshere":
    case "wlh":
      wgAction = wikilinkUrl("Special:WhatLinksHere/" + wgPageName);
      break;
  }
  if (wgAction != "nosuchaction") {
    location.href = wgAction;
    document.head.getElementsByTagName("title")[0].innerHTML = "Loading...";
    document.getElementById("WikiaMainContent").style.visibility = "hidden";
  }
}

//"tester": boolean. For FFWiki -- forces "wgUserTester" status
if (location.getSearch("tester")) switch (location.getSearch("tester")) {
  case "true":
    wgUserTester = true;
    break;
  case "false":
    wgUserTester = false;
    break;
}

//"theme": string. For FFWiki -- imports given theme stylesheet. default: "oasis"
if (skin == "oasis" && (localStorage && localStorage.theme || location.getSearch("usetheme"))) {
  themename = location.getSearch("usetheme") || localStorage.theme;
  switch (themename) {
    case "zidane":
      importCssPage("User:JBed/zidanetheme.css");
      break;
    case "rydia":
      importCssPage("User:JBed/rydiatheme.css");
      break;
    case "halloween":
      importCssPage("User:JBed/halloween.css");
      break;
    default:
      themename = "oasis";
  }
}

//"preloadparam": Array of parameters for preloads. default=[]
if (wgAction == "edit" && editform && location.getSearch("preload") && location.getSearch("preloadparams"))(function () {
  var p = location.getSearch("preloadparams");
  var text = editform.value;
  for (var i = p.length; i > 0; i--) text = text.replaceAll("$" + i, p[i - 1]);
  editform.value = text;
})();

//"css": boolean. Removes all CSS. default: true
if (location.getSearch("css") && location.getSearch("css") == "false") {
  for (var i = 0; i < document.styleSheets.length; i++) document.styleSheets[i].disabled = !document.styleSheets[i].disabled;
  x = $("body *, body");
  x.forEach(function (a) {
    a.style = "";
  });
}

//"javascript": boolean. Terminates JS execution.
if (location.getSearch("javascript") && location.getSearch("javascript") == "false") {
  $ = undefined;
  throw {
    name: "JavaScript",
    message: "disabled"
  };
}


/*** $magic v1 **************************************************************
 * A placeholder for storing elements and associated information
 ****************************************************************************/
var $magic = {};


/*** Create tHead v1 ********************************************************
 * Takes header rows from tables and puts them in tHead element
 * Checks if row contains TDs
 * If row doesn't contain TDs but isn't header row,
 *  apply class "first-row" to TR
 * Written by JBed of FFWiki
 ****************************************************************************/
function createTHead(table) {
  var thead = table.tHead;
  if (thead) return thead;
  thead = document.createElement("thead");
  var tbody = table.tBodies[0];
  table.insertBefore(thead, tbody);
  for (var i = 0; i < tbody.rows.length; i++) {
    var tbodyrow = tbody.rows[0];
    if (tbodyrow.getElementsByTagName("td").length !== 0 || tbodyrow.hasClass("first-row")) break;
    thead.appendChild(tbodyrow);
  }
  return thead;
}

/*** Collapsiblity v1.2 *****************************************************
 * Functions and variables for collapsible divs and tables
 * Written by JBed of FFWiki
 ****************************************************************************/
function getCollapseCaption(testElement) {
  return testElement.hasClass("collapsed") ? expandCaption : collapseCaption;
}

var autoCollapse = 2;
var collapseCaption;
var expandCaption;

addOnloadHook(function () {
  if (!mw.messages) mw.messages = {
    values: []
  };
  if (!expandCaption) expandCaption = mw.messages.values["showtoc"] || "show";
  if (!collapseCaption) collapseCaption = mw.messages.values["hidetoc"] || "hide";
});

/*** Collapsible tables v1.1 ************************************************
 * Allows tables to be collapsible
 * Uses class "collapsible" to set collapsibility
 * Class "collapsed" makes it collapsed by default
 * First row must use THs
 * Written by JBed of FFWiki
 ****************************************************************************/
function collapseTables() {
  var tableCollapse = article.getElementsByTagAndClass("table", "collapsible");
  for (var i = 0; i < tableCollapse.length; i++) {
    var tableCol = tableCollapse[i];
    var id;
    for (; i < tableCollapse.length; i++) {
      tableCol = tableCollapse[i];
      id = "tableCollapse" + i.toString();
      if (tableCol.id != id) break;
      if (i == tableCollapse.length - 1) return;
    }
    tableCol.id = "tableCollapse" + i.toString();
    var tableColTr = tableCol.getElementsByTagName("tr")[0];
    if (tableColTr) {
      var tableColThead = createTHead(tableCol);
      var thArray = tableColThead.getElementsByTagName("th");
      if (thArray.length !== 0) {
        var tableColTh = thArray[thArray.length - 1];
        tableColTh.innerHTML = '<span class="showhide" style="float:right">[<a class="showhidetext" href="#" onclick="collapseTableClick(this);return false;">' + getCollapseCaption(tableCol) + '</a>]</span>' + tableColTh.innerHTML;
      }
    }
  }
}
if (article) addOnloadHook(collapseTables);

function collapseTableClick(sender) {
  var tableCollapse = sender.getFirstAncestorByTagName("table");
  var tableCollapseBody = tableCollapse.getElementsByTagName("tbody")[0];
  if (tableCollapse.hasClass("collapsed")) tableCollapse.removeClass("collapsed");
  else tableCollapse.addClass("collapsed");
  sender.innerHTML = getCollapseCaption(tableCollapse);
}

/*** Collapsible trs v1.2 ***************************************************
 * Allows associated table rows to collapse under another
 * Uses class "collapsible" to set collapsibility
 * Class "collapsed" makes it collapsed by default
 * Collapses all rows underneath it until another tr has
 *  the class "collapsible", or a tr has the class "uncollapsible"
 * The show/hide link is added to the last cell
 * Written by JBed of FFWiki
 ****************************************************************************/
function collapseTrs() {
  var parents = article.getElementsByTagAndClass("tr", "collapsible");
  var css = "";
  for (var i = 0; i < parents.length; i++) {
    var p;
    var pid;
    for (; i < parents.length; i++) {
      p = parents[i];
      pid = "trCollapse" + i.toString();
      if (p.id != pid) break;
      if (i == parents.length - 1) return;
    }
    var pcc = pid + "Child";
    p.id = pid;
    renderTr(p);
    var test = p;
    var cnt = 0;
    for (;;) {
      if (!test.nextSibling || test.nextSibling.hasClass("collapsible") || test.nextSibling.hasClass("uncollapsible") || (test.nextSibling.tagName && test.nextSibling.tagName != p.tagName)) break;
      test = test.nextSibling;
      if (test.tagName) {
        test.addClass(pcc);
        cnt++;
      }
    }
    if (p.childNodes.length > 0 && cnt > 0) {
      var lastChild = p.childNodes[p.childNodes.length - 1];
      var tag = lastChild.tagName.toLowerCase();
      if (tag != "th" && tag != "td") break;
      lastChild.innerHTML = '<span class="showhide" style="float:right; width:auto">[<a class="showhidetext" href="#" onclick="collapseTrClick(this);return false;">' + getCollapseCaption(p) + '</a>]</span>' + lastChild.innerHTML;
    }
    css += "table." + pid + "Collapsed ." + pcc + " { display: none; }\n";
  }
  createCssRules(css);
}
if (article) addOnloadHook(collapseTrs);

function renderTr(tr) {
  var table = tr.getFirstAncestorByTagName("table");
  var colClass = tr.id + "Collapsed";
  if (tr.hasClass("collapsed")) table.addClass(colClass);
  else table.removeClass(colClass);
}

function collapseTrClick(sender) {
  var p = sender.getFirstAncestorByTagName("tr");
  if (p.hasClass("collapsed")) p.removeClass("collapsed");
  else p.addClass("collapsed");
  renderTr(p);
  sender.innerHTML = getCollapseCaption(p);
}

/*** Collapsible divs v1.3  *************************************************
 * Allows div content to be collapsible
 * Documentation: [[Help:JavaScript#Collapsible divs]]
 * Written by JBed of FFWiki
 ****************************************************************************/
function collapseDivs() {
  var divCollapse = article.getElementsByTagAndClass("div", "collapsible");
  for (var i = 0; i < divCollapse.length; i++) {
    var divCol;
    var divid;
    for (; i < divCollapse.length; i++) {
      divCol = divCollapse[i];
      divid = "divCollapse" + i.toString();
      if (divCol.id != divid) break;
      if (i == divCollapse.length - 1) return;
    }
    divCol.id = divid;
  }
  for (var i = 0; i < divCollapse.length; i++) {
    var divCol = document.getElementById("divCollapse" + i.toString());
    var divColHead = divCol.getElementsByClassName("header")[0];
    if (divColHead) divCol.removeChild(divColHead);
    else divColHead = document.createElementFromHTML('<span class="header">');
    var divColFoot = divCol.getElementsByClassName("footer")[0];
    if (divColFoot) divCol.removeChild(divColFoot);
    var divColHide = document.createElementFromHTML('<div class="hideElement">');
    divColHide.stealChildren(divCol);
    divCol.appendChild(divColHide);
    divCol.insertBefore(divColHead, divColHide);
    if (divColFoot) divCol.appendChild(divColFoot);
    var divColShowHide = document.createElement("div");
    divColShowHide.innerHTML = '<span class="showhide" style="float:right">[<a class="showhidetext" href="#" onclick="collapseDivClick(this);return false;">' + getCollapseCaption(divCol) + '</a>]</span>';
    divColHead.stealChildren(divColShowHide, true);
    if ((divCol.hasClass("slide") || divCol.hasClass("fade")) && divCol.hasClass("collapsed")) {
      divCol.removeClass("collapsed");
      $(divCol.getElementsByClassName("hideElement")[0]).slideUp(0, function () {
        divCol.addClass("collapsed");
      });
    }

    divCol.toggleCollapse = function (collapse) {
      var toggle = (collapse === undefined);
      var showhide = this.getElementsByClassName("showhidetext")[0];
      if (this.hasClass("collapsed") && (!collapse || toggle)) {
        var uncollapseIt = function () {
          showhide.innerHTML = getCollapseCaption(this);
        }.bind(this);
        this.removeClass("collapsed");
        showhide.innerHTML = getCollapseCaption(this);
        if (this.hasClass("slide") || this.hasClass("fade")) {
          var e = this.getElementsByClassName("hideElement")[0];
          if (this.hasClass("slide")) $(e).slideDown(400, uncollapseIt);
          if (this.hasClass("fade")) $(e).fadeIn(400, uncollapseIt);
        } else uncollapseIt();
        return;
      } else if (collapse || toggle) {
        var collapseIt = function () {
          this.addClass("collapsed");
          showhide.innerHTML = getCollapseCaption(this);
        }.bind(this);
        if (this.hasClass("slide") || this.hasClass("fade")) {
          var e = this.getElementsByClassName("hideElement")[0];
          if (this.hasClass("slide")) $(e).slideUp(400, collapseIt);
          if (this.hasClass("fade")) $(e).fadeOut(400, collapseIt);
        } else collapseIt();
      }
    };
  }
}
if (article) addOnloadHook(collapseDivs);

function collapseDivClick(sender) {
  var divCollapse = sender.parentNode.parentNode.parentNode;
  if (divCollapse.tagName !== "DIV" || !divCollapse.hasClass("collapsible")) return;
  divCollapse.toggleCollapse();
}

/*** Scrollable tables v1.2  ************************************************
 * Retains the table header on screen when table scrolled
 * Uses class "scrollable" to allow scrolling header
 * Requires $magic
 * Requires createTHead
 * Written by JBed of FFWiki
 ****************************************************************************/
if (article) addOnloadHook(tHeadScroll);

function tHeadScroll() {
  var tables = article.getElementsByClassName("scrollable");
  if (tables.length === 0) return;
  var css = "table.scrollable.scrolling thead{position:fixed;top:0;margin-left:-1px;display:table} table.scrollable.scrolling tbody tr.temp-header{display:table-row} table.scrollable  tbody tr.temp-header{display:none}";
  for (var i = 0; i < tables.length; i++) {
    tables[i].addClass("tableScroll" + i);
    css += "table.scrollable.scrolling.tableScroll" + i + " thead{width:" + (tables[i].clientWidth + 2) + "px";
    var thead = createTHead(tables[i]);
    var ta = document.getElementsByClassName("scrollable")[0];
    var x = ta.tHead.rows;
    var c;
    x.forEach(function (a) {
      var b = a.cloneNode(true);
      b.addClass("temp-header");
      if (!c) insertBefore(b, ta.tBodies[0].firstChild);
      else insertAfter(b, c);
      c = b;
    });
  }
  createCssRules(css);
  $magic.scrollable = [];
  for (var i = 0; i < tables.length; i++) {
    $magic.scrollable[i] = {
      el: tables[i],
      active: false
    };
  }
  window.addEventListener("scroll", function () {
    for (var i = 0; i < $magic.scrollable.length; i++) {
      var r = $magic.scrollable[i];
      if (r.el.documentOffsetTop < pageYOffset && pageYOffset < r.el.documentOffsetBottom - r.el.tHead.clientHeight) {
        if (!r.active) {
          r.el.addClass("scrolling");
          r.active = true;
          break;
        }
      } else if (r.active) {
        r.el.removeClass("scrolling");
        r.active = false;
        break;
      }
    }
  });
}

/*** Spoiler handling v3.1 **************************************************
 * Sets up #Skip section links
 * Toggles spoiler handling
 * Allows user to customize settings
 * Written by JBed of FFWiki
 ****************************************************************************/
$magic.spoilers = {
  elements: [],
  settings: {
    rel: {},
    create: function () {
      this.rel = {
        $: true
      };
      this.save();
    },
    load: function () {
      if (!localStorage.spoiler) {
        $magic.spoilers.settings.create();
      }
      var arr = localStorage.spoiler.split(";");
      var obj = arr.toObject(":");
      var $found = false;
      for (var a in obj) {
        if (a === "$") $found = true;
        obj[a] = (obj[a] === "true");
      }
      if (!$found) {
        localStorage.removeItem("spoiler");
        this.create();
      }
      this.rel = obj;
    },
    save: function () {
      if (this.rel.$ === undefined) return;
      var arr = [];
      for (var a in this.rel) {
        arr.push(a + ":" + this.rel[a]);
      }
      localStorage.spoiler = arr.join(";");
    },
    edit: function (key, value) {
      if (value === null) delete(this.rel[key]);
      else this.rel[key] = value;
      this.save();
      var val = (this.rel[key] !== undefined ? this.rel[key] : this.rel.$);
      if (val) $magic.spoilers.showForRel(key);
      else $magic.spoilers.hideForRel(key);
      divSpoilers();
    }
  },

  init: function () {
    var spoilSecs = article.getElementsByTagAndClass("div", "spoilers");
    for (var i = 0; i < spoilSecs.length; i++) {
      if (spoilSecs[i].getElementsByClassName("endspoiler").length != 1) {
        spoilSecs[i].getElementsByClassName("skiplink")[0].innerHTML = '<strong class="error">Error: no end spoiler tag</strong>';
        continue;
      }
      this.elements.push({
        el: spoilSecs[i],
        rel: spoilSecs[i].getAttribute("data-rel"),
        hide: function () {
          if (this.el.toggleCollapse) this.el.toggleCollapse(true);
          else this.el.addClass("collapsed");
        },
        show: function () {
          if (this.el.toggleCollapse) this.el.toggleCollapse(false);
          else this.el.removeClass("collapsed");
        }
      });
      var spoilName = "skipspoiler" + (i + 1).toString();
      spoilSecs[i].getElementsByClassName("skiplink")[0].getElementsByTagName("a")[0].href = "#" + spoilName;
      spoilSecs[i].getElementsByClassName("endspoiler")[0].id = spoilName;
    }
    var spoilSecs = article.getElementsByTagAndClass("span", "ilspoiler");
    for (var i = 0; i < spoilSecs.length; i++) {
      spoilSecs[i].removeClass("nojs");
      this.elements.push({
        el: spoilSecs[i],
        rel: spoilSecs[i].getAttribute("data-rel"),
        hide: function () {
          this.el.addClass("hidden");
        },
        show: function () {
          this.el.removeClass("hidden");
        }
      });
    }
    this.toggleFromSettings();
  },
  toggleFromSettings: function () {
    var def = this.settings.rel.$;
    for (var i = 0; i < this.elements.length; i++) {
      var x = this.elements[i];
      var val = this.settings.rel[x.rel] !== undefined ? this.settings.rel[x.rel] : def;
      if (!val) x.hide();
      else x.show();
    }
  },
  showForRel: function (release) {
    var und = (release === undefined);
    if (!und && release == "$") {
      this.toggleFromSettings();
      return;
    }
    for (var i = 0; i < this.elements.length; i++) {
      var x = this.elements[i];
      if (und || x.rel == release) x.show();
    }
  },
  hideForRel: function (release) {
    var und = (release === undefined);
    if (!und && release == "$") {
      this.toggleFromSettings();
      return;
    }
    for (var i = 0; i < this.elements.length; i++) {
      var x = this.elements[i];
      if (und || x.rel == release) x.hide();
    }
  }
};

function divSpoilers() {
  var elid = "spoilerlist";
  var el = document.getElementById(elid) || document.createElementFromHTML('<div id="' + elid + '">');

  function addS(id, state) {
    var reltrue = (rel[id] !== undefined);
    return '<div id="' + id + '-spoiler" class="rel-spoiler">' + (reltrue ? '<span title="' + rel[id].full + '">' + id + '</span>' : "Master") + ': (' + (state === true ? "show" : '<a href="##" onclick="$magic.spoilers.settings.edit(\'' + id + '\', true);return false;">show</a>') + ' / ' + (state === false ? "hide" : '<a href="##" onclick="$magic.spoilers.settings.edit(\'' + id + '\', false);return false;">hide</a>') + (!reltrue ? "" : ' / ' + (state === undefined ? "default" : '<a href="##" onclick="$magic.spoilers.settings.edit(\'' + id + '\', null);return false;">default</a>')) + ')</div>';
  }
  var inner = addS("$", $magic.spoilers.settings.rel.$);
  for (var i = 0; i < wgReleasesCovered.length; i++) {
    inner += addS(wgReleasesCovered[i], $magic.spoilers.settings.rel[wgReleasesCovered[i]]);
  }
  el.innerHTML = inner;
  rail.appendChild(el);
} //called further down

if (wgUserTester) $magic.spoilers.settings.load();
else $magic.spoilers.settings.create();
if (article) $magic.spoilers.init();

/* AJAX RC */

if (wgPageName == "Special:RecentChanges") importScriptPage('AjaxRC/code.js', 'dev');

/*** Extra navbox javascript ************************************************
 * Shows "navbox" templates shown by default on their page and not elsewhere
 * Uses class "collapsible" to set collapsibility
 * A span with class "va-navbox-container" is required
 * Written by JBed of FFWiki
 ****************************************************************************/
if (article && wgCanonicalNamespace == "Template") {
  function noCollapseNavPage() {
    var navbox = article.getElementsByClassName("va-navbox-container");
    if (!navbox) return;
    navbox = navbox[0];
    if (navbox && ("Template:" + navbox.id).toLowerCase() == (wgPageName + "-nav").toLowerCase()) {
      article.getElementsByClassName("collapsible").forEach(function (a) {
        a.toggleCollapse(false);
      });
    }
  }
  addOnloadHook(noCollapseNavPage);
}

/*** Check username v1.1 ****************************************************
 * Replace {{USERNAME}} with user's username
 * {{ifregistered}} handling
 * Written by JBed of FFWiki
 ****************************************************************************/
checkUsername();

function checkUsername() {
  if (article && typeof (wgUserName) !== undefined && wgUserName) {
    article.getElementsByClassName("insertusername").forEach(function (a) {
      a.innerHTML = wgUserName;
    });
    article.getElementsByClassName("userunregistered").forEach(function (a) {
      a.style.display = "none";
    });
    article.getElementsByClassName("userregistered").forEach(function (a) {
      a.style.display = "inline-block";
    });
  }
}

/*** Check user rights v1.1 *************************************************
 * {{ifgroup}} handling
 * Written by JBed of FFWiki
 ****************************************************************************/
checkUserRights();

function checkUserRights() {
  if (!article) return;
  article.getElementsByClassName("ifgrouptemplate").forEach(function (a) {
    var groups = a.getAttribute("data-src").replaceAll(",", ";").replaceAll(" ;", ";").split(";");
    var t = 0;
    groups.forEach(function (b) {
      t += ifGroup(b);
    });
    if (t) {
      var b = a.getElementsByClassName("ifgrouptrue");
      if (b.length) b[0].style.display = "";
      b = a.getElementsByClassName("ifgroupfalse");
      if (b.length) b[0].style.display = "none";
    }
  });
}

/*** Handle VIII enemy stats ************************************************
 * Stores the formula of VIII enemies
 * Uses them to distribute to formula foots
 * Writes stat tables
 * Written by JBed of FFWiki
 ****************************************************************************/
enemyStatsVIII();

function enemyStatsVIII() {
  if (document.getElementById("enemyStatOutputVIII")) importJsPage("MediaWiki:VIIIEnemyStats.js");
}

/*-----------------------------------------------------------/
/--Makes tables sortable-------------------------------------/
/------------------Activated on tables with class="sortable"-/
/--------Removes effect from columns with class="unsortable"-/
/-----------------------------------------------------------*/
function ts_makeSortable(table) {
  var firstRow = createTHead().rows[0];
  if (!firstRow) return;
  for (var i = 0; i < firstRow.cells.length; i++) {
    var cell = firstRow.cells[i];
    if ((" " + cell.className + " ").indexOf(" unsortable ") == -1) {
      cell.innerHTML += ' ' + '<a href="#" class="sortheader" ' + 'onclick="ts_resortTable(this);return false;">' + '<span class="sortarrow">' + '<img src="' + ts_image_path + ts_image_none + '" alt="↓"/></span></a>';
    }
  }
  if (ts_alternate_row_colors) {
    ts_alternate(table);
  }
}
/* Paypal button for main page */
function onloadhookcustom() {
  var replace = document.getElementById("AdolasPayPal");
  if (null !== replace) {
    replace.innerHTML = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----MIIHLwYJKoZIhvcNAQcEoIIHIDCCBxwCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYBaym2+12iEuvbGoC5aLTZHkxlTOXdG3Us2TW7H5dJQXFAUFMXun4rJhGd+3r8fiR+UpEqMe9hK0MRsF6/gXU6vMGiq4Zokim5xrH6xqCJkA/QqEt8T3unB8Uw7mG6dpNNmhxAl11HWTQrp17+UG8WQ7EXZE5FsyhiuCpL2Y/yvojELMAkGBSsOAwIaBQAwgawGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQIwKi5Xipnn5+AgYjFEemIjoEfQiaX+ysiHhaicd+LVQlQao97lXgvAJm9K0OMz60ma9yMSUch9n0RrRy0M4vtfUW55Bn6i43WbsOKnTAelMQn5pfuRmpEuY91MXlHFFp1rv7UmmK9jehCq+3wsaHWlCUIb/aZcFGgyxPE6MdRNgVWNSfYZKdX43tDeladvRK7nje5oIIDhzCCA4MwggLsoAMCAQICAQAwDQYJKoZIhvcNAQEFBQAwgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMB4XDTA0MDIxMzEwMTMxNVoXDTM1MDIxMzEwMTMxNVowgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBR07d/ETMS1ycjtkpkvjXZe9k+6CieLuLsPumsJ7QC1odNz3sJiCbs2wC0nLE0uLGaEtXynIgRqIddYCHx88pb5HTXv4SZeuv0Rqq4+axW9PLAAATU8w04qqjaSXgbGLP3NmohqM6bV9kZZwZLR/klDaQGo1u9uDb9lr4Yn+rBQIDAQABo4HuMIHrMB0GA1UdDgQWBBSWn3y7xm8XvVk/UtcKG+wQ1mSUazCBuwYDVR0jBIGzMIGwgBSWn3y7xm8XvVk/UtcKG+wQ1mSUa6GBlKSBkTCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb22CAQAwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCBXzpWmoBa5e9fo6ujionW1hUhPkOBakTr3YCDjbYfvJEiv/2P+IobhOGJr85+XHhN0v4gUkEDI8r2/rNk1m0GA8HKddvTjyGw/XqXa+LSTlDYkqI8OwR8GEYj4efEtcRpRYBxV8KxAW93YDWzFGvruKnnLbDAF6VR5w/cCMn5hzGCAZowggGWAgEBMIGUMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTAwNjI5MDU0MzUxWjAjBgkqhkiG9w0BCQQxFgQUDu3F8t0ulM4+fYCNulXS78TSO9YwDQYJKoZIhvcNAQEBBQAEgYA8KcP9MvE9n2LF8fuNJ7pEkZzh2m9tWpfZy6c5R14R6vmoqyXd68e99/Mao1hl8TCwwGikAMzhqwIsT7hfvrYtgfGRCQqL8E1+XhsvFygiKloVayM4rlc25MQtPr0KYm5YMArd0CFIFPrmK/RbT09HjkPOZvuM4d7j3/hz2Wu79Q==-----END PKCS7-----"><input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1"></form>';
  }
}
addOnloadHook(onloadhookcustom);

/*
 ================================================
 $Id: tabber.js,v 1.9 2006/04/27 20:51:51 pat Exp $
 tabber.js by Patrick Fitzgerald pat@barelyfitz.com

 Documentation can be found at the following URL:
 http://www.barelyfitz.com/projects/tabber/

 License (http://www.opensource.org/licenses/mit-license.php)

 Copyright (c) 2006 Patrick Fitzgerald

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation files
 (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify, merge,
 publish, distribute, sublicense, and/or sell copies of the Software,
 and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 ==================================================*/

function tabberObj(argsObj) {
  var arg; /* name of an argument to override */

  /* Element for the main tabber div. If you supply this in argsObj,
    then the init() method will be called.
  */
  this.div = null;

  /* Class of the main tabber div */
  this.classMain = "tabber";

  /* Rename classMain to classMainLive after tabifying
    (so a different style can be applied)
  */
  this.classMainLive = "tabberlive";

  /* Class of each DIV that contains a tab */
  this.classTab = "tabbertab";

  /* Class to indicate which tab should be active on startup */
  this.classTabDefault = "tabbertabdefault";

  /* Class for the navigation UL */
  this.classNav = "tabbernav";

  /* When a tab is to be hidden, instead of setting display='none', we
    set the class of the div to classTabHide. In your screen
    stylesheet you should set classTabHide to display:none.  In your
    print stylesheet you should set display:block to ensure that all
    the information is printed.
  */
  this.classTabHide = "tabbertabhide";

  /* Class to set the navigation LI when the tab is active, so you can
    use a different style on the active tab.
  */
  this.classNavActive = "tabberactive";

  /* Elements that might contain the title for the tab, only used if a
    title is not specified in the TITLE attribute of DIV classTab.
  */
  this.titleElements = ['h2', 'h3', 'h4', 'h5', 'h6'];

  /* Should we strip out the HTML from the innerHTML of the title elements?
    This should usually be true.
  */
  this.titleElementsStripHTML = false;

  /* If the user specified the tab names using a TITLE attribute on
    the DIV, then the browser will display a tooltip whenever the
    mouse is over the DIV. To prevent this tooltip, we can remove the
    TITLE attribute after getting the tab name.
  */
  this.removeTitle = true;

  /* If you want to add an id to each link set this to true */
  this.addLinkId = false;

  /* If addIds==true, then you can set a format for the ids.
    <tabberid> will be replaced with the id of the main tabber div.
    <tabnumberzero> will be replaced with the tab number
    (tab numbers starting at zero)
    <tabnumberone> will be replaced with the tab number
    (tab numbers starting at one)
    <tabtitle> will be replaced by the tab title
    (with all non-alphanumeric characters removed)
  */
  this.linkIdFormat = '<tabberid>nav<tabnumberone>';

  /* You can override the defaults listed above by passing in an object:
    var mytab = new tabber({property:value,property:value});
  */
  for (arg in argsObj) {
    this[arg] = argsObj[arg];
  }

  /* Array of objects holding info about each tab */
  this.tabs = [];

  /* If the main tabber div was specified, call init() now */
  if (this.div) {

    this.init(this.div);

    /* We don't need the main div anymore, and to prevent a memory leak
     in IE, we must remove the circular reference between the div
     and the tabber object. */
    this.div = null;
  }
}

/*--------------------------------------------------
 Methods for tabberObj
 --------------------------------------------------*/

tabberObj.prototype.init = function (e) {
  /* Set up the tabber interface.

    e = element (the main containing div)

    Example:
    init(document.getElementById('mytabberdiv'))
  */

  var
  childNodes, /* child nodes of the tabber div */
  i, i2, /* loop indices */
  t, /* object to store info about a single tab */
  defaultTab = 0,
    /* which tab to select by default */
    DOM_ul, /* tabbernav list */
    DOM_li, /* tabbernav list item */
    DOM_a, /* tabbernav link */
    aId, /* A unique id for DOM_a */
    headingElement; /* searching for text to use in the tab */

  /* Verify that the browser supports DOM scripting */
  if (!document.getElementsByTagName) {
    return false;
  }

  /* If the main DIV has an ID then save it. */
  if (e.id) {
    this.id = e.id;
  }

  /* Clear the tabs array (but it should normally be empty) */
  this.tabs.length = 0;

  /* Loop through an array of all the child nodes within our tabber element. */
  childNodes = e.childNodes;
  for (i = 0; i < childNodes.length; i++) {

    /* Find the nodes where class="tabbertab" */
    if (childNodes[i].className && childNodes[i].hasClass(this.classTab)) {

      /* Create a new object to save info about this tab */
      t = {};

      /* Save a pointer to the div for this tab */
      t.div = childNodes[i];

      /* Add the new object to the array of tabs */
      this.tabs[this.tabs.length] = t;

      /* If the class name contains classTabDefault,
        then select this tab by default.
      */
      if (childNodes[i].className && childNodes[i].hasClass(this.classTabDefault)) {
        defaultTab = this.tabs.length - 1;
      }
    }
  }

  /* Create a new UL list to hold the tab headings */
  DOM_ul = document.createElement("ul");
  DOM_ul.className = this.classNav;

  /* Loop through each tab we found */
  for (i = 0; i < this.tabs.length; i++) {

    t = this.tabs[i];

    /* Get the label to use for this tab:
      From the title attribute on the DIV,
      Or from one of the this.titleElements[] elements,
      Or use an automatically generated number.
    */
    t.headingText = t.div.title;

    /* Remove the title attribute to prevent a tooltip from appearing */
    if (this.removeTitle) {
      t.div.title = '';
    }

    if (!t.headingText) {

      /* Title was not defined in the title of the DIV,
        So try to get the title from an element within the DIV.
        Go through the list of elements in this.titleElements
        (typically heading elements ['h2','h3','h4'])
      */
      for (i2 = 0; i2 < this.titleElements.length; i2++) {
        headingElement = t.div.getElementsByTagName(this.titleElements[i2])[0];
        if (headingElement) {
          t.headingText = headingElement.innerHTML;
          if (this.titleElementsStripHTML) {
            t.headingText.replace(/<br>/gi, " ");
            t.headingText = t.headingText.replace(/<[^>]+>/g, "");
          }
          break;
        }
      }
    }

    if (!t.headingText) {
      /* Title was not found (or is blank) so automatically generate a
       number for the tab.
      */
      t.headingText = i + 1;
    }

    /* Create a list element for the tab */
    DOM_li = document.createElement("li");

    /* Save a reference to this list item so we can later change it to
      the "active" class */
    t.li = DOM_li;

    /* Create a link to activate the tab */
    DOM_a = document.createElement("a");
    DOM_a.appendChild(document.createTextNode(t.headingText));
    DOM_a.href = "javascript:void(null);";
    DOM_a.title = t.headingText;
    DOM_a.onclick = this.navClick;

    /* Add some properties to the link so we can identify which tab
      was clicked. Later the navClick method will need this.
    */
    DOM_a.tabber = this;
    DOM_a.tabberIndex = i;

    /* Do we need to add an id to DOM_a? */
    if (this.addLinkId && this.linkIdFormat) {

      /* Determine the id name */
      aId = this.linkIdFormat;
      aId = aId.replace(/<tabberid>/gi, this.id);
      aId = aId.replace(/<tabnumberzero>/gi, i);
      aId = aId.replace(/<tabnumberone>/gi, i + 1);
      aId = aId.replace(/<tabtitle>/gi, t.headingText.replace(/[^a-zA-Z0-9\-]/gi, ''));

      DOM_a.id = aId;
    }

    /* Add the link to the list element */
    DOM_li.appendChild(DOM_a);

    /* Add the list element to the list */
    DOM_ul.appendChild(DOM_li);
  }

  /* Add the UL list to the beginning of the tabber div */
  e.insertBefore(DOM_ul, e.firstChild);

  /* Make the tabber div "live" so different CSS can be applied */
  e.removeClass(this.classMain);
  e.addClass(this.classMainLive);

  /* Activate the default tab, and do not call the onclick handler */
  this.tabShow(defaultTab);

  /* If the user specified an onLoad function, call it now. */
  if (typeof this.onLoad == 'function') {
    this.onLoad({
      tabber: this
    });
  }

  return this;
};


tabberObj.prototype.navClick = function (event) {
  /* This method should only be called by the onClick event of an <A>
    element, in which case we will determine which tab was clicked by
    examining a property that we previously attached to the <A>
    element.

    Since this was triggered from an onClick event, the variable
    "this" refers to the <A> element that triggered the onClick
    event (and not to the tabberObj).

    When tabberObj was initialized, we added some extra properties
    to the <A> element, for the purpose of retrieving them now. Get
    the tabberObj object, plus the tab number that was clicked.
  */

  var
  rVal, /* Return value from the user onclick function */
  a, /* element that triggered the onclick event */
  self, /* the tabber object */
  tabberIndex, /* index of the tab that triggered the event */
  onClickArgs; /* args to send the onclick function */

  a = this;
  if (!a.tabber) {
    return false;
  }

  self = a.tabber;
  tabberIndex = a.tabberIndex;

  /* Remove focus from the link because it looks ugly.
    I don't know if this is a good idea...
  */
  a.blur();

  /* If the user specified an onClick function, call it now.
    If the function returns false then do not continue.
  */
  if (typeof self.onClick == 'function') {

    onClickArgs = {
      'tabber': self,
      'index': tabberIndex,
      'event': event
    };

    /* IE uses a different way to access the event object */
    if (!event) {
      onClickArgs.event = window.event;
    }

    rVal = self.onClick(onClickArgs);
    if (rVal === false) {
      return false;
    }
  }

  self.tabShow(tabberIndex);

  return false;
};


tabberObj.prototype.tabHideAll = function () {
  var i; /* counter */

  /* Hide all tabs and make all navigation links inactive */
  for (i = 0; i < this.tabs.length; i++) {
    this.tabHide(i);
  }
};


tabberObj.prototype.tabHide = function (tabberIndex) {
  var div;

  if (!this.tabs[tabberIndex]) {
    return false;
  }

  /* Hide a single tab and make its navigation link inactive */
  div = this.tabs[tabberIndex].div;

  /* Hide the tab contents by adding classTabHide to the div */
  div.addClass(this.classTabHide);
  this.navClearActive(tabberIndex);

  return this;
};


tabberObj.prototype.tabShow = function (tabberIndex) {
  /* Show the tabberIndex tab and hide all the other tabs */

  var div;

  if (!this.tabs[tabberIndex]) {
    return false;
  }

  /* Hide all the tabs first */
  this.tabHideAll();

  /* Get the div that holds this tab */
  div = this.tabs[tabberIndex].div;

  /* Remove classTabHide from the div */
  div.removeClass(this.classTabHide);

  /* Mark this tab navigation link as "active" */
  this.navSetActive(tabberIndex);

  /* If the user specified an onTabDisplay function, call it now. */
  if (typeof this.onTabDisplay == 'function') {
    this.onTabDisplay({
      'tabber': this,
      'index': tabberIndex
    });
  }
  return this;
};

tabberObj.prototype.navSetActive = function (tabberIndex) {
  /* Note: this method does *not* enforce the rule
    that only one nav item can be active at a time.
  */

  /* Set classNavActive for the navigation list item */
  this.tabs[tabberIndex].li.className = this.classNavActive;

  return this;
};


tabberObj.prototype.navClearActive = function (tabberIndex) {
  /* Note: this method does *not* enforce the rule
    that one nav should always be active.
  */

  /* Remove classNavActive from the navigation list item */
  this.tabs[tabberIndex].li.className = '';

  return this;
};


/*==================================================*/


function tabberAutomatic(tabberArgs) {
  /* This function finds all DIV elements in the article where
    class=tabber.classMain, then converts them to use the tabber
    interface.

    tabberArgs = an object to send to "new tabber()"
  */
  var
  tempObj, /* Temporary tabber object */
  divs, /* Array of all divs on the page */
  i; /* Loop index */

  if (!tabberArgs) {
    tabberArgs = {};
  }

  /* Create a tabber object so we can get the value of classMain */
  tempObj = new tabberObj(tabberArgs);

  /* Find all DIV elements in the article that have class=tabber */

  /* First get an array of all DIV elements and loop through them */
  divs = article.getElementsByTagName("div");
  for (i = 0; i < divs.length; i++) {

    /* Is this DIV the correct class? */
    if (divs[i].className && divs[i].hasClass(tempObj.classMain)) {

      /* Now tabify the DIV */
      tabberArgs.div = divs[i];
      divs[i].tabber = new tabberObj(tabberArgs);
    }
  }

  return this;
}


/*==================================================*/


function tabberAutomaticOnLoad(tabberArgs) {

  /* This function adds tabberAutomatic to the window.onload event,
    so it will run after the document has finished loading.
  */
  //  var oldOnLoad;

  if (!tabberArgs) {
    tabberArgs = {};
  }

  /* Taken from: http://simon.incutio.com/archive/2004/05/26/addLoadEvent */

  /*oldOnLoad = window.onload;
   if (typeof window.onload != 'function') {
    window.onload = function() {
     tabberAutomatic(tabberArgs);
    };
   } else {
    window.onload = function() {
     oldOnLoad();
     tabberAutomatic(tabberArgs);
    };
  }*/

  //Use the wiki onload
  if (article) {
    addOnloadHook(function () {
      tabberAutomatic(tabberArgs);
      changeTabWithHash();
    });
  }
}


/*==================================================*/
/* Run tabberAutomaticOnload() unless the "manualStartup" option was specified */

if (typeof tabberOptions == 'undefined') {

  tabberAutomaticOnLoad();

} else {

  if (!tabberOptions['manualStartup']) {
    tabberAutomaticOnLoad(tabberOptions);
  }

}

function rewriteSearchFormLink() {
  if ($('#searchform').length === 0) {
    return;
  }
  var links = document.getElementById('searchform').getElementsByTagName('a');

  if (links.length > 0) {
    links[0].href = wgScriptPath + '/index.php?title=Special:Search&adv=1';
  }
}

var firstRun = true;

function loadFunc() {
  if (firstRun) firstRun = false;
  else return;

  rewriteSearchFormLink();

  fixSearch();
}

function fixSearch() {
  var button = document.getElementById('searchSubmit');

  if (button) button.name = 'go';
}

addOnloadHook(loadFunc);

/*** Tabber extension - change tabs with hash *******************************
 * Allows changing of tab with given syntax
 * Defaults to using location.hash
 * Syntax is (#)[tabber.title]:[tab.title];
 * For tabs within tabs, repeat again
 * Written by JBed of FFWiki
 ****************************************************************************/
if (article) window.addEventListener("hashchange", function () {
  changeTabWithHash();
});

function changeTabWithHash(hashstring) {
  if (!hashstring) hashstring = location.hash.slice(1);
  hashstring = encodeHash(hashstring);
  if (!hashstring.contains(".3A")) return;
  var search = article;
  var hash = hashstring.split(".3B"); //semi-colon
  for (var i = 0; i < hash.length; i++) {
    var tabbers = search.getElementsByClassName("tabberlive");
    var selector = hash[i].split(".3A"); //colon
    if (!selector[1]) return;
    var tab;
    for (var j = 0; j < tabbers.length; j++) {
      if (encodeHash(tabbers[j].title.urlEncode()) == selector[0].replaceAll(".27", "'")) {
        tab = tabbers[j];
        break;
      }
    }
    if (!tab) return;
    var navtabs = tab.getElementsByClassName("tabbernav")[0].getElementsByTagName("a");
    for (var j = 0; j < navtabs.length; j++) {
      if (encodeHash(navtabs[j].title.urlEncode()) == selector[1]) {
        navtabs[j].click();
        break;
      }
    }
    if (i == hash.length - 1) return;
    var actualtabs = tab.getElementsByClassName("tabbertab");
    for (var j = 0; j < actualtabs.length; j++) {
      if (!(actualtabs[j].hasClass("tabbertabhide")) && actualtabs[j].parentNode == tab) {
        search = actualtabs[j];
        break;
      }
      if (j == actualtabs.length - 1) return;
    }
  }
}



/*** Should link uploading on Oasis to the page with the rules text *********
 * ?
 ****************************************************************************/
if (skin === "oasis") $(".upphotos").click(function linkToUploader() {
  window.location.href = 'http://finalfantasy.wikia.com/wiki/Special:Upload';
});


/*** WLH edit links *********************************************************
 * Adds links for each linked page on Special:WhatLinksHere
 * Written by JBed of FFWiki
 ****************************************************************************/
function addEditLinksToWLH() {
  if (wgCanonicalSpecialPageName == 'Whatlinkshere') {
    var links = document.getElementById("mw-whatlinkshere-list");
    if (links) {
      links = links.getElementsByTagName('li');
    }
    for (var i = 0; i < links.length; i++) {
      aLink = links[i].getElementsByTagName('a');
      var linkHref = aLink[0].href + "?action=edit";
      var tools = links[i].getElementsByTagAndClass('span', 'mw-whatlinkshere-tools');
      var editLinkSpan = document.createElement("span");
      editLinkSpan.className = "mw-whatlinkshere-edit";
      editLinkSpan.innerHTML = '(<a title="Edit form" href="' + linkHref + '">edit</a>) ';
      links[i].insertBefore(editLinkSpan, tools[0]);
    }
  }
}

addOnloadHook(addEditLinksToWLH);


/*** File usage edit links **************************************************
 * Adds links for each linked page in File usage on file pages
 * Written by JBed of FFWiki
 ****************************************************************************/
function addEditLinksToFileUsage() {
  var linksUl = article.getElementsByTagAndClass("ul", "mw-imagepage-linkstoimage")[0];
  if (linksUl) {
    var linksLi = linksUl.getElementsByTagName("li");
    for (var i = 0; i < linksLi.length; i++) {
      var linksA = linksLi[i].getElementsByTagName("a")[0];
      var newLink = document.createElement("a");
      linksLi[i].innerHTML = linksLi[i].innerHTML + ' <span class="mw-imagepage-linkstoimage-edit">(<a title="Edit form" href="' + linksA.href + '?action=edit">edit</a>)</span>';
    }
  }
}

if (article) addOnloadHook(addEditLinksToFileUsage);

/*** Print variable *********************************************************
 * Finds text inside element with class "variable-output"
 * Changes element innerHTML to variable result
 * Shows "null" if no value found.
 * The format is dot-separated for object properties.
 * Written by JBed of FFWiki
 ****************************************************************************/
function printVariable() {
  var n = article.getElementsByClassName("variable-output");
  for (var i = 0; i < n.length; i++) {
    var e = (n[i].hasAttribute("data-element")) ? $(n[i].getAttribute("data-element"))[0] : undefined;
    n[i].innerHTML = getVariable(n[i].innerHTML, e) || "null";
  }
}
if (article) printVariable();

/*** Mix X-2 generator ******************************************************
 * Creates a generator for Mixes in X-2 for use on "Mix (Final Fantasy X-2)"
 * Written by JBed of FFWiki
 ****************************************************************************/
if (wgPageName == "Mix_(Final_Fantasy_X-2)" && wgNamespaceNumber === 0 && article) {
  importJsPage("MediaWiki:X2mix.js");
}

/*** UTC time display v4.0 **************************************************
 * Displays UTC time on page
 *  Inserts into elements with the "utcTime" class
 * Takes input time and displays in output format
 *  Inserts into elements with the "utcTimeDisplay" class
 * Takes input time and counts down towards it
 *  Inserts into elements with the "utcCountdown" class
 * Requires $magic
 * Written by JBed of FFWiki
 ****************************************************************************/
if (wgServerTime) {

  function doTime(t) {
    setInterval(function () {
      getCurrentUtcTime();
      if ($magic.clock) $magic.clock.update();
      if ($magic.countdown) $magic.countdown.update();
    }, t);
  }

  function getCurrentUtcTime() {
    var nowTime = new Date();
    var tempTime = new Date(-(nowTime - wgClientTime));
    wgNow = new Date(wgServerTime - tempTime);
    return wgNow;
  }

  function calculateTimezoneOffset(s) {
    if (!s) return 0;
    if (s == "local") return -(new Date(wgNow.valueOf() - new Date())).valueOf();
    var tzs = {
      bst: "+01:00:00",
      est: "-05:00:00",
      edt: "-06:00:00"
    };
    for (var x in tzs) {
      if (s == x) {
        s = tzs[x];
        break;
      }
    }
    var op = s.slice(0, 1) == "-" ? "-" : "+";
    var split = s.replace(op, "").split(":");
    offset = 1000 * 60 * 60 * (split[0] || 0);
    offset += 1000 * 60 * (split[1] || 0);
    offset += 1000 * (split[2] || 0);
    offset *= (op == "+" ? 1 : -1);
    return offset;
  }

  (function () {
    getCurrentUtcTime();

    var utcClock = document.getElementsByClassName("utcTime");
    if (utcClock.length === 0) return;

    $magic.clock = {
      elements: [],
      update: function () {
        this.elements.forEach(function (e) {
          e.update();
        });
      }
    };
    for (var i = 0; i < utcClock.length; i++) {
      var e = utcClock[i];
      var timeFormat = "H:i:s";
      if (e.hasAttribute("data-format")) timeFormat = e.getAttribute("data-format");
      var offset = 0;
      if (e.hasAttribute("data-timezone")) offset = calculateTimezoneOffset(e.getAttribute("data-timezone"));
      $magic.clock.elements.push({
        e: utcClock[i],
        format: timeFormat,
        offset: offset,
        update: function () {
          this.e.innerHTML = new Date(wgNow.valueOf() + this.offset).toString(this.format);
        }
      });
    }

    $magic.clock.update();
  })();

  (function () {
    var utcTime = document.getElementsByClassName("utcTimeDisplay");
    if (utcTime.length === 0) return;

    $magic.timedisplay = {
      elements: [],
      update: function () {
        this.elements.forEach(function (e) {
          e.update();
        });
      }
    };

    for (var i = 0; i < utcTime.length; i++) {
      var e = utcTime[i];
      var inputTime = e.getAttribute("data-input-time") || "";
      var inputFormat = e.getAttribute("data-input-format");
      var date = inputTime.toDate(inputFormat);
      var offset = calculateTimezoneOffset(e.getAttribute("data-output-timezone"));
      var format = e.getAttribute("data-output-format") || (inputFormat || "H:i, F d, Y '(UTC)'");
      $magic.timedisplay.elements.push({
        e: e,
        date: date,
        format: format,
        offset: offset,
        update: function () {
          this.e.innerHTML = new Date(this.date.valueOf() + this.offset).toString(this.format);
        }
      });
    }

    $magic.timedisplay.update();

  })();

  (function () {
    var utcCountdown = document.getElementsByClassName("utcCountdown");
    if (utcCountdown.length === 0) return;

    $magic.countdown = {
      elements: [],
      update: function () {
        this.elements.forEach(function (e) {
          e.update();
        });
      }
    };

    for (var i = 0; i < utcCountdown.length; i++) {
      var e = utcCountdown[i];
      var inputTime = e.getAttribute("data-input-time") || "";
      var inputFormat = e.getAttribute("data-input-format");
      var date = inputTime.toDate(inputFormat);
      var offset = calculateTimezoneOffset(e.getAttribute("data-output-timezone"));
      var format = e.getAttribute("data-output-format") || (inputFormat || "H:i, F d, Y '(UTC)'");
      var beyond = e.getAttribute("data-output-alt") || date.toString(this.format);
      $magic.countdown.elements.push({
        e: e,
        date: date,
        format: format,
        offset: offset,
        expire: beyond,
        update: function () {
          var dDate = new Date((this.date.valueOf() - wgNow.valueOf()) - this.offset);
          this.e.innerHTML = (dDate.valueOf() < 0 ? new Date(Math.abs(dDate)).toString(this.expire) : dDate.toString(this.format));
        }
      });
    }

    $magic.countdown.update();

  })();


  (function () {
    if ($magic.clock || $magic.countdown) addOnloadHook(function () {
      doTime(1000);
    });
    else addOnloadHook(function () {
      doTime(1000 * 60);
    });
  })();
}

/*** Ensure image load ******************************************************
 * Forces an image to load on startup
 * Loads images designed to load when scrolled past
 * For tabbers and collapsible content where images can
  appear at the top due to things above collapsing
 * Also uses "div.preload" to apply to contained elements
 * Written by JBed of FFWiki
 ****************************************************************************/
if (article) addOnloadHook(loadHiddenImagesOnLoad);

function loadHiddenImagesOnLoad() {
  loadHiddenImagesInClass("tabbertab");
  loadHiddenImagesInClass("preload");
}

function loadHiddenImagesInClass(sender) {
  var classN = article.getElementsByClassName(sender);
  for (var i = 0; i < classN.length; i++) loadHiddenChildImages(classN[i]);
}

function loadHiddenChildImages(sender) {
  var images = sender.getElementsByTagName("img");
  for (var i = 0; i < images.length; i++) loadHiddenImage(images[i]);
}

function loadHiddenImage(sender) {
  var source = sender.getAttribute("data-src");
  if (!source) return;
  sender.src = source;
  sender.style.opacity = 1;
}

/*** Cookie handling ********************************************************
 * Functions to retrieve and add cookies.
 * Written by JBed of FFWiki
 ****************************************************************************/

function getCookie(cookieName, error) {
  if (document.cookie.length > 0) {
    begin = document.cookie.indexOf(cookieName + "=");
    if (begin != -1) {
      begin += cookieName.length + 1;
      end = document.cookie.indexOf(";", begin);
      if (end == -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.slice(begin, end));
    }
  }
  return error;
}

function setCookie(cookieName, cookieValue, expireDays) {
  var expireDate = new Date();
  expireDate.setTime(expireDate.getTime() + (expireDays * 24 * 3600 * 1000));

  document.cookie = cookieName + "=" + escape(cookieValue) + ((expireDays === null) ? "" : "; expires=" + expireDate.toGMTString());
}

/*** localStorage handling **************************************************
 * Functions to retrieve and add to localStorage
 * Handles expiry times so things don't stay forever
 * Written by JBed of FFWiki
 ****************************************************************************/

function getLocalStorage(key, error) {
  var exp = "ExpireDate";
  if (localStorage && localStorage[key]) {
    if (localStorage[key + exp]) {
      if (parseInt(localStorage[key + exp]) < (wgNow || wgServerTime || wgClientTime).valueOf()) {
        localStorage.removeItem(key);
        localStorage.removeItem(key + exp);
      }
    }
    return localStorage[key] || error;
  }
  return error;
}

function setLocalStorage(key, value, expireDays) {
  var exp = "ExpireDate";
  if (!localStorage) return;
  if (expireDays) localStorage[key + exp] = ((wgNow || wgServerTime || wgClientTime).valueOf() + (1000 * 3600 * 24 * expireDays)).toString();
  localStorage[key] = value;
  return localStorage[key];
}

function removeLocalStorage(key, value) {
  if (!localStorage) return;
  var exp = "ExpireDate";
  localStorage.removeItem(key);
  localStorage.removeItem(key + exp);
}


/*** IRC box ****************************************************************
 * Creates and displays IRC box in sidebar
 * Allows logging into IRC from various pages
 * Only if given criteria met
 * Written by JBed of FFWiki
 ****************************************************************************/

if (wgAction == "view" && wgTitle != "IRC" && (skin == "oasis" || skin == "monobook")) {
  addOnloadHook(function () {
    if (getLocalStorage("ircName") || wgUserIRCName) ircSidebarSection();
  });
}

/*** IRC name cookie handling ***********************************************
 * Stores typed username in a cookie
 * Inserts it into IRC form
 * Requires localStorage handling
 * Written by JBed of FFWiki
 ****************************************************************************/
function ircOnload() {
  var ircForm = document.getElementById("ircform");
  if (ircForm) {
    var ircFormInputs = ircForm.getElementsByTagName("input");
    var ircName = wgUserIRCName || getLocalStorage("ircName");
    if (ircName) ircFormInputs[0].value = ircName;
    if (!wgUserIRCName) {
      ircFormInputs[1].onclick = function () {
        setLocalStorage("ircName", ircFormInputs[0].value, 7);
      };
    }
    ircForm.action = "http://webchat.freenode.net/";
  }
}

addOnloadHook(ircOnload);

/*** Article info box *******************************************************
 * Creates and displays article info box
 * Only displays if the page has something to display
 * Adds icons in the given order
 * Defers to specific skins for how to be handled
 * Written by JBed of FFWiki
 ****************************************************************************/
if ((wgNamespaceNumber === 0 || wgNamespaceNumber == 6 || wgPageName == "Final_Fantasy_Wiki:Sandsea") && (wgAction == "view" || skin == "monobook" && wgAction == "submit") && (skin == "oasis" || skin == "monobook") && (!ifGroup("staff"))) {
  addOnloadHook(articleinfoicons);
}

function articleinfoicons() {
  var output = "";
  var dateFmt = "F j, Y";
  var id = "";
  id = "accFeatured";
  var elem = document.getElementById(id);
  var string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Featured article";
  } else {
    string = "Featured article for " + string;
  }
  output += newAccoladeIcon(id, "Project:Featured Articles", string, "https://images.wikia.nocookie.net/__cb20090427121647/finalfantasy/images/8/8e/SkyPirDen_-_Crystal.png");

  id = "accGood";
  elem = document.getElementById(id);
  string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Good article";
  } else {
    string = "Good article since " + new Date(elem.innerHTML).toString(dateFmt);
  }
  output += newAccoladeIcon(id, "Project:Good Articles", string, "https://images.wikia.nocookie.net/__cb20090528210343/finalfantasy/images/c/c4/FF1_Treasure_Chest_1.gif");

  id = "mntExpand";
  elem = document.getElementById(id);
  string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Article requiring expansion";
  } else {
    string = "Article requiring expansion since " + new Date(elem.innerHTML).toString(dateFmt);
  }
  output += newMaintenanceIcon(id, "Category:Articles to be expanded", string, "https://images.wikia.nocookie.net/sprite/images/thumb/7/79/FFIVCid.png/26px-FFIVCid.png");

  id = "mntCleanup";
  elem = document.getElementById(id);
  string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Article requiring cleanup";
  } else {
    string = "Article requiring cleanup since " + new Date(elem.innerHTML).toString(dateFmt);
  }
  output += newMaintenanceIcon(id, "Category:Articles in need of cleanup", string, "https://images.wikia.nocookie.net/sprite/images/thumb/9/97/TacticsWhiteMage.png/26px-TacticsWhiteMage.png");

  id = "mntIncompleteTable";
  elem = document.getElementById(id);
  string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Article missing data";
  } else {
    string = "Article missing data since " + new Date(elem.innerHTML).toString(dateFmt);
  }
  output += newMaintenanceIcon(id, "Category:Articles with Incomplete Tables", string, "https://images.wikia.nocookie.net/__cb20130117071205/finalfantasy/images/thumb/f/fe/Cloud_ATB.png/26px-Cloud_ATB.png");

  id = "mntCiteSources";
  elem = document.getElementById(id);
  string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Article does not cite its sources";
  } else {
    string = "Article lacking citations since " + new Date(elem.innerHTML).toString(dateFmt);
  }
  output += newMaintenanceIcon(id, "Category:Articles in need of citations", string, "https://images.wikia.nocookie.net/sprite/images/thumb/3/3f/FFIXGarnet.png/26px-FFIXGarnet.png");

  id = "mntAddImages";
  elem = document.getElementById(id);
  string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Article needing images";
  } else {
    string = "Article needing images since " + new Date(elem.innerHTML).toString(dateFmt);
  }
  output += newMaintenanceIcon(id, "Category:Articles Needing Images", string, "https://images.wikia.nocookie.net/__cb20101126002150/finalfantasy/images/thumb/d/d0/Relm_Arrowny_small.png/26px-Relm_Arrowny_small.png");
  //releases-pre
  output += '<span id="relIconContainer">';
  //releases-main
  for (var x in rel) {
    output += newReleaseIcon(x);
  }
  //releases-end
  output += '</span>';

  var elem = document.getElementById("ArticleInformationBox");
  if (elem) {
    elem.innerHTML += output;
  }
  if (skin == "monobook") {
    if (wgReleasesCovered.length > 5) {
      var relContainer = document.getElementById("relIconContainer");
      relContainer.id = "relIconDropdown";
      var seriesIcon = newSeriesIcon("relIconDropdown", "series");
      seriesIcon += '<span class="dropdownButton" style="font-size:10px; line-height:0">ᐁ</span>';
      var relDropdownButton = document.createElement("span");
      relDropdownButton.id = "relIconContainer";
      relDropdownButton.innerHTML = seriesIcon;
      relDropdownButton.addEventListener("mouseover", function () {
        document.getElementById("relIconDropdown").style.display = "block";
      }, false);
      relDropdownButton.addEventListener("mouseleave", function () {
        document.getElementById("relIconDropdown").style.display = "none";
      }, false);
      relContainer.addEventListener("mouseover", function () {
        document.getElementById("relIconDropdown").style.display = "block";
      }, false);
      relContainer.addEventListener("mouseleave", function () {
        document.getElementById("relIconDropdown").style.display = "none";
      }, false);
      relContainer.parentNode.insertBefore(relDropdownButton, relContainer);
      relDropdownButton.appendChild(relContainer);
    }
  }
}

function newAccoladeIcon(id, page, hover, bgImg) {
  return newArticleInfoIcon(id, page, hover, bgImg, "", "");
}

function newReleaseIcon(id) {
  var page = rel[id].full;
  var useId = id + "-icon";
  var s = newCoverageIcon(useId, id, page, page, rel[id].icon);
  if (s === "") return s;
  var num = wgReleasesCovered.length;
  if (!num) num = 0;
  wgReleasesCovered.push(id);
  return s;
}

function newCoverageIcon(useId, id, link, full, text) {
  var bgImg = "https://images.wikia.nocookie.net/finalfantasy/images/c/c5/InfoIcon-release.png";
  text = transformCoverageText(text);
  return newArticleInfoIcon(useId, link, full, bgImg, id, text);
}

function transformCoverageText(text) {
  var textArray = text.split("|");
  var length = textArray.length;
  var number = ["one", "two"];
  text = "";
  for (var i = 0; i < length; i++) {
    text += '<span class="' + number[length - 1] + '-line';
    var lineClass = "";
    var textAsArray = textArray[i].split(")");
    if (textAsArray.length == 2) {
      lineClass = "-" + textAsArray[0].replace("(", "");
      textAsArray[0] = textAsArray[1];
    }
    text += lineClass + '">' + textAsArray[0] + '</span>';
    if (i != length - 1) {
      text += "<br/>";
    }
  }
  return text;
}

function newSeriesIcon(findId, id) {
  var text = ser[id].icon + "|(small)¯¯¯";
  var s = newCoverageIcon(findId, id, ser[id].link, ser[id].full, text);
  return s;
}

function newMaintenanceIcon(id, page, hover, bgImg) {
  return newArticleInfoIcon(id, page, hover, bgImg, "", "");
}

/*** Late call *************************************************************/
if (wgUserTester && rail && article && (wgNamespaceNumber === 0 || wgPageName == "Final_Fantasy_Wiki:Sandsea")) addOnloadHook(divSpoilers);

/*** Refocus {{A}} **********************************************************
 * Takes {{A}} uses in tables and relocates them to the cell ID
 * Means it focuses on the cell instead of v-centered text
 * Written by JBed of FFWiki
 ****************************************************************************/
if (article) refocusAttach();

function refocusAttach() {
  var table = article.getElementsByClassName("table");
  for (var i = 0; i < table.length; i++) {
    var attach = table[i].getElementsByClassName("attach");
    for (var j = 0; j < attach.length; j++) {
      var origElem = attach[j];
      var elem = origElem;
      var id = elem.id;
      for (var k = 0; k < 5; k++) {
        elem = elem.parentNode;
        if (elem.tagName == "TH" || elem.tagName == "TD") {
          if (!elem.id) {
            elem.id = id;
            origElem.id = "";
          }
          break;
        }
      }
    }
  }
  var gallery = article.getElementsByTagAndClass("div", "proto-gallery");
  for (var i = 0; i < gallery.length; i++) {
    var attach = gallery[i].getElementsByClassName("attach");
    for (var j = 0; j < attach.length; j++) {
      var origElem = attach[j];
      var elem = origElem;
      var id = elem.id;
      for (var k = 0; k < 5; k++) {
        elem = elem.parentNode;
        if (elem.hasClass("thumbinner")) {
          elem.id = id;
          origElem.id = "";
          break;
        }
      }
    }
  }
}

/*** Prevent delete *********************************************************
 * Prevents the deletion of pages (monobook only)
 * Only effects whitelisted pages
 * Written by JBed of FFWiki
 ****************************************************************************/

preventDelete();

function preventDelete() {
  var deleteConfirm = document.getElementById("deleteconfirm");
  if (deleteConfirm) {
    lockPage = ["Final_Fantasy_Wiki", "Final_Fantasy_Wiki_Dragon_s_Neck_Colosseum"];
    for (var i = 0; i < lockPage.length; i++) {
      if (document.getElementsByTagAndClass("body", "page-" + lockPage[i])[0]) break;
      if (i == lockPage.length - 1) return;
    }
    deleteConfirm.style.display = "none";
    document.getElementById("mw-content-text").getElementsByTagName("P")[0].innerHTML = "I'm sorry Dave, I'm afraid I can't do that";
  }
}

/*** Prevent delete of used files *******************************************
 * Prevents immediate deletion of used files
 * Directed to pages used on when Delete clicked
 * Error provides a link to delete form
 * Written by JBed of FFWiki
 ****************************************************************************/
if (wgCanonicalNamespace == "File") deleteQuestion();

function deleteQuestion() {
  var usedImage = document.getElementById("mw-imagepage-section-linkstoimage");
  if (!usedImage) {
    var x = document.getElementsByClassName("page-listings");
    for (var i = 0; i < x.length; i++) if (x[i].getAttribute("data-listing-type") == "local") {
      usedImage = x[i];
      break;
    }
    if (usedImage) {
      var pEl = document.createElement("p");
      insertAfter(pEl, usedImage.getElementsByTagName("h2")[0]);
      usedImage.id = "mw-imagepage-section-linkstoimage";
    }
  }
  if (!usedImage || !ifGroup("sysop")) return;
  var delButton = document.getElementById("ca-delete");
  if (delButton.tagName != "A") delButton = delButton.getElementsByTagName("a")[0];
  var delHref = delButton.href;
  delButton.href = "#mw-imagepage-section-linkstoimage";
  delButton.onclick = function () {
    var errorP = usedImage.getElementsByTagName("p")[0];
    errorP.innerHTML = '<strong class="error">' + errorP.innerHTML + ' Are you sure you still want to delete? <a href="' + delHref + '">Yes</a></strong>';
  };
}

/*** References pop-ups *****************************************************
 * Creates pop-ups when ref numbers are mouseovered
 * Disappear on new mouseover or mouseout for time
 * Written by JBed of FFWiki
 ****************************************************************************/
if (article) addOnloadHook(function () {
  if (wgUserTester) {
    refPop();
  }
});
if (article) addOnloadHook(footPop);

function footPop() {
  var foot = article.getElementsByClassName("footnote");
  for (var i = foot.length - 1; i >= 0; i--) {
    var textNode = foot[i].getElementsByTagName("span")[0];
    if (textNode) {
      var text = textNode.innerHTML;
      if (text !== "") popup(foot[i], text);
      textNode.kill();
      if (text !== "") continue;
      var repl = document.createElement("span");
      repl.stealChildren(foot[i]);
      insertAfter(repl, foot[i]);
      foot[i].kill();
    }
  }
}

function refPop() {
  var refLinks = article.getElementsByTagAndClass("sup", "reference");
  for (var i = 0; i < refLinks.length; i++) {
    var refA = refLinks[i].getElementsByTagName("a")[0];
    var refTarget = document.getElementById(refA.href.split("#")[1]);
    var refTargText = refTarget.getElementsByTagAndClass("span", "reference-text")[0].innerHTML;
    popup(refLinks[i], refTargText);
  }
}

function popup(element, text, className) {
  element.addEventListener("mouseover", function (v) {
    var popUp = document.getElementById("refpopup");
    if (popUp) killElement(popUp);
    var popUp = document.getElementById("refpopup-over");
    if (popUp) killElement(popUp);
    var newPopUp = document.createElement("SPAN");
    var elemName = "refpopup";
    newPopUp.id = elemName;
    newPopUp.addClass(elemName);
    if (className) newPopUp.addClass(className);
    var dateTime = new Date().valueOf();
    newPopUp.setAttribute("time-id", dateTime);
    this.setAttribute("time-id", dateTime);
    newPopUp.innerHTML = text;
    insertAfter(newPopUp, this);
    var x = 0;
    newPopUp.style.position = "fixed";
    //newPopUp.style.visibility = "hidden";
    newPopUp.style.left = "0";
    newPopUp.style.maxWidth = "250px";
    for (var i = 0; i < newPopUp.childNodes.length; i++) {
      var a = newPopUp.childNodes[i];
      if (a.clientWidth && a.clientWidth > 250 || a.offsetWidth && a.offsetWidth > 250) x += 1;
    }
    if (x !== 0) newPopUp.style.maxWidth = "";

    var vW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var vX = v.clientX + 10;
    var vY = v.clientY + 10;
    var eL = this.documentOffsetLeft - window.scrollX;
    var eT = this.documentOffsetTop - window.scrollY;
    var pW = newPopUp.clientWidth;
    var pH = newPopUp.clientHeight;
    console.log(pH);
    console.log(pW);
    var pL = vX + pW > vW ? vW - pW : vX;
    var pT = vY - pH < 0 ? 0 : vY - pH;

    newPopUp.style.left = pL + "px";
    newPopUp.style.top = pT + "px";

    newPopUp.style.visibility = "visible";
    newPopUp.addEventListener("mouseover", function () {
      newPopUp.id = "refpopup-over";
    }, false);
    newPopUp.addEventListener("mouseleave", function () {
      setTimeout(function () {
        var ref = document.getElementById("refpopup-over");
        if (ref && ref.getAttribute("time-id") == this.getAttribute("time-id")) killElement(ref);
      }.bind(this), 500);
    }.bind(newPopUp), false);
  }, false);

  element.addEventListener("mouseleave", function () {
    setTimeout(function () {
      var ref = document.getElementById("refpopup");
      if (ref && ref.getAttribute("time-id") == this.getAttribute("time-id")) killElement(ref);
    }.bind(this), 100);
  }.bind(element), false);
}

/*** Create CSS rules *******************************************************
 * Function that adds CSS to to page
 * Allows JS conditions to effect CSS inclusions
 * Written by JBed of FFWiki
 ****************************************************************************/
function createCssRules(cssStyles, id) {
  if (id) if (document.getElementById(id)) killElementById(id);
  var style = document.createElement("style");
  if (id) style.id = id;
  style.type = "text/css";
  style.innerHTML = cssStyles;
  document.getElementsByTagName('head')[0].appendChild(style);
}

function importCssUrl(url) {
  var head = document.getElementsByTagName("head")[0];
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  head.appendChild(link);
  return link;
}

function importCssPage(page) {
  return importCssUrl(wikilinkUrl(page) + "?usemsgcache=yes&ctype=text/css&smaxage=86400&action=raw&maxage=86400");
}


/*** Add JS scripts *********************************************************
 * Function that adds CSS to to page
 * Allows JS conditions to effect CSS inclusions
 * Written by JBed of FFWiki
 ****************************************************************************/
function addJsScript(jsScripts) {
  eval(string.toExec());
}

function importJsUrl(url) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  head.appendChild(script);
  return script;
}

function importJsPage(page) {
  return importJsUrl(wikilinkUrl(page) + "?action=raw&ctype=text/javascript");
}

/*** Link image thumbs to file page *****************************************
 * Changes links on image to link to the file page
 *  rather than the file itself
 * Written by JBed of FFWiki
 ****************************************************************************/
function linkToFilePage() {
  var x = article.getElementsByClassName("image-thumbnail");
  for (var i = 0; i < x.length; i++) x[i].href = wikilinkUrl("File:" + x[i].getElementsByTagName("img")[0].getAttribute("data-image-key").fAndR("&amp;", "&"));
}

/*** Replace youtube tags with video templates, overriding Wikia's scripts **
 * Script that makes changes on editor-load
 * Written by JBed of FFWiki
 ****************************************************************************/
if (wgAction == "edit" && !clientPC.contains("msie 9")) {
  function commonFixes() {
    var changes = [{
      o: "{{video|",
      n: "{{video|"
    }, {
      o: "}}",
      n: "}}"
    }, {
      o: "[[File:",
      n: "[[File:"
    }, {
      o: "[[Project:",
      n: "[[Project:"
    }, {
      o: "{{Project:",
      n: "{{Project:"
    }];

    function tagReplace(o, n) {
      var output = [];
      var fmt = ["<$ ", "<$>", "</$>"];
      for (var i = 0; i < fmt.length; i++) output.push({
        o: fmt[i].replace("$", o),
        n: fmt[i].replace("$", n)
      });
      return output;
    }
    changes = changes.concat(tagReplace("s", "del"));
    changes = changes.concat(tagReplace("strike", "del"));

    var s = editform.value;

    for (var i = 0; i < changes.length; i++) {
      s = s.replaceAll(changes[i].o, changes[i].n);
    }

    if (editform.value != s) editform.value = s;
  }

  addOnloadHook(commonFixes);
}

/*Per-page stuff*/
/* First-tier scope list */
if (wgArticleId == "6909" && article) {
  (function() {
    var string = "";
    var y = rel;
    string += "<ul>";
    var ul = false;
    for (var x in y) {
      if (y[x].sub !== false) {
        if (ul === true && (y[x].sub === undefined || y[x].sub === "")) {
          string += "</li></ul>";
          ul = false;
        }
        if (ul === false && (y[x].sub !== undefined && y[x].sub !== "")) {
          string += "<ul>";
          ul = true;
        }
        string += '<li><em>' + wikilinkHtml(y[x].full) + '</em>';
      }
    }
    if (ul === true) {
      string += "</li></ul>";
    }
    string += "</li></ul>";
    var outputElement = document.getElementById("target");
    if (outputElement) outputElement.innerHTML = string;
  })();
}

/*Class codes*/
if ((wgArticleId == "7866" || wgArticleId == "204219") && article) {
  (function() {
    var string = "";
    var y = rel;
    var cols = 9;

    function createTable(header) {
      return '<table class="full-width table" style="text-align:center;font-family:monospace"><tr style="background:#F5F5F5;font-style:italic"><th colspan="' + cols + '">' + header + '</th></tr>';
    }

    function newRow(header) {
      return [
        '<tr style="background:#CCCCCC;font-style:italic"><th>' + header + '</th>',
        '<tr style="background:#DDDDDD"><th style="width:74px">Header</th>',
        '<tr style="background:#DDDDDD"><th style="width:74px">Subheader</th>'];
    }

    function addBlock(array, t, r) {
      var link = "";
      if (t[r].link === undefined) {
        link = t[r].full;
      } else {
        link = t[r].link;
      }
      array[0] += '<th>' + wikilinkHtml(link, r) + '</th>';
      array[1] += '<td style="width:74px" class="' + r + 'a">' + r + 'a</td>';
      array[2] += '<td style="width:74px" class="' + r + 'b">' + r + 'b</td>';
      return array;
    }

    function endRow(array) {
      for (var i = 0; i < array.length; i++) {
        array[i] += "</tr>";
      }
      return array;
    }

    function endTable() {
      return "</table>";
    }
    var loops = ["Series", "Releases"];
    var arrays = [ser, rel];
    var single = ["Series", "Release"];
    for (var i = 0; i < loops.length; i++) {
      var count = 0;
      var total = Object.keys(arrays[i]).length;
      string += createTable(loops[i]);
      var y = arrays[i];
      var j = 0;
      var strings;
      for (var x in y) {
        if (j === 0) {
          strings = newRow(single[i]);
        }
        strings = addBlock(strings, y, x);
        if (j == cols - 2 || count + 1 == total) {
          strings = endRow(strings);
          for (var k = 0; k < strings.length; k++) {
            string += strings[k];
          }
        }
        j++;
        j = j % (cols - 1);
        count++;
      }
      string += endTable();
    }
    var boxtarget = document.getElementById("boxTarget");
    if (boxtarget) boxtarget.innerHTML = string;
  })();
}

/*Side icon gallery*/
if ((wgArticleId == "179936" || wgArticleId == "204219") && article) {
  (function() {
    var origSkin = skin;
    skin = "oasis";
    var perrow = 5;
    var string = '<table class="full-width table"><tr class="seriesa">';
    for (var i = 0; i < perrow; i++) string += '<th style="width:50px">Icon</th><th style="width:115px">ID</th>';
    string += "</tr>";
    var total = Object.keys(rel).length;
    var i = 0;
    for (var x in rel) {
      if (i % perrow === 0) string += "<tr>";
      var page = rel[x].full;
      string += '<td>';
      string += newCoverageIcon("useId", x, page, page, rel[x].icon);
      string += '</td><td>';
      string += wikilinkHtml(rel[x].full, x);
      string += "</td>";
      if (i % perrow == perrow || i + 1 == total) string += "</tr>";
      i++;
    }
    string += "</table>";
    var outputElement = document.getElementById("useId");
    if (outputElement) outputElement.innerHTML = string;
    skin = origSkin;
    createCssRules("#ArticleInformationBox{display:none} .page-info-icon{border:0; margin: 0}");
  })();
}

if ((wgArticleId == "202728" || wgArticleId == "204219") && article) {
  (function() {
    var elem = document.getElementById("navboxes");
    var output = "";
    if (elem) {
      var d = [rel, ser];
      for (var q in d) {
        var y = d[q];
        var i = 0;
        var limit = 2;
        output += '<table class="table"><tr>';
        for (var j = 0; j < limit; j++) output += '<th style="width:105px">Nav</th><th style="width:170px">Image</th>';
        output += '</tr>';
        for (var x in y) {
          if (y[x].nav) {
            if (i === 0) output += "<tr>";
            var img = y[x].nav.split("/");
            img = "File:" + img[img.length - 1];
            output += '<th class="' + x + 'a">' + wikilinkHtml("Template:" + x + "|" + x) + '</th><th><a href="' + wikilinkUrl(img) + '"><img src="' + y[x].nav + '"/></a></th>';
            if (i == limit - 1) output += "</tr>";
            i++;
            i %= limit;
          }
        }
        if (i !== 0) output += "</tr>";
        output += '</table>';
      }
      elem.innerHTML = output;
    }
  })();
}

/*Auto-gen release functions*/
if (wgArticleId == "187804" && article) {
  (function() {
    importJsPage("User:JBed/autogen.js");
  })();
}

if (wgArticleId == "172825" && article) {
  (function() {
    importJsPage("User:JBed/test.js");
  })();
}

if (wgArticleId == "186466" && article) {
  (function() {

    createCssRules(".functions tr:nth-child(n+2) td:first-child{font-family:monospace; word-break:break-all} .functions{font-size:10px;text-align:left}");

    setInterval(function () {
      var vars = document.getElementById("variables").getElementsByTagName("tbody")[0].getElementsByTagName("tr");

      for (var i = 1; i < vars.length; i++) {
        var x = vars[i].getElementsByTagName("td");
        var varValue = getVariable(x[0].innerHTML);
        x[1].innerHTML = ("" + varValue).replaceAll(",", "; ");
      }
    }, 5000);
  })();
}

if (wgCanonicalNamespace == "Template") {
  addOnloadHook(function () {
    addLinkToNav();
  });
}

function addLinkToNav() {
  var z = [rel, ser];
  for (var i = 0; i < z.length; i++) {
    var y = z[i];
    for (var x in y) {
      var match = document.getElementById(x + "-nav");
      if (match && wgPageName.toLowerCase() == "template:" + x.toLowerCase()) {
        if (!y[x].nav) return;
        var newE = document.createElement("div");
        var img = y[x].nav.split("/");
        img = "File:" + img[img.length - 1];
        newE.innerHTML = '<h2>Navbox image</h2> <p><a href="' + wikilinkUrl(img) + '"><img src="' + y[x].nav + '"/> ' + img + '</a></p>';
        var page = document.getElementById("mw-content-text");
        page.appendChild(newE);
        return;
      }
    }
  }
}

if (wgCanonicalSpecialPageName == "Upload" || wgCanonicalSpecialPageName == "MultipleUpload") {
  function managelicenses() {
    createCssRules("#UploadPhotosWrapper, .blackout{display:none !important}");
    UploadPhotos.showDialog();

    var licenses = document.getElementById("wpLicense");
    for (var i = 0; i < licenses.children.length; i++) {
      if (licenses.children[i].getAttribute("value")) {
        licenses.children[i].setAttribute("data-value", licenses.children[i].getAttribute("value"));
        licenses.children[i].title = "{{" + licenses.children[i].getAttribute("value").split("#")[0] + "}}";
      }
    }

    var lBlock = document.getElementById("mw-htmlform-description").getElementsByClassName("mw-htmlform-field-Licenses")[0];
    var lpBlock = document.createElementFromHTML('<tr class="mw-htmlform-field-Parameters" style="display:none">');
    insertAfter(lpBlock, lBlock);
    var lpLabel = document.createElementFromHTML('<td class="mw-label"><label for="wpParameters">Parameters</label></td>');
    lpBlock.appendChild(lpLabel);
    var lpInput = document.createElementFromHTML('<td class="mw-input">');
    var textboxes = ["Release", "Publication"];
    lpBlock.appendChild(lpInput);
    var lpHtml = '<table>';
    for (var i = 0; i < textboxes.length; i++) {
      lpHtml += '<tr id="tr' + textboxes[i] + '"><td><label for="wp' + textboxes[i] + '">' + textboxes[i] + '</label></td><td><input type="text" id="wp' + textboxes[i] + '" /></td></tr>';
    }
    lpInput.innerHTML = lpHtml + '</table>';

    function updateLicense() {
      var licenses = document.getElementById("wpLicense");
      for (var j = 0; j < licenses.children.length; j++) {
        if (!licenses.children[j].getAttribute("value")) continue;
        var x = licenses.children[j].getAttribute("data-value");
        var split = x.split("#");
        var value = split[0];
        if (split.length > 1) {
          var parameters = split[1].split(";");
          var output = value;
          for (var k = 0; k < parameters.length; k++) {
            var templateparameter = parameters[k].split("=");
            var textboxname = templateparameter[0];
            if (templateparameter.length > 1) {
              textboxname = templateparameter[1];
              templateparameter = templateparameter[0] + "=";
            } else {
              templateparameter = "";
            }
            output += "|" + templateparameter + document.getElementById("wp" + textboxname).value;
          }
          for (;;) {
            if (output[output.length - 1] == "|") output = output.slice(0, -1);
            else break;
          }
          licenses.children[j].setAttribute("value", output);
        }
      }
      UploadPhotos.wpLicense.change();
    }


    for (var i = 0; i < textboxes.length; i++) {
      var element = document.getElementById("wp" + textboxes[i]);
      element.addEventListener("input", updateLicense);
    }

    licenses.addEventListener("change", function () {
      var count = 0;
      for (var i = 0; i < textboxes.length; i++) {
        if (licenses.selectedOptions[0].getAttribute("data-value").contains(textboxes[i])) {
          document.getElementById("tr" + textboxes[i]).style.display = "";
          count++;
        } else document.getElementById("tr" + textboxes[i]).style.display = "none";
      }
      if (count === 0) lpBlock.style.display = "none";
      else lpBlock.style.display = "";
      updateLicense();
    });

    addOnloadHook(function () {
      var _releases = document.getElementById("wp" + textboxes[0]);
      _releases.setAttribute("autocomplete", "off");
      var jQueryImport = importJsUrl("https://images.wikia.nocookie.net/__load/-/debug%3Dfalse%26lang%3Den%26skin%3Doasis%26version%3D1400850427-20140523T114500Z/jquery.autocomplete");
      jQueryImport.addEventListener("load", function () {
        var gamelist = [];
        rel.forEach(function (a) {
          gamelist.push(a.full);
        });
        var autoComp = $(_releases).autocomplete({
          lookup: gamelist,
          minChars: 3,
          width: "200px",
          maxSuggestions: 6,
          onSelect: function () {
            updateLicense();
            autoComp.click();
          },
          deferRequestBy: 300
        });
      });
    });

  }
  addOnloadHook(managelicenses);
}

if (document.getElementById("crimsoncodex")) {
  function crimsonCodex() {
    var x = article.getElementsByClassName("crimsoncodex");
    var targid = "codexentry";
    for (var i = 0; i < x.length; i++) {
      var num = i + 1;
      x[i].id = targid + num;
      var navigation = x[i].getElementsByClassName("navigation")[0];
      var navSwitch = navigation.getElementsByClassName("switch")[0];
      var navPages = navigation.getElementsByClassName("pages")[0];
      var navClothes = navigation.getElementsByClassName("clothes")[0];
      var navs = 3;
      if (x.length == 1) {
        navSwitch.style.display = "none";
        navs--;
      } else {
        var prev = navSwitch.getElementsByClassName("prev")[0];
        var next = navSwitch.getElementsByClassName("next")[0];
        prev.innerHTML = '<a href="#' + targid + (i === 0 ? x.length : num - 1) + '">' + prev.innerHTML + '</a>';
        next.innerHTML = '<a href="#' + targid + (i == x.length - 1 ? 1 : num + 1) + '">' + next.innerHTML + '</a>';
      }
      var pics = x[i].getElementsByClassName("picimg");
      if (pics.length < 2) {
        navClothes.style.display = "none";
        navs--;
      } else {
        var pn = [navClothes.getElementsByClassName("prev")[0],
        navClothes.getElementsByClassName("next")[0]];
        for (var j = 0; j < pn.length; j++) {
          pn[j].innerHTML = '<a href="##">' + pn[j].innerHTML + '</a>';
          pn[j].addEventListener("click", function (a) {
            var pics = this.parentNode.parentNode.parentNode.getElementsByClassName("picimg");
            var select = 0;
            for (var q = 0; q < pics.length; q++) if (pics[q].hasClass("active")) select = q;
            pics[select].removeClass("active");
            pics[(select + pics.length + (a === 0 ? -1 : 1)) % pics.length].addClass("active");
          }.bind(pn[j], j));
        }
      }
      for (var j = 0; j < pics.length; j++) {
        loadHiddenChildImages(pics[j]);
        pics[j].addClass("active");
        pics[j].style.top = ((x[i].clientHeight - pics[j].clientHeight) / 2) + "px";
        pics[j].removeClass("active");
      }
      if (pics.length !== 0) pics[0].addClass("active");

      var pages = x[i].getElementsByClassName("page");
      if (pages.length < 2) {
        navPages.style.display = "none";
        navs--;
      } else {
        var pn = [navPages.getElementsByClassName("prev")[0],
        navPages.getElementsByClassName("next")[0]];
        for (var j = 0; j < pn.length; j++) {
          pn[j].innerHTML = '<a href="##">' + pn[j].innerHTML + '</a>';
          pn[j].addEventListener("click", function (a) {
            var textCont = this.parentNode.parentNode.parentNode.getElementsByClassName("text")[0];
            textCont.scrollTop = 0;
            var pages = textCont.getElementsByClassName("page");
            var select = 0;
            for (var q = 0; q < pages.length; q++) if (pages[q].hasClass("active")) select = q;
            pages[select].removeClass("active");
            pages[(select + pages.length + (a === 0 ? -1 : 1)) % pages.length].addClass("active");
          }.bind(pn[j], j));
        }
      }
      for (var j = 1; j < pages.length; j++) pages[j].removeClass("active");

      if (navs !== 0) navigation.style.display = "";
    }
  }
  crimsonCodex();
}

(function () {
  var x = document.getElementById("pseudoimage");
  if (!x) return;
  x = article.getElementsByClassName("pseudoimage");
  x.forEach(function (a) {
    a.style.width = a.clientWidth + "px";
    var b = a.getElementsByClassName("image-caption");
    if (b.length > 0) b[0].style.display = "";
  });
})();

if (wgCanonicalNamespace == "Etymology" && article && wgAction == "view" && wgArticleId !== 0)(function addWlhList() {
  var url = wgServer + wgScriptPath + '/api.php?action=query&list=embeddedin&einamespace=0&eilimit=500&eititle=' + encodeURIComponent(wgPageName) + '&format=json';
  var ajax = $.getJSON(url, function (data) {
    var pageList = data.query.embeddedin;
    var pageArray = [];
    for (var x in pageList) pageArray.push(pageList[x].title);
    pageArray.sort();
    var id = "etymologyPageList";
    var divEl = document.getElementById("etymologyPageList") || document.createElementFromHTML('<div id="' + id + '">');
    if (pageArray.length !== 0) {
      var divH2 = document.createElement("h2");
      divH2.innerHTML = "Pages used on";
      divEl.appendChild(divH2);
      var divUl = document.createElement("ul");
      divEl.appendChild(divUl);
      for (var i = 0; i < pageArray.length; i++) {
        var title = pageArray[i];
        var ulLi = document.createElement("li");
        ulLi.innerHTML = wikilinkHtml(title);
        divUl.appendChild(ulLi);
      }
    }
    var divDiv = document.createElementFromHTML('<div class="full-width" style="border: 1px solid grey; border-width: 1px 0; text-align: center; font-style: italic">');
    divDiv.innerHTML = '<div style="float:left; width:40px"><a class="image image-thumbnail" href="https://images.wikia.nocookie.net/__cb20100527172148/finalfantasy/images/e/e6/All_Creation.png"><img width="27" height="40" data-image-name="All Creation.png" data-image-key="All_Creation.png" alt="All Creation" src="https://images.wikia.nocookie.net/__cb20100527172148/finalfantasy/images/thumb/e/e6/All_Creation.png/27px-All_Creation.png"></a></div><div style="float:right; width:40px"><a class="image image-thumbnail" href="https://images.wikia.nocookie.net/__cb20100528175206/finalfantasy/images/6/62/Cosmo_Memory.png"><img width="30" height="40" data-image-name="Cosmo Memory.png" data-image-key="Cosmo_Memory.png" alt="Cosmo Memory" src="https://images.wikia.nocookie.net/__cb20100528175206/finalfantasy/images/thumb/6/62/Cosmo_Memory.png/30px-Cosmo_Memory.png"></a></div>This is an ' + wikilinkHtml("Project:Etymology|etymology page") + ': a page detailing the origins of terminology used in the series in regards to real world culture and history.<div style="clear:both"></div><div>';
    divEl.appendChild(divDiv);
    var content = document.getElementById("mw-content-text");
    content.appendChild(divEl);
  });
})();