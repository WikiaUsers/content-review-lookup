_get = window.location.search.substr(1).split("&").map(function (a){return a.split("=")});
console.log("commons|"+mw.config.get('wgPageName').toLocaleLowerCase());
// function printStats(){
//     console.info("commons|printStats");
// 	stats = _get.find(function (a){return a[0] == "stats"});
// 	if(stats===undefined){return;}
// 	stats = _get.find(function(a){return a[0] == "stats"})[1].split("-");
//     index = 0;
//     [
//     	'#nombre'
//     	,'#skin'
//     	,'#level'
//     	,'#expBoost'
//     	,'#currentHealth'
//     	,'#totalExperience'
//     	,'#monstersKilled'
//     	,'#totalHealed'
//     	,'#playerRevived'
//     	,'#damegeDone'
//     	,'#strengthBoosted'
//     ].forEach(function (id){
//     	if(
//     		document.querySelector(id)
//     		&& typeof stats[index]!='undefined'
//     	){
//     		document.querySelector(id).innerHTML = stats[index];
//     	}
//     	index++;
//     });
// }
switch (mw.config.get('wgPageName').toLocaleLowerCase()) {
    case 'mis_stats':{
        console.info("case1");
        window.addEventListener("load",function (){
            console.info("case1|load");
            // if(!_get.find(function(){return a[0] == "stats"})) return;
            console.info("commons|printStats");
			stats = _get.find(function (a){return a[0] == "stats"});
			if(stats===undefined){
				return;
			}
			document.querySelector("#aviso").style.display="none";
			stats = _get.find(function(a){return a[0] == "stats"})[1].split("-");
		    index = 0;
		    [
		    	'#nombre'
		    	,'#skin'
		    	,'#level'
		    	,'#expBoost'
		    	,'#currentHealth'
		    	,'#totalExperience'
		    	,'#monstersKilled'
		    	,'#totalHealed'
		    	,'#playerRevived'
		    	,'#damegeDone'
		    	,'#strengthBoosted'
		    ].forEach(function (id){
		    	if(
		    		document.querySelector(id)
		    		&& typeof stats[index]!='undefined'
		    	){
		    		document.querySelector(id).innerHTML = stats[index];
		    	}
		    	index++;
		    });
        });
        break;	
    }
    default:break;
}