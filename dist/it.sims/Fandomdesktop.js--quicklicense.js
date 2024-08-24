/* Quick image license - contains the most commonly used licensing criteria */
$(function() {
    var config = mw.config.get([
    	'wgNamespaceIds', 
    	'wgNamespaceNumber', 
    	'wgAction', 
    	'wgServer', 
    	'wgPageName',
    	'wgUserGroups'
    ]);

    if (
    	!config.wgUserGroups.includes('autoconfirmed') ||
        config.wgNamespaceIds.file !== config.wgNamespaceNumber ||
        config.wgAction !== 'view' ||
        window.QLicenseLoaded
    ) return;

    var options = {
        ' ': 'Seleziona una licenza',
		'== Licenza ==\n{{Copyright di EA|fanon}}': 'Immagine fanfiction',
		'== Licenza ==\n{{Copyright di EA|sim1}}': 'Sim da TS1',
                '== Licenza ==\n{{Copyright di EA|ss1}}': 'Schermata da TS1',
                '== Licenza ==\n{{Copyright di EA|lot1}}': 'Lotto da TS1',
                '== Licenza ==\n{{Copyright di EA|sim2}}': 'Sim da TS2',
                '== Licenza ==\n{{Copyright di EA|ss2}}': 'Schermata da TS2',
                '== Licenza ==\n{{Copyright di EA|lot2}}': 'Lotto da TS2',
		'== Licenza ==\n{{Copyright di EA|sim3}}': 'Sim da TS3',
                '== Licenza ==\n{{Copyright di EA|ss3}}': 'Schermata da TS3',
                '== Licenza ==\n{{Copyright di EA|lot3}}': 'Lotto da TS3',
                '== Licenza ==\n{{Copyright di EA|sim4}}': 'Sim da TS4',
                '== Licenza ==\n{{Copyright di EA|ss4}}': 'Schermata da TS4',
                '== Licenza ==\n{{Copyright di EA|lot4}}': 'Lotto da TS4',
                '== Licenza ==\n{{Copyright di EA|simls}}': 'Sim da Life Stories',
                '== Licenza ==\n{{Copyright di EA|lotls}}': 'Lotto da Life Stories',
                '== Licenza ==\n{{Copyright di EA|ssls}}': 'Schermata da Life Stories',
                '== Licenza ==\n{{Copyright di EA|simps}}': 'Sim da Pet Stories',
                '== Licenza ==\n{{Copyright di EA|lotps}}': 'Lotto da Pet Stories',
                '== Licenza ==\n{{Copyright di EA|ssps}}': 'Schermata da Pet Stories',
                '== Licenza ==\n{{Copyright di EA|lotcs}}': 'Lotto da Island Stories',
                '== Licenza ==\n{{Copyright di EA|sscs}}': 'Schermata da Island Stories',
                '== Licenza ==\n{{Copyright di EA|simcon}}': 'Sim da un gioco su console',
                '== Licenza ==\n{{Copyright di EA|sscon}}': 'Schermata da un gioco su console',
                '== Licenza ==\n{{Copyright di EA|obj}}': 'Un oggetto',
                '== Licenza ==\n{{Copyright di EA|pet}}': 'Un animale',
                '== Licenza ==\n{{Copyright di EA|box}}': 'Copertina',
                '== Licenza ==\n{{Copyright di EA|obj}}': 'Un oggetto',
                '== Licenza ==\n{{Copyright di EA|mem}}': 'Una memoria',
                '== Licenza ==\n{{Copyright di EA|mood}}': 'Uno stato umorale',
                '== Licenza ==\n{{Copyright di EA|moodnf}}': 'Uno stato umorale senza cornice',
                '== Licenza ==\n{{Copyright di EA|trait}}': 'Un tratto',
                '== Licenza ==\n{{Copyright di EA|zodiac}}': 'Un segno zodiacale',
                '== Licenza ==\n{{Copyright di EA|logo}}': 'Un logo di gioco',
                '== Licenza ==\n{{Copyright di EA|icon}}': "Un'icona di gioco",
                '== Licenza ==\n{{Copyright di EA|waf}}': 'Un desiderio o una repulsione',
                '== Licenza ==\n{{Copyright di EA|interface}}': "Qualcosa dall'interfaccia di gioco",
                '== Licenza ==\n{{Copyright di EA|render}}': 'Un render di gioco',
                '== Licenza ==\n{{Copyright di EA|promo}}': "Un'immagine promozionale",
                '== Licenza ==\n{{Copyright di EA}}': "Qualcos'altro dalla serie The Sims/altre immagini coperte da copyright di EA",
                '== Licenza ==\n{{Copyright di Wikia}}': "Qualcosa parte dell'interfaccia di Wikia",
		'== Licenza ==\n{{Uso equo}}': 'Uso equo',
                '== Licenza ==\n{{cc-by-sa-3.0}}': 'Questo file è sotto licenza Creative Commons Attribuzione 3.0 (licenza libera)',
                '== Licenza ==\n{{GFDL}}': 'Questo file è sotto licenza GFDL (licenza libera)',
                '== Licenza ==\n{{PD}}': 'Pubblico dominio',
                '== Licenza ==\n{{Nessuna licenza}}': 'Licenza sconosciuta'
    };
    var optstr = '';
    for (var i in options) {
        if (options.hasOwnProperty(i)) {
            optstr += '<option value="' + i + '" style="text-align:left;padding-bottom:10px;">' + options[i] + '</option>';
        }
    }

    var html = '<p style="text-align:left;"><select id="QLicenseSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Aggiungi licenza</a>';
    if ($('#LicensedFile').length || $('#Licenza').length) {
        html += '&nbsp;<span style="color:#008000; font-weight:bold; text-align:left;">Questa pagina ha un template di licenza.</span></p>';
    } else {
        html += '&nbsp;<span style="color:#ff0000; font-weight:bold; text-align:left;">Questa pagina non ha un template di licenza! Aggiungine uno.</span> </p>';
    }
    $(html).insertAfter('#filetoc');
    $('#aSubmit').click(function(event) {
        this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
        $.post("/api.php", {
            action: "edit",
            title: config.wgPageName,
            token: mw.user.tokens.values.editToken,
            bot: true,
            appendtext: $("#QLicenseSelect").val(),
            summary: "Aggiunta della licenza"
        }, function(result) {
            window.location = config.wgServer + '/index.php?title=' + config.wgPageName + '&action=purge';
        });
    });
});
//