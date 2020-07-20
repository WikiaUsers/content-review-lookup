/**
* @author: Flightmare (http://elderscrolls.wikia.com/wiki/User:Flightmare)
* @version: 1.0
* @license: CC-BY-SA 3.0
* @description: Imports biography from discussions to ns:2 if no profile page is present.
*/

//replace redlink placeholder with discussions bio.
function addDProfile(text) {
    var content = document.getElementsByClassName("noarticletext")[0];
    content.innerHTML = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
}

function getUserBio(userId) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var arr = JSON.parse(request.responseText);
            if (Boolean(arr.value)) { //Only continue if there is an actual bio written.
                addDProfile(arr.value);
            }
        }
    };
    request.open("GET", "https://services.wikia.com/user-attribute/user/" + userId + "/attr/bio", true);
    request.send();
}

//Is there a better way to get the user id?
function getUserIdByName(username) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var arr = JSON.parse(request.responseText);
            userId = arr["query"]["allusers"][0].id;
            if (Boolean(userId)) {
                getUserBio(userId);
            }
        }
    };
    request.open("GET", "/api.php?action=query&list=allusers&aufrom=" + username + "&format=json&aulimit=1", true);
    request.send();
}

function createDProfiles() {
    if (wgNamespaceNumber == 2) {
        //Test if profile page exists (we want this to 404)
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 404) {
                var username = wgTitle
                getUserIdByName(username);
            }
        };
        request.open("GET", "/wiki/" + wgPageName, true);
        request.send();
    }
}

addOnloadHook(createDProfiles);