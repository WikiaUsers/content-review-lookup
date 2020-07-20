/* <pre> */
var miniwikis = new Array(
'Sengoku Rance',
'Tsumashibori',
'Double Teacher Life',
'Beat Angel Escalayer'
);

var monologos = new Array(
'https://images.wikia.nocookie.net/alicesoft/images/thumb/d/da/Sengoku_Rance_-_logo.gif/150px-Sengoku_Rance_-_logo.gif',
'https://images.wikia.nocookie.net/alicesoft/images/thumb/c/cd/Tsumashibori_-_logo.gif/150px-Tsumashibori_-_logo.gif',
'https://images.wikia.nocookie.net/alicesoft/images/thumb/c/cc/Double_Teacher_Life_-_logo.gif/150px-Double_Teacher_Life_-_logo.gif',
'https://images.wikia.nocookie.net/alicesoft/images/thumb/f/fb/Beat_Angel_Escalayer_-_logo.gif/150px-Beat_Angel_Escalayer_-_logo.gif'
);

var quartzlogos = new Array(
'https://images.wikia.nocookie.net/alicesoft/images/thumb/d/da/Sengoku_Rance_-_logo.gif/200px-Sengoku_Rance_-_logo.gif',
'https://images.wikia.nocookie.net/alicesoft/images/thumb/c/cd/Tsumashibori_-_logo.gif/150px-Tsumashibori_-_logo.gif',
'https://images.wikia.nocookie.net/alicesoft/images/c/cc/Double_Teacher_Life_-_logo.gif',
'https://images.wikia.nocookie.net/alicesoft/images/thumb/f/fb/Beat_Angel_Escalayer_-_logo.gif/150px-Beat_Angel_Escalayer_-_logo.gif'
);

addOnloadHook(logochangerscan);

function logochangerscan(){
    for (i = 0; i < miniwikis.length; i++){
        if (wgTitle.search('^'+miniwikis[i]) != -1) {
            logoChange(i);
            break;
        }
    }
}

function logoChange(idx){
    var linkA;
    switch(skin) {
    case 'monobook':
        linkA = document.getElementById('p-logo').getElementsByTagName('a')[0];
        linkA.parentNode.style.textAlign = 'center';
        var imgA = linkA.appendChild(document.createElement('IMG'));
        imgA.src = monologos[idx];
        break;   
    case 'quartz':
        linkA = document.getElementById('wikiLogoLink');
        var imgA = linkA.appendChild(document.createElement('A'));
        imgA.setAttribute('style', 'width:190px; margin-left:76px; background-image:url('+quartzlogos[idx]+');');
        imgA.setAttribute('href', '/wiki/'+encodeURIComponent( miniwikis[idx].replace( / /g, '_' ) ) );
        imgA.setAttribute('title', miniwikis[idx]);
        break;
    default:
        return;
    }
}

/* </pre> */