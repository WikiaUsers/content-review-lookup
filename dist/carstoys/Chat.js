//Chat options menu loaded from GitHub
mw.loader.load('https://raw.github.com/DoctorWhooves/Main/master/chat/Menu.js');



//WOW SUCH EDIT. VERY DO NOT. But seriously, This is a chat function.

$('[name="message"]').keypress(function(e) {
	if (e.which == 32 || e.which == 13) {
		switch (this.value) {
		case '/LMQLink': this.value = '[[Lightning McQueen]]';break;
		}
	}
});



$('[name="message"]').keypress(function(e) {
	if (e.which == 32 || e.which == 13) {
		switch (this.value) {
		case '/Welcome': this.value = 'Welcome to the Disney Cars Toys Wiki chat! Please read the [[Template:Chat Rules|chat rules]], And remember, No swearing, Spamming, Sockpuppeting, Or anything like that. You will be kicked and if you persist; You will be banned for 2 hours.';break;
		}
	}
});