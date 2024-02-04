/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

// ============= // Import JS // ============= //
// Imported elements:
// ; ExtendedNavigation => Ajoute un 4ème et 5ème niveau dans la barre de navigation principale 
// ; LangSetup => Permet d'instaurer un 'magic word' pour le langage du wiki, à utiliser dans des templates par exemple
// ; I18nEdit => Éditeur de traductions compatibles avec le format de traduction utilisé par I18n-js 
// ; I18n-js => Bibliothèque permettant de charger les messages d'un script, stockés sous forme de JSON, prêts à être utilisés par ce script
// ; MultiUpload => Permet la mise en ligne de plusieurs médias d'un seul coup (possède une certaine limite de fichiers)
importArticles({
	type: 'script',
	articles: [
		'u:dev:ExtendedNavigation/code.js',
		'u:dev:MediaWiki:LangSetup.js',
		'u:dev:MediaWiki:I18nEdit.js',
		'u:dev:MediaWiki:I18n-js/code.js',
		'u:dev:MediaWiki:MultiUpload.js',
	]
});


// ============= // Table ordering // ============= //
// Définir les caractères d'échappement pour les tris des tableaux (UTF-8)
mw.config.set('tableSorterCollation', { 'à':'a', 'â':'a', 'ä':'a', 'é':'e', 'è':'e', 'ê':'e', 'ë':'e', 'î':'i', 'ï':'i', 'ô':'o', 'ö':'o', 'ù':'u', 'û':'u', 'ü':'u', 'ÿ':'y', 'ç':'c', 'œ':'oe', 'æ':'ae' });


// ============= // Homepage timers // ============= //
// data are fetched from the WFCD API

// Table ordering
let fieldsArray = ["cetusCycle_countdown", "voidTraderCycle_countdown", "orbisCycle_countdown", "pcInvasions", "ps4Invasions", "xb1Invasions", "swiInvasions", "cambionCycle_countdown", "sortieRewards"];
let plateformsArray = ["pc", "ps4", "xb1", "swi"];

// const
const API_ADDRESS = "https://api.warframestat.us/";
const COLOR_GRINEER = "6a241c";
const COLOR_CORPUS = "003e66";
const COLOR_INFESTED = "004231";


//Subfunctions
function countdown(targetDateTime, id2Update, preText) {
	let countDownDate = new Date(targetDateTime).getTime();

	let x = setInterval(function () { // Update the count down every 1 second

		let now = new Date().getTime(); // Get today's date and time
		let distance = countDownDate - now; // Find the distance between now and the count down date

		// Time calculations for days, hours, minutes and seconds
		let days = Math.floor(distance / (1000 * 60 * 60 * 24));
		let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);

		let outputTimer = preText;
		if (days !== 0) { outputTimer += days + "j "; }
		if (hours !== 0) { outputTimer += hours + "h "; }
		outputTimer += minutes + "m " + seconds + "s";

		// If the count down is finished, write some text
		if (distance < 0) {
			clearInterval(x);
			document.getElementById(id2Update).innerHTML = preText + "EXPIRÉ";
		} else {
			document.getElementById(id2Update).innerHTML = outputTimer;
		}
	}, 1000);
}

function setField2Loading(id2Edit) {
	if (document.getElementById(id2Edit)) {
		document.getElementById(id2Edit).innerHTML = "Chargement de l'API...";
	}
}

function setAllFields2Loading() {
	fieldsArray.forEach(setField2Loading);
}

function setField2Error(id2Edit) {
	document.getElementById(id2Edit).innerHTML = "Erreur durant le chargement de l'API.";
}

function buildHomePage_Timers() {
	let preText = '';

	let idCetus = fieldsArray[0]; // Cetus Cycle
	if (document.getElementById(idCetus)) {
		let cetusRequest = new XMLHttpRequest();
		cetusRequest.open('GET', API_ADDRESS.concat('pc/cetusCycle'), true);
		cetusRequest.onload = function () {
			let data = JSON.parse(this.response);
			if (cetusRequest.status === 200) {
				preText = data.isDay ? "<span style=\"color: #e1b858;\">Jour</span>" : "<span style=\"color: #4e79df;\">Nuit</span>";
				preText += " dans ";
				countdown(data.expiry, idCetus, preText);
			} else {
				setField2Error(idCetus);
			}
		};
		cetusRequest.send();
	}
	
	let idVoidTrader = fieldsArray[1]; // Void Trader
	if (document.getElementById(idVoidTrader)) {
		let voidTraderRequest = new XMLHttpRequest();
		voidTraderRequest.open('GET', API_ADDRESS.concat('pc/voidTrader'), true);
		voidTraderRequest.onload = function () {
			let data = JSON.parse(this.response);
			if (voidTraderRequest.status === 200) {
				if (data.active) {
					preText = "Part dans ";
					countdown(data.expiry, idVoidTrader, preText);
				} else {
					preText = "Arrive dans ";
					countdown(data.activation, idVoidTrader, preText);
				}
			} else {
				setField2Error(idVoidTrader);
			}
		};
		voidTraderRequest.send();
	}
	
	let idOrbis = fieldsArray[2]; // Orbis Cycle
	if (document.getElementById(idOrbis)) {
		let orbisRequest = new XMLHttpRequest();
		orbisRequest.open('GET', API_ADDRESS.concat('pc/vallisCycle'), true);
		orbisRequest.onload = function () {
			let data = JSON.parse(this.response);
			if (orbisRequest.status === 200) {
				preText = data.isWarm ? "<span style=\"color: #4ec4df;\">Froid</span>" : "<span style=\"color: #e1b858;\">Chaud</span>";
				preText += " dans ";
				countdown(data.expiry, idOrbis, preText);
			} else {
				setField2Error(idOrbis);
			}
		};
		orbisRequest.send();
	}
	
	let idCambion = fieldsArray[7]; //Cambion Cycle
	if (document.getElementById(idCambion)) {
		let cambionRequest = new XMLHttpRequest();
		cambionRequest.open('GET', API_ADDRESS.concat('pc/cambionCycle'), true);
		cambionRequest.onload = function () {
			let data = JSON.parse(this.response);
			if (cambionRequest.status === 200) {
				preText = data.isVome ? "<span style=\"color: #e1b858;\">Fass</span>" : "<span style=\"color: #4ec4df;\">Vome</span>";
				preText += " dans ";
				countdown(data.expiry, idCambion, preText);
			} else {
				setField2Error(idCambion);
			}
		};
		cambionRequest.send();
	}
	
	let sortieRewards= fieldsArray[8]; // sortieRewards [not-functionnal]
	if (document.getElementById('id60a3e0fdacb0c7a68ef85ad4')) {
		let sortieRequest = new XMLHttpRequest();
		sortieRequest.open('GET', API_ADDRESS.concat('pc/sortie'), true);
		sortieRequest.onload = function () {
			let data = JSON.parse(this.response);
			preText = "<span style=\"color: #4ec4df;\">Test Sortie</span>";
		};
		sortieRequest.send();
	}
}

function getFactionColor(factionName) {
    return factionName === "Corpus" ? COLOR_CORPUS : factionName === "Grineer" ? COLOR_GRINEER : factionName === "Infesté" ? COLOR_INFESTED : '';
}


//Parse API values and return result as string to prevent potential attacks
function protectFromInput(stringWithPotentialHTML) {
	let doc = new DOMParser().parseFromString(stringWithPotentialHTML, 'text/html');
	return doc.body.textContent || "";
}

function buildInvasion(structInvasion) {

	let result = '';
	if (!structInvasion.completed) {
		let attackerColor = structInvasion.vsInfestation ? getFactionColor("Infesté") : getFactionColor(structInvasion.attackingFaction);
		let defenderColor = getFactionColor(structInvasion.defendingFaction);
		let completion = Math.round(structInvasion.completion);
	
		let attackerRewardHtml = !structInvasion.vsInfestation ? `<div class="reward_left align-me" style="background-color:#${attackerColor};">${protectFromInput(structInvasion.attackerReward.asString)}</div>` : '';
		
		result = `
			<div class="invasion_container">
				<div class="box">
					<div class="reward_planet">
						<span>${protectFromInput(structInvasion.node)}</span> - ${protectFromInput(structInvasion.desc)}
					</div>
					<div class="topbar${structInvasion.vsInfestation ? ' infested' : ''}">
						${attackerRewardHtml}
						<div class="reward_right align-me" style="background-color:#${defenderColor};">${protectFromInput(structInvasion.defenderReward.asString)}</div>
					</div>
					<div class="bottom_bar">
						<div class="progression_bar_content align-me">${completion}% - Se termine dans: ${protectFromInput(structInvasion.eta)}</div>
						<div class="progression_bar_box_value" style="background-color:#${defenderColor};">
							<div class="progression_bar" style="width:${completion}%; background-color:#${attackerColor};"></div>
						</div>
					</div>
				</div>
			</div>`;
	}

	return result;
}

function requestInvasion(id, plateform) {
	if (document.getElementById(id)) {
		let invasionRequest = new XMLHttpRequest();
		invasionRequest.open('GET', API_ADDRESS.concat(plateform).concat('/invasions'), true);
		invasionRequest.setRequestHeader("Accept-Language", "fr");
		invasionRequest.onload = function () {
			if (invasionRequest.status === 200) {
				let data = JSON.parse(this.response);
				let ret = '';
				for (let i = 0; i < data.length; i++) {
					ret += buildInvasion(data[i]);
				}
				document.getElementById(id).innerHTML = ret;
			} else {
				setField2Error(id);
			}
		};
		invasionRequest.send();
	}
}

// Construction des éléments d'Invasions
function buildHomePage_Invasions() {
	requestInvasion(fieldsArray[3], plateformsArray[0]); //PC
	requestInvasion(fieldsArray[4], plateformsArray[1]); //PS4
	requestInvasion(fieldsArray[5], plateformsArray[2]); //XB1
	requestInvasion(fieldsArray[6], plateformsArray[3]); //SWITCH
}

// Pile des appels
switch (mw.config.get('wgPageName')) {
	case 'Wiki_Warframe':
	case 'Modèle:Homepage/Timers':
	case 'Modèle:Homepage/Invasions':
	case 'Modèle:BoxTimer':
		setAllFields2Loading();
		buildHomePage_Timers();
		buildHomePage_Invasions();
		break;
}


// ============= // CSS STYLING // ============= //
// Le styling CSS présent ici est IMPOSSIBLE à réaliser si l'on souhaite garder un code supporté sur tous les navigateurs,
// merci de ne pas modifier quoique ce soit sans en discuter en équipe d'abord.

// == / Navbox styling // == //
// Custom code to fix '.navbox' styling, which is impossible in supported CSS (even with :has() or other advanced selectors)
let navboxGroupRows = document.querySelectorAll(".navbox tr:has(td.navboxgroup)");

addEventListener("DOMContentLoaded", (event) => {
	if (navboxGroupRows) {
	  navboxGroupRows.forEach(function (normalRow) {
		normalRow.querySelector("td.navboxgroup").style.borderTopWidth = "0.3rem";
		normalRow.querySelector("td.navboxgroup").style.borderBottomWidth = "0";
	  });
	  // Apply a specific style only on the last-child of each "nested" table group
	  navboxGroupRows.forEach(function (lastRow) {
		let nextRow = lastRow.nextElementSibling;
		if (nextRow && nextRow.querySelector("th.navboxhead")) {
		  lastRow.querySelector("td.navboxgroup").style.borderBottomWidth = "0.3rem";
		}
	  });
	}
});


// ============= // TESTHERE // ============= //
// Merci de ne pas laisser de code servant à des tests ici, une purge régulière sera faite pour maintenir un environnement stable.