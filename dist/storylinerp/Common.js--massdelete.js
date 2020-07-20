/* Any JavaScript here will be loaded for all users on every page load. */
var mass_delete = (function (api) {
    var token = sessionStorage.getItem("DeleteToken"),
        onready = function () {
            if (this.readyState === 4 && this.status === 200) {
                var i, xhr, a = JSON.parse(this.responseText).query.usercontribs,
                    onready = function () {
                        if (this.readyState === 4 && this.status === 200
                            && this.responseText.indexOf("error") > -1) {
                            console.log(JSON.parse(this.responseText));
                        }
                    },
                    query = "format=json&action=delete&token=" + sessionStorage.getItem("DeleteToken") + "&title=";
                for (i = 0; i < a.length; i = i + 1) {
                    if (a[i].hasOwnProperty("new")) {
                        xhr = new XMLHttpRequest();
                        xhr.open("POST", api, true);
                        xhr.onreadystatechange = onready;
                        xhr.setRequestHeader("Content-Type",
                            "application/x-www-form-urlencoded");
                        xhr.send(query + encodeURIComponent(a[i].title));
                    }
                }
            }
        },
        query = api +
            "?format=json&action=query&list=usercontribs&uclimit=500" +
            (wgUserGroups.indexOf("sysop") > -1 ? "0" : "") + "&ucuser=",
        getDeleteToken = (function () {
            var onready = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        token = this.responseXML.getElementsByTagName("page")[0]
                            .getAttribute("deletetoken").replace(/\+/, "%2B");
                        sessionStorage.setItem("DeleteToken", token);
                    }
                },
                query = api +
                    "?format=xml&action=query&prop=info&intoken=delete&titles=A";
            return function () {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", query, false);
                xhr.onreadystatechange = onready;
                xhr.send();
            };
        }());
    return function (user, ns) {
        getDeleteToken();
        var xhr = new XMLHttpRequest();
        xhr.open("GET", query + encodeURIComponent(user) + '&ucnamespace=' + ns, true);
        xhr.onreadystatechange = onready;
        xhr.send();
    };
}(wgScriptPath + "/api.php"));
 
if(wgPageName == ' Storyline_RP_Wiki:MassDelete') {
    $(function() {
 
	function delete_submit() {
		$('#delete_submit').attr('disabled', 'disabled').val('Loading...');
		var user = $.trim($('#user').val());
		var ns = $.trim($('#ns').val());
		mass_delete(user, ns);
		alert(user + "'s contributions in namespace: " + ns + " have been deleted.");
	}
 
        var $div = $('#delete_header');
	var $form = $('<form />');
        $form.submit(delete_submit);
	$form.append($('<h4 />').text("Delete a user's contributions:"));
 
	var $p1 = $('<p />').append("Enter a user's username or IP address in the form below, and select a namespace. All of the pages that this user created in the specified namespace will be deleted upon submitting the form.");
	$form.append($p1);
 
	var $p2 = $('<p />');
	$p2.append($('<label />').attr({'for': 'user'}).text('Username:'));
	$p2.append($('<input />').attr({'id': 'user', 'type': 'text', 'size': 9}));
	$p2.append($('<label />').attr({'for': 'ns'}).text('Namespace:'));
	$p2.append($('<input />').attr({'id': 'ns', 'type': 'text', 'size': 3}));
	$p2.append($('<input />').css({'margin': '0 1em 0 1em'}).attr({'id': 'delete_submit', 'type': 'submit'}).val('Submit'));
	$form.append($p2);
 
	if ($div != null) {
		$div.empty().append($form);
	}
    });
}