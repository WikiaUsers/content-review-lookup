/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/* Add 4th and 5th level for the navigation bar */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});


/********************************************************/
/********************************************************/
//Homepage Timers with data coming from API
/********************************************************/
/********************************************************/
//Subfunctions

function countdown(targetDateTime, id2Update, preText) {
 
	var countDownDate = new Date(targetDateTime).getTime();
 
	// Update the count down every 1 second
	var x = setInterval(function() {
 
		// Get today's date and time
		var now = new Date().getTime();
 
		// Find the distance between now and the count down date
		var distance = countDownDate - now;
 
		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24))
				/ (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
 
		var outputTimer = preText;
		if (days !== 0) {
			outputTimer += days + "j ";
		}
		if(hours !== 0) {
		    outputTimer += hours + "h ";
		}
        outputTimer += minutes + "m " + seconds + "s";
 
		// Display the result in the element with id="demo"
		document.getElementById(id2Update).innerHTML = outputTimer;
 
		// If the count down is finished, write some text
		if (distance < 0) {
			clearInterval(x);
			document.getElementById(id2Update).innerHTML = preText + "EXPIRÉ";
		}
	}, 1000);
}
 
function setField2Loading(id2Edit) {
 
    document.getElementById(id2Edit).innerHTML = "Loading API...";
}
 
function buildHomePage_Timers() {
 
	// Create a request variable and assign a new XMLHttpRequest object to it.
	var request = new XMLHttpRequest();
 
	// Open a new connection, using the GET request on the URL endpoint
	request.open('GET', 'https://api.warframestat.us/pc/', true);
	request.onload = function() {
		// Begin accessing JSON data here
		var data = JSON.parse(this.response);
		if (request.status === 200) {
		    var id = null;
			var preText = null;
			//CetusCycle
			id = "cetusCycle_countdown";
			if(document.getElementById(id)) {
			    setField2Loading(id);
			    if(data.cetusCycle.isDay) {
				    preText = "Nuit";
			    } else {
			    	preText = "Jour";
			    }
			    preText += " dans ";
			    countdown(data.cetusCycle.expiry, "cetusCycle_countdown", preText);
			}
			//VoidTrader
			id = "voidTraderCycle_countdown";
			if(document.getElementById(id)) {
			    setField2Loading(id);
			    if(data.voidTrader.active) {
			        preText = "Part dans ";
			        countdown(data.voidTrader.expiry, id, preText);
			    } else {
			        preText = "Arrive dans ";
			        countdown(data.voidTrader.activation, id, preText);
			    }
		    }
		    //OrbisCycle
		    id = "orbisCycle_countdown";
		    if(document.getElementById(id)) {
	            setField2Loading(id);
	            if(data.vallisCycle.isWarm) {
	                preText = "Froid";
	            } else {
	                preText = "Chaud";
	            }
	            preText += " dans ";
	            countdown(data.vallisCycle.expiry, id, preText);
		    }
		}
	};
 
	// Send request
	request.send();
}

/********************************************************/
/********************************************************/
//Main

switch (mw.config.get('wgPageName')) {
case 'Blog_utilisateur:ADDRMeridan/test_API':
case 'Wiki_Warframe':
case 'Modèle:Homepage/Timers':
case 'Modèle:BoxTimer':
	buildHomePage_Timers();
	break;
}