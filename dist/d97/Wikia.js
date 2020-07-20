/* date.js script */

$("head").append('<script type="text/javascript" src="https://datejs.googlecode.com/svn/trunk/build/date-en-US.js"></script>');
importScriptPage('MediaWiki:SunCalc.js',"d97");

/* Simple Events */

var calendarOfEvents = [];

function addACEvent(name, month, date, japan, link) {
	/* Creates a new object for this event */
    this.name = name;
    this.month = month;
    this.date = date;
	this.japan = japan;
	this.link = link;
}

function pEvent(name, month, date, japan, link) {
	/* Creates and adds a new event to the list of events */
	i = new addACEvent(name, month, date, japan, link);
	calendarOfEvents.push(i);
}

pEvent("New Year's Day",1,1,false);
pEvent('Groundhog Day',2,2,false);
pEvent("Valentine's Day",2,14,false);
pEvent('Shamrock Day',3,17,false);
pEvent("April Fool's Day",4,1,false);
pEvent('Nature Day',4,22,false);
pEvent('Summer Solstice',6,21,false);
pEvent('Weeding Day',9,3,true);
pEvent('Halloween',10,31,false);
pEvent('Mushroom season begins',11,1,false,'Mushroom');
pEvent('Winter Solstice',12,21,false);
pEvent('Toy Day',12,24,false);
pEvent("New Year's Eve",12,31,false);

/* Tier 2 Events */

pEvent("Fishing Tourney",1,Date.january().third().sunday().getDate(),false);
pEvent("Fishing Tourney",2,Date.february().second().saturday().getDate(),false);
pEvent("Fishing Tourney",3,Date.march().third().saturday().getDate(),false);
pEvent("Fishing Tourney",4,Date.april().second().saturday().getDate(),false);
pEvent("Weeding Day",4,Date.april().last().friday().getDate(),false);
pEvent("Mother's Day",5,Date.may().second().sunday().getDate(),false);
pEvent("Fishing Tourney",5,Date.may().third().saturday().getDate(),false);
pEvent("Bug Off",6,Date.june().third().sunday().getDate(),false);
pEvent("Bug Off",7,Date.july().third().saturday().getDate(),false);
pEvent("Bug Off",8,Date.august().third().saturday().getDate(),false);
pEvent("Fireworks Show",8,Date.august().first().sunday().getDate(),false);
pEvent("Fireworks Show",8,Date.august().second().sunday().getDate(),false);
pEvent("Fireworks Show",8,Date.august().third().sunday().getDate(),false);
pEvent("Fireworks Show",8,Date.august().fourth().sunday().getDate(),false);
if (Date.august().fourth().sunday() != Date.august().last().sunday()) {
    pEvent("Fireworks Show",8,Date.august().fifth().sunday().getDate(),false);
}
pEvent("Labor Day",9,Date.september().first().monday(),false);
pEvent("Bug Off",9,Date.september().third().saturday(),false);
pEvent("Explorer's Day",10,Date.october().second().monday(),false);
pEvent("Fishing Tourney",10,Date.october().second().saturday().getDate(),false);
pEvent("Harvest Festival",11,Date.november().fourth().thursday().getDate(),false);
pEvent("Fishing Tourney",11,Date.november().third().saturday().getDate(),false);
pEvent("Fishing Tourney",12,Date.december().second().saturday().getDate(),false);

/* Tier 3 'hard' events */

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

pEvent("Bunny Day",EasterMonth(new Date().getFullYear()),EasterDate(new Date().getFullYear()),false);

easterDate = EasterDate(new Date().getFullYear());
easterMonth = EasterMonth(new Date().getFullYear());
easterYear = new Date().getFullYear();

d1 = easterMonth + '/' + easterDate + '/' + easterYear;
var date = new Date(d1);
date.setDate(date.getDate() - 49);
var dateMsg = date.getDate()+'/'+ (date.getMonth()+1) +'/'+date.getFullYear();
mardiGrasDate = Date.parse(dateMsg).tuesday().getDate();
mardiGrasMonth = Date.parse(dateMsg).tuesday().getMonth() + 1;

pEvent("Festivale",mardiGrasMonth,mardiGrasDate,false);