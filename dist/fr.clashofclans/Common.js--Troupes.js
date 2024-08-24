/* Bouton Rage sur les pages troupes */
/* Dernière MAJ le 02 Juillet 2017 */
$(document).ready(function() {
        $('#Fermer').click(function() {
        $('#Tableau').fadeOut(3000);
        });
	var defaul,speed,vite,res;
	var ragees = 1;
	function formatMillier( nombre){
		nombre += '';
		var sep = ' ';
		var reg = /(\d+)(\d{3})/;
		while( reg.test( nombre)) {
			nombre = nombre.replace( reg, '$1' +sep +'$2');
		}
	return nombre;
	}
	function rage(rages) {
				switch (rages) {
				case 1:
					document.getElementById('Attaque').innerHTML = res;
					document.getElementById('Vitesse').innerHTML = speed[0] + "= " + Math.round(speed[1]);
					break;
				default:
					document.getElementById('Attaque').innerHTML = formatMillier(Math.round(1000*res*((rages / 10) + 2.1)/1000));
					document.getElementById('Vitesse').innerHTML = speed[0] + "= " + Math.round(parseInt(speed[1])+(20+2*((rages - 1) - 1)));
					break;
			}
			ragees = rages;
			var liste = document.getElementById('rage').getElementsByTagName('div');
			for (i = 0;i < liste.length;i++) {
				liste[i].style.backgroundImage = defaul;
				liste[i].style.borderColor = "#fe7e03";
			}
			liste[rages - 1].style.background = "red";
			liste[rages - 1].style.borderColor = "red";
	}
		function niveau(level) {
			var liste = document.getElementById('level').getElementsByTagName('div');
			for (i = 0;i < liste.length;i++) {
				liste[i].style.backgroundImage = defaul;
				liste[i].style.borderColor = "#fe7e03";
			}
			liste[level - 1].style.background = "red";
			liste[level - 1].style.borderColor = "red";
			document.getElementById('Vitesse').innerHTML = 'Vitesse = ' + speed[1];
			document.getElementById('Attaque').innerHTML = res;
			rage(ragees);
		}
	var cout = {
		//Barbare:"25,40,60,100,150,200,250",
		//Archer:"50,80,120,200,300,400,500",
		//Gobelin:"25,40,60,80,100,150,200",
		//Géant:"250,750,1250,1750,2250,3000,3500,4000",
		//Sapeur:"1000,1500,2000,2500,3000,3500,4000",
		//Ballon:"2000,2500,3000,3500,4000,4500,5000",
		//Sorcier:"1500,2000,2500,3000,3500,4000,4500,5000",
		//Guérisseuse:"5000,6000,8000,10000,15000",
		//Dragon:"25000,29000,33000,37000,42000,46000",
		//PEKKA:"28000,32000,36000,40000,45000,50000",
		//Bébé_dragon:"15000,16000,17000,18000,19000",
		//Mineur:"4200,4800,5200,5600,6000",
		//Gargouille:"6,7,8,9,10,11,12",
		//Chevaucheur_de_cochon:"40,45,52,58,65,90,115",
		//Valkyrie:"70,100,130,160,190",
		//Golem:"450,525,600,675,750,825",
        //Sorcière:"250,350,450",
        //Molosse_de_lave:"390,450,510,570",
		//Bouliste:"130,150,170"
	};
	var hp = {
		//Barbare:"45,54,65,78,95,110,125",
		Archer:"20,23,28,33,40,44,48",
		Gobelin:"25,30,36,43,52,68,74",
		Géant:"300,360,430,520,670,940,1100,1260",
		Sapeur:"20,24,29,35,42,54,62",
		Ballon:"150,180,216,280,390,545,690",
		Sorcier:"75,90,108,130,156,175,190,210",
		Guérisseuse:"500,600,840,1176,1500",
		Dragon:"1900,2100,2300,2600,2900,3200",
		PEKKA:"2800,3100,3500,4000,4500,5000",
		Bébé_dragon:"1200,1300,1400,1500,1600",
		//Mineur:"550,610,670,730,800",
		Gargouille:"55,60,66,72,78,84,90",
		Chevaucheur_de_cochon:"270,312,360,415,480,590,700",
		Valkyrie:"750,800,850,900,1100",
		Golem:"4500,5000,5500,6000,6300,6600",
		Sorcière:"270,300,330",
        Molosse_de_lave:"5700,6200,6700,7200",
		Bouliste:"290,310,350",
	};
	var attaque = {
		//Barbare:"8,11,14,18,23,26,30",
		Archer:"7,9,12,16,20,22,25",
		Gobelin:"11,14,19,24,32,42,52",
		Géant:"11,14,19,24,31,43,50,57",
		Sapeur:"12,16,24,32,46,60,78",
		Ballon:"25,32,48,72,108,162,198",
		Sorcier:"50,70,90,125,170,185,200,215",
		Guérisseuse:"35,42,55,71,90",
		Dragon:"140,160,180,210,240,270",
		PEKKA:"240,270,310,360,410,460",
		Bébé_dragon:"75,85,95,105,115",
		//Mineur:"80,88,96,104,112",
		Gargouille:"35,38,42,46,50,54,58",
		Chevaucheur_de_cochon:"60,70,80,92,105,118,135",
		Valkyrie:"94,106,119,133,148",
		Golem:"38,42,46,50,54,58",
		Sorcière:"50,60,70",
        Molosse_de_lave:"10,12,14,16",
		Bouliste:"65,75,85",
	};
	var vitesse = {
		//Barbare:"16",
		Archer:"24",
		Gobelin:"32",
		Géant:"12",
		Sapeur:"24",
		Ballon:"10",
		Sorcier:"16",
		Guérisseuse:"16",
		Dragon:"16",
		PEKKA:"16",
		Bébé_dragon:"16",
		//Mineur:"20",
		Gargouille:"32",
		Chevaucheur_de_cochon:"24",
		Valkyrie:"24",
		Golem:"12",
		Sorcière:"12",
        Molosse_de_lave:"20",
		Bouliste:"14"
	};
        var id = wgPageName;
        if (wgPageName == "P.E.K.K.A") {
         id = "PEKKA";
        }
        if (!cout[id]) {
         return;
        }
	var cost = cout[id].split(",");
	for (i = 7; i > cost.length; i--) {
		document.getElementById('level' + i).style.display = "none";
	}
	var hitpoints = hp[id].split(",");
	var shot = attaque[id].split(",");
	document.getElementById('Cout').innerHTML = formatMillier(cost[0]);
	document.getElementById('Defense').innerHTML = formatMillier(hitpoints[0]);
	document.getElementById('Attaque').innerHTML = shot[0];
	document.getElementById('Vitesse').innerHTML = 'Vitesse = ' + vitesse[id];
	res = document.getElementById('Attaque').innerHTML;
	vite = document.getElementById('Vitesse').innerHTML;
	speed = vite.split('=',2);
	defaul = document.getElementById('level1').style.backgroundImage;
        niveau(1);
        rage(1);
	$('#level .button').click(function() {
		document.getElementById('Cout').innerHTML = formatMillier(cost[this.innerHTML - 1]);
		document.getElementById('Defense').innerHTML = formatMillier(hitpoints[this.innerHTML - 1]);
		document.getElementById('Attaque').innerHTML = shot[this.innerHTML - 1];
		res = document.getElementById('Attaque').innerHTML;
		niveau(this.innerHTML);
	});
                $('#rage1').click(function() {
                        rage(2);
		});
                $('#rage2').click(function() {
                        rage(3);
		});
                $('#rage3').click(function() {
                        rage(4);
		});
                $('#rage4').click(function() {
                        rage(5);
		});
                $('#rage5').click(function() {
                        rage(6);
		});
                $('#rage0').click(function() {
                        rage(1);
		});
	});