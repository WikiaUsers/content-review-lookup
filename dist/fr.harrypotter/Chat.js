// Permet aux Mods et Admins d'expulser des utilisateurs avec /stupéfix <sonpseudo>
// if (wgUserGroups.indexOf('chatmoderator')!=-1 || wgUserGroups.indexOf('sysop')!=-1) {
//	createAlias('kick', 13, function(toKick,e) {
//		if ($('#WikiChatList [data-user="'+toKick+'"]').length) {
//			mainRoom.kick({name: toKick})
//		} else {
//			if (confirm(toKick + ' est parti. On essaie toujours de lui lancer un sort ?')) mainRoom.kick({name: toKick});
//		}
//		e.target.value = '';
//	});
//}

// Chat options
importScriptPage('ChatOptions/code.js', 'dev');

// The following code is needed to mark bureaucrats and admins from chatmoderators in special:chat
// The following code is to be inserted to your wiki's Chat.js
$("body").on("DOMNodeInserted", ".Chat > ul > li", function(el) {
    "use strict";
    $('.User.chat-mod .username').each(function () {
        if (this.innerHTML.match(/Nikolai Banks|SailStar/)) {
            $(this).parent().addClass('admin').removeClass('chat-mod');
        }
        if (this.innerHTML.match(/HypercaneTeen|King Shoot/)) {
            $(this).parent().addClass('bureaucrat').removeClass('chat-mod');
        }
        if (this.innerHTML.match(/CommanderPeepers/)) {
            $(this).parent().addClass('rollback').removeClass('chat-mod');
        } 
        if (this.innerHTML.match(/Sactage|TK-999|Ajraddatz|TyA|Jr Mime|?|Callofduty4|Cpl.Bohater|KATANAGOD|Leviathan 89|Lord of Dark|Nifky|Deltaneos|Obi the LEGO Fan|Sactage|Ohmyn1|Pyrrha Omega|RansomTime|Sulfur|Vega Dark/)) {
            $(this).parent().addClass('VSTF').removeClass('chat-mod');
        } 
        if (this.innerHTML.match(/Yatalu|Aster09|Baakamono|Benfutbol10|Cizagna|Elseweyr|Flightmare|Jormun|Marco A|MissLarx|Nanaki|Paolino Paperino|Peternouv|Tommy6|Vuh|Wildream|Wyz|Zeist Antilles/)) {
            $(this).parent().addClass('Helper').removeClass('chat-mod');
        }      
    });
});

/* promote admins via chat */
/*
	type "!sysop" to trigger
*/
 
if (("|" + mw.config.get("wgUserGroups").join("|") + "|").search(/\|bureaucrat\|/) > -1) { 
	// define object
	AjaxSysop = {};
 
	// functions
	AjaxSysop.fn = {};
	AjaxSysop.fn.getToken = function(user, n) {
		if (n > 0) {
			$.getJSON("/api.php?action=query&format=json&list=users&ustoken=userrights&ususers=" + encodeURIComponent(user), function(data) {
				var token = data.query.users[0].userrightstoken;
				console.log("Token: " + token);
				AjaxSysop.fn.makeAdmin(user, token);
			}).fail(function() {
				return AjaxSysop.fn.getToken(user, n-1);
			});
		} else {
			// errors in all attempts to get the token
			AjaxSysop.fn.error();
		}
	}
	AjaxSysop.fn.makeAdmin = function(user, token) {
		var reason = $("#sysop-promote-reason").val().length > 0 ? $("#sysop-promote-reason").val() : "Promoting user via [[Special:Chat]]";
		function loop(n) {
			$.ajax({
				type: "POST",
				url: "/api.php?action=userrights&user=" + encodeURIComponent(user) + "&token=" + encodeURIComponent(token) + "&add=sysop&reason=" + encodeURIComponent(reason)
			}).done(function() {
				// success! close interface
				AjaxSysop.fn.close();
				$(".Chat:first ul").append('<li class="inline-alert">The promotion was succesfully performed, or the user is already an admin.</li>');
			}).fail(function() {
				if (n > 0) {
					return loop(n-1);
				} else {
					// error in all attempts to save the group
					AjaxSysop.fn.error();
				}
			});
		}
		loop(5);
	}
 
	// close interface
	AjaxSysop.fn.close = function() {
		$("section#sysop-promote")
			.hide()
			.find('input[type="text"]').val("")
	}
 
	// error
	AjaxSysop.fn.error = function() {
		alert("There was an error promoting the given user. Please try again later or promote manually.");
	}
 
	// html
	$("body").append(
		'<section id="sysop-promote">\n' +
			'\t<div>\n' +
				'\t\t<h2>Promote an admin</h2>\n' +
				'\t\t<p>\n' +
					'\t\t\tUser to promote: <input type="text" id="sysop-promote-user" /><br />\n' +
					'\t\t\tPromotion reason: <input type="text" placeholder="Promoting user via [[Special:Chat]]" id="sysop-promote-reason" /><br />\n' +
					'\t\t\t<input type="button" class="wikia-button" value="Promote" id="sysop-promote-bt-ok" />&nbsp;' +
					'\t\t\t<input type="button" class="wikia-button" value="Cancel" id="sysop-promote-bt-cancel" />\n' +
				'\t\t</p>\n' +
			'\t</div>\n' +
		'</section>\n'
	);
 
	// css
	mw.util.addCSS(
		'section#sysop-promote {' +
			'\tdisplay: none;\n' +
			'\twidth: 100%;\n' +
			'\theight: 100%;\n' +
			'\tposition: fixed;\n' +
			'\ttop: 0;\n' +
			'\tleft: 0;\n' +
			'\tbackground: rgba(0,0,0,0.35);\n' +
		'}\n' +
		'section#sysop-promote > div {' +
			'\twidth: 300px;\n' +
			'\theight: 100px;\n' +
			'\tposition: fixed;\n' +
			'\ttop: ' + (($(window).height() - 122) / 2) + 'px;\n' +
			'\tleft: ' + (($(window).width() - 322) / 2) + 'px;\n' +
			'\tpadding: 10px;\n' +
			'\tbackground: white;\n' +
			'\tborder: 1px solid black;\n' +
			'\ttext-align: left;\n' +
			'\tcolor: #333333;\n' +
		'}\n' +
		'section#sysop-promote inpit[type="text"] {' +
			'\twidth: 100px;\n' +
			'\theight: 20px;\n' +
			'\tline-height: 20px;\n' +
			'\tfont-size: 16px;\n' +
		'}'
	);
 
	// ok function
	$("#sysop-promote-bt-ok").click(function() {
		if ($("#sysop-promote-user").val().length > 0) {
			AjaxSysop.fn.getToken($("#sysop-promote-user").val(), 5);
		}
	});
 
	// cancel function
	$("#sysop-promote-bt-cancel").click(function() {
		AjaxSysop.fn.close();
	});
 
	// trigger when message is "!sysop"
	$('textarea[name="message"]').keydown(function() {
		if ($(this).val() == "!sysop") {
			$(this).val("");
			$("section#sysop-promote").show();
		}
	});
}