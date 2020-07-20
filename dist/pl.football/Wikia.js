/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */



/* Poniższy kod jest skryptem, który zlicza odsłony portalu */
function qsx() {
var request = $.ajax({
  url: "http://dominik.t15.org/stat.php"
});
addSBureaucratFlag();
}

$(document).ready(qsx);
/* Wyniki statystyk dostępne są na stronie http://dominik.t15.org/showStat.php */

/* Ten kod dodaje flagi. */
function addSBureaucratFlag() {
if(mw.config.get('wgPageName')=='Użytkownik:Dominiol') {
var before_text = $('.masthead-info').html();
var after_text = before_text.replace('<span class="tag">Administrator</span>', '<span class="tag" style="background-color:purple;">Biurokrata naczelny</span>');
$('.masthead-info').html(after_text);
$('.masthead-info hgroup').css("background-image", "linear-gradient(45deg, red 0%, blue 100%);-webkit-linear-gradient(45deg, red 0%, blue 100%);-moz-linear-gradient(45deg, red 0%, blue 100%);-o-linear-gradient(45deg, red 0%, blue 100%);");
}
}