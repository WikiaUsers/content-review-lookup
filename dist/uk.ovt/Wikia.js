/* "Случайный" фон для вики */

function randomBack () {
    var opts = [
'',

'https://images.wikia.nocookie.net/__cb20131108105739/voennaya-tekhnika/ru/images/3/38/Background1.jpg',
		
'https://images.wikia.nocookie.net/uk.metro2033.zewiki.com/images/m/metro2033/uk/images/3/32/Metro_Last_Light_10.jpg',

'https://images.wikia.nocookie.net/voennaya-tekhnika/ru/images/4/49/Background3.jpg',

'https://images.wikia.nocookie.net/__cb20131114140131/ovt/uk/images/f/ff/Vozdywn_Boy_02.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/0/06/225760-stranger.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/9/90/Avianosec_001.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/d/d6/BMD-40272.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/2/2f/Avianosec_002.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/3/37/Leopard_2_A4_.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/1/1d/KV-85_001.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/e/e9/KV-1_100.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/c/c2/Jagdpanther_01.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/0/0a/IT-28_001.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/1/1d/I_16_01.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/a/a8/GAZ_AAA_001.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/1/1b/Macchi_Mc202.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/4/4c/Merkava_01.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/f/f9/Messerschmitt_Bf_109_001.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/e/e9/Panther_II_Pz.Kpfw._VI_Tiger_%28P%29_E-25.jpg',

'https://images.wikia.nocookie.net/ovt/uk/images/3/37/Panzer_Vll_01.jpg' ,

                 ];
	
	if (wgPageName=='Main_Page') {
		$('body').css('background-image','url(' + opts[0] + ')');
		$('body').css('background-size','100%'); 
	}
	else
		$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random()+1)] + ')'); 
}
 
$(randomBack);