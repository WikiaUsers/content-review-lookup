function questionFiller() {
  if(wgCanonicalNamespace == 'Special' && wgTitle == 'Questions') {
    var questionOne=prompt("What wiki are you trying to adopt?","");
    if(questionOne!=null && questionOne!="") {
      document.write("<b>What wiki are you trying to adopt?</b> " + questionOne);
  if(skin == 'oasis') {
	var body = 'WikiaArticle';
	}
else {
  var body = 'bodyContent';
}
document.getElementById(body).innerHTML = questionOne;
    }
  }
}
addOnloadHook(questionFiller);