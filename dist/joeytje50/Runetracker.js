//Automatic updating, closing window after done updating. Credits: Joeytje50.

if (document.location.search && document.location.search.match('user=')) { //Only run script when the user has entered ?user=USERNAME.
	var users = document.location.search.match(/user=[^&]+/)[0].replace('user=','').split(',')
	for (var i=0;i<users.length;i++) {
		$.getJSON('http://anyorigin.com/get?url=http%3A//runetracker.org/updateUser.php%3Fuser%3D'+users[i]+'&callback=?', function(data){
			document.all.process.innerHTML++
			if (parseInt($('#process').html()) == users.length) {
				window.open('', '_self', '');
				window.close();
			}
		});
	}
}