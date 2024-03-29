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
    	'': '',
		'== Licentie ==\n{{Auteursrecht van EA|fanon}}': 'Fanon Sim of afbeelding',
		'== Licentie ==\n{{Auteursrecht van EA|sim1}}': 'Sim van The Sims',
		'== Licentie ==\n{{Auteursrecht van EA|sim2}}': 'Sim van De Sims 2',
		'== Licentie ==\n{{Auteursrecht van EA|sim3}}': 'Sim van De Sims 3',
		'== Licentie ==\n{{Auteursrecht van EA|sim4}}': 'Sim van De Sims 4',
		'== Licentie ==\n{{Auteursrecht van EA|simlv}}': 'Sim van Levensverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|simdv}}': 'Sim van Dierenverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|simev}}': 'Sim van Eilandverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|simcon}}': 'Sim van een console',
		'== Licentie ==\n{{Auteursrecht van EA|simm}}': 'Sim van Middeleeuwen',
		'== Licentie ==\n{{Auteursrecht van EA|huisdier}}': 'Huisdier',
		'== Licentie ==\n{{Auteursrecht van EA|fam}}': 'Familie',
		'== Licentie ==\n{{Auteursrecht van EA|kavel1}}': 'Kavel van The Sims',
		'== Licentie ==\n{{Auteursrecht van EA|kavel2}}': 'Kavel van De Sims 2',
		'== Licentie ==\n{{Auteursrecht van EA|kavel3}}': 'Kavel van De Sims 3',
		'== Licentie ==\n{{Auteursrecht van EA|kavel4}}': 'Kavel van De Sims 4',
		'== Licentie ==\n{{Auteursrecht van EA|kavellv}}': 'Kavel van Levensverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|kaveldv}}': 'Kavel van Dierenverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|kavelev}}': 'Kavel van Eilandverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|kavelm}}': 'Kavel van Middeleeuwen',
		'== Licentie ==\n{{Auteursrecht van EA|voor}}': 'Voorwerp',
		'== Licentie ==\n{{Auteursrecht van EA|her}}': 'Herinnering',
		'== Licentie ==\n{{Auteursrecht van EA|vae}}': 'Verlangen of Angst',
		'== Licentie ==\n{{Auteursrecht van EA|gemoed}}': 'Gemoedstoestand',
		'== Licentie ==\n{{Auteursrecht van EA|eigen}}': 'Eigenschap',
		'== Licentie ==\n{{Auteursrecht van EA|ster}}': 'Sterrenbeeld',
		'== Licentie ==\n{{Auteursrecht van EA|icoon1}}': 'Icoon uit The Sims',
		'== Licentie ==\n{{Auteursrecht van EA|icoon2}}': 'Icoon uit De Sims 2',
		'== Licentie ==\n{{Auteursrecht van EA|icoon3}}': 'Icoon uit De Sims 3',
		'== Licentie ==\n{{Auteursrecht van EA|icoon4}}': 'Icoon uit De Sims 4',
		'== Licentie ==\n{{Auteursrecht van EA|icoon1}}': 'Icoon uit The Sims',
		'== Licentie ==\n{{Auteursrecht van EA|s2com}}': 'Icoon van TheSims2.com/ Desims2.nl',
		'== Licentie ==\n{{Auteursrecht van EA|s3com}}': 'Icoon van TheSims3.com/ Desims3.nl',
		'== Licentie ==\n{{Auteursrecht van EA|s4com}}': 'Icoon van TheSims4.com/ Desims4.nl',
		'== Licentie ==\n{{Auteursrecht van EA|box}}': 'Covers',
		'== Licentie ==\n{{Auteursrecht van EA|logo}}': 'Spel logo of icoon',
		'== Licentie ==\n{{Auteursrecht van EA|render}}': 'Promotie materiaal',
		'== Licentie ==\n{{Auteursrecht van EA|ss1}}': 'Afbeelding uit The Sims',
		'== Licentie ==\n{{Auteursrecht van EA|ss2}}': 'Afbeelding uit De Sims 2',
		'== Licentie ==\n{{Auteursrecht van EA|ss3}}': 'Afbeelding uit De Sims 3',
		'== Licentie ==\n{{Auteursrecht van EA|ss4}}': 'Afbeelding uit De Sims 4',
		'== Licentie ==\n{{Auteursrecht van EA|sslv}}': 'Afbeelding uit Levensverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|ssdv}}': 'Afbeelding uit Dierenverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|ssev}}': 'Afbeelding uit Eilandverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|ssmid}}': 'Afbeelding uit Middeleeuwen',
		'== Licentie ==\n{{Auteursrecht van EA|sscon}}': 'Afbeelding uit console spellen',
		'== Licentie ==\n{{Auteursrecht van EA}}': 'Iets anders uit De Sims serie',
		'== Licentie ==\n{{Auteursrecht van DSW}}': 'Iets van De Sims Wiki',
		'== Licentie ==\n{{Auteursrecht van Wikia}}': 'Iets van Wikia',
                '== Licentie ==\n{{Auteursrecht onbekend}}': 'Licentie onbekend'
    };
    var optstr = '';
    for (var i in options) {
        if (options.hasOwnProperty(i)) {
            optstr += '<option value="' + i + '" style="text-align:left;padding-bottom:10px;">' + options[i] + '</option>';
        }
    }

    var html = '<p style="text-align:left;"><select id="QLicenseSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Add license</a>';
    if ($('#LicensedFile').length || $('#Licensing').length) {
        html += '&nbsp;<span style="color:#008000; font-weight:bold; text-align:left;">This page has a license template.</span> (<a href="https://sims.fandom.com/wiki/Help:Quick_license">help</a>)</p>';
    } else {
        html += '&nbsp;<span style="color:#ff0000; font-weight:bold; text-align:left;">This page does not have a license template! Consider adding one.</span> (<a href="https://sims.fandom.com/wiki/Help:Quick_license">help</a>)</p>';
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
            summary: "Adding license template using [[Help:Quick license|Quick license]]"
        }, function(result) {
            window.location = config.wgServer + '/index.php?title=' + config.wgPageName + '&action=purge';
        });
    });
});
//