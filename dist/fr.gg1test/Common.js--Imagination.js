$(document).ready(function() {
        $('#Fermer').click(function() {
        $('#Tableau').fadeOut(3000);
        });
	var defaul,speed,vite,res,border;
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
					document.getElementById('Attaque').innerHTML = Math.round(1000*res*((rages / 10) + 1.1)/1000);
					document.getElementById('Vitesse').innerHTML = speed[0] + "= " + Math.round(parseInt(speed[1])+(20+2*((rages - 1) - 1)));
					break;
			}
			ragees = rages;
			var liste = document.getElementById('rage').getElementsByTagName('div');
			for (i = 0;i < liste.length;i++) {
				liste[i].style.backgroundImage = defaul;
				liste[i].style.borderColor = border;
			}
			liste[rages - 1].style.background = "red";
			liste[rages - 1].style.borderColor = "red";
	}
		function niveau(level) {
			var liste = document.getElementById('level').getElementsByTagName('div');
			for (i = 0;i < liste.length;i++) {
				liste[i].style.backgroundImage = defaul;
				liste[i].style.borderColor = border;
			}
			liste[level - 1].style.background = "red";
			liste[level - 1].style.borderColor = "red";
			document.getElementById('Vitesse').innerHTML = 'Vitesse = ' + speed[1];
			document.getElementById('Attaque').innerHTML = res;
			rage(ragees);
		}
	var cout = {
		Barbare:"25,40,60,80,100,150,200",
		Archer:"50,80,120,160,200,300,400",
		Gobelin:"25,40,60,80,100,150",
		Géant:"500,1000,1500,2000,2500,3000",
		Sapeur:"1000,1500,2000,2500,3000,3500",
		Ballon:"2000,2500,3000,3500,4000,4500",
		Sorcier:"1500,2000,2500,3000,3500,4000",
		Guérisseuse:"5000,6000,8000,10000",
		Dragon:"25000,30000,36000,42000",
		PEKKA:"30000,35000,42000,45000,50000",
		Serviteur:"6,7,8,9,10,11",
		Chevaucheur_de_cochon:"40,45,52,58,65",
		Valkyrie:"70,100,130,160",
		Golem:"450,525,600,675,750",
		Sorcière:"250,350"
	};
	var hp = {
		Barbare:"45,54,65,78,95,110,220",
		Archer:"20,23,28,33,40,44,88",
		Gobelin:"25,30,36,43,52,68",
		Géant:"300,360,430,520,670,940",
		Sapeur:"20,24,29,35,42,54",
		Ballon:"150,180,216,280,390,545",
		Sorcier:"75,90,108,130,156,164",
		Guérisseuse:"500,600,840,1176",
		Dragon:"1900,2100,2300,2500",
		PEKKA:"2800,3100,3500,4000,4500",
		Serviteur:"55,60,66,72,78,84",
		Chevaucheur_de_cochon:"270,312,360,415,475",
		Valkyrie:"900,1000,1100,1200",
		Golem:"4500,5000,5500,6000,6300",
		Sorcière:"75,100"
	};
	var attaque = {
		Barbare:"8,11,14,18,23,26,32",
		Archer:"7,9,12,16,20,22,26",
		Gobelin:"11,14,19,24,32,42",
		Géant:"11,14,19,24,31,43",
		Sapeur:"12,16,24,32,46,60",
		Ballon:"25,32,48,72,108,162",
		Sorcier:"50,70,90,125,170,180",
		Guérisseuse:"35,42,55,71",
		Dragon:"140,160,180,200",
		PEKKA:"240,270,300,340,380",
		Serviteur:"35,38,42,46,50,54",
		Chevaucheur_de_cochon:"60,70,80,92,105",
		Valkyrie:"88,99,111,124",
		Golem:"38,42,46,50,54",
		Sorcière:"25,30"
	};
	var vitesse = {
		Barbare:"16",
		Archer:"24",
		Gobelin:"32",
		Géant:"12",
		Sapeur:"24",
		Ballon:"10",
		Sorcier:"16",
		Guérisseuse:"16",
		Dragon:"16",
		PEKKA:"16",
		Serviteur:"32",
		Chevaucheur_de_cochon:"24",
		Valkyrie:"24",
		Golem:"12",
		Sorcière:"12"
	};
        var id = wgPageName;
        if (wgPageName == "P.E.K.K.A") {
         id = "PEKKA";
        }
        if (!cout[id]) {
         return false;
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
        border = document.getElementById('level1').style.borderColor;
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