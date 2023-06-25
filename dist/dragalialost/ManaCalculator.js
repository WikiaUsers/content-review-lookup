mw.hook('wikipage.content').add(function() {
	var huc = document.getElementById('HelperUseCalculator');
	if (!huc) return;
	
	var manaButton = document.createElement('input');
	manaButton.type = 'number';
	document.getElementById('huc-mana').append(manaButton);
	var userButton = document.createElement('input');
	userButton.type = 'number';
	document.getElementById('huc-users').append(userButton);
	var friends = document.getElementById('huc-friends');
	var nonfriends = document.getElementById('huc-nonfriends');

    document.getElementById('huc-calculate').addEventListener('click',function() {
		var mana = manaButton.value;
		var users = userButton.value;
		friends.innerHTML = Math.floor( (mana - users * 10) / (20 - 10) );
		nonfriends.innerHTML = Math.floor( (users * 20 - mana) / (20 - 10) );
    });
});