var a = document.getElementById('charinfobox').innerHTML;
if (a.match(/\bSpecies/g)  == null &&
	a.match(/\bSex/g) == null &&
	a.match(/\bOrigin/g) == null &&
	a.match(/\bAppearance/g) == null
) {
	document.getElementById('physicalinfo').remove();
}
if (a.match(/\bAliases/g) == null &&
	a.match(/\bAge/g) == null &&
	a.match(/\bOccupation/g) == null &&
	a.match(/\bFamily/g) == null
) {
	document.getElementById('personalinfo').remove();
}
if (a.match(/\bCamp/g) == null &&
	a.match(/\bScout/g) == null &&
	a.match(/\bCabin\sMates/g) == null &&
	a.match(/\bCabin/g) == null &&
	a.match(/\bPosition/g) == null
) {
	document.getElementById('affiliation').remove();
}
if (a.match(/\bDebut/g) == null &&
	a.match(/\bVoiced\sby/g) == null 
) {
	document.getElementById('productinfo').remove();
}