// Sidebar Initialization
var settingsURL = 'http://community.wikia.com/api.php?action=parse&format=json&text=%7B%7BUser:' + encodeURI(wgUserName) + '/OasisSidebarGlobal%7D%7D';
var HelpLink = 'http://dev.wikia.com/wiki/OasisSidebar';
var RedirectToSettings = 'http://community.wikia.com/wiki/User:' + encodeURI(wgUserName) + '/OasisSidebarGlobal?action=edit';
var OasisSidebarCustom = decodeURIComponent(SidebarGetCookie('SidebarCustom', 0));
var BGColor = $('#WikiaPageBackground').css('background-color');
var TxtColor = $('body').css('color');
var OasisSidebarReady = false;
function OasisSidebar(){
    // Add CSS for Sidebar
    mw.util.addCSS('.sidebar { float: right; width: 13%; } .OasisSidebarElement { background: ' + BGColor + '; color: #000; padding: 10px; border-radius: 0px; margin-top: 15px; color: ' + TxtColor + '; border: 1px white solid; } .OasisSidebarElement ul { list-style-type: none; padding: 5px; } .OasisSidebarElement li { padding: 3px; } .OasisSidebarElement a { cursor: pointer } .sidebar { position: fixed; z-index: 1001; }');
    mw.util.addCSS('.OasisSidebarElement{ -webkit-box-shadow: -1px 0px 22px 0px rgba(0, 0, 0, 0.61); -moz-box-shadow: -1px 0px 22px 0px rgba(0, 0, 0, 0.61);box-shadow: -1px 0px 22px 0px rgba(0, 0, 0, 0.61); }');
    mw.util.addCSS('@import url("http://pl.maciekp42.wikia.com/load.php?mode=articles&articles=OasisSidebarFixed&only=styles");');
 
    // Move the WikiaPage
    if (wgCanonicalSpecialPageName != 'Chat') {
	$('#WikiaPage').css('margin', '0px');
        $('#WikiaPage').css('float', 'right');
        $('#WikiaPage').css('width', '85%');
        $('html').css('overflow-x', 'hidden');
    }
 
    // AJAX load the global Sidebar
    $.ajax({
	crossDomain: true,
        url: settingsURL,
	type: "POST",
	dataType: 'jsonp',
        success: function(data) {
            data=$(data['parse']['text']['*']);
            $('#GlobalOasisSidebarContent').html(data);
        },
	error: function() {
            $('#GlobalOasisSidebarContent').html("<p>Can't Connect to the Community Central</p>");
        }
    });
 
    // Some Statements
    if (OasisSidebarCustom == null || OasisSidebarCustom == "undefined") {
	OasisSidebarCustom = '<p>To edit your Custom Sidebar you need to click edit option!</p>';
    }
 
    //Append the Sidebar
    $('.WikiaSiteWrapper').append('<div class="sidebar"></div>');
    $('.sidebar').append('<div class="OasisSidebarElement"><div id="GlobalOasisSidebarContent"></div><p style="font-size: 60%; text-align: right;"><a href="' + RedirectToSettings + '">Edit</a></p></div>');
    $('.sidebar').append(' ');
    OasisSidebarReady = true;
}
 
// Sidebar Editor
function EditOasisSidebar(){
    var $oasisSidebarEditBox = $.showCustomModal( "Oasis Sidebar Editor", '<form method="" name="" class="WikiaForm "><p style="font-size: 100%">Need Help Editing? <a href="' + HelpLink + '">Click this</a></p><textarea id="OasisSidebarCustomCont" cols="72" rows="15">' + OasisSidebarCustom + '</textarea></form>', {
	id: "OasisSidebarCustomEditor",
	width: 600,
	buttons: [
	    {
		id: "cancel",
		message: "Cancel",
		handler: function () {
		    $('#OasisSidebarCustomEditor').closeModal();
		}
	    },
	    {
		id: "updateCookie",
		defaultButton: true,
		message: "Apply",
		handler: function () {
		    OasisSidebarCustom = $.trim($('#OasisSidebarCustomCont').val());
                    SidebarSetCookie('SidebarCustom', OasisSidebarCustom);
		    $('#OasisSidebarCustomEditor').closeModal();
		    location.reload();
		}
	    }
	]
    });
}
 
// Cookie Functions
function SidebarSetCookie(cookie_name, data){
    var domain = wgServer.split("//")[1];
	document.cookie =
	    cookie_name + "=" + encodeURIComponent(data) +
	    "; max-age=" + 60*60*24*150 +
	    "; path=/; domain=" + domain;
}
function SidebarGetCookie(cookie_name, pos){
    var x, y, cookie_array = document.cookie.split(";");
	for (var i=0; i < cookie_array.length; i++) {
	    x = cookie_array[i].substr(0,cookie_array[i].indexOf("="));
	    y = cookie_array[i].substr(cookie_array[i].indexOf("=")+1);
	    x = x.replace(/^\s+|\s+$/g,"");
	    if (x == cookie_name) {
	    	var style_objects = y.split(", ");
	    	return unescape(style_objects[pos]);
	    }
	}
}
addOnloadHook(OasisSidebar);