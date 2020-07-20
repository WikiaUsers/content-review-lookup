/* Any JavaScript here will be loaded for all users on every page load. */
console.log('Custom Code Begin');

var div = document.getElementsByTagName('a');
for (var i=0; i<div.length; i++) {
	if (div[i].className.indexOf('subnav-2a') != -1) {
		if(div[i].innerHTML === "RoT Forum") {
			div[i].href = 'http://www.realmsoftrinity.com/forum/index.php';
			div[i].target= '_blank';
		}
		else if(div[i].innerHTML === "NWN2 Database") {
			div[i].href = 'http://nwn2db.com/';
			div[i].target= '_blank';
		}
		else if(div[i].innerHTML === "NWN2 DB Forum") {
			div[i].href = 'http://nwn2db.freeforums.org/';
			div[i].target= '_blank';
		}
	}
}

console.log('Custom Code Executed');