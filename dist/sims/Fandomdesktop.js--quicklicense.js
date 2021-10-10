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
        ' ': 'Select a license',
		'== Licensing ==\n{{Copyright by EA|fanon}}': 'Fanon image',
		'== Licensing ==\n{{Copyright by EA|sim1}}': 'Sim from TS1',
                '== Licensing ==\n{{Copyright by EA|ss1}}': 'Screenshot from TS1',
                '== Licensing ==\n{{Copyright by EA|lot1}}': 'Lot from TS1',
                '== Licensing ==\n{{Copyright by EA|sim2}}': 'Sim from TS2',
                '== Licensing ==\n{{Copyright by EA|ss2}}': 'Screenshot from TS2',
                '== Licensing ==\n{{Copyright by EA|lot2}}': 'Lot from TS2',
		'== Licensing ==\n{{Copyright by EA|sim3}}': 'Sim from TS3',
                '== Licensing ==\n{{Copyright by EA|ss3}}': 'Screenshot from TS3',
                '== Licensing ==\n{{Copyright by EA|lot3}}': 'Lot from TS3',
                '== Licensing ==\n{{Copyright by EA|sim4}}': 'Sim from TS4',
                '== Licensing ==\n{{Copyright by EA|ss4}}': 'Screenshot from TS4',
                '== Licensing ==\n{{Copyright by EA|lot4}}': 'Lot from TS4',
                '== Licensing ==\n{{Copyright by EA|simls}}': 'Sim from Life Stories',
                '== Licensing ==\n{{Copyright by EA|lotls}}': 'Lot from Life Stories',
                '== Licensing ==\n{{Copyright by EA|ssls}}': 'Screenshot from Life Stories',
                '== Licensing ==\n{{Copyright by EA|simps}}': 'Sim from Pet Stories',
                '== Licensing ==\n{{Copyright by EA|lotps}}': 'Lot from Pet Stories',
                '== Licensing ==\n{{Copyright by EA|ssps}}': 'Screenshot from Pet Stories',
                '== Licensing ==\n{{Copyright by EA|lotcs}}': 'Lot from Castaway Stories',
                '== Licensing ==\n{{Copyright by EA|sscs}}': 'Screenshot from Castaway Stories',
                '== Licensing ==\n{{Copyright by EA|simcon}}': 'Sim from a console game',
                '== Licensing ==\n{{Copyright by EA|sscon}}': 'Screenshot from a console game',
                '== Licensing ==\n{{Copyright by EA|obj}}': 'An object',
                '== Licensing ==\n{{Copyright by EA|pet}}': 'A pet',
                '== Licensing ==\n{{Copyright by EA|box}}': 'Box art',
                '== Licensing ==\n{{Copyright by EA|obj}}': 'An object',
                '== Licensing ==\n{{Copyright by EA|mem}}': 'A memory',
                '== Licensing ==\n{{Copyright by EA|mood}}': 'A moodlet',
                '== Licensing ==\n{{Copyright by EA|moodnf}}': 'A moodlet with no frame',
                '== Licensing ==\n{{Copyright by EA|trait}}': 'A trait',
                '== Licensing ==\n{{Copyright by EA|zodiac}}': 'A zodiac sign',
                '== Licensing ==\n{{Copyright by EA|logo}}': 'A game logo',
                '== Licensing ==\n{{Copyright by EA|icon}}': 'A game icon',
                '== Licensing ==\n{{Copyright by EA|waf}}': 'A want or fear',
                '== Licensing ==\n{{Copyright by EA|interface}}': 'Something from the game interface',
                '== Licensing ==\n{{Copyright by EA|render}}': 'A game render',
                '== Licensing ==\n{{Copyright by EA|promo}}': 'A promotional image',
                '== Licensing ==\n{{Copyright by EA}}': 'Something else from The Sims series/other EA-copyrighted image',
                '== Licensing ==\n{{Copyrighted by Wikia}}': 'Something part of the Wikia interface',
		'== Licensing ==\n{{Fairuse}}': 'Fair use',
                '== Licensing ==\n{{cc-by-sa-3.0}}': 'This is licensed under Creative Commons Attribution 3.0 (free license)',
                '== Licensing ==\n{{GFDL}}': 'This is licensed under GFDL (free license)',
                '== Licensing ==\n{{PD}}': 'Public domain',
                '== Licensing ==\n{{No license}}': 'License unknown'
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