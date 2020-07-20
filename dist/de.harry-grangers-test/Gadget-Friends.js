

function getFriends(name) {

}

function getFriendsX(name) {
    _.findKey(friends,function(user) {
	return user.indexOf(name) != -1;
    });
}

function getFriendsList(callback) {
    $.getJSON()
}