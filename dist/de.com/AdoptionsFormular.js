function AdoptionForm() {
var articlepath = mw.config.get('wgArticlePath').replace('$1','');
    gui = document.createElement('div');
    gui.innerHTML = '<div style="text-align: left; margin: 10px; padding: 30px; padding-top: 0px; border: solid 1px #cccccc;">'
    + '<h2>Antragsformular</h2>'
    + 'Du bist <span class="adoptionformusername">nicht</span> angemeldet.'
    + '<br /><br />'
    + 'Wie lautet der Name des Wikis, das du adoptieren möchtest? '
    + '<input id="wikiname" style="width: 200px;" placeholder=" Beispiel Wiki"/>'
    + '<br /><br />'
    + 'Ergänze die fehlenden Teile der Adresse: '
    + '<b>https://</b>'
    + '<input id="subdomain" style="width: 180px;" placeholder=" beispiel"/>'
    + '<b>.fandom.com/</b>'
    + '<input id="langpath" style="width: 15px;" maxlength="2"/>'
    + '<br />'
    + 'Achtung: Bei den meisten deutschen Wikis befindet sich in der Adresse ein "de" hinter dem ".com/". Bei Adressen ohne "de" muss das Feld leer bleiben.'
    + '<br /><br />'
    + '<h3>Weitere Angaben</h3>'
    + 'Hier kannst du noch weitere Details zu deinem Antrag nennen. Wenn du bereits Administrator bist und Bürokratenrechte beantragen möchtest, kannst du das hier vermerken. <a href="'
    + articlepath
    + 'Hilfe:Adoption#Bürokratenrechte">(Siehe: Hilfe:Adoption)</a>'
    + '<br />'
    + '<textarea id="detail" placeholder="Optional" style="box-sizing: border-box; width: 100%; min-height: 30px;"></textarea>'
    + '<br /><br />'
    + '<input type="checkbox" id="termsread" name="termsread"/>'
    + '<b>Ich habe die Adoptions-Bedingungen gelesen und akzeptiert.</b>'
    + '<br /><br />'
    + '<span id="submitbuttonnewadoption" class="wds-button wds-is-squished headerbg" style="margin: auto;" onclick="submitAdoptionForm()">Antrag speichern</span>'
    + '<span class="adoptionformresult"></span>'
    + '</div>';
	if(wgPageName == 'Adoptions-Beantragung') {
        document.getElementById('newadoptionbutton').append(gui);
        document.getElementById('oldadoptioninputbox').style.display='none';
        $("span.adoptionformusername").text('momentan mit dem Benutzerkonto „' + wgUserName + '“');
	}
}
addOnloadHook(AdoptionForm);
function submitAdoptionForm() {
    resultpath = mw.config.get('wgArticlePath').replace('$1','');
    apilangpath = mw.config.get('wgArticlePath').replace('wiki/$1','');
    user = mw.config.get('wgUserName').split(' ').join('_');
    wikiname = $("#wikiname").val();
    detail = $("#detail").val();
    subdomain = $("#subdomain").val();
    domain = subdomain.replace('https://', '').replace(/\.fandom\.com(.*)/g, '') + '.fandom.com';
    langpath = '/' + $("#langpath").val();
	if (langpath != "/") {
	adresse = domain + langpath;
	} else {
	adresse = domain;
	}
    ort = "Adoptionsantrag:" + wikiname;
    vorlage = 'Adopt';
    text = '{{'+ vorlage
        + '\n|Status = n'
        + '\n|Benutzer = '
        + user
        + '\n|Adresse = '
        + adresse
        + '\n}}\n\n'
        + detail + '\n<br />\n';
    if (!wikiname) {
        alert('Es wurde kein Wikiname angegeben.');
    } else if (!subdomain) {
        alert('Die Wiki-Adresse ist unvollständig.');
    } else {
        if (document.getElementById('termsread').checked) {
            $.post(wgServer
                + apilangpath
                + 'api.php?action=edit&title=' + encodeURIComponent(ort)
                + '&prependtext=' + encodeURIComponent(text)
                + '&token=' + encodeURIComponent(this.mediaWiki.user.tokens.values.editToken)
                + '&summary=Neuer Antrag', function() {
                    window.location.href = resultpath + ort;
            });
        } else {
            alert('Du hast die Adoptions-Bedingungen noch nicht akzeptiert.');
        }
    }
}