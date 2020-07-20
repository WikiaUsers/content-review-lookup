/*
 * edited from jQuery Mini Calendar
 * https://github.com/k-ishiwata/jQuery.MiniCalendar
 *
 * Copyright 2016, k.ishiwata
 * http://www.webopixel.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

;(function($,mw) {
    if (mw.config.get('wgAction') !== 'view') {
        return;
    }
    var namespace = mw.config.get('wgNamespaceNumber');
    var i18nkey=['block', 'userrights'],awrite,i18nf;
    
    mw.hook('dev.ajaxwrite').add(function (aw) {
            awrite = aw;
            $.proxy(ClickalendarFunctions.preload, ClickalendarFunctions);
    });
    mw.hook('dev.fetch').add(function (fetch) {
        fetch(i18nkey, function (msg) {
            i18n = msg();
        });
        $.proxy(ClickalendarFunctions.preload, ClickalendarFunctions);
    });
    if (
        !window.dev || !window.dev.fetch || !window.dev.ajaxwrite
    ) {
        importArticle({
            type: 'script',
            articles: [
                //'u:dev:MediaWiki:ajaxwrite.js',
                'MediaWiki:ajaxwrite.js',
                'u:dev:MediaWiki:Fetch.js'
            ]
        });
    }
    importArticles({
        type: 'style',
        //article: 'u:dev:MediaWiki:Clickalendar.css'
        article: 'MediaWiki:Clickalendar.css'
    });
 
    ClickalendarFunctions = {
        toload:2,
        
        // jsonファイルから読み込んだデータを入れる変数
        // yearとmonthでページ分けする
        events = {},
        date = "",
        year = 0,
        month = 0,
        preload: function() {
            if (--this.toLoad === 0) {
                $.proxy(this.init, this);
            }
        },
// Main function
        dateMainFunction: function() {
            if (typeof DateSettings === 'undefined') {
                // Settings are broken or still not exists
                return;
            }

            dateModal = false;
            $('#mini-calendar').append(this.Cclwindow);
        },
//Make Calendar's body
        Cclwindow: function() {
            this.ele = '';
            createFrame();
            printType(this.year, this.month);
            // 取得したイベントを表示
            setEvent();
        /**
        *  枠を作成
        */
        createFrame : function() {
            this.ele.append('<div class="calendar-head"><p class="calendar-year-month"></p></div>');
            var outText = '<thead>';
            for (var i = 0; i < this.opts.weekType.length; i++) {
                if (i === 0) {
                    outText += '</thead><tbody></tbody> ' + '<table><tr><th class="calendar-sun">';
                } else if (i === this.opts.weekType.length-1) {
                    outText += '</th><th class="calendar-sat">';
                } else {
                    outText += '</th><th>';
                }
            outText += this.opts.weekType[i] +'</th></tr></table>';
            this.ele.find('.calendar-head').after(outText);
            this.ele.find('.calendar-year-month').preend(this.arrow(0));
            this.ele.find('.calendar-year-month').append(this.arrow(1));
            }
        },
        /**
        *  日付・曜日の配置
        */
        printType : function(thisYear, thisMonth) {
            $(this.ele).find('.calendar-year-month').text(thisYear + '年' + thisMonth　+ '月');
            var thisDate = new Date(thisYear, thisMonth-1, 1);
            
            // 開始の曜日
            var startWeek = thisDate.getDay();
            
            var lastday = new Date(thisYear, thisMonth, 0).getDate();
            // 縦の数
            var rowMax = Math.ceil((lastday + startWeek) / 7);
            
            var outText = '<tr>';
            var countDate = 1;
            // 最初の空白を出力
            for (var i = 0; i < startWeek; i++) {
                outText += '<td class="calendar-none">&nbsp;</td>';
            }
            for (var row = 0; row < rowMax; row++) {
                // 最初の行は曜日の最初から
                if (row == 0) {
                    for (var col = startWeek; col < 7; col++) {
                        outText += printTD(countDate, col);
                        countDate++;
                    }
                } else {
                    // 2行目から
                    outText += '<tr>';
                    for (var col = 0; col < 7; col++) {
                        if (lastday >= countDate) {
                            outText += printTD(countDate, col);
                        } else {
                            outText += '<td class="calendar-none">&nbsp;</td>';
                        }
                        countDate++;
                    }
                }
            outText += '</tr>';
            }
            $(this.ele).find('tbody').html(outText);
            
            function printTD(count, col) {
                var dayText = "";
                var tmpId = ' id="calender-id'+ count + '"';
                // 曜日classを割り当てる
                if (col === 0) tmpId += ' class="calendar-sun"';
                if (col === 6) tmpId += ' class="calendar-sat"';
                return '<td' + tmpId + '><i class="calendar-day-number">' +
                count + '</i><div class="calendar-labels">' + dayText + '</div></td>';
            }
            //今日の日付をマーク
            var toDay = new Date();
            if (thisYear === toDay.getFullYear()) {
                if (thisMonth === (toDay.getMonth()+1)) {
                    var dateID = 'calender-id' + toDay.getDate();
                    $(this.ele).find('#' + dateID).addClass('calendar-today');
                }
            }
        },
        /**
         * イベントの表示
         */
         setEvent : function() {
            for(var i = 0; i < this.events.length; i++) {
                var dateID = 'calender-id' + this.events[i].day;
                var getText = $('<textarea>' + this.events[i].title + '</textarea>');
                // typeがある場合classを付与
                var type = "";
                if (this.events[i].type) {
                    type = '-' + this.events[i].type;
                }
                $(this.ele).find('#' + dateID + ' .calendar-labels').append('<span class="calender-label' + type + '">' + getText.val() + '</span>');
            }
            
            // 休日
            for (var i=0; i<this.holiday.length; i++) {
                $(this.ele).find('#calender-id' + this.holiday[i]).addClass('calendar-holiday');
            }
        },
// Settings function
        dateSettingsFunction: function() {
            var group_list = mw.config.get('wgUserGroups');
            if (group_list.indexOf('sysop') == -1 &&
                group_list.indexOf('content-moderator') == -1 &&
                group_list.indexOf('helper') == -1 &&
                group_list.indexOf('staff') == -1 &&
                group_list.indexOf('vstf') == -1) {
                // Not presonal thing :P
                return;
            }
 
            // Variables for this function
            medalCollect = [];
            medalDeleteImg = '<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite trash" />';
            medalCollectForm = $('<div class="medalCollectForm" style="display:none; text-align:left; margin-top:5px; border-top:1px solid black;" />');
 
            if (typeof DateSettings === "undefined") {
                // If settings not exists or broken: ask to create new!
                medalFunctions.medalDefaultSettings();
 
                return;
            }
            $('#mw-content-text').prepend(
                '<div style="width:100%; text-align:center; padding:20px;"><button id="MedalSettings">Access settings</button></div>');
            // Creating from
            dateModalForm.append(
                '<div style="padding-bottom:5px; border-bottom:solid 1px #36759c; margin-top:-5px;">' +
                '<div style="text-align:center;">' +
                '<button type="button" class="wikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalMainDialog\')">Main</button>&nbsp;' +
                '<button type="button" class="wikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalUserDialog\')">Users</button>&nbsp;' +
                '<button type="button" class="wikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalListDialog\')">Medals</button>' + '</div>' + '</div>' + 
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
                '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px #36759c;">' + 'Users' + '<button onclick="medalFunctions.addUserForm()" style="padding:0 4px; margin:0 10px 0 0; float:right;">Add user form</button>' + '</h2>' +
                '<div class="MedalUser" style="height:240px; overflow-y:scroll; border-bottom:solid 1px #36759c;"/>' + '</div>' +
                // Medal's settings menu 
                '<div class="MedalListDialog MedalSetMenu" style="display:none;">' +
                '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px #36759c;">' + 'Medals' + '<button onclick="medalFunctions.addMedalForm()" style="padding:0 4px; margin:0 10px 0 0; float:right;">Add medal form</button>' + '</h2>' +
                '<div class="MedalList" style="height:240px; overflow-y:scroll; border-bottom:solid 1px #36759c;" />' + '</div>' + '</div>'
            );
 
            // Filling up form for medals and users
            $.each(MedalSettings.dataMedal, function(k,v) {
                // Because we need to know all kinds of medals
                medalCollect.push(k);
 
                medalModalForm.find('.MedalList').append(
                    '<div class="MedalForm CustomForm" style="padding-bottom:5px; border-bottom:1px solid grey;">' +
                    '<div class="MedalImagePreview" style="display:inline-block; width:80px; text-align:center;">' +
                    $('<img height="70" style="margin:0 5px -3px 0; cursor:help;"/>').attr('src', v.image_url).attr('title', v.title).prop('outerHTML') + '</div>' +
                    '<div style="display:inline-block; width:475px;">' + '<div style="margin-top:5px;">' +
                    '<button onclick="medalFunctions.appendMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 4px; margin:0 6px 0 0; float:right;">✓</button>' +
                    '<button onclick="medalFunctions.deleteMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 0 0 3px; margin:0 5px 0 0; float:right;">' + medalDeleteImg + '</button>' +
                    'Medal name : ' + $('<input class="MedalListName" style="float:right; width:334px; margin-right:5px;" />').attr('value', k).attr('data-prev', k).prop('outerHTML') + '</div>' +
                    '<div style="margin-top:5px;">' + 'Title : ' + $('<input class="MedalListTitle" style="float:right; width:385px; margin-right:5px;" />').attr('value', v.title).prop('outerHTML') + '</div>' +
                    '<div style="margin-top:5px;">' + 'Image link : ' + $('<input class="MedalListLinkImage" style="float:right; width:385px; margin-right:5px;" />').attr('value', v.image_url).prop('outerHTML') + '</div>' + '</div>' + '</div>'
                );
            });
 
            // Preparing default 'module' for medals
            $.each(medalCollect, function(i,v) {
                medalCollectForm.append(
                    $('<div class="medalCollectBox" style="display:inline-block; margin:5px 0 0 10px;">' +
                        '<input type="checkbox">' + $('<span />').text(v + ' ').prop('outerHTML') +
                        '<input class="MedalCollectAmount" style="width:30px; text-align:center;"/>' + '</div>').attr('data-section', v).prop('outerHTML')
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
                    '<button onclick="$(this).parents(\'.UserForm\').find(\'.medalCollectForm\').toggle()" style="padding:0 0 0 3px; margin:0 5px; width:100px;"> Medals</button>' + '' +
                    medalCollectFormNew.prop('outerHTML') + '</div>'
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
// Default settings
        dateDefaultSettings: function() {
            default_cfg = JSON.stringify(
                {event: [
                    { day: 1, title: "No Event is here", type: "red" }
                ]}
            );
            $('#mw-content-text').prepend('<div style="width:100%; text-aling:center; padding:20px;">Settings not exist or broken.&nbsp;<button id="DateResetSettings">Reset them?</button></div>');
            $('#DateResetSettings').click(function() {
                this.saveSettingFunction(default_cfg);
            });
        },
// Save config function
        saveSettingFunction: function(dateSet) {
            save = awrite.write('Project:Calendar',dateSet,'Settings changes')
            if (save.res) {
                location.href += (location.href.indexOf('?') > -1) ? '&action=purge' : '?action=purge';
            }
        },
// load function
        load: function() {
            thing = awrite.load('Project:Calendar')
            if (!thing.parse) {
                if (namespace === 4) {
                    this.dateDefaultSettings();
                }
                return;
            }else{
                DateSettings = load.data;
                dateModalForm = $('<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;" />');
                
                // Checking if we're on settings window or not
                if (namespace != 4) {
                    this.dateMainFunction();
                } else {
                    this.dateSettingsFunction();
                }
            }
        },
// Launch function
        init: function() {
            date = new Date();
            
            //表示する年月
            year = date.getFullYear();
            month = date.getMonth()+1;
            this.load();
        }
    };
    
    $.wop = $.wop || {};
    $.wop.miniCalendar = function(targets,option){
    this.opts = $.extend({},$.wop.miniCalendar.defaults,option);
    this.ele = targets;

    // jsonファイルから読み込んだデータを入れる変数
    // yearとmonthでページ分けする
    this.events = {};
    this.date = new Date();
    this.holiday = "";

    //表示する年月
    this.year = this.year || this.date.getFullYear();
    this.month = this.month || this.date.getMonth()+1;

    // jsonファイルから読み込む
    this.loadData(this.year,this.month);

    this.createFrame();
    this.printType(this.year, this.month);
    // 取得したイベントを表示
    this.setEvent();
  };
  $.wop.miniCalendar.prototype = {

    /**
     * jsonファイルからデータを読み込む
     */
    loadData : function(y,m) {
      var self = this;
      $.ajax({
        type: "GET",
        url: self.opts.jsonData,
        dataType: "json",
        async: false,
        success: function(data){
          self.events = data.event;
          self.date = new Date(data.date);
          //self.holiday = data.holiday;
        }
      });
    }
  };

  $.wop.miniCalendar.defaults = {
    weekType : ["日", "月", "火", "水", "木", "金", "土"],
    jsonData: 'event.json'
  };
  $.fn.miniCalendar = function(option){
    option = option || {};
    var api = new $.wop.miniCalendar(this,option);
    return option.api ? api : this;
  };
  }
    medalFunctions = {
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
                '<img height="70" style="margin:0 5px -3px 0; cursor:help;"/>' + '</div>' +
                '<div style="display:inline-block; width:475px;">' + '<div style="margin-top:5px;">' +
                '<button onclick="medalFunctions.appendMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 4px; margin:0 6px 0 0; float:right;" title="Submit changes">✓</button>' + 
                '<button onclick="medalFunctions.deleteMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 0 0 3px; margin:0 5px 0 0; float:right;">' + medalDeleteImg + '</button>' +
                'Medal name : ' + '<input class="MedalListName" style="float:right; width:334px; margin-right:5px;" data-prev="undefined"/>' + '</div>' +
                '<div style="margin-top:5px;">' + 'Title : ' + '<input class="MedalListTitle" style="float:right; width:385px; margin-right:5px;" />' + '</div>' +
                '<div style="margin-top:5px;">' + 'Image link : ' + '<input class="MedalListLinkImage" style="float:right; width:385px; margin-right:5px;" />' + '</div>' +
                '</div>' + '</div>'
            );
        },
// New user form
        addUserForm: function() {
            $('.MedalUser').append(
                '<div class="UserForm CustomForm" style="text-align:center; margin-top:5px; border-bottom:1px solid black; padding-bottom:5px;">' + '<input class="MedalUserName" style="float:left; width:40%; margin-left:5px;" />' +
                '<button onclick="$(this).parents(\'.CustomForm\').remove()" style="padding:0 0 0 3px; margin:0 5px; float:left;">' + medalDeleteImg + '</button>' +
                '<button onclick="$(this).parents(\'.UserForm\').find(\'.medalCollectForm\').toggle()" style="padding:0 0 0 3px; margin:0 5px; width:100px;">Medals</button>' + '' + medalCollectForm + '</div>'
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
            var to_add = '<div class="medalCollectBox" data-section="' + mw.html.escape(nameNew) +
            '" style="display:inline-block; margin:5px 0 0 10px;">' +
            '<input type="checkbox"/>' + mw.html.escape(nameNew) + '&nbsp;<input class="MedalCollectAmount" style="width:30px; text-align:center;"/>' + '</div>';
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
                if (user === '') return;''
 
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
                if (medal_name === '') return;''
 
                var medal_image = $(this).find('.MedalListLinkImage').val();
                if (!medalFunctions.medalMatcher(medal_image)) return;
 
                result.dataMedal[medal_name] = {
                    title: $(this).find('.MedalListTitle').val(),
                    image_url: medal_image
                };
            });
 
            return result;
        },
// Tooltip
        tooltip: function(that) {
            title = $(that).attr('data-title');
            badgename = $(that).attr('data-name');
            offSet = $(that).offset();
            setOffX = parseFloat(offSet.left) - 86 + $(that).width() / 2;
            setOffY = parseFloat(offSet.top) + $(that).height() + 5;
 
            $('body').append(
                '<div class="badgetooltip" style="position:absolute; z-index:5000;">' +
                '<div class="badgetooltiparrow" style="width:0; height:0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 10px solid black; margin: 0 auto;" />' +
                '<div class="badgetootipwindow" style="width: 160px; background-color:white; border:2px solid black; border-radius:5px; text-align:center; padding:5px;">' +
                $('<span style="font-weight:bold;" />').text(badgename).prop('outerHTML') + '<hr />' +
                $('<span />').text(title).prop('outerHTML') + '</div>' + '</div>'
            );
 
            $('.badgetooltip').css({top: setOffY, left: setOffX});
 
            $(that).on('mouseout', function() {
                $('.badgetooltip').remove();
            });
        }
    };
})(jQuery,mediaWiki);