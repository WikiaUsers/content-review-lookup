/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */
/* Auto Refresh */
window.AjaxRCRefreshText = 'Refresh otomatis';
window.AjaxRCRefreshHoverText = 'Refresh halaman secara otomatis';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

/* Lock Blog Script */
window.LockOldBlogs = {
    expiryDays: 45,
    expiryMessage: "Blog ini dianggap arsip karena tidak berkomentar di atas sekitar <expiryDays> hari. Jika kamu mencari tempat untuk mendiskusikan sebuah topik, lihatlah melalui posting blog terbaru kami, sebuah tautan yang dapat kamu temukan di halaman utama tempat blog berada. Jika kamu penasaran mengapa perubahan ini terjadi, silahkan baca Forum:Mengunci Blog Lama.",
    nonexpiryCategory: "Buka Blog"
};

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
$(function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '{{Alasan penggunaan wajar\n| Ringkasan       = \n| Sumber            = \n| Bagian           = \n| Tujuan           = \n| Resolusi        = \n| Tergantikan    = \n| Informasi Lain = \n}}';
	}
});
// ****** END: JavaScript for [[Special:Upload]] ******

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
            return false;
        });
    });
});

/* Replaces {{Visitor}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
});
 
/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});