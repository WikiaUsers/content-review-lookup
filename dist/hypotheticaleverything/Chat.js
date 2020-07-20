// The following code is needed to mark bureaucrats and admins from chatmoderators in special:chat
// The following code is to be inserted to your wiki's Chat.js
// Mark admins and bureaucrats
setInterval(function(){
    "use strict";
    $('.User.chat-mod .username').each(function () {
 
        if (this.innerHTML.match(/Ultimate Dark Carnage/)) {
            $(this).parent().addClass('admin').removeClass('chat-mod');
        }
        if (this.innerHTML.match(/HypercaneTeen/)) {
            $(this).parent().addClass('founder').removeClass('chat-mod');
        }        
        if (this.innerHTML.match(/Sactage|TK\-999|Ajraddatz|TyA|Jr Mime|ゆ|Callofduty4|Cpl\.Bohater|KATANAGOD|Leviathan 89|Lord of Dark|Nifky|Deltaneos|Obi the LEGO Fan|Sactage|Ohmyn1|Pyrrha Omega|RansomTime|Sulfur|Vega Dark/)) {
            $(this).parent().addClass('VSTF').removeClass('chat-mod');
        } 
        if (this.innerHTML.match(/Yatalu|Aster09|Baakamono|Benfutbol10|Cizagna|Elseweyr|Flightmare|Jormun|Marco A|MissLarx|Nanaki|Paolino Paperino|Peternouv|Tommy6|Vuh|Wildream|Wyz|Zeist Antilles/)) {
            $(this).parent().addClass('Helper').removeClass('chat-mod');
        }      
    });
}, 1);

//All credit goes to Penguin-Pal
//Admins in chat//
AjaxPromote = {};
 
// functions
AjaxPromote.fn = {};
AjaxPromote.fn.getToken = function(user, n) {
	if (n > 0) {
		$.getJSON("/api.php?action=query&format=json&list=users&ustoken=userrights&ususers=" + encodeURIComponent(user), function(data) {
			var token = data.query.users[0].userrightstoken;
			console.log("Token: " + token);
			AjaxPromote.fn.makeAdmin(user, token);
		}).fail(function() {
			return AjaxPromote.fn.getToken(user, n-1);
		});
	} else {
		// errors in all attempts to get the token
		AjaxPromote.fn.error();
	}
}
AjaxPromote.fn.makeAdmin = function(user, token) {
	var reason = $("#promote-reason").val().length > 0 ? $("#promote-reason").val() : "Promoting user via [[Special:Chat]]";
	function loop(n) {
		$.ajax({
			type: "POST",
			url: "/api.php?action=userrights&user=" + encodeURIComponent(user) + "&token=" + encodeURIComponent(token) + "&add=" + AjaxPromote.fn.listgroup() + "&reason=" + encodeURIComponent(reason)
		}).done(function() {
			// success! close interface
			AjaxPromote.fn.close();
			$(".Chat:first ul").append('<li class="inline-alert">The promotion was successfully performed, or the user is already a member of these groups.</li>');
		}).fail(function() {
			if (n > 0) {
				return loop(n-1);
			} else {
				// error in all attempts to save the group
				AjaxPromote.fn.error();
			}
		});
	}
	loop(5);
}

AjaxPromote.fn.listgroup = function() {
	var s = [];
	$('input[name="promote-newrights"]:checked').each(function() {
		s.push($(this).val());
	});
	return s.join("|");
}
 
// close interface
AjaxPromote.fn.close = function() {
	$("section#promote")
		.removeClass("promote-visible")
		.find('input[type="text"]').val("");
	$('section#promote input[type="checkbox"]').each(function() {
		this.checked = false;
	});
}
 
// error
AjaxPromote.fn.error = function() {
	alert("There was an error promoting the given user. Please try again later or promote manually.");
}
 
// html
$("body").append(
	'<section id="promote">\n' +
		'\t<div>\n' +
			'\t\t<h2>Promote a user</h2>\n' +
			'\t\t<p>\n' +
				'\t\t\tUser to promote: <input type="text" placeholder="User" id="promote-user" /><br />\n' +
				'\t\t\tPromotion reason: <input type="text" placeholder="Reason" id="promote-reason" /><br />\n' +
				'\t\t\t<dl>\n' +
				'\t\t\t\t<dt>Make:</dt>\n' +
				'\t\t\t\t<dd><input type="checkbox" name="promote-newrights" value="sysop" /> Administrator</dd>\n' +
  			'\t\t\t<input type="button" class="wikia-button" value="Promote" id="promote-bt-ok" />&nbsp;' +
				'\t\t\t<input type="button" class="wikia-button" value="Cancel" id="promote-bt-cancel" />\n' +
			'\t\t</p>\n' +
		'\t</div>\n' +
	'</section>\n'
);

// css
mw.util.addCSS(
	'section#promote {' +
		'\tdisplay: none;\n' +
		'\tjustify-content: center;\n' +
		'\talign-items: center;\n' +
		'\twidth: 100%;\n' +
		'\theight: 100%;\n' +
		'\tposition: fixed;\n' +
		'\ttop: 0;\n' +
		'\tleft: 0;\n' +
		'\tbackground: rgba(0,0,0,0.35);\n' +
	'}\n' +
	'section#promote.promote-visible {\n' +
		'\tdisplay: flex;\n' +
	'}' +
	'section#promote > div {' +
		'\tpadding: 10px;\n' +
		'\tbackground: white;\n' +
		'\tborder: 1px solid black;\n' +
		'\ttext-align: left;\n' +
		'\tcolor: #333333;\n' +
	'}\n' +
	'section#promote inpit[type="text"] {' +
		'\twidth: 100px;\n' +
		'\theight: 20px;\n' +
		'\tline-height: 20px;\n' +
		'\tfont-size: 16px;\n' +
	'}'
);
 
// ok function
$("#promote-bt-ok").click(function() {
	if ($("#promote-user").val().length > 0) {
		AjaxPromote.fn.getToken($("#promote-user").val(), 5);
	} else {
		alert("Please insert a username.")
	}
});
 
// cancel function
$("#promote-bt-cancel").click(function() {
	AjaxPromote.fn.close();
});

// add button
$(".message").prepend('<input type="button" id="promote-open" style="position: absolute; top: 3px; right: 3px;" value="Give Admin Status" />');
$("#promote-open").click(function() {
	$("section#promote").addClass("promote-visible");
});