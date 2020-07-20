function TonkatyHighlight(a){
    var diva = document.querySelectorAll('img.avatar[alt=\'Tonkaty\']');
    var divb = document.querySelectorAll('ul.AccountNavigation li a img.avatar[alt=\'Tonkaty\']');
    var divc = document.querySelectorAll('#UserProfileMasthead.usergroup-founder div.masthead-avatar.bureaucrat img.avatar');
    var date = new Date();
    var ts = Math.floor(date.getTime() / 1000) + (date.getTimezoneOffset() * 60);
    date = (new Date(ts * 1000)).getDay();
    for(var i = 0; i < diva.length; i++){
        diva[i].className += ' TK-' + date;
    }
    for(var o = 0; o < divb.length; o++){
        divb[o].className += ' TK-' + date;
    }
    for(var p = 0; p < divc.length; p++){
        divc[p].className += ' TK-' + date;
    }
    if(diva.length + divb.length + divc.length === 0 && a < 30) setTimeout(function(){TonkatyHighlight(a + 1);}, 100);
}

addOnloadHook(TonkatyOffset);

function TonkatyOffset(){
    setTimeout(function(){TonkatyHighlight(0);}, 100);
}