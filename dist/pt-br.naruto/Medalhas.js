;(function($,mw) {
 
    var namespace = mw.config.get('wgNamespaceNumber');
 
    if (namespace !== 2 && namespace !== 1200 && namespace !== 500 && 
        (namespace !== 10 || mw.config.get('wgTitle') !== 'Medalhas' || mw.config.get('wgAction') !== 'view')) {
        return;
    }
 
    medalFunctions = {
 
// Configurações
        medalDefaultSettings: function() {
            default_cfg = JSON.stringify({dataUser:{}, dataMedal: {}, module_title: 'Medalhas de Usuários', module_more: 'Mostrar mais', module_count_info: 'Quantidade', module_info: '', module_info_title: '', border: { top_left: '', top_right: '' }});
 
            $('#mw-content-text').prepend('<div style="width:100%; text-aling:center; padding:20px;">As configurações não existe ou estão quebradas.&nbsp;<button id="MedalResetSettings">Redefinir?</button></div>');
            $('#MedalResetSettings').click(function() {
                medalFunctions.saveSettingFunction(default_cfg);
            });
        },
 
// Funções
        switchSettings: function(class_name) {
            $('.MedalSetMenu').hide();
            $('.' + class_name).show();
        },
 
// Links
        medalMatcher: function(url) {
            if (url.match(/https?:\/\/(images?|vignette)\d?\.wikia\.nocookie\.net\//)) {
                return true;
            }

            return false;
        },
 
// Formato Novo       
        addMedalForm: function() {
            $('.MedalList').append(
                '<div class="MedalForm CustomForm" style="padding-bottom:5px; border-bottom:1px solid grey;">' +
                    '<div class="MedalImagePreview" style="display:inline-block; width:80px; text-align:center;">' +
                        '<img height="70" style="margin:0 5px -3px 0; cursor:auto;"/>' +
                    '</div>' +
                    '<div style="display:inline-block; width:475px;">' +
                        '<div style="margin-top:5px;">' + 
                            '<button onclick="medalFunctions.appendMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 4px; margin:0 6px 0 0; float:right;" title="Carregar">✓</button>' +
                            '<button onclick="medalFunctions.deleteMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 0 0 3px; margin:0 5px 0 0; float:right;">' + medalDeleteImg + '</button>' +
                            'Nome da medalha : ' + 
                            '<input class="MedalListName" style="float:right; width:334px; margin-right:5px;" data-prev="undefined"/>' +
                        '</div>' +
                        '<div style="margin-top:5px;">' +
                            'Título : ' +
                            '<input class="MedalListTitle" style="float:right; width:385px; margin-right:5px;" />' +
                        '</div>' +
                        '<div style="margin-top:5px;">' +
                            'Link da imagem : ' +
                            '<input class="MedalListLinkImage" style="float:right; width:385px;  margin-right:5px;" />' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        },
 
// Formato Novo de Usuário
        addUserForm: function() {
            $('.MedalUser').append(
                '<div class="UserForm CustomForm" style="text-align:center; margin-top:5px; border-bottom:1px solid black; padding-bottom:5px;">' +
                    '<input class="MedalUserName" style="float:left; width:40%; margin-left:5px;" />' +
                    '<button onclick="$(this).parents(\'.CustomForm\').remove()" style="padding:0 0 0 3px; margin:0 5px; float:left;">' + medalDeleteImg + '</button>' +
                    '<button onclick="$(this).parents(\'.UserForm\').find(\'.medalCollectForm\').toggle()" style="padding:0 0 0 3px; margin:0 5px; width:100px;">Medalhas</button>' +
                    '<br />' +
                    medalCollectForm +
                '</div>'
            );
        },
 
// Configurações de Usuários
        appendMedalSettings: function($that) {
            var imgLink = $that.find('.MedalListLinkImage').val();
            var titleNew = $that.find('.MedalListTitle').val();
            var nameNew = $that.find('.MedalListName').val();
            var prevName = $that.find('.MedalListName').attr('data-prev');
 
            $that.find('.MedalImagePreview img')
                .attr('src', imgLink)
                .attr('title', titleNew)
                .attr('data-prev', nameNew);
 
            if ($(medalCollectForm).find('[data-section="' + nameNew + '"]').length) {
                return;
            }
 
            var to_add = '<div class="medalCollectBox" data-section="' + nameNew + '" style="display:inline-block; margin:5px 0 0 10px;">' +
                            '<input type="checkbox">' + 
                                nameNew + 
                            '&nbsp;<input class="MedalCollectAmount" style="width:30px; text-align:center;"/>' +
                         '</div>';
 
            // Padrão
            var medalCollectSaveForm = $(medalCollectForm).append(to_add);
 
            $('.medalCollectForm').each(function() {
                $(this).append(to_add);
            });
 
            if (prevName !== 'undefined') {
                // Remover
                $('[data-section="' + prevName + '"]').remove();
                medalCollectSaveForm.find('[data-section="' + prevName + '"]').remove();
            }
 
            // Salvar
            medalCollectForm = medalCollectSaveForm.prop('outerHTML');
        },
 
// Deletar configurações de Usuários
        deleteMedalSettings: function($that) {
            var medal_name = $that.find('.MedalListName').val();
            var prev_name = $that.find('.MedalListName').attr('data-prev');
 
            // Padrão2
            var medalCollectSaveForm = $(medalCollectForm);
            medalCollectSaveForm.find('[data-section="' + medal_name + '"], [data-section="' + prev_name + '"]').remove();
            medalCollectForm = medalCollectSaveForm.prop('outerHTML');
 
            // Objetos
            $that.remove();
            $('[data-section="' + medal_name + '"], [data-section="' + prev_name + '"]').remove();
        },
 
// Resultado
        medalCollectFunction: function() {
            result = {};
            result.dataUser = {};
            result.dataMedal = {};
 
            // Configurações Principais
            result.module_title = $('#MedalTitle').val();
            result.module_more = $('#MedalMore').val();
            result.module_count_info = $('#MedalCount').val();
            result.module_info = $('#MedalInfo').val();
            result.module_info_title = $('#MedalInfoTitle').val();
 
            result.border = {
                top_left: $('#MedalBorderLeft').val(),
                top_right: $('#MedalBorderRight').val()
            };
 
            // Usuários
            $('.UserForm').each(function() {
                var user = $(this).find('.MedalUserName').val();
                if (user === '') return;
 
                var medals = [];
 
                $(this).find('.medalCollectBox').each(function() {
                    if ($(this).find('input[type="checkbox"]').attr('checked') !== 'checked') {
                        return;
                    }
 
                    var medal_name = $(this).attr('data-section');
                    var medal_count = $(this).find('.MedalCollectAmount').val();
                    if (medal_count.match(/\d+/) && medal_count !== 1) {
                        medal_name += ':' + medal_count;
                    }
 
                    medals.push(medal_name);
                });
 
                result.dataUser[user] = medals;
            });
 
            // Medalhas
            $('.MedalForm').each(function() {
                var medal_name = $(this).find('.MedalListName').val();
                if (medal_name === '') return;
 
                var medal_image = $(this).find('.MedalListLinkImage').val();
                if (!medalFunctions.medalMatcher(medal_image)) return;
 
                result.dataMedal[medal_name] = {
                    title: $(this).find('.MedalListTitle').val(),
                    image_url: medal_image
                };
            });
 
            return result;
        },
 
// Salvar configurações
        saveSettingFunction: function(medalSet) {
            $.ajax({
                url: '/api.php',
                type: 'POST',
                data: {
                    action: 'edit',
                    title: 'Predefinição:Medalhas',
                    summary: 'Alterações',
                    text: medalSet,
                    bot: 1,
                    token: mw.user.tokens.get('editToken'),
                    format: 'json'
                },
                success: function(d) {
                    if (d.edit.result == 'Success') {
                        location.href += (location.href.indexOf('?') > -1) ? '&action=purge' : '?action=purge';
                    }
                }
            });
        },

// Tooltip
        tooltip: function(that) {
            title = $(that).attr('data-title');
            badgename = $(that).attr('data-name');
            offSet = $(that).offset();
            setOffX = parseFloat(offSet.left) - 80 + $(that).width() / 2;
            setOffY = parseFloat(offSet.top) + $(that).height() + 5;
 
            $('body').append(
                '<div class="badgetooltip" style="position:absolute; z-index:5000;">' +
                    '<div class="badgetooltiparrow" style="width:0; height:0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 10px solid black; margin: 0 auto;" />' +
                    '<div style="width: 160px; background-color:white; border:2px solid black; text-align:center; padding:5px;">' +
                        $('<span style="font-weight:bold;" />').text(badgename).prop('outerHTML') +
                        '<br />' +
                        $('<span />').text(title).prop('outerHTML') +
                    '</div>' +
                '</div>'
            );
 
            $('.badgetooltip').css({top: setOffY, left: setOffX});
 
            $(that).on('mouseout', function() {
                $('.badgetooltip').remove();
            });
        },

// Função principal
        medalMainFunction: function() {
            user = mw.config.get('wgTitle');
            medalModal = false;
 
            if (typeof MedalSettings.dataUser[user] === 'undefined'|| !MedalSettings.dataUser[user].length) {
                return;
            }
 
            // Verificação
            medalBorderRight = (medalFunctions.medalMatcher(MedalSettings.border.top_right)) ? $('<img width="40" />').attr('src', MedalSettings.border.top_right).prop('outerHTML') : '';
            medalBorderLeft = (medalFunctions.medalMatcher(MedalSettings.border.top_left)) ? $('<img width="40" />').attr('src', MedalSettings.border.top_left).prop('outerHTML') : '';
 
            $('#WikiaRail').prepend(
                '<section class="RewardModule module">' +
                    '<div style="position:relative; width:100%; padding:25px 0;">' +
                        // Borders: Top-Left; Top-Right; Bottom-Left; Bottom-Right;
                        '<div style="position:absolute; top:0; left:0;">' + 
                            medalBorderLeft + 
                        '</div>' +
                        '<div style="position:absolute; top:0; right:0;">' + 
                            medalBorderRight + 
                        '</div>' +
                        '<div style="position:absolute; bottom:0; left:0; transform:rotate(180deg); -ms-transform:rotate(180deg); -webkit-transform:rotate(180deg); -moz-transform:rotate(180deg); -o-transform:rotate(180deg);">' + 
                            medalBorderRight + 
                        '</div>' +
                        '<div style="position:absolute; bottom:0; right:0; transform:rotate(180deg); -ms-transform:rotate(180deg); -webkit-transform:rotate(180deg); -moz-transform:rotate(180deg); -o-transform:rotate(180deg);">' + 
                            medalBorderLeft +
                        '</div>' +
                        // Título
                        $('<div style="width:100%; text-align:center; margin:-20px 0 5px 0; font-size:18px;" />').text(MedalSettings.module_title).prop('outerHTML') +
                        // Seção das medalhas
                        '<div class="RewardSection" style="margin:0 5px;">' + 
                            '<div class="in" style="text-align:center;" />' +
                        '</div>' +
                        // Seção adicional
                        '<div class="MedalAdditionalSection" style="width:100%; text-align:center;" />' +
                    '</div>' +
                '</section>'
            );
 
            if (MedalSettings.dataUser[user].length > 12) {
                medalModal = true;
 
                medalModalForm.append('<div class="ModalMedalCollection"><div class="in" style="text-align:center;"/></div>');
 
                $('.MedalAdditionalSection').append(
                        $('<button type="button" class="MedalMore" style="cursor:pointer;" />').text((MedalSettings.module_more === '' || typeof(MedalSettings.module_more) === 'undefined') ? 'Mostrar' : MedalSettings.module_more).prop('outerHTML')
                );
            }
 
            if (MedalSettings.module_info !== '' && typeof(MedalSettings.module_info) !== 'undefined') {
                $('.MedalAdditionalSection').append(
                    $('<a class="button" style="margin-left:1px; cursor:info;"/>')
                        .text(MedalSettings.module_info_title)
                        .attr('href', mw.config.get('wgServer') + '/wiki/' + MedalSettings.module_info)
                        .prop('outerHTML')
                );
            }
 
            if (!$('.MedalAdditionalSection').is(':empty')) {
                $('.MedalAdditionalSection').css('margin', '5px 0 -20px 0');
            }
 
            $.each(MedalSettings.dataUser[user], function (i, v) {
                imgBody = '';
 
                // +1
                if (v.indexOf(':') > -1) {
                    count = v.replace(/.+:(.+)/g, '$1');
                    v = v.replace(/(.+):.+/g, '$1');
                    imgBody += $('<div class="RewardCount" style="position:absolute; bottom:0; right:0; padding:0 4px; background-color:white; border:1px solid black; border-radius:10px; cursor:auto; color:black;" />').text('x' + count).attr('title', MedalSettings.module_count_info).prop('outerHTML');
                }
 
                // Proteção
                if (typeof(MedalSettings.dataMedal[v]) === 'undefined' || typeof(MedalSettings.dataMedal[v].image_url) === 'undefined' || !medalFunctions.medalMatcher(MedalSettings.dataMedal[v].image_url)) {
                    return;
                }
 
                imgBody += $('<img style="cursor:help; vertical-align:middle;" width="50" onmouseover="medalFunctions.tooltip(this);" />').attr('src', MedalSettings.dataMedal[v].image_url).attr('data-title', MedalSettings.dataMedal[v].title).attr('data-name', v).prop('outerHTML');
 
                if (medalModal) {
                    medalModalForm.find('.ModalMedalCollection .in').append('<div class="RewardImage" style="display:inline-block; position:relative; margin:2px 5px;">' + imgBody + '</div>');
 
                    if (i > 11) return;
                }
 
                $('.RewardSection .in').append('<div class="RewardImage" style="display:inline-block; position:relative; margin:2px 5px;">' + imgBody + '</div>');
            });
 
            $('.MedalMore').click(function() {
                $.showCustomModal( MedalSettings.module_title + ' ' + user, medalModalForm, {width: 400});
            });
        },
 
// Funções de configurações
        medalSettingsFunction: function() {
            var group_list = mw.config.get('wgUserGroups');
            if (group_list.indexOf('sysop') == -1 &&
                group_list.indexOf('helper') == -1 &&
                group_list.indexOf('staff') == -1 &&
                group_list.indexOf('vstf') == -1) {
                // No rights - nothing to do here :P
                return;
            }
 
            // Variáveis
            medalCollect = [];
            medalDeleteImg = '<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite trash" />';
            medalCollectForm = $('<div class="medalCollectForm" style="display:none; text-align:left; margin-top:5px; border-top:1px solid black;" />');
 
            if (typeof MedalSettings === "undefined") {
                medalFunctions.medalDefaultSettings();
 
                return;
            }
 
            $('#mw-content-text').prepend('<div style="width:100%; text-align:center; padding:20px;"><button id="MedalSettings">Configurações</button></div>');
 
            // Criar formas
            medalModalForm.append(
                '<div style="padding-bottom:5px; border-bottom:solid 1px #36759c; margin-top:-5px;">' +
                    '<div style="text-align:center;">' +
                        '<button type="button" class="wikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalMainDialog\')">Principal</button>&nbsp;' +
                        '<button type="button" class="wikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalUserDialog\')">Usuários</button>&nbsp;' +
                        '<button type="button" class="wikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalListDialog\')">Medalhas</button>' +
                    '</div>' +
                '</div>' +
                '<div style="height:270px;">' +
                    // Menu
                    '<div class="MedalMainDialog MedalSetMenu">' +
                        '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px #36759c; margin-bottom:5px;">Principais configurações</h2>' +
                        '<div>Module title: ' + $('<input id="MedalTitle" style="float:right; width:77%;" />').attr('value', MedalSettings.module_title).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Expand button: ' + $('<input id="MedalMore" style="float:right; width:77%;" />').attr('value', MedalSettings.module_more).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Quant. de Medalhas: ' + $('<input id="MedalCount" style="float:right; width:77%;" />').attr('value', MedalSettings.module_count_info).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Inf. das Medalhas: ' + $('<input id="MedalInfo" style="float:right; width:77%;" />').attr('value', MedalSettings.module_info).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Título das Medalhas: ' + $('<input id="MedalInfoTitle" style="float:right; width:77%;" />').attr('value', MedalSettings.module_info_title).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Borda Direita: ' + $('<input id="MedalBorderLeft" style="float:right; width:77%;" />').attr('value', MedalSettings.border.top_left).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Borda Esquerda: ' + $('<input id="MedalBorderRight" style="float:right; width:77%;" />').attr('value', MedalSettings.border.top_right).prop('outerHTML') + '</div>' +
                    '</div>' +
                    // Menu de Usuário
                    '<div class="MedalUserDialog MedalSetMenu" style="display:none;">' +
                        '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px #36759c;">' +
                            'Usuários' +
                            '<button onclick="medalFunctions.addUserForm()" style="padding:0 4px; margin:0 10px 0 0; float:right;">Adicionar novo usuário</button>' +
                        '</h2>' +
                        '<div class="MedalUser" style="height:240px; overflow-y:scroll; border-bottom:solid 1px #36759c;"/>' +
                    '</div>' +
                    // Menu de Medalhas
                    '<div class="MedalListDialog MedalSetMenu" style="display:none;">' +
                        '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px #36759c;">' +
                            'Medalhas' +
                            '<button onclick="medalFunctions.addMedalForm()" style="padding:0 4px; margin:0 10px 0 0; float:right;">Adicionar nova medalha</button>' +
                        '</h2>' +
                        '<div class="MedalList" style="height:240px; overflow-y:scroll; border-bottom:solid 1px #36759c;" />' +
                    '</div>' +
                '</div>'
            );
 
            // Encher
            $.each(MedalSettings.dataMedal, function(k,v) {
                // Informação de todas medalhas
                medalCollect.push(k);
 
                medalModalForm.find('.MedalList').append(
                    '<div class="MedalForm CustomForm" style="padding-bottom:5px; border-bottom:1px solid grey;">' +
                        '<div class="MedalImagePreview" style="display:inline-block; width:80px; text-align:center;">' +
                            $('<img height="70" style="margin:0 5px -3px 0; cursor:auto;"/>').attr('src', v.image_url).attr('title', v.title).prop('outerHTML') +
                        '</div>' +
                        '<div style="display:inline-block; width:475px;">' +
                            '<div style="margin-top:5px;">' + 
                                '<button onclick="medalFunctions.appendMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 4px; margin:0 6px 0 0; float:right;">✓</button>' +
                                '<button onclick="medalFunctions.deleteMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 0 0 3px; margin:0 5px 0 0; float:right;">' + medalDeleteImg + '</button>' +
                                'Nome da medalha : ' + 
                                $('<input class="MedalListName" style="float:right; width:300px; margin-right:5px;" />').attr('value', k).attr('data-prev', k).prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'Título : ' +
                                $('<input class="MedalListTitle" style="float:right; width:350px; margin-right:5px;" />').attr('value', v.title).prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'Link da imagem : ' +
                                $('<input class="MedalListLinkImage" style="float:right; width:350px;  margin-right:5px;" />').attr('value', v.image_url).prop('outerHTML') +
                            '</div>' +
                        '</div>' +
                    '</div>'
                );
            });
 
            // Preparação do módulo
            $.each(medalCollect, function(i,v) {
                medalCollectForm.append(
                    $('<div class="medalCollectBox" style="display:inline-block; margin:5px 0 0 10px;">' +
                        '<input type="checkbox">' + 
                        $('<span />').text(v + ' ').prop('outerHTML') + 
                        '<input class="MedalCollectAmount" style="width:30px; text-align:center;"/>' +
                    '</div>').attr('data-section', v).prop('outerHTML')
                );
            });
 
            // Salvar
            medalCollectForm = medalCollectForm.prop('outerHTML');
 
            // Criar formas de usuários
            $.each(MedalSettings.dataUser, function(k,v) {
                var medalCollectFormNew = $(medalCollectForm);
 
                $.each(v, function(i,val) {
                    // +4 medalhas
                    if (val.indexOf(':') > -1) {
                        var count = val.replace(/.+:(.+)/g, '$1');
                        val = val.replace(/(.+):.+/g, '$1');
 
                        medalCollectFormNew.find('.medalCollectBox[data-section="' + val + '"] .MedalCollectAmount').attr('value', count);
                    }
 
                    medalCollectFormNew.find('.medalCollectBox[data-section="' + val + '"] input[type="checkbox"]').attr('checked', 'checked');
                });
 
                medalModalForm.find('.MedalUser').append(
                    '<div class="UserForm CustomForm" style="text-align:center; margin-top:5px; border-bottom:1px solid black; padding-bottom:5px;">' +
                        $('<input class="MedalUserName" style="float:left; width:40%; margin-left:5px;" />').attr('value', k).prop('outerHTML') +
                        '<button onclick="$(this).parents(\'.CustomForm\').remove()" style="padding:0 0 0 3px; margin:0 5px; float:left;">' + medalDeleteImg + '</button>' +
                        '<button onclick="$(this).parents(\'.UserForm\').find(\'.medalCollectForm\').toggle()" style="padding:0 0 0 3px; margin:0 5px; width:100px;"> Medalhas</button>' +
                        '<br />' +
                        medalCollectFormNew.prop('outerHTML') +
                    '</div>'
                );
            });
 
            // Restabelecer
            medalModalFormCompleted = medalModalForm.prop('outerHTML');
 
            // Modal
            $('#MedalSettings').click(function() {
                $.showCustomModal('Settings', medalModalFormCompleted, {
                    id: 'ModalSettingsWindow',
                    width: 600,
                    height: 450,
                    buttons: [{
                        message: 'Recarregar',
                        handler: function() { 
                            location.href += (location.href.indexOf('?') > -1) ? '&action=purge' : '?action=purge';
                        }
                    },{
                        message: 'Redefinir',
                        handler: function() {
                            $('#ModalSettingsWindow fieldset').replaceWith(medalModalFormCompleted);
                        }
                    },{
                        message: 'Salvar',
                        handler: function() {
                            result_data = JSON.stringify(medalFunctions.medalCollectFunction());
 
                            // Salvar tudo!
                            medalFunctions.saveSettingFunction(result_data);
                        }
                    }]
                });
            });
        },
 
// Lançamento
        init: function() {
            $.ajax({
                url: '/index.php',
                type: 'GET',
                data: {
                    title: 'Predefinição:Medalhas',
                    action: 'raw',
                    nocache: 1,
                    dataType:'text'
                },
                success: function(data) {
                    // Resultado parcial
                    try {
                        MedalSettings = JSON.parse(data);
                    } catch(err) {
                        if (namespace === 10) {
                            medalFunctions.medalDefaultSettings();
                        }
 
                        return;
                    }
 
                    medalModalForm = $('<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;" />');
 
                    // Verificação de Janelas
                    if (namespace != 10) {
                        medalFunctions.medalMainFunction();
                    } else {
                        medalFunctions.medalSettingsFunction();
                    }
                },
                error: function() {
                    if (namespace === 10) {
                        medalFunctions.medalDefaultSettings();
                    }
                }
            });
        }
    };
 
    // Lançamento Final
    $(medalFunctions.init);
 
})(this.jQuery,this.mediaWiki);