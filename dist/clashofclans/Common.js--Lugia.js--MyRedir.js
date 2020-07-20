function checkLink(){
	var p=['MySpells','MyAchievements','MyArmy','MyDefensiveBuildings','MyResourceBuildings'];
	var d=location.href.split('/wiki/')[1];
	if(d.substr(0,5)=='User:'&&p.indexOf(d.split('/')[1])!=-1&&d.split('/').length==2){
		var m=document.getElementById('ca-edit');
		if(m.innerHTML.indexOf('Create')!=-1){
			location.replace(location.href.split('/wiki/')[0]+'/wiki/'+p[p.indexOf(d.split('/')[1])]);
		}
	}
}
addOnloadHook(checkLink);