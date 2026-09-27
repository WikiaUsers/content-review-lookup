;(function($,mw) {
	importArticle({
    	type: 'script',
    	article: 'u:dev:MediaWiki:ShowCustomModal.js'
	});
	var showCustomModal;
	
    var namespace = mw.config.get('wgNamespaceNumber');
    
    if (namespace !== 2 && namespace !== 1200 && namespace !== 500 && 
        (namespace !== 4 || mw.config.get('wgTitle') !== 'Currency' || mw.config.get('wgAction') !== 'view')) {
        return;
    }
    
    medalFunctions = {

// Forked from w:c:dev:MediaWiki:QuickPurge.js
    	quickPurge: function() {
	    	new mw.Api().post({
	    		action: 'purge',
	    		titles: mw.config.get('wgPageName'),
	    	}).always(function() {
	        	if (typeof(res) !== "object") {
	        		console.warn('API Error in purging the Currency page \"' + mw.config.get('wgPageName') + '\":', res);
	        	}
	        });
	        window.location.reload();
	    },

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
            $('.CurrencyMedalSetMenu').hide();
            $('.Currency' + class_name).show();
        },
        
// Link's matcher
        medalMatcher: function(url) {
            /* 
            // Checking for wikia image's links
            // Can be used 4 serves: image, images, static or vignette
            // Those subdomains can have number after it - images2
            // Links SHOULD have wikia's server - .wikia.nocookie.net
            */
            if (url.match(/https?:\/\/(images?|static|vignette)\d?\.wikia\.nocookie\.net\//)) {
                return true;
            }
            
            return false;
        },

// New medal form        
        addMedalForm: function() {
            $('.CurrencyMedalList').append(
                '<div class="CurrencyMedalForm CustomForm" style="padding-bottom:5px; border-bottom:1px solid grey;">' +
                    '<div class="CurrencyMedalImagePreview" style="display:inline-block; width:80px; text-align:center;">' +
                        '<img height="70" style="margin:0 5px -3px 0; cursor:help;"/>' +
                    '</div>' +
                    '<div style="display:inline-block; width:475px;">' +
                        '<div style="margin-top:5px;">' + 
                            '<button onclick="medalFunctions.appendMedalSettings($(this).parents(\'.CurrencyMedalForm\'))" style="padding:0 4px; margin:0 6px 0 0; float:right;" title="Submit changes">✓</button>' +
                            '<button onclick="medalFunctions.deleteMedalSettings($(this).parents(\'.CurrencyMedalForm\'))" style="padding:0 0 0 3px; margin:0 5px 0 0; float:right;">' + medalDeleteImg + '</button>' +
                            'Medal name : ' + 
                            '<input class="CurrencyMedalListName" style="float:right; width:324px; margin-right:5px;" data-prev="undefined"/>' +
                        '</div>' +
                        '<div style="margin-top:5px;">' +
                            'Title : ' +
                            '<input class="CurrencyMedalListTitle" style="float:right; width:380px; margin-right:5px;" />' +
                        '</div>' +
                        '<div style="margin-top:5px;">' +
                            'Image link : ' +
                            '<input class="CurrencyMedalListLinkImage" style="float:right; width:380px;  margin-right:5px;" />' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        },
        
// New user form
        addUserForm: function() {
            $('.CurrencyMedalUser').append(
                '<div class="CurrencyUserForm CustomForm" style="text-align:center; margin-top:5px; border-bottom:1px solid black; padding-bottom:5px;">' +
                    '<input class="CurrencyMedalUserName" style="float:left; width:40%; margin-left:5px;" />' +
                    '<button onclick="$(this).parents(\'.CurrencyCustomForm\').remove()" style="padding:0 0 0 3px; margin:0 5px; float:left;">' + medalDeleteImg + '</button>' +
                    '<button onclick="$(this).parents(\'.CurrencyUserForm\').find(\'.CurrencymedalCollectForm\').toggle()" style="padding:0 0 0 3px; margin:0 5px; width:100px;">Medals</button>' +
                    '<br />' +
                    medalCollectForm +
                '</div>'
            );
        },
        
// Append medal settings (using in user form)
        appendMedalSettings: function($that) {
            var imgLink = $that.find('.CurrencyMedalListLinkImage').val();
            var titleNew = $that.find('.CurrencyMedalListTitle').val();
            var nameNew = $that.find('.CurrencyMedalListName').val();
            var prevName = $that.find('.CurrencyMedalListName').attr('data-prev');
            
            $that.find('.CurrencyMedalImagePreview img')
                .attr('src', imgLink)
                .attr('title', titleNew)
                .attr('data-prev', nameNew);
            
            if ($(medalCollectForm).find('[data-section="' + nameNew + '"]').length) {
                // Name wasn't changed, nothing to do!
                return;
            }
            
            var to_add = '<div class="CurrencymedalCollectBox" data-section="' + mw.html.escape(nameNew) + '" style="display:inline-block; margin:5px 0 0 10px;">' +
                            '<input type="checkbox">' + 
                                mw.html.escape(nameNew) + 
                            '&nbsp;<input class="CurrencyMedalCollectAmount" style="width:30px; text-align:center;"/>' +
                         '</div>';
            
            // Changing default cfg
            var medalCollectSaveForm = $(medalCollectForm).append(to_add);
            
            $('.CurrencymedalCollectForm').each(function() {
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
            var medal_name = $that.find('.CurrencyMedalListName').val();
            // If someone decide to cheat
            var prev_name = $that.find('.CurrencyMedalListName').attr('data-prev');
            
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
            $('.CurrencyUserForm').each(function() {
                var user = $(this).find('.CurrencyMedalUserName').val();
                if (user === '') return;
                
                var medals = [];
                
                $(this).find('.CurrencymedalCollectBox').each(function() {
                    if (!$(this).find('input[type="checkbox"]').prop('checked')) {
                        return;
                    }
                    
                    var medal_name = $(this).attr('data-section');
                    var medal_count = $(this).find('.CurrencyMedalCollectAmount').val();
                    if (medal_count.match(/\d+/) && medal_count !== 1) {
                        medal_name += ':' + medal_count;
                    }
                    
                    medals.push(medal_name);
                });
                            
                result.dataUser[user] = medals;
            });
                    
            // Collectings medals
            $('.CurrencyMedalForm').each(function() {
                var medal_name = $(this).find('.CurrencyMedalListName').val();
                if (medal_name === '') return;
                
                var medal_image = $(this).find('.CurrencyMedalListLinkImage').val();
                if (!medalFunctions.medalMatcher(medal_image)) return;
                            
                result.dataMedal[medal_name] = {
                    title: $(this).find('.CurrencyMedalListTitle').val(),
                    image_url: medal_image
                };
            });
            
            return result;
        },
        
// Save config function
        saveSettingFunction: function(medalSet) {
            $.ajax({
                url: mw.util.wikiScript('api'),
                type: 'POST',
                data: {
                    action: 'edit',
                    title: 'Project:Currency',
                    summary: 'Settings changes',
                    text: medalSet,
                    bot: 1,
                    token: mw.user.tokens.get('csrfToken'),
                    format: 'json'
                },
                success: function(d) {
                	if (d.error && d.error.info) {
                		alert(d.error.info);
                	} else if (d.edit && d.edit.result == 'Success') {
                        medalFunctions.quickPurge();
                    }
                }
            });
        },
        
// Tooltip
        tooltip: function(that) {
            title = $(that).attr('data-title');
            badgename = $(that).attr('data-name');
            offSet = $(that).offset();
            setOffX = parseFloat(offSet.left) - 86 + $(that).width() / 2;
            setOffY = parseFloat(offSet.top) + $(that).height() + 5;
            
            $('body').append(
                '<div class="Currencybadgetooltip" style="position:absolute; z-index:6000000;">' +
                    '<div class="Currencybadgetooltiparrow" style="width:0; height:0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 10px solid black; margin: 0 auto;"></div>' +
                    '<div class="Currencybadgetooltipwindow" style="width: 160px; background-color:white; border:2px solid black; border-radius:5px; text-align:center; padding:5px;">' +
                        $('<span style="font-weight:bold;">').text(badgename).prop('outerHTML') +
                        '<hr />' +
                        $('<span>').text(title).prop('outerHTML') +
                    '</div>' +
                '</div>'
            );
            
            $('.Currencybadgetooltip').css({top: setOffY, left: setOffX});
            
            $(that).on('mouseout', function() {
                $('.Currencybadgetooltip').remove();
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
                '<section class="CurrencyRewardModule rail-module">' +
                    '<div class="CurrencyRewardContainer" style="position:relative; width:100%; padding: 0;">' +
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
                        $('<h2 class="Currencyactivity-heading">').text(MedalSettings.module_title).prop('outerHTML') +
                        // Medal's section
                        '<div class="CurrencyRewardSection" style="margin:0 5px;">' + 
                            '<div class="Currencyin" style="text-align:center;"></div>' +
                        '</div>' +
                        // Additional section
                        '<div class="CurrencyMedalAdditionalSection" style="width:100%; text-align:center;"></div>' +
                    '</div>' +
                '</section>'
            );

            if (MedalSettings.dataUser[user].length > 12) {
                medalModal = true;
                
                medalModalForm.append('<div class="CurrencyModalMedalCollection"><div class="Currencyin" style="text-align:center;"></div></div>');
            
                $('.CurrencyMedalAdditionalSection').append(
                        $('<button type="button" class="CurrencyMedalMore" style="cursor:pointer;">').text((MedalSettings.module_more === '' || typeof(MedalSettings.module_more) === 'undefined') ? 'Show more' : MedalSettings.module_more).prop('outerHTML')
                );
            }
            
            if (MedalSettings.module_info !== '' && typeof(MedalSettings.module_info) !== 'undefined') {
                $('.CurrencyMedalAdditionalSection').append(
                    $('<a class="Currencybutton" style="margin-left:1px; cursor:info;">')
                        .text(MedalSettings.module_info_title)
                        .attr('href', mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/wiki/' + MedalSettings.module_info)
                        .prop('outerHTML')
                );
            }
            
            if (!$('.CurrencyMedalAdditionalSection').is(':empty')) {
                $('.CurrencyMedalAdditionalSection').css('margin', '5px 0 -20px 0');
            }
        
            $.each(MedalSettings.dataUser[user], function (i, v) {
                imgBody = '';
                
                // If user have more then 1 medal
                if (v.indexOf(':') > -1) {
                    count = v.replace(/.+:(.+)/g, '$1');
                    v = v.replace(/(.+):.+/g, '$1');
                    imgBody += $('<div class="CurrencyRewardCount" style="position:absolute; bottom:0; right:0; padding:0 4px; background-color:white; border:1px solid black; border-radius:10px; cursor:help; color:black;">').text('x' + count).attr('title', MedalSettings.module_count_info).prop('outerHTML');
                }
                
                // Additional protect (if file not from Wikia image hosting)
                if (typeof(MedalSettings.dataMedal[v]) === 'undefined' || typeof(MedalSettings.dataMedal[v].image_url) === 'undefined' ||  !medalFunctions.medalMatcher(MedalSettings.dataMedal[v].image_url)) {
                    return;
                }
                
                imgBody += $('<img style="cursor:help; vertical-align:middle;" width="50" onmouseover="medalFunctions.tooltip(this);" />').attr('src', MedalSettings.dataMedal[v].image_url).attr('data-title', MedalSettings.dataMedal[v].title).attr('data-name', v).prop('outerHTML');
     
                if (medalModal) {
                    medalModalForm.find('.CurrencyModalMedalCollection .in').append('<div class="CurrencyRewardImage" style="display:inline-block; position:relative; margin:2px 5px;">' + imgBody + '</div>');
 
                    if (i > 11) return;
                }
 
                $('.CurrencyRewardSection .in').append('<div class="CurrencyRewardImage" style="display:inline-block; position:relative; margin:2px 5px;">' + imgBody + '</div>');
            });
 
            $('.CurrencyMedalMore').click(function() {
                showCustomModal( mw.html.escape(MedalSettings.module_title + ' ' + user), medalModalForm, {width: 400});
            });
        },
        
// Settings function
        medalSettingsFunction: function() {
            var group_list = mw.config.get('wgUserGroups');
            if (group_list.indexOf('sysop') == -1 &&
                group_list.indexOf('content-moderator') == -1 &&
                group_list.indexOf('helper') == -1 &&
                group_list.indexOf('staff') == -1 &&
                group_list.indexOf('soap') == -1) {
                // No rights - nothing to do here :P
                return;
            }
            
            // Variables for this function
            medalCollect = [];
            medalDeleteImg = '<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="Currencysprite trash" />';
            medalCollectForm = $('<div class="CurrencymedalCollectForm" style="display:none; text-align:left; margin-top:5px; border-top:1px solid black;">');
        
            if (typeof MedalSettings === "undefined") {
                // If settings not exists or broken: ask to create new!
                medalFunctions.medalDefaultSettings();

                return;
            }
        
            $('#mw-content-text').prepend('<div style="width:100%; text-align:center; padding:20px;"><button id="MedalSettings">Access settings</button></div>');
    
            // Creating form
            medalModalForm.append(
                '<div style="padding-bottom:5px; border-bottom:solid 1px #36759c; margin-top:-5px;">' +
                    '<div style="text-align:center;">' +
                        '<button type="button" class="Currencywikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalMainDialog\')">Main</button>&nbsp;' +
                        '<button type="button" class="Currencywikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalUserDialog\')">Users</button>&nbsp;' +
                        '<button type="button" class="Currencywikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalListDialog\')">Medals</button>' +
                    '</div>' +
                '</div>' +
                '<div style="height:270px;">' +
                    // Main settings menu
                    '<div class="CurrencyMedalMainDialog MedalSetMenu">' +
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
                    '<div class="CurrencyMedalUserDialog MedalSetMenu" style="display:none;">' +
                        '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px #36759c;">' +
                            'Users' +
                            '<button onclick="medalFunctions.addUserForm()" style="padding:0 4px; margin:0 10px 0 0; float:right;">Add user form</button>' +
                        '</h2>' +
                        '<div class="CurrencyMedalUser" style="height:240px; overflow-y:scroll; border-bottom:solid 1px #36759c;"></div>' +
                    '</div>' +
                    // Medal's settings menu
                    '<div class="CurrencyMedalListDialog MedalSetMenu" style="display:none;">' +
                        '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px #36759c;">' +
                            'Medals' +
                            '<button onclick="medalFunctions.addMedalForm()" style="padding:0 4px; margin:0 10px 0 0; float:right;">Add medal form</button>' +
                        '</h2>' +
                        '<div class="CurrencyMedalList" style="height:240px; overflow-y:scroll; border-bottom:solid 1px #36759c;"></div>' +
                    '</div>' +
                '</div>'
            );
    
            // Filling up form for medals and users
            $.each(MedalSettings.dataMedal, function(k,v) {
                // Because we need to know all kinds of medals
                medalCollect.push(k);
                
                medalModalForm.find('.CurrencyMedalList').append(
                    '<div class="CurrencyMedalForm CustomForm" style="padding-bottom:5px; border-bottom:1px solid grey;">' +
                        '<div class="CurrencyMedalImagePreview" style="display:inline-block; width:80px; text-align:center;">' +
                            $('<img height="70" style="margin:0 5px -3px 0; cursor:help;"/>').attr('src', v.image_url).attr('title', v.title).prop('outerHTML') +
                        '</div>' +
                        '<div style="display:inline-block; width:475px;">' +
                            '<div style="margin-top:5px;">' + 
                                '<button onclick="medalFunctions.appendMedalSettings($(this).parents(\'.CurrencyMedalForm\'))" style="padding:0 4px; margin:0 6px 0 0; float:right;">✓</button>' +
                                '<button onclick="medalFunctions.deleteMedalSettings($(this).parents(\'.CurrencyMedalForm\'))" style="padding:0 0 0 3px; margin:0 5px 0 0; float:right;">' + medalDeleteImg + '</button>' +
                                'Medal name : ' + 
                                $('<input class="CurrencyMedalListName" style="float:right; width:324px; margin-right:5px;" />').attr('value', k).attr('data-prev', k).prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'Title : ' +
                                $('<input class="CurrencyMedalListTitle" style="float:right; width:380px; margin-right:5px;" />').attr('value', v.title).prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'Image link : ' +
                                $('<input class="CurrencyMedalListLinkImage" style="float:right; width:380px;  margin-right:5px;" />').attr('value', v.image_url).prop('outerHTML') +
                            '</div>' +
                        '</div>' +
                    '</div>'
                );
            });
            
            // Preparing default 'module' for medals
            $.each(medalCollect, function(i,v) {
                medalCollectForm.append(
                    $('<div class="CurrencymedalCollectBox" style="display:inline-block; margin:5px 0 0 10px;">' +
                        '<input type="checkbox">' + 
                        $('<span>').text(v + ' ').prop('outerHTML') + 
                        '<input class="CurrencyMedalCollectAmount" style="width:30px; text-align:center;"/>' +
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
                        
                        medalCollectFormNew.find('.CurrencymedalCollectBox[data-section="' + val + '"] .MedalCollectAmount').attr('value', count);
                    }
                    
                    medalCollectFormNew.find('.CurrencymedalCollectBox[data-section="' + val + '"] input[type="checkbox"]').attr('checked', 'checked');
                });
                
                medalModalForm.find('.CurrencyMedalUser').append(
                    '<div class="CurrencyUserForm CustomForm" style="text-align:center; margin-top:5px; border-bottom:1px solid black; padding-bottom:5px;">' +
                        $('<input class="CurrencyMedalUserName" style="float:left; width:40%; margin-left:5px;" />').attr('value', k).prop('outerHTML') +
                        '<button onclick="$(this).parents(\'.CurrencyCustomForm\').remove()" style="padding:0 0 0 3px; margin:0 5px; float:left;">' + medalDeleteImg + '</button>' +
                        '<button onclick="$(this).parents(\'.CurrencyUserForm\').find(\'.CurrencymedalCollectForm\').toggle()" style="padding:0 0 0 3px; margin:0 5px; width:100px;"> Medals</button>' +
                        '<br />' +
                        medalCollectFormNew.prop('outerHTML') +
                    '</div>'
                );
            });
            
            // For reset function
            medalModalFormCompleted = medalModalForm.prop('outerHTML');
        
            // Modal window
            $('#MedalSettings').click(function() {
                showCustomModal('Settings', medalModalFormCompleted, {
                    id: 'ModalSettingsWindow',
                    width: 600,
                    height: 450,
                    buttons: [{
                        message: 'Purge page',
                        handler: function() { 
                            location.href += (location.href.indexOf('?') > -2) ? '&action=purge' : '?action=purge';
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
        init: function(modalScript) {
        	showCustomModal = modalScript;
        	
            $.ajax({
                url: mw.util.wikiScript(),
                type: 'GET',
                data: {
                    title: 'Project:Currency',
                    action: 'raw',
                    cb: Math.ceil(new Date().getTime() / 1000),
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
                    
                    medalModalForm = $('<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;">');
                    
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
    mw.hook('dev.showCustomModal').add(medalFunctions.init);
    
})(this.jQuery,this.mediaWiki);