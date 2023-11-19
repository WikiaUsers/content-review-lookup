/* Any JavaScript here will be loaded for all users on every page load. */

/* ====================================================================== *\
	# hide toc for [[template:hidetoc]]
\* ====================================================================== */
 
if ($(".hidetoc").length > 0) {
	$(document).ready(function() {
		$("#toc").addClass("tochidden");
		$("#toc td > ul").css("display","none");
		$("#toc .toctoggle a").text("show");
	});
}

$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
 });

/* ====================================================================== */

/*
(function() {
    function image() {
        $("span.player-card-image").each(function() {
            var a = $.parseJSON($(this).attr("data-search")),
                b = Number(a.size) > 0 ? Number(a.size) : 60;
            if (a.id != "undefined") {
                $(this).replaceWith(
                    '<img src="https://avatar.cprewritten.net/paperdoll.php?swid=%7B' + a.id + '%7D" width="' + b + '" height="' + b + '" />'
                );
            } else {
                $(this).replaceWith('<span style="color: red; font-family: monospace, arial, calibri; font-weight: bold;">Thumb error</span>');
            }
        });
    }
    image();
    if (window.mediaWiki.config.get("skin") === "oasis" && window.mediaWiki.config.get("wgAction") === "edit") {
        $(window).on("EditPageAfterRenderPreview", function() {
            image();
        });
    }
}());
*/