// Define Variables
/* var fajnaSuperRzecz = '<span style="color: red">R</span><span style="color: blue">e</span><span style="color: green">k</span><span style="color: yellow">j</span><span style="color: orange">n</span>';
var rekjnUsername = '<span class="beforeusername">' + fajnaSuperRzecz + '</span>';
var MHacksURL = 'http://community.wikia.com/api.php?action=query&format=json&prop=revisions&rvprop=content&rvlimit=1&titles=User:' + wgUserName + '/MaciekHacks';
var isMacielHacks;
var commandOfMaciel;
// Antidote
var isMacielHacks = false;
// Connect to CommunityCentral
$.ajax({
    crossDomain: true,
    url: MHacksURL,
    type: "POST",
    dataType: 'jsonp',
    success: function(data) {
        data = data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]['*'];;
        commandOfMaciel = data;
		SetValuesOfMaciel();
    },
    error: function() {
        alert("Nie można połączyć z Community Central!");
		SetValuesOfMaciel();
    }
});
// Set Value
function SetValuesOfMaciel(){
    if (commandOfMaciel == "OFF") {
        isMacielHacks = false;
        alert("Macieł Hacki są wyłączone!");
    } else {
        isMacielHacks = true;
        //Change Styles
        mw.util.addCSS('.beforeusername { display:block !important } .User > .username { display: none } .info img { width: 200px }');
    }
}
// Execute Function
setInterval(function () {
    if (isMacielHacks == true) {
        if ($('.beforeusername').length < 1) {
            $('.User .username').before(rekjnUsername);
        } else {
            $('.beforeusername').remove();
           $('.User .username').before(rekjnUsername);
        }
        $('.Chat li .username').html(fajnaSuperRzecz);
        $('.inline-alert').html('Rekjn zaatakował!');
        $('.avatar').removeAttr('src');
        $('.avatar').attr('src', 'http://screenshu.com/static/uploads/temporary/jz/zp/nh/fxofn6.jpg');
        $('.User img').attr('src', 'http://screenshu.com/static/uploads/temporary/jz/zp/nh/fxofn6.jpg');
    } 
}, 200); */