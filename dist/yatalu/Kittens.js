/*<nowiki>
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adds a pop up modal form for wlb.wikia.com
@ License: CC-BY-NC-SA
@ License Jurisdiction: International
*/
 
// Variables for later on
// Keep these in an object for organization
var _kt = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage')
};
 
var $ = this.jQuery,
    mw = this.mediaWiki,
    i,
    msg = messages = {
        get: function(name) {
    return (messages[_kt.language.toUpperCase()]||messages['EN'])[name];
        },
        languages: {
            AR: 'ar - العربية',
            CS: 'cs - Česky',
            DA: 'da - Dansk',
            FA: 'fa - فارسی',
            HU: 'hu - Magyar',
            ID: 'id - Bahasa Indonesia',
            KO: 'ko - 한국어',
            MS: 'ms - Malay',
            NN: 'nn - ‪Norsk (nynorsk)‬',
            NO: 'no - Norsk (bokmål)‬',
            SV: 'sv - Svenska',
            TR: 'tr - Türkçe',
            VI: 'vi - Tiếng Việt',
            XX: 'Other'
        },
    };
 
// English / default
messages['EN'] = {
    "button": "New request",
    "form-language-choose": "Choose language",
}
 
// Add buttons depending on user language
if(_kt.pagename === 'Kittens' || _kt.pagename === "Wikia_Translators:International_Spotlights") {
    var buttonappend = '<a class="wikia-button" id="spotlight-submit" onclick="openFormSpotlight()">' + msg.get('button') + '</a>';
    document.getElementById("lang-EN").innerHTML = buttonappend;
    window.dropdown = '<select name="language" id="language" value="'+mw.config.get('wgUserLanguage').toUpperCase()+'">';
    dropdown += '<option value="" selected disabled>' + msg.get('form-language-choose') + '</option>';
    for (var i in msg.languages) {
        dropdown += '<option value="'+i+'">'+msg.languages[i]+'</option>';
    }
    dropdown += '</select>';
}
 
// This opens the form for the users to fill out
 
function openFormSpotlight() {
    $.showCustomModal('Spotlight request', '<form class="WikiaForm" method="" name="" id="spotlight"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Wiki name</span><br><input id="wikiname" type="text" placeholder="Community Central" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">URL</span><br><span style="color:gray">http://</span><input id="wikiurl" type="text" placeholder="community" style="width:364px"/><span style="color:gray">.wikia.com</span><br><span id="br2" /><span style="font-weight:bold">Select your language</span> (' + window.dropdown + ')<br><span style="color:gray">These languages cannot be requested: <a href="http://community.wikia.com/wiki/Community_Central:Spotlights">en</a>, <a href="http://comunidad.wikia.com/wiki/Wikia:Spotlights">ca/es</a>, de, <a href="http://communaute.wikia.com/wiki/Wiki_des_communaut%C3%A9s:%C3%80_la_une">fr</a>, <a href="http://it.community.wikia.com/wiki/Wiki_della_Community%3ASpotlight">it</a>, <a href="http://ja.community.wikia.com/wiki/Wikia:%E3%82%B9%E3%83%9D%E3%83%83%E3%83%88%E3%83%A9%E3%82%A4%E3%83%88">ja</a>, <a href="http://nl.community.wikia.com/wiki/Wikia_Spotlights">nl</a>, <a href="http://spolecznosc.wikia.com/wiki/Project%3ASpotlight">pl</a>, <a href="http://comunidade.wikia.com/wiki/Ajuda%3APedidos_de_Spotlight">pt</a>, <a href="http://ru.community.wikia.com/wiki/%D0%92%D0%B8%D0%BA%D0%B8%D1%8F%3A_%D0%97%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D1%8B_%D0%BD%D0%B0_%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D1%8B">ru</a>, <a href="http://zh.community.wikia.com/wiki/Board:%E9%A2%86%E5%85%BB%E5%92%8C%E6%8F%90%E5%8D%87%E7%BB%B4%E5%9F%BA">zh</a>.</span><br><input id="intcaption" type="text" placeholder="Caption in your language" style="width:400px;"/><br><span id="br2" /><span style="font-weight:bold">Caption (English)</span><br><input id="englishcaption" type="text" placeholder="English translation of caption" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Image</span><br>Please add the image after you sent the request.<br><span id="br2" /><span style="font-weight:bold">Signature</span><br><input id="signatureplace" type="text" value="' + _kt.signature + '"style="width:400px"/></span></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Cancel",
            handler: function () {
                cancelformSpotlight();
            }
        }, {
            id: "submit",
            defaultButton: true,
            message: "Submit",
            handler: function () {
                submitformSpotlight();
            }
        }]
    });
}
 
// Closes the form
 
function cancelformSpotlight() {
    $("#requestWindow").closeModal();
}
 
// Submits the form
 
function submitformSpotlight() {
console.log('Starting to submit...');
    var $form = $('#spotlight'),
        wikiname = $form.find('#wikiname').val(),
        url = $form.find('#wikiurl').val(),
        intcaption = $form.find('#intcaption').val(),
        lang = $form.find('#language').val(),
        encaption = $form.find('#englishcaption').val(),
        image = $form.find('#image').val(),
        signatureplace = $form.find('#signatureplace').val(),
        page = '{{Spotlight header}}\n{{Open}}\n[[File:Placeholder|right]]\n* [[w:c:' + url + '|' + wikiname + ']] ([[w:c:' + url + ':Special:ListUsers/sysop|<span title="List of admins">al</span>]] &bull; [[w:c:' + url + ':Special:ShotPages|<span title="Shortest pages">sp</span>]] &bull; [[w:c:' + url + ':Special:UncategorizedPages|<span title="Pages without categories">up</span>]])\n* Caption\n** '+ lang + ': ' + intcaption + '\n** EN: ' + encaption + '\n* ' + signatureplace;
    // If language or header is blank, return alerts
    if (!lang) {
        alert('Please select a language!');
        return;
    }
    if (!wikiname) {
        alert('Please fill in wikiname!');
        return;
    }
console.log('Performed checks...');
 
    // Ajax URL
    var url = _kt.server + '/api.php?action=edit&title=Spotlight_request:' + encodeURIComponent(lang) + '/' + encodeURIComponent(wikiname) + '&text=' + encodeURIComponent(page) + '&summary=New+spotlight+request+(' + encodeURIComponent(lang) + ')&token=' + encodeURIComponent(_kt.edittoken) + '&createonly=1';
console.log('Got the url: ',url);
 
    $.post(url, function (r) {
console.log('Should be done now:',r);
    cancelformSpotlight();
window.location = _kt.server + '/wiki/' + 'Spotlight_request:' + encodeURIComponent(lang) + '/' + encodeURIComponent(wikiname);
    });
console.log('Sent request...');
}