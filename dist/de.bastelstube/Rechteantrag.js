/** <nowiki>
 * @localname: Rechteantrag
 * @name: Adoptions
 * @description: Form for adoptions
 * @author: Pcj (based on work by Unai01, Lil' Miss Rarity, Jr Mime and bola)
 */
 mw.loader.using(['jquery.client', 'mediawiki.base','mediawiki.api']).then(function() {
    var exception = '';
    var userName = mw.config.get('wgUserName');
    if (mw.config.get('wgPageName') !== 'Rechte-Antrag' || !userName) {
        return;
    }
    function filterFandomDomain(input, fAllowed) {
        var fandomDomainRE = /(?:https?:\/\/)?(.*?\.)(fandom\.com)(\/[^\/]*?)?(?:\/.*)?$/;
        var filteredDomain = input.match(fandomDomainRE);
        if (!filteredDomain) return null;
        filteredDomain.splice(0,1);
        if (filteredDomain[2] === '/wiki' || filteredDomain[2] === '/f') filteredDomain.pop();
        return filteredDomain.join('');
    }
    mw.hook('dev.modal').add(function(modal) {
        var adoptionModal = new window.dev.modal.Modal({
            title: 'Rechte-Antrag',
            content: {
                type: 'form',
                attr: {
                    'class': 'WikiaForm',
                    'id': 'adoption',
                    'method': '',
                    'name': ''
                },
                children: [
                    {
                        type: 'div',
                        classes: ['form-section'],
                        children: [
                            {
                                type: 'label',
                                text: 'Link',
                                attr: {
                                    'for': 'adoptionUrl'
                                }
                            },
                            {
                                type: 'input',
                                attr: {
                                    'id': 'adoptionUrl',
                                    'type': 'text',
                                    'required': '',
                                    'placeholder': 'https://wiki.fandom.com/de'
                                }
                            }
                        ]
                    },
                    {
                        type: 'div',
                        classes: ['form-section'],
                        children: [
                            {
                                type: 'label',
                                text: 'Wikiname',
                                attr: {
                                    'for': 'wikiname'
                                }
                            },
                            {
                                type: 'input',
                                classes: ['adoptionPrefill'],
                                attr: {
                                    'id': 'wikiname',
                                    'type': 'text',
                                    'disabled': '',
                                    'required': '',
                                    'placeholder': 'Wikiname'
                                }
                            }
                        ]
                    },
                    {
                        type: 'div',
                        classes: ['form-section'],
                        children: [
                            {
                                type: 'label',
                                text: 'Beantragtes Benutzerrecht',
                                attr: {
                                    'for': 'permissionstype'
                                }
                            },
                            {
                                type: 'select',
                                attr: {
                                    'id': 'permissionstype',
                                    'required': ''
                                },
                                children: [
                                    {
                                        type: 'option',
                                        text: 'Administrator',
                                        attr: {
                                            'value': 'sysop'
                                        }
                                    },
                                    {
                                        type: 'option',
                                        text: 'Inhalts-Moderator',
                                        attr: {
                                            'value': 'content-moderator'
                                        }
                                    },
                                    {
                                        type: 'option',
                                        text: 'Diskussions-Moderator',
                                        attr: {
                                            'value': 'threadmoderator'
                                        }
                                    },
                                    {
                                        type: 'option',
                                        text: 'Bot',
                                        attr: {
                                            'value': 'bot'
                                        }
                                    },
                                    {
                                        type: 'option',
                                        text: 'Bürokrat',
                                        attr: {
                                            'value': 'bureaucrat'
                                        }
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        type: 'div',
                        classes: ['form-section'],
                        children: [
                            {
                                type: 'label',
                                text: 'An wie vielen der letzten zehn Tage hast du das Wiki bearbeitet?',
                                attr: {
                                    'for': 'numDays'
                                }
                            },
                            {
                                type: 'input',
                                classes: ['adoptionPrefill'],
                                attr: {
                                    'id': 'numDays',
                                    'type': 'number',
                                    'value': '0',
                                    'disabled': '',
                                    'required': ''
                                }
                            }
                        ]
                    },
                    {
                        type: 'div',
                        classes: ['form-section'],
                        children: [
                            {
                                type: 'label',
                                text: 'Wie viele Administratoren waren innerhalb der letzten zwei Monate aktiv?',
                                attr: {
                                    'for': 'numAdmins'
                                }
                            },
                            {
                                type: 'input',
                                classes: ['adoptionPrefill'],
                                attr: {
                                    'id': 'numAdmins',
                                    'type': 'number',
                                    'value': '0',
                                    'disabled': '',
                                    'required': ''
                                }
                            }
                        ]
                    },
                    {
                        type: 'div',
                        classes: ['form-section'],
                        children: [
                            {
                                type: 'label',
                                text: 'Ggf. Link zur Diskussion über den Antrag',
                                attr: {
                                    'for': 'communityvote'
                                }
                            },
                            {
                                type: 'span',
                                text: 'https://wiki.fandom.com/de/f/p/',
                                attr: {
                                    'id': 'communityvote-prefix'
                                }
                            },
                            {
                                type: 'input',
                                attr: {
                                    'id': 'communityvote',
                                    'type': 'number',
                                    'placeholder': 'Post-ID'
                                }
                            }
                        ]
                    },
                    {
                        type: 'div',
                        classes: ['form-section'],
                        children: [
                            {
                                type: 'label',
                                text: 'Kommentar',
                                attr: {
                                    'for': 'comment'
                                }
                            },
                            {
                                type: 'textarea',
                                attr: {
                                    'id': 'comment',
                                    'name': '',
                                    'placeholder': 'Ausführliche Begründung des Antrags'
                                }
                            }
                        ]
                    }
                ]
            },
            id: 'requestWindow',
            size: 'large',
            buttons: [{
                id: 'submitButton',
                text: 'Absenden',
                primary: true,
                event: 'submitForm'
            }],
            closeTitle: 'Abbrechen',
            events: {
                submitForm: function () {
                    var $form = $('#adoption'),
                        wikiname = $form.find('#wikiname').val(),
                        url = 'https://'+filterFandomDomain($form.find('#adoptionUrl').val()),
                        permissionsType = $form.find('#permissionstype').val(),
                        numDays = $form.find('#numDays').val() || 0,
                        numAdmins = $form.find('#numAdmins').val() || 0,
                        comments = $form.find('#comment').val(),
                        communityVoteUrl = url + '/f/p/' + $form.find('#communityvote').val();
                    if (exception !== '') {
                        mw.notify(exception,{tag:'adoption',type:'error'});
                        return;
                    }
                    if (url.trim() === "") {
                        mw.notify('Wiki-Adresse fehlt.',{tag:'adoption',type:'warn'});
                        return;
                    }
                    if (wikiname.trim() === "") {
                        mw.notify('Wiki-Name fehlt.',{tag:'adoption',type:'warn'});
                        return;
                    }
                    var pagecontent = "{{Rechte-Antrag\n" +
                    "| 0-Status              = Offen\n" +
                    "| 1-Benutzername        = " + userName + "\n" +
                    "| 2-Wikiadresse         = " + url + "\n" +
                    "| 3-Benutzerrecht       = " + permissionsType + "\n" +
                    "| 4-Tage                = " + numDays + "\n" +
                    "| 5-Adminaktivität      = " + numAdmins + "\n" +
                    "| 6-Kommentar           = " + comments + "\n" +
                    "| 7-Diskussion          = " + communityVoteUrl + "\n" +
                    "}}";
                    adoptionModal.hide();
                    new mw.Api().get({
                        action: 'query',
                        list: 'allpages',
                        apnamespace: 114,
                        apprefix: wikiname,
                        aplimit: 'max'
                    }).done(function (data) {
                        var suffix = '';
                        var highestAdoption = 0;
                        var suffixRE = /.*\((\d+)\)/;
                        if (data.query) {
                            if (data.query.allpages.length > 0) highestAdoption = 1;
                            for (var p in data.query.allpages) {
                                if (data.query.allpages[p].title == undefined) continue;
                                var match = data.query.allpages[p].title.match(suffixRE);
                                if (!match) continue;
                                if (parseInt(match[1]) > highestAdoption) highestAdoption = parseInt(match[1]);
                            }
                            if (highestAdoption > 0) suffix = ' ('+(highestAdoption+1)+')';
                        }
                        new mw.Api().postWithEditToken({
                            action: 'edit',
                            title: "RA:"+wikiname+suffix,
                            text: pagecontent
                        }).done(function (data) {
                            if (data.edit) {
                                if (data.edit.warning) {
                                    mw.notify(data.edit.warning, {tag:'adoption',type:'error'});
                                    return;
                                }
                            }
                            location.href = mw.util.getUrl("RA:"+wikiname+suffix);
                        }).fail(function () {
                            mw.notify('Fehler beim Speichern.', {tag:'adoption',type:'error'});
                        });
                    }).fail(function () {
                        mw.notify('Antrag konnte nicht gespeichert werden.', {tag:'adoption',type:'error'});
                    });
                }
            }
        });
        adoptionModal.create();
        $('#adoption-form')
            .attr('class', 'wds-button btn-large')
            .text('Adoptuj wiki')
            .wrap($('<div>').css('text-align', 'center'))
            .css('cursor', 'pointer')
            .on('click', function() {
                adoptionModal.show();
            });
    });

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Modal.js',
            'u:dev:MediaWiki:UI-js/code.js'
        ]
    });
    $('body').off('change.adoptionURL').on('change.adoptionURL','#adoptionUrl',function() {
        $('.adoptionPrefill').prop('disabled',true);
        exception = '';
        var url = filterFandomDomain($('#adoptionUrl').val());
        if (!url) {
            mw.notify('Das Format der angegebenen URL wird nicht erkannt.',{tag:'adoption',type:'error'});
            $('.adoptionPrefill').prop('disabled',false);
            return;
        }
        if (url.startsWith('community.fandom.com')) {
            exception = 'Falsches Wiki';
            mw.notify(exception,{tag:'adoption',type:'error'});
            return;
        }
        $.getJSON('//'+url+'/api.php?format=json&callback=?',{
            action:'query',
            meta:'siteinfo',
            siprop:'general|statistics',
            list:'allusers|usercontribs|users',
            uclimit:'max',
            ucuser:userName,
            ucnamespace:0,
            ucdir:'newer',
            ucstart:Math.floor((new Date().getTime()-864000000)/1000), // edits by user in the last 10 days
            augroup:'sysop|bureaucrat',
            aulimit:'max',
            auwitheditsonly:1, // avoid auactiveusersonly
            usprop:'groups',
            ususers:userName
        }).done(function(data) {
            if (!data.query) {
                mw.notify('Wiki hat auf die automatische Abfrage nicht geantwortet. Die erforderlichen Details müssen manuell eingegeben werden.',{tag:'adoption',type:'error'});
                $('.adoptionPrefill').prop('disabled',false);
                return;
            }
            if (data.query.general) {
                if (['en','es','pl','fr','ru','it','nl','pt','pt-br','zh'].indexOf(data.query.general.lang) != -1) {
                    mw.notify('This is the German Community Central. Only German wikis can be adopted here.',{tag:'adoption',type:'warn'});
                }
                $('#wikiname').val(data.query.general.sitename);
                $('#communityvote-prefix').text('https://' + url + '/f/p/');
            }
            if (data.query.statistics) {
                if (data.query.statistics.activeusers > 3) {
                    mw.notify('Es gibt andere aktive Benutzer im Wiki. Starte bitte eine Diskussion über den Antrag und verlinke die Diskussion.', {tag:'adoption',type:'warn'});
                }
            }
            var ucDays = 0;
            if (data.query.usercontribs) {
                if (data.query.usercontribs.length === 0) {
                    exception = 'Du solltest das Wiki mindestens eine Woche bearbeiten, bevor du einen Antrag stellst.';
                    mw.notify(exception,{tag:'adoption',type:'warn'});
                    return;
                }
                var ucDArr = [];
                for (var u in data.query.usercontribs) {
                    var ucDay = data.query.usercontribs[u].timestamp.slice(0,10);
                    if (ucDArr.indexOf(ucDay) == -1) ucDArr.push(ucDay);
                }
                ucDays = ucDArr.length;
                if (ucDays < 5) {
                    mw.notify('Du solltest das Wiki mindestens eine Woche bearbeiten, bevor du einen Antrag stellst.',{tag:'adoption',type:'warn'});
                }
            }
            $('#numDays').val(ucDays);
            if (data.query.allusers) {
                var usProm = [];
                for (var us in data.query.allusers) {
                    usProm.push($.getJSON('//'+url+'/api.php?format=json&callback=?',{
                        action:'query',
                        list:'usercontribs',
                        uclimit:1,
                        ucuserids:data.query.allusers[us].userid,
                        ucend: Math.floor((new Date().getTime()-5184000000)/1000) // 60 days
                    }));
                }
                Promise.allSettled(usProm).then(function(usdata) {
                    var numAdmins = 0;
                    for (var d in usdata) {
                        if (usdata[d].value.query) {
                            if (usdata[d].value.query.usercontribs.length > 0) numAdmins++;
                        }
                    }
                    if (numAdmins > 0) {
                        mw.notify('Das Wiki hat aktive Admins, die dem Antrag zustimmen müssen.', {tag:'adoption',type:'warn'});
                    }
                    $('#numAdmins').val(numAdmins);
                });
            }
        }).fail(function(data) {
            mw.notify('Das Wiki hat auf die automatische Datenabfrage nicht geantwortet. Die Details müssen manuell angegeben werden.',{tag:'adoption',type:'error'});
            $('.adoptionPrefill').prop('disabled',false);
            return;
        });
    });
});