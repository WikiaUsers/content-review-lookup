window.BackToTopText = "Retornar";
$(".tooltip").tooltip(); // Tooltips

// Horário
 // Thanks to KockaAdmiralac
window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push(function() {
    $('time.timeago').timeago();
});

// Imagens externas sendo linkadas
$('.eximagem').each(function() {
var $this = $(this),
data = $this.data();
$this.find('img').css({
width: data.width,
height: data.height
});
});