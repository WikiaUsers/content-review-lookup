function addSpeech() {
$("input:text").attr("x-webkit-speech","");
}
addOnloadHook(addSpeech);