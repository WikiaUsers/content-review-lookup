/** <nowiki>
 * @localname: Richiesta_di_diritti
 * @name: Adoptions
 * @description: Form for adoptions
 * @author: Pcj (based on work by Unai01, Lil' Miss Rarity, Jr Mime and bola)
 */
 mw.loader.using(['jquery.client', 'mediawiki.base','mediawiki.api']).then(function() {
    var exception = '';
    var userName = mw.config.get('wgUserName');
    if (mw.config.get('wgPageName') !== 'Richiesta di diritti' || !userName) {
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
            title: 'Richesta di diritti',
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
                                    'placeholder': 'https://wiki.fandom.com/it'
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
                                text: 'Nome della wiki',
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
                                    'placeholder': 'Nome della wiki'
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
                                text: 'Richiesta di diritti',
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
                                        text: 'Amministratore',
                                        attr: {
                                            'value': 'sysop'
                                        }
                                    },
                                    {
                                        type: 'option',
                                        text: 'Moderatore di contenuti',
                                        attr: {
                                            'value': 'content-moderator'
                                        }
                                    },
                                    {
                                        type: 'option',
                                        text: 'Moderatore di discussioni',
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
                                text: 'Degli ultimi dieci giorni, in quanti hai modificato la wiki?',
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
                                text: 'Quanti amministratori sono stati attivi negli ultimi 60 giorni?',
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
                                text: 'Inserisci il link della discussione in cui gli altri utenti hanno appoggiato la tua candidatura',
                                attr: {
                                    'for': 'communityvote'
                                }
                            },
                            {
                                type: 'span',
                                text: 'https://wiki.fandom.com/it/f/p/',
                                attr: {
                                    'id': 'communityvote-prefix'
                                }
                            },
                            {
                                type: 'input',
                                attr: {
                                    'id': 'communityvote',
                                    'type': 'number',
                                    'placeholder': 'ID del post'
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
                                text: 'Commento',
                                attr: {
                                    'for': 'comment'
                                }
                            },
                            {
                                type: 'textarea',
                                attr: {
                                    'id': 'comment',
                                    'name': '',
                                    'placeholder': 'Spiega perché vuoi ottenere questi diritti e perché ritieni di essere un buon candidato.'
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
                text: 'Invia',
                primary: true,
                event: 'submitForm'
            }],
            closeTitle: 'Annulla',
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
                        mw.notify('Manca l\'indirizzo della wiki.',{tag:'adoption',type:'warn'});
                        return;
                    }
                    if (wikiname.trim() === "") {
                        mw.notify('Manca il nome della wiki.',{tag:'adoption',type:'warn'});
                        return;
                    }
                    if (comments.trim() === "") {
                        mw.notify('Spiega perché vuoi ottenere questi diritti e perché ritieni di essere un buon candidato.',{tag:'adoption',type:'warn'});
                        return;
                    }
                    var pagecontent = "{{Richiesta di diritti\n" +
                    "| 0-status              = Aperta\n" +
                    "| 1-user                = " + userName + "\n" +
                    "| 2-link_to_wiki        = " + url + "\n" +
                    "| 3-type                = " + permissionsType + "\n" +
                    "| 4-your_activity       = " + numDays + "\n" +
                    "| 5-admin_activity      = " + numAdmins + "\n" +
                    "| 6-your_motivation     = " + comments + "\n" +
                    "| 7-community_vote      = " + communityVoteUrl + "\n" +
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
                            title: "Richiesta: "+wikiname+suffix,
                            text: pagecontent
                        }).done(function (data) {
                            if (data.edit) {
                                if (data.edit.warning) {
                                    mw.notify(data.edit.warning, {tag:'adoption',type:'error'});
                                    return;
                                }
                            }
                            location.href = mw.util.getUrl("Richiesta: "+wikiname+suffix);
                        }).fail(function () {
                            mw.notify('Si è verificato un problema durante l\'elaborazione della tua richiesta.', {tag:'adoption',type:'error'});
                        });
                    }).fail(function () {
                        mw.notify('Non è stato possibile salvare la tua richiesta.', {tag:'adoption',type:'error'});
                    });
                }
            }
        });
        adoptionModal.create();
        $('#adoption-form')
            .attr('class', 'wds-button btn-large')
            .text('Adozione di una wiki')
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
            mw.notify('Il formato dell\'url fornito non è riconosciuto.',{tag:'adoption',type:'error'});
            $('.adoptionPrefill').prop('disabled',false);
            return;
        }
        if (url.startsWith('community.fandom.com')) {
            exception = 'Non puoi adottare una wiki ufficiale di Fandom.';
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
                mw.notify('La wiki non ha risposto alla query automatica. Dovrai inserire i dettagli richiesti manualmente.',{tag:'adoption',type:'error'});
                $('.adoptionPrefill').prop('disabled',false);
                return;
            }
            if (data.query.general) {
                if (['de','en','es','pl','fr','ru','nl','pt','pt-br','zh'].indexOf(data.query.general.lang) != -1) {
                    mw.notify('This is the Italian Community Central. Only Italian wikis can be adopted here.',{tag:'adoption',type:'warn'});
                }
                $('#wikiname').val(data.query.general.sitename);
                $('#communityvote-prefix').text('https://' + url + '/f/p/');
            }
            if (data.query.statistics) {
                if (data.query.statistics.activeusers > 3) {
                    mw.notify('Ci sono altri utenti attivi sulla wiki. Inserisci il link della discussione in cui hai ottenuto la loro approvazione per essere promosso.', {tag:'adoption',type:'warn'});
                }
            }
            var ucDays = 0;
            if (data.query.usercontribs) {
                if (data.query.usercontribs.length === 0) {
                    exception = 'Devi avere modificato la wiki nell\'ultima settimana per poter essere promosso.';
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
                    mw.notify('Ricorda che dovresti aver contribuito alla wiki in modo continuativo per una settimana prima di inviare una richiesta di promozione.',{tag:'adoption',type:'warn'});
                }
            }
            $('#numDays').val(ucDays);
            if (data.query.users) {
                if (data.query.users[0]) {
                    if (data.query.users[0].groups) {
                        if (data.query.users[0].groups.indexOf('sysop') > -1) {
                            mw.notify('Hai già i diritti di amministratore su questa wiki, non è necessario adottarla.',{tag:'adoption',type:'warn'});
                            return;
                        }
                    }
                }
            }
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
                        mw.notify('Ricorda che, se ci sono amministratori attivi, dovresti contattarli prima di inviare una richiesta di adozione.', {tag:'adoption',type:'warn'});
                    }
                    $('#numAdmins').val(numAdmins);
                });
            }
        }).fail(function(data) {
            mw.notify('La wiki non ha risposto alla query automatica. Dovrai inserire i dettagli richiesti manualmente.',{tag:'adoption',type:'error'});
            $('.adoptionPrefill').prop('disabled',false);
            return;
        });
    });
});