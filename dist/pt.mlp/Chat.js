importScriptPage('ChatTags/code.js', 'dev');

/* Som de notificação */
$(function(){ 
$("#chatData").focus();
//Appending HTML5 Audio Tag in HTML Body
$('<audio id="chatAudio"><source src="https://vignette.wikia.nocookie.net/mlp/images/d/d0/Notifica%C3%A7%C3%A3ochat.ogg/revision/latest?cb=20150513000536&path-prefix=pt" type="audio/ogg">').appendTo('body');

$("#trig").on("click",function(){
var a = $("#chatData").val().trim();
if(a.length > 0)
{
$("#chatData").val(''); 
$("#chatData").focus();
$("<li></li>").html('<img src="small.jpg"/><span>'+a+'</span>').appendTo("#chatMessages");
// Scrolling Adjustment 
$("#chat").animate({"scrollTop": $('#chat')[0].scrollHeight}, "slow");
$('#chatAudio')[0].play();
}
});
});
</script>