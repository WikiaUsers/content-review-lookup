$(document).ready(function() {
if (wgUserName === null) {
$("#entry_2079584507").val("#Auto: Anon#"); // username
} else {
$("#entry_2079584507").val(wgUserName); // username
}
});
// ------------------------

$(document).ready(function() {
$("#ajax-poll-1AF07AC1E55B7D12F5FDC852C3098667 #pollAnswer2 label").append("<a href='asfd'>hello link</a>");
});



if (wgPageName === "Welcomebotpage") {
//remove header
function welcomeToolEnableSwitch() {
if ($("#enableWelcomeTool").is(":checked")) {
$(".welcomeToolEnableSwitch").removeAttr("disabled");
} else {
$(".welcomeToolEnableSwitch").attr("disabled", "1");
}
}

$('select[name="welcomeToolSender"]').change(function () {
    if ($(this).val() == 'specificUser') {
        $('#specificUserValue').show();
    } else {
        $('#specificUserValue').hide();
    }
});

$(window).load(function() {
setTimeout(function() {
$("header#WikiaPageHeader").remove();
}, 3000);
$("#WikiaRail").remove();
$("#WikiaMainContentContainer").css("margin-right", "0");
//actual code start
var welcomeUser;

$(document).ready(function() {
// needs to be set for later
// enables/disables all options
welcomeUser = $("#value_WelcomeToolSender").text();
});
$(document).ready(function() {
if (welcomeUser === "@disabled") {
$(".page-" + wgPageName + " .welcomeToolEnableSwitch").attr("disabled", "1");
} else {
$("#enableWelcomeTool").prop("checked", true);
}
// ///////
});
});

function submitWelcomeToolSettings() {
edittoken = mw.user.tokens.values.editToken;

if ($("#enableWelcomeTool").is(":checked")) {
var $form = $("#WikiaMainContentContainer"),
welcomeToolSender = $form.find("#welcomeToolSender").val(),
specificUserValue = $form.find("#specificUserValue").val();
if (welcomeToolSender === "specificUser") {
welcomeToolSender_2 = specificUserValue;
} else {
welcomeToolSender_2 = welcomeToolSender;
}
//Post welcomeToolSender_2 later

$.post(wgServer + '/api.php?action=edit&title=' + encodeURIComponent('MediaWiki:Welcome-user') + '&text=' + encodeURIComponent(welcomeToolSender_2) + '&token=' + encodeURIComponent(edittoken) + '&summary=Welcome message sender updated', function() {
window.location.reload();
});

}
else 
{
$.post(wgServer + '/api.php?action=edit&title=' + encodeURIComponent('MediaWiki:Welcome-user') + '&text=' + encodeURIComponent('@disabled') + '&token=' + encodeURIComponent(edittoken) + '&summary=Welcome bot disabled', function() {
window.location.reload();
});
}
//
}
// wrap
}