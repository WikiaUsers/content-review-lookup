/*
 * PiniginsUserInfo.js (c) 2017-2019, Maksim Pinigin
 * Creates the "Special:UserInfo" page, which allows you to view a little information about the user
 */

function getUserInfo() {
    var username = $("#username_input").val();
    $("#userinfobody").html("");
    $.ajax({
        type: "get",
        url: "../api.php?action=query&list=users&ususers=" + username + "&usprop=registration%7Cgender%7Ceditcount%7Cblockinfo%7Cgroups&format=json",
        success: function(data) {
            if (username === "") {
                $("#userinfobody").append("<br><b>You must enter a user name</b>");
            } else {
                $("#userinfobody").append("<br>");
                $("#userinfobody").append("<b>User ID:</b> " + data.query.users[0].userid + "<br>");
                $("#userinfobody").append("<b>Username:</b> " + data.query.users[0].name + "<br>");
                $("#userinfobody").append("<b>Number of edits:</b> " + data.query.users[0].editcount + "<br>");
                if (data.query.users[0].registration !== null)
                $("#userinfobody").append("<b>Date of registration:</b> " + data.query.users[0].registration.replace('T', ' ').replace('Z', ' ') + "<br>");
                $("#userinfobody").append("<b>Gender:</b> " + data.query.users[0].gender + "<br>");
                $("#userinfobody").append("<b>Groups:</b> " + data.query.users[0].groups.join(', ') + "<br>");
            }
        }
    });
}

if (wgPageName.split(':')[1] == "UserInfo") {
    $('#mw-content-text').html("");
    document.title = "User information | " + wgSiteName + " | FANDOM powered by Wikia";
    $('.page-header__title').text("User information");
    $('#mw-content-text').append('<input id="username_input" name="username_input" type="text" placeholder="Username"> <button onClick="getUserInfo();">Get user information</button><br><div id="userinfobody"></div>');
    if (location.hash.replace("#", "") !== "") {
        $("#username_input").val(location.hash.replace("#", ""));
        getUserInfo();
    }
}

if(wgNamespaceNumber == 2 && wgPageName.indexOf("/") === -1) {
    var userName = wgPageName.split(':')[1];
    var urlWithHash = "./Special:UserInfo#" + userName;
    $('<li>', { id: "userinfo" })
    .html('<a href="' + urlWithHash + '">User information</a>')
    .prependTo('.toolbar .tools');
}