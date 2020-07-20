/* Any JavaScript here will be loaded for all users on every page load. */

$(document).ready(function() {
    if (mediaWiki.config.get('wgPageName') === "Modèle:Troupes") {
                document.getElementById('Attaque').innerHTML = '8';
		document.getElementById('Defense').innerHTML = '45';
		document.getElementById('Cout').innerHTML = '25';
		document.getElementById('Vitesse').innerHTML = 'Vitesse = 16';
		var res = document.getElementById('Attaque').innerHTML;
                var vite = document.getElementById('Vitesse').innerHTML;
                var speed = vite.split("=",2);
		$('#level1').click(function() {
			document.getElementById('Attaque').innerHTML = '8';
			document.getElementById('Defense').innerHTML = '45';
			document.getElementById('Cout').innerHTML = '25';                        
                        res = document.getElementById('Attaque').innerHTML;
		});
		$('#level2').click(function() {
			document.getElementById('Attaque').innerHTML = '11';
			document.getElementById('Defense').innerHTML = '54';
			document.getElementById('Cout').innerHTML = '40';                     
                        res = document.getElementById('Attaque').innerHTML;
		});
		$('#level3').click(function() {
			document.getElementById('Attaque').innerHTML = '14';
			document.getElementById('Defense').innerHTML = '65';
			document.getElementById('Cout').innerHTML = '60';                  
                        res = document.getElementById('Attaque').innerHTML;
		});
		$('#level4').click(function() {
			document.getElementById('Attaque').innerHTML = '18';
			document.getElementById('Defense').innerHTML = '78';
			document.getElementById('Cout').innerHTML = '80';                   
                        res = document.getElementById('Attaque').innerHTML;
		});
		$('#level5').click(function() {
			document.getElementById('Attaque').innerHTML = '23';
			document.getElementById('Defense').innerHTML = '95';
			document.getElementById('Cout').innerHTML = '100';                 
                        res = document.getElementById('Attaque').innerHTML;
		});
		$('#level6').click(function() {
			document.getElementById('Attaque').innerHTML = '26';
			document.getElementById('Defense').innerHTML = '110';
			document.getElementById('Cout').innerHTML = '150';                   
                        res = document.getElementById('Attaque').innerHTML;
 
		});
                $('#rage1').click(function() {
			document.getElementById('Attaque').innerHTML = Math.round(1000*res*1.3)/1000;
			document.getElementById('Vitesse').innerHTML = speed[0] + "= " + Math.round(parseInt(speed[1])+20);
		});
                $('#rage2').click(function() {
			document.getElementById('Attaque').innerHTML = Math.round(1000*res*1.4)/1000;
			document.getElementById('Vitesse').innerHTML = speed[0] + "= " + Math.round(parseInt(speed[1])+22);
		});
                $('#rage3').click(function() {
			document.getElementById('Attaque').innerHTML = Math.round(1000*res* 1.5)/1000;
			document.getElementById('Vitesse').innerHTML = speed[0] + "= " + Math.round(parseInt(speed[1])+24);
		});
                $('#rage4').click(function() {
			document.getElementById('Attaque').innerHTML = Math.round(1000*res* 1.6)/1000;
			document.getElementById('Vitesse').innerHTML = speed[0] + "= " + Math.round(parseInt(speed[1])+26);
		});
                $('#rage5').click(function() {
			document.getElementById('Attaque').innerHTML = Math.round(1000*res* 1.7)/1000;
			document.getElementById('Vitesse').innerHTML = speed[0] + "= " + Math.round(parseInt(speed[1])+28);
		});
                $('#rage0').click(function() {
			document.getElementById('Attaque').innerHTML = res;
			document.getElementById('Vitesse').innerHTML = speed[0] + "= " + Math.round(speed[1]);
		});
	}
});