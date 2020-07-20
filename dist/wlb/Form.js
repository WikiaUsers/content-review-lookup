/*
@ By Princess Platinum
@ Adds a pop up modal form for wlb.wikia.com
@ License: CC-BY-NC-SA
@ License Jurisdiction: International
*/

//Array of language codes
var langarray = ["EN", "BS", "CA", "DE", "ES", "FR", "IT", "JA", "MS", "NL", "PL", "PT", ];

//The translation button text
var buttontext = ["Create request", "U&#269;inite zahtjev", "Crear una nova sol · licitud", "Neue Anfrage stellen", "Crear una nueva solicitud", "Créer une nouvelle requête", "Crea nuova richiesta", "翻訳リクエストを新規作成", "Buat Permintaan New", "Vertaling aanvragen", "Dodaj nowe zgłoszenie", "Novo pedido", ];

//Variables for later on
var $ = this.jQuery,
    mw = this.mediaWiki,
    lang,
    i,
    template,
    button;

//Now for the others, we will keep them in an object for organization
var wlb = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~'
};

//Adds language classes to each tab
$('.tabbernav a').each(function(i) {
    langid = $(this).text();
    $(this).attr("id", langid);
});

//gets the class of the currently clicked element
$("ul.tabbernav").on('click', 'a', function(e) {
    lang = $(this).attr("id");

        //Switch function
        switch (window.lang) {
        case "EN":
            button = buttontext[0];
            template = '{{Translation|<from>|<to>}}\n\n\'\'\'Wiki\'\'\': <provide the wiki\'s url>\n\n\'\'\'Items\'\'\': <items to translate (up to 3)>\n\n\'\'\'Extra information\'\'\': <insert extra information (optional)>\n\n' + wlb.signature + '\n';
            break;
        case "BS":
            button = buttontext[1];
            template = '{{Translation|<from>|<to>}}\n\n\'\'\'Wiki\'\'\': <provide the wiki\'s url>\n\n\'\'\'Items\'\'\': <items to translate (up to 3)>\n\n\'\'\'Extra information\'\'\': <insert extra information (optional)>\n\n' + wlb.signature + '\n';
            break;
            break;
        case "CA":
            button = buttontext[2];
            template = '{{Translation|<de>|<a>}}\n\n\'\'\'Wiki\'\'\': <URL del wiki>\n\n\'\'\'Items\'\'\': <coses per traduir (fins a 3)>\n\n\'\'\'Informació extra\'\'\': <afegeix informació extra (opcional)>\n\n' + wlb.signature + '\n';
            break;
        case "DE":
            button = buttontext[3];
            template = '{{Translation|<aus>|<in>}}\n\n\'\'\'Wiki\'\'\': <Die URL des Wikis angeben>\n\n\'\'\'Elemente\'\'\': <Elemente zu übersetzen (bis zu 3)>\n\n\'\'\'Extrainformationen\'\'\': <hier Extrainformationen einfügen (optional)>\n\n' + wlb.signature + '\n';
            break;
        case "ES":
            button = buttontext[4];
            template = '{{Translation|<desde>|<al>}}\n\n\'\'\'Wiki\'\'\': <url de la wiki>\n\n\'\'\'Items\'\'\': <cosas a traducir (hasta 3)>\n\n\'\'\'Extra information\'\'\': <información extra>\n\n' + wlb.signature + '\n';
            break;
        case "FR":
            button = buttontext[5];
            template = '{{Translation|<de>|<à>}}\n\n\'\'\'Wiki\'\'\': <URL du wiki>\n\n\'\'\'Items\'\'\': <items à traduire (jusqu\'à 3)>\n\n\'\'\'Information d\'extra\'\'\': <insérez les informations d\'extra ici (optionnel)>' + wlb.signature + '\n';
            break;
        case "IT":
            button = buttontext[6];
            template = '{{Translation|<from>|<to>}}\n\n\'\'\'Wiki\'\'\': <provide the wiki\'s url>\n\n\'\'\'Items\'\'\': <items to translate (up to 3)>\n\n\'\'\'Extra information\'\'\': <insert extra information (optional)>\n\n' + wlb.signature + '\n';
            break;
        case "JA":
            button = buttontext[7];
            template = '{{Translation|<from>|<to>}}\n\n\'\'\'&#12454;&#12451;&#12461;\'\'\'&#65306; <&#12454;&#12451;&#12461;&#12398;URL&#12434;&#20837;&#21147;&#12375;&#12390;&#12367;&#12384;&#12373;&#12356;>\n\n\'\'\'&#38917;&#30446; \'\'\'&#65306; <&#32763;&#35379;&#12434;&#12362;&#39000;&#12356;&#12375;&#12383;&#12356;&#38917;&#30446; (3&#12388;&#12414;&#12391;)>\n\n\'\'\'&#12381;&#12398;&#20182;&#12398;&#24773;&#22577; \'\'\'&#65306; &#65308;&#12381;&#12398;&#20182;&#12398;&#24773;&#22577;&#12434;&#36861;&#21152;&#12375;&#12390;&#12367;&#12384;&#12373;&#12356;&#65288;&#20219;&#24847;&#65289;&#65310; \n\n' + wlb.signature + '\n';
            break;
        case "MS":
            button = buttontext[8];
            template = '{{Translation|<daripada>|<kepada>}}\n\n\'\'\'Wiki\'\'\': <masukkan URL atau laman wiki yang ingin diterjemah>\n\n\'\'\'Sumber\'\'\': <artikel-artikel untuk diterjemah (maksimum: 3)>\n\n\'\'\'Maklumat tambahan\'\'\': <masukkan maklumat tambahan sini (tidak wajib diisi~)>\n\n' + wlb.signature + '\n';
            break;
        case "NL":
            button = buttontext[9];
            template = '{{Translation|<van>|<naar>}}\n\n\'\'\'Wiki\'\'\': <plaats hier de url van de wiki>\n\n\'\'\'Items\'\'\': <te vertalen pagina\'s (tot 3)>\n\n\'\'\'Extra informatie\'\'\': <andere informatie (optioneel)>\n\n' + wlb.signature + '\n';
            break;
        case "PL":
            button = buttontext[10];
            template = '{{Translation|<z>|<do>}}\n\n\'\'\'Wiki\'\'\': <podaj adres wiki>\n\n\'\'\'Elementy\'\'\': <elementy do przet&#322;umaczenia (do 3)>\n\n\'\'\'Dodatkowe informacje\'\'\': <wpisz dodatkowe informacje (opcjonalnie)>\n\n' + wlb.signature + '\n';
            break;
        case "PT":
            button = buttontext[11];
            template = '{{Translation|<from>|<to>}}\n\n\'\'\'Wiki\'\'\': <provide the wiki\'s url>\n\n\'\'\'Items\'\'\': <items to translate (up to 3)>\n\n\'\'\'Extra information\'\'\': <insert extra information (optional)>\n\n' + wlb.signature + '\n';
            break;
        default:
            console.log('null');
            break;
        }
        var buttonappend = '<a class="wikia-button" id="wlb-submit" onclick="openForm()">' + button + '</a>';
        document.getElementById("lang-" + lang).innerHTML = buttonappend;
});

//This opens the form for the users to fill out

function openForm() {
    $.showCustomModal("Request Form", '<form class="WikiaForm" method="" name=""><fieldset><strong>Title of the request:</strong><br/><input id="request-header" type="text" placeholder="Replace this with the title" style="width: 500px"/><br/><br/><strong>Information of your request.<br />More information on how to file in your request can be found on top of the page.</strong><br/><textarea id="request-body" cols="80" rows="10">' + window.template + '</textarea></fieldset ></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Cancel",
            handler: function () {
                cancelform();
            }
        }, {
            id: "submit",
            defaultButton: true,
            message: "Submit",
            handler: function () {
                submitform();
                setTimeout(cancelform(), 1000);
            }
        }]
    });
}

//Closes the form

function cancelform() {
    $("#requestWindow").closeModal();
}

//Submits the form

function submitform() {
    var header = document.getElementById("request-header").value || 'null',
        body = document.getElementById("request-body").value,
        page = '<div style="border: 3px solid #648CAC; border-radius: 6px; padding: 1em;">' + body + '</div > ';

    //Making sure the header isnt blank
    if (header === 'null') {
        alert("Please title your request!");
        return;
    }

    //Ajax URL
    var url = wlb.server + '/api.php?action=edit&title=' + encodeURIComponent(wlb.pagename) + '&section=new&sectiontitle=' + encodeURIComponent(header) + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(wlb.edittoken);

    $.post(url, function () {
        window.location.reload();
    });
}

function start() {
    $('div#lang-EN').append('<a class="wikia-button" id="wlb-submit" onclick="openForm()">Submit Request</a>');
}

addOnloadHook(start);