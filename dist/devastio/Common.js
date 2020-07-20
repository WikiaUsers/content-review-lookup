function attachHandlers(){
    var e = document.getElementsByClassName('pictureButton');
    for (i = 0; i < e.length; i++){
      e[i].addEventListener('click', handleExternalLinkButton, false);
    }
}
function handleExternalLinkButton(){
    window.location.replace(this.getAttribute('data-href'));
}

function getImages(){
    var e = document.getElementsByClassName('getImg');
    for (i = 0; i < e.length; i++){
      e[i].innerHTML = '<img src="' + e[i].getAttribute('data-imgsrc') + '"></img>';
    }
}

attachHandlers();
getImages();