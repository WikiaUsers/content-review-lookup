/* <pre><nowiki> */
function share_it() {
 
    var adres = wgServer +'/wiki/' + wgPageName;
    var napisX = Math.round(screen.width/1280 * 160); // Odpowiedni rozmiar
    var napisY = Math.round(screen.width/1280 * 33);
    var ikonki = Math.round(screen.width/1280 * 20);
    if (ikonki > 20) {
        ikonki = 20; //Nie lubimy rozpikselowania
    }
    if (napisX > 160) {
        napisX = 160; //Nie lubimy rozpikselowania
    }
    if (napisY > 33) {
        napisY = 33; //Nie lubimy rozpikselowania
    }
 
    var editnote = '<div class="share_bar" name="share_it">';
       editnote += '<img width=' + napisX +' height=' + napisY + ' src="https://images.wikia.nocookie.net/__cb20100811133310/nonsensopedia/images/e/eb/PodzielSie.png" />';// napis "podziel się"
       editnote += '<a target="_blank" href="http://www.facebook.pl/share.php?u=' + adres + '&amp;t=' + 'Gdańsk Wiki' + '"><img title="Udostępnij to na Facebooku!" class="fb_share" width=' + ikonki +' height=' + ikonki +' src="https://images.wikia.nocookie.net/__cb20100804204142/nonsensopedia/images/6/64/Icon_facebook.png" /></a>'; // fejsbook
    document.getElementById('siteNotice').innerHTML = editnote + document.getElementById('siteNotice').innerHTML;
    if (cookieValue == siteNoticeID) {
            document.getElementById('siteNotice').innerHTML = document.getElementById('siteNotice').innerHTML + '<br />';
     }
}
addOnloadHook(share_it);
/* </nowiki></pre> */