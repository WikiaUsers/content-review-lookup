
//Spoiler Blackout:
/*
(function($) {
    $('.spoiler').css({"background": "black", "color": "black"});
    $('.spoiler a').css({"background": "black", "color": "black"});
 
    $('.spoiler').mouseenter(function() {
        $(this).css({"background": "transparent", "color": ""});
        $(this).find("a").css({"background": "transparent", "color": ""});
    });
 
    $('.spoiler').mouseout(function() {
        $(this).css({"background": "black", "color": "black"});
        $(this).find("a").css({"background": "transparent", "color": "inherit"});
    });
}(this.jQuery));
*/

//Popup welcome messages:
//Original popup code provided by Princess Platinum, see Thread:2289
//Improvements by Trescott2000
//New Visitor, and Not Logged In:
if (wgUserName == null && localStorage.UserSeenBefore != "true" && sessionStorage.SeenIt != "true") {
    sessionStorage.SeenIt = "true";
    localStorage.UserSeenBefore = "true";
    $.get("http://slime-forest-adventure.wikia.com/wiki/Slime_Forest_Adventure_Wiki:UserMessages",function(data,status){
        var messageTitle= $("#NewNotLoggedIn-messageTitle", data).html();
        var messageBody = $("#NewNotLoggedIn-messageBody", data).html();
        $.showCustomModal(messageTitle, '<form class="WikiaForm" method="" name=""><fieldset>' + messageBody + '</feildset ></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "Okay, I am ready to continue!",
                handler: function () {
                    $('#newuser-modal').closeModal();
                }
            }]
        });
    });
}
//New Visitor, and Is Logged In
if (wgUserName != null && localStorage.UserSeenBefore != "true" && sessionStorage.SeenIt != "true") {
    localStorage.BeenLoggedInBefore = "true";
    localStorage.UserSeenBefore = "true";
    sessionStorage.SeenIt = "true";
    $.get("http://slime-forest-adventure.wikia.com/wiki/Slime_Forest_Adventure_Wiki:UserMessages",function(data,status){
        var messageTitle= $("#NewIsLoggedIn-messageTitle", data).html();
        var messageBody = $("#NewIsLoggedIn-messageBody", data).html();
        $.showCustomModal(messageTitle, '<form class="WikiaForm" method="" name=""><fieldset>' + messageBody + '</feildset ></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "Okay, I am ready to continue!",
                handler: function () {
                    $('#newuser-modal').closeModal();
                }
            }]
        });
    });
}
// Returning Visitor, and Not Logged In (and never has been)
if (wgUserName == null && localStorage.UserSeenBefore == "true" && localStorage.BeenLoggedInBefore != "true" && sessionStorage.SeenIt != "true") {
    sessionStorage.SeenIt = "true";
    $.get("http://slime-forest-adventure.wikia.com/wiki/Slime_Forest_Adventure_Wiki:UserMessages",function(data,status){
        var messageTitle= $("#ReturningNotLoggedIn-messageTitle", data).html();
        var messageBody = $("#ReturningNotLoggedIn-messageBody", data).html();
        $.showCustomModal(messageTitle, '<form class="WikiaForm" method="" name=""><fieldset>' + messageBody + '</feildset ></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "Okay, I am ready to continue!",
                handler: function () {
                    $('#newuser-modal').closeModal();
                }
            }]
        });
    });
}
// Returning Visitor, and Not Logged In but has logged in before
// disabled
if ("true" == "false" && wgUserName == null && localStorage.UserSeenBefore == "true" && localStorage.BeenLoggedInBefore == "true" && sessionStorage.SeenIt != "true") {
    sessionStorage.SeenIt = "true";
    $.get("http://slime-forest-adventure.wikia.com/wiki/Slime_Forest_Adventure_Wiki:UserMessages",function(data,status){
        var messageTitle= $("#ReturningForgotToLogin-messageTitle", data).html();
        var messageBody = $("#ReturningForgotToLogin-messageBody", data).html();
        $.showCustomModal(messageTitle, '<form class="WikiaForm" method="" name=""><fieldset>' + messageBody + '</feildset ></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "Okay, I am ready to continue!",
                handler: function () {
                    $('#newuser-modal').closeModal();
                }
            }]
        });
    });
}
//Returning Visitor, Is Logged In
//disabled
if ("false" == "true" && wgUserName != null && localStorage.UserSeenBefore != "true" && sessionStorage.SeenIt !== "true") {
    localStorage.BeenLoggedInBefore = "true";
    sessionStorage.SeenIt = "true";
    $.get("http://slime-forest-adventure.wikia.com/wiki/Slime_Forest_Adventure_Wiki:UserMessages",function(data,status){
        var messageTitle= $("#ReturningNotLoggedIn-messageTitle", data).html();
        var messageBody = $("#ReturningNotLoggedIn-messageBody", data).html();
        $.showCustomModal(messageTitle, '<form class="WikiaForm" method="" name=""><fieldset>' + messageBody + '</feildset ></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "Okay, I am ready to continue!",
                handler: function () {
                    $('#newuser-modal').closeModal();
                }
            }]
        });
    });
}