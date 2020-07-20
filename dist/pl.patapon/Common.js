/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

// Szablon {{USERNAME}}
if (wgUserName != 'null') {
        $('.insertusername').text(wgUserName);
}

// Komunikat o dodawaniu licencji do przesyłanego pliku
function emptyLicenseAlert(form) {
        var msg = "Licencja pliku nie została wybrana. Pamiętaj o dodawaniu licencji do plików, które przesyłasz!";
        if(window.emptyLicenseWarningDelivered) return true;
        if($('#wpLicense').val() === '') {
                alert(msg);
                window.emptyLicenseWarningDelivered = true;
                return false;
        }
        return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});

// Pokazywanie numerów IP niezalogownych użytkowników
window.RevealAnonIP = {
    permissions : [ 'rollback', 'sysop', 'bureaucrat' ]
};

// Skrypt na to coś z facebookiem
// Made by Ofkorse
$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
        $("<div id='FacebookWnd'></div>").css({
                background:'url(http://pl.patapon.wikia.com/Special:Filepath/Facebook.png)',
                width:242,
                height:401,
                position:'fixed',
                top:150,
                right:-210,
                zIndex:300}).appendTo("body");
        //Zawartość
        $('<div class="fb-like-box" data-href="https://www.facebook.com/Patapedia" data-width="185" data-height="361" data-show-faces="true" data-stream="false" data-header="false"></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
        $("#FacebookWnd").click(function(){
                toggleFacebookWnd();
        });
});
 
function toggleFacebookWnd() {
        if (parseInt($("#FacebookWnd").css("right"))!==0) $("#FacebookWnd").animate({right:"0px"}, 700);
        else $("#FacebookWnd").animate({right:"-210px"}, 700);
}