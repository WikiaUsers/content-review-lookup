mw.hook('wikipage.content').add(function($content) {
	var huc = $content.find('#HelperUseCalculator')[0];
	if (!huc) return;

	var manaButton = document.createElement('input');
	manaButton.type = 'number';
	$content.find('#huc-mana')[0].append(manaButton);
	var userButton = document.createElement('input');
	userButton.type = 'number';
	$content.find('#huc-users')[0].append(userButton);
	var friends = $content.find('#huc-friends')[0];
	var nonfriends = $content.find('#huc-nonfriends')[0];

    $content.find('#huc-calculate')[0].addEventListener('click',function() {
		var mana = manaButton.value;
		var users = userButton.value;
		friends.innerHTML = Math.floor( (mana - users * 10) / (20 - 10) );
		nonfriends.innerHTML = Math.floor( (users * 20 - mana) / (20 - 10) );
    });
});