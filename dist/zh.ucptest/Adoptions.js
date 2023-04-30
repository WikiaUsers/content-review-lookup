/** <nowiki>
 * @name: Adoptions
 * @description: Form for adoptions
 * @author: Pcj (based on work by Unai01, Lil' Miss Rarity, Jr Mime and bola)
 * @ZH Translator:铁桶
 */
mw.loader.using(['jquery.client', 'mediawiki.base','mediawiki.api']).then(function() {
    var exception = '';
    var userName = mw.config.get('wgUserName');
    if (mw.config.get('wgPageName') !== 'Adoption:申请' || !userName) {
        return;
    }
    function filterFandomDomain(input) {
        var fandomDomainRE = /(?:https?:\/\/)?(.*?\.)(gamepedia\.com|wikia\.org|fandom\.com)(\/[^\/]*?)?(?:\/.*)?$/;
        var filteredDomain = input.match(fandomDomainRE);
        if (!filteredDomain) return null;
        filteredDomain.splice(0,1);
        if (filteredDomain[2] === '/wiki' || filteredDomain[2] === '/f') filteredDomain.pop();
        return filteredDomain.join('');
    }
    mw.hook('dev.modal').add(function(modal) {
        var adoptionModal = new window.dev.modal.Modal({
            title: '领养申请',
            content: '<form class="WikiaForm" id="adoption" method="" name=""> <div class="form-section"> <label for="adoptionUrl"><span class="fandom-icons icon-link"></span>网址</label> <input id="adoptionUrl" type="text" placeholder="https://wiki.fandom.com/zh/"> </div> <div class="form-section"> <label for="wikiname"><span class="fandom-icons icon-fandom-heart"></span>wiki名称</label> <input class="adoptionPrefill" id="wikiname" placeholder="wiki名称" type="text" required disabled> </div> <div class="form-section"> <label for="numDays"><span class="fandom-icons icon-numbered-list"></span>过去10天内编辑的天数</label> <input id="numDays" type="number" value="0" class="adoptionPrefill" disabled="" required=""></div> <div class="form-section"> <label for="numAdmins"><span class="fandom-icons icon-user"></span>过去60天内活跃的管理员人数</label> <input id="numAdmins" type="number" value="0" class="adoptionPrefill" disabled="" required=""></div> <div class="form-section"> <label for="comment"><span class="fandom-icons icon-reply"></span>领养留言</label> <textarea id="comment" name="" placeholder="关于领养申请的留言。您可以告诉我们为什么您想要领养这个wiki，为什么您能够胜任管理员，以及与其他活跃编辑者交流过的记录。"></textarea></div></form>',
            id: 'requestWindow',
            size: 'large',
            buttons: [{
                id: 'submitButton',
                text: '提交',
                primary: true,
                event: 'submitForm'
            }],
            closeTitle: '取消',
            events: {
                submitForm: function () {
                    var $form = $('#adoption'),
                        wikiname = $form.find('#wikiname').val(),
                        url = 'https://'+filterFandomDomain($form.find('#adoptionUrl').val()),
                        numDays = $form.find('#numDays').val() || 0,
                        numAdmins = $form.find('#numAdmins').val() || 0,
                        comments = $form.find('#comment').val();
                    if (exception !== '') {
                        mw.notify(exception,{tag:'adoption',type:'error'});
                        return;
                    }
                    if (url.trim() === "") {
                        mw.notify('请输入wiki网址。',{tag:'adoption',type:'warn'});
                        return;
                    }
                    if (wikiname.trim() === "") {
                        mw.notify('请输入wiki名称。',{tag:'adoption',type:'warn'});
                        return;
                    }
                    if (comments.trim() === "") {
                        mw.notify('请尝试留下些理由。例如为什么您想要领养这个wiki，为什么您能够胜任管理员。',{tag:'adoption',type:'warn'});
                        return;
                    }
                    var pagecontent = "{{Forumheader/Adoption requests}}\n\n" + "'''What is your username?'''\n" + userName + "\n\n'''Please link to the wiki here:'''\n" + url + "\n\n'''How many days have you edited the wiki in the past 10 days?'''\n" + numDays + "\n\n'''On the Special Pages  → Special:ListAdmins, how many admins have been active in the past 60 days?'''\n" + numAdmins + "\n\n'''Comments/Reasons for adoption:'''\n" + comments + "\n\n\n[[Category:领养申请|{{PAGENAME}}]]";
                    adoptionModal.hide();
                    new mw.Api().get({
                        action: 'query',
                        list: 'allpages',
                        apnamespace: 112,
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
                        }).done(function (data) {
                            if (data.edit) {
                                if (data.edit.warning) {
                                    mw.notify(data.edit.warning, {tag:'adoption',type:'error'});
                                    return;
                                }
                            }
                            location.href = mw.util.getUrl("Adoption:"+wikiname+suffix);
                        }).fail(function () {
                            mw.notify('提交失败！在提交您的领养申请时发生错误。', {tag:'adoption',type:'error'});
                        });
                    }).fail(function () {
                        mw.notify('提交失败！在提交您的领养申请时发生错误。', {tag:'adoption',type:'error'});
                    });
                }
            }
        });
        adoptionModal.create();
        $('#adoptions')
            .attr('class', 'wds-button btn-large')
            .text('创建领养申请')
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
        exception = '';
        var url = filterFandomDomain($('#adoptionUrl').val());
        if (!url) {
            mw.notify('无法识别网址的格式。',{tag:'adoption',type:'error'});
            $('.adoptionPrefill').prop('disabled',false);
            return;
        }
        if (url.startsWith('community.fandom.com')) {
            exception = 'Fandom官方的wiki不可领养。';
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
                mw.notify('wiki未回应自动查询，请手动填写有关信息。',{tag:'adoption',type:'error'});
                $('.adoptionPrefill').prop('disabled',false);
                return;
            }
            if (data.query.general) {
                if (['es','de','fr','ru','it','pl','nl','pt','pt-br','zh'].indexOf(data.query.general.lang) != -1) {
                    mw.notify('请前往相应语言的社区中心申请领养。',{tag:'adoption',type:'warn'});
                }
                $('#wikiname').val(data.query.general.sitename);
            }
            if (data.query.statistics) {
                if (data.query.statistics.activeusers > 0) {
                    mw.notify('这个wiki上仍有一些活跃编辑者。建议您创建讨论版帖子，描述您领养wiki的意图，并让其给出反馈。如果您已创建有关帖子，请确保说明中有该帖子的链接。', {tag:'adoption',type:'warn'});
                }
            }
            var ucDays = 0;
            if (data.query.usercontribs) {
                if (data.query.usercontribs.length === 0) {
                    exception = '如要领养，您必须在过去一周内对wiki有所贡献。';
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
                    mw.notify('注意：在提交领养申请之前，您应在wiki上连续贡献一周。',{tag:'adoption',type:'warn'});
                }
            }
            $('#numDays').val(ucDays);
            if (data.query.users) {
                if (data.query.users[0]) {
                    if (data.query.users[0].groups) {
                        if (data.query.users[0].groups.indexOf('bureaucrat') > -1) {
                            exception = '您已是这个wiki的行政员，不必领养这个wiki。';
                            mw.notify(exception,{tag:'adoption',type:'error'});
                            return;
                        }
                        if (data.query.users[0].groups.indexOf('sysop') > -1) {
                            mw.notify('您已是这个wiki的管理员。除非您要申请行政员权限，否则您不必领养这个wiki。',{tag:'adoption',type:'warn'});
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
                        mw.notify('注意：如果仍有活跃管理员，您应该与其联系并讨论您成为管理员的事宜。', {tag:'adoption',type:'warn'});
                    }
                    $('#numAdmins').val(numAdmins);
                });
            }
        }).fail(function(data) {
            mw.notify('wiki未回应自动查询，请手动填写有关信息。',{tag:'adoption',type:'error'});
            $('.adoptionPrefill').prop('disabled',false);
            return;
        });
    });
});