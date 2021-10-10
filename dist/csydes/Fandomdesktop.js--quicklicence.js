/*Quick image licence - contains the most commonly used licensing criteria*/
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
    	!config.wgUserGroups.join('|').match(/(assistant|autoconfirmed|content-moderator|sysop)/) ||
        config.wgNamespaceIds.file !== config.wgNamespaceNumber ||
        config.wgAction !== 'view' ||
        window.QLicenseLoaded
    ) return;

    var options = {
        ' ': 'Select a licence',
        '==Licensing==\n{{Fairuse}}': 'This is used in a way that qualifies as fair use under US law',
        '==Licensing==\n{{Self}}': 'This was created by the uploader',
        '==Licensing==\n{{From Wikimedia}}': 'This is from Wikipedia or another Wikimedia project',
        '==Licensing==\n{{cc-by-sa-3.0}}': 'This is licensed under Creative Commons Attribution 3.0 (free licence)',
        '==Licensing==\n{{CC-BY-SA}}': 'This is licensed under Creative Commons Attribution-Share Alike Licence',
        '==Licensing==\n{{Other free}}': 'This is licensed under another free licence',
        '==Licensing==\n{{Copyrighted by Fandom}}': 'This is part of the interface on a wiki hosted by Fandom',
        '==Licensing==\n{{PD}}': 'This is in the public domain',
        '==Licensing==\n{{Permission}}': 'This is copyrighted, but use is permitted by the copyright holder',
        '==Licensing==\n{{No licence}}': 'Licence unknown'
    };
    var optstr = '';
    for (var i in options) {
        if (options.hasOwnProperty(i)) {
            optstr += '<option value="' + i + '" style="text-align:left;padding-bottom:10px;">' + options[i] + '</option>';
        }
    }

    var html = '<p style="text-align:left;"><select id="QLicenceSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Add licence</a>';
    if ($('#LicensedFile').length || $('#Licensing').length) {
        html += '&nbsp;<span style="color:#008000; font-weight:bold; text-align:left;">This page has a licence template.</span> (<a href="https://csydes.fandom.com/wiki/Help:Quick_licence">help</a>)</p>';
    } else {
        html += '&nbsp;<span style="color:#ff0000; font-weight:bold; text-align:left;">This page does not have a licence template! Consider adding one.</span> (<a href="https://csydes.fandom.com/wiki/Help:Quick_licence">help</a>)</p>';
    }
    $(html).insertAfter('#filetoc');
    $('#aSubmit').click(function(event) {
        this.innerHTML = '<img src="https://images.wikia.nocookie.net/csydes-test/images/0/05/Ajax.gif" style="vertical-align: baseline;" border="0" />';
        $.post("/api.php", {
            action: "edit",
            title: config.wgPageName,
            token: mw.user.tokens.values.editToken,
            bot: true,
            appendtext: $("#QLicenceSelect").val(),
            summary: "Adding licence template using [[Help:Quick licence|Quick licence]]"
        }, function(result) {
            window.location = config.wgServer + '/index.php?title=' + config.wgPageName + '&action=purge';
        });
    });
});
//