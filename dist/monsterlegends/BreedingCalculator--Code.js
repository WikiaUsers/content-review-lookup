var monstersUns= {};
var monsters ={};
  
var singleCombos = {
'Nature/Nature':['Treezard:50'],
'Nature/Fire':['Greenasaur:35','Pandaken:15'],
'Nature/Earth':['Rarawr:35','Tarzape:15'],
'Nature/Water':['Sheluke:35','Bumblesnout:15'],
'Nature/Dark':['Utochomp:35','Dendrosaur:15'],
'Nature/Magic':['Bloomskips:30','Pandalf:15','Erpham:5'],
'Nature/Light':['Vixsun:35','Rudicius:15'],
'Nature/Metal':['Jonskeer:35','Crux:15'],
'Nature/Legendary':['Treezard:50'],
'Fire/Fire':['Firesaur:50'],
'Fire/Earth':['Firekong:35','Freettle:15'],
'Fire/Thunder':['Gigram:35','Thundenix:15'],
'Fire/Water':['Sealion:35','Vapwhirl:15'],
'Fire/Dark':['Flickie:35','Firetaur:15'],
'Fire/Magic':['Pyrook:35','Djinn:15'],
'Fire/Metal':['Esmelter:35','Fornax:15'],
'Fire/Legendary':['Firesaur:50'],
'Earth/Earth':['Rockilla:50'],
'Earth/Thunder':['Electrex:35','Bonbon:15'],
'Earth/Water':['Gastosquish:35','Musu:15'],
'Earth/Dark':['Obsidia:35','Beefcake:15'],
'Earth/Light':['Light_Sphinx:35','Goldcore:15'],
'Earth/Metal':['Rockneto:35','Gravoid:15'],
'Earth/Legendary':['Rockilla:50'],
'Thunder/Thunder':['Thunder_Eagle:50'],
'Thunder/Water':['Shock_Turtle:35','Koopigg:15'],
'Thunder/Dark':['Terror_Dactyl:35','Shanky:15'],
'Thunder/Magic':['Raydex:35','Sparkwedge:15'],
'Thunder/Light':['Pelitwirl:35','Pulseprism:15'],
'Thunder/Metal':['Lesaki:35','Garuda_M3:15'],
'Thunder/Legendary':['Thunder_Eagle:50'],
'Water/Water':['Mersnake:50'],
'Water/Magic':['Dolphchamp:30','Octocrush:15','Drop_Elemental:5'],
'Water/Light':['Blesstle:35','Raane:15'],
'Water/Metal':['Metanephrops:35','Metaselach:15'],
'Water/Legendary':['Mersnake:50'],
'Dark/Dark':['Tyrannoking:50'],
'Dark/Magic':['Giragast:30','Haze:15','Darknubis:5'],
'Dark/Light':['Succuba:35','Fayemelina:15'],
'Dark/Metal':['Omethyst:35','Vortux:15'],
'Dark/Legendary':['Tyrannoking:50'],
'Magic/Magic':['Genie:50'],
'Magic/Light':['Flawless:35','Zim:15'],
'Magic/Metal':['Manolyth:35','Dommeath:15'],
'Magic/Legendary':['Genie:50'],
'Light/Light':['Light_Spirit:50'],
'Light/Metal':['Heimdal:35','Aurinia:15'],
'Light/Legendary':['Light_Spirit:50'],
'Metal/Metal':['Metalsaur:50'],
'Metal/Legendary':['Metalsaur:50']
};

var dualCombos = {
'Nature/Nature':['Treezard:25'],
'Nature/Fire':['Greenasaur:17.5','Pandaken:7.5'],
'Nature/Earth':['Rarawr:17.5','Tarzape:7.5'],
'Nature/Water':['Sheluke:17.5','Bumblesnout:7.5'],
'Nature/Thunder':['Rhynex:15','Rabidex:7.5','Griffex:2.5'],
'Nature/Dark':['Utochomp:17.5','Dendrosaur:7.5'],
'Nature/Magic':['Bloomskips:15','Pandalf:7.5','Erpham:2.5'],
'Nature/Light':['Vixsun:17.5','Rudicius:7.5'],
'Nature/Metal':['Jonskeer:17.5','Crux:7.5'],
'Nature/Legendary':['Treezard:25'],
'Fire/Fire':['Firesaur:25'],
'Fire/Earth':['Firekong:17.5','Freettle:7.5'],
'Fire/Thunder':['Gigram:17.5','Thundenix:7.5'],
'Fire/Water':['Sealion:17.5','Vapwhirl:7.5'],
'Fire/Dark':['Flickie:17.5','Firetaur:7.5'],
'Fire/Magic':['Pyrook:17.5','Djinn:7.5'],
'Fire/Light':['Scorchpeg:17.5','Skipples:7.5'],
'Fire/Metal':['Esmelter:17.5','Fornax:7.5'],
'Fire/Legendary':['Firesaur:25'],
'Earth/Earth':['Rockilla:25'],
'Earth/Thunder':['Electrex:17.5','Bonbon:7.5'],
'Earth/Water':['Gastosquish:17.5','Musu:7.5'],
'Earth/Dark':['Obsidia:17.5','Beefcake:7.5'],
'Earth/Magic':['Terracrank:15','Duchess:7.5','Tartarus:2.5'],
'Earth/Light':['Light_Sphinx:17.5','Goldcore:7.5'],
'Earth/Metal':['Rockneto:17.5','Gravoid:7.5'],
'Earth/Legendary':['Rockilla:25'],
'Thunder/Thunder':['Thunder_Eagle:25'],
'Thunder/Water':['Shock_Turtle:17.5','Koopigg:7.5'],
'Thunder/Dark':['Terror_Dactyl:17.5','Shanky:7.5'],
'Thunder/Magic':['Raydex:17.5','Sparkwedge:7.5'],
'Thunder/Light':['Pelitwirl:17.5','Pulseprism:7.5'],
'Thunder/Metal':['Lesaki:17.5','Garuda_M3:7.5'],
'Thunder/Legendary':['Thunder_Eagle:25'],
'Water/Water':['Mersnake:17.5', 'Razfeesh:7.5'],
'Water/Dark':['Fliploch:17.5','Razfeesh:7.5'],
'Water/Magic':['Dolphchamp:15','Octocrush:7.5','Drop_Elemental:2.5'],
'Water/Light':['Blesstle:17.5','Raane:7.5'],
'Water/Metal':['Metanephrops:17.5','Metaselach:7.5'],
'Water/Legendary':['Mersnake:25'],
'Dark/Dark':['Tyrannoking:25'],
'Dark/Magic':['Giragast:15','Haze:7.5','Darknubis:2.5'],
'Dark/Light':['Succuba:17.5','Fayemelina:7.5'],
'Dark/Metal':['Omethyst:17.5','Vortux:7.5'],
'Dark/Legendary':['Tyrannoking:25'],
'Magic/Magic':['Genie:25'],
'Magic/Light':['Flawless:17.5','Zim:7.5'],
'Magic/Metal':['Manolyth:17.5','Dommeath:7.5'],
'Magic/Legendary':['Genie:25'],
'Light/Light':['Light_Spirit:25'],
'Light/Metal':['Heimdal:17.5','Aurinia:7.5'],
'Light/Legendary':['Light_Spirit:25'],
'Metal/Metal':['Metalsaur:25'],
'Metal/Legendary':['Metalsaur:25'],
'Legendary/Legendary':['Firesaur:2.44','Treezard:2.44','Rockilla:2.44','Thunder_Eagle:2.44','Mersnake:2.44','Tyrannoking:2.44','Genie:2.44','Light_Spirit:2.44','Metalsaur:2.44','Fire_Lion:1','Turtle:1','Panda:1']
};

var specCombos = {
'Rhynex/Darknubis':['Nemestrinus:10'],
'Skipples/Duchess':['Vadamagma:10'],
'Drop_Elemental/Razfeesh':['Lord_of_Atlantis:10'],
'Darknubis/Fayemelina':['Darkzgul:10'],
'Rabidex/Tartarus':['Thorder:10'],
'Chordim/Griffex':['Exo_Skeel:10'],
'Esthirel/Goldcore':['Arch_Knight:10'],
'Musu/Terracrank':['Rockantium:10'],
'Erpham/Drop_Elemental':['Goldfield:10'],
'Obsidia/Cthulhu':['Nebotus:10'],
'Hyperion/Pandalf':['Worker_Hulk:10'],
'Darknubis/Gold_Ra':['Ultrabot:10'],
'Irockman/Gridiron':['Trilops:10'],
'Xpug/Squamata_Jr.':['Super_Dan:10'],
'Anaitis/Freeza':['Nidaria:10'],
'Skipples/Goldcore':['Kassia:10'],
'Scorchpeg/Duchess':['Shallinar:10'],
'Dragonian_Beast/Tartarus':['Deadwolf:10'],
'Fliploch/Fayemelina':['Will_"Razor_Face":10'],
'Erpham/Rhynex':['Clivia:10'],
"Goath'el/Rootziel":['Hasai:10'],
'Fenix/Ao_Loong':['Firelequin:10'],
'Nautilus-1/Squamata_Jr.':['Jakugan:10'],
'Rabidex/Griffex':['Ukuduma:10'],
'Darknubis/Pandalf':['Malair:10'],
'Razfeesh/Musu':['Chill_Bill:10'],
'Fliploch/Drop_Elemental':['Blob:10'],
'Galante/Erpham':['Laomu:5'],
'Tarzape/Thundenix':['Dragonian_Beast:10'],
'Razfeesh/Galante':['Ledovech:20'],
'Razfeesh/Drop_Elemental':['Ledovech:10'],
'Turtle/Panda':['Fire_Lion:5'],
'Panda/Firanda':['Turtle:5'],
'Fire_Lion/Firanda':['Panda:5'],
'Fire_Lion/Turtle':['Firanda:1'],
'Mersnake/Mersnake':['Mersnake:70'],
'Mersnake/Mersnake':['Razfeesh:30']
};

const oppCombos = ['Firesaur/Light_Spirit','Treezard/Thunder_Eagle','Rockilla/Genie','Mersnake/Tyrannoking','Fire_Lion/Light_Spirit','Turtle/Tyrannoking','Panda/Thunder_Eagle'];

const oppEles = ['Fire/Light','Nature/Thunder','Earth/Magic','Water/Dark'];

var rarity = {
	'All':[0],
  'Common':[1],
  'Uncommon':[2],
  'Rare':[3],
  'Epic':[4],
  'Legendary':[5],
  'Mythic':[6]
};

const raritylink = {
  'Common':['<a href="https://monsterlegends.fandom.com/wiki/Category:Common"><img src="https://vignette.wikia.nocookie.net/monsterlegends/images/4/40/Ic-common.png/revision/latest?cb=20200228122959" alt="Common" width="40px"></a>'],
  'Uncommon':['<a href="https://monsterlegends.fandom.com/wiki/Category:Uncommon"><img src="https://vignette.wikia.nocookie.net/monsterlegends/images/5/5a/Ic-uncommon.png/revision/latest?cb=20200228123049" alt="Uncommon" width="40px"></a>'],
  'Rare':['<a href="https://monsterlegends.fandom.com/wiki/Category:Rare"><img src="https://vignette.wikia.nocookie.net/monsterlegends/images/b/b7/Ic-rare.png/revision/latest?cb=20200228123116" alt="Rare" width="40px"></a>'],
  'Epic':['<a href="https://monsterlegends.fandom.com/wiki/Category:Epic"><img src="https://vignette.wikia.nocookie.net/monsterlegends/images/d/d8/Ic-epic.png/revision/latest?cb=20200228123146" alt="Epic" width="40px"></a>'],
  'Legendary':['<a href="https://monsterlegends.fandom.com/wiki/Category:Legendary"><img src="https://vignette.wikia.nocookie.net/monsterlegends/images/7/78/Icono_Legendary.png/revision/latest?cb=20200228123216" alt="Legendary" width="40px"></a>'],
  'Mythic':['<a href="https://monsterlegends.fandom.com/wiki/Category:Mythic"><img src="https://vignette.wikia.nocookie.net/monsterlegends/images/0/01/Icono_Mythic.png/revision/latest?cb=20200228123259" alt="Mythic" width="40px"></a>']
};

var element = {
  'All':[0],
  'Fire':[1],
  'Nature':[2],
  'Earth':[3],
  'Thunder':[4],
  'Water':[5],
  'Dark':[6],
  'Magic':[7],
  'Light':[8],
  'Metal':[9]};
var books ={
  'All':[0],
  'Dragon':[1],
  'Spirits':[2],
  'Winged':[3],
  'Sea':[4],
  'Underworld':[5],
  'Mechanical':[6],
  'Female':[7],
  'Undead':[8],
  'Winter':[9],
  'Good Legions':[10],
  'Evil Legions':[11],
  'Superheroes':[12],
  'Families':[13],
  'Team Wars':[14],
  'Exclusive':[15],
  'Adventurers':[16],
  'Villains':[17],
  'Elite':[18],
  'Race':[19],
  'Quest':[20],
  'Cosmic Era':[21]
  };

/*Breeding Calc*/
(function() {
	function get_info(){
  	get_monster_data(function(results){
    	sort_monster_data(function(results2){
      	    do_everything();
        });	
    });
  }
  function get_monster_data(callback){
  	$.getJSON('/api.php?action=parse&page=Breeding_Calculator/monsterdata&format=json', function(data) {
      var fullString = data["parse"]["text"]["*"];
      fullString = fullString.replace('<div class="mw-parser-output"><p>','');
      fullString = fullString.split("</p>")[0];
      var fullArr = fullString.split("<br />");
      for (var monNum in fullArr){
        var monster = fullArr[monNum].split("|");
        monstersUns = Object.assign(monstersUns,{[monster[0]]: [monster[1],monster[2],monster[3],monster[4]]});
      }
  		callback();
  	});
  }
  
  function sort_monster_data(callback){
			Object.keys(monstersUns).sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase())).forEach(function(key) {
 				monsters[key] = monstersUns[key];
			}); 
      callback();
  }
  
  get_info();


	do_everything = function(){
			var x,y,z,a;
    	var eleFil='',bookFil='',monFil='',rarFil='';
    	var filterElement='All',filterBook='All';
    
   			for (a in rarity){
            if (rarity.hasOwnProperty(a)){
                rarFil += '<option value="' + a + '">' + a + '</option>';	
            }
        }
        for (x in element){
            if (element.hasOwnProperty(x)){
                eleFil += '<option value="' + x + '">' + x + '</option>';	
            }
        }
        for (y in books){
            if (books.hasOwnProperty(y)){
                bookFil += '<option value="' + y + '">' + y + '</option>';	
            }
        }
 
        for (z in monsters){
            if (monsters.hasOwnProperty(z)){
                monFil += '<option value="' + z.replace(new RegExp('"', "g"), '&quot;') + '">' + z.replace(new RegExp("_", "g"), ' ') + '</option>';
            }
        }
 
        $('#breeding_calculator').html(
            '<table style="table-layout: fixed;width: 600px;text-align: center;">' +
            '<tr><td style="width:50%;font-size:25px;">Monster 1</td>' + 
            '<td style="width:50%;font-size:25px;">Monster 2</td></tr></table>' + 
            '<table class="breed-calculator">' +
            '<tr>' +
            '<td style="width:10%">Rarity:</td>' +
            '<td style="width:40%"><select id="rarity1">' + rarFil + '</select></td>' +
            '<td style="width:10%">Rarity:</td>' +
            '<td style="width:40%"><select id="rarity2">' + rarFil + '</select></td>' +
            '</tr><tr>' +
            '<td>Element:</td>' +
            '<td><select id="element1">' + eleFil + '</select></td>' +
            '<td>Element:</td>' +
            '<td><select id="element2">' + eleFil + '</select></td>' +
            '</tr><tr>' +
            '<td>Book:</td>' + 
            '<td><select id="book1">' + bookFil + '</select></td>' + 
            '<td>Book:</td>' + 
            '<td><select id="book2">' + bookFil + '</select></td>' + 
            '</tr><tr>' + 
            '<td>Monster:</td>' + 
            '<td><select id="monster1">' + monFil + '</select></td>' + 
            '<td>Monster:</td>' + 
            '<td><select id="monster2">' + monFil + '</select></td>' +
            '</tr>' + 
            '</table></br><table style="width:600px;"><tbody style="text-align:center"<tr><td style="width:100%;"><button type="button" onclick="update_breed()" style="font-size:20px;height:40px;">Breed!</button></td></tr></tbody></table>' +
            '</br><table id="outputTable" style="width:600px"><thead style="font-size:25px;"><tr><th style="width:25%" onclick="sortTable(0)">Monster</th><th style="width:25%" onclick="sortTable(1)">Rarity</th><th style="width:25%" onclick="sortTable(2)">Percentage</th><th style="width:25%" onclick="sortTable(3)">Breed Time</th></tr></thead><tbody></tbody></table>' 
        ); 
        
 
        update_breed = function() {
            var monster1Ele = monsters[$('#monster1').val()][0];
            var monster2Ele = monsters[$('#monster2').val()][0];
            var combo = '';
            var outMonsters = [];
            var dupeCheck = [];
            var oppEleFlag = 0;
            
            /*if (monsters[$('#monster1').val()][1] == "Mythic"){
                monster1Ele += "/Legendary";
            }
            if (monsters[$('#monster2').val()][1] == "Mythic"){
                monster2Ele += "/Legendary";
            }*/
            
            //Double Common Case
            if (monster1Ele.indexOf("/") === -1 && monster2Ele.indexOf("/") === -1){
              var combotest1 = monster1Ele + "/" + monster2Ele;
              var combotest2 = monster2Ele + "/" + monster1Ele;
              for (combo in singleCombos){
              	if (combo == combotest1 || combo == combotest2){
                  for (var poss in singleCombos[combo]){
                    var outMon = singleCombos[combo][poss].split(":")[0];
                    var outPerc = Number(singleCombos[combo][poss].split(":")[1]) * 2;
                    if (dupeCheck.includes(outMon)){
                        for (var dupe in outMonsters){
                            if(outMonsters[dupe]["monster"] == outMon){
                                outMonsters[dupe]["percentage"] = Number(outMonsters[dupe]["percentage"]) + Number(outPerc);
                            }
                        }
                    }
                    else{
                        outMonsters.push({monster:outMon,percentage:outPerc});
                        dupeCheck.push(outMon);
                    }
                  }
                }
              }
            } 
            //FIrst monster Common
            else if (monster1Ele.indexOf("/") === -1){ 
            	var combotest1 = monster1Ele + "/" + monster2Ele.split("/")[0];
            	var combotest2 = monster1Ele + "/" + monster2Ele.split("/")[1];
            	var combotest3 = monster2Ele.split("/")[0] + "/" + monster1Ele;
            	var combotest4 = monster2Ele.split("/")[1] + "/" + monster1Ele;
            	if (oppEles.includes(combotest1) || oppEles.includes(combotest2) || oppEles.includes(combotest3) || oppEles.includes(combotest4)){
            	    oppEleFlag = 1;
            	}
                for (combo in singleCombos){
                  	if (combo == combotest1 || combo == combotest2 || combo == combotest3 || combo == combotest4){
                    	for (var poss in singleCombos[combo]){
                        var outMon = singleCombos[combo][poss].split(":")[0];
                        var outPerc = singleCombos[combo][poss].split(":")[1];
                        if (dupeCheck.includes(outMon)){
                            for (var dupe in outMonsters){
                                if(outMonsters[dupe]["monster"] == outMon){
                                    outMonsters[dupe]["percentage"] = Number(outMonsters[dupe]["percentage"]) + Number(outPerc);
                                }
                            }
                        }
                        else{
                            outMonsters.push({monster:outMon,percentage:outPerc});
                            dupeCheck.push(outMon);
                        }
                      }
                    }
                }
            }
            //Second Monster Common
            else if (monster2Ele.indexOf("/") === -1){
            	var combotest1 = monster2Ele + "/" + monster1Ele.split("/")[0];
            	var combotest2 = monster2Ele + "/" + monster1Ele.split("/")[1];
            	var combotest3 = monster1Ele.split("/")[0] + "/" + monster2Ele;
            	var combotest4 = monster1Ele.split("/")[1] + "/" + monster2Ele;
            	if (oppEles.includes(combotest1) || oppEles.includes(combotest2) || oppEles.includes(combotest3) || oppEles.includes(combotest4)){
            	    oppEleFlag = 1;
            	}
                for (combo in singleCombos){
                  	if (combo == combotest1 || combo == combotest2 || combo == combotest3 || combo == combotest4){
                    	for (var poss in singleCombos[combo]){
                        var outMon = singleCombos[combo][poss].split(":")[0];
                        var outPerc = singleCombos[combo][poss].split(":")[1];
                        if (dupeCheck.includes(outMon)){
                            for (var dupe in outMonsters){
                                if(outMonsters[dupe]["monster"] == outMon){
                                    outMonsters[dupe]["percentage"] = Number(outMonsters[dupe]["percentage"]) + Number(outPerc);
                                }
                            }
                        }
                        else{
                            outMonsters.push({monster:outMon,percentage:outPerc});
                            dupeCheck.push(outMon);
                        }
                      }
                    }
                }
            }
            //Neither Monster Common
            else {
            	var combotest1 = monster1Ele.split("/")[0] + "/" + monster2Ele.split("/")[0];
            	var combotest2 = monster1Ele.split("/")[0] + "/" + monster2Ele.split("/")[1];
            	var combotest3 = monster1Ele.split("/")[1] + "/" + monster2Ele.split("/")[0];
            	var combotest4 = monster1Ele.split("/")[1] + "/" + monster2Ele.split("/")[1];
            	var combotest5 = monster2Ele.split("/")[0] + "/" + monster1Ele.split("/")[0];
            	var combotest6 = monster2Ele.split("/")[0] + "/" + monster1Ele.split("/")[1];
            	var combotest7 = monster2Ele.split("/")[1] + "/" + monster1Ele.split("/")[0];
            	var combotest8 = monster2Ele.split("/")[1] + "/" + monster1Ele.split("/")[1];
              for (combo in dualCombos){
              	if (combo == combotest1 || combo == combotest3 || combo == combotest5 || combo == combotest6){
                	for (var poss in dualCombos[combo]){
                    var outMon = dualCombos[combo][poss].split(":")[0];
                    var outPerc = dualCombos[combo][poss].split(":")[1];
                    if (dupeCheck.includes(outMon)){
                        for (var dupe in outMonsters){
                            if(outMonsters[dupe]["monster"] == outMon){
                                outMonsters[dupe]["percentage"] = Number(outMonsters[dupe]["percentage"]) + Number(outPerc);
                            }
                        }
                    }
                    else{
                        outMonsters.push({monster:outMon,percentage:outPerc});
                        dupeCheck.push(outMon);
                    }
                  }
                }
                if (combo == combotest2 || combo == combotest4 || combo == combotest7 || combo == combotest8){
                	for (var poss in dualCombos[combo]){
                    var outMon = dualCombos[combo][poss].split(":")[0];
                    var outPerc = dualCombos[combo][poss].split(":")[1];
                    if (dupeCheck.includes(outMon)){
                        for (var dupe in outMonsters){
                            if(outMonsters[dupe]["monster"] == outMon){
                                outMonsters[dupe]["percentage"] = Number(outMonsters[dupe]["percentage"]) + Number(outPerc);
                            }
                        }
                    }
                    else{
                        outMonsters.push({monster:outMon,percentage:outPerc});
                        dupeCheck.push(outMon);
                    }
                  }
                }
              }
            }
            
            var percTot = 0;
            var specTot = [];
            
            for (var spec in specCombos){
                var spec1 = spec.split("/")[0];
                var spec2 = spec.split("/")[1];
            	if ((spec1 == $('#monster1').val() && spec2 == $('#monster2').val()) || (spec2 == $('#monster1').val() && spec1 == $('#monster2').val())){
                  	var specMon = specCombos[spec][0].split(":")[0];
                    var specPerc = specCombos[spec][0].split(":")[1];
                    percTot = percTot + Number(specPerc);
                    specTot.push({monster:specMon,percentage:Number(specPerc)});
                }
            }
            
            var multPerc = (100 - percTot)/100;
            for (var out in outMonsters){
                if (oppEleFlag == 1){
                    outMonsters[out]["percentage"] = Number(outMonsters[out]["percentage"]) * 2;
                }
                outMonsters[out]["percentage"] = Number(outMonsters[out]["percentage"]) * multPerc;
            }
            for (var blah in specTot){
                outMonsters.unshift({monster:specTot[blah]["monster"],percentage:specTot[blah]["percentage"]})
            }
            
            outMonsters.sort((a,b) => (Number(a.percentage) > Number(b.percentage)) ? -1 : 1);
            var outputStr ='';
            var mon = 0;
            
            var newTbody = document.createElement('tbody');
            newTbody.style.cssText='text-align:center;font-size:20px';
            var oldTbody = document.getElementById('outputTable').getElementsByTagName('tbody')[0];
						oldTbody.parentNode.replaceChild(newTbody, oldTbody);
          
            function combineElements(){
            	if (mon < (outMonsters.length - 1)){
              	//console.log(outMonsters[mon]["monster"] + " " + outMonsters[mon]["percentage"]);
              	get_image_url(outMonsters[mon]["monster"],function(results){
              		outMonsters[mon]["url"] = results;
                  ++mon;
                  combineElements();
                });
              }
              else if (mon == (outMonsters.length - 1)){
              	//console.log(outMonsters[mon]["monster"] + " " + outMonsters[mon]["percentage"]);
              	get_image_url(outMonsters[mon]["monster"],function(results){
              		outMonsters[mon]["url"] = results;
                	for (var mon2 in outMonsters){
                        var tableRef = document.getElementById('outputTable').getElementsByTagName('tbody')[0];
                        var newRow = tableRef.insertRow();
                        var newCell = newRow.insertCell(0);
                        newCell.innerHTML = outMonsters[mon2]["url"];
                        var newCell1 = newRow.insertCell(1);
                        newCell1.innerHTML = raritylink[monsters[outMonsters[mon2]["monster"]][1]];
                        var newCell2 = newRow.insertCell(2);
                        newCell2.innerHTML = outMonsters[mon2]["percentage"] + '%';
                        var newCell3 = newRow.insertCell(3);
                        var timeString = secondsToDhms(monsters[outMonsters[mon2]["monster"]][3]);
                        newCell3.innerHTML = timeString;
                    }
                });
              }
            }
            for (var opp in oppCombos){
                var opp1 = oppCombos[opp].split("/")[0];
                var opp2 = oppCombos[opp].split("/")[1];
                if ((opp1 == $('#monster1').val() && opp2 == $('#monster2').val()) || (opp2 == $('#monster1').val() && opp1 == $('#monster2').val())){
                    var tableRef = document.getElementById('outputTable').getElementsByTagName('tbody')[0];
                    var newRow = tableRef.insertRow();
                    var newCell = newRow.insertCell(0);
                    newCell.colSpan = 4;
                    newCell.innerHTML = '<br/>These monsters cannot be bred together because they are opposite element common monsters. Read more about this <a href="https://monsterlegends.fandom.com/wiki/Elements">here</a>';
                    break;
                }
                else if (opp == (oppCombos.length - 1)){
                    combineElements();
                }
            }
        };
        
        update_filter1 = function(){
            var iter;
            var filler = '';
            filterelement = $('#element1').val();
            filterbook=$('#book1').val();
            filterrarity=$('#rarity1').val();
            for (iter in monsters){ 
                if (filterelement == "All" && filterbook == "All" && filterrarity=="All"){
                     filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace('_',' ') + '</option>';
                }
                else if (filterbook == "All" && filterrarity=="All" && monsters[iter][0].includes(filterelement)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';	
                }
                else if (filterelement == "All" && filterrarity=="All" && monsters[iter][2].includes(filterbook)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';	
                }
                else if (filterelement == "All" && filterbook=="All" && monsters[iter][1].includes(filterrarity)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';	
                }
                else if (monsters[iter][2].includes(filterbook) && monsters[iter][1].includes(filterrarity) && filterelement == "All"){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';	
                }
                else if (monsters[iter][0].includes(filterelement) && filterrarity=="All" && monsters[iter][2].includes(filterbook)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';	
                }
                else if (monsters[iter][0].includes(filterelement) && filterbook=="All" && monsters[iter][1].includes(filterrarity)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';	
                }
                else if (monsters[iter][0].includes(filterelement) && monsters[iter][2].includes(filterbook) && monsters[iter][1].includes(filterrarity)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
          }
 
            $(filler).html(filler);
            $('#monster1 option').remove();
            $('#monster1').append(filler);
        };
        
        update_filter2 = function(){
            var iter;
            var filler = '';
            filterelement = $('#element2').val();
            filterbook=$('#book2').val();
            filterrarity=$('#rarity2').val();
            for (iter in monsters){ 
                if (filterelement == "All" && filterbook == "All" && filterrarity=="All"){
                     filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
                else if (filterbook == "All" && filterrarity=="All" && monsters[iter][0].includes(filterelement)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';	
                }
                else if (filterelement == "All" && filterrarity=="All" && monsters[iter][2].includes(filterbook)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';	
                }
                else if (filterelement == "All" && filterbook=="All" && monsters[iter][1].includes(filterrarity)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';	
                }
                else if (monsters[iter][2].includes(filterbook) && monsters[iter][1].includes(filterrarity) && filterelement == "All"){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';	
                }
                else if (monsters[iter][0].includes(filterelement) && filterrarity=="All" && monsters[iter][2].includes(filterbook)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';	
                }
                else if (monsters[iter][0].includes(filterelement) && filterbook=="All" && monsters[iter][1].includes(filterrarity)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';	
                }
                else if (monsters[iter][0].includes(filterelement) && monsters[iter][2].includes(filterbook) && monsters[iter][1].includes(filterrarity)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
          }
 
            $(filler).html(filler);
            $('#monster2 option').remove();
            $('#monster2').append(filler);
        };

        get_image_url = function(name,callback){
          $.getJSON('/api.php?action=query&titles=File:Thumb-' + name.replace(new RegExp('"', "g"), '') + '.jpg&prop=imageinfo&iiprop=url&iiurlwidth=200&format=json', function(data) {
            pages = data.query.pages;
            var imString = '';
            for (var id in pages) {
              file = pages[id];
              if (file.imageinfo === undefined) {
                continue; //File redirects or other weirdness
              }
              imString += '<a href="https://monsterlegends.fandom.com/wiki/' + name + '"><span class="' + monsters[name][1].toLowerCase() + '-border"><img src="' + file.imageinfo[0].url +'" alt="' + name + '" width="50" height="50"></span><br/>' + name.replace(new RegExp("_", "g"), ' ') + '</a>';
            }
            callback(imString);
          });
        }
        
        function secondsToDhms(seconds) {
          seconds = Number(seconds);
          var d = Math.floor(seconds / (3600*24));
          var h = Math.floor(seconds % (3600*24) / 3600);
          var m = Math.floor(seconds % 3600 / 60);
          var s = Math.floor(seconds % 60);

          var dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
          var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
          var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
          var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
          return dDisplay + hDisplay + mDisplay + sDisplay;
        }
        
        sortTable = function(n) {
          var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
          table = document.getElementById('outputTable').getElementsByTagName('tbody')[0];
          switching = true;
          //Set the sorting direction to ascending:
          dir = "asc"; 
          while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            for (i = 0; i < (rows.length - 1); i++) {
              shouldSwitch = false;
              x = rows[i].getElementsByTagName("TD")[n];
              y = rows[i + 1].getElementsByTagName("TD")[n];
              /*check if the two rows should switch place,
              based on the direction, asc or desc:*/
              if (n == 2){
              	if (dir == "asc") {
                  if (Number(x.innerHTML.slice(0,-1)) > Number(y.innerHTML.slice(0,-1))) {
                    shouldSwitch= true;
                    break;
                  }
                } else if (dir == "desc") {
                  if (Number(x.innerHTML.slice(0,-1)) < Number(y.innerHTML.slice(0,-1))) {
                    shouldSwitch = true;
                    break;
                  }
                }
              }
              else if (n == 0){
              	if (dir == "asc") {
                  if (x.innerHTML.split('alt="')[1].split('"')[0].toLowerCase() > y.innerHTML.split('alt="')[1].split('"')[0].toLowerCase()) {
                    shouldSwitch= true;
                    break;
                  }
                } else if (dir == "desc") {
                  if (x.innerHTML.split('alt="')[1].split('"')[0].toLowerCase() < y.innerHTML.split('alt="')[1].split('"')[0].toLowerCase()) {
                    shouldSwitch = true;
                    break;
                  }
                }
              }
              else if (n==3){
              	var name1 = rows[i].getElementsByTagName("TD")[0].innerHTML.split('alt="')[1].split('"')[0];
                var name2 = rows[i+1].getElementsByTagName("TD")[0].innerHTML.split('alt="')[1].split('"')[0]
              	if (dir == "asc") {
                  if (Number(monsters[name1][3]) > Number(monsters[name2][3])) {
                    shouldSwitch= true;
                    break;
                  }
                } else if (dir == "desc") {
                  if (Number(monsters[name1][3]) < Number(monsters[name2][3])) {
                    shouldSwitch = true;
                    break;
                  }
                }
              }
              else if (n == 1){
              	if (dir == "asc") {
                  if (rarity[x.innerHTML.split('alt="')[1].split('"')[0]] > rarity[y.innerHTML.split('alt="')[1].split('"')[0]]) {
                    shouldSwitch= true;
                    break;
                  }
                } else if (dir == "desc") {
                  if (rarity[x.innerHTML.split('alt="')[1].split('"')[0]] < rarity[y.innerHTML.split('alt="')[1].split('"')[0]]) {
                    shouldSwitch = true;
                    break;
                  }
                }
              }
            }
            if (shouldSwitch) {
              /*If a switch has been marked, make the switch
              and mark that a switch has been done:*/
              rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
              switching = true;
              //Each time a switch is done, increase this count by 1:
              switchcount ++;      
            } else {
              /*If no switching has been done AND the direction is "asc",
              set the direction to "desc" and run the while loop again.*/
              if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
              }
            }
          }
        }
        
         
        $('#rarity1,#element1,#book1').change(update_filter1);
        $('#rarity2,#element2,#book2').change(update_filter2);
	}
}());