/** <nowiki>
 * @name: Adoptions
 * @description: Form for adoptions
 * @author: Pcj (based on work by Unai01, Lil' Miss Rarity, Jr Mime and bola)
 */
mw.loader.using(['jquery.client', 'mediawiki.base','mediawiki.api']).then(function() {
    var userName = mw.config.get('wgUserName');
    if (mw.config.get('wgPageName') !== 'Adoption:Requests' || !userName) {
        return;
    }

    mw.hook('dev.modal').add(function(modal) {
        var adoptionModal = new window.dev.modal.Modal({
            title: 'Adoption Request',
            content: '<form class="WikiaForm" id="adoption" method="" name=""> <div class="form-section"> <label for="adoptionUrl"><span class="fandom-icons icon-link"></span> Link</label> <input id="adoptionUrl" type="text" placeholder="https://wiki.fandom.com"> </div> <div class="form-section"> <label for="wikiname"><span class="fandom-icons icon-fandom-heart"></span> Wiki Name</label> <input class="adoptionPrefill" id="wikiname" placeholder="Wiki Name" type="text" required disabled> </div> <div class="form-section"> <label for="numDays"><span class="fandom-icons icon-numbered-list"></span> Number of days edited in the past 10 days</label> <input id="numDays" type="number" value="0" class="adoptionPrefill" disabled="" required=""></div> <div class="form-section"> <label for="numAdmins"><span class="fandom-icons icon-user"></span> Number of admins active in the past 60 days</label> <input id="numAdmins" type="number" value="0" class="adoptionPrefill" disabled="" required=""></div> <div class="form-section"> <label for="comment"><span class="fandom-icons icon-reply"></span> Comments/Reasons to Adopt</label> <textarea id="comment" name="" placeholder="Comments about the adoption request. Please tell us why you want to adopt the wiki and how you are a good candidate to be admin."></textarea></div></form>',
            id: 'requestWindow',
            size: 'large',
            buttons: [{
                id: 'submitButton',
                text: 'Submit',
                primary: true,
                event: 'submitForm'
            }],
            closeTitle: 'Cancel',
            events: {
                submitForm: function () {
                    var $form = $('#adoption'),
                        wikiname = $form.find('#wikiname').val(),
                        url = $form.find('#adoptionUrl').val(),
                        numDays = $form.find('#numDays').val() || 0,
                        numAdmins = $form.find('#numAdmins').val() || 0,
                        comments = $form.find('#comment').val();
                    if (url.trim() === "") {
                        mw.notify('Please enter the wiki URL.',{tag:'adoption',type:'warn'});
                        return;
                    }
                    if (wikiname.trim() === "") {
                        mw.notify('Please enter the wiki name.',{tag:'adoption',type:'warn'});
                        return;
                    }
                    if (comments.trim() === "") {
                        mw.notify('Please try to leave some rationale as to why you want to adopt this wiki and why you would be a good fit as admin.',{tag:'adoption',type:'warn'});
                        return;
                    }
                    var pagecontent = "{{Forumheader/Adoption requests}}\n\n" + "'''What is your username?'''\n" + userName + "\n\n'''Please link to the wiki here:'''\n" + url + "\n\n'''How many days have you edited the wiki in the past 10 days?'''\n" + numDays + "\n\n'''On the Special Pages  → Special:ListAdmins, how many admins have been active in the past 60 days?'''\n" + numAdmins + "\n\n'''Comments/Reasons for adoption:'''\n" + comments + "\n\n\n[[Category:Adoption requests|{{PAGENAME}}]]";
                    adoptionModal.hide();
                    new mw.Api().get({
                        action: 'query',
                        list: 'allpages',
                        apnamespace: 118,
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
                            title: "Adoption:"+wikiname+suffix,
                            text: pagecontent
                        }).done(function () {
                            location.href = mw.util.getUrl("Adoption:"+wikiname+suffix);
                        }).fail(function () {
                            mw.notify('There were problems submitting your request.', {tag:'adoption',type:'error'});
                        });
                    }).fail(function () {
                        mw.notify('There were problems submitting your request.', {tag:'adoption',type:'error'});
                    });
                }
            }
        });
        adoptionModal.create();
        $('.WikiaMainContentContainer #adoptions')
            .attr('class', 'wds-button btn-large')
            .text('Adopt a Wiki')
            .wrap($('<div>').css('text-align', 'center'))
            .css('cursor', 'pointer')
            .on('click', function() {
                adoptionModal.show();
            });
    });

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Modal.js'
    });
    $('body').off('change.adoptionURL').on('change.adoptionURL','#adoptionUrl',function() {
        $('.adoptionPrefill').prop('disabled',true);
        function filterFandomDomain(input) {
            var fandomDomainRE = /(?:https?:\/\/)?(.*?\.)(gamepedia\.com|wikia\.org|fandom\.com)(\/[^\/]*?)?(?:\/.*)?$/;
            var filteredDomain = input.match(fandomDomainRE);
            if (!filteredDomain) return null;
            filteredDomain.splice(0,1);
            if (filteredDomain[2] === '/wiki' || filteredDomain[2] === '/f') filteredDomain.pop();
            return filteredDomain.join('');
        }
        var url = filterFandomDomain($('#adoptionUrl').val());
        if (!url) {
            mw.notify('The format of the URL provided was not recognized.',{tag:'adoption',type:'error'});
            $('.adoptionPrefill').prop('disabled',false);
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
                mw.notify('The wiki did not respond to an automated query. You will have to fill out the requested values.',{tag:'adoption',type:'error'});
                $('.adoptionPrefill').prop('disabled',false);
                return;
            }
            if (data.query.general) {
                if (['es','de','fr','ru','it','pl','nl','pt','pt-br','zh'].indexOf(data.query.general.lang) != -1) {
                    mw.notify('For international adoption requests, please expand the International adoption request links section and visit the Community Central for your language to make an adoption request.',{tag:'adoption',type:'warn'});
                }
                $('#wikiname').val(data.query.general.sitename);
            }
            if (data.query.statistics) {
                if (data.query.statistics.activeusers > 3) {
                    mw.notify('There appear to be at least a few other active users on the wiki. Please consider creating a Discussions post describing your intention to adopt the wiki and let them give their feedback. If you already have, please be sure to include a link to that post.', {tag:'adoption',type:'warn'});
                }
            }
                        var ucDays = 0;
            if (data.query.usercontribs) {
                var ucDArr = [];
                for (var u in data.query.usercontribs) {
                    var ucDay = data.query.usercontribs[u].timestamp.slice(0,10);
                    if (ucDArr.indexOf(ucDay) == -1) ucDArr.push(ucDay);
                }
                ucDays = ucDArr.length;
                if (ucDays < 5) {
                    mw.notify('Please keep in mind you should have contributed consistently to the wiki for a week prior to submitting a request.',{tag:'adoption',type:'warn'});
                }
            }
            $('#numDays').val(ucDays);
            if (data.query.users) {
                if (data.query.users[0]) {
                    if (data.query.users[0].groups) {
                        if (data.query.users[0].groups.indexOf('sysop') > -1 || data.query.users[0].groups.indexOf('bureaucrat') > -1) {
                            mw.notify('You are already an admin on this wiki. Please keep in mind you do not need to adopt a wiki you are already admin for unless you are applying to be a bureaucrat.',{tag:'adoption',type:'warn'});
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
                        mw.notify('Please keep in mind if there are already active admins you should contact them first regarding becoming admin yourself.', {tag:'adoption',type:'warn'});
                    }
                    $('#numAdmins').val(numAdmins);
                });
            }
        }).fail(function(data) {
            mw.notify('The wiki did not respond to an automated query. You will have to fill out the requested values.',{tag:'adoption',type:'error'});
            $('.adoptionPrefill').prop('disabled',false);
            return;
        });
    });
});