
/* This JavaScript file is to load on every cache of the Wikia for all users. Credits of any public domain coding goes fully to the aforementioned users. */


/*======================================================================================*/

/* Adds information icons to the bottom border of page headers
 * Full credit to: [[User:The 888th Avatar]], [[User:Lady Lostris]], and [[User:Thailog]] of Avatar Wiki
 */

$(function() {
    if ( mw.config.get( 'wgVersion' ) !== '1.19.24' && $( '#title-eraicons' ).length ) {
        $( '.page-header__contribution > div' ).first().append( $( '#title-eraicons' ).show() );
    } else if ( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
		$( '#icons' ).attr( 'style', 'position: absolute; right: 335px;' )
	);
	} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
}
});

/*======================================================================================*/


/* Adds a Penguin Standard Time clock based off of Pacific Standard Time
 * Full credit to: [[User:PerapinCP]] of Club Penguin Rewritten Wiki
 */

/* Start of PST Clock */
var sidebarVisible = getElement("WikiaRail") ? true : false;

if(sidebarVisible) {
	var pstClockElement = document.createElement("div");
	pstClockElement.id = "pst-clock-wrapper";
	pstClockElement.innerHTML = "<section class='rail-module'><h2>PST Clock</h2><div class='border-radius-5 padding-10'id=pst-clock><div class=text-align-center id=pst-heading>Penguin Standard Time</div><br><div><span id=time-wrapper class='border-radius-5 padding-10 text-align-center'><span id=time>NOW</span>&nbsp;<span id=am_pm></span></span></div><br><div><span id=day class='border-radius-5 padding-10'>TODAY</span><button aria-label='Fix date/time accuracy'id=power-clock-button title='Fix date/time accuracy'></button></div></div></section>";
	getElement("WikiaRail").appendChild(pstClockElement);

	var powerClockButton = getElement("power-clock-button");
}

function getElement(id) {
	return document.getElementById(id);
}

function getHour(h) { // UTC Hour to PST Hour conversion
    h -= 8;
    return 0 < h && 13 > h ? h : 13 <= h ? h - 12 : h + 12;
}

function getMinute(m) {
    return 10 <= m ? m : "0" + m;
}

function getSecond(s) {
    return 10 <= s ? s : "0" + s;
}

function updateTime() {
	var time = getElement("time");
	var utcDate = new Date();
	time.innerText = getHour(utcDate.getUTCHours()) + ":" + getMinute(utcDate.getUTCMinutes()) + ":" + getSecond(utcDate.getUTCSeconds());
}

function updateDayNameAndTimePeriod() { // Updates day name + AM/PM portion
	var days = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];
	var day = getElement("day");
	var am_pm = getElement("am_pm");
	var tempDate = new Date();
	var timeout;
	
	tempDate.setUTCHours(tempDate.getUTCHours() - 8); // Convert to PST
	day.innerText = days[tempDate.getUTCDay()] + "day";
	if(tempDate.getUTCHours() < 12) {
		am_pm.innerText = "AM";
	} else {
		am_pm.innerText = "PM";
	}
	
	if(tempDate.getUTCHours() === 23 || tempDate.getUTCHours() === 11) {
	    // Prepare for day name or AM/PM change
		timeout = setTimeout(updateDayNameAndTimePeriod, 1000); 
	} else {
		clearTimeout(timeout);
		timeout = setTimeout(updateDayNameAndTimePeriod, 420000);
	}
}

if(sidebarVisible) {
	updateTime();
	setInterval(updateTime, 1000);
	updateDayNameAndTimePeriod();

	try {
		powerClockButton.addEventListener("click", updateTime, false);
		powerClockButton.addEventListener("click", updateDayNameAndTimePeriod, false);
	} catch(e) {  // Event listener not supported
		powerClockButton.parentNode.removeChild(powerClockButton);
	}
}
/* End of PST Clock */

/* Imports for js button for admin page and adds first edit page to profile*/
importArticles({
    type: 'script',
    articles: [
 'u:dev:MediaWiki:FirstEditDate.js',
 'u:dev:MediaWiki:AdminDashboard_JS-Button/code.js',

    ]
});
/*======================================================================================*/