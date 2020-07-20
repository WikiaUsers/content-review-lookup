console.log('Namespacenumber',1201);
if(wgNamespaceNumber == 1201) {
    console.warn('Namespace: Nachrichtenseite');
    var thema = $('.BreadCrumbs').text().split('>')[1].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    wgPageName = thema;
    var teile = $('.BreadCrumbs > a')[0].pathname.split(':');
    var art = teile[0].split('/')[2];
    var benutzername = 'keine Nachrichtenseite';
    if (art == 'Nachrichtenseite') {
      benutzername = teile[1];
      wgMessageWall = benutzername;
      $('#nachrichtenseite-benutzername').text(benutzername);
    }
}