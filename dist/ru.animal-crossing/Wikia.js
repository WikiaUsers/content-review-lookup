// если вы ищете теги профиля, они на
//          MediaWiki:ProfileTags
// сэкономьте пять минут в следующий раз

window.InactiveUsers = { months: 4 };

window.SpoilerAlert = {
    question: 'Эта страница содержит спойлеры. Вы уверены, что хотите её прочитать?',
    yes: 'Да',
    no: 'Нет',
    isSpoiler: function () {
        return -1 != $.inArray('Spoiler', wgCategories);
    }
};

importArticles({
    type: "script",
    articles: [
        'w:c:fang:AJAX Auto-refresh/code.js',
    ]
});

// Открывает чат в новой вкладке вместо нового окна

$("div.chat-join button").remove();
$("div.chat-join").append('<a href="https://animal-crossing.fandom.com/ru/wiki/Служебная:Chat" target="_blank"><button type="button">Join the Chat</button></a>');
$("#WikiaRail > section.ChatModule.module > div > div.chat-join > button").remove();
$("#WikiaRail > section.ChatModule.module > div > div.chat-join").append('<a href="https://animal-crossing.fandom.com/ru/wiki/Служебная:Chat" target="_blank"><button type="button" data-msg-id="chat-join-the-chat">Join the Chat</button></a>');

/*
 
КАЛЬКУЛЯТОР СОБЫТИЙ ANIMAL CROSSING NEW LEAF
АВТОРЫ: DRAGONFREE97, INCONGRUENCE, COOLITE INC
 
*/
 
/**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-05-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * @website: http://www.datejs.com/
 */
Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|aft(er)?|from|hence)/i,subtract:/^(\-|bef(ore)?|ago)/i,yesterday:/^yes(terday)?/i,today:/^t(od(ay)?)?/i,tomorrow:/^tom(orrow)?/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^mn|min(ute)?s?/i,hour:/^h(our)?s?/i,week:/^w(eek)?s?/i,month:/^m(onth)?s?/i,day:/^d(ay)?s?/i,year:/^y(ear)?s?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a(?!u|p)|p)/i},timezones:[{name:"UTC",offset:"-000"},{name:"GMT",offset:"-000"},{name:"EST",offset:"-0500"},{name:"EDT",offset:"-0400"},{name:"CST",offset:"-0600"},{name:"CDT",offset:"-0500"},{name:"MST",offset:"-0700"},{name:"MDT",offset:"-0600"},{name:"PST",offset:"-0800"},{name:"PDT",offset:"-0700"}]};
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,p=function(s,l){if(!l){l=2;}
return("000"+s).slice(l*-1);};$P.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};$P.setTimeToNow=function(){var n=new Date();this.setHours(n.getHours());this.setMinutes(n.getMinutes());this.setSeconds(n.getSeconds());this.setMilliseconds(n.getMilliseconds());return this;};$D.today=function(){return new Date().clearTime();};$D.compare=function(date1,date2){if(isNaN(date1)||isNaN(date2)){throw new Error(date1+" - "+date2);}else if(date1 instanceof Date&&date2 instanceof Date){return(date1<date2)?-1:(date1>date2)?1:0;}else{throw new TypeError(date1+" - "+date2);}};$D.equals=function(date1,date2){return(date1.compareTo(date2)===0);};$D.getDayNumberFromName=function(name){var n=$C.dayNames,m=$C.abbreviatedDayNames,o=$C.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s||o[i].toLowerCase()==s){return i;}}
return-1;};$D.getMonthNumberFromName=function(name){var n=$C.monthNames,m=$C.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};$D.isLeapYear=function(year){return((year%4===0&&year%100!==0)||year%400===0);};$D.getDaysInMonth=function(year,month){return[31,($D.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};$D.getTimezoneAbbreviation=function(offset){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].offset===offset){return z[i].name;}}
return null;};$D.getTimezoneOffset=function(name){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].name===name.toUpperCase()){return z[i].offset;}}
return null;};$P.clone=function(){return new Date(this.getTime());};$P.compareTo=function(date){return Date.compare(this,date);};$P.equals=function(date){return Date.equals(this,date||new Date());};$P.between=function(start,end){return this.getTime()>=start.getTime()&&this.getTime()<=end.getTime();};$P.isAfter=function(date){return this.compareTo(date||new Date())===1;};$P.isBefore=function(date){return(this.compareTo(date||new Date())===-1);};$P.isToday=function(){return this.isSameDay(new Date());};$P.isSameDay=function(date){return this.clone().clearTime().equals(date.clone().clearTime());};$P.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};$P.addSeconds=function(value){return this.addMilliseconds(value*1000);};$P.addMinutes=function(value){return this.addMilliseconds(value*60000);};$P.addHours=function(value){return this.addMilliseconds(value*3600000);};$P.addDays=function(value){this.setDate(this.getDate()+value);return this;};$P.addWeeks=function(value){return this.addDays(value*7);};$P.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,$D.getDaysInMonth(this.getFullYear(),this.getMonth())));return this;};$P.addYears=function(value){return this.addMonths(value*12);};$P.add=function(config){if(typeof config=="number"){this._orient=config;return this;}
var x=config;if(x.milliseconds){this.addMilliseconds(x.milliseconds);}
if(x.seconds){this.addSeconds(x.seconds);}
if(x.minutes){this.addMinutes(x.minutes);}
if(x.hours){this.addHours(x.hours);}
if(x.weeks){this.addWeeks(x.weeks);}
if(x.months){this.addMonths(x.months);}
if(x.years){this.addYears(x.years);}
if(x.days){this.addDays(x.days);}
return this;};var $y,$m,$d;$P.getWeek=function(){var a,b,c,d,e,f,g,n,s,w;$y=(!$y)?this.getFullYear():$y;$m=(!$m)?this.getMonth()+1:$m;$d=(!$d)?this.getDate():$d;if($m<=2){a=$y-1;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=0;f=$d-1+(31*($m-1));}else{a=$y;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=s+1;f=$d+((153*($m-3)+2)/5)+58+s;}
g=(a+b)%7;d=(f+g-e)%7;n=(f+3-d)|0;if(n<0){w=53-((g-s)/5|0);}else if(n>364+s){w=1;}else{w=(n/7|0)+1;}
$y=$m=$d=null;return w;};$P.getISOWeek=function(){$y=this.getUTCFullYear();$m=this.getUTCMonth()+1;$d=this.getUTCDate();return p(this.getWeek());};$P.setWeek=function(n){return this.moveToDayOfWeek(1).addWeeks(n-this.getWeek());};$D._validate=function(n,min,max,name){if(typeof n=="undefined"){return false;}else if(typeof n!="number"){throw new TypeError(n+" is not a Number.");}else if(n<min||n>max){throw new RangeError(n+" is not a valid value for "+name+".");}
return true;};$D.validateMillisecond=function(value){return $D._validate(value,0,999,"millisecond");};$D.validateSecond=function(value){return $D._validate(value,0,59,"second");};$D.validateMinute=function(value){return $D._validate(value,0,59,"minute");};$D.validateHour=function(value){return $D._validate(value,0,23,"hour");};$D.validateDay=function(value,year,month){return $D._validate(value,1,$D.getDaysInMonth(year,month),"day");};$D.validateMonth=function(value){return $D._validate(value,0,11,"month");};$D.validateYear=function(value){return $D._validate(value,0,9999,"year");};$P.set=function(config){if($D.validateMillisecond(config.millisecond)){this.addMilliseconds(config.millisecond-this.getMilliseconds());}
if($D.validateSecond(config.second)){this.addSeconds(config.second-this.getSeconds());}
if($D.validateMinute(config.minute)){this.addMinutes(config.minute-this.getMinutes());}
if($D.validateHour(config.hour)){this.addHours(config.hour-this.getHours());}
if($D.validateMonth(config.month)){this.addMonths(config.month-this.getMonth());}
if($D.validateYear(config.year)){this.addYears(config.year-this.getFullYear());}
if($D.validateDay(config.day,this.getFullYear(),this.getMonth())){this.addDays(config.day-this.getDate());}
if(config.timezone){this.setTimezone(config.timezone);}
if(config.timezoneOffset){this.setTimezoneOffset(config.timezoneOffset);}
if(config.week&&$D._validate(config.week,0,53,"week")){this.setWeek(config.week);}
return this;};$P.moveToFirstDayOfMonth=function(){return this.set({day:1});};$P.moveToLastDayOfMonth=function(){return this.set({day:$D.getDaysInMonth(this.getFullYear(),this.getMonth())});};$P.moveToNthOccurrence=function(dayOfWeek,occurrence){var shift=0;if(occurrence>0){shift=occurrence-1;}
else if(occurrence===-1){this.moveToLastDayOfMonth();if(this.getDay()!==dayOfWeek){this.moveToDayOfWeek(dayOfWeek,-1);}
return this;}
return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek,+1).addWeeks(shift);};$P.moveToDayOfWeek=function(dayOfWeek,orient){var diff=(dayOfWeek-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};$P.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};$P.getOrdinalNumber=function(){return Math.ceil((this.clone().clearTime()-new Date(this.getFullYear(),0,1))/86400000)+1;};$P.getTimezone=function(){return $D.getTimezoneAbbreviation(this.getUTCOffset());};$P.setTimezoneOffset=function(offset){var here=this.getTimezoneOffset(),there=Number(offset)*-6/10;return this.addMinutes(there-here);};$P.setTimezone=function(offset){return this.setTimezoneOffset($D.getTimezoneOffset(offset));};$P.hasDaylightSavingTime=function(){return(Date.today().set({month:0,day:1}).getTimezoneOffset()!==Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.isDaylightSavingTime=function(){return(this.hasDaylightSavingTime()&&new Date().getTimezoneOffset()===Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r.charAt(0)+r.substr(2);}else{r=(n+10000).toString();return"+"+r.substr(1);}};$P.getElapsed=function(date){return(date||new Date())-this;};if(!$P.toISOString){$P.toISOString=function(){function f(n){return n<10?'0'+n:n;}
return'"'+this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z"';};}
$P._toString=$P.toString;$P.toString=function(format){var x=this;if(format&&format.length==1){var c=$C.formatPatterns;x.t=x.toString;switch(format){case"d":return x.t(c.shortDate);case"D":return x.t(c.longDate);case"F":return x.t(c.fullDateTime);case"m":return x.t(c.monthDay);case"r":return x.t(c.rfc1123);case"s":return x.t(c.sortableDateTime);case"t":return x.t(c.shortTime);case"T":return x.t(c.longTime);case"u":return x.t(c.universalSortableDateTime);case"y":return x.t(c.yearMonth);}}
var ord=function(n){switch(n*1){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};return format?format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g,function(m){if(m.charAt(0)==="\\"){return m.replace("\\","");}
x.h=x.getHours;switch(m){case"hh":return p(x.h()<13?(x.h()===0?12:x.h()):(x.h()-12));case"h":return x.h()<13?(x.h()===0?12:x.h()):(x.h()-12);case"HH":return p(x.h());case"H":return x.h();case"mm":return p(x.getMinutes());case"m":return x.getMinutes();case"ss":return p(x.getSeconds());case"s":return x.getSeconds();case"yyyy":return p(x.getFullYear(),4);case"yy":return p(x.getFullYear());case"dddd":return $C.dayNames[x.getDay()];case"ddd":return $C.abbreviatedDayNames[x.getDay()];case"dd":return p(x.getDate());case"d":return x.getDate();case"MMMM":return $C.monthNames[x.getMonth()];case"MMM":return $C.abbreviatedMonthNames[x.getMonth()];case"MM":return p((x.getMonth()+1));case"M":return x.getMonth()+1;case"t":return x.h()<12?$C.amDesignator.substring(0,1):$C.pmDesignator.substring(0,1);case"tt":return x.h()<12?$C.amDesignator:$C.pmDesignator;case"S":return ord(x.getDate());default:return m;}}):this._toString();};}());
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,$N=Number.prototype;$P._orient=+1;$P._nth=null;$P._is=false;$P._same=false;$P._isSecond=false;$N._dateElement="day";$P.next=function(){this._orient=+1;return this;};$D.next=function(){return $D.today().next();};$P.last=$P.prev=$P.previous=function(){this._orient=-1;return this;};$D.last=$D.prev=$D.previous=function(){return $D.today().last();};$P.is=function(){this._is=true;return this;};$P.same=function(){this._same=true;this._isSecond=false;return this;};$P.today=function(){return this.same().day();};$P.weekday=function(){if(this._is){this._is=false;return(!this.is().sat()&&!this.is().sun());}
return false;};$P.at=function(time){return(typeof time==="string")?$D.parse(this.toString("d")+" "+time):this.set(time);};$N.fromNow=$N.after=function(date){var c={};c[this._dateElement]=this;return((!date)?new Date():date.clone()).add(c);};$N.ago=$N.before=function(date){var c={};c[this._dateElement]=this*-1;return((!date)?new Date():date.clone()).add(c);};var dx=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),mx=("january february march april may june july august september october november december").split(/\s/),px=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),pxf=("Milliseconds Seconds Minutes Hours Date Week Month FullYear").split(/\s/),nth=("final first second third fourth fifth").split(/\s/),de;$P.toObject=function(){var o={};for(var i=0;i<px.length;i++){o[px[i].toLowerCase()]=this["get"+pxf[i]]();}
return o;};$D.fromObject=function(config){config.week=null;return Date.today().set(config);};var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;}
if(this._nth!==null){if(this._isSecond){this.addSeconds(this._orient*-1);}
this._isSecond=false;var ntemp=this._nth;this._nth=null;var temp=this.clone().moveToLastDayOfMonth();this.moveToNthOccurrence(n,ntemp);
return this;}
return this.moveToDayOfWeek(n,this._orient);};};var sdf=function(n){return function(){var t=$D.today(),shift=n-t.getDay();if(n===0&&$C.firstDayOfWeek===1&&t.getDay()!==0){shift=shift+7;}
return t.addDays(shift);};};for(var i=0;i<dx.length;i++){$D[dx[i].toUpperCase()]=$D[dx[i].toUpperCase().substring(0,3)]=i;$D[dx[i]]=$D[dx[i].substring(0,3)]=sdf(i);$P[dx[i]]=$P[dx[i].substring(0,3)]=df(i);}
var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;}
return this.moveToMonth(n,this._orient);};};var smf=function(n){return function(){return $D.today().set({month:n,day:1});};};for(var j=0;j<mx.length;j++){$D[mx[j].toUpperCase()]=$D[mx[j].toUpperCase().substring(0,3)]=j;$D[mx[j]]=$D[mx[j].substring(0,3)]=smf(j);$P[mx[j]]=$P[mx[j].substring(0,3)]=mf(j);}
var ef=function(j){return function(){if(this._isSecond){this._isSecond=false;return this;}
if(this._same){this._same=this._is=false;var o1=this.toObject(),o2=(arguments[0]||new Date()).toObject(),v="",k=j.toLowerCase();for(var m=(px.length-1);m>-1;m--){v=px[m].toLowerCase();if(o1[v]!=o2[v]){return false;}
if(k==v){break;}}
return true;}
if(j.substring(j.length-1)!="s"){j+="s";}
return this["add"+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$P[de]=$P[de+"s"]=ef(px[k]);$N[de]=$N[de+"s"]=nf(de);}
$P._ss=ef("Second");var nthfn=function(n){return function(dayOfWeek){if(this._same){return this._ss(arguments[0]);}
if(dayOfWeek||dayOfWeek===0){return this.moveToNthOccurrence(dayOfWeek,n);}
this._nth=n;if(n===2&&(dayOfWeek===undefined||dayOfWeek===null)){this._isSecond=true;return this.addSeconds(this._orient);}
return this;};};for(var l=0;l<nth.length;l++){$P[nth[l]]=(l===0)?nthfn(-1):nthfn(l);}}());
(function(){Date.Parsing={Exception:function(s){this.message="Parse error at '"+s.substring(0,10)+" ...'";}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp("^\s*"+s+"\s*"))(s);};},stoken:function(s){return _.rtoken(new RegExp("^"+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;}
break;}
return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];}
rx.push(r[0]);s=r[1];}
return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];}
return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];}
throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));}
return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;}
if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){r=null;}
if(r){return r;}}
throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);}
rx.push(r[0]);s=r[1];}
return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;if(px.length==1){return px[0];}
return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;}
rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;}
s=q[1];}
if(!r){throw new $P.Exception(s);}
if(q){throw new $P.Exception(q[1]);}
if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}}
return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;}
rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;}
if(!last&&q[1].length===0){last=true;}
if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}}
p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}}
if(rx[1].length<best[1].length){best=rx;}
if(best[1].length===0){break;}}
if(best[0].length===0){return best;}
if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);}
best[1]=q[1];}
return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);}
return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];}
if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx="optional not ignore cache".split(/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);}
var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx="each any all".split(/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo;var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}}
return rx;};$D.Grammar={};$D.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(/[^\d\+\-]/g,"");if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(/\d+/)[0]);};},month:function(s){return function(){this.month=(s.length==3)?"jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s)/4:Number(s)-1;};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<$C.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}}
var now=new Date();if((this.hour||this.minute)&&(!this.month&&!this.year&&!this.day)){this.day=now.getDate();}
if(!this.year){this.year=now.getFullYear();}
if(!this.month&&this.month!==0){this.month=now.getMonth();}
if(!this.day){this.day=1;}
if(!this.hour){this.hour=0;}
if(!this.minute){this.minute=0;}
if(!this.second){this.second=0;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.day>$D.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.");}
var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});}
return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;}
for(var i=0;i<x.length;i++){if(typeof x[i]=="function"){x[i].call(this);}}
var today=$D.today();if(this.now&&!this.unit&&!this.operator){return new Date();}else if(this.now){today=new Date();}
var expression=!!(this.days&&this.days!==null||this.orient||this.operator);var gap,mod,orient;orient=((this.orient=="past"||this.operator=="subtract")?-1:1);if(!this.now&&"hour minute second".indexOf(this.unit)!=-1){today.setTimeToNow();}
if(this.month||this.month===0){if("year day hour minute second".indexOf(this.unit)!=-1){this.value=this.month+1;this.month=null;expression=true;}}
if(!expression&&this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(!this.month){this.month=temp.getMonth();}
this.year=temp.getFullYear();}
if(expression&&this.weekday&&this.unit!="month"){this.unit="day";gap=($D.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);}
if(this.month&&this.unit=="day"&&this.operator){this.value=(this.month+1);this.month=null;}
if(this.value!=null&&this.month!=null&&this.year!=null){this.day=this.value*1;}
if(this.month&&!this.day&&this.value){today.set({day:this.value*1});if(!expression){this.day=this.value*1;}}
if(!this.month&&this.value&&this.unit=="month"&&!this.now){this.month=this.value;expression=true;}
if(expression&&(this.month||this.month===0)&&this.unit!="year"){this.unit="month";gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;}
if(!this.unit){this.unit="day";}
if(!this.value&&this.operator&&this.operator!==null&&this[this.unit+"s"]&&this[this.unit+"s"]!==null){this[this.unit+"s"]=this[this.unit+"s"]+((this.operator=="add")?1:-1)+(this.value||0)*orient;}else if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1;}
this[this.unit+"s"]=this.value*orient;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(temp.getMonth()!==today.getMonth()){this.month=temp.getMonth();}}
if((this.month||this.month===0)&&!this.day){this.day=1;}
if(!this.orient&&!this.operator&&this.unit=="week"&&this.value&&!this.day&&!this.month){return Date.today().setWeek(this.value);}
if(expression&&this.timezone&&this.day&&this.days){this.day=this.days;}
return(expression)?today.add(this):today.set(this);}};var _=$D.Parsing.Operators,g=$D.Grammar,t=$D.Translator,_fn;g.datePartDelimiter=_.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(":");g.whiteSpace=_.rtoken(/^\s*/);g.generalDelimiter=_.rtoken(/^(([\s\,]|at|@|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=$C.regexPatterns;var kx=keys.split(/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));}
fn=_C[keys]=_.any.apply(null,px);}
return fn;};g.ctoken2=function(key){return _.rtoken($C.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.m,g.s],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2("shortMeridian"),t.meridian));g.tt=_.cache(_.process(g.ctoken2("longMeridian"),t.meridian));g.z=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zz=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2("timezone"),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken("T"))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),t.month));g.y=_.cache(_.process(_.rtoken(/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2("timeContext")));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken("past future"),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken("add subtract"),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken("yesterday tomorrow today now"),t.rday);g.unit=_.process(g.ctoken("second minute hour day week month year"),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(/\D/g,"");};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[$C.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw $D.Parsing.Exception(fmt);}}),_.process(_.rtoken(/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));}
return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"","yyyy-MM-ddTHH:mm:ssZ","yyyy-MM-ddTHH:mm:ssz","yyyy-MM-ddTHH:mm:ss","yyyy-MM-ddTHH:mmZ","yyyy-MM-ddTHH:mmz","yyyy-MM-ddTHH:mm","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","MMddyyyy","ddMMyyyy","Mddyyyy","ddMyyyy","Mdyyyy","dMyyyy","yyyy","Mdyy","dMyy","d"]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){}
return g._start.call({},s);};$D._parse=$D.parse;$D.parse=function(s){var r=null;if(!s){return null;}
if(s instanceof Date){return s;}
try{r=$D.Grammar.start.call({},s.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1"));}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};$D.getParseFunction=function(fx){var fn=$D.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};};$D.parseExact=function(s,fx){return $D.getParseFunction(fx)(s);};}());
 
/*** WHY.JS ***/
 
 
// Here's our list we'll use to store all of our events as we define them.
var calendarOfEvents = [];
var checkedEvents = [];
 
// These functions will add our event to the calendarOfEvents.
 
function addACEvent(name, month, date, japan, imageUrl, buttonLinkText) {
	/* Creates a new object for this event */
    this.name = name;
    this.month = month;
    this.date = date;
	this.japan = japan;
	this.imageUrl = imageUrl;
	this.buttonLinkText = buttonLinkText;
}
 
function pEvent(name, month, date, japan, imageUrl, buttonLinkText) {
	/* Creates and adds a new event to the list of events */
	i = new addACEvent(name, month, date, japan, imageUrl, buttonLinkText);
	calendarOfEvents.push(i);
}
 
// These will add all the events which don't change their date throughout the year.
 
pEvent("New Year's Day",1,1,false,"https://vignette.wikia.nocookie.net/animalcrossing/images/d/d9/Isabelle.png/revision/latest?cb=20140721212232","New Year's Day");
pEvent("Groundhog Day",2,2,false,"https://vignette.wikia.nocookie.net/animalcrossing/images/5/5c/Resetti.png/revision/latest?cb=20140731195321","Groundhog Day");
pEvent("Valentine's Day",2,14,false,"https://vignette.wikia.nocookie.net/animalcrossing/images/9/9a/Brewster_-_Animal_Crossing_New_Leaf.png/revision/latest?cb=20130808204811","Valentine's Day");
pEvent("Shamrock Day",3,17,false,"https://vignette.wikia.nocookie.net/animalcrossing/images/d/d9/Isabelle.png/revision/latest?cb=20140721212232","Shamrock Day");
pEvent("April Fool's Day",4,1,false,"https://vignette.wikia.nocookie.net/animalcrossing/images/9/91/BlancaNL.png/revision/latest/scale-to-width/150?cb=20130729111523","April Fool's");
pEvent("Nature Day",4,22,false,"https://vignette.wikia.nocookie.net/animalcrossing/images/a/ab/PlayerMale2.png/revision/latest/scale-to-width/121?cb=20130608225205","Shamrock Day");
pEvent("Summer Solstice",6,21,false,"https://vignette.wikia.nocookie.net/animalcrossing/images/c/c5/PlayerFemale2.png/revision/latest/scale-to-width/117?cb=20130608225157","Solstice");
pEvent("Weeding Day",9,3,true,"https://vignette.wikia.nocookie.net/animalcrossing/images/3/3c/Leif.png/revision/latest/scale-to-width/200?cb=20140721120907","Weeding Day");
pEvent("Halloween",10,31,false,"https://vignette.wikia.nocookie.net/animalcrossing/images/7/75/Acnl-jack.png/revision/latest/scale-to-width/200?cb=20130707122138","Halloween");
pEvent("Mushrooming Season",11,1,false,"https://vignette.wikia.nocookie.net/animalcrossing/images/7/74/ACNL_Girl.png/revision/latest/scale-to-width/110?cb=20140709201850&format=webp","Mushrooms");
pEvent("Winter Solstice",12,21,false,"https://vignette.wikia.nocookie.net/animalcrossing/images/6/66/PlayerWinter.png/revision/latest/scale-to-width/93?cb=20130608224928","Solstice");
pEvent("Toy Day",12,24,false,"https://vignette.wikia.nocookie.net/animalcrossing/images/6/60/JingleNLtransparent.png/revision/latest?cb=20150516160000","Toy Day");
pEvent("New Year's Eve",12,31,false,"https://vignette.wikia.nocookie.net/animalcrossing/images/d/d9/Isabelle.png/revision/latest?cb=20140721212232","New Year's Eve");
 
/* Tier 2 Events */
 
// Some events occur on different days throughout the year but in a way that's easy to work out. This will do that for us.
 
pEvent("Fishing Tourney",1,Date.january().third().sunday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/7/71/Acnl-chip.png/revision/latest/scale-to-width/200?cb=20130707115144","Fishing Tourney");
pEvent("Fishing Tourney",2,Date.february().second().saturday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/7/71/Acnl-chip.png/revision/latest/scale-to-width/200?cb=20130707115144","Fishing Tourney");
pEvent("Fishing Tourney",3,Date.march().third().saturday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/7/71/Acnl-chip.png/revision/latest/scale-to-width/200?cb=20130707115144","Fishing Tourney");
pEvent("Fishing Tourney",4,Date.april().second().saturday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/7/71/Acnl-chip.png/revision/latest/scale-to-width/200?cb=20130707115144","Fishing Tourney");
pEvent("Weeding Day",4,Date.april().last().friday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/3/3c/Leif.png/revision/latest/scale-to-width/200?cb=20140721120907","Weeding Day");
pEvent("Mother's Day",5,Date.may().second().sunday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/b/b8/PlayerFemale.png/revision/latest/scale-to-width/90?cb=20130608225001&format=webp","Mother's Day");
pEvent("Fishing Tourney",5,Date.may().third().saturday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/7/71/Acnl-chip.png/revision/latest/scale-to-width/200?cb=20130707115144","Fishing Tourney");
pEvent("Bug Off",6,Date.june().third().sunday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/3/3c/NatNL.png/revision/latest/scale-to-width/200?cb=20140817192507","Bug-Off");
pEvent("Bug Off",7,Date.july().third().saturday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/3/3c/NatNL.png/revision/latest/scale-to-width/200?cb=20140817192507","Bug-Off");
pEvent("Bug Off",8,Date.august().third().saturday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/3/3c/NatNL.png/revision/latest/scale-to-width/200?cb=20140817192507","Bug-Off");
pEvent("Fireworks Show",8,Date.august().first().sunday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/6/6b/ReddNL.png/revision/latest/scale-to-width/150?cb=20130729111333","Fireworks Show");
pEvent("Fireworks Show",8,Date.august().second().sunday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/6/6b/ReddNL.png/revision/latest/scale-to-width/150?cb=20130729111333","Fireworks Show");
pEvent("Fireworks Show",8,Date.august().third().sunday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/6/6b/ReddNL.png/revision/latest/scale-to-width/150?cb=20130729111333","Fireworks Show");
pEvent("Fireworks Show",8,Date.august().fourth().sunday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/6/6b/ReddNL.png/revision/latest/scale-to-width/150?cb=20130729111333","Fireworks Show");
if (Date.august().fourth().sunday() != Date.august().last().sunday()) {
    pEvent("Fireworks Show",8,Date.august().fifth().sunday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/6/6b/ReddNL.png/revision/latest/scale-to-width/150?cb=20130729111333","Fireworks Show");
}
pEvent("Labor Day",9,Date.september().first().monday(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/d/d9/Isabelle.png/revision/latest?cb=20140721212232","Labor Day");
pEvent("Bug Off",9,Date.september().third().saturday(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/3/3c/NatNL.png/revision/latest/scale-to-width/200?cb=20140817192507","Bug-Off");
pEvent("Explorer's Day",10,Date.october().second().monday(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/d/d9/Isabelle.png/revision/latest?cb=20140721212232","Explorer's Day");
pEvent("Fishing Tourney",10,Date.october().second().saturday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/7/71/Acnl-chip.png/revision/latest/scale-to-width/200?cb=20130707115144","Fishing Tourney");
pEvent("Harvest Festival",11,Date.november().fourth().thursday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/7/7e/FranklinACNL.png/revision/latest/scale-to-width-down/253?cb=20150516043035","Harvest Festival");
pEvent("Fishing Tourney",11,Date.november().third().saturday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/7/71/Acnl-chip.png/revision/latest/scale-to-width/200?cb=20130707115144","Fishing Tourney");
pEvent("Fishing Tourney",12,Date.december().second().saturday().getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/7/71/Acnl-chip.png/revision/latest/scale-to-width/200?cb=20130707115144","Fishing Tourney");
 
/* Tier 3 'hard' events */
 
// Some events are a lot harder to work out. These tend to be based on full moon cycles. The only events here are Easter, Festivalé and the Autumn Moon.
 
// EASTER CALCULATOR
 
function EasterDate(Y) {
    var C = Math.floor(Y/100);
    var N = Y - 19*Math.floor(Y/19);
    var K = Math.floor((C - 17)/25);
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40)/44);
    var D = L + 28 - 31*Math.floor(M/4);
 
    return D;
}
 
function EasterMonth(Y) {
    var C = Math.floor(Y/100);
    var N = Y - 19*Math.floor(Y/19);
    var K = Math.floor((C - 17)/25);
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40)/44);
    var D = L + 28 - 31*Math.floor(M/4);
 
    return M;
}
 
pEvent("Bunny Day",EasterMonth(new Date().getFullYear()),EasterDate(new Date().getFullYear()),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/e/e8/ZipperNL.png/revision/latest/scale-to-width/150?cb=20140405142619","Bunny Day");
 
// FESTIVALÉ CALCULATOR
 
easterDate = EasterDate(new Date().getFullYear());
easterMonth = EasterMonth(new Date().getFullYear());
easterYear = new Date().getFullYear();
 
d1 = easterMonth + '/' + easterDate + '/' + easterYear;
var date = new Date(d1);
date.setDate(date.getDate() - 49);
var dateMsg = (date.getMonth()+1)+'/'+ date.getDate() +'/'+date.getFullYear();
mardiGrasDate = Date.parse(dateMsg).tuesday().getDate();
mardiGrasMonth = Date.parse(dateMsg).tuesday().getMonth() + 1;
 
pEvent("Festivale",mardiGrasMonth,mardiGrasDate,false,"https://vignette.wikia.nocookie.net/animalcrossing/images/a/a4/200px-Pave_NL.png/revision/latest?cb=20140302142105","Festivale");
 
// AUTUMN MOON CALCULATOR
// thanks to Rose / Incongruence for her help with this section
 
// i didn't make this
// some clever dude did, there's a shorter one
// it's long as, but it's the most accurate one
 
function GetFrac(fr) {	return (fr - Math.floor(fr));}
 
function julday(year, month, day) {
	if (year < 0) { year ++; }
	var jy = parseInt(year);
	var jm = parseInt(month) +1;
	if (month <= 2) {jy--;	jm += 12;	} 
	var jul = Math.floor(365.25 *jy) + Math.floor(30.6001 * jm) + parseInt(day) + 1720995;
	if (day+31*(month+12*year) >= (15+31*(10+12*1582))) {
		ja = Math.floor(0.01 * jy);
		jul = jul + 2 - ja + Math.floor(0.25 * ja);
	}
	return jul;
}
 
function Phase(year,month,day) {
	var thisJD = julday(year,month,day);
	var degToRad = 3.14159265 / 180;
	var K0, T, T2, T3, J0, F0, M0, M1, B1, oldJ;
	K0 = Math.floor((year-1900)*12.3685);
	T = (year-1899.5) / 100;
	T2 = T*T; T3 = T*T*T;
	J0 = 2415020 + 29*K0;
	F0 = 0.0001178*T2 - 0.000000155*T3 + (0.75933 + 0.53058868*K0) - (0.000837*T + 0.000335*T2);
	M0 = 360*(GetFrac(K0*0.08084821133)) + 359.2242 - 0.0000333*T2 - 0.00000347*T3;
	M1 = 360*(GetFrac(K0*0.07171366128)) + 306.0253 + 0.0107306*T2 + 0.00001236*T3;
	B1 = 360*(GetFrac(K0*0.08519585128)) + 21.2964 - (0.0016528*T2) - (0.00000239*T3);
	var phase = 0;
	var jday = 0;
	while (jday < thisJD) {
		var F = F0 + 1.530588*phase;
		var M5 = (M0 + phase*29.10535608)*degToRad;
		var M6 = (M1 + phase*385.81691806)*degToRad;
		var B6 = (B1 + phase*390.67050646)*degToRad;
		F -= 0.4068*Math.sin(M6) + (0.1734 - 0.000393*T)*Math.sin(M5);
		F += 0.0161*Math.sin(2*M6) + 0.0104*Math.sin(2*B6);
		F -= 0.0074*Math.sin(M5 - M6) - 0.0051*Math.sin(M5 + M6);
		F += 0.0021*Math.sin(2*M5) + 0.0010*Math.sin(2*B6-M6);
		F += 0.5 / 1440; 
		oldJ=jday;
		jday = J0 + 28*phase + Math.floor(F); 
		phase++;
	}
	return (thisJD-oldJ)%30;
}
 
function getClosest(year) {
    var FULL_MOON = 15;
 
    var base = new Date("9/21/"+ year);
    var phase = Phase(base.getFullYear(), base.getMonth() + 1, base.getDate());
 
    while(phase != FULL_MOON) {
        if(phase > FULL_MOON)
            base.setDate(base.getDate() - 1);
        else
            base.setDate(base.getDate() + 1);
        phase = Phase(base.getFullYear(), base.getMonth() + 1, base.getDate());
    }
 
    return base;
}
 
pEvent("Autumn Moon",getClosest(new Date().getFullYear()).getMonth() + 1,getClosest(new Date().getFullYear()).getDate(),false,"https://vignette.wikia.nocookie.net/animalcrossing/images/d/d9/Isabelle.png/revision/latest/scale-to-width/175?cb=20140721212232","Autumn Moon");
 
/* 
 
Now that all of our events have been defined we can start to add them.
 
*/
 
// Generates a list element for us to add events to
 
$('#events-wrapper').append('<ul id="events-list"> </ul>');
 
// Addding the events to the list
 
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "<sup>st</sup>";
    }
    if (j == 2 && k != 12) {
        return i + "<sup>nd</sup>";
    }
    if (j == 3 && k != 13) {
        return i + "<sup>rd</sup>";
    }
    return i + "<sup>th</sup>";
}
 
// The above function changes a date into its ordinal form i.e. 1 -> 1st, 2 -> 2nd
// The below function is what we'll use to add an event to our list.

var currentSeason;
currentSeasonDate = new Date();
switch(currentSeasonDate.getMonth() + 1) {
    case 1:
        currentSeason = "winter";
        break;
    case 2:
        currentSeason = "winter";
        break;
    case 3:
        currentSeason = "spring";
        break;
    case 4:
        currentSeason = "spring";
        break;
    case 5:
        currentSeason = "spring";
        break;
    case 6:
        currentSeason = "summer";
        break;
    case 7:
        currentSeason = "summer";
        break;
    case 8:
        currentSeason = "summer";
        break;
    case 9:
        currentSeason = "autumn";
        break;
    case 10:
        currentSeason = "autumn";
        break;
    case 11:
        currentSeason = "autumn";
        break;
    case 12:
        currentSeason = "winter";
        break;
    default:
        currentSeason = "summer";
}
 
function addEventCalendar(index) {
    var originalString = calendarOfEvents[index].name;
    var urlString = originalString.replace(/ /g, "_");
    var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var thisMonthDate = new Date();
    $('#events-list').append('<li class="event-index-list-item" id="event-index-' + index + '"> <a href="https://animal-crossing.fandom.com/ru/wiki/' + monthNames[thisMonthDate.getMonth()] + '">' + monthNames[thisMonthDate.getMonth()] + '</a> ' + ordinal_suffix_of(calendarOfEvents[index].date) + ' • <b> <a href="https://animal-crossing.fandom.com/ru/wiki/' + urlString + '"> ' + originalString + ' </a> </b> </li>');
	if (calendarOfEvents[index].japan == true) {
		$('#event-index-'+index).append('<img src="https://vignette.wikia.nocookie.net/animalcrossing/images/9/9e/Flag_of_Japan.svg/revision/latest/scale-to-width/22?cb=20150202034305" alt="Flag of Italy small" width="22" height="15">');
	}
	if(checkedEvents.indexOf(calendarOfEvents[index].name)) {
	    $('#events-buttons').append('<div class="homebutton-'+currentSeason+' bgi-gloss"><div class="homebutton-img-wrapper"><img class="homebutton-img" src="' + calendarOfEvents[index].imageUrl + '" /></div><div><a href="https://animal-crossing.fandom.com/ru/wiki/' + urlString + '"> ' + calendarOfEvents[index].buttonLinkText + ' </a></div></div>');
	    checkedEvents.push(calendarOfEvents[index].name);
	}
}
 
// shortlistOfEvents stores the events we've verified as occurring during this month, in the right order.
// hasCheckedThisEvent tells us which events we've already checked, so we don't add them more than once to the list.
 
var shortlistOfEvents = [];
var hasCheckedThisEvent = [];
 
// Populates the hasCheckedThisEvent list
 
for (k = 0; k < calendarOfEvents.length; k++){
	hasCheckedThisEvent.push(false);
}
 
// We use a for loop based on the date first, then the month. This lets us sort them into the right order.
 
for (i = 0; i < 32; i++) {
	for (j = 0; j < calendarOfEvents.length; j++) {
		var thisMonthChecker = new Date();
		if (calendarOfEvents[j].month == thisMonthChecker.getMonth() + 1 && hasCheckedThisEvent[j] == false && calendarOfEvents[j].date == i) {
			shortlistOfEvents.push(j);
			hasCheckedThisEvent[j] = true;
			console.log(j + '\'s month is ' + calendarOfEvents[j].month + '. Adding to calendar');
		}
	}
}
 
// This will add each event we've shortlisted to the events calendar.
 
for (m = 0; m < shortlistOfEvents.length; m++) {
	addEventCalendar(shortlistOfEvents[m]);
}
 
// This will remove the loading message.
 
$('#events-not-loaded').remove();

// END EVENTS CALCULATOR
//         
//
//  

thisYear = new Date().getFullYear();

$(".easter-month-substitutor").append(EasterMonth(thisYear));
$(".easter-date-substitutor").append(EasterDate(thisYear));
$(".festivale-month-substitutor").append(mardiGrasMonth);
$(".festivale-date-substitutor").append(mardiGrasDate);
$(".autumnmoon-month-substitutor").append(getClosest(new Date().getFullYear()).getMonth() + 1);
$(".autumnmoon-date-substitutor").append(getClosest(new Date().getFullYear()).getDate());

mweditNamespace = $("#mw-content-text > fieldset > form > table");
$("#dropper-namespace").append(mweditNamespace);

// Калькулятор цены репы

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function sellTurnips() {
	buyPrice = $("#turnip-buy-price").val();
	sellPrice = $("#turnip-sell-price").val();
	turnipQuantity = $("#turnip-quantity").val();
	
	turnipRevenue = turnipQuantity * sellPrice;
	turnipExpenditure = turnipQuantity * buyPrice;
	turnipProfit = turnipRevenue - turnipExpenditure;
	
	$("#turnip-revenue").html(numberWithCommas(turnipRevenue));
	$("#turnip-expenditure").html(numberWithCommas(turnipExpenditure));
	$("#turnip-profit").html(numberWithCommas(turnipProfit));
	
}

$("#turnip-loader").html('<div id="turnip-form" style="width:400px;"> <table style="width:100%;"><tr><td>Цена репы у Джоан</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="turnip-buy-price"></td><tr></tr><td>Количество купленной репы</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="turnip-quantity"></td><tr></tr><td>Цена репы у Риз</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="turnip-sell-price"></td></td><tr><td colspan="2" style="text-align:center; padding: 5px;"><button id="sell-turnip-button" onClick="sellTurnips();">Продайте мою репу!</button></td></tr><tr> <td>Доход</td><td style="text-align: right; color:blue;"><b><span id="turnip-revenue">0</span> диней</b></td></tr><tr> <td>Расход</td><td style="text-align: right; color:red;"><b><span id="turnip-expenditure">0</span> диней</b></td></tr><tr> <td>Прибыль</td><td style="text-align: right; color:green;"><b><span id="turnip-profit">0</span> диней</b></td></tr></table> </div>');

// Время автоматизировать времена года, если честно

var seasonStyle = {
	spring: {
		hover: "#337800",
		url: "https://vignette.wikia.nocookie.net/animalcrossing/images/c/c4/Grass_spring.png/revision/latest"
	},
	summer: {
		hover: "#337800",
		url: "https://vignette.wikia.nocookie.net/animalcrossing/images/8/8f/Grass_summer.png/revision/latest"
	},
	autumn: {
		hover: "#A15B26",
		url: "https://vignette.wikia.nocookie.net/animalcrossing/images/5/5b/Grass_autumn.png/revision/latest"
	},
	winter: {
		hover: "#04049E",
		url: "https://vignette.wikia.nocookie.net/animalcrossing/images/f/f3/Grass_snow.png/revision/latest"
	}
}

mw.util.addCSS("a:hover { text-shadow: 0 0 1em "+seasonStyle[currentSeason].hover+", 0 0 0.2em "+seasonStyle[currentSeason].hover+"; color:white !important; } \
a.topiclink:hover { text-shadow: 0 0 1em "+seasonStyle[currentSeason].hover+", 0 0 0.2em "+seasonStyle[currentSeason].hover+"; color:white !important; } \
body.skin-oasis { background: #f1f1f1 url('"+seasonStyle[currentSeason].url+"') top left repeat; }");