// Minuteur du Cycle Jour/Nuit pour Cetus
// Écrit par : Matt Voboril
//https://warframe.fandom.com/fr/wiki/Modèle:HomePage/Timers
//------------------ CYCLE TEST -------------------------


 function load () {
	const state = document.getElementById('state');
  const timeleft = document.getElementById('timeleft');
	fetch('https://api.warframestat.us/pc/cetusCycle', {
  	headers: {
    	'Accept-Language': 'fr'
    }
  })
 .then (d => d.json() )
  .then(data => {
  	state.innerText = data.state === 'day' ? 'le jour' : 'la nuit';
    timeleft.innerText = moment(data.expiry).fromNow(true);
  })
  .catch(console.error);
}

window.onload = () => {
	moment.updateLocale('en', {
	relativeTime: {
  	future: "in %s",
    past:   "%s ago",
    s  : 'a few seconds',
    ss : '%ds',
    m:  "a minute",
    mm: "%dm",
    h:  "an hour",
    hh: "%dh",
    d:  "a day",
    dd: "%dd",
    M:  "a month",
    MM: "%dM",
    y:  "a year",
    yy: "%dy"
  }
});

};
setInterval(load, 1000);