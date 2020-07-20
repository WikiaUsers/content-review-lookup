function submitAvailability() {
importScriptPage("MediaWiki:ApiKey.js", "wlb");

setTimeout(function() {
newStatus = $("#personal-availability-form").find("select").val();

    // Ajax URL
    var url = _api.server + '/api.php?action=edit&title=User:' + wgUserName + '/' + 'availability&text={{WLB-user/availability|status=' + newStatus + '}}&summary=Updated availability status&token=' + encodeURIComponent(_api.edittoken);
console.log('Got the url: ',url);
 
    $.post(url, function (r) {
console.log('Should be done now:',r);
        window.location.reload();
    });
console.log('Sent request...');
}, 1000);
}

$("#availability-update").html('<div style="color: #eee; background: #0E0E0E; border: 2px solid #0E0E0E; border-radius: 3px; padding: 0 5px; font-size: 96%; line-height: 1.3em; margin-top: -5px; margin-bottom: 5px; width: auto; text-align: center;"><span style="font-size: 80%;">Change my (' + wgUserName + ') availability status ►</span></div>');

$("div#availability-update").click(function() {

$(this).after('<div id="availability-push" />');
$("div#availability-update").remove();

$("#availability-push").html('<div style="color: #eee; background: #0E0E0E; border: 2px solid #0E0E0E; border-radius: 3px; padding: 0 5px; font-size: 96%; line-height: 1.3em; margin-top: -5px; margin-bottom: 5px; width: auto; text-align: center;"><div style="margin-bottom: 0; padding: 10px;" id="personal-availability-form">&nbsp;<button onclick="submitAvailability()">Submit</button></div></div>');

dropdown = '<select>'
+ '<option value="" selected="" disabled="">Select new availability</option>'
+ '<option value="available">Available</option>'
+ '<option value="busy">Busy</option>'
+ '<option value="unavailable">Unavailable</option>'
+ '<option value="inactive">Inactive</option>';
+ '</select>';

$("#personal-availability-form").prepend(dropdown + "&nbsp;");

});

setTimeout(function() {
$(".WLB-availability .new").each(function() {
$(this).parent().html('<img src="https://images.wikia.nocookie.net/central/images/d/df/U-Absent.png" alt="U-Absent.png">');
});
}, 2000);