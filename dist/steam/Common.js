const urlParams = new URLSearchParams(window.location.search);
importScriptPage('AjaxRC/code.js', 'dev');
window.railWAM = {
    logPage:"Project:WAM Log",
    autoLogForUsers:"MikhailMCraft"
};

//auto refresh
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity"
];

function AddRollResults() {
	var test = Math.random(0, 10)
	if (test == 4) {
		if (document.getElementById('tes123t') !== undefined || document.getElementById('tes123t') !== null) {
			document.getElementById('tes123t').innerHTML += '<table id="tes123t"><td>Operator</td><td>Operator2</td><td>Operator3</td></table>'
		}
		document.getElementById('mw-content-text').innerHTML += '<table id="tes123t"><td>Operator</td><td>Operator2</td><td>Operator3</td></table>'
	}
	else {
		if (document.getElementById('tes123t') !== undefined || document.getElementById('tes123t') !== null) {
			document.getElementById('tes123t').innerHTML += '<table id="tes123t"><td>Operator</td><td>Operator2</td><td>Operator3</td></table>'
		}
		document.getElementById('mw-content-text').innerHTML += '<table id="tes123t"><td>OperatorFail</td><td>OperatorFail2</td><td>OperatorFail3</td></table>'
	}
}

if(urlParams.get('veaction')===null &&urlParams.get('action')===null){
	if (mw.config.get('wgPageName') == 'User:MikhailMCraft') {
	        document.getElementById('mw-content-text').innerHTML += '<input type="button" value="Roll"onclick="AddRollResults()"/><br></br><br></br>';
	    }
}