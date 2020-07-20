<source lang="JavaScript">
<!--
function worldClock(zone, region){
var dst = 0
var time = new Date()
var gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000)
var gmtTime = new Date(gmtMS)
var day = gmtTime.getDate()
var month = gmtTime.getMonth()
var year = gmtTime.getYear()
if(year < 1000){
year += 1900
}
var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", 
				"September", "October", "November", "December")
var monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
if (year%4 == 0){
monthDays = new Array("31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
}
if(year%100 == 0 && year%400 != 0){
monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
}

var hr = gmtTime.getHours() + zone
var min = gmtTime.getMinutes()
var sec = gmtTime.getSeconds()

if (hr >= 24){
hr = hr-24
day -= -1
}
if (hr < 0){
hr -= -24
day -= 1
}
if (hr < 10){
hr = " " + hr
}
if (min < 10){
min = "0" + min
}
if (sec < 10){
sec = "0" + sec
}
if (day <= 0){
if (month == 0){
	month = 11
	year -= 1
	}
	else{
	month = month -1
	}
day = monthDays[month]
}
if(day > monthDays[month]){
	day = 1
	if(month == 11){
	month = 0
	year -= -1
	}
	else{
	month -= -1
	}
}
if (region == "NAmerica"){
	var startDST = new Date()
	var endDST = new Date()
	startDST.setMonth(3)
	startDST.setHours(2)
	startDST.setDate(1)
	var dayDST = startDST.getDay()
	if (dayDST != 0){
		startDST.setDate(8-dayDST)
		}
		else{
		startDST.setDate(1)
		}
	endDST.setMonth(9)
	endDST.setHours(1)
	endDST.setDate(31)
	dayDST = endDST.getDay()
	endDST.setDate(31-dayDST)
	var currentTime = new Date()
	currentTime.setMonth(month)
	currentTime.setYear(year)
	currentTime.setDate(day)
	currentTime.setHours(hr)
	if(currentTime >= startDST && currentTime < endDST){
		dst = 1
		}
}
if (region == "Europe"){
	var startDST = new Date()
	var endDST = new Date()
	startDST.setMonth(2)
	startDST.setHours(1)
	startDST.setDate(31)
	var dayDST = startDST.getDay()
	startDST.setDate(31-dayDST)
	endDST.setMonth(9)
	endDST.setHours(0)
	endDST.setDate(31)
	dayDST = endDST.getDay()
	endDST.setDate(31-dayDST)
	var currentTime = new Date()
	currentTime.setMonth(month)
	currentTime.setYear(year)
	currentTime.setDate(day)
	currentTime.setHours(hr)
	if(currentTime >= startDST && currentTime < endDST){
		dst = 1
		}
}

if (region == "SAmerica"){
	var startDST = new Date()
	var endDST = new Date()
	startDST.setMonth(9)
	startDST.setHours(0)
	startDST.setDate(1)
	var dayDST = startDST.getDay()
	if (dayDST != 0){
		startDST.setDate(22-dayDST)
		}
		else{
		startDST.setDate(15)
		}
	endDST.setMonth(1)
	endDST.setHours(11)
	endDST.setDate(1)
	dayDST = endDST.getDay()
	if (dayDST != 0){
		endDST.setDate(21-dayDST)
		}
		else{
		endDST.setDate(14)
		}
	var currentTime = new Date()
	currentTime.setMonth(month)
	currentTime.setYear(year)
	currentTime.setDate(day)
	currentTime.setHours(hr)
	if(currentTime >= startDST || currentTime < endDST){
		dst = 1
		}
}
if (region == "Cairo"){
	var startDST = new Date()
	var endDST = new Date()
	startDST.setMonth(3)
	startDST.setHours(0)
	startDST.setDate(30)
	var dayDST = startDST.getDay()
	if (dayDST < 5){
		startDST.setDate(28-dayDST)
		}
		else {
		startDST.setDate(35-dayDST)
		}
	endDST.setMonth(8)
	endDST.setHours(11)
	endDST.setDate(30)
	dayDST = endDST.getDay()
	if (dayDST < 4){
		endDST.setDate(27-dayDST)
		}
		else{
		endDST.setDate(34-dayDST)
		}
	var currentTime = new Date()
	currentTime.setMonth(month)
	currentTime.setYear(year)
	currentTime.setDate(day)
	currentTime.setHours(hr)
	if(currentTime >= startDST && currentTime < endDST){
		dst = 1
		}
}
if (region == "Israel"){
	var startDST = new Date()
	var endDST = new Date()
	startDST.setMonth(3)
	startDST.setHours(2)
	startDST.setDate(1)
	endDST.setMonth(8)
	endDST.setHours(2)
	endDST.setDate(25)
	dayDST = endDST.getDay()
	if (dayDST != 0){
	endDST.setDate(32-dayDST)
	}
	else{
	endDST.setDate(1)
	endDST.setMonth(9)
	}
	var currentTime = new Date()
	currentTime.setMonth(month)
	currentTime.setYear(year)
	currentTime.setDate(day)
	currentTime.setHours(hr)
	if(currentTime >= startDST && currentTime < endDST){
		dst = 1
		}
}
if (region == "Beirut"){
	var startDST = new Date()
	var endDST = new Date()
	startDST.setMonth(2)
	startDST.setHours(0)
	startDST.setDate(31)
	var dayDST = startDST.getDay()
	startDST.setDate(31-dayDST)
	endDST.setMonth(9)
	endDST.setHours(11)
	endDST.setDate(31)
	dayDST = endDST.getDay()
	endDST.setDate(30-dayDST)
	var currentTime = new Date()
	currentTime.setMonth(month)
	currentTime.setYear(year)
	currentTime.setDate(day)
	currentTime.setHours(hr)
	if(currentTime >= startDST && currentTime < endDST){
		dst = 1
		}
}
if (region == "Baghdad"){
	var startDST = new Date()
	var endDST = new Date()
	startDST.setMonth(3)
	startDST.setHours(3)
	startDST.setDate(1)
	endDST.setMonth(9)
	endDST.setHours(3)
	endDST.setDate(1)
	dayDST = endDST.getDay()
		var currentTime = new Date()
	currentTime.setMonth(month)
	currentTime.setYear(year)
	currentTime.setDate(day)
	currentTime.setHours(hr)
	if(currentTime >= startDST && currentTime < endDST){
		dst = 1
		}
}
if (region == "Australia"){
	var startDST = new Date()
	var endDST = new Date()
	startDST.setMonth(9)
	startDST.setHours(2)
	startDST.setDate(31)
	var dayDST = startDST.getDay()
	startDST.setDate(31-dayDST)
	endDST.setMonth(2)
	endDST.setHours(2)
	endDST.setDate(31)
	dayDST = endDST.getDay()
	endDST.setDate(31-dayDST)
	var currentTime = new Date()
	currentTime.setMonth(month)
	currentTime.setYear(year)
	currentTime.setDate(day)
	currentTime.setHours(hr)
	if(currentTime >= startDST || currentTime < endDST){
		dst = 1
		}
}

	
if (dst == 1){
	hr -= -1
	if (hr >= 24){
	hr = hr-24
	day -= -1
	}
	if (hr < 10){
	hr = " " + hr
	}
	if(day > monthDays[month]){
	day = 1
	if(month == 11){
	month = 0
	year -= -1
	}
	else{
	month -= -1
	}
	}
return monthArray[month] + " " + day + ", " + year + "<br>" + hr + ":" + min + ":" + sec + " DST"
}
else{
return monthArray[month] + " " + day + ", " + year + "<br>" + hr + ":" + min + ":" + sec
}
}

function worldClockZone(){
document.getElementById("GMT").innerHTML = worldClock(0, "Greenwich")
document.getElementById("Vancouver").innerHTML = worldClock(-8, "NAmerica")
document.getElementById("SanFrancisco").innerHTML = worldClock(-8, "NAmerica")
document.getElementById("Seattle").innerHTML = worldClock(-8, "NAmerica")
document.getElementById("LosAngeles").innerHTML = worldClock(-8, "NAmerica")
document.getElementById("Denver").innerHTML = worldClock(-7, "NAmerica")
document.getElementById("MexicoCity").innerHTML = worldClock(-6, "NAmerica")
document.getElementById("Houston").innerHTML = worldClock(-6, "NAmerica")
document.getElementById("Minneapolis").innerHTML = worldClock(-6, "NAmerica")
document.getElementById("NewOrleans").innerHTML = worldClock(-6, "NAmerica")
document.getElementById("Chicago").innerHTML = worldClock(-6, "NAmerica")
document.getElementById("Montgomery").innerHTML = worldClock(-6, "NAmerica")
document.getElementById("Indianapolis").innerHTML = worldClock(-5, "NAmerica")
document.getElementById("Atlanta").innerHTML = worldClock(-5, "NAmerica")
document.getElementById("Detroit").innerHTML = worldClock(-5, "NAmerica")
document.getElementById("Miami").innerHTML = worldClock(-5, "NAmerica")
document.getElementById("WashingtonDC").innerHTML = worldClock(-5, "NAmerica")
document.getElementById("Philadelphia").innerHTML = worldClock(-5, "NAmerica")
document.getElementById("NewYork").innerHTML = worldClock(-5, "NAmerica")
document.getElementById("Montreal").innerHTML = worldClock(-5, "NAmerica")
document.getElementById("Boston").innerHTML = worldClock(-5, "NAmerica")
document.getElementById("BuenosAires").innerHTML = worldClock(-3, "BuenosAires")
document.getElementById("SaoPaulo").innerHTML = worldClock(-3, "SAmerica")
document.getElementById("RioDeJaneiro").innerHTML = worldClock(-3, "SAmerica")
document.getElementById("Lisbon").innerHTML = worldClock(0, "Europe")
document.getElementById("Dublin").innerHTML = worldClock(0, "Europe")
document.getElementById("London").innerHTML = worldClock(0, "Europe")
document.getElementById("Madrid").innerHTML = worldClock(1, "Europe")
document.getElementById("Barcelona").innerHTML = worldClock(1, "Europe")
document.getElementById("Paris").innerHTML = worldClock(1, "Europe")
document.getElementById("Brussels").innerHTML = worldClock(1, "Europe")
document.getElementById("Amsterdam").innerHTML = worldClock(1, "Europe")
document.getElementById("Frankfurt").innerHTML = worldClock(1, "Europe")
document.getElementById("Rome").innerHTML = worldClock(1, "Europe")
document.getElementById("Berlin").innerHTML = worldClock(1, "Europe")
document.getElementById("Prague").innerHTML = worldClock(1, "Europe")
document.getElementById("Vienna").innerHTML = worldClock(1, "Europe")
document.getElementById("Stockholm").innerHTML = worldClock(1, "Europe")
document.getElementById("Athens").innerHTML = worldClock(2, "Europe")
document.getElementById("Helsinki").innerHTML = worldClock(2, "Europe")
document.getElementById("Minsk").innerHTML = worldClock(2, "Europe")
document.getElementById("Istanbul").innerHTML = worldClock(2, "Europe")
document.getElementById("Cairo").innerHTML = worldClock(2, "Cairo")
document.getElementById("Jerusalem").innerHTML = worldClock(2, "Israel")
document.getElementById("Beirut").innerHTML = worldClock(2, "Beirut")
document.getElementById("Moscow").innerHTML = worldClock(3, "Europe")
document.getElementById("Baghdad").innerHTML = worldClock(3, "Baghdad")
document.getElementById("Dubai").innerHTML = worldClock(4, "Dubai")
document.getElementById("Bangkok").innerHTML = worldClock(7, "Bangkok")
document.getElementById("Jakarta").innerHTML = worldClock(7, "Jakarta")
document.getElementById("HongKong").innerHTML = worldClock(8, "HongKong")
document.getElementById("Beijing").innerHTML = worldClock(8, "Beijing")
document.getElementById("Shanghai").innerHTML = worldClock(8, "Shanghai")
document.getElementById("Seoul").innerHTML = worldClock(9, "Seoul")
document.getElementById("Tokyo").innerHTML = worldClock(9, "Tokyo")
document.getElementById("Melbourne").innerHTML = worldClock(10, "Australia")
document.getElementById("Sydney").innerHTML = worldClock(10, "Australia")
document.getElementById("Brisbane").innerHTML = worldClock(10, "Brisbane")
document.getElementById("Vladivostok").innerHTML = worldClock(10, "Europe")
document.getElementById("Kamchatka").innerHTML = worldClock(12, "Europe")

setTimeout("worldClockZone()", 1000)
}
window.onload=worldClockZone;

//-->