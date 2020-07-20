;(function($,mw) {
 
    var namespace = mw.config.get('wgNamespaceNumber');
 
    if (namespace !== 2 && namespace !== 1200 && namespace !== 500 && 
        (namespace !== 4 || mw.config.get('wgTitle') !== 'Medals' || mw.config.get('wgAction') !== 'view')) {
        return;
    }
 
    medalFunctions = {
 
// Default settings
        medalDefaultSettings: function() {
            default_cfg = JSON.stringify({dataUser:{}, dataMedal: {}, module_title: 'User\'s reward', module_more: 'Show more', module_count_info: 'Amounts of this achievement', module_info: '', module_info_title: '', border: { top_left: 'https://images.wikia.nocookie.net/siegenax/ru/images/1/13/Medal_Border_corner.png', top_right: 'https://images.wikia.nocookie.net/siegenax/ru/images/d/de/Medal_Border_corner_right.png' }});
 
            $('#mw-content-text').prepend('<div style="width:100%; text-aling:center; padding:20px;">Settings not exist or broken.&nbsp;<button id="MedalResetSettings">Reset them?</button></div>');
            $('#MedalResetSettings').click(function() {
                medalFunctions.saveSettingFunction(default_cfg);
            });
        },
 
// Switch setting's tabs function
        switchSettings: function(class_name) {
            $('.MedalSetMenu').hide();
            $('.' + class_name).show();
        },
 
// Link's matcher
        medalMatcher: function(url) {
            /* 
            // Checking for wikia image's links
            // Can be used 3 serves: image, images or vignette
            // Images and vignette can have number after it - images2
            // Links SHOULD have wikia's server - .wikia.nocookie.net
            */
            if (url.match(/https?:\/\/(images?|vignette)\d?\.wikia\.nocookie\.net\//)) {
                return true;
            }
 
            return false;
        },
 
// New medal form        
        addMedalForm: function() {
            $('.MedalList').append(
                '<div class="MedalForm CustomForm" style="padding-bottom:5px; border-bottom:1px solid grey;">' +
                    '<div class="MedalImagePreview" style="display:inline-block; width:80px; text-align:center;">' +
                        '<img height="70" style="margin:0 5px -3px 0; cursor:help;"/>' +
                    '</div>' +
                    '<div style="display:inline-block; width:475px;">' +
                        '<div style="margin-top:5px;">' + 
                            '<button onclick="medalFunctions.appendMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 4px; margin:0 6px 0 0; float:right;" title="Submit changes">✓</button>' +
                            '<button onclick="medalFunctions.deleteMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 0 0 3px; margin:0 5px 0 0; float:right;">' + medalDeleteImg + '</button>' +
                            'Medal name : ' + 
                            '<input class="MedalListName" style="float:right; width:334px; margin-right:5px;" data-prev="undefined"/>' +
                        '</div>' +
                        '<div style="margin-top:5px;">' +
                            'Title : ' +
                            '<input class="MedalListTitle" style="float:right; width:385px; margin-right:5px;" />' +
                        '</div>' +
                        '<div style="margin-top:5px;">' +
                            'Image link : ' +
                            '<input class="MedalListLinkImage" style="float:right; width:385px;  margin-right:5px;" />' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        },
 
// New user form
        addUserForm: function() {
            $('.MedalUser').append(
                '<div class="UserForm CustomForm" style="text-align:center; margin-top:5px; border-bottom:1px solid black; padding-bottom:5px;">' +
                    '<input class="MedalUserName" style="float:left; width:40%; margin-left:5px;" />' +
                    '<button onclick="$(this).parents(\'.CustomForm\').remove()" style="padding:0 0 0 3px; margin:0 5px; float:left;">' + medalDeleteImg + '</button>' +
                    '<button onclick="$(this).parents(\'.UserForm\').find(\'.medalCollectForm\').toggle()" style="padding:0 0 0 3px; margin:0 5px; width:100px;">Medals</button>' +
                    '<br />' +
                    medalCollectForm +
                '</div>'
            );
        },
 
// Append medal settings (using in user form)
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
                // Name wasn't changed, nothing to do!
                return;
            }
 
            var to_add = '<div class="medalCollectBox" data-section="' + nameNew + '" style="display:inline-block; margin:5px 0 0 10px;">' +
                            '<input type="checkbox">' + 
                                nameNew + 
                            '&nbsp;<input class="MedalCollectAmount" style="width:30px; text-align:center;"/>' +
                         '</div>';
 
            // Changing default cfg
            var medalCollectSaveForm = $(medalCollectForm).append(to_add);
 
            $('.medalCollectForm').each(function() {
                $(this).append(to_add);
            });
 
            if (prevName !== 'undefined') {
                // Removing old name
                $('[data-section="' + prevName + '"]').remove();
                medalCollectSaveForm.find('[data-section="' + prevName + '"]').remove();
            }
 
            // Saving cfg
            medalCollectForm = medalCollectSaveForm.prop('outerHTML');
        },
 
// Delete medal settings (using in user form)
        deleteMedalSettings: function($that) {
            var medal_name = $that.find('.MedalListName').val();
            // If someone decide to cheat
            var prev_name = $that.find('.MedalListName').attr('data-prev');
 
            // Changing default cfg
            var medalCollectSaveForm = $(medalCollectForm);
            medalCollectSaveForm.find('[data-section="' + medal_name + '"], [data-section="' + prev_name + '"]').remove();
            medalCollectForm = medalCollectSaveForm.prop('outerHTML');
 
            // Doing things
            $that.remove();
            $('[data-section="' + medal_name + '"], [data-section="' + prev_name + '"]').remove();
        },
 
// Collect result function
        medalCollectFunction: function() {
            result = {};
            result.dataUser = {};
            result.dataMedal = {};
 
            // Main settings
            result.module_title = $('#MedalTitle').val();
            result.module_more = $('#MedalMore').val();
            result.module_count_info = $('#MedalCount').val();
            result.module_info = $('#MedalInfo').val();
            result.module_info_title = $('#MedalInfoTitle').val();
 
            result.border = {
                top_left: $('#MedalBorderLeft').val(),
                top_right: $('#MedalBorderRight').val()
            };
 
            // Collecting users
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
 
            // Collectings medals
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
 
// Save config function
        saveSettingFunction: function(medalSet) {
            $.ajax({
                url: '/api.php',
                type: 'POST',
                data: {
                    action: 'edit',
                    title: 'Project:Medals',
                    summary: 'Settings changes',
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
                    '<div style="width: 160px; background-color:white; border:2px solid black; border-radius:5px; text-align:center; padding:5px;">' +
                        $('<span style="font-weight:bold;" />').text(badgename).prop('outerHTML') +
                        '<hr />' +
                        $('<span />').text(title).prop('outerHTML') +
                    '</div>' +
                '</div>'
            );
 
            $('.badgetooltip').css({top: setOffY, left: setOffX});
 
            $(that).on('mouseout', function() {
                $('.badgetooltip').remove();
            });
        },
 
// Main function
        medalMainFunction: function() {
            if (typeof MedalSettings === 'undefined') {
                // Settings are broken or still not exists
                return;
            }
 
            user = mw.config.get('wgTitle');
            medalModal = false;
 
            if (typeof MedalSettings.dataUser[user] === 'undefined' || !MedalSettings.dataUser[user].length) {
                // Returning if user don't have medals (even if he pointed in config)
                return;
            }
 
            // Check for non wiki's images
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
                        // Title
                        $('<div style="width:100%; text-align:center; margin:-20px 0 5px 0; font-size:18px;" />').text(MedalSettings.module_title).prop('outerHTML') +
                        // Medal's section
                        '<div class="RewardSection" style="margin:0 5px;">' + 
                            '<div class="in" style="text-align:center;" />' +
                        '</div>' +
                        // Additional section
                        '<div class="MedalAdditionalSection" style="width:100%; text-align:center;" />' +
                    '</div>' +
                '</section>'
            );
 
            if (MedalSettings.dataUser[user].length > 12) {
                medalModal = true;
 
                medalModalForm.append('<div class="ModalMedalCollection"><div class="in" style="text-align:center;"/></div>');
 
                $('.MedalAdditionalSection').append(
                        $('<button type="button" class="MedalMore" style="cursor:pointer;" />').text((MedalSettings.module_more === '' || typeof(MedalSettings.module_more) === 'undefined') ? 'Show more' : MedalSettings.module_more).prop('outerHTML')
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
 
                // If user have more then 1 medal
                if (v.indexOf(':') > -1) {
                    count = v.replace(/.+:(.+)/g, '$1');
                    v = v.replace(/(.+):.+/g, '$1');
                    imgBody += $('<div class="RewardCount" style="position:absolute; bottom:0; right:0; padding:0 4px; background-color:white; border:1px solid black; border-radius:10px; cursor:help; color:black;" />').text('x' + count).attr('title', MedalSettings.module_count_info).prop('outerHTML');
                }
 
                // Additional protect (if file not from Wikia image hosting)
                if (typeof(MedalSettings.dataMedal[v]) === 'undefined' || typeof(MedalSettings.dataMedal[v].image_url) === 'undefined' ||  !medalFunctions.medalMatcher(MedalSettings.dataMedal[v].image_url)) {
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
 
// Settings function
        medalSettingsFunction: function() {
            var group_list = mw.config.get('wgUserGroups');
            if (group_list.indexOf('sysop') == -1 &&
                group_list.indexOf('helper') == -1 &&
                group_list.indexOf('staff') == -1 &&
                group_list.indexOf('vstf') == -1) {
                // No rights - nothing to do here :P
                return;
            }
 
            // Variables for this function
            medalCollect = [];
            medalDeleteImg = '<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite trash" />';
            medalCollectForm = $('<div class="medalCollectForm" style="display:none; text-align:left; margin-top:5px; border-top:1px solid black;" />');
 
            if (typeof MedalSettings === "undefined") {
                // If settings not exists or broken: ask to create new!
                medalFunctions.medalDefaultSettings();
 
                return;
            }
 
            $('#mw-content-text').prepend('<div style="width:100%; text-align:center; padding:20px;"><button id="MedalSettings">Access settings</button></div>');
 
            // Creating from
            medalModalForm.append(
                '<div style="padding-bottom:5px; border-bottom:solid 1px #36759c; margin-top:-5px;">' +
                    '<div style="text-align:center;">' +
                        '<button type="button" class="wikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalMainDialog\')">Main</button>&nbsp;' +
                        '<button type="button" class="wikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalUserDialog\')">Users</button>&nbsp;' +
                        '<button type="button" class="wikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalListDialog\')">Medals</button>' +
                    '</div>' +
                '</div>' +
                '<div style="height:270px;">' +
                    // Main settings menu
                    '<div class="MedalMainDialog MedalSetMenu">' +
                        '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px #36759c; margin-bottom:5px;">Main Settings</h2>' +
                        '<div>Module title: ' + $('<input id="MedalTitle" style="float:right; width:80%;" />').attr('value', MedalSettings.module_title).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Expand button: ' + $('<input id="MedalMore" style="float:right; width:80%;" />').attr('value', MedalSettings.module_more).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Medal count: ' + $('<input id="MedalCount" style="float:right; width:80%;" />').attr('value', MedalSettings.module_count_info).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Medal info page: ' + $('<input id="MedalInfo" style="float:right; width:80%;" />').attr('value', MedalSettings.module_info).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Medal info title: ' + $('<input id="MedalInfoTitle" style="float:right; width:80%;" />').attr('value', MedalSettings.module_info_title).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Border left: ' + $('<input id="MedalBorderLeft" style="float:right; width:80%;" />').attr('value', MedalSettings.border.top_left).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Border right: ' + $('<input id="MedalBorderRight" style="float:right; width:80%;" />').attr('value', MedalSettings.border.top_right).prop('outerHTML') + '</div>' +
                    '</div>' +
                    // User's settings menu
                    '<div class="MedalUserDialog MedalSetMenu" style="display:none;">' +
                        '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px #36759c;">' +
                            'Users' +
                            '<button onclick="medalFunctions.addUserForm()" style="padding:0 4px; margin:0 10px 0 0; float:right;">Add user form</button>' +
                        '</h2>' +
                        '<div class="MedalUser" style="height:240px; overflow-y:scroll; border-bottom:solid 1px #36759c;"/>' +
                    '</div>' +
                    // Medal's settings menu
                    '<div class="MedalListDialog MedalSetMenu" style="display:none;">' +
                        '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px #36759c;">' +
                            'Medals' +
                            '<button onclick="medalFunctions.addMedalForm()" style="padding:0 4px; margin:0 10px 0 0; float:right;">Add medal form</button>' +
                        '</h2>' +
                        '<div class="MedalList" style="height:240px; overflow-y:scroll; border-bottom:solid 1px #36759c;" />' +
                    '</div>' +
                '</div>'
            );
 
            // Filling up form for medals and users
            $.each(MedalSettings.dataMedal, function(k,v) {
                // Because we need to know all kinds of medals
                medalCollect.push(k);
 
                medalModalForm.find('.MedalList').append(
                    '<div class="MedalForm CustomForm" style="padding-bottom:5px; border-bottom:1px solid grey;">' +
                        '<div class="MedalImagePreview" style="display:inline-block; width:80px; text-align:center;">' +
                            $('<img height="70" style="margin:0 5px -3px 0; cursor:help;"/>').attr('src', v.image_url).attr('title', v.title).prop('outerHTML') +
                        '</div>' +
                        '<div style="display:inline-block; width:475px;">' +
                            '<div style="margin-top:5px;">' + 
                                '<button onclick="medalFunctions.appendMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 4px; margin:0 6px 0 0; float:right;">✓</button>' +
                                '<button onclick="medalFunctions.deleteMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 0 0 3px; margin:0 5px 0 0; float:right;">' + medalDeleteImg + '</button>' +
                                'Medal name : ' + 
                                $('<input class="MedalListName" style="float:right; width:334px; margin-right:5px;" />').attr('value', k).attr('data-prev', k).prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'Title : ' +
                                $('<input class="MedalListTitle" style="float:right; width:385px; margin-right:5px;" />').attr('value', v.title).prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'Image link : ' +
                                $('<input class="MedalListLinkImage" style="float:right; width:385px;  margin-right:5px;" />').attr('value', v.image_url).prop('outerHTML') +
                            '</div>' +
                        '</div>' +
                    '</div>'
                );
            });
 
            // Preparing default 'module' for medals
            $.each(medalCollect, function(i,v) {
                medalCollectForm.append(
                    $('<div class="medalCollectBox" style="display:inline-block; margin:5px 0 0 10px;">' +
                        '<input type="checkbox">' + 
                        $('<span />').text(v + ' ').prop('outerHTML') + 
                        '<input class="MedalCollectAmount" style="width:30px; text-align:center;"/>' +
                    '</div>').attr('data-section', v).prop('outerHTML')
                );
            });
 
            // Saving it
            medalCollectForm = medalCollectForm.prop('outerHTML');
 
            // Creating form for users
            $.each(MedalSettings.dataUser, function(k,v) {
                var medalCollectFormNew = $(medalCollectForm);
 
                $.each(v, function(i,val) {
                    // If user have more then 1 medal
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
                        '<button onclick="$(this).parents(\'.UserForm\').find(\'.medalCollectForm\').toggle()" style="padding:0 0 0 3px; margin:0 5px; width:100px;"> Medals</button>' +
                        '<br />' +
                        medalCollectFormNew.prop('outerHTML') +
                    '</div>'
                );
            });
 
            // For reset function
            medalModalFormCompleted = medalModalForm.prop('outerHTML');
 
            // Modal window
            $('#MedalSettings').click(function() {
                $.showCustomModal('Settings', medalModalFormCompleted, {
                    id: 'ModalSettingsWindow',
                    width: 600,
                    height: 450,
                    buttons: [{
                        message: 'Purge page',
                        handler: function() { 
                            location.href += (location.href.indexOf('?') > -1) ? '&action=purge' : '?action=purge';
                        }
                    },{
                        message: 'Reset changes',
                        handler: function() {
                            $('#ModalSettingsWindow fieldset').replaceWith(medalModalFormCompleted);
                        }
                    },{
                        message: 'Save',
                        handler: function() {
                            result_data = JSON.stringify(medalFunctions.medalCollectFunction());
 
                            // Save it!
                            medalFunctions.saveSettingFunction(result_data);
                        }
                    }]
                });
            });
        },
 
// Launch function
        init: function() {
            $.ajax({
                url: '/index.php',
                type: 'GET',
                data: {
                    title: 'Project:Medals',
                    action: 'raw',
                    nocache: 1,
                    dataType:'text'
                },
                success: function(data) {
                    // Parsing result
                    try {
                        MedalSettings = JSON.parse(data);
                    } catch(err) {
                        if (namespace === 4) {
                            medalFunctions.medalDefaultSettings();
                        }
 
                        return;
                    }
 
                    medalModalForm = $('<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;" />');
 
                    // Checking if we're on settings window or not
                    if (namespace != 4) {
                        medalFunctions.medalMainFunction();
                    } else {
                        medalFunctions.medalSettingsFunction();
                    }
                },
                error: function() {
                    if (namespace === 4) {
                        medalFunctions.medalDefaultSettings();
                    }
                }
            });
        }
    };
 
    // LAUNCH!
    $(medalFunctions.init);
 
})(this.jQuery,this.mediaWiki);

// Для шапки профайла
// http://pl.nfs.wikia.com/wiki/MediaWiki:Wikia.js?oldid=16040
$(function() {
    if(mw.config.get("wgNamespaceNumber") == 2 & $(".UserProfileActionButton").length & $(".masthead-info hgroup").length) {
        var actions = mw.config.get("wgWikiaPageActions");
        var curAction;
 
        $('.UserProfileActionButton').remove();
 
        if(actions) {
            var button = '<div class="page-header__contribution-buttons" style="float: right; margin-top: 2px;"><div class="wds-button-group">'
 
            curAction = actions.filter(function(action){return action.id === "page:Edit";})[0];
            if(curAction) button += '<a href="'+curAction.href+'" class="wds-is-squished wds-is-secondary wds-button" id="ca-edit" data-tracking="ca-edit" accesskey="e"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-pencil-small"><path d="M9.1 4.5l-7.8 7.8c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1h3c.3 0 .5-.1.7-.3l7.8-7.8-4.4-4.4zm7.6-.2l-3-3c-.4-.4-1-.4-1.4 0l-1.8 1.8 4.4 4.4 1.8-1.8c.4-.4.4-1 0-1.4z" fill-rule="evenodd"></path></svg><span>'+curAction.caption+'</span></a>';
            else button += '<a href="?action=edit" class="wds-is-squished wds-is-secondary wds-button" id="ca-viewsource" data-tracking="ca-viewsource"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-lock-small"><path d="M11 6H7V5c0-1.1.9-2 2-2s2 .9 2 2v1zm-1 6.7V14H8v-1.3c-.6-.3-1-1-1-1.7 0-1.1.9-2 2-2s2 .9 2 2c0 .7-.4 1.4-1 1.7zM9 1C6.8 1 5 2.8 5 5v1H3c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1h-2V5c0-2.2-1.8-4-4-4z" fill-rule="evenodd"></path></svg><span>Просмотр</span></a>';
 
            button += '<div class="wds-dropdown"><div class="wds-button wds-is-secondary wds-is-squished wds-dropdown__toggle"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><path d="M6 9l4-5H2" fill-rule="evenodd"></path></svg></div><div class="wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned"><ul class="wds-list wds-is-linked">';
 
            curAction = actions.filter(function(action){return action.id === "page:History";})[0];
            if(curAction) button += '<li><a id="ca-history" href="'+curAction.href+'" data-tracking="ca-history-dropdown">'+curAction.caption+'</a></li>';
 
            curAction = actions.filter(function(action){return action.id === "page:Move";})[0];
            if(curAction) button += '<li><a id="ca-move" href="'+curAction.href+'" data-tracking="ca-move-dropdown">'+curAction.caption+'</a></li>'
 
            curAction = actions.filter(function(action){return action.id === "page:Protect";})[0];
            if(curAction) button += '<li><a id="ca-protect" href="'+curAction.href+'" data-tracking="ca-protect-dropdown">'+curAction.caption+'</a></li>';
 
            curAction = actions.filter(function(action){return action.id === "page:Delete";})[0];
            if(curAction) button += '<li><a id="ca-delete" href="'+curAction.href+'" data-tracking="ca-delete-dropdown">'+curAction.caption+'</a></li>';
 
            button += '</ul></div></div></div>';
            $(button).appendTo(".masthead-info hgroup").css({float: "right"});
        }
    }
});

// "вот эта штука удалит кнопку редактирования у комментов, которым больше суток" (С)
// Автор: fngplg
+function() {
    if (mw.config.get('wgUserGroups').indexOf('sysop') > -1)
        return;
    function getDate(s) {
        s = d.exec(s || '');
        return new Date([].concat(s.slice(1, 4).join('-'), 'T', s.slice(4).join(':'), 'Z').join(''))
    }
    var re = /\-(\d*)\?/,
    d = /(\d\d\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)/,
    now = mw.config.get('wgNow');
    mw.hook('wikipage.content').add(function ($content) {
        $content.find('.comment .permalink').each(function () {
            var $this = $(this),
            date = re.exec($this.attr('href'));
            if (!date || !date[1])
                return;
            date = getDate(date[1]);
            if (!_.isDate(date))
                return;
            if ((now - date) > 86400000)
                $this.parent().find('.buttons .edit-link').remove()
        })
    })
}
();