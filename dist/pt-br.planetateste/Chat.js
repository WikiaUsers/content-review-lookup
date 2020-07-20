/*
window.onload = function() {    
    document.getElementsByClassName("message")[0].getElementsByTagName("textarea")[0].addEventListener("keydown", function(e) {
        var keyC = e.keyCode;
        
        if (keyC == 13) {
            alert("duhjdshjsh");
        }
    });
};
*/
window.onload = function() {setInterval(function() { var docs = document.getElementsByTagName("img");  for (var i = 0, len = docs.length; i < len; i++) { if(docs[i].dataset.emoti) { continue; }  docs[i].src = "https://images.wikia.nocookie.net/leviny/pt/images/a/a2/Areyou.png"; docs[i].setAttribute("data-emoti", "true"); }  }, 43)
}